import { _decorator, Component, director, sys } from 'cc';

const { ccclass, property } = _decorator;

// 玩家数据结构（基于V19完整版）
export interface PlayerData {
    // 基础信息
    playerId: string;
    playerName: string;
    level: number;
    realm: string;          // 境界名称
    realmLevel: number;     // 第几重天
    exp: number;            // 当前修为
    maxExp: number;         // 升级所需修为
    
    // 九种核心资源
    incense_money: number;  // 香火钱（基础货币）
    yuanbao: number;        // 元宝（付费货币）
    mana: number;           // 法力值（化缘消耗）
    merit: number;          // 功德（只增不减）
    reputation: number;     // 声望（排行）
    fragments: number;      // 碎片（合成招财幡）
    zhaocaifan: number;     // 招财幡（升级必需）
    believer_contrib: number; // 信徒贡献（解锁财神位）
    shanyuan: number;       // 善缘值（社交）
    
    // 庙宇相关
    temple: {
        name: string;
        type: number;       // 1-5级庙宇
        typeName: string;   // 破庙/小庙/中庙/大庙/金身庙
        hourlyOutput: number;
        storageLimit: number;
        incenseActive: boolean;
        incenseType: string | null; // 'stick'|'candle'|'paper'|'fruit'
        incenseEndTime: number;     // 点香结束时间戳
    };
    
    // 化缘系统
    alms: {
        dailyCount: number;     // 今日化缘次数
        maxDailyCount: number;  // 每日最大次数（20次）
        lastResetTime: number;  // 上次重置时间
    };
    
    // 时间戳
    createTime: number;
    lastLoginTime: number;
}

// 九重天境界配置
const REALM_CONFIG = [
    { level: 1, name: '聚气生财', minLevel: 6, maxLevel: 10 },
    { level: 2, name: '筑财为基', minLevel: 11, maxLevel: 20 },
    { level: 3, name: '凝结财丹', minLevel: 21, maxLevel: 30 },
    { level: 4, name: '元财化婴', minLevel: 31, maxLevel: 40 },
    { level: 5, name: '财神化神', minLevel: 41, maxLevel: 50 },
    { level: 6, name: '炼虚聚财', minLevel: 51, maxLevel: 60 },
    { level: 7, name: '合体生财', minLevel: 61, maxLevel: 70 },
    { level: 8, name: '大乘散财', minLevel: 71, maxLevel: 80 },
    { level: 9, name: '财道真仙', minLevel: 81, maxLevel: 99 },
];

// 庙宇配置
const TEMPLE_CONFIG = [
    { type: 1, name: '破庙', form: '泥胎', hourly: 100, limit: 5000 },
    { type: 2, name: '小庙', form: '泥胎', hourly: 180, limit: 10000 },
    { type: 3, name: '中庙', form: '木骨', hourly: 250, limit: 18000 },
    { type: 4, name: '大庙', form: '铜身', hourly: 333, limit: 30000 },
    { type: 5, name: '金身庙', form: '金身', hourly: 417, limit: 50000 },
];

// 点香配置
const INCENSE_CONFIG = {
    stick: { name: '线香', duration: 2 * 60 * 60 * 1000, bonus: 1.0 },      // 2小时
    candle: { name: '红烛', duration: 4 * 60 * 60 * 1000, bonus: 1.5 },     // 4小时
    paper: { name: '金纸', duration: 6 * 60 * 60 * 1000, bonus: 2.0 },      // 6小时
    fruit: { name: '供果', duration: 8 * 60 * 60 * 1000, bonus: 2.5 },      // 8小时
};

@ccclass('PlayerDataManager')
export class PlayerDataManager extends Component {
    static instance: PlayerDataManager = null;
    
    private playerData: PlayerData = null;
    private readonly STORAGE_KEY = 'caishen_player_data_v19';
    
    onLoad() {
        if (PlayerDataManager.instance === null) {
            PlayerDataManager.instance = this;
            director.addPersistRootNode(this.node);
            this.loadData();
        }
    }
    
