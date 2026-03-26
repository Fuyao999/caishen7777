import { _decorator, Component } from 'cc';
const { ccclass, property } = _decorator;

/**
 * 财神大陆 - 死亡重生系统（完整版）
 * 战斗死亡惩罚、复活机制、损失计算
 * 解锁：Lv.61+ 申时·雷鸣裂谷
 */

@ccclass('DeathRebirthSystem')
export class DeathRebirthSystem extends Component {
    
    // 死亡惩罚配置
    deathConfig = {
        // 修为损失比例
        expLossPercent: 0.10,  // 10%
        
        // 金钱损失（可选项）
        moneyLossPercent: 0.05,  // 身上香火钱损失5%（厢房安全）
        
        // 装备耐久损失
        durabilityLoss: 5,  // 装备耐久-5
        
        // 复活方式
        rebirthTypes: {
            temple: {
                name: '庙宇复活',
                cost: 0,
                location: 'temple',
                hpPercent: 0.5,  // 50%血量
                penalty: 'full'  // 全额惩罚
            },
            local: {
                name: '原地复活',
                cost: 100,  // 元宝
                location: 'local',
                hpPercent: 0.3,  // 30%血量
                penalty: 'half'  // 减半惩罚
            },
            item: {
                name: '复活丹复活',
                cost: 0,
                itemId: 'rebirth_pill',
                location: 'local',
                hpPercent: 0.8,  // 80%血量
                penalty: 'none'  // 无惩罚
            }
        },
        
        // 复活保护时间（防止无限复活死循环）
        protectionTime: 30000,  // 30秒内不会连续死亡惩罚
        
        // 死亡标记持续时间
        deathMarkDuration: 600000  // 10分钟死亡标记
    };
    
    // 玩家死亡数据
    playerDeathData: Map<string, any> = new Map();
    
    onLoad() {
        console.log('DeathRebirthSystem 加载完成');
        console.log('修为损失:', this.deathConfig.expLossPercent * 100 + '%');
    }
    
    // 初始化玩家死亡数据
    initPlayerDeathData(playerId: string): void {
        if (!this.playerDeathData.has(playerId)) {
            this.playerDeathData.set(playerId, {
                playerId: playerId,
                totalDeaths: 0,
                todayDeaths: 0,
                lastDeathDate: new Date().toDateString(),
                lastDeathTime: 0,
                isDead: false,
                deathMarkEndTime: 0,
                deathLog: []
            });
        }
    }
    
    // 处理死亡
    handleDeath(playerId: string, playerData: any, killer: string = 'unknown'): {
        isDead: boolean;
        message: string;
        losses: any;
    } {
        this.initPlayerDeathData(playerId);
        const deathData = this.playerDeathData.get(playerId);
        
        // 检查复活保护
        const now = Date.now();
        if (now - deathData.lastDeathTime < this.deathConfig.protectionTime) {
            return { isDead: false, message: '复活保护中', losses: null };
        }
        
        // 标记死亡状态
        deathData.isDead = true;
        deathData.totalDeaths++;
        deathData.lastDeathTime = now;
        deathData.deathMarkEndTime = now + this.deathConfig.deathMarkDuration;
        
        // 重置每日死亡计数
        const today = new Date().toDateString();
        if (deathData.lastDeathDate !== today) {
            deathData.todayDeaths = 0;
            deathData.lastDeathDate = today;
        }
        deathData.todayDeaths++;
        
        // 计算损失（这里先计算，实际扣除在复活时根据复活方式决定）
        const expLoss = Math.floor(playerData.exp * this.deathConfig.expLossPercent);
        const moneyLoss = Math.floor((playerData.money || 0) * this.deathConfig.moneyLossPercent);
        
        // 记录死亡日志
        const deathRecord = {
            time: now,
            location: playerData.currentDomain || '未知',
            killer: killer,
            level: playerData.level,
            potentialExpLoss: expLoss,
            potentialMoneyLoss: moneyLoss
        };
        deathData.deathLog.push(deathRecord);
        if (deathData.deathLog.length > 20) deathData.deathLog.shift();
        
        return {
            isDead: true,
            message: `你已被${killer}击败！请选择复活方式`,
            losses: {
                exp: expLoss,
                money: moneyLoss,
                durability: this.deathConfig.durabilityLoss
            }
        };
    }
    
