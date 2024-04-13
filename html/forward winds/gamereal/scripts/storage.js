"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

define(['game', 'stats'], function (game, Stats) {
  //*******************************************************************************************************************
  // ** Storage Manager
  //*******************************************************************************************************************
  var Storage = /*#__PURE__*/function () {
    function Storage() {
      _classCallCheck(this, Storage);

      this.slot = 0;
      this.storedFiles = [null, null, null];
      this.refreshStoredFiles();
    } //*******************************************************************************************************************
    // * Save
    //*******************************************************************************************************************


    _createClass(Storage, [{
      key: "save",
      value: function save() {
        var saveData = {};
        this.saveCharacter(saveData);
        this.saveWorld(saveData);
        this.saveAlchemy(saveData);
        this.saveLoot(saveData);
        this.saveTips(saveData); // this.saveStatistics(saveData)

        this.applySave(saveData);
      }
    }, {
      key: "saveCharacter",
      value: function saveCharacter(saveData) {
        saveData.character = {};
        saveData.character.level = game.character.level;
        saveData.character.experience = game.character.experience;
        saveData.character.relicIndex = game.character.relicIndex;
        saveData.character.skills = game.character.skills.map(function (s) {
          return s.active;
        });
        saveData.character.relics = game.character.relics.map(function (r) {
          return r.available;
        });
        saveData.character.skillPoints = game.character.skillPoints;
        saveData.character.attributes = game.character.attributes;
        saveData.character.attributeStats = game.character.attributeStats.toJSON();
        saveData.character.potionStats = game.character.potionStats.map(function (s) {
          return s.toJSON();
        });
        saveData.character.items = game.character.items.map(function (i) {
          return i.toJSON();
        });
        saveData.character.equips = game.character.equips.map(function (i) {
          return i ? i.toJSON() : null;
        });
      }
    }, {
      key: "saveWorld",
      value: function saveWorld(saveData) {
        saveData.world = {};
        saveData.world.stageProgresses = game.world.stageProgresses;
      }
    }, {
      key: "saveAlchemy",
      value: function saveAlchemy(saveData) {
        saveData.alchemy = {};
        saveData.alchemy.liquid = game.alchemy.liquid;
        saveData.alchemy.level = game.alchemy.level;
      }
    }, {
      key: "saveLoot",
      value: function saveLoot(saveData) {
        saveData.loot = {};
        saveData.loot.highestLevelMonster = game.loot.highestLevelMonster;
        saveData.loot.unlockedItemTypes = game.loot.unlockedItemTypes;
      }
    }, {
      key: "saveTips",
      value: function saveTips(saveData) {
        saveData.tips = {};
        saveData.tips.tips = game.tips.tips.map(function (t) {
          return t.shown;
        });
      }
    }, {
      key: "saveStatistics",
      value: function saveStatistics(saveData) {
        saveData.statistics = {};
        saveData.statistics.deaths = game.statistics.deaths;
        saveData.statistics.timePlayed = game.statistics.timePlayed;
        saveData.statistics.monstersKilled = game.statistics.monstersKilled;
        saveData.statistics.worldsCleared = game.statistics.worldsCleared;
      }
    }, {
      key: "applySave",
      value: function applySave(saveData) {
        var json = JSON.stringify(saveData);
        var storeName = 'forwardwindsSavefile' + this.slot;
        window.localStorage.setItem(storeName, json);
      } //*******************************************************************************************************************
      // * Load
      //*******************************************************************************************************************

    }, {
      key: "load",
      value: function load() {
        var saveData = this.loadFromStorage();

        if (saveData) {
          this.loadCharacter(saveData);
          this.loadWorld(saveData);
          this.loadAlchemy(saveData);
          this.loadLoot(saveData);
          this.loadTips(saveData); // this.loadStatistics(saveData)
          // this.refreshPanels()

          game.character.rest();
        }
      }
    }, {
      key: "loadCharacter",
      value: function loadCharacter(saveData) {
        var attributeStatData = saveData.character.attributeStats || {};
        var potionStatData = saveData.character.potionStats || [];
        game.character.level = saveData.character.level || game.character.level;
        game.character.experience = saveData.character.experience === undefined ? game.character.experience : saveData.character.experience;
        game.character.relicIndex = saveData.character.relicIndex === undefined ? game.character.relicIndex : saveData.character.relicIndex;
        game.character.skillPoints = saveData.character.skillPoints === undefined ? game.character.skillPoints : saveData.character.skillPoints;
        game.character.attributes = saveData.character.attributes || game.character.attributes;
        game.character.attributeStats.addFromData(attributeStatData);
        potionStatData.forEach(function (data) {
          var stats = new Stats();
          stats.addFromData(data);
          game.character.potionStats.push(stats);
        });
        var skills = saveData.character.skills || [];
        var relics = saveData.character.relics || [];
        skills.forEach(function (s, i) {
          return game.character.skills[i].active = s;
        });
        relics.forEach(function (r, i) {
          return game.character.relics[i].available = r;
        });
        this.loadItems(saveData, 'items');
        this.loadItems(saveData, 'equips');
      }
    }, {
      key: "loadItems",
      value: function loadItems(saveData, location) {
        var items = saveData.character[location] || [];
        items.forEach(function (data, index) {
          if (data) {
            var item = null;

            if (data.potion) {
              item = game.loot.generateUsable(data.data, data.level);
              item.stats = new Stats();
              item.stats.addFromData(data.statData);
            } else {
              item = game.loot.generateItem(data.type, data.level, data.rarity);
            }

            game.character[location][index] = item;
          }
        });
      }
    }, {
      key: "loadWorld",
      value: function loadWorld(saveData) {
        game.world.stageProgresses = saveData.world.stageProgresses || game.world.stageProgresses;
      }
    }, {
      key: "loadAlchemy",
      value: function loadAlchemy(saveData) {
        game.alchemy.liquid = saveData.alchemy.liquid === undefined ? game.alchemy.liquid : saveData.alchemy.liquid;
        game.alchemy.level = saveData.alchemy.level || game.alchemy.level;
        game.alchemy.required = game.alchemy.calculateRequiredLiquid();
      }
    }, {
      key: "loadLoot",
      value: function loadLoot(saveData) {
        game.loot.highestLevelMonster = saveData.loot.highestLevelMonster || game.loot.highestLevelMonster;
        game.loot.unlockedItemTypes = saveData.loot.unlockedItemTypes || game.loot.unlockedItemTypes;
      }
    }, {
      key: "loadTips",
      value: function loadTips(saveData) {
        var tips = saveData.tips.tips || [];
        tips.forEach(function (t, i) {
          return game.tips.tips[i].shown = t;
        });
      }
    }, {
      key: "loadStatistics",
      value: function loadStatistics(saveData) {
        game.statistics.deaths = saveData.statistics.deaths || game.statistics.deaths;
        game.statistics.timePlayed = saveData.statistics.timePlayed || game.statistics.timePlayed;
        game.statistics.monstersKilled = saveData.statistics.monstersKilled || game.statistics.monstersKilled;
        game.statistics.worldsCleared = saveData.statistics.worldsCleared || game.statistics.worldsCleared;
      }
    }, {
      key: "loadFromStorage",
      value: function loadFromStorage() {
        var storeName = 'forwardwindsSavefile' + this.slot;
        var json = window.localStorage.getItem(storeName);
        var saveData = JSON.parse(json);
        return saveData;
      } //*******************************************************************************************************************
      // * Other
      //*******************************************************************************************************************
      // refreshPanels() {
      //   if (game.map.worldUnlocked(2)) {
      //     game.panels.activate(['Worlds'])
      //   }
      //   game.graphics.setBackground(game.map.world)
      // }

    }, {
      key: "refreshStoredFiles",
      value: function refreshStoredFiles() {
        this.storedFiles = this.storedFiles.map(function (f, i) {
          return window.localStorage.getItem('forwardwindsSavefile' + i);
        });
      }
    }, {
      key: "anythingSaved",
      value: function anythingSaved() {
        return this.storedFiles.find(function (f) {
          return f != null;
        });
      }
    }]);

    return Storage;
  }();

  return Storage;
});