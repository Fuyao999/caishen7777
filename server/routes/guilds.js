const express = require('express');
const router = express.Router();
const { query } = require('../database');

// 获取门派列表
router.get('/list', async (req, res) => {
    try {
        const guilds = await query(
            'SELECT * FROM guilds ORDER BY level DESC, member_count DESC LIMIT 50'
        );
        
        res.json({ success: true, data: guilds });
    } catch (error) {
        console.error('获取门派列表错误:', error);
        res.json({ success: false, message: '服务器错误' });
    }
});

// 创建门派
router.post('/create', async (req, res) => {
    const userId = req.userId;
    const { name, notice } = req.body;
    
    if (!name || name.length < 2 || name.length > 20) {
        return res.json({ success: false, message: '门派名称2-20个字符' });
    }
    
    try {
        // 检查是否已有门派
        const [existing] = await query(
            'SELECT * FROM guild_members WHERE user_id = ?',
            [userId]
        );
        
        if (existing) {
            return res.json({ success: false, message: '已有门派' });
        }
        
        // 检查名称是否重复
        const [nameExists] = await query(
            'SELECT * FROM guilds WHERE name = ?',
            [name]
        );
        
        if (nameExists) {
            return res.json({ success: false, message: '门派名称已存在' });
        }
        
        // 创建门派
        const result = await query(
            'INSERT INTO guilds (name, leader_id, notice) VALUES (?, ?, ?)',
            [name, userId, notice || '']
        );
        
        const guildId = result.insertId;
        
        // 添加创建者为帮主
        await query(
            "INSERT INTO guild_members (guild_id, user_id, role) VALUES (?, ?, 'leader')",
            [guildId, userId]
        );
        
        res.json({ success: true, message: '门派创建成功', data: { id: guildId } });
    } catch (error) {
        console.error('创建门派错误:', error);
        res.json({ success: false, message: '服务器错误' });
    }
});

// 加入门派
router.post('/join', async (req, res) => {
    const userId = req.userId;
    const { guildId } = req.body;
    
    try {
        // 检查是否已有门派
        const [existing] = await query(
            'SELECT * FROM guild_members WHERE user_id = ?',
            [userId]
        );
        
        if (existing) {
            return res.json({ success: false, message: '已有门派' });
        }
        
        // 检查门派是否已满
        const [guild] = await query(
            'SELECT * FROM guilds WHERE id = ?',
            [guildId]
        );
        
        if (!guild) {
            return res.json({ success: false, message: '门派不存在' });
        }
        
        if (guild.member_count >= guild.max_members) {
            return res.json({ success: false, message: '门派已满' });
        }
        
        // 加入门派
        await query(
            "INSERT INTO guild_members (guild_id, user_id, role) VALUES (?, ?, 'member')",
            [guildId, userId]
        );
        
        // 更新门派人数
        await query(
            'UPDATE guilds SET member_count = member_count + 1 WHERE id = ?',
            [guildId]
        );
        
        res.json({ success: true, message: '加入门派成功' });
    } catch (error) {
        console.error('加入门派错误:', error);
        res.json({ success: false, message: '服务器错误' });
    }
});

// 退出门派
router.post('/leave', async (req, res) => {
    const userId = req.userId;
    
    try {
        const [member] = await query(
            'SELECT * FROM guild_members WHERE user_id = ?',
            [userId]
        );
        
        if (!member) {
            return res.json({ success: false, message: '没有门派' });
        }
        
        if (member.role === 'leader') {
            return res.json({ success: false, message: '帮主不能退出，请转让帮主职位' });
        }
        
        await query(
            'DELETE FROM guild_members WHERE user_id = ?',
            [userId]
        );
        
        // 更新门派人数
        await query(
            'UPDATE guilds SET member_count = member_count - 1 WHERE id = ?',
            [member.guild_id]
        );
        
        res.json({ success: true, message: '已退出门派' });
    } catch (error) {
        console.error('退出门派错误:', error);
        res.json({ success: false, message: '服务器错误' });
    }
});

// 获取门派详情
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    
    try {
        const [guild] = await query(
            'SELECT * FROM guilds WHERE id = ?',
            [id]
        );
        
        if (!guild) {
            return res.json({ success: false, message: '门派不存在' });
        }
        
        // 获取成员列表
        const members = await query(
            `SELECT gm.*, u.nickname, p.level 
             FROM guild_members gm
             JOIN users u ON gm.user_id = u.id
             JOIN player_data p ON gm.user_id = p.user_id
             WHERE gm.guild_id = ?
             ORDER BY gm.role, gm.contribution DESC`,
            [id]
        );
        
        res.json({
            success: true,
            data: { ...guild, members }
        });
    } catch (error) {
        console.error('获取门派详情错误:', error);
        res.json({ success: false, message: '服务器错误' });
    }
});

module.exports = router;
