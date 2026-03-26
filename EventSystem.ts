import { _decorator, Component } from 'cc';
const { ccclass, property } = _decorator;

/**
 * 财神大陆 - 活动系统（完整版）
 * 财神诞 + 限时活动 + 运营活动
 */

@ccclass('EventSystem')
export class EventSystem extends Component {
    
    // 活动配置
    events: Map<string, any> = new Map();
    
    // 玩家参与记录
    playerParticipation: Map<string, any> = new Map();
    
    onLoad() {
        this.initEvents();
        console.log('EventSystem 加载完成');
        console.log('活动数量:', this.events.size);
    }
    
    // 初始化所有活动
    initEvents(): void {
        // ========== 财神诞（年度活动）==========
        this.events.set('caishen_birthday_2025', {
            id: 'caishen_birthday_2025',
            name: '财神诞',
            type: 'annual',
            description: '农历正月初五，财神诞辰庆典',
            startTime: new Date('2025-02-02T00:00:00+08:00').getTime(),  // 正月初五
            endTime: new Date('2025-02-09T23:59:59+08:00').getTime(),
            
            content: {
                // 1. 全服供奉加成
                incenseBonus: {
                    expMultiplier: 2.0,      // 经验双倍
                    moneyMultiplier: 2.0,    // 香火钱双倍
                    duration: 7 * 24 * 60 * 60 * 1000  // 持续7天
                },
                
                // 2. 登录奖励
                loginRewards: [
                    { day: 1, reward: { item: '财神红包', amount: 1, money: 888 } },
                    { day: 2, reward: { item: '高级香', amount: 3 } },
                    { day: 3, reward: { item: '招财幡', amount: 5 } },
                    { day: 4, reward: { item: '财神印碎片', amount: 1 } },
                    { day: 5, reward: { item: '传说装备箱', amount: 1 } },
                    { day: 6, reward: { item: '元宝', amount: 100 } },
                    { day: 7, reward: { item: '财神专属外观', amount: 1 } }
                ],
                
                // 3. 全服目标
                serverGoals: [
                    { 
                        name: '万民供奉', 
                        target: 1000000,  // 100万次供奉
                        current: 0,
                        reward: { item: '全服财神降临券', amount: 1 }
                    },
                    { 
                        name: '普天同庆', 
                        target: 10000000,  // 1000万功德
                        current: 0,
                        reward: { item: '全服双倍经验卡', amount: 1, duration: '24h' }
                    }
                ],
                
                // 4. 限时副本
                specialDungeon: {
                    name: '财神宝库',
                    unlockLevel: 10,
                    dailyAttempts: 3,
                    rewards: {
                        money: { min: 1000, max: 5000 },
                        items: ['财神宝箱', '财运符', '财神印碎片']
                    }
                }
            }
        });
        
        // ========== 双倍经验周 ==========
        this.events.set('double_exp_week', {
            id: 'double_exp_week',
            name: '双倍经验周',
            type: 'weekly',
            description: '全服双倍经验，升级更快！',
            schedule: 'weekly',  // 每周
            weekDay: 6,          // 周六
            duration: 24 * 60 * 60 * 1000,  // 持续24小时
            
            content: {
                expMultiplier: 2.0,
                applicableDomains: 'all'  // 所有财域
            }
        });
        
        // ========== 限时充值返利 ==========
        this.events.set('recharge_rebate', {
            id: 'recharge_rebate',
            name: '充值返利',
            type: 'limited',
            description: '充值即送，多充多送！',
            startTime: null,  // 动态开启
            endTime: null,
            
            content: {
                tiers: [
                    { amount: 6, rebate: 0.1, bonus: { item: '首充礼包', amount: 1 } },
                    { amount: 30, rebate: 0.15, bonus: { item: '月卡', amount: 1 } },
                    { amount: 68, rebate: 0.2, bonus: { item: '高级装备箱', amount: 1 } },
                    { amount: 128, rebate: 0.25, bonus: { item: '传说坐骑', amount: 1 } },
                    { amount: 328, rebate: 0.3, bonus: { item: '财神印', amount: 1 } },
                    { amount: 648, rebate: 0.35, bonus: { item: '至尊VIP', duration: '30d' } }
                ]
            }
        });
        
        // ========== 公会战赛季 ==========
        this.events.set('guild_war_season', {
            id: 'guild_war_season',
            name: '十二财域争霸',
            type: 'seasonal',
            description: '门派争夺财域，争夺赛季冠军！',
            duration: 30 * 24 * 60 * 60 * 1000,  // 30天赛季
            
            content: {
                // 赛季奖励
                seasonRewards: {
                    rank1: { title: '财域霸主', item: '赛季专属坐骑', money: 100000 },
                    rank2: { title: '财域守护者', item: '赛季专属外观', money: 50000 },
                    rank3: { title: '财域勇士', item: '赛季专属称号', money: 30000 },
                    top10: { item: '高级装备箱', money: 10000 },
                    participant: { item: '参与奖励箱', money: 1000 }
                },
                
                // 赛季任务
                missions: [
                    { name: '初战告捷', requirement: '参与1场公会战', reward: { money: 1000 } },
                    { name: '连胜将军', requirement: '连胜5场', reward: { item: '连胜宝箱', amount: 1 } },
                    { name: '财域征服者', requirement: '占领财域3次', reward: { item: '征服者印记', amount: 1 } },
                    { name: '守护神', requirement: '成功防守5次', reward: { item: '守护宝箱', amount: 1 } }
                ]
            }
        });
        
        // ========== 限时BOSS挑战 ==========
        this.events.set('limited_boss', {
            id: 'limited_boss',
            name: '远古财神残魂',
            type: 'limited_boss',
            description: '击败远古财神残魂，获得传说装备！',
            schedule: 'daily',  // 每日刷新
            spawnTimes: ['12:00', '20:00'],  // 刷新时间
            duration: 60 * 60 * 1000,  // 持续1小时
            
            content: {
                boss: {
                    name: '远古财神残魂',
                    level: 99,
                    hp: 10000000,
                    rewards: {
                        damageRanking: [
                            { rank: 1, reward: { item: '传说武器', amount: 1 } },
                            { rank: 2, reward: { item: '传说防具', amount: 1 } },
                            { rank: 3, reward: { item: '传说饰品', amount: 1 } },
                            { rank: '4-10', reward: { item: '高级装备箱', amount: 1 } }
                        ],
                        participation: { item: '参与奖箱', amount: 1 }
                    }
                }
            }
        });
        
        // ========== 交易节 ==========
        this.events.set('trading_festival', {
            id: 'trading_festival',
            name: '天市交易节',
            type: 'weekly',
            description: '辰时·云海天市特别活动，交易税全免！',
            schedule: 'weekly',
            weekDay: 0,  // 周日
            duration: 24 * 60 * 60 * 1000,
            
            content: {
                taxWaiver: true,  // 交易税全免
                bonus: {
                    stallSlots: 2,        // 额外摊位格子
                    auctionPriority: true  // 拍卖优先展示
                },
                specialItems: [
                    { name: '稀有材料包', price: 5000, stock: 100 },
                    { name: '高级打造石', price: 3000, stock: 200 },
                    { name: '幸运符', price: 1000, stock: 500 }
                ]
            }
        });
    }
    
