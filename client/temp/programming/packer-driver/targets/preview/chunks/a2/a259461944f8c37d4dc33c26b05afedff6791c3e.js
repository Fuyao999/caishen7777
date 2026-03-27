System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, director, Label, Button, ProgressBar, GameManager, SceneConfig, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _crd, ccclass, property, DomainScene;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfGameManager(extras) {
    _reporterNs.report("GameManager", "../Core/GameManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfSceneConfig(extras) {
    _reporterNs.report("SceneConfig", "../Config/SceneConfig", _context.meta, extras);
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
    }, function (_unresolved_3) {
      SceneConfig = _unresolved_3.SceneConfig;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "335681G1dJPR5/raA37fSKV", "DomainScene", undefined);

      __checkObsolete__(['_decorator', 'Component', 'director', 'Node', 'Label', 'Button', 'ProgressBar', 'Sprite']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("DomainScene", DomainScene = (_dec = ccclass('DomainScene'), _dec2 = property(Button), _dec3 = property(Button), _dec4 = property(Button), _dec5 = property(Label), _dec6 = property(Label), _dec7 = property(Label), _dec8 = property(Label), _dec9 = property(Label), _dec10 = property(ProgressBar), _dec(_class = (_class2 = class DomainScene extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "backBtn", _descriptor, this);

          _initializerDefineProperty(this, "exploreBtn", _descriptor2, this);

          _initializerDefineProperty(this, "bossBtn", _descriptor3, this);

          _initializerDefineProperty(this, "domainNameLabel", _descriptor4, this);

          _initializerDefineProperty(this, "domainDescLabel", _descriptor5, this);

          _initializerDefineProperty(this, "bossNameLabel", _descriptor6, this);

          _initializerDefineProperty(this, "bossElementLabel", _descriptor7, this);

          _initializerDefineProperty(this, "rewardLabel", _descriptor8, this);

          _initializerDefineProperty(this, "explorationProgress", _descriptor9, this);

          this.currentDomain = null;
          this.explorationValue = 0;
        }

        onLoad() {
          this.backBtn.node.on(Button.EventType.CLICK, this.onBack, this);
          this.exploreBtn.node.on(Button.EventType.CLICK, this.onExplore, this);
          this.bossBtn.node.on(Button.EventType.CLICK, this.onChallengeBoss, this);
        }

        start() {
          // 从GameManager获取当前选中的财域
          this.currentDomain = (_crd && SceneConfig === void 0 ? (_reportPossibleCrUseOfSceneConfig({
            error: Error()
          }), SceneConfig) : SceneConfig).domains['zishi']; // 默认子时

          this.updateUI();
        }

        updateUI() {
          if (!this.currentDomain) return;
          this.domainNameLabel.string = this.currentDomain.name;
          this.domainDescLabel.string = this.currentDomain.desc;
          this.bossNameLabel.string = "BOSS: " + this.currentDomain.boss.name;
          this.bossElementLabel.string = "\u5C5E\u6027: " + this.currentDomain.boss.element;
          this.rewardLabel.string = "\u5956\u52B1: " + this.currentDomain.boss.reward;
          this.explorationProgress.progress = this.explorationValue;
        }

        onExplore() {
          // 探索逻辑
          (_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
            error: Error()
          }), GameManager) : GameManager).getInstance().showLoading('探索中...');
          setTimeout(() => {
            (_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
              error: Error()
            }), GameManager) : GameManager).getInstance().hideLoading(); // 增加探索度

            this.explorationValue = Math.min(1, this.explorationValue + 0.1);
            this.explorationProgress.progress = this.explorationValue; // 随机奖励

            var reward = Math.floor(Math.random() * 100) + 50;
            (_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
              error: Error()
            }), GameManager) : GameManager).getInstance().playerData.addCurrency('incense_money', reward); // 显示奖励

            console.log("\u63A2\u7D22\u83B7\u5F97" + reward + "\u9999\u706B\u94B1"); // 检查是否触发战斗

            if (Math.random() < 0.3) {
              director.loadScene('BattleScene');
            }
          }, 1000);
        }

        onChallengeBoss() {
          if (this.explorationValue < 1) {
            console.log('需要100%探索度才能挑战BOSS');
            return;
          } // 进入BOSS战


          director.loadScene('BossScene');
        }

        onBack() {
          director.loadScene('MapScene');
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "backBtn", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "exploreBtn", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "bossBtn", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "domainNameLabel", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "domainDescLabel", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "bossNameLabel", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "bossElementLabel", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "rewardLabel", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "explorationProgress", [_dec10], {
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
//# sourceMappingURL=a259461944f8c37d4dc33c26b05afedff6791c3e.js.map