    // 复活
    rebirth(playerId: string, rebirthType: string, playerData: any, inventory: any): {
        success: boolean;
        actualLosses: any;
        rebirthLocation: string;
        message: string;
    } {
        const deathData = this.playerDeathData.get(playerId);
        if (!deathData || !deathData.isDead) {
            return { success: false, actualLosses: null, rebirthLocation: '', message: '未处于死亡状态' };
        }
        
        const config = this.deathConfig.rebirthTypes[rebirthType];
        if (!config) {
            return { success: false, actualLosses: null, rebirthLocation: '', message: '复活方式不存在' };
        }
        
        // 检查复活丹
        if (rebirthType === 'item') {
            const hasItem = inventory && inventory.hasItem && inventory.hasItem(config.itemId);
            if (!hasItem) {
                return { success: false, actualLosses: null, rebirthLocation: '', message: '没有复活丹' };
            }
            // 消耗复活丹
            if (inventory.removeItem) {
                inventory.removeItem(config.itemId, 1);
            }
        }
        
        // 计算实际损失
        let actualExpLoss = 0;
        let actualMoneyLoss = 0;
        
        if (config.penalty === 'full') {
            actualExpLoss = Math.floor(playerData.exp * this.deathConfig.expLossPercent);
            actualMoneyLoss = Math.floor((playerData.money || 0) * this.deathConfig.moneyLossPercent);
        } else if (config.penalty === 'half') {
            actualExpLoss = Math.floor(playerData.exp * this.deathConfig.expLossPercent * 0.5);
            actualMoneyLoss = Math.floor((playerData.money || 0) * this.deathConfig.moneyLossPercent * 0.5);
        } else if (config.penalty === 'none') {
            actualExpLoss = 0;
            actualMoneyLoss = 0;
        }
        
        // 应用损失
        if (actualExpLoss > 0) {
            playerData.exp = Math.max(0, playerData.exp - actualExpLoss);
        }
        if (actualMoneyLoss > 0) {
            playerData.money = Math.max(0, (playerData.money || 0) - actualMoneyLoss);
        }
        
        // 恢复血量
        playerData.currentHp = Math.floor(playerData.maxHp * config.hpPercent);
        
        // 清除死亡状态
        deathData.isDead = false;
        
        // 更新死亡记录
        const lastRecord = deathData.deathLog[deathData.deathLog.length - 1];
        if (lastRecord) {
            lastRecord.rebirthType = rebirthType;
            lastRecord.actualExpLoss = actualExpLoss;
            lastRecord.actualMoneyLoss = actualMoneyLoss;
        }
        
        return {
            success: true,
            actualLosses: {
                exp: actualExpLoss,
                money: actualMoneyLoss,
                durability: this.deathConfig.durabilityLoss
            },
            rebirthLocation: config.location,
            message: `${config.name}成功！血量恢复${config.hpPercent * 100}%`
        };
    }
    
    // 检查是否处于死亡状态
    isDead(playerId: string): boolean {
        this.initPlayerDeathData(playerId);
        return this.playerDeathData.get(playerId).isDead;
    }
    
    // 检查是否有死亡标记（战斗惩罚）
    hasDeathMark(playerId: string): boolean {
        this.initPlayerDeathData(playerId);
        const deathData = this.playerDeathData.get(playerId);
        return Date.now() < deathData.deathMarkEndTime;
    }
    
    // 获取死亡标记剩余时间
    getDeathMarkRemaining(playerId: string): number {
        this.initPlayerDeathData(playerId);
        const deathData = this.playerDeathData.get(playerId);
        const remaining = deathData.deathMarkEndTime - Date.now();
        return Math.max(0, remaining);
    }
    
    // 获取死亡统计
    getDeathStats(playerId: string): any {
        this.initPlayerDeathData(playerId);
        const deathData = this.playerDeathData.get(playerId);
        
        return {
            totalDeaths: deathData.totalDeaths,
            todayDeaths: deathData.todayDeaths,
            isDead: deathData.isDead,
            hasDeathMark: this.hasDeathMark(playerId),
            deathMarkRemaining: this.getDeathMarkRemaining(playerId),
            recentDeaths: deathData.deathLog.slice(-5)
        };
    }
    
    // 获取复活选项
    getRebirthOptions(playerId: string, hasRebirthPill: boolean): any[] {
        const options = [];
        
        // 庙宇复活（永远可用）
        options.push({
            id: 'temple',
            name: '庙宇复活',
            cost: 0,
            costType: 'free',
            hpPercent: 50,
            penalty: '损失10%修为+5%金钱',
            available: true
        });
        
        // 原地复活（需要元宝）
        options.push({
            id: 'local',
            name: '原地复活',
            cost: 100,
            costType: 'yuanbao',
            hpPercent: 30,
            penalty: '损失减半（5%修为+2.5%金钱）',
            available: true
        });
        
        // 复活丹复活
        options.push({
            id: 'item',
            name: '复活丹复活',
            cost: 1,
            costType: 'item',
            itemId: 'rebirth_pill',
            hpPercent: 80,
            penalty: '无损失',
            available: hasRebirthPill
        });
        
        return options;
    }
}