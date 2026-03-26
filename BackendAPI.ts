/**
 * 财神大陆 - 后端API框架（Node.js + Express）
 * RESTful API接口设计
 */

// ==================== API路由设计 ====================

const API_ROUTES = {
    // 用户认证
    auth: {
        register: 'POST /api/auth/register',
        login: 'POST /api/auth/login',
        logout: 'POST /api/auth/logout',
        refreshToken: 'POST /api/auth/refresh'
    },
    
    // 玩家数据
    player: {
        getProfile: 'GET /api/player/profile',
        updateProfile: 'PUT /api/player/profile',
        getStatus: 'GET /api/player/status',
        saveData: 'POST /api/player/save',
        loadData: 'GET /api/player/load'
    },
    
    // 等级系统
    level: {
        getExpTable: 'GET /api/level/exp-table',
        addExp: 'POST /api/level/add-exp',
        getProgress: 'GET /api/level/progress'
    },
    
    // 财域系统
    domain: {
        getAllDomains: 'GET /api/domain/all',
        getDomainDetail: 'GET /api/domain/:id',
        getAvailableDomains: 'GET /api/domain/available',
        enterDomain: 'POST /api/domain/:id/enter',
        explore: 'POST /api/domain/:id/explore',
        fightBoss: 'POST /api/domain/:id/boss'
    },
    
    // 战斗系统
    combat: {
        calculateDamage: 'POST /api/combat/calculate',
        simulateBattle: 'POST /api/combat/simulate',
        getAttributes: 'GET /api/combat/attributes'
    },
    
    // 装备系统
    equipment: {
        getAllEquipment: 'GET /api/equipment/list',
        forge: 'POST /api/equipment/forge',
        enhance: 'POST /api/equipment/:id/enhance',
        refine: 'POST /api/equipment/:id/refine',
        enchant: 'POST /api/equipment/:id/enchant',
        equip: 'POST /api/equipment/:id/equip',
        unequip: 'POST /api/equipment/:id/unequip'
    },
    
    // 门派系统
    sect: {
        getAllSects: 'GET /api/sect/all',
        getSectDetail: 'GET /api/sect/:id',
        join: 'POST /api/sect/:id/join',
        leave: 'POST /api/sect/leave',
        getMembers: 'GET /api/sect/:id/members',
        contribute: 'POST /api/sect/contribute',
        getTasks: 'GET /api/sect/tasks',
        completeTask: 'POST /api/sect/tasks/:taskId/complete',
        startElection: 'POST /api/sect/election/start',
        vote: 'POST /api/sect/election/vote',
        activateFormation: 'POST /api/sect/formation/activate'
    },
    
    // 师徒系统
    mentor: {
        findMentor: 'GET /api/mentor/find',
        findStudent: 'GET /api/mentor/student/find',
        establish: 'POST /api/mentor/establish',
        dailyGift: 'POST /api/mentor/gift',
        checkGraduation: 'GET /api/mentor/graduation',
        graduate: 'POST /api/mentor/graduate',
        dissolve: 'POST /api/mentor/dissolve',
        getRanking: 'GET /api/mentor/ranking'
    },
    
    // 交易系统
    market: {
        // 摆摊
        createStall: 'POST /api/market/stall/create',
        getStall: 'GET /api/market/stall/:playerId',
        listItem: 'POST /api/market/stall/list',
        unlistItem: 'DELETE /api/market/stall/:itemId',
        buyFromStall: 'POST /api/market/stall/:playerId/buy',
        
        // 拍卖行
        getAuctions: 'GET /api/market/auction/list',
        createAuction: 'POST /api/market/auction/create',
        placeBid: 'POST /api/market/auction/:id/bid',
        buyout: 'POST /api/market/auction/:id/buyout',
        getAuctionDetail: 'GET /api/market/auction/:id',
        
        // 股票
        getStocks: 'GET /api/market/stock/list',
        getStockDetail: 'GET /api/market/stock/:id',
        buyStock: 'POST /api/market/stock/:id/buy',
        sellStock: 'POST /api/market/stock/:id/sell',
        getHoldings: 'GET /api/market/stock/holdings'
    },
    
    // PVP系统
    pvp: {
        getModes: 'GET /api/pvp/modes',
        getRankings: 'GET /api/pvp/ranking',
        getPlayerRank: 'GET /api/pvp/rank',
        challenge: 'POST /api/pvp/challenge',
        getMatchResult: 'GET /api/pvp/match/:id',
        
        // 世界BOSS
        getWorldBoss: 'GET /api/pvp/boss',
        attackBoss: 'POST /api/pvp/boss/attack',
        getBossRanking: 'GET /api/pvp/boss/ranking'
    },
    
    // 许愿树
    wishTree: {
        getTypes: 'GET /api/wish-tree/types',
        draw: 'POST /api/wish-tree/draw',
        tenDraw: 'POST /api/wish-tree/draw/ten',
        getCumulative: 'GET /api/wish-tree/cumulative',
        claimCumulative: 'POST /api/wish-tree/cumulative/claim'
    },
    
    // 排行榜
    ranking: {
        getLevelRanking: 'GET /api/ranking/level',
        getWealthRanking: 'GET /api/ranking/wealth',
        getPVPRanking: 'GET /api/ranking/pvp',
        getSectRanking: 'GET /api/ranking/sect'
    },
    
    // 邮件/公告
    mail: {
        getInbox: 'GET /api/mail/inbox',
        getMail: 'GET /api/mail/:id',
        sendMail: 'POST /api/mail/send',
        deleteMail: 'DELETE /api/mail/:id',
        claimAttachment: 'POST /api/mail/:id/claim'
    },
    
    // 活动
    event: {
        getCurrentEvents: 'GET /api/event/current',
        getEventDetail: 'GET /api/event/:id',
        participate: 'POST /api/event/:id/participate',
        claimReward: 'POST /api/event/:id/reward'
    }
};

