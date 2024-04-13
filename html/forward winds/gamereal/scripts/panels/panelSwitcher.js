"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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

define(['game', 'panelBase'], function (game, PanelBase) {
  //*******************************************************************************************************************
  // ** Panel for Switching other Panels
  //*******************************************************************************************************************
  var PanelSwitcher = /*#__PURE__*/function (_PanelBase) {
    _inherits(PanelSwitcher, _PanelBase);

    var _super = _createSuper(PanelSwitcher);

    function PanelSwitcher(active) {
      _classCallCheck(this, PanelSwitcher);

      return _super.call(this, active);
    }

    _createClass(PanelSwitcher, [{
      key: "initialize",
      value: function initialize() {
        _get(_getPrototypeOf(PanelSwitcher.prototype), "initialize", this).call(this);

        this.width = 65;
        this.height = 13;
        this.x = 16;
        this.y = 95;
        this.panels = ['Items', 'Skills', 'Relics', 'Settings'];
        this.index = 0;
      }
    }, {
      key: "setupElements",
      value: function setupElements() {
        this.bars.panels = {
          x: 0,
          y: 0,
          w: 17,
          h: 13,
          s: -1,
          n: 4,
          l: 4
        };
      }
    }, {
      key: "setupBackground",
      value: function setupBackground() {
        this.rect = {
          x: this.x,
          y: this.y,
          w: this.width,
          h: this.height
        };
        this.bgSprite = game.graphics.addRect(this.rect, 1, 2);
        this.bgSprite.z = 0;
      } //*******************************************************************************************************************
      // * Create Sprites
      //*******************************************************************************************************************

    }, {
      key: "panelsBarSetupSprites",
      value: function panelsBarSetupSprites(sprites, rect, index) {
        sprites.rect = game.graphics.addRect(rect, null, game.graphics.mainColor, 1, 'panelsBar');
        sprites.sepa = game.graphics.addRect({
          x: rect.x + 1,
          y: rect.y,
          w: rect.w - 2,
          h: 1
        }, null, game.graphics.mainColor, 1, 'panelsBar');
        sprites.icon = game.graphics.addIcon(rect.x + 1, rect.y + 1, 0);
      } //*******************************************************************************************************************
      // * Update Sprites
      //*******************************************************************************************************************

    }, {
      key: "panelsBarUpdateSprites",
      value: function panelsBarUpdateSprites(sprites, rect, index) {
        var _this$panels$index = _slicedToArray(this.panels[index], 2),
            name = _this$panels$index[0],
            panels = _this$panels$index[1];

        var unlocked = this.unlockedAt(index);
        var highlighted = this.highlightedAt(index);
        var selected = this.index == index;
        var bgColor = selected ? 2 : 1;
        var fgColor = selected ? 0 : 3;
        var sepaColor = selected ? 3 : 0;
        var textColor = this.index == index ? 3 : highlighted ? 0 : 2;
        var icon = highlighted && !selected ? 197 + index : unlocked ? 192 + index : 196;
        sprites.icon.setIndex(icon, selected || highlighted);
        sprites.rect.zIndex = this.index == index ? 1 : 0;
        sprites.sepa.zIndex = this.index == index ? 2 : 0;
        sprites.sepa.x = this.index == index ? rect.x + 1 : rect.x;
        game.graphics.redrawRect(sprites.sepa, {
          w: rect.w - (this.index == index ? 2 : 0),
          h: 1
        }, sepaColor, null);
        game.graphics.redrawRect(sprites.rect, rect, bgColor, fgColor);
      } //*******************************************************************************************************************
      // * Input
      //*******************************************************************************************************************

    }, {
      key: "panelsBarClicked",
      value: function panelsBarClicked(index) {
        if (this.index != index && this.unlockedAt(index)) {
          game.panels.deactivate(['Items', 'Skills', 'Relics', 'Settings']);
          game.panels.activate([this.panels[index]]);
          this.index = index;
          game.audio.playSfx('switch');
        }
      } //*******************************************************************************************************************
      // * Tooltips
      //*******************************************************************************************************************
      //*******************************************************************************************************************
      // * Clickable
      //*******************************************************************************************************************

    }, {
      key: "panelsBarClickable",
      value: function panelsBarClickable(index) {
        return this.index != index && this.unlockedAt(index);
      } //*******************************************************************************************************************
      // * Availability
      //*******************************************************************************************************************

    }, {
      key: "unlockedAt",
      value: function unlockedAt(index) {
        var name = this.panels[index];
        return !this['unlocked' + name] || this['unlocked' + name]();
      }
    }, {
      key: "unlockedSkills",
      value: function unlockedSkills() {
        return game.character.level >= 4;
      }
    }, {
      key: "unlockedRelics",
      value: function unlockedRelics() {
        return game.character.relics[1].available;
      }
    }, {
      key: "highlightedAt",
      value: function highlightedAt(index) {
        var name = this.panels[index];
        return this['highlighted' + name] !== undefined && this['highlighted' + name]();
      }
    }, {
      key: "highlightedSkills",
      value: function highlightedSkills() {
        return game.character.skillPoints > 0;
      } //*******************************************************************************************************************
      // * Other
      //*******************************************************************************************************************

    }, {
      key: "deactivate",
      value: function deactivate() {
        _get(_getPrototypeOf(PanelSwitcher.prototype), "deactivate", this).call(this);

        this.index = 0;
      }
    }]);

    return PanelSwitcher;
  }(PanelBase);

  return PanelSwitcher;
});