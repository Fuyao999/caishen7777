System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, director, Node, Label, Button, ScrollView, instantiate, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _crd, ccclass, property, PVPScene;

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

      _cclegacy._RF.push({}, "633e7+VPTtDPpTCYCHpBTJ/", "PVPScene", undefined);

      __checkObsolete__(['_decorator', 'Component', 'director', 'Node', 'Label', 'Button', 'ScrollView', 'Prefab', 'instantiate']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("PVPScene", PVPScene = (_dec = ccclass('PVPScene'), _dec2 = property(Button), _dec3 = property(Button), _dec4 = property(Button), _dec5 = property(Label), _dec6 = property(Label), _dec7 = property(Label), _dec8 = property(ScrollView), _dec9 = property(Node), _dec10 = property(Node), _dec11 = property(Label), _dec(_class = (_class2 = class PVPScene extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "backBtn", _descriptor, this);

          _initializerDefineProperty(this, "matchBtn", _descriptor2, this);

          _initializerDefineProperty(this, "rankBtn", _descriptor3, this);

          _initializerDefineProperty(this, "currentRankLabel", _descriptor4, this);

          _initializerDefineProperty(this, "currentPointsLabel", _descriptor5, this);

          _initializerDefineProperty(this, "seasonTimeLabel", _descriptor6, this);

          _initializerDefineProperty(this, "rankListScrollView", _descriptor7, this);

          _initializerDefineProperty(this, "rankItemPrefab", _descriptor8, this);

          _initializerDefineProperty(this, "matchingPanel", _descriptor9, this);

          _initializerDefineProperty(this, "matchTimeLabel", _descriptor10, this);

          // 段位数据
          this.ranks = [{
            name: '青铜',
            minPoints: 0,
            maxPoints: 99,
            icon: '🥉'
          }, {
            name: '白银',
            minPoints: 100,
            maxPoints: 299,
            icon: '🥈'
          }, {
            name: '黄金',
            minPoints: 300,
            maxPoints: 599,
            icon: '🥇'
          }, {
            name: '铂金',
            minPoints: 600,
            maxPoints: 999,
            icon: '💎'
          }, {
            name: '钻石',
            minPoints: 1000,
            maxPoints: 1499,
            icon: '💎💎'
          }, {
            name: '星耀',
            minPoints: 1500,
            maxPoints: 2099,
            icon: '⭐'
          }, {
            name: '封神',
            minPoints: 2100,
            maxPoints: 99999,
            icon: '👑'
          }];
          // 排行榜数据
          this.topPlayers = [{
            rank: 1,
            name: '财神本尊',
            points: 3500,
            tier: '封神'
          }, {
            rank: 2,
            name: '不败神话',
            points: 3200,
            tier: '封神'
          }, {
            rank: 3,
            name: '战神无双',
            points: 2980,
            tier: '封神'
          }, {
            rank: 4,
            name: '王者归来',
            points: 2750,
            tier: '星耀'
          }, {
            rank: 5,
            name: '无敌是多么寂寞',
            points: 2600,
            tier: '星耀'
          }];
          this.playerPoints = 150;
          this.isMatching = false;
          this.matchTime = 0;
        }

        onLoad() {
          this.backBtn.node.on(Button.EventType.CLICK, this.onBack, this);
          this.matchBtn.node.on(Button.EventType.CLICK, this.onMatch, this);
          this.rankBtn.node.on(Button.EventType.CLICK, this.onShowRank, this);
        }

        start() {
          this.updatePlayerInfo();
          this.updateRankList();
          this.matchingPanel.active = false;
        }

        updatePlayerInfo() {
          const currentTier = this.getTierByPoints(this.playerPoints);
          this.currentRankLabel.string = `当前段位: ${currentTier.icon} ${currentTier.name}`;
          this.currentPointsLabel.string = `积分: ${this.playerPoints}`; // 赛季剩余时间（模拟）

          this.seasonTimeLabel.string = '赛季剩余: 45天';
        }

        getTierByPoints(points) {
          for (const tier of this.ranks) {
            if (points >= tier.minPoints && points <= tier.maxPoints) {
              return tier;
            }
          }

          return this.ranks[0];
        }

        updateRankList() {
          const content = this.rankListScrollView.content;
          content.removeAllChildren();

          for (const player of this.topPlayers) {
            const node = instantiate(this.rankItemPrefab);
            node.getChildByName('RankLabel').getComponent(Label).string = `#${player.rank}`;
            node.getChildByName('NameLabel').getComponent(Label).string = player.name;
            node.getChildByName('PointsLabel').getComponent(Label).string = `${player.points}分`;
            node.getChildByName('TierLabel').getComponent(Label).string = player.tier;
            content.addChild(node);
          }
        }

        onMatch() {
          if (this.isMatching) return;
          this.isMatching = true;
          this.matchTime = 0;
          this.matchingPanel.active = true;
          this.matchBtn.interactable = false;
          this.schedule(this.updateMatchTime, 1); // 模拟匹配成功（3-10秒）

          const matchDuration = 3 + Math.random() * 7;
          this.scheduleOnce(() => {
            this.onMatchFound();
          }, matchDuration);
        }

        updateMatchTime() {
          this.matchTime++;
          this.matchTimeLabel.string = `匹配中... ${this.matchTime}秒`;
        }

        onMatchFound() {
          this.unschedule(this.updateMatchTime);
          this.isMatching = false;
          this.matchingPanel.active = false;
          this.matchBtn.interactable = true; // 进入战斗

          console.log('匹配成功！进入战斗');
          director.loadScene('BattleScene'); // 战斗结束后结算积分（模拟）

          this.scheduleOnce(() => {
            const win = Math.random() > 0.5;

            if (win) {
              this.playerPoints += 20;
              console.log('战斗胜利！+20分');
            } else {
              this.playerPoints = Math.max(0, this.playerPoints - 15);
              console.log('战斗失败！-15分');
            }

            this.updatePlayerInfo();
          }, 2);
        }

        onShowRank() {
          // 显示完整排行榜
          console.log('显示完整排行榜');
        }

        onBack() {
          if (this.isMatching) {
            this.unschedule(this.updateMatchTime);
            this.unschedule(this.onMatchFound);
          }

          director.loadScene('MainScene');
        }

        onDestroy() {
          this.unscheduleAllCallbacks();
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "backBtn", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "matchBtn", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "rankBtn", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "currentRankLabel", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "currentPointsLabel", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "seasonTimeLabel", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "rankListScrollView", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "rankItemPrefab", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "matchingPanel", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "matchTimeLabel", [_dec11], {
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
//# sourceMappingURL=1f86bc40c7c1aa4517b715fb1a606a6678cf7587.js.map