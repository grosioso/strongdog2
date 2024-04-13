"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

define(['game', 'config', 'spritesetTitle'], function (game, config, SpritesetTitle) {
  //*******************************************************************************************************************
  // ** Title Scene
  //*******************************************************************************************************************
  var SceneTitle = /*#__PURE__*/function () {
    function SceneTitle() {
      _classCallCheck(this, SceneTitle);

      this.spriteset = new SpritesetTitle();
    }

    _createClass(SceneTitle, [{
      key: "enter",
      value: function enter() {
        this.spriteset.setup();
        this.setConfiguredStart();
      }
    }, {
      key: "setConfiguredStart",
      value: function setConfiguredStart() {
        this[config.startWith + 'Start']();
      }
    }, {
      key: "update",
      value: function update() {
        //this.updateInput()
        this.spriteset.update();
      }
    }, {
      key: "updateInput",
      value: function updateInput() {// if (game.input.mouseClicked) {
        //   let scene = config.intro ? 'Intro' : 'Combat'
        //   game.sceneManager.changeTo(scene)
        // }
      }
    }, {
      key: "exit",
      value: function exit(next) {
        var transition = next == 'Combat';
        game.panels.deactivate(['Main', 'Slots']);
        game.world.reset();
        game.combat.worldGenerator.reset();
        this.spriteset.dispose(transition);
      } //*******************************************************************************************************************
      // * Config Starts
      //*******************************************************************************************************************

    }, {
      key: "titleStart",
      value: function titleStart() {// Do Nothing
      }
    }, {
      key: "quickloadStart",
      value: function quickloadStart() {
        if (game.storage.storedFiles[0]) {
          game.combat.paused = false;
          game.storage.load();
          game.sceneManager.changeTo('Gameover');
        } else {
          this.newgameStart();
        }
      }
    }, {
      key: "newgameStart",
      value: function newgameStart() {
        game.sceneManager.changeTo('Combat');
      }
    }]);

    return SceneTitle;
  }();

  return SceneTitle;
});