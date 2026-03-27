System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, director, Node, Label, Button, ProgressBar, GameManager, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _crd, ccclass, property, FarmScene;

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
      ProgressBar = _cc.ProgressBar;
    }, function (_unresolved_2) {
      GameManager = _unresolved_2.GameManager;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "bf9acZw/lJP64I/LqmGGLmn", "FarmScene", undefined);

      __checkObsolete__(['_decorator', 'Component', 'director', 'Node', 'Label', 'Button', 'ProgressBar', 'Sprite']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("FarmScene", FarmScene = (_dec = ccclass('FarmScene'), _dec2 = property(Button), _dec3 = property(Button), _dec4 = property(Button), _dec5 = property(Button), _dec6 = property(Node), _dec7 = property(Node), _dec8 = property(Node), _dec9 = property(Label), _dec(_class = (_class2 = class FarmScene extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "backBtn", _descriptor, this);

          _initializerDefineProperty(this, "plantBtn", _descriptor2, this);

          _initializerDefineProperty(this, "harvestBtn", _descriptor3, this);

          _initializerDefineProperty(this, "stealBtn", _descriptor4, this);

          _initializerDefineProperty(this, "cropSlot1", _descriptor5, this);

          _initializerDefineProperty(this, "cropSlot2", _descriptor6, this);

          _initializerDefineProperty(this, "cropSlot3", _descriptor7, this);

          _initializerDefineProperty(this, "statusLabel", _descriptor8, this);

          // 作物配置
          this.crops = {
            wheat: {
              name: '金麦',
              growTime: 4 * 3600,
              reward: {
                incense_money: 100
              },
              seedCost: 50
            },
            rice: {
              name: '灵稻',
              growTime: 8 * 3600,
              reward: {
                incense_money: 250
              },
              seedCost: 100
            },
            melon: {
              name: '财神瓜',
              growTime: 24 * 3600,
              reward: {
                incense_money: 800,
                yuanbao: 10
              },
              seedCost: 300
            }
          };
          // 农田数据
          this.farmSlots = [{
            id: 1,
            crop: null,
            plantTime: 0,
            isReady: false
          }, {
            id: 2,
            crop: null,
            plantTime: 0,
            isReady: false
          }, {
            id: 3,
            crop: null,
            plantTime: 0,
            isReady: false
          }];
        }

        onLoad() {
          this.backBtn.node.on(Button.EventType.CLICK, this.onBack, this);
          this.plantBtn.node.on(Button.EventType.CLICK, this.onPlant, this);
          this.harvestBtn.node.on(Button.EventType.CLICK, this.onHarvest, this);
          this.stealBtn.node.on(Button.EventType.CLICK, this.onSteal, this);
        }

        start() {
          this.updateFarmUI();
          this.schedule(this.checkGrowth, 1);
        }

        checkGrowth() {
          const now = Date.now() / 1000;

          for (const slot of this.farmSlots) {
            if (slot.crop && !slot.isReady) {
              const cropConfig = this.crops[slot.crop];
              const elapsed = now - slot.plantTime;

              if (elapsed >= cropConfig.growTime) {
                slot.isReady = true;
                this.statusLabel.string = `${cropConfig.name}已成熟！`;
              }
            }
          }

          this.updateFarmUI();
        }

        updateFarmUI() {
          const now = Date.now() / 1000;
          const slots = [this.cropSlot1, this.cropSlot2, this.cropSlot3];

          for (let i = 0; i < 3; i++) {
            const slot = this.farmSlots[i];
            const slotNode = slots[i];

            if (!slot.crop) {
              slotNode.getChildByName('StatusLabel').getComponent(Label).string = '空地';
              slotNode.getChildByName('ProgressBar').getComponent(ProgressBar).progress = 0;
            } else {
              const cropConfig = this.crops[slot.crop];

              if (slot.isReady) {
                slotNode.getChildByName('StatusLabel').getComponent(Label).string = '可收获';
                slotNode.getChildByName('ProgressBar').getComponent(ProgressBar).progress = 1;
              } else {
                const elapsed = now - slot.plantTime;
                const progress = Math.min(1, elapsed / cropConfig.growTime);
                const remaining = Math.ceil((cropConfig.growTime - elapsed) / 3600);
                slotNode.getChildByName('StatusLabel').getComponent(Label).string = `${cropConfig.name} (${remaining}小时)`;
                slotNode.getChildByName('ProgressBar').getComponent(ProgressBar).progress = progress;
              }
            }
          }
        }

        onPlant() {
          // 找到空位
          const emptySlot = this.farmSlots.find(s => !s.crop);

          if (!emptySlot) {
            this.statusLabel.string = '没有空地了';
            return;
          } // 显示种植选择（简化版直接种金麦）


          const cropType = 'wheat';
          const cropConfig = this.crops[cropType];
          const player = (_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
            error: Error()
          }), GameManager) : GameManager).getInstance().playerData;

          if (!player.costCurrency('incense_money', cropConfig.seedCost)) {
            this.statusLabel.string = '香火钱不足';
            return;
          }

          emptySlot.crop = cropType;
          emptySlot.plantTime = Date.now() / 1000;
          emptySlot.isReady = false;
          this.statusLabel.string = `种植了${cropConfig.name}`;
          this.updateFarmUI();
        }

        onHarvest() {
          let harvested = false;

          for (const slot of this.farmSlots) {
            if (slot.crop && slot.isReady) {
              const cropConfig = this.crops[slot.crop];
              const player = (_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
                error: Error()
              }), GameManager) : GameManager).getInstance().playerData; // 发放奖励

              for (const [key, value] of Object.entries(cropConfig.reward)) {
                player.addCurrency(key, value);
              }

              this.statusLabel.string = `收获了${cropConfig.name}！`; // 清空田地

              slot.crop = null;
              slot.plantTime = 0;
              slot.isReady = false;
              harvested = true;
            }
          }

          if (!harvested) {
            this.statusLabel.string = '没有可收获的作物';
          }

          this.updateFarmUI();
        }

        onSteal() {
          // 偷菜功能 - 随机从好友农场偷取
          this.statusLabel.string = '访问好友农场偷菜...'; // 模拟偷菜成功

          const stealAmount = Math.floor(Math.random() * 50) + 50;
          (_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
            error: Error()
          }), GameManager) : GameManager).getInstance().playerData.addCurrency('incense_money', stealAmount);
          this.statusLabel.string = `偷菜成功！获得${stealAmount}香火钱`;
        }

        onBack() {
          director.loadScene('MainScene');
        }

        onDestroy() {
          this.unschedule(this.checkGrowth);
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "backBtn", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "plantBtn", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "harvestBtn", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "stealBtn", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "cropSlot1", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "cropSlot2", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "cropSlot3", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "statusLabel", [_dec9], {
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
//# sourceMappingURL=de52a0f52b9ed690197220e8a5f3eba189fcbeba.js.map