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
  // ** The Settings panel
  //*******************************************************************************************************************
  var PanelSlots = /*#__PURE__*/function (_PanelBase) {
    _inherits(PanelSlots, _PanelBase);

    var _super = _createSuper(PanelSlots);

    function PanelSlots(position, active) {
      _classCallCheck(this, PanelSlots);

      return _super.call(this, position, active);
    }

    _createClass(PanelSlots, [{
      key: "initialize",
      value: function initialize() {
        _get(_getPrototypeOf(PanelSlots.prototype), "initialize", this).call(this);

        this.width = 60;
        this.height = 76;
        this.x = 58;
        this.y = 58;
        this.overwriteIndex = -1;
        this.command = null;
        this.dataSlots = [];
        this.refreshDataSlots();
      }
    }, {
      key: "setupElements",
      value: function setupElements() {
        this.bars.slots = {
          x: 6,
          y: 22,
          w: 48,
          h: 15,
          s: 1,
          n: 3,
          l: 1
        };
        this.bars.back = {
          x: 6,
          y: 6,
          w: 48,
          h: 11,
          s: 1,
          n: 1,
          l: 1
        };
        this.bars.overwrite = {
          x: 59,
          y: 10,
          w: 54,
          h: 32,
          s: 1,
          n: 1,
          l: 1,
          disabled: true
        };
        this.bars.confirm = {
          x: 71,
          y: 23,
          w: 14,
          h: 14,
          s: 2,
          n: 2,
          l: 2,
          disabled: true
        };
      } //*******************************************************************************************************************
      // * Create Sprites
      //*******************************************************************************************************************

    }, {
      key: "slotsBarSetupSprites",
      value: function slotsBarSetupSprites(sprites, rect, index) {
        sprites.rect = game.graphics.addRect(rect, 1, 2, 1);
        sprites.name = game.graphics.addText(rect.x + rect.w / 2, rect.y + 2, 'EMPTY');
        sprites.name.anchor.x = 0.5;
      }
    }, {
      key: "backBarSetupSprites",
      value: function backBarSetupSprites(sprites, rect, index) {
        sprites.rect = game.graphics.addRect(rect, 1, 2, 1);
        sprites.name = game.graphics.addText(rect.x + rect.w / 2, rect.y, 'BACK', 3);
        sprites.name.anchor.x = 0.5;
      }
    }, {
      key: "overwriteBarSetupSprites",
      value: function overwriteBarSetupSprites(sprites, rect, index) {
        sprites.rect = game.graphics.addRect(rect, 1, 0, 1);
        sprites.name = game.graphics.addText(rect.x + rect.w / 2, rect.y + 2, 'OVERWRITE?', 0);
        sprites.name.anchor.x = 0.5;
      }
    }, {
      key: "confirmBarSetupSprites",
      value: function confirmBarSetupSprites(sprites, rect, index) {
        sprites.icon = game.graphics.addIcon(rect.x, rect.y, 208 + index);
      } //*******************************************************************************************************************
      // * Update Sprites
      //*******************************************************************************************************************

    }, {
      key: "slotsBarUpdateSprites",
      value: function slotsBarUpdateSprites(sprites, rect, index) {
        var saveData = this.dataSlots[index];
        sprites.name.text = saveData ? 'LEVEL ' + saveData.character.level : 'EMPTY';
        sprites.name.font = '10px Munro' + (this.canUse(index) ? 3 : 2);
      }
    }, {
      key: "backBarUpdateSprites",
      value: function backBarUpdateSprites(sprites, rect, index) {// nothing to update
      }
    }, {
      key: "overwriteBarUpdateSprites",
      value: function overwriteBarUpdateSprites(sprites, rect, index) {
        sprites.rect.visible = this.overwriteIndex > -1;
        sprites.name.visible = this.overwriteIndex > -1;
      }
    }, {
      key: "confirmBarUpdateSprites",
      value: function confirmBarUpdateSprites(sprites, rect, index) {
        sprites.icon.visible = this.overwriteIndex > -1;
      } //*******************************************************************************************************************
      // * Input
      //*******************************************************************************************************************

    }, {
      key: "slotsBarClicked",
      value: function slotsBarClicked(index) {
        if (this.canUse(index)) {
          this[this.command + 'Clicked'](index);
          game.audio.playSfx('select');
        } else {
          game.audio.playSfx('buzzer');
        }
      }
    }, {
      key: "newClicked",
      value: function newClicked(index) {
        if (this.slotUsed(index)) {
          this.promptOverwrite(index);
        } else {
          game.storage.slot = index;
          game.sceneManager.changeTo('Combat');
        }
      }
    }, {
      key: "loadClicked",
      value: function loadClicked(index) {
        game.combat.paused = false;
        game.storage.slot = index;
        game.storage.load();
        game.sceneManager.changeTo('Gameover');
      }
    }, {
      key: "backBarClicked",
      value: function backBarClicked() {
        game.panels.activate(['Main'], ['Slots']);
        game.audio.playSfx('switch');
      }
    }, {
      key: "confirmBarClicked",
      value: function confirmBarClicked(index) {
        var options = ['confirm', 'cancel'];
        this[options[index] + 'Overwrite']();
      } //*******************************************************************************************************************
      // * Tooltips
      //*******************************************************************************************************************
      //*******************************************************************************************************************
      // * Clickable
      //*******************************************************************************************************************

    }, {
      key: "slotsBarClickable",
      value: function slotsBarClickable(index) {
        return this.canUse(index);
      }
    }, {
      key: "backBarClickable",
      value: function backBarClickable(index) {
        return true;
      }
    }, {
      key: "confirmBarClickable",
      value: function confirmBarClickable(index) {
        return true;
      } //*******************************************************************************************************************
      // * Overwrite
      //*******************************************************************************************************************

    }, {
      key: "promptOverwrite",
      value: function promptOverwrite(index) {
        this.overwriteIndex = index;
        this.bars.overwrite.disabled = false;
        this.bars.confirm.disabled = false;
      }
    }, {
      key: "confirmOverwrite",
      value: function confirmOverwrite() {
        game.storage.slot = this.overwriteIndex;
        game.storage.save();
        game.sceneManager.changeTo('Combat');
        game.audio.playSfx('select');
      }
    }, {
      key: "cancelOverwrite",
      value: function cancelOverwrite() {
        this.overwriteIndex = -1;
        this.bars.overwrite.disabled = true;
        this.bars.confirm.disabled = true;
        game.audio.playSfx('switch');
      } //*******************************************************************************************************************
      // * Other
      //*******************************************************************************************************************

    }, {
      key: "canUse",
      value: function canUse(index) {
        return this.slotUsed(index) || this.command == 'new';
      }
    }, {
      key: "slotUsed",
      value: function slotUsed(index) {
        return game.storage.storedFiles[index] !== null;
      }
    }, {
      key: "refreshDataSlots",
      value: function refreshDataSlots() {
        this.dataSlots = game.storage.storedFiles.map(function (s) {
          return s ? JSON.parse(s) : null;
        });
      }
    }, {
      key: "setCommand",
      value: function setCommand(command) {
        this.command = command;
      }
    }]);

    return PanelSlots;
  }(PanelBase);

  return PanelSlots;
});