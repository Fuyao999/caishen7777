System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _crd, GameConfig;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "f5b1dWqOdFJlL8MoXl483wL", "GameConfig", undefined);

      // 游戏配置文件
      _export("GameConfig", GameConfig = {
        // 版本号
        version: '1.0.0',
        // 服务器地址
        serverUrl: 'http://localhost:3001',
        // 9位财神
        gods: {
          caishen: {
            id: 'caishen',
            name: '赵公明',
            title: '正财神',
            effect: {
              type: 'incense_money',
              value: 0.2
            },
            desc: '掌管天下财运，供奉可增加香火钱收益'
          },
          wencaishen: {
            id: 'wencaishen',
            name: '比干',
            title: '文财神',
            effect: {
              type: 'max_mana',
              value: 10
            },
            desc: '文曲星下凡，供奉可增加法力上限'
          },
          wucaishen: {
            id: 'wucaishen',
            name: '关公',
            title: '武财神',
            effect: {
              type: 'alms_bonus',
              value: 0.15
            },
            desc: '忠义千秋，供奉可增加化缘收益'
          },
          piancaishen: {
            id: 'piancaishen',
            name: '范蠡',
            title: '偏财神',
            effect: {
              type: 'crit_rate',
              value: 0.05
            },
            desc: '商圣转世，供奉可增加暴击率'
          },
          shengcai: {
            id: 'shengcai',
            name: '李诡祖',
            title: '增福财神',
            effect: {
              type: 'merit_bonus',
              value: 0.1
            },
            desc: '增福添寿，供奉可增加功德获取'
          },
          lucaishen: {
            id: 'lucaishen',
            name: '沈万三',
            title: '禄财神',
            effect: {
              type: 'mana_regen',
              value: 0.2
            },
            desc: '聚宝盆主人，供奉可加快法力回复'
          },
          shoucaishen: {
            id: 'shoucaishen',
            name: '刘海蟾',
            title: '寿财神',
            effect: {
              type: 'max_incense_money',
              value: 1000
            },
            desc: '长寿仙人，供奉可增加香火钱上限'
          },
          xicaishen: {
            id: 'xicaishen',
            name: '子贡',
            title: '喜财神',
            effect: {
              type: 'first_worship_double',
              value: 1
            },
            desc: '孔子门徒，每日首次供奉双倍奖励'
          },
          caishenpo: {
            id: 'caishenpo',
            name: '财神奶奶',
            title: '财神婆婆',
            effect: {
              type: 'risk_reduce',
              value: 0.1
            },
            desc: '财神伴侣，供奉可降低化缘风险'
          }
        },
        // 供奉配置
        worship: {
          offerings: {
            incense_sticks: {
              name: '线香',
              cost: 1,
              baseReward: 10,
              icon: 'incense_sticks'
            },
            candles: {
              name: '蜡烛',
              cost: 1,
              baseReward: 20,
              icon: 'candles'
            },
            gold_paper: {
              name: '金纸',
              cost: 1,
              baseReward: 30,
              icon: 'gold_paper'
            },
            fruits: {
              name: '供果',
              cost: 1,
              baseReward: 50,
              icon: 'fruits'
            }
          },
          levels: [1, 2, 3, 5, 10] // 供奉份数

        },
        // 化缘配置
        alms: {
          regions: {
            east: {
              name: '东',
              risk: 0.1,
              baseReward: 100,
              desc: '东海之滨，风险较低',
              color: '#3498db'
            },
            south: {
              name: '南',
              risk: 0.2,
              baseReward: 200,
              desc: '南疆之地，中等风险',
              color: '#e74c3c'
            },
            west: {
              name: '西',
              risk: 0.3,
              baseReward: 300,
              desc: '西域之路，较高风险',
              color: '#f39c12'
            },
            north: {
              name: '北',
              risk: 0.4,
              baseReward: 500,
              desc: '北境冰原，高风险高回报',
              color: '#9b59b6'
            }
          },
          riskEvents: [{
            type: 'robbery',
            name: '遇匪',
            desc: '遭遇劫匪，损失50%香火钱',
            penalty: 0.5
          }, {
            type: 'fraud',
            name: '被骗',
            desc: '遇到骗子，香火钱被骗光',
            penalty: 1.0
          }, {
            type: 'sick',
            name: '生病',
            desc: '路途劳累生病',
            penalty: 0
          }, {
            type: 'storm',
            name: '遇灾',
            desc: '遇到天灾，空手而归',
            penalty: 0
          }],
          manaCost: 10
        },
        // 升级配置
        upgrade: {
          stages: ['clay', 'wood', 'bronze', 'gold'],
          stageNames: {
            clay: '泥胎',
            wood: '木骨',
            bronze: '铜身',
            gold: '金身'
          },
          requirements: {
            clay: {
              merit: 100,
              incense_money: 0
            },
            wood: {
              merit: 500,
              incense_money: 1000
            },
            bronze: {
              merit: 2000,
              incense_money: 5000
            },
            gold: {
              merit: 10000,
              incense_money: 20000
            }
          },
          rewards: {
            clay: {
              incense_sticks: 10
            },
            wood: {
              candles: 10
            },
            bronze: {
              gold_paper: 10
            },
            gold: {
              yuanbao: 100
            }
          }
        },
        // 货币配置
        currencies: {
          incense_money: {
            name: '香火钱',
            icon: '💰',
            desc: '供奉获得，用于购买供品'
          },
          yuanbao: {
            name: '元宝',
            icon: '💎',
            desc: '充值获得，高级货币'
          },
          merit: {
            name: '功德',
            icon: '✨',
            desc: '供奉获得，用于升级'
          },
          incense_sticks: {
            name: '线香',
            icon: '📿',
            desc: '供奉材料'
          },
          candles: {
            name: '蜡烛',
            icon: '🕯️',
            desc: '供奉材料'
          },
          gold_paper: {
            name: '金纸',
            icon: '📜',
            desc: '供奉材料'
          },
          fruits: {
            name: '供果',
            icon: '🍎',
            desc: '供奉材料'
          },
          mana: {
            name: '法力',
            icon: '⚡',
            desc: '化缘消耗，自动回复'
          },
          cultivation: {
            name: '修为',
            icon: '📿',
            desc: '修炼获得'
          }
        },
        // 法力回复
        manaRegen: {
          interval: 1,
          // 秒
          amount: 1
        },
        // 新手引导
        guide: {
          steps: [{
            text: '欢迎来到财神大陆！我是你的引导助手。',
            target: null
          }, {
            text: '点击"供奉"进入庙宇，向财神供奉可以获得香火钱和功德。',
            target: 'worshipBtn'
          }, {
            text: '点击"化缘"可以去各地化缘，获得更多香火钱，但要注意风险！',
            target: 'almsBtn'
          }, {
            text: '积累足够的功德后，点击"升级"可以进化你的神像。',
            target: 'upgradeBtn'
          }, {
            text: '点击"背包"可以查看你的物品和装备。',
            target: 'bagBtn'
          }, {
            text: '香火钱会自然增长，法力也会慢慢恢复。',
            target: null
          }, {
            text: '现在就开始你的财神之旅吧！',
            target: null
          }]
        }
      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=7789b4087e85abcd6eb0822353087b871cca613d.js.map