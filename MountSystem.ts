import { _decorator, Component } from 'cc';
const { ccclass, property } = _decorator;

/**
 * 财神大陆 - 坐骑系统（完整版）
 * 5种坐骑、升级、速度加成、外观展示
 * 解锁：Lv.71+ 酉时·落霞宝湾
 */

@ccclass('MountSystem')
export class MountSystem extends Component {
    
    // 5种坐骑数据库
    mountDatabase: Map<string, any> = new Map();
    
    // 玩家坐骑数据
    playerMounts: Map<string, any> = new Map();  // playerId -> {mounts: [], activeMount: id}
    
    onLoad() {
        this.initMountDatabase();
        console.log('MountSystem 加载完成，坐骑种类:', this.mountDatabase.size);
    }
    
    // 初始化坐骑数据库
    initMountDatabase(): void {
        const mounts = [
            {
                id: 'wind_horse',
                name: '疾风驹',
                type: 'normal',
                unlockLevel: 71,
                baseSpeed: 20,
                maxLevel: 10,
                description: '玄牝牧场培育的优良马驹，速度极快',
                appearance: '棕色骏马，四蹄生风',
                skill: '疾驰',
                skillEffect: { speedBurst: 1.5, duration: 5 }  // 5秒内速度+50%
            },
            {
                id: 'cloud_steed',
                name: '云鬃马',
                type: 'rare',
                unlockLevel: 75,
                baseSpeed: 35,
                maxLevel: 15,
                description: '鬃毛如云，踏空而行',
                appearance: '白色骏马，鬃毛飘逸如云',
                skill: '踏云',
                skillEffect: { ignoreTerrain: true, speedBurst: 1.3 }
            },
            {
                id: 'flame_qilin',
                name: '火麒麟',
                type: 'epic',
                unlockLevel: 80,
                baseSpeed: 50,
                maxLevel: 20,
                description: '赤焰熔炉孕育的神兽，浑身火焰',
                appearance: '红色麒麟，火焰缠绕',
                skill: '烈焰冲锋',
                skillEffect: { speedBurst: 2.0, fireDamage: 100, duration: 3 }
            },
            {
                id: 'thunder_dragon',
                name: '雷龙驹',
                type: 'legendary',
                unlockLevel: 85,
                baseSpeed: 70,
                maxLevel: 25,
                description: '雷鸣裂谷的雷霆化身，速度如电',
                appearance: '蓝色龙驹，雷电环绕',
                skill: '雷鸣冲刺',
                skillEffect: { speedBurst: 2.5, thunderDamage: 200, stunChance: 0.3 }
            },
            {
                id: 'caishen_cloud',
                name: '财神云',
                type: 'mythic',
                unlockLevel: 90,
                baseSpeed: 100,
                maxLevel: 30,
                description: '真仙期方可驾驭的祥云，财神专属',
                appearance: '金色祥云，瑞气千条',
                skill: '财源广进',
                skillEffect: { speedBurst: 3.0, moneyBonus: 0.1, luckBonus: 10 }
            }
        ];
        
        mounts.forEach(mount => {
            this.mountDatabase.set(mount.id, mount);
        });
    }
    
