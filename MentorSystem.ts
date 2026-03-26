import { _decorator, Component } from 'cc';
const { ccclass, property } = _decorator;

/**
 * 财神大陆 - 师徒系统（完整版）
 * 拜师、出师、师徒福利、师德值
 */

@ccclass('MentorSystem')
export class MentorSystem extends Component {
    
    // 师徒关系存储
    relationships: Map<string, any> = new Map();  // key: studentId, value: relationship
    
    // 师傅数据
    mentors: Map<string, any> = new Map();  // key: mentorId, value: mentorData
    
    // 徒弟数量限制（文化包装版）
    studentLimits = {
        50: { count: 2, name: '双喜临门' },
        60: { count: 4, name: '四方来财' },
        70: { count: 8, name: '八方进宝' },
        80: { count: 10, name: '十全十美' },
        90: { count: 12, name: '十二生肖（圆满之数）' }
    };
    
    // 拜师条件
    canBeStudent(playerId: string, playerLevel: number, currentMentor: string | null): { 
        can: boolean; 
        reason: string;
    } {
        if (playerLevel >= 30) {
            return { can: false, reason: '等级≥30级不能拜师，只能收徒' };
        }
        
        if (currentMentor) {
            return { can: false, reason: '已有师傅，需先出师或解除关系' };
        }
        
        return { can: true, reason: '' };
    }
    
    // 收徒条件
    canBeMentor(playerId: string, playerLevel: number, hasGraduated: boolean): {
        can: boolean;
        reason: string;
    } {
        if (playerLevel < 50) {
            return { can: false, reason: '等级≥50级才能收徒' };
        }
        
        if (!hasGraduated) {
            return { can: false, reason: '需自己先出师（证明有经验）才能收徒' };
        }
        
        return { can: true, reason: '' };
    }
    
    // 获取最大徒弟数量
    getMaxStudents(mentorLevel: number): number {
        const levels = Object.keys(this.studentLimits).map(Number).sort((a, b) => b - a);
        for (const level of levels) {
            if (mentorLevel >= level) {
                return this.studentLimits[level].count;
            }
        }
        return 0;
    }
    
    // 获取当前徒弟数量（未出师）
    getCurrentStudentCount(mentorId: string): number {
        let count = 0;
        for (const [studentId, relation] of this.relationships) {
            if (relation.mentorId === mentorId && !relation.graduated) {
                count++;
            }
        }
        return count;
    }
    
    // 建立师徒关系
    establishRelationship(studentId: string, mentorId: string, cost: number = 500): {
        success: boolean;
        message: string;
    } {
        // 检查是否已存在关系
        if (this.relationships.has(studentId)) {
            return { success: false, message: '已有师徒关系' };
        }
        
        // 检查师傅名额
        const mentorData = this.mentors.get(mentorId);
        if (mentorData) {
            const maxStudents = this.getMaxStudents(mentorData.level);
            const currentStudents = this.getCurrentStudentCount(mentorId);
            
            if (currentStudents >= maxStudents) {
                return { 
                    success: false, 
                    message: `师傅徒弟名额已满（${currentStudents}/${maxStudents}）` 
                };
            }
        }
        
        // 消耗善缘值
        // 实际应检查并扣除玩家的善缘值
        
        // 建立关系
        this.relationships.set(studentId, {
            studentId: studentId,
            mentorId: mentorId,
            establishTime: Date.now(),
            graduated: false,
            studentLevel: 1,
            totalExpGiven: 0,
            tasksCompleted: 0
        });
        
        // 更新师傅数据
        if (!this.mentors.has(mentorId)) {
            this.mentors.set(mentorId, {
                mentorId: mentorId,
                level: 50,  // 默认
                totalStudents: 0,
                graduatedStudents: 0,
                virtuePoints: 0,
                currentStudents: []
            });
        }
        
        const mentor = this.mentors.get(mentorId);
        mentor.currentStudents.push(studentId);
        mentor.totalStudents++;
        
        return { 
            success: true, 
            message: `结缘成功！消耗${cost}善缘值，建立师徒关系` 
        };
    }
    
    // 师傅每日赠送
    dailyGift(mentorId: string, studentId: string): {
        success: boolean;
        amount: number;
        message: string;
    } {
        const relation = this.relationships.get(studentId);
        if (!relation || relation.mentorId !== mentorId) {
            return { success: false, amount: 0, message: '不是该玩家的师傅' };
        }
        
        if (relation.graduated) {
            return { success: false, amount: 0, message: '徒弟已出师，无法赠送' };
        }
        
        // 检查今日是否已赠送
        const today = new Date().toDateString();
        if (relation.lastGiftDate === today) {
            return { success: false, amount: 0, message: '今日已赠送，明日再来' };
        }
        
        const amount = 1000;  // 1000香火钱
        relation.lastGiftDate = today;
        relation.totalExpGiven += amount;
        
        return { 
            success: true, 
            amount: amount, 
            message: `赠送成功！徒弟获得${amount}香火钱` 
        };
    }
    
