System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _crd, EquipmentStatsConfig, SetEffects, DropConfig;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "850f8alCMVMbZj+jilxwPpN", "EquipmentStatsConfig", undefined);

      // 装备详细数值配置
      _export("EquipmentStatsConfig", EquipmentStatsConfig = {
        // 武器 - 拂尘系列
        dusters: [{
          id: 'duster_wood_1',
          name: '桃木拂尘·凡',
          quality: 'common',
          level: 1,
          attack: 10,
          crit: 0,
          element: 'wood',
          price: 100
        }, {
          id: 'duster_wood_2',
          name: '桃木拂尘·灵',
          quality: 'uncommon',
          level: 5,
          attack: 18,
          crit: 0.02,
          element: 'wood',
          price: 300
        }, {
          id: 'duster_wood_3',
          name: '桃木拂尘·精',
          quality: 'rare',
          level: 10,
          attack: 30,
          crit: 0.04,
          element: 'wood',
          price: 800
        }, {
          id: 'duster_bronze_1',
          name: '青铜拂尘·凡',
          quality: 'uncommon',
          level: 15,
          attack: 45,
          crit: 0.03,
          element: 'metal',
          price: 1500
        }, {
          id: 'duster_bronze_2',
          name: '青铜拂尘·灵',
          quality: 'rare',
          level: 20,
          attack: 65,
          crit: 0.05,
          element: 'metal',
          price: 3000
        }, {
          id: 'duster_bronze_3',
          name: '青铜拂尘·精',
          quality: 'epic',
          level: 25,
          attack: 90,
          crit: 0.08,
          element: 'metal',
          price: 6000
        }, {
          id: 'duster_gold_1',
          name: '金身拂尘·凡',
          quality: 'rare',
          level: 30,
          attack: 120,
          crit: 0.06,
          element: 'gold',
          price: 10000
        }, {
          id: 'duster_gold_2',
          name: '金身拂尘·灵',
          quality: 'epic',
          level: 40,
          attack: 160,
          crit: 0.10,
          element: 'gold',
          price: 20000
        }, {
          id: 'duster_gold_3',
          name: '金身拂尘·神',
          quality: 'legendary',
          level: 50,
          attack: 220,
          crit: 0.15,
          element: 'gold',
          price: 50000
        }],
        // 武器 - 算盘系列
        abacuses: [{
          id: 'abacus_wood_1',
          name: '黄花梨算盘',
          quality: 'uncommon',
          level: 8,
          attack: 25,
          crit: 0.05,
          luck: 5,
          price: 500
        }, {
          id: 'abacus_jade_1',
          name: '和田玉算盘',
          quality: 'rare',
          level: 18,
          attack: 55,
          crit: 0.10,
          luck: 10,
          price: 2500
        }, {
          id: 'abacus_gold_1',
          name: '金算盘',
          quality: 'epic',
          level: 35,
          attack: 130,
          crit: 0.12,
          luck: 15,
          gold_bonus: 0.1,
          price: 15000
        }, {
          id: 'abacus_divine_1',
          name: '如意算盘',
          quality: 'legendary',
          level: 55,
          attack: 250,
          crit: 0.20,
          luck: 25,
          gold_bonus: 0.3,
          price: 80000
        }],
        // 武器 - 元宝系列（特殊）
        yuanbaos: [{
          id: 'yuanbao_gold_1',
          name: '金元宝',
          quality: 'epic',
          level: 45,
          attack: 180,
          gold_bonus: 0.15,
          price: 30000
        }, {
          id: 'yuanbao_divine_1',
          name: '聚宝盆',
          quality: 'legendary',
          level: 65,
          attack: 300,
          gold_bonus: 0.5,
          price: 100000
        }],
        // 防具 - 道袍系列
        robes: [{
          id: 'robe_clay_1',
          name: '泥胎道袍',
          quality: 'common',
          level: 1,
          defense: 5,
          hp: 50,
          price: 80
        }, {
          id: 'robe_clay_2',
          name: '粗布道袍',
          quality: 'common',
          level: 3,
          defense: 8,
          hp: 80,
          price: 150
        }, {
          id: 'robe_wood_1',
          name: '木骨法衣',
          quality: 'uncommon',
          level: 10,
          defense: 20,
          hp: 200,
          mana_regen: 1,
          price: 600
        }, {
          id: 'robe_wood_2',
          name: '灵木法衣',
          quality: 'rare',
          level: 15,
          defense: 35,
          hp: 350,
          mana_regen: 2,
          price: 1800
        }, {
          id: 'robe_bronze_1',
          name: '铜身战甲',
          quality: 'rare',
          level: 25,
          defense: 60,
          hp: 600,
          damage_reduce: 0.05,
          price: 5000
        }, {
          id: 'robe_bronze_2',
          name: '青铜战甲',
          quality: 'epic',
          level: 35,
          defense: 95,
          hp: 950,
          damage_reduce: 0.08,
          price: 12000
        }, {
          id: 'robe_gold_1',
          name: '金身圣衣',
          quality: 'epic',
          level: 45,
          defense: 140,
          hp: 1400,
          damage_reduce: 0.12,
          price: 25000
        }, {
          id: 'robe_gold_2',
          name: '不灭金身',
          quality: 'legendary',
          level: 60,
          defense: 220,
          hp: 2200,
          damage_reduce: 0.20,
          price: 80000
        }],
        // 头盔
        helmets: [{
          id: 'helmet_clay_1',
          name: '泥胎头巾',
          quality: 'common',
          level: 1,
          defense: 2,
          hp: 20,
          price: 50
        }, {
          id: 'helmet_wood_1',
          name: '木骨道冠',
          quality: 'uncommon',
          level: 8,
          defense: 10,
          hp: 100,
          mana: 20,
          price: 400
        }, {
          id: 'helmet_bronze_1',
          name: '铜身头盔',
          quality: 'rare',
          level: 20,
          defense: 30,
          hp: 300,
          mana: 50,
          price: 2500
        }, {
          id: 'helmet_gold_1',
          name: '金身宝冠',
          quality: 'epic',
          level: 40,
          defense: 70,
          hp: 700,
          mana: 100,
          price: 15000
        }],
        // 手套
        gloves: [{
          id: 'gloves_clay_1',
          name: '泥胎护腕',
          quality: 'common',
          level: 1,
          defense: 1,
          attack: 2,
          price: 40
        }, {
          id: 'gloves_wood_1',
          name: '木骨手套',
          quality: 'uncommon',
          level: 6,
          defense: 5,
          attack: 8,
          crit: 0.02,
          price: 350
        }, {
          id: 'gloves_bronze_1',
          name: '铜身手甲',
          quality: 'rare',
          level: 18,
          defense: 15,
          attack: 25,
          crit: 0.05,
          price: 2200
        }, {
          id: 'gloves_gold_1',
          name: '金身神手',
          quality: 'epic',
          level: 38,
          defense: 35,
          attack: 60,
          crit: 0.10,
          price: 14000
        }],
        // 靴子
        boots: [{
          id: 'boots_clay_1',
          name: '泥胎布鞋',
          quality: 'common',
          level: 1,
          defense: 1,
          speed: 5,
          price: 40
        }, {
          id: 'boots_wood_1',
          name: '木骨战靴',
          quality: 'uncommon',
          level: 7,
          defense: 6,
          speed: 15,
          dodge: 0.02,
          price: 380
        }, {
          id: 'boots_bronze_1',
          name: '铜身战靴',
          quality: 'rare',
          level: 19,
          defense: 18,
          speed: 30,
          dodge: 0.05,
          price: 2400
        }, {
          id: 'boots_gold_1',
          name: '金身飞靴',
          quality: 'epic',
          level: 39,
          defense: 40,
          speed: 50,
          dodge: 0.10,
          price: 14500
        }],
        // 戒指
        rings: [{
          id: 'ring_luck_1',
          name: '幸运戒指',
          quality: 'uncommon',
          level: 5,
          luck: 5,
          price: 500
        }, {
          id: 'ring_luck_2',
          name: '招财戒指',
          quality: 'rare',
          level: 15,
          luck: 10,
          gold_bonus: 0.05,
          price: 2000
        }, {
          id: 'ring_power_1',
          name: '力量戒指',
          quality: 'rare',
          level: 25,
          attack: 20,
          price: 3500
        }, {
          id: 'ring_defense_1',
          name: '守护戒指',
          quality: 'epic',
          level: 35,
          defense: 30,
          hp: 300,
          price: 10000
        }, {
          id: 'ring_god_1',
          name: '财神戒指',
          quality: 'legendary',
          level: 50,
          luck: 20,
          gold_bonus: 0.15,
          all_stats: 10,
          price: 50000
        }],
        // 项链
        necklaces: [{
          id: 'necklace_mana_1',
          name: '聚灵项链',
          quality: 'uncommon',
          level: 10,
          mana: 30,
          mana_regen: 1,
          price: 600
        }, {
          id: 'necklace_hp_1',
          name: '生命项链',
          quality: 'rare',
          level: 20,
          hp: 500,
          hp_regen: 5,
          price: 2800
        }, {
          id: 'necklace_divine_1',
          name: '护身符',
          quality: 'epic',
          level: 30,
          hp: 800,
          mana: 80,
          all_resist: 0.05,
          price: 8000
        }, {
          id: 'necklace_god_1',
          name: '财神项链',
          quality: 'legendary',
          level: 55,
          hp: 1500,
          mana: 150,
          gold_bonus: 0.1,
          price: 60000
        }],
        // 护符
        charms: [{
          id: 'charm_worship_1',
          name: '供奉护符',
          quality: 'uncommon',
          level: 5,
          worship_bonus: 0.05,
          price: 450
        }, {
          id: 'charm_alms_1',
          name: '化缘护符',
          quality: 'rare',
          level: 15,
          alms_bonus: 0.08,
          price: 1800
        }, {
          id: 'charm_merit_1',
          name: '功德护符',
          quality: 'epic',
          level: 30,
          merit_bonus: 0.10,
          price: 7500
        }, {
          id: 'charm_god_1',
          name: '财神护符',
          quality: 'legendary',
          level: 50,
          worship_bonus: 0.15,
          alms_bonus: 0.15,
          merit_bonus: 0.15,
          price: 55000
        }]
      }); // 装备套装效果


      _export("SetEffects", SetEffects = {
        '沉金·龙宫': {
          count: 3,
          effect: {
            water_damage: 0.2,
            hp_regen: 10
          }
        },
        '蕴土·昆仑': {
          count: 3,
          effect: {
            defense: 0.15,
            max_hp: 0.2
          }
        },
        '生木·蓬莱': {
          count: 3,
          effect: {
            hp_regen: 0.05,
            max_hp: 0.15
          }
        },
        '明火·丹穴': {
          count: 3,
          effect: {
            fire_damage: 0.25,
            attack: 0.1
          }
        },
        '藏金·太白': {
          count: 3,
          effect: {
            crit_rate: 0.08,
            crit_damage: 0.2
          }
        },
        '熔火·祝融': {
          count: 3,
          effect: {
            fire_damage: 0.3,
            attack: 0.15
          }
        },
        '财神套装': {
          count: 5,
          effect: {
            gold_bonus: 0.5,
            luck: 30,
            all_stats: 20
          }
        }
      }); // 掉落配置


      _export("DropConfig", DropConfig = {
        // 普通怪物掉落
        normal: {
          incense_money: {
            min: 10,
            max: 50,
            rate: 1.0
          },
          items: [{
            id: 'incense_sticks',
            rate: 0.3
          }, {
            id: 'candles',
            rate: 0.2
          }, {
            id: 'gold_paper',
            rate: 0.1
          }, {
            id: 'fruits',
            rate: 0.1
          }],
          equipment: {
            rate: 0.05,
            quality: 'common'
          }
        },
        // BOSS掉落
        boss: {
          incense_money: {
            min: 100,
            max: 500,
            rate: 1.0
          },
          set_piece: {
            rate: 0.3
          },
          rare_equipment: {
            rate: 0.2
          },
          special_item: {
            rate: 0.1
          }
        }
      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=be6e60e9790012652866a08680b007d036fe8bfa.js.map