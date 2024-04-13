"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

define(['game', 'tile', 'enemy', 'interactible', 'dataLayers'], function (game, Tile, Enemy, Interactible, DataLayers) {
  //*******************************************************************************************************************
  // ** Generator of World
  //*******************************************************************************************************************
  var WorldGenerator = /*#__PURE__*/function () {
    function WorldGenerator() {
      _classCallCheck(this, WorldGenerator);

      this.lastGeneratedEnemy = null;
      this.layer = 0;
      this.sortedLayers = [];
      this.mappedEntities = {};
      this.sortLayers();
    } //*******************************************************************************************************************
    // * Reset
    //*******************************************************************************************************************


    _createClass(WorldGenerator, [{
      key: "reset",
      value: function reset() {
        this.determineLayer();
        game.entities.setLayer(this.layer);
        this.resetEntities();
        this.resetProjectiles();
        this.resetCharacter();
      }
    }, {
      key: "resetCharacter",
      value: function resetCharacter() {
        game.character.reset();
      }
    }, {
      key: "resetEntities",
      value: function resetEntities() {
        var _this = this;

        var nonSummoned = game.entities.enemies.filter(function (e) {
          return !e.add;
        }); // let f2 = nonSummoned.find(e => e.id == 'f2')

        game.entities.enemies = nonSummoned;
        var sorted = this.sortedLayers[this.layer];
        sorted.forEach(function (entityData) {
          var entity = _this.mappedEntities[_this.layer][entityData.id];

          var properties = _this.parseProperties(entityData);

          var position = _this.getGridPosition(entityData, properties);

          if (properties.otherId) {
            var id = Math.random() < 0.5 ? entityData.name : properties.otherId;
            entity.idSetup(id);
          }

          var realPosition = _this.getRealPosition(position, entityData.type, properties);

          var oy = 8 - entity.bounds.down;
          entity.setPos(realPosition.x, realPosition.y + oy);
          entity.gridPosition = position;

          _this.fixHorizontalOverlap(entity);

          entity.reset(properties);
        });
      }
    }, {
      key: "resetProjectiles",
      value: function resetProjectiles() {
        game.entities.projectiles.forEach(function (p) {
          return p.destroyed = true;
        });
      } //*******************************************************************************************************************
      // * Generation
      //*******************************************************************************************************************

    }, {
      key: "generate",
      value: function generate() {
        for (var i = 0; i < 3; i++) {
          this.layer = i;
          game.entities.setLayer(this.layer);
          this.generateTerrain();
          this.generateEntities();
          this.resetEntities();
        }

        this.layer = 0;
        this.generateCharacterStart();
        game.entities.setLayer(this.layer);
      }
    }, {
      key: "generateCharacterStart",
      value: function generateCharacterStart() {
        var layer = game.world.data.layers[this.layer * 3 + 2];
        var charData = layer.objects.find(function (d) {
          return d.type == 'character';
        });
        var position = this.getGridPosition(charData, {});
        game.character.defaultPos = {
          x: position.x * 16 + 8,
          y: position.y * 16 + 4
        };
        game.character.setPos(game.character.defaultPos.x, game.character.defaultPos.y);
      }
    }, {
      key: "generateTerrain",
      value: function generateTerrain() {
        var tilemapData = this.parseTilemap(this.layer);
        tilemapData.forEach(function (data) {
          var _data = _slicedToArray(data, 4),
              x = _data[0],
              y = _data[1],
              i = _data[2],
              passable = _data[3];

          if (i > 1) {
            var tile = new Tile(x * 16 + 8, y * 16 + 8, i - 1, {
              x: x,
              y: y
            }, passable);
            game.entities.addTile(tile);
          }
        });
      }
    }, {
      key: "generateEntities",
      value: function generateEntities() {
        var _this2 = this;

        this.mappedEntities[this.layer] = {};
        var sorted = this.sortedLayers[this.layer];
        sorted.forEach(function (entityData) {
          var type = entityData.type;
          var id = entityData.name;

          var properties = _this2.parseProperties(entityData);

          var position = _this2.getGridPosition(entityData, properties);

          var realPosition = _this2.getRealPosition(position, type, properties);

          var constructor = {
            enemy: Enemy,
            interactible: Interactible
          }[type];
          var addFunction = {
            enemy: 'addEnemy',
            interactible: 'addInteractible'
          }[type];
          var entity = new constructor(realPosition.x, realPosition.y, id, position);

          _this2.fixHorizontalOverlap(entity);

          _this2.mappedEntities[_this2.layer][entityData.id] = entity;
          game.entities[addFunction](entity);
        });
      }
    }, {
      key: "getGridPosition",
      value: function getGridPosition(entityData, properties) {
        var x = Math.floor(entityData.x / 16);
        var y = Math.floor((entityData.y - 8) / 16);

        if (properties.xPositions) {
          var positions = properties.xPositions.split(',').map(function (p) {
            return Number(p);
          });
          x = positions[Math.floor(Math.random() * positions.length)];
        }

        return {
          x: x,
          y: y
        };
      }
    }, {
      key: "getRealPosition",
      value: function getRealPosition(gridPosition, type, properties) {
        var randomize = type == 'enemy';
        var xVariation = properties.xVariation === undefined ? 8 : properties.xVariation;
        var xOffset = properties.xOffset || 0;
        var yOffset = properties.yOffset || 0;
        var offset = (randomize ? 8 - xVariation + Math.floor(Math.random() * xVariation * 2) : 8) + xOffset;
        var x = gridPosition.x * 16 + offset;
        var y = 8 + gridPosition.y * 16 + yOffset;
        return {
          x: x,
          y: y
        };
      }
    }, {
      key: "fixHorizontalOverlap",
      value: function fixHorizontalOverlap(enemy) {
        if (this.lastGeneratedEnemy && this.lastGeneratedEnemy.gridPosition.y == enemy.gridPosition.y) {
          var fx = this.lastGeneratedEnemy.x + this.lastGeneratedEnemy.bounds.right + enemy.bounds.right;
          var x = Math.max(fx, enemy.x);
          enemy.setPos(x, enemy.y);
        }

        this.lastGeneratedEnemy = enemy;
      } //*******************************************************************************************************************
      // * Properties
      //*******************************************************************************************************************
      //*******************************************************************************************************************
      // * Other
      //*******************************************************************************************************************

    }, {
      key: "determineLayer",
      value: function determineLayer() {
        this.layer = game.character.agz ? 2 : game.character.pek ? 1 : 0;
        this.lastGeneratedEnemy = null;
      }
    }, {
      key: "sortLayers",
      value: function sortLayers() {
        for (var i = 0; i < 3; i++) {
          var layer = game.world.data.layers[i * 3 + 2];
          var sorted = layer.objects.filter(function (d) {
            return d.type != 'character';
          }).sort(function (a, b) {
            return a.y == b.y ? a.x - b.x : b.y - a.y;
          });
          this.sortedLayers[i] = sorted;
        }
      }
    }, {
      key: "parseTilemap",
      value: function parseTilemap(layer) {
        var worldData = game.world.data;
        var tileData = [];

        var _loop = function _loop(i) {
          var passable = i != 0;
          worldData.layers[layer * 3 + i].data.forEach(function (id, index) {
            if (id > 500) {
              debugger;
            }

            var x = index % worldData.width;
            var y = Math.floor(index / worldData.width);
            var data = [x, y, id, passable];
            tileData.push(data); //'' +  + ',' +  + ',' + id
          });
        };

        for (var i = 0; i < 2; i++) {
          _loop(i);
        }

        return tileData;
      }
    }, {
      key: "parseProperties",
      value: function parseProperties(data) {
        var properties = {};

        if (data.properties) {
          data.properties.forEach(function (propertyData) {
            properties[propertyData.name] = propertyData.value;
          });
        }

        return properties;
      }
    }]);

    return WorldGenerator;
  }();

  return WorldGenerator;
});