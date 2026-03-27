const express = require('express');
const router = express.Router();
const { query } = require('../database');

// 获取任务列表
router.get('/list', async (req, res) => {
    const userId = req.userId;
    
    try {
        const quests = await query(
            'SELECT * FROM quest_progress WHERE user_id = ?',
            [userId]
        );
        
        res.json({ success: true, data: quests });
    } catch (error) {
        console.error('获取任务列表错误:', error);
        res.json({ success: false, message: '服务器错误' });
    }
});

// 更新任务进度
router.post('/progress', async (req, res) => {
    const userId = req.userId;
    const { questId, progress } = req.body;
    
    try {
        await query(
            `INSERT INTO quest_progress (user_id, quest_id, progress, updated_at) 
             VALUES (?, ?, ?, NOW()) 
             ON DUPLICATE KEY UPDATE progress = ?, updated_at = NOW()`,
            [userId, questId, progress, progress]
        );
        
        res.json({ success: true, message: '进度已更新' });
    } catch (error) {
        console.error('更新任务进度错误:', error);
        res.json({ success: false, message: '服务器错误' });
    }
});

// 领取任务奖励
router.post('/claim', async (req, res) => {
    const userId = req.userId;
    const { questId } = req.body;
    
    try {
        // 检查任务是否完成
        const [quest] = await query(
            'SELECT * FROM quest_progress WHERE user_id = ? AND quest_id = ?',
            [userId, questId]
        );
        
        if (!quest || quest.status !== 'completed') {
            return res.json({ success: false, message: '任务未完成' });
        }
        
        if (quest.claimed) {
            return res.json({ success: false, message: '奖励已领取' });
        }
        
        // 发放奖励
        // TODO: 根据questId获取奖励配置并发放
        
        await query(
            'UPDATE quest_progress SET claimed = 1, claimed_at = NOW() WHERE user_id = ? AND quest_id = ?',
            [userId, questId]
        );
        
        res.json({ success: true, message: '奖励已发放' });
    } catch (error) {
        console.error('领取任务奖励错误:', error);
        res.json({ success: false, message: '服务器错误' });
    }
});

module.exports = router;
