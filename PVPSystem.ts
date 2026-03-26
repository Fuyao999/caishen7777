import { _decorator, Component } from 'cc';
const { ccclass, property } = _decorator;

/**
 * 财神大陆 - PVP系统（完整版）
 * 竞技场 + 排位赛 + 世界BOSS + 荣誉系统
 */

@ccclass('PVPSystem')
export class PVPSystem extends Component {
    
    // ========== PVP模式配置 ==========
    pvpModes = {
        duel: {
            id: 'duel',
            name: '单挑',
            type: '1v1',
            rule: '3局2胜',
            reward: 100,      // 荣誉点
            unlockLevel: 41,
            description: '一对一决斗，三局两胜制'
        },
        team: {
            id: 'team',
            name: '组队战',
            type: '3v3',
            rule: '击杀对方全员获胜',
            reward: 300,
            unlockLevel: 41,
            description: '三人组队，团队协作击败对手'
        },
        royale: {
            id: 'royale',
            name: '乱斗',
            type: '6人混战',
            rule: '最后存活者胜',
            reward: 500,
            unlockLevel: 45,
            description: '六人混战，活到最后的才是赢家'
        },
        ranked: {
            id: 'ranked',
            name: '排位赛',
            type: 'ranked',
            rule: '积分制',
            reward: 'variable',  // 根据排名
            unlockLevel: 41,
            description: '天梯排位，提升段位获得丰厚奖励'
        }
    };
    
    // ========== 排位赛段位 ==========
    rankTiers = [
        { name: '青铜', subTiers: 3, pointsPerTier: 100, rewards: { honor: 50, items: ['青铜宝箱'] } },
        { name: '白银', subTiers: 3, pointsPerTier: 150, rewards: { honor: 100, items: ['白银宝箱'] } },
        { name: '黄金', subTiers: 4, pointsPerTier: 200, rewards: { honor: 200, items: ['黄金宝箱'] } },
        { name: '铂金', subTiers: 4, pointsPerTier: 250, rewards: { honor: 350, items: ['铂金宝箱'] } },
        { name: '钻石', subTiers: 5, pointsPerTier: 300, rewards: { honor: 500, items: ['钻石宝箱'] } },
        { name: '大师', subTiers: 1, pointsPerTier: 500, rewards: { honor: 800, items: ['大师宝箱', '专属外观'] } },
        { name: '王者', subTiers: 1, pointsPerTier: 0, rewards: { honor: 1500, items: ['王者宝箱', '专属称号', '专属坐骑'] } }
    ];
    
    // 玩家排位数据
    playerRanks: Map<string, any> = new Map();
    
    // ========== 世界BOSS ==========
    worldBoss = {
        name: '金乌之灵',
        level: 48,
        hp: 1000000,      // 100万血量（全服共享）
        currentHp: 1000000,
        attack: 500,
        defense: 200,
        respawnTime: 4 * 60 * 60 * 1000,  // 4小时
        lastKillTime: 0,
        status: 'alive',   // alive / dead / respawning
        damageRankings: [], // 伤害排行榜
        participants: new Map()  // playerId -> damage
    };
    
    // ========== 荣誉系统 ==========
    playerHonor: Map<string, number> = new Map();
    
    honorShop = {
        pvpWeapon: { name: '竞技之刃', cost: 5000, attack: 100, pvpBonus: 0.2 },
        pvpArmor: { name: '竞技护甲', cost: 4000, defense: 80, pvpBonus: 0.15 },
        pvpAccessory: { name: '竞技徽章', cost: 3000, critRate: 0.1, pvpBonus: 0.1 },
        mount: { name: '战马', cost: 10000, speed: 50 },
        appearance: { name: '战神外观', cost: 8000, type: 'skin' }
    };
    
    // ========== PVP战斗 ==========
    createPVPMatch(modeId: string, player1: string, player2: string): {
        matchId: string;
        mode: any;
        startTime: number;
    } {
        const mode = this.pvpModes[modeId];
        if (!mode) return null;
        
        return {
            matchId: this.generateId(),
            mode: mode,
            startTime: Date.now()
        };
    }
    
