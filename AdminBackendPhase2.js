const express = require('express');
const router = express.Router();

/**
 * 财神大陆 - 第二阶段管理后台 API
 * 支持21个系统的数据监控和管理
 */

// ===== 统计数据 =====
router.get('/stats', async (req, res) => {
    try {
        const stats = {
            // 用户统计
            users: {
                total: 0,           // 总用户数
                today: 0,           // 今日新增
                active: 0,          // 今日活跃
                online: 0           // 当前在线
            },
            // 经济统计
            economy: {
                totalMoney: 0,      // 总香火钱
                totalYuanbao: 0,    // 总元宝
                taxCollected: 0,    // 税收累计
                tradeVolume: 0      // 交易总额
            },
            // 系统统计
            systems: {
                guilds: 0,          // 门派数
                mentors: 0,         // 师徒关系数
                stalls: 0,          // 摊位数量
                auctions: 0         // 拍卖数量
            },
            // 战斗统计
            combat: {
                pvpMatches: 0,      // PVP场次
                bossKills: 0,       // BOSS击杀数
                totalDeaths: 0      // 死亡次数
            }
        };
        
        res.json({ success: true, data: stats });
    } catch (error) {
        console.error('获取统计数据错误:', error);
        res.json({ success: false, message: '服务器错误' });
    }
});

// ===== 用户管理 =====
router.get('/users', async (req, res) => {
    const { page = 1, limit = 20, search = '', level, realm } = req.query;
    
    try {
        // 模拟用户数据
        const users = [];
        for (let i = 1; i <= Math.min(limit, 100); i++) {
            users.push({
                id: i,
                name: `玩家${i}`,
                level: Math.floor(Math.random() * 99) + 1,
                realm: ['炼气期', '筑基期', '结丹期', '元婴期'][Math.floor(Math.random() * 4)],
                money: Math.floor(Math.random() * 1000000),
                yuanbao: Math.floor(Math.random() * 10000),
                merit: Math.floor(Math.random() * 50000),
                lastLogin: new Date().toISOString(),
                status: Math.random() > 0.9 ? 'banned' : 'active'
            });
        }
        
        res.json({
            success: true,
            data: users,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total: 1000
            }
        });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
});

