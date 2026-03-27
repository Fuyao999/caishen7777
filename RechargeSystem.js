const express = require('express');
const router = express.Router();

/**
 * 财神大陆 - 充值系统 API
 * 支持多种支付方式，VIP系统，充值返利
 */

// 充值配置
const RECHARGE_CONFIG = {
    // 充值档位（人民币：元宝）
    tiers: [
        { id: 'tier_6', amount: 6, yuanbao: 60, bonus: 0, firstBonus: 60 },      // 首充双倍
        { id: 'tier_30', amount: 30, yuanbao: 300, bonus: 15, firstBonus: 300 },  // 首充双倍
        { id: 'tier_68', amount: 68, yuanbao: 680, bonus: 68, firstBonus: 680 },
        { id: 'tier_128', amount: 128, yuanbao: 1280, bonus: 192, firstBonus: 1280 },
        { id: 'tier_328', amount: 328, yuanbao: 3280, bonus: 656, firstBonus: 3280 },
        { id: 'tier_648', amount: 648, yuanbao: 6480, bonus: 1944, firstBonus: 6480 },
        { id: 'tier_1998', amount: 1998, yuanbao: 19980, bonus: 7992, firstBonus: 19980 },
        { id: 'tier_4998', amount: 4998, yuanbao: 49980, bonus: 24990, firstBonus: 49980 }
    ],
    
    // VIP等级配置
    vipLevels: [
        { level: 0, name: '普通', rechargeRequired: 0, benefits: [] },
        { level: 1, name: 'VIP1', rechargeRequired: 6, benefits: ['每日礼包', '经验加成5%'] },
        { level: 2, name: 'VIP2', rechargeRequired: 30, benefits: ['每日礼包', '经验加成10%', '免费传送'] },
        { level: 3, name: 'VIP3', rechargeRequired: 100, benefits: ['每日礼包', '经验加成15%', '免费传送', '专属称号'] },
        { level: 4, name: 'VIP4', rechargeRequired: 300, benefits: ['每日礼包', '经验加成20%', '免费传送', '专属称号', '交易免税'] },
        { level: 5, name: 'VIP5', rechargeRequired: 1000, benefits: ['每日礼包', '经验加成25%', '免费传送', '专属称号', '交易免税', '专属客服'] },
        { level: 6, name: 'VIP6', rechargeRequired: 3000, benefits: ['每日礼包', '经验加成30%', '免费传送', '专属称号', '交易免税', '专属客服', '优先排队'] },
        { level: 7, name: 'VIP7', rechargeRequired: 10000, benefits: ['每日礼包', '经验加成35%', '免费传送', '专属称号', '交易免税', '专属客服', '优先排队', '专属活动'] },
        { level: 8, name: 'VIP8', rechargeRequired: 30000, benefits: ['每日礼包', '经验加成40%', '免费传送', '专属称号', '交易免税', '专属客服', '优先排队', '专属活动', '定制服务'] }
    ],
    
    // 支付方式
    paymentMethods: [
        { id: 'wechat', name: '微信支付', icon: 'wechat.png' },
        { id: 'alipay', name: '支付宝', icon: 'alipay.png' },
        { id: 'apple', name: 'Apple Pay', icon: 'apple.png' },
        { id: 'google', name: 'Google Pay', icon: 'google.png' }
    ]
};

// 模拟数据存储
let orders = [];
let orderIdCounter = 10000;

// ===== 充值API =====

