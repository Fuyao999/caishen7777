System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, director, Label, Button, Sprite, GameManager, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _crd, ccclass, property, MainScene;

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
      Sprite = _cc.Sprite;
    }, function (_unresolved_2) {
      GameManager = _unresolved_2.GameManager;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "64b52Vmf4BJV6a2RVEY8FWR", "MainScene", undefined);

      __checkObsolete__(['_decorator', 'Component', 'director', 'Node', 'Label', 'Button', 'Sprite', 'ProgressBar', 'Vec3']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("MainScene", MainScene = (_dec = ccclass('MainScene'), _dec2 = property(Label), _dec3 = property(Label), _dec4 = property(Sprite), _dec5 = property(Label), _dec6 = property(Label), _dec7 = property(Label), _dec8 = property(Label), _dec9 = property(Button), _dec10 = property(Button), _dec11 = property(Button), _dec12 = property(Button), _dec(_class = (_class2 = class MainScene extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "nicknameLabel", _descriptor, this);

          _initializerDefineProperty(this, "levelLabel", _descriptor2, this);

          _initializerDefineProperty(this, "stageSprite", _descriptor3, this);

          _initializerDefineProperty(this, "incenseMoneyLabel", _descriptor4, this);

          _initializerDefineProperty(this, "yuanbaoLabel", _descriptor5, this);

          _initializerDefineProperty(this, "meritLabel", _descriptor6, this);

          _initializerDefineProperty(this, "manaLabel", _descriptor7, this);

          _initializerDefineProperty(this, "worshipBtn", _descriptor8, this);

          _initializerDefineProperty(this, "almsBtn", _descriptor9, this);

          _initializerDefineProperty(this, "upgradeBtn", _descriptor10, this);

          _initializerDefineProperty(this, "bagBtn", _descriptor11, this);

          this.updateInterval = 0;
        }

        onLoad() {
          this.worshipBtn.node.on(Button.EventType.CLICK, this.onWorship, this);
          this.almsBtn.node.on(Button.EventType.CLICK, this.onAlms, this);
          this.upgradeBtn.node.on(Button.EventType.CLICK, this.onUpgrade, this);
          this.bagBtn.node.on(Button.EventType.CLICK, this.onBag, this);
        }

        start() {
          this.updateUI(); // 每秒更新一次

          this.schedule(this.updateUI, 1); // 每秒恢复1点法力

          this.schedule(this.recoverMana, 1);
        }

        updateUI() {
          const player = (_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
            error: Error()
          }), GameManager) : GameManager).getInstance().playerData;
          this.nicknameLabel.string = player.getUserInfo().nickname || '玩家';
          this.levelLabel.string = `Lv.${player.getLevel()}`;
          const stageNames = {
            clay: '泥胎',
            wood: '木骨',
            bronze: '铜身',
            gold: '金身'
          }; // this.stageSprite 根据stage显示不同图片

          this.incenseMoneyLabel.string = this.formatNumber(player.getCurrency('incense_money'));
          this.yuanbaoLabel.string = this.formatNumber(player.getCurrency('yuanbao'));
          this.meritLabel.string = this.formatNumber(player.getCurrency('merit'));
          this.manaLabel.string = `${player.getCurrency('mana')}/100`;
        }

        recoverMana() {
          const player = (_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
            error: Error()
          }), GameManager) : GameManager).getInstance().playerData;
          const currentMana = player.getCurrency('mana');

          if (currentMana < 100) {
            player.addCurrency('mana', 1);
          }
        }

        formatNumber(num) {
          if (num >= 10000) {
            return (num / 10000).toFixed(1) + '万';
          }

          return num.toString();
        }

        onWorship() {
          director.loadScene('TempleScene');
        }

        onAlms() {
          director.loadScene('AlmsScene');
        }

        onUpgrade() {
          director.loadScene('UpgradeScene');
        }

        onBag() {
          director.loadScene('BagScene');
        }

        onDestroy() {
          this.unschedule(this.updateUI);
          this.unschedule(this.recoverMana);
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "nicknameLabel", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "levelLabel", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "stageSprite", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "incenseMoneyLabel", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "yuanbaoLabel", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "meritLabel", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "manaLabel", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "worshipBtn", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "almsBtn", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "upgradeBtn", [_dec11], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "bagBtn", [_dec12], {
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
//# sourceMappingURL=30cf21732382a6ea66c5647fb82518595b32cb5e.js.map