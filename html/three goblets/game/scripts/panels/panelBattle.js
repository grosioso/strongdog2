"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

define(['game', 'panelBase', 'battle', 'spritesetBattle'], function (game, PanelBase, Battle, SpritesetBattle) {
  //*******************************************************************************************************************
  // ** Battle Processing Panel
  //*******************************************************************************************************************
  var PanelBattle = /*#__PURE__*/function (_PanelBase) {
    _inherits(PanelBattle, _PanelBase);

    var _super = _createSuper(PanelBattle);

    function PanelBattle(position, active) {
      _classCallCheck(this, PanelBattle);

      return _super.call(this, position, active);
    }

    _createClass(PanelBattle, [{
      key: "initialize",
      value: function initialize() {
        _get(_getPrototypeOf(PanelBattle.prototype), "initialize", this).call(this);

        this.spacing = 5;
        this.origSpacing = 5;
        this.rects = [];
      }
    }, {
      key: "setupBattle",
      value: function setupBattle(area) {
        game.world.area = area;
        game.encounter = area.encounters[0];
        this.battle.autoTarget();
        this.battle.paused = false;
        game.audio.playSound('battle');
        game.storage.save();
      } //*******************************************************************************************************************
      // * Create Sprites
      //*******************************************************************************************************************

    }, {
      key: "setup",
      value: function setup() {
        this.initializeBattle();
        this.initializeSpriteset();
      }
    }, {
      key: "initializeBattle",
      value: function initializeBattle() {
        this.battle = new Battle();
      }
    }, {
      key: "initializeSpriteset",
      value: function initializeSpriteset() {
        this.spriteset = new SpritesetBattle(this.rects, this.battle);
      } //*******************************************************************************************************************
      // * Update
      //*******************************************************************************************************************

    }, {
      key: "update",
      value: function update() {
        this.updateInput();

        if (this.active) {
          this.updateBattle();
          this.updateRects();
          this.updateAddedMonsters();
          this.updateSpriteset();
          this.updateModTooltips();
        }
      }
    }, {
      key: "updateBattle",
      value: function updateBattle() {
        this.battle.update();
      }
    }, {
      key: "updateInput",
      value: function updateInput() {
        this.updateClickInput();
        this.updateTargetSelection();
        this.updateFreezeSelection();
        this.updateKeyboardInput();
      }
    }, {
      key: "updateClickInput",
      value: function updateClickInput() {
        if (game.input.mouseClicked && game.input.mouseWithin({
          x: 0,
          y: 0,
          w: 160,
          h: 144
        })) {
          if (this.battle.defeated || this.battle.victorious) {
            var showFin = this.shouldShowFin();

            if (this.battle.victorious) {
              game.world.unlockNext(game.world.area);
              game.audio.playSound('victory');
            } else if (this.battle.defeated) {
              game.statistics.submitDeaths();
              cmgAdBreak();
            }

            this.reset();

            if (showFin) {
              this.showFin(showFin);
            } else {
              game.panels.activate('Stats');
            }
          }
        }
      }
    }, {
      key: "updateTargetSelection",
      value: function updateTargetSelection() {
        var _this = this;

        if (game.input.mouseClicked && game.input.mouseWithin(this.rect)) {
          var alive = game.encounter.monsters.filter(function (m) {
            return m.hp > 0;
          });
          alive.forEach(function (monster) {
            var index = game.encounter.monsters.indexOf(monster);

            if (game.input.mouseWithin(_this.rects[index])) {
              var prevTarget = game.player.target;
              game.panels.hideTip();
              game.player.target = monster;

              _this.battle.superAttack(prevTarget);

              game.player.timers.click = 30;
              _this.battle.selecting = false;
              _this.battle.paused = false;
            }
          });
        }
      }
    }, {
      key: "updateFreezeSelection",
      value: function updateFreezeSelection() {
        var _this2 = this;

        if (game.input.rightDown && game.input.mouseWithin(this.rect) && !this.battle.defeated) {
          var alive = game.encounter.monsters.filter(function (m) {
            return m.hp > 0;
          });
          alive.forEach(function (monster) {
            var index = game.encounter.monsters.indexOf(monster);

            if (game.input.mouseWithin(_this2.rects[index])) {
              _this2.battle.superFreeze(monster);
            }
          });
        }
      }
    }, {
      key: "updateKeyboardInput",
      value: function updateKeyboardInput() {
        if (['p', 'P', ' '].find(function (k) {
          return game.input.key === k;
        }) && !(this.battle.defeated || this.battle.victorious)) {
          game.panels.hideTip();
          this.battle.paused = !this.battle.paused;
        }
      }
    }, {
      key: "reset",
      value: function reset() {
        this.monsterLength = 0;
        game.world.area.reset();
        game.player.reset();
        this.battle.reset();
        game.storage.save();
      }
    }, {
      key: "updateRects",
      value: function updateRects() {
        if (game.encounter.monstersChanged) {
          this.rects.length = 0;
          this.calculateSpacing();
          this.calculateStartRects();
          this.spriteset.refresh();
          game.encounter.monstersChanged = false;
        }
      }
    }, {
      key: "updateAddedMonsters",
      value: function updateAddedMonsters() {
        var summonCount = game.encounter.summonCount;

        if (summonCount > 0) {
          this.calculateSummonedRects();

          for (var i = 0; i < summonCount; i++) {
            var monster = game.encounter.monsters[game.encounter.monsters - (summonCount - i + 1)];
            this.spriteset.addMonster(monster);
          }
        }

        game.encounter.summonCount = 0;
      }
    }, {
      key: "updateSpriteset",
      value: function updateSpriteset() {
        this.spriteset.update();
      }
    }, {
      key: "updateModTooltips",
      value: function updateModTooltips() {
        var _this3 = this;

        if (this.battle.paused) {
          var active = game.encounter.getActive();
          active.forEach(function (monster) {
            var index = game.encounter.monsters.indexOf(monster);
            var monsterRect = _this3.rects[index];
            var rect = {
              x: monsterRect.x + Math.round(monsterRect.w / 2) - 8,
              y: 11,
              w: 16,
              h: 16
            };

            if (monster.mod && game.input.mouseWithin(rect)) {
              _this3.setTooltip(rect.x, rect.y, monster.modData.tooltip || '');
            }
          });
        }
      } //*******************************************************************************************************************
      // * Rect Calculations
      //*******************************************************************************************************************

    }, {
      key: "calculateStartRects",
      value: function calculateStartRects() {
        var _this4 = this;

        var ox = 0;
        var sx = this.calculateXStart();
        game.encounter.monsters.forEach(function (monster, index) {
          var size = game.graphics.getMonsterSize(monster.graphic);
          var x = Math.min(sx + ox, 155 - size.w);
          var y = 56 - size.h;
          var w = size.w;
          var h = size.h;
          _this4.rects[index] = {
            x: x,
            y: y,
            w: w,
            h: h
          };
          ox += size.w + _this4.origSpacing;
        });
      }
    }, {
      key: "calculateXStart",
      value: function calculateXStart() {
        var original = game.encounter.monsters.filter(function (m) {
          return !m.summoned;
        });
        var monsterWidths = original.reduce(function (t, m) {
          return t + game.graphics.getMonsterSize(m.graphic).w;
        }, 0);
        var offsetWidths = original.length * this.spacing - this.spacing;
        var totalWidth = monsterWidths + offsetWidths;
        var start = Math.max(80 - totalWidth / 2, 5);
        return Math.round(start);
      }
    }, {
      key: "calculateSummonedRects",
      value: function calculateSummonedRects() {
        var _this5 = this;

        var summonCount = game.encounter.summonCount;
        var summoned = game.encounter.monsters.filter(function (m) {
          return m.summoned;
        });
        summoned = summoned.slice(summoned.length - summonCount, summoned.length);
        summoned.forEach(function (monster) {
          var index = game.encounter.active.indexOf(monster);
          var nearestRight = game.encounter.getMonsterAt(index + 1);
          var nearestLeft = game.encounter.getMonsterAt(index - 1);
          var nearestIndexRight = game.encounter.monsters.indexOf(nearestRight);
          var nearestIndexLeft = game.encounter.monsters.indexOf(nearestLeft); //debugger

          var size = game.graphics.getMonsterSize(monster.graphic);
          var x = 0;

          if (nearestRight && _this5.rects[nearestIndexRight]) {
            x = _this5.rects[nearestIndexRight].x - size.w - _this5.spacing;
          } else if (nearestLeft && _this5.rects[nearestIndexLeft]) {
            x = _this5.rects[nearestIndexLeft].x + _this5.rects[nearestIndexLeft].w + _this5.spacing;
          } else {
            x = game.encounter.getActive().length % 2 == 0 ? Math.round(80 - size.w - _this5.spacing / 2) : Math.round(80 - size.w / 2);
          }

          x = Math.max(Math.min(x, 158 - size.w), 2);
          var y = 56 - size.h;
          var w = size.w;
          var h = size.h; //debugger

          _this5.rects.push({
            x: x,
            y: y,
            w: w,
            h: h
          });
        });
      }
    }, {
      key: "calculateSpacing",
      value: function calculateSpacing() {
        var monsterWidths = game.encounter.monsters.reduce(function (t, m) {
          return t + game.graphics.getMonsterSize(m.graphic).w;
        }, 0);
        var spacing = Math.round((154 - monsterWidths) / (game.encounter.monsters.length - 1));
        var origSpacing = Math.floor((150 - monsterWidths) / (game.encounter.monsters.length - 1));
        this.spacing = Math.min(spacing, 5);
        this.origSpacing = Math.min(origSpacing, 5);
      } //*******************************************************************************************************************
      // * Other
      //*******************************************************************************************************************

    }, {
      key: "deactivate",
      value: function deactivate() {
        _get(_getPrototypeOf(PanelBattle.prototype), "deactivate", this).call(this);

        this.spriteset.hide();
      }
    }, {
      key: "shouldShowFin",
      value: function shouldShowFin() {
        var fin = 0;

        if (this.battle.victorious) {
          if (game.world.finalArea() && !game.world.shownFin) {
            fin = 1;
          } else if (game.world.finalMap() && !game.world.shownSecondFin) {
            fin = 2;
          }
        }

        return fin;
      }
    }, {
      key: "showFin",
      value: function showFin(fin) {
        game.panels.activate('Fin');

        if (fin == 1) {
          game.world.shownFin = true;
        } else if (fin == 2) {
          game.world.shownSecondFin = true;
        }

        game.storage.save();
      }
    }]);

    return PanelBattle;
  }(PanelBase);

  return PanelBattle;
});