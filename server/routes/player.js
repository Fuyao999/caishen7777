const express = require('express');
const router = express.Router();
const { pool } = require('../config/database');
const { authMiddleware } = require('../middleware/auth');
const { success, fail, getRealm, expForLevel } = require('../utils/helpers');

// GET /api/player/info - 获取玩家信息
router.get('/info', authMiddleware, async (req, res, next) => {
  try {
    const [rows] = await pool.query(
      `SELECT p.*, v.vip_level, v.monthly_card, v.total_recharge 
       FROM player_data p 
       LEFT JOIN player_vip v ON p.user_id = v.user_id 
       WHERE p.user_id = ?`, [req.user.userId]
    );
    if (rows.length === 0) return fail(res, '玩家数据不存在');
    return success(res, rows[0]);
  } catch(err) { next(err); }
});

// POST /api/player/daily-reset - 每日重置
router.post('/daily-reset', authMiddleware, async (req, res, next) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    await pool.query(
      `UPDATE player_data SET daily_alms=20, daily_sign=0, last_daily_reset=? WHERE user_id=? AND (last_daily_reset IS NULL OR last_daily_reset<?)`,
      [today, req.user.userId, today]
    );
    return success(res, null, '每日重置完成');
  } catch(err) { next(err); }
});

// POST /api/player/add-exp - 增加经验
router.post('/add-exp', authMiddleware, async (req, res, next) => {
  try {
    const { amount } = req.body;
    const [rows] = await pool.query('SELECT level, exp FROM player_data WHERE user_id=?', [req.user.userId]);
    if (rows.length === 0) return fail(res, '玩家不存在');
    let { level, exp } = rows[0];
    exp += amount;
    let leveledUp = false;
    while (level < 99 && exp >= expForLevel(level)) {
      exp -= expForLevel(level);
      level++;
      leveledUp = true;
    }
    const realm = getRealm(level);
    await pool.query(
      'UPDATE player_data SET level=?, exp=?, realm=?, realm_name=? WHERE user_id=?',
      [level, exp, realm.level, realm.name, req.user.userId]
    );
    return success(res, { level, exp, realm: realm.name, leveledUp });
  } catch(err) { next(err); }
});

// POST /api/player/sign-in - 签到
router.post('/sign-in', authMiddleware, async (req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT daily_sign, sign_streak, total_sign FROM player_data WHERE user_id=?', [req.user.userId]);
    if (rows[0].daily_sign) return fail(res, '今日已签到');
    const streak = rows[0].sign_streak + 1;
    const reward = 500 + Math.min(streak, 7) * 100;
    await pool.query(
      `UPDATE player_data SET daily_sign=1, sign_streak=?, total_sign=total_sign+1, gold=gold+? WHERE user_id=?`,
      [streak, reward, req.user.userId]
    );
    return success(res, { streak, reward, total: rows[0].total_sign + 1 }, `签到成功！连续${streak}天，奖励${reward}香火钱`);
  } catch(err) { next(err); }
});

module.exports = router;
