const express = require('express');
const router = express.Router();
const { query } = require('../database');

// 化缘地区配置
const REGIONS = {
    east: { name: '东', risk: 0.1, baseReward: 100, desc: '东海之滨，风险较低' },
    south: { name: '南', risk: 0.2, baseReward: 200, desc: '南疆之地，中等风险' },
    west: { name: '西', risk: 0.3, baseReward: 300, desc: '西域之路，较高风险' },
    north: { name: '北', risk: 0.4, baseReward: 500, desc: '北境冰原，高风险高回报' }
};

// 风险事件
const RISK_EVENTS = [
    { type: 'robbery', name: '遇匪', desc: '遭遇劫匪，损失部分香火钱', penalty: 0.5 },
    { type: 'fraud', name: '被骗', desc: '遇到骗子，香火钱被骗光', penalty: 1.0 },
    { type: 'sick', name: '生病', desc: '路途劳累生病，损失法力', penalty: 0 },
    { type: 'storm', name: '遇灾', desc: '遇到天灾，空手而归', penalty: 0 }
];

// 获取化缘信息
router.get('/info', async (req, res) => {
    const userId = req.userId;
    
    try {
        const playerData = await query(
            'SELECT mana, incense_money FROM player_data WHERE user_id = ?',
            [userId]
        );
        
        res.json({
            success: true,
            regions: REGIONS,
            player: playerData[0]
        });
    } catch (error) {
        console.error('获取化缘信息错误:', error);
        res.json({ success: false, message: '服务器错误' });
    }
});

// 执行化缘
router.post('/beg', async (req, res) => {
    const userId = req.userId;
    const { region, useShield } = req.body;
    
    if (!REGIONS[region]) {
        return res.json({ success: false, message: '地区不存在' });
    }
    
    const regionConfig = REGIONS[region];
    
    try {
        // 检查法力
        const playerData = await query(
            'SELECT mana, incense_money FROM player_data WHERE user_id = ?',
            [userId]
        );
        
        if (playerData[0].mana < 10) {
            return res.json({ success: false, message: '法力不足，请休息恢复' });
        }
        
        // 消耗法力
        await query(
            'UPDATE player_data SET mana = mana - 10 WHERE user_id = ?',
            [userId]
        );
        
        // 判断是否触发风险
        const random = Math.random();
        let result = 'success';
        let reward = Math.floor(regionConfig.baseReward * (0.8 + Math.random() * 0.4));
        let riskEvent = null;
        
        if (random < regionConfig.risk) {
            // 触发风险
            if (!useShield) {
                result = 'fail';
                riskEvent = RISK_EVENTS[Math.floor(Math.random() * RISK_EVENTS.length)];
                
                if (riskEvent.penalty > 0) {
                    const penalty = Math.floor(playerData[0].incense_money * riskEvent.penalty);
                    await query(
                        'UPDATE player_data SET incense_money = GREATEST(0, incense_money - ?) WHERE user_id = ?',
                        [penalty, userId]
                    );
                    riskEvent.penaltyAmount = penalty;
                }
            } else {
                // 使用了护盾
                result = 'shielded';
                riskEvent = { name: '护盾保护', desc: '护盾抵挡了风险', penalty: 0 };
            }
        } else {
            // 成功获得奖励
            await query(
                'UPDATE player_data SET incense_money = incense_money + ? WHERE user_id = ?',
                [reward, userId]
            );
        }
        
        // 记录化缘
        await query(
            'INSERT INTO alms_records (user_id, region, result, reward_incense_money, risk_type, used_shield) VALUES (?, ?, ?, ?, ?, ?)',
            [userId, region, result === 'success' ? 'success' : 'fail', 
             result === 'success' ? reward : 0, 
             riskEvent ? riskEvent.name : null, useShield]
        );
        
        res.json({
            success: true,
            result: result,
            reward: result === 'success' ? reward : 0,
            riskEvent: riskEvent,
            message: result === 'success' ? `化缘成功，获得${reward}香火钱！` : 
                     result === 'shielded' ? '护盾保护了你！' : `遭遇${riskEvent.name}！`
        });
        
    } catch (error) {
        console.error('化缘错误:', error);
        res.json({ success: false, message: '服务器错误' });
    }
});

module.exports = router;
