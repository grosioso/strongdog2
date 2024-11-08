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
  // ** Panel for Passive Selection
  //*******************************************************************************************************************
  var PanelPassives = /*#__PURE__*/function (_PanelBase) {
    _inherits(PanelPassives, _PanelBase);

    var _super = _createSuper(PanelPassives);

    function PanelPassives(position, active) {
      _classCallCheck(this, PanelPassives);

      return _super.call(this, position, active);
    }

    _createClass(PanelPassives, [{
      key: "initialize",
      value: function initialize() {
        _get(_getPrototypeOf(PanelPassives.prototype), "initialize", this).call(this);

        this.page = 0;
      }
    }, {
      key: "setupElements",
      value: function setupElements() {
        this.labels.passivePoints = {
          x: 4,
          y: 2
        };
        this.bars.passives = {
          x: 20,
          y: 16,
          w: 16,
          h: 16,
          s: 1,
          n: 21,
          l: 3,
          d: 'down'
        };
        this.bars.pages = {
          x: 6,
          y: 31,
          w: 9,
          h: 9,
          s: 1,
          n: 2,
          l: 1,
          disabled: true
        };
      } //*******************************************************************************************************************
      // * Create Sprites
      //*******************************************************************************************************************

    }, {
      key: "passivesBarSetupSprites",
      value: function passivesBarSetupSprites(sprites, rect, index) {
        sprites.rect = game.graphics.addSprite(rect.x, rect.y, 'skillBorderInactive');
        sprites.icon = game.graphics.addSprite(rect.x, rect.y, 'skill' + game.player.passives[index].icon);
      }
    }, {
      key: "pagesBarSetupSprites",
      value: function pagesBarSetupSprites(sprites, rect, index) {
        sprites.rect = game.graphics.addRect(rect, 0, 2);
        sprites.icon = game.graphics.addSprite(rect.x, rect.y, 'iconPage' + index);
      } //*******************************************************************************************************************
      // * Update Sprites
      //*******************************************************************************************************************

    }, {
      key: "passivesBarUpdateSprites",
      value: function passivesBarUpdateSprites(sprites, rect, index) {
        var passive = this.passiveAt(index);
        var available = this.availableAt(index);
        var borderColor = passive.active ? 3 : 2;
        sprites.rect.texture = game.graphics.getTexture(passive.active ? 'skillBorderActive' : 'skillBorderInactive');
        sprites.icon.texture = this.getSkillTexture(passive);
        sprites.icon.visible = this.availableAt(index);
      }
    }, {
      key: "pagesBarUpdateSprites",
      value: function pagesBarUpdateSprites(sprites, rect, index) {
        var borderColor = this.page == index ? 1 : 2;
        game.graphics.redrawRect(sprites.rect, rect, 8, borderColor);
        this.toggleBarVisibility(this.bars.pages, sprites);
      } //*******************************************************************************************************************
      // * Update
      //*******************************************************************************************************************

    }, {
      key: "updateElements",
      value: function updateElements() {
        this.updatePagesBarState();

        _get(_getPrototypeOf(PanelPassives.prototype), "updateElements", this).call(this);
      }
    }, {
      key: "updatePagesBarState",
      value: function updatePagesBarState() {
        this.bars.pages.disabled = !game.world.shownFin;
      } //*******************************************************************************************************************
      // * Input
      //*******************************************************************************************************************

    }, {
      key: "passivesBarClicked",
      value: function passivesBarClicked(index) {
        var passive = this.passiveAt(index);

        if (passive.active && this.canRespec(index)) {
          passive.active = false;
          game.player.passivePoints += 1;
          game.audio.playSound('select');
        } else if (!passive.active && this.availableAt(index) && game.player.passivePoints > 0) {
          passive.active = true;
          game.player.passivePoints -= 1;
          game.audio.playSound('select');
        } else {
          game.audio.playSound('buzzer');
        }

        game.player.refreshStats();
        game.player.reset();
      }
    }, {
      key: "pagesBarClicked",
      value: function pagesBarClicked(index) {
        this.page = index;
      } //*******************************************************************************************************************
      // * Tooltips
      //*******************************************************************************************************************

    }, {
      key: "passivesBarUpdateTooltip",
      value: function passivesBarUpdateTooltip(rect, index) {
        var passive = this.passiveAt(index);

        if (this.availableAt(index)) {
          var tooltip = passive.tooltip || passive.stats.tooltip();
          this.setTooltip(rect.x, rect.y, tooltip);
        }
      } //*******************************************************************************************************************
      // * Labels
      //*******************************************************************************************************************

    }, {
      key: "passivePointsLabelText",
      value: function passivePointsLabelText() {
        var s = game.player.passivePoints > 1 ? 's' : '';
        return game.player.passivePoints > 0 ? '' + game.player.passivePoints + ' Skill point' + s : '';
      } //*******************************************************************************************************************
      // * Passives
      //*******************************************************************************************************************

    }, {
      key: "passiveAt",
      value: function passiveAt(index) {
        return this.passivesOnPage()[index];
      }
    }, {
      key: "availableAt",
      value: function availableAt(index) {
        var all = this.passivesOnPage();
        var levelReached = game.player.lvl >= 3;
        var tier = Math.floor(index / 3);
        var required = all.filter(function (p, i) {
          return Math.floor(i / 3) == tier - 1 && p.active;
        });
        return levelReached && (tier == 0 || required.length >= 1);
      }
    }, {
      key: "canRespec",
      value: function canRespec(index) {
        var all = this.passivesOnPage();
        var tier = Math.floor(index / 3);
        var specced = all.filter(function (p, i) {
          return Math.floor(i / 3) == tier + 1 && p.active;
        });
        var inTier = all.filter(function (p, i) {
          return Math.floor(i / 3) == tier && p.active;
        });
        return specced.length == 0 || inTier.length >= 2;
      }
    }, {
      key: "passivesOnPage",
      value: function passivesOnPage() {
        return game.player.passives.slice(this.page * 21, (this.page + 1) * 21);
      }
    }, {
      key: "getSkillTexture",
      value: function getSkillTexture(passive) {
        var iconName = 'skill' + passive.icon;
        return passive.active ? game.graphics.getTexture(iconName) : game.graphics.getModifiedTexture(iconName, 'disabled');
      }
    }, {
      key: "toggleBarVisibility",
      value: function toggleBarVisibility(bar, sprites) {
        Object.values(sprites).forEach(function (s) {
          return s.visible = !bar.disabled;
        });
      }
    }]);

    return PanelPassives;
  }(PanelBase);

  return PanelPassives;
});