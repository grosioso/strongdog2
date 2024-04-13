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
  // ** The Items Panel
  //*******************************************************************************************************************
  var PanelItems = /*#__PURE__*/function (_PanelBase) {
    _inherits(PanelItems, _PanelBase);

    var _super = _createSuper(PanelItems);

    function PanelItems(position, active) {
      _classCallCheck(this, PanelItems);

      return _super.call(this, position, active);
    }

    _createClass(PanelItems, [{
      key: "initialize",
      value: function initialize() {
        _get(_getPrototypeOf(PanelItems.prototype), "initialize", this).call(this);

        this.width = 77;
        this.height = 86;
        this.x = 10;
        this.y = 10;
      }
    }, {
      key: "setupElements",
      value: function setupElements() {
        this.gauges.alchemy = {
          x: 6,
          y: 72,
          w: 65,
          h: 8,
          c1: 3,
          c2: 2
        };
        this.bars.brews = {
          x: 6,
          y: 72,
          w: 8,
          h: 8,
          s: 0,
          n: 3,
          l: 3
        };
        this.bars.equips = {
          x: 6,
          y: 6,
          w: 17,
          h: 17,
          s: -1,
          n: 4,
          l: 4
        };
        this.bars.potions = {
          x: 6,
          y: 22,
          w: 17,
          h: 17,
          s: -1,
          n: 4,
          l: 4
        };
        this.bars.items = {
          x: 6,
          y: 54,
          w: 17,
          h: 17,
          s: -1,
          n: 4,
          l: 4
        };
      } //*******************************************************************************************************************
      // * Create Sprites
      //*******************************************************************************************************************

    }, {
      key: "brewsBarSetupSprites",
      value: function brewsBarSetupSprites(sprites, rect, index) {
        sprites.icon = game.graphics.addIcon(rect.x, rect.y, 212);
      }
    }, {
      key: "equipsBarSetupSprites",
      value: function equipsBarSetupSprites(sprites, rect, index) {
        sprites.rect = game.graphics.addRect(rect, 1, 2);
        sprites.icon = game.graphics.addIcon(rect.x, rect.y, 0);
      }
    }, {
      key: "potionsBarSetupSprites",
      value: function potionsBarSetupSprites(sprites, rect, index) {
        sprites.back = game.graphics.addIcon(rect.x, rect.y + 1, 210);
        sprites.tick = game.graphics.addIcon(rect.x + 16, rect.y + 1, 211);
        sprites.icon = game.graphics.addIcon(rect.x, rect.y, 0);
      }
    }, {
      key: "itemsBarSetupSprites",
      value: function itemsBarSetupSprites(sprites, rect, index) {
        sprites.rect = game.graphics.addRect(rect, 1, 2);
        sprites.icon = game.graphics.addIcon(rect.x, rect.y, 0);
      } //*******************************************************************************************************************
      // * Update Sprites
      //*******************************************************************************************************************

    }, {
      key: "brewsBarUpdateSprites",
      value: function brewsBarUpdateSprites(sprites, rect, index) {
        var shown = game.alchemy.calculateBrewCount();
        sprites.icon.visible = index < shown;
      }
    }, {
      key: "equipsBarUpdateSprites",
      value: function equipsBarUpdateSprites(sprites, rect, index) {
        var slotUnlocked = index < game.loot.unlockedItemTypes;
        var item = game.character.equips[index];
        var icon = item ? item.icon : 0;
        sprites.icon.setIndex(icon);
        sprites.rect.visible = slotUnlocked;
      }
    }, {
      key: "potionsBarUpdateSprites",
      value: function potionsBarUpdateSprites(sprites, rect, index) {
        var slotVisible = index < game.alchemy.brewed.length;
        var item = game.alchemy.brewed[index];
        var icon = item ? item.icon : 0;
        sprites.icon.setIndex(icon);
        sprites.back.visible = slotVisible;
        sprites.tick.visible = slotVisible;
      }
    }, {
      key: "itemsBarUpdateSprites",
      value: function itemsBarUpdateSprites(sprites, rect, index) {
        var item = game.character.items[index];
        var icon = item ? item.icon : 0;
        sprites.icon.setIndex(icon);
      } //*******************************************************************************************************************
      // * Input
      //*******************************************************************************************************************

    }, {
      key: "equipsBarClicked",
      value: function equipsBarClicked(index) {
        var item = game.character.equips[index];

        if (item) {
          game.character.equips[index] = null;
          game.character.items.push(item);
          game.character.rest();
          game.audio.playSfx('switch');
        }
      }
    }, {
      key: "potionsBarClicked",
      value: function potionsBarClicked(index) {
        var item = game.alchemy.brewed[index];

        if (item) {
          game.alchemy.takePotion(index);
          game.audio.playSfx('select');
        }
      }
    }, {
      key: "itemsBarClicked",
      value: function itemsBarClicked(index) {
        var item = game.character.items[index];

        if (item) {
          item.potion ? this.useItem(item, index) : this.equipItem(item, index);
          game.character.rest();
        }
      }
    }, {
      key: "equipItem",
      value: function equipItem(item, index) {
        var equipped = game.character.equips.find(function (i) {
          return i && i.type === item.type;
        });

        if (equipped) {
          game.character.items.splice(index, 0, equipped);
        }

        game.character.equips[item.type] = item;
        game.character.items.splice(game.character.items.indexOf(item), 1);
        game.audio.playSfx('equip');
      }
    }, {
      key: "useItem",
      value: function useItem(item, index) {
        item.use();
        game.character.items.splice(game.character.items.indexOf(item), 1);
        game.audio.playSfx('brew');
      }
    }, {
      key: "itemsBarRightClicked",
      value: function itemsBarRightClicked(index) {
        var item = game.character.items[index];

        if (item && !item.potion) {
          game.alchemy.smelt(item);
          game.audio.playSfx('smelt');
        }
      }
    }, {
      key: "alchemyGaugeClicked",
      value: function alchemyGaugeClicked() {
        if (game.alchemy.canBrew()) {
          game.alchemy.brew();
          game.audio.playSfx('drink');
        } else {
          game.audio.playSfx('buzzer');
        }
      } //*******************************************************************************************************************
      // * Tooltips
      //*******************************************************************************************************************

    }, {
      key: "equipsBarUpdateTooltip",
      value: function equipsBarUpdateTooltip(rect, index) {
        var item = game.character.equips[index];

        if (item) {
          this.setTooltip(this.x + 6, rect.y + rect.h + 3, item.tooltip());
        }
      }
    }, {
      key: "potionsBarUpdateTooltip",
      value: function potionsBarUpdateTooltip(rect, index) {
        var item = game.alchemy.brewed[index];

        if (item) {
          this.setTooltip(this.x + 6, rect.y + rect.h - 1, item.tooltip());
        }
      }
    }, {
      key: "itemsBarUpdateTooltip",
      value: function itemsBarUpdateTooltip(rect, index) {
        var item = game.character.items[index];

        if (item) {
          var equipped = game.character.equips.find(function (i) {
            return i && i.type === item.type;
          });
          this.setTooltip(this.x + 6, rect.y - 16, item.tooltip(), 1);

          if (equipped && !item.potion) {
            var otherRect = {
              x: this.x + 2,
              y: this.y + 2,
              w: rect.w,
              h: rect.h
            };
            this.setTooltip(this.x + 6, rect.y - 28, equipped.tooltip());
          }
        }
      } //*******************************************************************************************************************
      // * Clickable
      //*******************************************************************************************************************

    }, {
      key: "equipsBarClickable",
      value: function equipsBarClickable(index) {
        return game.character.equips[index];
      }
    }, {
      key: "itemsBarClickable",
      value: function itemsBarClickable(index) {
        return game.character.items[index];
      }
    }, {
      key: "potionsBarClickable",
      value: function potionsBarClickable(index) {
        return game.alchemy.brewed[index];
      }
    }, {
      key: "alchemyGaugeClickable",
      value: function alchemyGaugeClickable() {
        return game.alchemy.canBrew();
      } //*******************************************************************************************************************
      // * Other
      //*******************************************************************************************************************

    }, {
      key: "alchemyGaugeValues",
      value: function alchemyGaugeValues() {
        var v1 = game.alchemy.required;
        var v2 = Math.min(game.alchemy.liquid, game.alchemy.required);
        return {
          v1: v1,
          v2: v2
        };
      }
    }]);

    return PanelItems;
  }(PanelBase);

  return PanelItems;
});