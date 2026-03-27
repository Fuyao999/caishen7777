System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, director, Node, Label, Button, Sprite, tween, Vec3, GameManager, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _crd, ccclass, property, GachaScene;

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
      Sprite = _cc.Sprite;
      tween = _cc.tween;
      Vec3 = _cc.Vec3;
    }, function (_unresolved_2) {
      GameManager = _unresolved_2.GameManager;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "661e6aHJPlPPoIF/QfwMcOa", "GachaScene", undefined);

      __checkObsolete__(['_decorator', 'Component', 'director', 'Node', 'Label', 'Button', 'Sprite', 'Animation', 'tween', 'Vec3']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("GachaScene", GachaScene = (_dec = ccclass('GachaScene'), _dec2 = property(Button), _dec3 = property(Button), _dec4 = property(Button), _dec5 = property(Label), _dec6 = property(Label), _dec7 = property(Node), _dec8 = property(Sprite), _dec9 = property(Label), _dec10 = property(Label), _dec11 = property(Node), _dec(_class = (_class2 = class GachaScene extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "backBtn", _descriptor, this);

          _initializerDefineProperty(this, "drawOneBtn", _descriptor2, this);

          _initializerDefineProperty(this, "drawTenBtn", _descriptor3, this);

          _initializerDefineProperty(this, "costLabel", _descriptor4, this);

          _initializerDefineProperty(this, "pityLabel", _descriptor5, this);

          _initializerDefineProperty(this, "resultPanel", _descriptor6, this);

          _initializerDefineProperty(this, "resultIcon", _descriptor7, this);

          _initializerDefineProperty(this, "resultNameLabel", _descriptor8, this);

          _initializerDefineProperty(this, "resultQualityLabel", _descriptor9, this);

          _initializerDefineProperty(this, "cardFlipNode", _descriptor10, this);

          this.costPerDraw = 60;
          this.pityCount = 0;
          this.maxPity = 90;
          this.rewards = [{
            type: 'god',
            name: '财神祝福',
            quality: 'legendary',
            prob: 0.01,
            icon: '🎊'
          }, {
            type: 'equipment',
            name: '传说装备',
            quality: 'epic',
            prob: 0.05,
            icon: '⚔️'
          }, {
            type: 'pet',
            name: '稀有灵兽',
            quality: 'rare',
            prob: 0.15,
            icon: '🐉'
          }, {
            type: 'item',
            name: '高级供品',
            quality: 'uncommon',
            prob: 0.3,
            icon: '📿'
          }, {
            type: 'currency',
            name: '香火钱',
            quality: 'common',
            prob: 0.49,
            amount: 1000,
            icon: '💰'
          }];
        }

        onLoad() {
          this.backBtn.node.on(Button.EventType.CLICK, this.onBack, this);
          this.drawOneBtn.node.on(Button.EventType.CLICK, () => this.onDraw(1), this);
          this.drawTenBtn.node.on(Button.EventType.CLICK, () => this.onDraw(10), this);
        }

        start() {
          this.updateUI();
        }

        updateUI() {
          this.costLabel.string = this.costPerDraw + "\u5143\u5B9D/\u6B21";
          this.pityLabel.string = "\u4FDD\u5E95: " + this.pityCount + "/" + this.maxPity;
        }

        onDraw(times) {
          var totalCost = this.costPerDraw * times;
          var player = (_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
            error: Error()
          }), GameManager) : GameManager).getInstance().playerData;

          if (!player.costCurrency('yuanbao', totalCost)) {
            console.log('元宝不足');
            return;
          } // 显示抽卡动画


          this.showDrawAnimation(times);
        }

        showDrawAnimation(times) {
          // 翻转卡片动画
          this.cardFlipNode.active = true;
          tween(this.cardFlipNode).to(0.5, {
            scale: new Vec3(0.1, 1, 1)
          }).call(() => {// 中间帧，切换显示
          }).to(0.5, {
            scale: new Vec3(1, 1, 1)
          }).call(() => {
            this.showResult(times);
          }).start();
        }

        showResult(times) {
          var results = [];

          for (var i = 0; i < times; i++) {
            this.pityCount++;
            var reward = void 0;

            if (this.pityCount >= this.maxPity) {
              // 保底
              reward = this.rewards[0];
              this.pityCount = 0;
            } else {
              // 随机抽取
              var rand = Math.random();
              var cumProb = 0;

              for (var r of this.rewards) {
                cumProb += r.prob;

                if (rand <= cumProb) {
                  reward = r;
                  break;
                }
              }
            }

            results.push(reward); // 发放奖励

            if (reward.type === 'currency') {
              (_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
                error: Error()
              }), GameManager) : GameManager).getInstance().playerData.addCurrency('incense_money', reward.amount || 1000);
            } else if (reward.type === 'item') {
              (_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
                error: Error()
              }), GameManager) : GameManager).getInstance().playerData.addCurrency('incense_sticks', 10);
            }
          } // 显示结果


          this.showResultPanel(results[0]);
          this.updateUI();
        }

        showResultPanel(reward) {
          this.resultPanel.active = true;
          this.resultNameLabel.string = reward.name;
          this.resultQualityLabel.string = reward.quality;
          this.resultQualityLabel.color = this.getQualityColor(reward.quality); // 显示图标
          // this.resultIcon.spriteFrame = ...
        }

        getQualityColor(quality) {
          var colors = {
            common: {
              r: 149,
              g: 165,
              b: 166
            },
            uncommon: {
              r: 46,
              g: 204,
              b: 113
            },
            rare: {
              r: 52,
              g: 152,
              b: 219
            },
            epic: {
              r: 155,
              g: 89,
              b: 182
            },
            legendary: {
              r: 243,
              g: 156,
              b: 18
            }
          };
          return colors[quality] || colors.common;
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
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "drawOneBtn", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "drawTenBtn", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "costLabel", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "pityLabel", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "resultPanel", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "resultIcon", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "resultNameLabel", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "resultQualityLabel", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "cardFlipNode", [_dec11], {
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
//# sourceMappingURL=799b930b95c4683cc5519fa4f71bd09e6ab48b79.js.map