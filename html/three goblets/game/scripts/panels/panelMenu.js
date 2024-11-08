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
  // ** The Menu Panel
  //*******************************************************************************************************************
  var PanelMenu = /*#__PURE__*/function (_PanelBase) {
    _inherits(PanelMenu, _PanelBase);

    var _super = _createSuper(PanelMenu);

    function PanelMenu(position, active) {
      _classCallCheck(this, PanelMenu);

      return _super.call(this, position, active);
    }

    _createClass(PanelMenu, [{
      key: "initialize",
      value: function initialize() {
        _get(_getPrototypeOf(PanelMenu.prototype), "initialize", this).call(this);

        this.commands = ['new', 'continue'];
      }
    }, {
      key: "setupElements",
      value: function setupElements() {
        this.bars.commands = {
          x: 47,
          y: 13,
          w: 64,
          h: 13,
          s: 1,
          n: 2,
          l: 1
        };
        this.bars.controlls = {
          x: 62,
          y: 41,
          w: 16,
          h: 16,
          s: 2,
          n: 2,
          l: 2
        };
      } //*******************************************************************************************************************
      // * Create Sprites
      //*******************************************************************************************************************

    }, {
      key: "commandsBarSetupSprites",
      value: function commandsBarSetupSprites(sprites, rect, index) {
        var texts = {
          "new": 'New Game',
          "continue": 'Continue'
        };
        var text = texts[this.commands[index]];
        var available = this.availableAt(index);
        sprites.rect = game.graphics.addRect(rect, 0, 2);
        sprites.text = game.graphics.addText(rect.x, rect.y, text);
        sprites.text.x = Math.round(rect.x + rect.w / 2 - sprites.text.width / 2);
        sprites.text.y = Math.round(rect.y + 1);
        sprites.text.tint = available ? 0xffffff : 0x4f4f4f;
      }
    }, {
      key: "controllsBarSetupSprites",
      value: function controllsBarSetupSprites(sprites, rect, index) {
        var names = ['sound', 'soundtrack'];
        sprites.rect = game.graphics.addRect(rect, 0, 2);
        sprites.icon = game.graphics.addSprite(rect.x, rect.y, names[index] + 'Icon');
      } //*******************************************************************************************************************
      // * Update Sprites
      //*******************************************************************************************************************

    }, {
      key: "commandsBarUpdateSprites",
      value: function commandsBarUpdateSprites(sprites, rect, index) {}
    }, {
      key: "controllsBarUpdateSprites",
      value: function controllsBarUpdateSprites(sprites, rect, index) {
        var names = ['sound', 'soundtrack'];
        var enabled = game.audio[names[index] + 'Volume'] == 0 ? 'Disabled' : '';
        sprites.icon.texture = game.graphics.getTexture(names[index] + 'Icon' + enabled);
      } //*******************************************************************************************************************
      // * Input
      //*******************************************************************************************************************

    }, {
      key: "commandsBarClicked",
      value: function commandsBarClicked(index) {
        var available = this.availableAt(index);

        if (available) {
          this[this.commands[index] + 'Clicked']();
        } else {
          game.audio.playSound('buzzer');
        }
      }
    }, {
      key: "newClicked",
      value: function newClicked() {
        var index = this.freeSlot();

        if (index !== undefined) {
          game.storage.setSlot(index);
          game.panels.activate('Battle');
          game.panels.activate('Inventory');
          game.audio.playSound('battle');
        } else {
          game.panels.activate('Slots');
          game.panels.all['Slots'].setMode('overwrite');
          game.input.mouseClicked = false;
          game.audio.playSound('select');
        }
      }
    }, {
      key: "continueClicked",
      value: function continueClicked() {
        game.panels.activate('Slots');
        game.panels.all['Slots'].setMode('load');
        game.input.mouseClicked = false;
        game.audio.playSound('select');
      }
    }, {
      key: "controllsBarClicked",
      value: function controllsBarClicked(index) {
        var name = ['sound', 'soundtrack'][index];
        var enabled = game.audio[name + 'Volume'] == 0;
        var volume = enabled ? game.config[name + 'Volume'] : 0;
        game.audio['set' + (name[0].toUpperCase() + name.substring(1)) + 'Volume'](volume);
      } //*******************************************************************************************************************
      // * Other
      //*******************************************************************************************************************

    }, {
      key: "availableAt",
      value: function availableAt(index) {
        return this[this.commands[index] + 'Available']();
      }
    }, {
      key: "newAvailable",
      value: function newAvailable() {
        return true;
      }
    }, {
      key: "continueAvailable",
      value: function continueAvailable() {
        var available = [0, 1, 2].find(function (i) {
          return game.storage.dataAtSlot(i);
        }) !== undefined;
        return available;
      }
    }, {
      key: "freeSlot",
      value: function freeSlot() {
        return [0, 1, 2].find(function (i) {
          return !game.storage.dataAtSlot(i);
        });
      }
    }]);

    return PanelMenu;
  }(PanelBase);

  return PanelMenu;
});