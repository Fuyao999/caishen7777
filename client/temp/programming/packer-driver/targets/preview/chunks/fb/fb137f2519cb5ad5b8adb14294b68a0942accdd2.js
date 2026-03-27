System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _crd, PetConfig;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "914ebDwk8NInoqqq+xScvmX", "PetConfig", undefined);

      // 灵兽配置
      _export("PetConfig", PetConfig = {
        // 灵兽品质
        qualities: {
          common: {
            name: '普通',
            color: '#95a5a6',
            maxGrowth: 1.0
          },
          uncommon: {
            name: '精良',
            color: '#2ecc71',
            maxGrowth: 1.2
          },
          rare: {
            name: '稀有',
            color: '#3498db',
            maxGrowth: 1.5
          },
          epic: {
            name: '史诗',
            color: '#9b59b6',
            maxGrowth: 2.0
          },
          legendary: {
            name: '传说',
            color: '#f39c12',
            maxGrowth: 3.0
          }
        },
        // 灵兽类型
        types: {
          attack: {
            name: '攻击型',
            desc: '擅长物理攻击',
            bonus: {
              attack: 0.2
            }
          },
          defense: {
            name: '防御型',
            desc: '擅长抵挡伤害',
            bonus: {
              defense: 0.2
            }
          },
          support: {
            name: '辅助型',
            desc: '擅长增益队友',
            bonus: {
              hp_regen: 0.1
            }
          },
          control: {
            name: '控制型',
            desc: '擅长控制敌人',
            bonus: {
              crit_rate: 0.05
            }
          }
        },
        // 灵兽列表（32只）
        pets: {
          // 普通灵兽（1-10级）
          'pet_001': {
            id: 'pet_001',
            name: '招财猫',
            type: 'support',
            quality: 'common',
            level: 5,
            skill: '招财',
            desc: '据说能招来财运'
          },
          'pet_002': {
            id: 'pet_002',
            name: '锦鲤',
            type: 'support',
            quality: 'common',
            level: 5,
            skill: '幸运',
            desc: '带来好运的锦鲤'
          },
          'pet_003': {
            id: 'pet_003',
            name: '金蟾',
            type: 'attack',
            quality: 'common',
            level: 8,
            skill: '吐钱',
            desc: '三足金蟾，招财进宝'
          },
          'pet_004': {
            id: 'pet_004',
            name: '貔貅',
            type: 'defense',
            quality: 'common',
            level: 10,
            skill: '守财',
            desc: '只进不出的神兽'
          },
          // 精良灵兽（10-30级）
          'pet_005': {
            id: 'pet_005',
            name: '青蛇',
            type: 'control',
            quality: 'uncommon',
            level: 15,
            skill: '缠绕',
            desc: '修炼百年的青蛇'
          },
          'pet_006': {
            id: 'pet_006',
            name: '火狐',
            type: 'attack',
            quality: 'uncommon',
            level: 18,
            skill: '火球',
            desc: '九尾狐的后代'
          },
          'pet_007': {
            id: 'pet_007',
            name: '玄龟',
            type: 'defense',
            quality: 'uncommon',
            level: 20,
            skill: '护甲',
            desc: '千年玄龟，防御惊人'
          },
          'pet_008': {
            id: 'pet_008',
            name: '仙鹤',
            type: 'support',
            quality: 'uncommon',
            level: 22,
            skill: '治疗',
            desc: '仙山仙鹤，治愈万物'
          },
          // 稀有灵兽（30-50级）
          'pet_009': {
            id: 'pet_009',
            name: '白虎',
            type: 'attack',
            quality: 'rare',
            level: 35,
            skill: '猛虎下山',
            desc: '西方神兽，威风凛凛'
          },
          'pet_010': {
            id: 'pet_010',
            name: '青龙',
            type: 'control',
            quality: 'rare',
            level: 38,
            skill: '龙息',
            desc: '东方神兽，呼风唤雨'
          },
          'pet_011': {
            id: 'pet_011',
            name: '朱雀',
            type: 'attack',
            quality: 'rare',
            level: 40,
            skill: '涅槃',
            desc: '南方神兽，浴火重生'
          },
          'pet_012': {
            id: 'pet_012',
            name: '玄武',
            type: 'defense',
            quality: 'rare',
            level: 42,
            skill: '龟息',
            desc: '北方神兽，坚不可摧'
          },
          // 史诗灵兽（50-80级）
          'pet_013': {
            id: 'pet_013',
            name: '麒麟',
            type: 'support',
            quality: 'epic',
            level: 55,
            skill: '祥瑞',
            desc: '祥瑞之兽，福泽绵长'
          },
          'pet_014': {
            id: 'pet_014',
            name: '凤凰',
            type: 'attack',
            quality: 'epic',
            level: 60,
            skill: '凤舞九天',
            desc: '百鸟之王，涅盘重生'
          },
          'pet_015': {
            id: 'pet_015',
            name: '应龙',
            type: 'attack',
            quality: 'epic',
            level: 65,
            skill: '龙威',
            desc: '上古神龙，威震四方'
          },
          'pet_016': {
            id: 'pet_016',
            name: '白泽',
            type: 'support',
            quality: 'epic',
            level: 70,
            skill: '通灵',
            desc: '通晓万物，趋吉避凶'
          },
          // 传说灵兽（80-99级）
          'pet_017': {
            id: 'pet_017',
            name: '烛龙',
            type: 'control',
            quality: 'legendary',
            level: 85,
            skill: '日月更替',
            desc: '睁眼为昼，闭眼为夜'
          },
          'pet_018': {
            id: 'pet_018',
            name: '穷奇',
            type: 'attack',
            quality: 'legendary',
            level: 88,
            skill: '凶威',
            desc: '四大凶兽之一'
          },
          'pet_019': {
            id: 'pet_019',
            name: '混沌',
            type: 'defense',
            quality: 'legendary',
            level: 90,
            skill: '虚无',
            desc: '四大凶兽之一'
          },
          'pet_020': {
            id: 'pet_020',
            name: '饕餮',
            type: 'attack',
            quality: 'legendary',
            level: 92,
            skill: '吞噬',
            desc: '四大凶兽之一'
          },
          // 其他灵兽（填满32只）
          'pet_021': {
            id: 'pet_021',
            name: '金翅大鹏',
            type: 'attack',
            quality: 'epic',
            level: 58,
            skill: '天翔',
            desc: '展翅万里，速度无双'
          },
          'pet_022': {
            id: 'pet_022',
            name: '九尾妖狐',
            type: 'control',
            quality: 'epic',
            level: 62,
            skill: '魅惑',
            desc: '媚惑众生，倾国倾城'
          },
          'pet_023': {
            id: 'pet_023',
            name: '墨麒麟',
            type: 'defense',
            quality: 'epic',
            level: 68,
            skill: '墨守',
            desc: '黑色麒麟，守护之力'
          },
          'pet_024': {
            id: 'pet_024',
            name: '雷震子',
            type: 'attack',
            quality: 'rare',
            level: 45,
            skill: '雷击',
            desc: '雷部正神，掌控雷电'
          },
          'pet_025': {
            id: 'pet_025',
            name: '哪吒',
            type: 'attack',
            quality: 'epic',
            level: 72,
            skill: '三昧真火',
            desc: '三坛海会大神'
          },
          'pet_026': {
            id: 'pet_026',
            name: '二郎神',
            type: 'attack',
            quality: 'legendary',
            level: 95,
            skill: '天眼',
            desc: '显圣真君，三眼观世'
          },
          'pet_027': {
            id: 'pet_027',
            name: '孙悟空',
            type: 'attack',
            quality: 'legendary',
            level: 98,
            skill: '如意金箍',
            desc: '齐天大圣，斗战胜佛'
          },
          'pet_028': {
            id: 'pet_028',
            name: '牛魔王',
            type: 'defense',
            quality: 'epic',
            level: 66,
            skill: '蛮力',
            desc: '平天大圣，力大无穷'
          },
          'pet_029': {
            id: 'pet_029',
            name: '铁扇公主',
            type: 'control',
            quality: 'rare',
            level: 48,
            skill: '芭蕉扇',
            desc: '火焰山主，一扇灭火'
          },
          'pet_030': {
            id: 'pet_030',
            name: '红孩儿',
            type: 'attack',
            quality: 'uncommon',
            level: 28,
            skill: '三昧火',
            desc: '圣婴大王，火焰神通'
          },
          'pet_031': {
            id: 'pet_031',
            name: '小龙女',
            type: 'support',
            quality: 'rare',
            level: 44,
            skill: '甘霖',
            desc: '龙宫公主，普降甘霖'
          },
          'pet_032': {
            id: 'pet_032',
            name: '财神本尊',
            type: 'support',
            quality: 'legendary',
            level: 99,
            skill: '财源滚滚',
            desc: '财神显灵，财运亨通'
          }
        },
        // 灵兽技能
        skills: {
          '招财': {
            type: 'passive',
            effect: 'incense_money_bonus',
            value: 0.1,
            desc: '增加香火钱获取10%'
          },
          '幸运': {
            type: 'passive',
            effect: 'crit_rate',
            value: 0.05,
            desc: '增加暴击率5%'
          },
          '吐钱': {
            type: 'active',
            effect: 'gold_attack',
            value: 1.5,
            desc: '吐出金币攻击敌人'
          },
          '守财': {
            type: 'passive',
            effect: 'damage_reduce',
            value: 0.1,
            desc: '减少受到伤害10%'
          },
          '缠绕': {
            type: 'active',
            effect: 'stun',
            value: 2,
            desc: '缠绕敌人2回合'
          },
          '火球': {
            type: 'active',
            effect: 'fire_damage',
            value: 2.0,
            desc: '释放火球造成200%伤害'
          },
          '护甲': {
            type: 'passive',
            effect: 'defense_bonus',
            value: 0.2,
            desc: '增加防御20%'
          },
          '治疗': {
            type: 'active',
            effect: 'heal',
            value: 0.3,
            desc: '恢复30%生命值'
          },
          '猛虎下山': {
            type: 'active',
            effect: 'physical_damage',
            value: 3.0,
            desc: '造成300%物理伤害'
          },
          '龙息': {
            type: 'active',
            effect: 'water_damage',
            value: 2.5,
            desc: '造成250%水属性伤害'
          },
          '涅槃': {
            type: 'passive',
            effect: 'revive',
            value: 1,
            desc: '死亡后复活一次'
          },
          '龟息': {
            type: 'passive',
            effect: 'hp_regen',
            value: 0.05,
            desc: '每回合恢复5%生命'
          },
          '祥瑞': {
            type: 'passive',
            effect: 'all_stats',
            value: 0.1,
            desc: '全属性增加10%'
          },
          '凤舞九天': {
            type: 'active',
            effect: 'aoe_damage',
            value: 2.0,
            desc: '对所有敌人造成200%伤害'
          },
          '龙威': {
            type: 'passive',
            effect: 'attack_bonus',
            value: 0.25,
            desc: '增加攻击25%'
          },
          '通灵': {
            type: 'passive',
            effect: 'exp_bonus',
            value: 0.2,
            desc: '增加经验获取20%'
          },
          '日月更替': {
            type: 'active',
            effect: 'time_stop',
            value: 1,
            desc: '停止时间1回合'
          },
          '凶威': {
            type: 'passive',
            effect: 'crit_damage',
            value: 0.5,
            desc: '增加暴击伤害50%'
          },
          '虚无': {
            type: 'passive',
            effect: 'dodge',
            value: 0.15,
            desc: '增加闪避15%'
          },
          '吞噬': {
            type: 'active',
            effect: 'life_steal',
            value: 0.3,
            desc: '造成伤害的30%转化为生命'
          },
          '财源滚滚': {
            type: 'passive',
            effect: 'all_currency',
            value: 0.5,
            desc: '所有货币获取增加50%'
          }
        },
        // 捕捉配置
        capture: {
          baseRate: 0.3,
          // 基础捕捉率30%
          baitBonus: 0.2,
          // 诱饵加成20%
          trapBonus: 0.3,
          // 陷阱加成30%
          hpBonus: 0.4 // 残血加成40%

        },
        // 进化配置
        evolution: {
          maxStage: 5,
          costs: [{
            pet_food: 10,
            incense_money: 1000
          }, {
            pet_food: 50,
            incense_money: 5000
          }, {
            pet_food: 200,
            incense_money: 20000
          }, {
            pet_food: 500,
            incense_money: 100000
          }]
        }
      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=fb137f2519cb5ad5b8adb14294b68a0942accdd2.js.map