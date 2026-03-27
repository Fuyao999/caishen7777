System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, director, Node, Label, Button, instantiate, Vec3, GameManager, SceneConfig, _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _crd, ccclass, property, MapScene;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfGameManager(extras) {
    _reporterNs.report("GameManager", "../Core/GameManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfSceneConfig(extras) {
    _reporterNs.report("SceneConfig", "../Config/SceneConfig", _context.meta, extras);
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
      instantiate = _cc.instantiate;
      Vec3 = _cc.Vec3;
    }, function (_unresolved_2) {
      GameManager = _unresolved_2.GameManager;
    }, function (_unresolved_3) {
      SceneConfig = _unresolved_3.SceneConfig;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "25c49Uu6H1JsYw7Z5XOe073", "MapScene", undefined);

      __checkObsolete__(['_decorator', 'Component', 'director', 'Node', 'Label', 'Button', 'ScrollView', 'Prefab', 'instantiate', 'Vec3']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("MapScene", MapScene = (_dec = ccclass('MapScene'), _dec2 = property(Button), _dec3 = property(Node), _dec4 = property(Node), _dec5 = property(Label), _dec(_class = (_class2 = class MapScene extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "backBtn", _descriptor, this);

          _initializerDefineProperty(this, "domainNodePrefab", _descriptor2, this);

          _initializerDefineProperty(this, "mapContainer", _descriptor3, this);

          _initializerDefineProperty(this, "currentLocationLabel", _descriptor4, this);

          this.domains = (_crd && SceneConfig === void 0 ? (_reportPossibleCrUseOfSceneConfig({
            error: Error()
          }), SceneConfig) : SceneConfig).domains;
          this.currentDomain = 'zishi';
        }

        onLoad() {
          this.backBtn.node.on(Button.EventType.CLICK, this.onBack, this);
        }

        start() {
          this.initMap();
          this.updateLocation();
        }

        initMap() {
          var _this = this;

          var domainKeys = Object.keys(this.domains);
          var positions = [new Vec3(-200, 200, 0), // 子时
          new Vec3(0, 200, 0), // 丑时
          new Vec3(200, 200, 0), // 寅时
          new Vec3(-200, 50, 0), // 卯时
          new Vec3(0, 50, 0), // 辰时
          new Vec3(200, 50, 0), // 巳时
          new Vec3(-200, -100, 0), // 午时
          new Vec3(0, -100, 0), // 未时
          new Vec3(200, -100, 0), // 申时
          new Vec3(-200, -250, 0), // 酉时
          new Vec3(0, -250, 0), // 戌时
          new Vec3(200, -250, 0) // 亥时
          ];

          var _loop = function _loop() {
            var domainId = domainKeys[i];
            var domain = _this.domains[domainId];
            var node = instantiate(_this.domainNodePrefab);
            node.setPosition(positions[i]); // 设置名称

            node.getChildByName('NameLabel').getComponent(Label).string = domain.name; // 设置等级范围

            node.getChildByName('LevelLabel').getComponent(Label).string = domain.levelRange; // 点击事件

            var btn = node.getComponent(Button);
            btn.node.on(Button.EventType.CLICK, () => _this.onDomainClick(domainId), _this);

            _this.mapContainer.addChild(node);
          };

          for (var i = 0; i < domainKeys.length; i++) {
            _loop();
          }
        }

        onDomainClick(domainId) {
          var domain = this.domains[domainId];
          var playerLevel = (_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
            error: Error()
          }), GameManager) : GameManager).getInstance().playerData.getLevel(); // 解析等级范围

          var [minLevel, maxLevel] = domain.levelRange.split('-').map(n => parseInt(n));

          if (playerLevel < minLevel) {
            // 等级不足提示
            console.log("\u9700\u8981\u7B49\u7EA7" + minLevel + "\u624D\u80FD\u8FDB\u5165");
            return;
          } // 保存当前选择的财域


          this.currentDomain = domainId; // 进入财域场景

          director.loadScene('DomainScene');
        }

        updateLocation() {
          var domain = this.domains[this.currentDomain];
          this.currentLocationLabel.string = "\u5F53\u524D\u4F4D\u7F6E: " + domain.name;
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
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "domainNodePrefab", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "mapContainer", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "currentLocationLabel", [_dec5], {
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
//# sourceMappingURL=ded92beab26de2a704b6e698e9c316ee0b61c22b.js.map