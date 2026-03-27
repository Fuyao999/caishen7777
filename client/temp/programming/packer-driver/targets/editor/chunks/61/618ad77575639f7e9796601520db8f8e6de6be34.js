System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, director, Node, Label, Button, ScrollView, instantiate, GameManager, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _crd, ccclass, property, TempleScene;

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

      _cclegacy._RF.push({}, "cd26fmRkyxByYB5xp6bb/4u", "TempleScene", undefined);

      __checkObsolete__(['_decorator', 'Component', 'director', 'Node', 'Label', 'Button', 'ScrollView', 'Prefab', 'instantiate']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("TempleScene", TempleScene = (_dec = ccclass('TempleScene'), _dec2 = property(Button), _dec3 = property(ScrollView), _dec4 = property(Node), _dec5 = property(Label), _dec6 = property(Label), _dec7 = property(Label), _dec8 = property(Label), _dec(_class = (_class2 = class TempleScene extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "backBtn", _descriptor, this);

          _initializerDefineProperty(this, "godsScrollView", _descriptor2, this);

          _initializerDefineProperty(this, "godCardPrefab", _descriptor3, this);

          _initializerDefineProperty(this, "incenseSticksLabel", _descriptor4, this);

          _initializerDefineProperty(this, "candlesLabel", _descriptor5, this);

          _initializerDefineProperty(this, "goldPaperLabel", _descriptor6, this);

          _initializerDefineProperty(this, "fruitsLabel", _descriptor7, this);

          this.gods = [{
            id: 'caishen',
            name: '赵公明',
            title: '正财神',
            effect: '香火钱+20%'
          }, {
            id: 'wencaishen',
            name: '比干',
            title: '文财神',
            effect: '法力上限+10'
          }, {
            id: 'wucaishen',
            name: '关公',
            title: '武财神',
            effect: '化缘收益+15%'
          }, {
            id: 'piancaishen',
            name: '范蠡',
            title: '偏财神',
            effect: '暴击率+5%'
          }, {
            id: 'shengcai',
            name: '李诡祖',
            title: '增福财神',
            effect: '供奉功德+10%'
          }, {
            id: 'lucaishen',
            name: '沈万三',
            title: '禄财神',
            effect: '法力回复+20%'
          }, {
            id: 'shoucaishen',
            name: '刘海蟾',
            title: '寿财神',
            effect: '香火钱上限+1000'
          }, {
            id: 'xicaishen',
            name: '子贡',
            title: '喜财神',
            effect: '每日首供双倍'
          }, {
            id: 'caishenpo',
            name: '财神奶奶',
            title: '财神婆婆',
            effect: '化缘风险-10%'
          }];
        }

        onLoad() {
          this.backBtn.node.on(Button.EventType.CLICK, this.onBack, this);
          this.initGodsList();
          this.updateResources();
        }

        initGodsList() {
          const content = this.godsScrollView.content;
          content.removeAllChildren();

          for (const god of this.gods) {
            const card = instantiate(this.godCardPrefab);
            card.getChildByName('NameLabel').getComponent(Label).string = god.name;
            card.getChildByName('TitleLabel').getComponent(Label).string = god.title;
            card.getChildByName('EffectLabel').getComponent(Label).string = god.effect;
            const worshipBtn = card.getChildByName('WorshipBtn').getComponent(Button);
            worshipBtn.node.on(Button.EventType.CLICK, () => this.onWorshipGod(god.id), this);
            content.addChild(card);
          }
        }

        updateResources() {
          const player = (_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
            error: Error()
          }), GameManager) : GameManager).getInstance().playerData;
          this.incenseSticksLabel.string = `线香: ${player.getCurrency('incense_sticks')}`;
          this.candlesLabel.string = `蜡烛: ${player.getCurrency('candles')}`;
          this.goldPaperLabel.string = `金纸: ${player.getCurrency('gold_paper')}`;
          this.fruitsLabel.string = `供果: ${player.getCurrency('fruits')}`;
        }

        async onWorshipGod(godId) {
          (_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
            error: Error()
          }), GameManager) : GameManager).getInstance().showLoading('供奉中...');

          try {
            const result = await (_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
              error: Error()
            }), GameManager) : GameManager).getInstance().network.post('/api/temple/worship', {
              godId: godId,
              offeringType: 'incense_sticks',
              offeringLevel: 1
            });

            if (result.success) {
              // 更新本地数据
              (_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
                error: Error()
              }), GameManager) : GameManager).getInstance().playerData.addCurrency('incense_money', result.reward.incense_money);
              (_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
                error: Error()
              }), GameManager) : GameManager).getInstance().playerData.addCurrency('merit', result.reward.merit);
              (_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
                error: Error()
              }), GameManager) : GameManager).getInstance().playerData.costCurrency('incense_sticks', 1);
              this.updateResources(); // 显示奖励提示
            } else {
              // 显示错误提示
              console.log(result.message);
            }
          } catch (error) {
            console.error('供奉错误:', error);
          } finally {
            (_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
              error: Error()
            }), GameManager) : GameManager).getInstance().hideLoading();
          }
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
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "godsScrollView", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "godCardPrefab", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "incenseSticksLabel", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "candlesLabel", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "goldPaperLabel", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "fruitsLabel", [_dec8], {
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
//# sourceMappingURL=618ad77575639f7e9796601520db8f8e6de6be34.js.map