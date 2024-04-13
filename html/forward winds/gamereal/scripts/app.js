"use strict";

requirejs.config({
  baseUrl: 'scripts',
  waitSeconds: 60,
  paths: {
    'howler': 'lib/howler',
    'pixi': 'lib/pixi',
    'polyfill': 'lib/polyfill',
    'sat': 'lib/sat',
    'dataActions': 'data/dataActions',
    'dataEnemies': 'data/dataEnemies',
    'dataInteractibles': 'data/dataInteractibles',
    'dataItems': 'data/dataItems',
    'dataLayers': 'data/dataLayers',
    'dataPotions': 'data/dataPotions',
    'dataProjectiles': 'data/dataProjectiles',
    'dataRelics': 'data/dataRelics',
    'dataSkills': 'data/dataSkills',
    'dataStats': 'data/dataStats',
    'dataTips': 'data/dataTips',
    'dataWorld': 'data/dataWorld',
    'spriteBackground': 'sprites/spriteBackground',
    'spriteBrandingIcon': 'sprites/spriteBrandingIcon',
    'spriteEntity': 'sprites/spriteEntity',
    'spriteEntityPNG': 'sprites/spriteEntityPNG',
    'spriteHealthBar': 'sprites/spriteHealthBar',
    'spriteIcon': 'sprites/spriteIcon',
    'spritePauseHeader': 'sprites/spritePauseHeader',
    'spriteLoadingBar': 'sprites/spriteLoadingBar',
    'spriteLogo': 'sprites/spriteLogo',
    'spriteText': 'sprites/spriteText',
    'spriteTile': 'sprites/spriteTile',
    'panelBase': 'panels/panelBase'
  },
  shim: {
    pixi: {
      exports: 'PIXI'
    }
  }
});
requirejs(['polyfill', 'main'], function () {});