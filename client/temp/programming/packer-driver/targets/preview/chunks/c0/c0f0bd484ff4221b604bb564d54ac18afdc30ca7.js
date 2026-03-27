System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, director, Node, Label, Button, ScrollView, instantiate, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _crd, ccclass, property, GuildScene;

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

      _cclegacy._RF.push({}, "5e9a2VcdahEIbVPQJ2Gzuq+", "GuildScene", undefined);

      __checkObsolete__(['_decorator', 'Component', 'director', 'Node', 'Label', 'Button', 'ScrollView', 'Prefab', 'instantiate']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("GuildScene", GuildScene = (_dec = ccclass('GuildScene'), _dec2 = property(Button), _dec3 = property(Button), _dec4 = property(Button), _dec5 = property(Node), _dec6 = property(Node), _dec7 = property(Label), _dec8 = property(Label), _dec9 = property(Label), _dec10 = property(ScrollView), _dec11 = property(Node), _dec(_class = (_class2 = class GuildScene extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "backBtn", _descriptor, this);

          _initializerDefineProperty(this, "createGuildBtn", _descriptor2, this);

          _initializerDefineProperty(this, "joinGuildBtn", _descriptor3, this);

          _initializerDefineProperty(this, "myGuildPanel", _descriptor4, this);

          _initializerDefineProperty(this, "guildListPanel", _descriptor5, this);

          _initializerDefineProperty(this, "guildNameLabel", _descriptor6, this);

          _initializerDefineProperty(this, "guildLevelLabel", _descriptor7, this);

          _initializerDefineProperty(this, "memberCountLabel", _descriptor8, this);

          _initializerDefineProperty(this, "memberListScrollView", _descriptor9, this);

          _initializerDefineProperty(this, "memberItemPrefab", _descriptor10, this);

          this.hasGuild = false;
          this.guildData = {
            name: '财神殿',
            level: 5,
            members: 45,
            maxMembers: 50,
            notice: '欢迎加入财神殿，一起发财！'
          };
          this.members = [{
            id: 1,
            name: '帮主',
            level: 50,
            role: 'leader',
            contribution: 9999
          }, {
            id: 2,
            name: '长老1',
            level: 45,
            role: 'elder',
            contribution: 5000
          }, {
            id: 3,
            name: '长老2',
            level: 42,
            role: 'elder',
            contribution: 4500
          }, {
            id: 4,
            name: '成员1',
            level: 30,
            role: 'member',
            contribution: 1000
          }, {
            id: 5,
            name: '成员2',
            level: 25,
            role: 'member',
            contribution: 500
          }];
        }

        onLoad() {
          this.backBtn.node.on(Button.EventType.CLICK, this.onBack, this);
          this.createGuildBtn.node.on(Button.EventType.CLICK, this.onCreateGuild, this);
          this.joinGuildBtn.node.on(Button.EventType.CLICK, this.onJoinGuild, this);
        }

        start() {
          this.updateUI();
        }

        updateUI() {
          if (this.hasGuild) {
            this.myGuildPanel.active = true;
            this.guildListPanel.active = false;
            this.guildNameLabel.string = this.guildData.name;
            this.guildLevelLabel.string = "\u7B49\u7EA7: " + this.guildData.level;
            this.memberCountLabel.string = "\u6210\u5458: " + this.guildData.members + "/" + this.guildData.maxMembers;
            this.updateMemberList();
          } else {
            this.myGuildPanel.active = false;
            this.guildListPanel.active = true;
          }
        }

        updateMemberList() {
          var content = this.memberListScrollView.content;
          content.removeAllChildren();

          for (var member of this.members) {
            var item = instantiate(this.memberItemPrefab);
            item.getChildByName('NameLabel').getComponent(Label).string = member.name;
            item.getChildByName('LevelLabel').getComponent(Label).string = "Lv." + member.level;
            item.getChildByName('RoleLabel').getComponent(Label).string = member.role === 'leader' ? '帮主' : member.role === 'elder' ? '长老' : '成员';
            item.getChildByName('ContribLabel').getComponent(Label).string = "\u8D21\u732E: " + member.contribution;
            content.addChild(item);
          }
        }

        onCreateGuild() {
          var name = prompt('请输入门派名称:');

          if (name) {
            this.hasGuild = true;
            this.guildData.name = name;
            this.updateUI();
          }
        }

        onJoinGuild() {
          // 显示门派列表，选择加入
          console.log('显示可加入的门派列表');
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
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "createGuildBtn", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "joinGuildBtn", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "myGuildPanel", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "guildListPanel", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "guildNameLabel", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "guildLevelLabel", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "memberCountLabel", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "memberListScrollView", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "memberItemPrefab", [_dec11], {
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
//# sourceMappingURL=c0f0bd484ff4221b604bb564d54ac18afdc30ca7.js.map