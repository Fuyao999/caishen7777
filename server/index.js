const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const { setupDatabase } = require('./setup');

const app = express();
const PORT = 3001;

// 中间件
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// JWT验证中间件
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'caishen-game-secret-key-2026';

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
        return res.status(401).json({ success: false, message: '未登录' });
    }
    
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: 'token无效' });
    }
};

// 路由
app.use('/api/auth', require('./routes/auth'));
app.use('/api/player', authMiddleware, require('./routes/player'));
app.use('/api/temple', authMiddleware, require('./routes/temple'));
app.use('/api/alms', authMiddleware, require('./routes/alms'));
app.use('/api/quests', authMiddleware, require('./routes/quests'));
app.use('/api/mails', authMiddleware, require('./routes/mails'));
app.use('/api/friends', authMiddleware, require('./routes/friends'));
app.use('/api/guilds', authMiddleware, require('./routes/guilds'));
app.use('/api/rankings', authMiddleware, require('./routes/rankings'));
app.use('/api/admin', authMiddleware, require('./routes/admin'));
app.use('/api/robots', authMiddleware, require('./routes/robots'));

// 健康检查
app.get('/health', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
});

// 管理后台页面
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// 启动服务器
async function start() {
    // 初始化数据库
    await setupDatabase();
    
    app.listen(PORT, () => {
        console.log(`🏮 财神大陆服务器运行在 http://localhost:${PORT}`);
        console.log(`📊 管理后台: http://localhost:${PORT}/admin`);
        console.log('');
        console.log('API端点:');
        console.log('  POST /api/auth/login      - 登录');
        console.log('  GET  /api/player/data     - 玩家数据');
        console.log('  POST /api/temple/worship  - 供奉');
        console.log('  POST /api/alms/beg        - 化缘');
        console.log('  GET  /api/quests/list     - 任务列表');
        console.log('  GET  /api/mails/list      - 邮件列表');
        console.log('  GET  /api/friends/list    - 好友列表');
        console.log('  GET  /api/guilds/list     - 门派列表');
        console.log('  GET  /api/rankings/level  - 等级榜');
        console.log('  GET  /api/admin/stats     - 管理统计');
    });
}

start().catch(console.error);

module.exports = app;
