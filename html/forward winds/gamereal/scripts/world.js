"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

define(['game', 'dataWorld'], function (game, DataWorld) {
  //*******************************************************************************************************************
  // ** The game World
  //*******************************************************************************************************************
  var World = /*#__PURE__*/function () {
    function World() {
      _classCallCheck(this, World);

      this.data = DataWorld;
      this.width = this.data.width;
      this.height = this.data.height;
      this.map = this.data.map;
      this.bounds = {
        left: 0,
        right: this.width * 16,
        up: 0,
        down: this.height * 16
      };
      this.itemsGained = 0;
      this.stage = 0;
      this.initializeStageProgresses();
    }

    _createClass(World, [{
      key: "initializeStageProgresses",
      value: function initializeStageProgresses() {
        this.stageProgresses = [];
        this.currentProgresses = [];

        for (var i = 0; i < 9; i++) {
          this.stageProgresses.push(0);
          this.currentProgresses.push(0);
        }
      }
    }, {
      key: "reset",
      value: function reset() {
        this.currentProgresses = this.currentProgresses.map(function (n) {
          return 0;
        });
        this.itemsGained = 0;
        this.refreshStage();
      }
    }, {
      key: "refreshStage",
      value: function refreshStage() {
        this.stage = game.character.relicIndex;
      }
    }, {
      key: "makeProgress",
      value: function makeProgress(enemy) {
        if (!enemy.summoned) {
          this.currentProgresses[enemy.stage] += 1;
          this.stageProgresses[enemy.stage] = Math.max(this.currentProgresses[enemy.stage], this.stageProgresses[enemy.stage]);
        }
      }
    }]);

    return World;
  }();

  return World;
});