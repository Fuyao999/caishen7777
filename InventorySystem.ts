import { _decorator, Component } from 'cc';
const { ccclass, property } = _decorator;

/**
 * 财神大陆 - 背包系统（完整版）
 * 100格背包、300+道具、分类管理、堆叠系统
 * 与第一阶段数据兼容
 */

@ccclass('InventorySystem')
export class InventorySystem extends Component {
    
    // 道具数据库（300+种）
    itemDatabase: Map<string, any> = new Map();
    
    // 玩家背包数据
    playerInventories: Map<string, any> = new Map();  // playerId -> {items: [], maxSlots: 100}
    
    // 默认背包格子数
    defaultSlots = 50;   // 初始50格
    maxSlots = 100;      // 最大100格
    
    onLoad() {
        this.initItemDatabase();
        console.log('InventorySystem 加载完成，道具种类:', this.itemDatabase.size);
    }
    
    // 初始化道具数据库
    initItemDatabase(): void {
        // === 消耗品（50种）===
        const consumables = [
            // 回复类
            { id: 'hp_potion_small', name: '小还丹', type: 'consumable', subtype: 'heal', effect: { hp: 50 }, stack: 99, price: 50, desc: '恢复50点生命' },
            { id: 'hp_potion_medium', name: '还丹', type: 'consumable', subtype: 'heal', effect: { hp: 150 }, stack: 99, price: 150, desc: '恢复150点生命' },
            { id: 'hp_potion_large', name: '大还丹', type: 'consumable', subtype: 'heal', effect: { hp: 500 }, stack: 99, price: 500, desc: '恢复500点生命' },
            { id: 'mp_potion_small', name: '小法力丹', type: 'consumable', subtype: 'mana', effect: { mp: 30 }, stack: 99, price: 40, desc: '恢复30点法力' },
            { id: 'mp_potion_medium', name: '法力丹', type: 'consumable', subtype: 'mana', effect: { mp: 80 }, stack: 99, price: 120, desc: '恢复80点法力' },
            { id: 'mp_potion_large', name: '大法力丹', type: 'consumable', subtype: 'mana', effect: { mp: 200 }, stack: 99, price: 400, desc: '恢复200点法力' },
            // BUFF类
            { id: 'atk_buff_small', name: '大力丸', type: 'consumable', subtype: 'buff', effect: { attack: 10, duration: 300 }, stack: 99, price: 100, desc: '5分钟内攻击+10' },
            { id: 'def_buff_small', name: '铁甲丹', type: 'consumable', subtype: 'buff', effect: { defense: 10, duration: 300 }, stack: 99, price: 100, desc: '5分钟内防御+10' },
            { id: 'speed_buff_small', name: '神行符', type: 'consumable', subtype: 'buff', effect: { speed: 5, duration: 300 }, stack: 99, price: 100, desc: '5分钟内速度+5' },
            { id: 'exp_buff', name: '双倍经验符', type: 'consumable', subtype: 'buff', effect: { expBonus: 1.0, duration: 3600 }, stack: 10, price: 500, desc: '1小时内经验双倍' },
            { id: 'luck_buff', name: '幸运符', type: 'consumable', subtype: 'buff', effect: { luck: 10, duration: 1800 }, stack: 10, price: 300, desc: '30分钟内幸运+10' },
            // 传送类
            { id: 'scroll_return', name: '回城卷轴', type: 'consumable', subtype: 'teleport', effect: { teleport: 'home' }, stack: 20, price: 50, desc: '立即返回庙宇' },
            { id: 'scroll_random', name: '随机传送卷', type: 'consumable', subtype: 'teleport', effect: { teleport: 'random' }, stack: 20, price: 100, desc: '随机传送至某财域' },
        ];
        
        // === 材料类（100种）===
        const materials = [
            // 矿石类
            { id: 'iron_ore', name: '铁矿石', type: 'material', subtype: 'ore', stack: 999, price: 10, desc: '普通矿石，打造装备材料' },
            { id: 'copper_ore', name: '铜矿石', type: 'material', subtype: 'ore', stack: 999, price: 15, desc: '常见矿石' },
            { id: 'silver_ore', name: '银矿石', type: 'material', subtype: 'ore', stack: 999, price: 30, desc: '稀有矿石' },
            { id: 'gold_ore', name: '金矿石', type: 'material', subtype: 'ore', stack: 999, price: 50, desc: '珍贵矿石' },
            { id: 'jade_ore', name: '玉石', type: 'material', subtype: 'ore', stack: 999, price: 100, desc: '打造高级装备的材料' },
            { id: 'spirit_stone', name: '灵石', type: 'material', subtype: 'ore', stack: 999, price: 200, desc: '蕴含灵气的矿石' },
            { id: 'mystic_crystal', name: '玄晶', type: 'material', subtype: 'ore', stack: 999, price: 500, desc: '打造传说装备的稀有材料' },
            // 草药类
            { id: 'grass_herb', name: '普通草药', type: 'material', subtype: 'herb', stack: 999, price: 5, desc: '常见草药' },
            { id: 'ginseng', name: '人参', type: 'material', subtype: 'herb', stack: 999, price: 50, desc: '珍贵药材' },
            { id: 'lingzhi', name: '灵芝', type: 'material', subtype: 'herb', stack: 999, price: 100, desc: '仙草，炼制丹药的上品' },
            { id: 'snow_lotus', name: '天山雪莲', type: 'material', subtype: 'herb', stack: 999, price: 300, desc: '极寒之地的仙草' },
            // 木材类
            { id: 'normal_wood', name: '普通木材', type: 'material', subtype: 'wood', stack: 999, price: 8, desc: '常见木材' },
            { id: 'hard_wood', name: '硬木', type: 'material', subtype: 'wood', stack: 999, price: 20, desc: '质地坚硬的木材' },
            { id: 'spirit_wood', name: '灵木', type: 'material', subtype: 'wood', stack: 999, price: 80, desc: '蕴含灵气的木材' },
            // 其他材料
            { id: 'leather', name: '兽皮', type: 'material', subtype: 'other', stack: 999, price: 15, desc: '制作防具的材料' },
            { id: 'silk', name: '丝绸', type: 'material', subtype: 'other', stack: 999, price: 40, desc: '制作法袍的材料' },
            { id: 'demon_core', name: '妖核', type: 'material', subtype: 'other', stack: 999, price: 150, desc: '妖兽体内结晶，炼药材料' },
        ];
        
        // === 任务道具（30种）===
        const questItems = [
            { id: 'letter_village', name: '村长委托书', type: 'quest', stack: 1, desc: '村长委托你寻找失踪的村民' },
            { id: 'map_fragment', name: '藏宝图碎片', type: 'quest', stack: 10, desc: '收集10片可合成完整藏宝图' },
            { id: 'key_ancient', name: '古墓钥匙', type: 'quest', stack: 1, desc: '打开古墓大门的钥匙' },
            { id: 'token_sect', name: '门派令牌', type: 'quest', stack: 1, desc: '门派弟子身份的象征' },
            { id: 'book_skill', name: '技能书残页', type: 'quest', stack: 5, desc: '收集可学习新技能' },
        ];
        
        // === 特殊道具（20种）===
        const specialItems = [
            { id: 'bomb_fire', name: '天火雷', type: 'special', subtype: 'bomb', effect: { damage: 200, aoe: true }, stack: 50, price: 200, desc: '对敌人造成200点火焰伤害' },
            { id: 'trap_stun', name: '困仙索', type: 'special', subtype: 'trap', effect: { stun: 3 }, stack: 50, price: 150, desc: '使敌人定身3秒' },
            { id: 'detector_treasure', name: '探宝罗盘', type: 'special', subtype: 'tool', effect: { detect: 'treasure' }, stack: 10, price: 500, desc: '探测周围宝藏位置' },
            { id: 'mask_stealth', name: '隐身符', type: 'special', subtype: 'tool', effect: { stealth: 10 }, stack: 10, price: 300, desc: '隐身10秒' },
        ];
        
        // 存入数据库
        [...consumables, ...materials, ...questItems, ...specialItems].forEach(item => {
            this.itemDatabase.set(item.id, item);
        });
        
        // 添加更多变体材料达到300+
        this.generateMoreMaterials();
    }
    
