"use strict";

define(['game', 'config', 'api', 'audio', 'input', 'graphics', 'loader', 'preloader', 'sceneManager', 'entities', 'combat', 'panels', 'tooltip', 'tips', 'loot', 'alchemy', 'world', 'storage'], function (game, config, Api, Audio, Input, Graphics, Loader, Preloader, SceneManager, Entities, Combat, Panels, Tooltip, Tips, Loot, Alchemy, World, Storage) {
  var fps = 60;
  var now;
  var then = 0;
  var interval = 1000 / fps;
  var delta;
  var tolerance = 0.1;
  preinitialize();
  preload();

  function preinitialize() {
    game.config = config;
    game.graphics = new Graphics();
    game.audio = new Audio();
  }

  function preload() {
    if (document.domain.indexOf(config.domainLock) !== -1) {
      var preloader = new Preloader();
      preloader.load(load);
    } else {
      console.log('Domain Locked!');
    }
  }

  function load() {
    var loader = new Loader();
    loader.load(start);
  }

  function start() {
    initialize();
    setup();
    update();
  }

  function initialize() {
    game.storage = new Storage();
    game.world = new World();
    game.api = new Api();
    game.input = new Input();
    game.alchemy = new Alchemy();
    game.loot = new Loot();
    game.sceneManager = new SceneManager();
    game.entities = new Entities();
    game.combat = new Combat();
    game.panels = new Panels();
    game.tips = new Tips();
  }

  function setup() {
    game.audio.playOst('track');
    game.panels.initializePanels();
    game.tooltips = [new Tooltip(), new Tooltip(), new Tooltip()];
    game.combat.initialize();
    game.sceneManager.startWith('Title');
  }

  function update(timestamp) {
    requestAnimationFrame(update);
    now = timestamp || 0;
    delta = now - then;

    if (delta > interval - tolerance) {
      then = now - delta % interval;
      game.input.update();
      game.tips.update();
      game.scene.update();
      game.panels.update();
      game.graphics.update();
    }
  }
});