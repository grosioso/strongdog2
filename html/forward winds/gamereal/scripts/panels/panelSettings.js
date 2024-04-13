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
  // ** The Settings panel
  //*******************************************************************************************************************
  var PanelSettings = /*#__PURE__*/function (_PanelBase) {
    _inherits(PanelSettings, _PanelBase);

    var _super = _createSuper(PanelSettings);

    function PanelSettings(position, active) {
      _classCallCheck(this, PanelSettings);

      return _super.call(this, position, active);
    }

    _createClass(PanelSettings, [{
      key: "initialize",
      value: function initialize() {
        _get(_getPrototypeOf(PanelSettings.prototype), "initialize", this).call(this);

        this.width = 77;
        this.height = 86;
        this.x = 10;
        this.y = 10;
        this.volumes = ['sfx', 'ost'];
        this.volumeLabels = ['Sound Effects', 'Music'];
      }
    }, {
      key: "setupElements",
      value: function setupElements() {
        this.bars.volumes = {
          x: 6,
          y: 22,
          w: 64,
          h: 17,
          s: 15,
          n: 2,
          l: 1
        }; //this.bars.ost = {x:6, y:54, w:5, h:17, s:-1, n:16, l:16}
      } //*******************************************************************************************************************
      // * Create Sprites
      //*******************************************************************************************************************

    }, {
      key: "volumesBarSetupSprites",
      value: function volumesBarSetupSprites(sprites, rect, index) {
        sprites.rect = game.graphics.addRect(rect, 1, 2, 1);
        sprites.fill = game.graphics.addRect({
          x: rect.x + 1,
          y: rect.y + 1,
          w: 0,
          h: 0
        }, 2, 2, 1);
        sprites.icon = game.graphics.addText(rect.x, rect.y - 10, this.volumeLabels[index], 2);
      } //*******************************************************************************************************************
      // * Update Sprites
      //*******************************************************************************************************************

    }, {
      key: "volumesBarUpdateSprites",
      value: function volumesBarUpdateSprites(sprites, rect, index) {
        var type = this.volumes[index];
        var width = Math.ceil(game.audio[type + 'Volume'] * (rect.w - 2));
        game.graphics.redrawRect(sprites.fill, {
          x: 0,
          y: 0,
          w: width,
          h: rect.h - 2
        }, 2, 2, 1);
      } //*******************************************************************************************************************
      // * Input
      //*******************************************************************************************************************

    }, {
      key: "volumesBarClicked",
      value: function volumesBarClicked(index) {
        var type = this.volumes[index];
        var bar = this.bars.volumes;
        var x = bar.x + this.x;
        var y = this.getBarRectY(index, bar);
        var rect = {
          x: x + 1,
          y: y + 1,
          w: bar.w - 2,
          h: bar.h - 2
        };
        var percent = (game.input.mx - x) / rect.w;

        if (percent < 1 / 62) {
          percent = 0;
        }

        this[type + 'BarClicked'](percent);
      }
    }, {
      key: "sfxBarClicked",
      value: function sfxBarClicked(percent) {
        game.audio.setSfxVolume(percent);
        game.audio.playSfx('select');
      }
    }, {
      key: "ostBarClicked",
      value: function ostBarClicked(percent) {
        game.audio.setOstVolume(percent);
      } //*******************************************************************************************************************
      // * Tooltips
      //*******************************************************************************************************************
      //*******************************************************************************************************************
      // * Clickable
      //*******************************************************************************************************************

    }, {
      key: "volumesBarClickable",
      value: function volumesBarClickable(index) {
        return true;
      } //*******************************************************************************************************************
      // * Other
      //*******************************************************************************************************************

    }, {
      key: "placeholderLabelText",
      value: function placeholderLabelText() {
        return 'No settings, yet.';
      }
    }]);

    return PanelSettings;
  }(PanelBase);

  return PanelSettings;
});