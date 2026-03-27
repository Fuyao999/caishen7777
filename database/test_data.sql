-- 测试数据插入脚本
-- 执行: mysql -u root -p caishen_game < test_data.sql

-- 插入测试用户
INSERT INTO users (phone, nickname, created_at, last_login) VALUES
('13800138001', '财神本尊', NOW(), NOW()),
('13800138002', '金身罗汉', NOW(), NOW()),
('13800138003', '铜身道长', NOW(), NOW()),
('13800138004', '木骨居士', NOW(), NOW()),
('13800138005', '泥胎修士', NOW(), NOW()),
('13800138006', '测试玩家A', NOW(), NOW()),
('13800138007', '测试玩家B', NOW(), NOW()),
('13800138008', '测试玩家C', NOW(), NOW()),
('13800138009', '测试玩家D', NOW(), NOW()),
('13800138010', '测试玩家E', NOW(), NOW());

-- 插入玩家数据
INSERT INTO player_data (user_id, level, stage, experience, incense_money, yuanbao, merit, incense_sticks, candles, gold_paper, fruits, mana, cultivation) VALUES
(1, 99, 'gold', 9999999, 9999999, 9999, 99999, 999, 999, 999, 999, 100, 9999999),
(2, 75, 'gold', 5000000, 5000000, 5000, 50000, 500, 500, 500, 500, 100, 5000000),
(3, 50, 'bronze', 2000000, 2000000, 2000, 20000, 200, 200, 200, 200, 100, 2000000),
(4, 30, 'wood', 500000, 500000, 500, 5000, 100, 100, 100, 100, 100, 500000),
(5, 10, 'clay', 10000, 10000, 100, 100, 50, 50, 50, 50, 100, 10000),
(6, 25, 'wood', 300000, 300000, 300, 3000, 80, 80, 80, 80, 100, 300000),
(7, 35, 'bronze', 800000, 800000, 800, 8000, 150, 150, 150, 150, 100, 800000),
(8, 45, 'bronze', 1500000, 1500000, 1500, 15000, 180, 180, 180, 180, 100, 1500000),
(9, 60, 'gold', 2500000, 2500000, 2500, 25000, 300, 300, 300, 300, 100, 2500000),
(10, 80, 'gold', 6000000, 6000000, 6000, 60000, 600, 600, 600, 600, 100, 6000000);

-- 插入供奉记录
INSERT INTO worship_records (user_id, god_id, offering_type, offering_level, reward_incense_money, reward_merit, created_at) VALUES
(1, 'caishen', 'incense_sticks', 1, 12, 1, NOW()),
(1, 'caishen', 'candles', 1, 24, 2, DATE_SUB(NOW(), INTERVAL 1 DAY)),
(2, 'wencaishen', 'incense_sticks', 1, 10, 1, NOW()),
(3, 'wucaishen', 'gold_paper', 1, 36, 3, NOW()),
(4, 'caishenpo', 'fruits', 1, 60, 5, NOW()),
(5, 'shengcai', 'incense_sticks', 1, 11, 2, NOW());

-- 插入化缘记录
INSERT INTO alms_records (user_id, region, result, reward_incense_money, risk_type, used_shield, created_at) VALUES
(1, 'east', 'success', 120, NULL, false, NOW()),
(1, 'north', 'success', 550, NULL, true, DATE_SUB(NOW(), INTERVAL 1 DAY)),
(2, 'south', 'fail', 0, '遇匪', false, NOW()),
(3, 'west', 'success', 320, NULL, false, NOW()),
(4, 'east', 'success', 100, NULL, false, NOW()),
(5, 'south', 'success', 180, NULL, false, NOW());

-- 插入登录记录
INSERT INTO login_records (user_id, login_time, ip, device) VALUES
(1, NOW(), '127.0.0.1', 'iPhone 15 Pro'),
(1, DATE_SUB(NOW(), INTERVAL 1 DAY), '127.0.0.1', 'iPhone 15 Pro'),
(2, NOW(), '192.168.1.100', 'Android'),
(3, NOW(), '192.168.1.101', 'iPad'),
(4, NOW(), '192.168.1.102', 'MacBook Pro'),
(5, NOW(), '192.168.1.103', 'Windows PC');

-- 插入背包物品
INSERT INTO inventory (user_id, item_id, item_type, quantity, is_equipped, created_at) VALUES
(1, 'legendary_sword', 'equipment', 1, true, NOW()),
(1, 'epic_armor', 'equipment', 1, true, NOW()),
(2, 'rare_ring', 'equipment', 1, false, NOW()),
(3, 'health_potion', 'consumable', 10, false, NOW()),
(4, 'mana_potion', 'consumable', 5, false, NOW()),
(5, 'pet_food', 'material', 20, false, NOW());

-- 插入机器人
INSERT INTO robots (name, level, status, behavior, created_at) VALUES
('Robot_001', 10, 'active', 'active', NOW()),
('Robot_002', 15, 'active', 'passive', NOW()),
('Robot_003', 20, 'active', 'aggressive', NOW()),
('Robot_004', 25, 'active', 'active', NOW()),
('Robot_005', 30, 'inactive', 'passive', NOW()),
('AI_Trader', 50, 'active', 'active', NOW()),
('AI_Farmer', 40, 'active', 'passive', NOW()),
('AI_Warrior', 60, 'active', 'aggressive', NOW()),
('AI_Master', 80, 'active', 'active', NOW()),
('AI_God', 99, 'active', 'aggressive', NOW());

