System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, director, Node, Label, Button, ScrollView, instantiate, GameManager, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _crd, ccclass, property, ShopScene;

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

      _cclegacy._RF.push({}, "ad6fa/ef5RIA59/XP9isEsR", "ShopScene", undefined);

      __checkObsolete__(['_decorator', 'Component', 'director', 'Node', 'Label', 'Button', 'ScrollView', 'Prefab', 'instantiate']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("ShopScene", ShopScene = (_dec = ccclass('ShopScene'), _dec2 = property(Button), _dec3 = property(Button), _dec4 = property(Button), _dec5 = property(Button), _dec6 = property(ScrollView), _dec7 = property(Node), _dec8 = property(Label), _dec(_class = (_class2 = class ShopScene extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "backBtn", _descriptor, this);

          _initializerDefineProperty(this, "incenseTabBtn", _descriptor2, this);

          _initializerDefineProperty(this, "equipmentTabBtn", _descriptor3, this);

          _initializerDefineProperty(this, "giftTabBtn", _descriptor4, this);

          _initializerDefineProperty(this, "shopListScrollView", _descriptor5, this);

          _initializerDefineProperty(this, "shopItemPrefab", _descriptor6, this);

          _initializerDefineProperty(this, "yuanbaoLabel", _descriptor7, this);

          this.currentTab = 'incense';
          this.shopItems = {
            incense: [{
              id: 'incense_sticks',
              name: '线香',
              price: 10,
              currency: 'yuanbao',
              icon: '📿',
              desc: '供奉用的线香'
            }, {
              id: 'candles',
              name: '蜡烛',
              price: 20,
              currency: 'yuanbao',
              icon: '🕯️',
              desc: '供奉用的蜡烛'
            }, {
              id: 'gold_paper',
              name: '金纸',
              price: 30,
              currency: 'yuanbao',
              icon: '📜',
              desc: '供奉用的金纸'
            }, {
              id: 'fruits',
              name: '供果',
              price: 50,
              currency: 'yuanbao',
              icon: '🍎',
              desc: '供奉用的水果'
            }, {
              id: 'incense_sticks_pack',
              name: '线香礼包(10个)',
              price: 90,
              currency: 'yuanbao',
              icon: '📿',
              desc: '10支线香'
            }, {
              id: 'candles_pack',
              name: '蜡烛礼包(10个)',
              price: 180,
              currency: 'yuanbao',
              icon: '🕯️',
              desc: '10支蜡烛'
            }],
            equipment: [{
              id: 'wood_sword',
              name: '桃木剑',
              price: 100,
              currency: 'incense_money',
              icon: '⚔️',
              desc: '攻击+10'
            }, {
              id: 'bronze_mirror',
              name: '青铜镜',
              price: 200,
              currency: 'incense_money',
              icon: '🪞',
              desc: '防御+5'
            }, {
              id: 'duster_bronze',
              name: '青铜拂尘',
              price: 500,
              currency: 'yuanbao',
              icon: '🧹',
              desc: '攻击+25'
            }],
            gift: [{
              id: 'first_charge',
              name: '首充礼包',
              price: 6,
              currency: 'CNY',
              icon: '🎁',
              desc: '首充6元，送888元宝'
            }, {
              id: 'month_card',
              name: '月卡',
              price: 30,
              currency: 'CNY',
              icon: '📅',
              desc: '30天，每日领取100元宝'
            }, {
              id: 'week_card',
              name: '周卡',
              price: 12,
              currency: 'CNY',
              icon: '📆',
              desc: '7天，每日领取50元宝'
            }]
          };
        }

        onLoad() {
          this.backBtn.node.on(Button.EventType.CLICK, this.onBack, this);
          this.incenseTabBtn.node.on(Button.EventType.CLICK, () => this.onTabClick('incense'), this);
          this.equipmentTabBtn.node.on(Button.EventType.CLICK, () => this.onTabClick('equipment'), this);
          this.giftTabBtn.node.on(Button.EventType.CLICK, () => this.onTabClick('gift'), this);
        }

        start() {
          this.updateCurrency();
          this.updateShopList();
        }

        updateCurrency() {
          var player = (_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
            error: Error()
          }), GameManager) : GameManager).getInstance().playerData;
          this.yuanbaoLabel.string = "\u5143\u5B9D: " + player.getCurrency('yuanbao');
        }

        onTabClick(tab) {
          this.currentTab = tab;
          this.updateShopList();
        }

        updateShopList() {
          var _this = this;

          var content = this.shopListScrollView.content;
          content.removeAllChildren();
          var items = this.shopItems[this.currentTab];

          var _loop = function _loop(item) {
            var node = instantiate(_this.shopItemPrefab);
            node.getChildByName('IconLabel').getComponent(Label).string = item.icon;
            node.getChildByName('NameLabel').getComponent(Label).string = item.name;
            node.getChildByName('DescLabel').getComponent(Label).string = item.desc;
            node.getChildByName('PriceLabel').getComponent(Label).string = item.price + " " + (item.currency === 'CNY' ? '元' : item.currency === 'yuanbao' ? '元宝' : '香火钱');
            var buyBtn = node.getChildByName('BuyBtn').getComponent(Button);
            buyBtn.node.on(Button.EventType.CLICK, () => _this.onBuy(item), _this);
            content.addChild(node);
          };

          for (var item of items) {
            _loop(item);
          }
        }

        onBuy(item) {
          if (item.currency === 'CNY') {
            // 调用支付接口
            console.log("\u652F\u4ED8" + item.price + "\u5143\u8D2D\u4E70" + item.name);
            return;
          }

          var player = (_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
            error: Error()
          }), GameManager) : GameManager).getInstance().playerData;

          if (!player.costCurrency(item.currency, item.price)) {
            console.log(item.currency + "\u4E0D\u8DB3");
            return;
          } // 添加物品


          if (item.id.includes('pack')) {
            // 礼包
            var count = parseInt(item.desc.match(/\d+/)[0]);
            var itemType = item.id.replace('_pack', '');
            player.addCurrency(itemType, count);
          } else {
            player.addCurrency(item.id, 1);
          }

          this.updateCurrency();
          console.log("\u8D2D\u4E70\u6210\u529F: " + item.name);
        }

        onBack() {
          director.loadScene('MainScene');
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "backBtn", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "incenseTabBtn", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "equipmentTabBtn", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "giftTabBtn", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "shopListScrollView", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "shopItemPrefab", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "yuanbaoLabel", [_dec8], {
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
//# sourceMappingURL=142743523854057ba1cb5a9eb502526a83b68200.js.map