    static getInstance(): PlayerDataManager {
        return PlayerDataManager.instance;
    }
    
    // 获取玩家数据
    getPlayerData(): PlayerData {
        return this.playerData;
    }
    
    // 创建新玩家数据
    createNewPlayer(playerName: string): PlayerData {
        const now = Date.now();
        this.playerData = {
            playerId: this.generatePlayerId(),
            playerName: playerName || '未命名财神',
            level: 1,
            realm: '灵种入体',
            realmLevel: 0,
            exp: 0,
            maxExp: this.getMaxExpForLevel(1),
            
            incense_money: 1000,
            yuanbao: 100,
            mana: 100,
            merit: 0,
            reputation: 0,
            fragments: 0,
            zhaocaifan: 0,
            believer_contrib: 0,
            shanyuan: 0,
            
            temple: {
                name: '无名破庙',
                type: 1,
                typeName: '破庙',
                hourlyOutput: 100,
                storageLimit: 5000,
                incenseActive: false,
                incenseType: null,
                incenseEndTime: 0,
            },
            
            alms: {
                dailyCount: 0,
                maxDailyCount: 20,
                lastResetTime: now,
            },
            
            createTime: now,
            lastLoginTime: now,
        };
        
        this.saveData();
        return this.playerData;
    }
    
    // 加载数据
    loadData(): boolean {
        const dataStr = sys.localStorage.getItem(this.STORAGE_KEY);
        if (dataStr) {
            try {
                this.playerData = JSON.parse(dataStr);
                this.checkDailyReset();
                return true;
            } catch (e) {
                console.error('加载玩家数据失败:', e);
            }
        }
        return false;
    }
    