    // 获取当前活动
    getCurrentEvents(): any[] {
        const now = Date.now();
        const current = [];
        
        for (const [id, event] of this.events) {
            if (this.isEventActive(event, now)) {
                current.push(event);
            }
        }
        
        return current;
    }
    
    // 检查活动是否进行中
    isEventActive(event: any, now: number = Date.now()): boolean {
        // 固定时间活动
        if (event.startTime && event.endTime) {
            return now >= event.startTime && now <= event.endTime;
        }
        
        // 周期性活动
        if (event.schedule === 'weekly' && event.weekDay !== undefined) {
            const now_date = new Date(now);
            return now_date.getDay() === event.weekDay;
        }
        
        // 手动开启活动
        if (event.schedule === 'manual') {
            return event.manuallyActive || false;
        }
        
        return false;
    }
    
    // 玩家参与活动
    participate(playerId: string, eventId: string, data: any): {
        success: boolean;
        reward: any;
        message: string;
    } {
        const event = this.events.get(eventId);
        if (!event) {
            return { success: false, reward: null, message: '活动不存在' };
        }
        
        if (!this.isEventActive(event)) {
            return { success: false, reward: null, message: '活动未开始或已结束' };
        }
        
        // 初始化玩家参与记录
        if (!this.playerParticipation.has(playerId)) {
            this.playerParticipation.set(playerId, {});
        }
        const playerEvents = this.playerParticipation.get(playerId);
        
        if (!playerEvents[eventId]) {
            playerEvents[eventId] = {
                joined: false,
                progress: {},
                rewardsClaimed: [],
                joinTime: null
            };
        }
        
        const participation = playerEvents[eventId];
        
        // 根据活动类型处理
        switch (event.type) {
            case 'annual':
                return this.handleAnnualEvent(playerId, event, participation, data);
            case 'limited_boss':
                return this.handleBossEvent(playerId, event, participation, data);
            case 'seasonal':
                return this.handleSeasonalEvent(playerId, event, participation, data);
            default:
                return { success: true, reward: null, message: '参与成功' };
        }
    }
    
