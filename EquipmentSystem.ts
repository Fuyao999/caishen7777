import { _decorator, Component } from 'cc';
const { ccclass, property } = _decorator;

/**
 * 财神大陆 - 装备系统（完整版）
 * 打造、强化、精炼、附魔
 */

@ccclass('EquipmentSystem')
export class EquipmentSystem extends Component {
    
    // 装备品质配置
    qualities = {
        normal: { 
            name: '普通', 
            color: 'white', 
            multiplier: 0,
            description: '基础装备，无特殊加成'
        },
        fine: { 
            name: '精良', 
            color: 'green', 
            multiplier: 0.2,
            description: '品质较好，属性提升20%'
        },
        rare: { 
            name: '稀有', 
            color: 'blue', 
            multiplier: 0.5,
            description: '稀有装备，属性提升50%'
        },
        epic: { 
            name: '史诗', 
            color: 'purple', 
            multiplier: 1.0,
            description: '史诗级装备，属性提升100%'
        },
        legendary: { 
            name: '传说', 
            color: 'orange', 
            multiplier: 2.0,
            description: '传说装备，属性提升200%，带有特殊效果'
        }
    };
    
    // 装备部位
    slots = {
        weapon: { name: '武器', icon: '⚔️', mainStat: 'attack' },
        armor: { name: '护甲', icon: '🛡️', mainStat: 'defense' },
        helmet: { name: '头盔', icon: '⛑️', mainStat: 'hp' },
        boots: { name: '战靴', icon: '👢', mainStat: 'moveSpeed' },
        gloves: { name: '手套', icon: '🧤', mainStat: 'critRate' },
        accessory: { name: '饰品', icon: '💍', mainStat: 'special' }
    };
    
    // 装备类型（按财域主题）
    equipmentTypes = {
        // 子时·墨玉矿渊 - 矿脉主题
        mining: {
            weapon: { name: '矿镐', baseAttack: 15 },
            armor: { name: '矿工服', baseDefense: 10 },
            helmet: { name: '矿工帽', baseHp: 50 },
            setBonus: '采矿速度+20%'
        },
        // 丑时·玄牝牧场 - 牧场主题
        ranch: {
            weapon: { name: '牧鞭', baseAttack: 18 },
            armor: { name: '牧衣', baseDefense: 12 },
            helmet: { name: '牧帽', baseHp: 60 },
            setBonus: '驯养成功率+15%'
        },
        // 寅时·破晓林海 - 森林主题
        forest: {
            weapon: { name: '木剑', baseAttack: 22 },
            armor: { name: '皮甲', baseDefense: 15 },
            helmet: { name: '羽冠', baseHp: 80 },
            setBonus: '木属性伤害+25%'
        },
        // 卯时·金曦原野 - 农耕主题
        farm: {
            weapon: { name: '镰刀', baseAttack: 20 },
            armor: { name: '农装', baseDefense: 14 },
            helmet: { name: '草帽', baseHp: 70 },
            setBonus: '作物产量+20%'
        },
        // 辰时·云海天市 - 商业主题
        trade: {
            weapon: { name: '算盘', baseAttack: 12 },
            armor: { name: '商袍', baseDefense: 8 },
            helmet: { name: '商帽', baseHp: 40 },
            setBonus: '交易税-10%'
        },
        // 巳时·赤焰熔炉 - 锻造主题
        forge: {
            weapon: { name: '火锤', baseAttack: 30 },
            armor: { name: '熔岩甲', baseDefense: 25 },
            helmet: { name: '熔岩盔', baseHp: 120 },
            setBonus: '锻造成功率+20%'
        },
        // 午时·金乌圣山 - 战斗主题
        combat: {
            weapon: { name: '阳炎剑', baseAttack: 35 },
            armor: { name: '阳炎甲', baseDefense: 28 },
            helmet: { name: '阳炎盔', baseHp: 140 },
            setBonus: 'PVP伤害+15%'
        },
        // 未时·风语沙碛 - 探险主题
        desert: {
            weapon: { name: '沙刃', baseAttack: 28 },
            armor: { name: '沙衣', baseDefense: 20 },
            helmet: { name: '沙巾', baseHp: 100 },
            setBonus: '迷宫视野+30%'
        },
        // 申时·雷鸣裂谷 - 雷电主题
        thunder: {
            weapon: { name: '雷枪', baseAttack: 40 },
            armor: { name: '雷甲', baseDefense: 32 },
            helmet: { name: '雷盔', baseHp: 160 },
            setBonus: '暴击率+10%'
        },
        // 酉时·落霞宝湾 - 海洋主题
        ocean: {
            weapon: { name: '三叉戟', baseAttack: 38 },
            armor: { name: '鳞甲', baseDefense: 30 },
            helmet: { name: '海冠', baseHp: 150 },
            setBonus: '水下呼吸无限'
        },
        // 戌时·百战擂台 - 竞技主题
        arena: {
            weapon: { name: '战斧', baseAttack: 45 },
            armor: { name: '战甲', baseDefense: 38 },
            helmet: { name: '战盔', baseHp: 200 },
            setBonus: '荣誉获取+30%'
        },
        // 亥时·幽泉秘府 - 暗杀主题
        stealth: {
            weapon: { name: '幽影刃', baseAttack: 42 },
            armor: { name: '影衣', baseDefense: 22 },
            helmet: { name: '影面', baseHp: 90 },
            setBonus: '潜行时间+50%'
        }
    };
    
