System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, AudioClip, AudioSource, _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _class3, _crd, ccclass, property, AudioManager;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      AudioClip = _cc.AudioClip;
      AudioSource = _cc.AudioSource;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "fb859DhS9xIsaZ7ftwywqP4", "AudioManager", undefined);

      __checkObsolete__(['_decorator', 'Component', 'AudioClip', 'AudioSource']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("AudioManager", AudioManager = (_dec = ccclass('AudioManager'), _dec2 = property(AudioClip), _dec3 = property(AudioClip), _dec4 = property(AudioClip), _dec5 = property(AudioClip), _dec(_class = (_class2 = (_class3 = class AudioManager extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "bgmClip", _descriptor, this);

          _initializerDefineProperty(this, "clickClip", _descriptor2, this);

          _initializerDefineProperty(this, "successClip", _descriptor3, this);

          _initializerDefineProperty(this, "failClip", _descriptor4, this);

          this.bgmSource = null;
          this.sfxSource = null;
          this.isMuted = false;
        }

        onLoad() {
          if (AudioManager.instance === null) {
            AudioManager.instance = this;
          }
        }

        static getInstance() {
          return AudioManager.instance;
        }

        playBGM() {
          if (this.isMuted || !this.bgmClip) return;

          if (!this.bgmSource) {
            this.bgmSource = this.node.addComponent(AudioSource);
            this.bgmSource.clip = this.bgmClip;
            this.bgmSource.loop = true;
          }

          this.bgmSource.play();
        }

        stopBGM() {
          if (this.bgmSource) {
            this.bgmSource.stop();
          }
        }

        playSFX(clip) {
          if (this.isMuted || !clip) return;

          if (!this.sfxSource) {
            this.sfxSource = this.node.addComponent(AudioSource);
          }

          this.sfxSource.playOneShot(clip);
        }

        playClick() {
          this.playSFX(this.clickClip);
        }

        playSuccess() {
          this.playSFX(this.successClip);
        }

        playFail() {
          this.playSFX(this.failClip);
        }

        setMute(muted) {
          this.isMuted = muted;

          if (muted) {
            this.stopBGM();
          } else {
            this.playBGM();
          }
        }

        isMusicMuted() {
          return this.isMuted;
        }

      }, _class3.instance = null, _class3), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "bgmClip", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "clickClip", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "successClip", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "failClip", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=5a0c9b817809fa434221ade1eacece6144b864d2.js.map