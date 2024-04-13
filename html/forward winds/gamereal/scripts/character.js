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

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

define(['game', 'sat', 'stats', 'entity', 'dataSkills', 'dataRelics', 'dataActions', 'action'], function (game, SAT, Stats, Entity, DataSkills, DataRelics, DataActions, Action) {
  //*******************************************************************************************************************
  // ** The Player's Character
  //*******************************************************************************************************************
  var Character = /*#__PURE__*/function (_Entity) {
    _inherits(Character, _Entity);

    var _super = _createSuper(Character);

    function Character(x, y) {
      var _this;

      _classCallCheck(this, Character);

      _this = _super.call(this, x, y);
      _this.image = 'char_m';
      _this.timers.wait = 0;
      _this.timers.phasing = 0;
      _this.timers.relish = 0;
      _this.collided = false;
      _this.defaultPos = {
        x: 0,
        y: 0
      };
      _this.level = 1;
      _this.experience = 0;
      _this.items = [];
      _this.equips = [];
      _this.attributes = [];
      _this.rage = 0;
      _this.lastEnemyHit = null;
      _this.skillPoints = 0;
      _this.relicIndex = 0;
      _this.affectable = ['guard'];
      _this.frame = 'idle:0';

      _this.adjustShape();

      _this.initializeStats();

      _this.initializeSkills();

      _this.initializeRelics();

      _this.rest();

      return _this;
    }

    _createClass(Character, [{
      key: "adjustShape",
      value: function adjustShape() {
        var horizontal = Math.floor(18 / 2);
        var vertical = Math.floor(24 / 2);
        this.shape = new SAT.Polygon(new SAT.Vector(this.x, this.y), [new SAT.Vector(horizontal, vertical), new SAT.Vector(-horizontal, vertical), new SAT.Vector(-horizontal, -vertical), new SAT.Vector(horizontal, -vertical)]);
        this.initializeBounds();
      }
    }, {
      key: "updateSpecific",
      value: function updateSpecific() {
        if (this.timers.wait == 0) {
          this.updateAction();
        }

        this.updateHealth();
        this.updateImmolation();
      }
    }, {
      key: "updateAction",
      value: function updateAction() {
        var _this2 = this;

        var walking = this.action && this.action.data == DataActions['autoWalk'].data;

        if ((!this.action || this.action.done || walking) && this.timers.relish == 0) {
          this.updateDirection();
          var actions = ['bashStrike', 'critStrike', 'jump', 'charAttack', 'jumpWalk', 'autoWalk'];
          actions.forEach(function (name) {
            if (DataActions[name].condition(game, _this2) && (!_this2.action || _this2.action.done || walking && name != 'autoWalk')) {
              _this2.action = new Action(_this2, DataActions[name]);
              walking = _this2.action.data == DataActions['autoWalk'].data;
            }
          });
        }

        if (this.action) {
          this.action.update();
        }
      }
    }, {
      key: "updateDirection",
      value: function updateDirection() {
        var _this3 = this;

        var dir = this.mir ? -1 : 1;
        var enemyBehind = game.entities.aliveEnemies().find(function (e) {
          return e.x * dir < _this3.x * dir && Math.abs(e.y - _this3.y) < 16 && Math.abs(e.x - _this3.x) < 96;
        });
        var currentEnemyDead = this.lastEnemyHit == null || this.lastEnemyHit.x * dir < this.x * dir;

        if (currentEnemyDead && enemyBehind) {
          dir *= -1;
        }

        this.direction = dir;
      }
    }, {
      key: "updateHealth",
      value: function updateHealth() {
        var regen = this.mhp * this.hpr / 100 / 60;
        this.hp = Math.min(this.hp + regen, this.mhp);
      }
    }, {
      key: "updateImmolation",
      value: function updateImmolation() {
        var _this4 = this;

        if (this.iml) {
          var distance = 50;
          var nearby = game.entities.aliveEnemies().filter(function (e) {
            return Math.abs(e.x - _this4.x) <= distance && Math.abs(e.y - _this4.y) <= distance;
          });
          nearby.forEach(function (enemy) {
            var freezeMultiplier = _this4.fbm && enemy.ice ? _this4.fbm : 1;
            var damage = _this4.mhp * _this4.iml / 100 / 60 * freezeMultiplier;
            enemy.applyDamage(damage, _this4);
          });
        }
      }
    }, {
      key: "takeHit",
      value: function takeHit(collidor) {
        var projectile = collidor.constructor.name == 'Projectile' ? collidor : null;
        var attacker = projectile ? projectile.caster : collidor;
        var mods = projectile ? projectile.mods : attacker.hitMods;
        var damage = attacker.dmg - Math.floor(attacker.dmg * 1 / Math.pow(2, attacker.dmg / this.arm));
        damage *= mods.dmgMulti !== undefined ? mods.dmgMulti : 1;
        damage *= this.abs ? 1 - this.abs / 100 : 1;

        if (mods.reaction) {
          this.addReaction(mods.reaction);
        }

        if (damage) {
          if (this.rag) {
            this.rage += this.rag;
            this.refreshStats();
          }

          game.audio.playSfx('hit');
        }

        if (mods.sfx) {
          game.audio.playSfx(mods.sfx);
        }

        this.hp = this.hp - damage; // attacker.hp = attacker.hp - damage // EXPERIMENTAL REFLECT

        if (this.hp <= 0 && !this.destroyed) {
          this.destroy();
          this.fade();
        }
      }
    }, {
      key: "reset",
      value: function reset() {
        this.action = null;
        this.reactions = [];
        this.frame = 'idle:0';
        this.setPos(this.defaultPos.x, this.defaultPos.y);
        this.velocity = {
          x: 0,
          y: 0
        };
        this.direction = this.mir ? -1 : 1;
        this.destroyed = false;
        this.fadeTime = 0;
        this.lastEnemyHit = null;
        this.states = [];
        this.rage = 0;
        this.gravity = true;
        this.rest(); //sink into abyss

        this.timers.phasing = this.ask ? 80 : 0;
        this.timers.wait = this.ask ? 120 : 0;
      }
    }, {
      key: "gainItem",
      value: function gainItem(item) {
        this.items.push(item);
      }
    }, {
      key: "gainRelic",
      value: function gainRelic(index) {
        index = index === undefined ? this.relicIndex + 1 : index;

        if (!this.relics[index].available) {
          this.relics[index].available = true;
          this.activateRelic(index);
        }
      }
    }, {
      key: "activateRelic",
      value: function activateRelic(index) {
        this.relicIndex = index;
        this.refreshStats();
        game.world.refreshStage();
      }
    }, {
      key: "levelUp",
      value: function levelUp(attributeIndex) {
        this.increaseAttribute(attributeIndex);
        this.rest();
        this.experience -= this.experienceForNextLevel();
        this.level += 1;
        this.skillPoints += this.level % 4 == 0 ? 1 : 0;
      } //*******************************************************************************************************************
      // * Stats
      //*******************************************************************************************************************

    }, {
      key: "initializeStats",
      value: function initializeStats() {
        this.baseStats = new Stats();
        this.attributeStats = new Stats();
        this.rageStats = new Stats();
        this.potionStats = [];
        this.baseStats.mhp = 25;
        this.baseStats.dmg = 8;
        this.baseStats.arm = 6;
        this.baseStats.crm = 150; // Crit Multiplier

        this.baseStats.slm = 100; // Special Leech Multiplier
      }
    }, {
      key: "initializeSkills",
      value: function initializeSkills() {
        var _this5 = this;

        this.skills = [];
        DataSkills.forEach(function (data) {
          var skill = {};
          skill.stats = new Stats();
          skill.stats.addFromData(data);
          skill.icon = data.icon;
          skill.tooltip = data.tooltip;
          skill.active = false;

          _this5.skills.push(skill);
        });
      }
    }, {
      key: "initializeRelics",
      value: function initializeRelics() {
        var _this6 = this;

        this.relics = [];
        DataRelics.forEach(function (data) {
          var relic = {};
          relic.stats = new Stats();
          relic.stats.addFromData(data);
          relic.icon = data.icon;
          relic.name = data.name;
          relic.enemyCount = data.enemyCount;
          relic.tooltip = data.tooltip;
          relic.available = false;

          _this6.relics.push(relic);
        });
        this.relics[0].available = true;
      }
    }, {
      key: "refreshStats",
      value: function refreshStats() {
        var _this7 = this;

        var stats = new Stats();
        var base = [this.baseStats];
        var attribute = [this.attributeStats];
        var potion = this.potionStats;
        var equip = this.equipStats();
        var skill = this.skillStats();
        var state = this.stateStats();
        var rage = this.getRageStats();
        var relic = this.relics[this.relicIndex].stats; //debugger

        var all = base.concat(equip).concat(attribute).concat(potion).concat(skill).concat(state).concat(relic).concat(rage);
        stats.append(all);

        var _final = stats["final"]();

        _final.forEach(function (s) {
          return _this7[s.name] = s.value;
        });
      }
    }, {
      key: "equipStats",
      value: function equipStats() {
        return this.equips.filter(function (e) {
          return e;
        }).map(function (e) {
          return e.stats;
        });
      }
    }, {
      key: "skillStats",
      value: function skillStats() {
        return this.skills.filter(function (s) {
          return s.active;
        }).map(function (s) {
          return s.stats;
        });
      }
    }, {
      key: "stateStats",
      value: function stateStats() {
        var _this8 = this;

        var stats = new Stats();
        this.states.forEach(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2),
              name = _ref2[0],
              data = _ref2[1];

          if (name == 'guard' && _this8.gbs) {
            var multiplier = _this8.gbs / 100;
            var modifiedData = {};
            modifiedData.multis = [['arm', data.multis[0][1]], ['lch', multiplier], ['hpr', multiplier]];
            stats.addFromData(modifiedData);
          } else {
            stats.addFromData(data);
          }
        });
        return [stats];
      }
    }, {
      key: "getRageStats",
      value: function getRageStats() {
        this.rageStats.multis.dmg[0] = 1 + this.rage * this.rag / 100;
        return [this.rageStats];
      }
    }, {
      key: "increaseAttribute",
      value: function increaseAttribute(index) {
        var _this9 = this;

        var bases = [['mhp', 5], ['dmg', 2], ['arm', 3]];
        this.attributes.push(index);
        this.attributeStats = new Stats();
        this.attributes.forEach(function (attribute, index) {
          var _bases$attribute = _slicedToArray(bases[attribute], 2),
              name = _bases$attribute[0],
              base = _bases$attribute[1];

          var formula = function formula(base, level) {
            return Math.floor(base * (1.5 * level + 0.8 * Math.pow(level, 1.3) + 0.8 * Math.pow(1.2, level)));
          };

          var value = formula(base, index + 1) - formula(base, index);
          _this9.attributeStats[name] += value;
        });
      }
    }, {
      key: "rest",
      value: function rest() {
        this.refreshStats();
        this.hp = this.mhp;
        this.freezes = this.frz;
        this.arrows = this.arr;
        this.guards = this.grd;
        this.experience = Math.ceil(this.experience);
      }
    }, {
      key: "respec",
      value: function respec() {
        var level = this.level - 1;

        for (var i = 0; i < level; i++) {
          this.level -= 1;
          this.experience += this.experienceForNextLevel();
        }

        this.attributes = [];
        this.attributeStats = new Stats();
        this.potionStats = [];
        this.skillPoints = 0;
        this.skills.forEach(function (s) {
          return s.active = false;
        });
        this.rest();
      }
    }, {
      key: "experienceForNextLevel",
      value: function experienceForNextLevel() {
        return 2 + this.level * 3 + Math.round(3 * Math.pow(this.level - 1, 1.5));
      }
    }, {
      key: "secondSkillPageAvailable",
      value: function secondSkillPageAvailable() {
        return this.level >= 24;
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.action = null;
        this.velocity = {
          x: 0,
          y: 0
        };

        _get(_getPrototypeOf(Character.prototype), "destroy", this).call(this);
      }
    }]);

    return Character;
  }(Entity);

  return Character;
});