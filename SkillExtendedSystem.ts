import { _decorator, Component } from 'cc';
const { ccclass, property } = _decorator;

/**
 * 财神大陆 - 技能扩展系统（完整版）
 * 50+技能：主动/被动/BUFF/财源系/纳福系/BOSS技能
 * 解锁：Lv.6+ 逐步解锁
 */

@ccclass('SkillExtendedSystem')
export class SkillExtendedSystem extends Component {
    
    // 技能数据库（50+技能）
    skillDatabase: Map<string, any> = new Map();
    
    // 玩家技能数据
    playerSkills: Map<string, any> = new Map();  // playerId -> {skills: [], skillPoints: 0}
    
    onLoad() {
        this.initSkillDatabase();
        console.log('SkillExtendedSystem 加载完成，技能数量:', this.skillDatabase.size);
    }
    
    // 初始化技能数据库
    initSkillDatabase(): void {
        // === 财源系主动技能（攻击类）===
        const caiyuanActive = [
            { id: 'caishen_palm', name: '财神掌', type: 'active', category: 'caiyuan', level: 6, mp: 20, damage: 1.5, cd: 3, desc: '财源系基础攻击，造成150%伤害' },
            { id: 'money_rain', name: '金钱雨', type: 'active', category: 'caiyuan', level: 11, mp: 35, damage: 1.2, aoe: true, cd: 5, desc: '群攻技能，对所有敌人造成120%伤害' },
            { id: 'golden_hammer', name: '金蟾锤', type: 'active', category: 'caiyuan', level: 16, mp: 45, damage: 2.0, stunChance: 0.2, cd: 6, desc: '重击造成200%伤害，20%概率眩晕' },
            { id: 'wealth_torrent', name: '财源如潮', type: 'active', category: 'caiyuan', level: 21, mp: 60, damage: 2.5, cd: 8, desc: '连续3次攻击，每次造成250%伤害' },
            { id: 'dragon_wealth', name: '龙御财源', type: 'active', category: 'caiyuan', level: 31, mp: 80, damage: 3.0, ignoreDefense: 0.3, cd: 10, desc: '龙形财气势，300%伤害无视30%防御' },
            { id: 'caishen_fury', name: '财神之怒', type: 'active', category: 'caiyuan', level: 41, mp: 100, damage: 4.0, cd: 15, desc: '终极财源技，造成400%伤害' },
            { id: 'golden_explosion', name: '金玉满堂', type: 'active', category: 'caiyuan', level: 51, mp: 120, damage: 3.5, aoe: true, burn: true, cd: 12, desc: '大范围爆炸，350%伤害并灼烧' },
            { id: 'infinite_wealth', name: '财源无尽', type: 'active', category: 'caiyuan', level: 61, mp: 150, damage: 5.0, lifeSteal: 0.2, cd: 20, desc: '500%伤害，回复20%伤害值生命' },
            { id: 'caishen_descent', name: '财神降临', type: 'active', category: 'caiyuan', level: 71, mp: 200, damage: 6.0, buff: true, cd: 30, desc: '召唤财神虚影，600%伤害并全队增益' },
            { id: 'wealth_dominion', name: '财源天下', type: 'active', category: 'caiyuan', level: 81, mp: 250, damage: 8.0, aoe: true, cd: 60, desc: '终极奥义，800%大范围伤害' }
        ];
        
        // === 纳福系主动技能（辅助/治疗类）===
        const nafuActive = [
            { id: 'blessing_light', name: '纳福之光', type: 'active', category: 'nafu', level: 6, mp: 25, heal: 0.3, cd: 4, desc: '恢复30%最大生命值' },
            { id: 'wealth_shield', name: '财源护盾', type: 'active', category: 'nafu', level: 11, mp: 30, shield: 0.2, duration: 10, cd: 8, desc: '获得20%最大生命的护盾，持续10秒' },
            { id: 'fortune_step', name: '福运步', type: 'active', category: 'nafu', level: 16, mp: 20, dodgeBuff: 0.15, duration: 8, cd: 10, desc: '闪避率+15%，持续8秒' },
            { id: 'group_heal', name: '普度众生', type: 'active', category: 'nafu', level: 21, mp: 60, heal: 0.2, aoe: true, cd: 10, desc: '全队恢复20%生命' },
            { id: 'revive_light', name: '回魂光', type: 'active', category: 'nafu', level: 31, mp: 100, revive: true, reviveHp: 0.3, cd: 60, desc: '复活一名队友，30%血量' },
            { id: 'divine_protection', name: '天官赐福', type: 'active', category: 'nafu', level: 41, mp: 80, invincible: true, duration: 3, cd: 30, desc: '3秒无敌' },
            { id: 'mana_fountain', name: '法力源泉', type: 'active', category: 'nafu', level: 51, mp: 50, mpRegen: 0.5, duration: 10, cd: 15, desc: '10秒内每秒回复5%法力' },
            { id: 'purification', name: '净化之光', type: 'active', category: 'nafu', level: 61, mp: 70, cleanse: true, heal: 0.15, cd: 12, desc: '解除所有负面状态并恢复15%生命' },
            { id: 'benediction', name: '财神祝福', type: 'active', category: 'nafu', level: 71, mp: 120, allStatsUp: 0.2, duration: 30, cd: 45, desc: '全队全属性+20%，持续30秒' },
            { id: 'miracle', name: '神迹', type: 'active', category: 'nafu', level: 81, mp: 200, fullHeal: true, aoe: true, cd: 120, desc: '全队满血满蓝复活' }
        ];
        
        // === 被动技能（7个）===
        const passiveSkills = [
            { id: 'passive_atk', name: '财源广进', type: 'passive', level: 10, effect: { attack: 0.1 }, desc: '攻击+10%' },
            { id: 'passive_def', name: '守财奴', type: 'passive', level: 10, effect: { defense: 0.1 }, desc: '防御+10%' },
            { id: 'passive_hp', name: '福寿绵长', type: 'passive', level: 10, effect: { maxHp: 0.15 }, desc: '生命+15%' },
            { id: 'passive_mp', name: '法力无边', type: 'passive', level: 10, effect: { maxMp: 0.2 }, desc: '法力+20%' },
            { id: 'passive_crit', name: '暴击财神', type: 'passive', level: 20, effect: { critRate: 0.05 }, desc: '暴击率+5%' },
            { id: 'passive_speed', name: '快马加鞭', type: 'passive', level: 20, effect: { speed: 0.1 }, desc: '速度+10%' },
            { id: 'passive_money', name: '聚宝盆', type: 'passive', level: 30, effect: { moneyBonus: 0.1 }, desc: '金钱获取+10%' }
        ];
        
        // === BOSS技能（用于AI）===
        const bossSkills = [
            { id: 'boss_roar', name: '震慑咆哮', type: 'boss', effect: { stun: 2, aoe: true }, cd: 15, desc: '眩晕全场2秒' },
            { id: 'boss_slam', name: '重击', type: 'boss', damage: 2.0, effect: { knockback: true }, cd: 8, desc: '200%伤害并击退' },
            { id: 'boss_summon', name: '召唤小弟', type: 'boss', effect: { summon: 'minion', count: 2 }, cd: 20, desc: '召唤2个小怪' },
            { id: 'boss_rage', name: '狂暴', type: 'boss', effect: { attackUp: 0.5, speedUp: 0.3 }, duration: 15, cd: 30, desc: '攻击+50%速度+30%' },
            { id: 'boss_heal', name: '大地回春', type: 'boss', effect: { heal: 0.2 }, cd: 25, desc: '恢复20%生命' },
            { id: 'boss_shield', name: '护盾', type: 'boss', effect: { shield: 0.3 }, duration: 10, cd: 20, desc: '获得30%护盾' },
            { id: 'boss_execute', name: '处决', type: 'boss', damage: 5.0, condition: 'hp<0.2', cd: 30, desc: '对低血量敌人500%伤害' },
            { id: 'boss_teleport', name: '瞬移', type: 'boss', effect: { teleport: true }, cd: 10, desc: '瞬移到随机位置' }
        ];
        
        // === 特殊技能 ===
        const specialSkills = [
            { id: 'steal_money', name: '顺手牵羊', type: 'special', level: 25, mp: 30, effect: { stealMoney: 0.1 }, cd: 5, desc: '攻击附带偷取10%金钱' },
            { id: 'exp_boost', name: '经验汲取', type: 'special', level: 35, mp: 50, effect: { expBonus: 0.5, duration: 60 }, cd: 300, desc: '5分钟内经验+50%' },
            { id: 'item_find', name: '寻宝眼', type: 'special', level: 45, mp: 40, effect: { dropRate: 0.2, duration: 120 }, cd: 600, desc: '2分钟内掉率+20%' },
            { id: 'merit_shield', name: '功德护体', type: 'special', level: 55, mp: 0, effect: { consumeMerit: 100, invincible: 1 }, cd: 60, desc: '消耗100功德抵挡一次致命伤' },
            { id: 'luck_burst', name: '鸿运当头', type: 'special', level: 65, mp: 80, effect: { critRate: 1.0, duration: 5 }, cd: 120, desc: '5秒内100%暴击' },
            { id: 'wealth_transfer', name: '财源转移', type: 'special', level: 75, mp: 100, effect: { damageToMoney: 0.5 }, duration: 30, cd: 180, desc: '30秒内伤害的50%转化为金钱' }
        ];
        
        // 存入数据库
        [...caiyuanActive, ...nafuActive, ...passiveSkills, ...bossSkills, ...specialSkills].forEach(skill => {
            this.skillDatabase.set(skill.id, skill);
        });
    }
    
