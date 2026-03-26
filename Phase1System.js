/**
 * 财神大陆 - 第一阶段：1-5级庙宇经营完整系统
 * 庙宇升级、招财幡合成、资源产出、信徒系统
 */

const Phase1System = {
    // 庙宇等级配置
    templeLevels: [
        {
            level: 1,
            name: '破庙',
            desc: '泥胎财神像，灰尘满面',
            form: '泥胎',
            // 产出
            hourlyOutput: 100,      // 每小时香火钱
            storageLimit: 5000,     // 存储上限
            // 升级需求
            upgradeCost: {
                money: 5000,
                banners: 3,
                merit: 100
            },
            // 解锁
            unlocks: ['基础供奉', '普通化缘']
        },
        {
            level: 2,
            name: '小庙',
            desc: '信徒渐多，庙宇修缮',
            form: '泥胎',
            hourlyOutput: 180,
            storageLimit: 10000,
            upgradeCost: {
                money: 15000,
                banners: 6,
                merit: 500
            },
            unlocks: ['高级香', '信徒系统']
        },
        {
            level: 3,
            name: '中庙',
            desc: '木骨显露，信徒虔诚',
            form: '木骨',
            hourlyOutput: 250,
            storageLimit: 18000,
            upgradeCost: {
                money: 50000,
                banners: 10,
                merit: 2000
            },
            unlocks: ['武财神位', '化缘加成']
        },
        {
            level: 4,
            name: '大庙',
            desc: '铜身加护，香火鼎盛',
            form: '铜身',
            hourlyOutput: 333,
            storageLimit: 30000,
            upgradeCost: {
                money: 150000,
                banners: 15,
                merit: 10800
            },
            unlocks: ['文财神位', '极品香', '双倍产出']
        },
        {
            level: 5,
            name: '金身庙',
            desc: '金身财神，财源广进',
            form: '金身',
            hourlyOutput: 417,
            storageLimit: 50000,
            upgradeCost: null, // 已满级，进入第二阶段
            unlocks: ['十二财域入口', '财源启灵剧情']
        }
    ],
    
    // 获取庙宇信息
    getTempleInfo: function(level) {
        return this.templeLevels.find(t => t.level === level) || this.templeLevels[0];
    },
    
    // 检查是否可升级
    canUpgrade: function(player, level) {
        const temple = this.getTempleInfo(level);
        if (!temple.upgradeCost) return { can: false, reason: '已达满级' };
        
        const cost = temple.upgradeCost;
        const checks = [];
        
        if (player.money < cost.money) {
            checks.push(`香火钱不足（${player.money}/${cost.money}）`);
        }
        if (player.banners < cost.banners) {
            checks.push(`招财幡不足（${player.banners}/${cost.banners}）`);
        }
        if (player.merit < cost.merit) {
            checks.push(`功德不足（${player.merit}/${cost.merit}）`);
        }
        
        return {
            can: checks.length === 0,
            reason: checks.join('、'),
            cost: cost
        };
    },
    
    // 执行升级
    doUpgrade: function(player) {
        const check = this.canUpgrade(player, player.templeLevel);
        if (!check.can) {
            return { success: false, message: check.reason };
        }
        
        const cost = check.cost;
        player.money -= cost.money;
        player.banners -= cost.banners;
        // 功德只增不减，这里是门槛检查，不扣除
        
        player.templeLevel++;
        const newTemple = this.getTempleInfo(player.templeLevel);
        
        // 检查是否进入第二阶段
        if (player.templeLevel === 5) {
            return {
                success: true,
                message: '庙宇达到金身！财源启灵，解锁十二财域！',
                levelUp: true,
                phaseUnlock: true,
                unlocks: newTemple.unlocks
            };
        }
        
        return {
            success: true,
            message: `庙宇升级到${newTemple.name}！`,
            levelUp: true,
            unlocks: newTemple.unlocks
        };
    },
    
    // 招财幡合成系统
    bannerSystem: {
        // 合成比例
        fragmentsPerBanner: 40,
        
        // 合成招财幡
        synthesize: function(player) {
            if (player.fragments < this.fragmentsPerBanner) {
                return {
                    success: false,
                    message: `碎片不足（${player.fragments}/${this.fragmentsPerBanner}）`
                };
            }
            
            player.fragments -= this.fragmentsPerBanner;
            player.banners = (player.banners || 0) + 1;
            
            return {
                success: true,
                message: '合成成功！获得1个招财幡',
                banners: player.banners
            };
        },
        
        // 获取可合成数量
        getSynthesizableCount: function(fragments) {
            return Math.floor(fragments / this.fragmentsPerBanner);
        }
    },
    
    // 资源产出计算
    calculateOutput: function(player, hours) {
        const temple = this.getTempleInfo(player.templeLevel);
        let output = temple.hourlyOutput * hours;
        
        // 香的加成
        if (player.activeIncense) {
            const incenseBonus = {
                'normal': 0,
                'advanced': 0.1,
                'premium': 0.3,
                'special': 0.5
            };
            output *= (1 + (incenseBonus[player.activeIncense] || 0));
        }
        
        // 信徒加成
        if (player.disciples) {
            output *= (1 + player.disciples * 0.02);
        }
        
        return Math.floor(output);
    },
    
    // 存储检查（离线收益上限）
    checkStorage: function(player, currentMoney) {
        const temple = this.getTempleInfo(player.templeLevel);
        return {
            current: currentMoney,
            limit: temple.storageLimit,
            isFull: currentMoney >= temple.storageLimit,
            canCollect: Math.min(currentMoney, temple.storageLimit)
        };
    },
    
    // 香的类型
    incenseTypes: {
        normal: { name: '普通香', price: 100, duration: 2, bonus: 0 },
        advanced: { name: '高级香', price: 300, duration: 4, bonus: 0.1 },
        premium: { name: '极品香', price: 100, duration: 8, bonus: 0.3, currency: '元宝' },
        special: { name: '财神诞特供', price: 0, duration: 24, bonus: 0.5, event: true }
    }
};

// 导出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Phase1System;
}