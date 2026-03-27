System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, Utils, _crd;

  _export("Utils", void 0);

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "fa2be7duSNEG6+JqHpp+1c8", "Utils", undefined);

      // 工具类
      _export("Utils", Utils = class Utils {
        // 格式化数字（万/亿）
        static formatNumber(num) {
          if (num >= 100000000) {
            return (num / 100000000).toFixed(1) + '亿';
          } else if (num >= 10000) {
            return (num / 10000).toFixed(1) + '万';
          }

          return num.toString();
        } // 格式化时间


        static formatTime(seconds) {
          var hours = Math.floor(seconds / 3600);
          var minutes = Math.floor(seconds % 3600 / 60);
          var secs = seconds % 60;

          if (hours > 0) {
            return hours + "\u5C0F\u65F6" + minutes + "\u5206";
          } else if (minutes > 0) {
            return minutes + "\u5206" + secs + "\u79D2";
          }

          return secs + "\u79D2";
        } // 随机整数


        static randomInt(min, max) {
          return Math.floor(Math.random() * (max - min + 1)) + min;
        } // 随机浮点数


        static randomFloat(min, max) {
          return Math.random() * (max - min) + min;
        } // 随机选择


        static randomChoice(array) {
          return array[Math.floor(Math.random() * array.length)];
        } // 概率判定


        static probability(prob) {
          return Math.random() < prob;
        } // 深拷贝


        static deepClone(obj) {
          return JSON.parse(JSON.stringify(obj));
        } // 本地存储


        static setLocalStorage(key, value) {
          localStorage.setItem(key, JSON.stringify(value));
        }

        static getLocalStorage(key, defaultValue) {
          if (defaultValue === void 0) {
            defaultValue = null;
          }

          var data = localStorage.getItem(key);
          return data ? JSON.parse(data) : defaultValue;
        } // 防抖


        static debounce(func, wait) {
          var timeout;
          return function () {
            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }

            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
          };
        } // 节流


        static throttle(func, limit) {
          var inThrottle;
          return function () {
            if (!inThrottle) {
              for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                args[_key2] = arguments[_key2];
              }

              func.apply(this, args);
              inThrottle = true;
              setTimeout(() => inThrottle = false, limit);
            }
          };
        } // 生成UUID


        static generateUUID() {
          return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0;
            var v = c === 'x' ? r : r & 0x3 | 0x8;
            return v.toString(16);
          });
        } // 计算距离现在的时间


        static timeAgo(date) {
          var now = new Date().getTime();
          var past = new Date(date).getTime();
          var diff = now - past;
          var minutes = Math.floor(diff / 60000);
          var hours = Math.floor(diff / 3600000);
          var days = Math.floor(diff / 86400000);
          if (days > 0) return days + "\u5929\u524D";
          if (hours > 0) return hours + "\u5C0F\u65F6\u524D";
          if (minutes > 0) return minutes + "\u5206\u949F\u524D";
          return '刚刚';
        }

      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=71b9a80e2e9e82c08bce78ac7283a681972b7540.js.map