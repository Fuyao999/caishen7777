import { _decorator, Component, director } from 'cc';
const { ccclass, property } = _decorator;

// 导入所有系统
import { LevelSystem99 } from './LevelSystem99';
import { TwelveDomainsSystem } from './TwelveDomainsSystem';
import { CombatSystem } from './CombatSystem';
import { EquipmentSystem } from './EquipmentSystem';
import { SectSystem } from './SectSystem';
import { MentorSystem } from './MentorSystem';
import { MarketSystem } from './MarketSystem';
import { PVPSystem } from './PVPSystem';

/**
 * 财神大陆 - 第二阶段主控制器（完整版）
 * 整合所有8个核心系统
 */

@ccclass('GameControllerPhase2')
export class GameControllerPhase2 extends Component {
    
    // 所有系统实例
    levelSystem: LevelSystem99 = null;
    domainSystem: TwelveDomainsSystem = null;
    combatSystem: CombatSystem = null;
    equipmentSystem: EquipmentSystem = null;
    sectSystem: SectSystem = null;
    mentorSystem: MentorSystem = null;
    marketSystem: MarketSystem = null;
    pvpSystem: PVPSystem = null;
    
    // 玩家数据
    player: any = null;
    
    onLoad() {
        console.log('=== 财神大陆第二阶段主控制器启动 ===');
        
        // 初始化所有系统
        this.initSystems();
        
        // 创建新玩家或加载存档
        this.initPlayer();
        
        console.log('所有系统初始化完成！');
        console.log('玩家当前状态:', this.getPlayerStatus());
    }
    
    // 初始化所有系统
    initSystems(): void {
        this.levelSystem = this.node.addComponent(LevelSystem99);
        this.domainSystem = this.node.addComponent(TwelveDomainsSystem);
        this.combatSystem = this.node.addComponent(CombatSystem);
        this.equipmentSystem = this.node.addComponent(EquipmentSystem);
        this.sectSystem = this.node.addComponent(SectSystem);
        this.mentorSystem = this.node.addComponent(MentorSystem);
        this.marketSystem = this.node.addComponent(MarketSystem);
        this.pvpSystem = this.node.addComponent(PVPSystem);
        
        console.log('8个核心系统初始化完成');
    }
    
    // 初始化玩家
    initPlayer(): void {
        // 尝试加载存档
        const savedData = this.loadGame();
        
        if (savedData) {
            this.player = savedData;
            console.log('存档加载成功');
        } else {
            // 创建新玩家（从6级开始第二阶段）
            this.player = this.createNewPlayer();
            console.log('新玩家创建完成');
        }
        
        // 同步等级系统
        this.levelSystem.playerLevel = this.player.level;
        this.levelSystem.playerExp = this.player.exp;
    }
    
    // 创建新玩家
    createNewPlayer(): any {
        return {
            // 基础信息
            id: this.generatePlayerId(),
            name: '小财神',
            createTime: Date.now(),
            
            // 等级（从6级开始）
            level: 6,
            exp: 0,
            
            // 境界
            realm: '炼气期',
            form: '金身',  // 从第一阶段继承
            
            // 货币
            money: 5000,
            yuanbao: 0,
            merit: 10800,  // 从第一阶段继承
            fragments: 0,
            banners: 0,
            
            // 资源
            incense: { normal: 5, advanced: 0, premium: 0, special: 0 },
            activeIncense: null,
            incenseEndTime: 0,
            
            // 装备
            equipment: [],
            equipped: { weapon: null, armor: null, helmet: null, boots: null, gloves: null, accessory: null },
            
            // 社交
            friends: [],
            reputation: 0,
            
            // 门派
            sect: null,
            sectContribution: 0,
            
            // 师徒
            mentor: null,
            students: [],
            virtuePoints: 0,
            
            // 十二财域进度
            unlockedDomains: ['zi'],
            domainProgress: {},
            
            // 战斗统计
            totalPVPGames: 0,
            pvpWins: 0,
            honor: 0,
            
            // 交易
            stall: null,
            stockHoldings: {},
            
            // 设置
            birthHour: '子时',
            settings: { music: true, sound: true, notifications: true }
        };
    }
    
    // ========== 等级相关 ==========
    
