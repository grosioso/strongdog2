"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

define(['game', 'collision', 'character', 'projectile', 'tiles', 'enemy'], function (game, Collision, Character, Projectile, Tiles, Enemy) {
  //*******************************************************************************************************************
  // ** All Entities involved in Combat
  //*******************************************************************************************************************
  var Entities = /*#__PURE__*/function () {
    function Entities() {
      _classCallCheck(this, Entities);

      this.collision = new Collision();
      this.character = new Character(0, 0);
      game.character = this.character;
      this.initializeLayers();
      this.setLayer(0);
    }

    _createClass(Entities, [{
      key: "initializeLayers",
      value: function initializeLayers() {
        this.layers = [{}, {}, {}];
        this.layers.forEach(function (layer) {
          layer.enemies = [];
          layer.projectiles = [];
          layer.interactibles = [];
          layer.interactibleTiles = {};
          layer.tiles = new Tiles(25, 25);
        });
      }
    }, {
      key: "setLayer",
      value: function setLayer(index) {
        var layer = this.layers[index];
        this.enemies = layer.enemies;
        this.projectiles = layer.projectiles;
        this.interactibles = layer.interactibles;
        this.interactibleTiles = layer.interactibleTiles;
        this.tiles = layer.tiles;
      }
    }, {
      key: "update",
      value: function update() {
        this.updateCharacter();
        this.updateEnemies();
        this.updateProjectiles();
        this.updateCollision();
        this.updateSoundEffects();
      }
    }, {
      key: "updateCharacter",
      value: function updateCharacter() {
        this.character.update();
      }
    }, {
      key: "updateEnemies",
      value: function updateEnemies() {
        this.enemies.forEach(function (e) {
          return e.update();
        });
      }
    }, {
      key: "updateProjectiles",
      value: function updateProjectiles() {
        this.projectiles.forEach(function (p) {
          return p.update();
        });
      }
    }, {
      key: "updateCollision",
      value: function updateCollision() {
        this.processCombatantCombatantCollision();
        this.processProjectileCombatantCollision();
        this.processProjectileTileCollision();
        this.processCombatantTileCollision();
        this.processPlayerInteractibleCollision();
      }
    }, {
      key: "updateSoundEffects",
      value: function updateSoundEffects() {
        this.all().forEach(function (entity) {
          if (entity.sfx) {
            game.audio.playSfx(entity.sfx);
            entity.sfx = '';
          }
        });
      } //*******************************************************************************************************************
      // * Collision
      //*******************************************************************************************************************

    }, {
      key: "processCombatantCombatantCollision",
      value: function processCombatantCombatantCollision() {
        var _this = this;

        var combatants = [this.character].concat(this.aliveEnemies());
        combatants.forEach(function (combatant) {
          var array1 = [combatant];
          var array2 = combatants.filter(function (e) {
            return e != combatant && Math.sqrt(Math.pow(e.x - combatant.x, 2) + Math.pow(e.y - combatant.y, 2)) < e.bounds.right + e.bounds.down + combatant.bounds.right + combatant.bounds.down;
          });
          var aCollide = 'hit';
          var bCollide = 'hit'; //let fadeAll = () => { this.fadeAll() }

          _this.collision.perform(array1, array2, aCollide, bCollide);
        });
      }
    }, {
      key: "processProjectileCombatantCollision",
      value: function processProjectileCombatantCollision() {
        var _this2 = this;

        var projectiles = this.relevantProjectiles();
        projectiles.forEach(function (projectile) {
          var array1 = [projectile];
          var array2 = projectile.caster.constructor.name == 'Enemy' ? [_this2.character] : _this2.aliveEnemies();
          var aCollide = 'hit';
          var bCollide = 'takeHit';
          var rects = {
            a: projectile.collisionMode,
            b: 'hitbox'
          };

          _this2.collision.perform(array1, array2, aCollide, bCollide, false, rects);
        });
      }
    }, {
      key: "processProjectileTileCollision",
      value: function processProjectileTileCollision() {
        var _this3 = this;

        var projectiles = this.relevantProjectiles();
        projectiles.forEach(function (projectile) {
          var array1 = [projectile];

          var array2 = _this3.getRelevantTiles(projectile);

          var aCollide = 'hit';
          var bCollide = null;

          _this3.collision.perform(array1, array2, aCollide, bCollide, false);
        });
      }
    }, {
      key: "processCombatantTileCollision",
      value: function processCombatantTileCollision() {
        var _this4 = this;

        var character = this.character.timers.phasing ? [] : [this.character];
        var combatants = character.concat(this.enemies);
        combatants.forEach(function (combatant) {
          var array1 = [combatant];

          var array2 = _this4.getRelevantTiles(combatant);

          var aCollide = null;
          var bCollide = null;

          _this4.collision.perform(array1, array2, aCollide, bCollide);
        });
      }
    }, {
      key: "processPlayerInteractibleCollision",
      value: function processPlayerInteractibleCollision() {
        var array1 = [this.character];
        var array2 = this.interactibles.filter(function (i) {
          return i.active;
        });
        var aCollide = null;
        var bCollide = 'trigger';
        this.collision.perform(array1, array2, aCollide, bCollide);
      }
    }, {
      key: "processAtkboxCombatantCollision",
      value: function processAtkboxCombatantCollision(entity) {
        var array1 = [entity];
        var array2 = entity.constructor.name == 'Character' ? this.aliveEnemies() : [this.character];
        var aCollide = null;
        var bCollide = 'takeHit';
        var rects = {
          a: 'atkbox',
          b: 'shape'
        };
        this.collision.perform(array1, array2, aCollide, bCollide, false, rects);
      } //*******************************************************************************************************************
      // * Misc
      //*******************************************************************************************************************

    }, {
      key: "fadeAll",
      value: function fadeAll() {
        if (this.character.hp <= 0) {
          this.allRelevant().forEach(function (entity) {
            if (!entity.timers.fade > 0) {
              entity.destroy();
              entity.fade();
            }
          });
          game.audio.stopOst();
        }
      } //*******************************************************************************************************************
      // * Getters
      //*******************************************************************************************************************

    }, {
      key: "addEnemy",
      value: function addEnemy(enemy) {
        this.enemies.push(enemy);
      }
    }, {
      key: "addTile",
      value: function addTile(tile) {
        this.tiles.push(tile);
      }
    }, {
      key: "addInteractible",
      value: function addInteractible(interactible) {
        this.interactibles.push(interactible);

        if (interactible.isTile) {
          this.interactibleTiles['' + Math.floor(interactible.x / 16) + ',' + Math.floor(interactible.y / 16) + ''] = interactible;
        }
      }
    }, {
      key: "addNewProjectile",
      value: function addNewProjectile(id, entity) {
        for (var i = 0; i < this.projectiles.length; i++) {
          var existing = this.projectiles[i];

          if (existing.destroyed) {
            existing.initialize(id, entity);
            return;
          }
        }

        var projectile = new Projectile(id, entity);
        this.projectiles.push(projectile);
      }
    }, {
      key: "addNewEnemy",
      value: function addNewEnemy(x, oy, id, summoned, summoner) {
        var enemy = new Enemy(x, 0, id, {
          x: 0,
          y: 0
        }, []);
        enemy.setPos(enemy.x, (this.character.gridPosition.y + 1) * 16 + enemy.bounds.up - oy);
        this.findFreeSpot(enemy);
        enemy.summoned = summoned;
        enemy.add = true;
        enemy.direction = enemy.x < this.character.x ? 1 : -1;

        if (enemy.data.spawnInactive !== true) {
          enemy.active = true;
          enemy.frame = 'spawn:0';
          enemy.image ? enemy.setAction('spawn') : ''; // Change after removing Non-PNG Enemies
        }

        enemy.summoner = summoner;
        this.addEnemy(enemy);
      }
    }, {
      key: "aliveEnemies",
      value: function aliveEnemies() {
        return this.enemies.filter(function (e) {
          return !e.destroyed && e.active && !e.fallen;
        });
      }
    }, {
      key: "relevantProjectiles",
      value: function relevantProjectiles() {
        return this.projectiles.filter(function (p) {
          return !p.destroyed && p.timers.linger == Infinity;
        });
      }
    }, {
      key: "allRelevant",
      value: function allRelevant() {
        var allRelevant = this.aliveEnemies().concat(this.relevantProjectiles()).concat([this.character]);
        return allRelevant;
      }
    }, {
      key: "all",
      value: function all() {
        var all = this.enemies.concat([this.character]);
        return all;
      }
    }, {
      key: "getRelevantTiles",
      value: function getRelevantTiles(combatant) {
        var relevant = [];
        var x = Math.round(combatant.x / 16);
        var y = Math.round(combatant.y / 16);

        for (var dx = -1; dx <= 1; dx++) {
          for (var dy = -1; dy <= 1; dy++) {
            var tile = this.tiles.getAt({
              x: x + dx,
              y: y + dy
            });

            if (tile && relevant.indexOf(tile) == -1 && !tile.passable) {
              relevant.push(tile);
            }
          }
        }

        return relevant;
      }
    }, {
      key: "firstAvailableCollumn",
      value: function firstAvailableCollumn() {
        var collumns = this.aliveEnemies().reduce(function (col, enemy) {
          col[enemy.gridPosition.x] = col[enemy.gridPosition.x] || [];
          col[enemy.gridPosition.x + 1] = col[enemy.gridPosition.x + 1] || [];
          col[enemy.gridPosition.x + 2] = col[enemy.gridPosition.x + 2] || [];
          col[enemy.gridPosition.x].push(enemy);
          return col;
        }, [[]]);
        collumns.sort(function (a, b) {
          return b.length - a.length;
        });
        return collumns.findIndex(function (c) {
          return c.length < 5;
        });
      }
    }, {
      key: "findFreeSpot",
      value: function findFreeSpot(entity) {
        var _this5 = this;

        var x = entity.x;
        var mdir = 0;
        var combatants = this.aliveEnemies().filter(function (e) {
          return e != entity && e.active;
        }).concat([this.character]).sort(function (a, b) {
          return Math.abs(a.x - entity.x) - Math.abs(b.x - entity.x);
        });
        combatants.forEach(function (combatant) {
          if (_this5.collision.check(combatant.shape, entity.shape).collided) {
            mdir = mdir || (entity.x < combatant.x ? -1 : 1);
            x = combatant.x + (combatant.bounds.right + entity.bounds.right) * mdir;
            entity.setPos(x, entity.y);
          }
        });
      }
    }]);

    return Entities;
  }();

  return Entities;
});