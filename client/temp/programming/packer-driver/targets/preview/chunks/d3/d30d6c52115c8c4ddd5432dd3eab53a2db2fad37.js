System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, director, Node, Label, Button, ScrollView, instantiate, GameManager, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _crd, ccclass, property, MentorScene;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfGameManager(extras) {
    _reporterNs.report("GameManager", "../Core/GameManager", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      director = _cc.director;
      Node = _cc.Node;
      Label = _cc.Label;
      Button = _cc.Button;
      ScrollView = _cc.ScrollView;
      instantiate = _cc.instantiate;
    }, function (_unresolved_2) {
      GameManager = _unresolved_2.GameManager;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "2e550ado2ZOxYHW9DdBzXOM", "MentorScene", undefined);

      __checkObsolete__(['_decorator', 'Component', 'director', 'Node', 'Label', 'Button', 'ScrollView', 'Prefab', 'instantiate']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("MentorScene", MentorScene = (_dec = ccclass('MentorScene'), _dec2 = property(Button), _dec3 = property(Button), _dec4 = property(Button), _dec5 = property(Node), _dec6 = property(Node), _dec7 = property(Label), _dec8 = property(Label), _dec9 = property(ScrollView), _dec10 = property(Node), _dec11 = property(Label), _dec(_class = (_class2 = class MentorScene extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "backBtn", _descriptor, this);

          _initializerDefineProperty(this, "findMentorBtn", _descriptor2, this);

          _initializerDefineProperty(this, "findStudentBtn", _descriptor3, this);

          _initializerDefineProperty(this, "myMentorPanel", _descriptor4, this);

          _initializerDefineProperty(this, "myStudentsPanel", _descriptor5, this);

          _initializerDefineProperty(this, "mentorNameLabel", _descriptor6, this);

          _initializerDefineProperty(this, "mentorLevelLabel", _descriptor7, this);

          _initializerDefineProperty(this, "studentListScrollView", _descriptor8, this);

          _initializerDefineProperty(this, "studentItemPrefab", _descriptor9, this);

          _initializerDefineProperty(this, "maxStudentsLabel", _descriptor10, this);

          this.hasMentor = false;
          this.mentor = {
            name: '',
            level: 0
          };
          this.students = [{
            id: 1,
            name: '小财神',
            level: 15,
            progress: 60
          }, {
            id: 2,
            name: '招财猫',
            level: 22,
            progress: 85
          }];
          this.maxStudents = 4;
        }

        // 根据等级决定
        onLoad() {
          this.backBtn.node.on(Button.EventType.CLICK, this.onBack, this);
          this.findMentorBtn.node.on(Button.EventType.CLICK, this.onFindMentor, this);
          this.findStudentBtn.node.on(Button.EventType.CLICK, this.onFindStudent, this);
        }

        start() {
          this.updateUI();
        }

        updateUI() {
          if (this.hasMentor) {
            this.myMentorPanel.active = true;
            this.findMentorBtn.node.active = false;
            this.mentorNameLabel.string = "\u5E08\u7236: " + this.mentor.name;
            this.mentorLevelLabel.string = "\u7B49\u7EA7: " + this.mentor.level;
          } else {
            this.myMentorPanel.active = false;
            this.findMentorBtn.node.active = true;
          }

          this.updateStudentList();
          this.maxStudentsLabel.string = "\u5F92\u5F1F: " + this.students.length + "/" + this.maxStudents;
        }

        updateStudentList() {
          var _this = this;

          var content = this.studentListScrollView.content;
          content.removeAllChildren();

          var _loop = function _loop(student) {
            var node = instantiate(_this.studentItemPrefab);
            node.getChildByName('NameLabel').getComponent(Label).string = student.name;
            node.getChildByName('LevelLabel').getComponent(Label).string = "Lv." + student.level;
            node.getChildByName('ProgressBar').getComponent(ProgressBar).progress = student.progress / 100;
            node.getChildByName('ProgressLabel').getComponent(Label).string = "\u51FA\u5E08\u8FDB\u5EA6: " + student.progress + "%"; // 传功按钮

            var teachBtn = node.getChildByName('TeachBtn').getComponent(Button);
            teachBtn.node.on(Button.EventType.CLICK, () => _this.onTeach(student), _this);
            content.addChild(node);
          };

          for (var student of this.students) {
            _loop(student);
          }
        }

        onFindMentor() {
          // 寻找师父
          var mentors = [{
            name: '财神爷爷',
            level: 88
          }, {
            name: '金身罗汉',
            level: 75
          }, {
            name: '不败战神',
            level: 82
          }];
          var selected = mentors[Math.floor(Math.random() * mentors.length)];
          this.mentor = selected;
          this.hasMentor = true;
          alert("\u62DC" + selected.name + "\u4E3A\u5E08\uFF01");
          this.updateUI();
        }

        onFindStudent() {
          if (this.students.length >= this.maxStudents) {
            alert('徒弟已满');
            return;
          } // 寻找徒弟


          var newStudent = {
            id: Date.now(),
            name: '新徒弟' + (this.students.length + 1),
            level: Math.floor(Math.random() * 20) + 5,
            progress: 0
          };
          this.students.push(newStudent);
          alert("\u6536" + newStudent.name + "\u4E3A\u5F92\uFF01");
          this.updateUI();
        }

        onTeach(student) {
          // 传功
          student.progress = Math.min(100, student.progress + 10);

          if (student.progress >= 100) {
            // 出师
            alert(student.name + "\u5DF2\u51FA\u5E08\uFF01\u83B7\u5F97\u5956\u52B1");
            (_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
              error: Error()
            }), GameManager) : GameManager).getInstance().playerData.addCurrency('merit', 100); // 移除徒弟

            var index = this.students.indexOf(student);

            if (index > -1) {
              this.students.splice(index, 1);
            }
          } else {
            alert("\u4F20\u529F\u6210\u529F\uFF01" + student.name + "\u8FDB\u5EA6+10%");
          }

          this.updateUI();
        }

        onBack() {
          director.loadScene('MainScene');
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "backBtn", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "findMentorBtn", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "findStudentBtn", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "myMentorPanel", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "myStudentsPanel", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "mentorNameLabel", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "mentorLevelLabel", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "studentListScrollView", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "studentItemPrefab", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "maxStudentsLabel", [_dec11], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=d30d6c52115c8c4ddd5432dd3eab53a2db2fad37.js.map