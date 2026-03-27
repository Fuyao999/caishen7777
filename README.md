# 财神大陆 - Cocos Creator版

## 📋 项目说明

财神大陆是一款2D放置类修仙游戏，玩家扮演一座神像，通过供奉财神、化缘行善、修炼升级，最终修炼成金身，探索十二财域，获得财神神格。

## 🎮 核心玩法

### 第一阶段（1-5级）- 新手村
- **供奉系统**：向9位财神供奉，获得香火钱和功德
- **化缘系统**：前往4个地区化缘，获取香火钱（有风险）
- **升级系统**：积累功德升级，从泥胎→木骨→铜身→金身
- **背包系统**：管理供奉材料和装备

### 第二阶段（6-99级）- 探索世界
- **十二财域**：12个场景，每个对应一个时辰
- **战斗系统**：回合制战斗，主角+灵兽出战
- **装备系统**：402件装备，可强化、合成
- **灵兽系统**：32只灵兽，可捕捉、进化
- **社交系统**：好友、门派、师徒

## 🛠️ 技术栈

### 客户端
- Cocos Creator 3.8.0
- TypeScript

### 服务端
- Node.js 18+
- Express.js
- MySQL 8.0

## 📦 安装部署

### 1. 环境准备
```bash
# 安装Node.js和MySQL
brew install node mysql

# 启动MySQL
brew services start mysql
```

### 2. 数据库初始化
```bash
# 登录MySQL
mysql -u root -p

# 执行建表脚本
source /Users/fuyao/Desktop/财神大陆-Cocos/database/schema.sql
source /Users/fuyao/Desktop/财神大陆-Cocos/database/additional_tables.sql
```

### 3. 启动服务端
```bash
cd /Users/fuyao/Desktop/财神大陆-Cocos/server
npm install
npm start
```

### 4. 运行客户端
1. 打开Cocos Creator 3.8.0
2. 打开项目：`/Users/fuyao/Desktop/财神大陆-Cocos/client`
3. 点击"预览"按钮

或使用一键启动脚本：
```bash
bash /Users/fuyao/Desktop/财神大陆-Cocos/start.sh
```

## 🎯 测试账号

- 手机号：任意11位数字
- 验证码：1234

## 📁 项目结构

```
财神大陆-Cocos/
├── client/                      # Cocos游戏客户端
│   ├── assets/
│   │   └── scripts/
│   │       ├── Config/          # 游戏配置
│   │       │   ├── GameConfig.ts
│   │       │   ├── SceneConfig.ts
│   │       │   ├── EquipmentConfig.ts
│   │       │   ├── PetConfig.ts
│   │       │   ├── SkillConfig.ts
│   │       │   └── QuestConfig.ts
│   │       ├── Core/            # 核心系统
│   │       │   ├── GameManager.ts
│   │       │   ├── NetworkManager.ts
│   │       │   ├── PlayerData.ts
│   │       │   └── AudioManager.ts
│   │       ├── UI/              # 界面场景
│   │       │   ├── LoginScene.ts
│   │       │   ├── MainScene.ts
│   │       │   ├── TempleScene.ts
│   │       │   ├── AlmsScene.ts
│   │       │   ├── UpgradeScene.ts
│   │       │   ├── BagScene.ts
│   │       │   ├── BattleScene.ts
│   │       │   ├── CultivateScene.ts
│   │       │   ├── SettingsScene.ts
│   │       │   └── GuideManager.ts
│   │       └── Utils/           # 工具类
│   │           └── Utils.ts
│   └── package.json
├── server/                      # Node.js后端
│   ├── routes/
│   │   ├── auth.js              # 认证
│   │   ├── player.js            # 玩家数据
│   │   ├── temple.js            # 供奉
│   │   ├── alms.js              # 化缘
│   │   ├── admin.js             # 管理后台API
│   │   └── robots.js            # 机器人管理
│   ├── public/
│   │   └── admin.html           # 管理后台页面
│   ├── index.js                 # 入口
│   ├── database.js              # 数据库连接
│   ├── setup.js                 # 数据库初始化
│   └── package.json
├── database/                    # 数据库脚本
│   ├── schema.sql               # 基础表结构
│   └── additional_tables.sql    # 扩展表结构
├── docs/                        # 文档
│   └── 部署文档.md
├── start.sh                     # 一键启动脚本
└── README.md                    # 本文件
```

## 🔌 API接口

### 认证
- `POST /api/auth/login` - 登录
- `POST /api/auth/send-code` - 发送验证码

### 玩家
- `GET /api/player/data` - 获取玩家数据
- `POST /api/player/update` - 更新玩家数据

### 供奉
- `GET /api/temple/info` - 获取供奉信息
- `POST /api/temple/worship` - 供奉

### 化缘
- `GET /api/alms/info` - 获取化缘信息
- `POST /api/alms/beg` - 化缘

### 管理后台
- `GET /api/admin/stats` - 统计数据
- `GET /api/admin/users` - 用户列表
- `POST /api/admin/users/:id/ban` - 封禁用户

### 机器人
- `GET /api/robots/list` - 机器人列表
- `POST /api/robots/batch-create` - 批量创建
- `DELETE /api/robots/:id` - 删除机器人

## 🎨 游戏配置

### 9位财神
- 正财神（赵公明）- 香火钱+20%
- 文财神（比干）- 法力上限+10
- 武财神（关公）- 化缘收益+15%
- 偏财神（范蠡）- 暴击率+5%
- 增福财神（李诡祖）- 功德+10%
- 禄财神（沈万三）- 法力回复+20%
- 寿财神（刘海蟾）- 香火钱上限+1000
- 喜财神（子贡）- 每日首供双倍
- 财神婆婆 - 化缘风险-10%

### 升级路线
- 泥胎（1级）→ 功德100
- 木骨（5级）→ 功德500
- 铜身（15级）→ 功德2000
- 金身（30级）→ 功德10000

## 📜 开发日志

2026-03-23 通宵开发完成核心系统

## 📄 许可证

MIT
