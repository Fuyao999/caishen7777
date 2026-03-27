System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _crd, SceneConfig;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "ee83ffwNgdHSLVPC7NqZT0e", "SceneConfig", undefined);

      // 场景配置
      _export("SceneConfig", SceneConfig = {
        // 十二财域
        domains: {
          'zishi': {
            id: 'zishi',
            name: '沉金域·子时',
            levelRange: '6-15',
            boss: {
              name: '东海龙王',
              element: '水',
              reward: '沉金·龙宫套装'
            },
            desc: '子时水旺，龙宫深处藏珍宝'
          },
          'choushi': {
            id: 'choushi',
            name: '蕴土域·丑时',
            levelRange: '16-25',
            boss: {
              name: '地母元君',
              element: '土',
              reward: '蕴土·昆仑套装'
            },
            desc: '丑时土藏，昆仑山腹孕灵珠'
          },
          'yinshi': {
            id: 'yinshi',
            name: '生木域·寅时',
            levelRange: '26-35',
            boss: {
              name: '句芒神君',
              element: '木',
              reward: '生木·蓬莱套装'
            },
            desc: '寅时木生，蓬莱仙境觅仙缘'
          },
          'maoshi': {
            id: 'maoshi',
            name: '明火域·卯时',
            levelRange: '36-45',
            boss: {
              name: '祝融火神',
              element: '火',
              reward: '明火·丹穴套装'
            },
            desc: '卯时火明，丹穴山中有凤凰'
          },
          'chenshi': {
            id: 'chenshi',
            name: '藏金域·辰时',
            levelRange: '46-55',
            boss: {
              name: '太白金星',
              element: '金',
              reward: '藏金·太白套装'
            },
            desc: '辰时金藏，太白仙山取真金'
          },
          'sishi': {
            id: 'sishi',
            name: '熔火域·巳时',
            levelRange: '56-65',
            boss: {
              name: '火德星君',
              element: '火',
              reward: '熔火·祝融套装'
            },
            desc: '巳时火旺，祝融圣殿取火种'
          },
          'wushi': {
            id: 'wushi',
            name: '聚火域·午时',
            levelRange: '66-75',
            boss: {
              name: '炎帝神农',
              element: '火',
              reward: '聚火·神农套装'
            },
            desc: '午时火极，神农架下寻百草'
          },
          'weishi': {
            id: 'weishi',
            name: '燥土域·未时',
            levelRange: '76-85',
            boss: {
              name: '后土娘娘',
              element: '土',
              reward: '燥土·后土套装'
            },
            desc: '未时土燥，后土神殿镇四方'
          },
          'shenshi': {
            id: 'shenshi',
            name: '坚金域·申时',
            levelRange: '86-95',
            boss: {
              name: '白虎星君',
              element: '金',
              reward: '坚金·白虎套装'
            },
            desc: '申时金坚，白虎岭上战群妖'
          },
          'youshi': {
            id: 'youshi',
            name: '泽金域·酉时',
            levelRange: '96-99',
            boss: {
              name: '勾陈大帝',
              element: '金',
              reward: '泽金·勾陈套装'
            },
            desc: '酉时金泽，勾陈天宫取神器'
          },
          'xushi': {
            id: 'xushi',
            name: '燥金域·戌时',
            levelRange: '100-109',
            boss: {
              name: '雷震天尊',
              element: '金',
              reward: '燥金·雷霆套装'
            },
            desc: '戌时金燥，雷霆宝殿镇妖魔'
          },
          'haishi': {
            id: 'haishi',
            name: '流水域·亥时',
            levelRange: '110-120',
            boss: {
              name: '共工水神',
              element: '水',
              reward: '流水·共工套装'
            },
            desc: '亥时水流，共工神殿取神水'
          }
        },
        // 出生时辰加成
        birthHours: {
          'zishi': {
            name: '子时',
            buff: '水',
            effect: 'water_damage',
            value: 0.1
          },
          'choushi': {
            name: '丑时',
            buff: '土',
            effect: 'defense',
            value: 0.1
          },
          'yinshi': {
            name: '寅时',
            buff: '木',
            effect: 'hp_regen',
            value: 0.05
          },
          'maoshi': {
            name: '卯时',
            buff: '木',
            effect: 'crit_rate',
            value: 0.05
          },
          'chenshi': {
            name: '辰时',
            buff: '土',
            effect: 'max_hp',
            value: 0.1
          },
          'sishi': {
            name: '巳时',
            buff: '火',
            effect: 'fire_damage',
            value: 0.1
          },
          'wushi': {
            name: '午时',
            buff: '火',
            effect: 'attack',
            value: 0.1
          },
          'weishi': {
            name: '未时',
            buff: '土',
            effect: 'resistance',
            value: 0.1
          },
          'shenshi': {
            name: '申时',
            buff: '金',
            effect: 'crit_damage',
            value: 0.2
          },
          'youshi': {
            name: '酉时',
            buff: '金',
            effect: 'dodge',
            value: 0.05
          },
          'xushi': {
            name: '戌时',
            buff: '土',
            effect: 'armor',
            value: 0.1
          },
          'haishi': {
            name: '亥时',
            buff: '水',
            effect: 'mana_regen',
            value: 0.1
          }
        }
      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=7c6935173c32725610cac22f1ac8aaca2d70a7ad.js.map