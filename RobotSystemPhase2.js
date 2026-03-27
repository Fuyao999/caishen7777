const express = require('express');
const router = express.Router();

/**
 * 财神大陆 - 第二阶段机器人系统 API
 * 支持智能AI机器人，模拟真实玩家行为
 */

// 机器人配置
const ROBOT_CONFIG = {
    // 机器人名称库
    names: [
        '财神小助手', '修仙路人甲', '云端漫步者', '金玉满堂', '财源广进',
        '福星高照', '和气生财', '招财进宝', '富贵吉祥', '步步高升',
        '龙年大吉', '紫气东来', '花开富贵', '年年有余', '万事如意',
        '一帆风顺', '二龙腾飞', '三羊开泰', '四季平安', '五福临门'
    ],
    
    // 行为模式
    behaviors: {
        casual: { name: '休闲型', activity: 0.3, desc: '偶尔上线，缓慢升级' },
        active: { name: '活跃型', activity: 0.7, desc: '每日活跃，正常升级' },
        hardcore: { name: '肝帝型', activity: 0.95, desc: '长时间在线，快速升级' },
        trader: { name: '商人型', activity: 0.5, desc: '专注交易，倒卖赚钱' },
        pvp: { name: '竞技型', activity: 0.6, desc: '专注PVP，追求排名' }
    },
    
    // 等级分布
    levelDistribution: {
        '1-10': 0.3,    // 30% 新手
        '11-30': 0.35,  // 35% 早期
        '31-50': 0.2,   // 20% 中期
        '51-80': 0.12,  // 12% 后期
        '81-99': 0.03   // 3% 顶级
    }
};

// 存储机器人数据（实际应该用数据库）
let robots = [];
let robotStats = {
    totalCreated: 0,
    totalActive: 0,
    lastUpdate: null
};

// ===== 机器人管理 API =====

// 获取机器人统计
router.get('/stats', async (req, res) => {
    try {
        const stats = {
            total: robots.length,
            active: robots.filter(r => r.status === 'active').length,
            online: robots.filter(r => r.isOnline).length,
            byLevel: {
                '1-10': robots.filter(r => r.level >= 1 && r.level <= 10).length,
                '11-30': robots.filter(r => r.level >= 11 && r.level <= 30).length,
                '31-50': robots.filter(r => r.level >= 31 && r.level <= 50).length,
                '51-80': robots.filter(r => r.level >= 51 && r.level <= 80).length,
                '81-99': robots.filter(r => r.level >= 81 && r.level <= 99).length
            },
            byBehavior: {
                casual: robots.filter(r => r.behavior === 'casual').length,
                active: robots.filter(r => r.behavior === 'active').length,
                hardcore: robots.filter(r => r.behavior === 'hardcore').length,
                trader: robots.filter(r => r.behavior === 'trader').length,
                pvp: robots.filter(r => r.behavior === 'pvp').length
            },
            todayActions: robots.reduce((sum, r) => sum + (r.todayActions || 0), 0)
        };
        
        res.json({ success: true, data: stats });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
});

// 获取机器人列表
router.get('/list', async (req, res) => {
    const { page = 1, limit = 20, status, behavior, search } = req.query;
    
    try {
        let filtered = [...robots];
        
        // 筛选
        if (status) filtered = filtered.filter(r => r.status === status);
        if (behavior) filtered = filtered.filter(r => r.behavior === behavior);
        if (search) {
            filtered = filtered.filter(r => 
                r.name.includes(search) || r.id.toString().includes(search)
            );
        }
        
        // 分页
        const start = (page - 1) * limit;
        const paginated = filtered.slice(start, start + parseInt(limit));
        
        res.json({
            success: true,
            data: paginated,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total: filtered.length
            }
        });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
});

// 获取单个机器人详情
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    
    try {
        const robot = robots.find(r => r.id === parseInt(id));
        if (!robot) {
            return res.json({ success: false, message: '机器人不存在' });
        }
        
        res.json({ success: true, data: robot });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
});

