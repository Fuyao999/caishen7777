import { _decorator, Component } from 'cc';
const { ccclass, property } = _decorator;

/**
 * 财神大陆 - 交易市场系统（完整版）
 * 摆摊 + 拍卖行 + 股票系统
 */

@ccclass('MarketSystem')
export class MarketSystem extends Component {
    
    // ========== 摆摊系统 ==========
    stalls: Map<string, any> = new Map();  // playerId -> stall data
    
    stallConfig = {
        tax: 0.05,           // 5%交易税
        chenHourTax: 0,      // 辰时免税
        offlineDuration: 2,  // 离线托管2小时
        maxItems: 20         // 最大摊位商品数
    };
    
    // 创建摊位
    createStall(playerId: string, stallName: string): {
        success: boolean;
        stall: any;
        message: string;
    } {
        if (this.stalls.has(playerId)) {
            return { success: false, stall: null, message: '已有摊位' };
        }
        
        const stall = {
            playerId: playerId,
            name: stallName,
            items: [],
            reputation: 0,
            totalSales: 0,
            createTime: Date.now(),
            lastOnline: Date.now()
        };
        
        this.stalls.set(playerId, stall);
        return { success: true, stall: stall, message: '摊位创建成功！' };
    }
    
    // 上架商品
    listItem(playerId: string, item: any, price: number, quantity: number = 1): {
        success: boolean;
        message: string;
    } {
        const stall = this.stalls.get(playerId);
        if (!stall) {
            return { success: false, message: '没有摊位' };
        }
        
        if (stall.items.length >= this.stallConfig.maxItems) {
            return { success: false, message: '摊位已满' };
        }
        
        stall.items.push({
            id: this.generateId(),
            item: item,
            price: price,
            quantity: quantity,
            listTime: Date.now()
        });
        
        return { success: true, message: '上架成功！' };
    }
    
    // 购买商品
    buyItem(sellerId: string, itemId: string, buyerId: string, isChenHour: boolean): {
        success: boolean;
        cost: number;
        tax: number;
        message: string;
    } {
        const stall = this.stalls.get(sellerId);
        if (!stall) {
            return { success: false, cost: 0, tax: 0, message: '摊位不存在' };
        }
        
        const itemIndex = stall.items.findIndex(i => i.id === itemId);
        if (itemIndex === -1) {
            return { success: false, cost: 0, tax: 0, message: '商品已下架' };
        }
        
        const item = stall.items[itemIndex];
        const price = item.price;
        
        // 计算税费
        const taxRate = isChenHour ? this.stallConfig.chenHourTax : this.stallConfig.tax;
        const tax = Math.floor(price * taxRate);
        const sellerGet = price - tax;
        
        // 移除商品
        stall.items.splice(itemIndex, 1);
        
        // 更新卖家数据
        stall.totalSales += price;
        stall.reputation += 1;
        
        return { 
            success: true, 
            cost: price, 
            tax: tax,
            message: `购买成功！花费${price}，卖家获得${sellerGet}，税收${tax}` 
        };
    }
    
    // ========== 拍卖行系统 ==========
    auctions: Map<string, any> = new Map();  // auctionId -> auction data
    
    auctionConfig = {
        tax: 0.1,            // 10%交易税
        chenHourTax: 0.05,   // 辰时5%
        minBidIncrement: 0.1 // 最小加价10%
    };
    
    // 创建拍卖
    createAuction(sellerId: string, item: any, startPrice: number, 
                  buyoutPrice: number | null, duration: number = 86400): {
        success: boolean;
        auctionId: string;
        message: string;
    } {
        const auctionId = this.generateId();
        
        const auction = {
            id: auctionId,
            sellerId: sellerId,
            item: item,
            startPrice: startPrice,
            currentPrice: startPrice,
            buyoutPrice: buyoutPrice,
            highestBidder: null,
            bids: [],
            startTime: Date.now(),
            endTime: Date.now() + duration * 1000,
            status: 'active'
        };
        
        this.auctions.set(auctionId, auction);
        
        return { 
            success: true, 
            auctionId: auctionId,
            message: buyoutPrice 
                ? `拍卖创建成功！起拍${startPrice}，一口价${buyoutPrice}`
                : `拍卖创建成功！起拍${startPrice}`
        };
    }
    
    // 出价
    placeBid(auctionId: string, bidderId: string, amount: number): {
        success: boolean;
        message: string;
    } {
        const auction = this.auctions.get(auctionId);
        if (!auction || auction.status !== 'active') {
            return { success: false, message: '拍卖不存在或已结束' };
        }
        
        if (Date.now() > auction.endTime) {
            return { success: false, message: '拍卖已结束' };
        }
        
        // 检查出价
        const minBid = Math.floor(auction.currentPrice * (1 + this.auctionConfig.minBidIncrement));
        if (amount < minBid) {
            return { success: false, message: `出价过低，最低${minBid}` };
        }
        
        // 检查一口价
        if (auction.buyoutPrice && amount >= auction.buyoutPrice) {
            // 直接购买
            return this.buyoutAuction(auctionId, bidderId);
        }
        
        // 记录出价
        auction.bids.push({
            bidderId: bidderId,
            amount: amount,
            time: Date.now()
        });
        
        auction.currentPrice = amount;
        auction.highestBidder = bidderId;
        
        return { success: true, message: `出价成功！当前最高价${amount}` };
    }
    
