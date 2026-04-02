import { _decorator, Component, Node, Label, Button, ScrollView, director } from 'cc';
import { PlayerDataManager } from '../Core/PlayerDataManager';

const { ccclass, property } = _decorator;

// 云游玩家数据
interface RoamPlayer {
    id: string;
    name: string;
    level: number;
    templeName: string;
    storage: number;
    canAlms: boolean;
}

@ccclass('RoamUI')
export class RoamUI extends Component {
    
    @property(ScrollView)
    playerList: ScrollView = null;
    
    @property(Label)
    visitCountLabel: Label = null;
    
    @property(Label)
    todayIncomeLabel: Label = null;
    
    @property(Button)
    refreshBtn: Button = null;
    
    @property(Button)
    backBtn: Button = null;
    
    @property(Node)
    playerItemPrefab: Node = null;
    
    private playerMgr: PlayerDataManager = null;
    private roamPlayers: RoamPlayer[] = [];
    private readonly MAX_VISITS = 10;
    
    onLoad() {
        this.playerMgr = PlayerDataManager.getInstance();
        this.setupUI();
        this.generateRoamPlayers();
        this.updateUI();
    }
    
    setupUI() {
        if (this.backBtn) {
            this.backBtn.node.on('click', this.onBack, this);
        }
        if (this.refreshBtn) {
            this.refreshBtn.node.on('click', this.onRefresh, this);
        }
    }
    
    generateRoamPlayers() {
        // 模拟生成云游玩家列表
        const names = ['财神爷保佑', '财源滚滚', '金玉满堂', '招财进宝', '富贵吉祥', 
                       '福星高照', '鸿运当头', '日进斗金', '财运亨通', '八方来财'];
        const temples = ['金光寺', '财神庙', '福禄宫', '聚宝殿', '招财阁'];
        
        this.roamPlayers = [];
        for (let i = 0; i < 10; i++) {
            this.roamPlayers.push({
                id: 'R' + i,
                name: names[Math.floor(Math.random() * names.length)] + Math.floor(Math.random() * 100),
                level: Math.floor(Math.random() * 20) + 1,
                templeName: temples[Math.floor(Math.random() * temples.length)],
                storage: Math.floor(Math.random() * 5000) + 1000,
                canAlms: true
            });
        }
        
        this.renderPlayers();
    }
    
    updateUI() {
        const data = this.playerMgr?.getPlayerData();
        if (!data) return;
        
        if (this.visitCountLabel) {
            const visitCount = data.visitCount || 0;
            this.visitCountLabel.string = `今日拜访: ${visitCount}/${this.MAX_VISITS}`;
        }
        
        if (this.todayIncomeLabel) {
            const income = data.todayAlmsIncome || 0;
            this.todayIncomeLabel.string = `今日收益: 💰${income}`;
        }
    }
    
    renderPlayers() {
        if (!this.playerList) return;
        
        const content = this.playerList.content;
        if (!content) return;
        
        content.removeAllChildren();
        
        this.roamPlayers.forEach(player => {
            const node = this.createPlayerNode(player);
            content.addChild(node);
        });
    }
    
    createPlayerNode(player: RoamPlayer): Node {
        const node = new Node('PlayerItem');
        
        // 头像
        const avatarNode = new Node('avatar');
        node.addChild(avatarNode);
        const avatarLabel = avatarNode.addComponent(Label);
        avatarLabel.string = '🏛️';
        avatarLabel.fontSize = 30;
        avatarNode.setPosition(-130, 0, 0);
        
        // 名称
        const nameNode = new Node('name');
        node.addChild(nameNode);
        const nameLabel = nameNode.addComponent(Label);
        nameLabel.string = player.name;
        nameLabel.fontSize = 16;
        nameLabel.color = new (require('cc')).Color(255, 215, 0, 255);
        nameNode.setPosition(-50, 15, 0);
        
        // 庙宇
        const templeNode = new Node('temple');
        node.addChild(templeNode);
        const templeLabel = templeNode.addComponent(Label);
        templeLabel.string = `${player.templeName} Lv.${player.level}`;
        templeLabel.fontSize = 12;
        templeLabel.color = new (require('cc')).Color(170, 170, 170, 255);
        templeNode.setPosition(-50, -5, 0);
        
        // 存储
        const storageNode = new Node('storage');
        node.addChild(storageNode);
        const storageLabel = storageNode.addComponent(Label);
        storageLabel.string = `💰 ${player.storage}`;
        storageLabel.fontSize = 12;
        storageLabel.color = new (require('cc')).Color(255, 200, 100, 255);
        storageNode.setPosition(-50, -25, 0);
        
        // 化缘按钮
        const btnNode = new Node('almsBtn');
        node.addChild(btnNode);
        btnNode.setPosition(100, 0, 0);
        
        const btn = btnNode.addComponent(Button);
        const btnLabel = btnNode.addComponent(Label);
        btnLabel.fontSize = 12;
        
        if (player.canAlms) {
            btnLabel.string = '🚶 化缘';
            btnLabel.color = new (require('cc')).Color(255, 215, 0, 255);
            btnNode.on('click', () => this.onAlmsPlayer(player));
        } else {
            btnLabel.string = '❌ 已访问';
            btnLabel.color = new (require('cc')).Color(170, 170, 170, 255);
        }
        
        return node;
    }
    
    onAlmsPlayer(player: RoamPlayer) {
        const data = this.playerMgr.getPlayerData();
        
        // 检查拜访次数
        const visitCount = data.visitCount || 0;
        if (visitCount >= this.MAX_VISITS) {
            this.showMessage('今日拜访次数已用完（10次）');
            return;
        }
        
        // 检查护庙符
        if (data.shieldActive && data.shieldEndTime > Date.now()) {
            this.showMessage('对方有护庙符保护，无法化缘');
            return;
        }
        
        // 随机获得香火钱（偷取10%-30%）
        const stealRate = 0.1 + Math.random() * 0.2;
        const stealAmount = Math.floor(player.storage * stealRate);
        
        // 增加玩家香火钱
        this.playerMgr.addResource('incense_money', stealAmount);
        
        // 更新今日拜访数据
        data.visitCount = visitCount + 1;
        data.todayAlmsIncome = (data.todayAlmsIncome || 0) + stealAmount;
        
        // 标记已访问
        player.canAlms = false;
        
        this.showMessage(`🚶 化缘成功！从 ${player.name} 获得 💰${stealAmount}`);
        this.updateUI();
        this.renderPlayers();
    }
    
    onRefresh() {
        this.showMessage('刷新列表...');
        this.generateRoamPlayers();
    }
    
    onBack() {
        director.loadScene('MainScene');
    }
    
    showMessage(msg: string) {
        console.log(msg);
    }
}
