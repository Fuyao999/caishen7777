System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _crd, SkillConfig;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "85628RBBm9MjL5cX3Rz71vp", "SkillConfig", undefined);

      // 技能配置
      _export("SkillConfig", SkillConfig = {
        // 技能类型
        types: {
          active: {
            name: '主动',
            desc: '需要手动释放'
          },
          passive: {
            name: '被动',
            desc: '自动生效'
          },
          buff: {
            name: '增益',
            desc: '增强友方'
          },
          debuff: {
            name: '减益',
            desc: '削弱敌方'
          }
        },
        // 元素类型
        elements: {
          gold: {
            name: '金',
            color: '#f39c12',
            counter: 'wood',
            weak: 'fire'
          },
          wood: {
            name: '木',
            color: '#2ecc71',
            counter: 'earth',
            weak: 'metal'
          },
          water: {
            name: '水',
            color: '#3498db',
            counter: 'fire',
            weak: 'earth'
          },
          fire: {
            name: '火',
            color: '#e74c3c',
            counter: 'metal',
            weak: 'water'
          },
          earth: {
            name: '土',
            color: '#8b4513',
            counter: 'water',
            weak: 'wood'
          }
        },
        // 主角技能
        playerSkills: {
          // 攻击技能
          'attack_normal': {
            id: 'attack_normal',
            name: '普通攻击',
            type: 'active',
            element: 'physical',
            damage: 1.0,
            mana: 0,
            desc: '普通物理攻击'
          },
          'attack_heavy': {
            id: 'attack_heavy',
            name: '重击',
            type: 'active',
            element: 'physical',
            damage: 1.5,
            mana: 10,
            desc: '造成150%物理伤害'
          },
          'attack_combo': {
            id: 'attack_combo',
            name: '连击',
            type: 'active',
            element: 'physical',
            damage: 0.8,
            hits: 3,
            mana: 15,
            desc: '连续攻击3次，每次80%伤害'
          },
          // 元素技能
          'gold_slash': {
            id: 'gold_slash',
            name: '金刃斩',
            type: 'active',
            element: 'gold',
            damage: 2.0,
            mana: 20,
            desc: '金元素斩击，造成200%伤害'
          },
          'wood_bind': {
            id: 'wood_bind',
            name: '缠绕术',
            type: 'active',
            element: 'wood',
            damage: 1.2,
            mana: 15,
            effect: 'stun',
            duration: 1,
            desc: '木元素缠绕，定身1回合'
          },
          'water_heal': {
            id: 'water_heal',
            name: '水疗术',
            type: 'active',
            element: 'water',
            heal: 0.3,
            mana: 25,
            desc: '水元素治疗，恢复30%生命'
          },
          'fire_ball': {
            id: 'fire_ball',
            name: '火球术',
            type: 'active',
            element: 'fire',
            damage: 2.5,
            mana: 30,
            desc: '火元素攻击，造成250%伤害'
          },
          'earth_shield': {
            id: 'earth_shield',
            name: '土盾术',
            type: 'active',
            element: 'earth',
            mana: 20,
            effect: 'shield',
            value: 0.2,
            desc: '土元素护盾，抵挡20%伤害'
          },
          // 财神专属技能
          'caishen_bless': {
            id: 'caishen_bless',
            name: '财神祝福',
            type: 'active',
            element: 'gold',
            mana: 50,
            effect: 'gold_rain',
            desc: '召唤金币雨，获得大量香火钱'
          },
          'fortune_wave': {
            id: 'fortune_wave',
            name: '财运波动',
            type: 'active',
            element: 'gold',
            damage: 3.0,
            mana: 40,
            desc: '财运爆发，造成300%伤害'
          },
          'money_shield': {
            id: 'money_shield',
            name: '金钱护盾',
            type: 'active',
            element: 'gold',
            mana: 30,
            effect: 'reflect',
            value: 0.3,
            desc: '金钱护盾，反弹30%伤害'
          }
        },
        // 被动技能
        passiveSkills: {
          'crit_master': {
            id: 'crit_master',
            name: '暴击精通',
            type: 'passive',
            effect: 'crit_rate',
            value: 0.1,
            desc: '暴击率+10%'
          },
          'attack_master': {
            id: 'attack_master',
            name: '攻击精通',
            type: 'passive',
            effect: 'attack',
            value: 0.15,
            desc: '攻击力+15%'
          },
          'defense_master': {
            id: 'defense_master',
            name: '防御精通',
            type: 'passive',
            effect: 'defense',
            value: 0.15,
            desc: '防御力+15%'
          },
          'hp_master': {
            id: 'hp_master',
            name: '生命精通',
            type: 'passive',
            effect: 'max_hp',
            value: 0.2,
            desc: '最大生命+20%'
          },
          'mana_master': {
            id: 'mana_master',
            name: '法力精通',
            type: 'passive',
            effect: 'max_mana',
            value: 0.2,
            desc: '最大法力+20%'
          },
          'regen_master': {
            id: 'regen_master',
            name: '恢复精通',
            type: 'passive',
            effect: 'hp_regen',
            value: 0.05,
            desc: '每回合恢复5%生命'
          },
          'element_master': {
            id: 'element_master',
            name: '元素精通',
            type: 'passive',
            effect: 'element_damage',
            value: 0.2,
            desc: '元素伤害+20%'
          },
          'dodge_master': {
            id: 'dodge_master',
            name: '闪避精通',
            type: 'passive',
            effect: 'dodge',
            value: 0.1,
            desc: '闪避率+10%'
          }
        },
        // BOSS技能
        bossSkills: {
          'dragon_breath': {
            name: '龙息',
            element: 'water',
            damage: 2.0,
            effect: 'aoe',
            desc: '对所有敌人造成水属性伤害'
          },
          'earthquake': {
            name: '地震',
            element: 'earth',
            damage: 1.5,
            effect: 'stun_all',
            desc: '地震攻击，可能眩晕敌人'
          },
          'fire_storm': {
            name: '烈焰风暴',
            element: 'fire',
            damage: 2.5,
            effect: 'burn',
            desc: '火属性范围攻击'
          },
          'metal_slash': {
            name: '金属风暴',
            element: 'gold',
            damage: 2.0,
            effect: 'bleed',
            desc: '金属性斩击，造成流血'
          },
          'wood_growth': {
            name: '万物生长',
            element: 'wood',
            damage: 0,
            effect: 'heal_self',
            desc: '恢复自身生命值'
          }
        },
        // 技能升级
        upgrade: {
          maxLevel: 10,
          costs: {
            cultivation: [100, 200, 400, 800, 1500, 3000, 6000, 12000, 25000, 50000],
            incense_money: [1000, 2000, 4000, 8000, 15000, 30000, 60000, 120000, 250000, 500000]
          },
          bonus: {
            damage: 0.1,
            // 每级+10%伤害
            heal: 0.1,
            duration: 0.5 // 每级+0.5回合

          }
        }
      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=1c39998dd1f5b054fe7b2b38a605b0ee0a77c222.js.map