System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, director, Node, Label, Button, ScrollView, instantiate, GameManager, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _crd, ccclass, property, MailScene;

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
      Node = _cc.Node;
      Label = _cc.Label;
      Button = _cc.Button;
      ScrollView = _cc.ScrollView;
      instantiate = _cc.instantiate;
    }, function (_unresolved_2) {
      GameManager = _unresolved_2.GameManager;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "90692os+TZIp7XktlKezyfx", "MailScene", undefined);

      __checkObsolete__(['_decorator', 'Component', 'director', 'Node', 'Label', 'Button', 'ScrollView', 'Prefab', 'instantiate']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("MailScene", MailScene = (_dec = ccclass('MailScene'), _dec2 = property(Button), _dec3 = property(Button), _dec4 = property(ScrollView), _dec5 = property(Node), _dec6 = property(Node), _dec7 = property(Label), _dec8 = property(Label), _dec9 = property(Label), _dec10 = property(Button), _dec(_class = (_class2 = class MailScene extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "backBtn", _descriptor, this);

          _initializerDefineProperty(this, "claimAllBtn", _descriptor2, this);

          _initializerDefineProperty(this, "mailListScrollView", _descriptor3, this);

          _initializerDefineProperty(this, "mailItemPrefab", _descriptor4, this);

          _initializerDefineProperty(this, "mailDetailPanel", _descriptor5, this);

          _initializerDefineProperty(this, "detailTitleLabel", _descriptor6, this);

          _initializerDefineProperty(this, "detailContentLabel", _descriptor7, this);

          _initializerDefineProperty(this, "detailRewardLabel", _descriptor8, this);

          _initializerDefineProperty(this, "detailClaimBtn", _descriptor9, this);

          this.mails = [{
            id: 1,
            title: '新手礼包',
            content: '欢迎来到财神大陆！这是给你的新手礼包。',
            reward: {
              incense_money: 1000,
              incense_sticks: 10
            },
            isRead: false,
            isClaimed: false,
            time: '2026-03-23 00:00'
          }, {
            id: 2,
            title: '系统维护补偿',
            content: '由于系统维护，给您带来不便，特此补偿。',
            reward: {
              yuanbao: 60
            },
            isRead: true,
            isClaimed: false,
            time: '2026-03-22 20:00'
          }, {
            id: 3,
            title: '活动奖励',
            content: '恭喜您在活动中获得奖励！',
            reward: {
              candles: 5
            },
            isRead: true,
            isClaimed: true,
            time: '2026-03-22 12:00'
          }];
          this.selectedMail = null;
        }

        onLoad() {
          this.backBtn.node.on(Button.EventType.CLICK, this.onBack, this);
          this.claimAllBtn.node.on(Button.EventType.CLICK, this.onClaimAll, this);
          this.detailClaimBtn.node.on(Button.EventType.CLICK, this.onClaimSelected, this);
        }

        start() {
          this.updateMailList();
          this.mailDetailPanel.active = false;
        }

        updateMailList() {
          var _this = this;

          var content = this.mailListScrollView.content;
          content.removeAllChildren();

          var _loop = function _loop(mail) {
            var item = instantiate(_this.mailItemPrefab);
            item.getChildByName('TitleLabel').getComponent(Label).string = (mail.isRead ? '' : '🔴 ') + mail.title;
            item.getChildByName('TimeLabel').getComponent(Label).string = mail.time;
            item.getChildByName('StatusLabel').getComponent(Label).string = mail.isClaimed ? '已领取' : '未领取';
            var btn = item.getComponent(Button);
            btn.node.on(Button.EventType.CLICK, () => _this.onMailClick(mail), _this);
            content.addChild(item);
          };

          for (var mail of this.mails) {
            _loop(mail);
          }
        }

        onMailClick(mail) {
          this.selectedMail = mail;
          mail.isRead = true;
          this.detailTitleLabel.string = mail.title;
          this.detailContentLabel.string = mail.content;
          var rewardText = '';

          for (var [key, value] of Object.entries(mail.reward)) {
            rewardText += key + ": " + value + " ";
          }

          this.detailRewardLabel.string = rewardText || '无附件';
          this.detailClaimBtn.node.active = !mail.isClaimed;
          this.mailDetailPanel.active = true;
          this.updateMailList();
        }

        onClaimSelected() {
          if (!this.selectedMail || this.selectedMail.isClaimed) return; // 发放奖励

          for (var [key, value] of Object.entries(this.selectedMail.reward)) {
            (_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
              error: Error()
            }), GameManager) : GameManager).getInstance().playerData.addCurrency(key, value);
          }

          this.selectedMail.isClaimed = true;
          this.detailClaimBtn.node.active = false;
          this.updateMailList();
        }

        onClaimAll() {
          for (var mail of this.mails) {
            if (!mail.isClaimed) {
              for (var [key, value] of Object.entries(mail.reward)) {
                (_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
                  error: Error()
                }), GameManager) : GameManager).getInstance().playerData.addCurrency(key, value);
              }

              mail.isClaimed = true;
            }
          }

          this.updateMailList();
        }

        onBack() {
          director.loadScene('MainScene');
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "backBtn", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "claimAllBtn", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "mailListScrollView", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "mailItemPrefab", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "mailDetailPanel", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "detailTitleLabel", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "detailContentLabel", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "detailRewardLabel", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "detailClaimBtn", [_dec10], {
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
//# sourceMappingURL=83f0ba2e27e0daa8563f6c2e225957dba910af88.js.map