    // 保存数据
    saveData(): void {
        if (this.playerData) {
            sys.localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.playerData));
        }
    }
    
    // 检查每日重置
    checkDailyReset(): void {
        if (!this.playerData) return;
        
        const now = Date.now();
        const lastReset = this.playerData.alms.lastResetTime;
        const isNewDay = new Date(now).toDateString() !== new Date(lastReset).toDateString();
        
        if (isNewDay) {
            this.playerData.alms.dailyCount = 0;
            this.playerData.alms.lastResetTime = now;
            this.saveData();
        }
    }
    
    // 生成玩家ID
    private generatePlayerId(): string {
        return 'CS' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substr(2, 4).toUpperCase();
    }
    
    // 获取升级所需修为
    getMaxExpForLevel(level: number): number {
        return Math.floor(100 * Math.pow(1.2, level - 1));
    }
    
    // 增加修为
    addExp(amount: number): boolean {
        if (!this.playerData) return false;
        
        this.playerData.exp += amount;
        
        // 检查升级
        while (this.playerData.exp >= this.playerData.maxExp && this.playerData.level < 99) {
            this.playerData.exp -= this.playerData.maxExp;
            this.levelUp();
        }
        
        this.saveData();
        return true;
    }
    
    // 升级
    private levelUp(): void {
        this.playerData.level++;
        this.playerData.maxExp = this.getMaxExpForLevel(this.playerData.level);
        
        // 检查庙宇升级（1-5级）
        this.checkTempleUpgrade();
        
        // 检查境界
        this.updateRealm();
    }
    
    // 检查庙宇升级
    checkTempleUpgrade(): void {
        const level = this.playerData.level;
        let newType = 1;
        
        if (level >= 5) newType = 5;
        else if (level >= 4) newType = 4;
        else if (level >= 3) newType = 3;
        else if (level >= 2) newType = 2;
        
        if (newType > this.playerData.temple.type) {
            const config = TEMPLE_CONFIG[newType - 1];
            this.playerData.temple.type = newType;
            this.playerData.temple.typeName = config.name;
            this.playerData.temple.hourlyOutput = config.hourly;
            this.playerData.temple.storageLimit = config.limit;
        }
    }
    
    // 更新境界
    updateRealm(): void {
        const level = this.playerData.level;
        const realm = REALM_CONFIG.find(r => level >= r.minLevel && level <= r.maxLevel);
        
        if (realm) {
            this.playerData.realm = realm.name;
            this.playerData.realmLevel = realm.level;
        }
    }
    
    // 点香供奉
    offerIncense(type: 'stick' | 'candle' | 'paper' | 'fruit'): boolean {
        if (!this.playerData) return false;
        
        const config = INCENSE_CONFIG[type];
        const now = Date.now();
        
        // 检查是否已有进行中的供奉
        if (this.playerData.temple.incenseActive && this.playerData.temple.incenseEndTime > now) {
            return false; // 已有供奉进行中
        }
        
        // 检查资源是否足够
        if (!this.consumeResource(type === 'stick' ? 'incense_sticks' : 
                                  type === 'candle' ? 'candles' : 
                                  type === 'paper' ? 'gold_paper' : 'fruits', 1)) {
            return false;
        }
        
        this.playerData.temple.incenseActive = true;
        this.playerData.temple.incenseType = type;
        this.playerData.temple.incenseEndTime = now + config.duration;
        
        this.saveData();
        return true;
    }
    
    // 获取当前供奉状态
    getIncenseStatus(): { active: boolean; type: string | null; remainingTime: number; bonus: number } {
        if (!this.playerData) return { active: false, type: null, remainingTime: 0, bonus: 1 };
        
        const now = Date.now();
        const isActive = this.playerData.temple.incenseActive && this.playerData.temple.incenseEndTime > now;
        
        if (isActive) {
            const type = this.playerData.temple.incenseType;
            return {
                active: true,
                type: INCENSE_CONFIG[type]?.name || type,
                remainingTime: this.playerData.temple.incenseEndTime - now,
                bonus: INCENSE_CONFIG[type]?.bonus || 1,
            };
        }
        
        return { active: false, type: null, remainingTime: 0, bonus: 1 };
    }
    
    // 计算庙宇挂机产出
    calculateTempleOutput(): number {
        if (!this.playerData) return 0;
        
        const incenseStatus = this.getIncenseStatus();
        const baseOutput = this.playerData.temple.hourlyOutput;
        const bonus = incenseStatus.bonus;
        
        return Math.floor(baseOutput * bonus);
    }
    
    // 领取庙宇收益
    collectTempleIncome(): number {
        if (!this.playerData) return 0;
        
        const income = this.calculateTempleOutput();
        this.playerData.incense_money = Math.min(
            this.playerData.incense_money + income,
            this.playerData.temple.storageLimit
        );
        
        this.saveData();
        return income;
    }
    
    // 化缘消耗次数
    consumeAlmsChance(): boolean {
        if (!this.playerData) return false;
        
        this.checkDailyReset();
        
        if (this.playerData.alms.dailyCount >= this.playerData.alms.maxDailyCount) {
            return false;
        }
        
        this.playerData.alms.dailyCount++;
        this.saveData();
        return true;
    }
    
    // 增加资源
    addResource(type: keyof PlayerData, amount: number): void {
        if (!this.playerData) return;
        
        const resourceTypes = ['incense_money', 'yuanbao', 'mana', 'merit', 
                              'reputation', 'fragments', 'zhaocaifan', 
                              'believer_contrib', 'shanyuan'];
        
        if (resourceTypes.includes(type as string)) {
            this.playerData[type] = Math.max(0, (this.playerData[type] as number) + amount);
            this.saveData();
        }
    }
    
    // 消耗资源
    consumeResource(type: string, amount: number): boolean {
        if (!this.playerData) return false;
        
        const current = this.playerData[type] as number;
        if (current >= amount) {
            this.playerData[type] = current - amount;
            this.saveData();
            return true;
        }
        return false;
    }
    
    // 获取化缘剩余次数
    getAlmsRemaining(): number {
        if (!this.playerData) return 0;
        this.checkDailyReset();
        return this.playerData.alms.maxDailyCount - this.playerData.alms.dailyCount;
    }
}
