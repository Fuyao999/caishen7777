const express = require('express');
const router = express.Router();
const { pool } = require('../config/database');
const { authMiddleware } = require('../middleware/auth');
const { success, fail } = require('../utils/helpers');

// GET /api/alms - 列表
router.get('/', authMiddleware, async (req, res, next) => {
  try {
    // TODO: 实现alms列表查询
    return success(res, [], 'alms模块就绪');
  } catch(err) { next(err); }
});

// POST /api/alms - 创建/操作
router.post('/', authMiddleware, async (req, res, next) => {
  try {
    // TODO: 实现alms操作
    return success(res, null, 'alms操作成功');
  } catch(err) { next(err); }
});

module.exports = router;
