import { _decorator, Component, Node, Label, Button, ScrollView, director, Color } from 'cc';
import { PlayerDataManager } from '../Core/PlayerDataManager';

const { ccclass, property } = _decorator;

// 商城商品配置
const SHOP_ITEMS = [
    {
        id: 'incense_sticks',
        name: '线香',
        icon: '📿',
        desc: '点燃后供奉2小时',
        price: 100,
        currency: 'incense_money',
        type: 'material'
    },
    {
        id: 'candles',
        name: '红烛',
        icon: '🕯️',
        desc: '点燃后供奉4小时',
        price: 300,
        currency: 'incense_money',
        type: 'material'
    },
    {
        id: 'gold_paper',
        name: '金纸',
        icon: '📜',
        desc: '点燃后供奉6小时',
        price: 500,
        currency: 'incense_money',
        type: 'material'
    },
    {
        id: 'fruits',
        name: '供果',
        icon: '🍎',
        desc: '点燃后供奉8小时',
        price: 1000,
        currency: 'incense_money',
        type: 'material'
    },
    {
        id: 'shield',
        name: '护庙符',
        icon: '🛡️',
        desc: '24小时内防止被化缘',
        price: 50,
        currency: 'yuanbao',
        type: 'buff'
    },
    {
        id: 'incense_sticks_pack',
        name: '线香礼包',
        icon: '🎁',
        desc: '线香×10',
        price: 10,
        currency: 'yuanbao',
        type: 'pack'
    },
    {
        id: 'candles_pack',
        name: '红烛礼包',
        icon: '🎁',
        desc: '红烛×5',
        price: 15,
        currency: 'yuanbao',
        type: 'pack'
    },
    {
        id: 'fragments_pack',
        name: '碎片礼包',
        icon: '🔷',
        desc: '碎片×20',
        price: 30,
        currency: 'yuanbao',
        type: 'pack'
    }
];

@ccclass('ShopUI')
export class ShopUI extends Component {
    
    @property(ScrollView)
    itemList: ScrollView = null;
    
    @property(Label)
    moneyLabel: Label = null;
    
    @property(Label)
    yuanbaoLabel: Label = null;
    
    @property(Button)
    backBtn: Button = null;
    
    @property(Button)
    tabMoneyBtn: Button = null;
    
    @property(Button)
    tabYuanbaoBtn: Button = null;
    
    @property(Node)
    itemPrefab: Node = null;
    
    private playerMgr: PlayerDataManager = null;
    private currentTab: 'money' | 'yuanbao' = 'money';
    
    onLoad() {
        this.playerMgr = PlayerDataManager.getInstance();
        this.setupUI();
        this.updateUI();
        this.showTab('money');
    }
    
    setupUI() {
        if (this.backBtn) {
            this.backBtn.node.on('click', this.onBack, this);
        }
        if (this.tabMoneyBtn) {
            this.tabMoneyBtn.node.on('click', () => this.showTab('money'));
        }
        if (this.tabYuanbaoBtn) {
            this.tabYuanbaoBtn.node.on('click', () => this.showTab('yuanbao'));
        }
    }
    
    updateUI() {
        const data = this.playerMgr?.getPlayerData();
        if (!data) return;
        
        if (this.moneyLabel) {
            this.moneyLabel.string = `💰 ${data.incense_money}`;
        }
        if (this.yuanbaoLabel) {
            this.yuanbaoLabel.string = `💎 ${data.yuanbao}`;
        }
    }
    
    showTab(tab: 'money' | 'yuanbao') {
        this.currentTab = tab;
        
        // 更新按钮状态
        if (this.tabMoneyBtn) {
            this.tabMoneyBtn.node.getComponent(Label).color = tab === 'money' ? 
                new Color(255, 215, 0, 255) : 
                new Color(200, 200, 200, 255);
        }
        if (this.tabYuanbaoBtn) {
            this.tabYuanbaoBtn.node.getComponent(Label).color = tab === 'yuanbao' ? 
                new Color(255, 215, 0, 255) : 
                new Color(200, 200, 200, 255);
        }
        
        // 渲染商品列表
        this.renderItems();
    }
    
