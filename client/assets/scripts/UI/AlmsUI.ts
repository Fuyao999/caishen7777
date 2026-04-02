import { _decorator, Component, Node, Label, Button, director } from 'cc';
import { PlayerDataManager } from '../Core/PlayerDataManager';

const { ccclass, property } = _decorator;

// 8个八卦化缘区域
const BAGUA_AREAS = [
    { id: 'tianlu', trigram: '☰', name: '天禄', level: 1, risk: 0.05, reward: 50, color: '#FFD700' },
    { id: 'zhenyue', trigram: '☶', name: '镇岳', level: 3, risk: 0.1, reward: 80, color: '#8B4513' },
    { id: 'longyin', trigram: '☳', name: '龙吟', level: 5, risk: 0.15, reward: 120, color: '#4169E1' },
    { id: 'fuyao', trigram: '☴', name: '扶摇', level: 7, risk: 0.2, reward: 160, color: '#32CD32' },
    { id: 'nanming', trigram: '☲', name: '南明', level: 9, risk: 0.25, reward: 200, color: '#FF4500' },
    { id: 'dibao', trigram: '☷', name: '地宝', level: 2, risk: 0.3, reward: 100, color: '#8B4513' },
    { id: 'ganze', trigram: '☵', name: '甘泽', level: 4, risk: 0.35, reward: 140, color: '#00CED1' },
    { id: 'liquan', trigram: '☱', name: '流泉', level: 6, risk: 0.4, reward: 180, color: '#9370DB' },
];

@ccclass('AlmsUI')
export class AlmsUI extends Component {
    
    @property(Label)
    remainingLabel: Label = null;
    
    @property(Label)
    manaLabel: Label = null;
    
    @property(Node)
    areaContainer: Node = null;
    
    @property(Button)
    backBtn: Button = null;
    
    @property(Node)
    resultPanel: Node = null;
    
    @property(Label)
    resultTitle: Label = null;
    
    @property(Label)
    resultDesc: Label = null;
    
    @property(Button)
    safeBtn: Button = null;
    
    @property(Button)
    riskBtn: Button = null;
    
    @property(Button)
    closeResultBtn: Button = null;
    
    private playerMgr: PlayerDataManager = null;
    private selectedArea: any = null;
    
    onLoad() {
        this.playerMgr = PlayerDataManager.getInstance();
        this.setupUI();
        this.updateUI();
    }
    
    setupUI() {
        if (this.backBtn) {
            this.backBtn.node.on('click', this.onBack, this);
        }
        if (this.safeBtn) {
            this.safeBtn.node.on('click', () => this.onAlms('safe'));
        }
        if (this.riskBtn) {
            this.riskBtn.node.on('click', () => this.onAlms('risk'));
        }
        if (this.closeResultBtn) {
            this.closeResultBtn.node.on('click', this.hideResult, this);
        }
        
        // 隐藏结果面板
        if (this.resultPanel) {
            this.resultPanel.active = false;
        }
    }
    
    updateUI() {
        const data = this.playerMgr?.getPlayerData();
        if (!data) return;
        
        // 更新剩余次数
        if (this.remainingLabel) {
            const remaining = this.playerMgr.getAlmsRemaining();
            this.remainingLabel.string = `今日剩余: ${remaining}/20次`;
        }
        
        // 更新法力
        if (this.manaLabel) {
            this.manaLabel.string = `法力: ${data.mana}/100`;
        }
    }
    
    onSelectArea(areaId: string) {
        const area = BAGUA_AREAS.find(a => a.id === areaId);
        if (!area) return;
        
        const data = this.playerMgr.getPlayerData();
        if (data.level < area.level) {
            this.showMessage(`需要等级 ${area.level} 才能进入`);
            return;
        }
        
        this.selectedArea = area;
        this.showResult(`前往${area.name} (${area.trigram})`, 
            `风险: ${Math.floor(area.risk * 100)}% | 预期收益: ${area.reward} 香火钱\n\n选择化缘方式：`, 
            true);
    }
    
