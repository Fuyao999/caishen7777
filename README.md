# 财神大陆 - 第二阶段

**版本**：v0.1.0  
**日期**：2026-03-26  
**引擎**：HTML5 + JavaScript（Node.js兼容）

---

## 📁 文件结构

```
财神大陆-第二阶段/
├── LevelSystem.js          # 等级系统核心（1-99级）
├── TwelveDomains.js        # 十二财域配置
├── Phase1System.js         # 第一阶段庙宇系统（1-5级）
├── PlayerData.js           # 玩家数据管理
├── GameController.js       # 游戏主控制器
├── index.html              # HTML主界面
└── README.md              # 本文档
```

---

## 🎮 核心系统

### 1. 等级系统（LevelSystem.js）

**等级范围**：1-99级

| 阶段 | 等级 | 说明 |
|:---:|:---:|:---|
| 第一阶段 | 1-5级 | 庙宇经营 |
| 早期 | 6-30级 | 探索十二财域（2-3天/级）|
| 中期 | 31-50级 | 门派社交（3-5天/级）|
| 后期 | 51-80级 | PVP竞技（5-7天/级）|
| 顶级 | 81-99级 | 终极追求（7-10天/级）|

**形态变化**：
- Lv.1：泥胎
- Lv.3：木骨
- Lv.4：铜身
- Lv.5：金身（第一阶段巅峰）
- Lv.20：法相
- Lv.50：真身
- Lv.80：财神天尊
- Lv.99：财源之主

**API**：
```javascript
LevelSystem.getRequiredExp(level)     // 获取升级所需经验
LevelSystem.canLevelUp(exp, level)    // 检查是否可升级
LevelSystem.doLevelUp(player)         // 执行升级
LevelSystem.getCurrentForm(level)     // 获取当前形态
```

---

### 2. 十二财域（TwelveDomains.js）

**对应十二时辰，每个域有独特资源**：

| 域 | 解锁等级 | 主题 | 产出 |
|:---:|:---:|:---|:---|
| 辰时·云海天市 | 6级 | 浮空岛贸易 | 新手引导、基础交易 |
| 卯时·金曦原野 | 11级 | 金色晨曦平原 | 粮食、灵材 |
| 寅时·破晓林海 | 11级 | 生机森林 | 灵木、药材 |
| 子时·墨玉矿渊 | 21级 | 地下矿脉 | 元宝材料、矿石 |
| 丑时·玄牝牧场 | 21级 | 异兽牧场 | 食材、坐骑 |
| 巳时·赤焰熔炉 | 21级 | 火山锻造 | 装备强化 |
| 未时·风语沙碛 | 41级 | 沙漠遗迹 | 稀有矿藏、古物 |
| 酉时·落霞宝湾 | 41级 | 神秘海湾 | 海产、珍珠 |
| 申时·雷鸣裂谷 | 41级 | 雷电裂谷 | 雷属性灵材 |
| 午时·金乌圣山 | 61级 | 至阳圣山 | 顶级材料 |
| 戌时·百战擂台 | 61级 | PVP角斗场 | 荣誉、装备测试 |
| 亥时·幽泉秘府 | 61级 | 地下水系 | 阴属性灵材 |

**API**：
```javascript
TwelveDomains.getAvailableDomains(level)      // 获取可进入的域
TwelveDomains.getRecommendedDomain(level)     // 获取推荐域
TwelveDomains.isDomainUnlocked(id, level)     // 检查是否解锁
```

---

### 3. 庙宇系统（Phase1System.js）

**庙宇等级（1-5级）**：

| 等级 | 名称 | 每小时产出 | 存储上限 | 升级需求 |
|:---:|:---|:---:|:---:|:---|
| 1 | 破庙 | 100 | 5,000 | 5,000钱+3幡+100功德 |
| 2 | 小庙 | 180 | 10,000 | 15,000钱+6幡+500功德 |
| 3 | 中庙 | 250 | 18,000 | 50,000钱+10幡+2,000功德 |
| 4 | 大庙 | 333 | 30,000 | 150,000钱+15幡+10,800功德 |
| 5 | 金身庙 | 417 | 50,000 | 满级，解锁第二阶段 |

