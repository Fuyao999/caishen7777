const express = require('express');
const router = express.Router();
const { pool } = require('../config/database');
const { authMiddleware } = require('../middleware/auth');
const { success, fail } = require('../utils/helpers');

// GET /api/mentor - 列表
router.get('/', authMiddleware, async (req, res, next) => {
  try {
    // TODO: 实现mentor列表查询
    return success(res, [], 'mentor模块就绪');
  } catch(err) { next(err); }
});

// POST /api/mentor - 创建/操作
router.post('/', authMiddleware, async (req, res, next) => {
  try {
    // TODO: 实现mentor操作
    return success(res, null, 'mentor操作成功');
  } catch(err) { next(err); }
});

module.exports = router;
