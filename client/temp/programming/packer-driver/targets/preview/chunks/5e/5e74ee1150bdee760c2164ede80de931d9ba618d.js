System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, director, Node, Label, Button, ScrollView, instantiate, Toggle, GameManager, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _crd, ccclass, property, AuctionScene;

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
      Toggle = _cc.Toggle;
    }, function (_unresolved_2) {
      GameManager = _unresolved_2.GameManager;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "9b5cc6r4A1PVZK05v29MYcZ", "AuctionScene", undefined);

      __checkObsolete__(['_decorator', 'Component', 'director', 'Node', 'Label', 'Button', 'ScrollView', 'Prefab', 'instantiate', 'Toggle']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("AuctionScene", AuctionScene = (_dec = ccclass('AuctionScene'), _dec2 = property(Button), _dec3 = property(Toggle), _dec4 = property(Toggle), _dec5 = property(Toggle), _dec6 = property(ScrollView), _dec7 = property(Node), _dec8 = property(Node), _dec9 = property(Button), _dec(_class = (_class2 = class AuctionScene extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "backBtn", _descriptor, this);

          _initializerDefineProperty(this, "biddingTab", _descriptor2, this);

          _initializerDefineProperty(this, "fixedTab", _descriptor3, this);

          _initializerDefineProperty(this, "darkTab", _descriptor4, this);

          _initializerDefineProperty(this, "itemListScrollView", _descriptor5, this);

          _initializerDefineProperty(this, "auctionItemPrefab", _descriptor6, this);

          _initializerDefineProperty(this, "sellPanel", _descriptor7, this);

          _initializerDefineProperty(this, "sellBtn", _descriptor8, this);

          this.currentTab = 'bidding';
          // 模拟拍卖数据
          this.auctionItems = [{
            id: 1,
            name: '传说拂尘',
            type: 'equipment',
            quality: 'legendary',
            currentPrice: 5000,
            buyoutPrice: 10000,
            bidder: '玩家A',
            timeLeft: 300,
            seller: '玩家B'
          }, {
            id: 2,
            name: '金身战甲',
            type: 'equipment',
            quality: 'epic',
            currentPrice: 3000,
            buyoutPrice: 6000,
            bidder: null,
            timeLeft: 600,
            seller: '玩家C'
          }, {
            id: 3,
            name: '财神护符',
            type: 'accessory',
            quality: 'legendary',
            currentPrice: 8000,
            buyoutPrice: 15000,
            bidder: '玩家D',
            timeLeft: 120,
            seller: '玩家E'
          }];
        }

        onLoad() {
          this.backBtn.node.on(Button.EventType.CLICK, this.onBack, this);
          this.sellBtn.node.on(Button.EventType.CLICK, this.onSell, this);
          this.biddingTab.node.on(Toggle.EventType.TOGGLE, () => this.onTabChange('bidding'), this);
          this.fixedTab.node.on(Toggle.EventType.TOGGLE, () => this.onTabChange('fixed'), this);
          this.darkTab.node.on(Toggle.EventType.TOGGLE, () => this.onTabChange('dark'), this);
        }

        start() {
          this.updateItemList();
          this.schedule(this.updateCountdown, 1);
        }

        onTabChange(tab) {
          this.currentTab = tab;
          this.updateItemList();
        }

        updateItemList() {
          var _this = this;

          var content = this.itemListScrollView.content;
          content.removeAllChildren();

          var _loop = function _loop(item) {
            var node = instantiate(_this.auctionItemPrefab);
            node.getChildByName('NameLabel').getComponent(Label).string = item.name;
            node.getChildByName('QualityLabel').getComponent(Label).string = item.quality;
            node.getChildByName('CurrentPriceLabel').getComponent(Label).string = "\u5F53\u524D: " + item.currentPrice;
            node.getChildByName('BuyoutLabel').getComponent(Label).string = "\u4E00\u53E3\u4EF7: " + item.buyoutPrice;
            node.getChildByName('BidderLabel').getComponent(Label).string = item.bidder ? "\u51FA\u4EF7: " + item.bidder : '无人出价';
            node.getChildByName('TimeLabel').getComponent(Label).string = _this.formatTime(item.timeLeft); // 出价按钮

            var bidBtn = node.getChildByName('BidBtn').getComponent(Button);
            bidBtn.node.on(Button.EventType.CLICK, () => _this.onBid(item), _this); // 一口价按钮

            var buyoutBtn = node.getChildByName('BuyoutBtn').getComponent(Button);
            buyoutBtn.node.on(Button.EventType.CLICK, () => _this.onBuyout(item), _this);
            content.addChild(node);
          };

          for (var item of this.auctionItems) {
            _loop(item);
          }
        }

        updateCountdown() {
          for (var item of this.auctionItems) {
            if (item.timeLeft > 0) {
              item.timeLeft--;
            }
          }

          this.updateItemList();
        }

        formatTime(seconds) {
          var mins = Math.floor(seconds / 60);
          var secs = seconds % 60;
          return mins + ":" + secs.toString().padStart(2, '0');
        }

        onBid(item) {
          var bidAmount = item.currentPrice + 100;
          var player = (_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
            error: Error()
          }), GameManager) : GameManager).getInstance().playerData;

          if (!player.costCurrency('yuanbao', bidAmount)) {
            console.log('元宝不足');
            return;
          }

          item.currentPrice = bidAmount;
          item.bidder = '我';
          this.updateItemList();
          console.log("\u51FA\u4EF7\u6210\u529F: " + bidAmount);
        }

        onBuyout(item) {
          var player = (_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
            error: Error()
          }), GameManager) : GameManager).getInstance().playerData;

          if (!player.costCurrency('yuanbao', item.buyoutPrice)) {
            console.log('元宝不足');
            return;
          } // 购买成功


          console.log("\u4E00\u53E3\u4EF7\u8D2D\u4E70\u6210\u529F: " + item.name); // 从列表移除

          var index = this.auctionItems.indexOf(item);

          if (index > -1) {
            this.auctionItems.splice(index, 1);
          }

          this.updateItemList();
        }

        onSell() {
          this.sellPanel.active = true;
        }

        onBack() {
          director.loadScene('MainScene');
        }

        onDestroy() {
          this.unschedule(this.updateCountdown);
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "backBtn", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "biddingTab", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "fixedTab", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "darkTab", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "itemListScrollView", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "auctionItemPrefab", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "sellPanel", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "sellBtn", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=5e74ee1150bdee760c2164ede80de931d9ba618d.js.map