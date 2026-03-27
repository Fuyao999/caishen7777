System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _crd, QuestConfig;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "c55e8/FM4JKPLsD2BL2E2T4", "QuestConfig", undefined);

      // 任务配置
      _export("QuestConfig", QuestConfig = {
        // 主线任务
        mainQuests: [{
          id: 'main_001',
          name: '初临仙界',
          desc: '完成新手引导',
          reward: {
            incense_money: 100,
            merit: 10
          },
          target: {
            type: 'guide',
            count: 1
          }
        }, {
          id: 'main_002',
          name: '第一炷香',
          desc: '完成首次供奉',
          reward: {
            incense_money: 200,
            incense_sticks: 5
          },
          target: {
            type: 'worship',
            count: 1
          }
        }, {
          id: 'main_003',
          name: '行善积德',
          desc: '累计供奉10次',
          reward: {
            incense_money: 500,
            merit: 50
          },
          target: {
            type: 'worship',
            count: 10
          }
        }, {
          id: 'main_004',
          name: '第一次化缘',
          desc: '完成首次化缘',
          reward: {
            incense_money: 300,
            candles: 3
          },
          target: {
            type: 'alms',
            count: 1
          }
        }, {
          id: 'main_005',
          name: '云游四方',
          desc: '在所有地区化缘一次',
          reward: {
            incense_money: 1000,
            gold_paper: 5
          },
          target: {
            type: 'alms_all_regions',
            count: 1
          }
        }, {
          id: 'main_006',
          name: '初窥门径',
          desc: '进化到木骨阶段',
          reward: {
            incense_money: 2000,
            candles: 10
          },
          target: {
            type: 'upgrade',
            stage: 'wood'
          }
        }, {
          id: 'main_007',
          name: '渐入佳境',
          desc: '进化到铜身阶段',
          reward: {
            incense_money: 5000,
            gold_paper: 10
          },
          target: {
            type: 'upgrade',
            stage: 'bronze'
          }
        }, {
          id: 'main_008',
          name: '金身成就',
          desc: '进化到金身阶段',
          reward: {
            yuanbao: 100,
            fruits: 10
          },
          target: {
            type: 'upgrade',
            stage: 'gold'
          }
        }, {
          id: 'main_009',
          name: '初入江湖',
          desc: '进入十二财域',
          reward: {
            incense_money: 1000,
            mana: 50
          },
          target: {
            type: 'enter_domain',
            count: 1
          }
        }, {
          id: 'main_010',
          name: '首战告捷',
          desc: '击败第一个BOSS',
          reward: {
            incense_money: 2000,
            equipment: 'weapon_wood'
          },
          target: {
            type: 'defeat_boss',
            count: 1
          }
        }, {
          id: 'main_011',
          name: '收获灵兽',
          desc: '捕捉第一只灵兽',
          reward: {
            incense_money: 1500,
            pet_food: 10
          },
          target: {
            type: 'catch_pet',
            count: 1
          }
        }, {
          id: 'main_012',
          name: '装备强化',
          desc: '强化装备到+3',
          reward: {
            incense_money: 3000,
            enhancement_stone: 5
          },
          target: {
            type: 'enhance',
            level: 3
          }
        }, {
          id: 'main_013',
          name: '初建门派',
          desc: '加入或创建门派',
          reward: {
            incense_money: 5000,
            merit: 100
          },
          target: {
            type: 'join_guild',
            count: 1
          }
        }, {
          id: 'main_014',
          name: '拜师学艺',
          desc: '拜入师门',
          reward: {
            incense_money: 3000,
            cultivation: 100
          },
          target: {
            type: 'join_master',
            count: 1
          }
        }, {
          id: 'main_015',
          name: '交易初体验',
          desc: '完成第一次交易',
          reward: {
            incense_money: 2000,
            trade_token: 1
          },
          target: {
            type: 'trade',
            count: 1
          }
        }, {
          id: 'main_016',
          name: '名动一方',
          desc: '等级达到20级',
          reward: {
            yuanbao: 50,
            incense_money: 10000
          },
          target: {
            type: 'level',
            count: 20
          }
        }, {
          id: 'main_017',
          name: '威震八方',
          desc: '等级达到50级',
          reward: {
            yuanbao: 100,
            incense_money: 50000
          },
          target: {
            type: 'level',
            count: 50
          }
        }, {
          id: 'main_018',
          name: '登峰造极',
          desc: '等级达到99级',
          reward: {
            yuanbao: 500,
            title: '财神转世'
          },
          target: {
            type: 'level',
            count: 99
          }
        }, {
          id: 'main_019',
          name: '财域之主',
          desc: '通关所有十二财域',
          reward: {
            yuanbao: 1000,
            mount: 'divine_beast'
          },
          target: {
            type: 'clear_all_domains',
            count: 1
          }
        }, {
          id: 'main_020',
          name: '财神降世',
          desc: '获得财神神格',
          reward: {
            yuanbao: 9999,
            title: '真·财神'
          },
          target: {
            type: 'obtain_divinity',
            count: 1
          }
        }],
        // 日常任务
        dailyQuests: [{
          id: 'daily_001',
          name: '每日供奉',
          desc: '供奉3次',
          reward: {
            incense_money: 200,
            merit: 10
          },
          target: {
            type: 'worship',
            count: 3
          },
          limit: 1
        }, {
          id: 'daily_002',
          name: '日行一善',
          desc: '化缘5次',
          reward: {
            incense_money: 500,
            mana: 20
          },
          target: {
            type: 'alms',
            count: 5
          },
          limit: 1
        }, {
          id: 'daily_003',
          name: '勤修苦练',
          desc: '修炼3次',
          reward: {
            cultivation: 50,
            mana: 30
          },
          target: {
            type: 'cultivate',
            count: 3
          },
          limit: 1
        }, {
          id: 'daily_004',
          name: '挑战BOSS',
          desc: '击败任意BOSS',
          reward: {
            incense_money: 1000,
            equipment_scroll: 1
          },
          target: {
            type: 'defeat_boss',
            count: 1
          },
          limit: 3
        }, {
          id: 'daily_005',
          name: '装备强化',
          desc: '强化装备1次',
          reward: {
            incense_money: 500,
            enhancement_stone: 1
          },
          target: {
            type: 'enhance',
            count: 1
          },
          limit: 1
        }, {
          id: 'daily_006',
          name: '招财进宝',
          desc: '累计获得10000香火钱',
          reward: {
            yuanbao: 10,
            incense_sticks: 10
          },
          target: {
            type: 'earn_incense_money',
            count: 10000
          },
          limit: 1
        }, {
          id: 'daily_007',
          name: '广积功德',
          desc: '累计获得100功德',
          reward: {
            candles: 5,
            gold_paper: 3
          },
          target: {
            type: 'earn_merit',
            count: 100
          },
          limit: 1
        }, {
          id: 'daily_008',
          name: '登录签到',
          desc: '今日登录游戏',
          reward: {
            incense_money: 1000,
            login_reward: 1
          },
          target: {
            type: 'login',
            count: 1
          },
          limit: 1
        }],
        // 成就任务
        achievements: [{
          id: 'ach_001',
          name: '供奉达人',
          desc: '累计供奉100次',
          reward: {
            title: '虔诚供奉者',
            incense_money: 5000
          }
        }, {
          id: 'ach_002',
          name: '化缘大师',
          desc: '累计化缘100次',
          reward: {
            title: '云游高僧',
            incense_money: 5000
          }
        }, {
          id: 'ach_003',
          name: '腰缠万贯',
          desc: '拥有100000香火钱',
          reward: {
            title: '小财主',
            incense_money: 10000
          }
        }, {
          id: 'ach_004',
          name: '富可敌国',
          desc: '拥有1000000香火钱',
          reward: {
            title: '大财主',
            incense_money: 50000
          }
        }, {
          id: 'ach_005',
          name: '功德无量',
          desc: '累计获得10000功德',
          reward: {
            title: '功德无量',
            merit: 1000
          }
        }, {
          id: 'ach_006',
          name: '神装收藏家',
          desc: '收集50件装备',
          reward: {
            title: '收藏家',
            equipment_bag: 10
          }
        }, {
          id: 'ach_007',
          name: '灵兽大师',
          desc: '捕捉20只灵兽',
          reward: {
            title: '灵兽大师',
            pet_food: 50
          }
        }, {
          id: 'ach_008',
          name: '战无不胜',
          desc: '击败100个BOSS',
          reward: {
            title: '战神',
            yuanbao: 100
          }
        }, {
          id: 'ach_009',
          name: '社交达人',
          desc: '添加50个好友',
          reward: {
            title: '万人迷',
            incense_money: 10000
          }
        }, {
          id: 'ach_010',
          name: '门派栋梁',
          desc: '门派贡献达到10000',
          reward: {
            title: '门派栋梁',
            guild_token: 10
          }
        }]
      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=143437ef9de7a963e5e641bb14cdaeee74e77417.js.map