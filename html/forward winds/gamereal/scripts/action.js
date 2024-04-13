"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableRest(); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

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
  // ** Action
  //*******************************************************************************************************************
  var Action = /*#__PURE__*/function () {
    function Action(entity, actionData) {
      _classCallCheck(this, Action);

      this.entity = entity;
      this.data = actionData.data;
      this.urgent = actionData.urgent;
      this.user = entity;
      this.duration = 0;
      this.timers = {
        wait: 0
      };
      this.phase = 0;
      this.totalPhases = this.data.length;
      this.direction = 0;
      this.repeatCounts = this.data.map(function (data) {
        return 0;
      });
      this.hitTriggered = false;
      this.done = false;
    }

    _createClass(Action, [{
      key: "update",
      value: function update() {
        this.updateDuration();
        this.updateTimers();
        this.updateDone();

        while (this.timers.wait == 0 && !this.done) {
          this.updateProcess();
          this.updatePhase();
          this.updateDone();
        }
      }
    }, {
      key: "updatePhase",
      value: function updatePhase() {
        this.phase = this.phase + 1;
      }
    }, {
      key: "updateTimers",
      value: function updateTimers() {
        var _this = this;

        Object.entries(this.timers).forEach(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2),
              name = _ref2[0],
              time = _ref2[1];

          return _this.timers[name] = Math.max(time - 1, 0);
        });
      }
    }, {
      key: "updateProcess",
      value: function updateProcess() {
        var _this$data$this$phase = _toArray(this.data[this.phase]),
            process = _this$data$this$phase[0],
            params = _this$data$this$phase.slice(1);

        params = this.convertDynamicVariables(params);
        params = this.setAppropriateTarget(params);
        this[process].apply(this, _toConsumableArray(params));
      }
    }, {
      key: "updateDuration",
      value: function updateDuration() {
        this.duration += 1;
      }
    }, {
      key: "updateDone",
      value: function updateDone() {
        if (this.data[this.phase] === undefined && this.timers.wait == 0) {
          this.done = true;
        }
      } //*******************************************************************************************************************
      // * Processes
      //*******************************************************************************************************************

    }, {
      key: "wait",
      value: function wait(time) {
        this.timers.wait = time;
      }
    }, {
      key: "waitTo",
      value: function waitTo(duration) {
        this.timers.wait = duration - this.duration;
      }
    }, {
      key: "conditionalWait",
      value: function conditionalWait(time, condition) {
        if (!condition(game, this.entity)) {
          this.timers.wait = time;
        }
      }
    }, {
      key: "move",
      value: function move(dir, speed) {
        var direction = this.getDirection(dir);
        this.entity.velocity.x = speed * direction;
      }
    }, {
      key: "accelerate",
      value: function accelerate(dir, speed) {
        var direction = this.getDirection(dir);
        this.entity.velocity.x += speed * direction;
      }
    }, {
      key: "accelerateVertically",
      value: function accelerateVertically(acceleration) {
        this.entity.velocity.y += acceleration;
      }
    }, {
      key: "teleport",
      value: function teleport(x) {
        var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var ox = x * this.entity.direction;
        this.entity.move(ox, y);
      }
    }, {
      key: "teleportRelative",
      value: function teleportRelative(placement) {
        var x = this.getPlacement(placement);
        this.entity.move(x - this.entity.x, 0);
        game.entities.findFreeSpot(this.entity);
      }
    }, {
      key: "jump",
      value: function jump(speed) {
        this.entity.velocity.y = -speed;
      }
    }, {
      key: "descend",
      value: function descend(speed) {
        this.entity.velocity.y += speed;
      }
    }, {
      key: "setGravity",
      value: function setGravity(value) {
        this.entity.gravity = value;
      }
    }, {
      key: "setVariable",
      value: function setVariable(variable, value) {
        this.entity[variable] = value;
      }
    }, {
      key: "modifyVariable",
      value: function modifyVariable(variable, value) {
        this.entity[variable] += value;
      }
    }, {
      key: "setDirection",
      value: function setDirection(dir) {
        this.entity.direction = this.getDirection(dir);
      }
    }, {
      key: "setFrame",
      value: function setFrame(frame) {
        this.entity.frame = frame;
        this.entity.refreshBoxes();
      }
    }, {
      key: "advanceFrame",
      value: function advanceFrame() {
        var wrap = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 99;

        var _this$entity$frame$sp = this.entity.frame.split(':'),
            _this$entity$frame$sp2 = _slicedToArray(_this$entity$frame$sp, 2),
            anim = _this$entity$frame$sp2[0],
            index = _this$entity$frame$sp2[1];

        this.entity.frame = anim + ':' + (Number(index) + 1) % wrap;
        this.entity.refreshBoxes();
      }
    }, {
      key: "setAnim",
      value: function setAnim(anim) {
        var _this$entity$frame$sp3 = this.entity.frame.split(':'),
            _this$entity$frame$sp4 = _slicedToArray(_this$entity$frame$sp3, 2),
            currentAnim = _this$entity$frame$sp4[0],
            index = _this$entity$frame$sp4[1];

        if (anim != currentAnim) {
          this.entity.frame = anim + ':' + '0';
          this.entity.refreshBoxes();
        }
      }
    }, {
      key: "stun",
      value: function stun() {
        this.entity.lastEnemyHit = null;
        this.entity.frame = 'idle:0';
        this.entity.action = null;
      }
    }, {
      key: "setTimer",
      value: function setTimer(timer, amount) {
        this.entity.timers[timer] = amount;
      }
    }, {
      key: "performHit",
      value: function performHit() {
        var mods = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        if (!this.hitTriggered && this.entity.atkbox.points.length > 0) {
          this.entity.hitMods = mods;
          game.entities.processAtkboxCombatantCollision(this.entity);
          this.entity.hitMods = null;
          this.hitTriggered = true;
        }
      }
    }, {
      key: "resetHitTrigger",
      value: function resetHitTrigger() {
        this.hitTriggered = false;
      }
    }, {
      key: "generateProjectile",
      value: function generateProjectile(id) {
        game.entities.addNewProjectile(id, this.entity);
      }
    }, {
      key: "generateEnemy",
      value: function generateEnemy(id, placementParams) {
        var summoned = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
        var x = this.getPlacement(placementParams);
        var oy = placementParams.height || 0;
        game.entities.addNewEnemy(x, oy, id, summoned, this.user);
      }
    }, {
      key: "giveItem",
      value: function giveItem() {
        var count = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

        for (var i = 0; i < count; i++) {
          game.loot.distributeEnemyLoot(this.entity);
        }
      }
    }, {
      key: "setTrigger",
      value: function setTrigger(id, count) {
        var condition = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'default';
        this.entity.trigger = [id, count, condition];
      }
    }, {
      key: "addReaction",
      value: function addReaction(name) {
        this.entity.addReaction(name);
      }
    }, {
      key: "addState",
      value: function addState(state) {
        this.entity.states.push(state);
        this.entity.refreshStats();
      }
    }, {
      key: "removeState",
      value: function removeState(name) {
        var firstIndex = this.entity.states.findIndex(function (_ref3) {
          var _ref4 = _slicedToArray(_ref3, 2),
              n = _ref4[0],
              s = _ref4[1];

          return n == name;
        });

        if (firstIndex != -1) {
          this.entity.states.splice(firstIndex, 1);
        }

        this.entity.refreshStats();
      }
    }, {
      key: "deactivate",
      value: function deactivate() {
        this.entity.active = false;
        this.entity.frame = 'inactive:0';
        this.entity.redraw = true;
        game.character.lastEnemyHit = null;
      }
    }, {
      key: "repeatPhase",
      value: function repeatPhase(phase, count) {
        var _this2 = this;

        this.repeatCounts[this.phase] += 1;

        if (this.repeatCounts[this.phase] <= count - 1) {
          this.repeatCounts = this.repeatCounts.map(function (p, i) {
            return i < _this2.phase ? 0 : p;
          });
          this.phase = phase - 1;
        }
      }
    }, {
      key: "randomPhase",
      value: function randomPhase(phases) {
        this.phase = phases[Math.floor(Math.random() * phases.length)];
        this.timers.wait = this.data[this.phase][1];
        this.update();
      }
    }, {
      key: "selfDestruct",
      value: function selfDestruct() {
        this.entity.hp = 0;
        this.entity.destroy();
        this.entity.fade(10);
      }
    }, {
      key: "playSound",
      value: function playSound(name) {
        game.audio.playSfx(name);
      }
    }, {
      key: "resetReapats",
      value: function resetReapats() {
        this.repeatCounts.map(function (i) {
          return 0;
        });
      }
    }, {
      key: "perform",
      value: function perform(functionName) {
        this.entity[functionName]();
      }
    }, {
      key: "log",
      value: function log(func) {
        console.log(func(game, this));
      } //*******************************************************************************************************************
      // * Projectile
      //*******************************************************************************************************************

    }, {
      key: "switchProjectileMovement",
      value: function switchProjectileMovement(name, speed) {
        this.entity.movement = name;
        this.entity.speed = speed;
        this.entity.initializeMovement();
      } //*******************************************************************************************************************
      // * Combat
      //*******************************************************************************************************************

    }, {
      key: "combatSetupCamera",
      value: function combatSetupCamera(x, y) {
        game.combat.setupCamera(x, y);
      } //*******************************************************************************************************************
      // * Dynamic Variables
      //*******************************************************************************************************************

    }, {
      key: "convertDynamicVariables",
      value: function convertDynamicVariables(params) {
        var _this3 = this;

        var swapped = false;
        var newParams = params.map(function (param) {
          if (param["var"]) {
            swapped = true;

            var _param$var$split = param["var"].split(':'),
                _param$var$split2 = _slicedToArray(_param$var$split, 2),
                dyn = _param$var$split2[0],
                _param$var$split2$ = _param$var$split2[1],
                args = _param$var$split2$ === void 0 ? '' : _param$var$split2$;

            args = args.split(',');

            switch (dyn) {
              case 'ANIM_FRAMES':
                return game.graphics.getFrameCount(_this3.entity.image, args[0]) - 1 + (Number(args[1]) || 0);
                break;

              case 'IMPLICIT_PROJECTILE':
                return _this3.entity.projectile || 'seed';
                break;

              case 'ARROW_RECOVERY':
                return _this3.entity.are ? _this3.entity.arr : _this3.entity.arrows;
                break;

              case 'PLAYER_STAT':
                return _this3.entity[args[0]] || 0;
                break;

              case 'RAND_RANGE':
                return Number(args[0]) + Math.floor(Math.random() * (Number(args[1]) - Number(args[0])));
                break;

              case 'RAND_RANGE_FLOAT':
                return Number(args[0]) + Math.random() * (Number(args[1]) - Number(args[0]));
                break;
            }
          }

          return param;
        });
        return newParams;
      }
    }, {
      key: "setAppropriateTarget",
      value: function setAppropriateTarget(params) {
        var firstParam = params[0];

        if (typeof firstParam == 'string' && firstParam[0] == '@') {
          this.entity = this.getTarget(firstParam.substring(1));
          params.shift();
        } else {
          this.entity = this.user;
        }

        return params;
      } //*******************************************************************************************************************
      // * Direction
      //*******************************************************************************************************************

    }, {
      key: "getDirection",
      value: function getDirection(dir) {
        switch (dir) {
          case 'RIGHT':
            return 1;
            break;

          case 'LEFT':
            return -1;
            break;

          case 'FORWARD':
            return this.entity.direction;
            break;

          case 'BACKWARD':
            return -this.entity.direction;
            break;

          case 'TOWARDS_PLAYER':
            return Math.abs(game.character.x - this.entity.x) / (game.character.x - this.entity.x) || 0;
            break;

          case 'AWAY_FROM_PLAYER':
            return Math.abs(game.character.x - this.entity.x) / (game.character.x - this.entity.x) * -1 || 0;
            break;

          case 'PRESET':
            return this.direction;
            break;

          case 'FREE':
            return game.entities.aliveEnemies().filter(function (e) {
              return e.x < game.character.x && e.id != 'f1';
            }).length == 0 ? -1 : 1;
            break;

          case 'RANDOM':
            return [-1, 1][Math.floor(Math.random() * [-1, 1].length)];
            break;
          //case 'AUTO': return this.getAutoDirection(); break;
        }
      } //*******************************************************************************************************************
      // * Placement Position
      //*******************************************************************************************************************

    }, {
      key: "getPlacement",
      value: function getPlacement(params) {
        var x = 0;
        var dir = params.dir,
            relative = params.relative,
            distance = params.distance;
        dir = this.getDirection(dir);

        switch (relative) {
          case 'SELF':
            x = this.entity.x + dir * distance;
            break;

          case 'PLAYER':
            x = game.character.x + dir * distance; // let viableEnemies = game.entities.aliveEnemies().filter(e => (e.x - game.character.x) * dir > 0 && Math.abs(e.y - game.character.y) <= 16)
            // let farthestEnemy = viableEnemies.sort((a, b) => b.x * dir - a.x * dir)[0]
            // let fd = farthestEnemy ? Math.abs(farthestEnemy.x - game.character.x) + farthestEnemy.bounds.right * 3 : 0
            // x = game.character.x + dir * Math.max(distance, fd);

            break;
        }

        return x;
      } //*******************************************************************************************************************
      // * Target Choosing
      //*******************************************************************************************************************

    }, {
      key: "getTarget",
      value: function getTarget(term) {
        switch (term) {
          case 'SUMMONER':
            return this.user.summoner;
            break;

          case 'CHARACTER':
            return game.character;
            break;
        }
      }
    }]);

    return Action;
  }();

  return Action;
});