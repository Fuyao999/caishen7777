import { _decorator, Component } from 'cc';
const { ccclass, property } = _decorator;

/**
 * 财神大陆 - 厢房系统（完整版）
 * 安全存储香火钱、防盗、升级扩容
 * 与第一阶段庙宇系统兼容
 */

@ccclass('SideRoomSystem')
export class SideRoomSystem extends Component {
    
    // 厢房配置
    sideRoomConfig = {
        initialCapacity: 5000,    // 初始容量5000香火钱
        maxLevel: 10,             // 最高10级
        upgradeCostMultiplier: 1.5,  // 升级成本倍率
        
        // 各级容量和升级需求
        levels: [
            { level: 1, capacity: 5000, upgradeMoney: 10000, upgradeBanners: 1 },
            { level: 2, capacity: 10000, upgradeMoney: 20000, upgradeBanners: 2 },
            { level: 3, capacity: 20000, upgradeMoney: 40000, upgradeBanners: 3 },
            { level: 4, capacity: 35000, upgradeMoney: 70000, upgradeBanners: 4 },
            { level: 5, capacity: 50000, upgradeMoney: 100000, upgradeBanners: 5 },
            { level: 6, capacity: 80000, upgradeMoney: 150000, upgradeBanners: 6 },
            { level: 7, capacity: 120000, upgradeMoney: 220000, upgradeBanners: 7 },
            { level: 8, capacity: 180000, upgradeMoney: 320000, upgradeBanners: 8 },
            { level: 9, capacity: 250000, upgradeMoney: 450000, upgradeBanners: 9 },
            { level: 10, capacity: 500000, upgradeMoney: 0, upgradeBanners: 0 }  // 满级
        ]
    };
    
    // 玩家厢房数据
    playerSideRooms: Map<string, any> = new Map();  // playerId -> sideRoom data
    
    onLoad() {
        console.log('SideRoomSystem 加载完成');
        console.log('厢房等级上限:', this.sideRoomConfig.maxLevel);
    }
    
    // 初始化玩家厢房
    initSideRoom(playerId: string): void {
        if (!this.playerSideRooms.has(playerId)) {
            this.playerSideRooms.set(playerId, {
                playerId: playerId,
                level: 1,
                storedMoney: 0,      // 当前存储的香火钱
                totalDeposited: 0,   // 累计存入
                totalWithdrawn: 0,   // 累计取出
                transactionHistory: [],  // 交易记录
                lastAccessTime: Date.now()
            });
        }
    }
    
    // 存入香火钱
    deposit(playerId: string, amount: number, playerMoney: number): {
        success: boolean;
        deposited: number;
        message: string;
    } {
        this.initSideRoom(playerId);
        const sideRoom = this.playerSideRooms.get(playerId);
        const config = this.sideRoomConfig.levels[sideRoom.level - 1];
        
        // 检查玩家余额
        if (playerMoney < amount) {
            return { success: false, deposited: 0, message: '香火钱不足' };
        }
        
        // 检查容量
        const remainingSpace = config.capacity - sideRoom.storedMoney;
        if (remainingSpace <= 0) {
            return { success: false, deposited: 0, message: '厢房已满，请升级' };
        }
        
        const actualDeposit = Math.min(amount, remainingSpace);
        sideRoom.storedMoney += actualDeposit;
        sideRoom.totalDeposited += actualDeposit;
        sideRoom.lastAccessTime = Date.now();
        
        // 记录
        sideRoom.transactionHistory.push({
            type: 'deposit',
            amount: actualDeposit,
            time: Date.now(),
            balance: sideRoom.storedMoney
        });
        
        // 只保留最近50条记录
        if (sideRoom.transactionHistory.length > 50) {
            sideRoom.transactionHistory.shift();
        }
        
        return {
            success: true,
            deposited: actualDeposit,
            message: `存入${actualDeposit}香火钱到厢房（安全）`
        };
    }
    
    // 取出香火钱
    withdraw(playerId: string, amount: number): {
        success: boolean;
        withdrawn: number;
        message: string;
    } {
        this.initSideRoom(playerId);
        const sideRoom = this.playerSideRooms.get(playerId);
        
        if (sideRoom.storedMoney <= 0) {
            return { success: false, withdrawn: 0, message: '厢房没有存款' };
        }
        
        const actualWithdraw = Math.min(amount, sideRoom.storedMoney);
        sideRoom.storedMoney -= actualWithdraw;
        sideRoom.totalWithdrawn += actualWithdraw;
        sideRoom.lastAccessTime = Date.now();
        
        // 记录
        sideRoom.transactionHistory.push({
            type: 'withdraw',
            amount: actualWithdraw,
            time: Date.now(),
            balance: sideRoom.storedMoney
        });
        
        return {
            success: true,
            withdrawn: actualWithdraw,
            message: `从厢房取出${actualWithdraw}香火钱`
        };
    }
    
