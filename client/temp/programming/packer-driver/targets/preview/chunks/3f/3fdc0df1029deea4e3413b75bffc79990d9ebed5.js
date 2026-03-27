System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, director, Label, Button, GameManager, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _crd, ccclass, property, MainScene;

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

      _cclegacy._RF.push({}, "8cb43lucrpJwJ2aoWOBilcb", "MainScene", undefined);

      __checkObsolete__(['_decorator', 'Component', 'director', 'Node', 'Label', 'Button']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("MainScene", MainScene = (_dec = ccclass('MainScene'), _dec2 = property(Label), _dec3 = property(Label), _dec4 = property(Button), _dec5 = property(Button), _dec6 = property(Button), _dec(_class = (_class2 = class MainScene extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "moneyLabel", _descriptor, this);

          _initializerDefineProperty(this, "levelLabel", _descriptor2, this);

          _initializerDefineProperty(this, "templeBtn", _descriptor3, this);

          _initializerDefineProperty(this, "almsBtn", _descriptor4, this);

          _initializerDefineProperty(this, "upgradeBtn", _descriptor5, this);
        }

        onLoad() {
          this.updateUI();

          if (this.templeBtn) {
            this.templeBtn.node.on('click', () => director.loadScene('TempleScene'), this);
          }

          if (this.almsBtn) {
            this.almsBtn.node.on('click', () => director.loadScene('AlmsScene'), this);
          }

          if (this.upgradeBtn) {
            this.upgradeBtn.node.on('click', () => this.onUpgrade(), this);
          } // 每秒恢复法力


          this.schedule(this.recoverMana, 1);
        }

        updateUI() {
          var player = (_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
            error: Error()
          }), GameManager) : GameManager).getInstance().playerData;

          if (this.moneyLabel) {
            this.moneyLabel.string = "\u9999\u706B\u94B1: " + player.incense_money;
          }

          if (this.levelLabel) {
            var stageName = {
              clay: '泥胎',
              wood: '木骨',
              bronze: '铜身',
              gold: '金身'
            };
            this.levelLabel.string = stageName[player.stage] + " Lv." + player.level;
          }
        }

        recoverMana() {
          var player = (_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
            error: Error()
          }), GameManager) : GameManager).getInstance().playerData;

          if (player.mana < 100) {
            player.mana++;
            this.updateUI();
          }
        }

        onUpgrade() {
          var player = (_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
            error: Error()
          }), GameManager) : GameManager).getInstance().playerData; // 升级需求

          var requirements = {
            clay: 100,
            wood: 500,
            bronze: 2000,
            gold: 10000
          };
          var stages = ['clay', 'wood', 'bronze', 'gold'];
          var currentIndex = stages.indexOf(player.stage);

          if (currentIndex >= stages.length - 1) {
            if (this.moneyLabel) this.moneyLabel.string = '已达到最高阶段！';
            return;
          }

          var need = requirements[player.stage];

          if (player.merit >= need) {
            player.merit -= need;
            player.stage = stages[currentIndex + 1];
            player.level += 5;
            this.updateUI();
            if (this.moneyLabel) this.moneyLabel.string = "\u5347\u7EA7\u6210\u529F\uFF01\u5F53\u524D" + player.stage;
          } else {
            if (this.moneyLabel) this.moneyLabel.string = "\u529F\u5FB7\u4E0D\u8DB3\uFF0C\u9700\u8981" + need + "\u529F\u5FB7";
          }
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "moneyLabel", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "levelLabel", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "templeBtn", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "almsBtn", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "upgradeBtn", [_dec6], {
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
//# sourceMappingURL=3fdc0df1029deea4e3413b75bffc79990d9ebed5.js.map