// 用户详情
router.get('/users/:id', async (req, res) => {
    const { id } = req.params;
    
    try {
        const userDetail = {
            id: id,
            name: `玩家${id}`,
            level: 50,
            exp: 25000,
            realm: '结丹期',
            form: '金身',
            
            // 资源
            money: 500000,
            yuanbao: 5000,
            merit: 25000,
            honor: 1000,
            
            // 社交
            sect: '子渊门',
            mentor: null,
            students: 2,
            friends: 50,
            
            // 战斗
            attack: 500,
            defense: 300,
            maxHp: 5000,
            maxMp: 1000,
            
            // 进度
            unlockedDomains: 6,
            completedQuests: 45,
            achievements: 20,
            
            // 装备
            equipment: [
                { slot: 'weapon', name: '财神之刃', quality: 'legendary' },
                { slot: 'armor', name: '金身铠甲', quality: 'epic' }
            ],
            
            // 宠物
            pets: [
                { id: 'phoenix', name: '凤凰雏', level: 5 },
                { id: 'dragon', name: '龙子', level: 3 }
            ],
            
            // 坐骑
            mount: { id: 'wind_horse', name: '疾风驹', level: 8 },
            
            // 精怪
            spirits: [
                { id: 'treant', name: '小树人', type: 'heal' },
                { id: 'vine', name: '藤蔓妖', type: 'control' }
            ],
            
            // 统计
            stats: {
                totalLogins: 100,
                totalPlayTime: 500,  // 小时
                pvpWins: 50,
                pvpLosses: 20,
                bossKills: 30,
                totalDeaths: 10
            }
        };
        
        res.json({ success: true, data: userDetail });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
});

// 封禁用户
router.post('/users/:id/ban', async (req, res) => {
    const { id } = req.params;
    const { reason, duration } = req.body;
    
    try {
        res.json({
            success: true,
            message: `用户${id}已被封禁`,
            data: { userId: id, reason, duration, bannedAt: new Date().toISOString() }
        });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
});

// 修改用户数据
router.post('/users/:id/modify', async (req, res) => {
    const { id } = req.params;
    const { field, value } = req.body;
    
    try {
        res.json({
            success: true,
            message: `已修改用户${id}的${field}为${value}`
        });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
});

// ===== 门派管理 =====
router.get('/sects', async (req, res) => {
    try {
        const sects = [
            { id: 'zi', name: '子渊门', members: 150, leader: '玩家A', contribution: 50000 },
            { id: 'chou', name: '玄牝宗', members: 120, leader: '玩家B', contribution: 45000 },
            { id: 'yin', name: '青木堂', members: 180, leader: '玩家C', contribution: 60000 },
            { id: 'mao', name: '金曦派', members: 140, leader: '玩家D', contribution: 48000 },
            { id: 'chen', name: '天市阁', members: 200, leader: '玩家E', contribution: 70000 }
        ];
        
        res.json({ success: true, data: sects });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
});

// ===== 师徒管理 =====
router.get('/mentors', async (req, res) => {
    try {
        const relationships = [
            { mentor: '玩家A', student: '玩家B', establishTime: '2026-03-01', graduated: false },
            { mentor: '玩家C', student: '玩家D', establishTime: '2026-02-15', graduated: true }
        ];
        
        res.json({ success: true, data: relationships });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
});

// ===== 交易管理 =====
router.get('/trades', async (req, res) => {
    try {
        const trades = [
            { id: 1, type: 'stall', seller: '玩家A', item: '高级装备', price: 5000, time: '2026-03-27' },
            { id: 2, type: 'auction', seller: '玩家B', item: '稀有材料', price: 10000, time: '2026-03-26' }
        ];
        
        res.json({ success: true, data: trades });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
});

// ===== PVP管理 =====
router.get('/pvp', async (req, res) => {
    try {
        const pvpStats = {
            todayMatches: 1500,
            todayActivePlayers: 500,
            rankings: [
                { rank: 1, player: '玩家A', points: 2500, tier: '王者' },
                { rank: 2, player: '玩家B', points: 2400, tier: '大师' },
                { rank: 3, player: '玩家C', points: 2350, tier: '大师' }
            ],
            bossStatus: {
                name: '金乌之灵',
                currentHp: 850000,
                maxHp: 1000000,
                status: 'alive',
                participants: 50
            }
        };
        
        res.json({ success: true, data: pvpStats });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
});

// ===== 活动管理 =====
router.get('/events', async (req, res) => {
    try {
        const events = [
            {
                id: 'caishen_birthday',
                name: '财神诞',
                status: 'active',
                startTime: '2026-02-02',
                endTime: '2026-02-09',
                participants: 5000,
                description: '农历正月初五庆典'
            },
            {
                id: 'double_exp',
                name: '双倍经验周',
                status: 'upcoming',
                startTime: '2026-03-28',
                endTime: '2026-03-29',
                description: '全服双倍经验'
            }
        ];
        
        res.json({ success: true, data: events });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
});

// 创建/编辑活动
router.post('/events', async (req, res) => {
    const { name, type, startTime, endTime, description } = req.body;
    
    try {
        res.json({
            success: true,
            message: '活动创建成功',
            data: { id: Date.now(), name, type, startTime, endTime }
        });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
});

// ===== 反作弊管理 =====
router.get('/anticheat', async (req, res) => {
    try {
        const cheatData = {
            suspiciousPlayers: [
                { id: 1, name: '玩家X', score: 85, reason: '经验获取过快', lastCheck: '2026-03-27' },
                { id: 2, name: '玩家Y', score: 70, reason: '操作频率异常', lastCheck: '2026-03-27' }
            ],
            bannedPlayers: [
                { id: 3, name: '玩家Z', reason: '使用外挂', bannedAt: '2026-03-26' }
            ],
            studioGroups: [
                { members: ['玩家A', '玩家B', '玩家C'], similarity: 0.95, reason: '行为高度相似' }
            ]
        };
        
        res.json({ success: true, data: cheatData });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
});

// ===== 系统设置 =====
router.get('/settings', async (req, res) => {
    try {
        const settings = {
            game: {
                maintenance: false,
                maintenanceTime: null,
                newUserEnabled: true,
                maxOnline: 10000
            },
            economy: {
                taxRate: 0.05,
                dropRateMultiplier: 1.0,
                expMultiplier: 1.0
            },
            combat: {
                pvpEnabled: true,
                bossRespawnTime: 4,
                deathPenaltyEnabled: true
            }
        };
        
        res.json({ success: true, data: settings });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
});

// 修改设置
router.post('/settings', async (req, res) => {
    const { category, key, value } = req.body;
    
    try {
        res.json({
            success: true,
            message: `设置已更新：${category}.${key} = ${value}`
        });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
});

// ===== 日志查看 =====
router.get('/logs', async (req, res) => {
    const { type = 'all', limit = 100 } = req.query;
    
    try {
        const logs = [
            { time: '2026-03-27 08:00:00', type: 'login', user: '玩家A', action: '登录游戏' },
            { time: '2026-03-27 08:01:00', type: 'trade', user: '玩家B', action: '购买装备' },
            { time: '2026-03-27 08:02:00', type: 'combat', user: '玩家C', action: '击败BOSS' }
        ];
        
        res.json({ success: true, data: logs });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
});

module.exports = router;