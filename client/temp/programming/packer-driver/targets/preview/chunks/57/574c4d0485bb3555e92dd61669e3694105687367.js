System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, NetworkManager, _crd, axios;

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

  function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "fbb70adFBBM3qCaKbD2DGDW", "NetworkManager", undefined);

      axios = require('axios');

      _export("NetworkManager", NetworkManager = class NetworkManager {
        constructor() {
          this.baseURL = 'http://localhost:3001';
          this.token = '';
        }

        init() {
          // 从本地存储读取token
          this.token = localStorage.getItem('caishen_token') || '';
          return Promise.resolve();
        }

        setToken(token) {
          this.token = token;
          localStorage.setItem('caishen_token', token);
        }

        clearToken() {
          this.token = '';
          localStorage.removeItem('caishen_token');
        }

        request(url, data, method) {
          var _this = this;

          return _asyncToGenerator(function* () {
            if (data === void 0) {
              data = {};
            }

            if (method === void 0) {
              method = 'POST';
            }

            try {
              var response = yield axios({
                method: method,
                url: _this.baseURL + url,
                data: data,
                headers: {
                  'Authorization': _this.token ? "Bearer " + _this.token : '',
                  'Content-Type': 'application/json'
                },
                timeout: 10000
              });
              return response.data;
            } catch (error) {
              console.error('Network error:', error);
              throw error;
            }
          })();
        }

        get(url, params) {
          var _this2 = this;

          return _asyncToGenerator(function* () {
            if (params === void 0) {
              params = {};
            }

            return _this2.request(url, params, 'GET');
          })();
        }

        post(url, data) {
          var _this3 = this;

          return _asyncToGenerator(function* () {
            if (data === void 0) {
              data = {};
            }

            return _this3.request(url, data, 'POST');
          })();
        }

      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=574c4d0485bb3555e92dd61669e3694105687367.js.map