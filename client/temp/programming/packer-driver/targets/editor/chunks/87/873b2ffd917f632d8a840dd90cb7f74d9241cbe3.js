System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, director, Node, Label, Button, ScrollView, instantiate, Toggle, GameManager, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _crd, ccclass, property, RankScene;

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
      Toggle = _cc.Toggle;
    }, function (_unresolved_2) {
      GameManager = _unresolved_2.GameManager;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "a21bbObSqpCArrXIgf2mu7J", "RankScene", undefined);

      __checkObsolete__(['_decorator', 'Component', 'director', 'Node', 'Label', 'Button', 'ScrollView', 'Prefab', 'instantiate', 'Toggle']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("RankScene", RankScene = (_dec = ccclass('RankScene'), _dec2 = property(Button), _dec3 = property(Toggle), _dec4 = property(Toggle), _dec5 = property(Toggle), _dec6 = property(Toggle), _dec7 = property(ScrollView), _dec8 = property(Node), _dec9 = property(Label), _dec(_class = (_class2 = class RankScene extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "backBtn", _descriptor, this);

          _initializerDefineProperty(this, "levelTabToggle", _descriptor2, this);

          _initializerDefineProperty(this, "powerTabToggle", _descriptor3, this);

          _initializerDefineProperty(this, "wealthTabToggle", _descriptor4, this);

          _initializerDefineProperty(this, "meritTabToggle", _descriptor5, this);

          _initializerDefineProperty(this, "rankListScrollView", _descriptor6, this);

          _initializerDefineProperty(this, "rankItemPrefab", _descriptor7, this);

          _initializerDefineProperty(this, "myRankLabel", _descriptor8, this);

          this.currentTab = 'level';
          this.rankData = {
            level: [{
              rank: 1,
              name: '财神本尊',
              level: 99,
              value: 99
            }, {
              rank: 2,
              name: '金身罗汉',
              level: 85,
              value: 85
            }, {
              rank: 3,
              name: '铜身道长',
              level: 72,
              value: 72
            }, {
              rank: 4,
              name: '木骨居士',
              level: 65,
              value: 65
            }, {
              rank: 5,
              name: '泥胎修士',
              level: 58,
              value: 58
            }],
            power: [{
              rank: 1,
              name: '战神',
              level: 90,
              value: 99999
            }, {
              rank: 2,
              name: '杀神',
              level: 85,
              value: 88888
            }, {
              rank: 3,
              name: '斗战胜佛',
              level: 80,
              value: 77777
            }],
            wealth: [{
              rank: 1,
              name: '首富',
              level: 70,
              value: 9999999
            }, {
              rank: 2,
              name: '大富翁',
              level: 65,
              value: 8888888
            }, {
              rank: 3,
              name: '财主',
              level: 60,
              value: 7777777
            }],
            merit: [{
              rank: 1,
              name: '功德无量',
              level: 75,
              value: 99999
            }, {
              rank: 2,
              name: '大善人',
              level: 70,
              value: 88888
            }, {
              rank: 3,
              name: '行善积德',
              level: 65,
              value: 77777
            }]
          };
        }

        onLoad() {
          this.backBtn.node.on(Button.EventType.CLICK, this.onBack, this);
          this.levelTabToggle.node.on(Toggle.EventType.TOGGLE, () => this.onTabChange('level'), this);
          this.powerTabToggle.node.on(Toggle.EventType.TOGGLE, () => this.onTabChange('power'), this);
          this.wealthTabToggle.node.on(Toggle.EventType.TOGGLE, () => this.onTabChange('wealth'), this);
          this.meritTabToggle.node.on(Toggle.EventType.TOGGLE, () => this.onTabChange('merit'), this);
        }

        start() {
          this.updateRankList();
          this.updateMyRank();
        }

        onTabChange(tab) {
          this.currentTab = tab;
          this.updateRankList();
        }

        updateRankList() {
          const content = this.rankListScrollView.content;
          content.removeAllChildren();
          const ranks = this.rankData[this.currentTab] || [];

          for (const item of ranks) {
            const node = instantiate(this.rankItemPrefab); // 排名图标

            let rankIcon = '';
            if (item.rank === 1) rankIcon = '🥇';else if (item.rank === 2) rankIcon = '🥈';else if (item.rank === 3) rankIcon = '🥉';else rankIcon = `${item.rank}`;
            node.getChildByName('RankLabel').getComponent(Label).string = rankIcon;
            node.getChildByName('NameLabel').getComponent(Label).string = item.name;
            node.getChildByName('LevelLabel').getComponent(Label).string = `Lv.${item.level}`;
            node.getChildByName('ValueLabel').getComponent(Label).string = this.formatValue(item.value);
            content.addChild(node);
          }
        }

        updateMyRank() {
          const myLevel = (_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
            error: Error()
          }), GameManager) : GameManager).getInstance().playerData.getLevel();
          this.myRankLabel.string = `我的等级: ${myLevel} (未上榜)`;
        }

        formatValue(value) {
          if (value >= 100000000) return (value / 100000000).toFixed(1) + '亿';
          if (value >= 10000) return (value / 10000).toFixed(1) + '万';
          return value.toString();
        }

        onBack() {
          director.loadScene('MainScene');
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "backBtn", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "levelTabToggle", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "powerTabToggle", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "wealthTabToggle", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "meritTabToggle", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "rankListScrollView", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "rankItemPrefab", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "myRankLabel", [_dec9], {
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
//# sourceMappingURL=873b2ffd917f632d8a840dd90cb7f74d9241cbe3.js.map