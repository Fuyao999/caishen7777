System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, director, Node, Label, Button, ScrollView, instantiate, GameManager, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _crd, ccclass, property, StockScene;

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

      _cclegacy._RF.push({}, "8109au6ID5JrZJ5vIRJDqGB", "StockScene", undefined);

      __checkObsolete__(['_decorator', 'Component', 'director', 'Node', 'Label', 'Button', 'ScrollView', 'Prefab', 'instantiate']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("StockScene", StockScene = (_dec = ccclass('StockScene'), _dec2 = property(Button), _dec3 = property(ScrollView), _dec4 = property(Node), _dec5 = property(Label), _dec6 = property(Label), _dec(_class = (_class2 = class StockScene extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "backBtn", _descriptor, this);

          _initializerDefineProperty(this, "stockListScrollView", _descriptor2, this);

          _initializerDefineProperty(this, "stockItemPrefab", _descriptor3, this);

          _initializerDefineProperty(this, "totalAssetsLabel", _descriptor4, this);

          _initializerDefineProperty(this, "availableFundsLabel", _descriptor5, this);

          // 股票数据
          this.stocks = [{
            id: 'mining',
            name: '矿渊矿业',
            code: '600001',
            currentPrice: 100,
            previousPrice: 95,
            owned: 0,
            description: '十二财域矿产开采'
          }, {
            id: 'farming',
            name: '丰收农业',
            code: '600002',
            currentPrice: 80,
            previousPrice: 85,
            owned: 0,
            description: '灵草灵药种植'
          }, {
            id: 'trading',
            name: '通宝商会',
            code: '600003',
            currentPrice: 120,
            previousPrice: 110,
            owned: 0,
            description: '跨域贸易与拍卖'
          }, {
            id: 'bank',
            name: '财神银行',
            code: '600004',
            currentPrice: 150,
            previousPrice: 150,
            owned: 0,
            description: '金融服务与存贷'
          }];
        }

        onLoad() {
          this.backBtn.node.on(Button.EventType.CLICK, this.onBack, this);
        }

        start() {
          this.updateStockList();
          this.updateAssets();
          this.schedule(this.fluctuatePrices, 10); // 每10秒价格波动
        }

        updateStockList() {
          var _this = this;

          var content = this.stockListScrollView.content;
          content.removeAllChildren();

          var _loop = function _loop(stock) {
            var node = instantiate(_this.stockItemPrefab);
            var change = stock.currentPrice - stock.previousPrice;
            var changePercent = (change / stock.previousPrice * 100).toFixed(2);
            var isUp = change >= 0;
            node.getChildByName('NameLabel').getComponent(Label).string = stock.name + " (" + stock.code + ")";
            node.getChildByName('PriceLabel').getComponent(Label).string = stock.currentPrice + "\u5143\u5B9D";
            node.getChildByName('ChangeLabel').getComponent(Label).string = "" + (isUp ? '+' : '') + change + " (" + (isUp ? '+' : '') + changePercent + "%)";
            node.getChildByName('ChangeLabel').getComponent(Label).color = isUp ? {
              r: 0,
              g: 255,
              b: 0,
              a: 255
            } : {
              r: 255,
              g: 0,
              b: 0,
              a: 255
            };
            node.getChildByName('OwnedLabel').getComponent(Label).string = "\u6301\u6709: " + stock.owned + "\u80A1";
            node.getChildByName('DescLabel').getComponent(Label).string = stock.description; // 买入按钮

            var buyBtn = node.getChildByName('BuyBtn').getComponent(Button);
            buyBtn.node.on(Button.EventType.CLICK, () => _this.onBuy(stock), _this); // 卖出按钮

            var sellBtn = node.getChildByName('SellBtn').getComponent(Button);
            sellBtn.node.on(Button.EventType.CLICK, () => _this.onSell(stock), _this);
            content.addChild(node);
          };

          for (var stock of this.stocks) {
            _loop(stock);
          }
        }

        fluctuatePrices() {
          for (var stock of this.stocks) {
            stock.previousPrice = stock.currentPrice; // 随机波动 -5% 到 +5%

            var change = (Math.random() - 0.5) * 0.1;
            stock.currentPrice = Math.max(10, Math.floor(stock.currentPrice * (1 + change)));
          }

          this.updateStockList();
          this.updateAssets();
        }

        onBuy(stock) {
          var amount = 100; // 买入100股

          var cost = stock.currentPrice * amount;
          var player = (_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
            error: Error()
          }), GameManager) : GameManager).getInstance().playerData;

          if (!player.costCurrency('yuanbao', cost)) {
            console.log('元宝不足');
            return;
          }

          stock.owned += amount;
          console.log("\u4E70\u5165" + stock.name + " " + amount + "\u80A1\uFF0C\u82B1\u8D39" + cost + "\u5143\u5B9D");
          this.updateStockList();
          this.updateAssets();
        }

        onSell(stock) {
          if (stock.owned <= 0) {
            console.log('没有持股');
            return;
          }

          var amount = Math.min(100, stock.owned); // 卖出100股或全部

          var income = stock.currentPrice * amount;
          stock.owned -= amount;
          (_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
            error: Error()
          }), GameManager) : GameManager).getInstance().playerData.addCurrency('yuanbao', income);
          console.log("\u5356\u51FA" + stock.name + " " + amount + "\u80A1\uFF0C\u83B7\u5F97" + income + "\u5143\u5B9D");
          this.updateStockList();
          this.updateAssets();
        }

        updateAssets() {
          var player = (_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
            error: Error()
          }), GameManager) : GameManager).getInstance().playerData;
          var cash = player.getCurrency('yuanbao');
          var stockValue = 0;

          for (var stock of this.stocks) {
            stockValue += stock.owned * stock.currentPrice;
          }

          this.availableFundsLabel.string = "\u53EF\u7528\u8D44\u91D1: " + cash + "\u5143\u5B9D";
          this.totalAssetsLabel.string = "\u603B\u8D44\u4EA7: " + (cash + stockValue) + "\u5143\u5B9D (\u80A1\u7968" + stockValue + ")";
        }

        onBack() {
          director.loadScene('MainScene');
        }

        onDestroy() {
          this.unschedule(this.fluctuatePrices);
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "backBtn", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "stockListScrollView", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "stockItemPrefab", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "totalAssetsLabel", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "availableFundsLabel", [_dec6], {
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
//# sourceMappingURL=9be591272c3ca79874fa578850d17f2eb8495d17.js.map