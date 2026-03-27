System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, director, Button, Label, GameManager, _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _crd, ccclass, property, LoginScene;

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

  function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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
      Button = _cc.Button;
      Label = _cc.Label;
    }, function (_unresolved_2) {
      GameManager = _unresolved_2.GameManager;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "a70d4lhbmtJMK8HdTS5dkyI", "LoginSceneSimple", undefined);

      __checkObsolete__(['_decorator', 'Component', 'director', 'Node', 'Button', 'Label']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("LoginScene", LoginScene = (_dec = ccclass('LoginScene'), _dec2 = property(Button), _dec3 = property(Label), _dec(_class = (_class2 = class LoginScene extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "loginBtn", _descriptor, this);

          _initializerDefineProperty(this, "titleLabel", _descriptor2, this);
        }

        onLoad() {
          if (this.loginBtn) {
            this.loginBtn.node.on(Button.EventType.CLICK, this.onLogin, this);
          }

          if (this.titleLabel) {
            this.titleLabel.string = '财神大陆 - 点击登录';
          }
        }

        onLogin() {
          var _this = this;

          return _asyncToGenerator(function* () {
            console.log('开始登录...'); // 测试账号直接登录

            var phone = '13800138001';
            var code = '1234';

            try {
              var result = yield (_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
                error: Error()
              }), GameManager) : GameManager).getInstance().network.request('/api/auth/login', {
                phone: phone,
                code: code
              });
              console.log('登录结果:', result);

              if (result.success) {
                (_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
                  error: Error()
                }), GameManager) : GameManager).getInstance().playerData.setToken(result.token);
                (_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
                  error: Error()
                }), GameManager) : GameManager).getInstance().playerData.setUserInfo(result.user);

                if (_this.titleLabel) {
                  _this.titleLabel.string = '登录成功！';
                } // 2秒后进入主场景


                setTimeout(() => {
                  director.loadScene('MainScene');
                }, 1000);
              } else {
                if (_this.titleLabel) {
                  _this.titleLabel.string = '登录失败:' + result.message;
                }
              }
            } catch (error) {
              console.error('登录错误:', error);

              if (_this.titleLabel) {
                _this.titleLabel.string = '网络错误';
              }
            }
          })();
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "loginBtn", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "titleLabel", [_dec3], {
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
//# sourceMappingURL=db1eef89d6e0fc7a145941add56ee2e474411624.js.map