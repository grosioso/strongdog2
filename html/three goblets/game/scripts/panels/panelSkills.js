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

define(['game', 'panelBase', 'dataSkills'], function (game, PanelBase, DataSkills) {
  //*******************************************************************************************************************
  // ** The Skill Panel
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
      }
    }, {
      key: "setupElements",
      value: function setupElements() {
        this.labels.points = {
          x: 79,
          y: 56,
          a: 0.5
        };
        this.bars.skills = {
          x: 56,
          y: 2,
          w: 16,
          h: 16,
          s: 1,
          n: 9,
          l: 3,
          d: 'down'
        };
      } //*******************************************************************************************************************
      // * Create Sprites
      //*******************************************************************************************************************

    }, {
      key: "skillsBarSetupSprites",
      value: function skillsBarSetupSprites(sprites, rect, index) {
        sprites.rect = game.graphics.addRect(rect, 0, 2);
        sprites.icon = game.graphics.addSprite(rect.x, rect.y, '');
        sprites.appended = game.graphics.addRect({
          x: rect.x + 1,
          y: rect.y + 11,
          w: 4,
          h: 4
        }, 3, 0);
      } //*******************************************************************************************************************
      // * Update Sprites
      //*******************************************************************************************************************

    }, {
      key: "skillsBarUpdateSprites",
      value: function skillsBarUpdateSprites(sprites, rect, index) {
        var skill = this.skillAt(index);
        var available = this.availableAt(index);
        var borderColor = this.activeAt(index) ? 3 : available ? 1 : 2;
        sprites.icon.visible = available;
        sprites.appended.visible = skill && (skill.appended || this.appendedAt(index));
        game.graphics.redrawRect(sprites.rect, rect, 0, borderColor);
        game.graphics.redrawRect(sprites.appended, {
          x: rect.x + 1,
          y: rect.y + 11,
          w: 4,
          h: 4
        }, skill.appended ? 3 : 2, 0);
        sprites.icon.texture = game.graphics.getTexture(skill ? 'skill' + skill.icon : '');
      } //*******************************************************************************************************************
      // * Input
      //*******************************************************************************************************************

    }, {
      key: "skillsBarClicked",
      value: function skillsBarClicked(index) {
        var skill = this.skillAt(index);
        var dragged = this.getDraggedSkill() || null;

        if (game.input.shiftDown && skill.appended != null) {
          skill.appended = dragged;
          game.player.skillPoints += 1;
        } else if (dragged) {
          if (dragged != skill && skill.appended == null && dragged.appended == null) {
            skill.appended = dragged;
          } else {
            game.player.skillPoints += 1;
          }

          this.setDraggedSkill(null);
        } else if (skill && game.player.skillPoints > 0 && !this.appendedAt(index) && !this.activeAt(index)) {
          this.setDraggedSkill(skill);
          game.player.skillPoints -= 1;
        }
      } //*******************************************************************************************************************
      // * Tooltips
      //*******************************************************************************************************************

    }, {
      key: "skillsBarUpdateTooltip",
      value: function skillsBarUpdateTooltip(rect, index) {
        var skill = this.skillAt(index);

        if (this.availableAt(index)) {
          this.setTooltip(rect.x, rect.y, skill.tooltip);
        }
      } //*******************************************************************************************************************
      // * Other
      //*******************************************************************************************************************

    }, {
      key: "pointsLabelText",
      value: function pointsLabelText() {
        return game.player.skillPoints > 0 ? '' + game.player.skillPoints + ' points available' : '';
      }
    }, {
      key: "skillAt",
      value: function skillAt(index) {
        return game.player.skills[index];
      }
    }, {
      key: "availableAt",
      value: function availableAt(index) {
        var tier = Math.floor(index / 3);
        return tier <= Math.floor(game.player.lvl / 4);
      }
    }, {
      key: "activeAt",
      value: function activeAt(index) {
        var skill = this.skillAt(index);
        return game.player.activeSkills.includes(skill);
      }
    }, {
      key: "appendedAt",
      value: function appendedAt(index) {
        var skill = this.skillAt(index);
        return game.player.skills.find(function (s) {
          return s.appended == skill;
        });
      }
    }, {
      key: "canRespec",
      value: function canRespec(index) {
        var tier = Math.floor(index / 3);
        var specced = game.player.skills.filter(function (p, i) {
          return Math.floor(i / 3) == tier + 1 && p.active;
        });
        var inTier = game.player.skills.filter(function (p, i) {
          return Math.floor(i / 3) == tier && p.active;
        });
        return specced.length == 0 || inTier.length == 3;
      }
    }]);

    return PanelSkills;
  }(PanelBase);

  return PanelSkills;
});