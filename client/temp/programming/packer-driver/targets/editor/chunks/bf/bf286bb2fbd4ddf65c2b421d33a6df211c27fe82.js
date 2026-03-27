System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Node, Label, Button, GameManager, _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _class3, _crd, ccclass, property, GuideManager;

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
      Node = _cc.Node;
      Label = _cc.Label;
      Button = _cc.Button;
    }, function (_unresolved_2) {
      GameManager = _unresolved_2.GameManager;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "57eddaTEWhAga1LZIXrF4aj", "GuideManager", undefined);

      __checkObsolete__(['_decorator', 'Component', 'director', 'Node', 'Label', 'Button', 'Vec3', 'tween', 'UIOpacity']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("GuideManager", GuideManager = (_dec = ccclass('GuideManager'), _dec2 = property(Node), _dec3 = property(Node), _dec4 = property(Label), _dec5 = property(Button), _dec(_class = (_class2 = (_class3 = class GuideManager extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "guideMask", _descriptor, this);

          _initializerDefineProperty(this, "guideHand", _descriptor2, this);

          _initializerDefineProperty(this, "guideText", _descriptor3, this);

          _initializerDefineProperty(this, "nextBtn", _descriptor4, this);

          this.currentStep = 0;
          this.guideSteps = [{
            text: '欢迎来到财神大陆！我是你的引导助手。',
            target: null
          }, {
            text: '点击"供奉"进入庙宇，向财神供奉可以获得香火钱和功德。',
            target: 'worshipBtn'
          }, {
            text: '点击"化缘"可以去各地化缘，获得更多香火钱，但要注意风险！',
            target: 'almsBtn'
          }, {
            text: '积累足够的功德后，点击"升级"可以进化你的神像。',
            target: 'upgradeBtn'
          }, {
            text: '点击"背包"可以查看你的物品和装备。',
            target: 'bagBtn'
          }, {
            text: '香火钱会自然增长，法力也会慢慢恢复。',
            target: null
          }, {
            text: '现在就开始你的财神之旅吧！',
            target: null
          }];
        }

        onLoad() {
          if (GuideManager.instance === null) {
            GuideManager.instance = this;
          }

          this.nextBtn.node.on(Button.EventType.CLICK, this.onNextStep, this);
        }

        startGuide() {
          this.currentStep = 0;
          this.showStep();
          this.guideMask.active = true;
        }

        showStep() {
          const step = this.guideSteps[this.currentStep];
          this.guideText.string = step.text;

          if (step.target) {
            // 高亮目标按钮
            this.guideHand.active = true; // 移动手指到目标位置
          } else {
            this.guideHand.active = false;
          }
        }

        onNextStep() {
          this.currentStep++;

          if (this.currentStep >= this.guideSteps.length) {
            this.endGuide();
          } else {
            this.showStep();
          }
        }

        endGuide() {
          this.guideMask.active = false; // 标记已完成新手引导

          (_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
            error: Error()
          }), GameManager) : GameManager).getInstance().playerData.save();
        }

        static getInstance() {
          return GuideManager.instance;
        }

      }, _class3.instance = null, _class3), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "guideMask", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "guideHand", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "guideText", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "nextBtn", [_dec5], {
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
//# sourceMappingURL=bf286bb2fbd4ddf65c2b421d33a6df211c27fe82.js.map