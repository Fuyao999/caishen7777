const mysql = require('mysql2/promise');
const { query, initDatabase } = require('./database');

async function setupDatabase() {
    console.log('🔄 初始化数据库...');
    
    try {
        // 初始化数据库
        await initDatabase();
        
        // 创建表
        const fs = require('fs');
        const path = require('path');
        const schemaSQL = fs.readFileSync(path.join(__dirname, '../database/schema.sql'), 'utf8');
        
        // 分割SQL语句并执行
        const statements = schemaSQL.split(';').filter(s => s.trim());
        
        for (const statement of statements) {
            if (statement.trim()) {
                try {
                    await query(statement);
                } catch (err) {
                    // 忽略已存在的错误
                    if (!err.message.includes('ER_TABLE_EXISTS_ERROR')) {
                        console.log('SQL执行:', statement.slice(0, 50) + '...');
                    }
                }
            }
        }
        
        console.log('✅ 数据库初始化完成');
        return true;
    } catch (error) {
        console.error('❌ 数据库初始化失败:', error.message);
        return false;
    }
}

module.exports = { setupDatabase };
