import { _decorator, Component } from 'cc';
const { ccclass, property } = _decorator;

/**
 * 财神大陆 - 战斗系统（完整版）
 * 伤害公式、技能系统、属性成长、装备加成
 */

@ccclass('CombatSystem')
export class CombatSystem extends Component {
    
    // 基础属性配置
    baseAttributes = {
        hp: { base: 100, growth: 20 },      // 生命值 = 100 + 等级×20
        attack: { base: 10, growth: 3 },     // 攻击力 = 10 + 等级×3
        defense: { base: 5, growth: 2 },     // 防御力 = 5 + 等级×2
        critRate: 0.05,                       // 暴击率 5%
        critDamage: 1.5,                      // 暴击伤害 1.5倍
        moveSpeed: 100,                       // 移动速度
        luck: 0                               // 幸运值（影响掉落）
    };
    
    // 技能配置
    skills = {
        normalAttack: {
            name: '普通攻击',
            multiplier: 1.0,
            cost: 0,
            cooldown: 0,
            type: 'physical',
            description: '基础物理攻击'
        },
        gatherWealth: {
            name: '聚财术',
            multiplier: 1.2,
            cost: 20,
            cooldown: 3,
            type: 'magic',
            target: 'aoe',
            description: '聚集财气，对范围内敌人造成伤害'
        },
        blessFortune: {
            name: '纳福术',
            multiplier: 0.8,
            cost: 30,
            cooldown: 5,
            type: 'heal',
            target: 'self',
            description: '吸纳福气，恢复自身生命'
        },
        thunderStrike: {
            name: '雷霆一击',
            multiplier: 1.5,
            cost: 40,
            cooldown: 8,
            type: 'magic',
            target: 'single',
            description: '召唤雷霆，对单个敌人造成高额伤害'
        },
        wealthExplosion: {
            name: '财源爆发',
            multiplier: 2.0,
            cost: 60,
            cooldown: 15,
            type: 'magic',
            target: 'aoe',
            description: '爆发财源之力，对周围造成巨额伤害'
        }
    };
    
    // 装备品质加成
    equipmentQualities = {
        normal: { name: '普通', color: 'white', multiplier: 0 },
        fine: { name: '精良', color: 'green', multiplier: 0.2 },
        rare: { name: '稀有', color: 'blue', multiplier: 0.5 },
        epic: { name: '史诗', color: 'purple', multiplier: 1.0 },
        legendary: { name: '传说', color: 'orange', multiplier: 2.0 }
    };
    
    // 装备类型
    equipmentSlots = {
        weapon: { name: '武器', attackBonus: true },
        armor: { name: '护甲', defenseBonus: true },
        helmet: { name: '头盔', hpBonus: true },
        accessory: { name: '饰品', specialBonus: true }
    };
    
    // 计算基础属性
    calculateBaseAttributes(level: number): { hp: number; attack: number; defense: number } {
        return {
            hp: this.baseAttributes.hp.base + level * this.baseAttributes.hp.growth,
            attack: this.baseAttributes.attack.base + level * this.baseAttributes.attack.growth,
            defense: this.baseAttributes.defense.base + level * this.baseAttributes.defense.growth
        };
    }
    
    // 计算装备加成
    calculateEquipmentBonus(equipment: any[]): { attack: number; defense: number; hp: number; critRate: number } {
        let bonus = { attack: 0, defense: 0, hp: 0, critRate: 0 };
        
        for (const item of equipment) {
            if (!item) continue;
            
            const quality = this.equipmentQualities[item.quality];
            if (!quality) continue;
            
            const multiplier = 1 + quality.multiplier;
            
            switch (item.slot) {
                case 'weapon':
                    bonus.attack += item.baseAttack * multiplier;
                    break;
                case 'armor':
                    bonus.defense += item.baseDefense * multiplier;
                    break;
                case 'helmet':
                    bonus.hp += item.baseHp * multiplier;
                    break;
                case 'accessory':
                    if (item.effect === 'crit') bonus.critRate += 0.05;
                    break;
            }
        }
        
        return bonus;
    }
    
    // 计算最终属性
    calculateFinalAttributes(player: any): any {
        const base = this.calculateBaseAttributes(player.level);
        const equip = this.calculateEquipmentBonus(player.equipment || []);
        
        return {
            hp: Math.floor(base.hp + equip.hp),
            attack: Math.floor(base.attack + equip.attack),
            defense: Math.floor(base.defense + equip.defense),
            critRate: this.baseAttributes.critRate + equip.critRate,
            critDamage: this.baseAttributes.critDamage,
            moveSpeed: this.baseAttributes.moveSpeed
        };
    }
    
    // 伤害计算公式（完整版）
    calculateDamage(attacker: any, defender: any, skillId: string = 'normalAttack'): { 
        damage: number; 
        isCrit: boolean; 
        isMiss: boolean;
        detail: string;
    } {
        const attackerAttrs = this.calculateFinalAttributes(attacker);
        const defenderAttrs = this.calculateFinalAttributes(defender);
        
        const skill = this.skills[skillId];
        if (!skill) {
            return { damage: 0, isCrit: false, isMiss: true, detail: '技能不存在' };
        }
        
        // 基础伤害
        let baseDamage = attackerAttrs.attack - defenderAttrs.defense;
        if (baseDamage < 1) baseDamage = 1;
        
        // 技能倍率
        let damage = baseDamage * skill.multiplier;
        
        // 随机波动 (0.9 - 1.1)
        const randomFactor = 0.9 + Math.random() * 0.2;
        damage *= randomFactor;
        
        // 暴击判定
        let isCrit = false;
        if (Math.random() < attackerAttrs.critRate) {
            isCrit = true;
            damage *= attackerAttrs.critDamage;
        }
        
        // 幸运值影响（闪避）
        let isMiss = false;
        const missChance = (defenderAttrs.luck || 0) * 0.01;
        if (Math.random() < missChance) {
            isMiss = true;
            damage = 0;
        }
        
        // 时辰加成（如果有）
        if (attacker.hourBonus && attacker.hourBonus.damage) {
            damage *= attacker.hourBonus.damage;
        }
        
        return {
            damage: Math.floor(damage),
            isCrit,
            isMiss,
            detail: `${attacker.name}使用${skill.name}对${defender.name}造成${Math.floor(damage)}点伤害${isCrit ? '(暴击!)' : ''}${isMiss ? '(闪避!)' : ''}`
        };
    }
    
