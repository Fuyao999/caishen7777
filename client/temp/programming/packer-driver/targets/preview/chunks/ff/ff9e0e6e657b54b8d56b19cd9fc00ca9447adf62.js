System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Node, Label, Button, Vec3, Color, _dec, _class, _crd, ccclass, property, Game;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      Node = _cc.Node;
      Label = _cc.Label;
      Button = _cc.Button;
      Vec3 = _cc.Vec3;
      Color = _cc.Color;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "caa5c6o/etNsb8+cprA9OQJ", "Game", undefined);

      __checkObsolete__(['_decorator', 'Component', 'director', 'Node', 'Label', 'Button', 'instantiate', 'Vec3', 'Color']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("Game", Game = (_dec = ccclass('Game'), _dec(_class = class Game extends Component {
        constructor() {
          super(...arguments);
          // 游戏数据
          this.playerData = {
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
          this.stages = {
            clay: {
              name: '泥胎',
              next: 'wood',
              need: 100
            },
            wood: {
              name: '木骨',
              next: 'bronze',
              need: 500
            },
            bronze: {
              name: '铜身',
              next: 'gold',
              need: 2000
            },
            gold: {
              name: '金身',
              next: null,
              need: 10000
            }
          };
          this.gods = [{
            id: 'caishen',
            name: '赵公明',
            effect: '香火钱+20%',
            bonus: 1.2
          }, {
            id: 'wencaishen',
            name: '比干',
            effect: '法力上限+10',
            bonus: 1
          }, {
            id: 'wucaishen',
            name: '关公',
            effect: '化缘收益+15%',
            bonus: 1
          }, {
            id: 'piancaishen',
            name: '范蠡',
            effect: '暴击率+5%',
            bonus: 1
          }, {
            id: 'shengcai',
            name: '李诡祖',
            effect: '供奉功德+10%',
            bonus: 1.1
          }, {
            id: 'lucaishen',
            name: '沈万三',
            effect: '法力回复+20%',
            bonus: 1
          }, {
            id: 'shoucaishen',
            name: '刘海蟾',
            effect: '香火钱上限+1000',
            bonus: 1
          }, {
            id: 'xicaishen',
            name: '子贡',
            effect: '每日首供双倍',
            bonus: 1
          }, {
            id: 'caishenpo',
            name: '财神奶奶',
            effect: '化缘风险-10%',
            bonus: 1
          }];
          this.selectedGod = 0;
          this.currentView = 'main';
          // UI 节点引用
          this.mainView = null;
          this.templeView = null;
          this.almsView = null;
          this.upgradeView = null;
          this.statusLabel = null;
        }

        onLoad() {
          this.createUI();
          this.showView('main');
          this.schedule(this.recoverMana, 1);
        }

        createUI() {
          // 创建 Canvas（如果没有）
          var canvas = this.node; // 创建状态栏（顶部）

          this.statusLabel = this.createLabel(canvas, 'status', '香火钱: 1000 | 功德: 0 | 法力: 100', 0, 280, 20); // 创建主界面

          this.mainView = this.createContainer(canvas, 'mainView');
          this.createLabel(this.mainView, 'title', '🏮 财神大陆', 0, 150, 50);
          this.createLabel(this.mainView, 'stage', '泥胎 Lv.1', 0, 80, 30);
          this.createButton(this.mainView, 'templeBtn', '🏛️ 供奉财神', -150, 0, () => this.showView('temple'));
          this.createButton(this.mainView, 'almsBtn', '🚶 外出化缘', 150, 0, () => this.showView('alms'));
          this.createButton(this.mainView, 'upgradeBtn', '⬆️ 升级进化', 0, -100, () => this.showView('upgrade')); // 创建供奉界面

          this.templeView = this.createContainer(canvas, 'templeView');
          this.createLabel(this.templeView, 'title', '🏛️ 供奉财神', 0, 250, 40);
          this.createLabel(this.templeView, 'godInfo', '当前: 赵公明\n效果: 香火钱+20%', 0, 150, 25);
          this.createButton(this.templeView, 'prevGod', '← 上一个', -200, 50, () => this.changeGod(-1));
          this.createButton(this.templeView, 'nextGod', '下一个 →', 200, 50, () => this.changeGod(1));
          this.createButton(this.templeView, 'worshipBtn', '🙏 供奉（消耗1线香）', 0, -50, () => this.worship());
          this.createButton(this.templeView, 'backBtn', '返回', 0, -150, () => this.showView('main')); // 创建化缘界面

          this.almsView = this.createContainer(canvas, 'almsView');
          this.createLabel(this.almsView, 'title', '🚶 外出化缘', 0, 250, 40);
          this.createLabel(this.almsView, 'desc', '选择地区化缘，获取香火钱（有风险）', 0, 180, 20);
          this.createButton(this.almsView, 'eastBtn', '东\n安全', -200, 50, () => this.goAlms('east', 0.1, 100));
          this.createButton(this.almsView, 'southBtn', '南\n中等', -70, 50, () => this.goAlms('south', 0.2, 200));
          this.createButton(this.almsView, 'westBtn', '西\n危险', 70, 50, () => this.goAlms('west', 0.3, 300));
          this.createButton(this.almsView, 'northBtn', '北\n极危', 200, 50, () => this.goAlms('north', 0.4, 500));
          this.createButton(this.almsView, 'backBtn', '返回', 0, -150, () => this.showView('main')); // 创建升级界面

          this.upgradeView = this.createContainer(canvas, 'upgradeView');
          this.createLabel(this.upgradeView, 'title', '⬆️ 升级进化', 0, 250, 40);
          this.createLabel(this.upgradeView, 'current', '当前: 泥胎', 0, 150, 35);
          this.createLabel(this.upgradeView, 'need', '需要: 100功德', 0, 80, 25);
          this.createButton(this.upgradeView, 'upgradeBtn', '✨ 立即升级', 0, 0, () => this.upgrade());
          this.createButton(this.upgradeView, 'backBtn', '返回', 0, -150, () => this.showView('main'));
        }

        createContainer(parent, name) {
          var node = new Node(name);
          parent.addChild(node);
          return node;
        }

        createLabel(parent, name, text, x, y, size) {
          var node = new Node(name);
          parent.addChild(node);
          node.setPosition(new Vec3(x, y, 0));
          var label = node.addComponent(Label);
          label.string = text;
          label.fontSize = size;
          label.color = new Color(255, 255, 255, 255);
          label.horizontalAlign = Label.HorizontalAlign.CENTER;
          return label;
        }

        createButton(parent, name, text, x, y, callback) {
          var node = new Node(name);
          parent.addChild(node);
          node.setPosition(new Vec3(x, y, 0)); // 创建按钮背景（用简单节点代替）

          var bg = new Node('bg');
          node.addChild(bg);
          var label = node.addComponent(Label);
          label.string = text;
          label.fontSize = 20;
          label.color = new Color(255, 255, 255, 255);
          label.horizontalAlign = Label.HorizontalAlign.CENTER;
          label.verticalAlign = Label.VerticalAlign.CENTER;
          var btn = node.addComponent(Button);
          btn.node.on('click', callback, this);
          return btn;
        }

        showView(view) {
          this.currentView = view;
          this.mainView.active = view === 'main';
          this.templeView.active = view === 'temple';
          this.almsView.active = view === 'alms';
          this.upgradeView.active = view === 'upgrade';
          this.updateUI();
        }

        updateUI() {
          var p = this.playerData;
          var s = this.stages[p.stage];
          this.statusLabel.string = "\u9999\u706B\u94B1:" + p.incense_money + " \u529F\u5FB7:" + p.merit + " \u6CD5\u529B:" + p.mana + " \u7EBF\u9999:" + p.incense_sticks;

          if (this.currentView === 'main') {
            var stageLabel = this.mainView.getChildByName('stage').getComponent(Label);
            stageLabel.string = s.name + " Lv." + p.level;
          }

          if (this.currentView === 'temple') {
            var god = this.gods[this.selectedGod];
            var infoLabel = this.templeView.getChildByName('godInfo').getComponent(Label);
            infoLabel.string = "\u5F53\u524D\u4F9B\u5949: " + god.name + "\n\u6548\u679C: " + god.effect + "\n\u7EBF\u9999\u5269\u4F59: " + p.incense_sticks;
          }

          if (this.currentView === 'upgrade') {
            var currentLabel = this.upgradeView.getChildByName('current').getComponent(Label);
            var needLabel = this.upgradeView.getChildByName('need').getComponent(Label);
            currentLabel.string = "\u5F53\u524D: " + s.name;

            if (s.next) {
              needLabel.string = "\u9700\u8981: " + s.need + "\u529F\u5FB7 (\u5F53\u524D" + p.merit + ")";
            } else {
              needLabel.string = '已达到最高阶段！';
            }
          }
        }

        changeGod(delta) {
          this.selectedGod = (this.selectedGod + delta + this.gods.length) % this.gods.length;
          this.updateUI();
        }

        worship() {
          var p = this.playerData;

          if (p.incense_sticks <= 0) {
            this.showMessage('线香不足！');
            return;
          }

          p.incense_sticks--;
          var god = this.gods[this.selectedGod];
          var reward = Math.floor(10 * god.bonus);
          p.incense_money += reward;
          p.merit += 1;
          this.showMessage("\u4F9B\u5949" + god.name + "\u6210\u529F\uFF01+" + reward + "\u9999\u706B\u94B1 +1\u529F\u5FB7");
          this.updateUI();
        }

        goAlms(region, risk, baseReward) {
          var p = this.playerData;

          if (p.mana < 10) {
            this.showMessage('法力不足！请等待恢复');
            return;
          }

          p.mana -= 10;

          if (Math.random() < risk) {
            var loss = Math.floor(p.incense_money * 0.3);
            p.incense_money = Math.max(0, p.incense_money - loss);
            this.showMessage("\uD83D\uDC80 \u906D\u9047\u4E0D\u5E78\uFF01\u635F\u5931" + loss + "\u9999\u706B\u94B1");
          } else {
            var reward = Math.floor(baseReward * (0.8 + Math.random() * 0.4));
            p.incense_money += reward;
            this.showMessage("\u2705 \u5316\u7F18\u6210\u529F\uFF01\u83B7\u5F97" + reward + "\u9999\u706B\u94B1");
          }

          this.updateUI();
        }

        upgrade() {
          var p = this.playerData;
          var s = this.stages[p.stage];

          if (!s.next) {
            this.showMessage('已达到最高阶段！');
            return;
          }

          if (p.merit < s.need) {
            this.showMessage("\u529F\u5FB7\u4E0D\u8DB3\uFF01\u9700\u8981" + s.need + "\u529F\u5FB7");
            return;
          }

          p.merit -= s.need;
          p.stage = s.next;
          p.level += 5;
          this.showMessage("\uD83C\uDF89 \u5347\u7EA7\u6210\u529F\uFF01\u8FDB\u5316\u5230" + this.stages[p.stage].name + "\uFF01");
          this.updateUI();
        }

        recoverMana() {
          if (this.playerData.mana < 100) {
            this.playerData.mana++;
            this.updateUI();
          }
        }

        showMessage(msg) {
          // 在状态栏显示消息
          this.statusLabel.string = msg;
          setTimeout(() => this.updateUI(), 2000);
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=ff9e0e6e657b54b8d56b19cd9fc00ca9447adf62.js.map