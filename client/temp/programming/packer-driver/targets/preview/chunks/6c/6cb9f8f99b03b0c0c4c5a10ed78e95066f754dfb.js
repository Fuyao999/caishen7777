System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, director, Label, Button, ProgressBar, GameManager, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _crd, ccclass, property, UpgradeScene;

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

      _cclegacy._RF.push({}, "e4d82vmo9ZLxLU5JWkpiTcf", "UpgradeScene", undefined);

      __checkObsolete__(['_decorator', 'Component', 'director', 'Node', 'Label', 'Button', 'ProgressBar']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("UpgradeScene", UpgradeScene = (_dec = ccclass('UpgradeScene'), _dec2 = property(Button), _dec3 = property(Label), _dec4 = property(Label), _dec5 = property(Label), _dec6 = property(ProgressBar), _dec7 = property(Label), _dec8 = property(Button), _dec(_class = (_class2 = class UpgradeScene extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "backBtn", _descriptor, this);

          _initializerDefineProperty(this, "currentStageLabel", _descriptor2, this);

          _initializerDefineProperty(this, "nextStageLabel", _descriptor3, this);

          _initializerDefineProperty(this, "requirementLabel", _descriptor4, this);

          _initializerDefineProperty(this, "meritProgress", _descriptor5, this);

          _initializerDefineProperty(this, "meritLabel", _descriptor6, this);

          _initializerDefineProperty(this, "upgradeBtn", _descriptor7, this);

          this.stages = ['clay', 'wood', 'bronze', 'gold'];
          this.stageNames = {
            clay: '泥胎',
            wood: '木骨',
            bronze: '铜身',
            gold: '金身'
          };
          this.stageRequirements = {
            clay: 100,
            wood: 500,
            bronze: 2000,
            gold: 10000
          };
        }

        onLoad() {
          this.backBtn.node.on(Button.EventType.CLICK, this.onBack, this);
          this.upgradeBtn.node.on(Button.EventType.CLICK, this.onUpgrade, this);
        }

        start() {
          this.updateUI();
        }

        updateUI() {
          var player = (_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
            error: Error()
          }), GameManager) : GameManager).getInstance().playerData;
          var currentStage = player.getStage();
          var currentMerit = player.getCurrency('merit');
          this.currentStageLabel.string = "\u5F53\u524D\u9636\u6BB5\uFF1A" + this.stageNames[currentStage];
          var currentIndex = this.stages.indexOf(currentStage);

          if (currentIndex >= this.stages.length - 1) {
            this.nextStageLabel.string = '已达到最高阶段！';
            this.requirementLabel.string = '';
            this.meritProgress.progress = 1;
            this.meritLabel.string = 'MAX';
            this.upgradeBtn.node.active = false;
          } else {
            var nextStage = this.stages[currentIndex + 1];
            var requirement = this.stageRequirements[currentStage];
            this.nextStageLabel.string = "\u4E0B\u4E00\u9636\u6BB5\uFF1A" + this.stageNames[nextStage];
            this.requirementLabel.string = "\u9700\u8981\u529F\u5FB7\uFF1A" + requirement;
            var progress = Math.min(currentMerit / requirement, 1);
            this.meritProgress.progress = progress;
            this.meritLabel.string = currentMerit + "/" + requirement;
            this.upgradeBtn.node.active = currentMerit >= requirement;
          }
        }

        onUpgrade() {
          var player = (_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
            error: Error()
          }), GameManager) : GameManager).getInstance().playerData;
          var currentStage = player.getStage();
          var requirement = this.stageRequirements[currentStage];

          if (player.getCurrency('merit') >= requirement) {
            // 扣除功德
            player.costCurrency('merit', requirement); // 升级

            var currentIndex = this.stages.indexOf(currentStage);
            var nextStage = this.stages[currentIndex + 1];
            player.setStage(nextStage); // 升级奖励

            if (nextStage === 'wood') {
              player.addCurrency('incense_sticks', 10);
            } else if (nextStage === 'bronze') {
              player.addCurrency('candles', 10);
            } else if (nextStage === 'gold') {
              player.addCurrency('yuanbao', 100);
            }

            this.updateUI(); // 显示升级成功提示
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
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "currentStageLabel", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "nextStageLabel", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "requirementLabel", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "meritProgress", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "meritLabel", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "upgradeBtn", [_dec8], {
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
//# sourceMappingURL=6cb9f8f99b03b0c0c4c5a10ed78e95066f754dfb.js.map