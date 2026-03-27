System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, director, Label, Button, ProgressBar, GameManager, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _crd, ccclass, property, TowerScene;

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

      _cclegacy._RF.push({}, "671acQ/uq1G5ZTKzLv0aO8O", "TowerScene", undefined);

      __checkObsolete__(['_decorator', 'Component', 'director', 'Node', 'Label', 'Button', 'ProgressBar']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("TowerScene", TowerScene = (_dec = ccclass('TowerScene'), _dec2 = property(Button), _dec3 = property(Button), _dec4 = property(Button), _dec5 = property(Label), _dec6 = property(Label), _dec7 = property(Label), _dec8 = property(Label), _dec9 = property(ProgressBar), _dec(_class = (_class2 = class TowerScene extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "backBtn", _descriptor, this);

          _initializerDefineProperty(this, "challengeBtn", _descriptor2, this);

          _initializerDefineProperty(this, "sweepBtn", _descriptor3, this);

          _initializerDefineProperty(this, "currentFloorLabel", _descriptor4, this);

          _initializerDefineProperty(this, "maxFloorLabel", _descriptor5, this);

          _initializerDefineProperty(this, "rewardLabel", _descriptor6, this);

          _initializerDefineProperty(this, "enemyInfoLabel", _descriptor7, this);

          _initializerDefineProperty(this, "difficultyBar", _descriptor8, this);

          this.currentFloor = 1;
          this.maxClearedFloor = 1;
          this.maxFloors = 100;
        }

        onLoad() {
          this.backBtn.node.on(Button.EventType.CLICK, this.onBack, this);
          this.challengeBtn.node.on(Button.EventType.CLICK, this.onChallenge, this);
          this.sweepBtn.node.on(Button.EventType.CLICK, this.onSweep, this);
        }

        start() {
          this.updateUI();
        }

        updateUI() {
          this.currentFloorLabel.string = `当前层数: ${this.currentFloor}`;
          this.maxFloorLabel.string = `最高通关: ${this.maxClearedFloor}层`; // 计算敌人强度

          const enemyLevel = 50 + this.currentFloor * 2;
          const enemyHp = 1000 + this.currentFloor * 500;
          const enemyAttack = 100 + this.currentFloor * 10;
          this.enemyInfoLabel.string = `敌人: Lv.${enemyLevel}\n血量: ${enemyHp}\n攻击: ${enemyAttack}`; // 难度条

          this.difficultyBar.progress = this.currentFloor / this.maxFloors; // 奖励预览

          const expReward = this.currentFloor * 1000;
          const goldReward = this.currentFloor * 500;
          this.rewardLabel.string = `通关奖励:\n${expReward}经验\n${goldReward}香火钱`; // 扫荡按钮只在已通关层可用

          this.sweepBtn.interactable = this.currentFloor <= this.maxClearedFloor;
        }

        onChallenge() {
          // 模拟战斗
          const playerLevel = (_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
            error: Error()
          }), GameManager) : GameManager).getInstance().playerData.getLevel();
          const enemyLevel = 50 + this.currentFloor * 2; // 胜负判定（简化）

          const winChance = Math.min(0.9, Math.max(0.1, (playerLevel - enemyLevel + 50) / 100));
          const win = Math.random() < winChance;

          if (win) {
            // 胜利
            const expReward = this.currentFloor * 1000;
            const goldReward = this.currentFloor * 500;
            (_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
              error: Error()
            }), GameManager) : GameManager).getInstance().playerData.addCurrency('incense_money', goldReward);
            alert(`挑战成功！获得${expReward}经验和${goldReward}香火钱`);

            if (this.currentFloor > this.maxClearedFloor) {
              this.maxClearedFloor = this.currentFloor;
            }

            this.currentFloor++;

            if (this.currentFloor > this.maxFloors) {
              alert('恭喜通关100层！');
              this.currentFloor = this.maxFloors;
            }
          } else {
            // 失败
            alert('挑战失败，请提升实力后再来');
          }

          this.updateUI();
        }

        onSweep() {
          if (this.currentFloor > this.maxClearedFloor) {
            alert('未通关该层，无法扫荡');
            return;
          } // 扫荡获得80%奖励


          const expReward = Math.floor(this.currentFloor * 1000 * 0.8);
          const goldReward = Math.floor(this.currentFloor * 500 * 0.8);
          (_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
            error: Error()
          }), GameManager) : GameManager).getInstance().playerData.addCurrency('incense_money', goldReward);
          alert(`扫荡成功！获得${expReward}经验和${goldReward}香火钱`);
          this.currentFloor++;
          this.updateUI();
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
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "challengeBtn", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "sweepBtn", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "currentFloorLabel", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "maxFloorLabel", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "rewardLabel", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "enemyInfoLabel", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "difficultyBar", [_dec9], {
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
//# sourceMappingURL=09ae45dcc6e89f57b5efd3fd2f1d2e50af18f5b3.js.map