    // 添加经验
    gainExp(amount: number): { leveledUp: boolean; messages: string[] } {
        const result = this.levelSystem.addExp(amount);
        
        if (result.leveledUp) {
            // 同步玩家等级
            this.player.level = this.levelSystem.playerLevel;
            this.player.exp = this.levelSystem.playerExp;
            
            // 检查境界变化
            const realmInfo = this.levelSystem.getCurrentRealm();
            this.player.realm = realmInfo.name;
            
            // 检查形态变化
            const formInfo = this.levelSystem.getCurrentForm();
            this.player.form = formInfo.name;
            
            // 检查财域解锁
            this.checkDomainUnlock();
            
            // 保存
            this.saveGame();
        }
        
        return result;
    }
    
    // 检查财域解锁
    checkDomainUnlock(): void {
        const nextUnlock = this.domainSystem.getNextUnlock(this.player.level);
        if (nextUnlock && nextUnlock.remain === 0) {
            // 解锁新财域
            this.player.unlockedDomains.push(nextUnlock.domain.id);
            console.log(`解锁新财域：${nextUnlock.domain.name}`);
        }
    }
    
    // ========== 财域相关 ==========
    
    // 进入财域
    enterDomain(domainId: string): { success: boolean; message: string } {
        if (!this.domainSystem.isDomainUnlocked(domainId, this.player.level)) {
            return { success: false, message: '等级不足，无法进入该财域' };
        }
        
        const domain = this.domainSystem.getDomain(domainId);
        
        // 检查时辰加成
        const bonus = this.domainSystem.getHourlyBonus(domainId, this.player.birthHour);
        
        return {
            success: true,
            message: `进入${domain.name}${Object.keys(bonus).length > 0 ? '（本命时辰加成！）' : ''}`
        };
    }
    
    // 探索财域（战斗）
    exploreDomain(domainId: string): { success: boolean; reward: any; log: string[] } {
        const domain = this.domainSystem.getDomain(domainId);
        if (!domain) {
            return { success: false, reward: null, log: ['财域不存在'] };
        }
        
        // 模拟探索战斗
        // 实际应创建敌人并进行战斗
        const enemy = {
            name: domain.id + '_monster',
            level: this.player.level,
            equipment: []
        };
        
        const battleResult = this.combatSystem.simulateBattle(this.player, enemy, 30);
        
        if (battleResult.winner === this.player.name || battleResult.winner === this.player.id) {
            // 胜利获得奖励
            const expGain = 50 + Math.floor(Math.random() * 50);
            const moneyGain = 30 + Math.floor(Math.random() * 30);
            
            this.player.money += moneyGain;
            const levelResult = this.gainExp(expGain);
            
            return {
                success: true,
                reward: { exp: expGain, money: moneyGain },
                log: battleResult.log
            };
        } else {
            return {
                success: false,
                reward: null,
                log: battleResult.log
            };
        }
    }
    
    // ========== 战斗相关 ==========
    
    // 发起PVP挑战
    challengePVP(modeId: string, opponentId: string): { matchId: string; result: any } {
        const match = this.pvpSystem.createPVPMatch(modeId, this.player.id, opponentId);
        
        if (!match) {
            return { matchId: null, result: null };
        }
        
        // 模拟战斗结果
        const won = Math.random() > 0.5;
        const reward = this.pvpSystem.calculatePVPResult(
            won ? this.player.id : opponentId,
            won ? opponentId : this.player.id,
            modeId
        );
        
        if (won) {
            this.player.honor += reward.honorGain;
            this.pvpSystem.addHonor(this.player.id, reward.honorGain);
        }
        
        this.player.totalPVPGames++;
        if (won) this.player.pvpWins++;
        
        // 排位赛更新段位
        if (modeId === 'ranked') {
            const rankResult = this.pvpSystem.updateRankPoints(this.player.id, won);
            console.log(`排位${won ? '胜利' : '失败'}：${rankResult.oldRank} → ${rankResult.newRank}`);
        }
        
        this.saveGame();
        
        return {
            matchId: match.matchId,
            result: { won, reward }
        };
    }
    
    // ========== 装备相关 ==========
    