    // 处理年度活动
    handleAnnualEvent(playerId: string, event: any, participation: any, data: any): any {
        if (!participation.joined) {
            participation.joined = true;
            participation.joinTime = Date.now();
        }
        
        // 检查登录奖励
        if (data.action === 'login') {
            const loginDay = this.getLoginDay(participation.joinTime);
            const reward = event.content.loginRewards.find(r => r.day === loginDay);
            
            if (reward && !participation.rewardsClaimed.includes(`login_${loginDay}`)) {
                participation.rewardsClaimed.push(`login_${loginDay}`);
                return {
                    success: true,
                    reward: reward.reward,
                    message: `财神诞第${loginDay}天登录奖励！`
                };
            }
        }
        
        return { success: true, reward: null, message: '已参与活动' };
    }
    
    // 处理BOSS活动
    handleBossEvent(playerId: string, event: any, participation: any, data: any): any {
        if (data.action === 'attack') {
            if (!participation.attacks) participation.attacks = 0;
            participation.attacks++;
            
            return {
                success: true,
                reward: null,
                message: '攻击已记录'
            };
        }
        
        return { success: true, reward: null, message: '参与成功' };
    }
    
    // 处理赛季活动
    handleSeasonalEvent(playerId: string, event: any, participation: any, data: any): any {
        if (!participation.missions) participation.missions = {};
        
        if (data.missionId) {
            const mission = event.content.missions.find(m => m.name === data.missionId);
            if (mission && !participation.missions[data.missionId]) {
                participation.missions[data.missionId] = true;
                return {
                    success: true,
                    reward: mission.reward,
                    message: `完成任务：${mission.name}`
                };
            }
        }
        
        return { success: true, reward: null, message: '进度已更新' };
    }
    
    // 获取登录天数
    getLoginDay(joinTime: number): number {
        const now = Date.now();
        const days = Math.floor((now - joinTime) / (24 * 60 * 60 * 1000)) + 1;
        return Math.min(days, 7);  // 最多7天
    }
    
    // 更新全服进度
    updateServerProgress(eventId: string, goalName: string, amount: number): void {
        const event = this.events.get(eventId);
        if (!event || !event.content.serverGoals) return;
        
        const goal = event.content.serverGoals.find(g => g.name === goalName);
        if (goal) {
            goal.current += amount;
            
            // 检查是否达成
            if (goal.current >= goal.target && !goal.completed) {
                goal.completed = true;
                console.log(`全服目标达成：${goalName}！`);
            }
        }
    }
    
    // 手动开启活动
    startEvent(eventId: string, duration: number): boolean {
        const event = this.events.get(eventId);
        if (!event) return false;
        
        event.startTime = Date.now();
        event.endTime = Date.now() + duration;
        event.manuallyActive = true;
        
        console.log(`活动已手动开启：${event.name}`);
        return true;
    }
    
    // 手动结束活动
    endEvent(eventId: string): boolean {
        const event = this.events.get(eventId);
        if (!event) return false;
        
        event.endTime = Date.now();
        event.manuallyActive = false;
        
        console.log(`活动已手动结束：${event.name}`);
        return true;
    }
    
    // 生成活动日历
    generateEventCalendar(): any[] {
        const calendar = [];
        const now = new Date();
        
        for (let i = 0; i < 30; i++) {
            const date = new Date(now);
            date.setDate(date.getDate() + i);
            
            const dayEvents = [];
            for (const [id, event] of this.events) {
                if (event.schedule === 'weekly' && event.weekDay === date.getDay()) {
                    dayEvents.push({
                        name: event.name,
                        type: event.type
                    });
                }
            }
            
            if (dayEvents.length > 0) {
                calendar.push({
                    date: date.toISOString().split('T')[0],
                    events: dayEvents
                });
            }
        }
        
        return calendar;
    }
}