    // 获得坐骑
    obtainMount(playerId: string, mountId: string, playerLevel: number): {
        success: boolean;
        mount: any;
        message: string;
    } {
        const mountTemplate = this.mountDatabase.get(mountId);
        if (!mountTemplate) {
            return { success: false, mount: null, message: '坐骑不存在' };
        }
        
        if (playerLevel < mountTemplate.unlockLevel) {
            return { success: false, mount: null, message: `等级不足，需要${mountTemplate.unlockLevel}级` };
        }
        
        // 初始化玩家坐骑数据
        if (!this.playerMounts.has(playerId)) {
            this.playerMounts.set(playerId, { mounts: [], activeMount: null });
        }
        
        const playerData = this.playerMounts.get(playerId);
        
        // 检查是否已拥有
        if (playerData.mounts.some(m => m.id === mountId)) {
            return { success: false, mount: null, message: '已拥有该坐骑' };
        }
        
        // 创建新坐骑实例
        const newMount = {
            instanceId: `mount_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            ...mountTemplate,
            obtainedTime: Date.now(),
            level: 1,
            exp: 0,
            currentSpeed: mountTemplate.baseSpeed,
            isActive: false,
            totalDistance: 0  // 累计骑行距离
        };
        
        playerData.mounts.push(newMount);
        
        return {
            success: true,
            mount: newMount,
            message: `获得坐骑：${mountTemplate.name}！${mountTemplate.description}`
        };
    }
    
    // 激活/切换坐骑
    activateMount(playerId: string, mountInstanceId: string): {
        success: boolean;
        mount: any;
        message: string;
    } {
        const playerData = this.playerMounts.get(playerId);
        if (!playerData) {
            return { success: false, mount: null, message: '无坐骑数据' };
        }
        
        const mount = playerData.mounts.find(m => m.instanceId === mountInstanceId);
        if (!mount) {
            return { success: false, mount: null, message: '坐骑不存在' };
        }
        
        // 如果已是激活状态，则取消
        if (playerData.activeMount === mountInstanceId) {
            mount.isActive = false;
            playerData.activeMount = null;
            return { success: true, mount: mount, message: `${mount.name}已收回` };
        }
        
        // 取消之前的激活
        if (playerData.activeMount) {
            const prevMount = playerData.mounts.find(m => m.instanceId === playerData.activeMount);
            if (prevMount) prevMount.isActive = false;
        }
        
        // 激活新坐骑
        mount.isActive = true;
        playerData.activeMount = mountInstanceId;
        
        return {
            success: true,
            mount: mount,
            message: `骑乘${mount.name}！速度+${mount.currentSpeed}%`
        };
    }
    
    // 坐骑升级
    upgradeMount(playerId: string, mountInstanceId: string, materialCost: number): {
        success: boolean;
        result: any;
        message: string;
    } {
        const playerData = this.playerMounts.get(playerId);
        if (!playerData) return { success: false, result: null, message: '无坐骑数据' };
        
        const mount = playerData.mounts.find(m => m.instanceId === mountInstanceId);
        if (!mount) return { success: false, result: null, message: '坐骑不存在' };
        
        if (mount.level >= mount.maxLevel) {
            return { success: false, result: null, message: '已达到最高等级' };
        }
        
        const expNeeded = mount.level * 1000;
        mount.exp += materialCost;
        
        let leveledUp = false;
        while (mount.exp >= expNeeded &> mount.level < mount.maxLevel) {
            mount.exp -= expNeeded;
            mount.level++;
            leveledUp = true;
            
            // 更新速度
            mount.currentSpeed = Math.floor(mount.baseSpeed * (1 + (mount.level - 1) * 0.1));
        }
        
        return {
            success: true,
            result: { leveledUp, newLevel: mount.level, newSpeed: mount.currentSpeed },
            message: leveledUp 
                ? `${mount.name}升级至${mount.level}级！速度提升至${mount.currentSpeed}%`
                : `获得${materialCost}经验，当前${mount.exp}/${expNeeded}`
        };
    }
    
    // 记录骑行距离（移动时调用）
    recordDistance(playerId: string, distance: number): void {
        const playerData = this.playerMounts.get(playerId);
        if (!playerData || !playerData.activeMount) return;
        
        const mount = playerData.mounts.find(m => m.instanceId === playerData.activeMount);
        if (mount) {
            mount.totalDistance += distance;
            // 每移动100距离获得1经验
            mount.exp += Math.floor(distance / 100);
            this.checkMountLevelUp(mount);
        }
    }
    
    // 检查坐骑升级
    checkMountLevelUp(mount: any): void {
        const expNeeded = mount.level * 1000;
        if (mount.exp >= expNeeded &> mount.level < mount.maxLevel) {
            mount.exp -= expNeeded;
            mount.level++;
            mount.currentSpeed = Math.floor(mount.baseSpeed * (1 + (mount.level - 1) * 0.1));
            console.log(`${mount.name}升级至${mount.level}级！`);
        }
    }
    
    // 使用坐骑技能
    useMountSkill(playerId: string): {
        success: boolean;
        effect: any;
        cooldown: number;
        message: string;
    } {
        const playerData = this.playerMounts.get(playerId);
        if (!playerData || !playerData.activeMount) {
            return { success: false, effect: null, cooldown: 0, message: '未骑乘坐骑' };
        }
        
        const mount = playerData.mounts.find(m => m.instanceId === playerData.activeMount);
        if (!mount) return { success: false, effect: null, cooldown: 0, message: '坐骑数据异常' };
        
        // 检查冷却（简化：60秒CD）
        const now = Date.now();
        if (mount.lastSkillTime && now - mount.lastSkillTime < 60000) {
            const remain = Math.ceil((60000 - (now - mount.lastSkillTime)) / 1000);
            return { success: false, effect: null, cooldown: remain, message: `技能冷却中，还剩${remain}秒` };
        }
        
        mount.lastSkillTime = now;
        
        return {
            success: true,
            effect: mount.skillEffect,
            cooldown: 60,
            message: `${mount.name}发动【${mount.skill}】！`
        };
    }
    
    // 获取当前速度加成
    getSpeedBonus(playerId: string): number {
        const playerData = this.playerMounts.get(playerId);
        if (!playerData || !playerData.activeMount) return 0;
        
        const mount = playerData.mounts.find(m => m.instanceId === playerData.activeMount);
        return mount ? mount.currentSpeed : 0;
    }
    
    // 获取玩家所有坐骑
    getPlayerMounts(playerId: string): any[] {
        const playerData = this.playerMounts.get(playerId);
        return playerData ? playerData.mounts : [];
    }
    
    // 获取当前骑乘坐骑
    getActiveMount(playerId: string): any {
        const playerData = this.playerMounts.get(playerId);
        if (!playerData || !playerData.activeMount) return null;
        
        return playerData.mounts.find(m => m.instanceId === playerData.activeMount);
    }
}