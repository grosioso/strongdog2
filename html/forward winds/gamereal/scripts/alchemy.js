"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

define(['game', 'dataPotions', 'itemUsable'], function (game, DataPotions, ItemUsable) {
  //*******************************************************************************************************************
  // ** The Alchemy System
  //*******************************************************************************************************************
  var Alchemy = /*#__PURE__*/function () {
    function Alchemy() {
      _classCallCheck(this, Alchemy);

      this.liquid = 0;
      this.level = 1;
      this.brewed = [];
      this.required = this.calculateRequiredLiquid();
    }

    _createClass(Alchemy, [{
      key: "smelt",
      value: function smelt(item) {
        game.character.items.splice(game.character.items.indexOf(item), 1);
        this.liquid += item.liquid();
      }
    }, {
      key: "brew",
      value: function brew() {
        var id = Math.min(this.level - 1, DataPotions.length - 1);
        var itemLevel = Math.ceil(this.level * 1.5);
        var datas = DataPotions[id];
        this.brewed = datas.map(function (d) {
          return game.loot.generateUsable(d, itemLevel);
        });

        if (this.brewed.length == 1) {
          this.takePotion(0);
        }
      }
    }, {
      key: "takePotion",
      value: function takePotion(index) {
        var potion = this.brewed[index];

        if (potion) {
          game.character.gainItem(potion);
          this.brewed = [];
          this.liquid = this.liquid - this.required;
          this.level = this.level + 1;
          this.required = this.calculateRequiredLiquid();
        }
      }
    }, {
      key: "canBrew",
      value: function canBrew() {
        return this.liquid >= this.required && this.brewed.length == 0;
      }
    }, {
      key: "calculateRequiredLiquid",
      value: function calculateRequiredLiquid() {
        return 27 * Math.pow(1.4, this.level * 1.5);
      }
    }, {
      key: "calculateBrewCount",
      value: function calculateBrewCount() {
        var count = 0;
        var liquid = this.liquid;
        var level = this.level;

        for (var i = 0; i < 3; i++) {
          var required = 27 * Math.pow(1.4, (level + i) * 1.5);

          if (liquid >= required) {
            liquid -= required;
            count += 1;
          }
        }

        return count;
      }
    }, {
      key: "respec",
      value: function respec() {
        var level = this.level - 1;

        for (var i = 0; i < level; i++) {
          this.level -= 1;
          this.liquid += this.calculateRequiredLiquid();
        }

        this.required = this.calculateRequiredLiquid();
      }
    }]);

    return Alchemy;
  }();

  return Alchemy;
});