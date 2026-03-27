System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _crd, SceneNames, PrefabPaths, ResourcePaths;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "40e5dIv96ZHaJ4MJrN+F+1G", "SceneNames", undefined);

      // 场景配置文件
      // 用于Cocos Creator的场景切换和预制体管理
      _export("SceneNames", SceneNames = {
        // 登录注册
        LOGIN: 'LoginScene',
        REGISTER: 'RegisterScene',
        // 主界面
        MAIN: 'MainScene',
        // 核心玩法
        TEMPLE: 'TempleScene',
        // 庙宇供奉
        ALMS: 'AlmsScene',
        // 化缘
        UPGRADE: 'UpgradeScene',
        // 升级
        BAG: 'BagScene',
        // 背包
        CULTIVATE: 'CultivateScene',
        // 修炼
        // 战斗
        BATTLE: 'BattleScene',
        // 战斗
        BOSS: 'BossScene',
        // BOSS战
        // 探索
        MAP: 'MapScene',
        // 大地图
        DOMAIN: 'DomainScene',
        // 财域
        // 社交
        FRIEND: 'FriendScene',
        // 好友
        GUILD: 'GuildScene',
        // 门派
        MASTER: 'MasterScene',
        // 师徒
        RANK: 'RankScene',
        // 排行榜
        // 其他
        SHOP: 'ShopScene',
        // 商店
        GACHA: 'GachaScene',
        // 抽卡
        MAIL: 'MailScene',
        // 邮件
        QUEST: 'QuestScene',
        // 任务
        SETTINGS: 'SettingsScene',
        // 设置
        GUIDE: 'GuideScene' // 新手引导

      });

      _export("PrefabPaths", PrefabPaths = {
        // UI组件
        UI: {
          BUTTON: 'prefabs/ui/ButtonPlus',
          PANEL: 'prefabs/ui/Panel',
          TOAST: 'prefabs/ui/Toast',
          LOADING: 'prefabs/ui/Loading',
          CONFIRM: 'prefabs/ui/ConfirmDialog'
        },
        // 游戏元素
        GAME: {
          GOD_CARD: 'prefabs/game/GodCard',
          ITEM_ICON: 'prefabs/game/ItemIcon',
          PET_ICON: 'prefabs/game/PetIcon',
          EQUIPMENT_ICON: 'prefabs/game/EquipmentIcon'
        },
        // 特效
        EFFECT: {
          CLICK: 'effects/ClickEffect',
          LEVEL_UP: 'effects/LevelUpEffect',
          UPGRADE: 'effects/UpgradeEffect',
          BATTLE_HIT: 'effects/BattleHitEffect'
        }
      });

      _export("ResourcePaths", ResourcePaths = {
        // 图片资源
        IMAGES: {
          BACKGROUNDS: 'images/backgrounds/',
          CHARACTERS: 'images/characters/',
          ITEMS: 'images/items/',
          UI: 'images/ui/'
        },
        // 音效资源
        AUDIO: {
          BGM: 'audio/bgm/',
          SFX: 'audio/sfx/'
        },
        // 动画资源
        ANIMATION: {
          CHARACTERS: 'animation/characters/',
          EFFECTS: 'animation/effects/'
        }
      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=5621b34844be501cf135a90c445d5f73f97622e0.js.map