    // 强化配置
    enhanceConfig = {
        maxLevel: 10,
        successRates: [1.0, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.35, 0.3, 0.25],
        costs: [100, 200, 400, 800, 1600, 3200, 6400, 12800, 25600, 51200],
        bonusPerLevel: 0.1  // 每级+10%属性
    };
    
    // 精炼配置（史诗→传说）
    refineConfig = {
        from: 'epic',
        to: 'legendary',
        material: '传说精魄',
        materialAmount: 10,
        cost: 100000,
        successRate: 0.3,
        failKeepEquipment: true
    };
    
    // 附魔配置
    enchantConfig = {
        effects: [
            { name: '火焰', damage: 10, type: 'fire' },
            { name: '冰霜', slow: 0.2, type: 'ice' },
            { name: '雷电', chain: 3, type: 'lightning' },
            { name: '治愈', regen: 5, type: 'heal' },
            { name: '幸运', dropRate: 0.1, type: 'luck' }
        ],
        cost: 5000
    };
    
    // 打造装备
    forgeEquipment(type: string, slot: string, quality: string, playerLevel: number): any {
        const typeData = this.equipmentTypes[type];
        if (!typeData) return null;
        
        const slotData = this.slots[slot];
        if (!slotData) return null;
        
        const qualityData = this.qualities[quality];
        if (!qualityData) return null;
        
        const baseItem = typeData[slot];
        if (!baseItem) return null;
        
        // 计算属性
        const levelMultiplier = 1 + (playerLevel - 1) * 0.05;
        const qualityMultiplier = 1 + qualityData.multiplier;
        
        let stats = {};
        switch (slot) {
            case 'weapon':
                stats = { attack: Math.floor(baseItem.baseAttack * levelMultiplier * qualityMultiplier) };
                break;
            case 'armor':
                stats = { defense: Math.floor(baseItem.baseDefense * levelMultiplier * qualityMultiplier) };
                break;
            case 'helmet':
                stats = { hp: Math.floor(baseItem.baseHp * levelMultiplier * qualityMultiplier) };
                break;
            case 'boots':
                stats = { moveSpeed: Math.floor(10 * qualityMultiplier) };
                break;
            case 'gloves':
                stats = { critRate: 0.02 * qualityMultiplier };
                break;
            case 'accessory':
                stats = { luck: Math.floor(5 * qualityMultiplier) };
                break;
        }
        
        return {
            id: this.generateId(),
            name: `${qualityData.name}${baseItem.name}`,
            type: type,
            slot: slot,
            quality: quality,
            level: playerLevel,
            stats: stats,
            enhanceLevel: 0,
            enchant: null,
            setBonus: typeData.setBonus,
            description: qualityData.description
        };
    }
    
