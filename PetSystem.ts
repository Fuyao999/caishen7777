import { _decorator, Component } from 'cc';
const { ccclass, property } = _decorator;

/**
 * 财神大陆 - 宠物/灵兽系统（完整版）
 * 32种灵兽、捕捉、养成、战斗助战
 * 解锁：Lv.9+ 丑时·玄牝牧场
 */

@ccclass('PetSystem')
export class PetSystem extends Component {
    
    // 32种灵兽数据库
    petDatabase: Map<string, any> = new Map();
    
    // 玩家宠物数据
    playerPets: Map<string, any> = new Map();  // playerId -> {pets: [], activePet: id}
    
    // 最大出战数
    maxActivePets = 3;
    
    onLoad() {
        this.initPetDatabase();
        console.log('PetSystem 加载完成，灵兽种类:', this.petDatabase.size);
    }
    
    // 初始化灵兽数据库
    initPetDatabase(): void {
        // 普通灵兽（16种）
        const commonPets = [
            { id: 'grass_sheep', name: '灵草羊', type: 'common', level: 9, skill: '草药识别', bonus: { hp: 50, mp: 20 }, desc: '可产灵草奶恢复法力' },
            { id: 'gold_cow', name: '金玉牛', type: 'common', level: 12, skill: '财富感知', bonus: { moneyBonus: 0.05 }, desc: '产金玉奶临时属性加成' },
            { id: 'wind_horse', name: '疾风驹', type: 'common', level: 15, skill: '疾风步', bonus: { speed: 10 }, desc: '幼崽可培养成坐骑' },
            { id: 'spirit_rabbit', name: '灵兔', type: 'common', level: 9, skill: '幸运兔脚', bonus: { critRate: 0.02 }, desc: '提升暴击率' },
            { id: 'golden_chick', name: '金羽鸡', type: 'common', level: 10, skill: '晨光唤醒', bonus: { expBonus: 0.03 }, desc: '清晨经验加成' },
            { id: 'jade_toad', name: '玉蟾', type: 'common', level: 11, skill: '财运吞吐', bonus: { moneyFind: 0.1 }, desc: '战斗后额外金钱' },
            { id: 'cloud_deer', name: '云鹿', type: 'common', level: 13, skill: '祥云庇护', bonus: { defense: 15 }, desc: '提升防御' },
            { id: 'stone_monkey', name: '石猴', type: 'common', level: 14, skill: '灵石感应', bonus: { materialFind: 0.15 }, desc: '材料掉率提升' },
            { id: 'fire_fox', name: '火狐', type: 'common', level: 16, skill: '狐火', bonus: { attack: 10 }, desc: '攻击附带火伤' },
            { id: 'water_turtle', name: '玄龟', type: 'common', level: 17, skill: '玄甲', bonus: { hp: 100 }, desc: '大量生命加成' },
            { id: 'wood_worm', name: '木蚕', type: 'common', level: 18, skill: '吐丝', bonus: { craftBonus: 0.1 }, desc: '打造成功率提升' },
            { id: 'thunder_bird', name: '雷鸟', type: 'common', level: 19, skill: '鸣雷', bonus: { speed: 15 }, desc: '速度加成' },
            { id: 'earth_dog', name: '土狗', type: 'common', level: 9, skill: '寻财', bonus: { itemFind: 0.08 }, desc: '物品掉率提升' },
            { id: 'ice_snake', name: '冰蛇', type: 'common', level: 20, skill: '寒冰', bonus: { defense: 20 }, desc: '防御加成' },
            { id: 'light_butterfly', name: '光蝶', type: 'common', level: 21, skill: '光舞', bonus: { mp: 50 }, desc: '法力加成' },
            { id: 'shadow_cat', name: '影猫', type: 'common', level: 22, skill: '影遁', bonus: { dodge: 0.05 }, desc: '闪避率提升' }
        ];
        
        // 稀有灵兽（12种）
        const rarePets = [
            { id: 'phoenix_chick', name: '凤凰雏', type: 'rare', level: 30, skill: '涅槃', bonus: { hpRegen: 5 }, desc: '战斗中缓慢回血' },
            { id: 'unicorn_foal', name: '麒麟驹', type: 'rare', level: 35, skill: '祥瑞', bonus: { allStats: 10 }, desc: '全属性加成' },
            { id: 'dragon_spawn', name: '龙子', type: 'rare', level: 40, skill: '龙威', bonus: { attack: 30 }, desc: '大量攻击加成' },
            { id: 'tiger_king', name: '虎王', type: 'rare', level: 33, skill: '虎啸', bonus: { critDamage: 0.2 }, desc: '暴击伤害提升' },
            { id: 'tortoise_sage', name: '玄龟仙', type: 'rare', level: 36, skill: '万寿', bonus: { hp: 200 }, desc: '极高生命加成' },
            { id: 'peacock_spirit', name: '孔雀灵', type: 'rare', level: 38, skill: '开屏', bonus: { charm: 20 }, desc: '魅力加成（声望）' },
            { id: 'golden_peng', name: '金鹏', type: 'rare', level: 42, skill: '展翅', bonus: { speed: 25 }, desc: '极高速度加成' },
            { id: 'white_elephant', name: '白象', type: 'rare', level: 45, skill: '神力', bonus: { attack: 25, hp: 100 }, desc: '攻防兼备' },
            { id: 'nine_fox', name: '九尾狐', type: 'rare', level: 48, skill: '魅惑', bonus: { critRate: 0.05 }, desc: '高暴击率' },
            { id: 'qilin_beast', name: '瑞兽麒麟', type: 'rare', level: 50, skill: '瑞气', bonus: { luck: 10 }, desc: '幸运加成' },
            { id: 'black_dragon', name: '墨龙', type: 'rare', level: 55, skill: '龙息', bonus: { attack: 40 }, desc: '极高攻击' },
            { id: 'immortal_crane', name: '仙鹤', type: 'rare', level: 58, skill: '长生', bonus: { mpRegen: 3 }, desc: '法力恢复' }
        ];
        
        // 传说灵兽（4种）
        const legendaryPets = [
            { id: 'five_color_phoenix', name: '五色凤凰', type: 'legendary', level: 70, skill: '涅槃重生', bonus: { revive: 1, hpRegen: 10 }, desc: '战斗中复活一次' },
            { id: 'true_dragon', name: '真龙', type: 'legendary', level: 75, skill: '龙御九天', bonus: { allStats: 25 }, desc: '全属性大幅提升' },
            { id: 'mystic_turtle', name: '玄武', type: 'legendary', level: 80, skill: '玄冥护盾', bonus: { defense: 50, hp: 300 }, desc: '防御生命极限加成' },
            { id: 'white_tiger', name: '白虎', type: 'legendary', level: 85, skill: '白虎啸天', bonus: { attack: 60, critRate: 0.1 }, desc: '攻击暴击极限' }
        ];
        
        // 存入数据库
        [...commonPets, ...rarePets, ...legendaryPets].forEach(pet => {
            this.petDatabase.set(pet.id, pet);
        });
    }
    
