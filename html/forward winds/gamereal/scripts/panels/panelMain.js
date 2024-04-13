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
  // ** The Settings panel
  //*******************************************************************************************************************
  var PanelMain = /*#__PURE__*/function (_PanelBase) {
    _inherits(PanelMain, _PanelBase);

    var _super = _createSuper(PanelMain);

    function PanelMain(position, active) {
      _classCallCheck(this, PanelMain);

      return _super.call(this, position, active);
    }

    _createClass(PanelMain, [{
      key: "initialize",
      value: function initialize() {
        _get(_getPrototypeOf(PanelMain.prototype), "initialize", this).call(this);

        this.width = 60;
        this.height = 60;
        this.x = 58;
        this.y = 74;
        this.commands = [['new', 'START'], ['load', 'CONTINUE'], ['credits', 'CREDITS']];
        this.toggles = [['sfx', 'setSfxVolume'], ['ost', 'setOstVolume']];
        this.armorLinks = [['LIKE US!', 'https://www.facebook.com/ArmorGames'], ['MORE GAMES', 'https://armor.ag/MoreGames']];
      }
    }, {
      key: "setupElements",
      value: function setupElements() {
        this.bars.commands = {
          x: 6,
          y: 6,
          w: 48,
          h: 15,
          s: 1,
          n: 3,
          l: 1
        };
        this.bars.toggles = {
          x: -42,
          y: 38,
          w: 16,
          h: 16,
          s: 0,
          n: 2,
          l: 2
        };

        if (game.config.armorMode) {
          this.bars.armorLogo = {
            x: -58,
            y: -10,
            w: 16,
            h: 16,
            s: 0,
            n: 4,
            l: 2
          };
          this.bars.armorLinks = {
            x: -57,
            y: -36,
            w: 51,
            h: 13,
            s: -1,
            n: 2,
            l: 1
          };
        }

        if (game.config.adventaleWebsite) {
          this.bars.websiteLinks = {
            x: -57,
            y: 23,
            w: 51,
            h: 13,
            s: 0,
            n: 1,
            l: 1
          };
        }
      } //*******************************************************************************************************************
      // * Create Sprites
      //*******************************************************************************************************************

    }, {
      key: "commandsBarSetupSprites",
      value: function commandsBarSetupSprites(sprites, rect, index) {
        var _this$commands$index = _slicedToArray(this.commands[index], 2),
            command = _this$commands$index[0],
            text = _this$commands$index[1];

        sprites.rect = game.graphics.addRect(rect, 1, 2, 1);
        sprites.name = game.graphics.addText(rect.x + rect.w / 2, rect.y + 2, text);
        sprites.name.anchor.x = 0.5;
      }
    }, {
      key: "togglesBarSetupSprites",
      value: function togglesBarSetupSprites(sprites, rect, index) {
        sprites.back = game.graphics.addIcon(rect.x, rect.y, 219);
        sprites.icon = game.graphics.addIcon(rect.x, rect.y, 215 + index);
      }
    }, {
      key: "armorLogoBarSetupSprites",
      value: function armorLogoBarSetupSprites(sprites, rect, index) {
        var indices = [224, 225, 240, 241];
        sprites.icon = game.graphics.addIcon(rect.x, rect.y, indices[index]);
      }
    }, {
      key: "armorLinksBarSetupSprites",
      value: function armorLinksBarSetupSprites(sprites, rect, index) {
        var text = this.armorLinks[index][0];
        sprites.back = game.graphics.addRect(rect, 2, 3, 1);
        sprites.link = game.graphics.addText(rect.x + rect.w / 2, rect.y + 1, text);
        sprites.link.anchor.x = 0.5;
        sprites.link.font = '10px Munro3';
      }
    }, {
      key: "websiteLinksBarSetupSprites",
      value: function websiteLinksBarSetupSprites(sprites, rect, index) {
        sprites.back = game.graphics.addRect(rect, 2, 3, 1);
        sprites.filler = game.graphics.addRect({
          x: rect.x,
          y: rect.y + rect.h,
          w: rect.w,
          h: 3
        }, 3, null, 0);
        sprites.link = game.graphics.addText(rect.x + rect.w / 2, rect.y + 1, 'SUPPORT ME');
        sprites.link.anchor.x = 0.5;
        sprites.link.font = '10px Munro3';
      } //*******************************************************************************************************************
      // * Update Sprites
      //*******************************************************************************************************************

    }, {
      key: "commandsBarUpdateSprites",
      value: function commandsBarUpdateSprites(sprites, rect, index) {
        sprites.name.font = '10px Munro' + (this.commandEnabled(index) ? 3 : 2);
      }
    }, {
      key: "togglesBarUpdateSprites",
      value: function togglesBarUpdateSprites(sprites, rect, index) {
        var _this$toggles$index = _slicedToArray(this.toggles[index], 2),
            type = _this$toggles$index[0],
            functionName = _this$toggles$index[1];

        var currentVolume = game.audio[type + 'Volume'];
        var iconIndex = currentVolume == 0 ? 220 : 219;
        sprites.back.setIndex(iconIndex);
      }
    }, {
      key: "armorLogoBarUpdateSprites",
      value: function armorLogoBarUpdateSprites(sprites, rect, index) {}
    }, {
      key: "armorLinksBarUpdateSprites",
      value: function armorLinksBarUpdateSprites(sprites, rect, index) {}
    }, {
      key: "websiteLinksBarUpdateSprites",
      value: function websiteLinksBarUpdateSprites(sprites, rect, index) {} //*******************************************************************************************************************
      // * Input
      //*******************************************************************************************************************

    }, {
      key: "commandsBarClicked",
      value: function commandsBarClicked(index) {
        var _this$commands$index2 = _slicedToArray(this.commands[index], 2),
            command = _this$commands$index2[0],
            text = _this$commands$index2[1];

        if (this.commandEnabled(index)) {
          this[command + 'Clicked']();
          game.audio.playSfx('select');
          game.input.consumeClick();
        } else {
          game.audio.playSfx('buzzer');
        }
      }
    }, {
      key: "newClicked",
      value: function newClicked() {
        if (game.storage.anythingSaved()) {
          game.panels.activate(['Slots'], ['Main']);
          game.panels.all['Slots'].setCommand('new');
        } else {
          game.sceneManager.changeTo('Combat');
        }
      }
    }, {
      key: "loadClicked",
      value: function loadClicked() {
        game.panels.activate(['Slots'], ['Main']);
        game.panels.all['Slots'].setCommand('load');
      }
    }, {
      key: "creditsClicked",
      value: function creditsClicked() {
        game.panels.activate(['Credits'], ['Main']);
      }
    }, {
      key: "togglesBarClicked",
      value: function togglesBarClicked(index) {
        var _this$toggles$index2 = _slicedToArray(this.toggles[index], 2),
            type = _this$toggles$index2[0],
            functionName = _this$toggles$index2[1];

        var currentVolume = game.audio[type + 'Volume'];
        var newVolume = currentVolume == 0 ? game.config[type + 'DefaultVolume'] : 0;
        game.audio[functionName](newVolume);
      }
    }, {
      key: "armorLinksBarClicked",
      value: function armorLinksBarClicked(index) {
        var url = this.armorLinks[index][1];
        var win = window.open(url, '_blank');

        if (win) {
          win.focus();
        }
      }
    }, {
      key: "websiteLinksBarClicked",
      value: function websiteLinksBarClicked(index) {
        var win = window.open(game.config.adventaleWebsite, '_blank');

        if (win) {
          win.focus();
        }
      } //*******************************************************************************************************************
      // * Tooltips
      //*******************************************************************************************************************
      //*******************************************************************************************************************
      // * Clickable
      //*******************************************************************************************************************

    }, {
      key: "commandsBarClickable",
      value: function commandsBarClickable(index) {
        return this.commandEnabled(index);
      }
    }, {
      key: "togglesBarClickable",
      value: function togglesBarClickable(index) {
        return true;
      }
    }, {
      key: "armorLinksBarClickable",
      value: function armorLinksBarClickable(index) {
        return true;
      }
    }, {
      key: "websiteLinksBarClickable",
      value: function websiteLinksBarClickable(index) {
        return true;
      } //*******************************************************************************************************************
      // * Other
      //*******************************************************************************************************************

    }, {
      key: "commandEnabled",
      value: function commandEnabled(index) {
        switch (this.commands[index][0]) {
          case 'new':
            return true;
            break;

          case 'load':
            return game.storage.anythingSaved();
            break;

          case 'credits':
            return true;
            break;
        }
      }
    }]);

    return PanelMain;
  }(PanelBase);

  return PanelMain;
});