import { _decorator, Component } from 'cc';
const { ccclass, property } = _decorator;

/**
 * 财神大陆 - 数值平衡系统（完整版）
 * 升级曲线/战斗数值/经济平衡调优
 */

@ccclass('BalanceSystem')
export class BalanceSystem extends Component {
    
    // ========== 升级曲线调优 ==========
    levelBalance = {
        // 总升级时间目标：1-2个月（休闲）到2-3周（肝帝）
        targetDays: {
            casual: 45,      // 休闲玩家45天满级
            normal: 30,      // 普通玩家30天满级
            hardcore: 14     // 肝帝14天满级
        },
        
        // 每日经验获取量（调优后）
        dailyExpSources: {
            incense: { min: 500, max: 2000 },      // 供奉收益
            domain: { min: 1000, max: 5000 },      // 财域探索
            tasks: { min: 300, max: 1000 },        // 任务奖励
            pvp: { min: 200, max: 800 },           // PVP奖励
            events: { min: 100, max: 500 }         // 活动奖励
        },
        
        // 升级曲线系数（减缓后期增速）
        curveFactor: 1.15  // 每级经验 = 上级 * 1.15
    };
    
    // 计算优化后的升级经验表
    generateOptimizedExpTable(): Map<number, number> {
        const table = new Map();
        let baseExp = 100;
        
        for (let level = 1; level <= 99; level++) {
            if (level === 1) {
                table.set(level, 0);
            } else if (level <= 10) {
                // 前期快速升级
                table.set(level, Math.floor(baseExp * Math.pow(1.1, level - 2)));
            } else if (level <= 30) {
                // 中期正常增速
                table.set(level, Math.floor(baseExp * Math.pow(1.15, level - 2)));
            } else if (level <= 60) {
                // 后期放缓
                table.set(level, Math.floor(baseExp * Math.pow(1.18, level - 2)));
            } else {
                // 满级前最慢
                table.set(level, Math.floor(baseExp * Math.pow(1.2, level - 2)));
            }
        }
        
        return table;
    }
    
    // 计算预计升级时间
    calculateLevelUpTime(currentLevel: number, playStyle: string = 'normal'): {
        estimatedHours: number;
        estimatedDays: number;
    } {
        const expTable = this.generateOptimizedExpTable();
        const currentLevelExp = expTable.get(currentLevel) || 0;
        const nextLevelExp = expTable.get(currentLevel + 1) || 0;
        const neededExp = nextLevelExp - currentLevelExp;
        
        // 根据游戏风格计算每日经验
        const dailyExp = this.getDailyExpByStyle(playStyle);
        
        const days = Math.ceil(neededExp / dailyExp);
        const hours = days * 3;  // 假设每天玩3小时
        
        return { estimatedHours: hours, estimatedDays: days };
    }
    
    // 根据风格获取每日经验
    getDailyExpByStyle(style: string): number {
        const sources = this.levelBalance.dailyExpSources;
        let multiplier = 1;
        
        switch (style) {
            case 'casual': multiplier = 0.6; break;
            case 'hardcore': multiplier = 2; break;
            default: multiplier = 1;
        }
        
        const dailyTotal = 
            (sources.incense.max + sources.domain.max + 
             sources.tasks.max + sources.pvp.max + sources.events.max) * multiplier;
        
        return Math.floor(dailyTotal);
    }
    
    // ========== 战斗数值平衡 ==========
    combatBalance = {
        // 战斗时长目标
        targetBattleTime: {
            normal: 30,      // 普通战斗30秒
            elite: 60,       // 精英60秒
            boss: 120        // BOSS 2分钟
        },
        
        // 伤害系数
        damageFactors: {
            playerBase: 10,
            enemyBase: 8,
            critMultiplier: 1.5,
            defenseEfficiency: 0.5
        },
        
        // 数值压缩（防止膨胀）
        statCompression: {
            enabled: true,
            maxDisplayValue: 1000000,  // 最大显示值100万
            compressionRate: 0.1       // 超过后压缩率
        }
    };
    
    // 平衡检查：玩家vs敌人
    checkCombatBalance(player: any, enemy: any): {
        balanced: boolean;
        issues: string[];
        suggestions: string[];
    } {
        const issues = [];
        const suggestions = [];
        
        // 检查攻击力差距
        const powerDiff = Math.abs(player.attack - enemy.attack) / Math.max(player.attack, enemy.attack);
        if (powerDiff > 0.5) {
            issues.push('攻击力差距过大');
            suggestions.push('调整敌人攻击力至玩家±30%范围内');
        }
        
        // 检查生命值
        const hpRatio = player.maxHp / enemy.maxHp;
        if (hpRatio < 0.5 || hpRatio > 2) {
            issues.push('生命值比例失衡');
            suggestions.push('调整HP比例至1:1.5范围内');
        }
        
        // 预估战斗时长
        const estimatedTurns = this.estimateBattleTurns(player, enemy);
        if (estimatedTurns < 5) {
            issues.push('战斗过快');
            suggestions.push('增加敌人HP或降低玩家伤害');
        } else if (estimatedTurns > 50) {
            issues.push('战斗过慢');
            suggestions.push('降低敌人防御或增加玩家伤害');
        }
        
        return {
            balanced: issues.length === 0,
            issues: issues,
            suggestions: suggestions
        };
    }
    
