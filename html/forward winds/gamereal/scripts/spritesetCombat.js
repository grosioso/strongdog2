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

define(['game'], function (game) {
  //*******************************************************************************************************************
  // ** Drawing all the sprites in the scene
  //*******************************************************************************************************************
  var SpritesetCombat = /*#__PURE__*/function () {
    function SpritesetCombat() {
      _classCallCheck(this, SpritesetCombat);

      this.entities = {};
      this.tiles = {};
      this.healthBars = {};
      this.hudIcons = [];
      this.pauseHeader = null;
      this.background = null;
    }

    _createClass(SpritesetCombat, [{
      key: "reset",
      value: function reset() {
        this.entities = [];
        this.healthBars = {};
        this.hudIcons = [];
        this.pauseHeader = null;
        this.resetCamera();
      }
    }, {
      key: "resetCamera",
      value: function resetCamera() {
        var layers = ['base', 'entities'];
        layers.forEach(function (name) {
          game.graphics.layers[name].pivot.x = 0;
          game.graphics.layers[name].pivot.y = 0;
        });
      }
    }, {
      key: "setup",
      value: function setup() {
        this.reset();
        this.setupCharacterHealthBar();
        this.setupHudIcons();
        this.setupPauseHeader();
      }
    }, {
      key: "setupCharacterHealthBar",
      value: function setupCharacterHealthBar() {
        this.healthBars[game.character.objectID] = game.graphics.addHealthBar(0, 0, game.character);
      }
    }, {
      key: "setupPauseHeader",
      value: function setupPauseHeader() {
        this.pauseHeader = game.graphics.addPauseHeader(game.graphics.center.x, 12, game.combat);
      }
    }, {
      key: "setupHudIcons",
      value: function setupHudIcons() {
        var _this = this;

        var data = [['arrows', 'arr', 24], ['freezes', 'frz', 25], ['guards', 'grd', 26]];
        data.forEach(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 3),
              res = _ref2[0],
              stat = _ref2[1],
              icon = _ref2[2];

          if (game.character[res] > 0) {
            var x = 5 + Math.round(_this.hudIcons.length / 2) * (_this.hudIcons.length % 2 == 1 ? 1 : -1);
            var sprite = game.graphics.addIcon(x * 16, 128, icon);
            var counter = game.graphics.addIcon(x * 16, 128, 7);
            counter.visible = game.character[res] > 1 && game.character[stat] > 1;

            _this.hudIcons.push([res, stat, sprite, counter]);
          }
        });
      }
    }, {
      key: "update",
      value: function update() {
        this.updateEntities();
        this.updateTiles();
        this.updateCamera();
        this.updatePauseHeader();
        this.updateHealthBars();
        this.updateHudIcons(); //this.updateHitBoxes()
      }
    }, {
      key: "updateEntities",
      value: function updateEntities() {
        var _this2 = this;

        var entities = Array.prototype.concat.apply([], [game.entities.interactibles, game.entities.projectiles, game.entities.enemies, [game.entities.character]]);
        entities.forEach(function (entity, index) {
          var id = entity.objectID;
          var sprite = _this2.entities[id];

          if (sprite) {
            sprite.update();
          } else {
            if (entity.image) {
              sprite = game.graphics.addEntityPNG(entity.x, entity.y, entity);
            } else {
              sprite = game.graphics.addEntity(entity.x, entity.y, entity);
            }

            sprite.update();
            _this2.entities[id] = sprite;
          }
        });
      }
    }, {
      key: "updateTiles",
      value: function updateTiles() {
        var _this3 = this;

        game.entities.tiles.list.forEach(function (tile, index) {
          var id = tile.objectID;
          var sprite = _this3.tiles[id];

          if (sprite) {
            sprite.update();
          } else {
            sprite = game.graphics.addTile(tile.x, tile.y, tile);
            _this3.tiles[id] = sprite;
          }
        });
      }
    }, {
      key: "updateCamera",
      value: function updateCamera() {
        var layers = ['base', 'entities'];
        var world = game.world;
        var px = game.character.x - game.graphics.width / 2;
        var py = Math.max(game.character.y, game.character.jumping && game.character.jumping * 16 - 12) - game.graphics.height + 2 * 16 + 12;
        var cx = 0;
        var cy = 0;

        if (game.combat.camera) {
          if (game.combat.camera.returning) {
            game.combat.refreshReturningCamera(px, py);
          }

          cx = game.combat.camera.x;
          cy = game.combat.camera.y;

          if (game.combat.camera.returning && cx == px && cy == py) {
            game.combat.camera = null;
          }
        } else {
          cx = px;
          cy = py;
        }

        cx = Math.max(Math.min(cx, world.bounds.right - game.graphics.width), world.bounds.left);
        cy = Math.max(Math.min(cy, world.bounds.down - game.graphics.height), world.bounds.up);
        layers.forEach(function (name) {
          game.graphics.layers[name].pivot.x = Math.floor(cx);
          game.graphics.layers[name].pivot.y = Math.floor(cy);
        });
      }
    }, {
      key: "updatePauseHeader",
      value: function updatePauseHeader() {
        this.pauseHeader.update();
      }
    }, {
      key: "updateHealthBars",
      value: function updateHealthBars() {
        var _this4 = this;

        var combatants = Array.prototype.concat.apply([], [game.entities.enemies, [game.entities.character]]);
        combatants.forEach(function (combatant) {
          var id = combatant.objectID;
          var sprite = _this4.healthBars[id];

          if (sprite) {
            sprite.update();
          } else if (combatant.hp <= combatant.mhp) {
            sprite = game.graphics.addHealthBar(0, 0, combatant);
            sprite.update();
            _this4.healthBars[id] = sprite;
          }
        });
      }
    }, {
      key: "updateHudIcons",
      value: function updateHudIcons() {
        this.hudIcons.forEach(function (_ref3) {
          var _ref4 = _slicedToArray(_ref3, 4),
              res = _ref4[0],
              stat = _ref4[1],
              sprite = _ref4[2],
              counter = _ref4[3];

          sprite.visible = game.character[res] > 0;
          counter.setIndex(Math.min(game.character[res] + 7, 14));
          counter.visible = game.character[res] > 0 && game.character[stat] > 1;
        });
      }
    }, {
      key: "updateHitBoxes",
      value: function updateHitBoxes() {
        var _this5 = this;

        this.hitboxes = this.hitboxes || {};
        game.entities.enemies.concat([game.character]).forEach(function (combatant) {
          var id = combatant.objectID;
          var sprite = null;

          if (sprite = _this5.hitboxes[id]) {
            var box = combatant.hitbox;
            var ax = box.points.reduce(function (t, p) {
              return Math.min(p.x, t);
            }, 0);
            var ay = box.points.reduce(function (t, p) {
              return Math.min(p.y, t);
            }, 0);
            var aw = box.points.reduce(function (t, p) {
              return Math.max(p.x, t);
            }, 0);
            var ah = box.points.reduce(function (t, p) {
              return Math.max(p.y, t);
            }, 0);
            var rect = box.points.length > 0 ? {
              x: box.pos.x + ax,
              y: box.pos.y + ay,
              w: aw,
              h: ah
            } : {
              x: 0,
              y: 0,
              w: 0,
              h: 0
            }; //if (box.points.length > 0 && combatant.constructor.name == 'Character') debugger

            sprite.x = rect.x;
            sprite.y = rect.y;
            game.graphics.redrawRect(sprite, rect, 3, 3, 1, 'entities');
          } else {
            _this5.hitboxes[id] = game.graphics.addRect({
              x: 0,
              y: 0,
              w: 0,
              h: 0
            }, 3, 3, 1, 'entities');
          }
        });
      }
    }, {
      key: "dispose",
      value: function dispose() {
        Object.values(this.entities).forEach(function (e) {
          return e.destroy();
        });
        Object.values(this.tiles).forEach(function (t) {
          return t.visible = false;
        });
        this.hudIcons.forEach(function (_ref5) {
          var _ref6 = _slicedToArray(_ref5, 4),
              r = _ref6[0],
              m = _ref6[1],
              s = _ref6[2],
              s2 = _ref6[3];

          s.destroy();
          s2.destroy();
        });
        Object.values(this.healthBars).forEach(function (e) {
          return e.destroy();
        });
        this.pauseHeader.destroy();
        this.disposeBackground();
      }
    }, {
      key: "disposeBackground",
      value: function disposeBackground() {
        if (this.background) {
          this.background.destroy();
          this.background = null;
        }
      }
    }]);

    return SpritesetCombat;
  }();

  return SpritesetCombat;
});