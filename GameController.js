/**
 * 财神大陆 - 游戏主控制器
 * 整合等级、庙宇、财域、玩家数据的完整游戏逻辑
 */

class GameController {
    constructor() {
        this.player = null;
        this.LevelSystem = require('./LevelSystem');
        this.TwelveDomains = require('./TwelveDomains');
        this.Phase1System = require('./Phase1System');
        this.PlayerData = require('./PlayerData');
        
        this.init();
    }
    
    // 初始化
    init() {
        // 尝试加载存档
        const savedData = this.PlayerData.load();
        if (savedData) {
            this.player = savedData;
            this.processOfflineReward();
        } else {
            this.player = this.PlayerData.createNew();
        }
        
        // 处理每日登录
        const loginResult = this.PlayerData.processDailyLogin(this.player);
        if (loginResult.isNewDay) {
            console.log(`连续登录${loginResult.consecutiveDays}天！`);
            console.log('奖励：', loginResult.rewards);
        }
        
        // 启动定时器（每分钟更新）
        this.startGameLoop();
    }
    
    // 游戏主循环
    startGameLoop() {
        // 每秒更新一次
        setInterval(() => {
            this.update();
        }, 1000);
    }
    
    // 每秒更新
    update() {
        // 检查香是否烧完
        if (this.player.activeIncense && Date.now() > this.player.incenseEndTime) {
            this.player.activeIncense = null;
            console.log('香已烧完，请续香！');
        }
        
        // 自动保存（每5分钟）
        if (Date.now() % (5 * 60 * 1000) < 1000) {
            this.save();
        }
    }
    
    // 处理离线收益
    processOfflineReward() {
        const reward = this.PlayerData.calculateOfflineReward(this.player);
        if (reward.reward > 0) {
            this.player.money += reward.reward;
            console.log(`离线${reward.offlineHours}小时，获得${reward.reward}香火钱！`);
            if (reward.isFull) {
                console.log('存储已满，部分收益丢失！');
            }
        }
    }
    
    // ===== 供奉功能 =====
    worship(incenseType) {
        // 检查香
        if (!this.player.incense[incenseType] || this.player.incense[incenseType] <= 0) {
            return { success: false, message: '没有这种香了！' };
        }
        
        // 检查是否已有香在烧
        if (this.player.activeIncense) {
            return { success: false, message: '已有香在燃烧，请等待烧完！' };
        }
        
        // 消耗香
        this.player.incense[incenseType]--;
        this.player.activeIncense = incenseType;
        
        // 设置燃烧时间
        const incenseData = this.Phase1System.incenseTypes[incenseType];
        this.player.incenseEndTime = Date.now() + (incenseData.duration * 60 * 60 * 1000);
        
        this.player.totalIncenseBurned++;
        this.save();
        
        return {
            success: true,
            message: `供奉${incenseData.name}成功！持续${incenseData.duration}小时`,
            bonus: incenseData.bonus
        };
    }
    
    // ===== 化缘功能 =====
    alms(targetPlayerId) {
        // 检查次数
        if (this.player.totalAlmsDone >= 20) {
            return { success: false, message: '今日化缘次数已达上限！' };
        }
        
        // 计算收益（简化版）
        const temple = this.Phase1System.getTempleInfo(this.player.templeLevel);
        const baseReward = temple.hourlyOutput * 0.1; // 10%小时产出
        const bonus = this.player.activeIncense ? 0.1 : 0;
        const reward = Math.floor(baseReward * (1 + bonus));
        
        this.player.money += reward;
        this.player.totalAlmsDone++;
        this.player.merit += 5;
        this.player.fragments += (Math.random() < 0.1) ? 5 : 0; // 10%暴击
        
        this.save();
        
        return {
            success: true,
            message: `化缘成功！获得${reward}香火钱！`,
            reward: reward,
            merit: 5
        };
    }
    
    // ===== 庙宇升级 =====
    upgradeTemple() {
        const result = this.Phase1System.doUpgrade(this.player);
        if (result.success) {
            this.save();
        }
        return result;
    }
    
    // ===== 合成招财幡 =====
    synthesizeBanner() {
        const result = this.Phase1System.bannerSystem.synthesize(this.player);
        if (result.success) {
            this.save();
        }
        return result;
    }
    
    // ===== 进入财域 =====
    enterDomain(domainId) {
        if (!this.TwelveDomains.isDomainUnlocked(domainId, this.player.level)) {
            return { success: false, message: '等级不足，无法进入！' };
        }
        
        const domain = this.TwelveDomains.getDomainInfo(domainId);
        
        // 探索财域（简化版）
        const reward = this.exploreDomain(domain);
        
        return {
            success: true,
            domain: domain,
            reward: reward
        };
    }
    
    // 探索财域
    exploreDomain(domain) {
        // 基础收益
        const baseReward = 100 + (this.player.level * 10);
        
        // 风险系数
        const danger = domain.danger;
        const success = Math.random() > (danger * 0.1);
        
        if (!success) {
            // 失败损失
            const loss = Math.floor(baseReward * 0.2);
            this.player.money = Math.max(0, this.player.money - loss);
            return { success: false, loss: loss, message: '探索遇到危险！' };
        }
        
        // 成功收益
        const bonus = Math.random() * 0.5 + 0.5; // 0.5-1倍
        const reward = Math.floor(baseReward * bonus);
        this.player.money += reward;
        this.player.exp += 10;
        
        // 检查升级
        this.checkLevelUp();
        
        this.save();
        
        return { success: true, reward: reward, exp: 10 };
    }
    
    // 检查升级
    checkLevelUp() {
        while (this.LevelSystem.canLevelUp(this.player.exp, this.player.level)) {
            const result = this.LevelSystem.doLevelUp(this.player);
            console.log('升级！', result.message);
            
            // 检查阶段转换
            if (result.phaseChange) {
                this.player.phase = 2;
                console.log('进入第二阶段：十二财域！');
            }
        }
    }
    
    // 获取当前状态
    getStatus() {
        const temple = this.Phase1System.getTempleInfo(this.player.templeLevel);
        const form = this.LevelSystem.getCurrentForm(this.player.level);
        const availableDomains = this.TwelveDomains.getAvailableDomains(this.player.level);
        const nextUnlock = this.TwelveDomains.getNextUnlock(this.player.level);
        
        return {
            player: {
                name: this.player.name,
                level: this.player.level,
                exp: this.player.exp,
                expProgress: this.LevelSystem.getLevelProgress(this.player.exp, this.player.level),
                phase: this.player.phase
            },
            temple: {
                level: this.player.templeLevel,
                name: temple.name,
                form: form.name,
                hourlyOutput: temple.hourlyOutput
            },
            money: this.player.money,
            yuanbao: this.player.yuanbao,
            merit: this.player.merit,
            fragments: this.player.fragments,
            banners: this.player.banners,
            domains: {
                unlocked: availableDomains.length,
                list: availableDomains.map(d => d.name),
                next: nextUnlock ? `${nextUnlock.domain.name}（还需${nextUnlock.remain}级）` : '全部解锁'
            }
        };
    }
    
    // 保存
    save() {
        this.PlayerData.save(this.player);
    }
}

// 导出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GameController;
}