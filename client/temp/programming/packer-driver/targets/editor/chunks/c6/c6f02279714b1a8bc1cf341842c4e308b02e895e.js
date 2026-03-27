System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, director, Label, Button, ProgressBar, GameManager, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _crd, ccclass, property, CultivateScene;

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

      _cclegacy._RF.push({}, "43006jBb/RJ/7hztHNqrUTJ", "CultivateScene", undefined);

      __checkObsolete__(['_decorator', 'Component', 'director', 'Node', 'Label', 'Button', 'ProgressBar']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("CultivateScene", CultivateScene = (_dec = ccclass('CultivateScene'), _dec2 = property(Button), _dec3 = property(Button), _dec4 = property(Label), _dec5 = property(Label), _dec6 = property(ProgressBar), _dec(_class = (_class2 = class CultivateScene extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "backBtn", _descriptor, this);

          _initializerDefineProperty(this, "cultivateBtn", _descriptor2, this);

          _initializerDefineProperty(this, "cultivationLabel", _descriptor3, this);

          _initializerDefineProperty(this, "statusLabel", _descriptor4, this);

          _initializerDefineProperty(this, "progressBar", _descriptor5, this);

          this.isCultivating = false;
          this.cultivationTime = 0;
          this.cultivationDuration = 10;
        }

        // 10秒
        onLoad() {
          this.backBtn.node.on(Button.EventType.CLICK, this.onBack, this);
          this.cultivateBtn.node.on(Button.EventType.CLICK, this.onCultivate, this);
        }

        start() {
          this.updateUI();
        }

        updateUI() {
          const player = (_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
            error: Error()
          }), GameManager) : GameManager).getInstance().playerData;
          this.cultivationLabel.string = `修为: ${player.getCurrency('cultivation')}`;

          if (this.isCultivating) {
            this.cultivateBtn.getComponent(Label).string = '修炼中...';
            this.cultivateBtn.interactable = false;
          } else {
            this.cultivateBtn.getComponent(Label).string = '开始修炼';
            this.cultivateBtn.interactable = true;
          }
        }

        onCultivate() {
          if (this.isCultivating) return;
          this.isCultivating = true;
          this.cultivationTime = 0;
          this.updateUI(); // 开始修炼动画

          this.schedule(this.onCultivating, 0.1);
        }

        onCultivating() {
          this.cultivationTime += 0.1;
          this.progressBar.progress = this.cultivationTime / this.cultivationDuration;

          if (this.cultivationTime >= this.cultivationDuration) {
            this.unschedule(this.onCultivating);
            this.onCultivateComplete();
          }
        }

        onCultivateComplete() {
          this.isCultivating = false;
          this.progressBar.progress = 0; // 获得修为

          const gain = 10;
          (_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
            error: Error()
          }), GameManager) : GameManager).getInstance().playerData.addCurrency('cultivation', gain);
          this.statusLabel.string = `修炼完成！获得${gain}修为`;
          this.updateUI();
        }

        onBack() {
          if (this.isCultivating) {
            this.unschedule(this.onCultivating);
          }

          director.loadScene('MainScene');
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "backBtn", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "cultivateBtn", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "cultivationLabel", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "statusLabel", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "progressBar", [_dec6], {
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
//# sourceMappingURL=c6f02279714b1a8bc1cf341842c4e308b02e895e.js.map