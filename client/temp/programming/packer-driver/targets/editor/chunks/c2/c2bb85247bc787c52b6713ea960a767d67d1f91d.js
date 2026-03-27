System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, director, Label, Button, GameManager, _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _crd, ccclass, property, TempleScene;

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

      _cclegacy._RF.push({}, "2d850ATMwRDsI6m7qg1ZIvD", "TempleScene", undefined);

      __checkObsolete__(['_decorator', 'Component', 'director', 'Node', 'Label', 'Button']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("TempleScene", TempleScene = (_dec = ccclass('TempleScene'), _dec2 = property(Label), _dec3 = property(Button), _dec4 = property(Button), _dec(_class = (_class2 = class TempleScene extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "statusLabel", _descriptor, this);

          _initializerDefineProperty(this, "backBtn", _descriptor2, this);

          _initializerDefineProperty(this, "worshipBtn", _descriptor3, this);

          this.gods = [{
            id: 'caishen',
            name: '赵公明',
            effect: '香火钱+20%'
          }, {
            id: 'wencaishen',
            name: '比干',
            effect: '法力上限+10'
          }, {
            id: 'wucaishen',
            name: '关公',
            effect: '化缘收益+15%'
          }, {
            id: 'piancaishen',
            name: '范蠡',
            effect: '暴击率+5%'
          }, {
            id: 'shengcai',
            name: '李诡祖',
            effect: '供奉功德+10%'
          }, {
            id: 'lucaishen',
            name: '沈万三',
            effect: '法力回复+20%'
          }, {
            id: 'shoucaishen',
            name: '刘海蟾',
            effect: '香火钱上限+1000'
          }, {
            id: 'xicaishen',
            name: '子贡',
            effect: '每日首供双倍'
          }, {
            id: 'caishenpo',
            name: '财神奶奶',
            effect: '化缘风险-10%'
          }];
          this.currentGod = 0;
        }

        onLoad() {
          if (this.backBtn) {
            this.backBtn.node.on('click', () => director.loadScene('MainScene'), this);
          }

          if (this.worshipBtn) {
            this.worshipBtn.node.on('click', this.onWorship, this);
          }

          this.updateDisplay();
        }

        updateDisplay() {
          const god = this.gods[this.currentGod];

          if (this.statusLabel) {
            const player = (_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
              error: Error()
            }), GameManager) : GameManager).getInstance().playerData;
            this.statusLabel.string = `当前供奉: ${god.name}\n效果: ${god.effect}\n线香: ${player.incense_sticks}`;
          }
        }

        onWorship() {
          const player = (_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
            error: Error()
          }), GameManager) : GameManager).getInstance().playerData;
          const god = this.gods[this.currentGod];

          if (player.incense_sticks <= 0) {
            if (this.statusLabel) this.statusLabel.string = '线香不足！';
            return;
          }

          player.incense_sticks--; // 计算奖励

          let reward = 10;
          if (god.id === 'caishen') reward = 12;
          player.incense_money += reward;
          player.merit += 1;

          if (this.statusLabel) {
            this.statusLabel.string = `供奉${god.name}成功！\n获得${reward}香火钱，1功德`;
          } // 切换下一个财神


          this.currentGod = (this.currentGod + 1) % this.gods.length;
          setTimeout(() => this.updateDisplay(), 2000);
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "statusLabel", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "backBtn", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "worshipBtn", [_dec4], {
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
//# sourceMappingURL=c2bb85247bc787c52b6713ea960a767d67d1f91d.js.map