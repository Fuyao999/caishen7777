-- 财神大陆 - 第二阶段数据库设计
-- 支持21个系统 + 充值系统
-- MySQL 8.0+

-- 创建数据库
CREATE DATABASE IF NOT EXISTS caishen_game CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE caishen_game;

-- ============================================
-- 1. 用户基础表
-- ============================================

CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    phone VARCHAR(20) UNIQUE NOT NULL COMMENT '手机号登录',
    password VARCHAR(255) NOT NULL COMMENT '加密密码',
    nickname VARCHAR(50) DEFAULT '' COMMENT '昵称',
    avatar VARCHAR(255) DEFAULT '' COMMENT '头像URL',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL,
    banned BOOLEAN DEFAULT FALSE COMMENT '是否封禁',
    ban_reason TEXT COMMENT '封禁原因',
    status ENUM('active', 'inactive', 'banned') DEFAULT 'active',
    INDEX idx_phone (phone),
    INDEX idx_status (status)
) ENGINE=InnoDB COMMENT='用户基础信息表';

-- ============================================
-- 2. 玩家数据表（核心）
-- ============================================

CREATE TABLE player_data (
    user_id BIGINT PRIMARY KEY,
    level INT DEFAULT 6 COMMENT '等级',
    exp BIGINT DEFAULT 0 COMMENT '经验值',
    realm VARCHAR(50) DEFAULT '炼气期' COMMENT '境界',
    form VARCHAR(50) DEFAULT '金身' COMMENT '形态',
    
    -- 货币
    money BIGINT DEFAULT 5000 COMMENT '香火钱',
    yuanbao INT DEFAULT 0 COMMENT '元宝',
    merit INT DEFAULT 10800 COMMENT '功德',
    fragments INT DEFAULT 0 COMMENT '碎片',
    banners INT DEFAULT 0 COMMENT '招财幡',
    honor INT DEFAULT 0 COMMENT '荣誉点',
    
    -- 设置
    birth_hour VARCHAR(20) DEFAULT '子时' COMMENT '出生时辰',
    settings JSON COMMENT '玩家设置',
    
    -- 统计
    total_login_days INT DEFAULT 0,
    total_play_time INT DEFAULT 0 COMMENT '总游戏时长（分钟）',
    last_active TIMESTAMP NULL,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_level (level),
    INDEX idx_realm (realm)
) ENGINE=InnoDB COMMENT='玩家核心数据表';

-- ============================================
-- 3. 背包系统
-- ============================================

CREATE TABLE items (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    item_id VARCHAR(50) NOT NULL COMMENT '道具ID',
    name VARCHAR(100) NOT NULL COMMENT '道具名称',
    type ENUM('consumable', 'material', 'equipment', 'quest', 'special') NOT NULL,
    subtype VARCHAR(50) COMMENT '子类型',
    quality ENUM('common', 'rare', 'epic', 'legendary', 'artifact') DEFAULT 'common',
    stack_limit INT DEFAULT 99 COMMENT '堆叠上限',
    price INT DEFAULT 0 COMMENT '价格',
    description TEXT,
    effect JSON COMMENT '效果配置',
    UNIQUE KEY uk_item_id (item_id)
) ENGINE=InnoDB COMMENT='道具配置表';

CREATE TABLE inventory (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    item_id VARCHAR(50) NOT NULL,
    count INT DEFAULT 1,
    slot INT DEFAULT 0 COMMENT '格子位置',
    acquired_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (item_id) REFERENCES items(item_id),
    INDEX idx_user (user_id),
    INDEX idx_item (item_id)
) ENGINE=InnoDB COMMENT='玩家背包表';

-- ============================================
-- 4. 装备系统
-- ============================================

CREATE TABLE equipment (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    name VARCHAR(100) NOT NULL,
    type ENUM('weapon', 'armor', 'helmet', 'boots', 'gloves', 'accessory') NOT NULL,
    slot VARCHAR(50) NOT NULL,
    quality ENUM('common', 'rare', 'epic', 'legendary', 'artifact') NOT NULL,
    level INT DEFAULT 1,
    attack INT DEFAULT 0,
    defense INT DEFAULT 0,
    hp INT DEFAULT 0,
    mp INT DEFAULT 0,
    crit_rate DECIMAL(4,2) DEFAULT 0,
    crit_damage DECIMAL(4,2) DEFAULT 0,
    enhance_level INT DEFAULT 0 COMMENT '强化等级',
    enchant JSON COMMENT '附魔属性',
    equipped BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user (user_id),
    INDEX idx_equipped (user_id, equipped)
) ENGINE=InnoDB COMMENT='装备表';