**招财幡合成**：
- 40碎片 = 1招财幡

**香的类型**：
- 普通香：100钱，2小时
- 高级香：300钱，4小时，+10%产出
- 极品香：10元宝，8小时，+30%产出
- 财神诞特供：活动获得，24小时，+50%产出

---

### 4. 玩家数据（PlayerData.js）

**核心属性**：
```javascript
{
    level: 1,              // 等级
    exp: 0,                // 经验
    templeLevel: 1,        // 庙宇等级
    money: 1000,           // 香火钱
    yuanbao: 0,            // 元宝
    merit: 0,              // 功德（只增不减）
    fragments: 0,          // 碎片
    banners: 0,            // 招财幡
    disciples: 0,          // 信徒
    reputation: 0,         // 声望
    friends: [],           // 好友
    unlockedDomains: [],   // 已解锁财域
    totalAlmsDone: 0,      // 今日化缘次数
    loginDays: 0,          // 登录天数
    lastLoginTime: 0       // 上次登录时间
}
```

**API**：
```javascript
PlayerData.createNew()                    // 创建新玩家
PlayerData.calculateOfflineReward(player) // 计算离线收益
PlayerData.processDailyLogin(player)      // 处理每日登录
PlayerData.save(player)                   // 存档
PlayerData.load()                         // 读档
```

---

### 5. 游戏控制器（GameController.js）

**核心功能**：

```javascript
const game = new GameController();

// 供奉
game.worship('advanced')  // 供奉高级香

// 化缘
game.alms()  // 化缘获得收益

// 庙宇升级
game.upgradeTemple()

// 合成招财幡
game.synthesizeBanner()

// 进入财域
game.enterDomain('chen')  // 进入辰时·云海天市

// 获取状态
game.getStatus()
```

---

## 🚀 快速开始

### 方式1：直接打开HTML
```bash
# 双击 index.html 用浏览器打开
# 即可开始游戏（简化版）
```

### 方式2：Node.js运行完整逻辑
```bash
# 进入目录
cd 财神大陆-第二阶段

# 测试游戏逻辑
node -e "
const GameController = require('./GameController');
const game = new GameController();
console.log(game.getStatus());
"
```

---

## 📊 游戏数值总览

**升级时长（总游戏周期9-12个月）**：

| 阶段 | 等级 | 每级时长 | 阶段总时长 |
|:---|:---:|:---:|:---:|
| 新手期 | 1-5级 | - | **4周** |
| 早期 | 6-30级 | 2-3天/级 | ~2个月 |
| 中期 | 31-50级 | 3-5天/级 | ~2-3个月 |
| 后期 | 51-80级 | 5-7天/级 | ~3-4个月 |
| 顶级 | 81-99级 | 7-10天/级 | ~2-3个月 |

**招财幡合成**：
- 日碎片上限：35片
- 合成比例：40片 = 1幡
- 1→5级需求：3+6+10+15 = 34幡
- 所需天数：约40天（含升级等待）

---

## 📝 开发日志

| 时间 | 完成内容 |
|:---:|:---|
| 14:51 | 【项1】等级系统核心：1-99级经验表+形态变化 |
| 15:00 | 【项2】十二财域系统：12域配置+解锁逻辑 |
| 15:20 | 【项3】第一阶段1-5级：庙宇升级+招财幡 |
| 15:30 | 【项4】玩家数据系统：属性+离线收益+登录奖励 |
| 15:50 | 【项5】游戏主控制器：供奉+化缘+升级+财域 |
| 16:00 | 【项6】HTML主界面：完整UI+功能按钮 |
| 16:05 | 【项7】项目文档README |

---

## 🎯 后续开发计划

**未完成内容**：
- [ ] 门派系统
- [ ] 战斗系统
- [ ] PVP竞技场
- [ ] 好友社交深度
- [ ] 后端服务器（账号/云存档）
- [ ] 支付系统（元宝充值）
- [ ] 音频资源
- [ ] 完整事件系统（160个新事件）

---

**开发者**：财神大陆开发团队  
**Git仓库**：财神大陆-第二阶段/.git

---

*祝财源广进！* 💰✨