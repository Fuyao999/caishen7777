System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, director, Label, Button, Sprite, GameManager, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _crd, ccclass, property, SailingScene;

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
      Label = _cc.Label;
      Button = _cc.Button;
      Sprite = _cc.Sprite;
    }, function (_unresolved_2) {
      GameManager = _unresolved_2.GameManager;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "33bc2C08lxE8aWm0gxDl0I9", "SailingScene", undefined);

      __checkObsolete__(['_decorator', 'Component', 'director', 'Node', 'Label', 'Button', 'Sprite']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("SailingScene", SailingScene = (_dec = ccclass('SailingScene'), _dec2 = property(Button), _dec3 = property(Button), _dec4 = property(Button), _dec5 = property(Label), _dec6 = property(Label), _dec7 = property(Sprite), _dec8 = property(Label), _dec(_class = (_class2 = class SailingScene extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "backBtn", _descriptor, this);

          _initializerDefineProperty(this, "sailBtn", _descriptor2, this);

          _initializerDefineProperty(this, "diveBtn", _descriptor3, this);

          _initializerDefineProperty(this, "shipLevelLabel", _descriptor4, this);

          _initializerDefineProperty(this, "oxygenLabel", _descriptor5, this);

          _initializerDefineProperty(this, "shipSprite", _descriptor6, this);

          _initializerDefineProperty(this, "explorationProgressLabel", _descriptor7, this);

          this.shipTypes = [{
            name: '小渔船',
            level: 1,
            speed: 1,
            capacity: 100
          }, {
            name: '商船',
            level: 2,
            speed: 2,
            capacity: 300
          }, {
            name: '战船',
            level: 3,
            speed: 3,
            capacity: 500
          }, {
            name: '龙宫宝船',
            level: 4,
            speed: 5,
            capacity: 1000
          }];
          this.currentShip = 0;
          this.oxygen = 300;
          // 5分钟氧气（秒）
          this.isDiving = false;
        }

        onLoad() {
          this.backBtn.node.on(Button.EventType.CLICK, this.onBack, this);
          this.sailBtn.node.on(Button.EventType.CLICK, this.onSail, this);
          this.diveBtn.node.on(Button.EventType.CLICK, this.onDive, this);
        }

        start() {
          this.updateUI();
          this.schedule(this.updateOxygen, 1);
        }

        updateUI() {
          const ship = this.shipTypes[this.currentShip];
          this.shipLevelLabel.string = `当前船只: ${ship.name} (Lv.${ship.level})`;
          const mins = Math.floor(this.oxygen / 60);
          const secs = this.oxygen % 60;
          this.oxygenLabel.string = `氧气: ${mins}:${secs.toString().padStart(2, '0')}`;
          this.oxygenLabel.color = this.oxygen < 60 ? {
            r: 255,
            g: 0,
            b: 0,
            a: 255
          } : {
            r: 255,
            g: 255,
            b: 255,
            a: 255
          };
          this.diveBtn.interactable = !this.isDiving;
        }

        updateOxygen() {
          if (this.isDiving && this.oxygen > 0) {
            this.oxygen--;

            if (this.oxygen <= 0) {
              // 氧气耗尽，强制返回
              this.isDiving = false;
              alert('⚠️ 氧气耗尽！紧急上浮！');
            }
          }

          this.updateUI();
        }

        onSail() {
          // 航海探索
          const ship = this.shipTypes[this.currentShip]; // 随机事件

          const events = [{
            name: '发现宝藏',
            reward: {
              incense_money: 1000 * ship.level
            }
          }, {
            name: '遭遇海盗',
            reward: {
              incense_money: 500
            }
          }, {
            name: '平静航行',
            reward: {
              incense_money: 200
            }
          }, {
            name: '遇到商队',
            reward: {
              yuanbao: 10 * ship.level
            }
          }];
          const event = events[Math.floor(Math.random() * events.length)];

          for (const [key, value] of Object.entries(event.reward)) {
            (_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
              error: Error()
            }), GameManager) : GameManager).getInstance().playerData.addCurrency(key, value);
          }

          alert(`航海事件: ${event.name}\n获得奖励！`);
        }

        onDive() {
          if (this.isDiving) return;
          this.isDiving = true;
          alert('开始潜水！氧气限制5分钟，寻找深海宝藏！'); // 潜水探索

          let foundTreasures = 0;
          const diveInterval = setInterval(() => {
            if (!this.isDiving || this.oxygen <= 0) {
              clearInterval(diveInterval);
              return;
            } // 随机发现宝藏


            if (Math.random() < 0.3) {
              foundTreasures++;
              const reward = Math.floor(Math.random() * 500) + 200;
              (_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
                error: Error()
              }), GameManager) : GameManager).getInstance().playerData.addCurrency('incense_money', reward);
              console.log(`发现深海宝藏！+${reward}香火钱`);
            }
          }, 2000);
        }

        upgradeShip() {
          if (this.currentShip < this.shipTypes.length - 1) {
            this.currentShip++;
            alert(`船只升级！现在是${this.shipTypes[this.currentShip].name}`);
            this.updateUI();
          }
        }

        onBack() {
          this.isDiving = false;
          this.unscheduleAllCallbacks();
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
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "sailBtn", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "diveBtn", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "shipLevelLabel", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "oxygenLabel", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "shipSprite", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "explorationProgressLabel", [_dec8], {
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
//# sourceMappingURL=7b959b9e85842dcaf324fa103ac8c811242f64fe.js.map