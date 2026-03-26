import { _decorator, Component } from 'cc';
const { ccclass, property } = _decorator;

/**
 * 财神大陆 - 门派系统（完整版）
 * 十二大门派 + 门主竞选 + 门派技能 + 门派任务
 */

@ccclass('SectSystem')
export class SectSystem extends Component {
    
    // 十二大门派配置
    sects = {
        'ziyuan': {
            id: 'ziyuan',
            name: '子渊门',
            hour: '子',
            element: '水',
            theme: '矿脉挖掘',
            description: '源自子时墨玉矿渊，擅长挖掘与资源获取',
            skills: {
                passive: { name: '矿脉感知', effect: '采矿速度+20%' },
                active: { name: '深渊挖掘', effect: '立即获得大量矿石', cooldown: 300 },
                formation: { name: '矿脉大阵', effect: '全门派采矿效率+30%', duration: 3600 }
            },
            master: null,
            members: [],
            contribution: 0,
            elders: []
        },
        'xuanpin': {
            id: 'xuanpin',
            name: '玄牝宗',
            hour: '丑',
            element: '土',
            theme: '畜牧养殖',
            description: '源自丑时玄牝牧场，擅长灵兽驯养与繁殖',
            skills: {
                passive: { name: '灵兽亲和', effect: '驯养成功率+20%' },
                active: { name: '万兽召唤', effect: '召唤灵兽协助战斗', cooldown: 300 },
                formation: { name: '牧场大阵', effect: '全门派生命恢复+50%', duration: 3600 }
            },
            master: null,
            members: [],
            contribution: 0,
            elders: []
        },
        'qingmu': {
            id: 'qingmu',
            name: '青木堂',
            hour: '寅',
            element: '木',
            theme: '精怪契约',
            description: '源自寅时破晓林海，擅长与精怪建立契约',
            skills: {
                passive: { name: '精怪亲和', effect: '契约成功率+30%' },
                active: { name: '万木回春', effect: '召唤树人治疗队友', cooldown: 300 },
                formation: { name: '林海大阵', effect: '全门派控制技能+1秒', duration: 3600 }
            },
            master: null,
            members: [],
            contribution: 0,
            elders: []
        },
        'jinxi': {
            id: 'jinxi',
            name: '金曦阁',
            hour: '卯',
            element: '木',
            theme: '农田经营',
            description: '源自卯时金曦原野，擅长农耕与资源稳定产出',
            skills: {
                passive: { name: '丰收祝福', effect: '作物产量+20%' },
                active: { name: '五谷丰登', effect: '立即收获所有作物', cooldown: 600 },
                formation: { name: '田野大阵', effect: '全门派资源获取+20%', duration: 3600 }
            },
            master: null,
            members: [],
            contribution: 0,
            elders: []
        },
        'yunhai': {
            id: 'yunhai',
            name: '云海商',
            hour: '辰',
            element: '土',
            theme: '贸易经商',
            description: '源自辰时云海天市，擅长贸易与商业运作',
            skills: {
                passive: { name: '商贾之道', effect: '交易税-10%' },
                active: { name: '财运亨通', effect: '立即获得大量香火钱', cooldown: 600 },
                formation: { name: '商路大阵', effect: '全门派交易税-20%', duration: 3600 }
            },
            master: null,
            members: [],
            contribution: 0,
            elders: []
        },
        'chiyan': {
            id: 'chiyan',
            name: '赤焰盟',
            hour: '巳',
            element: '火',
            theme: '锻造冶炼',
            description: '源自巳时赤焰熔炉，擅长装备打造与强化',
            skills: {
                passive: { name: '锻造大师', effect: '锻造成功率+20%' },
                active: { name: '神兵铸造', effect: '打造装备必出精良以上', cooldown: 1800 },
                formation: { name: '熔炉大阵', effect: '全门派强化成功率+15%', duration: 3600 }
            },
            master: null,
            members: [],
            contribution: 0,
            elders: []
        },
        'jinwu': {
            id: 'jinwu',
            name: '金乌教',
            hour: '午',
            element: '火',
            theme: '战斗竞技',
            description: '源自午时金乌圣山，擅长PVP与竞技战斗',
            skills: {
                passive: { name: '战斗狂热', effect: 'PVP伤害+15%' },
                active: { name: '金乌降临', effect: '攻击力翻倍持续30秒', cooldown: 300 },
                formation: { name: '战阵', effect: '全门派攻击力+20%', duration: 3600 }
            },
            master: null,
            members: [],
            contribution: 0,
            elders: []
        },
        'fengyu': {
            id: 'fengyu',
            name: '风语会',
            hour: '未',
            element: '土',
            theme: '考古探险',
            description: '源自未时风语沙碛，擅长探索与考古',
            skills: {
                passive: { name: '探险家', effect: '迷宫视野+30%' },
                active: { name: '宝藏定位', effect: '显示最近宝藏位置', cooldown: 600 },
                formation: { name: '探险大阵', effect: '全门派幸运值+50', duration: 3600 }
            },
            master: null,
            members: [],
            contribution: 0,
            elders: []
        },
        'leiming': {
            id: 'leiming',
            name: '雷鸣派',
            hour: '申',
            element: '金',
            theme: '极限挑战',
            description: '源自申时雷鸣裂谷，擅长极限挑战与暴击',
            skills: {
                passive: { name: '雷霆之力', effect: '暴击率+10%' },
                active: { name: '雷霆万钧', effect: '下次攻击必暴击且伤害×3', cooldown: 300 },
                formation: { name: '雷阵', effect: '全门派暴击伤害+50%', duration: 3600 }
            },
            master: null,
            members: [],
            contribution: 0,
            elders: []
        },
        'luoxia': {
            id: 'luoxia',
            name: '落霞帮',
            hour: '酉',
            element: '金',
            theme: '航海探险',
            description: '源自酉时落霞宝湾，擅长航海与海底探险',
            skills: {
                passive: { name: '航海家', effect: '航海速度+30%' },
                active: { name: '深海潜行', effect: '水下呼吸无限持续10分钟', cooldown: 600 },
                formation: { name: '海航大阵', effect: '全门派移动速度+30%', duration: 3600 }
            },
            master: null,
            members: [],
            contribution: 0,
            elders: []
        },
        'baizhan': {
            id: 'baizhan',
            name: '百战军',
            hour: '戌',
            element: '土',
            theme: '军团作战',
            description: '源自戌时百战擂台，擅长团队配合与阵营战',
            skills: {
                passive: { name: '军团协作', effect: '团队配合伤害+20%' },
                active: { name: '战鼓雷鸣', effect: '全队攻击力+50%持续60秒', cooldown: 600 },
                formation: { name: '军阵', effect: '全门派防御+30%', duration: 3600 }
            },
            master: null,
            members: [],
            contribution: 0,
            elders: []
        },
        'youquan': {
            id: 'youquan',
            name: '幽泉阁',
            hour: '亥',
            element: '水',
            theme: '暗杀潜行',
            description: '源自亥时幽泉秘府，擅长潜行与暗杀',
            skills: {
                passive: { name: '暗影步', effect: '潜行时间+50%' },
                active: { name: '致命一击', effect: '隐身状态下必暴击', cooldown: 300 },
                formation: { name: '暗影大阵', effect: '全门派闪避率+20%', duration: 3600 }
            },
            master: null,
            members: [],
            contribution: 0,
            elders: []
        }
    };
    
