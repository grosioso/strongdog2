"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

define(['game', 'panelBase', 'dataStats'], function (game, PanelBase, DataStats) {
  //*******************************************************************************************************************
  // ** Panel for Passive Skill Selection
  //*******************************************************************************************************************
  var PanelSkills = /*#__PURE__*/function (_PanelBase) {
    _inherits(PanelSkills, _PanelBase);

    var _super = _createSuper(PanelSkills);

    function PanelSkills(position, active) {
      _classCallCheck(this, PanelSkills);

      return _super.call(this, position, active);
    }

    _createClass(PanelSkills, [{
      key: "initialize",
      value: function initialize() {
        _get(_getPrototypeOf(PanelSkills.prototype), "initialize", this).call(this);

        this.width = 77;
        this.height = 86;
        this.x = 10;
        this.y = 10;
        this.page = 0;
      }
    }, {
      key: "setupElements",
      value: function setupElements() {
        this.labels.points = {
          x: this.width - 6,
          y: 12
          /*this.height - 12*/
          ,
          c: 3,
          a: 1
        };
        this.bars.skills = {
          x: 6,
          y: 22,
          w: 17,
          h: 17,
          s: -1,
          n: 12,
          l: 3,
          d: 'down'
        };
        this.bars.pages = {
          x: 6,
          y: 14,
          w: 15,
          h: 6,
          s: 0,
          n: 1,
          l: 1,
          disabled: true
        };
      } //*******************************************************************************************************************
      // * Create Sprites
      //*******************************************************************************************************************

    }, {
      key: "skillsBarSetupSprites",
      value: function skillsBarSetupSprites(sprites, rect, index) {
        sprites.rect = game.graphics.addRect(rect, 1, 2, 1, 'skillsBar');
        sprites.icon = game.graphics.addIcon(rect.x, rect.y, 0);
      }
    }, {
      key: "pagesBarSetupSprites",
      value: function pagesBarSetupSprites(sprites, rect, index) {
        sprites.icon = game.graphics.addIcon(rect.x, rect.y, 213);
      } //*******************************************************************************************************************
      // * Update Sprites
      //*******************************************************************************************************************

    }, {
      key: "skillsBarUpdateSprites",
      value: function skillsBarUpdateSprites(sprites, rect, index) {
        var skill = this.skillAt(index);
        var unlocked = this.availableAt(index);
        var bgColor = skill.active ? 2 : null;
        var fgColor = skill.active ? 3 : 2;
        sprites.icon.setIndex(skill.icon, skill.active);
        sprites.icon.visible = unlocked;
        sprites.rect.zIndex = skill.active ? 1 : 0;
        game.graphics.redrawRect(sprites.rect, rect, bgColor, fgColor);
      }
    }, {
      key: "pagesBarUpdateSprites",
      value: function pagesBarUpdateSprites(sprites, rect, index) {
        sprites.icon.setIndex(213 + this.page);
        sprites.icon.visible = !this.bars.pages.disabled;
      } //*******************************************************************************************************************
      // * Update
      //*******************************************************************************************************************

    }, {
      key: "updateElements",
      value: function updateElements() {
        this.updatePagesBarState();

        _get(_getPrototypeOf(PanelSkills.prototype), "updateElements", this).call(this);
      }
    }, {
      key: "updatePagesBarState",
      value: function updatePagesBarState() {
        this.bars.pages.disabled = !game.character.secondSkillPageAvailable();
      } //*******************************************************************************************************************
      // * Input
      //*******************************************************************************************************************

    }, {
      key: "skillsBarClicked",
      value: function skillsBarClicked(index) {
        var skill = this.skillAt(index);
        var unlocked = this.availableAt(index);

        if (unlocked && skill.active) {
          skill.active = false;
          game.character.skillPoints += 1;
          game.audio.playSfx('select');
        } else if (unlocked && !skill.active && game.character.skillPoints > 0) {
          skill.active = true;
          game.character.skillPoints -= 1;
          game.audio.playSfx('select');
        } else {
          game.audio.playSfx('buzzer');
        }

        game.character.rest();
      }
    }, {
      key: "pagesBarClicked",
      value: function pagesBarClicked(index) {
        this.page = this.page === 1 ? 0 : 1;
        game.audio.playSfx('switch');
      } //*******************************************************************************************************************
      // * Tooltips
      //*******************************************************************************************************************

    }, {
      key: "skillsBarUpdateTooltip",
      value: function skillsBarUpdateTooltip(rect, index) {
        var skill = this.skillAt(index);

        if (this.availableAt(index)) {
          var tooltip = skill.tooltip || skill.stats.tooltip();
          this.setTooltip(rect.x - 3, rect.y + 13, tooltip);
        }
      } //*******************************************************************************************************************
      // * Clickable
      //*******************************************************************************************************************

    }, {
      key: "skillsBarClickable",
      value: function skillsBarClickable(index) {
        var skill = this.skillAt(index);
        var unlocked = this.availableAt(index);
        return unlocked && skill.active || unlocked && !skill.active && game.character.skillPoints > 0;
      }
    }, {
      key: "pagesBarClickable",
      value: function pagesBarClickable(index) {
        return this.bars.pages.disabled == false;
      } //*******************************************************************************************************************
      // * Labels
      //*******************************************************************************************************************

    }, {
      key: "pointsLabelText",
      value: function pointsLabelText() {
        return game.character.skillPoints + ' Point' + (game.character.skillPoints != 1 ? 's' : '');
      } //*******************************************************************************************************************
      // * Skills
      //*******************************************************************************************************************

    }, {
      key: "skillAt",
      value: function skillAt(index) {
        var adjustedIndex = index + this.page * 12;
        return game.character.skills[adjustedIndex];
      }
    }, {
      key: "availableAt",
      value: function availableAt(index) {
        var adjustedIndex = index + this.page * 12;
        return Math.floor(adjustedIndex / 3) < Math.floor(game.character.level / 4) - Math.floor(game.character.level / 24);
      } //*******************************************************************************************************************
      // * Other
      //*******************************************************************************************************************

    }]);

    return PanelSkills;
  }(PanelBase);

  return PanelSkills;
});