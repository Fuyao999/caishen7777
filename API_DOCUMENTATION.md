# 财神大陆 - 第二阶段 API 文档

**版本：** v2.0  
**更新日期：** 2026-03-27  
**GitHub：** https://github.com/Fuyao999/caishen7777

---

## 📑 目录

1. [认证接口](#1-认证接口)
2. [玩家数据接口](#2-玩家数据接口)
3. [等级系统接口](#3-等级系统接口)
4. [财域系统接口](#4-财域系统接口)
5. [战斗系统接口](#5-战斗系统接口)
6. [装备系统接口](#6-装备系统接口)
7. [门派系统接口](#7-门派系统接口)
8. [师徒系统接口](#8-师徒系统接口)
9. [交易市场接口](#9-交易市场接口)
10. [PVP系统接口](#10-pvp系统接口)
11. [许愿树接口](#11-许愿树接口)
12. [背包系统接口](#12-背包系统接口)
13. [厢房系统接口](#13-厢房系统接口)
14. [宠物系统接口](#14-宠物系统接口)
15. [坐骑系统接口](#15-坐骑系统接口)
16. [精怪契约接口](#16-精怪契约接口)
17. [技能系统接口](#17-技能系统接口)
18. [死亡重生接口](#18-死亡重生接口)
19. [活动系统接口](#19-活动系统接口)
20. [充值系统接口](#20-充值系统接口)
21. [机器人系统接口](#21-机器人系统接口)
22. [管理后台接口](#22-管理后台接口)

---

## 基础信息

### Base URL
```
开发环境：http://localhost:3000/api
生产环境：https://api.caishen.com/api
```

### 响应格式
```json
{
  "success": true/false,
  "message": "提示信息",
  "data": {},
  "pagination": {}  // 分页时返回
}
```

### 认证方式
HTTP Header 中携带 Token：
```
Authorization: Bearer <token>
```

---

## 1. 认证接口

### POST /auth/register
用户注册

**请求参数：**
```json
{
  "phone": "13800138000",
  "password": "123456",
  "nickname": "财神小玩家",
  "birthHour": "子时"
}
```

**响应：**
```json
{
  "success": true,
  "message": "注册成功",
  "data": {
    "userId": 10001,
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "expires": 7200
  }
}
```

### POST /auth/login
用户登录

**请求参数：**
```json
{
  "phone": "13800138000",
  "password": "123456"
}
```

### POST /auth/logout
退出登录

### POST /auth/refresh
刷新Token

---

## 2. 玩家数据接口

### GET /player/profile
获取玩家资料

**响应：**
```json
{
  "success": true,
  "data": {
    "id": 10001,
    "nickname": "财神小玩家",
    "level": 45,
    "exp": 25000,
    "realm": "结丹期",
    "form": "金身",
    "birthHour": "子时",
    "money": 520000,
    "yuanbao": 5200,
    "merit": 25000,
    "honor": 1000,
    "vipLevel": 3,
    "sect": "子渊门"
  }
}
```

### GET /player/status
获取玩家完整状态

**响应：**
```json
{
  "success": true,
  "data": {
    "base": { /* 基础信息 */ },
    "resources": { /* 资源 */ },
    "combat": { /* 战斗属性 */ },
    "progress": { /* 进度 */ },
    "social": { /* 社交 */ }
  }
}
```

### POST /player/save
保存玩家数据

### GET /player/load
加载玩家数据

---

## 3. 等级系统接口

### GET /level/exp-table
获取升级经验表

**响应：**
```json
{
  "success": true,
  "data": {
    "table": [
      {"level": 6, "expRequired": 500},
      {"level": 7, "expRequired": 575}
    ],
    "current": {
      "level": 45,
      "exp": 25000,
      "expToNext": 5000,
      "progress": 83.3
    }
  }
}
```

### POST /level/add-exp
添加经验

**请求参数：**
```json
{
  "amount": 500
}
```

**响应：**
```json
{
  "success": true,
  "data": {
    "leveledUp": true,
    "newLevel": 46,
    "messages": ["恭喜升级到46级！"]
  }
}
```

### GET /level/progress
获取当前进度

---

## 4. 财域系统接口

### GET /domain/all
获取所有财域

**响应：**
```json
{
  "success": true,
  "data": [
    {
      "id": "zi",
      "name": "子时·墨玉矿渊",
      "levelRequired": 6,
      "unlocked": true,
      "scenes": ["入口", "矿道", "深处", "核心"],
      "boss": "沉金守卫"
    }
  ]
}
```

### GET /domain/:id
获取财域详情

### GET /domain/available
获取可进入的财域

### POST /domain/:id/enter
进入财域

### POST /domain/:id/explore
探索财域

**响应：**
```json
{
  "success": true,
  "data": {
    "encounter": "怪物",
    "battleResult": {
      "won": true,
      "reward": {"exp": 100, "money": 50}
    }
  }
}
```

### POST /domain/:id/boss
挑战BOSS

---

## 5. 战斗系统接口

### POST /combat/calculate
计算伤害

**请求参数：**
```json
{
  "attacker": { /* 攻击者属性 */ },
  "defender": { /* 防御者属性 */ },
  "skillId": "caishen_palm"
}
```

**响应：**
```json
{
  "success": true,
  "data": {
    "damage": 250,
    "isCrit": true,
    "finalHp": 750
  }
}
```

### POST /combat/simulate
模拟战斗

### GET /combat/attributes
获取战斗属性

---

## 6. 装备系统接口

### GET /equipment/list
获取装备列表

### POST /equipment/forge
打造装备

**请求参数：**
```json
{
  "type": "weapon",
  "slot": "weapon",
  "quality": "rare",
  "level": 45
}
```

### POST /equipment/:id/enhance
强化装备

**请求参数：**
```json
{
  "useProtection": true
}
```

### POST /equipment/:id/refine
精炼装备

### POST /equipment/:id/enchant
附魔装备

### POST /equipment/:id/equip
穿戴装备

### POST /equipment/:id/unequip
卸下装备

---

## 7. 门派系统接口

### GET /sect/all
获取所有门派

### GET /sect/:id
获取门派详情

### POST /sect/:id/join
加入门派

### POST /sect/leave
离开门派

### GET /sect/:id/members
获取门派成员

### POST /sect/contribute
门派贡献

### GET /sect/tasks
获取门派任务

### POST /sect/tasks/:taskId/complete
完成任务

---

## 8. 师徒系统接口

### GET /mentor/find
寻找师傅

### GET /mentor/student/find
寻找徒弟

### POST /mentor/establish
建立师徒关系

**请求参数：**
```json
{
  "mentorId": 10001,
  "studentId": 10002,
  "cost": 500
}
```

### POST /mentor/gift
每日赠送

### GET /mentor/graduation
检查出师条件

### POST /mentor/graduate
出师

### POST /mentor/dissolve
解除关系

### GET /mentor/ranking
师德排行

---

## 9. 交易市场接口

### 摆摊

#### POST /market/stall/create
创建摊位

#### GET /market/stall/:playerId
获取摊位信息

#### POST /market/stall/list
上架商品

#### DELETE /market/stall/:itemId
下架商品

#### POST /market/stall/:playerId/buy
购买商品

### 拍卖行

#### GET /market/auction/list
获取拍卖列表

#### POST /market/auction/create
创建拍卖

#### POST /market/auction/:id/bid
出价

#### POST /market/auction/:id/buyout
一口价购买

#### GET /market/auction/:id
获取拍卖详情

### 股票

#### GET /market/stock/list
获取股票列表

#### POST /market/stock/:id/buy
购买股票

#### POST /market/stock/:id/sell
卖出股票

#### GET /market/stock/holdings
获取持仓

---

## 10. PVP系统接口

### GET /pvp/modes
获取PVP模式

### GET /pvp/ranking
获取排行榜

### GET /pvp/rank
获取我的排名

### POST /pvp/challenge
发起挑战

**请求参数：**
```json
{
  "modeId": "duel",
  "opponentId": 10002
}
```

### GET /pvp/match/:id
获取对战结果

### 世界BOSS

#### GET /pvp/boss
获取BOSS状态

#### POST /pvp/boss/attack
攻击BOSS

#### GET /pvp/boss/ranking
获取伤害排行

---

## 11. 许愿树接口

### GET /wish-tree/types
获取许愿类型

### POST /wish-tree/draw
许愿抽奖

**请求参数：**
```json
{
  "drawType": "advanced"
}
```

**响应：**
```json
{
  "success": true,
  "data": {
    "reward": {"item": "传说装备箱", "amount": 1},
    "remaining": 4
  }
}
```

### POST /wish-tree/draw/ten
十连抽

### GET /wish-tree/cumulative
获取累计奖励

### POST /wish-tree/cumulative/claim
领取累计奖励

---

## 12. 背包系统接口

### GET /inventory
获取背包

### POST /inventory/add
添加物品

**请求参数：**
```json
{
  "itemId": "hp_potion_small",
  "count": 5
}
```

### POST /inventory/remove
移除物品

### POST /inventory/use
使用物品

### POST /inventory/expand
扩展背包

### POST /inventory/sort
整理背包

---

## 13. 厢房系统接口

### GET /side-room
获取厢房信息

### POST /side-room/deposit
存入香火钱

**请求参数：**
```json
{
  "amount": 5000
}
```

### POST /side-room/withdraw
取出香火钱

### POST /side-room/deposit-all
一键存入

### POST /side-room/withdraw-all
一键取出

### POST /side-room/upgrade
升级厢房

### GET /side-room/history
获取交易记录

---

## 14. 宠物系统接口

### GET /pet/list
获取宠物列表

### POST /pet/capture
捕捉宠物

**请求参数：**
```json
{
  "petId": "grass_sheep"
}
```

### POST /pet/:id/activate
设置出战

### POST /pet/:id/feed
喂食

**请求参数：**
```json
{
  "foodType": "premium"
}
```

### GET /pet/bonuses
获取出战加成

---

## 15. 坐骑系统接口

### GET /mount/list
获取坐骑列表

### POST /mount/obtain
获得坐骑

### POST /mount/:id/activate
激活坐骑

### POST /mount/:id/upgrade
升级坐骑

### POST /mount/:id/skill
使用坐骑技能

### GET /mount/speed
获取速度加成

---

## 16. 精怪契约接口

### GET /spirit/available
获取可契约精怪

### POST /spirit/contract
契约精怪

### POST /spirit/:id/activate
设置助战

### POST /spirit/:id/train
培养精怪

### POST /spirit/:id/break
解除契约

### GET /spirit/effects
获取助战效果

---

## 17. 技能系统接口

### GET /skill/available
获取可学技能

### GET /skill/learned
获取已学技能

### POST /skill/learn
学习技能

### POST /skill/:id/use
使用技能

### GET /skill/passive-effects
获取被动技能效果

---

## 18. 死亡重生接口

### POST /death/handle
处理死亡

### POST /death/rebirth
复活

**请求参数：**
```json
{
  "rebirthType": "temple"  // temple/local/item
}
```

### GET /death/status
获取死亡状态

### GET /death/options
获取复活选项

---

## 19. 活动系统接口

### GET /event/current
获取当前活动

### GET /event/:id
获取活动详情

### POST /event/:id/participate
参与活动

### POST /event/:id/reward
领取奖励

---

## 20. 充值系统接口

### GET /recharge/tiers
获取充值档位

### GET /recharge/payment-methods
获取支付方式

### POST /recharge/create-order
创建订单

**请求参数：**
```json
{
  "tierId": "tier_648",
  "paymentMethod": "wechat"
}
```

### GET /recharge/order/:orderId
查询订单

### POST /recharge/callback/:paymentMethod
支付回调（支付平台调用）

### VIP系统

#### GET /recharge/vip/config
获取VIP配置

#### GET /recharge/vip/:userId
获取VIP信息

#### POST /recharge/vip/claim-daily
领取VIP每日礼包

---

## 21. 机器人系统接口

### GET /robot/stats
获取机器人统计

### GET /robot/list
获取机器人列表

### POST /robot/batch-create
批量创建

**请求参数：**
```json
{
  "count": 10,
  "behavior": "active",
  "minLevel": 1,
  "maxLevel": 50
}
```

### POST /robot/:id/online
上线/下线

### POST /robot/:id/config
更新配置

### DELETE /robot/:id
删除机器人

### POST /robot/batch-delete
批量删除

### POST /robot/ai-tick
运行AI调度

---

## 22. 管理后台接口

### 数据统计

#### GET /admin/stats
获取统计概览

#### GET /admin/dashboard
获取仪表板数据

### 用户管理

#### GET /admin/users
用户列表

#### GET /admin/users/:id
用户详情

#### POST /admin/users/:id/ban
封禁用户

#### POST /admin/users/:id/modify
修改用户数据

### 充值管理

#### GET /admin/recharge/stats
充值统计

#### GET /admin/recharge/orders
订单列表

#### POST /admin/recharge/order/:id/complete
手动补单

#### POST /admin/recharge/order/:id/refund
退款

### 系统管理

#### GET /admin/settings
获取设置

#### POST /admin/settings
修改设置

#### GET /admin/logs
查看日志

---

## 错误码对照表

| 错误码 | 说明 |
|:---:|:---|
| 200 | 成功 |
| 400 | 请求参数错误 |
| 401 | 未授权 |
| 403 | 权限不足 |
| 404 | 资源不存在 |
| 500 | 服务器错误 |
| 1001 | 等级不足 |
| 1002 | 货币不足 |
| 1003 | 道具不足 |
| 1004 | 冷却中 |
| 1005 | 已达到上限 |

---

## 附录

### 境界对照表

| 等级 | 境界 |
|:---:|:---|
| 1-5 | 炼气期 |
| 6-15 | 筑基期 |
| 16-35 | 结丹期 |
| 36-55 | 元婴期 |
| 56-75 | 化神期 |
| 76-90 | 合体期 |
| 91-99 | 大乘期 |

### 时辰对照表

| 时辰 | 时间 | 加成财域 |
|:---:|:---:|:---|
| 子时 | 23:00-01:00 | 墨玉矿渊 |
| 丑时 | 01:00-03:00 | 玄牝牧场 |
| 寅时 | 03:00-05:00 | 破晓林海 |
| 卯时 | 05:00-07:00 | 金曦原野 |
| 辰时 | 07:00-09:00 | 云海天市 |
| 巳时 | 09:00-11:00 | 赤焰熔炉 |
| 午时 | 11:00-13:00 | 金乌圣山 |
| 未时 | 13:00-15:00 | 风语沙碛 |
| 申时 | 15:00-17:00 | 雷鸣裂谷 |
| 酉时 | 17:00-19:00 | 落霞宝湾 |
| 戌时 | 19:00-21:00 | 百战擂台 |
| 亥时 | 21:00-23:00 | 幽泉秘府 |

---

**文档版本：** v2.0  
**最后更新：** 2026-03-27  
**作者：** 财神大陆开发团队