    // 捕捉灵兽
    capturePet(playerId: string, petId: string, playerLevel: number): {
        success: boolean;
        pet: any;
        message: string;
    } {
        const petTemplate = this.petDatabase.get(petId);
        if (!petTemplate) {
            return { success: false, pet: null, message: '灵兽不存在' };
        }
        
        if (playerLevel < petTemplate.level) {
            return { success: false, pet: null, message: `等级不足，需要${petTemplate.level}级` };
        }
        
        // 初始化玩家宠物数据
        if (!this.playerPets.has(playerId)) {
            this.playerPets.set(playerId, { pets: [], activePets: [] });
        }
        
        const playerData = this.playerPets.get(playerId);
        
        // 检查是否已拥有
        if (playerData.pets.some(p => p.id === petId)) {
            return { success: false, pet: null, message: '已拥有该灵兽' };
        }
        
        // 创建新宠物实例
        const newPet = {
            instanceId: `pet_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            ...petTemplate,
            capturedTime: Date.now(),
            exp: 0,
            level: 1,
            loyalty: 50,  // 忠诚度 0-100
            mood: 50,     // 心情 0-100
            growth: 1.0,  // 成长率
            isActive: false
        };
        
        playerData.pets.push(newPet);
        
        return {
            success: true,
            pet: newPet,
            message: `捕捉成功！获得${petTemplate.name}`
        };
    }
    
    // 设置出战
    setActivePet(playerId: string, petInstanceId: string): {
        success: boolean;
        message: string;
    } {
        const playerData = this.playerPets.get(playerId);
        if (!playerData) {
            return { success: false, message: '无宠物数据' };
        }
        
        const pet = playerData.pets.find(p => p.instanceId === petInstanceId);
        if (!pet) {
            return { success: false, message: '宠物不存在' };
        }
        
        // 检查出战数量
        const currentActive = playerData.pets.filter(p => p.isActive).length;
        if (currentActive >= this.maxActivePets && !pet.isActive) {
            return { success: false, message: `最多出战${this.maxActivePets}只灵兽` };
        }
        
        pet.isActive = !pet.isActive;
        
        return {
            success: true,
            message: pet.isActive ? `${pet.name}已出战` : `${pet.name}已休息`
        };
    }
    
    // 喂食
    feedPet(playerId: string, petInstanceId: string, foodType: string): {
        success: boolean;
        effects: any;
        message: string;
    } {
        const playerData = this.playerPets.get(playerId);
        if (!playerData) return { success: false, effects: null, message: '无宠物数据' };
        
        const pet = playerData.pets.find(p => p.instanceId === petInstanceId);
        if (!pet) return { success: false, effects: null, message: '宠物不存在' };
        
        const foods = {
            normal: { loyalty: 5, mood: 5, cost: 100 },
            premium: { loyalty: 10, mood: 10, exp: 50, cost: 500 },
            deluxe: { loyalty: 20, mood: 20, exp: 100, growth: 0.01, cost: 1000 }
        };
        
        const food = foods[foodType];
        if (!food) return { success: false, effects: null, message: '食物类型不存在' };
        
        // 应用效果
        pet.loyalty = Math.min(100, pet.loyalty + food.loyalty);
        pet.mood = Math.min(100, pet.mood + food.mood);
        if (food.exp) pet.exp += food.exp;
        if (food.growth) pet.growth += food.growth;
        
        // 检查升级
        this.checkPetLevelUp(pet);
        
        return {
            success: true,
            effects: food,
            message: `喂食成功！忠诚度+${food.loyalty}，心情+${food.mood}`
        };
    }
    
    // 检查宠物升级
    checkPetLevelUp(pet: any): void {
        const expNeeded = pet.level * 100;
        while (pet.exp >= expNeeded &> pet.level < 50) {
            pet.exp -= expNeeded;
            pet.level++;
            console.log(`${pet.name}升级至${pet.level}级！`);
        }
    }
    
    // 获取出战宠物属性加成
    getActivePetBonuses(playerId: string): any {
        const playerData = this.playerPets.get(playerId);
        if (!playerData) return {};
        
        const bonuses = {};
        const activePets = playerData.pets.filter(p => p.isActive);
        
        for (const pet of activePets) {
            const levelMultiplier = 1 + (pet.level - 1) * 0.05;
            for (const [key, value] of Object.entries(pet.bonus)) {
                if (bonuses[key]) {
                    bonuses[key] += (value as number) * levelMultiplier * pet.growth;
                } else {
                    bonuses[key] = (value as number) * levelMultiplier * pet.growth;
                }
            }
        }
        
        return bonuses;
    }
    
    // 获取玩家所有宠物
    getPlayerPets(playerId: string): any[] {
        const playerData = this.playerPets.get(playerId);
        return playerData ? playerData.pets : [];
    }
}