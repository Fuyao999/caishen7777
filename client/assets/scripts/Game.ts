import { _decorator, Component, director, Node, Label, Button, instantiate, Vec3, Color } from 'cc';

const { ccclass, property } = _decorator;

@ccclass('Game')
export class Game extends Component {
    
    // 游戏数据
    playerData = {
        level: 1,
        stage: 'clay',
        incense_money: 1000,
        yuanbao: 100,
        merit: 0,
        mana: 100,
        incense_sticks: 10,
        candles: 5,
        gold_paper: 3,
        fruits: 2
    };
    
    stages = {
        clay: { name: '泥胎', next: 'wood', need: 100 },
        wood: { name: '木骨', next: 'bronze', need: 500 },
        bronze: { name: '铜身', next: 'gold', need: 2000 },
        gold: { name: '金身', next: null, need: 10000 }
    };
    
    gods = [
        { id: 'caishen', name: '赵公明', effect: '香火钱+20%', bonus: 1.2 },
        { id: 'wencaishen', name: '比干', effect: '法力上限+10', bonus: 1 },
        { id: 'wucaishen', name: '关公', effect: '化缘收益+15%', bonus: 1 },
        { id: 'piancaishen', name: '范蠡', effect: '暴击率+5%', bonus: 1 },
        { id: 'shengcai', name: '李诡祖', effect: '供奉功德+10%', bonus: 1.1 },
        { id: 'lucaishen', name: '沈万三', effect: '法力回复+20%', bonus: 1 },
        { id: 'shoucaishen', name: '刘海蟾', effect: '香火钱上限+1000', bonus: 1 },
        { id: 'xicaishen', name: '子贡', effect: '每日首供双倍', bonus: 1 },
        { id: 'caishenpo', name: '财神奶奶', effect: '化缘风险-10%', bonus: 1 }
    ];
    
    selectedGod = 0;
    currentView = 'main';
    
    // UI 节点引用
    mainView: Node = null;
    templeView: Node = null;
    almsView: Node = null;
    upgradeView: Node = null;
    statusLabel: Label = null;
    
    onLoad() {
        this.createUI();
        this.showView('main');
        this.schedule(this.recoverMana, 1);
    }
    
    createUI() {
        // 创建 Canvas（如果没有）
        let canvas = this.node;
        
        // 创建状态栏（顶部）
        this.statusLabel = this.createLabel(canvas, 'status', '香火钱: 1000 | 功德: 0 | 法力: 100', 0, 280, 20);
        
        // 创建主界面
        this.mainView = this.createContainer(canvas, 'mainView');
        this.createLabel(this.mainView, 'title', '🏮 财神大陆', 0, 150, 50);
        this.createLabel(this.mainView, 'stage', '泥胎 Lv.1', 0, 80, 30);
        this.createButton(this.mainView, 'templeBtn', '🏛️ 供奉财神', -150, 0, () => this.showView('temple'));
        this.createButton(this.mainView, 'almsBtn', '🚶 外出化缘', 150, 0, () => this.showView('alms'));
        this.createButton(this.mainView, 'upgradeBtn', '⬆️ 升级进化', 0, -100, () => this.showView('upgrade'));
        
        // 创建供奉界面
        this.templeView = this.createContainer(canvas, 'templeView');
        this.createLabel(this.templeView, 'title', '🏛️ 供奉财神', 0, 250, 40);
        this.createLabel(this.templeView, 'godInfo', '当前: 赵公明\n效果: 香火钱+20%', 0, 150, 25);
        this.createButton(this.templeView, 'prevGod', '← 上一个', -200, 50, () => this.changeGod(-1));
        this.createButton(this.templeView, 'nextGod', '下一个 →', 200, 50, () => this.changeGod(1));
        this.createButton(this.templeView, 'worshipBtn', '🙏 供奉（消耗1线香）', 0, -50, () => this.worship());
        this.createButton(this.templeView, 'backBtn', '返回', 0, -150, () => this.showView('main'));
        
        // 创建化缘界面
        this.almsView = this.createContainer(canvas, 'almsView');
        this.createLabel(this.almsView, 'title', '🚶 外出化缘', 0, 250, 40);
        this.createLabel(this.almsView, 'desc', '选择地区化缘，获取香火钱（有风险）', 0, 180, 20);
        this.createButton(this.almsView, 'eastBtn', '东\n安全', -200, 50, () => this.goAlms('east', 0.1, 100));
        this.createButton(this.almsView, 'southBtn', '南\n中等', -70, 50, () => this.goAlms('south', 0.2, 200));
        this.createButton(this.almsView, 'westBtn', '西\n危险', 70, 50, () => this.goAlms('west', 0.3, 300));
        this.createButton(this.almsView, 'northBtn', '北\n极危', 200, 50, () => this.goAlms('north', 0.4, 500));
        this.createButton(this.almsView, 'backBtn', '返回', 0, -150, () => this.showView('main'));
        
        // 创建升级界面
        this.upgradeView = this.createContainer(canvas, 'upgradeView');
        this.createLabel(this.upgradeView, 'title', '⬆️ 升级进化', 0, 250, 40);
        this.createLabel(this.upgradeView, 'current', '当前: 泥胎', 0, 150, 35);
        this.createLabel(this.upgradeView, 'need', '需要: 100功德', 0, 80, 25);
        this.createButton(this.upgradeView, 'upgradeBtn', '✨ 立即升级', 0, 0, () => this.upgrade());
        this.createButton(this.upgradeView, 'backBtn', '返回', 0, -150, () => this.showView('main'));
    }
    