// 批量创建机器人
router.post('/batch-create', async (req, res) => {
    const { 
        count = 10, 
        minLevel = 1, 
        maxLevel = 10,
        behavior = 'random',
        status = 'active'
    } = req.body;
    
    try {
        const createdRobots = [];
        
        for (let i = 0; i < count; i++) {
            // 生成等级（根据分布权重）
            let level;
            if (minLevel === maxLevel) {
                level = minLevel;
            } else {
                const rand = Math.random();
                if (rand < 0.3) level = Math.floor(Math.random() * 10) + 1;
                else if (rand < 0.65) level = Math.floor(Math.random() * 20) + 11;
                else if (rand < 0.85) level = Math.floor(Math.random() * 20) + 31;
                else if (rand < 0.97) level = Math.floor(Math.random() * 30) + 51;
                else level = Math.floor(Math.random() * 19) + 81;
                
                level = Math.max(minLevel, Math.min(maxLevel, level));
            }
            
            // 生成行为模式
            const behaviors = Object.keys(ROBOT_CONFIG.behaviors);
            const selectedBehavior = behavior === 'random' 
                ? behaviors[Math.floor(Math.random() * behaviors.length)]
                : behavior;
            
            const robot = {
                id: ++robotStats.totalCreated,
                name: `${ROBOT_CONFIG.names[Math.floor(Math.random() * ROBOT_CONFIG.names.length)]}_${robotStats.totalCreated}`,
                level: level,
                exp: 0,
                behavior: selectedBehavior,
                status: status,
                isOnline: false,
                lastLogin: null,
                totalPlayTime: 0,  // 分钟
                money: Math.floor(Math.random() * 50000) + 1000,
                yuanbao: Math.floor(Math.random() * 500),
                merit: Math.floor(Math.random() * 5000),
                sect: null,
                mentor: null,
                equipment: [],
                pets: [],
                mount: null,
                todayActions: 0,
                createdAt: new Date().toISOString(),
                
                // AI状态
                ai: {
                    currentAction: 'idle',
                    nextActionTime: null,
                    target: null,
                    routine: generateRoutine(selectedBehavior)
                }
            };
            
            robots.push(robot);
            createdRobots.push(robot);
        }
        
        res.json({
            success: true,
            message: `成功创建${count}个机器人`,
            data: createdRobots
        });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
});

// 生成AI日常行为
function generateRoutine(behavior) {
    const routines = {
        casual: ['login', 'worship', 'offline', 'login', 'alms', 'offline'],
        active: ['login', 'worship', 'explore', 'explore', 'trade', 'pvp', 'offline'],
        hardcore: ['login', 'worship', 'explore', 'explore', 'explore', 'boss', 'trade', 'pvp', 'offline'],
        trader: ['login', 'trade', 'trade', 'trade', 'stall', 'offline'],
        pvp: ['login', 'worship', 'pvp', 'pvp', 'pvp', 'upgrade', 'offline']
    };
    
    return routines[behavior] || routines.active;
}

// 控制机器人上线/下线
router.post('/:id/online', async (req, res) => {
    const { id } = req.params;
    const { online } = req.body;
    
    try {
        const robot = robots.find(r => r.id === parseInt(id));
        if (!robot) {
            return res.json({ success: false, message: '机器人不存在' });
        }
        
        robot.isOnline = online;
        if (online) {
            robot.lastLogin = new Date().toISOString();
            robot.ai.currentAction = 'login';
        } else {
            robot.ai.currentAction = 'offline';
        }
        
        res.json({
            success: true,
            message: `机器人${online ? '上线' : '下线'}成功`,
            data: robot
        });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
});

// 更新机器人配置
router.post('/:id/config', async (req, res) => {
    const { id } = req.params;
    const { level, behavior, status } = req.body;
    
    try {
        const robot = robots.find(r => r.id === parseInt(id));
        if (!robot) {
            return res.json({ success: false, message: '机器人不存在' });
        }
        
        if (level !== undefined) robot.level = level;
        if (behavior !== undefined) {
            robot.behavior = behavior;
            robot.ai.routine = generateRoutine(behavior);
        }
        if (status !== undefined) robot.status = status;
        
        res.json({ success: true, message: '配置已更新', data: robot });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
});

// 删除机器人
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    
    try {
        const index = robots.findIndex(r => r.id === parseInt(id));
        if (index === -1) {
            return res.json({ success: false, message: '机器人不存在' });
        }
        
        robots.splice(index, 1);
        res.json({ success: true, message: '机器人已删除' });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
});

// 批量删除机器人
router.post('/batch-delete', async (req, res) => {
    const { ids, all = false } = req.body;
    
    try {
        if (all) {
            const count = robots.length;
            robots = [];
            return res.json({ success: true, message: `已删除全部${count}个机器人` });
        }
        
        if (!ids || !Array.isArray(ids)) {
            return res.json({ success: false, message: '请提供要删除的ID列表' });
        }
        
        robots = robots.filter(r => !ids.includes(r.id));
        res.json({ success: true, message: `已删除${ids.length}个机器人` });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
});

// 模拟机器人行为（手动触发）
router.post('/:id/simulate', async (req, res) => {
    const { id } = req.params;
    const { action } = req.body;
    
    try {
        const robot = robots.find(r => r.id === parseInt(id));
        if (!robot) {
            return res.json({ success: false, message: '机器人不存在' });
        }
        
        // 模拟各种行为
        const actions = {
            worship: { desc: '供奉', reward: { merit: 1 } },
            alms: { desc: '化缘', reward: { money: 100 + Math.floor(Math.random() * 200) } },
            explore: { desc: '探索财域', reward: { exp: 50 + Math.floor(Math.random() * 100) } },
            trade: { desc: '交易', reward: { money: Math.floor(Math.random() * 1000) } },
            pvp: { desc: 'PVP对战', reward: { honor: 10 + Math.floor(Math.random() * 20) } },
            boss: { desc: '挑战BOSS', reward: { exp: 200, items: ['装备碎片'] } }
        };
        
        const result = actions[action] || { desc: '未知行为', reward: {} };
        
        // 更新机器人数据
        robot.todayActions++;
        if (result.reward.money) robot.money += result.reward.money;
        if (result.reward.exp) {
            robot.exp += result.reward.exp;
            // 检查升级
            if (robot.exp >= robot.level * 100) {
                robot.level++;
                robot.exp = 0;
            }
        }
        
        res.json({
            success: true,
            message: `${robot.name} 执行了【${result.desc}】`,
            data: { action, reward: result.reward, robot }
        });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
});

// 获取机器人行为日志
router.get('/:id/logs', async (req, res) => {
    const { id } = req.params;
    const { limit = 50 } = req.query;
    
    try {
        // 模拟日志
        const logs = [];
        for (let i = 0; i < Math.min(limit, 100); i++) {
            logs.push({
                time: new Date(Date.now() - i * 60000).toISOString(),
                action: ['登录', '供奉', '化缘', '探索', '交易', '下线'][Math.floor(Math.random() * 6)],
                result: Math.random() > 0.9 ? '失败' : '成功'
            });
        }
        
        res.json({ success: true, data: logs });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
});

// AI调度 - 自动运行所有机器人（由定时任务调用）
router.post('/ai-tick', async (req, res) => {
    try {
        let actionCount = 0;
        
        for (const robot of robots) {
            if (robot.status !== 'active') continue;
            
            const behavior = ROBOT_CONFIG.behaviors[robot.behavior];
            if (!behavior) continue;
            
            // 根据活跃度决定是否行动
            if (Math.random() > behavior.activity) continue;
            
            // 执行AI行为
            const action = robot.ai.routine[Math.floor(Math.random() * robot.ai.routine.length)];
            
            if (action === 'login' && !robot.isOnline) {
                robot.isOnline = true;
                robot.lastLogin = new Date().toISOString();
                actionCount++;
            } else if (action === 'offline' && robot.isOnline) {
                robot.isOnline = false;
                actionCount++;
            } else if (robot.isOnline && action !== 'login' && action !== 'offline') {
                robot.todayActions++;
                actionCount++;
            }
        }
        
        robotStats.lastUpdate = new Date().toISOString();
        
        res.json({
            success: true,
            message: `AI调度完成，${actionCount}个机器人执行了行动`,
            data: { actionCount, timestamp: robotStats.lastUpdate }
        });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
});

// 清空今日行动计数（每日0点调用）
router.post('/reset-daily', async (req, res) => {
    try {
        for (const robot of robots) {
            robot.todayActions = 0;
        }
        
        res.json({ success: true, message: '已重置所有机器人今日行动计数' });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
});

module.exports = router;