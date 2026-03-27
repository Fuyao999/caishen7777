const express = require('express');
const router = express.Router();
const { query } = require('../database');

// 获取好友列表
router.get('/list', async (req, res) => {
    const userId = req.userId;
    
    try {
        const friends = await query(
            `SELECT u.id, u.nickname, u.last_login, p.level, p.stage
             FROM friends f
             JOIN users u ON f.friend_id = u.id
             JOIN player_data p ON u.id = p.user_id
             WHERE f.user_id = ? AND f.status = 'accepted'`,
            [userId]
        );
        
        res.json({ success: true, data: friends });
    } catch (error) {
        console.error('获取好友列表错误:', error);
        res.json({ success: false, message: '服务器错误' });
    }
});

// 添加好友
router.post('/add', async (req, res) => {
    const userId = req.userId;
    const { friendId } = req.body;
    
    if (userId == friendId) {
        return res.json({ success: false, message: '不能添加自己' });
    }
    
    try {
        // 检查是否已经是好友
        const [existing] = await query(
            'SELECT * FROM friends WHERE user_id = ? AND friend_id = ?',
            [userId, friendId]
        );
        
        if (existing) {
            return res.json({ success: false, message: '已经是好友或请求已发送' });
        }
        
        // 发送好友请求
        await query(
            'INSERT INTO friends (user_id, friend_id, status) VALUES (?, ?, ?)',
            [userId, friendId, 'pending']
        );
        
        res.json({ success: true, message: '好友请求已发送' });
    } catch (error) {
        console.error('添加好友错误:', error);
        res.json({ success: false, message: '服务器错误' });
    }
});

// 接受好友请求
router.post('/accept', async (req, res) => {
    const userId = req.userId;
    const { friendId } = req.body;
    
    try {
        await query(
            "UPDATE friends SET status = 'accepted' WHERE user_id = ? AND friend_id = ?",
            [friendId, userId]
        );
        
        // 双向添加
        await query(
            "INSERT INTO friends (user_id, friend_id, status) VALUES (?, ?, 'accepted')",
            [userId, friendId]
        );
        
        res.json({ success: true, message: '已接受好友请求' });
    } catch (error) {
        console.error('接受好友请求错误:', error);
        res.json({ success: false, message: '服务器错误' });
    }
});

// 删除好友
router.post('/remove', async (req, res) => {
    const userId = req.userId;
    const { friendId } = req.body;
    
    try {
        await query(
            'DELETE FROM friends WHERE (user_id = ? AND friend_id = ?) OR (user_id = ? AND friend_id = ?)',
            [userId, friendId, friendId, userId]
        );
        
        res.json({ success: true, message: '好友已删除' });
    } catch (error) {
        console.error('删除好友错误:', error);
        res.json({ success: false, message: '服务器错误' });
    }
});

module.exports = router;
