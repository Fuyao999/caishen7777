#!/bin/bash

# 财神大陆 - 一键启动脚本

echo "🎮 启动财神大陆..."

# 启动MySQL（如果没启动）
echo "检查MySQL..."
brew services start mysql 2>/dev/null || echo "MySQL已启动或请手动启动"

# 启动后端服务器
echo "启动后端服务器..."
cd /Users/fuyao/Desktop/财神大陆-Cocos/server
npm install 2>/dev/null
node index.js &
SERVER_PID=$!
echo "后端PID: $SERVER_PID"

# 等待服务器启动
sleep 3

# 检查服务器是否启动
if curl -s http://localhost:3001/health > /dev/null; then
    echo "✅ 后端启动成功！"
else
    echo "⚠️ 后端可能未启动，请检查"
fi

echo ""
echo "📱 启动步骤："
echo "1. 打开 Cocos Creator 3.8.0"
echo "2. 打开项目：/Users/fuyao/Desktop/财神大陆-Cocos/client"
echo "3. 点击'预览'按钮"
echo ""
echo "🔑 测试账号：任意手机号 + 验证码1234"
echo ""
echo "按回车键停止后端服务器..."
read

# 停止服务器
kill $SERVER_PID 2>/dev/null
echo "已停止"
