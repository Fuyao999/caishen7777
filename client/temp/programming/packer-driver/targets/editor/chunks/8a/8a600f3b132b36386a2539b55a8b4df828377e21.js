System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, director, _dec, _class, _class2, _crd, ccclass, property, GameManager;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      director = _cc.director;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "2ffd5d7tgVOZ6Gg18vXJKm2", "GameManager", undefined);

      __checkObsolete__(['_decorator', 'Component', 'director']);

      ({
        ccclass,
        property
      } = _decorator); // 简化版游戏管理器

      _export("GameManager", GameManager = (_dec = ccclass('GameManager'), _dec(_class = (_class2 = class GameManager extends Component {
        constructor(...args) {
          super(...args);
          this.playerData = {
            level: 1,
            stage: 'clay',
            incense_money: 1000,
            yuanbao: 100,
            merit: 0,
            mana: 100,
            incense_sticks: 10,
            candles: 5,
            gold_paper: 3,
            fruits: 2
          };
        }

        onLoad() {
          if (GameManager.instance === null) {
            GameManager.instance = this;
            director.addPersistRootNode(this.node);
          }
        }

        static getInstance() {
          return GameManager.instance;
        }

      }, _class2.instance = null, _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=8a600f3b132b36386a2539b55a8b4df828377e21.js.map