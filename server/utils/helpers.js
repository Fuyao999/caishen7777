// ============================================
// 财神大陆 - 工具函数
// ============================================

// 统一成功响应
function success(res, data = null, message = '成功') {
  return res.json({ code: 200, message, data });
}

// 统一失败响应
function fail(res, message = '操作失败', code = 400) {
  return res.status(code >= 500 ? 500 : 400).json({ code, message });
}

// 随机整数 [min, max]
function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 按权重随机选择
function weightedRandom(items) {
  const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);
  let rand = Math.random() * totalWeight;
  for (const item of items) {
    rand -= item.weight;
    if (rand <= 0) return item;
  }
  return items[items.length - 1];
}

// 境界计算
const REALMS = [
  { level: 1,  name: '凡人',   minLevel: 1 },
  { level: 2,  name: '筑基',   minLevel: 10 },
  { level: 3,  name: '金丹',   minLevel: 25 },
  { level: 4,  name: '元婴',   minLevel: 45 },
  { level: 5,  name: '化神',   minLevel: 70 },
  { level: 6,  name: '大乘',   minLevel: 90 },
];

function getRealm(level) {
  for (let i = REALMS.length - 1; i >= 0; i--) {
    if (level >= REALMS[i].minLevel) return REALMS[i];
  }
  return REALMS[0];
}

// 升级经验公式
function expForLevel(level) {
  return Math.floor(100 * Math.pow(level, 1.5));
}

// 化缘结果概率 (前6区)
const ALMS_PROBS = {
  safe:  { JP: 0.10, BW: 0.25, NM: 0.35, SW: 0.20, MS: 0.10 },
  risky: { JP: 0.20, BW: 0.15, NM: 0.20, SW: 0.20, MS: 0.25 },
};

// 化缘倍率
const ALMS_MULT = {
  safe:  { JP: 3.0, BW: 1.5, NM: 1.0, SW: 0.5, MS: 0.0 },
  risky: { JP: 5.0, BW: 2.0, NM: 1.0, SW: 0.3, MS: 0.0 },
};

// 8区门槛
const AREA_THRESHOLDS = {
  tianlu:   100,
  zhenyue:  500,
  longyin:  1000,
  fuyao:    5000,
  nanming:  10000,
  dibao:    50000,
  ganze:    77777,
  liquan:   99999,
};

// 后2区红黑概率
const RED_BLACK_PROB = { W2: 0.45, L2: 0.55 };

module.exports = {
  success, fail, randInt, weightedRandom,
  getRealm, expForLevel, REALMS,
  ALMS_PROBS, ALMS_MULT, AREA_THRESHOLDS, RED_BLACK_PROB,
};