    // 师徒组队加成
    getTeamBonus(mentorId: string, studentId: string): {
        hasBonus: boolean;
        expBonus: number;
        message: string;
    } {
        const relation = this.relationships.get(studentId);
        if (!relation || relation.mentorId !== mentorId) {
            return { hasBonus: false, expBonus: 0, message: '无师徒关系' };
        }
        
        return { 
            hasBonus: true, 
            expBonus: 0.5,  // +50%经验
            message: '师徒同心！经验+50%' 
        };
    }
    
    // 检查出师条件
    checkGraduation(studentId: string): {
        canGraduate: boolean;
        requirements: string[];
    } {
        const relation = this.relationships.get(studentId);
        if (!relation) {
            return { canGraduate: false, requirements: ['无师徒关系'] };
        }
        
        if (relation.graduated) {
            return { canGraduate: false, requirements: ['已出师'] };
        }
        
        const requirements = [];
        
        // 条件1：等级≥30
        if (relation.studentLevel < 30) {
            requirements.push(`等级不足（${relation.studentLevel}/30）`);
        }
        
        // 条件2：完成师徒任务
        if (relation.tasksCompleted < 1) {
            requirements.push('未完成师徒共同任务');
        }
        
        return { 
            canGraduate: requirements.length === 0, 
            requirements: requirements 
        };
    }
    
    // 执行出师
    graduate(studentId: string): {
        success: boolean;
        studentReward: any;
        mentorReward: any;
        message: string;
    } {
        const check = this.checkGraduation(studentId);
        if (!check.canGraduate) {
            return { 
                success: false, 
                studentReward: null,
                mentorReward: null,
                message: `出师条件未满足：${check.requirements.join('、')}` 
            };
        }
        
        const relation = this.relationships.get(studentId);
        relation.graduated = true;
        relation.graduateTime = Date.now();
        
        // 徒弟奖励
        const studentReward = {
            virtue: 100,  // 功德
            money: 5000,  // 香火钱
            title: '出师弟子',
            item: '出师礼盒'
        };
        
        // 师傅奖励
        const mentorId = relation.mentorId;
        const mentor = this.mentors.get(mentorId);
        if (mentor) {
            mentor.graduatedStudents++;
            mentor.currentStudents = mentor.currentStudents.filter(id => id !== studentId);
            mentor.virtuePoints += 50;  // 师德值+50
        }
        
        const mentorReward = {
            virtuePoints: 50,
            money: 3000,
            title: '名师认证',
            canTakeMore: true
        };
        
        return { 
            success: true, 
            studentReward: studentReward,
            mentorReward: mentorReward,
            message: '恭喜出师！师徒双方获得丰厚奖励！' 
        };
    }
    
    // 解除关系（强制）
    dissolveRelationship(studentId: string, reason: string): {
        success: boolean;
        penalty: number;
        message: string;
    } {
        const relation = this.relationships.get(studentId);
        if (!relation) {
            return { success: false, penalty: 0, message: '无师徒关系' };
        }
        
        if (relation.graduated) {
            return { success: false, penalty: 0, message: '已出师，无法解除' };
        }
        
        const mentorId = relation.mentorId;
        
        // 惩罚：损失50%已获得的师徒福利
        const penalty = Math.floor(relation.totalExpGiven * 0.5);
        
        // 删除关系
        this.relationships.delete(studentId);
        
        // 更新师傅数据
        const mentor = this.mentors.get(mentorId);
        if (mentor) {
            mentor.currentStudents = mentor.currentStudents.filter(id => id !== studentId);
            mentor.totalStudents--;
        }
        
        return { 
            success: true, 
            penalty: penalty,
            message: `师徒关系解除（${reason}），损失${penalty}香火钱等值福利` 
        };
    }
    
    // 获取师德值排行
    getVirtueRanking(): { mentorId: string; virtuePoints: number; graduatedCount: number }[] {
        const list = [];
        for (const [mentorId, data] of this.mentors) {
            list.push({
                mentorId: mentorId,
                virtuePoints: data.virtuePoints,
                graduatedCount: data.graduatedStudents
            });
        }
        return list.sort((a, b) => b.virtuePoints - a.virtuePoints);
    }
    
    // 获取师徒关系详情
    getRelationship(studentId: string): any {
        return this.relationships.get(studentId) || null;
    }
    
    // 获取师傅的所有徒弟
    getStudents(mentorId: string, includeGraduated: boolean = false): any[] {
        const students = [];
        for (const [studentId, relation] of this.relationships) {
            if (relation.mentorId === mentorId) {
                if (includeGraduated || !relation.graduated) {
                    students.push({
                        studentId: studentId,
                        level: relation.studentLevel,
                        graduated: relation.graduated,
                        establishTime: relation.establishTime
                    });
                }
            }
        }
        return students;
    }
    
    // 更新徒弟等级
    updateStudentLevel(studentId: string, newLevel: number): void {
        const relation = this.relationships.get(studentId);
        if (relation && !relation.graduated) {
            relation.studentLevel = newLevel;
        }
    }
    
    onLoad() {
        console.log('MentorSystem 加载完成');
    }
}