    // 计算PVP战斗结果
    calculatePVPResult(winner: string, loser: string, modeId: string): {
        winnerReward: number;
        loserReward: number;
        honorGain: number;
    } {
        const mode = this.pvpModes[modeId];
        if (!mode) return { winnerReward: 0, loserReward: 0, honorGain: 0 };
        
        const baseReward = mode.reward as number;
        
        return {
            winnerReward: baseReward,
            loserReward: Math.floor(baseReward * 0.3),
            honorGain: baseReward
        };
    }
    
    // ========== 排位赛系统 ==========
    getPlayerRank(playerId: string): any {
        if (!this.playerRanks.has(playerId)) {
            this.playerRanks.set(playerId, {
                playerId: playerId,
                tier: '青铜',
                subTier: 1,
                points: 0,
                totalGames: 0,
                wins: 0,
                winStreak: 0
            });
        }
        return this.playerRanks.get(playerId);
    }
    
    // 排位积分变化
    updateRankPoints(playerId: string, won: boolean): {
        oldRank: string;
        newRank: string;
        pointsChange: number;
        promoted: boolean;
    } {
        const rank = this.getPlayerRank(playerId);
        const oldRank = `${rank.tier} ${rank.subTier}`;
        
        // 基础积分
        let pointsChange = won ? 20 : -15;
        
        // 连胜加成
        if (won) {
            rank.winStreak++;
            if (rank.winStreak >= 3) {
                pointsChange += 5;  // 连胜+5
            }
        } else {
            rank.winStreak = 0;
        }
        
        rank.points += pointsChange;
        rank.totalGames++;
        if (won) rank.wins++;
        
        // 检查段位晋升
        let promoted = false;
        const currentTierIndex = this.rankTiers.findIndex(t => t.name === rank.tier);
        const currentTier = this.rankTiers[currentTierIndex];
        
        if (rank.points >= currentTier.pointsPerTier) {
            // 晋升
            if (rank.subTier < currentTier.subTiers) {
                rank.subTier++;
                rank.points = 0;
                promoted = true;
            } else if (currentTierIndex < this.rankTiers.length - 1) {
                // 晋升大段位
                const nextTier = this.rankTiers[currentTierIndex + 1];
                rank.tier = nextTier.name;
                rank.subTier = 1;
                rank.points = 0;
                promoted = true;
            }
        } else if (rank.points < 0 && rank.subTier > 1) {
            // 降级
            rank.subTier--;
            rank.points = Math.floor(currentTier.pointsPerTier * 0.5);
        }
        
        const newRank = `${rank.tier} ${rank.subTier}`;
        
        return { oldRank, newRank, pointsChange, promoted };
    }
    
    // 获取段位奖励
    getTierRewards(tierName: string): any {
        const tier = this.rankTiers.find(t => t.name === tierName);
        return tier ? tier.rewards : null;
    }
    
    // ========== 世界BOSS系统 ==========
    spawnWorldBoss(): void {
        this.worldBoss.currentHp = this.worldBoss.hp;
        this.worldBoss.status = 'alive';
        this.worldBoss.damageRankings = [];
        this.worldBoss.participants.clear();
        console.log(`世界BOSS ${this.worldBoss.name} 已刷新！`);
    }
    
    // 玩家攻击世界BOSS
    attackWorldBoss(playerId: string, damage: number): {
        success: boolean;
        currentHp: number;
        rank: number;
        message: string;
    } {
        if (this.worldBoss.status !== 'alive') {
            return { success: false, currentHp: 0, rank: 0, message: 'BOSS已被击败' };
        }
        
        // 记录伤害
        const currentDamage = this.worldBoss.participants.get(playerId) || 0;
        this.worldBoss.participants.set(playerId, currentDamage + damage);
        
        // 扣除血量
        this.worldBoss.currentHp -= damage;
        
        // 更新排行榜
        this.updateBossRankings();
        
        // 检查击杀
        if (this.worldBoss.currentHp <= 0) {
            this.killWorldBoss();
        }
        
        const rank = this.getBossRank(playerId);
        
        return {
            success: true,
            currentHp: Math.max(0, this.worldBoss.currentHp),
            rank: rank,
            message: `造成${damage}点伤害！当前排名：第${rank}名`
        };
    }
    
