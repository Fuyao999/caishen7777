const express = require('express');
const router = express.Router();
const { query } = require('../database');

// 获取统计数据
router.get('/stats', async (req, res) => {
    try {
        // 总用户数
        const [userCount] = await query('SELECT COUNT(*) as count FROM users');
        
        // 今日新增
        const [todayUsers] = await query(
            'SELECT COUNT(*) as count FROM users WHERE DATE(created_at) = CURDATE()'
        );
        
        // 今日活跃
        const [activeUsers] = await query(
            'SELECT COUNT(*) as count FROM login_records WHERE DATE(login_time) = CURDATE()'
        );
        
        // 在线人数（最近5分钟）
        const [onlineUsers] = await query(
            'SELECT COUNT(DISTINCT user_id) as count FROM login_records WHERE login_time > DATE_SUB(NOW(), INTERVAL 5 MINUTE)'
        );
        
        res.json({
            success: true,
            data: {
                totalUsers: userCount.count,
                todayUsers: todayUsers.count,
                activeUsers: activeUsers.count,
                onlineUsers: onlineUsers.count
            }
        });
    } catch (error) {
        console.error('获取统计数据错误:', error);
        res.json({ success: false, message: '服务器错误' });
    }
});

// 获取用户列表
router.get('/users', async (req, res) => {
    const { page = 1, limit = 20, search = '' } = req.query;
    const offset = (page - 1) * limit;
    
    try {
        let sql = `
            SELECT u.id, u.phone, u.nickname, u.created_at, u.last_login,
                   p.level, p.stage, p.incense_money, p.yuanbao, p.merit
            FROM users u
            LEFT JOIN player_data p ON u.id = p.user_id
        `;
        
        let params = [];
        
        if (search) {
            sql += ' WHERE u.phone LIKE ? OR u.nickname LIKE ?';
            params.push(`%${search}%`, `%${search}%`);
        }
        
        sql += ' ORDER BY u.id DESC LIMIT ? OFFSET ?';
        params.push(parseInt(limit), parseInt(offset));
        
        const users = await query(sql, params);
        
        // 获取总数
        let countSql = 'SELECT COUNT(*) as count FROM users';
        if (search) {
            countSql += ' WHERE phone LIKE ? OR nickname LIKE ?';
        }
        const [total] = await query(countSql, search ? [`%${search}%`, `%${search}%`] : []);
        
        res.json({
            success: true,
            data: users,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total: total.count
            }
        });
    } catch (error) {
        console.error('获取用户列表错误:', error);
        res.json({ success: false, message: '服务器错误' });
    }
});

// 封禁/解封用户
router.post('/users/:id/ban', async (req, res) => {
    const { id } = req.params;
    const { banned, reason } = req.body;
    
    try {
        await query(
            'UPDATE users SET banned = ?, ban_reason = ? WHERE id = ?',
            [banned, reason, id]
        );
        
        res.json({
            success: true,
            message: banned ? '用户已封禁' : '用户已解封'
        });
    } catch (error) {
        console.error('封禁用户错误:', error);
        res.json({ success: false, message: '服务器错误' });
    }
});

// 获取用户详情
router.get('/users/:id', async (req, res) => {
    const { id } = req.params;
    
    try {
        const [user] = await query(
            `SELECT u.*, p.* 
             FROM users u 
             LEFT JOIN player_data p ON u.id = p.user_id 
             WHERE u.id = ?`,
            [id]
        );
        
        if (!user) {
            return res.json({ success: false, message: '用户不存在' });
        }
        
        // 获取登录记录
        const loginRecords = await query(
            'SELECT * FROM login_records WHERE user_id = ? ORDER BY login_time DESC LIMIT 10',
            [id]
        );
        
        res.json({
            success: true,
            data: { ...user, loginRecords }
        });
    } catch (error) {
        console.error('获取用户详情错误:', error);
        res.json({ success: false, message: '服务器错误' });
    }
});

module.exports = router;