    // 一口价购买
    buyoutAuction(auctionId: string, buyerId: string): {
        success: boolean;
        message: string;
    } {
        const auction = this.auctions.get(auctionId);
        if (!auction || auction.status !== 'active') {
            return { success: false, message: '拍卖不存在' };
        }
        
        const price = auction.buyoutPrice;
        auction.status = 'sold';
        auction.highestBidder = buyerId;
        
        return { success: true, message: `一口价购买成功！花费${price}` };
    }
    
    // 结束拍卖
    finalizeAuction(auctionId: string, isChenHour: boolean): {
        success: boolean;
        winner: string | null;
        price: number;
        tax: number;
        message: string;
    } {
        const auction = this.auctions.get(auctionId);
        if (!auction) {
            return { success: false, winner: null, price: 0, tax: 0, message: '拍卖不存在' };
        }
        
        if (auction.status !== 'active') {
            return { success: false, winner: null, price: 0, tax: 0, message: '拍卖已结束' };
        }
        
        auction.status = 'ended';
        
        if (!auction.highestBidder) {
            return { success: true, winner: null, price: 0, tax: 0, message: '流拍' };
        }
        
        const price = auction.currentPrice;
        const taxRate = isChenHour ? this.auctionConfig.chenHourTax : this.auctionConfig.tax;
        const tax = Math.floor(price * taxRate);
        
        return {
            success: true,
            winner: auction.highestBidder,
            price: price,
            tax: tax,
            message: `拍卖结束！${auction.highestBidder}以${price}竞得，税收${tax}`
        };
    }
    
    // ========== 股票系统 ==========
    stocks: Map<string, any> = new Map();  // stockId -> stock data
    playerHoldings: Map<string, Map<string, number>> = new Map();  // playerId -> {stockId: amount}
    
    // 初始化股票
    initStocks(): void {
        this.stocks.set('mining', {
            id: 'mining',
            name: '矿渊矿业',
            description: '子时·墨玉矿渊相关',
            basePrice: 100,
            currentPrice: 100,
            volatility: 0.1,
            totalShares: 10000,
            circulatingShares: 5000
        });
        
        this.stocks.set('farming', {
            id: 'farming',
            name: '丰收农业',
            description: '卯时·金曦原野相关',
            basePrice: 100,
            currentPrice: 100,
            volatility: 0.08,
            totalShares: 10000,
            circulatingShares: 5000
        });
        
        this.stocks.set('trading', {
            id: 'trading',
            name: '通宝商会',
            description: '全服交易量相关',
            basePrice: 100,
            currentPrice: 100,
            volatility: 0.12,
            totalShares: 10000,
            circulatingShares: 5000
        });
    }
    
    // 购买股票
    buyStock(playerId: string, stockId: string, amount: number): {
        success: boolean;
        cost: number;
        message: string;
    } {
        const stock = this.stocks.get(stockId);
        if (!stock) {
            return { success: false, cost: 0, message: '股票不存在' };
        }
        
        const cost = stock.currentPrice * amount;
        
        // 更新持股
        if (!this.playerHoldings.has(playerId)) {
            this.playerHoldings.set(playerId, new Map());
        }
        const holdings = this.playerHoldings.get(playerId);
        const current = holdings.get(stockId) || 0;
        holdings.set(stockId, current + amount);
        
        return { 
            success: true, 
            cost: cost,
            message: `购买成功！${amount}股${stock.name}，花费${cost}` 
        };
    }
    
    // 卖出股票
    sellStock(playerId: string, stockId: string, amount: number): {
        success: boolean;
        revenue: number;
        message: string;
    } {
        const stock = this.stocks.get(stockId);
        if (!stock) {
            return { success: false, revenue: 0, message: '股票不存在' };
        }
        
        const holdings = this.playerHoldings.get(playerId);
        if (!holdings) {
            return { success: false, revenue: 0, message: '没有持股' };
        }
        
        const current = holdings.get(stockId) || 0;
        if (current < amount) {
            return { success: false, revenue: 0, message: '持股不足' };
        }
        
        const revenue = stock.currentPrice * amount;
        holdings.set(stockId, current - amount);
        
        return { 
            success: true, 
            revenue: revenue,
            message: `卖出成功！${amount}股${stock.name}，获得${revenue}` 
        };
    }
    
    // 更新股价
    updateStockPrices(domainActivity: Map<string, number>): void {
        for (const [stockId, stock] of this.stocks) {
            const activity = domainActivity.get(stockId) || 1;
            const change = (Math.random() - 0.5) * stock.volatility * activity;
            stock.currentPrice = Math.max(10, Math.floor(stock.currentPrice * (1 + change)));
        }
    }
    
    // 获取股价
    getStockPrice(stockId: string): number {
        const stock = this.stocks.get(stockId);
        return stock ? stock.currentPrice : 0;
    }
    
    // 生成ID
    generateId(): string {
        return 'mkt_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
    
    onLoad() {
        this.initStocks();
        console.log('MarketSystem 加载完成');
        console.log('摆摊配置:', this.stallConfig);
        console.log('股票数量:', this.stocks.size);
    }
}