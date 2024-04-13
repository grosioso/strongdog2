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

define(['game', 'sat', 'action', 'dataActions'], function (game, SAT, Action, DataActions) {
  var objectID = 0; //*******************************************************************************************************************
  // ** A Base Entity
  //*******************************************************************************************************************

  var Entity = /*#__PURE__*/function () {
    function Entity(x, y) {
      var velocity = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
        x: 0,
        y: 0
      };

      _classCallCheck(this, Entity);

      this.x = x;
      this.y = y;
      this.velocity = velocity;
      this.camera = {};
      this.timers = {
        fade: 0
      };
      this.duration = 0;
      this.fadeTime = 0;
      this.destroyed = false;
      this.exploded = false;
      this.direction = 1;
      this.gravity = true;
      this.solid = true;
      this.jumping = false;
      this.redraw = false;
      this.sfx = '';
      this.size = 1;
      this.active = true;
      this.reactions = [];
      this.affectable = [];
      this.states = [];
      this.hitMods = null;
      this.frame = 'idle:0';
      this.objectID = objectID++;
      this.initializeShape();
      this.initializeBounds();
      this.initializeBoxes();
      this.updateGridPosition();
    }

    _createClass(Entity, [{
      key: "initializeShape",
      value: function initializeShape() {
        this.shape = new SAT.Polygon(new SAT.Vector(this.x, this.y), [new SAT.Vector(8, 8), new SAT.Vector(-8, 8), new SAT.Vector(-8, -8), new SAT.Vector(8, -8)]);
      }
    }, {
      key: "initializeBounds",
      value: function initializeBounds() {
        var _this = this;

        this.bounds = {
          up: 0,
          right: 0,
          down: 0,
          left: 0
        };
        this.shape.points.forEach(function (_ref) {
          var x = _ref.x,
              y = _ref.y;
          _this.bounds.down = Math.max(y, _this.bounds.down); // up is down

          _this.bounds.up = Math.min(y, _this.bounds.up); // down is up

          _this.bounds.right = Math.max(x, _this.bounds.right);
          _this.bounds.left = Math.min(x, _this.bounds.left);
        });
      }
    }, {
      key: "initializeBoxes",
      value: function initializeBoxes() {
        this.hitbox = new SAT.Polygon(new SAT.Vector(), []);
        this.atkbox = new SAT.Polygon(new SAT.Vector(), []);
      }
    }, {
      key: "update",
      value: function update() {
        this.updateGridPosition();
        this.updatePhysics();
        this.updateTimers();
        this.updateReactions();

        if (!this.stopped()) {
          this.updateSpecific();
          this.updateDuration();
        }

        this.updateMove();
      }
    }, {
      key: "updateTimers",
      value: function updateTimers() {
        var _this2 = this;

        Object.entries(this.timers).forEach(function (_ref2) {
          var _ref3 = _slicedToArray(_ref2, 2),
              name = _ref3[0],
              time = _ref3[1];

          return _this2.timers[name] = Math.max(time - 1, 0);
        });
      }
    }, {
      key: "updateReactions",
      value: function updateReactions() {
        this.reactions = this.reactions.filter(function (r) {
          return !r.done;
        });
        this.reactions.forEach(function (reaction) {
          reaction.update();
        });
      }
    }, {
      key: "updateDuration",
      value: function updateDuration() {
        this.duration += 1;
      }
    }, {
      key: "updateGridPosition",
      value: function updateGridPosition() {
        this.gridPosition = {
          x: Math.floor(this.x / 16),
          y: Math.floor(this.y / 16)
        };
      }
    }, {
      key: "updateMove",
      value: function updateMove() {
        if (!this.ice) {
          this.move(this.velocity.x, this.velocity.y);
        }
      }
    }, {
      key: "updateSpecific",
      value: function updateSpecific() {// For each subclass to extend
      }
    }, {
      key: "updatePhysics",
      value: function updatePhysics() {
        if (this.ice) {
          return;
        }

        if (Math.abs(this.velocity.x) < 0.3) {
          this.velocity.x = 0;
        }

        this.velocity.x = Math.max(Math.min(this.velocity.x, 64), -64);

        if (this.gravity) {
          this.velocity.y += 0.1;
        }

        if (this.onGround() && this.velocity.y > 0 && !this.timers.phasing) {
          this.velocity.y -= Math.min(this.velocity.y, 0.1);
        }
      }
    }, {
      key: "move",
      value: function move(x, y) {
        this.setPos(this.x + x, this.y + y);
      }
    }, {
      key: "setPos",
      value: function setPos(x, y) {
        this.x = x;
        this.y = y;
        this.shape.pos.x = this.x;
        this.shape.pos.y = this.y;
        this.refreshBoxes();
      }
    }, {
      key: "setVelocity",
      value: function setVelocity(velocity) {
        this.velocity = velocity;
      }
    }, {
      key: "refreshBoxes",
      value: function refreshBoxes() {
        this.refreshHitBox();
        this.refreshAtkBox();
      }
    }, {
      key: "refreshAtkBox",
      value: function refreshAtkBox() {
        var frameData = this.getFrameData();
        if (!frameData) debugger;

        if (frameData.atk) {
          var _frameData$atk = frameData.atk,
              w = _frameData$atk.w,
              h = _frameData$atk.h;
          this.atkbox.pos.x = this.x - Math.round(frameData.w / 2) * this.direction + (frameData.ox + frameData.atk.x) * this.direction;
          this.atkbox.pos.y = this.y - Math.round(frameData.h / 2) + frameData.oy + frameData.atk.y;

          if (this.direction == -1) {
            this.atkbox.pos.x -= w;
          }

          this.atkbox.setPoints([new SAT.Vector(w, h), new SAT.Vector(0, h), new SAT.Vector(0, 0), new SAT.Vector(w, 0)]);
        } else {
          this.atkbox.setPoints([]);
        }
      }
    }, {
      key: "refreshHitBox",
      value: function refreshHitBox() {
        if (this.constructor.name == 'Enemy' || this.constructor.name == 'Character') {
          var w = Math.round(this.bounds.left * 0.3);
          var h = Math.round(this.bounds.down * 1.0);
          this.hitbox.pos.x = this.x;
          this.hitbox.pos.y = this.y; // + Math.round(this.bounds.down * 0.2) (if h changes)

          if (this.hitbox.points.length == 0) {
            this.hitbox.setPoints([new SAT.Vector(w, h), new SAT.Vector(-w, h), new SAT.Vector(-w, -h), new SAT.Vector(w, -h)]);
          }
        }
      }
    }, {
      key: "haltMovement",
      value: function haltMovement(collidor) {
        var response = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
        var horizontalHalt = !response || response.overlapV.x;
        var verticalHalt = !response || response.overlapV.y;

        if (horizontalHalt) {
          this.velocity.x = 0;
        }

        if (verticalHalt) {
          this.velocity.y = 0;
          this.jumping = false;
        }
      }
    }, {
      key: "setAction",
      value: function setAction(name) {
        // Do all entities have actions?
        this.action = new Action(this, DataActions[name]);
      }
    }, {
      key: "addReaction",
      value: function addReaction(name) {
        var reaction = new Action(this, DataActions[name]);
        this.reactions.push(reaction);
      }
    }, {
      key: "hit",
      value: function hit(attacker) {
        this.haltMovement();
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.destroyed = true;
      }
    }, {
      key: "fade",
      value: function fade() {
        var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 30;
        this.timers.fade = time;
        this.fadeTime = time;
      }
    }, {
      key: "freeze",
      value: function freeze() {
        var duration = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Infinity;
        this.timers.freeze = duration;
      }
    }, {
      key: "playSfx",
      value: function playSfx(name) {
        this.sfx = name;
      }
    }, {
      key: "stopped",
      value: function stopped() {
        return this.destroyed || this.ice;
      }
    }, {
      key: "relevant",
      value: function relevant() {
        return this.stopped() && Object.values(this.timers).every(function (t) {
          return t == 0;
        });
      }
    }, {
      key: "inRange",
      value: function inRange(other) {
        var range = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
        var directional = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        var inRange = Math.abs(this.x - other.x) <= this.bounds.right + other.bounds.right + range;
        var horizontalMatch = Math.abs(this.y - other.y) <= this.bounds.down + other.bounds.down + 8;
        var otherRelevant = !other.fallen;
        var directionMatch = directional == false || (this.direction == 1 ? this.x < other.x : this.x > other.x);
        return inRange && horizontalMatch && otherRelevant && directionMatch;
      }
    }, {
      key: "onGround",
      value: function onGround() {
        var interactibles = game.character.swl ? {} : game.entities.interactibleTiles;
        var sx = Math.floor((this.x + this.bounds.left) / 16);
        var ex = Math.floor((this.x + this.bounds.right) / 16);
        var y = Math.floor((this.y + this.bounds.down) / 16);
        var ground = false;

        for (var x = sx; x <= ex; x++) {
          var tile = game.entities.tiles.getAt({
            x: x,
            y: y
          }) || interactibles['' + x + ',' + y];

          if (tile && !tile.passable) {
            if (Math.floor(tile.y - this.y) == Math.abs(tile.bounds.up + this.bounds.up)) {
              return true;
            }
          }
        }

        return false;
      }
    }, {
      key: "getFrameData",
      value: function getFrameData() {
        var frame = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

        if (this.image == undefined) {
          return {};
        }

        var frameData = game.graphics.getFrameData(this.image, frame || this.frame);
        return frameData;
      }
    }]);

    return Entity;
  }();

  return Entity;
});