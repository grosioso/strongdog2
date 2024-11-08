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
  // ** The Forge Panel
  //*******************************************************************************************************************
  var PanelForge = /*#__PURE__*/function (_PanelBase) {
    _inherits(PanelForge, _PanelBase);

    var _super = _createSuper(PanelForge);

    function PanelForge(position, active) {
      _classCallCheck(this, PanelForge);

      return _super.call(this, position, active);
    }

    _createClass(PanelForge, [{
      key: "initialize",
      value: function initialize() {
        _get(_getPrototypeOf(PanelForge.prototype), "initialize", this).call(this);
      }
    }, {
      key: "setupElements",
      value: function setupElements() {
        this.labels.title = {
          x: 79,
          y: 4,
          a: 0.5
        };
        this.gauges.progress = {
          x: 24,
          y: 44,
          w: 110,
          h: 8,
          c1: 5,
          c2: 2
        };
        this.bars.input = {
          x: 7,
          y: 36,
          w: 16,
          h: 16,
          s: 1,
          n: 1,
          l: 1
        };
        this.bars.output = {
          x: 135,
          y: 36,
          w: 16,
          h: 16,
          s: 1,
          n: 1,
          l: 1
        };
      } //*******************************************************************************************************************
      // * Create Sprites
      //*******************************************************************************************************************

    }, {
      key: "setupLabelSprites",
      value: function setupLabelSprites() {
        var _this = this;

        _get(_getPrototypeOf(PanelForge.prototype), "setupLabelSprites", this).call(this);

        Object.entries(this.labels).forEach(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2),
              name = _ref2[0],
              label = _ref2[1];

          return _this.sprites[name].tint = 0x4f4f4f;
        });
      }
    }, {
      key: "inputBarSetupSprites",
      value: function inputBarSetupSprites(sprites, rect, index) {
        sprites.rect = game.graphics.addRect(rect, 0, 2);
        sprites.icon = game.graphics.addSprite(rect.x, rect.y, 'dismantleIcon');
      }
    }, {
      key: "outputBarSetupSprites",
      value: function outputBarSetupSprites(sprites, rect, index) {
        sprites.rect = game.graphics.addRect(rect, 0, 2);
        sprites.icon = game.graphics.addSprite(rect.x, rect.y, 'claimIconDisabled');
      } //*******************************************************************************************************************
      // * Update Sprites
      //*******************************************************************************************************************

    }, {
      key: "inputBarUpdateSprites",
      value: function inputBarUpdateSprites(sprites, rect, index) {
        var dragged = this.getDraggedItem();
        var borderColor = dragged && !dragged.unique ? 1 : 2;
        game.graphics.redrawRect(sprites.rect, rect, 0, borderColor);
      }
    }, {
      key: "outputBarUpdateSprites",
      value: function outputBarUpdateSprites(sprites, rect, index) {
        var reward = this.reward();
        var borderColor = reward ? 3 : 2;
        sprites.icon.texture = game.graphics.getTexture(reward ? 'claimIcon' : 'claimIconDisabled');
        game.graphics.redrawRect(sprites.rect, rect, 0, borderColor);
      } //*******************************************************************************************************************
      // * Input
      //*******************************************************************************************************************

    }, {
      key: "inputBarClicked",
      value: function inputBarClicked(index) {
        var dragged = this.getDraggedItem();

        if (dragged && !dragged.unique) {
          this.sellItem(dragged);
          this.setDraggedItem(null);
          game.forge.manuallyDismantledItems += 1;
        }
      }
    }, {
      key: "outputBarClicked",
      value: function outputBarClicked(index) {
        var reward = this.reward();

        if (reward) {
          game.forge.claim(reward);
          game.forge.rewards.shift();
          game.audio.playSound('claim');
        } else {
          game.audio.playSound('buzzer');
        }
      }
    }, {
      key: "sellItem",
      value: function sellItem(item) {
        game.forge.dismantleItem(item);
        game.audio.playSound('sell');
      } //*******************************************************************************************************************
      // * Tooltips
      //*******************************************************************************************************************

    }, {
      key: "inputBarUpdateTooltip",
      value: function inputBarUpdateTooltip(rect, index) {
        if (!this.getDraggedItem()) {
          var tooltip = 'Place items here to dismantle\nthem. Dismantle enough items\nto claim great rewards. You can\nalso use Shift + Click or press \'S\'\nwhile hovering over the item.';
          this.setTooltip(rect.x, rect.y, tooltip);
        }
      }
    }, {
      key: "outputBarUpdateTooltip",
      value: function outputBarUpdateTooltip(rect, index) {
        var reward = this.reward();

        if (reward) {
          this.setTooltip(rect.x, rect.y, reward.tooltip);
        }
      }
    }, {
      key: "progressGaugeUpdateTooltip",
      value: function progressGaugeUpdateTooltip(rect) {
        var _this$progressGaugeVa = this.progressGaugeValues(),
            v1 = _this$progressGaugeVa.v1,
            v2 = _this$progressGaugeVa.v2;

        this.setTooltip(rect.x, rect.y, 'Prgress ' + Math.floor(v2 / v1 * 100) + '%');
      } //*******************************************************************************************************************
      // * Other
      //*******************************************************************************************************************

    }, {
      key: "titleLabelText",
      value: function titleLabelText() {
        return 'The Forge';
      }
    }, {
      key: "progressGaugeValues",
      value: function progressGaugeValues() {
        var have = game.forge.progress - game.forge.levelTiers[game.forge.level];
        var need = game.forge.levelTiers[game.forge.level + 1] - game.forge.levelTiers[game.forge.level];
        return {
          v1: need,
          v2: have
        };
      }
    }, {
      key: "reward",
      value: function reward() {
        return game.forge.rewards[0];
      }
    }]);

    return PanelForge;
  }(PanelBase);

  return PanelForge;
});