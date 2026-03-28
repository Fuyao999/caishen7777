const express = require('express');
const router = express.Router();
const { pool } = require('../config/database');
const { authMiddleware } = require('../middleware/auth');
const { success, fail } = require('../utils/helpers');

// GET /api/sects - 列表
router.get('/', authMiddleware, async (req, res, next) => {
  try {
    // TODO: 实现sects列表查询
    return success(res, [], 'sects模块就绪');
  } catch(err) { next(err); }
});

// POST /api/sects - 创建/操作
router.post('/', authMiddleware, async (req, res, next) => {
  try {
    // TODO: 实现sects操作
    return success(res, null, 'sects操作成功');
  } catch(err) { next(err); }
});

module.exports = router;