    onAlms(type: 'safe' | 'risk') {
        if (!this.selectedArea) return;
        
        // 检查次数
        const canAlms = this.playerMgr.consumeAlmsChance();
        if (!canAlms) {
            this.showResult('化缘失败', '今日次数已用完（20次）', false);
            return;
        }
        
        // 检查法力
        const hasMana = this.playerMgr.consumeResource('mana', 10);
        if (!hasMana) {
            this.showResult('化缘失败', '法力不足，请等待恢复', false);
            return;
        }
        
        const area = this.selectedArea;
        
        // 稳求/险求影响
        let risk = area.risk;
        let rewardBase = area.reward;
        
        if (type === 'safe') {
            risk *= 0.6;
            rewardBase *= 0.8;
        } else {
            risk *= 1.3;
            rewardBase *= 1.5;
        }
        
        // 随机结果
        const roll = Math.random();
        let result: string;
        let gold: number;
        let merit: number = 0;
        
        // 5种结果：JP大吉大利, BW欧皇降临, NM平安顺遂, SW破财消灾, MS非酋本酋
        if (roll < risk * 0.3) {
            // MS 非酋本酋 (大亏)
            const loss = Math.floor(data.incense_money * 0.15);
            this.playerMgr.addResource('incense_money', -loss);
            result = 'MS';
            gold = -loss;
            this.showResult(`💀 ${area.name} - 非酋本酋`, 
                `惨遭毒手！损失 ${loss} 香火钱`, false);
        } else if (roll < risk) {
            // SW 破财消灾 (小亏)
            const loss = Math.floor(data.incense_money * 0.05);
            this.playerMgr.addResource('incense_money', -loss);
            result = 'SW';
            gold = -loss;
            this.showResult(`💸 ${area.name} - 破财消灾`, 
                `小有损失 ${loss} 香火钱`, false);
        } else if (roll < 1 - risk * 0.5) {
            // NM 平安顺遂 (平)
            gold = Math.floor(rewardBase * 0.5);
            this.playerMgr.addResource('incense_money', gold);
            result = 'NM';
            this.showResult(`☯️ ${area.name} - 平安顺遂`, 
                `平平淡淡，获得 ${gold} 香火钱`, false);
        } else if (roll < 1 - risk * 0.2) {
            // BW 欧皇降临 (小赚)
            gold = Math.floor(rewardBase);
            merit = 1;
            this.playerMgr.addResource('incense_money', gold);
            this.playerMgr.addResource('merit', merit);
            result = 'BW';
            this.showResult(`🎉 ${area.name} - 欧皇降临`, 
                `运气不错！获得 ${gold} 香火钱 +${merit}功德`, false);
        } else {
            // JP 大吉大利 (大赚)
            gold = Math.floor(rewardBase * 1.5);
            merit = 2;
            this.playerMgr.addResource('incense_money', gold);
            this.playerMgr.addResource('merit', merit);
            result = 'JP';
            this.showResult(`🐉 ${area.name} - 大吉大利`, 
                `天降祥瑞！获得 ${gold} 香火钱 +${merit}功德`, false);
        }
        
        this.updateUI();
    }
    
    showResult(title: string, desc: string, showButtons: boolean) {
        if (this.resultPanel) {
            this.resultPanel.active = true;
        }
        if (this.resultTitle) {
            this.resultTitle.string = title;
        }
        if (this.resultDesc) {
            this.resultDesc.string = desc;
        }
        if (this.safeBtn) {
            this.safeBtn.node.active = showButtons;
        }
        if (this.riskBtn) {
            this.riskBtn.node.active = showButtons;
        }
    }
    
    hideResult() {
        if (this.resultPanel) {
            this.resultPanel.active = false;
        }
        this.selectedArea = null;
    }
    
    onBack() {
        director.loadScene('MainScene');
    }
    
    showMessage(msg: string) {
        console.log(msg);
    }
}
