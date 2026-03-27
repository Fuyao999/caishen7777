System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _crd, ResourceMapping;

  // 资源加载辅助函数
  function getResourcePath(type, id, variant = 'icon') {
    const mapping = ResourceMapping[type];
    if (!mapping) return '';
    const item = mapping[id];
    if (!item) return '';

    if (typeof item === 'string') {
      return item;
    }

    return item[variant] || item.icon || '';
  }

  _export("getResourcePath", getResourcePath);

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "11c0c+9jnND15/bfGX9Z0As", "ResourceMapping", undefined);

      // 资源文件映射配置
      // 将逻辑ID映射到实际文件名（与需求文档一致）
      _export("ResourceMapping", ResourceMapping = {
        // 9位财神
        gods: {
          caishen: {
            icon: 'character_zhaogongming_zhengcaishen.png',
            card: 'card_zhaogongming_zhengcaishen.png',
            full: 'full_zhaogongming_zhengcaishen.png'
          },
          wencaishen: {
            icon: 'character_bigan_wencaishen.png',
            card: 'card_bigan_wencaishen.png',
            full: 'full_bigan_wencaishen.png'
          },
          wucaishen: {
            icon: 'character_guanyu_wucaishen.png',
            card: 'card_guanyu_wucaishen.png',
            full: 'full_guanyu_wucaishen.png'
          },
          piancaishen: {
            icon: 'character_fanli_piancaishen.png',
            card: 'card_fanli_piancaishen.png',
            full: 'full_fanli_piancaishen.png'
          },
          shengcai: {
            icon: 'character_liguizu_shengcai.png',
            card: 'card_liguizu_shengcai.png',
            full: 'full_liguizu_shengcai.png'
          },
          lucaishen: {
            icon: 'character_shenwansan_lucaishen.png',
            card: 'card_shenwansan_lucaishen.png',
            full: 'full_shenwansan_lucaishen.png'
          },
          shoucaishen: {
            icon: 'character_liuhaichan_shoucaishen.png',
            card: 'card_liuhaichan_shoucaishen.png',
            full: 'full_liuhaichan_shoucaishen.png'
          },
          xicaishen: {
            icon: 'character_zigong_xicaishen.png',
            card: 'card_zigong_xicaishen.png',
            full: 'full_zigong_xicaishen.png'
          },
          caishenpo: {
            icon: 'character_caishenpo.png',
            card: 'card_caishenpo.png',
            full: 'full_caishenpo.png'
          }
        },
        // 道具（与需求文档命名一致）
        items: {
          incense_sticks: 'item_incense_sticks_xianxiang.png',
          candles: 'item_candles_lazhu.png',
          gold_paper: 'item_gold_paper_jinzhi.png',
          fruits: 'item_fruits_gongguo.png',
          incense_box: 'item_incense_box_xianghe.png',
          candle_holder: 'item_candle_holder_zhutai.png'
        },
        // 装备（示例）
        equipment: {
          duster_wood: 'equip_duster_taomufuchen.png',
          duster_bronze: 'equip_duster_qingtongfuchen.png',
          abacus_wood: 'equip_abacus_huanghuali.png',
          robe_clay: 'equip_robe_nitai.png',
          robe_wood: 'equip_robe_mugu.png'
        },
        // 背景
        backgrounds: {
          login: 'bg_login.png',
          main: 'bg_main.png',
          temple: 'bg_temple.png',
          domains: {
            zishi: 'bg_domain_zishi.png',
            choushi: 'bg_domain_choushi.png',
            yinshi: 'bg_domain_yinshi.png',
            maoshi: 'bg_domain_maoshi.png',
            chenshi: 'bg_domain_chenshi.png',
            sishi: 'bg_domain_sishi.png',
            wushi: 'bg_domain_wushi.png',
            weishi: 'bg_domain_weishi.png',
            shenshi: 'bg_domain_shenshi.png',
            youshi: 'bg_domain_youshi.png',
            xushi: 'bg_domain_xushi.png',
            haishi: 'bg_domain_haishi.png'
          }
        },
        // UI
        ui: {
          btn_normal: 'ui_btn_normal.png',
          btn_pressed: 'ui_btn_pressed.png',
          btn_disabled: 'ui_btn_disabled.png',
          panel_bg: 'ui_panel_bg.png',
          popup_bg: 'ui_popup_bg.png',
          icon_money: 'ui_icon_incense_money.png',
          icon_yuanbao: 'ui_icon_yuanbao.png',
          icon_merit: 'ui_icon_merit.png',
          icon_mana: 'ui_icon_mana.png'
        }
      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=fc63f666197928f1d27f5cb267ef68a0b2809013.js.map