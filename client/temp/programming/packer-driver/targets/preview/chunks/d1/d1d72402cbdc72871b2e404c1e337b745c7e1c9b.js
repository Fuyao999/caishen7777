System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _crd, AudioResources, AudioDownloadSources, AudioFormatRequirements;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "b237dTu7QJBb5txqOkL025t", "AudioResources", undefined);

      // 音效资源清单
      // 把这些文件放在 assets/resources/audio/ 目录下
      _export("AudioResources", AudioResources = {
        // BGM - 背景音乐
        bgm: {
          main: 'audio/bgm/main_theme',
          // 主界面背景音乐
          temple: 'audio/bgm/temple_theme',
          // 庙宇场景音乐
          battle: 'audio/bgm/battle_theme',
          // 战斗音乐
          boss: 'audio/bgm/boss_theme',
          // BOSS战音乐
          victory: 'audio/bgm/victory_theme',
          // 胜利音乐
          defeat: 'audio/bgm/defeat_theme',
          // 失败音乐
          exploration: 'audio/bgm/exploration',
          // 探索音乐
          peaceful: 'audio/bgm/peaceful',
          // 平和场景音乐
          festive: 'audio/bgm/festive' // 节日活动音乐

        },
        // SFX - 音效
        sfx: {
          // UI音效
          click: 'audio/sfx/click',
          // 点击按钮
          confirm: 'audio/sfx/confirm',
          // 确认
          cancel: 'audio/sfx/cancel',
          // 取消
          popup: 'audio/sfx/popup',
          // 弹窗出现
          close: 'audio/sfx/close',
          // 关闭
          error: 'audio/sfx/error',
          // 错误提示
          success: 'audio/sfx/success',
          // 成功提示
          // 游戏音效
          worship: 'audio/sfx/worship',
          // 供奉音效
          alms: 'audio/sfx/alms',
          // 化缘音效
          upgrade: 'audio/sfx/upgrade',
          // 升级音效
          levelup: 'audio/sfx/levelup',
          // 升级成功
          gold: 'audio/sfx/gold',
          // 获得金币
          item: 'audio/sfx/item',
          // 获得物品
          // 战斗音效
          attack: 'audio/sfx/attack',
          // 普通攻击
          skill: 'audio/sfx/skill',
          // 技能释放
          hit: 'audio/sfx/hit',
          // 受击
          crit: 'audio/sfx/crit',
          // 暴击
          heal: 'audio/sfx/heal',
          // 治疗
          buff: 'audio/sfx/buff',
          // 增益效果
          debuff: 'audio/sfx/debuff',
          // 减益效果
          // 特效音效
          thunder: 'audio/sfx/thunder',
          // 雷电
          fire: 'audio/sfx/fire',
          // 火焰
          water: 'audio/sfx/water',
          // 水
          wind: 'audio/sfx/wind',
          // 风
          earth: 'audio/sfx/earth',
          // 土
          // 交互音效
          chat: 'audio/sfx/chat',
          // 聊天消息
          mail: 'audio/sfx/mail',
          // 收到邮件
          friend: 'audio/sfx/friend',
          // 添加好友
          trade: 'audio/sfx/trade',
          // 交易成功
          // 场景音效
          ocean: 'audio/sfx/ocean',
          // 海洋环境音
          forest: 'audio/sfx/forest',
          // 森林环境音
          cave: 'audio/sfx/cave',
          // 洞穴环境音
          market: 'audio/sfx/market' // 市场环境音

        }
      }); // 音效下载来源建议


      _export("AudioDownloadSources", AudioDownloadSources = {
        // 免费音效网站
        freeSites: [{
          name: ' freesound.org',
          url: 'https://freesound.org',
          desc: '免费音效，需注册'
        }, {
          name: ' freesfx.co.uk',
          url: 'https://www.freesfx.co.uk',
          desc: '免费音效库'
        }, {
          name: ' soundbible.com',
          url: 'http://soundbible.com',
          desc: '免费音效下载'
        }, {
          name: ' zapsplat.com',
          url: 'https://www.zapsplat.com',
          desc: '免费音效和音乐'
        }],
        // 付费音效网站
        paidSites: [{
          name: ' AudioJungle',
          url: 'https://audiojungle.net',
          desc: '高质量音效，$1-5'
        }, {
          name: ' Epidemic Sound',
          url: 'https://www.epidemicsound.com',
          desc: '订阅制音效库'
        }, {
          name: ' Artlist',
          url: 'https://artlist.io',
          desc: '订阅制音乐音效'
        }],
        // 中国风音效关键词
        searchKeywords: ['Chinese traditional music', 'Asian temple ambience', 'Oriental fantasy music', 'Chinese gong', 'Temple bell', 'Incense ritual', 'Meditation music', 'Fantasy RPG sounds']
      }); // 音效格式要求


      _export("AudioFormatRequirements", AudioFormatRequirements = {
        // Cocos Creator 支持格式
        supportedFormats: ['.mp3', '.wav', '.ogg'],
        recommendedFormat: '.mp3',
        // 推荐MP3，兼容性好
        // 音质设置
        quality: {
          bgm: '128kbps',
          // 背景音乐中等质量
          sfx: '96kbps' // 音效较低质量（文件小）

        },
        // 文件大小建议
        maxSize: {
          bgm: '5MB',
          // 单首BGM最大5MB
          sfx: '500KB' // 单个音效最大500KB

        }
      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=d1d72402cbdc72871b2e404c1e337b745c7e1c9b.js.map