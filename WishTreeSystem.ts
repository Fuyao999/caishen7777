import { _decorator, Component } from 'cc';
const { ccclass, property } = _decorator;

/**
 * 财神大陆 - 许愿树系统（完整版）
 * 每日抽奖 + 祈福 + 限定奖励
 */

@ccclass('WishTreeSystem')
export class WishTreeSystem extends Component {
    
    // 抽奖类型
    drawTypes = {
        free: {
            name: '免费许愿',
            cost: 0,
            dailyLimit: 1,
            rewards: [
                { item: '香火钱', amount: 100, weight: 40 },
                { item: '碎片', amount: 3, weight: 30 },
                { item: '普通香', amount: 1, weight: 20 },
                { item: '功德', amount: 5, weight: 10 }
            ]
        },
        normal: {
            name: '普通许愿',
            cost: 100,  // 香火钱
            dailyLimit: 10,
            rewards: [
                { item: '香火钱', amount: 200, weight: 30 },
                { item: '碎片', amount: 5, weight: 25 },
                { item: '高级香', amount: 1, weight: 20 },
                { item: '招财幡', amount: 1, weight: 15 },
                { item: '功德', amount: 10, weight: 10 }
            ]
        },
        advanced: {
            name: '高级许愿',
            cost: 10,   // 元宝
            dailyLimit: 5,
            rewards: [
                { item: '香火钱', amount: 1000, weight: 25 },
                { item: '碎片', amount: 20, weight: 20 },
                { item: '极品香', amount: 1, weight: 20 },
                { item: '传说装备箱', amount: 1, weight: 15 },
                { item: '坐骑碎片', amount: 1, weight: 15 },
                { item: '财神令', amount: 1, weight: 5 }
            ]
        },
        lucky: {
            name: '财神降临',
            cost: 60,   // 元宝
            dailyLimit: 999,
            guaranteed: { draws: 10, reward: '稀有以上' },
            rewards: [
                { item: '香火钱', amount: 5000, weight: 20 },
                { item: '元宝', amount: 100, weight: 15 },
                { item: '传说装备', amount: 1, weight: 15 },
                { item: '稀有坐骑', amount: 1, weight: 10 },
                { item: '财神印', amount: 1, weight: 5 },
                { item: '财源印碎片', amount: 1, weight: 1 }
            ]
        }
    };
    
    // 累计祈福奖励
    cumulativeRewards = {
        7: { name: '七日祈福', reward: { item: '高级许愿券', amount: 1 } },
        30: { name: '月度祈福', reward: { item: '极品装备箱', amount: 1 } },
        100: { name: '百日祈福', reward: { item: '传说坐骑', amount: 1 } },
        365: { name: '年度祈福', reward: { item: '财神专属外观', amount: 1 } }
    };
    
    // 玩家每日数据
    playerDailyData: Map<string, any> = new Map();
    
    // 初始化玩家数据
    initPlayer(playerId: string): void {
        if (!this.playerDailyData.has(playerId)) {
            this.playerDailyData.set(playerId, {
                draws: { free: 0, normal: 0, advanced: 0, lucky: 0 },
                totalDraws: 0,
                lastDrawDate: new Date().toDateString()
            });
        }
    }
    
    // 检查并重置每日次数
    checkDailyReset(playerId: string): void {
        const data = this.playerDailyData.get(playerId);
        if (!data) return;
        
        const today = new Date().toDateString();
        if (data.lastDrawDate !== today) {
            // 重置
            data.draws = { free: 0, normal: 0, advanced: 0, lucky: 0 };
            data.lastDrawDate = today;
        }
    }
    
    // 许愿抽奖
    draw(playerId: string, drawType: string, playerCurrency: any): {
        success: boolean;
        reward: any;
        remaining: number;
        message: string;
    } {
        this.initPlayer(playerId);
        this.checkDailyReset(playerId);
        
        const data = this.playerDailyData.get(playerId);
        const config = this.drawTypes[drawType];
        
        if (!config) {
            return { success: false, reward: null, remaining: 0, message: '许愿类型不存在' };
        }
        
        // 检查次数
        if (data.draws[drawType] >= config.dailyLimit) {
            return { success: false, reward: null, remaining: 0, message: '今日次数已用完' };
        }
        
        // 检查货币
        if (config.cost > 0) {
            if (drawType === 'normal' || drawType === 'free') {
                if (playerCurrency.money < config.cost) {
                    return { success: false, reward: null, remaining: 0, message: '香火钱不足' };
                }
                playerCurrency.money -= config.cost;
            } else {
                if (playerCurrency.yuanbao < config.cost) {
                    return { success: false, reward: null, remaining: 0, message: '元宝不足' };
                }
                playerCurrency.yuanbao -= config.cost;
            }
        }
        
        // 抽奖
        const reward = this.calculateReward(config.rewards);
        
        // 记录
        data.draws[drawType]++;
        data.totalDraws++;
        
        const remaining = config.dailyLimit - data.draws[drawType];
        
        return {
            success: true,
            reward: reward,
            remaining: remaining,
            message: `许愿成功！获得${reward.item}×${reward.amount}`
        };
    }
    