    // 一键存入所有
    depositAll(playerId: string, playerMoney: number): {
        success: boolean;
        deposited: number;
        message: string;
    } {
        this.initSideRoom(playerId);
        const sideRoom = this.playerSideRooms.get(playerId);
        const config = this.sideRoomConfig.levels[sideRoom.level - 1];
        
        const remainingSpace = config.capacity - sideRoom.storedMoney;
        if (remainingSpace <= 0) {
            return { success: false, deposited: 0, message: '厢房已满' };
        }
        
        const actualDeposit = Math.min(playerMoney, remainingSpace);
        if (actualDeposit <= 0) {
            return { success: false, deposited: 0, message: '没有可存入的香火钱' };
        }
        
        return this.deposit(playerId, actualDeposit, playerMoney);
    }
    
    // 一键取出所有
    withdrawAll(playerId: string): {
        success: boolean;
        withdrawn: number;
        message: string;
    } {
        this.initSideRoom(playerId);
        const sideRoom = this.playerSideRooms.get(playerId);
        
        if (sideRoom.storedMoney <= 0) {
            return { success: false, withdrawn: 0, message: '厢房没有存款' };
        }
        
        return this.withdraw(playerId, sideRoom.storedMoney);
    }
    
    // 升级厢房
    upgrade(playerId: string, playerMoney: number, playerBanners: number): {
        success: boolean;
        newLevel: number;
        newCapacity: number;
        message: string;
    } {
        this.initSideRoom(playerId);
        const sideRoom = this.playerSideRooms.get(playerId);
        
        if (sideRoom.level >= this.sideRoomConfig.maxLevel) {
            return { success: false, newLevel: sideRoom.level, newCapacity: 0, message: '已达到最高等级' };
        }
        
        const currentConfig = this.sideRoomConfig.levels[sideRoom.level - 1];
        
        // 检查资源
        if (playerMoney < currentConfig.upgradeMoney) {
            return { success: false, newLevel: sideRoom.level, newCapacity: 0, message: `需要${currentConfig.upgradeMoney}香火钱` };
        }
        
        if (playerBanners < currentConfig.upgradeBanners) {
            return { success: false, newLevel: sideRoom.level, newCapacity: 0, message: `需要${currentConfig.upgradeBanners}招财幡` };
        }
        
        // 执行升级
        sideRoom.level++;
        const newConfig = this.sideRoomConfig.levels[sideRoom.level - 1];
        
        return {
            success: true,
            newLevel: sideRoom.level,
            newCapacity: newConfig.capacity,
            message: `厢房升级至${sideRoom.level}级！容量提升至${newConfig.capacity}`
        };
    }
    
    // 获取厢房信息
    getSideRoomInfo(playerId: string): any {
        this.initSideRoom(playerId);
        const sideRoom = this.playerSideRooms.get(playerId);
        const config = this.sideRoomConfig.levels[sideRoom.level - 1];
        
        return {
            level: sideRoom.level,
            storedMoney: sideRoom.storedMoney,
            capacity: config.capacity,
            remainingSpace: config.capacity - sideRoom.storedMoney,
            usagePercent: (sideRoom.storedMoney / config.capacity * 100).toFixed(1),
            isFull: sideRoom.storedMoney >= config.capacity,
            totalDeposited: sideRoom.totalDeposited,
            totalWithdrawn: sideRoom.totalWithdrawn,
            nextUpgrade: sideRoom.level < this.sideRoomConfig.maxLevel ? {
                money: config.upgradeMoney,
                banners: config.upgradeBanners,
                newCapacity: this.sideRoomConfig.levels[sideRoom.level].capacity
            } : null
        };
    }
    
    // 获取安全存款（不会被化缘）
    getSafeMoney(playerId: string): number {
        this.initSideRoom(playerId);
        return this.playerSideRooms.get(playerId).storedMoney;
    }
    
    // 获取交易记录
    getTransactionHistory(playerId: string, limit: number = 10): any[] {
        this.initSideRoom(playerId);
        const sideRoom = this.playerSideRooms.get(playerId);
        return sideRoom.transactionHistory.slice(-limit).reverse();
    }
}