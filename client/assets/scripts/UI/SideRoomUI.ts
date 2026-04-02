import { _decorator, Component, Node, Label, Button, ScrollView, director } from 'cc';
import { PlayerDataManager } from '../Core/PlayerDataManager';

const { ccclass, property } = _decorator;

@ccclass('SideRoomUI')
export class SideRoomUI extends Component {
    
    @property(Label)
    storageLabel: Label = null;
    
    @property(Label)
    protectedLabel: Label = null;
    
    @property(Button)
    depositBtn: Button = null;
    
    @property(Button)
    withdrawBtn: Button = null;
    
    @property(Button)
    backBtn: Button = null;
    
    private playerMgr: PlayerDataManager = null;
    
    onLoad() {
        this.playerMgr = PlayerDataManager.getInstance();
        this.setupUI();
        this.updateUI();
    }
    
    setupUI() {
        if (this.backBtn) {
            this.backBtn.node.on('click', this.onBack, this);
        }
        if (this.depositBtn) {
            this.depositBtn.node.on('click', this.onDeposit, this);
        }
        if (this.withdrawBtn) {
            this.withdrawBtn.node.on('click', this.onWithdraw, this);
        }
    }
    
    updateUI() {
        const data = this.playerMgr?.getPlayerData();
        if (!data) return;
        
        if (this.storageLabel) {
            this.storageLabel.string = `厢房存储: ${data.templeStorage || 0}`;
        }
        
        if (this.protectedLabel) {
            const isProtected = data.shieldActive && data.shieldEndTime > Date.now();
            this.protectedLabel.string = isProtected ? '🛡️ 受保护' : '⚠️ 无保护';
        }
    }
    
    onDeposit() {
        const data = this.playerMgr.getPlayerData();
        const amount = Math.floor(data.incense_money * 0.5);
        
        if (amount <= 0) {
            this.showMessage('没有足够的香火钱');
            return;
        }
        
        this.playerMgr.addResource('incense_money', -amount);
        data.templeStorage = (data.templeStorage || 0) + amount;
        this.playerMgr.saveData();
        
        this.showMessage(`存入 ${amount} 香火钱到厢房`);
        this.updateUI();
    }
    
    onWithdraw() {
        const data = this.playerMgr.getPlayerData();
        const amount = data.templeStorage || 0;
        
        if (amount <= 0) {
            this.showMessage('厢房没有存储的香火钱');
            return;
        }
        
        this.playerMgr.addResource('incense_money', amount);
        data.templeStorage = 0;
        this.playerMgr.saveData();
        
        this.showMessage(`取出 ${amount} 香火钱`);
        this.updateUI();
    }
    
    onBack() {
        director.loadScene('MainScene');
    }
    
    showMessage(msg: string) {
        console.log(msg);
    }
}