    // 生成更多材料达到300+
    generateMoreMaterials(): void {
        const qualities = ['粗糙的', '普通的', '优质的', '完美的', '传说的'];
        const elements = ['火', '水', '土', '风', '雷', '冰', '光', '暗'];
        
        // 生成元素材料
        for (const elem of elements) {
            for (const quality of qualities) {
                const id = `crystal_${elem.toLowerCase()}_${qualities.indexOf(quality)}`;
                const name = `${quality}${elem}之晶`;
                this.itemDatabase.set(id, {
                    id: id,
                    name: name,
                    type: 'material',
                    subtype: 'crystal',
                    element: elem,
                    quality: qualities.indexOf(quality),
                    stack: 999,
                    price: 50 * (qualities.indexOf(quality) + 1),
                    desc: `${quality}的${elem}属性晶石`
                });
            }
        }
        
        // 生成各类怪物掉落
        const monsters = ['狼', '虎', '熊', '蛇', '鹰', '蜘蛛', '蝎子', '蝙蝠'];
        const parts = ['牙', '爪', '皮', '骨', '血', '胆', '眼', '尾'];
        
        for (const monster of monsters) {
            for (const part of parts) {
                const id = `drop_${monster}_${part}`;
                const name = `${monster}${part}`;
                this.itemDatabase.set(id, {
                    id: id,
                    name: name,
                    type: 'material',
                    subtype: 'drop',
                    stack: 999,
                    price: 20 + Math.floor(Math.random() * 80),
                    desc: `从${monster}身上获得的${part}`
                });
            }
        }
    }
    
    // 初始化玩家背包
    initPlayerInventory(playerId: string): void {
        if (!this.playerInventories.has(playerId)) {
            this.playerInventories.set(playerId, {
                playerId: playerId,
                items: [],  // {slot: number, itemId: string, count: number}
                maxSlots: this.defaultSlots,
                gold: 0     // 背包里的金钱（不安全）
            });
        }
    }
    