    // 学习技能
    learnSkill(playerId: string, skillId: string, playerLevel: number): {
        success: boolean;
        skill: any;
        message: string;
    } {
        this.initPlayerSkills(playerId);
        const playerData = this.playerSkills.get(playerId);
        const skillTemplate = this.skillDatabase.get(skillId);
        
        if (!skillTemplate) {
            return { success: false, skill: null, message: '技能不存在' };
        }
        
        if (playerLevel < skillTemplate.level) {
            return { success: false, skill: null, message: `需要${skillTemplate.level}级` };
        }
        
        // 检查是否已学习
        if (playerData.skills.some(s => s.id === skillId)) {
            return { success: false, skill: null, message: '已学会该技能' };
        }
        
        // 检查技能点（被动技能需要技能点）
        if (skillTemplate.type === 'passive' && playerData.skillPoints < 1) {
            return { success: false, skill: null, message: '技能点不足' };
        }
        
        // 学习技能
        const learnedSkill = {
            ...skillTemplate,
            learnedTime: Date.now(),
            useCount: 0,
            lastUsed: 0
        };
        
        playerData.skills.push(learnedSkill);
        if (skillTemplate.type === 'passive') {
            playerData.skillPoints--;
        }
        
        return {
            success: true,
            skill: learnedSkill,
            message: `学会【${skillTemplate.name}】！${skillTemplate.desc}`
        };
    }
    
