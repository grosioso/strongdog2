"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

define(['game', 'sceneCombat', 'sceneTitle', 'sceneGameover'], function (game, SceneCombat, SceneTitle, SceneGameover) {
  //*******************************************************************************************************************
  // ** Manager of Scenes
  //*******************************************************************************************************************
  var SceneManager = /*#__PURE__*/function () {
    function SceneManager() {
      _classCallCheck(this, SceneManager);

      this.prevScene = '';
      this.scenes = {};
      this.initializeScenes();
    }

    _createClass(SceneManager, [{
      key: "initializeScenes",
      value: function initializeScenes() {
        this.scenes = {
          'Combat': new SceneCombat(),
          'Gameover': new SceneGameover(),
          'Title': new SceneTitle()
        };
      }
    }, {
      key: "startWith",
      value: function startWith(name) {
        game.scene = this.scenes[name];
        game.scene.enter();
      }
    }, {
      key: "changeTo",
      value: function changeTo(name) {
        game.scene.exit(name);
        game.scene = this.scenes[name];
        game.scene.enter();
        this.prevScene = name;
      }
    }, {
      key: "sceneActive",
      value: function sceneActive(scene) {
        return game.scene == scene;
      }
    }]);

    return SceneManager;
  }();

  return SceneManager;
});