    // 预估战斗回合数
    estimateBattleTurns(player: any, enemy: any): number {
        const playerDmg = Math.max(1, player.attack - enemy.defense * 0.5);
        const enemyDmg = Math.max(1, enemy.attack - player.defense * 0.5);
        
        const turnsToKillEnemy = Math.ceil(enemy.maxHp / playerDmg);
        const turnsToKillPlayer = Math.ceil(player.maxHp / enemyDmg);
        
        return Math.min(turnsToKillEnemy, turnsToKillPlayer);
    }
    
    // 数值压缩（防止数值膨胀）
    compressValue(value: number): number {
        const config = this.combatBalance.statCompression;
        
        if (!config.enabled || value <= config.maxDisplayValue) {
            return value;
        }
        
        const excess = value - config.maxDisplayValue;
        const compressed = config.maxDisplayValue + (excess * config.compressionRate);
        
        return Math.floor(compressed);
    }
    
    // ========== 经济平衡 ==========
    economyBalance = {
        // 货币获取/消耗比例
        moneyFlow: {
            dailyIncome: { min: 1000, max: 5000 },
            dailyExpense: { min: 500, max: 3000 },
            inflationControl: 0.05  // 每日通胀率控制
        },
        
        // 物品定价基准
        pricing: {
            commonItem: 100,
            rareItem: 500,
            epicItem: 2000,
            legendaryItem: 10000,
            artifactItem: 50000
        },
        
        // 交易税率
        taxRates: {
            stall: 0.05,      // 摆摊5%
            auction: 0.10,    // 拍卖10%
            chenHourDiscount: 1.0  // 辰时免税
        }
    };
    
    // 检查经济平衡
    checkEconomyBalance(playerMoney: number, serverTotalMoney: number): {
        healthy: boolean;
        inflationRate: number;
        suggestions: string[];
    } {
        const suggestions = [];
        
        // 计算通胀率（简化）
        const inflationRate = (serverTotalMoney / 1000000000) * 0.01;  // 假设基准10亿
        
        if (inflationRate > 0.1) {
            suggestions.push('通胀过高：增加货币回收途径（如高级消耗品）');
            suggestions.push('提高交易税率');
        } else if (inflationRate < 0.01) {
            suggestions.push('通缩风险：增加货币产出活动');
        }
        
        return {
            healthy: inflationRate <= 0.1 && inflationRate >= 0.01,
            inflationRate: inflationRate,
            suggestions: suggestions
        };
    }
    
    // 动态调整物价
    adjustPrices(basePrice: number, demand: number, supply: number): number {
        const ratio = demand / Math.max(supply, 1);
        let multiplier = 1;
        
        if (ratio > 2) {
            multiplier = 1.5;  // 供不应求，涨价
        } else if (ratio < 0.5) {
            multiplier = 0.8;  // 供过于求，降价
        }
        
        return Math.floor(basePrice * multiplier);
    }
    
    // ========== 平衡报告 ==========
    generateBalanceReport(): string {
        const report = [];
        
        report.push('=== 财神大陆数值平衡报告 ===');
        report.push('');
        
        // 升级曲线
        report.push('【升级曲线】');
        for (const [style, days] of Object.entries(this.levelBalance.targetDays)) {
            report.push(`- ${style}: 目标${days}天满级`);
        }
        report.push('');
        
        // 每日经验来源
        report.push('【每日经验来源】');
        for (const [source, range] of Object.entries(this.levelBalance.dailyExpSources)) {
            report.push(`- ${source}: ${range.min}-${range.max}`);
        }
        report.push('');
        
        // 战斗平衡
        report.push('【战斗时长目标】');
        for (const [type, seconds] of Object.entries(this.combatBalance.targetBattleTime)) {
            report.push(`- ${type}: ${seconds}秒`);
        }
        report.push('');
        
        // 经济
        report.push('【经济参数】');
        report.push(`- 摆摊税率: ${this.economyBalance.taxRates.stall * 100}%`);
        report.push(`- 拍卖税率: ${this.economyBalance.taxRates.auction * 100}%`);
        report.push(`- 通胀控制: ${this.economyBalance.moneyFlow.inflationControl * 100}%/日`);
        
        return report.join('\n');
    }
    
    onLoad() {
        console.log('BalanceSystem 加载完成');
        console.log(this.generateBalanceReport());
    }
}