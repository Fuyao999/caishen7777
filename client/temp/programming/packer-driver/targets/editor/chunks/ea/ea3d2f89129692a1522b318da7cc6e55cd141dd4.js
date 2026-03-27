System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _crd, EquipmentConfig;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "ec930lBr8FJ24jYgCnWLKGU", "EquipmentConfig", undefined);

      // 装备配置
      _export("EquipmentConfig", EquipmentConfig = {
        // 品质
        qualities: {
          common: {
            name: '普通',
            color: '#95a5a6',
            multiplier: 1.0
          },
          uncommon: {
            name: '精良',
            color: '#2ecc71',
            multiplier: 1.2
          },
          rare: {
            name: '稀有',
            color: '#3498db',
            multiplier: 1.5
          },
          epic: {
            name: '史诗',
            color: '#9b59b6',
            multiplier: 2.0
          },
          legendary: {
            name: '传说',
            color: '#f39c12',
            multiplier: 3.0
          },
          mythic: {
            name: '神话',
            color: '#e74c3c',
            multiplier: 5.0
          }
        },
        // 装备类型
        types: {
          weapon: {
            name: '武器',
            slot: 'weapon'
          },
          helmet: {
            name: '头盔',
            slot: 'helmet'
          },
          armor: {
            name: '护甲',
            slot: 'armor'
          },
          gloves: {
            name: '手套',
            slot: 'gloves'
          },
          boots: {
            name: '靴子',
            slot: 'boots'
          },
          ring: {
            name: '戒指',
            slot: 'ring'
          },
          necklace: {
            name: '项链',
            slot: 'necklace'
          },
          charm: {
            name: '护符',
            slot: 'charm'
          }
        },
        // 武器列表（示例）
        weapons: {
          // 拂尘
          'duster_wood': {
            name: '桃木拂尘',
            type: 'weapon',
            attack: 10,
            element: 'wood',
            desc: '桃木制作，可驱邪避凶'
          },
          'duster_bronze': {
            name: '青铜拂尘',
            type: 'weapon',
            attack: 25,
            element: 'metal',
            desc: '青铜打造，锋利无比'
          },
          'duster_gold': {
            name: '金身拂尘',
            type: 'weapon',
            attack: 50,
            element: 'gold',
            desc: '纯金打造，价值连城'
          },
          // 算盘
          'abacus_wood': {
            name: '黄花梨算盘',
            type: 'weapon',
            attack: 15,
            crit: 0.05,
            desc: '精打细算，财源广进'
          },
          'abacus_jade': {
            name: '和田玉算盘',
            type: 'weapon',
            attack: 35,
            crit: 0.1,
            desc: '玉质温润，算无遗策'
          },
          // 元宝
          'yuanbao_gold': {
            name: '金元宝',
            type: 'weapon',
            attack: 100,
            gold_bonus: 0.2,
            desc: '招财进宝，财运亨通'
          }
        },
        // 防具列表（示例）
        armors: {
          'robe_clay': {
            name: '泥胎道袍',
            type: 'armor',
            defense: 5,
            desc: '粗布缝制，聊胜于无'
          },
          'robe_wood': {
            name: '木骨法衣',
            type: 'armor',
            defense: 15,
            hp_bonus: 0.1,
            desc: '灵木编织，护体安神'
          },
          'robe_bronze': {
            name: '铜身战甲',
            type: 'armor',
            defense: 35,
            damage_reduce: 0.1,
            desc: '青铜铸就，刀枪不入'
          },
          'robe_gold': {
            name: '金身圣衣',
            type: 'armor',
            defense: 80,
            damage_reduce: 0.2,
            desc: '金甲护身，万法不侵'
          }
        },
        // 饰品列表（示例）
        accessories: {
          'ring_luck': {
            name: '招财戒指',
            type: 'ring',
            luck: 10,
            alms_bonus: 0.1,
            desc: '财源滚滚来'
          },
          'necklace_mana': {
            name: '聚灵项链',
            type: 'necklace',
            mana_regen: 2,
            max_mana: 50,
            desc: '灵气汇聚，法力充沛'
          },
          'charm_worship': {
            name: '供奉护符',
            type: 'charm',
            worship_bonus: 0.15,
            desc: '虔诚供奉，福报加倍'
          }
        },
        // 强化配置
        enhancement: {
          maxLevel: 15,
          costs: {
            incense_money: [100, 200, 400, 800, 1500, 3000, 6000, 12000, 25000, 50000, 100000, 200000, 400000, 800000, 1600000],
            successRate: [1.0, 0.95, 0.9, 0.85, 0.8, 0.75, 0.7, 0.65, 0.6, 0.55, 0.5, 0.45, 0.4, 0.35, 0.3]
          },
          bonus: {
            attack: 0.1,
            // 每级+10%
            defense: 0.1,
            hp: 0.1
          }
        },
        // 合成配置
        synthesis: {
          // 3件同品质合成1件更高品质
          ratio: 3,
          successRate: 0.8
        }
      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=ea3d2f89129692a1522b318da7cc6e55cd141dd4.js.map