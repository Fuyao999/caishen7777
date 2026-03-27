const express = require('express');
const router = express.Router();
const { query } = require('../database');

// 9位财神配置
const GODS = {
    caishen: { name: '赵公明', title: '正财神', effect: '香火钱+20%' },
    wencaishen: { name: '比干', title: '文财神', effect: '法力上限+10' },
    wucaishen: { name: '关公', title: '武财神', effect: '化缘收益+15%' },
    pianccaishen: { name: '范蠡', title: '偏财神', effect: '暴击率+5%' },
    shengcai: { name: '李诡祖', title: '增福财神', effect: '供奉功德+10%' },
    lucaishen: { name: '沈万三', title: '禄财神', effect: '法力回复+20%' },
    shoucaishen: { name: '刘海蟾', title: '寿财神', effect: '香火钱上限+1000' },
    xicaishen: { name: '子贡', title: '喜财神', effect: '每日首次供奉双倍' },
    caishenpo: { name: '财神奶奶', title: '财神婆婆', effect: '化缘风险-10%' }
};

// 获取供奉界面数据
router.get('/info', async (req, res) => {
    const userId = req.userId;
    
    try {
        const playerData = await query(
            'SELECT incense_money, incense_sticks, candles, gold_paper, fruits, worship_count FROM player_data WHERE user_id = ?',
            [userId]
        );
        
        res.json({
            success: true,
            gods: GODS,
            player: playerData[0]
        });
    } catch (error) {
        console.error('获取供奉信息错误:', error);
        res.json({ success: false, message: '服务器错误' });
    }
});

// 供奉
router.post('/worship', async (req, res) => {
    const userId = req.userId;
    const { godId, offeringType, offeringLevel } = req.body;
    
    if (!GODS[godId]) {
        return res.json({ success: false, message: '财神不存在' });
    }
    
    // 供奉配置
    const offeringConfig = {
        'incense_sticks': { name: '线香', cost: 1, baseReward: 10 },
        'candles': { name: '蜡烛', cost: 1, baseReward: 20 },
        'gold_paper': { name: '金纸', cost: 1, baseReward: 30 },
        'fruits': { name: '供果', cost: 1, baseReward: 50 }
    };
    
    const config = offeringConfig[offeringType];
    if (!config) {
        return res.json({ success: false, message: '供品类型错误' });
    }
    
    try {
        // 检查玩家是否有足够供品
        const playerData = await query(
            `SELECT ${offeringType}, incense_money, merit, worship_count FROM player_data WHERE user_id = ?`,
            [userId]
        );
        
        if (playerData[0][offeringType] < config.cost) {
            return res.json({ success: false, message: `${config.name}不足` });
        }
        
        // 计算奖励
        let rewardIncenseMoney = config.baseReward * offeringLevel;
        let rewardMerit = Math.floor(rewardIncenseMoney / 10);
        
        // 财神加成
        if (godId === 'caishen') rewardIncenseMoney = Math.floor(rewardIncenseMoney * 1.2);
        if (godId === 'shengcai') rewardMerit = Math.floor(rewardMerit * 1.1);
        
        // 更新玩家数据
        await query(
            `UPDATE player_data SET 
                ${offeringType} = ${offeringType} - ?,
                incense_money = incense_money + ?,
                merit = merit + ?,
                worship_count = worship_count + 1,
                total_merit = total_merit + ?
            WHERE user_id = ?`,
            [config.cost, rewardIncenseMoney, rewardMerit, rewardMerit, userId]
        );
        
        // 记录供奉
        await query(
            'INSERT INTO worship_records (user_id, god_id, offering_type, offering_level, reward_incense_money, reward_merit) VALUES (?, ?, ?, ?, ?, ?)',
            [userId, godId, offeringType, offeringLevel, rewardIncenseMoney, rewardMerit]
        );
        
        res.json({
            success: true,
            message: `供奉${GODS[godId].name}成功！`,
            reward: {
                incense_money: rewardIncenseMoney,
                merit: rewardMerit
            }
        });
        
    } catch (error) {
        console.error('供奉错误:', error);
        res.json({ success: false, message: '服务器错误' });
    }
});

module.exports = router;
