import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

/**
 * 财神大陆 - 十二财域系统（完整版）
 * 12个财域完整配置 + 解锁逻辑 + 传送系统
 */

@ccclass('TwelveDomainsSystem')
export class TwelveDomainsSystem extends Component {
    
    // 十二财域完整配置
    domains = {
        'zi': {
            id: 'zi',
            name: '子时·墨玉矿渊',
            time: '23:00-01:00',
            element: '水',
            realm: '炼气期',
            unlockLevel: 6,
            minLevel: 6,
            maxLevel: 10,
            theme: '地下矿洞，深渊寻宝',
            coreGameplay: '挖矿采集 + 首个BOSS战',
            description: '深邃的地下矿脉，蕴藏着墨玉与灵矿，是新手财神的首个试炼场',
            scenes: ['矿洞入口', '矿脉通道', '深渊核心', '沉金祭坛'],
            resources: ['墨玉', '灵铁矿', '深渊晶石'],
            boss: {
                name: '沉金守卫',
                level: 8,
                hp: 4000,
                attack: 50,
                defense: 20,
                skills: ['矿脉冲击', '沉金护盾'],
                reward: '沉金聚宝盆碎片'
            },
            tasks: [
                { name: '首次下矿', level: 6, desc: '进入墨玉矿渊', reward: '修为+100' },
                { name: '采集灵矿', level: 7, desc: '采集10个灵铁矿', reward: '修为+150' },
                { name: '击败守卫', level: 8, desc: '击败沉金守卫', reward: '修为+300，BOSS碎片×1' }
            ],
            hourlyBonus: {
                '子时': { gatherSpeed: 1.3, dropRate: 1.2 },
                '丑时': { gatherSpeed: 1.1 },
                '亥时': { gatherSpeed: 1.1 }
            }
        },
        
        'chou': {
            id: 'chou',
            name: '丑时·玄牝牧场',
            time: '01:00-03:00',
            element: '土',
            realm: '炼气期',
            unlockLevel: 9,
            minLevel: 9,
            maxLevel: 12,
            theme: '草原牧场，灵兽驯养',
            coreGameplay: '灵兽培育 + 牧场经营',
            description: '广袤的玄牝草原，灵兽成群，是培养信徒与坐骑的宝地',
            scenes: ['牧场入口', '草原腹地', '灵兽园', '玄牝祭坛'],
            resources: ['灵草', '异兽毛皮', '牧场奶酪'],
            boss: {
                name: '牧场守护者',
                level: 11,
                hp: 6000,
                attack: 70,
                defense: 30,
                skills: ['兽群召唤', '草原咆哮'],
                reward: '万牲纳财铃碎片'
            },
            tasks: [
                { name: '驯养灵兽', level: 9, desc: '成功驯养第一只灵兽', reward: '修为+200' },
                { name: '牧场经营', level: 10, desc: '牧场产出达到1000', reward: '修为+250' },
                { name: '守护之战', level: 11, desc: '击败牧场守护者', reward: '修为+400，BOSS碎片×1' }
            ],
            hourlyBonus: {
                '丑时': { tameRate: 1.3, output: 1.2 },
                '子时': { tameRate: 1.1 },
                '寅时': { tameRate: 1.1 }
            }
        },
        
        'yin': {
            id: 'yin',
            name: '寅时·破晓林海',
            time: '03:00-05:00',
            element: '木',
            realm: '筑基期',
            unlockLevel: 11,
            minLevel: 11,
            maxLevel: 15,
            theme: '原始森林，迷雾解谜',
            coreGameplay: '迷雾探索 + 精怪契约',
            description: '神秘的原始森林，迷雾笼罩，精怪出没，首个需要解谜的财域',
            scenes: ['林缘入口', '迷雾外围', '古树核心', '青木圣地'],
            resources: ['青木', '灵芝', '破晓花'],
            specialSystem: '精怪契约',
            contractableSpirits: [
                { name: '小树人', effect: '战斗中缓慢回血', cost: 100 },
                { name: '藤蔓妖', effect: '战斗中缠绕敌人1秒', cost: 150 },
                { name: '青木灵', effect: '攻击附带木属性伤害', cost: 200 }
            ],
            boss: {
                name: '青木摇钱树',
                level: 15,
                hp: 10000,
                attack: 100,
                defense: 50,
                skills: ['金币风暴', '根系缠绕', '木遁术'],
                reward: '青木摇钱树碎片'
            },
            tasks: [
                { name: '迷雾寻路', level: 11, desc: '点亮3个晨光露珠', reward: '修为+200，小树人×1' },
                { name: '度化精怪', level: 12, desc: '成功契约1只精怪', reward: '修为+250' },
                { name: '破晓之战', level: 15, desc: '击败青木摇钱树', reward: '修为+500，BOSS碎片×1，称号【破晓掌控者】' }
            ],
            hourlyBonus: {
                '寅时': { contractRate: 1.3, woodDamage: 1.2 },
                '卯时': { contractRate: 1.1 },
                '丑时': { contractRate: 1.1 }
            }
        },
        
        'mao': {
            id: 'mao',
            name: '卯时·金曦原野',
            time: '05:00-07:00',
            element: '木',
            realm: '筑基期',
            unlockLevel: 16,
            minLevel: 16,
            maxLevel: 20,
            theme: '金色麦田，农耕文明',
            coreGameplay: '农田经营 + 强制组队BOSS',
            description: '富饶的金色原野，首个强制组队挑战的财域',
            scenes: ['村口驿站', '金曦麦田', '丰收谷仓', '晨曦祭坛'],
            resources: ['金麦', '灵稻米', '财神瓜'],
            specialSystem: '农田经营',
            crops: [
                { name: '金麦', growTime: 4, output: 10, effect: '恢复生命' },
                { name: '灵稻', growTime: 8, output: 5, effect: '恢复法力' },
                { name: '财神瓜', growTime: 24, output: 1, effect: '稀有材料' }
            ],
            stealSystem: {
                enabled: true,
                thiefGet: 0.3,
                ownerGet: 0.1,
                protectionAfter: 3,
                protectionDuration: 6
            },
            boss: {
                name: '丰收之神',
                level: 20,
                hp: 15000,
                attack: 150,
                defense: 80,
                skills: ['金麦风暴', '丰收之赐', '大地滋养'],
                reward: '金曦丰收镰碎片',
                requireTeam: true,
                teamSize: 3
            },
            tasks: [
                { name: '开垦农田', level: 16, desc: '获得农田，种植金麦', reward: '修为+300' },
                { name: '击退蝗灾', level: 17, desc: '击败3波蝗虫', reward: '修为+400' },
                { name: '丰收试炼', level: 20, desc: '3人组队击败丰收之神', reward: '修为+800，BOSS碎片×1，称号【金曦掌控者】' }
            ],
            hourlyBonus: {
                '卯时': { growSpeed: 1.3, output: 1.2 },
                '寅时': { growSpeed: 1.1 },
                '辰时': { growSpeed: 1.1 }
            }
        },
        
        'chen': {
            id: 'chen',
            name: '辰时·云海天市',
            time: '07:00-09:00',
            element: '土',
            realm: '结丹期',
            unlockLevel: 21,
            minLevel: 21,
            maxLevel: 30,
            theme: '云端贸易中心，经济枢纽',
            coreGameplay: '摆摊 + 拍卖行 + 股票系统',
            description: '漂浮云端的浮空岛群，是全大陆的贸易枢纽',
            scenes: ['云海关口', '天市主街', '拍卖大殿', '云海密室'],
            resources: ['云棉', '浮空石', '晨露'],
            specialSystems: ['摆摊', '拍卖行', '股票'],
            stall: {
                tax: 0.05,
                chenHourTax: 0,
                offlineDuration: 2,
                features: ['店铺名称', '信誉度', '收藏店铺']
            },
            auction: {
                types: ['普通拍卖', '一口价', '暗拍', '系统拍卖'],
                tax: 0.1,
                chenHourTax: 0.05,
                systemAuctionTime: '18:00'
            },
            stock: {
                stocks: ['矿渊矿业', '丰收农业', '通宝商会'],
                features: ['低买高卖', '做空', '分红']
            },
            boss: {
                name: '云海财神',
                level: 30,
                type: 'mechanism',
                challenge: '限时竞价挑战',
                reward: '流云通宝印碎片'
            },
            tasks: [
                { name: '开设摊位', level: 21, desc: '在云天市摆摊', reward: '修为+500' },
                { name: '拍卖初体验', level: 26, desc: '成功竞拍1件物品', reward: '修为+600' },
                { name: '投资首单', level: 27, desc: '购买股票100股', reward: '修为+700' },
                { name: '云海挑战', level: 30, desc: '竞价挑战获胜', reward: '修为+1000，BOSS碎片×1，称号【云海掌控者】' }
            ],
            hourlyBonus: {
                '辰时': { taxReduction: 0.5, tradeFee: 0.5 },
                '卯时': { taxReduction: 0.25 },
                '巳时': { taxReduction: 0.25 }
            }
        },
        
        'si': {
            id: 'si',
            name: '巳时·赤焰熔炉',
            time: '09:00-11:00',
            element: '火',
            realm: '元婴期',
            unlockLevel: 31,
            minLevel: 31,
            maxLevel: 40,
            theme: '火山锻造，装备精炼',
            coreGameplay: '装备打造 + 强化精炼',
            description: '炽热的火山地带，锻造神兵利器的圣地',
            scenes: ['熔炉入口', '地心矿区', '锻造工坊', '赤焰核心'],
            resources: ['火晶', '熔岩石', '锻造精铁'],
            specialSystems: ['装备打造', '强化', '精炼'],
            equipment: {
                qualities: [
                    { name: '普通', color: 'white', bonus: 0 },
                    { name: '精良', color: 'green', bonus: 0.2 },
                    { name: '稀有', color: 'blue', bonus: 0.5 },
                    { name: '史诗', color: 'purple', bonus: 1.0 },
                    { name: '传说', color: 'orange', bonus: 2.0 }
                ],
                enhance: {
                    maxLevel: 10,
                    successRate: [1.0, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.35, 0.3, 0.25],
                    failNoLevelDown: true
                },
                refine: {
                    epicToLegend: '赤焰精魄'
                }
            },
            boss: {
                name: '赤焰神匠',
                level: 37,
                type: 'equipmentTest',
                challenge: '装备耐久测试',
                reward: '赤焰铸宝炉碎片'
            },
            tasks: [
                { name: '地心采矿', level: 31, desc: '采集20个赤焰矿', reward: '修为+600' },
                { name: '首件装备', level: 33, desc: '打造1件精良装备', reward: '修为+700' },
                { name: '强化+5', level: 35, desc: '装备强化到+5', reward: '修为+800' },
                { name: '赤焰考验', level: 37, desc: '通过装备测试', reward: '修为+1000，BOSS碎片×1，称号【赤焰掌控者】' }
            ],
            hourlyBonus: {
                '巳时': { forgeSuccess: 1.2, enhanceSuccess: 1.1 },
                '辰时': { forgeSuccess: 1.1 },
                '午时': { forgeSuccess: 1.1 }
            }
        },
        
        'wu': {
            id: 'wu',
            name: '午时·金乌圣山',
            time: '11:00-13:00',
            element: '火',
            realm: '化神期',
            unlockLevel: 41,
            minLevel: 41,
            maxLevel: 50,
            theme: '最高峰，至阳汇聚，PVP开启',
            coreGameplay: 'PVP竞技场 + 世界BOSS',
            description: '大陆最高峰，至阳汇聚之地，PVP玩法正式开启',
            scenes: ['山脚驿站', '烈阳坡', '金乌平台', '日冕之巅'],
            resources: ['阳炎石', '金乌羽', '至阳草'],
            specialSystems: ['PVP', '排位赛', '世界BOSS'],
            pvp: {
                modes: [
                    { name: '单挑', type: '1v1', rule: '3局2胜', reward: 100 },
                    { name: '组队战', type: '3v3', rule: '击杀全员获胜', reward: 300 },
                    { name: '乱斗', type: '6人混战', rule: '最后存活', reward: 500 },
                    { name: '排位赛', type: 'ranked', rule: '积分制', reward: '排名奖励' }
                ],
                currency: '荣誉点',
                honorShop: ['PVP装备', '外观', '稀有材料']
            },
            worldBoss: {
                name: '金乌之灵',
                respawn: 4,
                sharedHp: true,
                rewardByRank: true
            },
            boss: {
                name: '金乌之灵',
                level: 48,
                type: 'worldBoss',
                sharedHp: true,
                respawnHours: 4
            },
            tasks: [
                { name: 'PVP首胜', level: 41, desc: '赢得1场PVP', reward: '修为+800，荣誉点×100' },
                { name: '击败心魔', level: 45, desc: '击败自己的镜像', reward: '修为+900' },
                { name: '排位晋级', level: 47, desc: '达到白银段位', reward: '修为+1000' },
                { name: '金乌猎手', level: 50, desc: '世界BOSS前10伤害', reward: '修为+1200，【日冕聚阳鼎】碎片×1，称号【金乌掌控者】' }
            ],
            hourlyBonus: {
                '午时': { pvpDamage: 1.15, honorGain: 1.3 },
                '巳时': { pvpDamage: 1.08 },
                '未时': { pvpDamage: 1.08 }
            }
        },
        
        'wei': {
            id: 'wei',
            name: '未时·风语沙碛',
            time: '13:00-15:00',
            element: '土',
            realm: '炼虚期',
            unlockLevel: 51,
            minLevel: 51,
            maxLevel: 60,
            theme: '沙漠戈壁，古遗迹，高风险',
            coreGameplay: '迷宫探索 + 考古挖掘',
            description: '无尽的沙漠戈壁，风沙中隐藏着古老的遗迹',
            scenes: ['沙漠边缘', '风语迷宫', '古代遗迹', '沙漠核心'],
            resources: ['沙漠金', '古遗物', '风语石'],
            dangerLevel: 4,
            mazeSystem: true,
            boss: {
                name: '沙漠主宰',
                level: 60,
                hp: 50000,
                attack: 400,
                defense: 200,
                reward: '蜃楼藏金楼碎片'
            },
            tasks: [
                { name: '迷宫探索', level: 51, desc: '穿过风语迷宫', reward: '修为+1500' },
                { name: '考古发现', level: 55, desc: '挖掘3个古遗迹', reward: '修为+1800' },
                { name: '沙漠主宰', level: 60, desc: '击败沙漠主宰', reward: '修为+2500，BOSS碎片×1，称号【沙漠掌控者】' }
            ],
            hourlyBonus: {
                '未时': { mazeVision: 1.3, digRate: 1.2 },
                '申时': { mazeVision: 1.1 },
                '午时': { mazeVision: 1.1 }
            }
        },
        
        'shen': {
            id: 'shen',
            name: '申时·雷鸣裂谷',
            time: '15:00-17:00',
            element: '金',
            realm: '合体期',
            unlockLevel: 61,
            minLevel: 61,
            maxLevel: 70,
            theme: '雷电裂谷，极限挑战',
            coreGameplay: '雷电淬炼 + 极限挑战',
            description: '雷电交加的裂谷，极限挑战者的试炼场',
            scenes: ['裂谷入口', '雷霆平原', '雷电核心', '雷鸣之巅'],
            resources: ['雷晶', '闪电石', '雷鸣草'],
            dangerLevel: 5,
            thunderSystem: true,
            boss: {
                name: '雷神',
                level: 70,
                hp: 80000,
                attack: 600,
                defense: 300,
                reward: '惊雷淬金台碎片'
            },
            tasks: [
                { name: '雷霆试炼', level: 61, desc: '承受100道雷电', reward: '修为+2000' },
                { name: '极限挑战', level: 65, desc: '完成极限模式', reward: '修为+2500' },
                { name: '雷神之战', level: 70, desc: '击败雷神', reward: '修为+3500，BOSS碎片×1，称号【雷鸣掌控者】' }
            ],
            hourlyBonus: {
                '申时': { thunderResist: 1.3, critRate: 1.2 },
                '未时': { thunderResist: 1.1 },
                '酉时': { thunderResist: 1.1 }
            }
        },
        
        'you': {
            id: 'you',
            name: '酉时·落霞宝湾',
            time: '17:00-19:00',
            element: '金',
            realm: '大乘期',
            unlockLevel: 71,
            minLevel: 71,
            maxLevel: 80,
            theme: '神秘海湾，深海探险',
            coreGameplay: '航海 + 海底探险',
            description: '神秘的海湾，晚霞映照，深海中藏着无数宝藏',
            scenes: ['海湾港口', '落日浅海', '深海区域', '海底宫殿'],
            resources: ['珍珠', '深海晶', '海怪材料'],
            seaSystem: true,
            boss: {
                name: '海龙王',
                level: 80,
                hp: 120000,
                attack: 800,
                defense: 400,
                reward: '霞光引财灯塔碎片'
            },
            tasks: [
                { name: '首次出海', level: 71, desc: '航行至深海', reward: '修为+2500' },
                { name: '深海探险', level: 75, desc: '探索海底宫殿', reward: '修为+3000' },
                { name: '海龙之战', level: 80, desc: '击败海龙王', reward: '修为+4000，BOSS碎片×1，称号【宝湾掌控者】' }
            ],
            hourlyBonus: {
                '酉时': { seaSpeed: 1.3, pearlRate: 1.2 },
                '申时': { seaSpeed: 1.1 },
                '戌时': { seaSpeed: 1.1 }
            }
        },
        
        'xu': {
            id: 'xu',
            name: '戌时·百战擂台',
            time: '19:00-21:00',
            element: '土',
            realm: '真仙期',
            unlockLevel: 81,
            minLevel: 81,
            maxLevel: 90,
            theme: '角斗场，阵营战，封神排位',
            coreGameplay: '封神排位 + 阵营战',
            description: '热血的角斗场，封神排位的终极战场',
            scenes: ['擂台入口', '备战区', '主擂台', '封神台'],
            resources: ['战魂', '荣誉勋章', '擂台积分'],
            specialSystems: ['封神排位', '阵营战'],
            boss: {
                name: '战神',
                level: 90,
                hp: 200000,
                attack: 1200,
                defense: 600,
                reward: '斗金演武场碎片'
            },
            tasks: [
                { name: '封神排位', level: 81, desc: '达到黄金段位', reward: '修为+3000' },
                { name: '阵营之战', level: 85, desc: '参与阵营战并获胜', reward: '修为+3500' },
                { name: '战神挑战', level: 90, desc: '击败战神', reward: '修为+5000，BOSS碎片×1，称号【百战掌控者】' }
            ],
            hourlyBonus: {
                '戌时': { pvpDamage: 1.2, honorGain: 1.3 },
                '酉时': { pvpDamage: 1.1 },
                '亥时': { pvpDamage: 1.1 }
            }
        },
        
        'hai': {
            id: 'hai',
            name: '亥时·幽泉秘府',
            time: '21:00-23:00',
            element: '水',
            realm: '真仙期',
            unlockLevel: 91,
            minLevel: 91,
            maxLevel: 99,
            theme: '地下水系，古老秘密，最终试炼，册封财神',
            coreGameplay: '暗杀潜行 + 黑市交易 + 最终BOSS战 + 封神仪式',
            description: '神秘的地下水系，最终的试炼之地，册封神器的圣地',
            scenes: ['幽泉入口', '暗河密道', '黑市集市', '财源核心'],
            resources: ['幽泉水', '暗灵石', '地底秘宝'],
            specialSystems: ['潜行', '暗杀', '黑市'],
            stealth: {
                skills: ['幽影步', '背刺', '烟雾弹', '水中呼吸'],
                backstabKill: true
            },
            blackMarket: {
                openTime: '21:00-23:00',
                illegalGoods: ['暗杀令', '情报卷轴', '诅咒道具', '财源密卷']
            },
            boss: {
                name: '前代财神残魂',
                level: 99,
                type: 'final',
                phases: 3,
                phase1: '考验经营（管理资源抵御攻击）',
                phase2: '考验战斗（与残魂正面交锋）',
                phase3: '考验心性（独占财源或散财济世）',
                reward: '财源印合成资格'
            },
            tasks: [
                { name: '无声潜入', level: 91, desc: '不被发现穿过暗河', reward: '修为+3000' },
                { name: '黑市首单', level: 95, desc: '完成1笔黑市交易', reward: '修为+3500' },
                { name: '财神试炼', level: 99, desc: '通过三阶段试炼', reward: '修为+5000，【财源印】×1，称号【财源之主】，全服公告封神' }
            ],
            hourlyBonus: {
                '亥时': { stealthTime: 1.5, blackMarketTax: 0.5, backstabSuccess: 1.25 },
                '戌时': { stealthTime: 1.25 },
                '子时': { stealthTime: 1.25 }
            }
        }
    };
    
