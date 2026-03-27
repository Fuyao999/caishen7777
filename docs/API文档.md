# 财神大陆 - API接口文档

**基础URL**: `http://localhost:3001`  
**认证方式**: Bearer Token

---

## 认证相关

### POST /api/auth/login
**登录/注册**

**请求参数**:
```json
{
  "phone": "13800138000",
  "code": "1234"
}
```

**响应**:
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "phone": "13800138000",
    "nickname": "玩家8888"
  },
  "playerData": {
    "level": 1,
    "stage": "clay",
    "incense_money": 0,
    "yuanbao": 0,
    "merit": 0
  }
}
```

---

## 玩家数据

### GET /api/player/data
**获取玩家数据**

**请求头**:
```
Authorization: Bearer <token>
```

**响应**:
```json
{
  "success": true,
  "data": {
    "level": 1,
    "stage": "clay",
    "incense_money": 1000,
    "yuanbao": 100,
    "merit": 50,
    "incense_sticks": 10,
    "candles": 5,
    "gold_paper": 3,
    "fruits": 2,
    "mana": 100,
    "cultivation": 0
  }
}
```

### POST /api/player/update
**更新玩家数据**

**请求参数**:
```json
{
  "incense_money": 2000,
  "merit": 100
}
```

---

## 供奉系统

### GET /api/temple/info
**获取供奉信息**

**响应**:
```json
{
  "success": true,
  "gods": {
    "caishen": { "name": "赵公明", "title": "正财神", "effect": "香火钱+20%" },
    "wencaishen": { "name": "比干", "title": "文财神", "effect": "法力上限+10" }
  },
  "player": {
    "incense_money": 1000,
    "incense_sticks": 10,
    "candles": 5,
    "gold_paper": 3,
    "fruits": 2
  }
}
```

### POST /api/temple/worship
**供奉财神**

**请求参数**:
```json
{
  "godId": "caishen",
  "offeringType": "incense_sticks",
  "offeringLevel": 1
}
```

**响应**:
```json
{
  "success": true,
  "message": "供奉赵公明成功！",
  "reward": {
    "incense_money": 12,
    "merit": 1
  }
}
```

---

## 化缘系统

### GET /api/alms/info
**获取化缘信息**

**响应**:
```json
{
  "success": true,
  "regions": {
    "east": { "name": "东", "risk": 0.1, "baseReward": 100 },
    "south": { "name": "南", "risk": 0.2, "baseReward": 200 },
    "west": { "name": "西", "risk": 0.3, "baseReward": 300 },
    "north": { "name": "北", "risk": 0.4, "baseReward": 500 }
  }
}
```

### POST /api/alms/beg
**执行化缘**

**请求参数**:
```json
{
  "region": "east",
  "useShield": false
}
```

**响应**:
```json
{
  "success": true,
  "result": "success",
  "reward": 120,
  "message": "化缘成功，获得120香火钱！"
}
```

---

## 任务系统

### GET /api/quests/list
**获取任务列表**

### POST /api/quests/progress
**更新任务进度**

### POST /api/quests/claim
**领取任务奖励**

---

## 邮件系统

### GET /api/mails/list
**获取邮件列表**

### POST /api/mails/read
**阅读邮件**

### POST /api/mails/claim
**领取附件**

### DELETE /api/mails/:id
**删除邮件**

---

## 好友系统

### GET /api/friends/list
**获取好友列表**

### POST /api/friends/add
**添加好友**

### POST /api/friends/accept
**接受好友请求**

### POST /api/friends/remove
**删除好友**

---

## 门派系统

### GET /api/guilds/list
**获取门派列表**

### POST /api/guilds/create
**创建门派**

### POST /api/guilds/join
**加入门派**

### POST /api/guilds/leave
**退出门派**

### GET /api/guilds/:id
**获取门派详情**

---

## 排行榜

### GET /api/rankings/:type
**获取排行榜**

**type可选**: level, power, wealth, merit

### GET /api/rankings/my/:type
**获取我的排名**

---

## 管理后台

### GET /api/admin/stats
**获取统计数据**

### GET /api/admin/users
**获取用户列表**

### POST /api/admin/users/:id/ban
**封禁/解封用户**

---

## 机器人管理

### GET /api/robots/list
**获取机器人列表**

### POST /api/robots/batch-create
**批量创建机器人**

### DELETE /api/robots/:id
**删除机器人**

---

## 错误码

| 错误码 | 说明 |
|:---|:---|
| 400 | 请求参数错误 |
| 401 | 未登录或token无效 |
| 403 | 权限不足 |
| 404 | 资源不存在 |
| 500 | 服务器错误 |

---

**测试账号**: 任意手机号 + 验证码1234  
**管理后台**: http://localhost:3001/admin