    // 打造装备
    forgeEquipment(type: string, slot: string, quality: string): { success: boolean; equipment: any } {
        const equipment = this.equipmentSystem.forgeEquipment(type, slot, quality, this.player.level);
        
        if (equipment) {
            this.player.equipment.push(equipment);
            this.saveGame();
        }
        
        return { success: !!equipment, equipment };
    }
    
    // 强化装备
    enhanceEquipment(equipmentId: string, useProtection: boolean = false): any {
        const equipment = this.player.equipment.find(e => e.id === equipmentId);
        if (!equipment) {
            return { success: false, message: '装备不存在' };
        }
        
        const result = this.equipmentSystem.enhance(equipment, useProtection);
        
        if (result.success) {
            this.saveGame();
        }
        
        return result;
    }
    
    // ========== 门派相关 ==========
    
    // 加入门派
    joinSect(sectId: string): { success: boolean; message: string } {
        const result = this.sectSystem.joinSect(this.player.id, sectId, this.player.level, this.player.sect);
        
        if (result.success) {
            this.player.sect = sectId;
            this.saveGame();
        }
        
        return result;
    }
    
    // ========== 师徒相关 ==========
    
    // 拜师
    becomeStudent(mentorId: string): { success: boolean; message: string } {
        const check = this.mentorSystem.canBeStudent(this.player.id, this.player.level, this.player.mentor);
        if (!check.can) {
            return { success: false, message: check.reason };
        }
        
        const result = this.mentorSystem.establishRelationship(this.player.id, mentorId, 500);
        
        if (result.success) {
            this.player.mentor = mentorId;
            this.saveGame();
        }
        
        return result;
    }
    
    // 收徒
    takeStudent(studentId: string): { success: boolean; message: string } {
        const check = this.mentorSystem.canBeMentor(this.player.id, this.player.level, this.player.mentor !== null);
        if (!check.can) {
            return { success: false, message: check.reason };
        }
        
        const result = this.mentorSystem.establishRelationship(studentId, this.player.id, 500);
        
        if (result.success) {
            this.player.students.push(studentId);
            this.saveGame();
        }
        
        return result;
    }
    
    // ========== 交易相关 ==========
    
    // 创建摊位
    createStall(stallName: string): { success: boolean; message: string } {
        if (this.player.stall) {
            return { success: false, message: '已有摊位' };
        }
        
        const result = this.marketSystem.createStall(this.player.id, stallName);
        
        if (result.success) {
            this.player.stall = result.stall;
            this.saveGame();
        }
        
        return { success: result.success, message: result.message };
    }
    
    // ========== 存档相关 ==========
    
    // 保存游戏
    saveGame(): boolean {
        try {
            const data = JSON.stringify(this.player);
            // 使用localStorage或发送到服务器
            if (typeof localStorage !== 'undefined') {
                localStorage.setItem('caishen_player_phase2', data);
            }
            console.log('游戏已保存');
            return true;
        } catch (e) {
            console.error('保存失败:', e);
            return false;
        }
    }
    
    // 加载游戏
    loadGame(): any {
        try {
            if (typeof localStorage !== 'undefined') {
                const data = localStorage.getItem('caishen_player_phase2');
                if (data) {
                    return JSON.parse(data);
                }
            }
            return null;
        } catch (e) {
            console.error('加载失败:', e);
            return null;
        }
    }
    
    // ========== 状态查询 ==========
    
    // 获取玩家状态
    getPlayerStatus(): any {
        return {
            name: this.player.name,
            level: this.player.level,
            exp: this.player.exp,
            expProgress: this.levelSystem.getLevelProgress(),
            realm: this.player.realm,
            form: this.player.form,
            money: this.player.money,
            merit: this.player.merit,
            honor: this.player.honor,
            unlockedDomains: this.player.unlockedDomains.length,
            equipmentCount: this.player.equipment.length,
            sect: this.player.sect,
            mentor: this.player.mentor ? '有' : '无',
            students: this.player.students.length
        };
    }
    
    // 生成玩家ID
    generatePlayerId(): string {
        return 'p2_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
    
    // 定时保存
    startAutoSave(): void {
        setInterval(() => {
            this.saveGame();
        }, 300000);  // 每5分钟自动保存
    }
}