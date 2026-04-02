import { _decorator, Component, Node, Label, Button, ScrollView, EditBox, director } from 'cc';
import { PlayerDataManager } from '../Core/PlayerDataManager';

const { ccclass, property } = _decorator;

// 好友数据结构
interface Friend {
    id: string;
    name: string;
    level: number;
    merit: number;
    lastLogin: number;
    canWorship: boolean;
}

@ccclass('FriendUI')
export class FriendUI extends Component {
    
    @property(ScrollView)
    friendList: ScrollView = null;
    
    @property(EditBox)
    searchInput: EditBox = null;
    
    @property(Button)
    searchBtn: Button = null;
    
    @property(Button)
    backBtn: Button = null;
    
    @property(Label)
    friendCountLabel: Label = null;
    
    @property(Node)
    friendItemPrefab: Node = null;
    
    private playerMgr: PlayerDataManager = null;
    private friends: Friend[] = [];
    
    onLoad() {
        this.playerMgr = PlayerDataManager.getInstance();
        this.setupUI();
        this.loadFriends();
        this.updateUI();
    }
    
    setupUI() {
        if (this.backBtn) {
            this.backBtn.node.on('click', this.onBack, this);
        }
        if (this.searchBtn) {
            this.searchBtn.node.on('click', this.onSearch, this);
        }
    }
    
    loadFriends() {
        // 从本地存储加载好友列表
        const saved = localStorage.getItem('caishen_friends');
        if (saved) {
            this.friends = JSON.parse(saved);
        }
        this.renderFriends();
    }
    
    saveFriends() {
        localStorage.setItem('caishen_friends', JSON.stringify(this.friends));
    }
    
    updateUI() {
        if (this.friendCountLabel) {
            this.friendCountLabel.string = `好友: ${this.friends.length}/50`;
        }
    }
    
    renderFriends() {
        if (!this.friendList) return;
        
        const content = this.friendList.content;
        if (!content) return;
        
        content.removeAllChildren();
        
        this.friends.forEach(friend => {
            const node = this.createFriendNode(friend);
            content.addChild(node);
        });
    }
    
    createFriendNode(friend: Friend): Node {
        const node = new Node('FriendItem');
        
        // 头像
        const avatarNode = new Node('avatar');
        node.addChild(avatarNode);
        const avatarLabel = avatarNode.addComponent(Label);
        avatarLabel.string = '👤';
        avatarLabel.fontSize = 30;
        avatarNode.setPosition(-130, 0, 0);
        
        // 名称
        const nameNode = new Node('name');
        node.addChild(nameNode);
        const nameLabel = nameNode.addComponent(Label);
        nameLabel.string = friend.name;
        nameLabel.fontSize = 16;
        nameLabel.color = new (require('cc')).Color(255, 215, 0, 255);
        nameNode.setPosition(-60, 15, 0);
        
        // 等级
        const levelNode = new Node('level');
        node.addChild(levelNode);
        const levelLabel = levelNode.addComponent(Label);
        levelLabel.string = `Lv.${friend.level}`;
        levelLabel.fontSize = 12;
        levelLabel.color = new (require('cc')).Color(170, 170, 170, 255);
        levelNode.setPosition(-60, -10, 0);
        
        // 代点香按钮
        if (friend.canWorship) {
            const worshipBtn = new Node('worshipBtn');
            node.addChild(worshipBtn);
            worshipBtn.setPosition(80, 0, 0);
            
            const btn = worshipBtn.addComponent(Button);
            const btnLabel = worshipBtn.addComponent(Label);
            btnLabel.string = '🙏 代点香';
            btnLabel.fontSize = 12;
            
            worshipBtn.on('click', () => this.onWorshipForFriend(friend));
        }
        
        // 删除按钮
        const deleteBtn = new Node('deleteBtn');
        node.addChild(deleteBtn);
        deleteBtn.setPosition(130, 0, 0);
        
        const delBtn = deleteBtn.addComponent(Button);
        const delLabel = deleteBtn.addComponent(Label);
        delLabel.string = '❌';
        delLabel.fontSize = 14;
        
        deleteBtn.on('click', () => this.onDeleteFriend(friend));
        
        return node;
    }
    
    onSearch() {
        const keyword = this.searchInput?.string?.trim();
        if (!keyword) {
            this.showMessage('请输入玩家ID或昵称');
            return;
        }
        
        // 模拟搜索
        this.showMessage(`搜索: ${keyword}...`);
        
        // 实际应该调API搜索玩家
        // 这里模拟添加好友
        if (this.friends.length >= 50) {
            this.showMessage('好友数量已达上限（50人）');
            return;
        }
        
        const newFriend: Friend = {
            id: 'F' + Date.now(),
            name: keyword,
            level: Math.floor(Math.random() * 20) + 1,
            merit: Math.floor(Math.random() * 1000),
            lastLogin: Date.now(),
            canWorship: true
        };
        
        this.friends.push(newFriend);
        this.saveFriends();
        this.renderFriends();
        this.updateUI();
        
        this.showMessage(`已添加好友: ${keyword}`);
        if (this.searchInput) {
            this.searchInput.string = '';
        }
    }
    
    onWorshipForFriend(friend: Friend) {
        const data = this.playerMgr.getPlayerData();
        
        if (data.incense_sticks < 1) {
            this.showMessage('线香不足，无法代点香');
            return;
        }
        
        // 消耗线香
        this.playerMgr.consumeResource('incense_sticks', 1);
        
        // 获得善缘值
        this.playerMgr.addResource('shanyuan', 10);
        
        // 标记今日已代点香
        friend.canWorship = false;
        this.saveFriends();
        this.renderFriends();
        
        this.showMessage(`🙏 为 ${friend.name} 代点香成功！善缘+10`);
    }
    
    onDeleteFriend(friend: Friend) {
        this.friends = this.friends.filter(f => f.id !== friend.id);
        this.saveFriends();
        this.renderFriends();
        this.updateUI();
        
        this.showMessage(`已删除好友: ${friend.name}`);
    }
    
    onBack() {
        director.loadScene('MainScene');
    }
    
    showMessage(msg: string) {
        console.log(msg);
    }
}
