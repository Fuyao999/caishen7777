import { _decorator, Component, Node, Label, Button, director, Vec3 } from 'cc';
import { PlayerDataManager } from '../Core/PlayerDataManager';

const { ccclass, property } = _decorator;

// 九位财神
const GODS = [
    { id: 'zhaogongming', name: '赵公明', title: '正财神', effect: '香火钱+20%', icon: '🧧' },
    { id: 'bigang', name: '比干', title: '文财神', effect: '法力上限+10', icon: '📜' },
    { id: 'guangong', name: '关公', title: '武财神', effect: '化缘收益+15%', icon: '⚔️' },
    { id: 'fanli', name: '范蠡', title: '偏财神', effect: '暴击率+5%', icon: '💰' },
    { id: 'liguizu', name: '李诡祖', title: '增福财神', effect: '供奉功德+10%', icon: '✨' },
    { id: 'shenwansan', name: '沈万三', title: '禄财神', effect: '法力回复+20%', icon: '📈' },
    { id: 'liuhaichan', name: '刘海蟾', title: '寿财神', effect: '香火钱上限+1000', icon: '🐸' },
    { id: 'zigong', name: '子贡', title: '喜财神', effect: '每日首供双倍', icon: '🎊' },
    { id: 'caishenpo', name: '财神奶奶', title: '财神夫人', effect: '化缘风险-10%', icon: '👵' },
];

@ccclass('TempleUI')
export class TempleUI extends Component {
    
    @property(Label)
    templeNameLabel: Label = null;
    
    @property(Label)
    templeLevelLabel: Label = null;
    
    @property(Label)
    incomeLabel: Label = null;
    
    @property(Label)
    incenseStatusLabel: Label = null;
    
    @property(Label)
    godNameLabel: Label = null;
    
    @property(Label)
    godEffectLabel: Label = null;
    
    @property(Button)
    prevGodBtn: Button = null;
    
    @property(Button)
    nextGodBtn: Button = null;
    
    @property(Button)
    offerStickBtn: Button = null;
    
    @property(Button)
    offerCandleBtn: Button = null;
    
    @property(Button)
    offerPaperBtn: Button = null;
    
    @property(Button)
    offerFruitBtn: Button = null;
    
    @property(Button)
    collectBtn: Button = null;
    
    @property(Button)
    backBtn: Button = null;
    
    private playerMgr: PlayerDataManager = null;
    private selectedGod: number = 0;
    
    onLoad() {
        this.playerMgr = PlayerDataManager.getInstance();
        this.setupUI();
        this.schedule(this.updateUI, 1);
    }
    
    setupUI() {
        // 绑定按钮事件
        if (this.prevGodBtn) {
            this.prevGodBtn.node.on('click', this.onPrevGod, this);
        }
        if (this.nextGodBtn) {
            this.nextGodBtn.node.on('click', this.onNextGod, this);
        }
        if (this.offerStickBtn) {
            this.offerStickBtn.node.on('click', () => this.onOfferIncense('stick'));
        }
        if (this.offerCandleBtn) {
            this.offerCandleBtn.node.on('click', () => this.onOfferIncense('candle'));
        }
        if (this.offerPaperBtn) {
            this.offerPaperBtn.node.on('click', () => this.onOfferIncense('paper'));
        }
        if (this.offerFruitBtn) {
            this.offerFruitBtn.node.on('click', () => this.onOfferIncense('fruit'));
        }
        if (this.collectBtn) {
            this.collectBtn.node.on('click', this.onCollectIncome, this);
        }
        if (this.backBtn) {
            this.backBtn.node.on('click', this.onBack, this);
        }
    }
    
    updateUI() {
        const data = this.playerMgr?.getPlayerData();
        if (!data) return;
        
        // 更新庙宇信息
        if (this.templeNameLabel) {
            this.templeNameLabel.string = data.temple.name;
        }
        if (this.templeLevelLabel) {
            this.templeLevelLabel.string = `${data.temple.typeName} (Lv.${data.level})`;
        }
        if (this.incomeLabel) {
            const output = this.playerMgr.calculateTempleOutput();
            this.incomeLabel.string = `每小时产出: ${output} 香火钱`;
        }
        
        // 更新点香状态
        const incenseStatus = this.playerMgr.getIncenseStatus();
        if (this.incenseStatusLabel) {
            if (incenseStatus.active) {
                this.incenseStatusLabel.string = `供奉中: ${incenseStatus.type} (${this.formatTime(incenseStatus.remainingTime)})`;
            } else {
                this.incenseStatusLabel.string = '暂无供奉';
            }
        }
        
        // 更新财神信息
        const god = GODS[this.selectedGod];
        if (this.godNameLabel) {
            this.godNameLabel.string = `${god.icon} ${god.name} (${god.title})`;
        }
        if (this.godEffectLabel) {
            this.godEffectLabel.string = `效果: ${god.effect}`;
        }
    }
    
    onPrevGod() {
        this.selectedGod = (this.selectedGod - 1 + GODS.length) % GODS.length;
        this.updateUI();
    }
    
    onNextGod() {
        this.selectedGod = (this.selectedGod + 1) % GODS.length;
        this.updateUI();
    }
    
    onOfferIncense(type: 'stick' | 'candle' | 'paper' | 'fruit') {
        const success = this.playerMgr.offerIncense(type);
        
        if (success) {
            const god = GODS[this.selectedGod];
            this.showMessage(`🙏 供奉${god.name}成功！财神保佑！`);
        } else {
            this.showMessage('❌ 供奉失败，请检查资源');
        }
        
        this.updateUI();
    }
    
    onCollectIncome() {
        const income = this.playerMgr.calculateTempleOutput();
        if (income > 0) {
            this.playerMgr.collectTempleIncome();
            this.showMessage(`💰 领取 ${income} 香火钱！`);
        } else {
            this.showMessage('暂无收益可领取');
        }
        this.updateUI();
    }
    
    onBack() {
        director.loadScene('MainScene');
    }
    
    showMessage(msg: string) {
        console.log(msg);
        // 可以在这里实现一个浮动消息提示
    }
    
    formatTime(ms: number): string {
        const seconds = Math.floor(ms / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        
        if (hours > 0) {
            return `${hours}时${minutes % 60}分`;
        } else if (minutes > 0) {
            return `${minutes}分${seconds % 60}秒`;
        } else {
            return `${seconds}秒`;
        }
    }
}
