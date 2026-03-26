/**
 * 财神大陆 - 第二阶段：等级系统核心
 * 等级范围：1-99级
 * 第一阶段：1-5级（庙宇经营）
 * 第二阶段：6-99级（十二财域探险）
 */

// 等级系统配置
const LevelSystem = {
    // 等级范围
    MIN_LEVEL: 1,
    MAX_LEVEL: 99,
    PHASE1_MAX: 5,  // 第一阶段最高级
    PHASE2_START: 6, // 第二阶段开始
    
    // 经验值配置
    getRequiredExp: function(level) {
        if (level <= 5) {
            // 第一阶段：快速升级
            const expTable = [0, 0, 100, 300, 600, 1000];
            return expTable[level] || 1000;
        } else if (level <= 30) {
            // 早期：2-3天/级
            return 1000 + (level - 5) * 200;
        } else if (level <= 50) {
            // 中期：3-5天/级
            return 6000 + (level - 30) * 300;
        } else if (level <= 80) {
            // 后期：5-7天/级
            return 12000 + (level - 50) * 400;
        } else {
            // 顶级：7-10天/级
            return 24000 + (level - 80) * 500;
        }
    },
    
    // 获取升级进度
    getLevelProgress: function(currentExp, level) {
        const required = this.getRequiredExp(level);
        const prevRequired = this.getRequiredExp(level - 1);
        const levelExp = currentExp - prevRequired;
        const needExp = required - prevRequired;
        return {
            current: levelExp,
            need: needExp,
            percent: Math.min(100, Math.floor((levelExp / needExp) * 100))
        };
    },
    
    // 检查是否可升级
    canLevelUp: function(currentExp, level) {
        if (level >= this.MAX_LEVEL) return false;
        return currentExp >= this.getRequiredExp(level);
    },
    
    // 执行升级
    doLevelUp: function(player) {
        if (!this.canLevelUp(player.exp, player.level)) {
            return { success: false, message: '经验不足' };
        }
        
        player.level++;
        const oldLevel = player.level - 1;
        
        // 检查阶段转换
        if (oldLevel === 5 && player.level === 6) {
            return {
                success: true,
                levelUp: true,
                phaseChange: true,
                message: '恭喜突破！解锁十二财域！',
                unlocks: ['十二财域入口', '辰时·云海天市']
            };
        }
        
        // 检查形态变化
        const formChange = this.checkFormChange(player.level);
        
        return {
            success: true,
            levelUp: true,
            newLevel: player.level,
            formChange: formChange,
            message: `升级成功！达到${player.level}级`
        };
    },
    
    // 检查形态变化（财神像外观）
    checkFormChange: function(level) {
        const forms = {
            1: { name: '泥胎', desc: '破庙泥像，凡人起点' },
            3: { name: '木骨', desc: '泥胎开裂，露出木骨' },
            4: { name: '铜身', desc: '有人修缮，镀层铜' },
            5: { name: '金身', desc: '第一阶段巅峰，金漆加身' },
            20: { name: '法相', desc: '背后浮现财神虚影' },
            50: { name: '真身', desc: '本体与晶核完全融合' },
            80: { name: '财神天尊', desc: '头顶金轮，威压四方' },
            99: { name: '财源之主', desc: '周身环绕财源晶核碎片' }
        };
        return forms[level] || null;
    },
    
    // 获取当前形态
    getCurrentForm: function(level) {
        const forms = [1, 3, 4, 5, 20, 50, 80, 99];
        let currentForm = forms[0];
        for (let formLevel of forms) {
            if (level >= formLevel) {
                currentForm = formLevel;
            }
        }
        return this.checkFormChange(currentForm);
    },
    
    // 获取当前阶段
    getPhase: function(level) {
        if (level <= 5) return { phase: 1, name: '庙宇经营', maxLevel: 5 };
        return { phase: 2, name: '十二财域', maxLevel: 99 };
    }
};

// 导出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LevelSystem;
}