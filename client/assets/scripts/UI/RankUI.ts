import { _decorator, Component, Node, Label, Button, ScrollView, director } from 'cc';
import { PlayerDataManager } from '../Core/PlayerDataManager';

const { ccclass, property } = _decorator;

// 排行榜数据
interface RankItem {
    rank: number;
    name: string;
    level: number;
    merit: number;
    isSelf: boolean;
}

@ccclass('RankUI')
export class RankUI extends Component {
    
    @property(ScrollView)
    rankList: ScrollView = null;
    
    @property(Label)
    selfRankLabel: Label = null;
    
    @property(Label)
    selfMeritLabel: Label = null;
    
    @property(Button)
    backBtn: Button = null;
    
    @property(Node)
    rankItemPrefab: Node = null;
    
    private playerMgr: PlayerDataManager = null;
    private rankData: RankItem[] = [];
    
    onLoad() {
        this.playerMgr = PlayerDataManager.getInstance();
        this.setupUI();
        this.generateRankData();
        this.updateUI();
    }
    
    setupUI() {
        if (this.backBtn) {
            this.backBtn.node.on('click', this.onBack, this);
        }
    }
    
    generateRankData() {
        const data = this.playerMgr.getPlayerData();
        
        // 模拟生成排行榜数据
        const names = ['财神下凡', '金玉满堂', '日进斗金', '富贵吉祥', '招财童子',
                       '福星高照', '鸿运当头', '财运亨通', '八方来财', '财源滚滚'];
        
        this.rankData = [];
        
        // 生成其他玩家
        for (let i = 1; i <= 50; i++) {
            this.rankData.push({
                rank: i,
                name: names[Math.floor(Math.random() * names.length)] + (Math.floor(Math.random() * 999) + 1),
                level: Math.floor(Math.random() * 30) + 10,
                merit: Math.floor(Math.random() * 5000) + 1000,
                isSelf: false
            });
        }
        
        // 插入玩家自己
        const selfItem: RankItem = {
            rank: 0,
            name: data.playerName,
            level: data.level,
            merit: data.merit,
            isSelf: true
        };
        
        // 根据功德排序并找到自己的排名
        this.rankData.push(selfItem);
        this.rankData.sort((a, b) => b.merit - a.merit);
        
        // 更新排名
        this.rankData.forEach((item, index) => {
            item.rank = index + 1;
        });
        
        this.renderRank();
    }
    
    updateUI() {
        const data = this.playerMgr?.getPlayerData();
        if (!data) return;
        
        // 找到自己的排名
        const selfItem = this.rankData.find(item => item.isSelf);
        
        if (selfItem && this.selfRankLabel) {
            this.selfRankLabel.string = `我的排名: 第 ${selfItem.rank} 名`;
        }
        
        if (this.selfMeritLabel) {
            this.selfMeritLabel.string = `我的功德: ⭐ ${data.merit}`;
        }
    }
    
    renderRank() {
        if (!this.rankList) return;
        
        const content = this.rankList.content;
        if (!content) return;
        
        content.removeAllChildren();
        
        // 只显示前20名和自己
        const displayData = this.rankData.slice(0, 20);
        const selfInTop20 = displayData.some(item => item.isSelf);
        
        if (!selfInTop20) {
            const selfItem = this.rankData.find(item => item.isSelf);
            if (selfItem) {
                displayData.push(selfItem);
            }
        }
        
        displayData.forEach(item => {
            const node = this.createRankNode(item);
            content.addChild(node);
        });
    }
    
    createRankNode(item: RankItem): Node {
        const node = new Node('RankItem');
        
        // 排名
        const rankNode = new Node('rank');
        node.addChild(rankNode);
        const rankLabel = rankNode.addComponent(Label);
        
        // 前三名特殊显示
        if (item.rank === 1) {
            rankLabel.string = '🥇';
        } else if (item.rank === 2) {
            rankLabel.string = '🥈';
        } else if (item.rank === 3) {
            rankLabel.string = '🥉';
        } else {
            rankLabel.string = `${item.rank}`;
        }
        
        rankLabel.fontSize = item.rank <= 3 ? 24 : 16;
        rankNode.setPosition(-130, 0, 0);
        
        // 名称
        const nameNode = new Node('name');
        node.addChild(nameNode);
        const nameLabel = nameNode.addComponent(Label);
        nameLabel.string = item.name + (item.isSelf ? ' (我)' : '');
        nameLabel.fontSize = 14;
        nameLabel.color = item.isSelf ? 
            new (require('cc')).Color(255, 215, 0, 255) : 
            new (require('cc')).Color(255, 255, 255, 255);
        nameNode.setPosition(-60, 10, 0);
        
        // 等级
        const levelNode = new Node('level');
        node.addChild(levelNode);
        const levelLabel = levelNode.addComponent(Label);
        levelLabel.string = `Lv.${item.level}`;
        levelLabel.fontSize = 12;
        levelLabel.color = new (require('cc')).Color(170, 170, 170, 255);
        levelNode.setPosition(-60, -10, 0);
        
        // 功德
        const meritNode = new Node('merit');
        node.addChild(meritNode);
        const meritLabel = meritNode.addComponent(Label);
        meritLabel.string = `⭐ ${item.merit.toLocaleString()}`;
        meritLabel.fontSize = 14;
        meritLabel.color = new (require('cc')).Color(255, 200, 100, 255);
        meritNode.setPosition(100, 0, 0);
        
        return node;
    }
    
    onBack() {
        director.loadScene('MainScene');
    }
    
    showMessage(msg: string) {
        console.log(msg);
    }
}
