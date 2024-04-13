"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

define(['game'], function (game) {
  //*******************************************************************************************************************
  // ** Spriteset for Gameover Scene
  //*******************************************************************************************************************
  var SpritesetGameover = /*#__PURE__*/function () {
    function SpritesetGameover() {
      _classCallCheck(this, SpritesetGameover);

      this.background = null;
      this.instructions = null;
      this.logo = null;
      this.moreGames = null;
      this.likeUs = null;
    }

    _createClass(SpritesetGameover, [{
      key: "setup",
      value: function setup() {
        this.setupBackground();
        this.setupInstructions(); //this.setupLogo()
        //this.setupLinks()
      }
    }, {
      key: "setupBackground",
      value: function setupBackground() {
        if (!this.background) {
          this.background = game.graphics.addBackground(0, 0, 'Background');
        }

        this.background.visible = true;
      }
    }, {
      key: "setupInstructions",
      value: function setupInstructions() {
        var enemyCount = game.character.relics[game.character.relicIndex].enemyCount;
        var stage = game.world.stage;
        var stageNoun = ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'][stage];
        var progress = game.world.stageProgresses[stage];
        var text = "Stage ".concat(stageNoun, " ").concat(progress, "/").concat(enemyCount);
        this.instructions = game.graphics.addText(game.graphics.center.x, 126, text, 3);
        this.instructions.anchor.x = 0.5;
        this.instructions.visible = false;
      } // setupLogo() {
      //   let [logo, url] = game.config.logo
      //   if (logo) {
      //     this.logo = game.graphics.addLogo(35, 5)
      //     this.logo.alpha = 0
      //     this.logo.interactive = true
      //     this.logo.cursor = 'pointer'
      //     this.logo.on('click', (e) => {
      //       let win = window.open(url, '_blank')
      //       if (win) {
      //         win.focus()
      //       }
      //     })
      //   }
      // }
      // setupLinks() {
      //   let links = [['moreGames', 'More Games', 'http://armor.ag/MoreGames'], ['likeUs', 'Like Us!', 'http://www.facebook.com/ArmorGames']]
      //   links.forEach(([name, real, url], index) => {
      //     this[name] = game.graphics.addText(795, 12 + 36 * index, real)
      //     this[name].style.fontSize = 24
      //     this[name].anchor.x = 1
      //     this[name].alpha = 0
      //     this[name].interactive = true
      //     this[name].cursor = 'pointer'
      //     this[name].on('click', (e) => {
      //       let win = window.open(url, '_blank')
      //       if (win) {
      //         win.focus()
      //       }
      //     })
      //   })
      // }

    }, {
      key: "update",
      value: function update() {
        this.updateIntructions();
      }
    }, {
      key: "updateIntructions",
      value: function updateIntructions() {
        var enemyCount = game.character.relics[game.character.relicIndex].enemyCount;
        var stage = game.world.stage;
        var stageNoun = ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'][stage];
        var progress = game.world.stageProgresses[stage];
        var text = "Stage ".concat(stageNoun, " ").concat(progress, "/").concat(enemyCount);
        this.instructions.text = game.input.mouseWithin(game.scene.brandingIcon.getMyRect()) ? game.scene.brandingIcon.tooltip : text;
        this.instructions.visible = game.input.mouseWithin(game.scene.restartRect) && !game.tips.blockingTip();
      }
    }, {
      key: "dispose",
      value: function dispose() {
        this.background.visible = false;
        this.instructions.destroy(); // if (this.logo) {
        //   this.logo.destroy()
        // }
        // if (game.config.armorMode) {
        //   this.moreGames.destroy()
        //   this.likeUs.destroy()
        // }
      }
    }]);

    return SpritesetGameover;
  }();

  return SpritesetGameover;
});