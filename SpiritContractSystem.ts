import { _decorator, Component } from 'cc';
const { ccclass, property } = _decorator;

/**
 * 财神大陆 - 精怪契约系统（完整版）
 * 寅时·破晓林海特色玩法
 * 最多3只精怪助战
 * 解锁：Lv.11+ 寅时·破晓林海
 */

@ccclass('SpiritContractSystem')
export class SpiritContractSystem extends Component {
    
    // 精怪数据库
    spiritDatabase: Map<string, any> = new Map();
    
    // 玩家精怪数据
    playerSpirits: Map<string, any> = new Map();  // playerId -> {contracted: [], active: []}
    
    // 最大契约数
    maxContracts = 3;
    
    onLoad() {
        this.initSpiritDatabase();
        console.log('SpiritContractSystem 加载完成，精怪种类:', this.spiritDatabase.size);
    }
    
    // 初始化精怪数据库
    initSpiritDatabase(): void {
        const spirits = [
            {
                id: 'small_treant',
                name: '小树人',
                type: 'heal',
                level: 11,
                element: 'wood',
                description: '森林中最温和的精怪，战斗中会缓慢恢复主人生命',
                appearance: '小巧的树精，头顶嫩绿树叶',
                skill: '生命甘露',
                effect: { hpRegen: 5, interval: 5 },  // 每5秒恢复5%生命
                personality: '温顺',
                contractDifficulty: 1
            },
            {
                id: 'vine_demon',
                name: '藤蔓妖',
                type: 'control',
                level: 13,
                element: 'wood',
                description: '灵活的藤蔓精怪，战斗中会缠绕敌人使其定身',
                appearance: '藤蔓编织的人形，双眼闪烁绿光',
                skill: '藤蔓缠绕',
                effect: { bindChance: 0.15, bindDuration: 2 },  // 15%概率缠绕2秒
                personality: '调皮',
                contractDifficulty: 2
            },
            {
                id: 'greenwood_spirit',
                name: '青木灵',
                type: 'attack',
                level: 15,
                element: 'wood',
                description: '森林中的高级精怪，攻击附带木属性伤害',
                appearance: '半透明的绿色灵体，周身环绕树叶',
                skill: '青木刺',
                effect: { damageBonus: 0.1, elementDamage: 20 },  // +10%伤害，附加20木伤
                personality: '高傲',
                contractDifficulty: 3
            },
            {
                id: 'mushroom_sprite',
                name: '蘑菇精灵',
                type: 'support',
                level: 12,
                element: 'wood',
                description: '可爱的蘑菇精怪，能释放孢子迷惑敌人',
                appearance: '头顶彩色蘑菇帽的小精灵',
                skill: '迷幻孢子',
                effect: { confuseChance: 0.1, confuseDuration: 3 },  // 10%概率迷惑3秒
                personality: '活泼',
                contractDifficulty: 1
            },
            {
                id: 'bark_guardian',
                name: '树皮守护者',
                type: 'defense',
                level: 14,
                element: 'wood',
                description: '树皮铠甲的精怪，能为主人提供防御加成',
                appearance: '全身覆盖坚硬树皮的人形',
                skill: '树皮护甲',
                effect: { defenseBonus: 15, damageReduction: 0.1 },  // +15防御，10%减伤
                personality: '忠诚',
                contractDifficulty: 2
            },
            {
                id: 'flower_fairy',
                name: '花仙子',
                type: 'buff',
                level: 16,
                element: 'wood',
                description: '花朵化身的精怪，能释放香气提升主人属性',
                appearance: '花瓣翅膀的仙子，手持花杖',
                skill: '花香鼓舞',
                effect: { allStatsUp: 5, duration: 30 },  // 全属性+5，持续30秒（战斗开始时）
                personality: '优雅',
                contractDifficulty: 3
            },
            {
                id: 'root_serpent',
                name: '根须蛇',
                type: 'debuff',
                level: 17,
                element: 'wood',
                description: '地下根须化形的精怪，能削弱敌人的防御',
                appearance: '树根编织的蛇形生物',
                skill: '根须侵蚀',
                effect: { defenseDown: 10, slowEffect: 0.2 },  // 敌人防御-10，减速20%
                personality: '狡猾',
                contractDifficulty: 3
            },
            {
                id: 'ancient_treant',
                name: '古树精',
                type: 'tank',
                level: 20,
                element: 'wood',
                description: '千年古树成精，拥有极高的生命和防御',
                appearance: '巨大的树人，身上布满苔藓',
                skill: '大地守护',
                effect: { hpBonus: 100, tauntChance: 0.2 },  // +100生命，20%概率嘲讽
                personality: '沉稳',
                contractDifficulty: 4
            }
        ];
        
        spirits.forEach(spirit => {
            this.spiritDatabase.set(spirit.id, spirit);
        });
    }
    
