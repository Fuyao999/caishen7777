System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, director, Node, Label, Button, ScrollView, instantiate, _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _crd, ccclass, property, FriendScene;

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
      director = _cc.director;
      Node = _cc.Node;
      Label = _cc.Label;
      Button = _cc.Button;
      ScrollView = _cc.ScrollView;
      instantiate = _cc.instantiate;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "c0a12GC4BhBpLAgqQcO88IZ", "FriendScene", undefined);

      __checkObsolete__(['_decorator', 'Component', 'director', 'Node', 'Label', 'Button', 'ScrollView', 'Prefab', 'instantiate']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("FriendScene", FriendScene = (_dec = ccclass('FriendScene'), _dec2 = property(Button), _dec3 = property(Button), _dec4 = property(ScrollView), _dec5 = property(Node), _dec(_class = (_class2 = class FriendScene extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "backBtn", _descriptor, this);

          _initializerDefineProperty(this, "addFriendBtn", _descriptor2, this);

          _initializerDefineProperty(this, "friendListScrollView", _descriptor3, this);

          _initializerDefineProperty(this, "friendItemPrefab", _descriptor4, this);

          this.friends = [{
            id: 1,
            name: '财神小弟',
            level: 10,
            status: 'online'
          }, {
            id: 2,
            name: '招财猫',
            level: 15,
            status: 'offline'
          }, {
            id: 3,
            name: '金蟾子',
            level: 8,
            status: 'online'
          }];
        }

        onLoad() {
          this.backBtn.node.on(Button.EventType.CLICK, this.onBack, this);
          this.addFriendBtn.node.on(Button.EventType.CLICK, this.onAddFriend, this);
        }

        start() {
          this.updateFriendList();
        }

        updateFriendList() {
          var _this = this;

          var content = this.friendListScrollView.content;
          content.removeAllChildren();

          var _loop = function _loop(friend) {
            var item = instantiate(_this.friendItemPrefab);
            item.getChildByName('NameLabel').getComponent(Label).string = friend.name;
            item.getChildByName('LevelLabel').getComponent(Label).string = "Lv." + friend.level;
            item.getChildByName('StatusLabel').getComponent(Label).string = friend.status === 'online' ? '🟢 在线' : '⚫ 离线'; // 拜访按钮

            var visitBtn = item.getChildByName('VisitBtn').getComponent(Button);
            visitBtn.node.on(Button.EventType.CLICK, () => _this.onVisitFriend(friend.id), _this); // 赠送按钮

            var giftBtn = item.getChildByName('GiftBtn').getComponent(Button);
            giftBtn.node.on(Button.EventType.CLICK, () => _this.onGiftFriend(friend.id), _this);
            content.addChild(item);
          };

          for (var friend of this.friends) {
            _loop(friend);
          }
        }

        onAddFriend() {
          // 添加好友逻辑
          var friendId = prompt('请输入好友ID:');

          if (friendId) {
            console.log("\u53D1\u9001\u597D\u53CB\u8BF7\u6C42\u7ED9" + friendId);
          }
        }

        onVisitFriend(friendId) {
          console.log("\u62DC\u8BBF\u597D\u53CB" + friendId); // 进入好友庙宇场景
        }

        onGiftFriend(friendId) {
          console.log("\u8D60\u9001\u793C\u7269\u7ED9\u597D\u53CB" + friendId); // 显示礼物选择界面
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
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "addFriendBtn", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "friendListScrollView", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "friendItemPrefab", [_dec5], {
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
//# sourceMappingURL=02791d30bfce7fde5ed55d179ff59fffe087fcf0.js.map