    // 获取财域信息
    getDomain(domainId: string): any {
        return this.domains[domainId] || null;
    }
    
    // 获取可进入的财域（基于等级）
    getAvailableDomains(playerLevel: number): any[] {
        return Object.values(this.domains).filter(d => playerLevel >= d.unlockLevel);
    }
    
    // 检查财域是否解锁
    isDomainUnlocked(domainId: string, playerLevel: number): boolean {
        const domain = this.domains[domainId];
        return domain && playerLevel >= domain.unlockLevel;
    }
    
    // 获取推荐财域（最新解锁）
    getRecommendedDomain(playerLevel: number): any {
        const available = this.getAvailableDomains(playerLevel);
        return available.length > 0 ? available[available.length - 1] : null;
    }
    
    // 获取下一个解锁的财域
    getNextUnlock(playerLevel: number): { domain: any; needLevel: number; remain: number } | null {
        for (const domain of Object.values(this.domains)) {
            if (playerLevel < domain.unlockLevel) {
                return {
                    domain: domain,
                    needLevel: domain.unlockLevel,
                    remain: domain.unlockLevel - playerLevel
                };
            }
        }
        return null;
    }
    
    // 获取时辰加成
    getHourlyBonus(domainId: string, playerHour: string): any {
        const domain = this.domains[domainId];
        if (!domain || !domain.hourlyBonus) return {};
        return domain.hourlyBonus[playerHour] || {};
    }
    
    // 计算传送费用
    getTeleportCost(fromDomain: string, toDomain: string): number {
        if (fromDomain === toDomain) return 0;
        
        // 相邻财域
        const adjacent = this.areAdjacent(fromDomain, toDomain);
        if (adjacent) return 50;
        
        // 庙宇传送（默认）
        return 100;
    }
    
    // 检查是否相邻
    areAdjacent(domain1: string, domain2: string): boolean {
        const order = ['zi', 'chou', 'yin', 'mao', 'chen', 'si', 'wu', 'wei', 'shen', 'you', 'xu', 'hai'];
        const idx1 = order.indexOf(domain1);
        const idx2 = order.indexOf(domain2);
        if (idx1 === -1 || idx2 === -1) return false;
        return Math.abs(idx1 - idx2) === 1 || Math.abs(idx1 - idx2) === 11;
    }
    
    onLoad() {
        console.log('TwelveDomainsSystem 加载完成');
        console.log('十二财域数量:', Object.keys(this.domains).length);
    }
}