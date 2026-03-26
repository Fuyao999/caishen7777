import { _decorator, Component } from 'cc';
const { ccclass, property } = _decorator;

/**
 * 财神大陆 - 反作弊系统（完整版）
 * 防外挂/防工作室/数据验证
 */

@ccclass('AntiCheatSystem')
export class AntiCheatSystem extends Component {
    
    // 作弊检测配置
    cheatDetection = {
        enabled: true,
        strictMode: false,  // 严格模式（误杀率高）
        
        // 行为阈值
        thresholds: {
            maxExpPerMinute: 5000,      // 每分钟最大经验
            maxMoneyPerMinute: 10000,   // 每分钟最大金钱
            maxActionsPerSecond: 10,    // 每秒最大操作数
            maxLoginAttempts: 5,        // 最大登录尝试
            minReactionTime: 100        // 最小反应时间(ms)
        }
    };
    
    // 玩家行为记录
    playerBehaviors: Map<string, any> = new Map();
    
    // 黑名单
    blacklist: Set<string> = new Set();
    
    // 工作室检测
    studioDetection = {
        // 同IP多账号阈值
        maxAccountsPerIP: 3,
        
        // 行为相似度阈值
        similarityThreshold: 0.9,
        
        // 交易异常阈值
        maxTradesPerHour: 20,
        maxTradeAmount: 100000
    };
    
    // 初始化玩家监控
    initPlayerMonitor(playerId: string): void {
        if (!this.playerBehaviors.has(playerId)) {
            this.playerBehaviors.set(playerId, {
                playerId: playerId,
                startTime: Date.now(),
                actions: [],
                expGained: 0,
                moneyGained: 0,
                lastActionTime: 0,
                suspiciousScore: 0,
                violations: []
            });
        }
    }
    
    // 记录行为
    recordAction(playerId: string, action: string, data: any): void {
        this.initPlayerMonitor(playerId);
        const behavior = this.playerBehaviors.get(playerId);
        
        const now = Date.now();
        const actionRecord = {
            type: action,
            time: now,
            data: data
        };
        
        behavior.actions.push(actionRecord);
        behavior.lastActionTime = now;
        
        // 记录经验获取
        if (action === 'gain_exp' && data.amount) {
            behavior.expGained += data.amount;
        }
        
        // 记录金钱获取
        if (action === 'gain_money' && data.amount) {
            behavior.moneyGained += data.amount;
        }
        
        // 只保留最近100条记录
        if (behavior.actions.length > 100) {
            behavior.actions.shift();
        }
        
        // 实时检测
        this.realTimeCheck(playerId);
    }
    
    // 实时检测
    realTimeCheck(playerId: string): {
        isCheating: boolean;
        confidence: number;
        reasons: string[];
    } {
        const behavior = this.playerBehaviors.get(playerId);
        if (!behavior) {
            return { isCheating: false, confidence: 0, reasons: [] };
        }
        
        const reasons = [];
        let confidence = 0;
        
        // 检测1：经验获取速度异常
        const timeElapsed = (Date.now() - behavior.startTime) / 1000 / 60;  // 分钟
        if (timeElapsed > 1) {
            const expPerMinute = behavior.expGained / timeElapsed;
            if (expPerMinute > this.cheatDetection.thresholds.maxExpPerMinute) {
                reasons.push(`经验获取速度异常: ${Math.floor(expPerMinute)}/分钟`);
                confidence += 30;
            }
        }
        
        // 检测2：金钱获取速度异常
        if (timeElapsed > 1) {
            const moneyPerMinute = behavior.moneyGained / timeElapsed;
            if (moneyPerMinute > this.cheatDetection.thresholds.maxMoneyPerMinute) {
                reasons.push(`金钱获取速度异常: ${Math.floor(moneyPerMinute)}/分钟`);
                confidence += 30;
            }
        }
        
        // 检测3：操作频率异常
        const recentActions = behavior.actions.filter(
            a => Date.now() - a.time < 1000
        );
        if (recentActions.length > this.cheatDetection.thresholds.maxActionsPerSecond) {
            reasons.push(`操作频率异常: ${recentActions.length}次/秒`);
            confidence += 20;
        }
        
        // 检测4：反应时间异常（脚本特征）
        if (behavior.actions.length >= 2) {
            const lastTwo = behavior.actions.slice(-2);
            const reactionTime = lastTwo[1].time - lastTwo[0].time;
            if (reactionTime < this.cheatDetection.thresholds.minReactionTime) {
                reasons.push(`反应时间异常: ${reactionTime}ms`);
                confidence += 15;
            }
        }
        
        // 记录违规
        if (reasons.length > 0) {
            behavior.violations.push({
                time: Date.now(),
                reasons: reasons,
                confidence: confidence
            });
            behavior.suspiciousScore += confidence;
        }
        
        return {
            isCheating: confidence >= 70,
            confidence: confidence,
            reasons: reasons
        };
    }
    