-- 插入订单
INSERT INTO orders (id, user_id, product_id, product_name, amount, currency, status, pay_method, pay_time, created_at) VALUES
('ORD20260323001', 1, 'month_card', '月卡', 30, 'CNY', 'paid', 'wechat', NOW(), NOW()),
('ORD20260323002', 2, 'first_charge', '首充礼包', 6, 'CNY', 'paid', 'alipay', NOW(), NOW()),
('ORD20260323003', 3, 'yuanbao_100', '100元宝', 10, 'CNY', 'paid', 'wechat', NOW(), NOW()),
('ORD20260323004', 1, 'legendary_weapon', '传说武器', 68, 'CNY', 'pending', NULL, NULL, NOW()),
('ORD20260323005', 4, 'week_card', '周卡', 12, 'CNY', 'paid', 'wechat', NOW(), NOW());

-- 插入公告
INSERT INTO announcements (title, content, type, is_active, start_time, end_time, created_at) VALUES
('欢迎加入财神大陆', '欢迎来到财神大陆，开启你的财运之旅！', 'system', true, NOW(), DATE_ADD(NOW(), INTERVAL 30 DAY), NOW()),
('新手福利', '新玩家登录即可领取丰厚新手礼包！', 'activity', true, NOW(), DATE_ADD(NOW(), INTERVAL 7 DAY), NOW()),
('维护公告', '系统将于今晚0点进行维护，预计1小时。', 'maintenance', true, DATE_SUB(NOW(), INTERVAL 1 DAY), NOW(), NOW()),
('充值返利活动', '充值满100返20，多充多送！', 'activity', true, NOW(), DATE_ADD(NOW(), INTERVAL 3 DAY), NOW()),
('世界BOSS开启', '今晚20:00世界BOSS金乌之灵降临！', 'activity', true, NOW(), DATE_ADD(NOW(), INTERVAL 1 DAY), NOW());

-- 插入活动
INSERT INTO activities (name, type, config, start_time, end_time, is_active, created_at) VALUES
('双倍经验', 'double_exp', '{"multiplier": 2}', NOW(), DATE_ADD(NOW(), INTERVAL 3 DAY), true, NOW()),
('充值返利', 'recharge', '{"threshold": 100, "reward": 20}', NOW(), DATE_ADD(NOW(), INTERVAL 7 DAY), true, NOW()),
('限时折扣', 'discount', '{"discount": 0.8}', NOW(), DATE_ADD(NOW(), INTERVAL 2 DAY), true, NOW()),
('登录奖励', 'login', '{"reward": "100元宝"}', NOW(), DATE_ADD(NOW(), INTERVAL 30 DAY), true, NOW());

-- 插入邮件
INSERT INTO mails (user_id, title, content, attachment, is_read, is_claimed, expire_time, created_at) VALUES
(1, '新手礼包', '欢迎来到财神大陆！这是给你的新手礼包。', '{"incense_money": 1000, "incense_sticks": 10}', false, false, DATE_ADD(NOW(), INTERVAL 30 DAY), NOW()),
(1, '系统维护补偿', '由于系统维护，给您带来不便，特此补偿。', '{"yuanbao": 60}', false, false, DATE_ADD(NOW(), INTERVAL 7 DAY), NOW()),
(2, '活动奖励', '恭喜您在活动中获得奖励！', '{"candles": 5}', true, true, DATE_ADD(NOW(), INTERVAL 7 DAY), DATE_SUB(NOW(), INTERVAL 1 DAY)),
(3, '充值返利', '您的充值返利已到账。', '{"yuanbao": 20}', false, false, DATE_ADD(NOW(), INTERVAL 7 DAY), NOW()),
(1, '周末福利', '周末登录福利。', '{"incense_money": 500}', false, false, DATE_ADD(NOW(), INTERVAL 2 DAY), NOW());

-- 插入好友关系
INSERT INTO friends (user_id, friend_id, status, created_at) VALUES
(1, 2, 'accepted', NOW()),
(2, 1, 'accepted', NOW()),
(1, 3, 'accepted', NOW()),
(3, 1, 'accepted', NOW()),
(2, 3, 'accepted', NOW()),
(3, 2, 'accepted', NOW()),
(1, 4, 'pending', NOW()),
(5, 1, 'pending', NOW());

-- 插入门派
INSERT INTO guilds (name, leader_id, level, member_count, max_members, notice, created_at) VALUES
('财神殿', 1, 5, 8, 50, '欢迎加入财神殿，一起发财！', NOW()),
('聚宝盆', 2, 3, 5, 30, '财源广进，聚宝盆满！', NOW()),
('金元宝', 3, 4, 12, 40, '金元宝在手，天下我有！', NOW()),
('福禄寿', 4, 2, 3, 20, '福禄寿三星高照！', NOW());

-- 插入门派成员
INSERT INTO guild_members (guild_id, user_id, role, contribution, joined_at) VALUES
(1, 1, 'leader', 9999, NOW()),
(1, 2, 'elder', 5000, NOW()),
(1, 3, 'member', 2000, NOW()),
(1, 4, 'member', 1000, NOW()),
(2, 2, 'leader', 8000, NOW()),
(2, 5, 'member', 3000, NOW()),
(3, 3, 'leader', 7000, NOW()),
(3, 6, 'elder', 4000, NOW()),
(4, 4, 'leader', 5000, NOW());

SELECT '测试数据插入完成！' AS message;
SELECT CONCAT('用户数: ', COUNT(*)) FROM users;
SELECT CONCAT('机器人: ', COUNT(*)) FROM robots;
SELECT CONCAT('订单: ', COUNT(*)) FROM orders;
SELECT CONCAT('公告: ', COUNT(*)) FROM announcements;
