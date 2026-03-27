System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, NetworkManager, _crd, axios;

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

        async request(url, data = {}, method = 'POST') {
          try {
            const response = await axios({
              method: method,
              url: this.baseURL + url,
              data: data,
              headers: {
                'Authorization': this.token ? `Bearer ${this.token}` : '',
                'Content-Type': 'application/json'
              },
              timeout: 10000
            });
            return response.data;
          } catch (error) {
            console.error('Network error:', error);
            throw error;
          }
        }

        async get(url, params = {}) {
          return this.request(url, params, 'GET');
        }

        async post(url, data = {}) {
          return this.request(url, data, 'POST');
        }

      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=b41930e3e15e91a093d4fda60669a912bf56115d.js.map