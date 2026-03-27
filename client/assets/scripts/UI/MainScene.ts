import { _decorator, Component, director, Node, Label, Button } from 'cc';
import { GameManager } from '../Core/GameManager';

const { ccclass, property } = _decorator;

@ccclass('MainScene')
export class MainScene extends Component {
    @property(Label)
    moneyLabel: Label = null;
    
    @property(Label)
    levelLabel: Label = null;
    
    @property(Button)
    templeBtn: Button = null;
    
    @property(Button)
    almsBtn: Button = null;
    
    @property(Button)
    upgradeBtn: Button = null;
    
    onLoad() {
        this.updateUI();
        
        if (this.templeBtn) {
            this.templeBtn.node.on('click', () => director.loadScene('TempleScene'), this);
        }
        if (this.almsBtn) {
            this.almsBtn.node.on('click', () => director.loadScene('AlmsScene'), this);
        }
        if (this.upgradeBtn) {
            this.upgradeBtn.node.on('click', () => this.onUpgrade(), this);
        }
        
        // 每秒恢复法力
        this.schedule(this.recoverMana, 1);
    }
    
    updateUI() {
        const player = GameManager.getInstance().playerData;
        
        if (this.moneyLabel) {
            this.moneyLabel.string = `香火钱: ${player.incense_money}`;
        }
        if (this.levelLabel) {
            const stageName = { clay: '泥胎', wood: '木骨', bronze: '铜身', gold: '金身' };
            this.levelLabel.string = `${stageName[player.stage]} Lv.${player.level}`;
        }
    }
    
    recoverMana() {
        const player = GameManager.getInstance().playerData;
        if (player.mana < 100) {
            player.mana++;
            this.updateUI();
        }
    }
    
    onUpgrade() {
        const player = GameManager.getInstance().playerData;
        
        // 升级需求
        const requirements = { clay: 100, wood: 500, bronze: 2000, gold: 10000 };
        const stages = ['clay', 'wood', 'bronze', 'gold'];
        const currentIndex = stages.indexOf(player.stage);
        
        if (currentIndex >= stages.length - 1) {
            if (this.moneyLabel) this.moneyLabel.string = '已达到最高阶段！';
            return;
        }
        
        const need = requirements[player.stage];
        
        if (player.merit >= need) {
            player.merit -= need;
            player.stage = stages[currentIndex + 1];
            player.level += 5;
            this.updateUI();
            if (this.moneyLabel) this.moneyLabel.string = `升级成功！当前${player.stage}`;
        } else {
            if (this.moneyLabel) this.moneyLabel.string = `功德不足，需要${need}功德`;
        }
    }
}
