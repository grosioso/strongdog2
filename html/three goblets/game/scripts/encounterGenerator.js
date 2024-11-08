"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

define(['encounter', 'monster', 'dataMonsters'], function (Encounter, Monster, DataMonsters) {
  //*******************************************************************************************************************
  // ** The Encounter Generator
  //*******************************************************************************************************************
  var EncounterGenerator = /*#__PURE__*/function () {
    function EncounterGenerator() {
      _classCallCheck(this, EncounterGenerator);
    }

    _createClass(EncounterGenerator, [{
      key: "setup",
      value: function setup(floor, data, level) {
        this.floor = floor;
        this.data = data;
        this.level = level;
        this.encounter = new Encounter(floor);
        this.monsters = [];
      }
    }, {
      key: "generate",
      value: function generate(floor, data, level) {
        this.setup(floor, data, level);
        this.generateMonsters();
        this.setStartingStates();
        this.setTimers();
        this.finalize();
        return this.encounter;
      }
    }, {
      key: "generateMonsters",
      value: function generateMonsters() {
        var custom = this.data;

        if (custom) {
          this.generateCustomMonsters(custom);
        } else {
          this.generateRandomMonsters();
        }
      }
    }, {
      key: "generateCustomMonsters",
      value: function generateCustomMonsters(custom) {
        var _this = this;

        custom.forEach(function (param, index) {
          var _this$monsters;

          var monsters = [];

          var insertAt = _this.getInsertPosition(param);

          if (typeof param == 'string') {
            var name = param;
            monsters = [new Monster(name)];
          } else if (param.a) {
            monsters = param.a.map(function (n) {
              return new Monster(n);
            });
          } else {
            monsters = _this.generatePseudorandom(param);
          }

          _this.applyMods(monsters, index);

          (_this$monsters = _this.monsters).splice.apply(_this$monsters, [insertAt, 0].concat(_toConsumableArray(monsters)));
        });
      }
    }, {
      key: "generatePseudorandom",
      value: function generatePseudorandom(param) {
        var monsters = [];
        var level = param.l;
        var count = param.n;
        level = this.level + (level - 1);

        for (var i = 0; i < count; i++) {
          var possible = this.getRandomPossibleMonsters(level);
          var name = possible[Math.floor(Math.random() * possible.length)];
          monsters.push(new Monster(name));
        }

        return monsters;
      }
    }, {
      key: "generateRandomMonsters",
      value: function generateRandomMonsters() {
        var count = this.getRandomMonsterCount();

        for (var i = 0; i < count; i++) {
          var level = this.level + Math.floor(this.floor / 3) * 2 + 1;
          var possible = this.getRandomPossibleMonsters(level);
          var name = possible[Math.floor(Math.random() * possible.length)];
          this.monsters.push(new Monster(name));
        }
      }
    }, {
      key: "getRandomMonsterCount",
      value: function getRandomMonsterCount() {
        var additional = [2, 5].includes(this.level) ? 1 : 0;
        return 2 + Math.floor(Math.random() * 2) + additional;
      }
    }, {
      key: "getRandomPossibleMonsters",
      value: function getRandomPossibleMonsters(level) {
        var entries = Object.entries(DataMonsters);
        var possible = entries.filter(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2),
              n = _ref2[0],
              m = _ref2[1];

          return m.level == level && !m.unique;
        });

        if (possible.length == 0) {
          var closest = entries.slice().sort(function (_ref3, _ref4) {
            var _ref5 = _slicedToArray(_ref3, 2),
                an = _ref5[0],
                a = _ref5[1];

            var _ref6 = _slicedToArray(_ref4, 2),
                bn = _ref6[0],
                b = _ref6[1];

            return Math.abs(a.level - level) - Math.abs(b.level - level);
          });
          possible = closest.filter(function (_ref7) {
            var _ref8 = _slicedToArray(_ref7, 2),
                n = _ref8[0],
                m = _ref8[1];

            return !m.unique;
          }).slice(0, 2);
        }

        possible = possible.map(function (_ref9) {
          var _ref10 = _slicedToArray(_ref9, 2),
              n = _ref10[0],
              m = _ref10[1];

          return n;
        });
        return possible;
      }
    }, {
      key: "applyMods",
      value: function applyMods(monsters, index) {
        var mod = this.data[index].m;

        if (mod) {
          var monster = monsters[Math.floor(Math.random() * monsters.length)];
          monster.applyMod(mod);
        }
      }
    }, {
      key: "setStartingStates",
      value: function setStartingStates() {
        this.monsters.forEach(function (m) {
          return m.setStartingStates();
        });
      }
    }, {
      key: "setTimers",
      value: function setTimers() {
        var _this2 = this;

        var alive = this.monsters.filter(function (m) {
          return m.hp > 0;
        });
        alive.forEach(function (monster) {
          monster.resetAttackTimer();
          monster.resetSecondaryTimer();

          if (_this2.floor > 0) {
            monster.timers.appear = 5;
          }
        });
      }
    }, {
      key: "finalize",
      value: function finalize() {
        this.encounter.monsters = this.monsters.slice();
        this.encounter.active = [null, null, null].concat(this.monsters);
        this.encounter.monsterCenter = 3 + this.monsters.length / 2;
      } //*******************************************************************************************************************
      // * Other
      //*******************************************************************************************************************

    }, {
      key: "parseMonsterData",
      value: function parseMonsterData(string) {
        var levelData = this.getMatch(string, /(.*)\s*\)/g);
        var countData = this.getMatch(string, /\)\s*([0-9\-]*)/g);
        var level = Number(levelData);
        var range = countData.split('-').map(function (s) {
          return Number(s);
        });
        var min = range[0];
        var max = range[1] || min;
        var count = min + Math.floor(Math.random() * (max - min + 1));
        return {
          level: level,
          count: count
        };
      }
    }, {
      key: "getMatch",
      value: function getMatch(string, regexp) {
        var matches = regexp.exec(string);
        return matches ? matches[1] : '';
      }
    }, {
      key: "getInsertPosition",
      value: function getInsertPosition(param) {
        if (param.i == 'r') {
          return Math.floor(Math.random() * this.monsters.length);
        } else {
          return param.i || this.monsters.length;
        }
      }
    }]);

    return EncounterGenerator;
  }();

  return EncounterGenerator;
});