    // 数据验证（关键操作）
    validateData(playerData: any, operation: string): {
        valid: boolean;
        errors: string[];
    } {
        const errors = [];
        
        // 验证1：数值范围
        if (playerData.level < 1 || playerData.level > 99) {
            errors.push('等级超出范围');
        }
        
        if (playerData.money < 0 || playerData.money > 999999999) {
            errors.push('金钱数值异常');
        }
        
        // 验证2：装备强化等级
        if (playerData.equipment) {
            for (const eq of playerData.equipment) {
                if (eq.enhanceLevel > 20) {
                    errors.push(`装备强化等级异常: ${eq.enhanceLevel}`);
                }
            }
        }
        
        // 验证3：时间戳
        const now = Date.now();
        if (playerData.lastActionTime && now - playerData.lastActionTime < 0) {
            errors.push('时间戳异常（未来时间）');
        }
        
        // 验证4：属性计算
        const expectedHp = this.calculateExpectedHp(playerData.level);
        if (playerData.maxHp && playerData.maxHp > expectedHp * 3) {
            errors.push('生命值异常过高');
        }
        
        return {
            valid: errors.length === 0,
            errors: errors
        };
    }
    
    // 计算期望HP
    calculateExpectedHp(level: number): number {
        return 100 + level * 50;
    }
    
    // 工作室检测
    detectStudio(accounts: any[]): {
        studioGroups: string[][];
        confidence: number;
    } {
        const groups = [];
        const checked = new Set();
        
        for (let i = 0; i < accounts.length; i++) {
            if (checked.has(i)) continue;
            
            const group = [accounts[i].id];
            checked.add(i);
            
            for (let j = i + 1; j < accounts.length; j++) {
                if (checked.has(j)) continue;
                
                const similarity = this.calculateBehaviorSimilarity(
                    accounts[i],
                    accounts[j]
                );
                
                if (similarity >= this.studioDetection.similarityThreshold) {
                    group.push(accounts[j].id);
                    checked.add(j);
                }
            }
            
            if (group.length >= 2) {
                groups.push(group);
            }
        }
        
        return {
            studioGroups: groups,
            confidence: groups.length > 0 ? 80 : 0
        };
    }
    
    // 计算行为相似度
    calculateBehaviorSimilarity(account1: any, account2: any): number {
        let matchCount = 0;
        let totalFactors = 0;
        
        // IP相同
        if (account1.lastIP === account2.lastIP) matchCount++;
        totalFactors++;
        
        // 登录时间模式
        if (account1.loginPattern === account2.loginPattern) matchCount++;
        totalFactors++;
        
        // 操作序列相似
        if (account1.actionSequence && account2.actionSequence) {
            const seqSimilarity = this.calculateSequenceSimilarity(
                account1.actionSequence,
                account2.actionSequence
            );
            if (seqSimilarity > 0.8) matchCount++;
        }
        totalFactors++;
        
        // 交易对象重叠
        if (account1.tradePartners && account2.tradePartners) {
            const overlap = account1.tradePartners.filter(p => 
                account2.tradePartners.includes(p)
            ).length;
            if (overlap > 5) matchCount++;
        }
        totalFactors++;
        
        return matchCount / totalFactors;
    }
    
    // 计算序列相似度
    calculateSequenceSimilarity(seq1: string[], seq2: string[]): number {
        if (seq1.length === 0 || seq2.length === 0) return 0;
        
        const minLen = Math.min(seq1.length, seq2.length);
        let matches = 0;
        
        for (let i = 0; i < minLen; i++) {
            if (seq1[i] === seq2[i]) matches++;
        }
        
        return matches / minLen;
    }
    
    // 处理作弊玩家
    handleCheat(playerId: string, action: string): {
        success: boolean;
        punishment: string;
    } {
        const behavior = this.playerBehaviors.get(playerId);
        if (!behavior) {
            return { success: false, punishment: '' };
        }
        
        let punishment = '';
        
        switch (action) {
            case 'warn':
                punishment = '警告';
                break;
            case 'kick':
                punishment = '踢出游戏';
                break;
            case 'ban_temp':
                punishment = '封禁24小时';
                behavior.bannedUntil = Date.now() + 24 * 60 * 60 * 1000;
                break;
            case 'ban_perm':
                punishment = '永久封禁';
                this.blacklist.add(playerId);
                break;
            case 'rollback':
                punishment = '数据回滚';
                break;
        }
        
        return { success: true, punishment: punishment };
    }
    
    // 检查是否在黑名单
    isBlacklisted(playerId: string): boolean {
        return this.blacklist.has(playerId);
    }
    
    // 生成反作弊报告
    generateReport(): string {
        const report = [];
        
        report.push('=== 反作弊系统报告 ===');
        report.push('');
        
        // 监控玩家数
        report.push(`监控玩家数: ${this.playerBehaviors.size}`);
        report.push(`黑名单人数: ${this.blacklist.size}`);
        report.push('');
        
        // 高危玩家
        const highRiskPlayers = [];
        for (const [playerId, behavior] of this.playerBehaviors) {
            if (behavior.suspiciousScore >= 50) {
                highRiskPlayers.push({
                    id: playerId,
                    score: behavior.suspiciousScore,
                    violations: behavior.violations.length
                });
            }
        }
        
        report.push(`高危玩家: ${highRiskPlayers.length}`);
        highRiskPlayers.sort((a, b) => b.score - a.score);
        highRiskPlayers.slice(0, 10).forEach(p => {
            report.push(`  - ${p.id}: 可疑度${p.score}, 违规${p.violations}次`);
        });
        
        return report.join('\n');
    }
    
    onLoad() {
        console.log('AntiCheatSystem 加载完成');
        console.log('检测阈值:', this.cheatDetection.thresholds);
    }
}