    // 计算奖励（加权随机）
    calculateReward(rewards: any[]): any {
        const totalWeight = rewards.reduce((sum, r) => sum + r.weight, 0);
        let random = Math.random() * totalWeight;
        
        for (const reward of rewards) {
            random -= reward.weight;
            if (random <= 0) {
                return reward;
            }
        }
        
        return rewards[0];
    }
    
    // 十连抽
    tenDraw(playerId: string, playerCurrency: any): {
        success: boolean;
        rewards: any[];
        guaranteed: boolean;
        message: string;
    } {
        const rewards = [];
        let guaranteed = false;
        
        for (let i = 0; i < 10; i++) {
            const result = this.draw(playerId, 'lucky', playerCurrency);
            if (result.success) {
                rewards.push(result.reward);
                // 检查保底
                if (!guaranteed && this.isRareOrAbove(result.reward)) {
                    guaranteed = true;
                }
            }
        }
        
        // 如果没有稀有以上，强制给一个
        if (!guaranteed) {
            const rareReward = this.getGuaranteedRareReward();
            rewards[9] = rareReward;
            guaranteed = true;
        }
        
        return {
            success: true,
            rewards: rewards,
            guaranteed: guaranteed,
            message: `十连许愿完成！获得${rewards.length}个奖励${guaranteed ? '（已触发保底）' : ''}`
        };
    }
    
    // 判断是否稀有以上
    isRareOrAbove(reward: any): boolean {
        const rareItems = ['传说装备', '稀有坐骑', '财神印', '财源印碎片'];
        return rareItems.some(item => reward.item.includes(item));
    }
    
    // 获取保底稀有奖励
    getGuaranteedRareReward(): any {
        const rareRewards = [
            { item: '传说装备箱', amount: 1 },
            { item: '稀有坐骑碎片', amount: 3 },
            { item: '极品香', amount: 3 }
        ];
        return rareRewards[Math.floor(Math.random() * rareRewards.length)];
    }
    
    // 检查累计奖励
    checkCumulativeReward(playerId: string): { 
        hasReward: boolean; 
        milestone: number; 
        reward: any;
    } {
        const data = this.playerDailyData.get(playerId);
        if (!data) return { hasReward: false, milestone: 0, reward: null };
        
        const total = data.totalDraws;
        
        for (const [milestone, rewardData] of Object.entries(this.cumulativeRewards)) {
            const m = parseInt(milestone);
            if (total >= m && !data.claimedRewards?.includes(m)) {
                return { hasReward: true, milestone: m, reward: rewardData };
            }
        }
        
        return { hasReward: false, milestone: 0, reward: null };
    }
    
    // 领取累计奖励
    claimCumulativeReward(playerId: string, milestone: number): {
        success: boolean;
        reward: any;
        message: string;
    } {
        const data = this.playerDailyData.get(playerId);
        if (!data) {
            return { success: false, reward: null, message: '无数据' };
        }
        
        if (!data.claimedRewards) {
            data.claimedRewards = [];
        }
        
        if (data.claimedRewards.includes(milestone)) {
            return { success: false, reward: null, message: '已领取' };
        }
        
        const rewardData = this.cumulativeRewards[milestone];
        if (!rewardData) {
            return { success: false, reward: null, message: ' milestone 不存在' };
        }
        
        data.claimedRewards.push(milestone);
        
        return {
            success: true,
            reward: rewardData.reward,
            message: `领取成功！获得${rewardData.name}奖励：${rewardData.reward.item}×${rewardData.reward.amount}`
        };
    }
    
    // 获取玩家许愿数据
    getPlayerData(playerId: string): any {
        this.initPlayer(playerId);
        this.checkDailyReset(playerId);
        return this.playerDailyData.get(playerId);
    }
    
    onLoad() {
        console.log('WishTreeSystem 加载完成');
        console.log('许愿类型:', Object.keys(this.drawTypes).length);
    }
}