System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, director, Node, Label, Button, ScrollView, instantiate, GameManager, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _crd, ccclass, property, BlackMarketScene;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfGameManager(extras) {
    _reporterNs.report("GameManager", "../Core/GameManager", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      director = _cc.director;
      Node = _cc.Node;
      Label = _cc.Label;
      Button = _cc.Button;
      ScrollView = _cc.ScrollView;
      instantiate = _cc.instantiate;
    }, function (_unresolved_2) {
      GameManager = _unresolved_2.GameManager;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "9dfc5aLdPRDEYyWJJx+EEkT", "BlackMarketScene", undefined);

      __checkObsolete__(['_decorator', 'Component', 'director', 'Node', 'Label', 'Button', 'ScrollView', 'Prefab', 'instantiate', 'Vec3']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("BlackMarketScene", BlackMarketScene = (_dec = ccclass('BlackMarketScene'), _dec2 = property(Button), _dec3 = property(Label), _dec4 = property(Label), _dec5 = property(ScrollView), _dec6 = property(Node), _dec7 = property(Label), _dec(_class = (_class2 = class BlackMarketScene extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "backBtn", _descriptor, this);

          _initializerDefineProperty(this, "timeLabel", _descriptor2, this);

          _initializerDefineProperty(this, "warningLabel", _descriptor3, this);

          _initializerDefineProperty(this, "itemListScrollView", _descriptor4, this);

          _initializerDefineProperty(this, "blackMarketItemPrefab", _descriptor5, this);

          _initializerDefineProperty(this, "reputationLabel", _descriptor6, this);

          this.isOpen = false;
          this.reputation = 50;
          // 黑市信誉度
          // 黑市商品（违禁品）
          this.blackMarketItems = [{
            id: 'stolen_goods',
            name: '来路不明的供品',
            type: 'forbidden',
            price: 500,
            currency: 'incense_money',
            desc: '可能是从其他庙宇偷来的',
            risk: 0.3
          }, {
            id: 'cursed_item',
            name: '诅咒的法器',
            type: 'forbidden',
            price: 2000,
            currency: 'incense_money',
            desc: '带有不祥的气息',
            risk: 0.5
          }, {
            id: 'banned_scroll',
            name: '禁术秘籍',
            type: 'illegal',
            price: 5000,
            currency: 'yuanbao',
            desc: '被天庭禁止的修炼方法',
            risk: 0.7
          }, {
            id: 'stolen_relic',
            name: '失传的宝物',
            type: 'stolen',
            price: 10000,
            currency: 'yuanbao',
            desc: '从博物馆偷来的古董',
            risk: 0.8
          }, {
            id: 'corrupt_blessing',
            name: '腐败的祝福',
            type: 'corrupt',
            price: 3000,
            currency: 'merit',
            desc: '用功德换取的邪恶力量',
            risk: 0.6
          }, {
            id: 'fake_id',
            name: '假身份令牌',
            type: 'forbidden',
            price: 800,
            currency: 'yuanbao',
            desc: '可以伪装成其他玩家',
            risk: 0.4
          }];
        }

        onLoad() {
          this.backBtn.node.on(Button.EventType.CLICK, this.onBack, this);
        }

        start() {
          this.checkOpenTime();
          this.schedule(this.checkOpenTime, 60); // 每分钟检查

          this.updateItemList();
          this.reputationLabel.string = `黑市信誉: ${this.reputation}`;
        }

        checkOpenTime() {
          const now = new Date();
          const hour = now.getHours(); // 黑市开放时间: 21:00 - 23:00

          this.isOpen = hour >= 21 && hour < 23;

          if (this.isOpen) {
            const minsLeft = (23 - hour) * 60 - now.getMinutes();
            this.timeLabel.string = `黑市开放中！剩余${minsLeft}分钟`;
            this.timeLabel.color = {
              r: 255,
              g: 0,
              b: 0,
              a: 255
            };
            this.warningLabel.string = '⚠️ 购买违禁品可能降低功德或被天庭追查！';
          } else {
            let nextOpen = '';

            if (hour < 21) {
              nextOpen = `今晚21:00开放（还有${21 - hour}小时）`;
            } else {
              nextOpen = '已关闭，明晚21:00开放';
            }

            this.timeLabel.string = `黑市关闭中 - ${nextOpen}`;
            this.timeLabel.color = {
              r: 128,
              g: 128,
              b: 128,
              a: 255
            };
            this.warningLabel.string = '';
          }
        }

        updateItemList() {
          const content = this.itemListScrollView.content;
          content.removeAllChildren();
          if (!this.isOpen) return;

          for (const item of this.blackMarketItems) {
            const node = instantiate(this.blackMarketItemPrefab);
            node.getChildByName('NameLabel').getComponent(Label).string = item.name;
            node.getChildByName('TypeLabel').getComponent(Label).string = `[${item.type}]`;
            node.getChildByName('PriceLabel').getComponent(Label).string = `${item.price} ${item.currency}`;
            node.getChildByName('DescLabel').getComponent(Label).string = item.desc;
            node.getChildByName('RiskLabel').getComponent(Label).string = `风险: ${(item.risk * 100).toFixed(0)}%`;
            const buyBtn = node.getChildByName('BuyBtn').getComponent(Button);
            buyBtn.node.on(Button.EventType.CLICK, () => this.onBuy(item), this);
            content.addChild(node);
          }
        }

        onBuy(item) {
          if (!this.isOpen) {
            console.log('黑市未开放');
            return;
          }

          const player = (_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
            error: Error()
          }), GameManager) : GameManager).getInstance().playerData;

          if (!player.costCurrency(item.currency, item.price)) {
            console.log('货币不足');
            return;
          } // 判定是否被追查


          if (Math.random() < item.risk) {
            // 被天庭追查
            const penalty = Math.floor(item.price * 0.5);
            player.costCurrency('merit', penalty);
            this.reputation = Math.max(0, this.reputation - 10);
            alert(`⚠️ 被天庭追查！扣除${penalty}功德，黑市信誉下降`);
          } else {
            // 购买成功
            this.reputation = Math.min(100, this.reputation + 5);
            alert(`✅ 成功购买${item.name}，黑市信誉上升`);
          }

          this.reputationLabel.string = `黑市信誉: ${this.reputation}`;
        }

        onBack() {
          director.loadScene('MainScene');
        }

        onDestroy() {
          this.unscheduleAllCallbacks();
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "backBtn", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "timeLabel", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "warningLabel", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "itemListScrollView", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "blackMarketItemPrefab", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "reputationLabel", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=38b44da58cbe52f43e9e575ce1d74bf93f2845f6.js.map