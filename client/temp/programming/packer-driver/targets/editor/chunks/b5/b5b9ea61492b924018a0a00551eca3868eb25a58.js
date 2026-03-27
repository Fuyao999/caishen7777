System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, director, EditBox, Button, Label, GameManager, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _crd, ccclass, property, LoginScene;

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
      EditBox = _cc.EditBox;
      Button = _cc.Button;
      Label = _cc.Label;
    }, function (_unresolved_2) {
      GameManager = _unresolved_2.GameManager;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "4ed93d63ulJl5tiYgsJEnUD", "LoginScene", undefined);

      __checkObsolete__(['_decorator', 'Component', 'director', 'Node', 'EditBox', 'Button', 'Label']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("LoginScene", LoginScene = (_dec = ccclass('LoginScene'), _dec2 = property(EditBox), _dec3 = property(EditBox), _dec4 = property(Button), _dec5 = property(Button), _dec6 = property(Label), _dec(_class = (_class2 = class LoginScene extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "phoneInput", _descriptor, this);

          _initializerDefineProperty(this, "codeInput", _descriptor2, this);

          _initializerDefineProperty(this, "loginBtn", _descriptor3, this);

          _initializerDefineProperty(this, "wxLoginBtn", _descriptor4, this);

          _initializerDefineProperty(this, "tipLabel", _descriptor5, this);
        }

        onLoad() {
          this.loginBtn.node.on(Button.EventType.CLICK, this.onLogin, this);
          this.wxLoginBtn.node.on(Button.EventType.CLICK, this.onWXLogin, this);
        }

        async onLogin() {
          const phone = this.phoneInput.string;
          const code = this.codeInput.string;

          if (!phone || phone.length !== 11) {
            this.showTip('请输入正确的手机号');
            return;
          }

          (_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
            error: Error()
          }), GameManager) : GameManager).getInstance().showLoading('登录中...');

          try {
            const result = await (_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
              error: Error()
            }), GameManager) : GameManager).getInstance().network.request('/api/auth/login', {
              phone: phone,
              code: code
            });

            if (result.success) {
              (_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
                error: Error()
              }), GameManager) : GameManager).getInstance().playerData.setToken(result.token);
              (_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
                error: Error()
              }), GameManager) : GameManager).getInstance().playerData.setUserInfo(result.user);
              director.loadScene('MainScene');
            } else {
              this.showTip(result.message || '登录失败');
            }
          } catch (error) {
            this.showTip('网络错误，请重试');
          } finally {
            (_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
              error: Error()
            }), GameManager) : GameManager).getInstance().hideLoading();
          }
        }

        async onWXLogin() {
          // 微信登录（Web版使用扫码）
          this.showTip('微信登录功能开发中...');
        }

        showTip(msg) {
          this.tipLabel.string = msg;
          this.tipLabel.node.active = true;
          setTimeout(() => {
            this.tipLabel.node.active = false;
          }, 3000);
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "phoneInput", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "codeInput", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "loginBtn", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "wxLoginBtn", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "tipLabel", [_dec6], {
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
//# sourceMappingURL=b5b9ea61492b924018a0a00551eca3868eb25a58.js.map