System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, director, Node, Label, Button, ScrollView, instantiate, Toggle, GameManager, QuestConfig, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _crd, ccclass, property, QuestScene;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfGameManager(extras) {
    _reporterNs.report("GameManager", "../Core/GameManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfQuestConfig(extras) {
    _reporterNs.report("QuestConfig", "../Config/QuestConfig", _context.meta, extras);
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
    }, function (_unresolved_3) {
      QuestConfig = _unresolved_3.QuestConfig;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "1b48bHYVGpIWZqZEtRRUfmo", "QuestScene", undefined);

      __checkObsolete__(['_decorator', 'Component', 'director', 'Node', 'Label', 'Button', 'ScrollView', 'Prefab', 'instantiate', 'Toggle']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("QuestScene", QuestScene = (_dec = ccclass('QuestScene'), _dec2 = property(Button), _dec3 = property(Toggle), _dec4 = property(Toggle), _dec5 = property(Toggle), _dec6 = property(ScrollView), _dec7 = property(Node), _dec(_class = (_class2 = class QuestScene extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "backBtn", _descriptor, this);

          _initializerDefineProperty(this, "mainTabToggle", _descriptor2, this);

          _initializerDefineProperty(this, "dailyTabToggle", _descriptor3, this);

          _initializerDefineProperty(this, "achievementTabToggle", _descriptor4, this);

          _initializerDefineProperty(this, "questListScrollView", _descriptor5, this);

          _initializerDefineProperty(this, "questItemPrefab", _descriptor6, this);

          this.currentTab = 'main';
          this.questProgress = {
            'main_001': {
              current: 1,
              target: 1,
              completed: true,
              claimed: true
            },
            'main_002': {
              current: 5,
              target: 1,
              completed: true,
              claimed: false
            },
            'main_003': {
              current: 3,
              target: 10,
              completed: false,
              claimed: false
            },
            'daily_001': {
              current: 2,
              target: 3,
              completed: false,
              claimed: false
            },
            'daily_002': {
              current: 0,
              target: 5,
              completed: false,
              claimed: false
            }
          };
        }

        onLoad() {
          this.backBtn.node.on(Button.EventType.CLICK, this.onBack, this);
          this.mainTabToggle.node.on(Toggle.EventType.TOGGLE, () => this.onTabChange('main'), this);
          this.dailyTabToggle.node.on(Toggle.EventType.TOGGLE, () => this.onTabChange('daily'), this);
          this.achievementTabToggle.node.on(Toggle.EventType.TOGGLE, () => this.onTabChange('achievement'), this);
        }

        start() {
          this.updateQuestList();
        }

        onTabChange(tab) {
          this.currentTab = tab;
          this.updateQuestList();
        }

        updateQuestList() {
          var _this = this;

          var content = this.questListScrollView.content;
          content.removeAllChildren();
          var quests = [];

          if (this.currentTab === 'main') {
            quests = (_crd && QuestConfig === void 0 ? (_reportPossibleCrUseOfQuestConfig({
              error: Error()
            }), QuestConfig) : QuestConfig).mainQuests;
          } else if (this.currentTab === 'daily') {
            quests = (_crd && QuestConfig === void 0 ? (_reportPossibleCrUseOfQuestConfig({
              error: Error()
            }), QuestConfig) : QuestConfig).dailyQuests;
          } else {
            quests = (_crd && QuestConfig === void 0 ? (_reportPossibleCrUseOfQuestConfig({
              error: Error()
            }), QuestConfig) : QuestConfig).achievements;
          }

          var _loop = function _loop(quest) {
            var progress = _this.questProgress[quest.id] || {
              current: 0,
              target: 1,
              completed: false,
              claimed: false
            };
            var item = instantiate(_this.questItemPrefab);
            item.getChildByName('NameLabel').getComponent(Label).string = quest.name;
            item.getChildByName('DescLabel').getComponent(Label).string = quest.desc;
            item.getChildByName('ProgressLabel').getComponent(Label).string = progress.current + "/" + progress.target; // 奖励显示

            var rewardText = '';

            for (var [key, value] of Object.entries(quest.reward)) {
              rewardText += key + ":" + value + " ";
            }

            item.getChildByName('RewardLabel').getComponent(Label).string = rewardText; // 状态按钮

            var claimBtn = item.getChildByName('ClaimBtn').getComponent(Button);
            var claimLabel = claimBtn.getComponent(Label);

            if (progress.claimed) {
              claimLabel.string = '已完成';
              claimBtn.interactable = false;
            } else if (progress.completed) {
              claimLabel.string = '领取';
              claimBtn.interactable = true;
              claimBtn.node.on(Button.EventType.CLICK, () => _this.onClaim(quest), _this);
            } else {
              claimLabel.string = '进行中';
              claimBtn.interactable = false;
            }

            content.addChild(item);
          };

          for (var quest of quests) {
            _loop(quest);
          }
        }

        onClaim(quest) {
          var progress = this.questProgress[quest.id];
          if (!progress || !progress.completed || progress.claimed) return; // 发放奖励

          for (var [key, value] of Object.entries(quest.reward)) {
            (_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
              error: Error()
            }), GameManager) : GameManager).getInstance().playerData.addCurrency(key, value);
          }

          progress.claimed = true;
          this.updateQuestList();
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
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "mainTabToggle", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "dailyTabToggle", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "achievementTabToggle", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "questListScrollView", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "questItemPrefab", [_dec7], {
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
//# sourceMappingURL=487bdb6c3ea22e4aa1750d9187e3b375ce7949cb.js.map