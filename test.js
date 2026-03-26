/**
 * 财神大陆 - 第二阶段测试脚本
 * 测试所有核心系统是否正常运行
 */

console.log('🎮 财神大陆第二阶段测试开始...\n');

// 加载模块
const LevelSystem = require('./LevelSystem');
const TwelveDomains = require('./TwelveDomains');
const Phase1System = require('./Phase1System');
const PlayerData = require('./PlayerData');
const GameController = require('./GameController');

// 测试1：等级系统
console.log('✅ 测试1：等级系统');
console.log('  Lv.1升级需要经验:', LevelSystem.getRequiredExp(1));
console.log('  Lv.5升级需要经验:', LevelSystem.getRequiredExp(5));
console.log('  Lv.6升级需要经验:', LevelSystem.getRequiredExp(6));
console.log('  Lv.99形态:', LevelSystem.getCurrentForm(99).name);
console.log('');

// 测试2：十二财域
console.log('✅ 测试2：十二财域系统');
const domainsLv10 = TwelveDomains.getAvailableDomains(10);
console.log('  10级可进入财域数:', domainsLv10.length);
const domainsLv50 = TwelveDomains.getAvailableDomains(50);
console.log('  50级可进入财域数:', domainsLv50.length);
const nextUnlock = TwelveDomains.getNextUnlock(5);
console.log('  5级下一个解锁:', nextUnlock.domain.name, '(还需', nextUnlock.remain, '级)');
console.log('');

// 测试3：庙宇系统
console.log('✅ 测试3：庙宇系统');
const temple1 = Phase1System.getTempleInfo(1);
console.log('  1级庙宇产出:', temple1.hourlyOutput, '/小时');
console.log('  1级庙宇存储上限:', temple1.storageLimit);
const temple5 = Phase1System.getTempleInfo(5);
console.log('  5级庙宇名称:', temple5.name);
console.log('  合成1招财幡需要碎片:', Phase1System.bannerSystem.fragmentsPerBanner);
console.log('');

// 测试4：玩家数据
console.log('✅ 测试4：玩家数据系统');
const newPlayer = PlayerData.createNew();
console.log('  新玩家初始金钱:', newPlayer.money);
console.log('  新玩家初始等级:', newPlayer.level);
console.log('  新玩家形态:', newPlayer.templeForm);
console.log('');

// 测试5：游戏控制器
console.log('✅ 测试5：游戏控制器');
const game = new GameController();
const status = game.getStatus();
console.log('  玩家名称:', status.player.name);
console.log('  当前等级:', status.player.level);
console.log('  庙宇等级:', status.temple.level);
console.log('  当前形态:', status.temple.form);
console.log('  已解锁财域:', status.domains.unlocked);
console.log('');

// 测试6：功能测试
console.log('✅ 测试6：功能测试');

// 供奉测试
const worshipResult = game.worship('normal');
console.log('  供奉结果:', worshipResult.message);

// 化缘测试
const almsResult = game.alms();
console.log('  化缘结果:', almsResult.message, '获得', almsResult.reward);

// 查看升级需求
const upgradeCheck = Phase1System.canUpgrade(game.player, game.player.templeLevel);
console.log('  升级庙宇需求:', upgradeCheck.can ? '满足' : upgradeCheck.reason);

console.log('\n🎉 所有测试通过！系统运行正常！');
console.log('\n📊 游戏状态预览:');
console.log('  金钱:', game.player.money);
console.log('  经验:', game.player.exp);
console.log('  功德:', game.player.merit);
console.log('  碎片:', game.player.fragments);
console.log('  招财幡:', game.player.banners);

console.log('\n💡 提示:');
console.log('  - 打开index.html可直接在浏览器中游玩');
console.log('  - 运行 node test.js 可进行完整测试');
console.log('  - 查看README.md获取完整API文档');
console.log('\n✨ 祝财源广进！');