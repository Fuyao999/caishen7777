const express = require('express');
const router = express.Router();
const { query } = require('../database');

// 机器人配置
const ROBOT_CONFIG = {
    names: ['Robot', 'AI', 'Helper', 'Assistant', 'Player'],
    minLevel: 1,
    maxLevel: 50,
    behaviors: ['active', 'passive', 'aggressive']
};

// 获取机器人列表
router.get('/list', async (req, res) => {
    try {
        const robots = await query(
            'SELECT * FROM robots ORDER BY created_at DESC'
        );
        
        res.json({ success: true, data: robots });
    } catch (error) {
        console.error('获取机器人列表错误:', error);
        res.json({ success: false, message: '服务器错误' });
    }
});

// 批量创建机器人
router.post('/batch-create', async (req, res) => {
    const { count = 10, minLevel = 1, maxLevel = 10 } = req.body;
    
    try {
        const createdRobots = [];
        
        for (let i = 0; i < count; i++) {
            const name = `${ROBOT_CONFIG.names[Math.floor(Math.random() * ROBOT_CONFIG.names.length)]}_${Date.now()}_${i}`;
            const level = Math.floor(Math.random() * (maxLevel - minLevel + 1)) + minLevel;
            
            const result = await query(
                'INSERT INTO robots (name, level, status, behavior, created_at) VALUES (?, ?, ?, ?, NOW())',
                [name, level, 'active', ROBOT_CONFIG.behaviors[Math.floor(Math.random() * ROBOT_CONFIG.behaviors.length)]]
            );
            
            createdRobots.push({ id: result.insertId, name, level });
        }
        
        res.json({
            success: true,
            message: `成功创建${count}个机器人`,
            data: createdRobots
        });
    } catch (error) {
        console.error('创建机器人错误:', error);
        res.json({ success: false, message: '服务器错误' });
    }
});

// 更新机器人配置
router.post('/:id/config', async (req, res) => {
    const { id } = req.params;
    const { level, behavior, status } = req.body;
    
    try {
        let updates = [];
        let params = [];
        
        if (level !== undefined) {
            updates.push('level = ?');
            params.push(level);
        }
        if (behavior !== undefined) {
            updates.push('behavior = ?');
            params.push(behavior);
        }
        if (status !== undefined) {
            updates.push('status = ?');
            params.push(status);
        }
        
        if (updates.length === 0) {
            return res.json({ success: false, message: '没有要更新的字段' });
        }
        
        params.push(id);
        
        await query(
            `UPDATE robots SET ${updates.join(', ')} WHERE id = ?`,
            params
        );
        
        res.json({ success: true, message: '配置已更新' });
    } catch (error) {
        console.error('更新机器人配置错误:', error);
        res.json({ success: false, message: '服务器错误' });
    }
});

// 删除机器人
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    
    try {
        await query('DELETE FROM robots WHERE id = ?', [id]);
        res.json({ success: true, message: '机器人已删除' });
    } catch (error) {
        console.error('删除机器人错误:', error);
        res.json({ success: false, message: '服务器错误' });
    }
});

// 批量删除机器人
router.post('/batch-delete', async (req, res) => {
    const { ids } = req.body;
    
    if (!Array.isArray(ids) || ids.length === 0) {
        return res.json({ success: false, message: '请提供要删除的机器人ID' });
    }
    
    try {
        await query(`DELETE FROM robots WHERE id IN (${ids.join(',')})`);
        res.json({ success: true, message: `已删除${ids.length}个机器人` });
    } catch (error) {
        console.error('批量删除机器人错误:', error);
        res.json({ success: false, message: '服务器错误' });
    }
});

// 获取机器人统计
router.get('/stats', async (req, res) => {
    try {
        const [total] = await query('SELECT COUNT(*) as count FROM robots');
        const [active] = await query("SELECT COUNT(*) as count FROM robots WHERE status = 'active'");
        const [avgLevel] = await query('SELECT AVG(level) as avg FROM robots');
        
        res.json({
            success: true,
            data: {
                total: total.count,
                active: active.count,
                avgLevel: Math.round(avgLevel.avg || 0)
            }
        });
    } catch (error) {
        console.error('获取机器人统计错误:', error);
        res.json({ success: false, message: '服务器错误' });
    }
});

module.exports = router;
