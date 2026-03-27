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
          const hours = Math.floor(seconds / 3600);
          const minutes = Math.floor(seconds % 3600 / 60);
          const secs = seconds % 60;

          if (hours > 0) {
            return `${hours}小时${minutes}分`;
          } else if (minutes > 0) {
            return `${minutes}分${secs}秒`;
          }

          return `${secs}秒`;
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

        static getLocalStorage(key, defaultValue = null) {
          const data = localStorage.getItem(key);
          return data ? JSON.parse(data) : defaultValue;
        } // 防抖


        static debounce(func, wait) {
          let timeout;
          return function (...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
          };
        } // 节流


        static throttle(func, limit) {
          let inThrottle;
          return function (...args) {
            if (!inThrottle) {
              func.apply(this, args);
              inThrottle = true;
              setTimeout(() => inThrottle = false, limit);
            }
          };
        } // 生成UUID


        static generateUUID() {
          return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : r & 0x3 | 0x8;
            return v.toString(16);
          });
        } // 计算距离现在的时间


        static timeAgo(date) {
          const now = new Date().getTime();
          const past = new Date(date).getTime();
          const diff = now - past;
          const minutes = Math.floor(diff / 60000);
          const hours = Math.floor(diff / 3600000);
          const days = Math.floor(diff / 86400000);
          if (days > 0) return `${days}天前`;
          if (hours > 0) return `${hours}小时前`;
          if (minutes > 0) return `${minutes}分钟前`;
          return '刚刚';
        }

      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=92c0c1912afbc8f190bb93946d40f54d8fddd032.js.map