    // 门派成员等级
    memberRanks = {
        outer: { name: '外门弟子', contribution: 0, permissions: ['基础技能'] },
        inner: { name: '内门弟子', contribution: 1000, permissions: ['进阶技能', '门派任务'] },
        core: { name: '核心弟子', contribution: 5000, permissions: ['门派仓库', '门派战'] },
        elder: { name: '长老', contribution: 20000, permissions: ['收徒', '发布任务'] },
        master: { name: '掌门', contribution: 0, permissions: ['全部权限'] }
    };
    
    // 门主竞选配置
    electionConfig = {
        term: 14 * 24 * 60 * 60 * 1000,  // 2周（毫秒）
        minVoters: 10,  // 最少投票人数
        autoWinThreshold: 0.5,  // 超过50%票数自动当选
        contributionWeight: 0.3  // 贡献度权重30%
    };
    
    // 获取门派信息
    getSect(sectId: string): any {
        return this.sects[sectId] || null;
    }
    
    // 加入门派
    joinSect(playerId: string, sectId: string, playerLevel: number, playerSect: string | null): { 
        success: boolean; 
        message: string;
    } {
        if (playerLevel < 55) {
            return { success: false, message: '55级才能加入门派' };
        }
        
        if (playerSect) {
            return { success: false, message: '已加入门派，需先退出' };
        }
        
        const sect = this.sects[sectId];
        if (!sect) {
            return { success: false, message: '门派不存在' };
        }
        
        sect.members.push({
            playerId: playerId,
            rank: 'outer',
            contribution: 0,
            joinTime: Date.now()
        });
        
        return { success: true, message: `成功加入${sect.name}！` };
    }
    
    // 退出门派
    leaveSect(playerId: string, sectId: string): {
        success: boolean;
        message: string;
        penalty: number;
    } {
        const sect = this.sects[sectId];
        if (!sect) {
            return { success: false, message: '门派不存在', penalty: 0 };
        }
        
        const member = sect.members.find(m => m.playerId === playerId);
        if (!member) {
            return { success: false, message: '不是该门派成员', penalty: 0 };
        }
        
        const penalty = Math.floor(member.contribution * 0.5);
        
        sect.members = sect.members.filter(m => m.playerId !== playerId);
        
        return { 
            success: true, 
            message: `退出${sect.name}，损失${penalty}贡献度`,
            penalty: penalty
        };
    }
    
    // 增加贡献度
    addContribution(playerId: string, sectId: string, amount: number): void {
        const sect = this.sects[sectId];
        if (!sect) return;
        
        const member = sect.members.find(m => m.playerId === playerId);
        if (!member) return;
        
        member.contribution += amount;
        sect.contribution += amount;
        
        // 检查等级提升
        this.checkRankUp(member);
    }
    