// ==================== 数据模型设计 ====================

const DATA_MODELS = {
    // 玩家基础数据
    Player: {
        id: 'string',
        username: 'string',
        password: 'string (hashed)',
        email: 'string',
        createTime: 'timestamp',
        lastLogin: 'timestamp',
        
        // 游戏数据
        level: 'number',
        exp: 'number',
        realm: 'string',
        form: 'string',
        
        // 货币
        money: 'number',
        yuanbao: 'number',
        merit: 'number',
        fragments: 'number',
        banners: 'number',
        honor: 'number',
        
        // 设置
        birthHour: 'string',
        settings: 'object'
    },
    
    // 装备数据
    Equipment: {
        id: 'string',
        playerId: 'string',
        name: 'string',
        type: 'string',
        slot: 'string',
        quality: 'string',
        level: 'number',
        stats: 'object',
        enhanceLevel: 'number',
        enchant: 'object',
        equipped: 'boolean'
    },
    
    // 社交数据
    Social: {
        playerId: 'string',
        friends: 'array',
        sect: 'string',
        mentor: 'string',
        students: 'array',
        virtuePoints: 'number'
    },
    
    // 战斗记录
    BattleLog: {
        id: 'string',
        playerId: 'string',
        type: 'string',
        opponent: 'string',
        result: 'string',
        reward: 'object',
        timestamp: 'timestamp'
    },
    
    // 交易记录
    TradeLog: {
        id: 'string',
        sellerId: 'string',
        buyerId: 'string',
        item: 'object',
        price: 'number',
        tax: 'number',
        timestamp: 'timestamp'
    }
};

// ==================== 服务端架构 ====================

const SERVER_ARCHITECTURE = {
    // 技术栈
    stack: {
        runtime: 'Node.js',
        framework: 'Express.js',
        database: 'MongoDB (主) + Redis (缓存)',
        websocket: 'Socket.io (实时通信)',
        auth: 'JWT (JSON Web Token)',
        deployment: 'Docker + Kubernetes'
    },
    
    // 服务模块
    services: {
        gateway: 'API网关，路由分发，限流',
        auth: '认证服务，登录注册，Token管理',
        game: '游戏逻辑服务，核心玩法',
        chat: '聊天服务，私聊/世界/门派',
        notify: '推送服务，邮件，公告',
        log: '日志服务，数据分析'
    },
    
    // 安全措施
    security: {
        encryption: 'HTTPS/TLS 1.3',
        validation: '输入验证，SQL注入防护',
        rateLimit: '请求频率限制',
        antiCheat: '行为分析，异常检测',
        backup: '定时备份，灾难恢复'
    }
};

// ==================== 导出 ====================

export default {
    API_ROUTES,
    DATA_MODELS,
    SERVER_ARCHITECTURE
};

console.log('后端API框架设计完成');
console.log('API路由数量:', Object.keys(API_ROUTES).length);
console.log('数据模型数量:', Object.keys(DATA_MODELS).length);