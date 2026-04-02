import { _decorator, Component, Node, Label, Button, ScrollView, director } from 'cc';
import { PlayerDataManager } from '../Core/PlayerDataManager';

const { ccclass, property } = _decorator;

// 道具配置
const ITEMS = {
    incense_sticks: { name: '线香', icon: '📿', desc: '供奉2小时' },
    candles: { name: '红烛', icon: '🕯️', desc: '供奉4小时' },
    gold_paper: { name: '金纸', icon: '📜', desc: '供奉6小时' },
    fruits: { name: '供果', icon: '🍎', desc: '供奉8小时' },
    fragments: { name: '碎片', icon: '🔷', desc: '合成招财幡' },
    banners: { name: '招财幡', icon: '🎏', desc: '升级庙宇必备' },
    shield: { name: '护庙符', icon: '🛡️', desc: '24小时防化缘' }
};

@ccclass('InventoryUI')
export class InventoryUI extends Component {
    
    @property(ScrollView)
    itemGrid: ScrollView = null;
    
    @property(Label)
    capacityLabel: Label = null;
    
    @property(Button)
    backBtn: Button = null;
    
    @property(Node)
    itemPrefab: Node = null;
    
    @property(Node)
    detailPanel: Node = null;
    
    @property(Label)
    detailName: Label = null;
    
    @property(Label)
    detailDesc: Label = null;
    
    @property(Button)
    useBtn: Button = null;
    
    @property(Button)
    closeDetailBtn: Button = null;
    
    private playerMgr: PlayerDataManager = null;
    private selectedItem: string = null;
    private readonly CAPACITY = 100;
    
    onLoad() {
        this.playerMgr = PlayerDataManager.getInstance();
        this.setupUI();
        this.updateUI();
        
        if (this.detailPanel) {
            this.detailPanel.active = false;
        }
    }
    
    setupUI() {
        if (this.backBtn) {
            this.backBtn.node.on('click', this.onBack, this);
        }
        if (this.useBtn) {
            this.useBtn.node.on('click', this.onUseItem, this);
        }
        if (this.closeDetailBtn) {
            this.closeDetailBtn.node.on('click', this.hideDetail, this);
        }
    }
    
    updateUI() {
        const data = this.playerMgr?.getPlayerData();
        if (!data) return;
        
        // 计算已用格子
        let used = 0;
        Object.keys(ITEMS).forEach(key => {
            const count = data[key] || 0;
            if (count > 0) used++;
        });
        
        if (this.capacityLabel) {
            this.capacityLabel.string = `背包: ${used}/${this.CAPACITY}`;
        }
        
        this.renderItems();
    }
    
    renderItems() {
        if (!this.itemGrid) return;
        
        const content = this.itemGrid.content;
        if (!content) return;
        
        content.removeAllChildren();
        
        const data = this.playerMgr.getPlayerData();
        
        Object.entries(ITEMS).forEach(([key, item]) => {
            const count = data[key] || 0;
            if (count > 0) {
                const node = this.createItemNode(key, item, count);
                content.addChild(node);
            }
        });
    }
    
    createItemNode(key: string, item: typeof ITEMS[string], count: number): Node {
        const node = new Node('Item');
        
        // 背景
        const bg = new Node('bg');
        node.addChild(bg);
        
        // 图标
        const iconNode = new Node('icon');
        node.addChild(iconNode);
        const iconLabel = iconNode.addComponent(Label);
        iconLabel.string = item.icon;
        iconLabel.fontSize = 40;
        iconNode.setPosition(0, 10, 0);
        
        // 名称
        const nameNode = new Node('name');
        node.addChild(nameNode);
        const nameLabel = nameNode.addComponent(Label);
        nameLabel.string = item.name;
        nameLabel.fontSize = 12;
        nameNode.setPosition(0, -20, 0);
        
        // 数量
        const countNode = new Node('count');
        node.addChild(countNode);
        const countLabel = countNode.addComponent(Label);
        countLabel.string = `×${count}`;
        countLabel.fontSize = 11;
        countLabel.color = new (require('cc')).Color(255, 215, 0, 255);
        countNode.setPosition(25, 25, 0);
        
        // 点击事件
        node.on('click', () => this.showDetail(key, item, count));
        
        return node;
    }
    
    showDetail(key: string, item: typeof ITEMS[string], count: number) {
        this.selectedItem = key;
        
        if (this.detailPanel) {
            this.detailPanel.active = true;
        }
        if (this.detailName) {
            this.detailName.string = `${item.icon} ${item.name} ×${count}`;
        }
        if (this.detailDesc) {
            this.detailDesc.string = item.desc;
        }
        
        // 护庙符直接使用，其他道具去庙宇使用
        if (this.useBtn) {
            const btnLabel = this.useBtn.node.getComponent(Label);
            if (btnLabel) {
                btnLabel.string = key === 'shield' ? '使用' : '去庙宇使用';
            }
        }
    }
    
    hideDetail() {
        if (this.detailPanel) {
            this.detailPanel.active = false;
        }
        this.selectedItem = null;
    }
    
    onUseItem() {
        if (!this.selectedItem) return;
        
        const data = this.playerMgr.getPlayerData();
        const count = data[this.selectedItem] || 0;
        
        if (count <= 0) {
            this.showMessage('道具数量不足');
            return;
        }
        
        if (this.selectedItem === 'shield') {
            // 使用护庙符
            data.shieldActive = true;
            data.shieldEndTime = Date.now() + 24 * 60 * 60 * 1000;
            this.playerMgr.consumeResource('shield', 1);
            this.showMessage('🛡️ 护庙符激活！24小时内防止被化缘');
            this.hideDetail();
            this.updateUI();
        } else if (this.selectedItem === 'fragments' && count >= 4) {
            // 合成招财幡
            this.playerMgr.consumeResource('fragments', 4);
            this.playerMgr.addResource('banners', 1);
            this.showMessage('🔨 合成成功！招财幡+1');
            this.updateUI();
        } else if (this.selectedItem === 'fragments') {
            this.showMessage('碎片不足4个，无法合成');
        } else {
            // 供奉道具，跳转到庙宇
            this.showMessage('请前往庙宇使用此道具');
            this.hideDetail();
            director.loadScene('TempleScene');
        }
    }
    
    onBack() {
        director.loadScene('MainScene');
    }
    
    showMessage(msg: string) {
        console.log(msg);
    }
}
