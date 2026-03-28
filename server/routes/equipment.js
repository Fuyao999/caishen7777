const express = require('express');
const router = express.Router();
const { pool } = require('../config/database');
const { authMiddleware } = require('../middleware/auth');
const { success, fail } = require('../utils/helpers');

// GET /api/equipment - 列表
router.get('/', authMiddleware, async (req, res, next) => {
  try {
    // TODO: 实现equipment列表查询
    return success(res, [], 'equipment模块就绪');
  } catch(err) { next(err); }
});

// POST /api/equipment - 创建/操作
router.post('/', authMiddleware, async (req, res, next) => {
  try {
    // TODO: 实现equipment操作
    return success(res, null, 'equipment操作成功');
  } catch(err) { next(err); }
});

module.exports = router;
