const express = require('express');
const router = express.Router();
const { query } = require('../database');

// 获取邮件列表
router.get('/list', async (req, res) => {
    const userId = req.userId;
    
    try {
        const mails = await query(
            'SELECT * FROM mails WHERE user_id = ? ORDER BY created_at DESC',
            [userId]
        );
        
        res.json({ success: true, data: mails });
    } catch (error) {
        console.error('获取邮件列表错误:', error);
        res.json({ success: false, message: '服务器错误' });
    }
});

// 阅读邮件
router.post('/read', async (req, res) => {
    const userId = req.userId;
    const { mailId } = req.body;
    
    try {
        await query(
            'UPDATE mails SET is_read = 1 WHERE id = ? AND user_id = ?',
            [mailId, userId]
        );
        
        res.json({ success: true, message: '已标记为已读' });
    } catch (error) {
        console.error('阅读邮件错误:', error);
        res.json({ success: false, message: '服务器错误' });
    }
});

// 领取附件
router.post('/claim', async (req, res) => {
    const userId = req.userId;
    const { mailId } = req.body;
    
    try {
        const [mail] = await query(
            'SELECT * FROM mails WHERE id = ? AND user_id = ?',
            [mailId, userId]
        );
        
        if (!mail) {
            return res.json({ success: false, message: '邮件不存在' });
        }
        
        if (mail.is_claimed) {
            return res.json({ success: false, message: '附件已领取' });
        }
        
        if (!mail.attachment) {
            return res.json({ success: false, message: '没有附件' });
        }
        
        // 解析并发放附件
        const attachment = JSON.parse(mail.attachment);
        for (const [key, value] of Object.entries(attachment)) {
            await query(
                `UPDATE player_data SET ${key} = ${key} + ? WHERE user_id = ?`,
                [value, userId]
            );
        }
        
        await query(
            'UPDATE mails SET is_claimed = 1 WHERE id = ?',
            [mailId]
        );
        
        res.json({ success: true, message: '附件已领取' });
    } catch (error) {
        console.error('领取附件错误:', error);
        res.json({ success: false, message: '服务器错误' });
    }
});

// 删除邮件
router.delete('/:id', async (req, res) => {
    const userId = req.userId;
    const { id } = req.params;
    
    try {
        await query(
            'DELETE FROM mails WHERE id = ? AND user_id = ?',
            [id, userId]
        );
        
        res.json({ success: true, message: '邮件已删除' });
    } catch (error) {
        console.error('删除邮件错误:', error);
        res.json({ success: false, message: '服务器错误' });
    }
});

module.exports = router;
