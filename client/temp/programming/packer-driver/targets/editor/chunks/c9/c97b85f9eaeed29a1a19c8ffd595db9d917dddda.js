System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, director, Node, Label, Button, ProgressBar, GameManager, Utils, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _crd, ccclass, property, BattleScene;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfGameManager(extras) {
    _reporterNs.report("GameManager", "../Core/GameManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfUtils(extras) {
    _reporterNs.report("Utils", "../Utils/Utils", _context.meta, extras);
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
    }, function (_unresolved_2) {
      GameManager = _unresolved_2.GameManager;
    }, function (_unresolved_3) {
      Utils = _unresolved_3.Utils;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "862fdnAYxtIO6R848QMC/pA", "BattleScene", undefined);

      __checkObsolete__(['_decorator', 'Component', 'director', 'Node', 'Label', 'Button', 'ProgressBar', 'Sprite']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("BattleScene", BattleScene = (_dec = ccclass('BattleScene'), _dec2 = property(Node), _dec3 = property(Node), _dec4 = property(ProgressBar), _dec5 = property(ProgressBar), _dec6 = property(Label), _dec7 = property(Button), _dec8 = property(Button), _dec9 = property(Button), _dec10 = property(Button), _dec(_class = (_class2 = class BattleScene extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "playerNode", _descriptor, this);

          _initializerDefineProperty(this, "enemyNode", _descriptor2, this);

          _initializerDefineProperty(this, "playerHpBar", _descriptor3, this);

          _initializerDefineProperty(this, "enemyHpBar", _descriptor4, this);

          _initializerDefineProperty(this, "battleLog", _descriptor5, this);

          _initializerDefineProperty(this, "attackBtn", _descriptor6, this);

          _initializerDefineProperty(this, "skillBtn", _descriptor7, this);

          _initializerDefineProperty(this, "itemBtn", _descriptor8, this);

          _initializerDefineProperty(this, "fleeBtn", _descriptor9, this);

          this.player = {
            hp: 100,
            maxHp: 100,
            mp: 50,
            maxMp: 50,
            attack: 20,
            defense: 10
          };
          this.enemy = {
            name: '试炼傀儡',
            hp: 80,
            maxHp: 80,
            attack: 15,
            defense: 5
          };
          this.isPlayerTurn = true;
          this.battleLogText = [];
        }

        onLoad() {
          this.attackBtn.node.on(Button.EventType.CLICK, this.onAttack, this);
          this.skillBtn.node.on(Button.EventType.CLICK, this.onSkill, this);
          this.itemBtn.node.on(Button.EventType.CLICK, this.onItem, this);
          this.fleeBtn.node.on(Button.EventType.CLICK, this.onFlee, this);
        }

        start() {
          this.updateUI();
          this.addLog('战斗开始！');
        }

        updateUI() {
          this.playerHpBar.progress = this.player.hp / this.player.maxHp;
          this.enemyHpBar.progress = this.enemy.hp / this.enemy.maxHp; // 更新按钮状态

          this.attackBtn.interactable = this.isPlayerTurn;
          this.skillBtn.interactable = this.isPlayerTurn && this.player.mp >= 10;
          this.itemBtn.interactable = this.isPlayerTurn;
          this.fleeBtn.interactable = this.isPlayerTurn;
        }

        onAttack() {
          if (!this.isPlayerTurn) return; // 玩家攻击

          const damage = Math.max(1, this.player.attack - this.enemy.defense + (_crd && Utils === void 0 ? (_reportPossibleCrUseOfUtils({
            error: Error()
          }), Utils) : Utils).randomInt(-5, 5));
          this.enemy.hp = Math.max(0, this.enemy.hp - damage);
          this.addLog(`你对${this.enemy.name}造成${damage}点伤害！`);
          this.updateUI();

          if (this.enemy.hp <= 0) {
            this.onWin();
            return;
          } // 敌人回合


          this.isPlayerTurn = false;
          this.scheduleOnce(() => this.enemyTurn(), 1);
        }

        onSkill() {
          if (!this.isPlayerTurn || this.player.mp < 10) return; // 使用技能（简化版重击）

          this.player.mp -= 10;
          const damage = Math.max(1, Math.floor(this.player.attack * 1.5) - this.enemy.defense);
          this.enemy.hp = Math.max(0, this.enemy.hp - damage);
          this.addLog(`你使用重击，对${this.enemy.name}造成${damage}点伤害！`);
          this.updateUI();

          if (this.enemy.hp <= 0) {
            this.onWin();
            return;
          }

          this.isPlayerTurn = false;
          this.scheduleOnce(() => this.enemyTurn(), 1);
        }

        onItem() {
          if (!this.isPlayerTurn) return;
          this.addLog('背包功能开发中...');
        }

        onFlee() {
          if (!this.isPlayerTurn) return;

          if ((_crd && Utils === void 0 ? (_reportPossibleCrUseOfUtils({
            error: Error()
          }), Utils) : Utils).probability(0.5)) {
            this.addLog('逃跑成功！');
            this.scheduleOnce(() => director.loadScene('MainScene'), 1);
          } else {
            this.addLog('逃跑失败！');
            this.isPlayerTurn = false;
            this.scheduleOnce(() => this.enemyTurn(), 1);
          }
        }

        enemyTurn() {
          if (this.enemy.hp <= 0) return;
          const damage = Math.max(1, this.enemy.attack - this.player.defense + (_crd && Utils === void 0 ? (_reportPossibleCrUseOfUtils({
            error: Error()
          }), Utils) : Utils).randomInt(-3, 3));
          this.player.hp = Math.max(0, this.player.hp - damage);
          this.addLog(`${this.enemy.name}对你造成${damage}点伤害！`);
          this.updateUI();

          if (this.player.hp <= 0) {
            this.onLose();
            return;
          } // 恢复法力


          this.player.mp = Math.min(this.player.maxMp, this.player.mp + 5);
          this.isPlayerTurn = true;
          this.updateUI();
        }

        onWin() {
          this.addLog('战斗胜利！'); // 奖励

          const rewardMoney = (_crd && Utils === void 0 ? (_reportPossibleCrUseOfUtils({
            error: Error()
          }), Utils) : Utils).randomInt(100, 200);
          (_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
            error: Error()
          }), GameManager) : GameManager).getInstance().playerData.addCurrency('incense_money', rewardMoney);
          this.addLog(`获得${rewardMoney}香火钱！`);
          this.scheduleOnce(() => director.loadScene('MainScene'), 2);
        }

        onLose() {
          this.addLog('战斗失败...');
          this.scheduleOnce(() => director.loadScene('MainScene'), 2);
        }

        addLog(text) {
          this.battleLogText.push(text);

          if (this.battleLogText.length > 5) {
            this.battleLogText.shift();
          }

          this.battleLog.string = this.battleLogText.join('\n');
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "playerNode", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "enemyNode", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "playerHpBar", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "enemyHpBar", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "battleLog", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "attackBtn", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "skillBtn", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "itemBtn", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "fleeBtn", [_dec10], {
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
//# sourceMappingURL=c97b85f9eaeed29a1a19c8ffd595db9d917dddda.js.map