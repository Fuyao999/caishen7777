System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, PlayerData, _crd;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "842e2quucJJyIcddc+jFP40", "PlayerData", undefined);

      _export("PlayerData", PlayerData = class PlayerData {
        constructor() {
          this.userInfo = {};
          this.currencies = {
            incense_money: 0,
            // 香火钱
            yuanbao: 0,
            // 元宝
            merit: 0,
            // 功德
            incense_sticks: 0,
            // 线香
            candles: 0,
            // 蜡烛
            gold_paper: 0,
            // 金纸
            fruits: 0,
            // 供果
            mana: 100,
            // 法力
            cultivation: 0 // 修为

          };
          this.level = 1;
          this.stage = 'clay';
          // clay, wood, bronze, gold
          this.token = '';
        }

        async load() {
          // 从本地存储加载
          const saved = localStorage.getItem('caishen_player');

          if (saved) {
            const data = JSON.parse(saved);
            this.userInfo = data.userInfo || {};
            this.currencies = data.currencies || this.currencies;
            this.level = data.level || 1;
            this.stage = data.stage || 'clay';
          }
        }

        save() {
          localStorage.setItem('caishen_player', JSON.stringify({
            userInfo: this.userInfo,
            currencies: this.currencies,
            level: this.level,
            stage: this.stage
          }));
        }

        isLoggedIn() {
          return !!this.token;
        }

        setToken(token) {
          this.token = token;
          localStorage.setItem('caishen_token', token);
        }

        setUserInfo(info) {
          this.userInfo = info;
          this.save();
        }

        getUserInfo() {
          return this.userInfo;
        } // 货币操作


        getCurrency(type) {
          return this.currencies[type] || 0;
        }

        addCurrency(type, amount) {
          this.currencies[type] = (this.currencies[type] || 0) + amount;
          this.save();
        }

        costCurrency(type, amount) {
          if (this.currencies[type] >= amount) {
            this.currencies[type] -= amount;
            this.save();
            return true;
          }

          return false;
        }

        getLevel() {
          return this.level;
        }

        setLevel(level) {
          this.level = level;
          this.save();
        }

        getStage() {
          return this.stage;
        }

        setStage(stage) {
          this.stage = stage;
          this.save();
        }

      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=c28b313d62d3669b9ba2eb40d964a67f21ecb1c6.js.map