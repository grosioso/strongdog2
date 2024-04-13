"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

define(['game', 'item', 'itemUsable'], function (game, Item, ItemUsable) {
  //*******************************************************************************************************************
  // ** The Loot (Item) Generator
  //*******************************************************************************************************************
  var Loot = /*#__PURE__*/function () {
    function Loot() {
      _classCallCheck(this, Loot);

      this.highestLevelMonster = 1;
      this.unlockedItemTypes = 3;
    }

    _createClass(Loot, [{
      key: "distributeEnemyLoot",
      value: function distributeEnemyLoot(enemy) {
        this.setHighestLevelMonster(enemy.level);

        for (var i = 0; i < Math.round(enemy.reward); i++) {
          var itemChance = Math.pow(0.75, Math.pow(game.world.itemsGained, 1.75));

          if (Math.random() < itemChance) {
            game.character.gainItem(game.loot.generateItemFromMonster());
            game.world.itemsGained += 1;
          }
        }
      }
    }, {
      key: "setHighestLevelMonster",
      value: function setHighestLevelMonster(level) {
        this.highestLevelMonster = Math.max(level, this.highestLevelMonster);
      }
    }, {
      key: "generateItemFromMonster",
      value: function generateItemFromMonster() {
        var level = this.monsterItemLevel();
        var type = this.rollType();
        var rarity = this.rollRarity();
        return this.generateItem(type, level, rarity);
      }
    }, {
      key: "generateShopItem",
      value: function generateShopItem(type) {
        var level = this.highestLevelMonster;
        type = type === null ? this.rollType() : type;
        var rarity = this.rollRarity();
        return this.generateItem(type, level, rarity);
      }
    }, {
      key: "generateItem",
      value: function generateItem(type, level, rarity) {
        var item = new Item(type, level, rarity);
        return item;
      }
    }, {
      key: "generateUsable",
      value: function generateUsable(data, level) {
        return new ItemUsable(data, level);
      } //*******************************************************************************************************************
      // * Other
      //*******************************************************************************************************************

    }, {
      key: "rollRarity",
      value: function rollRarity() {
        var rarityChances = [0.95, 0.85, 0.6, 0.35, 0];
        var rarityRoll = Math.random();
        var rarity = 4 - rarityChances.findIndex(function (r) {
          return rarityRoll >= r;
        });
        return rarity;
      }
    }, {
      key: "rollType",
      value: function rollType() {
        var type = Math.floor(Math.random() * this.unlockedItemTypes);

        if (type == 3 && Math.random() < 0.4) {
          type = Math.floor(Math.random() * (this.unlockedItemTypes - 1));
        }

        return type;
      }
    }, {
      key: "monsterItemLevel",
      value: function monsterItemLevel() {
        var level = this.highestLevelMonster;
        return level;
      }
    }, {
      key: "unlockItemType",
      value: function unlockItemType(type) {
        this.unlockedItemTypes = Math.max(this.unlockedItemTypes, type);
      }
    }]);

    return Loot;
  }();

  return Loot;
});