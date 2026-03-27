import { _decorator, Component, director, Node, Label, Button } from 'cc';
import { GameManager } from '../Core/GameManager';

const { ccclass, property } = _decorator;

@ccclass('AlmsScene')
export class AlmsScene extends Component {
    @property(Label)
    statusLabel: Label = null;
    
    @property(Button)
    backBtn: Button = null;
    
    @property(Button)
    eastBtn: Button = null;
    
    @property(Button)
    southBtn: Button = null;
    
    @property(Button)
    westBtn: Button = null;
    
    @property(Button)
    northBtn: Button = null;
    
    regions = {
        east: { name: '东', risk: 0.1, reward: 100 },
        south: { name: '南', risk: 0.2, reward: 200 },
        west: { name: '西', risk: 0.3, reward: 300 },
        north: { name: '北', risk: 0.4, reward: 500 }
    };
    
    onLoad() {
        if (this.backBtn) {
            this.backBtn.node.on('click', () => director.loadScene('MainScene'), this);
        }
        
        if (this.eastBtn) this.eastBtn.node.on('click', () => this.onBeg('east'), this);
        if (this.southBtn) this.southBtn.node.on('click', () => this.onBeg('south'), this);
        if (this.westBtn) this.westBtn.node.on('click', () => this.onBeg('west'), this);
        if (this.northBtn) this.northBtn.node.on('click', () => this.onBeg('north'), this);
        
        this.updateDisplay();
    }
    
    updateDisplay() {
        const player = GameManager.getInstance().playerData;
        if (this.statusLabel) {
            this.statusLabel.string = `法力: ${player.mana}/100\n选择地区化缘:\n东(安全) 南(中等) 西(危险) 北(极危)`;
        }
    }
    
    onBeg(region: string) {
        const player = GameManager.getInstance().playerData;
        const config = this.regions[region];
        
        if (player.mana < 10) {
            if (this.statusLabel) this.statusLabel.string = '法力不足！请等待恢复';
            return;
        }
        
        player.mana -= 10;
        
        // 判定风险
        const random = Math.random();
        if (random < config.risk) {
            // 遇到风险
            const events = ['遇匪', '被骗', '生病', '遇到天灾'];
            const event = events[Math.floor(Math.random() * events.length)];
            const loss = Math.floor(player.incense_money * 0.3);
            player.incense_money = Math.max(0, player.incense_money - loss);
            
            if (this.statusLabel) {
                this.statusLabel.string = `化缘遭遇${event}！\n损失${loss}香火钱`;
            }
        } else {
            // 成功
            const reward = Math.floor(config.reward * (0.8 + Math.random() * 0.4));
            player.incense_money += reward;
            
            if (this.statusLabel) {
                this.statusLabel.string = `化缘成功！\n获得${reward}香火钱`;
            }
        }
        
        setTimeout(() => this.updateDisplay(), 2000);
    }
}