    createContainer(parent: Node, name: string): Node {
        const node = new Node(name);
        parent.addChild(node);
        return node;
    }
    
    createLabel(parent: Node, name: string, text: string, x: number, y: number, size: number): Label {
        const node = new Node(name);
        parent.addChild(node);
        node.setPosition(new Vec3(x, y, 0));
        
        const label = node.addComponent(Label);
        label.string = text;
        label.fontSize = size;
        label.color = new Color(255, 255, 255, 255);
        label.horizontalAlign = Label.HorizontalAlign.CENTER;
        
        return label;
    }
    
    createButton(parent: Node, name: string, text: string, x: number, y: number, callback: Function): Button {
        const node = new Node(name);
        parent.addChild(node);
        node.setPosition(new Vec3(x, y, 0));
        
        // 创建按钮背景（用简单节点代替）
        const bg = new Node('bg');
        node.addChild(bg);
        
        const label = node.addComponent(Label);
        label.string = text;
        label.fontSize = 20;
        label.color = new Color(255, 255, 255, 255);
        label.horizontalAlign = Label.HorizontalAlign.CENTER;
        label.verticalAlign = Label.VerticalAlign.CENTER;
        
        const btn = node.addComponent(Button);
        btn.node.on('click', callback, this);
        
        return btn;
    }
    
    showView(view: string) {
        this.currentView = view;
        this.mainView.active = (view === 'main');
        this.templeView.active = (view === 'temple');
        this.almsView.active = (view === 'alms');
        this.upgradeView.active = (view === 'upgrade');
        this.updateUI();
    }
    
    updateUI() {
        const p = this.playerData;
        const s = this.stages[p.stage];
        
        this.statusLabel.string = `香火钱:${p.incense_money} 功德:${p.merit} 法力:${p.mana} 线香:${p.incense_sticks}`;
        
        if (this.currentView === 'main') {
            const stageLabel = this.mainView.getChildByName('stage').getComponent(Label);
            stageLabel.string = `${s.name} Lv.${p.level}`;
        }
        
        if (this.currentView === 'temple') {
            const god = this.gods[this.selectedGod];
            const infoLabel = this.templeView.getChildByName('godInfo').getComponent(Label);
            infoLabel.string = `当前供奉: ${god.name}\n效果: ${god.effect}\n线香剩余: ${p.incense_sticks}`;
        }
        
        if (this.currentView === 'upgrade') {
            const currentLabel = this.upgradeView.getChildByName('current').getComponent(Label);
            const needLabel = this.upgradeView.getChildByName('need').getComponent(Label);
            currentLabel.string = `当前: ${s.name}`;
            
            if (s.next) {
                needLabel.string = `需要: ${s.need}功德 (当前${p.merit})`;
            } else {
                needLabel.string = '已达到最高阶段！';
            }
        }
    }
    
    changeGod(delta: number) {
        this.selectedGod = (this.selectedGod + delta + this.gods.length) % this.gods.length;
        this.updateUI();
    }
    
    worship() {
        const p = this.playerData;
        if (p.incense_sticks <= 0) {
            this.showMessage('线香不足！');
            return;
        }
        
        p.incense_sticks--;
        const god = this.gods[this.selectedGod];
        const reward = Math.floor(10 * god.bonus);
        
        p.incense_money += reward;
        p.merit += 1;
        
        this.showMessage(`供奉${god.name}成功！+${reward}香火钱 +1功德`);
        this.updateUI();
    }
    
    goAlms(region: string, risk: number, baseReward: number) {
        const p = this.playerData;
        if (p.mana < 10) {
            this.showMessage('法力不足！请等待恢复');
            return;
        }
        
        p.mana -= 10;
        
        if (Math.random() < risk) {
            const loss = Math.floor(p.incense_money * 0.3);
            p.incense_money = Math.max(0, p.incense_money - loss);
            this.showMessage(`💀 遭遇不幸！损失${loss}香火钱`);
        } else {
            const reward = Math.floor(baseReward * (0.8 + Math.random() * 0.4));
            p.incense_money += reward;
            this.showMessage(`✅ 化缘成功！获得${reward}香火钱`);
        }
        
        this.updateUI();
    }
    
    upgrade() {
        const p = this.playerData;
        const s = this.stages[p.stage];
        
        if (!s.next) {
            this.showMessage('已达到最高阶段！');
            return;
        }
        
        if (p.merit < s.need) {
            this.showMessage(`功德不足！需要${s.need}功德`);
            return;
        }
        
        p.merit -= s.need;
        p.stage = s.next;
        p.level += 5;
        
        this.showMessage(`🎉 升级成功！进化到${this.stages[p.stage].name}！`);
        this.updateUI();
    }
    
    recoverMana() {
        if (this.playerData.mana < 100) {
            this.playerData.mana++;
            this.updateUI();
        }
    }
    
    showMessage(msg: string) {
        // 在状态栏显示消息
        this.statusLabel.string = msg;
        setTimeout(() => this.updateUI(), 2000);
    }
}
