// ============================================
// 财神大陆 - Express 主入口
// ============================================
require('dotenv').config();

const express    = require('express');
const cors       = require('cors');
const helmet     = require('helmet');
const morgan     = require('morgan');
const rateLimit  = require('express-rate-limit');
const path       = require('path');

const { testConnection } = require('./config/database');
const { errorHandler }   = require('./middleware/errorHandler');

// 路由
const authRoutes      = require('./routes/auth');
const playerRoutes    = require('./routes/player');
const inventoryRoutes = require('./routes/inventory');
const equipmentRoutes = require('./routes/equipment');
const sideRoomRoutes  = require('./routes/sideRoom');
const almsRoutes      = require('./routes/alms');
const shopRoutes      = require('./routes/shop');
const skillRoutes     = require('./routes/skills');
const sectRoutes      = require('./routes/sects');
const mentorRoutes    = require('./routes/mentor');
const petRoutes       = require('./routes/pets');
const mountRoutes     = require('./routes/mounts');
const spiritRoutes    = require('./routes/spirits');
const marketRoutes    = require('./routes/market');
const pvpRoutes       = require('./routes/pvp');
const rechargeRoutes  = require('./routes/recharge');
const eventRoutes     = require('./routes/events');
const adminRoutes     = require('./routes/admin');

const app = express();
const PORT = process.env.PORT || 3000;

// ==================== 中间件 ====================
app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(morgan('dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// 速率限制
app.use('/api/', rateLimit({
  windowMs: 60 * 1000,
  max: parseInt(process.env.RATE_LIMIT_MAX) || 100,
  message: { code: 429, message: '请求过于频繁，请稍后再试' }
}));

// ==================== 路由挂载 ====================
app.use('/api/auth',      authRoutes);
app.use('/api/player',    playerRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/equipment', equipmentRoutes);
app.use('/api/sideroom',  sideRoomRoutes);
app.use('/api/alms',      almsRoutes);
app.use('/api/shop',      shopRoutes);
app.use('/api/skills',    skillRoutes);
app.use('/api/sects',     sectRoutes);
app.use('/api/mentor',    mentorRoutes);
app.use('/api/pets',      petRoutes);
app.use('/api/mounts',    mountRoutes);
app.use('/api/spirits',   spiritRoutes);
app.use('/api/market',    marketRoutes);
app.use('/api/pvp',       pvpRoutes);
app.use('/api/recharge',  rechargeRoutes);
app.use('/api/events',    eventRoutes);
app.use('/api/admin',     adminRoutes);

// ==================== 健康检查 ====================
app.get('/api/health', (req, res) => {
  res.json({
    code: 200,
    message: '财神大陆服务运行中 🏮',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// ==================== 静态文件 (可选) ====================
app.use(express.static(path.join(__dirname, 'public')));

// ==================== 错误处理 ====================
app.use((req, res) => {
  res.status(404).json({ code: 404, message: '接口不存在' });
});
app.use(errorHandler);

// ==================== 启动 ====================
async function start() {
  const dbOk = await testConnection();
  if (!dbOk) {
    console.error('⚠️ 数据库连接失败，但服务仍启动（部分功能不可用）');
  }
  
  app.listen(PORT, () => {
    console.log(`\n🏮 财神大陆服务启动成功`);
    console.log(`📡 地址: http://localhost:${PORT}`);
    console.log(`📋 健康检查: http://localhost:${PORT}/api/health`);
    console.log(`🔧 环境: ${process.env.NODE_ENV || 'development'}\n`);
  });
}

start();

module.exports = app;