    renderItems() {
        if (!this.itemList) return;
        
        const content = this.itemList.content;
        if (!content) return;
        
        // 清空列表
        content.removeAllChildren();
        
        // 筛选当前标签的商品
        const items = SHOP_ITEMS.filter(item => item.currency === 
            (this.currentTab === 'money' ? 'incense_money' : 'yuanbao'));
        
        // 创建商品项
        items.forEach(item => {
            const node = this.createItemNode(item);
            content.addChild(node);
        });
    }
    
    createItemNode(item: typeof SHOP_ITEMS[0]): Node {
        const node = new Node('Item');
        node.setPosition(0, 0, 0);
        
        // 背景
        const bg = new Node('bg');
        node.addChild(bg);
        
        // 图标
        const iconNode = new Node('icon');
        node.addChild(iconNode);
        const iconLabel = iconNode.addComponent(Label);
        iconLabel.string = item.icon;
        iconLabel.fontSize = 40;
        iconNode.setPosition(-120, 20, 0);
        
        // 名称
        const nameNode = new Node('name');
        node.addChild(nameNode);
        const nameLabel = nameNode.addComponent(Label);
        nameLabel.string = item.name;
        nameLabel.fontSize = 18;
        nameLabel.color = new Color(255, 215, 0, 255);
        nameNode.setPosition(-40, 30, 0);
        
        // 描述
        const descNode = new Node('desc');
        node.addChild(descNode);
        const descLabel = descNode.addComponent(Label);
        descLabel.string = item.desc;
        descLabel.fontSize = 12;
        descLabel.color = new Color(170, 170, 170, 255);
        descNode.setPosition(-40, 5, 0);
        
        // 价格
        const priceNode = new Node('price');
        node.addChild(priceNode);
        const priceLabel = priceNode.addComponent(Label);
        priceLabel.string = `${item.currency === 'incense_money' ? '💰' : '💎'} ${item.price}`;
        priceLabel.fontSize = 14;
        priceNode.setPosition(-40, -25, 0);
        
        // 购买按钮
        const btnNode = new Node('buyBtn');
        node.addChild(btnNode);
        btnNode.setPosition(100, 0, 0);
        
        const btn = btnNode.addComponent(Button);
        const btnLabel = btnNode.addComponent(Label);
        btnLabel.string = '购买';
        btnLabel.fontSize = 14;
        
        btnNode.on('click', () => this.onBuyItem(item));
        
        // 设置节点大小
        node.getComponent(require('cc').UITransform)?.setContentSize(300, 80);
        
        return node;
    }
    
    onBuyItem(item: typeof SHOP_ITEMS[0]) {
        const data = this.playerMgr.getPlayerData();
        
        // 检查货币
        const currencyKey = item.currency as keyof typeof data;
        const currentAmount = data[currencyKey] as number;
        
        if (currentAmount < item.price) {
            this.showMessage(item.currency === 'incense_money' ? '香火钱不足！' : '元宝不足！');
            return;
        }
        
        // 扣除货币
        this.playerMgr.addResource(item.currency as any, -item.price);
        
        // 发放物品
        let quantity = 1;
        if (item.id === 'incense_sticks_pack') quantity = 10;
        if (item.id === 'candles_pack') quantity = 5;
        if (item.id === 'fragments_pack') quantity = 20;
        
        if (item.type === 'buff' && item.id === 'shield') {
            // 激活护庙符
            data.shieldActive = true;
            data.shieldEndTime = Date.now() + 24 * 60 * 60 * 1000;
            this.showMessage('🛡️ 护庙符激活！24小时内防止被化缘');
        } else {
            // 增加道具
            this.playerMgr.addResource(item.id as any, quantity);
            this.showMessage(`购买成功！${item.name} +${quantity}`);
        }
        
        this.updateUI();
    }
    
    onBack() {
        director.loadScene('MainScene');
    }
    
    showMessage(msg: string) {
        console.log(msg);
    }
}