-- ============================================
-- 5. 厢房系统
-- ============================================

CREATE TABLE side_room (
    user_id BIGINT PRIMARY KEY,
    level INT DEFAULT 1 COMMENT '厢房等级',
    stored_money BIGINT DEFAULT 0 COMMENT '存储的香火钱',
    total_deposited BIGINT DEFAULT 0 COMMENT '累计存入',
    total_withdrawn BIGINT DEFAULT 0 COMMENT '累计取出',
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB COMMENT='厢房系统表';

-- ============================================
-- 6. 技能系统
-- ============================================

CREATE TABLE skills (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    type ENUM('active', 'passive', 'boss') NOT NULL,
    category ENUM('caiyuan', 'nafu', 'special') NOT NULL,
    level_required INT DEFAULT 1,
    mp_cost INT DEFAULT 0,
    description TEXT,
    effect JSON COMMENT '技能效果',
    cd INT DEFAULT 0 COMMENT '冷却时间（秒）'
) ENGINE=InnoDB COMMENT='技能配置表';

CREATE TABLE player_skills (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    skill_id VARCHAR(50) NOT NULL,
    learned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    use_count INT DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (skill_id) REFERENCES skills(id),
    UNIQUE KEY uk_user_skill (user_id, skill_id)
) ENGINE=InnoDB COMMENT='玩家已学技能表';

-- ============================================
-- 7. 门派系统
-- ============================================

CREATE TABLE sects (
    id VARCHAR(20) PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description TEXT,
    type ENUM('combat', 'economic', 'balanced') NOT NULL,
    base_bonus JSON COMMENT '基础加成',
    formation_bonus JSON COMMENT '阵法加成'
) ENGINE=InnoDB COMMENT='门派配置表';

INSERT INTO sects VALUES 
('zi', '子渊门', '子时·墨玉矿渊守门人', 'economic', '{"money_bonus": 0.1}', '{"exp_bonus": 0.2}'),
('chou', '玄牝宗', '丑时·玄牝牧场守护者', 'balanced', '{"hp_bonus": 0.1}', '{"defense_bonus": 0.15}'),
('yin', '青木堂', '寅时·破晓林海探险者', 'combat', '{"attack_bonus": 0.1}', '{"crit_bonus": 0.1}');

CREATE TABLE player_sect (
    user_id BIGINT PRIMARY KEY,
    sect_id VARCHAR(20) NOT NULL,
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    contribution INT DEFAULT 0 COMMENT '门派贡献',
    position ENUM('member', 'elder', 'leader') DEFAULT 'member',
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (sect_id) REFERENCES sects(id)
) ENGINE=InnoDB COMMENT='玩家门派关系表';

-- ============================================
-- 8. 师徒系统
-- ============================================

CREATE TABLE mentor_relationships (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    student_id BIGINT NOT NULL,
    mentor_id BIGINT NOT NULL,
    established_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    graduated BOOLEAN DEFAULT FALSE,
    graduated_at TIMESTAMP NULL,
    total_exp_given INT DEFAULT 0 COMMENT '师傅累计赠送经验',
    tasks_completed INT DEFAULT 0,
    FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (mentor_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY uk_relationship (student_id, mentor_id),
    INDEX idx_mentor (mentor_id)
) ENGINE=InnoDB COMMENT='师徒关系表';

-- ============================================
-- 9. 宠物/灵兽系统
-- ============================================

CREATE TABLE pets (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    pet_template_id VARCHAR(50) NOT NULL,
    name VARCHAR(100),
    level INT DEFAULT 1,
    exp INT DEFAULT 0,
    loyalty INT DEFAULT 50,
    is_active BOOLEAN DEFAULT FALSE,
    captured_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user (user_id)
) ENGINE=InnoDB COMMENT='宠物表';

-- ============================================
-- 10. 坐骑系统
-- ============================================

CREATE TABLE mounts (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    mount_template_id VARCHAR(50) NOT NULL,
    name VARCHAR(100),
    level INT DEFAULT 1,
    exp INT DEFAULT 0,
    is_active BOOLEAN DEFAULT FALSE,
    obtained_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total_distance INT DEFAULT 0 COMMENT '累计骑行距离',
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user (user_id)
) ENGINE=InnoDB COMMENT='坐骑表';

-- ============================================
-- 11. 精怪契约系统
-- ============================================

CREATE TABLE spirit_contracts (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    spirit_template_id VARCHAR(50) NOT NULL,
    level INT DEFAULT 1,
    exp INT DEFAULT 0,
    loyalty INT DEFAULT 50,
    is_active BOOLEAN DEFAULT FALSE,
    contracted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user (user_id)
) ENGINE=InnoDB COMMENT='精怪契约表';

-- ============================================
-- 12. PVP系统
-- ============================================

CREATE TABLE pvp_matches (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    match_type ENUM('duel', 'team', 'royale', 'ranked') NOT NULL,
    player1_id BIGINT NOT NULL,
    player2_id BIGINT,
    winner_id BIGINT,
    start_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    end_time TIMESTAMP NULL,
    duration INT COMMENT '战斗时长（秒）',
    FOREIGN KEY (player1_id) REFERENCES users(id),
    FOREIGN KEY (player2_id) REFERENCES users(id),
    FOREIGN KEY (winner_id) REFERENCES users(id)
) ENGINE=InnoDB COMMENT='PVP对战记录表';

CREATE TABLE player_rank (
    user_id BIGINT PRIMARY KEY,
    tier VARCHAR(50) DEFAULT '青铜',
    sub_tier INT DEFAULT 1,
    points INT DEFAULT 0,
    total_games INT DEFAULT 0,
    wins INT DEFAULT 0,
    win_streak INT DEFAULT 0,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB COMMENT='玩家排位表';

-- ============================================
-- 13. 交易/市场系统
-- ============================================

CREATE TABLE stalls (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    reputation INT DEFAULT 0,
    total_sales INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB COMMENT='摊位表';

CREATE TABLE stall_items (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    stall_id BIGINT NOT NULL,
    item_id VARCHAR(50) NOT NULL,
    price INT NOT NULL,
    quantity INT DEFAULT 1,
    listed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (stall_id) REFERENCES stalls(id) ON DELETE CASCADE
) ENGINE=InnoDB COMMENT='摊位商品表';

-- ============================================
-- 14. 充值系统
-- ============================================

CREATE TABLE recharge_orders (
    id VARCHAR(50) PRIMARY KEY,
    user_id BIGINT NOT NULL,
    tier_id VARCHAR(50) NOT NULL,
    amount DECIMAL(10,2) NOT NULL COMMENT '充值金额（人民币）',
    yuanbao INT NOT NULL COMMENT '获得元宝',
    bonus INT DEFAULT 0 COMMENT '赠送元宝',
    payment_method VARCHAR(50) NOT NULL,
    status ENUM('pending', 'paid', 'cancelled', 'refunded') DEFAULT 'pending',
    transaction_id VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    pay_time TIMESTAMP NULL,
    refund_time TIMESTAMP NULL,
    refund_reason TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user (user_id),
    INDEX idx_status (status),
    INDEX idx_created (created_at)
) ENGINE=InnoDB COMMENT='充值订单表';

CREATE TABLE player_vip (
    user_id BIGINT PRIMARY KEY,
    level INT DEFAULT 0,
    total_recharge DECIMAL(10,2) DEFAULT 0,
    daily_claimed_at DATE NULL COMMENT '每日礼包领取时间',
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB COMMENT='VIP信息表';

-- ============================================
-- 15. 活动系统
-- ============================================

CREATE TABLE events (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    type ENUM('annual', 'weekly', 'limited', 'seasonal') NOT NULL,
    description TEXT,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    config JSON COMMENT '活动配置',
    status ENUM('upcoming', 'active', 'ended') DEFAULT 'upcoming',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB COMMENT='活动配置表';

CREATE TABLE player_event_progress (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    event_id VARCHAR(50) NOT NULL,
    progress INT DEFAULT 0,
    rewards_claimed JSON DEFAULT '[]',
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (event_id) REFERENCES events(id),
    UNIQUE KEY uk_user_event (user_id, event_id)
) ENGINE=InnoDB COMMENT='玩家活动进度表';

-- ============================================
-- 16. 日志系统
-- ============================================

CREATE TABLE logs (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT,
    type ENUM('login', 'logout', 'trade', 'combat', 'upgrade', 'recharge') NOT NULL,
    action VARCHAR(100) NOT NULL,
    details JSON,
    ip_address VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_user (user_id),
    INDEX idx_type (type),
    INDEX idx_created (created_at)
) ENGINE=InnoDB COMMENT='操作日志表';

-- ============================================
-- 17. 反作弊记录
-- ============================================

CREATE TABLE cheat_detection (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    suspicious_score INT DEFAULT 0,
    violations JSON COMMENT '违规记录',
    detected_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    handled BOOLEAN DEFAULT FALSE,
    handler_id BIGINT,
    action_taken VARCHAR(50),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user (user_id),
    INDEX idx_score (suspicious_score)
) ENGINE=InnoDB COMMENT='作弊检测记录表';

-- ============================================
-- 视图
-- ============================================

CREATE VIEW user_full_info AS
SELECT 
    u.id,
    u.phone,
    u.nickname,
    u.status,
    u.created_at,
    p.level,
    p.realm,
    p.money,
    p.yuanbao,
    p.merit,
    COALESCE(v.level, 0) as vip_level
FROM users u
LEFT JOIN player_data p ON u.id = p.user_id
LEFT JOIN player_vip v ON u.id = v.user_id;

-- ============================================
-- 存储过程
-- ============================================

DELIMITER //

-- 更新VIP等级
CREATE PROCEDURE UpdateVIPLevel(IN p_user_id BIGINT)
BEGIN
    DECLARE v_total_recharge DECIMAL(10,2);
    DECLARE v_new_level INT DEFAULT 0;
    
    SELECT COALESCE(SUM(amount), 0) INTO v_total_recharge
    FROM recharge_orders
    WHERE user_id = p_user_id AND status = 'paid';
    
    -- 计算VIP等级
    IF v_total_recharge >= 4998 THEN SET v_new_level = 8;
    ELSEIF v_total_recharge >= 1998 THEN SET v_new_level = 7;
    ELSEIF v_total_recharge >= 1000 THEN SET v_new_level = 5;
    ELSEIF v_total_recharge >= 300 THEN SET v_new_level = 4;
    ELSEIF v_total_recharge >= 100 THEN SET v_new_level = 3;
    ELSEIF v_total_recharge >= 30 THEN SET v_new_level = 2;
    ELSEIF v_total_recharge >= 6 THEN SET v_new_level = 1;
    END IF;
    
    INSERT INTO player_vip (user_id, level, total_recharge)
    VALUES (p_user_id, v_new_level, v_total_recharge)
    ON DUPLICATE KEY UPDATE
        level = v_new_level,
        total_recharge = v_total_recharge;
END //

DELIMITER ;

-- ============================================
-- 初始化数据
-- ============================================

INSERT INTO items (item_id, name, type, subtype, quality, stack_limit, price, description) VALUES
('hp_potion_small', '小还丹', 'consumable', 'heal', 'common', 99, 50, '恢复50点生命'),
('hp_potion_medium', '还丹', 'consumable', 'heal', 'common', 99, 150, '恢复150点生命'),
('hp_potion_large', '大还丹', 'consumable', 'heal', 'rare', 99, 500, '恢复500点生命'),
('exp_buff', '双倍经验符', 'consumable', 'buff', 'rare', 10, 500, '1小时内经验双倍'),
('iron_ore', '铁矿石', 'material', 'ore', 'common', 999, 10, '普通矿石，打造装备材料'),
('spirit_stone', '灵石', 'material', 'ore', 'rare', 999, 200, '蕴含灵气的矿石'),
('scroll_return', '回城卷轴', 'consumable', 'teleport', 'common', 20, 50, '立即返回庙宇');

INSERT INTO skills (id, name, type, category, level_required, mp_cost, description, effect, cd) VALUES
('caishen_palm', '财神掌', 'active', 'caiyuan', 6, 20, '财源系基础攻击', '{"damage": 1.5}', 3),
('money_rain', '金钱雨', 'active', 'caiyuan', 11, 35, '群攻技能', '{"damage": 1.2, "aoe": true}', 5),
('blessing_light', '纳福之光', 'active', 'nafu', 6, 25, '恢复生命', '{"heal": 0.3}', 4),
('wealth_shield', '财源护盾', 'active', 'nafu', 11, 30, '获得护盾', '{"shield": 0.2}', 8);