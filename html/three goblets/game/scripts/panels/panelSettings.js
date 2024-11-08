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

define(['game', 'panelBase'], function (game, PanelBase) {
  //*******************************************************************************************************************
  // ** The Settings Panel
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
      }
    }, {
      key: "setupElements",
      value: function setupElements() {
        //this.buttons.save = {x:47, y:4, w:64, h:14, text:'Save Game', e:true, v:true}
        this.bars.controlls = {
          x: 20,
          y: 16,
          w: 16,
          h: 16,
          s: 2,
          n: 2,
          l: 1
        };
        this.bars.soundVolume = {
          x: 37,
          y: 17,
          w: 5,
          h: 14,
          s: 0,
          n: 20,
          l: 20
        };
        this.bars.soundtrackVolume = {
          x: 37,
          y: 35,
          w: 5,
          h: 14,
          s: 0,
          n: 20,
          l: 20
        };
      } //*******************************************************************************************************************
      // * Create Sprites
      //*******************************************************************************************************************
      //*******************************************************************************************************************
      // * Create Sprites
      //*******************************************************************************************************************

    }, {
      key: "controllsBarSetupSprites",
      value: function controllsBarSetupSprites(sprites, rect, index) {
        var names = ['sound', 'soundtrack'];
        sprites.rect = game.graphics.addRect(rect, 0, 2);
        sprites.icon = game.graphics.addSprite(rect.x, rect.y, names[index] + 'Icon');
      }
    }, {
      key: "soundVolumeBarSetupSprites",
      value: function soundVolumeBarSetupSprites(sprites, rect, index) {
        sprites.border = game.graphics.addRect(rect, 0, 2);
        sprites.fill = game.graphics.addRect({
          x: rect.x + 1,
          y: rect.y + 1,
          w: rect.w - 2,
          h: rect.h - 2
        }, 1, 8);
      }
    }, {
      key: "soundtrackVolumeBarSetupSprites",
      value: function soundtrackVolumeBarSetupSprites(sprites, rect, index) {
        sprites.border = game.graphics.addRect(rect, 0, 2);
        sprites.fill = game.graphics.addRect({
          x: rect.x + 1,
          y: rect.y + 1,
          w: rect.w - 2,
          h: rect.h - 2
        }, 1, 8);
      } //*******************************************************************************************************************
      // * Update Sprites
      //*******************************************************************************************************************

    }, {
      key: "controllsBarUpdateSprites",
      value: function controllsBarUpdateSprites(sprites, rect, index) {
        var names = ['sound', 'soundtrack'];
        var enabled = game.audio[names[index] + 'Volume'] == 0 ? 'Disabled' : '';
        sprites.icon.texture = game.graphics.getTexture(names[index] + 'Icon' + enabled);
      }
    }, {
      key: "soundVolumeBarUpdateSprites",
      value: function soundVolumeBarUpdateSprites(sprites, rect, index) {
        var under = index * 0.05 <= game.audio.soundVolume && game.audio.soundVolume != 0;
        sprites.fill.visible = under;
      }
    }, {
      key: "soundtrackVolumeBarUpdateSprites",
      value: function soundtrackVolumeBarUpdateSprites(sprites, rect, index) {
        var under = index * 0.05 <= game.audio.soundtrackVolume && game.audio.soundtrackVolume != 0;
        sprites.fill.visible = under;
      } //*******************************************************************************************************************
      // * Input
      //*******************************************************************************************************************

    }, {
      key: "saveButtonClicked",
      value: function saveButtonClicked() {
        this.putDraggedItemDown();
        game.storage.save(game.storage.currentSlot);
        game.audio.playSound('select');
      }
    }, {
      key: "controllsBarClicked",
      value: function controllsBarClicked(index) {
        var name = ['sound', 'soundtrack'][index];
        var enabled = game.audio[name + 'Volume'] == 0;
        var volume = enabled ? game.config[name + 'Volume'] : 0;
        game.audio['set' + (name[0].toUpperCase() + name.substring(1)) + 'Volume'](volume);
      }
    }, {
      key: "soundVolumeBarClicked",
      value: function soundVolumeBarClicked(index) {
        game.audio.setSoundVolume(index * 0.05);
      }
    }, {
      key: "soundtrackVolumeBarClicked",
      value: function soundtrackVolumeBarClicked(index) {
        game.audio.setSoundtrackVolume(index * 0.05);
      } //*******************************************************************************************************************
      // * Other
      //*******************************************************************************************************************

    }, {
      key: "putDraggedItemDown",
      value: function putDraggedItemDown() {
        var dragged = this.getDraggedItem();

        if (dragged) {
          game.player.items.push(dragged);
          this.setDraggedItem(null);
        }
      }
    }]);

    return PanelSettings;
  }(PanelBase);

  return PanelSettings;
});