System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _crd, AdditionalDomainsConfig;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "89568xwGolGAqUc8/6kVGor", "AdditionalDomainsConfig", undefined);

      // 剩余财域详细配置（补充完整12个）
      _export("AdditionalDomainsConfig", AdditionalDomainsConfig = {
        // 聚火域·午时 (66-75级)
        'wushi': {
          name: '聚火域·午时',
          element: 'fire',
          levels: [{
            id: 'wushi_1',
            level: 66,
            name: '烈日平原',
            monsters: [{
              name: '烈日守卫',
              hp: 2000,
              attack: 100,
              defense: 80,
              exp: 1800,
              gold: 4000
            }],
            boss: null
          }, {
            id: 'wushi_2',
            level: 67,
            name: '灼热峡谷',
            monsters: [{
              name: '峡谷守卫',
              hp: 2100,
              attack: 105,
              defense: 82,
              exp: 1900,
              gold: 4200
            }],
            boss: null
          }, {
            id: 'wushi_3',
            level: 68,
            name: '太阳祭坛',
            monsters: [{
              name: '太阳祭司',
              hp: 2200,
              attack: 108,
              defense: 85,
              exp: 2000,
              gold: 4400
            }],
            boss: null
          }, {
            id: 'wushi_4',
            level: 69,
            name: '日冕神殿',
            monsters: [{
              name: '日冕守卫',
              hp: 2300,
              attack: 112,
              defense: 88,
              exp: 2100,
              gold: 4600
            }],
            boss: null
          }, {
            id: 'wushi_5',
            level: 70,
            name: '炎帝祭坛',
            monsters: [],
            boss: {
              name: '炎帝神农',
              hp: 8000,
              attack: 180,
              defense: 120,
              exp: 5000,
              gold: 8000,
              drop: '聚火·神农套装',
              dropRate: 0.3
            }
          }, {
            id: 'wushi_6',
            level: 71,
            name: '三昧火海',
            monsters: [{
              name: '火海守卫',
              hp: 2400,
              attack: 115,
              defense: 90,
              exp: 2200,
              gold: 4800
            }],
            boss: null
          }, {
            id: 'wushi_7',
            level: 72,
            name: '太阳宫',
            monsters: [{
              name: '太阳宫守卫',
              hp: 2500,
              attack: 118,
              defense: 92,
              exp: 2300,
              gold: 5000
            }],
            boss: null
          }, {
            id: 'wushi_8',
            level: 73,
            name: '金乌栖息地',
            monsters: [{
              name: '金乌守卫',
              hp: 2600,
              attack: 122,
              defense: 95,
              exp: 2400,
              gold: 5200
            }],
            boss: null
          }, {
            id: 'wushi_9',
            level: 74,
            name: '日核',
            monsters: [{
              name: '日核守卫',
              hp: 2700,
              attack: 125,
              defense: 98,
              exp: 2500,
              gold: 5400
            }],
            boss: null
          }, {
            id: 'wushi_10',
            level: 75,
            name: '太阳核心',
            monsters: [],
            boss: {
              name: '太阳真君',
              hp: 9000,
              attack: 200,
              defense: 130,
              exp: 6000,
              gold: 10000,
              drop: '太阳神火',
              dropRate: 0.2
            }
          }]
        },
        // 燥土域·未时 (76-85级)
        'weishi': {
          name: '燥土域·未时',
          element: 'earth',
          levels: [{
            id: 'weishi_1',
            level: 76,
            name: '黄土高原',
            monsters: [{
              name: '黄土守卫',
              hp: 2800,
              attack: 130,
              defense: 105,
              exp: 2600,
              gold: 5600
            }],
            boss: null
          }, {
            id: 'weishi_2',
            level: 77,
            name: '荒漠',
            monsters: [{
              name: '荒漠守卫',
              hp: 2900,
              attack: 135,
              defense: 108,
              exp: 2700,
              gold: 5800
            }],
            boss: null
          }, {
            id: 'weishi_3',
            level: 78,
            name: '戈壁',
            monsters: [{
              name: '戈壁守卫',
              hp: 3000,
              attack: 140,
              defense: 110,
              exp: 2800,
              gold: 6000
            }],
            boss: null
          }, {
            id: 'weishi_4',
            level: 79,
            name: '后土神殿',
            monsters: [{
              name: '后土祭司',
              hp: 3100,
              attack: 145,
              defense: 115,
              exp: 2900,
              gold: 6200
            }],
            boss: null
          }, {
            id: 'weishi_5',
            level: 80,
            name: '后土宫',
            monsters: [],
            boss: {
              name: '后土娘娘',
              hp: 10000,
              attack: 220,
              defense: 150,
              exp: 7000,
              gold: 12000,
              drop: '燥土·后土套装',
              dropRate: 0.3
            }
          }, {
            id: 'weishi_6',
            level: 81,
            name: '大地之心',
            monsters: [{
              name: '大地守卫',
              hp: 3200,
              attack: 150,
              defense: 120,
              exp: 3000,
              gold: 6400
            }],
            boss: null
          }, {
            id: 'weishi_7',
            level: 82,
            name: '地脉',
            monsters: [{
              name: '地脉守卫',
              hp: 3300,
              attack: 155,
              defense: 125,
              exp: 3100,
              gold: 6600
            }],
            boss: null
          }, {
            id: 'weishi_8',
            level: 83,
            name: '地核',
            monsters: [{
              name: '地核守卫',
              hp: 3400,
              attack: 160,
              defense: 130,
              exp: 3200,
              gold: 6800
            }],
            boss: null
          }, {
            id: 'weishi_9',
            level: 84,
            name: '九幽',
            monsters: [{
              name: '九幽守卫',
              hp: 3500,
              attack: 165,
              defense: 135,
              exp: 3300,
              gold: 7000
            }],
            boss: null
          }, {
            id: 'weishi_10',
            level: 85,
            name: '幽冥殿',
            monsters: [],
            boss: {
              name: '幽冥大帝',
              hp: 12000,
              attack: 250,
              defense: 170,
              exp: 8000,
              gold: 15000,
              drop: '幽冥珠',
              dropRate: 0.2
            }
          }]
        },
        // 坚金域·申时 (86-95级)
        'shenshi': {
          name: '坚金域·申时',
          element: 'gold',
          levels: [{
            id: 'shenshi_1',
            level: 86,
            name: '金矿深处',
            monsters: [{
              name: '金矿守卫',
              hp: 3600,
              attack: 170,
              defense: 140,
              exp: 3400,
              gold: 7200
            }],
            boss: null
          }, {
            id: 'shenshi_2',
            level: 87,
            name: '金库',
            monsters: [{
              name: '金库守卫',
              hp: 3700,
              attack: 175,
              defense: 145,
              exp: 3500,
              gold: 7400
            }],
            boss: null
          }, {
            id: 'shenshi_3',
            level: 88,
            name: '白虎岭',
            monsters: [{
              name: '白虎守卫',
              hp: 3800,
              attack: 180,
              defense: 150,
              exp: 3600,
              gold: 7600
            }],
            boss: null
          }, {
            id: 'shenshi_4',
            level: 89,
            name: '白虎神殿',
            monsters: [{
              name: '白虎祭司',
              hp: 3900,
              attack: 185,
              defense: 155,
              exp: 3700,
              gold: 7800
            }],
            boss: null
          }, {
            id: 'shenshi_5',
            level: 90,
            name: '白虎顶',
            monsters: [],
            boss: {
              name: '白虎星君',
              hp: 14000,
              attack: 280,
              defense: 190,
              exp: 9000,
              gold: 18000,
              drop: '坚金·白虎套装',
              dropRate: 0.3
            }
          }, {
            id: 'shenshi_6',
            level: 91,
            name: '金刚山',
            monsters: [{
              name: '金刚守卫',
              hp: 4000,
              attack: 190,
              defense: 160,
              exp: 3800,
              gold: 8000
            }],
            boss: null
          }, {
            id: 'shenshi_7',
            level: 92,
            name: '金刚殿',
            monsters: [{
              name: '金刚罗汉',
              hp: 4100,
              attack: 195,
              defense: 165,
              exp: 3900,
              gold: 8200
            }],
            boss: null
          }, {
            id: 'shenshi_8',
            level: 93,
            name: '不周山',
            monsters: [{
              name: '不周守卫',
              hp: 4200,
              attack: 200,
              defense: 170,
              exp: 4000,
              gold: 8400
            }],
            boss: null
          }, {
            id: 'shenshi_9',
            level: 94,
            name: '天柱',
            monsters: [{
              name: '天柱守卫',
              hp: 4300,
              attack: 205,
              defense: 175,
              exp: 4100,
              gold: 8600
            }],
            boss: null
          }, {
            id: 'shenshi_10',
            level: 95,
            name: '天顶',
            monsters: [],
            boss: {
              name: '金刚不坏',
              hp: 16000,
              attack: 300,
              defense: 210,
              exp: 10000,
              gold: 20000,
              drop: '金刚神铁',
              dropRate: 0.2
            }
          }]
        },
        // 泽金域·酉时 (96-99级)
        'youshi': {
          name: '泽金域·酉时',
          element: 'gold',
          levels: [{
            id: 'youshi_1',
            level: 96,
            name: '天宫入口',
            monsters: [{
              name: '天兵',
              hp: 4400,
              attack: 210,
              defense: 180,
              exp: 4200,
              gold: 8800
            }],
            boss: null
          }, {
            id: 'youshi_2',
            level: 97,
            name: '天宫回廊',
            monsters: [{
              name: '天将',
              hp: 4500,
              attack: 215,
              defense: 185,
              exp: 4300,
              gold: 9000
            }],
            boss: null
          }, {
            id: 'youshi_3',
            level: 98,
            name: '凌霄殿前',
            monsters: [{
              name: '凌霄守卫',
              hp: 4600,
              attack: 220,
              defense: 190,
              exp: 4400,
              gold: 9200
            }],
            boss: null
          }, {
            id: 'youshi_4',
            level: 99,
            name: '勾陈宫',
            monsters: [{
              name: '勾陈守卫',
              hp: 4700,
              attack: 225,
              defense: 195,
              exp: 4500,
              gold: 9400
            }],
            boss: null
          }, {
            id: 'youshi_5',
            level: 99,
            name: '勾陈殿',
            monsters: [],
            boss: {
              name: '勾陈大帝',
              hp: 20000,
              attack: 350,
              defense: 250,
              exp: 15000,
              gold: 50000,
              drop: '泽金·勾陈套装',
              dropRate: 0.5
            }
          }]
        },
        // 燥金域·戌时 (100-109级)
        'xushi': {
          name: '燥金域·戌时',
          element: 'gold',
          levels: [{
            id: 'xushi_1',
            level: 100,
            name: '雷霆山',
            monsters: [{
              name: '雷霆守卫',
              hp: 5000,
              attack: 230,
              defense: 200,
              exp: 5000,
              gold: 10000
            }],
            boss: null
          }, {
            id: 'xushi_2',
            level: 102,
            name: '雷霆殿',
            monsters: [{
              name: '雷霆将',
              hp: 5200,
              attack: 240,
              defense: 210,
              exp: 5500,
              gold: 11000
            }],
            boss: null
          }, {
            id: 'xushi_3',
            level: 104,
            name: '雷神殿',
            monsters: [{
              name: '雷神侍从',
              hp: 5400,
              attack: 250,
              defense: 220,
              exp: 6000,
              gold: 12000
            }],
            boss: null
          }, {
            id: 'xushi_4',
            level: 106,
            name: '九天之上',
            monsters: [{
              name: '九天守卫',
              hp: 5600,
              attack: 260,
              defense: 230,
              exp: 6500,
              gold: 13000
            }],
            boss: null
          }, {
            id: 'xushi_5',
            level: 108,
            name: '雷震宝殿',
            monsters: [],
            boss: {
              name: '雷震天尊',
              hp: 25000,
              attack: 400,
              defense: 300,
              exp: 20000,
              gold: 80000,
              drop: '雷霆套装',
              dropRate: 0.3
            }
          }]
        },
        // 流水域·亥时 (110-120级)
        'haishi': {
          name: '流水域·亥时',
          element: 'water',
          levels: [{
            id: 'haishi_1',
            level: 110,
            name: '弱水',
            monsters: [{
              name: '弱水守卫',
              hp: 6000,
              attack: 270,
              defense: 240,
              exp: 7000,
              gold: 15000
            }],
            boss: null
          }, {
            id: 'haishi_2',
            level: 112,
            name: '归墟',
            monsters: [{
              name: '归墟守卫',
              hp: 6200,
              attack: 280,
              defense: 250,
              exp: 7500,
              gold: 16000
            }],
            boss: null
          }, {
            id: 'haishi_3',
            level: 114,
            name: '北冥',
            monsters: [{
              name: '北冥守卫',
              hp: 6400,
              attack: 290,
              defense: 260,
              exp: 8000,
              gold: 17000
            }],
            boss: null
          }, {
            id: 'haishi_4',
            level: 116,
            name: '共工神殿',
            monsters: [{
              name: '共工祭司',
              hp: 6600,
              attack: 300,
              defense: 270,
              exp: 8500,
              gold: 18000
            }],
            boss: null
          }, {
            id: 'haishi_5',
            level: 120,
            name: '共工殿',
            monsters: [],
            boss: {
              name: '共工水神',
              hp: 50000,
              attack: 500,
              defense: 400,
              exp: 50000,
              gold: 200000,
              drop: '流水·共工套装+水神神格',
              dropRate: 1.0
            }
          }]
        }
      });

      _export("default", AdditionalDomainsConfig);

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=55b2ae7e1c4ea27f8c5006b55021f202b60fab98.js.map