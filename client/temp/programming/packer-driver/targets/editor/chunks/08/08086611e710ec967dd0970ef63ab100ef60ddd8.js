System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _crd, BattleBalanceConfig;

  // 计算玩家属性
  function calculatePlayerStats(level, equipment = [], stage = 'clay') {
    const base = BattleBalanceConfig.playerGrowth;
    let stats = {
      hp: base.baseHp + base.perLevel.hp * (level - 1),
      mp: base.baseMp + base.perLevel.mp * (level - 1),
      attack: base.baseAttack + base.perLevel.attack * (level - 1),
      defense: base.baseDefense + base.perLevel.defense * (level - 1),
      crit: 0.05,
      critDamage: 1.5,
      dodge: 0.05,
      luck: 0
    }; // 阶段加成

    const stageBonus = {
      clay: {
        hp: 0,
        attack: 0,
        defense: 0
      },
      wood: {
        hp: 0.1,
        attack: 0.1,
        defense: 0.1
      },
      bronze: {
        hp: 0.25,
        attack: 0.25,
        defense: 0.25
      },
      gold: {
        hp: 0.5,
        attack: 0.5,
        defense: 0.5
      }
    };
    const bonus = stageBonus[stage] || stageBonus.clay;
    stats.hp = Math.floor(stats.hp * (1 + bonus.hp));
    stats.attack = Math.floor(stats.attack * (1 + bonus.attack));
    stats.defense = Math.floor(stats.defense * (1 + bonus.defense)); // 装备加成

    for (const equip of equipment) {
      if (equip.attack) stats.attack += equip.attack;
      if (equip.defense) stats.defense += equip.defense;
      if (equip.hp) stats.hp += equip.hp;
      if (equip.mp) stats.mp += equip.mp;
      if (equip.crit) stats.crit += equip.crit;
    }

    return stats;
  } // 计算升级所需经验


  function getExpForLevel(level) {
    if (level < 1 || level > 99) return 0;
    return BattleBalanceConfig.expTable[level - 1] || 0;
  }

  _export({
    calculatePlayerStats: calculatePlayerStats,
    getExpForLevel: getExpForLevel
  });

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "21bf29jUUxAf7uUiIbDE3qz", "BattleBalanceConfig", undefined);

      // 战斗平衡配置
      _export("BattleBalanceConfig", BattleBalanceConfig = {
        // 玩家基础属性成长
        playerGrowth: {
          baseHp: 100,
          baseMp: 50,
          baseAttack: 20,
          baseDefense: 10,
          perLevel: {
            hp: 15,
            mp: 5,
            attack: 3,
            defense: 2
          }
        },
        // 升级经验表
        expTable: [100, // 1→2
        200, // 2→3
        300, // 3→4
        400, // 4→5
        500, // 5→6
        700, // 6→7
        900, // 7→8
        1100, // 8→9
        1300, // 9→10
        1500, // 10→11
        1800, // 11→12
        2100, // 12→13
        2400, // 13→14
        2700, // 14→15
        3000, // 15→16
        3500, // 16→17
        4000, // 17→18
        4500, // 18→19
        5000, // 19→20
        6000, // 20→21
        7000, // 21→22
        8000, // 22→23
        9000, // 23→24
        10000, // 24→25
        12000, // 25→26
        14000, // 26→27
        16000, // 27→28
        18000, // 28→29
        20000, // 29→30
        25000, // 30→31
        30000, // 31→32
        35000, // 32→33
        40000, // 33→34
        45000, // 34→35
        50000, // 35→36
        60000, // 36→37
        70000, // 37→38
        80000, // 38→39
        90000, // 39→40
        100000, // 40→41
        120000, // 41→42
        140000, // 42→43
        160000, // 43→44
        180000, // 44→45
        200000, // 45→46
        250000, // 46→47
        300000, // 47→48
        350000, // 48→49
        400000, // 49→50
        500000, // 50→51
        600000, // 51→52
        700000, // 52→53
        800000, // 53→54
        900000, // 54→55
        1000000, // 55→56
        1200000, // 56→57
        1400000, // 57→58
        1600000, // 58→59
        1800000, // 59→60
        2000000, // 60→61
        2500000, // 61→62
        3000000, // 62→63
        3500000, // 63→64
        4000000, // 64→65
        5000000, // 65→66
        6000000, // 66→67
        7000000, // 67→68
        8000000, // 68→69
        9000000, // 69→70
        10000000, // 70→71
        12000000, // 71→72
        14000000, // 72→73
        16000000, // 73→74
        18000000, // 74→75
        20000000, // 75→76
        25000000, // 76→77
        30000000, // 77→78
        35000000, // 78→79
        40000000, // 79→80
        50000000, // 80→81
        60000000, // 81→82
        70000000, // 82→83
        80000000, // 83→84
        90000000, // 84→85
        100000000, // 85→86
        120000000, // 86→87
        140000000, // 87→88
        160000000, // 88→89
        180000000, // 89→90
        200000000, // 90→91
        250000000, // 91→92
        300000000, // 92→93
        350000000, // 93→94
        400000000, // 94→95
        500000000, // 95→96
        600000000, // 96→97
        700000000, // 97→98
        800000000 // 98→99
        ],
        // 战斗公式
        battleFormula: {
          // 伤害计算
          damage: (attackerAttack, defenderDefense, skillMultiplier = 1, crit = false, critDamage = 1.5) => {
            const baseDamage = Math.max(1, attackerAttack - defenderDefense * 0.5);
            const skillDamage = baseDamage * skillMultiplier;
            const finalDamage = crit ? skillDamage * critDamage : skillDamage;
            return Math.floor(finalDamage * (0.9 + Math.random() * 0.2)); // ±10%波动
          },
          // 命中率
          hitRate: (attackerLevel, defenderLevel) => {
            const diff = attackerLevel - defenderLevel;
            return Math.min(1, Math.max(0.5, 0.95 + diff * 0.01));
          },
          // 暴击率
          critRate: (baseCrit = 0.05) => {
            return Math.min(0.8, baseCrit); // 最高80%
          },
          // 闪避率
          dodgeRate: (baseDodge = 0.05, levelDiff = 0) => {
            return Math.min(0.5, baseDodge + levelDiff * 0.005); // 最高50%
          },
          // 元素克制 (金→木→土→水→火→金)
          elementBonus: (attackerElement, defenderElement) => {
            const elements = ['gold', 'wood', 'earth', 'water', 'fire'];
            const attackerIndex = elements.indexOf(attackerElement);
            const defenderIndex = elements.indexOf(defenderElement); // 克制链: 金克木, 木克土, 土克水, 水克火, 火克金

            if ((attackerIndex + 1) % 5 === defenderIndex) {
              return 1.5; // 克制，+50%伤害
            } else if ((defenderIndex + 1) % 5 === attackerIndex) {
              return 0.5; // 被克，-50%伤害
            }

            return 1.0; // 无克制
          }
        },
        // 战斗回合
        battleRules: {
          maxRounds: 30,
          escapeChance: 0.5,
          autoRecover: {
            hp: 0.02,
            // 每回合2%
            mp: 0.05 // 每回合5%

          }
        },
        // 战斗奖励
        battleReward: {
          expMultiplier: 1.0,
          goldMultiplier: 1.0,
          bossBonus: 3.0
        }
      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=08086611e710ec967dd0970ef63ab100ef60ddd8.js.map