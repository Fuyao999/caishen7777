System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, director, Label, Button, GameManager, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _crd, ccclass, property, AlmsScene;

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
      Label = _cc.Label;
      Button = _cc.Button;
    }, function (_unresolved_2) {
      GameManager = _unresolved_2.GameManager;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "5ddfcLBH99D6pxVGGxN7uUe", "AlmsScene", undefined);

      __checkObsolete__(['_decorator', 'Component', 'director', 'Node', 'Label', 'Button']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("AlmsScene", AlmsScene = (_dec = ccclass('AlmsScene'), _dec2 = property(Label), _dec3 = property(Button), _dec4 = property(Button), _dec5 = property(Button), _dec6 = property(Button), _dec7 = property(Button), _dec(_class = (_class2 = class AlmsScene extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "statusLabel", _descriptor, this);

          _initializerDefineProperty(this, "backBtn", _descriptor2, this);

          _initializerDefineProperty(this, "eastBtn", _descriptor3, this);

          _initializerDefineProperty(this, "southBtn", _descriptor4, this);

          _initializerDefineProperty(this, "westBtn", _descriptor5, this);

          _initializerDefineProperty(this, "northBtn", _descriptor6, this);

          this.regions = {
            east: {
              name: '东',
              risk: 0.1,
              reward: 100
            },
            south: {
              name: '南',
              risk: 0.2,
              reward: 200
            },
            west: {
              name: '西',
              risk: 0.3,
              reward: 300
            },
            north: {
              name: '北',
              risk: 0.4,
              reward: 500
            }
          };
        }

        onLoad() {
          if (this.backBtn) {
            this.backBtn.node.on('click', () => director.loadScene('MainScene'), this);
          }

          if (this.eastBtn) this.eastBtn.node.on('click', () => this.onBeg('east'), this);
          if (this.southBtn) this.southBtn.node.on('click', () => this.onBeg('south'), this);
          if (this.westBtn) this.westBtn.node.on('click', () => this.onBeg('west'), this);
          if (this.northBtn) this.northBtn.node.on('click', () => this.onBeg('north'), this);
          this.updateDisplay();
        }

        updateDisplay() {
          var player = (_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
            error: Error()
          }), GameManager) : GameManager).getInstance().playerData;

          if (this.statusLabel) {
            this.statusLabel.string = "\u6CD5\u529B: " + player.mana + "/100\n\u9009\u62E9\u5730\u533A\u5316\u7F18:\n\u4E1C(\u5B89\u5168) \u5357(\u4E2D\u7B49) \u897F(\u5371\u9669) \u5317(\u6781\u5371)";
          }
        }

        onBeg(region) {
          var player = (_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
            error: Error()
          }), GameManager) : GameManager).getInstance().playerData;
          var config = this.regions[region];

          if (player.mana < 10) {
            if (this.statusLabel) this.statusLabel.string = '法力不足！请等待恢复';
            return;
          }

          player.mana -= 10; // 判定风险

          var random = Math.random();

          if (random < config.risk) {
            // 遇到风险
            var events = ['遇匪', '被骗', '生病', '遇到天灾'];
            var event = events[Math.floor(Math.random() * events.length)];
            var loss = Math.floor(player.incense_money * 0.3);
            player.incense_money = Math.max(0, player.incense_money - loss);

            if (this.statusLabel) {
              this.statusLabel.string = "\u5316\u7F18\u906D\u9047" + event + "\uFF01\n\u635F\u5931" + loss + "\u9999\u706B\u94B1";
            }
          } else {
            // 成功
            var reward = Math.floor(config.reward * (0.8 + Math.random() * 0.4));
            player.incense_money += reward;

            if (this.statusLabel) {
              this.statusLabel.string = "\u5316\u7F18\u6210\u529F\uFF01\n\u83B7\u5F97" + reward + "\u9999\u706B\u94B1";
            }
          }

          setTimeout(() => this.updateDisplay(), 2000);
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "statusLabel", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "backBtn", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "eastBtn", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "southBtn", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "westBtn", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "northBtn", [_dec7], {
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
//# sourceMappingURL=c841217f730df9c9267a37bb2252e49cc109c1e6.js.map