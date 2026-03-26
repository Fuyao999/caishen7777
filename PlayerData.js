/**
 * 财神大陆 - 玩家数据管理系统
 * 玩家属性、存档、数据持久化
 */

const PlayerData = {
    // 创建新玩家
    createNew: function() {
        return {
            // 基础信息
            id: this.generateId(),
            name: '小财神',
            createTime: Date.now(),
            
            // 等级系统
            level: 1,
            exp: 0,
            
            // 阶段
            phase: 1, // 1=庙宇经营, 2=十二财域
            
            // 庙宇
            templeLevel: 1,
            templeForm: '泥胎', // 泥胎/木骨/铜身/金身/法相/真身/财神天尊/财源之主
            
            // 货币
            money: 1000,        // 香火钱
            yuanbao: 0,         // 元宝（充值）
            merit: 0,           // 功德（只增不减）
            fragments: 0,       // 碎片
            banners: 0,         // 招财幡
            
            // 资源
            incense: {
                normal: 0,
                advanced: 0,
                premium: 0,
                special: 0
            },
            activeIncense: null, // 当前燃烧的香类型
            incenseEndTime: 0,   // 香燃烧结束时间
            
            // 信徒
            disciples: 0,
            discipleLoyalty: 0,  // 忠诚度
            
            // 社交
            friends: [],
            reputation: 0,       // 声望
            
            // 十二财域进度
            unlockedDomains: [], // 已解锁的域ID
            domainProgress: {},  // 各域探索进度
            
            // 统计
            totalMoneyEarned: 0,
            totalIncenseBurned: 0,
            totalAlmsDone: 0,
            loginDays: 0,
            lastLoginTime: 0,
            
            // 设置
            settings: {
                music: true,
                sound: true,
                notifications: true
            }
        };
    },
    
    // 生成唯一ID
    generateId: function() {
        return 'player_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    },
    
    // 计算离线收益
    calculateOfflineReward: function(player) {
        const now = Date.now();
        const offlineTime = now - player.lastLoginTime;
        const offlineHours = offlineTime / (1000 * 60 * 60);
        
        // 最多24小时离线收益
        const maxHours = 24;
        const effectiveHours = Math.min(offlineHours, maxHours);
        
        // 计算收益
        const Phase1System = require('./Phase1System');
        const output = Phase1System.calculateOutput(player, effectiveHours);
        
        // 检查存储上限
        const storage = Phase1System.checkStorage(player, player.money + output);
        
        return {
            offlineHours: Math.floor(offlineHours),
            effectiveHours: effectiveHours,
            reward: storage.canCollect - player.money,
            isFull: storage.isFull,
            capped: output > (storage.canCollect - player.money)
        };
    },
    
    // 处理每日登录
    processDailyLogin: function(player) {
        const now = new Date();
        const lastLogin = new Date(player.lastLoginTime);
        
        const isSameDay = now.toDateString() === lastLogin.toDateString();
        
        if (!isSameDay) {
            // 新的一天
            player.loginDays++;
            player.lastLoginTime = now.getTime();
            
            // 每日登录奖励
            const rewards = {
                money: 500,
                fragments: 3,
                merit: 1
            };
            
            // 连续登录加成
            const consecutiveDays = this.getConsecutiveDays(player);
            if (consecutiveDays >= 3) {
                rewards.fragments += 10;
            }
            if (consecutiveDays >= 7) {
                rewards.fragments += 30;
            }
            
            player.money += rewards.money;
            player.fragments += rewards.fragments;
            player.merit += rewards.merit;
            
            return {
                isNewDay: true,
                consecutiveDays: consecutiveDays,
                rewards: rewards
            };
        }
        
        return { isNewDay: false };
    },
    
    // 获取连续登录天数
    getConsecutiveDays: function(player) {
        // 简化版，实际应该检查日期连续性
        return player.loginDays % 7 || 7;
    },
    
    // 保存数据（本地存储）
    save: function(player) {
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem('caishen_player', JSON.stringify(player));
            return true;
        }
        return false;
    },
    
    // 加载数据
    load: function() {
        if (typeof localStorage !== 'undefined') {
            const data = localStorage.getItem('caishen_player');
            if (data) {
                return JSON.parse(data);
            }
        }
        return null;
    },
    
    // 导出数据（备份）
    export: function(player) {
        return JSON.stringify(player, null, 2);
    },
    
    // 导入数据（恢复）
    import: function(jsonString) {
        try {
            return JSON.parse(jsonString);
        } catch (e) {
            return null;
        }
    }
};

// 导出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PlayerData;
}