import { _decorator, Component, director, Node, Label, Button, Vec3, Color, sys } from 'cc';
import { PlayerDataManager } from './Core/PlayerDataManager';

const { ccclass, property } = _decorator;

// 九位财神数据
const GODS = [
    { id: 'caishen', name: '赵公明', title: '正财神', effect: '香火钱+20%', bonus: 1.2 },
    { id: 'wencaishen', name: '比干', title: '文财神', effect: '法力上限+10', bonus: 1 },
    { id: 'wucaishen', name: '关公', title: '武财神', effect: '化缘收益+15%', bonus: 1.15 },
    { id: 'piancaishen', name: '范蠡', title: '偏财神', effect: '暴击率+5%', bonus: 1 },
    { id: 'shengcai', name: '李诡祖', title: '增福财神', effect: '供奉功德+10%', bonus: 1.1 },
    { id: 'lucaishen', name: '沈万三', title: '禄财神', effect: '法力回复+20%', bonus: 1 },
    { id: 'shoucaishen', name: '刘海蟾', title: '寿财神', effect: '香火钱上限+1000', bonus: 1 },
    { id: 'xicaishen', name: '子贡', title: '喜财神', effect: '每日首供双倍', bonus: 1 },
    { id: 'caishenpo', name: '财神奶奶', title: '财神夫人', effect: '化缘风险-10%', bonus: 1 },
];

@ccclass('Game')
export class Game extends Component {
    
    @property(Label)
    statusLabel: Label = null;
    
    @property(Node)
    mainView: Node = null;
    
    @property(Node)
    templeView: Node = null;
    
    @property(Node)
    almsView: Node = null;
    
    private playerMgr: PlayerDataManager = null;
    private selectedGod: number = 0;
    
    onLoad() {
        // 获取PlayerDataManager实例
        this.playerMgr = PlayerDataManager.getInstance();
        
        // 如果没有玩家数据，创建新玩家
        if (!this.playerMgr.getPlayerData()) {
            this.playerMgr.createNewPlayer('玩家' + Math.floor(Math.random() * 10000));
        }
        
        this.schedule(this.onSecondUpdate, 1);
        this.updateUI();
    }
    
    // 每秒更新（用于点香倒计时、法力恢复等）
    onSecondUpdate() {
        this.updateUI();
    }
    
    // 更新UI
    updateUI() {
        const data = this.playerMgr.getPlayerData();
        if (!data) return;
        
        // 更新顶部状态栏
        if (this.statusLabel) {
            const incenseStatus = this.playerMgr.getIncenseStatus();
            const incenseText = incenseStatus.active 
                ? ` [${incenseStatus.type} ${this.formatTime(incenseStatus.remainingTime)}]` 
                : '';
            
            this.statusLabel.string = 
                `Lv.${data.level} ${data.realm} | ` +
                `💰${data.incense_money} | ` +
                `💎${data.yuanbao} | ` +
                `🙏${data.merit} | ` +
                `✨${data.mana}/100` +
                incenseText;
        }
        
        // 更新主界面
        this.updateMainView();
    }
    
    // 更新主界面
    updateMainView() {
        if (!this.mainView) return;
        
        const data = this.playerMgr.getPlayerData();
        const titleLabel = this.mainView.getChildByName('title')?.getComponent(Label);
        const infoLabel = this.mainView.getChildByName('info')?.getComponent(Label);
        
        if (titleLabel) {
            titleLabel.string = `${data.temple.name}`;
        }
        
        if (infoLabel) {
            const remaining = this.playerMgr.getAlmsRemaining();
            infoLabel.string = 
                `等级: ${data.level}  境界: ${data.realm}\n` +
                `香火钱: ${data.incense_money}/${data.temple.storageLimit}\n` +
                `化缘次数: ${remaining}/20`;
        }
    }
    
    // 显示庙宇界面
    showTempleView() {
        if (!this.templeView) return;
        
        this.mainView.active = false;
        this.templeView.active = true;
        
        const data = this.playerMgr.getPlayerData();
        const god = GODS[this.selectedGod];
        
        // 更新财神信息
        const godNameLabel = this.templeView.getChildByName('godName')?.getComponent(Label);
        const godEffectLabel = this.templeView.getChildByName('godEffect')?.getComponent(Label);
        const incenseLabel = this.templeView.getChildByName('incenseInfo')?.getComponent(Label);
        
        if (godNameLabel) godNameLabel.string = `当前供奉: ${god.name} (${god.title})`;
        if (godEffectLabel) godEffectLabel.string = `效果: ${god.effect}`;
        
        // 更新点香状态
        const status = this.playerMgr.getIncenseStatus();
        if (incenseLabel) {
            if (status.active) {
                incenseLabel.string = `供奉中: ${status.type} (${this.formatTime(status.remainingTime)})`;
                incenseLabel.color = new Color(100, 255, 100, 255);
            } else {
                incenseLabel.string = '暂无供奉';
                incenseLabel.color = new Color(200, 200, 200, 255);
            }
        }
    }
    
