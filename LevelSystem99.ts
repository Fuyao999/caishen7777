import { _decorator, Component, Node, Label, director } from 'cc';
const { ccclass, property } = _decorator;

/**
 * 财神大陆 - 6-99级等级系统（完整版）
 * 九重天境界 + 形态变化 + 经验值表
 */

@ccclass('LevelSystem99')
export class LevelSystem99 extends Component {
    
    // 玩家数据
    playerLevel: number = 6;  // 从6级开始
    playerExp: number = 0;
    playerRealm: string = '炼气期';  // 当前境界
    playerForm: string = '金身';  // 当前形态（从5级金身继续）
    
    // 九重天境界配置
    realms = {
        '炼气期': { min: 6, max: 15, next: '筑基期' },
        '筑基期': { min: 16, max: 30, next: '结丹期' },
        '结丹期': { min: 31, max: 40, next: '元婴期' },
        '元婴期': { min: 41, max: 50, next: '化神期' },
        '化神期': { min: 51, max: 60, next: '炼虚期' },
        '炼虚期': { min: 61, max: 70, next: '合体期' },
        '合体期': { min: 71, max: 80, next: '大乘期' },
        '大乘期': { min: 81, max: 90, next: '渡劫期' },
        '渡劫期': { min: 91, max: 99, next: null }
    };
    
    // 形态变化配置
    forms = {
        1: { name: '泥胎', desc: '破庙泥像，凡人起点' },
        3: { name: '木骨', desc: '泥胎开裂，露出木骨' },
        4: { name: '铜身', desc: '有人修缮，镀层铜' },
        5: { name: '金身', desc: '第一阶段巅峰，金漆加身' },
        20: { name: '法相', desc: '背后浮现财神虚影' },
        50: { name: '真身', desc: '本体与晶核完全融合' },
        80: { name: '财神天尊', desc: '头顶金轮，威压四方' },
        99: { name: '财源之主', desc: '周身环绕财源晶核碎片' }
    };
    
    // 经验值表（完整1-99级）
    getRequiredExp(level: number): number {
        if (level <= 5) {
            // 第一阶段（保留兼容）
            const expTable = [0, 0, 100, 300, 600, 1000];
            return expTable[level] || 1000;
        }
        
        // 第二阶段 6-99级
        if (level <= 15) {
            // 炼气期：快速升级（2-3天/级）
            return 1000 + (level - 5) * 200;
        } else if (level <= 30) {
            // 筑基期：早期（2-3天/级）
            return 3000 + (level - 15) * 400;
        } else if (level <= 40) {
            // 结丹期：中期（3-5天/级）
            return 9000 + (level - 30) * 600;
        } else if (level <= 50) {
            // 元婴期：后期（3-5天/级）
            return 15000 + (level - 40) * 800;
        } else if (level <= 60) {
            // 化神期：后期（5-7天/级）
            return 23000 + (level - 50) * 1000;
        } else if (level <= 70) {
            // 炼虚期：顶级（5-7天/级）
            return 33000 + (level - 60) * 1200;
        } else if (level <= 80) {
            // 合体期：顶级（5-7天/级）
            return 45000 + (level - 70) * 1400;
        } else if (level <= 90) {
            // 大乘期：顶级（7-10天/级）
            return 59000 + (level - 80) * 1600;
        } else {
            // 渡劫期：终极（7-10天/级）
            return 75000 + (level - 90) * 2000;
        }
    }
    
    // 获取升级进度
    getLevelProgress(): { current: number; need: number; percent: number } {
        const required = this.getRequiredExp(this.playerLevel);
        const prevRequired = this.getRequiredExp(this.playerLevel - 1);
        const levelExp = this.playerExp - prevRequired;
        const needExp = required - prevRequired;
        
        return {
            current: levelExp,
            need: needExp,
            percent: Math.min(100, Math.floor((levelExp / needExp) * 100))
        };
    }
    
    // 检查是否可升级
    canLevelUp(): boolean {
        if (this.playerLevel >= 99) return false;
        return this.playerExp >= this.getRequiredExp(this.playerLevel);
    }
    
    // 执行升级
    doLevelUp(): { success: boolean; levelUp: boolean; realmChange?: boolean; formChange?: boolean; newForm?: string; message: string } {
        if (!this.canLevelUp()) {
            return { success: false, levelUp: false, message: '经验不足，无法升级' };
        }
        
        const oldLevel = this.playerLevel;
        const oldRealm = this.playerRealm;
        
        this.playerLevel++;
        
        // 检查境界变化
        const realmData = this.realms[this.playerRealm];
        if (realmData && this.playerLevel > realmData.max) {
            this.playerRealm = realmData.next;
            return {
                success: true,
                levelUp: true,
                realmChange: true,
                message: `恭喜突破！达到${this.playerLevel}级，晋升${this.playerRealm}！`
            };
        }
        
        // 检查形态变化
        const newForm = this.forms[this.playerLevel];
        if (newForm) {
            this.playerForm = newForm.name;
            return {
                success: true,
                levelUp: true,
                formChange: true,
                newForm: newForm.name,
                message: `恭喜升级！达到${this.playerLevel}级，形态晋升为${newForm.name}！`
            };
        }
        
        return {
            success: true,
            levelUp: true,
            message: `恭喜升级！达到${this.playerLevel}级！`
        };
    }
    
    // 获取当前境界信息
    getCurrentRealm(): { name: string; min: number; max: number; progress: string } {
        const realm = this.realms[this.playerRealm];
        return {
            name: this.playerRealm,
            min: realm.min,
            max: realm.max,
            progress: `${this.playerLevel - realm.min + 1}/${realm.max - realm.min + 1}`
        };
    }
    
    // 获取当前形态
    getCurrentForm(): { name: string; desc: string } {
        const formLevels = Object.keys(this.forms).map(Number).sort((a, b) => b - a);
        for (const level of formLevels) {
            if (this.playerLevel >= level) {
                return this.forms[level];
            }
        }
        return { name: '未知', desc: '' };
    }
    
    // 获取升级预估时间（基于平均每天获得经验）
    getLevelUpEstimate(dailyExp: number = 500): string {
        const required = this.getRequiredExp(this.playerLevel);
        const need = required - this.playerExp;
        const days = Math.ceil(need / dailyExp);
        
        if (days <= 1) return '约1天';
        if (days <= 3) return `约${days}天`;
        if (days <= 7) return `约${Math.ceil(days / 2)}天（勤奋修炼）`;
        return `约${Math.ceil(days / 3)}天（需努力）`;
    }
    
    // 添加经验
    addExp(amount: number): { leveledUp: boolean; messages: string[] } {
        this.playerExp += amount;
        const messages = [];
        let leveledUp = false;
        
        // 检查连续升级
        while (this.canLevelUp()) {
            const result = this.doLevelUp();
            if (result.success) {
                messages.push(result.message);
                leveledUp = true;
            }
        }
        
        return { leveledUp, messages };
    }
    
    onLoad() {
        console.log('LevelSystem99 加载完成');
        console.log('当前等级:', this.playerLevel);
        console.log('当前境界:', this.playerRealm);
        console.log('当前形态:', this.playerForm);
        console.log('升级所需经验:', this.getRequiredExp(this.playerLevel));
    }
}