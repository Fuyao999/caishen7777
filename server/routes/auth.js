const express = require('express');
const router = express.Router();
const { query } = require('../database');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'caishen-game-secret-key-2026';

// 发送验证码（简化版，直接返回1234）
router.post('/send-code', async (req, res) => {
    const { phone } = req.body;
    
    if (!phone || phone.length !== 11) {
        return res.json({ success: false, message: '手机号格式错误' });
    }
    
    res.json({ success: true, message: '验证码已发送', code: '1234' });
});

// 登录/注册
router.post('/login', async (req, res) => {
    const { phone, code } = req.body;
    
    if (!phone || phone.length !== 11) {
        return res.json({ success: false, message: '手机号格式错误' });
    }
    
    if (code !== '1234') {
        return res.json({ success: false, message: '验证码错误' });
    }
    
    try {
        // 查找或创建用户
        let users = await query('SELECT * FROM users WHERE phone = ?', [phone]);
        let userId;
        
        if (users.length === 0) {
            // 创建新用户
            const result = await query(
                'INSERT INTO users (phone, nickname) VALUES (?, ?)',
                [phone, '玩家' + phone.slice(-4)]
            );
            userId = result.insertId;
            
            // 创建玩家数据
            await query(
                'INSERT INTO player_data (user_id) VALUES (?)',
                [userId]
            );
        } else {
            userId = users[0].id;
            await query('UPDATE users SET last_login = NOW() WHERE id = ?', [userId]);
        }
        
        // 生成token
        const token = jwt.sign({ userId, phone }, JWT_SECRET, { expiresIn: '7d' });
        
        // 获取玩家数据
        const playerData = await query(
            'SELECT * FROM player_data WHERE user_id = ?',
            [userId]
        );
        
        res.json({
            success: true,
            token: token,
            user: {
                id: userId,
                phone: phone,
                nickname: users.length > 0 ? users[0].nickname : '玩家' + phone.slice(-4)
            },
            playerData: playerData[0]
        });
        
    } catch (error) {
        console.error('登录错误:', error);
        res.json({ success: false, message: '服务器错误' });
    }
});

module.exports = router;
