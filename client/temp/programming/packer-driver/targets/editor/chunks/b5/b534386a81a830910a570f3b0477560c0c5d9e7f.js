System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Button, Label, _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _crd, ccclass, property, LoginSceneSimple;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      Button = _cc.Button;
      Label = _cc.Label;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "d94d8mRbjxGcpYHx2FcKsg1", "TestScene", undefined);

      __checkObsolete__(['_decorator', 'Component', 'director', 'Button', 'Label']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("LoginSceneSimple", LoginSceneSimple = (_dec = ccclass('LoginSceneSimple'), _dec2 = property(Button), _dec3 = property(Label), _dec(_class = (_class2 = class LoginSceneSimple extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "loginBtn", _descriptor, this);

          _initializerDefineProperty(this, "titleLabel", _descriptor2, this);
        }

        onLoad() {
          console.log('LoginSceneSimple onLoad');

          if (this.titleLabel) {
            this.titleLabel.string = '财神大陆 - 点击按钮测试';
          }

          if (this.loginBtn) {
            this.loginBtn.node.on(Button.EventType.CLICK, this.onClick, this);
            console.log('按钮绑定成功');
          } else {
            console.log('按钮未绑定');
          }
        }

        onClick() {
          console.log('按钮被点击！');

          if (this.titleLabel) {
            this.titleLabel.string = '点击成功！游戏正常！';
          }
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "loginBtn", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "titleLabel", [_dec3], {
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
//# sourceMappingURL=b534386a81a830910a570f3b0477560c0c5d9e7f.js.map