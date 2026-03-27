System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, director, Label, Button, ProgressBar, GameManager, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _crd, ccclass, property, ThunderScene;

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
      ProgressBar = _cc.ProgressBar;
    }, function (_unresolved_2) {
      GameManager = _unresolved_2.GameManager;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "8aec1A3ksNGsI9Chdlm2jc5", "ThunderScene", undefined);

      __checkObsolete__(['_decorator', 'Component', 'director', 'Node', 'Label', 'Button', 'ProgressBar']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("ThunderScene", ThunderScene = (_dec = ccclass('ThunderScene'), _dec2 = property(Button), _dec3 = property(Button), _dec4 = property(Label), _dec5 = property(Label), _dec6 = property(Label), _dec7 = property(ProgressBar), _dec8 = property(Label), _dec(_class = (_class2 = class ThunderScene extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "backBtn", _descriptor, this);

          _initializerDefineProperty(this, "startBtn", _descriptor2, this);

          _initializerDefineProperty(this, "statusLabel", _descriptor3, this);

          _initializerDefineProperty(this, "thunderCountLabel", _descriptor4, this);

          _initializerDefineProperty(this, "currentBuffLabel", _descriptor5, this);

          _initializerDefineProperty(this, "healthBar", _descriptor6, this);

          _initializerDefineProperty(this, "riskWarningLabel", _descriptor7, this);

          this.thunderCount = 0;
          this.maxThunders = 18;
          this.isActive = false;
          this.health = 100;
          this.buffs = [];
        }

        onLoad() {
          this.backBtn.node.on(Button.EventType.CLICK, this.onBack, this);
          this.startBtn.node.on(Button.EventType.CLICK, this.onStart, this);
        }

        start() {
          this.updateUI();
        }

        updateUI() {
          this.thunderCountLabel.string = "\u5DF2\u627F\u53D7\u96F7\u51FB: " + this.thunderCount + "/" + this.maxThunders;
          this.currentBuffLabel.string = "\u5F53\u524D\u52A0\u6210:\n" + this.getBuffText();
          this.healthBar.progress = this.health / 100;

          if (this.health <= 0) {
            this.statusLabel.string = '已死亡，损失10%修为';
            this.statusLabel.color = {
              r: 255,
              g: 0,
              b: 0,
              a: 255
            };
          } else if (this.thunderCount >= this.maxThunders) {
            this.statusLabel.string = '✅ 完成18道雷击，获得永久突破！';
            this.statusLabel.color = {
              r: 0,
              g: 255,
              b: 0,
              a: 255
            };
          } else if (this.isActive) {
            this.statusLabel.string = '⚡ 雷电淬炼中...';
          } else {
            this.statusLabel.string = '准备开始雷电淬炼';
          }
        }

        getBuffText() {
          if (this.buffs.length === 0) return '无';
          return this.buffs.map(b => b.name + " +" + b.value).join('\n');
        }

        onStart() {
          if (this.isActive || this.health <= 0 || this.thunderCount >= this.maxThunders) return;
          this.isActive = true;
          this.statusLabel.string = '⚡ 雷电淬炼开始！'; // 开始雷击循环

          this.schedule(this.onThunderStrike, 3);
        }

        onThunderStrike() {
          if (this.health <= 0 || this.thunderCount >= this.maxThunders) {
            this.unschedule(this.onThunderStrike);
            this.isActive = false;
            return;
          }

          this.thunderCount++; // 计算伤害

          var damage = 5 + this.thunderCount * 2;
          this.health -= damage; // 随机获得临时加成

          if (this.health > 0) {
            var buffs = [{
              name: '攻击',
              value: Math.floor(Math.random() * 50) + 10
            }, {
              name: '防御',
              value: Math.floor(Math.random() * 30) + 5
            }, {
              name: '暴击',
              value: Math.floor(Math.random() * 10) + 2
            }];
            var buff = buffs[Math.floor(Math.random() * buffs.length)];
            this.buffs.push(buff); // 第18道雷击获得永久突破

            if (this.thunderCount === 18) {
              alert('🎉 恭喜！获得永久属性突破！');
              (_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
                error: Error()
              }), GameManager) : GameManager).getInstance().playerData.addCurrency('cultivation', 1000);
            }
          } else {
            // 死亡惩罚
            alert('💀 承受不住雷击，死亡！损失10%修为');
            (_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
              error: Error()
            }), GameManager) : GameManager).getInstance().playerData.costCurrency('cultivation', 100);
          }

          this.updateUI();
        }

        onBack() {
          this.unscheduleAllCallbacks();
          director.loadScene('MainScene');
        }

        onDestroy() {
          this.unscheduleAllCallbacks();
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "backBtn", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "startBtn", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "statusLabel", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "thunderCountLabel", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "currentBuffLabel", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "healthBar", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "riskWarningLabel", [_dec8], {
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
//# sourceMappingURL=37d3e63aaf03cec2a5149247f90447bbb043faba.js.map