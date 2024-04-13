"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

define(['game', 'sat', 'stats', 'entity', 'dataEnemies', 'dataActions', 'action'], function (game, SAT, Stats, Entity, DataEnemies, DataActions, Action) {
  //*******************************************************************************************************************
  // ** An Enemy
  //*******************************************************************************************************************
  var Enemy = /*#__PURE__*/function (_Entity) {
    _inherits(Enemy, _Entity);

    var _super = _createSuper(Enemy);

    function Enemy(x, y, id, gridPosition) {
      var _this;

      _classCallCheck(this, Enemy);

      _this = _super.call(this, x, y);
      _this.gridPosition = gridPosition;
      _this.color = 3;

      _this.idSetup(id);

      return _this;
    }

    _createClass(Enemy, [{
      key: "idSetup",
      value: function idSetup(id) {
        this.id = id;
        this.stage = this.id.charCodeAt(0) - 97;
        this.data = DataEnemies[this.id];
        this.image = this.data.image;
        this.proportions = this.data.proportions;
        this.trigger = this.data.trigger;
        this.revive = this.data.revive;
        this.level = this.data.level || id;
        this.active = !this.data.trigger;
        this.moveSpeed = this.data.moveSpeed || 0;
        this.gravity = false;
        this.floating = this.data.floating || false;
        this.range = this.data.range || 0;
        this.projectile = this.data.projectile;
        this.actions = (this.data.actions || []).concat([this.image ? 'pngAttack' : 'basicAttack']);
        this.stageboss = this.data.stageboss || false;
        this.onDeath = this.data.onDeath;
        this.direction = -1;
        this.actionUses = {};
        this.revives = this.revive ? 1 : 0;
        this.struck = false;
        this.affectable = ['freeze'];
        this.frame = (this.active ? 'idle' : 'inactive') + ':0';
        this.initializeStats();
        this.refreshStats();
        this.adjustShape();
        this.hp = this.mhp;
      }
    }, {
      key: "initializeStats",
      value: function initializeStats() {
        this.baseStats = new Stats();
        this.baseStats.mhp = Math.floor((15 + 5 * Math.pow(this.level, 1.3) + 5 * Math.pow(1.2, this.level)) * (this.data.mhp || 1));
        this.baseStats.dmg = Math.floor((6 + 2 * Math.pow(this.level, 1.3) + 2 * Math.pow(1.2, this.level)) * (this.data.dmg || 1));
        this.baseStats.arm = Math.floor((4 + 3 * Math.pow(this.level, 1.3) + 3 * Math.pow(1.2, this.level)) * (this.data.arm || 1));
        this.experience = 12 + Math.floor(1 * this.level * (this.data.exp || 1) * Math.max((1 + this.data.mhp || 1) / 2, 1));
        this.reward = 1;
      }
    }, {
      key: "adjustShape",
      value: function adjustShape() {
        if (this.proportions) {
          var width = 16 * this.proportions.w / 100;
          var height = 16 * this.proportions.h / 100;
        } else if (this.image) {
          var width = this.getFrameData('idle:0').w;
          var height = this.getFrameData('idle:0').h;
        } else {
          console.assert(false, 'Enemy (' + this.id + ') has no image or proportions defined');
        }

        var horizontal = Math.round(width / 2);
        var vertical = Math.round(height / 2);
        this.shape = new SAT.Polygon(new SAT.Vector(this.x, this.y), [new SAT.Vector(horizontal, vertical), new SAT.Vector(-horizontal, vertical), new SAT.Vector(-horizontal, -vertical), new SAT.Vector(horizontal, -vertical)]);
        this.y += 8 - vertical;
        this.initializeBounds();
      }
    }, {
      key: "getShapePoints",
      value: function getShapePoints() {
        this.points = this.data.polygon || [[35, 35], [-35, 0], [35, -35]];
        return this.points.map(function (p) {
          return new SAT.Vector(p[0], p[1]);
        });
      }
    }, {
      key: "updateSpecific",
      value: function updateSpecific() {
        this.updateActiveness();
        this.updateAction();
        this.updateFloating();
        this.updateHealth();
      }
    }, {
      key: "updateActiveness",
      value: function updateActiveness() {
        var _this2 = this;

        var activationTypes = ['trigger', 'revive'];
        activationTypes.forEach(function (type) {
          if (!_this2.active && _this2[type]) {
            var _this2$type = _slicedToArray(_this2[type], 3),
                id = _this2$type[0],
                count = _this2$type[1],
                _this2$type$ = _this2$type[2],
                condition = _this2$type$ === void 0 ? 'default' : _this2$type$;

            var requiredEnemies = game.entities.enemies.filter(function (e) {
              return (e.id == id || id == 'any') && e[condition + 'Condition']();
            });

            if (requiredEnemies.length >= count && game.entities.collision.check(game.character.shape, _this2.shape).collided == false) {
              _this2[type + 'Activate']();
            }
          }
        });
      }
    }, {
      key: "updateAction",
      value: function updateAction() {
        var _this3 = this;

        if (this.active && !this.fallen) {
          this.actions.forEach(function (name) {
            if (DataActions[name].uses && _this3.actionUses[name] && _this3.actionUses[name] == DataActions[name].uses) {
              return;
            }

            var interrupt = DataActions[name].urgent && !(_this3.action && _this3.action.urgent) && (_this3.frame.includes('idle') || _this3.frame.includes('move'));

            if ((!_this3.action || _this3.action.done || interrupt) && DataActions[name].condition(game, _this3)) {
              _this3.action = new Action(_this3, DataActions[name]);
              _this3.actionUses[name] = _this3.actionUses[name] ? _this3.actionUses[name] + 1 : 1;
            }
          });

          if (this.action) {
            this.action.update();
          }
        }
      }
    }, {
      key: "updateFloating",
      value: function updateFloating() {
        if (this.active && this.floating) {
          this.timers.floating = this.timers.floating || 32;
          var vy = this.timers.floating - 1 < 8 || this.timers.floating - 1 >= 24 ? -0.1 : 0.1;
          this.velocity.y += vy;
        }
      }
    }, {
      key: "updateHealth",
      value: function updateHealth() {
        var regen = this.mhp * this.hpr / 100 / 60;
        this.hp = Math.min(this.hp + regen, this.mhp);
      }
    }, {
      key: "reset",
      value: function reset(properties) {
        this.direction = properties.direction || -1;
        this.stageboss = properties.stageboss || this.data.stageboss;
        this.active = !this.data.trigger;
        this.revives = this.data.revive ? 1 : 0;
        this.actionUses = {};
        this.struck = false;
        this.fallen = false;
        this.gravity = false;
        this.floating = this.data.floating || false;
        this.frame = (this.active ? 'idle' : 'inactive') + ':0';
        this.velocity = {
          x: 0,
          y: 0
        };
        this.states = [];
        this.destroyed = false;
        this.fadeTime = 0;
        this.action = null;
        this.reactions = [];
        this.refreshStats();
        this.hp = this.mhp;
      }
    }, {
      key: "triggerActivate",
      value: function triggerActivate() {
        var emergeAction = this.data.emergeAction;
        this.active = true;
        this.redraw = true;

        if (emergeAction) {
          this.action = new Action(this, DataActions[emergeAction]);
        } else {
          this.frame = 'idle:0';
        }
      }
    }, {
      key: "reviveActivate",
      value: function reviveActivate() {
        this.setAction(this.data.reviveAction || 'pngRise');
        this.active = true;
        this.redraw = true;
        this.fallen = false;
        this.hp = this.mhp;
      }
    }, {
      key: "setAction",
      value: function setAction(name) {
        this.action = new Action(this, DataActions[name]);
      } //*******************************************************************************************************************
      // * Damage Handling
      //*******************************************************************************************************************

    }, {
      key: "takeHit",
      value: function takeHit(collidor) {
        var arrow = collidor.constructor.name == 'Projectile' ? collidor : null;
        var attacker = arrow ? collidor.caster : collidor;
        var mods = arrow ? arrow.mods : attacker.hitMods;
        var damage = this.hitBaseDamage(arrow, attacker, mods);
        var leechMultiplier = this.leechMultiplier(arrow, attacker, mods);
        damage = mods.crit ? damage * attacker.crm / 100 : damage;
        damage = arrow ? damage * attacker.bpw / 100 : damage;
        attacker.hp = Math.min(attacker.hp + damage * attacker.lch / 100 * leechMultiplier, attacker.mhp);

        if (!arrow) {
          attacker.lastEnemyHit = this;
        }

        this.struck = true;
        game.audio.playSfx('attack');
        this.applyDamage(damage, attacker);
      }
    }, {
      key: "leechMultiplier",
      value: function leechMultiplier(arrow, attacker) {
        var mods = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

        if (arrow) {
          return 0;
        } else if (mods.crit || mods.bash) {
          return attacker.slm / 100;
        }

        return 1;
      }
    }, {
      key: "hitBaseDamage",
      value: function hitBaseDamage(arrow, attacker, mods) {
        var attackValue = mods.bash ? attacker.dmg + attacker.arm * 0.30 : attacker.dmg;

        if (arrow) {
          if (attacker.hnt) {
            attackValue = attacker.arm * 0.30;
          }

          if (attacker.arf) {
            attackValue += attacker.mhp * attacker.arf / 100;
          }
        }

        return attackValue - Math.floor(attackValue * 1 / Math.pow(2, attackValue / this.arm));
      }
    }, {
      key: "applyDamage",
      value: function applyDamage(damage, attacker) {
        if (this.fallen || this.hp == 0) {
          return;
        }

        this.hp = Math.max(this.hp - damage, 0);
        this.grantExperience(attacker, this.experience * Math.min(damage / this.mhp, 1));

        if (this.hp == 0) {
          if (this.revives > 0) {
            this.fall();
          } else {
            this.die();

            if (this.stageboss && game.world.stage == this.stage) {
              attacker.haltMovement();
              attacker.timers.relish = 135;
              game.audio.playSfx('fell');
            }
          }

          this.playSfx('enemyDestroyed');
          game.loot.distributeEnemyLoot(this);

          if (attacker.lastEnemyHit == this) {
            attacker.lastEnemyHit = null;
          }
        } else {
          this.playSfx('enemyHit');
        }
      }
    }, {
      key: "fall",
      value: function fall() {
        this.revives -= 1;
        this.action = null;
        this.fallen = true;
        this.addReaction(this.data.fallAction || 'pngFall');
      }
    }, {
      key: "die",
      value: function die() {
        game.world.makeProgress(this);

        if (this.onDeath) {
          this.fallen = true;
          this.addReaction(this.onDeath);
        } else {
          this.destroy();
          this.fade(10);
        }
      }
    }, {
      key: "grantExperience",
      value: function grantExperience(attacker, amount) {
        var multiplier = Math.pow(0.75, Math.max(attacker.level - this.level, 0));
        attacker.experience += multiplier * amount;
      } //*******************************************************************************************************************
      // * Conditions
      //*******************************************************************************************************************

    }, {
      key: "defaultCondition",
      value: function defaultCondition() {
        return this.struck || this.hp == 0;
      }
    }, {
      key: "damagedCondition",
      value: function damagedCondition() {
        return this.hp < this.mhp;
      }
    }, {
      key: "deadCondition",
      value: function deadCondition() {
        return this.hp == 0;
      }
    }, {
      key: "defeatedCondition",
      value: function defeatedCondition() {
        return this.hp == 0 && this.timers.fade == 0;
      }
    }, {
      key: "ressurectCondition",
      value: function ressurectCondition() {
        return this.timers.ressurect === 0 && !this.active;
      } //*******************************************************************************************************************
      // * Stats
      //*******************************************************************************************************************

    }, {
      key: "refreshStats",
      value: function refreshStats() {
        var _this4 = this;

        var stats = new Stats();
        var base = [this.baseStats];
        var state = this.stateStats();
        var all = base.concat(state);
        stats.append(all);

        var _final = stats["final"]();

        _final.forEach(function (s) {
          return _this4[s.name] = s.value;
        });
      }
    }, {
      key: "stateStats",
      value: function stateStats() {
        var stats = new Stats();
        this.states.forEach(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2),
              n = _ref2[0],
              d = _ref2[1];

          return stats.addFromData(d);
        });
        return [stats];
      }
    }]);

    return Enemy;
  }(Entity);

  return Enemy;
});