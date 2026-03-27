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
        constructor(...args) {
          super(...args);

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
          const content = this.stockListScrollView.content;
          content.removeAllChildren();

          for (const stock of this.stocks) {
            const node = instantiate(this.stockItemPrefab);
            const change = stock.currentPrice - stock.previousPrice;
            const changePercent = (change / stock.previousPrice * 100).toFixed(2);
            const isUp = change >= 0;
            node.getChildByName('NameLabel').getComponent(Label).string = `${stock.name} (${stock.code})`;
            node.getChildByName('PriceLabel').getComponent(Label).string = `${stock.currentPrice}元宝`;
            node.getChildByName('ChangeLabel').getComponent(Label).string = `${isUp ? '+' : ''}${change} (${isUp ? '+' : ''}${changePercent}%)`;
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
            node.getChildByName('OwnedLabel').getComponent(Label).string = `持有: ${stock.owned}股`;
            node.getChildByName('DescLabel').getComponent(Label).string = stock.description; // 买入按钮

            const buyBtn = node.getChildByName('BuyBtn').getComponent(Button);
            buyBtn.node.on(Button.EventType.CLICK, () => this.onBuy(stock), this); // 卖出按钮

            const sellBtn = node.getChildByName('SellBtn').getComponent(Button);
            sellBtn.node.on(Button.EventType.CLICK, () => this.onSell(stock), this);
            content.addChild(node);
          }
        }

        fluctuatePrices() {
          for (const stock of this.stocks) {
            stock.previousPrice = stock.currentPrice; // 随机波动 -5% 到 +5%

            const change = (Math.random() - 0.5) * 0.1;
            stock.currentPrice = Math.max(10, Math.floor(stock.currentPrice * (1 + change)));
          }

          this.updateStockList();
          this.updateAssets();
        }

        onBuy(stock) {
          const amount = 100; // 买入100股

          const cost = stock.currentPrice * amount;
          const player = (_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
            error: Error()
          }), GameManager) : GameManager).getInstance().playerData;

          if (!player.costCurrency('yuanbao', cost)) {
            console.log('元宝不足');
            return;
          }

          stock.owned += amount;
          console.log(`买入${stock.name} ${amount}股，花费${cost}元宝`);
          this.updateStockList();
          this.updateAssets();
        }

        onSell(stock) {
          if (stock.owned <= 0) {
            console.log('没有持股');
            return;
          }

          const amount = Math.min(100, stock.owned); // 卖出100股或全部

          const income = stock.currentPrice * amount;
          stock.owned -= amount;
          (_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
            error: Error()
          }), GameManager) : GameManager).getInstance().playerData.addCurrency('yuanbao', income);
          console.log(`卖出${stock.name} ${amount}股，获得${income}元宝`);
          this.updateStockList();
          this.updateAssets();
        }

        updateAssets() {
          const player = (_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
            error: Error()
          }), GameManager) : GameManager).getInstance().playerData;
          const cash = player.getCurrency('yuanbao');
          let stockValue = 0;

          for (const stock of this.stocks) {
            stockValue += stock.owned * stock.currentPrice;
          }

          this.availableFundsLabel.string = `可用资金: ${cash}元宝`;
          this.totalAssetsLabel.string = `总资产: ${cash + stockValue}元宝 (股票${stockValue})`;
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
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "stockListScrollView", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "stockItemPrefab", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "totalAssetsLabel", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "availableFundsLabel", [_dec6], {
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
//# sourceMappingURL=b39e82caf749bd3ee1055839a05a25e3b44a05b7.js.map