// 获取充值档位
router.get('/tiers', async (req, res) => {
    try {
        const { userId } = req.query;
        
        // 获取用户首充状态
        const userFirstRecharge = await getUserFirstRechargeStatus(userId);
        
        const tiers = RECHARGE_CONFIG.tiers.map(tier => ({
            ...tier,
            isFirstRecharge: !userFirstRecharge[tier.id],
            actualYuanbao: !userFirstRecharge[tier.id] 
                ? tier.yuanbao + tier.firstBonus 
                : tier.yuanbao + tier.bonus
        }));
        
        res.json({ success: true, data: tiers });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
});

// 获取支付方式
router.get('/payment-methods', async (req, res) => {
    try {
        res.json({ success: true, data: RECHARGE_CONFIG.paymentMethods });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
});

// 创建充值订单
router.post('/create-order', async (req, res) => {
    const { userId, tierId, paymentMethod } = req.body;
    
    try {
        const tier = RECHARGE_CONFIG.tiers.find(t => t.id === tierId);
        if (!tier) {
            return res.json({ success: false, message: '充值档位不存在' });
        }
        
        // 创建订单
        const order = {
            id: `ORD${Date.now()}${orderIdCounter++}`,
            userId: userId,
            tierId: tierId,
            amount: tier.amount,
            yuanbao: tier.yuanbao,
            bonus: tier.bonus,
            paymentMethod: paymentMethod,
            status: 'pending',  // pending, paid, cancelled, refunded
            createTime: new Date().toISOString(),
            payTime: null,
            transactionId: null
        };
        
        orders.push(order);
        
        // 返回支付参数（实际应该调用支付平台SDK）
        const payParams = generatePayParams(order, paymentMethod);
        
        res.json({
            success: true,
            message: '订单创建成功',
            data: {
                order: order,
                payParams: payParams
            }
        });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
});

// 生成支付参数（模拟）
function generatePayParams(order, paymentMethod) {
    const params = {
        orderId: order.id,
        amount: order.amount,
        subject: '财神大陆-元宝充值',
        body: `充值${order.yuanbao}元宝`,
        timestamp: Date.now()
    };
    
    // 根据不同支付方式生成不同参数
    switch(paymentMethod) {
        case 'wechat':
            return {
                ...params,
                appId: 'wx_app_id',
                nonceStr: generateNonceStr(),
                sign: 'sign_placeholder'
            };
        case 'alipay':
            return {
                ...params,
                appId: 'alipay_app_id',
                notifyUrl: 'https://api.caishen.com/payment/alipay/notify'
            };
        default:
            return params;
    }
}

function generateNonceStr() {
    return Math.random().toString(36).substr(2, 15);
}

// 支付回调（模拟支付平台回调）
router.post('/callback/:paymentMethod', async (req, res) => {
    const { paymentMethod } = req.params;
    const { orderId, transactionId, status } = req.body;
    
    try {
        const order = orders.find(o => o.id === orderId);
        if (!order) {
            return res.status(404).send('Order not found');
        }
        
        if (status === 'success') {
            order.status = 'paid';
            order.payTime = new Date().toISOString();
            order.transactionId = transactionId;
            
            // 发放元宝
            await grantYuanbao(order.userId, order.yuanbao + order.bonus);
            
            // 更新VIP等级
            await updateVIPLevel(order.userId, order.amount);
            
            // 记录首充
            await recordFirstRecharge(order.userId, order.tierId);
            
            // 触发充值返利活动
            await checkRechargeRebate(order.userId, order.amount);
        }
        
        res.send('success');
    } catch (error) {
        console.error('支付回调处理错误:', error);
        res.status(500).send('error');
    }
});

// 模拟发放元宝
async function grantYuanbao(userId, amount) {
    console.log(`给用户${userId}发放${amount}元宝`);
    return true;
}

// 模拟更新VIP等级
async function updateVIPLevel(userId, amount) {
    const totalRecharge = await getUserTotalRecharge(userId);
    totalRecharge += amount;
    
    // 计算VIP等级
    let vipLevel = 0;
    for (let i = RECHARGE_CONFIG.vipLevels.length - 1; i >= 0; i--) {
        if (totalRecharge >= RECHARGE_CONFIG.vipLevels[i].rechargeRequired) {
            vipLevel = i;
            break;
        }
    }
    
    console.log(`用户${userId}VIP等级更新为${vipLevel}`);
    return vipLevel;
}

// 模拟获取用户累计充值
async function getUserTotalRecharge(userId) {
    // 实际应该从数据库查询
    return orders
        .filter(o => o.userId === userId && o.status === 'paid')
        .reduce((sum, o) => sum + o.amount, 0);
}

// 模拟获取用户首充状态
async function getUserFirstRechargeStatus(userId) {
    // 实际应该从数据库查询
    return {};
}

// 模拟记录首充
async function recordFirstRecharge(userId, tierId) {
    console.log(`记录用户${userId}已完成${tierId}首充`);
}

// 模拟检查充值返利
async function checkRechargeRebate(userId, amount) {
    console.log(`检查用户${userId}充值返利，金额${amount}`);
}

// 查询订单状态
router.get('/order/:orderId', async (req, res) => {
    const { orderId } = req.params;
    
    try {
        const order = orders.find(o => o.id === orderId);
        if (!order) {
            return res.json({ success: false, message: '订单不存在' });
        }
        
        res.json({ success: true, data: order });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
});

// 取消订单
router.post('/order/:orderId/cancel', async (req, res) => {
    const { orderId } = req.params;
    
    try {
        const order = orders.find(o => o.id === orderId);
        if (!order) {
            return res.json({ success: false, message: '订单不存在' });
        }
        
        if (order.status !== 'pending') {
            return res.json({ success: false, message: '订单状态不允许取消' });
        }
        
        order.status = 'cancelled';
        res.json({ success: true, message: '订单已取消' });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
});

// ===== VIP系统 =====

// 获取VIP配置
router.get('/vip/config', async (req, res) => {
    try {
        res.json({ success: true, data: RECHARGE_CONFIG.vipLevels });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
});

// 获取用户VIP信息
router.get('/vip/:userId', async (req, res) => {
    const { userId } = req.params;
    
    try {
        const totalRecharge = await getUserTotalRecharge(userId);
        
        // 计算当前VIP等级
        let currentLevel = 0;
        let nextLevel = null;
        
        for (let i = 0; i < RECHARGE_CONFIG.vipLevels.length; i++) {
            if (totalRecharge >= RECHARGE_CONFIG.vipLevels[i].rechargeRequired) {
                currentLevel = i;
            }
        }
        
        // 计算下一级
        if (currentLevel < RECHARGE_CONFIG.vipLevels.length - 1) {
            nextLevel = {
                level: currentLevel + 1,
                name: RECHARGE_CONFIG.vipLevels[currentLevel + 1].name,
                required: RECHARGE_CONFIG.vipLevels[currentLevel + 1].rechargeRequired,
                remaining: RECHARGE_CONFIG.vipLevels[currentLevel + 1].rechargeRequired - totalRecharge
            };
        }
        
        res.json({
            success: true,
            data: {
                totalRecharge: totalRecharge,
                currentLevel: RECHARGE_CONFIG.vipLevels[currentLevel],
                nextLevel: nextLevel,
                benefits: RECHARGE_CONFIG.vipLevels[currentLevel].benefits
            }
        });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
});

// 领取VIP每日礼包
router.post('/vip/:userId/claim-daily', async (req, res) => {
    const { userId } = req.params;
    
    try {
        const totalRecharge = await getUserTotalRecharge(userId);
        let vipLevel = 0;
        
        for (let i = 0; i < RECHARGE_CONFIG.vipLevels.length; i++) {
            if (totalRecharge >= RECHARGE_CONFIG.vipLevels[i].rechargeRequired) {
                vipLevel = i;
            }
        }
        
        if (vipLevel === 0) {
            return res.json({ success: false, message: '非VIP用户无法领取' });
        }
        
        // 根据VIP等级发放不同奖励
        const rewards = generateVIPDailyReward(vipLevel);
        
        res.json({
            success: true,
            message: 'VIP每日礼包领取成功',
            data: { rewards }
        });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
});

function generateVIPDailyReward(vipLevel) {
    const baseRewards = {
        money: 1000 * vipLevel,
        yuanbao: 10 * vipLevel,
        items: []
    };
    
    if (vipLevel >= 3) {
        baseRewards.items.push({ name: '高级装备箱', count: 1 });
    }
    if (vipLevel >= 5) {
        baseRewards.items.push({ name: '传说装备碎片', count: vipLevel - 4 });
    }
    if (vipLevel >= 7) {
        baseRewards.items.push({ name: '财神专属外观', count: 1 });
    }
    
    return baseRewards;
}

// ===== 充值记录 =====

// 获取用户充值记录
router.get('/records/:userId', async (req, res) => {
    const { userId } = req.params;
    const { page = 1, limit = 20 } = req.query;
    
    try {
        const userOrders = orders
            .filter(o => o.userId === userId)
            .sort((a, b) => new Date(b.createTime) - new Date(a.createTime));
        
        const start = (page - 1) * limit;
        const paginated = userOrders.slice(start, start + parseInt(limit));
        
        res.json({
            success: true,
            data: paginated,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total: userOrders.length
            }
        });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
});

// ===== 管理后台接口 =====

// 获取充值统计
router.get('/admin/stats', async (req, res) => {
    try {
        const today = new Date().toISOString().split('T')[0];
        
        const stats = {
            todayRecharge: orders
                .filter(o => o.status === 'paid' && o.payTime.startsWith(today))
                .reduce((sum, o) => sum + o.amount, 0),
            totalRecharge: orders
                .filter(o => o.status === 'paid')
                .reduce((sum, o) => sum + o.amount, 0),
            todayOrders: orders.filter(o => o.createTime.startsWith(today)).length,
            pendingOrders: orders.filter(o => o.status === 'pending').length,
            
            // 充值分布
            tierDistribution: RECHARGE_CONFIG.tiers.map(tier => ({
                tierId: tier.id,
                amount: tier.amount,
                count: orders.filter(o => o.tierId === tier.id && o.status === 'paid').length,
                totalAmount: orders
                    .filter(o => o.tierId === tier.id && o.status === 'paid')
                    .reduce((sum, o) => sum + o.amount, 0)
            })),
            
            // VIP分布
            vipDistribution: RECHARGE_CONFIG.vipLevels.map((vip, index) => ({
                level: index,
                name: vip.name,
                userCount: Math.floor(Math.random() * 100)  // 模拟数据
            }))
        };
        
        res.json({ success: true, data: stats });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
});

// 获取所有订单（管理后台）
router.get('/admin/orders', async (req, res) => {
    const { page = 1, limit = 20, status, startDate, endDate } = req.query;
    
    try {
        let filtered = [...orders];
        
        if (status) filtered = filtered.filter(o => o.status === status);
        if (startDate) filtered = filtered.filter(o => o.createTime >= startDate);
        if (endDate) filtered = filtered.filter(o => o.createTime <= endDate);
        
        filtered.sort((a, b) => new Date(b.createTime) - new Date(a.createTime));
        
        const start = (page - 1) * limit;
        const paginated = filtered.slice(start, start + parseInt(limit));
        
        res.json({
            success: true,
            data: paginated,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total: filtered.length
            }
        });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
});

// 手动补单
router.post('/admin/order/:orderId/complete', async (req, res) => {
    const { orderId } = req.params;
    const { adminId, reason } = req.body;
    
    try {
        const order = orders.find(o => o.id === orderId);
        if (!order) {
            return res.json({ success: false, message: '订单不存在' });
        }
        
        if (order.status === 'paid') {
            return res.json({ success: false, message: '订单已完成' });
        }
        
        order.status = 'paid';
        order.payTime = new Date().toISOString();
        order.transactionId = `MANUAL_${adminId}_${Date.now()}`;
        
        // 发放元宝
        await grantYuanbao(order.userId, order.yuanbao + order.bonus);
        await updateVIPLevel(order.userId, order.amount);
        
        res.json({ success: true, message: '手动补单成功' });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
});

// 退款
router.post('/admin/order/:orderId/refund', async (req, res) => {
    const { orderId } = req.params;
    const { adminId, reason } = req.body;
    
    try {
        const order = orders.find(o => o.id === orderId);
        if (!order) {
            return res.json({ success: false, message: '订单不存在' });
        }
        
        if (order.status !== 'paid') {
            return res.json({ success: false, message: '只有已支付订单可以退款' });
        }
        
        order.status = 'refunded';
        order.refundTime = new Date().toISOString();
        order.refundReason = reason;
        order.refundBy = adminId;
        
        // 扣除元宝（实际需要处理负数情况）
        await grantYuanbao(order.userId, -(order.yuanbao + order.bonus));
        
        res.json({ success: true, message: '退款成功' });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
});

module.exports = router;