    // 检查等级提升
    checkRankUp(member: any): void {
        for (const [rankId, rankData] of Object.entries(this.memberRanks)) {
            if (rankId === 'master') continue;
            if (member.rank === rankId) continue;
            
            if (member.contribution >= rankData.contribution) {
                // 检查是否已满足前置等级
                const rankOrder = ['outer', 'inner', 'core', 'elder'];
                const currentIdx = rankOrder.indexOf(member.rank);
                const targetIdx = rankOrder.indexOf(rankId);
                
                if (targetIdx === currentIdx + 1) {
                    member.rank = rankId;
                    break;
                }
            }
        }
    }
    
    // 门主竞选
    startElection(sectId: string): {
        candidates: string[];
        endTime: number;
    } | null {
        const sect = this.sects[sectId];
        if (!sect) return null;
        
        // 获取贡献前10名
        const candidates = sect.members
            .sort((a, b) => b.contribution - a.contribution)
            .slice(0, 10)
            .map(m => m.playerId);
        
        return {
            candidates: candidates,
            endTime: Date.now() + this.electionConfig.term
        };
    }
    
    // 投票
    vote(sectId: string, voterId: string, candidateId: string): {
        success: boolean;
        message: string;
    } {
        const sect = this.sects[sectId];
        if (!sect) {
            return { success: false, message: '门派不存在' };
        }
        
        // 检查是否是成员
        const voter = sect.members.find(m => m.playerId === voterId);
        if (!voter) {
            return { success: false, message: '只有门派成员可以投票' };
        }
        
        // 检查候选人
        const candidate = sect.members.find(m => m.playerId === candidateId);
        if (!candidate) {
            return { success: false, message: '候选人不存在' };
        }
        
        // 计算票数（贡献度加权）
        const voteWeight = 1 + (voter.contribution * this.electionConfig.contributionWeight / 1000);
        
        // 记录投票（实际应存储到数据库）
        // votes[candidateId] = (votes[candidateId] || 0) + voteWeight;
        
        return { success: true, message: '投票成功！' };
    }
    
    // 选举结果
    finalizeElection(sectId: string, votes: Map<string, number>): {
        winner: string | null;
        results: { playerId: string; votes: number }[];
    } {
        const sect = this.sects[sectId];
        if (!sect) return { winner: null, results: [] };
        
        const totalVotes = Array.from(votes.values()).reduce((a, b) => a + b, 0);
        
        // 如果投票人数不足10人，贡献第一当选
        if (votes.size < this.electionConfig.minVoters) {
            const topContributor = sect.members
                .sort((a, b) => b.contribution - a.contribution)[0];
            
            if (topContributor) {
                sect.master = topContributor.playerId;
                return {
                    winner: topContributor.playerId,
                    results: [{ playerId: topContributor.playerId, votes: 0 }]
                };
            }
        }
        
        // 正常选举
        const sorted = Array.from(votes.entries())
            .sort((a, b) => b[1] - a[1])
            .map(([playerId, voteCount]) => ({ playerId, votes: voteCount }));
        
        if (sorted.length > 0) {
            const winner = sorted[0];
            const winnerRatio = winner.votes / totalVotes;
            
            if (winnerRatio > this.electionConfig.autoWinThreshold) {
                sect.master = winner.playerId;
                return { winner: winner.playerId, results: sorted };
            }
        }
        
        return { winner: null, results: sorted };
    }
    
    // 开启门派大阵
    activateFormation(sectId: string, playerId: string): {
        success: boolean;
        message: string;
    } {
        const sect = this.sects[sectId];
        if (!sect) {
            return { success: false, message: '门派不存在' };
        }
        
        if (sect.master !== playerId) {
            return { success: false, message: '只有掌门可以开启大阵' };
        }
        
        const formation = sect.skills.formation;
        // 实际应设置定时器，一段时间后效果消失
        
        return { 
            success: true, 
            message: `${formation.name}已开启！${formation.effect}持续1小时` 
        };
    }
    
    // 获取门派任务
    getSectTasks(sectId: string, playerRank: string): any[] {
        const tasks = [
            { name: '日常贡献', desc: '完成3个门派活动', reward: '贡献+100，修为+200' },
            { name: '周常挑战', desc: '参与1次门派战', reward: '贡献+500，稀有材料' },
            { name: '门派远征', desc: '与其他门派争夺资源点', reward: '大量贡献+专属称号' }
        ];
        
        // 根据等级返回不同任务
        if (playerRank === 'outer') {
            return [tasks[0]];
        } else if (playerRank === 'inner') {
            return tasks.slice(0, 2);
        } else {
            return tasks;
        }
    }
    
    // 获取成员列表
    getMemberList(sectId: string): any[] {
        const sect = this.sects[sectId];
        if (!sect) return [];
        
        return sect.members.map(m => ({
            playerId: m.playerId,
            rank: this.memberRanks[m.rank]?.name || m.rank,
            contribution: m.contribution,
            joinTime: m.joinTime
        }));
    }
    
    onLoad() {
        console.log('SectSystem 加载完成');
        console.log('十二门派:', Object.keys(this.sects).length);
    }
}