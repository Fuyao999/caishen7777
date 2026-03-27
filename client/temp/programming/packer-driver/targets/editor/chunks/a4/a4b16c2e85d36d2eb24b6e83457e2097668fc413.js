System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, director, Label, Button, ProgressBar, GameManager, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _crd, ccclass, property, WorldBossScene;

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

      _cclegacy._RF.push({}, "6521e9Rp65NyrQdRzOattWg", "WorldBossScene", undefined);

      __checkObsolete__(['_decorator', 'Component', 'director', 'Node', 'Label', 'Button', 'ProgressBar', 'Sprite']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("WorldBossScene", WorldBossScene = (_dec = ccclass('WorldBossScene'), _dec2 = property(Button), _dec3 = property(Button), _dec4 = property(Button), _dec5 = property(Label), _dec6 = property(Label), _dec7 = property(ProgressBar), _dec8 = property(Label), _dec9 = property(Label), _dec10 = property(Label), _dec11 = property(Label), _dec(_class = (_class2 = class WorldBossScene extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "backBtn", _descriptor, this);

          _initializerDefineProperty(this, "challengeBtn", _descriptor2, this);

          _initializerDefineProperty(this, "rankBtn", _descriptor3, this);

          _initializerDefineProperty(this, "bossNameLabel", _descriptor4, this);

          _initializerDefineProperty(this, "bossHpLabel", _descriptor5, this);

          _initializerDefineProperty(this, "bossHpBar", _descriptor6, this);

          _initializerDefineProperty(this, "timeLeftLabel", _descriptor7, this);

          _initializerDefineProperty(this, "myDamageLabel", _descriptor8, this);

          _initializerDefineProperty(this, "myRankLabel", _descriptor9, this);

          _initializerDefineProperty(this, "rewardPreviewLabel", _descriptor10, this);

          // 世界BOSS数据
          this.bossData = {
            name: '金乌之灵',
            maxHp: 100000000,
            // 1亿血量，全服共享
            currentHp: 85000000,
            level: 99,
            element: 'fire'
          };
          this.myDamage = 0;
          this.timeLeft = 2 * 3600;
        }

        // 2小时
        onLoad() {
          this.backBtn.node.on(Button.EventType.CLICK, this.onBack, this);
          this.challengeBtn.node.on(Button.EventType.CLICK, this.onChallenge, this);
          this.rankBtn.node.on(Button.EventType.CLICK, this.onShowRank, this);
        }

        start() {
          this.updateBossUI();
          this.schedule(this.updateCountdown, 1);
          this.schedule(this.simulateBossDamage, 5); // 每5秒模拟其他玩家造成伤害
        }

        updateBossUI() {
          this.bossNameLabel.string = `${this.bossData.name} (Lv.${this.bossData.level})`;
          this.bossHpLabel.string = `${this.formatNumber(this.bossData.currentHp)} / ${this.formatNumber(this.bossData.maxHp)}`;
          this.bossHpBar.progress = this.bossData.currentHp / this.bossData.maxHp;
          this.myDamageLabel.string = `我的伤害: ${this.formatNumber(this.myDamage)}`;
          this.myRankLabel.string = `排名: 第${this.getMyRank()}名`; // 奖励预览

          const rank = this.getMyRank();
          let reward = '';
          if (rank === 1) reward = '传说装备 + 1000元宝';else if (rank <= 3) reward = '史诗装备 + 500元宝';else if (rank <= 10) reward = '稀有装备 + 200元宝';else if (rank <= 50) reward = '精良装备 + 100元宝';else reward = '参与奖: 50元宝';
          this.rewardPreviewLabel.string = `预计奖励: ${reward}`;
        }

        updateCountdown() {
          this.timeLeft--;

          if (this.timeLeft <= 0) {
            this.timeLeft = 0;
            this.onBossEnd();
          }

          const hours = Math.floor(this.timeLeft / 3600);
          const mins = Math.floor(this.timeLeft % 3600 / 60);
          const secs = this.timeLeft % 60;
          this.timeLeftLabel.string = `剩余时间: ${hours}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        }

        simulateBossDamage() {
          // 模拟全服玩家造成的伤害
          const damage = Math.floor(Math.random() * 1000000) + 500000;
          this.bossData.currentHp = Math.max(0, this.bossData.currentHp - damage);
          this.updateBossUI();

          if (this.bossData.currentHp <= 0) {
            this.onBossDefeated();
          }
        }

        onChallenge() {
          // 进入战斗，对世界BOSS造成伤害
          const damage = Math.floor(Math.random() * 50000) + 30000;
          this.myDamage += damage;
          this.bossData.currentHp = Math.max(0, this.bossData.currentHp - damage);
          console.log(`对世界BOSS造成 ${damage} 点伤害！`);
          this.updateBossUI();

          if (this.bossData.currentHp <= 0) {
            this.onBossDefeated();
          }
        }

        onBossDefeated() {
          this.unschedule(this.updateCountdown);
          this.unschedule(this.simulateBossDamage);
          console.log('世界BOSS已被击败！发放奖励'); // 发放奖励

          const rank = this.getMyRank();
          const player = (_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
            error: Error()
          }), GameManager) : GameManager).getInstance().playerData;

          if (rank === 1) {
            player.addCurrency('yuanbao', 1000);
          } else if (rank <= 3) {
            player.addCurrency('yuanbao', 500);
          } else if (rank <= 10) {
            player.addCurrency('yuanbao', 200);
          } else if (rank <= 50) {
            player.addCurrency('yuanbao', 100);
          } else {
            player.addCurrency('yuanbao', 50);
          }

          alert(`世界BOSS已被击败！你的排名: 第${rank}名，奖励已发放！`);
        }

        onBossEnd() {
          this.unscheduleAllCallbacks();
          console.log('活动时间结束，结算奖励');
        }

        getMyRank() {
          // 模拟排名（基于伤害）
          if (this.myDamage > 1000000) return 1;
          if (this.myDamage > 800000) return 2;
          if (this.myDamage > 600000) return 3;
          if (this.myDamage > 400000) return Math.floor(Math.random() * 7) + 4;
          if (this.myDamage > 200000) return Math.floor(Math.random() * 40) + 11;
          return Math.floor(Math.random() * 50) + 51;
        }

        formatNumber(num) {
          if (num >= 100000000) return (num / 100000000).toFixed(1) + '亿';
          if (num >= 10000) return (num / 10000).toFixed(1) + '万';
          return num.toString();
        }

        onShowRank() {
          console.log('显示伤害排行榜');
        }

        onBack() {
          director.loadScene('MainScene');
        }

        onDestroy() {
          this.unscheduleAllCallbacks();
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
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "rankBtn", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "bossNameLabel", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "bossHpLabel", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "bossHpBar", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "timeLeftLabel", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "myDamageLabel", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "myRankLabel", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "rewardPreviewLabel", [_dec11], {
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
//# sourceMappingURL=a4b16c2e85d36d2eb24b6e83457e2097668fc413.js.map