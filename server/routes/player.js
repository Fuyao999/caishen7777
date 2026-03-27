const express = require('express');
const router = express.Router();
const { query } = require('../database');

// 获取玩家数据
router.get('/data', async (req, res) => {
    const userId = req.userId; // 从中间件获取
    
    try {
        const playerData = await query(
            'SELECT * FROM player_data WHERE user_id = ?',
            [userId]
        );
        
        if (playerData.length === 0) {
            return res.json({ success: false, message: '玩家数据不存在' });
        }
        
        res.json({ success: true, data: playerData[0] });
    } catch (error) {
        console.error('获取玩家数据错误:', error);
        res.json({ success: false, message: '服务器错误' });
    }
});

// 更新玩家数据
router.post('/update', async (req, res) => {
    const userId = req.userId;
    const updates = req.body;
    
    try {
        const allowedFields = [
            'level', 'stage', 'experience',
            'incense_money', 'yuanbao', 'merit',
            'incense_sticks', 'candles', 'gold_paper',
            'fruits', 'mana', 'cultivation'
        ];
        
        const fields = [];
        const values = [];
        
        for (const key of allowedFields) {
            if (updates[key] !== undefined) {
                fields.push(`${key} = ?`);
                values.push(updates[key]);
            }
        }
        
        if (fields.length === 0) {
            return res.json({ success: false, message: '没有要更新的字段' });
        }
        
        values.push(userId);
        
        await query(
            `UPDATE player_data SET ${fields.join(', ')} WHERE user_id = ?`,
            values
        );
        
        res.json({ success: true, message: '更新成功' });
    } catch (error) {
        console.error('更新玩家数据错误:', error);
        res.json({ success: false, message: '服务器错误' });
    }
});

module.exports = router;