    // 更新BOSS排行榜
    updateBossRankings(): void {
        this.worldBoss.damageRankings = Array.from(this.worldBoss.participants.entries())
            .sort((a, b) => b[1] - a[1])
            .slice(0, 100)  // 前100名
            .map(([playerId, damage], index) => ({
                rank: index + 1,
                playerId: playerId,
                damage: damage,
                percentage: (damage / this.worldBoss.hp * 100).toFixed(2)
            }));
    }
    
    // 获取玩家BOSS排名
    getBossRank(playerId: string): number {
        const ranking = this.worldBoss.damageRankings.find(r => r.playerId === playerId);
        return ranking ? ranking.rank : 0;
    }
    
    // BOSS被击杀
    killWorldBoss(): void {
        this.worldBoss.status = 'dead';
        this.worldBoss.lastKillTime = Date.now();
        
        console.log(`世界BOSS ${this.worldBoss.name} 被击败！`);
        
        // 发放奖励
        this.distributeBossRewards();
    }
    
    // 发放BOSS奖励
    distributeBossRewards(): void {
        for (const ranking of this.worldBoss.damageRankings) {
            let reward = {};
            
            if (ranking.rank === 1) {
                reward = { honor: 1000, item: '传说宝箱', title: '金乌猎手' };
            } else if (ranking.rank <= 3) {
                reward = { honor: 800, item: '史诗宝箱' };
            } else if (ranking.rank <= 10) {
                reward = { honor: 600, item: '稀有宝箱' };
            } else if (ranking.rank <= 50) {
                reward = { honor: 400, item: '精良宝箱' };
            } else {
                reward = { honor: 200, item: '普通宝箱' };
            }
            
            // 实际应发放给玩家
            console.log(`玩家${ranking.playerId} 获得奖励：`, reward);
        }
    }
    
    // 检查BOSS刷新
    checkBossRespawn(): void {
        if (this.worldBoss.status === 'dead') {
            const timeSinceDeath = Date.now() - this.worldBoss.lastKillTime;
            if (timeSinceDeath >= this.worldBoss.respawnTime) {
                this.spawnWorldBoss();
            }
        }
    }
    
    // ========== 荣誉商店 ==========
    buyHonorItem(playerId: string, itemId: string): {
        success: boolean;
        cost: number;
        item: any;
        message: string;
    } {
        const item = this.honorShop[itemId];
        if (!item) {
            return { success: false, cost: 0, item: null, message: '商品不存在' };
        }
        
        const currentHonor = this.playerHonor.get(playerId) || 0;
        if (currentHonor < item.cost) {
            return { success: false, cost: 0, item: null, message: '荣誉点不足' };
        }
        
        // 扣除荣誉点
        this.playerHonor.set(playerId, currentHonor - item.cost);
        
        return {
            success: true,
            cost: item.cost,
            item: item,
            message: `购买成功！获得${item.name}`
        };
    }
    
    // 添加荣誉点
    addHonor(playerId: string, amount: number): void {
        const current = this.playerHonor.get(playerId) || 0;
        this.playerHonor.set(playerId, current + amount);
    }
    
    // ========== 时辰加成 ==========
    getHourlyBonus(playerHour: string): { pvpDamage: number; honorGain: number } {
        if (playerHour === '午时') {
            return { pvpDamage: 1.15, honorGain: 1.3 };
        } else if (playerHour === '巳时' || playerHour === '未时') {
            return { pvpDamage: 1.08, honorGain: 1.1 };
        }
        return { pvpDamage: 1.0, honorGain: 1.0 };
    }
    
    // 生成ID
    generateId(): string {
        return 'pvp_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
    
    onLoad() {
        this.spawnWorldBoss();
        console.log('PVPSystem 加载完成');
        console.log('PVP模式:', Object.keys(this.pvpModes).length);
        console.log('排位段位:', this.rankTiers.length);
    }
}