    // 契约精怪
    contractSpirit(playerId: string, spiritId: string, playerLevel: number): {
        success: boolean;
        spirit: any;
        message: string;
    } {
        this.initPlayerSpirits(playerId);
        const playerData = this.playerSpirits.get(playerId);
        const spiritTemplate = this.spiritDatabase.get(spiritId);
        
        if (!spiritTemplate) {
            return { success: false, spirit: null, message: '精怪不存在' };
        }
        
        if (playerLevel < spiritTemplate.level) {
            return { success: false, spirit: null, message: `需要${spiritTemplate.level}级才能契约` };
        }
        
        // 检查是否已达上限
        if (playerData.contracted.length >= this.maxContracts) {
            return { success: false, spirit: null, message: `最多只能契约${this.maxContracts}只精怪` };
        }
        
        // 检查是否已契约
        if (playerData.contracted.some(s => s.id === spiritId)) {
            return { success: false, spirit: null, message: '已契约该精怪' };
        }
        
        // 契约难度判定（简化版）
        const successRate = 1 - (spiritTemplate.contractDifficulty * 0.15);
        if (Math.random() > successRate) {
            return { success: false, spirit: null, message: '契约失败，精怪逃走了' };
        }
        
        // 创建契约
        const contractedSpirit = {
            instanceId: `spirit_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            ...spiritTemplate,
            contractTime: Date.now(),
            exp: 0,
            level: 1,
            loyalty: 50,
            isActive: false
        };
        
        playerData.contracted.push(contractedSpirit);
        
        return {
            success: true,
            spirit: contractedSpirit,
            message: `契约成功！${spiritTemplate.name}愿意跟随你（${playerData.contracted.length}/${this.maxContracts}）`
        };
    }
    
    // 设置助战精怪
    setActiveSpirit(playerId: string, spiritInstanceId: string): {
        success: boolean;
        message: string;
    } {
        const playerData = this.playerSpirits.get(playerId);
        if (!playerData) {
            return { success: false, message: '无精怪数据' };
        }
        
        const spirit = playerData.contracted.find(s => s.instanceId === spiritInstanceId);
        if (!spirit) {
            return { success: false, message: '未契约该精怪' };
        }
        
        // 切换状态
        spirit.isActive = !spirit.isActive;
        
        if (spirit.isActive) {
            return { success: true, message: `${spirit.name}已设置为助战状态` };
        } else {
            return { success: true, message: `${spirit.name}已取消助战` };
        }
    }
    
    // 解除契约
    breakContract(playerId: string, spiritInstanceId: string): {
        success: boolean;
        message: string;
    } {
        const playerData = this.playerSpirits.get(playerId);
        if (!playerData) {
            return { success: false, message: '无精怪数据' };
        }
        
        const spiritIndex = playerData.contracted.findIndex(s => s.instanceId === spiritInstanceId);
        if (spiritIndex === -1) {
            return { success: false, message: '未契约该精怪' };
        }
        
        const spirit = playerData.contracted[spiritIndex];
        playerData.contracted.splice(spiritIndex, 1);
        
        return { success: true, message: `已与${spirit.name}解除契约` };
    }
    
    // 培养精怪（喂食/训练）
    trainSpirit(playerId: string, spiritInstanceId: string, materialType: string): {
        success: boolean;
        result: any;
        message: string;
    } {
        const playerData = this.playerSpirits.get(playerId);
        if (!playerData) {
            return { success: false, result: null, message: '无精怪数据' };
        }
        
        const spirit = playerData.contracted.find(s => s.instanceId === spiritInstanceId);
        if (!spirit) {
            return { success: false, result: null, message: '精怪不存在' };
        }
        
        const materials = {
            wood_essence: { exp: 50, loyalty: 5, cost: 100 },
            spirit_water: { exp: 100, loyalty: 10, cost: 300 },
            ancient_bark: { exp: 200, loyalty: 15, cost: 500 }
        };
        
        const material = materials[materialType];
        if (!material) {
            return { success: false, result: null, message: '培养材料不存在' };
        }
        
        // 增加经验和忠诚度
        spirit.exp += material.exp;
        spirit.loyalty = Math.min(100, spirit.loyalty + material.loyalty);
        
        // 检查升级
        const leveledUp = this.checkSpiritLevelUp(spirit);
        
        return {
            success: true,
            result: { expGained: material.exp, loyaltyGained: material.loyalty, leveledUp },
            message: leveledUp 
                ? `${spirit.name}升级至${spirit.level}级！`
                : `${spirit.name}获得培养，经验+${material.exp}`
        };
    }
    
    // 检查精怪升级
    checkSpiritLevelUp(spirit: any): boolean {
        const expNeeded = spirit.level * 200;
        if (spirit.exp >= expNeeded && spirit.level < 10) {
            spirit.exp -= expNeeded;
            spirit.level++;
            
            // 升级增强效果
            if (spirit.effect.hpRegen) spirit.effect.hpRegen *= 1.1;
            if (spirit.effect.damageBonus) spirit.effect.damageBonus *= 1.1;
            if (spirit.effect.defenseBonus) spirit.effect.defenseBonus *= 1.1;
            
            return true;
        }
        return false;
    }
    
    // 获取助战效果
    getActiveEffects(playerId: string): any {
        const playerData = this.playerSpirits.get(playerId);
        if (!playerData) return {};
        
        const activeSpirits = playerData.contracted.filter(s => s.isActive);
        const effects = {
            hpRegen: 0,
            bindChance: 0,
            damageBonus: 0,
            elementDamage: 0,
            defenseBonus: 0,
            confuseChance: 0,
            allStatsUp: 0,
            hpBonus: 0
        };
        
        for (const spirit of activeSpirits) {
            const levelMultiplier = 1 + (spirit.level - 1) * 0.1;
            
            if (spirit.effect.hpRegen) {
                effects.hpRegen += spirit.effect.hpRegen * levelMultiplier;
            }
            if (spirit.effect.bindChance) {
                effects.bindChance += spirit.effect.bindChance * levelMultiplier;
            }
            if (spirit.effect.damageBonus) {
                effects.damageBonus += spirit.effect.damageBonus * levelMultiplier;
            }
            if (spirit.effect.elementDamage) {
                effects.elementDamage += spirit.effect.elementDamage * levelMultiplier;
            }
            if (spirit.effect.defenseBonus) {
                effects.defenseBonus += spirit.effect.defenseBonus * levelMultiplier;
            }
            if (spirit.effect.confuseChance) {
                effects.confuseChance += spirit.effect.confuseChance * levelMultiplier;
            }
            if (spirit.effect.allStatsUp) {
                effects.allStatsUp += spirit.effect.allStatsUp * levelMultiplier;
            }
            if (spirit.effect.hpBonus) {
                effects.hpBonus += spirit.effect.hpBonus * levelMultiplier;
            }
        }
        
        return effects;
    }
    
    // 战斗中触发精怪技能
    triggerSpiritSkill(playerId: string, triggerType: string): {
        triggered: boolean;
        skill: string;
        effect: any;
        message: string;
    } {
        const playerData = this.playerSpirits.get(playerId);
        if (!playerData) return { triggered: false, skill: '', effect: null, message: '' };
        
        const activeSpirits = playerData.contracted.filter(s => s.isActive);
        
        for (const spirit of activeSpirits) {
            // 根据触发类型和精怪类型判断是否触发
            if (triggerType === 'combat_start' && spirit.type === 'buff') {
                return {
                    triggered: true,
                    skill: spirit.skill,
                    effect: spirit.effect,
                    message: `${spirit.name}发动【${spirit.skill}】！`
                };
            }
            
            if (triggerType === 'attack' && spirit.type === 'attack') {
                if (Math.random() < 0.3) {  // 30%概率触发
                    return {
                        triggered: true,
                        skill: spirit.skill,
                        effect: spirit.effect,
                        message: `${spirit.name}协助攻击，发动【${spirit.skill}】！`
                    };
                }
            }
            
            if (triggerType === 'defend' && spirit.type === 'control') {
                if (Math.random() < spirit.effect.bindChance) {
                    return {
                        triggered: true,
                        skill: spirit.skill,
                        effect: spirit.effect,
                        message: `${spirit.name}发动【${spirit.skill}】，束缚敌人！`
                    };
                }
            }
        }
        
        return { triggered: false, skill: '', effect: null, message: '' };
    }
    
    // 初始化玩家精怪数据
    initPlayerSpirits(playerId: string): void {
        if (!this.playerSpirits.has(playerId)) {
            this.playerSpirits.set(playerId, {
                playerId: playerId,
                contracted: [],
                maxContracts: this.maxContracts
            });
        }
    }
    
    // 获取玩家契约的精怪
    getPlayerSpirits(playerId: string): any[] {
        this.initPlayerSpirits(playerId);
        return this.playerSpirits.get(playerId).contracted;
    }
    
    // 获取可契约的精怪列表
    getAvailableSpirits(playerId: string, playerLevel: number): any[] {
        this.initPlayerSpirits(playerId);
        const playerData = this.playerSpirits.get(playerId);
        const contractedIds = new Set(playerData.contracted.map(s => s.id));
        
        const available = [];
        for (const [id, spirit] of this.spiritDatabase) {
            if (playerLevel >= spirit.level && !contractedIds.has(id)) {
                available.push(spirit);
            }
        }
        
        return available.sort((a, b) => a.level - b.level);
    }
}