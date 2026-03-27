System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _crd, LevelConfig;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "07067fksYNGk7g497SDhllX", "LevelConfig", undefined);

      // 关卡配置 - 十二财域详细关卡
      _export("LevelConfig", LevelConfig = {
        // 沉金域·子时 (6-15级)
        'zishi': {
          name: '沉金域·子时',
          element: 'water',
          levels: [{
            id: 'zishi_1',
            level: 6,
            name: '龙宫入口',
            monsters: [{
              name: '虾兵',
              hp: 80,
              attack: 15,
              defense: 5,
              exp: 20,
              gold: 50
            }],
            boss: null
          }, {
            id: 'zishi_2',
            level: 7,
            name: '水晶回廊',
            monsters: [{
              name: '蟹将',
              hp: 100,
              attack: 18,
              defense: 6,
              exp: 25,
              gold: 60
            }],
            boss: null
          }, {
            id: 'zishi_3',
            level: 8,
            name: '珊瑚迷宫',
            monsters: [{
              name: '章鱼怪',
              hp: 120,
              attack: 20,
              defense: 7,
              exp: 30,
              gold: 70
            }],
            boss: null
          }, {
            id: 'zishi_4',
            level: 9,
            name: '珍珠殿前',
            monsters: [{
              name: '鱼人士兵',
              hp: 140,
              attack: 22,
              defense: 8,
              exp: 35,
              gold: 80
            }],
            boss: null
          }, {
            id: 'zishi_5',
            level: 10,
            name: '龙王宝座',
            monsters: [],
            boss: {
              name: '东海龙王',
              hp: 500,
              attack: 40,
              defense: 15,
              exp: 200,
              gold: 500,
              drop: '沉金·龙宫套装',
              dropRate: 0.3
            }
          }, {
            id: 'zishi_6',
            level: 11,
            name: '深海秘境',
            monsters: [{
              name: '深海巨兽',
              hp: 160,
              attack: 25,
              defense: 10,
              exp: 45,
              gold: 100
            }],
            boss: null
          }, {
            id: 'zishi_7',
            level: 12,
            name: '寒冰深渊',
            monsters: [{
              name: '冰魄妖',
              hp: 180,
              attack: 28,
              defense: 12,
              exp: 50,
              gold: 120
            }],
            boss: null
          }, {
            id: 'zishi_8',
            level: 13,
            name: '漩涡之眼',
            monsters: [{
              name: '漩涡守卫',
              hp: 200,
              attack: 30,
              defense: 14,
              exp: 60,
              gold: 150
            }],
            boss: null
          }, {
            id: 'zishi_9',
            level: 14,
            name: '海神祭坛',
            monsters: [{
              name: '海神侍从',
              hp: 220,
              attack: 32,
              defense: 16,
              exp: 70,
              gold: 200
            }],
            boss: null
          }, {
            id: 'zishi_10',
            level: 15,
            name: '定海神针',
            monsters: [],
            boss: {
              name: '定海大圣',
              hp: 800,
              attack: 50,
              defense: 20,
              exp: 300,
              gold: 800,
              drop: '定海神针',
              dropRate: 0.2
            }
          }]
        },
        // 蕴土域·丑时 (16-25级)
        'choushi': {
          name: '蕴土域·丑时',
          element: 'earth',
          levels: [{
            id: 'choushi_1',
            level: 16,
            name: '昆仑山脚',
            monsters: [{
              name: '山精',
              hp: 250,
              attack: 35,
              defense: 18,
              exp: 80,
              gold: 250
            }],
            boss: null
          }, {
            id: 'choushi_2',
            level: 17,
            name: '石林迷宫',
            monsters: [{
              name: '石怪',
              hp: 280,
              attack: 38,
              defense: 20,
              exp: 90,
              gold: 280
            }],
            boss: null
          }, {
            id: 'choushi_3',
            level: 18,
            name: '土灵洞穴',
            monsters: [{
              name: '土灵',
              hp: 300,
              attack: 40,
              defense: 22,
              exp: 100,
              gold: 300
            }],
            boss: null
          }, {
            id: 'choushi_4',
            level: 19,
            name: '矿山深处',
            monsters: [{
              name: '矿工幽魂',
              hp: 320,
              attack: 42,
              defense: 24,
              exp: 110,
              gold: 350
            }],
            boss: null
          }, {
            id: 'choushi_5',
            level: 20,
            name: '昆仑主峰',
            monsters: [],
            boss: {
              name: '地母元君',
              hp: 1200,
              attack: 60,
              defense: 30,
              exp: 500,
              gold: 1200,
              drop: '蕴土·昆仑套装',
              dropRate: 0.3
            }
          }, {
            id: 'choushi_6',
            level: 21,
            name: '岩浆地道',
            monsters: [{
              name: '岩浆怪',
              hp: 350,
              attack: 45,
              defense: 25,
              exp: 130,
              gold: 400
            }],
            boss: null
          }, {
            id: 'choushi_7',
            level: 22,
            name: '地下宫殿',
            monsters: [{
              name: '地宫守卫',
              hp: 380,
              attack: 48,
              defense: 28,
              exp: 150,
              gold: 450
            }],
            boss: null
          }, {
            id: 'choushi_8',
            level: 23,
            name: '宝石矿脉',
            monsters: [{
              name: '宝石兽',
              hp: 400,
              attack: 50,
              defense: 30,
              exp: 170,
              gold: 500
            }],
            boss: null
          }, {
            id: 'choushi_9',
            level: 24,
            name: '地心入口',
            monsters: [{
              name: '地心守卫',
              hp: 420,
              attack: 52,
              defense: 32,
              exp: 200,
              gold: 600
            }],
            boss: null
          }, {
            id: 'choushi_10',
            level: 25,
            name: '地心核心',
            monsters: [],
            boss: {
              name: '大地之灵',
              hp: 1500,
              attack: 70,
              defense: 35,
              exp: 700,
              gold: 1500,
              drop: '大地之心',
              dropRate: 0.2
            }
          }]
        },
        // 生木域·寅时 (26-35级)
        'yinshi': {
          name: '生木域·寅时',
          element: 'wood',
          levels: [{
            id: 'yinshi_1',
            level: 26,
            name: '蓬莱仙岛',
            monsters: [{
              name: '仙鹤',
              hp: 450,
              attack: 55,
              defense: 35,
              exp: 220,
              gold: 650
            }],
            boss: null
          }, {
            id: 'yinshi_2',
            level: 27,
            name: '桃花园林',
            monsters: [{
              name: '桃花妖',
              hp: 480,
              attack: 58,
              defense: 38,
              exp: 250,
              gold: 700
            }],
            boss: null
          }, {
            id: 'yinshi_3',
            level: 28,
            name: '古树森林',
            monsters: [{
              name: '树人',
              hp: 500,
              attack: 60,
              defense: 40,
              exp: 280,
              gold: 750
            }],
            boss: null
          }, {
            id: 'yinshi_4',
            level: 29,
            name: '藤蔓沼泽',
            monsters: [{
              name: '食人花',
              hp: 530,
              attack: 62,
              defense: 42,
              exp: 310,
              gold: 800
            }],
            boss: null
          }, {
            id: 'yinshi_5',
            level: 30,
            name: '蓬莱仙宫',
            monsters: [],
            boss: {
              name: '句芒神君',
              hp: 1800,
              attack: 80,
              defense: 45,
              exp: 900,
              gold: 1800,
              drop: '生木·蓬莱套装',
              dropRate: 0.3
            }
          }, {
            id: 'yinshi_6',
            level: 31,
            name: '竹林深处',
            monsters: [{
              name: '竹妖',
              hp: 560,
              attack: 65,
              defense: 45,
              exp: 350,
              gold: 850
            }],
            boss: null
          }, {
            id: 'yinshi_7',
            level: 32,
            name: '灵芝山谷',
            monsters: [{
              name: '灵芝兽',
              hp: 600,
              attack: 68,
              defense: 48,
              exp: 400,
              gold: 900
            }],
            boss: null
          }, {
            id: 'yinshi_8',
            level: 33,
            name: '万年古树',
            monsters: [{
              name: '树精长老',
              hp: 650,
              attack: 72,
              defense: 50,
              exp: 450,
              gold: 1000
            }],
            boss: null
          }, {
            id: 'yinshi_9',
            level: 34,
            name: '生命之泉',
            monsters: [{
              name: '泉水精灵',
              hp: 700,
              attack: 75,
              defense: 52,
              exp: 500,
              gold: 1100
            }],
            boss: null
          }, {
            id: 'yinshi_10',
            level: 35,
            name: '世界树顶',
            monsters: [],
            boss: {
              name: '世界树灵',
              hp: 2200,
              attack: 90,
              defense: 55,
              exp: 1100,
              gold: 2200,
              drop: '世界树枝',
              dropRate: 0.2
            }
          }]
        },
        // 明火域·卯时 (36-45级)
        'maoshi': {
          name: '明火域·卯时',
          element: 'fire',
          levels: [{
            id: 'maoshi_1',
            level: 36,
            name: '丹穴山脚',
            monsters: [{
              name: '火狐',
              hp: 750,
              attack: 78,
              defense: 55,
              exp: 550,
              gold: 1200
            }],
            boss: null
          }, {
            id: 'maoshi_2',
            level: 37,
            name: '岩浆河流',
            monsters: [{
              name: '岩浆怪',
              hp: 800,
              attack: 82,
              defense: 58,
              exp: 600,
              gold: 1300
            }],
            boss: null
          }, {
            id: 'maoshi_3',
            level: 38,
            name: '火焰峡谷',
            monsters: [{
              name: '火元素',
              hp: 850,
              attack: 85,
              defense: 60,
              exp: 650,
              gold: 1400
            }],
            boss: null
          }, {
            id: 'maoshi_4',
            level: 39,
            name: '凤凰栖息地',
            monsters: [{
              name: '火鸟',
              hp: 900,
              attack: 88,
              defense: 62,
              exp: 700,
              gold: 1500
            }],
            boss: null
          }, {
            id: 'maoshi_5',
            level: 40,
            name: '丹穴山顶',
            monsters: [],
            boss: {
              name: '祝融火神',
              hp: 2500,
              attack: 100,
              defense: 65,
              exp: 1300,
              gold: 2500,
              drop: '明火·丹穴套装',
              dropRate: 0.3
            }
          }, {
            id: 'maoshi_6',
            level: 41,
            name: '火山口',
            monsters: [{
              name: '火山兽',
              hp: 950,
              attack: 92,
              defense: 68,
              exp: 750,
              gold: 1600
            }],
            boss: null
          }, {
            id: 'maoshi_7',
            level: 42,
            name: '岩浆湖',
            monsters: [{
              name: '岩浆巨龙',
              hp: 1000,
              attack: 95,
              defense: 70,
              exp: 800,
              gold: 1700
            }],
            boss: null
          }, {
            id: 'maoshi_8',
            level: 43,
            name: '烈焰深渊',
            monsters: [{
              name: '深渊恶魔',
              hp: 1050,
              attack: 98,
              defense: 72,
              exp: 850,
              gold: 1800
            }],
            boss: null
          }, {
            id: 'maoshi_9',
            level: 44,
            name: '太阳祭坛',
            monsters: [{
              name: '太阳守卫',
              hp: 1100,
              attack: 100,
              defense: 75,
              exp: 900,
              gold: 1900
            }],
            boss: null
          }, {
            id: 'maoshi_10',
            level: 45,
            name: '太阳核心',
            monsters: [],
            boss: {
              name: '太阳神鸟',
              hp: 3000,
              attack: 110,
              defense: 80,
              exp: 1500,
              gold: 3000,
              drop: '太阳真火',
              dropRate: 0.2
            }
          }]
        },
        // 藏金域·辰时 (46-55级)
        'chenshi': {
          name: '藏金域·辰时',
          element: 'gold',
          levels: [{
            id: 'chenshi_1',
            level: 46,
            name: '太白山下',
            monsters: [{
              name: '金甲虫',
              hp: 1150,
              attack: 105,
              defense: 78,
              exp: 950,
              gold: 2000
            }],
            boss: null
          }, {
            id: 'chenshi_2',
            level: 47,
            name: '金矿隧道',
            monsters: [{
              name: '金矿工',
              hp: 1200,
              attack: 108,
              defense: 80,
              exp: 1000,
              gold: 2100
            }],
            boss: null
          }, {
            id: 'chenshi_3',
            level: 48,
            name: '宝藏密室',
            monsters: [{
              name: '宝藏守卫',
              hp: 1250,
              attack: 112,
              defense: 82,
              exp: 1050,
              gold: 2200
            }],
            boss: null
          }, {
            id: 'chenshi_4',
            level: 49,
            name: '剑冢',
            monsters: [{
              name: '剑灵',
              hp: 1300,
              attack: 115,
              defense: 85,
              exp: 1100,
              gold: 2300
            }],
            boss: null
          }, {
            id: 'chenshi_5',
            level: 50,
            name: '太白仙宫',
            monsters: [],
            boss: {
              name: '太白金星',
              hp: 3500,
              attack: 120,
              defense: 90,
              exp: 1700,
              gold: 3500,
              drop: '藏金·太白套装',
              dropRate: 0.3
            }
          }, {
            id: 'chenshi_6',
            level: 51,
            name: '金库',
            monsters: [{
              name: '金库守卫',
              hp: 1350,
              attack: 118,
              defense: 88,
              exp: 1150,
              gold: 2400
            }],
            boss: null
          }, {
            id: 'chenshi_7',
            level: 52,
            name: '铸剑池',
            monsters: [{
              name: '铸剑师',
              hp: 1400,
              attack: 122,
              defense: 90,
              exp: 1200,
              gold: 2500
            }],
            boss: null
          }, {
            id: 'chenshi_8',
            level: 53,
            name: '神兵阁',
            monsters: [{
              name: '神兵守护者',
              hp: 1450,
              attack: 125,
              defense: 92,
              exp: 1250,
              gold: 2600
            }],
            boss: null
          }, {
            id: 'chenshi_9',
            level: 54,
            name: '金刚殿',
            monsters: [{
              name: '金刚罗汉',
              hp: 1500,
              attack: 128,
              defense: 95,
              exp: 1300,
              gold: 2700
            }],
            boss: null
          }, {
            id: 'chenshi_10',
            level: 55,
            name: '金刚顶',
            monsters: [],
            boss: {
              name: '金刚不坏',
              hp: 4000,
              attack: 135,
              defense: 100,
              exp: 1900,
              gold: 4000,
              drop: '金刚舍利',
              dropRate: 0.2
            }
          }]
        },
        // 熔火域·巳时 (56-65级)
        'sishi': {
          name: '熔火域·巳时',
          element: 'fire',
          levels: [{
            id: 'sishi_1',
            level: 56,
            name: '祝融神殿',
            monsters: [{
              name: '火神侍卫',
              hp: 1550,
              attack: 132,
              defense: 98,
              exp: 1350,
              gold: 2800
            }],
            boss: null
          }, {
            id: 'sishi_2',
            level: 57,
            name: '熔岩地狱',
            monsters: [{
              name: '地狱火',
              hp: 1600,
              attack: 135,
              defense: 100,
              exp: 1400,
              gold: 2900
            }],
            boss: null
          }, {
            id: 'sishi_3',
            level: 58,
            name: '火焰山',
            monsters: [{
              name: '火焰精',
              hp: 1650,
              attack: 138,
              defense: 102,
              exp: 1450,
              gold: 3000
            }],
            boss: null
          }, {
            id: 'sishi_4',
            level: 59,
            name: '三昧真火',
            monsters: [{
              name: '三昧火灵',
              hp: 1700,
              attack: 142,
              defense: 105,
              exp: 1500,
              gold: 3100
            }],
            boss: null
          }, {
            id: 'sishi_5',
            level: 60,
            name: '祝融圣殿',
            monsters: [],
            boss: {
              name: '火德星君',
              hp: 4500,
              attack: 150,
              defense: 110,
              exp: 2100,
              gold: 4500,
              drop: '熔火·祝融套装',
              dropRate: 0.3
            }
          }, {
            id: 'sishi_6',
            level: 61,
            name: '火海',
            monsters: [{
              name: '火海怪物',
              hp: 1750,
              attack: 148,
              defense: 108,
              exp: 1550,
              gold: 3200
            }],
            boss: null
          }, {
            id: 'sishi_7',
            level: 62,
            name: '火源',
            monsters: [{
              name: '火源守护者',
              hp: 1800,
              attack: 152,
              defense: 112,
              exp: 1600,
              gold: 3300
            }],
            boss: null
          }, {
            id: 'sishi_8',
            level: 63,
            name: '炎帝陵',
            monsters: [{
              name: '炎帝侍卫',
              hp: 1850,
              attack: 155,
              defense: 115,
              exp: 1650,
              gold: 3400
            }],
            boss: null
          }, {
            id: 'sishi_9',
            level: 64,
            name: '神农架',
            monsters: [{
              name: '神农守卫',
              hp: 1900,
              attack: 158,
              defense: 118,
              exp: 1700,
              gold: 3500
            }],
            boss: null
          }, {
            id: 'sishi_10',
            level: 65,
            name: '炎帝殿',
            monsters: [],
            boss: {
              name: '炎帝神农',
              hp: 5000,
              attack: 165,
              defense: 120,
              exp: 2300,
              gold: 5000,
              drop: '神农鼎',
              dropRate: 0.2
            }
          }]
        } // 继续写其他6个财域...

      }); // 导出完整配置


      _export("default", LevelConfig);

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=3402b472d4a003bea0cfcdf2b5aad5c0149628c7.js.map