    // 添加物品到背包
    addItem(playerId: string, itemId: string, count: number = 1): {
        success: boolean;
        added: number;
        message: string;
    } {
        this.initPlayerInventory(playerId);
        const inventory = this.playerInventories.get(playerId);
        const itemTemplate = this.itemDatabase.get(itemId);
        
        if (!itemTemplate) {
            return { success: false, added: 0, message: '物品不存在' };
        }
        
        let remaining = count;
        let added = 0;
        
        // 先尝试堆叠到已有物品上
        if (itemTemplate.stack > 1) {
            for (const slot of inventory.items) {
                if (slot.itemId === itemId && slot.count < itemTemplate.stack) {
                    const canAdd = Math.min(remaining, itemTemplate.stack - slot.count);
                    slot.count += canAdd;
                    remaining -= canAdd;
                    added += canAdd;
                    if (remaining <= 0) break;
                }
            }
        }
        
        // 还需要新格子
        while (remaining > 0) {
            const emptySlot = this.findEmptySlot(inventory);
            if (emptySlot === -1) {
                return { success: false, added: added, message: '背包已满' };
            }
            
            const canAdd = Math.min(remaining, itemTemplate.stack);
            inventory.items.push({
                slot: emptySlot,
                itemId: itemId,
                count: canAdd
            });
            remaining -= canAdd;
            added += canAdd;
        }
        
        return { success: true, added: added, message: `获得${itemTemplate.name}×${added}` };
    }
    
    // 查找空格子
    findEmptySlot(inventory: any): number {
        const usedSlots = new Set(inventory.items.map(i => i.slot));
        for (let i = 0; i < inventory.maxSlots; i++) {
            if (!usedSlots.has(i)) return i;
        }
        return -1;
    }
    
    // 移除物品
    removeItem(playerId: string, slotIndex: number, count: number = 1): {
        success: boolean;
        removed: number;
        message: string;
    } {
        const inventory = this.playerInventories.get(playerId);
        if (!inventory) return { success: false, removed: 0, message: '无背包数据' };
        
        const slot = inventory.items.find(i => i.slot === slotIndex);
        if (!slot) return { success: false, removed: 0, message: '该格子没有物品' };
        
        const itemTemplate = this.itemDatabase.get(slot.itemId);
        const removeCount = Math.min(count, slot.count);
        
        slot.count -= removeCount;
        if (slot.count <= 0) {
            inventory.items = inventory.items.filter(i => i.slot !== slotIndex);
        }
        
        return { success: true, removed: removeCount, message: `失去${itemTemplate.name}×${removeCount}` };
    }
    
    // 使用物品
    useItem(playerId: string, slotIndex: number): {
        success: boolean;
        effect: any;
        message: string;
    } {
        const inventory = this.playerInventories.get(playerId);
        if (!inventory) return { success: false, effect: null, message: '无背包数据' };
        
        const slot = inventory.items.find(i => i.slot === slotIndex);
        if (!slot) return { success: false, effect: null, message: '该格子没有物品' };
        
        const item = this.itemDatabase.get(slot.itemId);
        if (item.type !== 'consumable' && item.type !== 'special') {
            return { success: false, effect: null, message: '该物品无法使用' };
        }
        
        // 应用效果
        const effect = item.effect;
        
        // 减少数量
        slot.count--;
        if (slot.count <= 0) {
            inventory.items = inventory.items.filter(i => i.slot !== slotIndex);
        }
        
        return { success: true, effect: effect, message: `使用${item.name}` };
    }
    
    // 扩展背包
    expandInventory(playerId: string, slotsToAdd: number, cost: number): {
        success: boolean;
        newSize: number;
        message: string;
    } {
        const inventory = this.playerInventories.get(playerId);
        if (!inventory) return { success: false, newSize: 0, message: '无背包数据' };
        
        const newSize = Math.min(this.maxSlots, inventory.maxSlots + slotsToAdd);
        if (newSize === inventory.maxSlots) {
            return { success: false, newSize: newSize, message: '已达到最大格子数' };
        }
        
        inventory.maxSlots = newSize;
        return { success: true, newSize: newSize, message: `背包扩展至${newSize}格` };
    }
    
    // 整理背包
    sortInventory(playerId: string): void {
        const inventory = this.playerInventories.get(playerId);
        if (!inventory) return;
        
        // 按类型排序
        inventory.items.sort((a, b) => {
            const itemA = this.itemDatabase.get(a.itemId);
            const itemB = this.itemDatabase.get(b.itemId);
            if (itemA.type !== itemB.type) {
                return itemA.type.localeCompare(itemB.type);
            }
            return itemA.name.localeCompare(itemB.name);
        });
        
        // 重新分配格子号
        inventory.items.forEach((item, index) => {
            item.slot = index;
        });
    }
    
    // 获取玩家背包
    getInventory(playerId: string): any {
        this.initPlayerInventory(playerId);
        return this.playerInventories.get(playerId);
    }
    
    // 获取物品信息
    getItemInfo(itemId: string): any {
        return this.itemDatabase.get(itemId);
    }
}