    // BOSS属性生成
    generateBossAttributes(bossTemplate: any, playerLevel: number): any {
        const playerAttrs = this.calculateBaseAttributes(playerLevel);
        
        return {
            name: bossTemplate.name,
            level: bossTemplate.level,
            hp: Math.floor(playerAttrs.hp * (bossTemplate.hpMultiplier || 4)),
            attack: Math.floor(playerAttrs.attack * (bossTemplate.attackMultiplier || 1.2)),
            defense: Math.floor(playerAttrs.defense * (bossTemplate.defenseMultiplier || 1.5)),
            skills: bossTemplate.skills || [],
            rewards: bossTemplate.rewards || []
        };
    }
    
    // 战斗模拟（完整回合制）
    simulateBattle(player: any, enemy: any, maxRounds: number = 50): {
        winner: string;
        rounds: number;
        log: string[];
        playerHpRemaining: number;
        enemyHpRemaining: number;
    } {
        const log = [];
        
        const playerAttrs = this.calculateFinalAttributes(player);
        const enemyAttrs = this.calculateFinalAttributes(enemy);
        
        let playerHp = playerAttrs.hp;
        let enemyHp = enemyAttrs.hp;
        
        let round = 0;
        
        while (round < maxRounds && playerHp > 0 && enemyHp > 0) {
            round++;
            log.push(`--- 第${round}回合 ---`);
            
            // 玩家攻击
            const playerAttack = this.calculateDamage(player, enemy);
            if (!playerAttack.isMiss) {
                enemyHp -= playerAttack.damage;
                log.push(playerAttack.detail);
                log.push(`${enemy.name}剩余HP: ${Math.max(0, enemyHp)}`);
            } else {
                log.push(`${player.name}的攻击被闪避！`);
            }
            
            if (enemyHp <= 0) break;
            
            // 敌人攻击
            const enemyAttack = this.calculateDamage(enemy, player);
            if (!enemyAttack.isMiss) {
                playerHp -= enemyAttack.damage;
                log.push(enemyAttack.detail);
                log.push(`${player.name}剩余HP: ${Math.max(0, playerHp)}`);
            } else {
                log.push(`${enemy.name}的攻击被闪避！`);
            }
        }
        
        const winner = playerHp > 0 ? player.name : enemy.name;
        log.push(`=== 战斗结束: ${winner}获胜！ ===`);
        
        return {
            winner,
            rounds: round,
            log,
            playerHpRemaining: Math.max(0, playerHp),
            enemyHpRemaining: Math.max(0, enemyHp)
        };
    }
    
    // 技能冷却管理
    skillCooldowns: Map<string, number> = new Map();
    
    canUseSkill(playerId: string, skillId: string): boolean {
        const key = `${playerId}_${skillId}`;
        const cooldownEnd = this.skillCooldowns.get(key) || 0;
        return Date.now() >= cooldownEnd;
    }
    
    useSkill(playerId: string, skillId: string): boolean {
        const skill = this.skills[skillId];
        if (!skill) return false;
        
        const key = `${playerId}_${skillId}`;
        const cooldownEnd = Date.now() + skill.cooldown * 1000;
        this.skillCooldowns.set(key, cooldownEnd);
        
        return true;
    }
    
    // 装备强化系统
    enhanceEquipment(equipment: any, targetLevel: number): { 
        success: boolean; 
        newLevel: number; 
        cost: number;
        message: string;
    } {
        const currentLevel = equipment.enhanceLevel || 0;
        if (currentLevel >= 10) {
            return { success: false, newLevel: currentLevel, cost: 0, message: '已达最大强化等级' };
        }
        
        if (targetLevel <= currentLevel) {
            return { success: false, newLevel: currentLevel, cost: 0, message: '目标等级必须高于当前等级' };
        }
        
        const successRates = [1.0, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.35, 0.3, 0.25];
        const costs = [100, 200, 400, 800, 1600, 3200, 6400, 12800, 25600, 51200];
        
        let totalCost = 0;
        let current = currentLevel;
        
        for (let i = currentLevel; i < targetLevel && i < 10; i++) {
            const rate = successRates[i];
            const cost = costs[i];
            totalCost += cost;
            
            if (Math.random() < rate) {
                current++;
            } else {
                return { 
                    success: false, 
                    newLevel: current, 
                    cost: totalCost, 
                    message: `强化失败！停留在+${current}` 
                };
            }
        }
        
        return { 
            success: true, 
            newLevel: current, 
            cost: totalCost, 
            message: `强化成功！达到+${current}` 
        };
    }
    
    onLoad() {
        console.log('CombatSystem 加载完成');
        console.log('技能数量:', Object.keys(this.skills).length);
        console.log('装备品质:', Object.keys(this.equipmentQualities).length);
    }
}