System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, director, Node, Label, Button, ScrollView, instantiate, GameManager, _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _crd, ccclass, property, BagScene;

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

      _cclegacy._RF.push({}, "ef12d3mLxpH7YJt2et9mTYn", "BagScene", undefined);

      __checkObsolete__(['_decorator', 'Component', 'director', 'Node', 'Label', 'Button', 'ScrollView', 'Prefab', 'instantiate']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("BagScene", BagScene = (_dec = ccclass('BagScene'), _dec2 = property(Button), _dec3 = property(ScrollView), _dec4 = property(Node), _dec5 = property(Label), _dec(_class = (_class2 = class BagScene extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "backBtn", _descriptor, this);

          _initializerDefineProperty(this, "itemScrollView", _descriptor2, this);

          _initializerDefineProperty(this, "itemPrefab", _descriptor3, this);

          _initializerDefineProperty(this, "capacityLabel", _descriptor4, this);

          this.items = [{
            id: 'incense_sticks',
            name: '线香',
            type: 'material',
            desc: '供奉用的线香',
            icon: 'incense_sticks'
          }, {
            id: 'candles',
            name: '蜡烛',
            type: 'material',
            desc: '供奉用的蜡烛',
            icon: 'candles'
          }, {
            id: 'gold_paper',
            name: '金纸',
            type: 'material',
            desc: '供奉用的金纸',
            icon: 'gold_paper'
          }, {
            id: 'fruits',
            name: '供果',
            type: 'material',
            desc: '供奉用的水果',
            icon: 'fruits'
          }, {
            id: 'wood_sword',
            name: '桃木剑',
            type: 'equipment',
            desc: '攻击+10',
            icon: 'sword'
          }, {
            id: 'bronze_mirror',
            name: '青铜镜',
            type: 'equipment',
            desc: '防御+5',
            icon: 'mirror'
          }, {
            id: 'health_pill',
            name: '回气丹',
            type: 'consumable',
            desc: '恢复50点法力',
            icon: 'pill'
          }];
        }

        onLoad() {
          this.backBtn.node.on(Button.EventType.CLICK, this.onBack, this);
        }

        start() {
          this.updateBag();
        }

        updateBag() {
          var _this = this;

          var player = (_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
            error: Error()
          }), GameManager) : GameManager).getInstance().playerData;
          var content = this.itemScrollView.content;
          content.removeAllChildren();
          var itemCount = 0;

          var _loop = function _loop(item) {
            var quantity = player.getCurrency(item.id);

            if (quantity > 0 || item.type === 'equipment') {
              itemCount++;
              var itemNode = instantiate(_this.itemPrefab);
              itemNode.getChildByName('NameLabel').getComponent(Label).string = item.name;
              itemNode.getChildByName('CountLabel').getComponent(Label).string = "x" + quantity;
              itemNode.getChildByName('DescLabel').getComponent(Label).string = item.desc;
              var useBtn = itemNode.getChildByName('UseBtn').getComponent(Button);
              useBtn.node.on(Button.EventType.CLICK, () => _this.onUseItem(item.id), _this);
              content.addChild(itemNode);
            }
          };

          for (var item of this.items) {
            _loop(item);
          }

          this.capacityLabel.string = itemCount + "/50";
        }

        onUseItem(itemId) {
          var player = (_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
            error: Error()
          }), GameManager) : GameManager).getInstance().playerData;

          if (itemId === 'health_pill') {
            if (player.getCurrency('health_pill') > 0) {
              player.costCurrency('health_pill', 1);
              player.addCurrency('mana', 50);
              this.updateBag(); // 显示使用成功
            }
          } else if (itemId === 'wood_sword' || itemId === 'bronze_mirror') {// 装备物品
            // 显示装备成功
          }
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
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "itemScrollView", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "itemPrefab", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "capacityLabel", [_dec5], {
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
//# sourceMappingURL=5cd71d34acb353d0332bb1360813c7167c6392c3.js.map