const express = require('express');
const router = express.Router();
const { query } = require('../database');

// 获取排行榜
router.get('/:type', async (req, res) => {
    const { type } = req.params;
    const { page = 1, limit = 50 } = req.query;
    const offset = (page - 1) * limit;
    
    const validTypes = ['level', 'power', 'wealth', 'merit'];
    if (!validTypes.includes(type)) {
        return res.json({ success: false, message: '无效的排行榜类型' });
    }
    
    try {
        let orderField = 'level';
        switch(type) {
            case 'level': orderField = 'level'; break;
            case 'power': orderField = '(attack + defense + hp)'; break;
            case 'wealth': orderField = 'incense_money'; break;
            case 'merit': orderField = 'merit'; break;
        }
        
        const ranks = await query(
            `SELECT u.id, u.nickname, p.level, p.stage,
                    p.incense_money, p.merit, p.attack, p.defense, p.hp
             FROM users u
             JOIN player_data p ON u.id = p.user_id
             WHERE u.banned = 0
             ORDER BY p.${orderField} DESC
             LIMIT ? OFFSET ?`,
            [parseInt(limit), parseInt(offset)]
        );
        
        // 添加排名
        ranks.forEach((item, index) => {
            item.rank = offset + index + 1;
        });
        
        res.json({ success: true, data: ranks });
    } catch (error) {
        console.error('获取排行榜错误:', error);
        res.json({ success: false, message: '服务器错误' });
    }
});

// 获取我的排名
router.get('/my/:type', async (req, res) => {
    const userId = req.userId;
    const { type } = req.params;
    
    const validTypes = ['level', 'power', 'wealth', 'merit'];
    if (!validTypes.includes(type)) {
        return res.json({ success: false, message: '无效的排行榜类型' });
    }
    
    try {
        let orderField = 'level';
        switch(type) {
            case 'level': orderField = 'level'; break;
            case 'power': orderField = '(attack + defense + hp)'; break;
            case 'wealth': orderField = 'incense_money'; break;
            case 'merit': orderField = 'merit'; break;
        }
        
        // 获取我的排名
        const [myData] = await query(
            `SELECT COUNT(*) + 1 as rank
             FROM player_data p1
             JOIN users u1 ON p1.user_id = u1.id
             JOIN player_data p2 ON p2.user_id = ?
             WHERE u1.banned = 0 
             AND p1.${orderField} > p2.${orderField}`,
            [userId]
        );
        
        // 获取我的数据
        const [myInfo] = await query(
            `SELECT u.id, u.nickname, p.level, p.stage,
                    p.incense_money, p.merit
             FROM users u
             JOIN player_data p ON u.id = p.user_id
             WHERE u.id = ?`,
            [userId]
        );
        
        res.json({
            success: true,
            data: {
                rank: myData.rank,
                ...myInfo
            }
        });
    } catch (error) {
        console.error('获取我的排名错误:', error);
        res.json({ success: false, message: '服务器错误' });
    }
});

module.exports = router;
