const express = require('express');
const router = express.Router();
const { pool } = require('../config/database');
const { authMiddleware } = require('../middleware/auth');
const { success, fail } = require('../utils/helpers');

// GET /api/mounts - 列表
router.get('/', authMiddleware, async (req, res, next) => {
  try {
    // TODO: 实现mounts列表查询
    return success(res, [], 'mounts模块就绪');
  } catch(err) { next(err); }
});

// POST /api/mounts - 创建/操作
router.post('/', authMiddleware, async (req, res, next) => {
  try {
    // TODO: 实现mounts操作
    return success(res, null, 'mounts操作成功');
  } catch(err) { next(err); }
});

module.exports = router;
