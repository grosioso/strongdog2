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

define(['game', 'panels/panelCredits', 'panels/panelItems', 'panels/panelMain', 'panels/panelRelics', 'panels/panelSettings', 'panels/panelSkills', 'panels/panelSlots', 'panels/panelStats', 'panels/panelSwitcher'], function (game, PanelCredits, PanelItems, PanelMain, PanelRelics, PanelSettings, PanelSkills, PanelSlots, PanelStats, PanelSwitcher) {
  //*******************************************************************************************************************
  // ** Handles all the Panels
  //*******************************************************************************************************************
  var Panels = /*#__PURE__*/function () {
    function Panels() {
      _classCallCheck(this, Panels);

      this.all = {};
      this.switchers = {};
    }

    _createClass(Panels, [{
      key: "initializePanels",
      value: function initializePanels() {
        this.all['Skills'] = new PanelSkills(false);
        this.all['Credits'] = new PanelCredits(false);
        this.all['Main'] = new PanelMain(true);
        this.all['Items'] = new PanelItems(false);
        this.all['Relics'] = new PanelRelics(false);
        this.all['Settings'] = new PanelSettings(false);
        this.all['Slots'] = new PanelSlots(false);
        this.all['Stats'] = new PanelStats(false);
        this.all['Switcher'] = new PanelSwitcher(false);
      } //*******************************************************************************************************************
      // * Update
      //*******************************************************************************************************************

    }, {
      key: "update",
      value: function update() {
        if (game.config.cheats) {
          this.updateCheats();
        }

        this.updatePanels();
      }
    }, {
      key: "updateCheats",
      value: function updateCheats() {
        if (game.input.keyPressed('r')) {
          var times = game.input.keyDown('Shift') ? 10 : 1;

          for (var i = 0; i < times; i++) {
            game.character.baseStats.mhp += 5;
            game.character.baseStats.dmg += 2;
            game.character.baseStats.arm += 2;
            game.character.baseStats.multis.mhp.push(1.15);
            game.character.baseStats.multis.dmg.push(1.15);
            game.character.baseStats.multis.arm.push(1.15);
          }

          game.character.rest();
        }

        if (game.input.keyPressed('g')) {
          if (game.input.keyDown('shift')) {
            for (var _i = 0; _i < 3; _i++) {
              game.character.equips[_i] = game.loot.generateItem(_i, game.character.level, game.loot.rollRarity());
            } // while (game.alchemy.level <= Math.ceil(game.character.level * 2 / 3)) {
            //   game.loot.highestMonsterLevel = Math.round(game.alchemy.level * 1.3)
            //   let id = Math.min(game.alchemy.level - 1, 14)
            //   let potion = game.loot.generateUsable(id)
            //   game.alchemy.level = game.alchemy.level + 1
            //   if (potion) {
            //     potion.use()
            //   }
            // }


            game.character.rest();
          } else {
            var item = game.loot.generateItem(game.loot.rollType(), game.character.level, game.loot.rollRarity());
            game.character.gainItem(item);
          }
        }

        if (game.input.keyPressed('b')) {
          var _item = game.loot.generateItem(3, game.input.keyDown('shift') ? 1 : 60, game.loot.rollRarity());

          game.character.equips[3] = _item;
          game.character.rest();
          game.loot.unlockItemType(4);
        }

        if (game.input.keyPressed('i')) {
          game.character.experience += 100 + Math.round(game.character.experience * 0.1);
        }

        if (game.input.keyPressed('o')) {
          game.character.respec();
          game.alchemy.respec();
        }

        if (game.input.keyPressed('l')) {
          game.storage.load();

          if (game.scene.constructor.name == 'SceneCombat') {
            game.character.destroy();
            game.sceneManager.changeTo('Gameover');
          }

          game.combat.reset();
        }

        if (game.input.keyPressed('\`')) {
          if (game.scene.constructor.name == 'SceneCombat') {
            game.character.destroy();
            game.sceneManager.changeTo('Gameover');
          }

          game.combat.reset();
        } // if (game.input.key == 'k') {
        //   game.audio.soundtracks[0].seek(155)
        // }


        ;
        ['z', 'x', 'c'].forEach(function (key, index) {
          if (game.input.keyPressed(key)) {
            game.character.experience = game.character.experienceForNextLevel();
            game.character.levelUp(index);
          }
        });
        ['!', '@', '#', '$', '%', '^', '&', '*', '('].forEach(function (k, n) {
          if (game.input.keyPressed(k.toString())) {
            game.character.gainRelic(n);
            game.character.activateRelic(n);

            if (game.scene.constructor.name == 'SceneCombat') {
              game.character.destroy();
              game.sceneManager.changeTo('Gameover');
            }

            game.combat.reset();
          }
        });
      }
    }, {
      key: "updatePanels",
      value: function updatePanels() {
        var panels = Object.values(this.all);
        panels.forEach(function (panel) {
          if (panel.active) {
            panel.update();
          }
        });
      } //*******************************************************************************************************************
      // * Other
      //*******************************************************************************************************************

    }, {
      key: "activate",
      value: function activate(names) {
        var _this = this;

        var deactivate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
        deactivate.map(function (n) {
          return _this.all[n];
        }).forEach(function (p) {
          return p.deactivate();
        });
        names.map(function (n) {
          return _this.all[n];
        }).forEach(function (panel) {
          panel.activate();
          panel.refresh();
        });
      }
    }, {
      key: "deactivate",
      value: function deactivate(names) {
        var _this2 = this;

        names.map(function (n) {
          return _this2.all[n];
        }).forEach(function (p) {
          return p.deactivate();
        });
      }
    }, {
      key: "isActive",
      value: function isActive(name) {
        return this.all[name].active;
      }
    }, {
      key: "getActiveName",
      value: function getActiveName(position) {
        var _this3 = this;

        var active = Object.entries(this.all).find(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2),
              n = _ref2[0],
              p = _ref2[1];

          return p.position == position && _this3.isActive(n);
        });
        var name = active ? active[0] : '';
        return name;
      }
    }, {
      key: "getPanel",
      value: function getPanel(name) {
        return this.all[name];
      }
    }, {
      key: "showTip",
      value: function showTip(tip) {
        this.all['Battle'].battle.paused = true;
        this.all['Tip'].setTip(tip, this.getActiveName(tip.position));
        this.activate('Tip');
      }
    }, {
      key: "hideTip",
      value: function hideTip() {
        if (this.isActive('Tip')) {
          this.activate(this.all['Tip'].prevActive);
        }
      }
    }]);

    return Panels;
  }();

  return Panels;
});