-- 创建数据库
CREATE DATABASE IF NOT EXISTS caishen_game CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE caishen_game;

-- 用户表
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    phone VARCHAR(20) UNIQUE,
    nickname VARCHAR(50) DEFAULT '玩家',
    avatar VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    last_login TIMESTAMP
);

-- 玩家数据表
CREATE TABLE IF NOT EXISTS player_data (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT UNIQUE,
    level INT DEFAULT 1,
    stage ENUM('clay', 'wood', 'bronze', 'gold') DEFAULT 'clay',
    experience INT DEFAULT 0,
    
    -- 货币
    incense_money INT DEFAULT 0,
    yuanbao INT DEFAULT 0,
    merit INT DEFAULT 0,
    incense_sticks INT DEFAULT 0,
    candles INT DEFAULT 0,
    gold_paper INT DEFAULT 0,
    fruits INT DEFAULT 0,
    mana INT DEFAULT 100,
    cultivation INT DEFAULT 0,
    
    -- 统计
    worship_count INT DEFAULT 0,
    alms_count INT DEFAULT 0,
    total_merit INT DEFAULT 0,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- 登录记录
CREATE TABLE IF NOT EXISTS login_records (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    login_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ip VARCHAR(50),
    device VARCHAR(100),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- 供奉记录
CREATE TABLE IF NOT EXISTS worship_records (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    god_id VARCHAR(50),
    offering_type VARCHAR(50),
    offering_level INT,
    reward_incense_money INT,
    reward_merit INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- 化缘记录
CREATE TABLE IF NOT EXISTS alms_records (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    region VARCHAR(20),
    result ENUM('success', 'fail') DEFAULT 'success',
    reward_incense_money INT,
    risk_type VARCHAR(50),
    used_shield BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- 背包物品
CREATE TABLE IF NOT EXISTS inventory (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    item_id VARCHAR(50),
    item_type ENUM('equipment', 'material', 'consumable', 'treasure'),
    quantity INT DEFAULT 1,
    is_equipped BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
