/**
 * 财神大陆 - 第二阶段：十二财域系统
 * 对应十二时辰，每个域有独特资源和玩法
 */

const TwelveDomains = {
    // 十二财域配置
    domains: [
        {
            id: 'chen',
            name: '辰时·云海天市',
            time: '07:00-09:00',
            unlockLevel: 6,
            theme: '漂浮云端的浮空岛群，贸易枢纽',
            building: '流云通宝阁',
            output: '新手引导、基础交易',
            resources: ['云棉', '浮空石', '晨露'],
            features: ['新手保护', '基础交易', '低阶材料采集'],
            danger: 1
        },
        {
            id: 'mao',
            name: '卯时·金曦原野',
            time: '05:00-07:00',
            unlockLevel: 11,
            theme: '富饶平原，金色晨曦',
            building: '晨辉金麦田',
            output: '粮食、基础灵材',
            resources: ['金麦', '晨曦草', '灵米'],
            features: ['农业种植', '粮食加工', '灵材培育'],
            danger: 1
        },
        {
            id: 'yin',
            name: '寅时·破晓林海',
            time: '03:00-05:00',
            unlockLevel: 11,
            theme: '生机森林，灵木奇花',
            building: '青木摇钱树',
            output: '灵木、药材',
            resources: ['青木', '灵芝', '破晓花'],
            features: ['灵木采集', '药材种植', '森林探索'],
            danger: 2
        },
        {
            id: 'zi',
            name: '子时·墨玉矿渊',
            time: '23:00-01:00',
            unlockLevel: 21,
            theme: '深邃地下，灵石金属',
            building: '沉金聚宝盆',
            output: '元宝材料、矿石',
            resources: ['墨玉', '灵铁矿', '深渊晶石'],
            features: ['矿洞探索', '矿石精炼', '深渊寻宝'],
            danger: 3
        },
        {
            id: 'chou',
            name: '丑时·玄牝牧场',
            time: '01:00-03:00',
            unlockLevel: 21,
            theme: '灵草平原，异兽牧场',
            building: '万牲纳财厩',
            output: '食材、坐骑',
            resources: ['灵草', '异兽毛皮', '牧场奶酪'],
            features: ['异兽驯养', '坐骑培育', '牧场经营'],
            danger: 2
        },
        {
            id: 'si',
            name: '巳时·赤焰熔炉',
            time: '09:00-11:00',
            unlockLevel: 21,
            theme: '火山地带，锻造工坊',
            building: '地心铸宝炉',
            output: '装备强化、精炼',
            resources: ['火晶', '熔岩石', '锻造精铁'],
            features: ['装备锻造', '武器强化', '火属性材料'],
            danger: 3
        },
        {
            id: 'wei',
            name: '未时·风语沙碛',
            time: '13:00-15:00',
            unlockLevel: 41,
            theme: '沙漠戈壁，古遗迹',
            building: '蜃楼藏金楼',
            output: '稀有矿藏、古物',
            resources: ['沙漠金', '古遗物', '风语石'],
            features: ['遗迹探索', '古物鉴定', '沙漠寻宝'],
            danger: 4
        },
        {
            id: 'you',
            name: '酉时·落霞宝湾',
            time: '17:00-19:00',
            unlockLevel: 41,
            theme: '神秘海湾，深海入口',
            building: '霞光引财灯塔',
            output: '海产、珍珠、深海遗迹',
            resources: ['珍珠', '深海晶', '海怪材料'],
            features: ['海洋捕捞', '珍珠养殖', '深海探险'],
            danger: 4
        },
        {
            id: 'shen',
            name: '申时·雷鸣裂谷',
            time: '15:00-17:00',
            unlockLevel: 41,
            theme: '雷电裂谷，能量结晶',
            building: '惊雷淬金台',
            output: '雷属性灵材',
            resources: ['雷晶', '闪电石', '雷鸣草'],
            features: ['雷属性采集', '能量吸收', '高风险高回报'],
            danger: 5
        },
        {
            id: 'wu',
            name: '午时·金乌圣山',
            time: '11:00-13:00',
            unlockLevel: 61,
            theme: '最高峰，至阳汇聚',
            building: '日冕聚阳鼎',
            output: '顶级材料、守护灵兽',
            resources: ['阳炎石', '金乌羽', '至阳草'],
            features: ['顶级材料采集', '灵兽挑战', '至阳修炼'],
            danger: 5
        },
        {
            id: 'xu',
            name: '戌时·百战擂台',
            time: '19:00-21:00',
            unlockLevel: 61,
            theme: '角斗场，军事要塞',
            building: '斗金演武场',
            output: 'PVP、装备测试',
            resources: ['战魂', '荣誉勋章', '擂台积分'],
            features: ['PVP竞技', '装备测试', '排名挑战'],
            danger: 5
        },
        {
            id: 'hai',
            name: '亥时·幽泉秘府',
            time: '21:00-23:00',
            unlockLevel: 61,
            theme: '地下水系，地底灵脉',
            building: '暗涌蓄财池',
            output: '阴属性灵材、秘密',
            resources: ['幽泉水', '暗灵石', '地底秘宝'],
            features: ['阴属性采集', '秘密探索', '地底冒险'],
            danger: 5
        }
    ],
    
    // 获取可进入的域（根据等级）
    getAvailableDomains: function(level) {
        return this.domains.filter(d => level >= d.unlockLevel);
    },
    
    // 获取当前推荐域
    getRecommendedDomain: function(level) {
        const available = this.getAvailableDomains(level);
        if (available.length === 0) return null;
        
        // 推荐最新解锁的域
        return available[available.length - 1];
    },
    
    // 检查域是否解锁
    isDomainUnlocked: function(domainId, level) {
        const domain = this.domains.find(d => d.id === domainId);
        return domain && level >= domain.unlockLevel;
    },
    
    // 获取域详情
    getDomainInfo: function(domainId) {
        return this.domains.find(d => d.id === domainId) || null;
    },
    
    // 获取下一个解锁的域
    getNextUnlock: function(level) {
        for (let domain of this.domains) {
            if (level < domain.unlockLevel) {
                return {
                    domain: domain,
                    needLevel: domain.unlockLevel,
                    remain: domain.unlockLevel - level
                };
            }
        }
        return null; // 全部解锁
    }
};

// 导出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TwelveDomains;
}