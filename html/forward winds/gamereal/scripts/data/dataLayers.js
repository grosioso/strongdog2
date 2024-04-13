"use strict";

define([''], function () {
  //*******************************************************************************************************************
  // ** World Layer Data
  //*******************************************************************************************************************
  var layers = [{
    y: 55,
    condition: function condition(game) {
      return !(game.character.pek || game.character.agz);
    }
  }, {
    y: 54,
    condition: function condition(game) {
      return game.character.pek;
    }
  }, {
    y: 53,
    condition: function condition(game) {
      return game.character.agz;
    }
  }];
  return layers;
});