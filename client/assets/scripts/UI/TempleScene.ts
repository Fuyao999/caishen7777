import { _decorator, Component, director, Node, Label, Button } from 'cc';
import { GameManager } from '../Core/GameManager';

const { ccclass, property } = _decorator;

@ccclass('TempleScene')
export class TempleScene extends Component {
    @property(Label)
    statusLabel: Label = null;
    
    @property(Button)
    backBtn: Button = null;
    
    @property(Button)
    worshipBtn: Button = null;
    
    gods = [
        { id: 'caishen', name: '赵公明', effect: '香火钱+20%' },
        { id: 'wencaishen', name: '比干', effect: '法力上限+10' },
        { id: 'wucaishen', name: '关公', effect: '化缘收益+15%' },
        { id: 'piancaishen', name: '范蠡', effect: '暴击率+5%' },
        { id: 'shengcai', name: '李诡祖', effect: '供奉功德+10%' },
        { id: 'lucaishen', name: '沈万三', effect: '法力回复+20%' },
        { id: 'shoucaishen', name: '刘海蟾', effect: '香火钱上限+1000' },
        { id: 'xicaishen', name: '子贡', effect: '每日首供双倍' },
        { id: 'caishenpo', name: '财神奶奶', effect: '化缘风险-10%' }
    ];
    
    currentGod = 0;
    
    onLoad() {
        if (this.backBtn) {
            this.backBtn.node.on('click', () => director.loadScene('MainScene'), this);
        }
        if (this.worshipBtn) {
            this.worshipBtn.node.on('click', this.onWorship, this);
        }
        this.updateDisplay();
    }
    
    updateDisplay() {
        const god = this.gods[this.currentGod];
        if (this.statusLabel) {
            const player = GameManager.getInstance().playerData;
            this.statusLabel.string = `当前供奉: ${god.name}\n效果: ${god.effect}\n线香: ${player.incense_sticks}`;
        }
    }
    
    onWorship() {
        const player = GameManager.getInstance().playerData;
        const god = this.gods[this.currentGod];
        
        if (player.incense_sticks <= 0) {
            if (this.statusLabel) this.statusLabel.string = '线香不足！';
            return;
        }
        
        player.incense_sticks--;
        
        // 计算奖励
        let reward = 10;
        if (god.id === 'caishen') reward = 12;
        
        player.incense_money += reward;
        player.merit += 1;
        
        if (this.statusLabel) {
            this.statusLabel.string = `供奉${god.name}成功！\n获得${reward}香火钱，1功德`;
        }
        
        // 切换下一个财神
        this.currentGod = (this.currentGod + 1) % this.gods.length;
        setTimeout(() => this.updateDisplay(), 2000);
    }
}