    // 使用主动技能
    useSkill(playerId: string, skillId: string, caster: any, target: any): {
        success: boolean;
        result: any;
        message: string;
    } {
        const playerData = this.playerSkills.get(playerId);
        if (!playerData) return { success: false, result: null, message: '无技能数据' };
        
        const skill = playerData.skills.find(s => s.id === skillId);
        if (!skill) return { success: false, result: null, message: '未学会该技能' };
        
        if (skill.type !== 'active' && skill.type !== 'special') {
            return { success: false, result: null, message: '不是主动技能' };
        }
        
        // 检查冷却
        const now = Date.now();
        if (skill.lastUsed && (now - skill.lastUsed) < skill.cd * 1000) {
            const remain = Math.ceil((skill.cd * 1000 - (now - skill.lastUsed)) / 1000);
            return { success: false, result: null, message: `冷却中，${remain}秒` };
        }
        
        // 检查法力
        if (caster.currentMp < skill.mp) {
            return { success: false, result: null, message: '法力不足' };
        }
        
        // 执行技能
        caster.currentMp -= skill.mp;
        skill.lastUsed = now;
        skill.useCount++;
        
        const result = this.calculateSkillEffect(skill, caster, target);
        
        return {
            success: true,
            result: result,
            message: `使用【${skill.name}】！`
        };
    }
    
    // 计算技能效果
    calculateSkillEffect(skill: any, caster: any, target: any): any {
        const result: any = {};
        
        // 伤害
        if (skill.damage) {
            result.damage = Math.floor(caster.attack * skill.damage);
        }
        
        // 治疗
        if (skill.heal) {
            result.heal = Math.floor(caster.maxHp * skill.heal);
        }
        
        // 护盾
        if (skill.shield) {
            result.shield = Math.floor(caster.maxHp * skill.shield);
        }
        
        // BUFF
        if (skill.buff || skill.allStatsUp) {
            result.buff = {
                duration: skill.duration || 0,
                effects: skill.effect || {}
            };
        }
        
        return result;
    }
    
    // 获取被动技能效果
    getPassiveEffects(playerId: string): any {
        const playerData = this.playerSkills.get(playerId);
        if (!playerData) return {};
        
        const effects = {};
        const passiveSkills = playerData.skills.filter(s => s.type === 'passive');
        
        for (const skill of passiveSkills) {
            if (skill.effect) {
                Object.assign(effects, skill.effect);
            }
        }
        
        return effects;
    }
    
    // 初始化玩家技能数据
    initPlayerSkills(playerId: string): void {
        if (!this.playerSkills.has(playerId)) {
            this.playerSkills.set(playerId, {
                playerId: playerId,
                skills: [],
                skillPoints: 0,
                totalSkillsLearned: 0
            });
        }
    }
    
    // 获取玩家可用技能
    getAvailableSkills(playerId: string, playerLevel: number): any[] {
        this.initPlayerSkills(playerId);
        const playerData = this.playerSkills.get(playerId);
        const learnedIds = new Set(playerData.skills.map(s => s.id));
        
        const available = [];
        for (const [id, skill] of this.skillDatabase) {
            if (skill.type === 'boss') continue;  // BOSS技能玩家不能学
            if (playerLevel >= skill.level && !learnedIds.has(id)) {
                available.push(skill);
            }
        }
        
        return available.sort((a, b) => a.level - b.level);
    }
    
    // 获取玩家已学技能
    getLearnedSkills(playerId: string): any[] {
        this.initPlayerSkills(playerId);
        return this.playerSkills.get(playerId).skills;
    }
}