    // 显示化缘界面
    showAlmsView() {
        if (!this.almsView) return;
        
        this.mainView.active = false;
        this.almsView.active = true;
        
        const remaining = this.playerMgr.getAlmsRemaining();
        const infoLabel = this.almsView.getChildByName('info')?.getComponent(Label);
        
        if (infoLabel) {
            infoLabel.string = `今日剩余化缘次数: ${remaining}/20`;
        }
    }
    
    // 返回主界面
    backToMain() {
        if (this.templeView) this.templeView.active = false;
        if (this.almsView) this.almsView.active = false;
        if (this.mainView) this.mainView.active = true;
        this.updateUI();
    }
    
    // 切换财神
    changeGod(delta: number) {
        this.selectedGod = (this.selectedGod + delta + GODS.length) % GODS.length;
        this.showTempleView();
    }
    
    // 点香供奉
    onOfferIncense(type: string) {
        const typeMap: { [key: string]: 'stick' | 'candle' | 'paper' | 'fruit' } = {
            'stick': 'stick',
            'candle': 'candle',
            'paper': 'paper',
            'fruit': 'fruit',
        };
        
        const incenseType = typeMap[type];
        if (!incenseType) return;
        
        const success = this.playerMgr.offerIncense(incenseType);
        
        if (success) {
            const god = GODS[this.selectedGod];
            this.showMessage(`🙏 供奉${god.name}成功！财神保佑！`);
        } else {
            this.showMessage('❌ 供奉失败，请检查资源或是否有进行中的供奉');
        }
        
        this.showTempleView();
    }
    
    // 领取庙宇收益
    onCollectIncome() {
        const income = this.playerMgr.calculateTempleOutput();
        if (income > 0) {
            this.playerMgr.collectTempleIncome();
            this.showMessage(`💰 领取庙宇收益 ${income} 香火钱！`);
        } else {
            this.showMessage('暂无收益可领取');
        }
        this.updateUI();
    }
    
    // 化缘（简化版）
    onGoAlms(region: string) {
        const canAlms = this.playerMgr.consumeAlmsChance();
        
        if (!canAlms) {
            this.showMessage('❌ 今日化缘次数已用完（20次）');
            return;
        }
        
        // 消耗法力
        const hasMana = this.playerMgr.consumeResource('mana', 10);
        if (!hasMana) {
            this.showMessage('❌ 法力不足，请等待恢复');
            return;
        }
        
        // 简化版化缘逻辑
        const riskMap: { [key: string]: number } = { 'safe': 0.1, 'medium': 0.25, 'risky': 0.4, 'danger': 0.55 };
        const rewardMap: { [key: string]: number } = { 'safe': 100, 'medium': 200, 'risky': 350, 'danger': 500 };
        
        const risk = riskMap[region] || 0.2;
        const baseReward = rewardMap[region] || 150;
        
        if (Math.random() < risk) {
            // 失败
            const data = this.playerMgr.getPlayerData();
            const loss = Math.floor(data.incense_money * 0.1);
            this.playerMgr.addResource('incense_money', -loss);
            this.showMessage(`💀 化缘遭遇不幸！损失 ${loss} 香火钱`);
        } else {
            // 成功
            const reward = Math.floor(baseReward * (0.8 + Math.random() * 0.4));
            this.playerMgr.addResource('incense_money', reward);
            this.playerMgr.addResource('merit', 1);
            this.showMessage(`✅ 化缘成功！获得 ${reward} 香火钱 +1功德`);
        }
        
        this.showAlmsView();
    }
    
    // 显示消息
    showMessage(msg: string) {
        // 可以在这里实现弹窗或浮动文字
        console.log(msg);
        
        // 临时用状态栏显示
        if (this.statusLabel) {
            const originalText = this.statusLabel.string;
            this.statusLabel.string = msg;
            setTimeout(() => {
                this.updateUI();
            }, 2000);
        }
    }
    
    // 格式化时间
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
