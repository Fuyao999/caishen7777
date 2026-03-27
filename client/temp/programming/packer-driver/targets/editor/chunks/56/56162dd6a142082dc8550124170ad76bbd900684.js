System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, director, Node, Label, Button, ProgressBar, Sprite, GameManager, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _crd, ccclass, property, EnhanceScene;

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
      ProgressBar = _cc.ProgressBar;
      Sprite = _cc.Sprite;
    }, function (_unresolved_2) {
      GameManager = _unresolved_2.GameManager;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "152deTqIEFNUL68aRiyH6qG", "EnhanceScene", undefined);

      __checkObsolete__(['_decorator', 'Component', 'director', 'Node', 'Label', 'Button', 'ProgressBar', 'Sprite', 'Toggle']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("EnhanceScene", EnhanceScene = (_dec = ccclass('EnhanceScene'), _dec2 = property(Button), _dec3 = property(Node), _dec4 = property(Label), _dec5 = property(Label), _dec6 = property(Label), _dec7 = property(Label), _dec8 = property(Label), _dec9 = property(Button), _dec10 = property(Button), _dec11 = property(ProgressBar), _dec12 = property(Sprite), _dec(_class = (_class2 = class EnhanceScene extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "backBtn", _descriptor, this);

          _initializerDefineProperty(this, "equipmentSlot", _descriptor2, this);

          _initializerDefineProperty(this, "equipmentNameLabel", _descriptor3, this);

          _initializerDefineProperty(this, "currentLevelLabel", _descriptor4, this);

          _initializerDefineProperty(this, "nextLevelLabel", _descriptor5, this);

          _initializerDefineProperty(this, "successRateLabel", _descriptor6, this);

          _initializerDefineProperty(this, "costLabel", _descriptor7, this);

          _initializerDefineProperty(this, "enhanceBtn", _descriptor8, this);

          _initializerDefineProperty(this, "autoEnhanceBtn", _descriptor9, this);

          _initializerDefineProperty(this, "enhanceProgress", _descriptor10, this);

          _initializerDefineProperty(this, "resultEffect", _descriptor11, this);

          // 当前选中的装备
          this.selectedEquipment = {
            id: 'sword_001',
            name: '桃木拂尘',
            level: 0,
            maxLevel: 10,
            quality: 'rare'
          };
          // 强化配置
          this.enhanceConfig = [{
            level: 0,
            cost: 1000,
            rate: 1.0,
            bonus: 0
          }, {
            level: 1,
            cost: 2000,
            rate: 0.95,
            bonus: 0.1
          }, {
            level: 2,
            cost: 4000,
            rate: 0.90,
            bonus: 0.2
          }, {
            level: 3,
            cost: 8000,
            rate: 0.85,
            bonus: 0.3
          }, {
            level: 4,
            cost: 15000,
            rate: 0.80,
            bonus: 0.4
          }, {
            level: 5,
            cost: 30000,
            rate: 0.75,
            bonus: 0.5
          }, {
            level: 6,
            cost: 60000,
            rate: 0.70,
            bonus: 0.6
          }, {
            level: 7,
            cost: 120000,
            rate: 0.65,
            bonus: 0.7
          }, {
            level: 8,
            cost: 250000,
            rate: 0.60,
            bonus: 0.8
          }, {
            level: 9,
            cost: 500000,
            rate: 0.55,
            bonus: 0.9
          }, {
            level: 10,
            cost: 1000000,
            rate: 0.50,
            bonus: 1.0
          }];
        }

        onLoad() {
          this.backBtn.node.on(Button.EventType.CLICK, this.onBack, this);
          this.enhanceBtn.node.on(Button.EventType.CLICK, this.onEnhance, this);
          this.autoEnhanceBtn.node.on(Button.EventType.CLICK, this.onAutoEnhance, this);
        }

        start() {
          this.updateUI();
        }

        updateUI() {
          this.equipmentNameLabel.string = this.selectedEquipment.name;
          this.currentLevelLabel.string = `当前强化: +${this.selectedEquipment.level}`;

          if (this.selectedEquipment.level >= this.selectedEquipment.maxLevel) {
            this.nextLevelLabel.string = '已达到最高强化等级';
            this.successRateLabel.string = '-';
            this.costLabel.string = '-';
            this.enhanceBtn.interactable = false;
            this.autoEnhanceBtn.interactable = false;
          } else {
            const nextConfig = this.enhanceConfig[this.selectedEquipment.level + 1];
            this.nextLevelLabel.string = `下一级: +${this.selectedEquipment.level + 1}`;
            this.successRateLabel.string = `成功率: ${(nextConfig.rate * 100).toFixed(0)}%`;
            this.costLabel.string = `消耗: ${nextConfig.cost}香火钱`;
            this.enhanceBtn.interactable = true;
            this.autoEnhanceBtn.interactable = true;
          }
        }

        async onEnhance() {
          if (this.selectedEquipment.level >= this.selectedEquipment.maxLevel) return;
          const nextConfig = this.enhanceConfig[this.selectedEquipment.level + 1];
          const player = (_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
            error: Error()
          }), GameManager) : GameManager).getInstance().playerData;

          if (!player.costCurrency('incense_money', nextConfig.cost)) {
            console.log('香火钱不足');
            return;
          } // 播放强化动画


          this.enhanceBtn.interactable = false;
          await this.playEnhanceAnimation(); // 判定成功失败

          const random = Math.random();

          if (random <= nextConfig.rate) {
            // 成功
            this.selectedEquipment.level++;
            this.showSuccessEffect();
            console.log(`强化成功！当前+${this.selectedEquipment.level}`);
          } else {
            // 失败（不掉级）
            this.showFailEffect();
            console.log('强化失败，装备未损坏');
          }

          this.enhanceBtn.interactable = true;
          this.updateUI();
        }

        async onAutoEnhance() {
          const targetLevel = Math.min(this.selectedEquipment.maxLevel, this.selectedEquipment.level + 3);

          while (this.selectedEquipment.level < targetLevel) {
            await this.onEnhance();
            await this.sleep(500);
          }
        }

        playEnhanceAnimation() {
          return new Promise(resolve => {
            let progress = 0;
            const interval = setInterval(() => {
              progress += 0.1;
              this.enhanceProgress.progress = progress;

              if (progress >= 1) {
                clearInterval(interval);
                this.enhanceProgress.progress = 0;
                resolve();
              }
            }, 100);
          });
        }

        showSuccessEffect() {
          // 显示成功特效
          this.resultEffect.node.active = true;
          this.resultEffect.node.getChildByName('Label').getComponent(Label).string = '强化成功！';
          this.resultEffect.node.getChildByName('Label').getComponent(Label).color = {
            r: 0,
            g: 255,
            b: 0,
            a: 255
          };
          setTimeout(() => {
            this.resultEffect.node.active = false;
          }, 2000);
        }

        showFailEffect() {
          // 显示失败特效
          this.resultEffect.node.active = true;
          this.resultEffect.node.getChildByName('Label').getComponent(Label).string = '强化失败';
          this.resultEffect.node.getChildByName('Label').getComponent(Label).color = {
            r: 255,
            g: 0,
            b: 0,
            a: 255
          };
          setTimeout(() => {
            this.resultEffect.node.active = false;
          }, 2000);
        }

        sleep(ms) {
          return new Promise(resolve => setTimeout(resolve, ms));
        }

        onBack() {
          director.loadScene('MainScene');
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "backBtn", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "equipmentSlot", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "equipmentNameLabel", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "currentLevelLabel", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "nextLevelLabel", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "successRateLabel", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "costLabel", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "enhanceBtn", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "autoEnhanceBtn", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "enhanceProgress", [_dec11], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "resultEffect", [_dec12], {
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
//# sourceMappingURL=56162dd6a142082dc8550124170ad76bbd900684.js.map