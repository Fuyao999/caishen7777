import { _decorator, Component, Node, Label, Button, ScrollView, director } from 'cc';
import { PlayerDataManager } from '../Core/PlayerDataManager';

const { ccclass, property } = _decorator;

// 每日任务配置
const DAILY_TASKS = [
    {
        id: 'worship3',
        name: '虔诚供奉',
        desc: '供奉财神3次',
        target: 3,
        reward: { incense_money: 200, merit: 5 },
        check: (data: any) => data.worshipCount >= 3
    },
    {
        id: 'alms5',
        name: '外出化缘',
        desc: '完成5次化缘',
        target: 5,
        reward: { incense_money: 300, fragments: 2 },
        check: (data: any) => data.almsCount >= 5
    },
    {
        id: 'collect1',
        name: '收取香火',
        desc: '从庙宇收取1次香火钱',
        target: 1,
        reward: { incense_money: 100, merit: 3 },
        check: (data: any) => data.hasCollectedToday
    },
    {
        id: 'friendWorship1',
        name: '代友点香',
        desc: '为好友代点香1次',
        target: 1,
        reward: { shanyuan: 20, merit: 5 },
        check: (data: any) => data.friendWorshipCount >= 1
    },
    {
        id: 'shop1',
        name: '商城购物',
        desc: '在商城购买任意商品1次',
        target: 1,
        reward: { incense_money: 150, fragments: 1 },
        check: (data: any) => data.shopCount >= 1
    },
    {
        id: 'login',
        name: '每日登录',
        desc: '登录游戏',
        target: 1,
        reward: { incense_money: 500, incense_sticks: 2 },
        check: (data: any) => true
    }
];

@ccclass('TaskUI')
export class TaskUI extends Component {
    
    @property(ScrollView)
    taskList: ScrollView = null;
    
    @property(Label)
    completedLabel: Label = null;
    
    @property(Button)
    backBtn: Button = null;
    
    @property(Node)
    taskItemPrefab: Node = null;
    
    private playerMgr: PlayerDataManager = null;
    private completedTasks: string[] = [];
    
    onLoad() {
        this.playerMgr = PlayerDataManager.getInstance();
        this.loadCompletedTasks();
        this.setupUI();
        this.updateUI();
    }
    
    setupUI() {
        if (this.backBtn) {
            this.backBtn.node.on('click', this.onBack, this);
        }
    }
    
    loadCompletedTasks() {
        const saved = localStorage.getItem('caishen_tasks_' + this.getTodayKey());
        if (saved) {
            this.completedTasks = JSON.parse(saved);
        }
    }
    
    saveCompletedTasks() {
        localStorage.setItem('caishen_tasks_' + this.getTodayKey(), JSON.stringify(this.completedTasks));
    }
    
    getTodayKey(): string {
        return new Date().toDateString().replace(/\s/g, '');
    }
    
    updateUI() {
        const data = this.playerMgr?.getPlayerData();
        if (!data) return;
        
        // 更新完成数量
        if (this.completedLabel) {
            this.completedLabel.string = `已完成: ${this.completedTasks.length}/${DAILY_TASKS.length}`;
        }
        
        // 渲染任务列表
        this.renderTasks();
    }
    
    renderTasks() {
        if (!this.taskList) return;
        
        const content = this.taskList.content;
        if (!content) return;
        
        content.removeAllChildren();
        
        const data = this.playerMgr.getPlayerData();
        
        DAILY_TASKS.forEach(task => {
            const isCompleted = this.completedTasks.includes(task.id);
            const canClaim = !isCompleted && task.check(data);
            
            const node = this.createTaskNode(task, isCompleted, canClaim);
            content.addChild(node);
        });
    }
    
    createTaskNode(task: typeof DAILY_TASKS[0], isCompleted: boolean, canClaim: boolean): Node {
        const node = new Node('TaskItem');
        
        // 名称
        const nameNode = new Node('name');
        node.addChild(nameNode);
        const nameLabel = nameNode.addComponent(Label);
        nameLabel.string = task.name;
        nameLabel.fontSize = 16;
        nameLabel.color = isCompleted ? 
            new (require('cc')).Color(100, 255, 100, 255) : 
            new (require('cc')).Color(255, 215, 0, 255);
        nameNode.setPosition(-80, 20, 0);
        
        // 描述
        const descNode = new Node('desc');
        node.addChild(descNode);
        const descLabel = descNode.addComponent(Label);
        descLabel.string = task.desc;
        descLabel.fontSize = 12;
        descLabel.color = new (require('cc')).Color(170, 170, 170, 255);
        descNode.setPosition(-80, 0, 0);
        
        // 奖励
        let rewardText = '';
        if (task.reward.incense_money) rewardText += `💰${task.reward.incense_money} `;
        if (task.reward.merit) rewardText += `⭐${task.reward.merit} `;
        if (task.reward.fragments) rewardText += `🔷${task.reward.fragments} `;
        if (task.reward.shanyuan) rewardText += `👥${task.reward.shanyuan} `;
        if (task.reward.incense_sticks) rewardText += `📿${task.reward.incense_sticks} `;
        
        const rewardNode = new Node('reward');
        node.addChild(rewardNode);
        const rewardLabel = rewardNode.addComponent(Label);
        rewardLabel.string = rewardText;
        rewardLabel.fontSize = 11;
        rewardLabel.color = new (require('cc')).Color(255, 200, 100, 255);
        rewardNode.setPosition(-80, -20, 0);
        
        // 按钮
        const btnNode = new Node('btn');
        node.addChild(btnNode);
        btnNode.setPosition(100, 0, 0);
        
        const btn = btnNode.addComponent(Button);
        const btnLabel = btnNode.addComponent(Label);
        btnLabel.fontSize = 12;
        
        if (isCompleted) {
            btnLabel.string = '✅ 已领取';
            btnLabel.color = new (require('cc')).Color(100, 255, 100, 255);
        } else if (canClaim) {
            btnLabel.string = '🎁 领取';
            btnLabel.color = new (require('cc')).Color(255, 215, 0, 255);
            btnNode.on('click', () => this.onClaimReward(task));
        } else {
            btnLabel.string = '⏳ 未完成';
            btnLabel.color = new (require('cc')).Color(170, 170, 170, 255);
        }
        
        return node;
    }
    
    onClaimReward(task: typeof DAILY_TASKS[0]) {
        // 发放奖励
        if (task.reward.incense_money) {
            this.playerMgr.addResource('incense_money', task.reward.incense_money);
        }
        if (task.reward.merit) {
            this.playerMgr.addResource('merit', task.reward.merit);
        }
        if (task.reward.fragments) {
            this.playerMgr.addResource('fragments', task.reward.fragments);
        }
        if (task.reward.shanyuan) {
            this.playerMgr.addResource('shanyuan', task.reward.shanyuan);
        }
        if (task.reward.incense_sticks) {
            this.playerMgr.addResource('incense_sticks', task.reward.incense_sticks);
        }
        
        // 标记完成
        this.completedTasks.push(task.id);
        this.saveCompletedTasks();
        
        this.showMessage(`🎉 任务完成！获得奖励`);
        this.updateUI();
    }
    
    onBack() {
        director.loadScene('MainScene');
    }
    
    showMessage(msg: string) {
        console.log(msg);
    }
}