    // 强化装备
    enhance(equipment: any, useProtection: boolean = false): { 
        success: boolean; 
        newLevel: number; 
        cost: number;
        message: string;
    } {
        const currentLevel = equipment.enhanceLevel || 0;
        
        if (currentLevel >= this.enhanceConfig.maxLevel) {
            return { 
                success: false, 
                newLevel: currentLevel, 
                cost: 0, 
                message: '已达最大强化等级+10' 
            };
        }
        
        const rate = this.enhanceConfig.successRates[currentLevel];
        const cost = this.enhanceConfig.costs[currentLevel];
        
        if (Math.random() < rate) {
            // 成功
            equipment.enhanceLevel = currentLevel + 1;
            this.applyEnhanceBonus(equipment);
            return { 
                success: true, 
                newLevel: equipment.enhanceLevel, 
                cost: cost, 
                message: `强化成功！${equipment.name} +${equipment.enhanceLevel}` 
            };
        } else {
            // 失败
            if (useProtection) {
                return { 
                    success: false, 
                    newLevel: currentLevel, 
                    cost: cost, 
                    message: '强化失败，但保护符保住了装备等级' 
                };
            }
            return { 
                success: false, 
                newLevel: currentLevel, 
                cost: cost, 
                message: `强化失败！${equipment.name}保持+${currentLevel}` 
            };
        }
    }
    
    // 应用强化加成
    applyEnhanceBonus(equipment: any): void {
        const level = equipment.enhanceLevel || 0;
        const bonus = 1 + (level * this.enhanceConfig.bonusPerLevel);
        
        // 重新计算属性
        for (const key in equipment.stats) {
            equipment.stats[key] = Math.floor(equipment.stats[key] * bonus);
        }
    }
    
    // 精炼装备（史诗→传说）
    refine(equipment: any, materials: number): { 
        success: boolean; 
        message: string;
    } {
        if (equipment.quality !== this.refineConfig.from) {
            return { success: false, message: '只有史诗装备可以精炼' };
        }
        
        if (materials < this.refineConfig.materialAmount) {
            return { 
                success: false, 
                message: `材料不足，需要${this.refineConfig.materialAmount}个${this.refineConfig.material}` 
            };
        }
        
        if (Math.random() < this.refineConfig.successRate) {
            equipment.quality = this.refineConfig.to;
            equipment.name = equipment.name.replace('史诗', '传说');
            this.applyEnhanceBonus(equipment);
            return { 
                success: true, 
                message: `精炼成功！${equipment.name}晋升为传说品质！` 
            };
        } else {
            return { 
                success: false, 
                message: '精炼失败，史诗装备保留，材料消耗' 
            };
        }
    }
    
    // 附魔装备
    enchant(equipment: any, effectIndex: number): { 
        success: boolean; 
        message: string;
    } {
        if (equipment.enchant) {
            return { success: false, message: '装备已有附魔，需先清除' };
        }
        
        const effect = this.enchantConfig.effects[effectIndex];
        if (!effect) {
            return { success: false, message: '附魔效果不存在' };
        }
        
        equipment.enchant = effect;
        return { 
            success: true, 
            message: `附魔成功！${equipment.name}获得${effect.name}效果` 
        };
    }
    
    // 清除附魔
    clearEnchant(equipment: any): void {
        equipment.enchant = null;
    }
    
    // 计算套装效果
    calculateSetBonus(equipments: any[]): { active: boolean; bonus: string; count: number } {
        const typeCount = {};
        
        for (const eq of equipments) {
            if (!eq) continue;
            typeCount[eq.type] = (typeCount[eq.type] || 0) + 1;
        }
        
        for (const [type, count] of Object.entries(typeCount)) {
            if (count >= 4) {  // 4件套激活
                const typeData = this.equipmentTypes[type];
                return { 
                    active: true, 
                    bonus: typeData?.setBonus || '',
                    count: count as number
                };
            }
        }
        
        return { active: false, bonus: '', count: 0 };
    }
    
    // 生成唯一ID
    generateId(): string {
        return 'eq_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
    
    // 获取装备总属性
    getTotalStats(equipment: any): any {
        const stats = { ...equipment.stats };
        
        // 添加强化加成
        const enhanceBonus = (equipment.enhanceLevel || 0) * this.enhanceConfig.bonusPerLevel;
        for (const key in stats) {
            stats[key] = Math.floor(stats[key] * (1 + enhanceBonus));
        }
        
        // 添加附魔效果
        if (equipment.enchant) {
            stats.enchant = equipment.enchant;
        }
        
        return stats;
    }
    
    onLoad() {
        console.log('EquipmentSystem 加载完成');
        console.log('装备品质:', Object.keys(this.qualities).length);
        console.log('装备类型:', Object.keys(this.equipmentTypes).length);
    }
}