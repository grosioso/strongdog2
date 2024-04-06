var ImageLoader = /** @class */ (function () {
    function ImageLoader() {
    }
    ImageLoader.loadImages = function (game) {
        game.load.bitmapFont("font-36", "assets/fonts/font-36.png", "assets/fonts/font-36.xml", null, 1);
        game.load.bitmapFont("font-36-brown", "assets/fonts/font-36-brown.png", "assets/fonts/font-36-brown.xml", null, 1);
        game.load.bitmapFont("font-72-brown", "assets/fonts/font-72-brown.png", "assets/fonts/font-72-brown.xml", null, 1);
        game.load.bitmapFont("font-36-white", "assets/fonts/font-36-white.png", "assets/fonts/font-36-white.xml", null, 1);
        game.load.bitmapFont("font-36-blue", "assets/fonts/font-36-blue.png", "assets/fonts/font-36-blue.xml", null, 1);
        game.load.bitmapFont("font-72-white", "assets/fonts/font-72-white.png", "assets/fonts/font-72-white.xml", null, 1);
        game.load.bitmapFont("font-90", "assets/fonts/font-90.png", "assets/fonts/font-90.xml", null, 1);
        game.load.image("cj-button-setting", "assets/images/home-control/button-setting.png");
        game.load.image("cj-result", "assets/images/home-control/result.png");
        game.load.image("cj-setting", "assets/images/home-control/setting.png");
        game.load.image("cj-small-setting", "assets/images/home-control/small-setting.png");
        game.load.image("cj-button-close", "assets/images/home-control/button-close.png");
        game.load.image("cj-button-green", "assets/images/home-control/button-green.png");
        game.load.image("cj-button-orange", "assets/images/home-control/button-orange.png");
        game.load.image("cj-button-achievement", "assets/images/home-control/button-achievement.png");
        game.load.image("cj-button-start", "assets/images/home-control/button-start.png");
        game.load.image("cj-button-skin", "assets/images/home-control/button-skin.png");
        game.load.image("cj-button-moregames", "assets/images/home-control/button-moregames.png");
        game.load.image("cj-button-pause", "assets/images/home-control/button-pause.png");
        game.load.image("cj-blank", "assets/images/home-control/blank.png");
        game.load.image("cj-title", "assets/images/home-control/title.png");
        game.load.image("cj-logo", "assets/images/home-control/logo.png");
        game.load.image("cj-transitionbg", "assets/images/home-control/transitionbg.png");
        game.load.image("cj-board-earth", "assets/images/home-control/board-earth.png");
        game.load.image("cj-achieve-bar-scroll", "assets/images/home-control/achieve-bar-scroll.png");
        game.load.image("cj-achieve-button-scroll", "assets/images/home-control/achieve-button-scroll.png");
        game.load.image("cj-achieve-completed", "assets/images/home-control/achieve-completed.png");
        game.load.image("cj-achieve-icon-coin", "assets/images/home-control/achieve-icon-coin.png");
        game.load.image("cj-achieve-icon-start", "assets/images/home-control/achieve-icon-start.png");
        game.load.image("cj-achieve-uncompleted", "assets/images/home-control/achieve-uncompleted.png");
        game.load.image("cj-achieve-claim", "assets/images/home-control/achieve-claim.png");
        game.load.image("cj-bg-garden-1", "assets/images/home-control/bg-garden/bg-1.png");
        game.load.image("cj-bg-garden-2", "assets/images/home-control/bg-garden/bg-2.png");
        game.load.image("cj-bg-garden-3", "assets/images/home-control/bg-garden/bg-3.png");
        game.load.image("cj-bg-garden-4", "assets/images/home-control/bg-garden/bg-4.png");
        game.load.image("cj-bg-jungle-1", "assets/images/home-control/bg-jungle/bg-1.png");
        game.load.image("cj-bg-jungle-2", "assets/images/home-control/bg-jungle/bg-2.png");
        game.load.image("cj-bg-jungle-3", "assets/images/home-control/bg-jungle/bg-3.png");
        game.load.image("cj-bg-jungle-4", "assets/images/home-control/bg-jungle/bg-4.png");
        game.load.image("cj-bg-sakura-1", "assets/images/home-control/bg-sakura/bg-1.png");
        game.load.image("cj-bg-sakura-2", "assets/images/home-control/bg-sakura/bg-2.png");
        game.load.image("cj-bg-sakura-3", "assets/images/home-control/bg-sakura/bg-3.png");
        game.load.image("cj-bg-sakura-4", "assets/images/home-control/bg-sakura/bg-4.png");
        game.load.image("cj-bg-shrine-1", "assets/images/home-control/bg-shrine/bg-1.png");
        game.load.image("cj-bg-shrine-2", "assets/images/home-control/bg-shrine/bg-2.png");
        game.load.image("cj-bg-shrine-3", "assets/images/home-control/bg-shrine/bg-3.png");
        game.load.image("cj-bg-shrine-4", "assets/images/home-control/bg-shrine/bg-4.png");
        game.load.image("cj-bg-stepa-1", "assets/images/home-control/bg-stepa/bg-1.png");
        game.load.image("cj-bg-stepa-2", "assets/images/home-control/bg-stepa/bg-2.png");
        game.load.image("cj-bg-stepa-3", "assets/images/home-control/bg-stepa/bg-3.png");
        game.load.image("cj-bg-stepa-4", "assets/images/home-control/bg-stepa/bg-4.png");
        game.load.image("cj-blank-scroll", "assets/images/run-control/blank-scroll.png");
        game.load.image("cj-palace", "assets/images/run-control/palace.png");
        game.load.image("cj-level-pointer", "assets/images/run-control/level-pointer.png");
        game.load.spritesheet("cj-mouse-tap", "assets/images/run-control/mouse-tap.png", 420 / 6, 58);
        game.load.image("cj-upgrade-bar", "assets/images/run-control/upgrade-bar.png");
        game.load.image("cj-container-upgrade-icon", "assets/images/run-control/container-upgrade-icon.png");
        game.load.image("cj-updrade-icon", "assets/images/run-control/updrade-icon.png");
        game.load.image("cj-board-fire", "assets/images/run-control/board-fire.png");
        game.load.image("cj-icon-diamond", "assets/images/run-control/icon-diamond.png");
        game.load.image("cj-icon-distance", "assets/images/run-control/icon-distance.png");
        game.load.image("cj-icon-obstsacle-laser", "assets/images/run-control/icon-obstsacle-laser.png");
        game.load.image("cj-icon-obstacle-static", "assets/images/run-control/icon-obstacle-static.png");
        game.load.image("cj-icon-obstacle-spike", "assets/images/run-control/icon-obstacle-spike.png");
        game.load.image("cj-icon-obstacle-rocket", "assets/images/run-control/icon-obstacle-rocket.png");
        game.load.image("cj-icon-obstacle-enemy", "assets/images/run-control/icon-obstacle-enemy.png");
        game.load.image("cj-bar-timer", "assets/images/run-control/bar-timer.png");
        game.load.image("cj-fill-bar-timer", "assets/images/run-control/fill-bar-timer.png");
        game.load.image("cj-board", "assets/images/run-control/board.png");
        game.load.image("cj-button-choice", "assets/images/run-control/button-choice.png");
        game.load.image("cj-magnet-icon", "assets/images/run-control/magnet-icon.png");
        game.load.image("cj-invincible-icon", "assets/images/run-control/invincible-icon.png");
        game.load.image("cj-double-icon", "assets/images/run-control/double-icon.png");
        game.load.image("cj-forward-icon", "assets/images/run-control/forward-icon.png");
        game.load.image("cj-heart-icon", "assets/images/run-control/heart-icon.png");
        game.load.image("cj-run-bar-frame", "assets/images/run-control/run-bar-frame.png");
        game.load.image("cj-run-bar-fill", "assets/images/run-control/run-bar-fill.png");
        game.load.image("cj-btn-buy", "assets/images/run-control/btn-buy.png");
        game.load.image("cj-btn-buy-red", "assets/images/run-control/btn-buy-red.png");
        game.load.image("cj-icon-coin", "assets/images/run-control/icon-coin.png");
        game.load.image("cj-icon-death", "assets/images/run-control/icon-death.png");
        game.load.image("cj-warning", "assets/images/run-control/warning.png");
        game.load.spritesheet("cj-status-power-up", "assets/images/run-control/status-power-up.png", 169 / 3, 61);
        game.load.image("cj-bar-power-up", "assets/images/run-control/bar-power-up.png");
        game.load.image("cj-indicator-heart", "assets/images/run-control/indicator-heart.png");
        game.load.image("cj-front-bush", "assets/images/run-control/front-bush.png");
        game.load.image("cj-front-sakura-1", "assets/images/run-control/front-sakura-1.png");
        game.load.image("cj-front-sakura-2", "assets/images/run-control/front-sakura-2.png");
        game.load.image("cj-front-shrine", "assets/images/run-control/front-shrine.png");
        game.load.image("cj-front-tree-1", "assets/images/run-control/front-tree-1.png");
        game.load.image("cj-front-tree-2", "assets/images/run-control/front-tree-2.png");
        game.load.image("cj-screen-full-blank", "assets/images/run-control/screen-full-blank.jpg");
        game.load.image("cj-coin-shop", "assets/images/run-control/coin-shop.png");
        game.load.image("cj-icon-dragon-earth", "assets/images/run-control/icon-dragon-earth.png");
        game.load.image("cj-icon-dragon-fire", "assets/images/run-control/icon-dragon-fire.png");
        game.load.image("cj-icon-minion-momo", "assets/images/run-control/icon-minion-momo.png");
        game.load.image("cj-icon-minion-turtly", "assets/images/run-control/icon-minion-turtly.png");
        game.load.image("cj-icon-speed", "assets/images/run-control/icon-speed.png");
        game.load.image("cj-wing-player", "assets/images/run-control/wing-player.png");
        game.load.image("cj-angel-player", "assets/images/run-control/angel-player.png");
        game.load.image("cj-shadow-player", "assets/images/run-control/shadow-player.png");
        game.load.image("cj-button-yellow-small", "assets/images/run-control/button-yellow-small.png");
        game.load.image("cj-cursor-head", "assets/images/run-control/cursor-head.png");
        game.load.image("cj-long-bar-fill", "assets/images/run-control/long-bar-fill.png");
        game.load.image("cj-long-bar-frame", "assets/images/run-control/long-bar-frame.png");
        game.load.image("cj-point-rest", "assets/images/run-control/point-rest.png");
        game.load.image("cj-scarf-skin", "assets/images/run-control/scarf-skin.png");
        game.load.image("cj-angelic-skin", "assets/images/run-control/angelic-skin.png");
        game.load.image("cj-angelic-dusk-skin", "assets/images/run-control/angelic-dusk-skin.png");
        game.load.image("cj-power-up-momo", "assets/images/run-control/power-up-momo.png");
        game.load.image("cj-power-up-turtle", "assets/images/run-control/power-up-turtle.png");
        game.load.image("cj-status-power-up-momo", "assets/images/run-control/status-power-up-momo.png");
        game.load.image("cj-status-power-up-turtle", "assets/images/run-control/status-power-up-turtle.png");
        game.load.image("cj-status-power-up-rush", "assets/images/run-control/status-power-up-rush.png");
        game.load.image("cj-status-power-up-dragon-green", "assets/images/run-control/status-power-up-dragon-green.png");
        game.load.image("cj-status-power-up-dragon-red", "assets/images/run-control/status-power-up-dragon-red.png");
        game.load.image("cj-mark-one-meter", "assets/images/run-control/mark-one-meter.png");
        game.load.image("cj-callout", "assets/images/run-control/callout.png");
        game.load.image("cj-fan", "assets/images/run-control/fan.png");
        game.load.image("cj-scene-block", "assets/images/run-control/scene-block.png");
        game.load.image("cj-dragon-earth-head", "assets/images/obstacle/dragon-earth-head.png");
        game.load.image("cj-body-earth-tail", "assets/images/obstacle/body-earth-tail.png");
        game.load.image("cj-body-earth-rear", "assets/images/obstacle/body-earth-rear.png");
        game.load.image("cj-body-earth-loop", "assets/images/obstacle/body-earth-loop.png");
        game.load.image("cj-tail-earth", "assets/images/obstacle/tail-earth.png");
        game.load.image("cj-dragon-fire-head", "assets/images/obstacle/dragon-fire-head.png");
        game.load.image("cj-body-fire-loop", "assets/images/obstacle/body-fire-loop.png");
        game.load.image("cj-body-fire-rear", "assets/images/obstacle/body-fire-rear.png");
        game.load.image("cj-body-fire-tail", "assets/images/obstacle/body-fire-tail.png");
        game.load.image("cj-tail-fire", "assets/images/obstacle/tail-fire.png");
        game.load.image("cj-laser-body", "assets/images/obstacle/laser-body.png");
        game.load.image("cj-laser-end-left", "assets/images/obstacle/laser-end-left.png");
        game.load.image("cj-laser-end-right", "assets/images/obstacle/laser-end-right.png");
        game.load.image("cj-laser-rotate", "assets/images/obstacle/laser-rotate.png");
        game.load.image("cj-laser-static", "assets/images/obstacle/laser-static.png");
        game.load.spritesheet("cj-head-laser", "assets/images/obstacle/head-laser.png", 447 / 7, 75);
        game.load.spritesheet("cj-charge", "assets/images/obstacle/charge.png", 489 / 10, 55);
        game.load.image("cj-laser-edge", "assets/images/obstacle/laser-edge.png");
        game.load.image("cj-laser-edge-small", "assets/images/obstacle/laser-edge-small.png");
        game.load.image("cj-laser-body-long", "assets/images/obstacle/laser-body-long.png");
        game.load.image("cj-laser-body-long-small", "assets/images/obstacle/laser-body-long-small.png");
        game.load.image("cj-rocket", "assets/images/obstacle/rocket.png");
        game.load.image("cj-spike", "assets/images/obstacle/spike.png");
        game.load.image("cj-coin", "assets/images/collectible/coin.png");
        game.load.image("cj-diamond", "assets/images/collectible/diamond.png");
        game.load.spritesheet("cj-bird", "assets/images/collectible/bird.png", 1367 / 7, 136);
        game.load.spritesheet("cj-particle", "assets/images/vfx/particle.png", 590 / 8, 150 / 2);
        game.load.spritesheet("cj-explosion", "assets/images/vfx/explosion.png", 796 / 6, 131);
        game.load.spritesheet("cj-coin-center", "assets/images/vfx/coin-center.png", 180 / 4, 45);
        game.load.image("cj-shadow", "assets/images/vfx/shadow.png");
        game.load.image("cj-hero-shield", "assets/images/vfx/hero-shield.png");
        game.load.image("cj-hero-magnet", "assets/images/vfx/hero-magnet.png");
        game.load.image("cj-hero-magnet-fire", "assets/images/vfx/hero-magnet-fire.png");
        game.load.image("cj-hero-rush", "assets/images/vfx/hero-rush.png");
        game.load.image("cj-bullet", "assets/images/vfx/bullet.png");
        game.load.image("cj-white-ring", "assets/images/vfx/white-ring.png");
        game.load.image("cj-bullet-bonus", "assets/images/vfx/bullet-bonus.png");
        game.load.image("cj-black-shadow", "assets/images/vfx/black-shadow.png");
        game.load.image("cj-blood-splat", "assets/images/vfx/blood-splat.png");
        game.load.image("cj-black-shadow-fly", "assets/images/vfx/black-shadow-fly.png");
        game.load.image("cj-flying", "assets/images/anim/flying.png");
        game.load.image("cj-dead", "assets/images/anim/dead.png");
        game.load.spritesheet("cj-power-up", "assets/images/collectible/power-up.png", 195 / 3, 65);
        game.load.spritesheet("cj-char-run", "assets/images/anim/char-run.png", 370 / 5, 185 / 2);
        game.load.image("cj-flying", "assets/images/anim/flying.png");
        game.load.spritesheet("cj-minion", "assets/images/anim/minion.png", 372 / 5, 185 / 2);
        game.load.spritesheet("cj-momo", "assets/images/anim/momo.png", 505 / 4, 40);
        game.load.spritesheet("cj-turtly", "assets/images/anim/turtly.png", 444 / 5, 58);
        game.load.image("cj-spike-0", "assets/images/obstacle/debris/spike-0.png");
        game.load.image("cj-spike-1", "assets/images/obstacle/debris/spike-1.png");
        game.load.image("cj-spike-2", "assets/images/obstacle/debris/spike-2.png");
        game.load.image("cj-spike-3", "assets/images/obstacle/debris/spike-3.png");
        game.load.image("cj-spike-4", "assets/images/obstacle/debris/spike-4.png");
        game.load.image("cj-spike-5", "assets/images/obstacle/debris/spike-5.png");
        game.load.image("cj-enemy-0", "assets/images/obstacle/debris/enemy-0.png");
        game.load.image("cj-enemy-1", "assets/images/obstacle/debris/enemy-1.png");
        game.load.image("cj-enemy-2", "assets/images/obstacle/debris/enemy-2.png");
        game.load.image("cj-enemy-3", "assets/images/obstacle/debris/enemy-3.png");
        game.load.image("cj-enemy-4", "assets/images/obstacle/debris/enemy-4.png");
    };
    return ImageLoader;
}());
//Crazy Jetpack
var cjBlankScroll = "cj-blank-scroll";
var cjPalace = "cj-palace";
var cjMouseTap = "cj-mouse-tap";
var cjLevelPointer = "cj-level-pointer";
var cjCallout = "cj-callout";
var cjFan = "cj-fan";
var cjSceneBlock = "cj-scene-block";
var cjCharge = "cj-charge";
var cjMarkOneMeter = "cj-mark-one-meter";
var cjBloodSplat = "cj-blood-splat";
var cjBlackShadowFly = "cj-black-shadow-fly";
var cjBlackShadow = "cj-black-shadow";
var cjWhiteRing = "cj-white-ring";
var cjStatusPowerUpMomo = "cj-status-power-up-momo";
var cjStatusPowerUpTurtle = "cj-status-power-up-turtle";
var cjStatusPowerUpRush = "cj-status-power-up-rush";
var cjStatusPowerUpEarthDragon = "cj-status-power-up-dragon-green";
var cjStatusPowerUpFireDragon = "cj-status-power-up-dragon-red";
var cjPowerUpMomo = "cj-power-up-momo";
var cjPowerUpTurtle = "cj-power-up-turtle";
var cjScarfSkin = "cj-scarf-skin";
var cjAngelicSkin = "cj-angelic-skin";
var cjAngelicDuskSkin = "cj-angelic-dusk-skin";
var cjMomo = "cj-momo";
var cjTurtle = "cj-turtly";
var cjDiamond = "cj-diamond";
var cjCursorHead = "cj-cursor-head";
var cjLongBarFill = "cj-long-bar-fill";
var cjLongBarFrame = "cj-long-bar-frame";
var cjPointRest = "cj-point-rest";
var cjButtonYellowSmall = "cj-button-yellow-small";
var cjShadowPlayer = "cj-shadow-player";
var cjAnglePlayer = "cj-angel-player";
var cjWingPlayer = "cj-wing-player";
var cjIconDistance = "cj-icon-distance";
var cjIconObstacleLaser = "cj-icon-obstsacle-laser";
var cjIconObstacleStatic = "cj-icon-obstacle-static";
var cjIconObstacleSpike = "cj-icon-obstacle-spike";
var cjIconObstacleRocket = "cj-icon-obstacle-rocket";
var cjIconObstacleEnemy = "cj-icon-obstacle-enemy";
var cjIconDiamond = "cj-icon-diamond";
var cjDragonEarthHead = "cj-dragon-earth-head";
var cjBodyEarthTail = "cj-body-earth-tail";
var cjBodyEarthRear = "cj-body-earth-rear";
var cjBodyEarthLoop = "cj-body-earth-loop";
var cjTailEarth = "cj-tail-earth";
var cjDragonFireHead = "cj-dragon-fire-head";
var cjBodyFireLoop = "cj-body-fire-loop";
var cjBodyFireRear = "cj-body-fire-rear";
var cjBodyFireTail = "cj-body-fire-tail";
var cjTailFire = "cj-tail-fire";
var cjIconDragonEarth = "cj-icon-dragon-earth";
var cjIconDragonFire = "cj-icon-dragon-fire";
var cjIconMinionMomo = "cj-icon-minion-momo";
var cjIconMinionTurtly = "cj-icon-minion-turtly";
var cjIconSpeed = "cj-icon-speed";
var cjCoinShop = "cj-coin-shop";
var cjScreenFullBank = "cj-screen-full-blank";
var cjAchievement = "cj-achievement";
var cjAchievementFan = "cj-achievement-fan";
var cjBoardFire = "cj-board-fire";
var cjUpgradeIcon = "cj-updrade-icon";
var cjContainerUpgradeIcon = "cj-container-upgrade-icon";
var cjUpgradeBar = "cj-upgrade-bar";
var cjDebrisSpike0 = "cj-spike-0";
var cjDebrisSpike1 = "cj-spike-1";
var cjDebrisSpike2 = "cj-spike-2";
var cjDebrisSpike3 = "cj-spike-3";
var cjDebrisSpike4 = "cj-spike-4";
var cjDebrisSpike5 = "cj-spike-5";
var cjDebrisEnemy0 = "cj-enemy-0";
var cjDebrisEnemy1 = "cj-enemy-1";
var cjDebrisEnemy2 = "cj-enemy-2";
var cjDebrisEnemy3 = "cj-enemy-3";
var cjDebrisEnemy4 = "cj-enemy-4";
var cjBgGarden1 = "cj-bg-garden-1";
var cjBgGarden2 = "cj-bg-garden-2";
var cjBgGarden3 = "cj-bg-garden-3";
var cjBgGarden4 = "cj-bg-garden-4";
var cjBgJungle1 = "cj-bg-jungle-1";
var cjBgJungle2 = "cj-bg-jungle-2";
var cjBgJungle3 = "cj-bg-jungle-3";
var cjBgJungle4 = "cj-bg-jungle-4";
var cjBgSakura1 = "cj-bg-sakura-1";
var cjBgSakura2 = "cj-bg-sakura-2";
var cjBgSakura3 = "cj-bg-sakura-3";
var cjBgSakura4 = "cj-bg-sakura-4";
var cjBgShrine1 = "cj-bg-shrine-1";
var cjBgShrine2 = "cj-bg-shrine-2";
var cjBgShrine3 = "cj-bg-shrine-3";
var cjBgShrine4 = "cj-bg-shrine-4";
var cjBgStepa1 = "cj-bg-stepa-1";
var cjBgStepa2 = "cj-bg-stepa-2";
var cjBgStepa3 = "cj-bg-stepa-3";
var cjBgStepa4 = "cj-bg-stepa-4";
var cjFrontBush = "cj-front-bush";
var cjFrontSakura1 = "cj-front-sakura-1";
var cjFrontSakura2 = "cj-front-sakura-2";
var cjFrontShrine = "cj-front-shrine";
var cjFrontTree1 = "cj-front-tree-1";
var cjFrontTree2 = "cj-front-tree-2";
var cjShadow = "cj-shadow";
var cjBarTimer = "cj-bar-timer";
var cjFillBarTimer = "cj-fill-bar-timer";
var cjButtonChoice = "cj-button-choice";
var cjBoard = "cj-board";
var cjTransition = "cj-transitionbg";
var cjTitle = "cj-title";
var cjLogo = "cj-logo";
var cjExploision = "cj-explosion";
var cjIndicatorHeart = "cj-indicator-heart";
var cjRush = "cj-hero-rush";
var cjBird = "cj-bird";
var cjLaserHead = "cj-head-laser";
var cjLaserEdge = "cj-laser-edge";
var cjLaserBodyLong = "cj-laser-body-long";
var cjLaserEdgeSmall = "cj-laser-edge-small";
var cjLaserBodyLongSmall = "cj-laser-body-long-small";
var cjBulletBonus = "cj-bullet-bonus";
var cjBullet = "cj-bullet";
var cjHeroMagnet = "cj-hero-magnet";
var cjHeroMagnetFire = "cj-hero-magnet-fire";
var cjHeroShield = "cj-hero-shield";
var cjStatusPowerUp = "cj-status-power-up";
var cjBarPowerUp = "cj-bar-power-up";
var cjCoinCenter = "cj-coin-center";
var cjCharRun = "cj-char-run";
var cjFlying = "cj-flying";
var cjDead = "cj-dead";
var cjMinion = "cj-minion";
var cjLaserBody = "cj-laser-body";
var cjLaserEndLeft = "cj-laser-end-left";
var cjLaserEndRight = "cj-laser-end-right";
var cjLaserRotate = "cj-laser-rotate";
var cjLaserStatic = "cj-laser-static";
var cjRocket = "cj-rocket";
var cjSpike = "cj-spike";
var cjParticle = "cj-particle";
var cjCoin = "cj-coin";
var cjPowerUp = "cj-power-up";
var cjButtonSetting = "cj-button-setting";
var cjResult = "cj-result";
var cjSetting = "cj-setting";
var cjSmallSetting = "cj-small-setting";
var cjButtonClose = "cj-button-close";
var cjButtonGreen = "cj-button-green";
var cjButtonOrage = "cj-button-orange";
var cjButtonAchievement = "cj-button-achievement";
var cjButtonStart = "cj-button-start";
var cjButtonSkin = "cj-button-skin";
var cjButtonMoreGames = "cj-button-moregames";
var cjButtonPause = "cj-button-pause";
var cjBoardEarth = "cj-board-earth";
var cjAchieveBarScroll = "cj-achieve-bar-scroll";
var cjAchieveButtonScroll = "cj-achieve-button-scroll";
var cjAchieveCompleted = "cj-achieve-completed";
var cjAchieveUncompleted = "cj-achieve-uncompleted";
var cjAchieveIconCoin = "cj-achieve-icon-coin";
var cjAchieveIconStart = "cj-achieve-icon-start";
var cjAchieveClaim = "cj-achieve-claim";
var cjMagentIcon = "cj-magnet-icon";
var cjInvincibleIcon = "cj-invincible-icon";
var cjDoubleIcon = "cj-double-icon";
var cjForwardIcon = "cj-forward-icon";
var cjHeartIcon = "cj-heart-icon";
var cjRunBarFrame = "cj-run-bar-frame";
var cjRunBarFill = "cj-run-bar-fill";
var cjButtonBuy = "cj-btn-buy";
var cjButtonBuyRed = "cj-btn-buy-red";
var cjCoinIcon = "cj-icon-coin";
var cjIconDeath = "cj-icon-death";
var cjWarning = "cj-warning";
var cjBlank = "cj-blank";
var font_36 = "font-36";
var font_36_white = "font-36-white";
var font_36_brown = "font-36-brown";
var font_72_brown = "font-72-brown";
var font_36_blue = "font-36-blue";
var font_72_white = "font-72-white";
var font_90 = "font-90";
/// <reference path="utils/ImageLoader.ts" />
var game;
var startWhenLanguageLoaded = false;
var textTint = 0x8D5825;
var nameGame = "ninja-kite";
var version = "v1.0.0";
var useLocalLanguageFile = true;
var enableLocalSound = true;
var useTutorial = true;
var useStrictSequence = true;
var textTintDark = 0x441A00;
var gameWidth = 1024;
var gameHeight = 576;
var halfGameWidth = gameWidth / 2;
var halfGameHeight = gameHeight / 2;
var GAMEWIDTH = 1024;
var GAMEHEIGHT = 576;
var HALFGAMEWIDTH = GAMEWIDTH / 2;
var HALFGAMEHEIGHT = GAMEHEIGHT / 2;
var MINIMUM_VALUE = -9999;
var debugColors = ["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF", "#00FFFF", "#FFFFFF", "#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF", "#00FFFF"];
var seconds = 1000;
var dt = 1000;
var SHOW_FPS = false;
var HIDDEN_BUTTON_SKIN = true;
var HIDDEN_DISTNCE_TRACKER = true;
var DISABLE_BULLET = true;
var DISABLE_DEFAULT_SHADOW = true;
var IMAGE_95_75 = false;
var HIDDEN_ICON_RESULTSCREEN = true;
var ADDING_QUIZ = 0;
var SUBTRACT_QUIZ = 1;
var MULTIPLY_QUIZ = 2;
var DIVIDE_QUIZ = 3;
var EXPONENT_QUIZ = 4;
var MATH_ACTIVE = false;
var RESPONSE_CORRECT = 0;
var RESPONSE_INCORRECT = 1;
var RESPONSE_TIMEOUT = 2;
var INCREMENT_PRICE = 50;
var IN_SECOND = 1000;
var arrayUpgrade = [
    { current: 0, max: 5, price: [100, 200, 300, 400, 500, 'Max'], factor: [5000, 8000, 11000, 14000, 17000, 20000], title: '', button: null, progress: null },
    { current: 0, max: 5, price: [100, 200, 300, 400, 500, 'Max'], factor: [5000, 7000, 9000, 11000, 13000, 15000], title: '', button: null, progress: null },
    { current: 0, max: 5, price: [100, 200, 300, 400, 500, 'Max'], factor: [5000, 10000, 15000, 20000, 25000, 30000], title: '', button: null, progress: null },
    { current: 0, max: 5, price: [100, 200, 300, 400, 500, 'Max'], factor: [5000, 7000, 9000, 11000, 13000, 15000], title: '', button: null, progress: null },
    { current: 0, max: 5, price: [100, 200, 300, 400, 500, 'Max'], factor: [0, 1, 2, 3, 4, 5], title: '', button: null, progress: null },
    { current: 0, max: 5, price: [100, 200, 300, 400, 500, 'Max'], factor: [350, 300, 250, 200, 150, 100], title: '', button: null, progress: null },
    { current: 0, max: 5, price: [100, 200, 300, 400, 500, 'Max'], factor: [350, 300, 250, 200, 150, 100], title: '', button: null, progress: null },
    { current: 0, max: 5, price: [100, 200, 300, 400, 500, 'Max'], factor: [5, 6, 7, 8, 9, 10], title: '', button: null, progress: null },
    { current: 0, max: 5, price: [100, 200, 300, 400, 500, 'Max'], factor: [1, 2, 3, 4, 5, 6], title: '', button: null, progress: null },
    { current: 0, max: 5, price: [100, 200, 300, 400, 500, 'Max'], factor: [1, 2, 3, 4, 5, 6], title: '', button: null, progress: null },
];
var arrayMeter = [1000, 2000, 3000, 4000, 5000];
var ARRAY_SKINS = [0, 0, 0];
var ONCERUN_ACH = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var STATUS_CLAIM = {
    magnet: false,
    shield: false,
    distance: false,
    fire: false,
    earth: false,
    coin: false,
    diamond: false,
    speed: false,
    momo: false,
    turtle: false,
    laser: false,
    enemy: false,
    static: false,
    rocket: false,
    spike: false
};
var ACHIEVEMENT_LIMIT = {
    magnetLimit: 10,
    shieldLimit: 10,
    distanceLimit: 4444,
    fireLimit: 10,
    earthLimit: 10,
    coinLimit: 10000,
    diamondLimit: 1000,
    speedLimit: 25,
    momoLimit: 5,
    turtlyLimit: 5,
    laserLimit: 10,
    enemyLimit: 10,
    staticLimit: 10,
    rocketLimit: 10,
    spikeLimit: 10
};
var magnetLimit = "magnet-limit";
var shieldLimit = "shield-limit";
var distanceLimit = "distance-limit";
var fireLimit = "fire-limit";
var earthLimit = "earth-limit";
var coinLimit = "coin-limit";
var diamondLimit = "diamond-limit";
var speedLimit = "speed-limit";
var momoLimit = "momo-limit";
var turtlyLimit = "turtly-limit";
var laserLimit = "laser-limit";
var enemyLimit = "enemy-limit";
var staticLimit = "static-limit";
var rocketLimit = "rocket-limit";
var spikeLimit = "spike-limit";
var magnetIndex = 0;
var shieldIndex = 1;
var distanceIndex = 2;
var fireIndex = 3;
var earthIndex = 4;
var coinIndex = 5;
var diamondIndex = 6;
var speedIndex = 7;
var momoIndex = 8;
var turtlyIndex = 9;
var laserIndex = 10;
var enemyIndex = 11;
var staticIndex = 12;
var rocketIndex = 13;
var spikeIndex = 14;
var SHOW_MPH = true;
var ANIMATION_WALK = 1;
var ANIMATION_DEAD = -1;
var ANIMATION_FLY = 0;
var ANIMATION_FIRST = -2;
var ANIMATION_RIDE = 2;
var LANDING_FIRST = false;
var DEFAULT_TARGETPOSY = GAMEHEIGHT - 110;
var DRAGONTIME_TARGETPOSY = GAMEHEIGHT - 130;
var DEFAULT_MARGINTOP = 75;
var DRAGONTIME_MARGINTOP = 70;
var SPARK_STATIC = "static";
var SPARK_DYNAMIC = "dynamic";
var STATUS_POWER_UP_SHIELD = 0;
var STATUS_POWER_UP_DOUBLE = 1;
var STATUS_POWER_UP_MAGNET = 2;
var STATUS_POWER_UP_MOMO = 3;
var STATUS_POWER_UP_TURTLE = 4;
var STATUS_POWER_UP_RUSH = 5;
var STATUS_POWER_UP_EARTH = 6;
var STATUS_POWER_UP_FIRE = 7;
var earthCounter = 0;
var earthMax = 0;
var fireCounter = 0;
var fireMax = 0;
var shieldCounter = 0;
var shieldMax = 0;
var doubleCounter = 0;
var doubleMax = 0;
var magnetCounter = 0;
var magnetMax = 0;
var rushCounter = 0;
var rushMax = 0;
var momoCounter = 0;
var momoMax = 0;
var turtleCounter = 0;
var turtleMax = 0;
var SPEEDALL = 5;
var SPEEDNORMAL = 5;
var SPEED_RUSH = 15;
var MODE_DECREASE = true;
var COLLECTIBLE_GOLD = 'collectible-gold';
var COLLECTIBLE_POWER_UP = 'collectible-power-up';
var DIAMOND = "diamond";
var POWER_UP_SHIELD = 'power-up-shield';
var POWER_UP_MAGNET = 'power-up-magnet';
var POWER_UP_DOUBLE = 'power-up-double';
var POWER_UP_MOMO = 'power-up-momo';
var POWER_UP_TURTLY = 'power-up-turtly';
var OBSTACLE_LASER_STATIC_UP = 'laser-static-up';
var OBSTACLE_LASER_STATIC_DOWN = 'laser-static-down';
var OBSTACLE_LASER_STATIC_LEFT = 'laser-static-left';
var OBSTACLE_LASER_STATIC_RIGHT = 'laser-static-right';
var OBSTACLE_LASER_STATIC_ROTATING = 'laser-static-rotating';
var OBSTACLE_LASER_LONG = "laser-long";
var FIRE_DRAGON = "fire-dragon";
var EARTH_DRAGON = "earth-dragon";
var CHILD_MOMO = "child-momo";
var CHILD_TURTLY = "child-turtly";
var MINION = "minion";
var SPIKE = "spike";
var LASER = "laser";
var ROCKET = "rocket";
var DRAGON = "dragon";
var PALACE = "palace";
var IS_MOMO_FOLLOW_PLAYER = false;
var FOLLOW_RISE = true;
var MODE_BOUNCING = true;
var MODE_CLOSE_BUTTON = true;
var MODE_BLOOD = false;
var MODE_COIN_CENTER = false;
var DEATH_COUNTER = 0;
var COIN_COUNTER = 0;
var MOMO_COUNTER = 0;
var TURTLE_COUNTER = 0;
var METER_COUNTER = 0;
var METER_MAX = 5000;
var MAGNET_COUNTER = 0;
var SHIELD_COUNTER = 0;
var FIRE_DRAGON_COUNTER = 0;
var EARTH_DRAGON_COUNTER = 0;
var DIAMOND_COUNTER = 0;
var LASER_COUNTER = 0;
var ENEMY_COUNTER = 0;
var STATIC_COUNTER = 0;
var ROCKET_COUNTER = 0;
var SPIKE_COUNTER = 0;
var ACHIEVEMENT_COUNTER = 0;
var TOP_SPEED = 0;
var TOP_METER = 0;
var TOP_MOMO = 0;
var TOP_TURTLE = 0;
var TIMER_COUNTER = 0;
var HOUR_COUNTER = 0;
var MINUTE_COUNTER = 0;
var SECOND_COUNTER = 0;
var PRICE_COUNTER = 100;
var MOMO_LIFE = 0;
var TURTLY_LIFE = 0;
var CURRENT_HEART = 0;
var HEART_MAX = 5;
var LONG_INVULNERABILITY = 2000;
var LONG_CHILD_LIFE = 7000;
var LONG_RUSH = 5000;
var STATUS_REVIVE = false;
var LIFE_FOREVER = false;
var LIFE_FOREVER_CHILD = false;
var SPEED_GAMEOVER = 0;
var INCREASE_SPACEX_MOMO = 0;
var INCREASE_SPACEX_TURTLE = 0;
var DISABLE_POWER_UP_STATUS_CHILD = true;
var DISABLE_LIGHT_KNIFE = true;
var ISFIRST = false;
var ISFINISHED = false;
var CHILD_HIT_POWERUP = true;
var CHILD_HIT_DRAGON = false;
var ENTER_PALACE = false;
var globalAlpha = true;
var READY = false;
var GAMEOVER = false;
var PAUSED = false;
var UPGRADE_MAGNET = 0;
var UPGRADE_SHIELD = 1;
var UPGRADE_DOUBLE = 2;
var UPGRADE_FORWARD = 3;
var UPGRADE_HEARTS = 4;
var UPGRADE_DRAGON_FIRE = 5;
var UPGRADE_DRAGON_EARTH = 6;
var UPGRADE_SPEED = 7;
var UPGRADE_MOMO = 8;
var UPGRADE_TURTLY = 9;
var TUTORIAL_INFO = true;
var TUTORIAL_MAP = false;
var TUTORIAL_RUN = false;
var TUTORIAL_SIMCITY = true;
var SAVE_MOMO = "save-momo";
var SAVE_TURTLE = "save-turtly";
var SAVE_DEATH = "save-death";
var SAVE_COIN = "save-coin";
var SAVE_MAGNET = "save-magnet";
var SAVE_SHIELD = "save-shield";
var SAVE_FIRE = "save-fire";
var SAVE_EARTH = "save-earth";
var SAVE_DIAMOND = "save-diamond";
var SAVE_LASER = "save-laser";
var SAVE_ENEMY = "save-enemy";
var SAVE_STATIC = "save-static";
var SAVE_ROCKET = "save-rocket";
var SAVE_SPIKE = "save-spike";
var SAVE_STATUS_UPGRADE = "save-status-upgrade";
var SAVE_TOP_SPEED = "save-top-speed";
var SAVE_ACHIEVEMENT = "save-achievement";
var SAVE_SKINS = "save-skins";
var SAVE_ONCERUN_ACH = "save-oncerun-ach";
var SAVE_TOP_METER = "save-top-meter";
var SAVE_TOP_MOMO = "save-top-momo";
var SAVE_TOP_TURTLE = "save-top-turtle";
var SAVE_PRICE = "save-price";
var SAVE_CLAIM = "save-claim";
var SAVE_ISFIRST = "save-first";
var SAVE_BGM = "save-bgm";
var SAVE_SFX = "save-sfx";
var Gameclass = /** @class */ (function () {
    function Gameclass() {
        game = new Phaser.Game(gameWidth, gameHeight, Phaser.CANVAS, "", { preload: this.preload, create: this.create }, false, true);
    }
    Gameclass.prototype.preload = function () {
        game.load.image("logo", "assets/images/preloader/logo.png");
        game.load.image("loading-empty", "assets/images/preloader/loading-empty.png");
        game.load.image("loading-full", "assets/images/preloader/loading-full.png");
        game.load.image("loading-sky", "assets/images/preloader/loading-sky.png");
        game.load.video("armor-logo", "assets/armor-logo.webm");
    };
    Gameclass.prototype.create = function () {
        game.time.advancedTiming = true;
        game.time.desiredFps = 60;
        game.time.slowMotion = 1.0;
        game.forceSingleUpdate = true;
        game.state.add(Preloader.NAME, Preloader, false);
        game.state.add(TitleScreen.NAME, TitleScreen, false);
        game.state.add(RunControl.NAME, RunControl, false);
        game.state.add(Congrats.NAME, Congrats, false);
        game.stage.backgroundColor = 0xFFFFFF;
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        game.scale.windowConstraints.right = "visual";
        game.scale.windowConstraints.bottom = "visual";
        game.input.maxPointers = 1;
        game.input.enabled = true;
        game.state.start(Preloader.NAME);
        console.log("v1.0.0");
    };
    return Gameclass;
}());
window.onload = function () {
    new Gameclass();
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var AnswerButton = /** @class */ (function (_super) {
    __extends(AnswerButton, _super);
    function AnswerButton() {
        var _this = _super.call(this, game, 0, 0) || this;
        _this.anchor.setTo(0.5);
        var tf = _this.tf = game.add.bitmapText(0, -10, font_36, "", 26);
        tf.maxWidth = 630;
        tf.align = 'center';
        tf.tint = textTintDark;
        tf.anchor.setTo(0.5);
        _this.addChild(tf);
        _this.visible = false;
        _this.inputEnabled = true;
        return _this;
    }
    AnswerButton.prototype.showStrikethroughText = function () {
        if (this.strikethrough) {
            this.removeChild(this.strikethrough);
            this.strikethrough.destroy(true);
        }
        this.strikethrough = new Phaser.Sprite(game, this.tf.x, this.tf.y + 4, cjBlank);
        this.addChild(this.strikethrough);
        this.strikethrough.anchor.setTo(0.5);
        console.log(this.tf.text);
        console.log(this.tf.height);
        if (this.tf.height > 40) {
            this.strikethrough.y -= 15;
            this.strikethrough.addChild(new Phaser.Sprite(game, 0, 32, cjBlank)).anchor.setTo(0.5);
        }
    };
    AnswerButton.prototype.hideStrikethoughText = function () {
        if (this.strikethrough) {
            this.removeChild(this.strikethrough);
            this.strikethrough.destroy(true);
        }
    };
    AnswerButton.prototype.show = function (x, y, id, text, clickCallback) {
        var _this = this;
        this.x = x;
        this.y = y + 50;
        this.visible = true;
        this.tf.text = text;
        this.alpha = 0;
        game.add.tween(this).to({ x: x, y: y, alpha: 1 }, 250, Phaser.Easing.Quadratic.Out, true, 100 * id).onComplete.addOnce(function () {
            _this.events.onInputDown.addOnce(function () {
                SoundPlayer.playSFX(SoundPlayer.CLICK);
                clickCallback(id);
            }, _this);
        }, this);
    };
    AnswerButton.prototype.removeAllListeners = function () {
        this.events.onInputDown.removeAll(this);
    };
    AnswerButton.prototype.hide = function () {
        var _this = this;
        game.add.tween(this).to({ alpha: 0 }, 250, Phaser.Easing.Quadratic.Out, true).onComplete.addOnce(function () {
            _this.visible = true;
        }, this);
    };
    return AnswerButton;
}(Phaser.Sprite));
var DialogBox = /** @class */ (function (_super) {
    __extends(DialogBox, _super);
    function DialogBox(uiMask) {
        if (uiMask === void 0) { uiMask = null; }
        var _this = _super.call(this, game, 0, 384, cjBlank) || this;
        _this.soundDelay = 0;
        _this.initPosX = _this.x;
        _this.initPosY = _this.y;
        _this.uiMask = uiMask;
        var box = _this.box = new Phaser.Image(game, 0, -95, cjCallout);
        var nameTf = _this.nameTf = game.add.bitmapText(0, 145, font_36, "Character Name", 28);
        nameTf.anchor.setTo(0);
        var dialogTf = _this.dialogTf = game.add.bitmapText(0, 30, font_36, "Dialog text will be placed here.\nAnd this is a new line.", 10);
        dialogTf.maxWidth = 625;
        var picture = _this.picture = new Phaser.Sprite(game, 0, 192, cjBlank);
        picture.anchor.setTo(0, 1);
        var shadow = _this.shadow = new Phaser.Sprite(game, _this.picture.x - DialogBox.SHADOW_DISTANCE, _this.picture.y + DialogBox.SHADOW_DISTANCE, cjBlank);
        shadow.tint = 0x000000;
        shadow.alpha = DialogBox.SHADOW_ALPHA;
        shadow.anchor.setTo(0, 1);
        var indicator = _this.indicator = new Phaser.Sprite(game, 0, 0, cjBlank);
        _this.addChild(shadow);
        _this.addChild(picture);
        _this.addChild(box);
        _this.addChild(nameTf);
        _this.addChild(dialogTf);
        _this.addChild(indicator);
        _this.isActive = false;
        _this.visible = false;
        _this.isDialogInputEnabled = true;
        _this.isJustPressed = false;
        _this.game.input.onDown.add(function () { return _this.onInputDown(); }, _this);
        return _this;
    }
    DialogBox.prototype.onInputDown = function () {
        this.isJustPressed = true;
    };
    DialogBox.prototype.showSequence = function (sequenceData, callback, restart, isNarration) {
        var _this = this;
        if (callback === void 0) { callback = null; }
        if (restart === void 0) { restart = false; }
        if (isNarration === void 0) { isNarration = false; }
        if (sequenceData.data.length > 0) {
            var reanimate = (restart || sequenceData.data[0].name != this.previousName || this.previousPicture != sequenceData.data[0].picture || this.previousSize != sequenceData.data[0].isBig || !sequenceData.data[0].isBig);
            this.needToFadeout = (sequenceData.data.length <= 1 || sequenceData.data[0].name != sequenceData.data[1].name || sequenceData.data[0].picture != sequenceData.data[1].picture || this.previousSize != sequenceData.data[0].isBig || !sequenceData.data[0].isBig);
            reanimate = restart;
            this.needToFadeout = sequenceData.data.length <= 1;
            DialogBox.TRACKTUTORIAL_A = sequenceData.data[0].id;
            this.showDialog(sequenceData.data.shift(), reanimate, function () { return _this.showSequence(sequenceData, callback); }, isNarration);
        }
        else {
            callback();
        }
    };
    DialogBox.prototype.showDialog = function (dialogData, reanimate, callback, isNarration) {
        var _this = this;
        if (isNarration === void 0) { isNarration = false; }
        if (game.world.scale.x !== 1 || game.world.scale.y !== 1) {
            this.scale.setTo(1 / game.world.scale.x, 1 / game.world.scale.y);
            this.x = this.initPosX + 190;
            this.y = this.initPosY + 130;
        }
        {
            this.x = this.initPosX;
            this.y = this.initPosY;
        }
        this.currentDialogCallback = callback;
        this.visible = true;
        this.isActive = false;
        var picture = this.picture;
        var shadow = this.shadow;
        var nameTf = this.nameTf;
        var dialogTf = this.dialogTf;
        var box = this.box;
        var indicator = this.indicator;
        var boxTweenX;
        var picTweenX;
        var picTweenY;
        var shadowTweenX;
        var shadowTweenY;
        this.previousName = dialogData.name;
        this.previousSize = dialogData.isBig;
        this.previousPicture = dialogData.picture;
        picture.alpha = 1;
        shadow.alpha = DialogBox.SHADOW_ALPHA;
        box.alpha = 1;
        nameTf.alpha = 1;
        dialogTf.alpha = 1;
        picture.y = 192;
        shadow.y = picture.y + DialogBox.SHADOW_DISTANCE;
        picture.loadTexture(cjBlank);
        // shadow.loadTexture(txa_atlas, dialogData.picture);
        shadow.alpha = DialogBox.SHADOW_ALPHA;
        nameTf.text = dialogData.name;
        dialogTf.text = "";
        indicator.visible = false;
        this.currentDialogSentence = dialogData.sentence.split("");
        this.isAutoClose = dialogData.autoClose;
        this.isInverted = dialogData.isInverted;
        this.currentLetterDelay = 0;
        this.currentSkipDelay = 0;
        this.dialogCompleteDelay = 0;
        this.indicatorDelay = 0;
        this.isBig = dialogData.isBig;
        this.hasMask = dialogData.useMask;
        if (dialogData.isBig) {
            if (this.isInverted) {
                boxTweenX = "200";
                picTweenX = "100";
                picTweenY = "50";
                shadowTweenX = "200";
                shadowTweenY = "100";
                picture.x = gameWidth;
                box.x = gameWidth - 190;
                shadow.scale.x = picture.scale.x = box.scale.x = -1;
                nameTf.anchor.x = 1;
                nameTf.x = gameWidth - 250;
                dialogTf.x = 225;
                indicator.x = 750;
                shadow.x = picture.x + DialogBox.SHADOW_DISTANCE;
            }
            else {
                boxTweenX = "0";
                picTweenX = "-100";
                picTweenY = "50";
                shadowTweenX = "-200";
                shadowTweenY = "100";
                picture.x = 10;
                box.x = 150;
                shadow.scale.x = picture.scale.x = box.scale.x = 1;
                nameTf.anchor.x = 0;
                nameTf.x = 285;
                dialogTf.x = 175;
                indicator.x = 900;
                shadow.x = picture.x - DialogBox.SHADOW_DISTANCE;
            }
            shadow.visible = true;
            picture.visible = true;
            nameTf.visible = true;
            box.loadTexture(cjCallout);
            dialogTf.fontSize = 20;
            dialogTf.maxWidth = 200;
            dialogTf.y = -92;
            indicator.scale.setTo(1);
            if (this.hasMask) {
                var mask = this.uiMask;
                mask.clear();
                mask.visible = false;
            }
        }
        else {
            box.loadTexture(cjCallout);
            shadow.visible = false;
            picture.visible = false;
            nameTf.visible = false;
            box.x = 0;
            dialogTf.fontSize = 16;
            dialogTf.maxWidth = 400;
            this.x = dialogData.offsetX;
            this.y = dialogData.offsetY;
            dialogTf.x = 110; //offset Text Bubble Small
            dialogTf.y = 30;
            indicator.x = 490;
            indicator.scale.setTo(0.5);
            if (this.hasMask) {
                var mask = this.uiMask;
                mask.clear();
                mask.visible = true;
                mask.beginFill(0, 0.7);
                mask.drawRect(0, 0, dialogData.maskX, gameHeight); //left
                mask.drawRect(dialogData.maskX, 0, dialogData.maskW, dialogData.maskY); //midtop
                mask.drawRect(dialogData.maskX, dialogData.maskY + dialogData.maskH, dialogData.maskW, gameHeight); //midbot
                mask.drawRect(dialogData.maskX + dialogData.maskW, 0, gameWidth, gameHeight); //right
                mask.endFill();
                mask.lineStyle(2, 0xffffff, 1);
                mask.drawRect(dialogData.maskX, dialogData.maskY, dialogData.maskW, dialogData.maskH); //midbot
                mask.alpha = 0;
                game.add.tween(mask).to({ alpha: 1 }, 100).start();
            }
        }
        if (reanimate) {
            //SoundPlayer.playSound(SoundPlayer.POPUP);
            game.add.tween(box).from({ alpha: 0, x: boxTweenX }, 250, Phaser.Easing.Quadratic.Out, true, 0);
            game.add.tween(picture).from({ alpha: 0, x: picTweenX, y: picTweenY }, 500, Phaser.Easing.Quadratic.Out, true, 200);
            game.add.tween(shadow).from({ alpha: 0, x: shadowTweenX, y: shadowTweenY }, 500, Phaser.Easing.Quadratic.Out, true, 200);
            game.add.tween(nameTf).from({ alpha: 0 }, 250, Phaser.Easing.Quadratic.Out, true, 450).onComplete.addOnce(function () { _this.isActive = true; }, this);
        }
        else {
            this.isActive = true;
        }
        if (isNarration) {
            shadow.visible = false;
            picture.visible = false;
            nameTf.visible = false;
        }
    };
    DialogBox.prototype.update = function () {
        var dtms = game.time.elapsedMS;
        if (this.isActive) {
            if (this.currentDialogSentence.length > 0) {
                this.currentSkipDelay += dtms;
                this.indicator.visible = false;
                this.currentLetterDelay += dtms;
                while (this.currentLetterDelay > DialogBox.LETTER_DELAY) {
                    this.currentLetterDelay -= DialogBox.LETTER_DELAY;
                    this.appendLetter();
                }
                var activePointer = game.input.activePointer;
                if (this.isDialogInputEnabled && !this.isAutoClose && this.currentSkipDelay > DialogBox.DIALOG_SKIP_DELAY && this.isJustPressed && activePointer.y > 50) {
                    //console.log("FAST APPEND TEXT")
                    this.isJustPressed = false;
                    while (this.currentDialogSentence.length > 0) {
                        this.appendLetter();
                    }
                }
            }
            else {
                this.dialogCompleteDelay += dtms;
                if (this.isAutoClose) {
                    if (this.dialogCompleteDelay > DialogBox.AUTO_CLOSE_DELAY) {
                        this.animateOut();
                    }
                }
                else if (this.isDialogInputEnabled) {
                    this.indicator.visible = true;
                    this.indicatorDelay += dtms;
                    if (this.indicatorDelay < DialogBox.INDICATOR_DOWN_DELAY) {
                        if (this.isBig)
                            this.indicator.y = DialogBox.INDICATOR_Y + (this.indicatorDelay / DialogBox.INDICATOR_DOWN_DELAY) * DialogBox.INDICATOR_DISTANCE;
                        else
                            this.indicator.y = DialogBox.INDICATOR_Y_SMALL + (this.indicatorDelay / DialogBox.INDICATOR_DOWN_DELAY) * DialogBox.INDICATOR_DISTANCE;
                    }
                    else if (this.indicatorDelay < DialogBox.INDICATOR_DOWN_DELAY + DialogBox.INDICATOR_UP_DELAY) {
                        if (this.isBig)
                            this.indicator.y = DialogBox.INDICATOR_Y + DialogBox.INDICATOR_DISTANCE - ((this.indicatorDelay - DialogBox.INDICATOR_DOWN_DELAY) / DialogBox.INDICATOR_UP_DELAY) * DialogBox.INDICATOR_DISTANCE;
                        else
                            this.indicator.y = DialogBox.INDICATOR_Y_SMALL + DialogBox.INDICATOR_DISTANCE - ((this.indicatorDelay - DialogBox.INDICATOR_DOWN_DELAY) / DialogBox.INDICATOR_UP_DELAY) * DialogBox.INDICATOR_DISTANCE;
                    }
                    else if (this.indicatorDelay > DialogBox.INDICATOR_DOWN_DELAY + DialogBox.INDICATOR_UP_DELAY + DialogBox.INDICATOR_PAUSE_DELAY) {
                        this.indicatorDelay = 0;
                    }
                    var activePointer = game.input.activePointer;
                    if (this.isJustPressed && activePointer.y > 50 && this.dialogCompleteDelay > DialogBox.DIALOG_COMPLETE_DELAY) {
                        this.isJustPressed = false;
                        this.animateOut();
                    }
                }
                else {
                    this.currentDialogCallback();
                    this.isActive = false;
                }
            }
        }
        this.isJustPressed = false;
    };
    DialogBox.prototype.animateOut = function () {
        var _this = this;
        this.isActive = false;
        this.indicator.visible = false;
        if (this.needToFadeout) {
            var mask = this.uiMask;
            game.add.tween(mask).to({ alpha: 0 }, 200).start().onComplete.addOnce(function () {
                mask.visible = false;
                mask.clear();
            });
            game.add.tween(this.box).to({ alpha: 0 }, 250, Phaser.Easing.Quadratic.Out, true, 300).onComplete.addOnce(function () { return _this.currentDialogCallback(); }, this);
            game.add.tween(this.picture).to({ alpha: 0 }, 250, Phaser.Easing.Quadratic.Out, true);
            game.add.tween(this.shadow).to({ alpha: 0 }, 250, Phaser.Easing.Quadratic.Out, true);
            game.add.tween(this.nameTf).to({ alpha: 0 }, 250, Phaser.Easing.Quadratic.Out, true);
            game.add.tween(this.dialogTf).to({ alpha: 0 }, 250, Phaser.Easing.Quadratic.Out, true);
        }
        else {
            this.currentDialogCallback();
        }
    };
    DialogBox.prototype.appendLetter = function () {
        var letter = this.currentDialogSentence.shift();
        if (letter == "|") {
            this.currentLetterDelay -= DialogBox.LETTER_LONG_DELAY;
        }
        else if (letter) {
            this.dialogTf.text += letter;
            this.soundDelay++;
            if (this.soundDelay > 2) {
                //SoundPlayer.playSound(SoundPlayer.TEXT);
                this.soundDelay = 0;
            }
        }
    };
    DialogBox.LETTER_DELAY = 20;
    DialogBox.LETTER_LONG_DELAY = 250;
    DialogBox.AUTO_CLOSE_DELAY = 1500;
    DialogBox.DIALOG_COMPLETE_DELAY = 100;
    DialogBox.DIALOG_SKIP_DELAY = 100;
    DialogBox.INDICATOR_DOWN_DELAY = 250;
    DialogBox.INDICATOR_UP_DELAY = 250;
    DialogBox.INDICATOR_PAUSE_DELAY = 150;
    DialogBox.INDICATOR_Y = 150;
    DialogBox.INDICATOR_Y_SMALL = 95;
    DialogBox.INDICATOR_DISTANCE = 10;
    DialogBox.SHADOW_ALPHA = 0.5;
    DialogBox.SHADOW_DISTANCE = 10;
    return DialogBox;
}(Phaser.Image));
var DialogData = /** @class */ (function () {
    function DialogData(id, name, picture, sentence, isInverted, autoClose) {
        if (isInverted === void 0) { isInverted = false; }
        if (autoClose === void 0) { autoClose = false; }
        this.id = id;
        this.name = name;
        this.picture = picture;
        this.sentence = sentence;
        this.isInverted = isInverted;
        this.autoClose = autoClose;
        this.useMask = false;
        this.isBig = true;
        this.offsetX = 0;
        this.offsetY = 0;
    }
    DialogData.prototype.setMask = function (maskX, maskY, maskW, maskH) {
        this.useMask = true;
        this.maskX = maskX;
        this.maskY = maskY;
        this.maskW = maskW;
        this.maskH = maskH;
    };
    DialogData.prototype.setSize = function (isBig, offsetX, offsetY) {
        if (isBig === void 0) { isBig = true; }
        if (offsetX === void 0) { offsetX = 0; }
        if (offsetY === void 0) { offsetY = 0; }
        this.isBig = isBig;
        this.offsetX = offsetX;
        this.offsetY = offsetY;
    };
    return DialogData;
}());
var DialogSequenceData = /** @class */ (function () {
    function DialogSequenceData(id) {
        this.id = id;
        this.data = [];
        var sequenceArray = DialogSequenceData.SequenceJson[id];
        if (sequenceArray == undefined)
            console.log("ERROR : Sequence with ID " + id + " does not exist");
        for (var i = 0; i < sequenceArray.length; i++) {
            var dialogArray = sequenceArray[i];
            var sentenceID = id + "_" + i;
            var hasMask = dialogArray[1];
            var isBig = dialogArray[0] == "big";
            var data = this.addDialog(sentenceID, this.getText("chara_name"), cjBlank, this.getText(sentenceID), false, false);
            if (hasMask)
                data.setMask(dialogArray[4], dialogArray[5], dialogArray[6], dialogArray[7]);
            if (isBig)
                data.setSize(isBig);
            else
                data.setSize(isBig, dialogArray[2], dialogArray[3]);
        }
    }
    DialogSequenceData.prototype.getText = function (id) {
        return Language.GetText(id);
    };
    DialogSequenceData.prototype.addDialog = function (id, name, picture, sentence, isInverted, autoClose) {
        if (isInverted === void 0) { isInverted = false; }
        if (autoClose === void 0) { autoClose = false; }
        var data = new DialogData(id, name, picture, sentence, isInverted, autoClose);
        this.addDialogData(data);
        return data;
    };
    DialogSequenceData.prototype.addDialogData = function (dialogData) {
        this.data.push(dialogData);
    };
    DialogSequenceData.prototype.clone = function () {
        return new DialogSequenceData(this.id);
    };
    return DialogSequenceData;
}());
var QuestionBox = /** @class */ (function (_super) {
    __extends(QuestionBox, _super);
    function QuestionBox() {
        var _this = _super.call(this) || this;
        _this.answerButtons = [];
        for (var i = 0; i < 4; i++) {
            var answerBtn = new AnswerButton();
            _this.answerButtons.push(answerBtn);
            _this.addChild(answerBtn);
        }
        _this.visible = false;
        _this.isDialogInputEnabled = false;
        return _this;
    }
    QuestionBox.prototype.showQuestion = function (name, pictureKey, question, answers, callback, inverted) {
        var _this = this;
        this.visible = true;
        this.isActive = false;
        var picture = this.picture;
        var shadow = this.shadow;
        var nameTf = this.nameTf;
        var dialogTf = this.dialogTf;
        var box = this.box;
        var indicator = this.indicator;
        var boxTweenX;
        var picTweenX;
        var picTweenY;
        var shadowTweenX;
        var shadowTweenY;
        dialogTf.y = 57 - 370;
        box.y = -370;
        nameTf.y = 9 - 370;
        picture.alpha = 1;
        shadow.alpha = DialogBox.SHADOW_ALPHA;
        box.alpha = 1;
        nameTf.alpha = 1;
        dialogTf.alpha = 1;
        picture.loadTexture(pictureKey);
        shadow.loadTexture(pictureKey);
        shadow.alpha = DialogBox.SHADOW_ALPHA;
        nameTf.text = name;
        dialogTf.text = "";
        indicator.visible = false;
        this.currentDialogSentence = question.split("");
        this.isAutoClose = false;
        this.isInverted = inverted;
        this.currentLetterDelay = 0;
        this.currentSkipDelay = 0;
        this.dialogCompleteDelay = 0;
        this.indicatorDelay = 0;
        if (this.isInverted) {
            boxTweenX = "200";
            picTweenX = "100";
            picTweenY = "50";
            shadowTweenX = "200";
            shadowTweenY = "100";
            picture.x = gameWidth;
            box.x = gameWidth - 190;
            shadow.scale.x = picture.scale.x = box.scale.x = -1;
            nameTf.anchor.x = 1;
            nameTf.x = gameWidth - 250;
            dialogTf.x = 125;
            indicator.x = 750;
            shadow.x = picture.x + DialogBox.SHADOW_DISTANCE;
        }
        else {
            boxTweenX = "-200";
            picTweenX = "-100";
            picTweenY = "50";
            shadowTweenX = "-200";
            shadowTweenY = "100";
            picture.x = 0;
            box.x = 190;
            shadow.scale.x = picture.scale.x = box.scale.x = 1;
            nameTf.anchor.x = 0;
            nameTf.x = 250;
            dialogTf.x = 250;
            indicator.x = 880;
            shadow.x = picture.x - DialogBox.SHADOW_DISTANCE;
        }
        game.add.tween(box).from({ alpha: 0, x: boxTweenX }, 250, Phaser.Easing.Quadratic.Out, true, 0);
        game.add.tween(picture).from({ alpha: 0, x: picTweenX, y: picTweenY }, 500, Phaser.Easing.Quadratic.Out, true, 200);
        game.add.tween(shadow).from({ alpha: 0, x: shadowTweenX, y: shadowTweenY }, 500, Phaser.Easing.Quadratic.Out, true, 200);
        game.add.tween(nameTf).from({ alpha: 0 }, 250, Phaser.Easing.Quadratic.Out, true, 450).onComplete.addOnce(function () { _this.isActive = true; }, this);
        var ansX = box.x + 200 + 395;
        if (this.isInverted)
            ansX = box.x - 395 - 200;
        this.currentDialogCallback = function () {
            for (var i = 0; i < answers.length; i++) {
                _this.answerButtons[i].show(ansX, box.y + 245 + i * 110, i, answers[i], function (id) {
                    callback(id);
                    _this.hideQuestion();
                });
            }
        };
    };
    QuestionBox.prototype.hideQuestion = function () {
        for (var _i = 0, _a = this.answerButtons; _i < _a.length; _i++) {
            var btn = _a[_i];
            btn.hide();
            btn.removeAllListeners();
        }
        game.add.tween(this.box).to({ alpha: 0 }, 200, Phaser.Easing.Quadratic.Out, true);
        game.add.tween(this.picture).to({ alpha: 0 }, 200, Phaser.Easing.Quadratic.Out, true);
        game.add.tween(this.shadow).to({ alpha: 0 }, 200, Phaser.Easing.Quadratic.Out, true);
        game.add.tween(this.nameTf).to({ alpha: 0 }, 200, Phaser.Easing.Quadratic.Out, true);
        game.add.tween(this.dialogTf).to({ alpha: 0 }, 200, Phaser.Easing.Quadratic.Out, true);
    };
    return QuestionBox;
}(DialogBox));
var BaseState = /** @class */ (function (_super) {
    __extends(BaseState, _super);
    function BaseState() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.sfxDragonDelay = 0;
        _this.pointerStatus = 'up';
        _this.INF = 10000000;
        return _this;
    }
    BaseState.prototype.create = function () {
        var _this = this;
        this.hasInit = false;
        this.initBGM();
        game.input.onDown.add(function () {
            _this.loadDataSavedSFX();
        }, this);
    };
    BaseState.prototype.playSFXDragon = function () {
        if (this.sfxDragonDelay > 0)
            return;
        this.sfxDragonDelay = 1;
        SoundPlayer.playSFX(SoundPlayer.DRAGON);
        this.loadDataSavedSFX();
    };
    BaseState.prototype.smoothSound = function () {
        if (this.sfxDragonDelay > 0)
            this.sfxDragonDelay -= 0.1;
    };
    BaseState.prototype.initMouse = function () {
        var _this = this;
        game.input.onDown.add(function () {
            _this.pointerStatus = 'down';
        });
        game.input.onUp.add(function () {
            _this.pointerStatus = 'up';
        });
    };
    BaseState.prototype.initKeyboard = function () {
        var _this = this;
        this.spaceBar = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
        this.spaceBar.onDown.add(function () {
            _this.pointerStatus = 'down';
            console.log("down");
        });
        this.spaceBar.onUp.add(function () {
            _this.pointerStatus = 'up';
        });
    };
    BaseState.prototype.onSegment = function (p, q, r) {
        if (q.x <= Math.max(p.x, r.x) &&
            q.x >= Math.min(p.x, r.x) &&
            q.y <= Math.max(p.y, r.y) &&
            q.y >= Math.min(p.y, r.y)) {
            return true;
        }
        return false;
    };
    BaseState.prototype.orientation = function (p, q, r) {
        var val = (q.y - p.y) * (r.x - q.x)
            - (q.x - p.x) * (r.y - q.y);
        if (val == 0) {
            return 0;
        }
        return (val > 0) ? 1 : 2;
    };
    BaseState.prototype.doIntersect = function (p1, q1, p2, q2) {
        var o1 = this.orientation(p1, q1, p2);
        var o2 = this.orientation(p1, q1, q2);
        var o3 = this.orientation(p2, q2, p1);
        var o4 = this.orientation(p2, q2, q1);
        if (o1 != o2 && o3 != o4) {
            return true;
        }
        if (o1 == 0 && this.onSegment(p1, p2, q1)) {
            return true;
        }
        if (o2 == 0 && this.onSegment(p1, q2, q1)) {
            return true;
        }
        if (o3 == 0 && this.onSegment(p2, p1, q2)) {
            return true;
        }
        if (o4 == 0 && this.onSegment(p2, q1, q2)) {
            return true;
        }
        return false;
    };
    BaseState.prototype.isInside = function (polygon, n, p) {
        if (n < 3) {
            return false;
        }
        var extreme = {
            x: this.INF,
            y: p.y
        };
        var count = 0, i = 0;
        do {
            var next = (i + 1) % n;
            if (this.doIntersect(polygon[i], polygon[next], p, extreme)) {
                if (this.orientation(polygon[i], p, polygon[next]) == 0) {
                    return this.onSegment(polygon[i], p, polygon[next]);
                }
                count++;
            }
            i = next;
        } while (i != 0);
        return (count % 2 == 1);
    };
    BaseState.prototype.loadDataSaved = function () {
        if (StoragePlayer.load(SAVE_ISFIRST)) {
            ISFIRST = StoragePlayer.load(SAVE_ISFIRST);
        }
        else
            ISFIRST = false;
        if (StoragePlayer.load(SAVE_DEATH)) {
            DEATH_COUNTER = StoragePlayer.load(SAVE_DEATH);
        }
        else
            DEATH_COUNTER = 0;
        if (StoragePlayer.load(SAVE_COIN)) {
            COIN_COUNTER = StoragePlayer.load(SAVE_COIN);
        }
        else
            COIN_COUNTER = 0;
        if (StoragePlayer.load(SAVE_MAGNET)) {
            MAGNET_COUNTER = StoragePlayer.load(SAVE_MAGNET);
        }
        else
            MAGNET_COUNTER = 0;
        if (StoragePlayer.load(SAVE_SHIELD)) {
            SHIELD_COUNTER = StoragePlayer.load(SAVE_SHIELD);
        }
        else
            SHIELD_COUNTER = 0;
        if (StoragePlayer.load(SAVE_FIRE)) {
            FIRE_DRAGON_COUNTER = StoragePlayer.load(SAVE_FIRE);
        }
        else
            FIRE_DRAGON_COUNTER = 0;
        if (StoragePlayer.load(SAVE_EARTH)) {
            EARTH_DRAGON_COUNTER = StoragePlayer.load(SAVE_EARTH);
        }
        else
            EARTH_DRAGON_COUNTER = 0;
        if (StoragePlayer.load(SAVE_DIAMOND)) {
            DIAMOND_COUNTER = StoragePlayer.load(SAVE_DIAMOND);
        }
        else
            DIAMOND_COUNTER = 0;
        if (StoragePlayer.load(SAVE_LASER)) {
            LASER_COUNTER = StoragePlayer.load(SAVE_LASER);
        }
        else
            LASER_COUNTER = 0;
        if (StoragePlayer.load(SAVE_ENEMY)) {
            ENEMY_COUNTER = StoragePlayer.load(SAVE_ENEMY);
        }
        else
            ENEMY_COUNTER = 0;
        if (StoragePlayer.load(SAVE_STATIC)) {
            STATIC_COUNTER = StoragePlayer.load(SAVE_STATIC);
        }
        else
            STATIC_COUNTER = 0;
        if (StoragePlayer.load(SAVE_ROCKET)) {
            ROCKET_COUNTER = StoragePlayer.load(SAVE_ROCKET);
        }
        else
            ROCKET_COUNTER = 0;
        if (StoragePlayer.load(SAVE_SPIKE)) {
            SPIKE_COUNTER = StoragePlayer.load(SAVE_SPIKE);
        }
        else
            SPIKE_COUNTER = 0;
        if (StoragePlayer.load(SAVE_MOMO)) {
            MOMO_COUNTER = StoragePlayer.load(SAVE_MOMO);
        }
        else
            MOMO_COUNTER = 0;
        if (StoragePlayer.load(SAVE_TURTLE)) {
            TURTLE_COUNTER = StoragePlayer.load(SAVE_TURTLE);
        }
        else
            TURTLE_COUNTER = 0;
        if (StoragePlayer.load(SAVE_ACHIEVEMENT)) {
            ACHIEVEMENT_COUNTER = StoragePlayer.load(SAVE_ACHIEVEMENT);
        }
        else
            ACHIEVEMENT_COUNTER = 0;
        if (StoragePlayer.load(SAVE_SKINS)) {
            ARRAY_SKINS = StoragePlayer.load(SAVE_SKINS);
        }
        else
            ARRAY_SKINS = [0, 0, 0];
        if (StoragePlayer.load(SAVE_CLAIM)) {
            STATUS_CLAIM = StoragePlayer.load(SAVE_CLAIM);
        }
        else {
            STATUS_CLAIM = {
                magnet: false,
                shield: false,
                distance: false,
                fire: false,
                earth: false,
                coin: false,
                diamond: false,
                speed: false,
                momo: false,
                turtle: false,
                laser: false,
                enemy: false,
                static: false,
                rocket: false,
                spike: false
            };
        }
        if (StoragePlayer.load(SAVE_TOP_SPEED)) {
            TOP_SPEED = StoragePlayer.load(SAVE_TOP_SPEED);
        }
        else
            TOP_SPEED = 0;
        if (StoragePlayer.load(SAVE_TOP_MOMO)) {
            TOP_MOMO = StoragePlayer.load(SAVE_TOP_MOMO);
        }
        else
            TOP_MOMO = 0;
        if (StoragePlayer.load(SAVE_TOP_TURTLE)) {
            TOP_TURTLE = StoragePlayer.load(SAVE_TOP_TURTLE);
        }
        else
            TOP_TURTLE = 0;
        // if(StoragePlayer.load(SAVE_TOP_METER)){
        //     TOP_METER = StoragePlayer.load(SAVE_TOP_METER);
        // }
        if (StoragePlayer.load(SAVE_ONCERUN_ACH)) {
            ONCERUN_ACH = StoragePlayer.load(SAVE_ONCERUN_ACH);
        }
        else
            ONCERUN_ACH = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        if (StoragePlayer.load(SAVE_STATUS_UPGRADE)) {
            var arrayStatus = StoragePlayer.load(SAVE_STATUS_UPGRADE);
            for (var index = 0; index < arrayStatus.length; index++) {
                var element = arrayStatus[index];
                arrayUpgrade[index].current = element;
            }
        }
        else {
            var arrayReset = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            for (var index = 0; index < arrayReset.length; index++) {
                var element = arrayReset[index];
                arrayUpgrade[index].current = element;
            }
        }
        if (StoragePlayer.load(SAVE_PRICE)) {
            PRICE_COUNTER = StoragePlayer.load(SAVE_PRICE);
            var array = arrayUpgrade;
            for (var i = 0; i < array.length; i++) {
                for (var j = 0; j < 5; j++) {
                    arrayUpgrade[i].price[j] = PRICE_COUNTER;
                }
            }
        }
        else {
            PRICE_COUNTER = 100;
            for (var i = 0; i < arrayUpgrade.length; i++) {
                for (var j = 0; j < 5; j++) {
                    arrayUpgrade[i].price[j] = PRICE_COUNTER;
                }
            }
        }
    };
    BaseState.prototype.loadDataSavedSFX = function () {
        if (StoragePlayer.load(SAVE_SFX) == "muted") {
            SoundPlayer.muteSFX();
        }
        else if (StoragePlayer.load(SAVE_SFX) == "unmuted") {
            SoundPlayer.unmuteSFX();
        }
    };
    BaseState.prototype.loadDataSavedBGM = function () {
        if (StoragePlayer.load(SAVE_BGM) == "muted") {
            SoundPlayer.muteBGM(SoundPlayer.BGM);
        }
        else if (StoragePlayer.load(SAVE_BGM) == "unmuted") {
            SoundPlayer.unmuteBGM(SoundPlayer.BGM);
        }
    };
    BaseState.prototype.initBGM = function () {
        //SoundPlayer.stopSound(SoundPlayer.BGM);
    };
    BaseState.prototype.transitionIn = function (callback) {
        var _this = this;
        if (callback === void 0) { callback = null; }
        this.game.input.enabled = false;
        this.initTransition();
        this.transitionBg.alpha = 1;
        this.game.add.tween(this.transitionBg).to({ alpha: 0 }, BaseState.TRANSITION_DURATION, Phaser.Easing.Quadratic.In, true, BaseState.TRANSITION_DURATION).onComplete.addOnce(function () {
            _this.game.input.enabled = true;
            _this.transitionBg.visible = false;
            if (callback != null) {
                callback();
            }
        }, this);
    };
    BaseState.prototype.update = function (game) {
        _super.prototype.update.call(this, game);
        dt = game.time.elapsedMS / seconds;
        if (dt > 0.5)
            dt = 0;
    };
    BaseState.prototype.transitionOut = function (newStateName) {
        var _this = this;
        this.game.input.enabled = false;
        this.initTransition();
        this.transitionBg.alpha = 0;
        this.game.add.tween(this.transitionBg).to({ alpha: 1 }, BaseState.TRANSITION_DURATION, Phaser.Easing.Quadratic.Out, true, BaseState.TRANSITION_DELAY).onComplete.addOnce(function () {
            _this.game.input.enabled = true;
            //console.log(this.game.state.current, newStateName);
            if (_this.game.state.current == newStateName) {
                _this.game.state.restart();
            }
            else {
                _this.game.state.start(newStateName);
            }
        }, this);
    };
    BaseState.prototype.initTransition = function () {
        this.transitionBg = new Phaser.Sprite(game, halfGameWidth, halfGameHeight, cjTransition);
        this.add.existing(this.transitionBg);
        this.tf = game.add.bitmapText(gameWidth / 2, gameHeight * 0.88, font_36, "", 36);
        this.tf.anchor.setTo(0.5);
        var tf = this.tf;
        tf.alpha = 0;
        tf.text = "";
        var bg = this.transitionBg;
        this.transitionBg.visible = true;
        bg.anchor.setTo(0.5, 0.5);
        bg.scale.setTo(gameWidth / BaseState.TRANSITION_BG_SIZE);
        this.add.existing(bg);
        this.add.existing(tf);
    };
    BaseState.prototype.quickCoverIn = function (message, instant) {
        if (message === void 0) { message = ""; }
        if (instant === void 0) { instant = false; }
        this.initTransition();
        this.tf.text = message;
        if (instant) {
            this.transitionBg.y = halfGameHeight;
            this.tf.alpha = 1;
        }
        else {
            this.transitionBg.alpha = 0;
            this.game.add.tween(this.transitionBg).to({ alpha: 1 }, 100, Phaser.Easing.Quadratic.Out, true);
            this.game.add.tween(this.tf).to({ alpha: 1 }, 100, Phaser.Easing.Quadratic.Out, true, 100);
        }
    };
    BaseState.prototype.quickCoverOut = function (message) {
        var _this = this;
        if (message === void 0) { message = ""; }
        this.initTransition();
        this.transitionBg.alpha = 1;
        this.tf.text = message;
        this.tf.alpha = 1;
        this.game.add.tween(this.tf).to({ alpha: 0 }, 100, Phaser.Easing.Quadratic.Out, true, 100);
        this.game.add.tween(this.transitionBg).to({ alpha: 0 }, 100, Phaser.Easing.Quadratic.In, true, 100).onComplete.addOnce(function () {
            _this.transitionBg.visible = false;
        }, this);
    };
    BaseState.TRANSITION_DURATION = 200;
    BaseState.TRANSITION_DELAY = 0;
    BaseState.TRANSITION_BG_SIZE = 512;
    return BaseState;
}(Phaser.State));
var Congrats = /** @class */ (function (_super) {
    __extends(Congrats, _super);
    function Congrats() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Congrats.prototype.create = function () {
        _super.prototype.create.call(this);
        this.add.sprite(0, 0, cjBlank);
        var congratsComplete = new TextWithOutline(600, 335, 0xFFFFFF, textTint, font_90, Language.GetText("congrats_complete"), 37, "left", 1.5);
        congratsComplete.setAnchor(0.5, 0.5);
        game.add.existing(congratsComplete);
        var congratsThanks = new TextWithOutline(600, 410, 0xFFFFFF, textTint, font_90, Language.GetText("congrats_thanks"), 48, "left", 1.5);
        congratsThanks.setAnchor(0.5, 0.5);
        game.add.existing(congratsThanks);
        this.transitionIn();
    };
    Congrats.NAME = "congrats";
    return Congrats;
}(BaseState));
var Preloader = /** @class */ (function (_super) {
    __extends(Preloader, _super);
    function Preloader() {
        return _super.call(this) || this;
    }
    Preloader.prototype.preload = function () {
        this.initGUI();
        this.game.load.onFileComplete.add(this.onProgress, this);
        ImageLoader.loadImages(game);
        game.load.audio(SoundPlayer.BGM, "StreamingAssets/" + SoundPlayer.BGM);
        game.load.audio(SoundPlayer.CLICK, "StreamingAssets/" + SoundPlayer.CLICK);
        game.load.audio(SoundPlayer.CLICKFAIL, "StreamingAssets/" + SoundPlayer.CLICKFAIL);
        game.load.audio(SoundPlayer.RIGHT, "StreamingAssets/" + SoundPlayer.RIGHT);
        game.load.audio(SoundPlayer.WRONG, "StreamingAssets/" + SoundPlayer.WRONG);
        game.load.audio(SoundPlayer.COIN, "StreamingAssets/" + SoundPlayer.COIN);
        game.load.audio(SoundPlayer.SHOOT, "StreamingAssets/" + SoundPlayer.SHOOT);
        game.load.audio(SoundPlayer.HIT, "StreamingAssets/" + SoundPlayer.HIT);
        game.load.audio(SoundPlayer.POWERUP, "StreamingAssets/" + SoundPlayer.POWERUP);
        game.load.audio(SoundPlayer.MISSILE, "StreamingAssets/" + SoundPlayer.MISSILE);
        game.load.audio(SoundPlayer.WHOSH1, "StreamingAssets/" + SoundPlayer.WHOSH1);
        game.load.audio(SoundPlayer.WHOSH2, "StreamingAssets/" + SoundPlayer.WHOSH2);
        game.load.audio(SoundPlayer.WHOSH3, "StreamingAssets/" + SoundPlayer.WHOSH3);
        game.load.audio(SoundPlayer.WHOSH4, "StreamingAssets/" + SoundPlayer.WHOSH4);
        game.load.audio(SoundPlayer.WHOSH5, "StreamingAssets/" + SoundPlayer.WHOSH5);
        game.load.audio(SoundPlayer.LASERCHARGE, "StreamingAssets/" + SoundPlayer.LASERCHARGE);
        game.load.audio(SoundPlayer.DRAGON, "StreamingAssets/" + SoundPlayer.DRAGON);
        game.load.audio(SoundPlayer.STEP, "StreamingAssets/" + SoundPlayer.STEP);
        game.load.audio(SoundPlayer.BOULDER, "StreamingAssets/" + SoundPlayer.BOULDER);
        game.load.audio(SoundPlayer.CYMBAL, "StreamingAssets/" + SoundPlayer.CYMBAL);
        game.load.audio(SoundPlayer.DRUM, "StreamingAssets/" + SoundPlayer.DRUM);
        game.load.audio(SoundPlayer.FAIL, "StreamingAssets/" + SoundPlayer.FAIL);
        game.load.audio(SoundPlayer.HOWL, "StreamingAssets/" + SoundPlayer.HOWL);
        game.load.audio(SoundPlayer.MANHAIYA, "StreamingAssets/" + SoundPlayer.MANHAIYA);
        game.load.audio(SoundPlayer.MANUGH, "StreamingAssets/" + SoundPlayer.MANUGH);
        game.load.audio(SoundPlayer.WHOOSH, "StreamingAssets/" + SoundPlayer.WHOOSH);
        game.load.audio(SoundPlayer.WOMANHAIYA, "StreamingAssets/" + SoundPlayer.WOMANHAIYA);
        game.load.audio(SoundPlayer.EAGLE, "StreamingAssets/" + SoundPlayer.EAGLE);
        game.load.audio(SoundPlayer.WIND, "StreamingAssets/" + SoundPlayer.WIND);
        game.load.json("sequence", "json/dialogsequence.json");
        game.load.json("language", "json/language.json");
        game.load.json("dragon-anim", "json/dragon-anim.json");
    };
    Preloader.prototype.onProgress = function (progress, cacheKey, success, totalLoaded, totalFiles) {
        this.titleMask.beginFill(0, 1);
        this.titleMask.drawRect(0, 0, this.loadingBarFull.width * totalLoaded / totalFiles, this.loadingBarFull.height);
        this.titleMask.endFill();
    };
    Preloader.prototype.initGUI = function () {
        this.initBG();
        this.initLoadingBar();
        this.initMask();
        this.initButtonSponsor();
    };
    Preloader.prototype.initButtonSponsor = function () {
        this.buttonSponsor = new Phaser.Sprite(game, 0, 0, "logo");
        this.buttonSponsor.anchor.setTo(0.5, 0);
        this.buttonSponsor.x = GAMEWIDTH * 0.5;
        this.buttonSponsor.y = 20;
        this.buttonSponsor.inputEnabled = true;
        this.buttonSponsor.events.onInputDown.add(function () {
            window.open("https://armor.ag/MoreGames", "_blank");
        });
        game.add.existing(this.buttonSponsor);
    };
    Preloader.prototype.initMask = function () {
        this.titleMask = new Phaser.Graphics(this.game, this.loadingBarFull.x - this.loadingBarFull.width * 0.5, this.loadingBarFull.y - this.loadingBarFull.height * 0.5);
        this.add.existing(this.titleMask);
        this.loadingBarFull.mask = this.titleMask;
        this.titleMask.beginFill(0, 1);
        this.titleMask.drawRect(0, 0, this.loadingBarFull.width * 0.01, this.loadingBarFull.height);
        this.titleMask.endFill();
    };
    Preloader.prototype.initLoadingBar = function () {
        this.loadingBarBG = new Phaser.Image(game, 0, 0, "loading-empty");
        this.loadingBarFull = new Phaser.Image(game, 0, 0, "loading-full");
        this.loadingBarBG.anchor.setTo(0.5, 0.5);
        this.loadingBarFull.anchor.setTo(0.5, 0.5);
        this.loadingBarBG.x = this.loadingBarFull.x = 1024 * 0.5;
        this.loadingBarBG.y = this.loadingBarFull.y = 576 * 0.85;
        game.add.existing(this.loadingBarBG);
        game.add.existing(this.loadingBarFull);
    };
    Preloader.prototype.initBG = function () {
        this.loadingBG = new Phaser.Sprite(game, 0, 0, "loading-sky");
        game.add.existing(this.loadingBG);
    };
    Preloader.prototype.create = function () {
        DialogSequenceData.SequenceJson = game.cache.getJSON("sequence", true);
        BubbleChat.SequenceJson = game.cache.getJSON("sequence", true);
        game.sound.context.resume();
        Language.initLanguage(game.cache.getJSON("language", true).en);
        game.input.onDown.add(function () {
            window.open("https://armor.ag/MoreGames", "_blank");
        }, this);
        var video = game.add.video('armor-logo');
        var scale = GAMEWIDTH / video.width;
        video.unlock();
        video.addToWorld(0, -75, 0, 0, scale, scale);
        video.play();
        video.onComplete.addOnce(function () {
            video.destroy();
            Starter.StartGame();
            console.log('destroy video');
        }, this);
    };
    Preloader.NAME = "preloader";
    return Preloader;
}(BaseState));
var RunControl = /** @class */ (function (_super) {
    __extends(RunControl, _super);
    function RunControl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.counterMomo = 0;
        _this.counterTurtly = 0;
        _this.arrayChild = [];
        _this.arrayPosXChild = [400, 500, 600, 700, 800];
        _this.arrayHearts = [];
        _this.arrayButton = [];
        _this.setting = null;
        _this.explosionCounter = 3;
        _this.timerPlay = 1000;
        _this.timerPlayMax = 1000;
        _this.accelX = 0;
        _this.counterTimerSpeed = 1000;
        _this.counterTimerSpeedMax = 1000;
        _this.decelX = 0.1;
        _this.timerSpawnOverlap = 1000;
        _this.timerSpawnOverlapMax = 1500;
        _this.sfxStepDelay = 3;
        _this.sfxBoulderDelay = 3;
        _this.sfxRushDelay = 0;
        _this.sfxLaserDelay = 1;
        _this.sfxCoinDelay = 0.5;
        _this.sfxBirdDelay = 1;
        _this.sfxShootDelay = 1;
        _this.sfxHitDelay = 0.5;
        _this.sfxPowerUpDelay = 0;
        _this.sfxMissileDelay = 0.5;
        _this.timerInvulnerablePlayer = 0;
        _this.arrayBird = [];
        _this.timerSpawnLaserLong = 5000;
        _this.timerSpawnLaserLongMax = 9000;
        _this.maxMagnitude = 5;
        _this.counterMagnitude = 5;
        _this.currentObject = null;
        _this.isActiveDecel = false;
        _this.jumpCounter = 0;
        _this.isJumping = false;
        _this.jumpForceUp = 0;
        _this.jumpForceUpDefault = 5;
        _this.jumpForceDownFactor = 0.25;
        _this.jumpForceUpFactor = 0.5;
        _this.marginTop = DEFAULT_MARGINTOP;
        _this.arrayBullet = [];
        _this.timerSpawnBullet = 0;
        _this.timerSpawnBulletMax = 5;
        _this.dragonRush = null;
        _this.isDragonActive = false;
        _this.speedEarned = 0.05;
        _this.arrayObstacles = [];
        _this.startSpawnOnMeter = 12;
        _this.arraySet = [];
        _this.coinStartPosX = GAMEWIDTH + 100;
        _this.coinStartPosY = 61;
        _this.coinSpaceY = 31;
        _this.coinSpaceX = 30;
        _this.indexRandom = {
            simple: 0,
            pattern: 0,
            noObst: 0,
        };
        _this.arrayObstaclePattern = [
            [
                [, , , , , , , , , , , , , , , 1, , , , , , , , , , , , , , , ,] //01
                ,
                [, , , , 1, , , , , , , , , , 1, , 1, , , , , , , , , , , , , , ,] //02
                ,
                [, , , 1, 1, 1, , , , , , , , 1, , , , 1, , , , , , , , , , , , , ,] //03
                ,
                [, , 1, 1, 1, 1, 1, , , , , , 1, , , 2, , , 1, , , , , , , , 9, , , , ,] //04
                ,
                [, , , 1, 1, 1, , , , , , , , 1, , , , 1, , , , , , , , , , , , , ,] //05
                ,
                [, , , , 1, , , , , , , , , , 1, , 1, , , , , , , , , , , , , , ,] //06
                ,
                [, , , , , , , , , , , , , , , 1, , , , , , , , , , , , , , , ,] //07
                ,
                [, , , , , , , , , , , , , , 1, , 1, , , , , , , , , , 1, , , , ,] //08
                ,
                [, , , , , , , , , , , , , 1, , , , 1, , , , , , , , 1, 1, 1, , , ,] //09
                ,
                [, , , , 9, , , , , , , , 1, , , , , , 1, , , , , , 1, 1, 1, 1, 1, , ,] //10
                ,
                [, , , , , , , , , , , , , 1, , , , 1, , , , , , , , 1, 1, 1, , , ,] //11
                ,
                [, , , , , , , , , , , , , , 1, , 1, , , , , , , , , , 1, , , , ,] //12
                ,
                [, , , , , , , , , , , , , , , 1, , , , , , , , , , , , , , , ,] //13
            ],
            [
                [, , , , , , , , , , , , , , , 1, , , , , , , , , , , , , , , ,] //01
                ,
                [, , , , , , , , , , , , , , 1, , 1, , , , , , , , , , 1, , , , ,] //02
                ,
                [, , , , , , , , , , , , , 1, , , , 1, , , , , , , , 1, 1, 1, , , ,] //03
                ,
                [, , , , 9, , , , , , , , 1, , , , , , 1, , , , , , 1, 1, 1, 1, 1, , ,] //04
                ,
                [, , , , , , , , , , , , , 1, , , , 1, , , , , , , , 1, 1, 1, , , ,] //05
                ,
                [, , , , , , , , , , , , , , 1, , 1, , , , , , , , , , 1, , , , ,] //06
                ,
                [, , , , , , , , , , , , , , , 1, , , , , , , , , , , , , , , ,] //07
                ,
                [, , , , 1, , , , , , , , , , 1, , 1, , , , , , , , , , , , , , ,] //08
                ,
                [, , , 1, 1, 1, , , , , , , , 1, , , , 1, , , , , , , , , , , , , ,] //09
                ,
                [, , 1, 1, 1, 1, 1, , , , , , 1, , , 2, , , 1, , , , , , , , 9, , , , ,] //10
                ,
                [, , , 1, 1, 1, , , , , , , , 1, , , , 1, , , , , , , , , , , , , ,] //11
                ,
                [, , , , 1, , , , , , , , , , 1, , 1, , , , , , , , , , , , , , ,] //12
                ,
                [, , , , , , , , , , , , , , , 1, , , , , , , , , , , , , , , ,] //13
            ],
            [
                [, , , , , , , , , , , , , , , 1, , , , , , , , , , , , , , , ,] //01
                ,
                [, , , , 1, , , , , , , , , , 1, , 1, , , , , , , , , , , , , , ,] //02
                ,
                [, , , 1, 1, 1, , , , , , , , 1, , , , 1, , , , , , , , , , , , , ,] //03
                ,
                [, , 1, 1, 1, 1, 1, , , , , , 1, , , 3, , , 1, , , , , , , , 9, , , , ,] //04
                ,
                [, , , 1, 1, 1, , , , , , , , 1, , , , 1, , , , , , , , , , , , , ,] //05
                ,
                [, , , , 1, , , , , , , , , , 1, , 1, , , , , , , , , , , , , , ,] //06
                ,
                [, , , , , , , , , , , , , , , 1, , , , , , , , , , , , , , , ,] //07
                ,
                [, , , , , , , , , , , , , , 1, , 1, , , , , , , , , , 1, , , , ,] //08
                ,
                [, , , , , , , , , , , , , 1, , , , 1, , , , , , , , 1, 1, 1, , , ,] //09
                ,
                [, , , , 9, , , , , , , , 1, , , , , , 1, , , , , , 1, 1, 1, 1, 1, , ,] //10
                ,
                [, , , , , , , , , , , , , 1, , , , 1, , , , , , , , 1, 1, 1, , , ,] //11
                ,
                [, , , , , , , , , , , , , , 1, , 1, , , , , , , , , , 1, , , , ,] //12
                ,
                [, , , , , , , , , , , , , , , 1, , , , , , , , , , , , , , , ,] //13
            ],
            [
                [, , , , , , , , , , , , , , , 1, , , , , , , , , , , , , , , ,] //01
                ,
                [, , , , , , , , , , , , , , 1, , 1, , , , , , , , , , 1, , , , ,] //02
                ,
                [, , , , , , , , , , , , , 1, , , , 1, , , , , , , , 1, 1, 1, , , ,] //03
                ,
                [, , , , 9, , , , , , , , 1, , , , , , 1, , , , , , 1, 1, 1, 1, 1, , ,] //04
                ,
                [, , , , , , , , , , , , , 1, , , , 1, , , , , , , , 1, 1, 1, , , ,] //05
                ,
                [, , , , , , , , , , , , , , 1, , 1, , , , , , , , , , 1, , , , ,] //06
                ,
                [, , , , , , , , , , , , , , , 1, , , , , , , , , , , , , , , ,] //07
                ,
                [, , , , 1, , , , , , , , , , 1, , 1, , , , , , , , , , , , , , ,] //08
                ,
                [, , , 1, 1, 1, , , , , , , , 1, , , , 1, , , , , , , , , , , , , ,] //09
                ,
                [, , 1, 1, 1, 1, 1, , , , , , 1, , , 3, , , 1, , , , , , , , 9, , , , ,] //10
                ,
                [, , , 1, 1, 1, , , , , , , , 1, , , , 1, , , , , , , , , , , , , ,] //11
                ,
                [, , , , 1, , , , , , , , , , 1, , 1, , , , , , , , , , , , , , ,] //12
                ,
                [, , , , , , , , , , , , , , , 1, , , , , , , , , , , , , , , ,] //13
            ],
            [
                [, , , , , , , , , , , , , , , 1, , , , , , , , , , , , , , , ,] //01
                ,
                [, , , , 1, , , , , , , , , , 1, , 1, , , , , , , , , , , , , , ,] //02
                ,
                [, , , 1, 1, 1, , , , , , , , 1, , , , 1, , , , , , , , , , , , , ,] //03
                ,
                [, , 1, 1, 1, 1, 1, , , , , , 1, , , 4, , , 1, , , , , , , , 9, , , , ,] //04
                ,
                [, , , 1, 1, 1, , , , , , , , 1, , , , 1, , , , , , , , , , , , , ,] //05
                ,
                [, , , , 1, , , , , , , , , , 1, , 1, , , , , , , , , , , , , , ,] //06
                ,
                [, , , , , , , , , , , , , , , 1, , , , , , , , , , , , , , , ,] //07
                ,
                [, , , , , , , , , , , , , , 1, , 1, , , , , , , , , , 1, , , , ,] //08
                ,
                [, , , , , , , , , , , , , 1, , , , 1, , , , , , , , 1, 1, 1, , , ,] //09
                ,
                [, , , , 9, , , , , , , , 1, , , , , , 1, , , , , , 1, 1, 1, 1, 1, , ,] //10
                ,
                [, , , , , , , , , , , , , 1, , , , 1, , , , , , , , 1, 1, 1, , , ,] //11
                ,
                [, , , , , , , , , , , , , , 1, , 1, , , , , , , , , , 1, , , , ,] //12
                ,
                [, , , , , , , , , , , , , , , 1, , , , , , , , , , , , , , , ,] //13
            ],
            [
                [, , , , , , , , , , , , , , , 1, , , , , , , , , , , , , , , ,] //01
                ,
                [, , , , , , , , , , , , , , 1, , 1, , , , , , , , , , 1, , , , ,] //02
                ,
                [, , , , , , , , , , , , , 1, , , , 1, , , , , , , , 1, 1, 1, , , ,] //03
                ,
                [, , , , 9, , , , , , , , 1, , , , , , 1, , , , , , 1, 1, 1, 1, 1, , ,] //04
                ,
                [, , , , , , , , , , , , , 1, , , , 1, , , , , , , , 1, 1, 1, , , ,] //05
                ,
                [, , , , , , , , , , , , , , 1, , 1, , , , , , , , , , 1, , , , ,] //06
                ,
                [, , , , , , , , , , , , , , , 1, , , , , , , , , , , , , , , ,] //07
                ,
                [, , , , 1, , , , , , , , , , 1, , 1, , , , , , , , , , , , , , ,] //08
                ,
                [, , , 1, 1, 1, , , , , , , , 1, , , , 1, , , , , , , , , , , , , ,] //09
                ,
                [, , 1, 1, 1, 1, 1, , , , , , 1, , , 4, , , 1, , , , , , , , 9, , , , ,] //10
                ,
                [, , , 1, 1, 1, , , , , , , , 1, , , , 1, , , , , , , , , , , , , ,] //11
                ,
                [, , , , 1, , , , , , , , , , 1, , 1, , , , , , , , , , , , , , ,] //12
                ,
                [, , , , , , , , , , , , , , , 1, , , , , , , , , , , , , , , ,] //13
            ],
            //========================================== double coin
            [
                [, , , , 1, , , , , , , , , , , , , , , , , , , , , , 1, , , , ,],
                [, , , 1, 1, 1, , , , , , , , , , , , , , , , , , , , 1, 1, 1, , , ,],
                [, , , , 1, , , , , , , , , , , , , , , , , , , , , , 1, , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, , , , , , , , ,],
                [, , , , , , , , , 1, , , , 1, , , , 1, , , , , 1, , , , , , , , ,],
                [, , , , 9, , , , , 1, , 4, , 1, , , , 1, , , , , 1, , , , 9, , , , ,],
                [, , , , , , , , , 1, , , , 1, , , , 1, , , , , 1, , , , , , , , ,],
                [, , , , , , , , , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , 1, , , , , , , , , , , , , , , , , , , , , , 1, , , , ,],
                [, , , 1, 1, 1, , , , , , , , , , , , , , , , , , , , 1, 1, 1, , , ,],
                [, , , , 1, , , , , , , , , , , , , , , , , , , , , , 1, , , , ,]
            ],
            [
                [, , , , 1, , , , , , , , , , , , , , , , , , , , , , 1, , , , ,],
                [, , , 1, 1, 1, , , , , , , , , , , , , , , , , , , , 1, 1, 1, , , ,],
                [, , , , 1, , , , , , , , , , , , , , , , , , , , , , 1, , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, , , , , , , , ,],
                [, , , , , , , , , 1, , , , 1, , , , 1, , , , , 1, , , , , , , , ,],
                [, , , , 9, , , , , 1, , , , 1, , , , 1, , , 4, , 1, , , , 9, , , , ,],
                [, , , , , , , , , 1, , , , 1, , , , 1, , , , , 1, , , , , , , , ,],
                [, , , , , , , , , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , 1, , , , , , , , , , , , , , , , , , , , , , 1, , , , ,],
                [, , , 1, 1, 1, , , , , , , , , , , , , , , , , , , , 1, 1, 1, , , ,],
                [, , , , 1, , , , , , , , , , , , , , , , , , , , , , 1, , , , ,]
            ],
            // ========================================= momo
            [
                [, , , , 1, , , , , , , , , 1, 1, 1, 1, 1, , , , , , , , , 1, , , , ,],
                [, , , 1, 1, 1, , , , , , , , 1, , , , 1, , , , , , , , 1, 1, 1, , , ,],
                [, , , , 1, , , , , , , , , 1, , 10, , 1, , , , , , , , , 1, , , , ,],
                [, , , , , , , , , , , , , 1, , , , 1, , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , 1, 1, 1, 1, 1, , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , 1, , , , 1, , , , , , , , , , , , , ,],
                [, , , , 9, , , , , , , , , 1, , , , 1, , , , , , , , , 9, , , , ,],
                [, , , , , , , , , , , , , 1, , , , 1, , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , 1, 1, 1, 1, 1, , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , 1, , , , 1, , , , , , , , , , , , , ,],
                [, , , , 1, , , , , , , , , 1, , , , 1, , , , , , , , , 1, , , , ,],
                [, , , 1, 1, 1, , , , , , , , 1, , , , 1, , , , , , , , 1, 1, 1, , , ,],
                [, , , , 1, , , , , , , , , 1, 1, 1, 1, 1, , , , , , , , , 1, , , , ,]
            ],
            [
                [, , , , 1, , , , , , , , , 1, 1, 1, 1, 1, , , , , , , , , 1, , , , ,],
                [, , , 1, 1, 1, , , , , , , , 1, , , , 1, , , , , , , , 1, 1, 1, , , ,],
                [, , , , 1, , , , , , , , , 1, , , , 1, , , , , , , , , 1, , , , ,],
                [, , , , , , , , , , , , , 1, , , , 1, , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , 1, 1, 1, 1, 1, , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , 1, , , , 1, , , , , , , , , , , , , ,],
                [, , , , 9, , , , , , , , , 1, , , , 1, , , , , , , , , 9, , , , ,],
                [, , , , , , , , , , , , , 1, , , , 1, , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , 1, 1, 1, 1, 1, , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , 1, , , , 1, , , , , , , , , , , , , ,],
                [, , , , 1, , , , , , , , , 1, , 10, , 1, , , , , , , , , 1, , , , ,],
                [, , , 1, 1, 1, , , , , , , , 1, , , , 1, , , , , , , , 1, 1, 1, , , ,],
                [, , , , 1, , , , , , , , , 1, 1, 1, 1, 1, , , , , , , , , 1, , , , ,]
            ],
            //===================================== turtly
            [
                [, , , , 1, , , , , , , , , , , , , , , , , , , , , , 1, , , , ,],
                [, , , 1, 1, 1, , , , , , , , , , , , , , , , , , , , 1, 1, 1, , , ,],
                [, , , , 1, , , , , , , , , , , , , , , , , , , , , , 1, , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, , , , , , , , ,],
                [, , , , , , , , , 1, , , , 1, , , , 1, , , , , 1, , , , , , , , ,],
                [, , , , 9, , , , , 1, , 11, , 1, , , , 1, , , , , 1, , , , 9, , , , ,],
                [, , , , , , , , , 1, , , , 1, , , , 1, , , , , 1, , , , , , , , ,],
                [, , , , , , , , , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , 1, , , , , , , , , , , , , , , , , , , , , , 1, , , , ,],
                [, , , 1, 1, 1, , , , , , , , , , , , , , , , , , , , 1, 1, 1, , , ,],
                [, , , , 1, , , , , , , , , , , , , , , , , , , , , , 1, , , , ,]
            ],
            [
                [, , , , 1, , , , , , , , , , , , , , , , , , , , , , 1, , , , ,],
                [, , , 1, 1, 1, , , , , , , , , , , , , , , , , , , , 1, 1, 1, , , ,],
                [, , , , 1, , , , , , , , , , , , , , , , , , , , , , 1, , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, , , , , , , , ,],
                [, , , , , , , , , 1, , , , 1, , , , 1, , , , , 1, , , , , , , , ,],
                [, , , , 9, , , , , 1, , , , 1, , , , 1, , , 11, , 1, , , , 9, , , , ,],
                [, , , , , , , , , 1, , , , 1, , , , 1, , , , , 1, , , , , , , , ,],
                [, , , , , , , , , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , 1, , , , , , , , , , , , , , , , , , , , , , 1, , , , ,],
                [, , , 1, 1, 1, , , , , , , , , , , , , , , , , , , , 1, 1, 1, , , ,],
                [, , , , 1, , , , , , , , , , , , , , , , , , , , , , 1, , , , ,]
            ],
        ];
        _this.arraySimple = [
            // [
            //     [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
            //     [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
            //     [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
            //     [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
            //     [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
            //     [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
            //     [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
            //     [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
            //     [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
            //     [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
            //     [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
            //     [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
            //     [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
            //     [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
            //     [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,]
            // ],
            [
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,]
            ],
            [
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,]
            ],
            [
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,]
            ],
            [
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,]
            ],
            [
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,]
            ],
            [
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,]
            ],
            [
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , 1, 1, 1, 1, 1, ,],
                [, , , , , , , , , , , , , , , , , , , , 1, 1, 1, 1, 1, , , , , , ,],
                [, , , , , , , , , , , , , , , 1, 1, 1, 1, 1, , , , , , , , , , , ,],
                [, , , , , , , , , , 1, 1, 1, 1, 1, , , , , , , , , , , , , , , , ,],
                [, , , , , 1, 1, 1, 1, 1, , , , , , , , , , , , , , , , , , , , , ,],
                [1, 1, 1, 1, 1, , , , , , , , , , , , , , , , , , , , , , , , , , ,]
            ],
            [
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , 1, 1, 1, 1, 1, ,],
                [, , , , , , , , , , , , , , , , , , , , 1, 1, 1, 1, 1, , , , , , ,],
                [, , , , , , , , , , , , , , , 1, 1, 1, 1, 1, , , , , , , , , , , ,],
                [, , , , , , , , , , 1, 1, 1, 1, 1, , , , , , , , , , , , , , , , ,],
                [, , , , , 1, 1, 1, 1, 1, , , , , , , , , , , , , , , , , , , , , ,],
                [1, 1, 1, 1, 1, , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,]
            ],
            [
                [, , , , , , , , , , , , , , , , , , , , , , , , , 1, 1, 1, 1, 1, ,],
                [, , , , , , , , , , , , , , , , , , , , 1, 1, 1, 1, 1, , , , , , ,],
                [, , , , , , , , , , , , , , , 1, 1, 1, 1, 1, , , , , , , , , , , ,],
                [, , , , , , , , , , 1, 1, 1, 1, 1, , , , , , , , , , , , , , , , ,],
                [, , , , , 1, 1, 1, 1, 1, , , , , , , , , , , , , , , , , , , , , ,],
                [1, 1, 1, 1, 1, , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,]
            ],
            [
                [1, 1, 1, 1, 1, , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , 1, 1, 1, 1, 1, , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , 1, 1, 1, 1, 1, , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , 1, 1, 1, 1, 1, , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , 1, 1, 1, 1, 1, , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , 1, 1, 1, 1, 1, ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,]
            ],
            [
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [1, 1, 1, 1, 1, , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , 1, 1, 1, 1, 1, , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , 1, 1, 1, 1, 1, , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , 1, 1, 1, 1, 1, , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , 1, 1, 1, 1, 1, , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , 1, 1, 1, 1, 1, ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,]
            ],
            [
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [1, 1, 1, 1, 1, , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , 1, 1, 1, 1, 1, , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , 1, 1, 1, 1, 1, , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , 1, 1, 1, 1, 1, , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , 1, 1, 1, 1, 1, , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , 1, 1, 1, 1, 1, ,]
            ],
            [
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , 1, 1, 1, 1, 1, ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , 1, 1, 1, 1, 1, , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , 1, 1, 1, 1, 1, , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , 1, 1, 1, 1, 1, , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , 1, 1, 1, 1, 1, , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [1, 1, 1, 1, 1, , , , , , , , , , , , , , , , , , , , , , , , , , ,]
            ],
            [
                [, , , , , , , , , , , , , , , , , , , , , , , , , 1, 1, 1, 1, 1, ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , 1, 1, 1, 1, 1, , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , 1, 1, 1, 1, 1, , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , 1, 1, 1, 1, 1, , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , 1, 1, 1, 1, 1, , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [1, 1, 1, 1, 1, , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,]
            ],
            [
                [1, 1, 1, 1, 1, , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , 1, 1, 1, 1, 1, , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , 1, 1, 1, 1, 1, , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , 1, 1, 1, 1, 1, , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , 1, 1, 1, 1, 1, , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , 1, 1, 1, 1, 1, ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,]
            ],
            [
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [1, 1, 1, 1, 1, , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , 1, 1, 1, 1, 1, , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , 1, 1, 1, 1, 1, , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , 1, 1, 1, 1, 1, , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , 1, 1, 1, 1, 1, , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , 1, 1, 1, 1, 1, ,]
            ],
        ];
        _this.arrayPattern = [
            [
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , 1, , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , 1, 1, , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , 1, 1, 1, , , , , , , , , ,],
                [, , , , , , , , , , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, , , , , , , , ,],
                [, , , , , , , , , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, , , , , , , ,],
                [, , , , , , , , , , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , 1, 1, 1, , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , 1, 1, , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , 1, , , , , , , , , , , ,]
            ],
            [
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , 1, , , 1, , 1, 1, 1, 1, , 1, , , , , 1, , , , , , 1, 1, 1, , , , ,],
                [, , , 1, , , 1, , 1, , , , , 1, , , , , 1, , , , , 1, , , , 1, , , ,],
                [, , , 1, , , 1, , 1, , , , , 1, , , , , 1, , , , , 1, , , , 1, , , ,],
                [, , , 1, 1, 1, 1, , 1, 1, 1, , , 1, , , , , 1, , , , , 1, , , , 1, , , ,],
                [, , , 1, , , 1, , 1, , , , , 1, , , , , 1, , , , , 1, , , , 1, , , ,],
                [, , , 1, , , 1, , 1, , , , , 1, , , , , 1, , , , , 1, , , , 1, , , ,],
                [, , , 1, , , 1, , 1, 1, 1, 1, , 1, 1, 1, 1, , 1, 1, 1, 1, , , 1, 1, 1, , , , ,]
            ],
            [
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , 1, , , 1, , 1, 1, 1, 1, , 1, , , , , 1, 1, 1, , , , , 1, , 1, , , ,],
                [, , , 1, , , 1, , 1, , , , , 1, , , , , 1, , , 1, , , , 1, , 1, , , ,],
                [, , , 1, , , 1, , 1, , , , , 1, , , , , 1, , , 1, , , , 1, , 1, , , ,],
                [, , , 1, 1, 1, 1, , 1, 1, 1, , , 1, , , , , 1, 1, 1, , , , , 1, , 1, , , ,],
                [, , , 1, , , 1, , 1, , , , , 1, , , , , 1, , , , , , , 1, , 1, , , ,],
                [, , , 1, , , 1, , 1, , , , , 1, , , , , 1, , , , , , , , , , , , ,],
                [, , , 1, , , 1, , 1, 1, 1, 1, , 1, 1, 1, 1, , 1, , , , , , , 1, , 1, , , ,]
            ],
            [
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , 1, , , 1, , , 1, 1, , , 1, 1, 1, 1, , , 1, 1, 1, 1, , , 1, , , , 1, ,],
                [, , , 1, , , 1, , 1, , , 1, , 1, , , , 1, , 1, , , , 1, , 1, , , , 1, ,],
                [, , , 1, , , 1, , 1, , , 1, , 1, , , , 1, , 1, , , , 1, , , 1, , 1, , ,],
                [, , , 1, 1, 1, 1, , 1, 1, 1, 1, , 1, 1, 1, 1, , , 1, 1, 1, 1, , , , , 1, , , ,],
                [, , , 1, , , 1, , 1, , , 1, , 1, , , , , , 1, , , , , , , , 1, , , ,],
                [, , , 1, , , 1, , 1, , , 1, , 1, , , , , , 1, , , , , , , , 1, , , ,],
                [, , , 1, , , 1, , 1, , , 1, , 1, , , , , , 1, , , , , , , , 1, , , ,]
            ],
            [
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , 1, , , , , , , , , , , , 1, , , , , , , , , , , , ,],
                [, , , , , 1, , 1, , , , , , , , , , 1, , 1, , , , , , , , , , , ,],
                [, , , , 1, , , , 1, , , , , , , , 1, , , , 1, , , , , , , , , , ,],
                [, , , 1, , , , , , 1, , , , , , 1, , , , , , 1, , , , , , , , , ,],
                [, , 1, , , , , , , , 1, , , , 1, , , , , , , , 1, , , , , , , , ,],
                [, , , 1, , , , , , 1, , , , , , 1, , , , , , 1, , , , , , , , , ,],
                [, , , , 1, , , , 1, , , , 1, , , , 1, , , , 1, , , , 1, , , , , , ,],
                [, , , , , 1, , 1, , , , 1, , 1, , , , 1, , 1, , , , 1, , 1, , , , , ,],
                [, , , , , , 1, , , , 1, , , , 1, , , , 1, , , , 1, , , , 1, , , , ,],
                [, , , , , , , , , 1, , , , , , 1, , , , , , 1, , , , , , 1, , , ,],
                [, , , , , , , , 1, , , , , , , , 1, , , , 1, , , , , , , , 1, , ,],
                [, , , , , , , , , 1, , , , , , 1, , , , , , 1, , , , , , 1, , , ,],
                [, , , , , , , , , , 1, , , , 1, , , , , , , , 1, , , , 1, , , , ,],
                [, , , , , , , , , , , 1, , 1, , , , , , , , , , 1, , 1, , , , , ,],
                [, , , , , , 5, , , , , , 1, , , , , , 5, , , , , , 1, , , , , , ,],
            ],
            [
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , 1, , , , , , , , , , , , 1, , , , , , ,],
                [, , , , , , , , , , , 1, , 1, , , , , , , , , , 1, , 1, , , , , ,],
                [, , , , , , , , , , 1, , , , 1, , , , , , , , 1, , , , 1, , , , ,],
                [, , , , , , , , , 1, , , , , , 1, , , , , , 1, , , , , , 1, , , ,],
                [, , , , , , , , 1, , , , , , , , 1, , , , 1, , , , , , , , 1, , ,],
                [, , , , , , , , , 1, , , , , , 1, , , , , , 1, , , , , , 1, , , ,],
                [, , , , , , 1, , , , 1, , , , 1, , , , 1, , , , 1, , , , 1, , , , ,],
                [, , , , , 1, , 1, , , , 1, , 1, , , , 1, , 1, , , , 1, , 1, , , , , ,],
                [, , , , 1, , , , 1, , , , 1, , , , 1, , , , 1, , , , 1, , , , , , ,],
                [, , , 1, , , , , , 1, , , , , , 1, , , , , , 1, , , , , , , , , ,],
                [, , 1, , , , , , , , 1, , , , 1, , , , , , , , 1, , , , , , , , ,],
                [, , , 1, , , , , , 1, , , , , , 1, , , , , , 1, , , , , , , , , ,],
                [, , , , 1, , , , 1, , , , , , , , 1, , , , 1, , , , , , , , , , ,],
                [, , , , , 1, , 1, , , , , , , , , , 1, , 1, , , , , , , , , , , ,],
                [, , , , , , 1, , , , , , 5, , , , , , 1, , , , , , 5, , , , , , ,],
            ],
            [
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , 1, , , , , , , , 1, , , , , , , , 1, , , , , , , ,],
                [, , , , , , 1, , 1, , , , , , 1, , 1, , , , , , 1, , 1, , , , , , ,],
                [, , , , , 1, , , , 1, , , , 1, , , , 1, , , , 1, , , , 1, , , , , ,],
                [, , , , 1, , , , , , 1, , 1, , , , , , 1, , 1, , , , , , 1, , , , ,],
                [, , , 1, , , , , , , , 1, , , , , , , , 1, , , , , , , , 1, , , ,],
                [, , 1, , , , , , , , 1, , 1, , , , , , 1, , 1, , , , , , , , 1, , ,],
                [, , , 1, , , , , , , , 1, , , , , , , , 1, , , , , , , , 1, , , ,],
                [, , , , 1, , , , , , 1, , 1, , , , , , 1, , 1, , , , , , 1, , , , ,],
                [, , , , , 1, , , , 1, , , , 1, , , , 1, , , , 1, , , , 1, , , , , ,],
                [, , , , , , 1, , 1, , , , , , 1, , 1, , , , , , 1, , 1, , , , , , ,],
                [, , , , , , , 1, , , , , , , , 1, , , , , , , , 1, , , , , , , ,],
            ],
            [
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , 1, , , , , , , , , , 1, , , , , , , , , , ,],
                [, , , , , , , , , 1, , 1, , , , , , , , 1, , 1, , , , , , , , , ,],
                [, , , , , , , , 1, , , , 1, , , , , , 1, , , , 1, , , , , , , , ,],
                [, , , , , , , 1, , , , , , 1, , , , 1, , , , , , 1, , , , , , , ,],
                [, , , , , , 1, , , , , , , , 1, , 1, , , , , , , , 1, , , , , , ,],
                [, , , , , 1, , , , , , , , , , 1, , , , , , , , , , 1, , , , , ,],
                [, , , , 1, , , , , , , , , , 1, , 1, , , , , , , , , , 1, , , , ,],
                [, , , , , 1, , , , , , , , , , 1, , , , , , , , , , 1, , , , , ,],
                [, , , , , , 1, , , , , , , , 1, , 1, , , , , , , , 1, , , , , , ,],
                [, , , , , , , 1, , , , , , 1, , , , 1, , , , , , 1, , , , , , , ,],
                [, , , , , , , , 1, , , , 1, , , , , , 1, , , , 1, , , , , , , , ,],
                [, , , , , , , , , 1, , 1, , , , , , , , 1, , 1, , , , , , , , , ,],
                [, , , , , , , , , , 1, , , , , , , , , , 1, , , , , , , , , , ,],
            ],
            [
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , 1, , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , 1, 1, 1, , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , 1, 1, , 1, 1, , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , 1, 1, , , , 1, 1, , , , , , , , , , , , ,],
                [, , , , , , , , , , , 1, 1, , , , , , 1, 1, , , , , , , , , , , ,],
                [, , , , , , , , , , 1, 1, , , , , , , , 1, 1, , , , , , , , , , ,],
                [, , , , , , , , , 1, 1, , , , , , , , , , 1, 1, , , , , , , , , ,],
                [, , , , , , , , 1, 1, , , , , , , , , , , , 1, 1, , , , , , , , ,],
                [, , , , , , , , , 1, 1, , , , , , , , , , 1, 1, , , , , , , , , ,],
                [, , , , , , , , , , 1, 1, , , , , , , , 1, 1, , , , , , , , , , ,],
                [, , , , , , , , , , , 1, 1, , , , , , 1, 1, , , , , , , , , , , ,],
                [, , , , 9, , , , , , , , 1, 1, , , , 1, 1, , , , , , , , 9, , , , ,],
                [, , , , , , , , , , , , , 1, 1, , 1, 1, , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , 1, 1, 1, , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , 1, , , , , , , , , , , , , , , ,],
            ],
            [
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , 1, , , , , , 1, , , , , , , , , , , 1, , , , , , 1, , , ,],
                [, , , 1, , 1, , , , 1, , 1, , , , , , , , , 1, , 1, , , , 1, , 1, , ,],
                [, , 1, , , , 1, , 1, , , , 1, , , , , , , 1, , , , 1, , 1, , , , 1, ,],
                [, 1, , , , , , 1, , , , , , 1, , , , , 1, , , , , , 1, , , , , , 1,],
                [1, , , , , , 1, , 1, , , , , , 1, , , 1, , , , , , 1, , 1, , , , , , 1],
                [, 1, , , , , , 1, , , , , , 1, , , , , 1, , , , , , 1, , , , , , 1,],
                [, , 1, , , , 1, , 1, , , , 1, , , , , , , 1, , , , 1, , 1, , , , 1, ,],
                [, , , 1, , 1, , , , 1, , 1, , , , , , , , , 1, , 1, , , , 1, , 1, , ,],
                [, , , , 1, , , , , , 1, , , , , 5, , , , , , 1, , , , , , 1, , , ,],
            ],
            [
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , 1, , , , , , , , , , 1, , , , , , , , , , 1, , , , ,],
                [, , , , , 1, , 1, , , , , , , , 1, , 1, , , , , , , , 1, , 1, , , ,],
                [, , , , 1, , , , 1, , , , , , 1, , , , 1, , , , , , 1, , , , 1, , ,],
                [, , , 1, , , , , , 1, , , , 1, , , , , , 1, , , , 1, , , , , , 1, ,],
                [, , , , 1, , , , 1, , , , , , 1, , , , 1, , , , , , 1, , , , 1, , ,],
                [, , , , , 1, , 1, , , , 1, , , , 1, , 1, , , , 1, , , , 1, , 1, , , ,],
                [, , , , , , 1, , , , 1, , 1, , , , 1, , , , 1, , 1, , , , 1, , , , ,],
                [, , , , , , , , , 1, , , , 1, , , , , , 1, , , , 1, , , , , , , ,],
                [, , , , , , , , 1, , , , , , 1, , , , 1, , , , , , 1, , , , , , ,],
                [, , , , , , , , , 1, , , , 1, , , , , , 1, , , , 1, , , , , , , ,],
                [, , , , , , , , , , 1, , 1, , , , , , , , 1, , 1, , , , , , , , ,],
                [, , , 5, , , , , , , , 1, , , , , , , , , , 1, , , , , , , , 5, ,],
            ],
            [
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , 1, , , , , , , , , , 1, , , , , , , , , ,],
                [, , , , , , , , , , 1, , 1, , , , , , , , 1, , 1, , , , , , , , ,],
                [, , , , , , , , , 1, , , , 1, , , , , , 1, , , , 1, , , , , , , ,],
                [, , , , , , , , 1, , , , , , 1, , , , 1, , , , , , 1, , , , , , ,],
                [, , , , , , , , , 1, , , , 1, , , , , , 1, , , , 1, , , , , , , ,],
                [, , , , , , 1, , , , 1, , 1, , , , 1, , , , 1, , 1, , , , 1, , , , ,],
                [, , , , , 1, , 1, , , , 1, , , , 1, , 1, , , , 1, , , , 1, , 1, , , ,],
                [, , , , 1, , , , 1, , , , , , 1, , , , 1, , , , , , 1, , , , 1, , ,],
                [, , , 1, , , , , , 1, , , , 1, , , , , , 1, , , , 1, , , , , , 1, ,],
                [, , , , 1, , , , 1, , , , , , 1, , , , 1, , , , , , 1, , , , 1, , ,],
                [, , , , , 1, , 1, , , , , , , , 1, , 1, , , , , , , , 1, , 1, , , ,],
                [, , , , , , 1, , , , , 5, , , , , 1, , , , , 5, , , , , 1, , , , ,],
            ],
            [
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , 1, 1, , 1, 1, , , , , , 1, 1, , 1, 1, , , , , , 1, 1, , 1, 1, , ,],
                [, , , 1, , , 1, , , 1, , , , 1, , , 1, , , 1, , , , 1, , , 1, , , 1, ,],
                [, , , 1, , , , , , 1, , , , 1, , , , , , 1, , , , 1, , , , , , 1, ,],
                [, , , , 1, , , , 1, , , , , , 1, , , , 1, , , , , , 1, , , , 1, , ,],
                [, , , , , 1, , 1, , , , , , , , 1, , 1, , , , , , , , 1, , 1, , , ,],
                [, , , , , , 1, , , , , , , , , , 1, , , , , , , , , , 1, , , , ,],
                [, , , , , , , , , 1, 1, , 1, 1, , , , , , 1, 1, , 1, 1, , , , , , , ,],
                [, , , , , , , , 1, , , 1, , , 1, , , , 1, , , 1, , , 1, , , , , , ,],
                [, , , , , , , , 1, , , , , , 1, , , , 1, , , , , , 1, , , , , , ,],
                [, , , , , , , , , 1, , , , 1, , , , , , 1, , , , 1, , , , , , , ,],
                [, , , , , , , , , , 1, , 1, , , , , , , , 1, , 1, , , , , , , , ,],
                [, , , 5, , , , , , , , 1, , , , , , , , , , 1, , , , , , , , 5, ,],
            ],
            [
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , 1, 1, , 1, 1, , , , , , 1, 1, , 1, 1, , , , , , , ,],
                [, , , , , , , , 1, , , 1, , , 1, , , , 1, , , 1, , , 1, , , , , , ,],
                [, , , , , , , , 1, , , , , , 1, , , , 1, , , , , , 1, , , , , , ,],
                [, , , , , , , , , 1, , , , 1, , , , , , 1, , , , 1, , , , , , , ,],
                [, , , , , , , , , , 1, , 1, , , , , , , , 1, , 1, , , , , , , , ,],
                [, , , , , , , , , , , 1, , , , , , , , , , 1, , , , , , , , , ,],
                [, , , , 1, 1, , 1, 1, , , , , , 1, 1, , 1, 1, , , , , , 1, 1, , 1, 1, , ,],
                [, , , 1, , , 1, , , 1, , , , 1, , , 1, , , 1, , , , 1, , , 1, , , 1, ,],
                [, , , 1, , , , , , 1, , , , 1, , , , , , 1, , , , 1, , , , , , 1, ,],
                [, , , , 1, , , , 1, , , , , , 1, , , , 1, , , , , , 1, , , , 1, , ,],
                [, , , , , 1, , 1, , , , , , , , 1, , 1, , , , , , , , 1, , 1, , , ,],
                [, , , , , , 1, , , , , , , , , , 1, , , , , , , , , , 1, , , , ,],
            ],
            [
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , 1, 1, 1, , , , 1, , 1, , , , , , , 1, 1, 1, , , , 1, , 1, , , ,],
                [, , , 1, , , , 1, , 1, , , , 1, , , , , 1, , , , 1, , 1, , , , 1, , ,],
                [, , 1, , , , , , 1, , , , , , 1, , , 1, , , , , , 1, , , , , , 1, ,],
                [, , 1, , , , , , , , , , , , 1, , , 1, , , , , , , , , , , , 1, ,],
                [, , , 1, , , , , , , , , , 1, , , , , 1, , , , , , , , , , 1, , ,],
                [, , , , 1, , , , , , , , 1, , , , , , , 1, , , , , , , , 1, , , ,],
                [, , , , , 1, , , , , , 1, , , , , , , , , 1, , , , , , 1, , , , ,],
                [, , , , , , 1, , , , 1, , , , , 9, , , , , , 1, , , , 1, , , , , ,],
                [, , , , , , , 1, , 1, , , , , , , , , , , , , 1, , 1, , , , , , ,],
                [, , , , , , , , 1, , , , , , , , , , , , , , , 1, , , , , , , ,],
            ],
            [
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , 1, 1, 1, 1, , , , , , 1, 1, 1, 1, , , , , , , , ,],
                [, , , , , , , , , 1, , , , , 1, , , , 1, , , , , 1, , , , , , , ,],
                [, , , , , , , , 1, , , , , , , 1, , 1, , , , , , , 1, , , , , , ,],
                [, , , , , , , 1, , , , , , , , , 1, , , , , , , , , 1, , , , , ,],
                [, , , , , , , 1, , , , , , , , , , , , , , , , , , 1, , , , , ,],
                [, , , , , , , 1, , , , , , , , , , , , , , , , , , 1, , , , , ,],
                [, , , , , , , , 1, , , , , , , , , , , , , , , , 1, , , , , , ,],
                [, , , , , , , , , 1, , , , , , , , , , , , , , 1, , , , , , , ,],
                [, , , , , , , , , , 1, , , , , , , , , , , , 1, , , , , , , , ,],
                [, , , , , , , , , , , 1, , , , , , , , , , 1, , , , , , , , , ,],
                [, , , , , , , , , , , , 1, , , , , , , , 1, , , , , , , , , , ,],
                [, , , , , 9, , , , , , , , 1, , , , , , 1, , , , , , , , 9, , , ,],
                [, , , , , , , , , , , , , , 1, , , , 1, , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , 1, , 1, , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , 1, , , , , , , , , , , , , , ,],
            ],
            [
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , 1, 1, 1, 1, 1, , , , , , 1, 1, 1, 1, 1, , , , , , , ,],
                [, , , , , , , , 1, 1, , , , 1, 1, , , , 1, 1, , , , 1, 1, , , , , , ,],
                [, , , , , , , 1, 1, , , , , , 1, 1, , 1, 1, , , , , , 1, 1, , , , , ,],
                [, , , , , , , , 1, 1, , , , 1, 1, , , , 1, 1, , , , 1, 1, , , , , , ,],
                [, , , , , , , , , 1, 1, 1, 1, 1, , , , , , 1, 1, 1, 1, 1, , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , 1, 1, 1, 1, 1, , , , , , 1, 1, 1, 1, 1, , , , , , 1, 1, 1, 1, 1, , ,],
                [, , , 1, 1, , , , 1, 1, , , , 1, 1, , , , 1, 1, , , , 1, 1, , , , 1, 1, ,],
                [, , 1, 1, , , , , , 1, 1, , 1, 1, , , , , , 1, 1, , 1, 1, , , , , , 1, 1,],
                [, , , 1, 1, , , , 1, 1, , , , 1, 1, , , , 1, 1, , , , 1, 1, , , , 1, 1, ,],
                [, , , , 1, 1, 1, 1, 1, , , , , , 1, 1, 1, 1, 1, , , , , , 1, 1, 1, 1, 1, , ,],
            ],
            [
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , 1, 1, 1, 1, 1, , , , , , 1, 1, 1, 1, 1, , , , , , 1, 1, 1, 1, 1, , ,],
                [, , , 1, 1, , , , 1, 1, , , , 1, 1, , , , 1, 1, , , , 1, 1, , , , 1, 1, ,],
                [, , 1, 1, , , , , , 1, 1, , 1, 1, , , , , , 1, 1, , 1, 1, , , , , , 1, 1,],
                [, , , 1, 1, , , , 1, 1, , , , 1, 1, , , , 1, 1, , , , 1, 1, , , , 1, 1, ,],
                [, , , , 1, 1, 1, 1, 1, , , , , , 1, 1, 1, 1, 1, , , , , , 1, 1, 1, 1, 1, , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , 1, 1, 1, 1, 1, , , , , , 1, 1, 1, 1, 1, , , , , , , ,],
                [, , , , , , , , 1, 1, , , , 1, 1, , , , 1, 1, , , , 1, 1, , , , , , ,],
                [, , , , , , , 1, 1, , , , , , 1, 1, , 1, 1, , , , , , 1, 1, , , , , ,],
                [, , , , , , , , 1, 1, , , , 1, 1, , , , 1, 1, , , , 1, 1, , , , , , ,],
                [, , 5, , , , , , , 1, 1, 1, 1, 1, , , , , , 1, 1, 1, 1, 1, , , , , , , 5,],
            ],
            [
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , 1, 1, 1, 1, 1, 1, , , , , , , , , , , 1, 1, 1, 1, 1, 1, , , , ,],
                [, , , , 1, 1, 1, 1, 1, 1, 1, 1, , , , , , , , , 1, 1, 1, 1, 1, 1, 1, 1, , , ,],
                [, , , 1, 1, , , , , , , 1, 1, , , , , , , 1, 1, , , , , , , 1, 1, , ,],
                [, , 1, 1, , , , , , , , , 1, 1, , , , , 1, 1, , , , , , , , , 1, 1, ,],
                [, , , 1, 1, , , , , , , 1, 1, , , , , , , 1, 1, , , , , , , 1, 1, , ,],
                [, , , , 1, 1, 1, 1, 1, 1, 1, 1, , , , , , , , , 1, 1, 1, 1, 1, 1, 1, 1, , , ,],
                [, , , , , 1, 1, 1, 1, 1, 1, , , , , , , , , , , 1, 1, 1, 1, 1, 1, , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , 1, 1, 1, 1, 1, 1, , , , , , , , , , , , ,],
                [, , , , , , , , , , , , 1, 1, 1, 1, 1, 1, 1, 1, , , , , , , , , , , ,],
                [, , , , , , , , , , , 1, 1, , , , , , , 1, 1, , , , , , , , , , ,],
                [, , , , 9, , , , , , 1, 1, , , , , , , , , 1, 1, , , , , , 9, , , ,],
                [, , , , , , , , , , , 1, 1, , , , , , , 1, 1, , , , , , , , , , ,],
                [, , , , , , , , , , , , 1, 1, 1, 1, 1, 1, 1, 1, , , , , , , , , , , ,],
                [, , , , , , , , , , , , , 1, 1, 1, 1, 1, 1, , , , , , , , , , , , ,],
            ],
            [
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, , , , , , , , ,],
                [, , , , , , , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, , , , , , , ,],
                [, , , , , , 1, 1, , , , , , , , , , , , , , , , 1, 1, , , , , , ,],
                [, , , , , 1, 1, , , , , , , , , , , , , , , , , , 1, 1, , , , , ,],
                [, , , , 1, 1, , , , , , , , , , , , , , , , , , , , 1, 1, , , , ,],
                [, , , , , 1, 1, , , , , , , , , , , , , , , , , , 1, 1, , , , , ,],
                [, , , , , , 1, 1, , , , , , , , , , , , , , , , 1, 1, , , , , , ,],
                [, , , , , , , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, , , , , , , ,],
                [, , , , , , , , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, , , , , , , , ,],
            ],
            [
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , 1, 1, 1, 1, 1, , , , , , 1, 1, 1, 1, 1, , , , , , 1, 1, 1, 1, 1, , ,],
                [, , , 1, , , , , , 1, , , , 1, , , , , , 1, , , , 1, , , , , , 1, ,],
                [, , , , 1, 1, 1, 1, 1, , , , , , 1, 1, 1, 1, 1, , , , , , 1, 1, 1, 1, 1, , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , 1, 1, 1, 1, 1, , , , , , 1, 1, 1, 1, 1, , , , , , , ,],
                [, , , , , , , , 1, , , , , , 1, , , , 1, , , , , , 1, , , , , , ,],
                [, , , , , , , , , 1, 1, 1, 1, 1, , , , , , 1, 1, 1, 1, 1, , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , 1, 1, 1, 1, 1, , , , , , 1, 1, 1, 1, 1, , , , , , 1, 1, 1, 1, 1, , ,],
                [, , , 1, , , , , , 1, , , , 1, , , , , , 1, , , , 1, , , , , , 1, ,],
                [, , , , 1, 1, 1, 1, 1, , , , , , 1, 1, 1, 1, 1, , , , , , 1, 1, 1, 1, 1, , ,],
            ],
            [
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , 1, 1, 1, 1, 1, , , , , , 1, 1, 1, 1, 1, , , , , , , ,],
                [, , , , , , , , 1, , , , , , 1, , , , 1, , , , , , 1, , , , , , ,],
                [, , , , , , , , , 1, 1, 1, 1, 1, , , , , , 1, 1, 1, 1, 1, , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , 1, 1, 1, 1, 1, , , , , , 1, 1, 1, 1, 1, , , , , , 1, 1, 1, 1, 1, , ,],
                [, , , 1, , , , , , 1, , , , 1, , , , , , 1, , , , 1, , , , , , 1, ,],
                [, , , , 1, 1, 1, 1, 1, , , , , , 1, 1, 1, 1, 1, , , , , , 1, 1, 1, 1, 1, , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , 1, 1, 1, 1, 1, , , , , , 1, 1, 1, 1, 1, , , , , , , ,],
                [, , , , , , , , 1, , , , , , 1, , , , 1, , , , , , 1, , , , , , ,],
                [, , , , , , , , , 1, 1, 1, 1, 1, , , , , , 1, 1, 1, 1, 1, , , , , , , ,],
            ],
            [
                [, 1, 1, 1, 1, 1, , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [1, , , , , , 1, , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, 1, 1, 1, 1, 1, , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , 1, 1, 1, 1, 1, , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , 1, , , , , , 1, , , , , , , , , , , , , , , 9, , , ,],
                [, , , , , , , 1, 1, 1, 1, 1, , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , 1, 1, 1, 1, 1, , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , 1, , , , , , 1, , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , 1, 1, 1, 1, 1, , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , 1, 1, 1, 1, 1, , , , , , , ,],
                [, , , 9, , , , , , , , , , , , , , , 1, , , , , , 1, , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , 1, 1, 1, 1, 1, , , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , 1, 1, 1, 1, 1, ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , 1, , , , , , 1,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , 1, 1, 1, 1, 1, ,],
            ],
            [
                [, , , , , , , , , , , , , , , , , , , , , , , , , 1, 1, 1, 1, 1, ,],
                [, , , , , , , , , , , , , , , , , , , , , , , , 1, , , , , , 1,],
                [, , , , , , , , , , , , , , , , , , , , , , , , , 1, 1, 1, 1, 1, ,],
                [, , , , , , , , , , , , , , , , , , , 1, 1, 1, 1, 1, , , , , , , ,],
                [, , , 9, , , , , , , , , , , , , , , 1, , , , , , 1, , , , , , ,],
                [, , , , , , , , , , , , , , , , , , , 1, 1, 1, 1, 1, , , , , , , ,],
                [, , , , , , , , , , , , , 1, 1, 1, 1, 1, , , , , , , , , , , , , ,],
                [, , , , , , , , , , , , 1, , , , , , 1, , , , , , , , , , , , ,],
                [, , , , , , , , , , , , , 1, 1, 1, 1, 1, , , , , , , , , , , , , ,],
                [, , , , , , , 1, 1, 1, 1, 1, , , , , , , , , , , , , , , , , , , ,],
                [, , , , , , 1, , , , , , 1, , , , , , , , , , , , , , , 9, , , ,],
                [, , , , , , , 1, 1, 1, 1, 1, , , , , , , , , , , , , , , , , , , ,],
                [, 1, 1, 1, 1, 1, , , , , , , , , , , , , , , , , , , , , , , , , ,],
                [1, , , , , , 1, , , , , , , , , , , , , , , , , , , , , , , , ,],
                [, 1, 1, 1, 1, 1, , , , , , , , , , , , , , , , , , , , , , , , , ,]
            ]
        ];
        //level design
        _this.levelDesign = [
            [{ "name": "simple", "value": [1] }],
            [{ "name": "obstacle", "value": [2, 3] }],
            [{ "name": "simple", "value": [1] }],
            [{ "name": "obstacle", "value": [4, 5] }],
            [{ "name": "advanced", "value": [1] }],
            [{ "name": "obstacle", "value": [0, 1] }],
            [{ "name": "advanced", "value": [1] }],
            [{ "name": "obstacle", "value": [6, 7] }],
            [{ "name": "advanced", "value": [1] }],
            [{ "name": "obstacle", "value": [8, 9] }],
            [{ "name": "advanced", "value": [1] }],
            [{ "name": "obstacle", "value": [10, 11] }],
            [{ "name": "advanced", "value": [1] }],
            [{ "name": "bird", "value": [0] }],
            [{ "name": "advanced", "value": [1] }],
            [{ "name": "dragon-fire", "value": [0] }],
            [{ "name": "advanced", "value": [1] }],
            [{ "name": "dragon-earth", "value": [0] }],
            [{ "name": "advanced", "value": [1] }],
            [{ "name": "advanced", "value": [1] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5] }],
            [{ "name": "simple", "value": [1] }],
            [{ "name": "simple", "value": [1] }, { "name": "ninja", "value": [1] }],
            [{ "name": "advanced", "value": [1] }],
            [{ "name": "advanced", "value": [1] }, { "name": "ninja", "value": [1] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5] }],
            [{ "name": "simple", "value": [1] }, { "name": "ninja", "value": [2] }],
            [{ "name": "simple", "value": [1] }, { "name": "rocket", "value": [1] }],
            [{ "name": "advanced", "value": [1] }, { "name": "ninja", "value": [2] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [1] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [1] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5] }],
            [{ "name": "bird", "value": [0] }],
            [{ "name": "simple", "value": [1] }, { "name": "rocket", "value": [2] }],
            [{ "name": "simple", "value": [1] }, { "name": "spike", "value": [1] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [2] }],
            [{ "name": "advanced", "value": [1] }, { "name": "ninja", "value": [3] }],
            [{ "name": "obstacle", "value": [6, 7, 8, 9] }],
            [{ "name": "advanced", "value": [1] }, { "name": "ninja", "value": [3] }],
            [{ "name": "obstacle", "value": [6, 7, 8, 9] }],
            [{ "name": "simple", "value": [1] }, { "name": "spike", "value": [2] }],
            [{ "name": "simple", "value": [1] }, { "name": "laser", "value": [1] }],
            [{ "name": "advanced", "value": [1] }, { "name": "ninja", "value": [4] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "simple", "value": [1] }, { "name": "spike", "value": [3] }],
            [{ "name": "simple", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "advanced", "value": [1] }, { "name": "ninja", "value": [5] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "simple", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "simple", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "simple", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "simple", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "simple", "value": [1] }, { "name": "rocket", "value": [3] }, { "name": "spike", "value": [5] }],
            [{ "name": "simple", "value": [1] }, { "name": "laser", "value": [2] }, { "name": "spike", "value": [5] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }, { "name": "ninja", "value": [5] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }, { "name": "ninja", "value": [5] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }, { "name": "ninja", "value": [5] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }, { "name": "ninja", "value": [5] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }, { "name": "ninja", "value": [5] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }, { "name": "ninja", "value": [5] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }, { "name": "ninja", "value": [5] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }, { "name": "ninja", "value": [5] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "simple", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "simple", "value": [1] }, { "name": "ninja", "value": [3] }],
            [{ "name": "simple", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "advanced", "value": [1] }, { "name": "spike", "value": [3] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "simple", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "simple", "value": [1] }, { "name": "ninja", "value": [3] }],
            [{ "name": "simple", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "advanced", "value": [1] }, { "name": "spike", "value": [3] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "advanced", "value": [1] }, { "name": "spike", "value": [3] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "simple", "value": [1] }, { "name": "rocket", "value": [3] }, { "name": "spike", "value": [5] }],
            [{ "name": "simple", "value": [1] }, { "name": "laser", "value": [2] }, { "name": "spike", "value": [5] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }, { "name": "ninja", "value": [5] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }, { "name": "ninja", "value": [5] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }, { "name": "ninja", "value": [5] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }, { "name": "ninja", "value": [5] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            //=======================================
            [{ "name": "simple", "value": [1] }],
            [{ "name": "simple", "value": [1] }],
            [{ "name": "advanced", "value": [1] }],
            [{ "name": "advanced", "value": [1] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "simple", "value": [1] }],
            [{ "name": "simple", "value": [1] }, { "name": "ninja", "value": [1] }],
            [{ "name": "advanced", "value": [1] }],
            [{ "name": "advanced", "value": [1] }, { "name": "ninja", "value": [1] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "simple", "value": [1] }, { "name": "ninja", "value": [2] }],
            [{ "name": "simple", "value": [1] }, { "name": "rocket", "value": [1] }],
            [{ "name": "advanced", "value": [1] }, { "name": "ninja", "value": [2] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [1] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [1] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "bird", "value": [0] }],
            [{ "name": "simple", "value": [1] }, { "name": "rocket", "value": [2] }],
            [{ "name": "simple", "value": [1] }, { "name": "spike", "value": [1] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [2] }],
            [{ "name": "advanced", "value": [1] }, { "name": "ninja", "value": [3] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "ninja", "value": [3] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "simple", "value": [1] }, { "name": "spike", "value": [2] }],
            [{ "name": "simple", "value": [1] }, { "name": "laser", "value": [1] }],
            [{ "name": "advanced", "value": [1] }, { "name": "ninja", "value": [4] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "simple", "value": [1] }, { "name": "spike", "value": [3] }],
            [{ "name": "simple", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "advanced", "value": [1] }, { "name": "ninja", "value": [5] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "simple", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "simple", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "simple", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "simple", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "simple", "value": [1] }, { "name": "rocket", "value": [3] }, { "name": "spike", "value": [5] }],
            [{ "name": "simple", "value": [1] }, { "name": "laser", "value": [2] }, { "name": "spike", "value": [5] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }, { "name": "ninja", "value": [5] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }, { "name": "ninja", "value": [5] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }, { "name": "ninja", "value": [5] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }, { "name": "ninja", "value": [5] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }, { "name": "ninja", "value": [5] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }, { "name": "ninja", "value": [5] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }, { "name": "ninja", "value": [5] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }, { "name": "ninja", "value": [5] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "simple", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "simple", "value": [1] }, { "name": "ninja", "value": [3] }],
            [{ "name": "simple", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "advanced", "value": [1] }, { "name": "spike", "value": [3] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "simple", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "simple", "value": [1] }, { "name": "ninja", "value": [3] }],
            [{ "name": "simple", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "advanced", "value": [1] }, { "name": "spike", "value": [3] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "advanced", "value": [1] }, { "name": "spike", "value": [3] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "simple", "value": [1] }, { "name": "rocket", "value": [3] }, { "name": "spike", "value": [5] }],
            [{ "name": "simple", "value": [1] }, { "name": "laser", "value": [2] }, { "name": "spike", "value": [5] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }, { "name": "ninja", "value": [5] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }, { "name": "ninja", "value": [5] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }, { "name": "ninja", "value": [5] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }, { "name": "ninja", "value": [5] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            //=======================================
            [{ "name": "simple", "value": [1] }],
            [{ "name": "simple", "value": [1] }],
            [{ "name": "advanced", "value": [1] }],
            [{ "name": "advanced", "value": [1] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "simple", "value": [1] }],
            [{ "name": "simple", "value": [1] }, { "name": "ninja", "value": [1] }],
            [{ "name": "advanced", "value": [1] }],
            [{ "name": "advanced", "value": [1] }, { "name": "ninja", "value": [1] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "simple", "value": [1] }, { "name": "ninja", "value": [2] }],
            [{ "name": "simple", "value": [1] }, { "name": "rocket", "value": [1] }],
            [{ "name": "advanced", "value": [1] }, { "name": "ninja", "value": [2] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [1] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [1] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "bird", "value": [0] }],
            [{ "name": "simple", "value": [1] }, { "name": "rocket", "value": [2] }],
            [{ "name": "simple", "value": [1] }, { "name": "spike", "value": [1] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [2] }],
            [{ "name": "advanced", "value": [1] }, { "name": "ninja", "value": [3] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "ninja", "value": [3] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "simple", "value": [1] }, { "name": "spike", "value": [2] }],
            [{ "name": "simple", "value": [1] }, { "name": "laser", "value": [1] }],
            [{ "name": "advanced", "value": [1] }, { "name": "ninja", "value": [4] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "simple", "value": [1] }, { "name": "spike", "value": [3] }],
            [{ "name": "simple", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "advanced", "value": [1] }, { "name": "ninja", "value": [5] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "simple", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "simple", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "simple", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "simple", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "simple", "value": [1] }, { "name": "rocket", "value": [3] }, { "name": "spike", "value": [5] }],
            [{ "name": "simple", "value": [1] }, { "name": "laser", "value": [2] }, { "name": "spike", "value": [5] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }, { "name": "ninja", "value": [5] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }, { "name": "ninja", "value": [5] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }, { "name": "ninja", "value": [5] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }, { "name": "ninja", "value": [5] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }, { "name": "ninja", "value": [5] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }, { "name": "ninja", "value": [5] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }, { "name": "ninja", "value": [5] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }, { "name": "ninja", "value": [5] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "simple", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "simple", "value": [1] }, { "name": "ninja", "value": [3] }],
            [{ "name": "simple", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "advanced", "value": [1] }, { "name": "spike", "value": [3] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "simple", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "simple", "value": [1] }, { "name": "ninja", "value": [3] }],
            [{ "name": "simple", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "advanced", "value": [1] }, { "name": "spike", "value": [3] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "advanced", "value": [1] }, { "name": "spike", "value": [3] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "simple", "value": [1] }, { "name": "rocket", "value": [3] }, { "name": "spike", "value": [5] }],
            [{ "name": "simple", "value": [1] }, { "name": "laser", "value": [2] }, { "name": "spike", "value": [5] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }, { "name": "ninja", "value": [5] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }, { "name": "ninja", "value": [5] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }, { "name": "ninja", "value": [5] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }, { "name": "ninja", "value": [5] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            //=======================================
            [{ "name": "simple", "value": [1] }],
            [{ "name": "simple", "value": [1] }],
            [{ "name": "advanced", "value": [1] }],
            [{ "name": "advanced", "value": [1] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "simple", "value": [1] }],
            [{ "name": "simple", "value": [1] }, { "name": "ninja", "value": [1] }],
            [{ "name": "advanced", "value": [1] }],
            [{ "name": "advanced", "value": [1] }, { "name": "ninja", "value": [1] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "simple", "value": [1] }, { "name": "ninja", "value": [2] }],
            [{ "name": "simple", "value": [1] }, { "name": "rocket", "value": [1] }],
            [{ "name": "advanced", "value": [1] }, { "name": "ninja", "value": [2] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [1] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [1] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "bird", "value": [0] }],
            [{ "name": "simple", "value": [1] }, { "name": "rocket", "value": [2] }],
            [{ "name": "simple", "value": [1] }, { "name": "spike", "value": [1] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [2] }],
            [{ "name": "advanced", "value": [1] }, { "name": "ninja", "value": [3] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "ninja", "value": [3] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "simple", "value": [1] }, { "name": "spike", "value": [2] }],
            [{ "name": "simple", "value": [1] }, { "name": "laser", "value": [1] }],
            [{ "name": "advanced", "value": [1] }, { "name": "ninja", "value": [4] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "simple", "value": [1] }, { "name": "spike", "value": [3] }],
            [{ "name": "simple", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "advanced", "value": [1] }, { "name": "ninja", "value": [5] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "simple", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "simple", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "simple", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "simple", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "simple", "value": [1] }, { "name": "rocket", "value": [3] }, { "name": "spike", "value": [5] }],
            [{ "name": "simple", "value": [1] }, { "name": "laser", "value": [2] }, { "name": "spike", "value": [5] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }, { "name": "ninja", "value": [5] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }, { "name": "ninja", "value": [5] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }, { "name": "ninja", "value": [5] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }, { "name": "ninja", "value": [5] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }, { "name": "ninja", "value": [5] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }, { "name": "ninja", "value": [5] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }, { "name": "ninja", "value": [5] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }, { "name": "ninja", "value": [5] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "simple", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "simple", "value": [1] }, { "name": "ninja", "value": [3] }],
            [{ "name": "simple", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "advanced", "value": [1] }, { "name": "spike", "value": [3] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "simple", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "simple", "value": [1] }, { "name": "ninja", "value": [3] }],
            [{ "name": "simple", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "advanced", "value": [1] }, { "name": "spike", "value": [3] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "advanced", "value": [1] }, { "name": "spike", "value": [3] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "simple", "value": [1] }, { "name": "rocket", "value": [3] }, { "name": "spike", "value": [5] }],
            [{ "name": "simple", "value": [1] }, { "name": "laser", "value": [2] }, { "name": "spike", "value": [5] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }, { "name": "ninja", "value": [5] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }, { "name": "ninja", "value": [5] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }, { "name": "ninja", "value": [5] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }, { "name": "ninja", "value": [5] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            //=======================================
            [{ "name": "simple", "value": [1] }],
            [{ "name": "simple", "value": [1] }],
            [{ "name": "advanced", "value": [1] }],
            [{ "name": "advanced", "value": [1] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "simple", "value": [1] }],
            [{ "name": "simple", "value": [1] }, { "name": "ninja", "value": [1] }],
            [{ "name": "advanced", "value": [1] }],
            [{ "name": "advanced", "value": [1] }, { "name": "ninja", "value": [1] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "simple", "value": [1] }, { "name": "ninja", "value": [2] }],
            [{ "name": "simple", "value": [1] }, { "name": "rocket", "value": [1] }],
            [{ "name": "advanced", "value": [1] }, { "name": "ninja", "value": [2] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [1] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [1] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "bird", "value": [0] }],
            [{ "name": "simple", "value": [1] }, { "name": "rocket", "value": [2] }],
            [{ "name": "simple", "value": [1] }, { "name": "spike", "value": [1] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [2] }],
            [{ "name": "advanced", "value": [1] }, { "name": "ninja", "value": [3] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "ninja", "value": [3] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "simple", "value": [1] }, { "name": "spike", "value": [2] }],
            [{ "name": "simple", "value": [1] }, { "name": "laser", "value": [1] }],
            [{ "name": "advanced", "value": [1] }, { "name": "ninja", "value": [4] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "simple", "value": [1] }, { "name": "spike", "value": [3] }],
            [{ "name": "simple", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "advanced", "value": [1] }, { "name": "ninja", "value": [5] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "simple", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "simple", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "simple", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "simple", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "simple", "value": [1] }, { "name": "rocket", "value": [3] }, { "name": "spike", "value": [5] }],
            [{ "name": "simple", "value": [1] }, { "name": "laser", "value": [2] }, { "name": "spike", "value": [5] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }, { "name": "ninja", "value": [5] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }, { "name": "ninja", "value": [5] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }, { "name": "ninja", "value": [5] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }, { "name": "ninja", "value": [5] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }, { "name": "ninja", "value": [5] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }, { "name": "ninja", "value": [5] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }, { "name": "ninja", "value": [5] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }, { "name": "ninja", "value": [5] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "simple", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "simple", "value": [1] }, { "name": "ninja", "value": [3] }],
            [{ "name": "simple", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "advanced", "value": [1] }, { "name": "spike", "value": [3] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "simple", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "simple", "value": [1] }, { "name": "ninja", "value": [3] }],
            [{ "name": "simple", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "advanced", "value": [1] }, { "name": "spike", "value": [3] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "advanced", "value": [1] }, { "name": "spike", "value": [3] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "simple", "value": [1] }, { "name": "rocket", "value": [3] }, { "name": "spike", "value": [5] }],
            [{ "name": "simple", "value": [1] }, { "name": "laser", "value": [2] }, { "name": "spike", "value": [5] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }, { "name": "ninja", "value": [5] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }, { "name": "ninja", "value": [5] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }, { "name": "ninja", "value": [5] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }, { "name": "ninja", "value": [5] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            //=======================================
            [{ "name": "simple", "value": [1] }],
            [{ "name": "simple", "value": [1] }],
            [{ "name": "advanced", "value": [1] }],
            [{ "name": "advanced", "value": [1] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "simple", "value": [1] }],
            [{ "name": "simple", "value": [1] }, { "name": "ninja", "value": [1] }],
            [{ "name": "advanced", "value": [1] }],
            [{ "name": "advanced", "value": [1] }, { "name": "ninja", "value": [1] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "simple", "value": [1] }, { "name": "ninja", "value": [2] }],
            [{ "name": "simple", "value": [1] }, { "name": "rocket", "value": [1] }],
            [{ "name": "advanced", "value": [1] }, { "name": "ninja", "value": [2] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [1] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [1] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "bird", "value": [0] }],
            [{ "name": "simple", "value": [1] }, { "name": "rocket", "value": [2] }],
            [{ "name": "simple", "value": [1] }, { "name": "spike", "value": [1] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [2] }],
            [{ "name": "advanced", "value": [1] }, { "name": "ninja", "value": [3] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "ninja", "value": [3] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "simple", "value": [1] }, { "name": "spike", "value": [2] }],
            [{ "name": "simple", "value": [1] }, { "name": "laser", "value": [1] }],
            [{ "name": "advanced", "value": [1] }, { "name": "ninja", "value": [4] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "simple", "value": [1] }, { "name": "spike", "value": [3] }],
            [{ "name": "simple", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "advanced", "value": [1] }, { "name": "ninja", "value": [5] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "simple", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "simple", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "simple", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "simple", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "simple", "value": [1] }, { "name": "rocket", "value": [3] }, { "name": "spike", "value": [5] }],
            [{ "name": "simple", "value": [1] }, { "name": "laser", "value": [2] }, { "name": "spike", "value": [5] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }, { "name": "ninja", "value": [5] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }, { "name": "ninja", "value": [5] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }, { "name": "ninja", "value": [5] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }, { "name": "ninja", "value": [5] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }, { "name": "ninja", "value": [5] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }, { "name": "ninja", "value": [5] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }, { "name": "ninja", "value": [5] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }, { "name": "ninja", "value": [5] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "simple", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "simple", "value": [1] }, { "name": "ninja", "value": [3] }],
            [{ "name": "simple", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "advanced", "value": [1] }, { "name": "spike", "value": [3] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "simple", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "simple", "value": [1] }, { "name": "ninja", "value": [3] }],
            [{ "name": "simple", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "advanced", "value": [1] }, { "name": "spike", "value": [3] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "advanced", "value": [1] }, { "name": "spike", "value": [3] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "simple", "value": [1] }, { "name": "rocket", "value": [3] }, { "name": "spike", "value": [5] }],
            [{ "name": "simple", "value": [1] }, { "name": "laser", "value": [2] }, { "name": "spike", "value": [5] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }, { "name": "ninja", "value": [5] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }, { "name": "ninja", "value": [5] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }, { "name": "ninja", "value": [5] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }, { "name": "ninja", "value": [5] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
        ];
        return _this;
    }
    RunControl.prototype.create = function () {
        _super.prototype.create.call(this);
        RunControl.Instance = this;
        this.loadDataSaved();
        this.buildLayers();
        this.initKeyboard();
        this.initMouse();
        this.spawnBG();
        this.buildUI();
        this.drawUI();
        this.drawHearts();
        this.drawMeterCounter();
        this.showStatusPowerUp();
        this.shopAndStart();
        this.spawnProgressRun();
        // this.spawnFlyBird();
        // this.spawnWarning(1);
        // this.spawnParticle(cjDragonEarthHead, EARTH_DRAGON);
        // this.spawnParticle(cjDragonFireHead, FIRE_DRAGON);
        // var posYPlayer = 0;
        // if(MODE_BOUNCING){
        //     this.marginTop = 75;
        //     posYPlayer = GAMEHEIGHT - 110;
        //     if(arrayUpgrade[UPGRADE_FORWARD].current > 0) posYPlayer = halfGameHeight;
        // }else{
        //     this.marginTop = 135;
        //     posYPlayer = 510;
        //     if(arrayUpgrade[UPGRADE_FORWARD].current > 0) posYPlayer = 270;
        // }
        // this.spawnPlayer(-30, posYPlayer);
        // new Delay(3000,()=>{this.killPlayer();});
        // new Delay(1000, ()=>{
        //     this.spawnLaser(0,0,OBSTACLE_LASER_LONG,1);
        // })
        // var arraySpaceX = [150, halfGameWidth-150, halfGameWidth+150, GAMEWIDTH-150];
        // var array = this.shuffle(arraySpaceX);
        // this.spawnFront(array[0],cjFrontBush);
        // this.spawnFront(array[1],cjFrontTree1);
        // this.spawnFront(array[2],cjFrontTree2);
        // this.spawnFront(array[3],cjFrontShrine);
        // this.spawnFront(cjFrontSakura1);
        // this.spawnFront(cjFrontSakura2);
        // this.openSetting();
        // new Delay(1000,()=>{
        // this.spawnLaser(-30,GAMEHEIGHT*0.8, OBSTACLE_LASER_LONG);
        // this.spawnLaser(-30,GAMEHEIGHT*0.8, OBSTACLE_LASER_LONG);
        // this.spawnLaser(-30,GAMEHEIGHT*0.1, OBSTACLE_LASER_LONG);
        // this.spawnLaser(-30,GAMEHEIGHT*0.8, OBSTACLE_LASER_LONG);
        // })
        // new Delay(2500,()=>{
        //     this.spawnLaser(273,350, OBSTACLE_LASER_STATIC_LEFT);
        // this.spawnCoin(250,330);
        //     this.spawnPowerUp(317,530, cjPowerUp, POWER_UP_MAGNET);
        // this.spawnSpike(1);
        //     this.spawnRocket(450);
        // });
        // this.showResult();
        // this.showQuiz();
        // this.spawnDoorPrize();
        // new Delay(1000,()=>{this.startShake()})
        // new Delay(3000,()=>{this.startShake()})
        // new Delay(5000,()=>{this.startShake()})
        // new Delay(7000,()=>{this.startShake()})
        // this.spawnPlayer(-30, 270);
        // this.spawnPlayerChild(250, 510 - 101, cjMomo);
        // this.spawnPlayerChild(POWER_UP_TURTLY);
        // this.spawnPlayerChild(POWER_UP_TURTLY);
        // this.spawnPlayerChild(POWER_UP_TURTLY);
        // this.spawnPlayerChild(POWER_UP_MOMO);
        // this.spawnPlayerChild(POWER_UP_MOMO);
        // this.spawnPlayerChild(POWER_UP_MOMO);
        // this.spawnPlayerChild(POWER_UP_TURTLY);
        // this.spawnMinion()
        // this.timerSpawnObject = 0;
        // this.spawnObject();
        // this.spawnCoin(250,330);
        // var array =this.setPatternCustom()
        // this.spawnObject(array);
        // shieldCounter = shieldMax = 3000000;
        this.oneMeter();
        if (SHOW_FPS)
            this.trackFps();
    };
    RunControl.prototype.showBubble = function (id, callback) {
        if (id === void 0) { id = ""; }
        if (callback === void 0) { callback = null; }
        this.bubble = new BubbleChat(this.player.x, this.player.y, id, callback);
        this.popUpLayers.add(this.bubble);
    };
    RunControl.prototype.spawnPalace = function () {
        var posX = gameWidth + 100;
        var palace = new Palace(posX, halfGameHeight - 25);
        this.objectLayers.add(palace);
        this.arrayObstacles.push(palace);
    };
    RunControl.prototype.buildUI = function () {
        this.dialogBox = new DialogBox();
        this.popUpLayers.add(this.dialogBox);
    };
    RunControl.prototype.showDialogue = function (id, callback, isNarration) {
        if (isNarration === void 0) { isNarration = false; }
        this.dialogBox.showSequence(new DialogSequenceData(id), function () { return callback(); }, true, isNarration);
    };
    RunControl.prototype.cutScene = function (id) {
        if (id === void 0) { id = ""; }
        this.sceneMode = new CutScene(id);
        this.popUpLayers.add(this.sceneMode);
    };
    RunControl.prototype.oneMeter = function () {
        var meter = new CounterMeter(0, halfGameHeight);
        meter.runControl = this;
        this.popUpLayers.add(meter);
    };
    RunControl.prototype.convertToHHMMSS = function () {
        var sec = Math.floor(TIMER_COUNTER % 60);
        var minutes = Math.floor((TIMER_COUNTER % 3600) / 60);
        var hours = Math.floor(TIMER_COUNTER / 3600);
        var textHours = "";
        var textMinutes = "";
        var textSecs = "";
        if (sec < 10)
            textSecs = "0" + sec;
        else
            textSecs = "" + sec;
        if (minutes < 10)
            textMinutes = "0" + minutes;
        else
            textMinutes = "" + minutes;
        if (hours < 10)
            textHours = "0" + hours;
        else
            textHours = "" + hours;
        return textHours + ':' + textMinutes + ':' + textSecs;
    };
    RunControl.prototype.checkIfExistPosXChild = function (title, posXChild) {
        switch (title) {
            case POWER_UP_MOMO:
                if (this.counterMomo >= 5)
                    return false;
                var array = this.arrayChild;
                for (var i = 0; i < array.length; i++) {
                    var element = array[i];
                    if (element.posXChild == posXChild && element.title == CHILD_MOMO)
                        return true;
                }
                break;
            case POWER_UP_TURTLY:
                if (this.counterTurtly >= 5)
                    return false;
                var array = this.arrayChild;
                for (var i = 0; i < array.length; i++) {
                    var element = array[i];
                    if (element.posXChild == posXChild && element.title == CHILD_TURTLY)
                        return true;
                }
                break;
        }
        return false;
    };
    RunControl.prototype.countAmountChild = function (title) {
        var counter = 0;
        switch (title) {
            case POWER_UP_MOMO:
                var array = this.arrayChild;
                for (var i = 0; i < array.length; i++) {
                    var element = array[i];
                    if (element.title == CHILD_MOMO)
                        counter++;
                }
                break;
            case POWER_UP_TURTLY:
                var array = this.arrayChild;
                for (var i = 0; i < array.length; i++) {
                    var element = array[i];
                    if (element.title == CHILD_TURTLY)
                        counter++;
                }
                break;
        }
        return counter;
    };
    RunControl.prototype.spawnPlayerChild = function (title) {
        var posX = -30;
        var posY = 0;
        var key = "";
        var posXChild = this.arrayPosXChild[Math.floor(Math.random() * this.arrayPosXChild.length)];
        if (this.arrayChild.length != 0) {
            while (this.checkIfExistPosXChild(title, posXChild)) {
                posXChild = this.arrayPosXChild[Math.floor(Math.random() * this.arrayPosXChild.length)];
            }
        }
        switch (title) {
            case POWER_UP_MOMO:
                if (this.counterMomo >= 5)
                    return;
                SoundPlayer.playSFX(SoundPlayer.WOMANHAIYA);
                posY = 300;
                key = cjMomo;
                break;
            case POWER_UP_TURTLY:
                if (this.counterTurtly >= 5)
                    return;
                SoundPlayer.playSFX(SoundPlayer.WOMANHAIYA);
                posY = 510;
                key = cjTurtle;
                break;
        }
        var child = new PlayerChild(posX, posY, key, posXChild);
        child.anchor.setTo(0.5);
        child.objectLayer = this.objectLayers;
        this.playerLayer.add(child);
        this.arrayChild.push(child);
    };
    RunControl.prototype.spawnProgressRun = function () {
        var posX = halfGameWidth;
        var posY = GAMEHEIGHT - 10;
        var pr = new ProgressRun(posX, posY);
        this.uiLayers.add(pr);
    };
    RunControl.prototype.spawnDoorPrize = function (key, textInfo) {
        ACHIEVEMENT_COUNTER++;
        if (ACHIEVEMENT_COUNTER == 4)
            ARRAY_SKINS[0] = 1;
        if (ACHIEVEMENT_COUNTER == 8)
            ARRAY_SKINS[1] = 1;
        if (ACHIEVEMENT_COUNTER == 12)
            ARRAY_SKINS[2] = 1;
        var startPosY = -500;
        this.prizeAch = new Achievement(halfGameWidth, startPosY, key, textInfo);
        this.prizeAch.anchor.setTo(0.5);
        this.prizeLayer.add(this.prizeAch);
        SoundPlayer.playSFX(SoundPlayer.POWERUP);
    };
    RunControl.prototype.showQuiz = function () {
        this.disableInputBtns();
        STATUS_REVIVE = true;
        this.isJumping = false;
        this.quiz = new QuizScreen();
        this.popUpLayers.add(this.quiz);
    };
    RunControl.prototype.showResponse = function (text, typeResponse) {
        var _this = this;
        var posX = halfGameWidth;
        var posY = GAMEHEIGHT - 300;
        var textResult = game.add.bitmapText(posX, posY, font_90, text, 85);
        textResult.anchor.setTo(0.5);
        this.popUpLayers.add(textResult);
        textResult.alpha = 0;
        textResult.scale.set(0.1, 0.1);
        var duration = 1000;
        game.add.tween(this.quiz).to({ alpha: 0 }, duration, Phaser.Easing.Linear.None, true).onComplete.addOnce(function () { _this.quiz.destroy(); });
        game.add.tween(textResult).to({ alpha: 1 }, duration, Phaser.Easing.Linear.None, true);
        game.add.tween(textResult.scale).to({ x: 1, y: 1 }, duration, Phaser.Easing.Bounce.Out, true).onComplete.addOnce(function () {
            new Delay(250, function () {
                textResult.destroy();
                if (typeResponse == RESPONSE_CORRECT) {
                    _this.enableInputBtns();
                    _this.player.statePos = ANIMATION_WALK;
                    _this.player.getHit();
                    _this.player.velY = 3;
                    _this.player.isResult = true;
                    _this.timerInvulnerablePlayer = 20000;
                    GAMEOVER = false;
                    new Delay(300, function () { STATUS_REVIVE = false; });
                }
                else {
                    GAMEOVER = true;
                    _this.showResult();
                }
            });
        });
    };
    RunControl.prototype.spawnRevive = function () {
        this.disableInputBtns();
        STATUS_REVIVE = true;
        this.isJumping = false;
        var revive = new Revive();
        this.popUpLayers.add(revive);
    };
    RunControl.prototype.drawHearts = function () {
        var startPosX = GAMEWIDTH * 0.5;
        var posY = 37;
        var spaceX = 50;
        this.containerHeart = game.add.image(startPosX, posY, cjBlank);
        this.uiLayers.add(this.containerHeart);
        for (var index = 0; index < HEART_MAX; index++) {
            var heart = new Heart(index * spaceX, 0);
            heart.anchor.setTo(0.5);
            heart.visible = false;
            this.containerHeart.addChild(heart);
            this.arrayHearts.push(heart);
        }
        var totalWidth = spaceX * HEART_MAX;
        var posX = (GAMEWIDTH - totalWidth) / 2;
        this.containerHeart.x = posX;
    };
    RunControl.prototype.spawnParticleEfect = function (x, y, speedX, adjustSpeedX, key, delay, limitMovementDragon) {
        if (key === void 0) { key = ""; }
        if (delay === void 0) { delay = 0; }
        if (limitMovementDragon === void 0) { limitMovementDragon = 0; }
        var particleEfect = new ParticleEfect(x, y, speedX, adjustSpeedX, key, delay, limitMovementDragon);
        if (key == cjTailFire || key == cjTailEarth) {
            this.tailLayers.add(particleEfect);
        }
        else {
            this.dragonLayers.add(particleEfect);
        }
        return particleEfect;
    };
    RunControl.prototype.drawMeterCounter = function () {
        var posY = GAMEHEIGHT - 40;
        var posX = GAMEWIDTH - 50;
        var spaceX = 7;
        var adjustX = 250;
        this.meterText = game.add.bitmapText(posX, posY, font_36, METER_COUNTER + "", 25);
        this.meterText.anchor.setTo(1, 0);
        this.uiLayers.add(this.meterText);
        var meter = game.add.bitmapText(posX + spaceX, posY, font_36, Language.GetText("meter"), 25);
        this.uiLayers.add(meter);
        if (!SHOW_MPH)
            return;
        this.speedText = game.add.bitmapText(posX - adjustX, posY, font_36, SPEEDALL + "", 25);
        this.speedText.anchor.setTo(1, 0);
        this.uiLayers.add(this.speedText);
        var speed = game.add.bitmapText(posX + spaceX - adjustX, posY, font_36, Language.GetText("mph"), 25);
        this.uiLayers.add(speed);
    };
    RunControl.prototype.showStatusPowerUp = function () {
        var statusPowerUp = new WindowPowerUp();
        this.uiLayers.add(statusPowerUp);
    };
    RunControl.prototype.showResult = function () {
        DEATH_COUNTER++;
        this.disableInputBtns();
        var result = new ResultScreen();
        this.uiLayers.add(result);
    };
    RunControl.prototype.trackFps = function () {
        var posX = 45;
        var posY = 90;
        this.fpsNumber = game.add.bitmapText(posX, posY, font_36, "0", 25);
        this.fpsNumber.anchor.setTo(0.5, 0.5);
        this.uiLayers.add(this.fpsNumber);
        var fps = game.add.bitmapText(posX + 50, posY, font_36, Language.GetText("fps"), 25);
        fps.anchor.set(0.5, 0.5);
        this.uiLayers.add(fps);
    };
    RunControl.prototype.spawnPlayer = function (x, y) {
        this.player = new Player(x, y);
        this.playerLayer.add(this.player);
        if (arrayUpgrade[UPGRADE_FORWARD].current > 0) {
            rushCounter = rushMax = arrayUpgrade[UPGRADE_FORWARD].factor[arrayUpgrade[UPGRADE_FORWARD].current];
            shieldCounter = shieldMax = 2 * rushCounter;
        }
        // shieldCounter = shieldMax = 150000;
        // doubleCounter = doubleMax = 100000;
        // magnetCounter = magnetMax = 1000000000000;
        // momoCounter = momoMax = 50000;
        // turtleCounter = turtleMax = 50000;
    };
    RunControl.prototype.drawUI = function () {
        var _this = this;
        var posY = 37;
        var spaceX = 15;
        if (!MODE_COIN_CENTER)
            spaceX = 0;
        this.containerCounterCoin = game.add.image(0, posY, cjBlank);
        this.uiLayers.add(this.containerCounterCoin);
        this.coin = game.add.image(0, 0, cjCoinIcon);
        this.coin.anchor.setTo(1, 0.5);
        this.containerCounterCoin.addChild(this.coin);
        var posXCoin = this.coin.width + spaceX;
        if (!MODE_COIN_CENTER)
            posXCoin = -(this.coin.width + 5);
        this.counterCoin = game.add.bitmapText(posXCoin, 0, font_36, COIN_COUNTER + "", 35);
        this.counterCoin.anchor.setTo(1, 0.5);
        this.containerCounterCoin.addChild(this.counterCoin);
        var posX = (GAMEWIDTH - (this.coin.width + this.counterCoin.width)) / 2;
        if (!MODE_COIN_CENTER)
            posX = gameWidth - 75;
        this.containerCounterCoin.x = posX;
        this.buttonPause = new ButtonCustom(GAMEWIDTH - 35, posY, cjButtonPause, "", 0, 0, 0, function () {
            SoundPlayer.playSFX(SoundPlayer.CLICK);
            _this.buttonPause.isClicked = true;
            PAUSED = true;
            new Delay(300, function () { _this.openSetting(); });
        });
        this.buttonPause.anchor.setTo(0.5);
        this.buttonPause.visible = false;
        this.uiLayers.add(this.buttonPause);
        this.arrayButton.push(this.buttonPause);
    };
    RunControl.prototype.drawArc = function () {
        this.graphicsCircle = new Phaser.Graphics(game, 0, 0);
        this.graphicsCircle.lineStyle(3, 0xff0000);
        this.graphicsCircle.moveTo(-this.setting.container.width * 0.5, -this.setting.container.height * 0.5);
        this.graphicsCircle.lineTo(this.setting.container.width * 0.5, -this.setting.container.height * 0.5);
        this.graphicsCircle.lineTo(this.setting.container.width * 0.5, this.setting.container.height * 0.5);
        this.graphicsCircle.lineTo(-this.setting.container.width * 0.5, this.setting.container.height * 0.5);
        this.graphicsCircle.lineTo(-this.setting.container.width * 0.5, -this.setting.container.height * 0.5);
        this.setting.container.addChild(this.graphicsCircle);
    };
    RunControl.prototype.openSetting = function () {
        var _this = this;
        this.setting = new SettingScreen(false);
        this.setting.btnClose.onInputDown.addOnce(function () {
            SoundPlayer.playSFX(SoundPlayer.CLICK);
            _this.setting.btnClose.isClicked = true;
            PAUSED = false;
            new Delay(300, function () {
                _this.setting.destroy();
                _this.setting = null;
                _this.enableInputBtns();
            });
        });
        this.uiLayers.add(this.setting);
        this.disableInputBtns();
        // this.drawArc();
    };
    RunControl.prototype.enableInputBtns = function () {
        for (var i = 0; i < this.arrayButton.length; i++) {
            this.arrayButton[i].inputEnabled = true;
            this.arrayButton[i].input.useHandCursor = true;
        }
    };
    RunControl.prototype.disableInputBtns = function () {
        for (var i = 0; i < this.arrayButton.length; i++) {
            this.arrayButton[i].inputEnabled = false;
        }
    };
    RunControl.prototype.shopAndStart = function () {
        var _this = this;
        var shops = new Shopping();
        shops.buttonStart.onInputDown.addOnce(function () {
            SoundPlayer.playSFX(SoundPlayer.CLICK);
            shops.buttonStart.isClicked = true;
            _this.savingStatusUpgrade();
            new Delay(300, function () {
                shops.destroy();
                shops = null;
                READY = true;
                _this.buttonPause.visible = true;
                var posYPlayer = 0;
                if (MODE_BOUNCING) {
                    _this.marginTop = 75;
                    posYPlayer = GAMEHEIGHT - 110;
                    if (arrayUpgrade[UPGRADE_FORWARD].current > 0)
                        posYPlayer = halfGameHeight;
                }
                else {
                    _this.marginTop = 135;
                    posYPlayer = 510;
                    if (arrayUpgrade[UPGRADE_FORWARD].current > 0)
                        posYPlayer = 270;
                }
                _this.spawnPlayer(-30, posYPlayer);
                // this.spawnParticle(cjDragonEarthHead, EARTH_DRAGON);
                // var posYMomo = 300;
                // this.spawnPlayerChild(-30, posYMomo, cjMomo);
                // this.spawnPlayerChild(-30, 510, cjTurtle);
                CURRENT_HEART = arrayUpgrade[UPGRADE_HEARTS].factor[arrayUpgrade[UPGRADE_HEARTS].current];
                MOMO_LIFE = arrayUpgrade[UPGRADE_MOMO].factor[arrayUpgrade[UPGRADE_MOMO].current];
                TURTLY_LIFE = arrayUpgrade[UPGRADE_TURTLY].factor[arrayUpgrade[UPGRADE_TURTLY].current];
                if (!HIDDEN_DISTNCE_TRACKER)
                    _this.spawnProgressRun();
            });
            //temporarily disabled
            // this.accelX = arrayUpgrade[UPGRADE_SPEED].factor[arrayUpgrade[UPGRADE_SPEED].current];
        });
        this.popUpLayers.add(shops);
    };
    RunControl.prototype.savingStatusUpgrade = function () {
        var statusUpgrade = [];
        for (var i = 0; i < arrayUpgrade.length; i++) {
            var element = arrayUpgrade[i];
            statusUpgrade.push(element.current);
        }
        StoragePlayer.save(SAVE_STATUS_UPGRADE, statusUpgrade);
        StoragePlayer.save(SAVE_COIN, COIN_COUNTER);
        StoragePlayer.save(SAVE_PRICE, PRICE_COUNTER);
    };
    RunControl.prototype.spawnBG = function () {
        this.bgRunner = new ParallaxBg();
        this.bgLayers.add(this.bgRunner);
    };
    RunControl.prototype.buildLayers = function () {
        this.bgLayers = game.add.group();
        this.tailLayers = game.add.group();
        this.objectLayers = game.add.group();
        this.birdLayer = game.add.group();
        this.playerLayer = game.add.group();
        this.dragonLayers = game.add.group();
        this.vfxLayers = game.add.group();
        this.warningLayer = game.add.group();
        this.overlapLayers = game.add.group();
        this.uiLayers = game.add.group();
        this.popUpLayers = game.add.group();
        this.prizeLayer = game.add.group();
    };
    RunControl.prototype.doTrackFPS = function () {
        if (!SHOW_FPS)
            return;
        this.fpsNumber.setText(game.time.fps + "");
    };
    RunControl.prototype.controlDragon = function () {
        if (this.dragonRush == null)
            return;
        this.dragonRush.y = this.player.y + 39;
    };
    RunControl.prototype.update = function (game) {
        this.doTrackFPS();
        this.trackValCoins();
        this.trackHearts();
        this.checkState();
        this.playSFXBoulder();
        this.playSFXRush();
        this.playSFXStep();
        this.explosionDelay();
        this.controlDragon();
        this.doShake();
        this.trackingSpawnAchievement();
    };
    RunControl.prototype.explosionDelay = function () {
        if (this.explosionCounter > 0)
            this.explosionCounter--;
    };
    RunControl.prototype.checkState = function () {
        if (!READY || PAUSED || GAMEOVER)
            return;
        this.counterTimerPlay();
        this.spawnOverlaps();
        this.increaseSpeed();
        this.controlPlayer();
        this.detectJump();
        this.counterTimerBlinking();
        this.trackCollision();
        this.clearArray(this.arrayObstacles);
        this.clearArray(this.arrayBullet);
        this.clearArray(this.arrayChild);
        this.clearArray(this.arrayBird);
        this.trackCounterPowerUp();
        this.smoothSound();
        this.trackingSpawnAchievement();
        this.trackMeter();
        this.trackMPH();
        this.counterMomo = this.countAmountChild(POWER_UP_MOMO);
        this.counterTurtly = this.countAmountChild(POWER_UP_TURTLY);
    };
    RunControl.prototype.trackMeter = function () {
        if (ISFINISHED)
            return;
        this.meterText.setText(METER_COUNTER.toLocaleString() + "");
        if (METER_COUNTER == METER_MAX) {
            ISFINISHED = true;
            SPEEDALL = 5;
            SPEEDNORMAL = 5;
            this.isJumping = true;
            this.killAllPowerUps();
            this.runAllChilds();
            this.clearArrayChilds();
            new Delay(5000, function () {
                RunControl.Instance.cutScene("finish_a");
            });
        }
    };
    RunControl.prototype.runAllChilds = function () {
        var array = this.arrayChild;
        for (var i = 0; i < array.length; i++) {
            var element = array[i];
            element.isFinished = true;
        }
    };
    RunControl.prototype.trackMPH = function () {
        if (ISFINISHED)
            return;
        if (SHOW_MPH)
            this.speedText.setText(SPEEDALL.toFixed(2) + "");
    };
    RunControl.prototype.counterTimerPlay = function () {
        this.timerPlay -= game.time.elapsedMS;
        if (this.timerPlay < 0) {
            this.timerPlay = this.timerPlayMax;
            TIMER_COUNTER++;
        }
    };
    RunControl.prototype.trackingSpawnAchievement = function () {
        this.evaluateAch(MAGNET_COUNTER, ACHIEVEMENT_LIMIT.magnetLimit, magnetIndex, cjMagentIcon, Language.GetText("hit") + " " + ACHIEVEMENT_LIMIT.magnetLimit + " " + Language.GetText("magnets"));
        this.evaluateAch(SHIELD_COUNTER, ACHIEVEMENT_LIMIT.shieldLimit, shieldIndex, cjInvincibleIcon, Language.GetText("hit") + " " + ACHIEVEMENT_LIMIT.shieldLimit + " " + Language.GetText("shields"));
        this.evaluateAch(METER_COUNTER, ACHIEVEMENT_LIMIT.distanceLimit, distanceIndex, cjIconDistance, Language.GetText("reaches") + " " + ACHIEVEMENT_LIMIT.distanceLimit + " " + Language.GetText("meters"));
        this.evaluateAch(FIRE_DRAGON_COUNTER, ACHIEVEMENT_LIMIT.fireLimit, fireIndex, cjIconDragonFire, Language.GetText("hit") + " " + ACHIEVEMENT_LIMIT.fireLimit + " " + Language.GetText("fire_dragons"));
        this.evaluateAch(EARTH_DRAGON_COUNTER, ACHIEVEMENT_LIMIT.earthLimit, earthIndex, cjIconDragonEarth, Language.GetText("hit") + " " + ACHIEVEMENT_LIMIT.earthLimit + " " + Language.GetText("earth_dragons"));
        this.evaluateAch(COIN_COUNTER, ACHIEVEMENT_LIMIT.coinLimit, earthIndex, cjCoinIcon, Language.GetText("earn") + " " + ACHIEVEMENT_LIMIT.coinLimit + " " + Language.GetText("coin"));
        this.evaluateAch(DIAMOND_COUNTER, ACHIEVEMENT_LIMIT.diamondLimit, diamondIndex, cjIconDiamond, Language.GetText("earn") + " " + ACHIEVEMENT_LIMIT.diamondLimit + " " + Language.GetText("diamonds"));
        this.evaluateAch(SPEEDALL > SPEED_RUSH ? SPEEDALL : SPEED_RUSH, ACHIEVEMENT_LIMIT.speedLimit, speedIndex, cjIconSpeed, Language.GetText("reach") + " " + ACHIEVEMENT_LIMIT.speedLimit + " " + Language.GetText("mph"));
        this.evaluateAch(MOMO_COUNTER, ACHIEVEMENT_LIMIT.momoLimit, momoIndex, cjIconMinionMomo, Language.GetText("accompanied by") + " " + ACHIEVEMENT_LIMIT.momoLimit + " " + Language.GetText("momos"));
        this.evaluateAch(TURTLE_COUNTER, ACHIEVEMENT_LIMIT.turtlyLimit, turtlyIndex, cjIconMinionTurtly, Language.GetText("accompanied by") + " " + ACHIEVEMENT_LIMIT.turtlyLimit + " " + Language.GetText("turtlies"));
        this.evaluateAch(LASER_COUNTER, ACHIEVEMENT_LIMIT.laserLimit, laserIndex, cjIconObstacleLaser, Language.GetText("destroy") + " " + ACHIEVEMENT_LIMIT.laserLimit + " " + Language.GetText("lasers"));
        this.evaluateAch(ENEMY_COUNTER, ACHIEVEMENT_LIMIT.enemyLimit, laserIndex, cjIconObstacleLaser, Language.GetText("defeat") + " " + ACHIEVEMENT_LIMIT.enemyLimit + " " + Language.GetText("enemies"));
        this.evaluateAch(STATIC_COUNTER, ACHIEVEMENT_LIMIT.staticLimit, staticIndex, cjIconObstacleStatic, Language.GetText("destroy") + " " + ACHIEVEMENT_LIMIT.staticLimit + " " + Language.GetText("static_baton"));
        this.evaluateAch(ROCKET_COUNTER, ACHIEVEMENT_LIMIT.rocketLimit, rocketIndex, cjIconObstacleRocket, Language.GetText("destroy") + " " + ACHIEVEMENT_LIMIT.rocketLimit + " " + Language.GetText("rockets"));
        this.evaluateAch(SPIKE_COUNTER, ACHIEVEMENT_LIMIT.spikeLimit, spikeIndex, cjIconObstacleSpike, Language.GetText("destroy") + " " + ACHIEVEMENT_LIMIT.spikeLimit + " " + Language.GetText("spikes"));
    };
    RunControl.prototype.evaluateAch = function (counter, limit, index, key, textInfo) {
        if (this.prizeAch)
            return;
        if (counter >= limit) {
            if (ONCERUN_ACH[index] == 0) {
                this.playSFXPowerUp();
                this.spawnDoorPrize(key, textInfo);
                ONCERUN_ACH[index] = 1;
            }
        }
    };
    RunControl.prototype.increaseSpeed = function () {
        if (!ISFIRST)
            return;
        if (ISFINISHED)
            return;
        this.counterTimerSpeed -= game.time.elapsedMS;
        if (this.counterTimerSpeed < 0) {
            this.counterTimerSpeed = this.counterTimerSpeedMax;
            if (!MODE_DECREASE) {
                SPEEDALL += this.accelX;
                SPEEDNORMAL += this.accelX;
            }
            else {
                if (SPEEDALL <= 2) {
                    SPEEDALL = 2;
                    return;
                }
                SPEEDALL -= this.decelX;
                SPEEDNORMAL -= this.decelX;
                if (this.pointerStatus == 'down')
                    this.decelX += 0.05;
                else
                    this.decelX += 0.05;
            }
        }
    };
    RunControl.prototype.spawnOverlaps = function () {
        this.timerSpawnOverlap -= game.time.elapsedMS;
        if (this.timerSpawnOverlap < 0) {
            this.timerSpawnOverlap = this.timerSpawnOverlapMax;
            var arraySpaceX = [150, halfGameWidth - 150, halfGameWidth + 150, GAMEWIDTH - 150];
            var array = this.shuffle(arraySpaceX);
            if (METER_COUNTER > arrayMeter[3]) {
                this.spawnFront(array[0], cjFrontBush);
                this.spawnFront(array[1], cjFrontTree1);
                this.spawnFront(array[2], cjFrontTree2);
                this.spawnFront(array[3], cjFrontShrine);
            }
            else if (METER_COUNTER > arrayMeter[2]) {
                this.spawnFront(array[0], cjFrontShrine);
            }
            else if (METER_COUNTER > arrayMeter[1]) {
                this.spawnFront(array[0], cjFrontSakura1);
                this.spawnFront(array[3], cjFrontSakura2);
            }
            else if (METER_COUNTER > arrayMeter[0]) {
                this.spawnFront(array[1], cjFrontTree1);
                this.spawnFront(array[2], cjFrontTree2);
            }
            else {
                this.spawnFront(array[0], cjFrontBush);
            }
        }
    };
    RunControl.prototype.shuffle = function (arrayShuffle) {
        var _a;
        var array = [];
        for (var index = 0; index < arrayShuffle.length; index++) {
            var element = arrayShuffle[index];
            array.push(element);
        }
        var currentIndex = array.length;
        var randomIndex;
        while (currentIndex != 0) {
            currentIndex--;
            randomIndex = Math.floor(Math.random() * currentIndex);
            _a = [array[randomIndex], array[currentIndex]], array[currentIndex] = _a[0], array[randomIndex] = _a[1];
        }
        return array;
    };
    RunControl.prototype.spawnFront = function (posX, key) {
        var posY = 0;
        var layer;
        switch (key) {
            case cjFrontBush:
                posY = GAMEHEIGHT - Math.random() * 100;
                break;
            case cjFrontTree1:
                posY = GAMEHEIGHT - Math.random() * 100;
                break;
            case cjFrontTree2:
                posY = GAMEHEIGHT - Math.random() * 100;
                break;
            case cjFrontSakura1:
            case cjFrontSakura2:
                posY = GAMEHEIGHT - Math.random() * 100;
                break;
            case cjFrontShrine:
                posY = GAMEHEIGHT - Math.random() * 100;
                break;
        }
        layer = this.overlapLayers;
        var overlap = new Overlap(GAMEWIDTH + posX, posY, key);
        overlap.anchor.setTo(0.5, 0);
        layer.add(overlap);
    };
    RunControl.prototype.smoothSound = function () {
        if (this.sfxDragonDelay > 0)
            this.sfxDragonDelay -= 0.1;
        if (this.sfxLaserDelay > 0)
            this.sfxLaserDelay -= 0.1;
        if (this.sfxCoinDelay > 0)
            this.sfxCoinDelay -= 0.1;
        if (this.sfxShootDelay > 0)
            this.sfxShootDelay -= 0.1;
        if (this.sfxBirdDelay > 0)
            this.sfxBirdDelay -= 0.1;
        if (this.sfxHitDelay > 0)
            this.sfxHitDelay -= 0.1;
        if (this.sfxPowerUpDelay > 0)
            this.sfxPowerUpDelay -= 0.1;
        if (this.sfxMissileDelay > 0)
            this.sfxMissileDelay -= 0.1;
    };
    RunControl.prototype.playSFXStep = function () {
        if (!this.player || this.player.statePos != ANIMATION_WALK)
            return;
        this.sfxStepDelay -= 0.1;
        if (this.sfxStepDelay > 0)
            return;
        SoundPlayer.playSFX(SoundPlayer.STEP);
        this.sfxStepDelay = 3;
    };
    RunControl.prototype.playSFXBoulder = function () {
        if (!this.spikeExist())
            return;
        this.sfxBoulderDelay -= 0.1;
        if (this.sfxBoulderDelay > 0)
            return;
        SoundPlayer.playSFX(SoundPlayer.BOULDER);
        this.sfxBoulderDelay = 3;
    };
    RunControl.prototype.spikeExist = function () {
        var array = this.arrayObstacles;
        for (var i = 0; i < array.length; i++) {
            var element = array[i];
            if (element.title == SPIKE)
                return true;
        }
        return false;
    };
    RunControl.prototype.playSFXRush = function () {
        if (rushCounter <= 0)
            return;
        this.sfxRushDelay -= game.time.elapsedMS;
        if (this.sfxRushDelay > 0)
            return;
        SoundPlayer.playSFX(SoundPlayer.WIND);
        this.sfxRushDelay = 8000;
    };
    RunControl.prototype.playSFXLaser = function () {
        if (this.sfxLaserDelay > 0)
            return;
        this.sfxLaserDelay = 1;
        SoundPlayer.playSFX(SoundPlayer.LASERCHARGE);
        this.loadDataSavedSFX();
    };
    RunControl.prototype.playSFXCoin = function () {
        if (this.sfxCoinDelay > 0)
            return;
        this.sfxCoinDelay = 0.5;
        SoundPlayer.playSFX(SoundPlayer.COIN);
        this.loadDataSavedSFX();
    };
    RunControl.prototype.playSFXBird = function () {
        if (this.sfxBirdDelay > 0)
            return;
        this.sfxBirdDelay = 1;
        SoundPlayer.playSFX(SoundPlayer.EAGLE);
    };
    RunControl.prototype.playSFXShoot = function () {
        if (this.sfxShootDelay > 0)
            return;
        this.sfxShootDelay = 1;
        switch (Math.floor(Math.random() * 5)) {
            case 0:
                SoundPlayer.playSFX(SoundPlayer.WHOSH1);
                break;
            case 1:
                SoundPlayer.playSFX(SoundPlayer.WHOSH2);
                break;
            case 2:
                SoundPlayer.playSFX(SoundPlayer.WHOSH3);
                break;
            case 3:
                SoundPlayer.playSFX(SoundPlayer.WHOSH4);
                break;
            case 4:
                SoundPlayer.playSFX(SoundPlayer.WHOSH5);
                break;
        }
        this.loadDataSavedSFX();
    };
    RunControl.prototype.playSFXHit = function () {
        if (this.sfxHitDelay > 0)
            return;
        this.sfxHitDelay = 0.5;
        SoundPlayer.playSFX(SoundPlayer.HIT);
        this.loadDataSavedSFX();
    };
    RunControl.prototype.playSFXPowerUp = function () {
        if (this.sfxPowerUpDelay > 0)
            return;
        this.sfxPowerUpDelay = 0.5;
        SoundPlayer.playSFX(SoundPlayer.POWERUP);
        this.loadDataSavedSFX();
    };
    RunControl.prototype.playSFXMissile = function () {
        if (this.sfxMissileDelay > 0)
            return;
        this.sfxMissileDelay = 0.5;
        SoundPlayer.playSFX(SoundPlayer.MISSILE);
        this.loadDataSavedSFX();
    };
    RunControl.prototype.counterTimerBlinking = function () {
        if (this.timerInvulnerablePlayer > 0)
            this.timerInvulnerablePlayer -= game.time.elapsedMS;
    };
    RunControl.prototype.trackHearts = function () {
        if (CURRENT_HEART < 0)
            return;
        for (var i = 0; i < CURRENT_HEART; i++) {
            this.arrayHearts[i].visible = true;
        }
        for (var i = CURRENT_HEART; i < HEART_MAX; i++) {
            this.arrayHearts[i].visible = false;
        }
        var spaceX = 50;
        var totalWidth = spaceX * CURRENT_HEART;
        var posX = (GAMEWIDTH - totalWidth) / 2;
        this.containerHeart.x = posX;
    };
    RunControl.prototype.checkInside = function (element) {
        var poligon = [
            {
                x: element.x - element.width * 0.5,
                y: element.y - element.height * 0.5,
            },
            {
                x: element.x + element.width * 0.5,
                y: element.y - element.height * 0.5
            },
            {
                x: element.x + element.width * 0.5,
                y: element.y + element.height * 0.5
            },
            {
                x: element.x - element.width * 0.5,
                y: element.y + element.height * 0.5
            },
        ];
        var n = poligon.length;
        var p = {
            x: game.input.x,
            y: game.input.y
        };
        if (this.isInside(poligon, n, p)) {
            return true;
        }
        else {
            return false;
        }
    };
    RunControl.prototype.spawnFlyBird = function () {
        this.playSFXBird();
        var posY = Math.random() * GAMEHEIGHT;
        var posYmin = 150;
        var posYmax = GAMEHEIGHT - 150;
        while (posY < posYmin || posY > posYmax)
            posY = Math.random() * GAMEHEIGHT;
        var spaceY = posY - posYmin;
        var bird = new Bird(-65, posY, spaceY);
        this.birdLayer.add(bird);
        this.arrayBird.push(bird);
    };
    RunControl.prototype.spawnLaserLong = function () {
        this.timerSpawnLaserLong -= game.time.elapsedMS;
        if (this.timerSpawnLaserLong < 0) {
            this.timerSpawnLaserLong = this.timerSpawnLaserLongMax;
            var index = Math.floor(Math.random() * 6);
            var posX = -30;
            switch (index) {
                case 0:
                    this.spawnLaser(posX, GAMEHEIGHT * 0.1, OBSTACLE_LASER_LONG, 1);
                    break;
                case 1:
                    this.spawnLaser(posX, GAMEHEIGHT * 0.5, OBSTACLE_LASER_LONG, 1);
                    break;
                case 2:
                    this.spawnLaser(posX, GAMEHEIGHT * 0.8, OBSTACLE_LASER_LONG, 1);
                    break;
                case 3:
                    this.spawnLaser(posX, GAMEHEIGHT * 0.2, OBSTACLE_LASER_LONG, 1);
                    this.spawnLaser(posX, GAMEHEIGHT * 0.8, OBSTACLE_LASER_LONG, 1);
                    break;
                case 4:
                    this.spawnLaser(posX, GAMEHEIGHT * 0.5, OBSTACLE_LASER_LONG, 1);
                    this.spawnLaser(posX, GAMEHEIGHT * 0.8, OBSTACLE_LASER_LONG, 1);
                    break;
                case 5:
                    this.spawnLaser(posX, GAMEHEIGHT * 0.2, OBSTACLE_LASER_LONG, 1);
                    this.spawnLaser(posX, GAMEHEIGHT * 0.5, OBSTACLE_LASER_LONG, 1);
                    break;
            }
        }
    };
    RunControl.prototype.startShake = function () {
        var object = this.bgRunner;
        this.currentObject = object;
        this.counterMagnitude = this.maxMagnitude;
        this.posShakeOriginRestore = {
            x: object.initPosX,
            y: object.initPosY
        };
    };
    RunControl.prototype.doShake = function () {
        if (!this.currentObject)
            return;
        this.currentObject.x = this.posShakeOriginRestore.x + Math.random() * this.counterMagnitude - this.counterMagnitude * 0.5;
        this.currentObject.y = this.posShakeOriginRestore.y + Math.random() * this.counterMagnitude - this.counterMagnitude * 0.5;
        this.counterMagnitude -= 0.1;
        if (this.counterMagnitude <= 0) {
            this.currentObject.x = this.posShakeOriginRestore.x;
            this.currentObject.y = this.posShakeOriginRestore.y;
            this.currentObject = null;
        }
    };
    RunControl.prototype.trackCounterPowerUp = function () {
        if (earthCounter > 0)
            earthCounter -= game.time.elapsedMS;
        if (fireCounter > 0)
            fireCounter -= game.time.elapsedMS;
        if (shieldCounter > 0)
            shieldCounter -= game.time.elapsedMS;
        if (rushCounter > 0)
            rushCounter -= game.time.elapsedMS;
        if (doubleCounter > 0 && arrayUpgrade[UPGRADE_DOUBLE].current < 5)
            doubleCounter -= game.time.elapsedMS;
        if (magnetCounter > 0 && arrayUpgrade[UPGRADE_MAGNET].current < 5)
            magnetCounter -= game.time.elapsedMS;
        if (momoCounter > 0)
            momoCounter -= game.time.elapsedMS;
        if (turtleCounter > 0)
            turtleCounter -= game.time.elapsedMS;
    };
    RunControl.prototype.controlPlayer = function () {
        if (this.isJumping) {
            if (!this.isDragonActive)
                this.player.statePos = ANIMATION_FLY;
            else
                this.player.statePos = ANIMATION_RIDE;
            if (this.pointerStatus == 'down') {
                if (!DISABLE_BULLET)
                    this.spawnBullet();
                if (this.player.y - this.jumpForceUp > this.marginTop) {
                    this.jumpForceUp += this.jumpForceUpFactor;
                    this.player.y -= this.jumpForceUp;
                }
                else {
                    this.player.y = this.marginTop;
                }
            }
            else {
                if (this.player.y <= this.marginTop) {
                    this.jumpForceUp = -this.jumpForceDownFactor * 0.5;
                }
                this.jumpForceUp -= this.jumpForceDownFactor;
                this.player.y -= this.jumpForceUp;
                if (this.player.y < this.marginTop) {
                    this.player.y = this.marginTop;
                }
            }
        }
        if (this.player.y >= this.player.targetPosY) {
            this.player.y = this.player.targetPosY;
            this.isJumping = false;
            if (!this.isDragonActive)
                this.player.statePos = ANIMATION_WALK;
            else
                this.player.statePos = ANIMATION_RIDE;
        }
    };
    RunControl.prototype.spawnBullet = function () {
        this.timerSpawnBullet--;
        if (this.timerSpawnBullet <= 0) {
            this.timerSpawnBullet = this.timerSpawnBulletMax;
            var adjustX = [-35, -25, 15, 30, 0];
            var indexAdjustX = Math.floor(Math.random() * adjustX.length);
            var directionAngle;
            switch (indexAdjustX) {
                case 0:
                    directionAngle = -10;
                    break;
                case 1:
                    directionAngle = -10;
                    break;
                case 2:
                    directionAngle = 10;
                    break;
                case 3:
                    directionAngle = 10;
                    break;
                default:
                    directionAngle = 0;
                    break;
            }
            var posX = this.player.x + adjustX[indexAdjustX];
            var posY = this.player.y - this.player.hitBox[0].height * 0.5 + 20;
            var key = cjBullet;
            if ((shieldCounter > 0 || doubleCounter > 0 || magnetCounter > 0) && !DISABLE_LIGHT_KNIFE)
                key = cjBulletBonus;
            var bulet = new Bullet(posX, posY, key, directionAngle);
            this.objectLayers.add(bulet);
            this.arrayBullet.push(bulet);
            if (Math.random() > 0.7) {
                var spark = new Sparkle(posX, posY - 10, 150, SPARK_STATIC);
                this.objectLayers.add(spark);
            }
            this.playSFXShoot();
        }
    };
    RunControl.prototype.detectJump = function () {
        if (ISFINISHED)
            return;
        if (!ISFIRST)
            return; //careful, masih detected ISFIRST true habis retry yang ke-3 mas, smentara sy manual disable
        if (STATUS_REVIVE)
            return;
        if (arrayUpgrade[UPGRADE_FORWARD].current <= 0) {
            if (!LANDING_FIRST)
                return;
        }
        if (this.pointerStatus == "down" && this.checkInside(this.buttonPause))
            return;
        if (this.jumpCounter > 0)
            this.jumpCounter--;
        if (this.pointerStatus == 'down'
            && !this.isJumping
            && this.jumpCounter == 0) {
            if (this.setting != null && this.checkInside(this.setting.container))
                return;
            this.jumpForceUp = this.jumpForceUpDefault;
            this.jumpCounter = 25;
            this.isJumping = true;
        }
    };
    RunControl.prototype.clearArray = function (array) {
        if (array.length == 0)
            return;
        for (var i = array.length - 1; i >= 0; i--) {
            var element = array[i];
            if (element.statusKill) {
                array.splice(i, 1);
            }
        }
    };
    RunControl.prototype.spawnPowerUp = function (x, y, key, type) {
        var powerup = new PowerUp(x, y, key, type);
        this.objectLayers.add(powerup);
        this.arrayObstacles.push(powerup);
    };
    RunControl.prototype.spawnCoin = function (x, y, key) {
        if (key === void 0) { key = ""; }
        var coin = new Coin(x, y, key);
        this.objectLayers.add(coin);
        this.arrayObstacles.push(coin);
    };
    RunControl.prototype.trackCollision = function () {
        if (this.arrayObstacles.length == 0)
            return;
        var array = this.arrayObstacles;
        for (var index = 0; index < array.length; index++) {
            var element = array[index];
            if (magnetCounter > 0 && element.title == COLLECTIBLE_GOLD)
                this.activatedMagnet(element);
            if (this.collisioDetection(element, this.player))
                this.impactAfterCollision(element.title, element);
            this.detectWithChilds(element);
            if (this.arrayBullet.length != 0
                && element.title != COLLECTIBLE_GOLD
                && element.title != POWER_UP_SHIELD
                && element.title != POWER_UP_DOUBLE
                && element.title != POWER_UP_MAGNET
                && element.title != POWER_UP_MOMO
                && element.title != POWER_UP_TURTLY
                && element.title != FIRE_DRAGON
                && element.title != EARTH_DRAGON
                && element.title != OBSTACLE_LASER_LONG
                && element.title != DIAMOND)
                this.detectObstWithBullets(element);
        }
    };
    RunControl.prototype.detectWithChilds = function (element) {
        if (this.arrayChild.length == 0)
            return;
        for (var i = 0; i < this.arrayChild.length; i++) {
            var elementChild = this.arrayChild[i];
            if (this.collisioDetection(element, elementChild))
                this.collisionWithChild(element.title, element, elementChild);
        }
    };
    RunControl.prototype.detectObstWithBullets = function (obj) {
        var array = this.arrayBullet;
        for (var index = 0; index < array.length; index++) {
            var element = array[index];
            if (this.collisioDetection(element, obj)) {
                this.startShake();
                this.isActiveDecel = false;
                this.killObject(element);
                this.killObject(obj);
                if (obj.title != MINION)
                    this.vfxExploison(obj.centerX, obj.centerY);
                this.playSFXHit();
            }
        }
    };
    RunControl.prototype.collisioDetectionBackUp = function (object0, object1) {
        if (!object0 || !object1)
            return false;
        if (!object0.hitBox || !object1.hitBox)
            return false;
        if (object0.title == OBSTACLE_LASER_LONG && !object0.activeCollision)
            return;
        var arrayHitBox0 = object0.hitBox;
        var arrayHitBox1 = object1.hitBox;
        for (var index = 0; index < arrayHitBox0.length; index++) {
            var hitBox0 = arrayHitBox0[index];
            for (var index1 = 0; index1 < arrayHitBox1.length; index1++) {
                var hitBox1 = arrayHitBox1[index1];
                var rect1 = {
                    x: object0.x + hitBox0.x,
                    y: object0.y + hitBox0.y,
                    width: hitBox0.width,
                    height: hitBox0.height,
                };
                var rect2 = {
                    x: object1.x + hitBox1.x,
                    y: object1.y + hitBox1.y,
                    width: hitBox1.width,
                    height: hitBox1.height,
                };
                if (this.aabb(rect1, rect2))
                    return true;
            }
        }
        return false;
    };
    RunControl.prototype.collisioDetection = function (object0, object1) {
        if (!object0 || !object1)
            return false;
        if (!object0.hitBox || !object1.hitBox)
            return false;
        if (object0.title == OBSTACLE_LASER_LONG && !object0.activeCollision)
            return;
        var arrayHitBox0 = object0.hitBox;
        var arrayHitBox1 = object1.hitBox;
        for (var index = 0; index < arrayHitBox0.length; index++) {
            var hitBox0 = arrayHitBox0[index];
            for (var index1 = 0; index1 < arrayHitBox1.length; index1++) {
                var hitBox1 = arrayHitBox1[index1];
                var rect1 = {
                    x: object0.x + hitBox0.x,
                    y: object0.y + hitBox0.y,
                    width: hitBox0.width,
                    height: hitBox0.height,
                };
                if (object0.title == FIRE_DRAGON || object0.title == EARTH_DRAGON) {
                    rect1 = {
                        x: object0.x + hitBox0.x,
                        y: object0.y + object0.headDragon.y + hitBox0.y,
                        width: hitBox0.width,
                        height: hitBox0.height,
                    };
                }
                var rect2 = {
                    x: object1.x + hitBox1.x,
                    y: object1.y + hitBox1.y,
                    width: hitBox1.width,
                    height: hitBox1.height,
                };
                if (object1.title == CHILD_MOMO) {
                    rect2 = {
                        x: object1.x + hitBox1.x,
                        y: object1.y + object1.childPlayer.y + hitBox1.y,
                        width: hitBox1.width,
                        height: hitBox1.height,
                    };
                }
                if (this.aabb(rect1, rect2))
                    return true;
            }
        }
        return false;
    };
    RunControl.prototype.aabb = function (rect1, rect2) {
        if (rect1.x < rect2.x + rect2.width &&
            rect1.x + rect1.width > rect2.x &&
            rect1.y < rect2.y + rect2.height &&
            rect1.y + rect1.height > rect2.y) {
            return true;
        }
        return false;
    };
    RunControl.prototype.collisionWithArcObject = function (obj0, obj1) {
        var distance = Math.sqrt(Math.pow((obj1.x + obj1.parent.centerX) - obj0.x, 2) + Math.pow((obj1.y + obj1.parent.centerY) - obj0.y, 2));
        if (distance - (obj1.width * 0.5 + obj0.width * 0.5) <= 0)
            return true;
        return false;
    };
    RunControl.prototype.collisionWithChild = function (title, obj, objChild) {
        switch (title) {
            case DIAMOND:
                this.activatedDouble(title);
                this.vfxCoin(obj.x, obj.y);
                this.killObject(obj);
                this.playSFXCoin();
                break;
            case COLLECTIBLE_GOLD:
                this.activatedDouble(title);
                this.vfxCoin(obj.x, obj.y);
                this.killObject(obj);
                this.playSFXCoin();
                break;
            case EARTH_DRAGON:
                if (!CHILD_HIT_POWERUP)
                    return;
                if (!CHILD_HIT_DRAGON)
                    return;
                // obj.stopMovingY();
                obj.statusKillForEP();
                this.vfxBlast(obj.centerX, obj.centerY, -obj.speed);
                this.killObject(obj);
                rushCounter = rushMax = 10000;
                shieldCounter = shieldMax = 2 * rushCounter;
                this.player.isMoveX = true;
                this.player.isMoveY = false;
                this.isJumping = false;
                this.startShake();
                this.isActiveDecel = false;
                this.playSFXPowerUp();
                EARTH_DRAGON_COUNTER++;
                break;
            case FIRE_DRAGON:
                if (!CHILD_HIT_POWERUP)
                    return;
                if (!CHILD_HIT_DRAGON)
                    return;
                // obj.stopMovingY();
                obj.statusKillForEP();
                this.vfxBlast(obj.centerX, obj.centerY, -obj.speed);
                this.killObject(obj);
                this.startShake();
                this.isActiveDecel = false;
                this.playSFXPowerUp();
                this.killAllEnemy();
                FIRE_DRAGON_COUNTER++;
                break;
            case POWER_UP_SHIELD:
                if (!CHILD_HIT_POWERUP)
                    return;
                this.vfxBlast(obj.centerX, obj.centerY, obj.speed);
                this.killObject(obj);
                if (rushCounter <= 0)
                    shieldCounter = shieldMax = arrayUpgrade[UPGRADE_SHIELD].factor[arrayUpgrade[UPGRADE_SHIELD].current];
                this.startShake();
                this.isActiveDecel = false;
                this.playSFXPowerUp();
                SHIELD_COUNTER++;
                break;
            case POWER_UP_DOUBLE:
                if (!CHILD_HIT_POWERUP)
                    return;
                this.vfxBlast(obj.centerX, obj.centerY, obj.speed);
                this.killObject(obj);
                doubleCounter = doubleMax = arrayUpgrade[UPGRADE_DOUBLE].factor[arrayUpgrade[UPGRADE_DOUBLE].current];
                this.startShake();
                this.isActiveDecel = false;
                this.playSFXPowerUp();
                break;
            case POWER_UP_MAGNET:
                if (!CHILD_HIT_POWERUP)
                    return;
                this.vfxBlast(obj.centerX, obj.centerY, obj.speed);
                this.killObject(obj);
                magnetCounter = magnetMax = arrayUpgrade[UPGRADE_MAGNET].factor[arrayUpgrade[UPGRADE_MAGNET].current];
                this.startShake();
                this.isActiveDecel = false;
                this.playSFXPowerUp();
                MAGNET_COUNTER++;
                break;
            case POWER_UP_MOMO:
                if (!CHILD_HIT_POWERUP)
                    return;
                this.spawnPlayerChild(title);
                this.vfxBlast(obj.centerX, obj.centerY, obj.speed);
                this.killObject(obj);
                momoCounter = momoMax = LONG_CHILD_LIFE;
                this.startShake();
                this.isActiveDecel = false;
                this.playSFXPowerUp();
                break;
            case POWER_UP_TURTLY:
                if (!CHILD_HIT_POWERUP)
                    return;
                this.spawnPlayerChild(title);
                this.vfxBlast(obj.centerX, obj.centerY, obj.speed);
                this.killObject(obj);
                turtleCounter = turtleMax = LONG_CHILD_LIFE;
                this.startShake();
                this.isActiveDecel = false;
                this.playSFXPowerUp();
                break;
            case SPIKE:
            case LASER:
                if (!this.activatedShield(obj))
                    if (objChild.timerInvulverability > 0)
                        return;
                if (this.activatedShield(obj))
                    return;
                if (LIFE_FOREVER_CHILD)
                    return;
                this.doKillChild(objChild, obj);
                this.playSFXHit();
                break;
            case MINION:
                SoundPlayer.playSFX(SoundPlayer.MANUGH);
                if (!this.activatedShield(obj))
                    if (objChild.timerInvulverability > 0)
                        return;
                if (this.activatedShield(obj))
                    return;
                if (LIFE_FOREVER_CHILD)
                    return;
                this.doKillChild(objChild, obj);
                this.playSFXHit();
                break;
            case OBSTACLE_LASER_LONG:
                if (!this.activatedShield(obj))
                    if (objChild.timerInvulverability > 0)
                        return;
                if (this.activatedShield(obj))
                    return;
                if (LIFE_FOREVER_CHILD)
                    return;
                this.doKillChild(objChild, obj);
                this.playSFXHit();
                break;
            case ROCKET:
                if (!this.activatedShield(obj))
                    if (objChild.timerInvulverability > 0)
                        return;
                if (this.activatedShield(obj))
                    return;
                if (LIFE_FOREVER_CHILD)
                    return;
                this.doKillChild(objChild, obj);
                this.playSFXHit();
                break;
        }
    };
    RunControl.prototype.vfxRect = function () {
        this.rect = new RectAnimate();
        this.popUpLayers.add(this.rect);
    };
    RunControl.prototype.impactAfterCollision = function (title, obj) {
        switch (title) {
            case PALACE:
                GAMEOVER = true;
                // this.vfxExploison(this.player.x, this.player.y, cjBlank);
                this.vfxRect();
                break;
            case DIAMOND:
                this.activatedDouble(title);
                this.vfxCoin(obj.x, obj.y);
                this.killObject(obj);
                this.playSFXCoin();
                break;
            case COLLECTIBLE_GOLD:
                this.activatedDouble(title);
                this.vfxCoin(obj.x, obj.y);
                this.killObject(obj);
                this.playSFXCoin();
                break;
            case EARTH_DRAGON:
            case FIRE_DRAGON:
                if (this.dragonRush != null)
                    return;
                obj.lastPosX = obj.x;
                obj.posXPlayer = this.player.x;
                obj.deltaPosX = obj.lastPosX - obj.posXPlayer;
                obj.stopMoveXforEP();
                this.isDragonActive = true;
                obj.isActivePowerUp = true;
                this.player.targetPosY = DRAGONTIME_TARGETPOSY;
                this.marginTop = DRAGONTIME_MARGINTOP;
                this.vfxBlast(obj.centerX, obj.centerY, -obj.speed);
                obj.statusKill = true;
                this.dragonRush = obj;
                this.player.statePos = ANIMATION_RIDE;
                this.startShake();
                this.isActiveDecel = false;
                this.playSFXPowerUp();
                this.isJumping = false;
                this.player.hitBox.push(this.player.hitBoxDragon);
                switch (obj.title) {
                    case EARTH_DRAGON:
                        rushCounter = rushMax = arrayUpgrade[UPGRADE_FORWARD].factor[arrayUpgrade[UPGRADE_FORWARD].current];
                        shieldCounter = shieldMax = rushCounter;
                        earthCounter = earthMax = rushCounter;
                        EARTH_DRAGON_COUNTER++;
                        break;
                    case FIRE_DRAGON:
                        shieldCounter = shieldMax = arrayUpgrade[UPGRADE_FORWARD].factor[arrayUpgrade[UPGRADE_FORWARD].current];
                        magnetCounter = magnetMax = arrayUpgrade[UPGRADE_FORWARD].factor[arrayUpgrade[UPGRADE_FORWARD].current];
                        fireCounter = fireMax = shieldCounter;
                        FIRE_DRAGON_COUNTER++;
                        this.player.magnet.loadTexture(cjHeroMagnetFire);
                        break;
                }
                break;
            case POWER_UP_SHIELD:
                this.vfxBlast(obj.centerX, obj.centerY, obj.speed);
                this.killObject(obj);
                if (rushCounter <= 0)
                    shieldCounter = shieldMax = arrayUpgrade[UPGRADE_SHIELD].factor[arrayUpgrade[UPGRADE_SHIELD].current];
                this.startShake();
                this.isActiveDecel = false;
                this.playSFXPowerUp();
                SHIELD_COUNTER++;
                break;
            case POWER_UP_DOUBLE:
                this.vfxBlast(obj.centerX, obj.centerY, obj.speed);
                this.killObject(obj);
                doubleCounter = doubleMax = arrayUpgrade[UPGRADE_DOUBLE].factor[arrayUpgrade[UPGRADE_DOUBLE].current];
                this.startShake();
                this.isActiveDecel = false;
                this.playSFXPowerUp();
                DIAMOND_COUNTER++;
                break;
            case POWER_UP_MAGNET:
                this.vfxBlast(obj.centerX, obj.centerY, obj.speed);
                this.killObject(obj);
                magnetCounter = magnetMax = arrayUpgrade[UPGRADE_MAGNET].factor[arrayUpgrade[UPGRADE_MAGNET].current];
                this.startShake();
                this.isActiveDecel = false;
                this.playSFXPowerUp();
                MAGNET_COUNTER++;
                break;
            case POWER_UP_MOMO:
                this.spawnPlayerChild(title);
                this.vfxBlast(obj.centerX, obj.centerY, obj.speed);
                this.killObject(obj);
                momoCounter = momoMax = LONG_CHILD_LIFE;
                this.startShake();
                this.isActiveDecel = false;
                this.playSFXPowerUp();
                MOMO_COUNTER++;
                break;
            case POWER_UP_TURTLY:
                this.spawnPlayerChild(title);
                this.vfxBlast(obj.centerX, obj.centerY, obj.speed);
                this.killObject(obj);
                turtleCounter = turtleMax = LONG_CHILD_LIFE;
                this.startShake();
                this.isActiveDecel = false;
                this.playSFXPowerUp();
                TURTLE_COUNTER++;
                break;
            case MINION:
                if (!this.activatedShield(obj))
                    if (this.timerInvulnerablePlayer > 0)
                        return;
                if (this.activatedShield(obj))
                    return;
                if (LIFE_FOREVER)
                    return;
                if (this.isJumping) {
                    this.killObject(obj);
                    this.determineDebris(obj);
                }
                else {
                    this.killPlayer();
                }
                this.playSFXHit();
                break;
            case SPIKE:
            case LASER:
            case OBSTACLE_LASER_LONG:
                if (!this.activatedShield(obj))
                    if (this.timerInvulnerablePlayer > 0)
                        return;
                if (this.activatedShield(obj))
                    return;
                if (LIFE_FOREVER)
                    return;
                this.killPlayer();
                this.playSFXHit();
                break;
            case ROCKET:
                if (!this.activatedShield(obj))
                    if (this.timerInvulnerablePlayer > 0)
                        return;
                if (this.activatedShield(obj))
                    return;
                if (LIFE_FOREVER)
                    return;
                this.killObject(obj);
                this.vfxExploison(obj.centerX, obj.centerY);
                this.killPlayer();
                this.playSFXHit();
                break;
        }
    };
    RunControl.prototype.endDragon = function () {
        this.player.magnet.loadTexture(cjHeroMagnet);
        this.isDragonActive = false;
        this.dragonRush = null;
        this.isJumping = true;
        while (this.player.hitBox.length > 1) {
            this.player.hitBox.pop();
        }
        if (GAMEOVER)
            this.player.statePos = ANIMATION_DEAD;
        else
            this.player.statePos = ANIMATION_FLY;
    };
    RunControl.prototype.magnetAllCoin = function () {
        var array = this.arrayObstacles;
        for (var index = 0; index < array.length; index++) {
            var element = array[index];
            if (element.title == COLLECTIBLE_GOLD)
                this.activatedMagnet(element, true);
        }
    };
    RunControl.prototype.doKillChild = function (objPlayer, obstacle) {
        objPlayer.child_life--;
        if (objPlayer.child_life > 0) {
            objPlayer.getHit();
            objPlayer.timerInvulverability = LONG_INVULNERABILITY;
            if (obstacle.title != OBSTACLE_LASER_LONG) {
                this.killObject(obstacle);
                this.vfxExploison(obstacle.centerX, obstacle.centerY);
                this.determineDebris(obstacle);
            }
            return;
        }
        this.playSFXHit();
        this.vfxExploison(objPlayer.x + objPlayer.childPlayer.x, objPlayer.y + objPlayer.childPlayer.y);
        objPlayer.statusKill = true;
        objPlayer.destroy();
    };
    RunControl.prototype.killAllEnemy = function () {
        var array = this.arrayObstacles;
        for (var index = 0; index < array.length; index++) {
            var element = array[index];
            if (element.title == MINION
                || element.title == SPIKE
                || element.title == LASER
                || element.title == OBSTACLE_LASER_LONG
                || element.title == ROCKET) {
                this.killObject(element);
                if (element.title == OBSTACLE_LASER_LONG) {
                    this.vfxExploison(element.centerX + element.headLeft.x, element.centerY + element.headLeft.y);
                    this.vfxExploison(element.centerX + element.headRight.x, element.centerY + element.headRight.y);
                }
                else {
                    this.vfxExploison(element.centerX, element.centerY);
                }
            }
        }
    };
    RunControl.prototype.killPlayer = function () {
        GAMEOVER = true;
        this.player.statePos = ANIMATION_DEAD;
        this.player.originOnDead();
        this.player.targetPosY = 510;
        this.bgRunner.initSpeedGameOver();
        this.vfxExploison();
        CURRENT_HEART--;
        this.killAllPowerUps();
        this.clearArrayChilds();
    };
    RunControl.prototype.clearArrayChilds = function () {
        if (this.arrayChild.length == 0)
            return;
        this.arrayChild = [];
    };
    RunControl.prototype.killAllPowerUps = function () {
        shieldCounter = 0;
        doubleCounter = 0;
        magnetCounter = 0;
        rushCounter = 0;
    };
    RunControl.prototype.killObject = function (obj) {
        switch (obj.title) {
            case MINION:
                ENEMY_COUNTER++;
                break;
            case OBSTACLE_LASER_LONG:
                LASER_COUNTER++;
                break;
            case SPIKE:
                SPIKE_COUNTER++;
                break;
            case LASER:
                STATIC_COUNTER++;
                break;
            case ROCKET:
                ROCKET_COUNTER++;
                break;
        }
        if (obj.title == SPIKE)
            obj.shadow.destroy();
        obj.statusKill = true;
        if (obj.title == SPIKE || obj.title == LASER || obj.title == MINION) {
            switch (obj.title) {
                case SPIKE:
                    obj.spike.visible = false;
                    break;
                case LASER:
                    obj.parentLaserStatic.visible = false;
                    break;
                case MINION:
                    if (obj.minion)
                        obj.shadow.visible = false;
                    if (obj.minion)
                        obj.minion.visible = false;
                    break;
            }
        }
        else {
            obj.destroy();
        }
    };
    RunControl.prototype.activatedShield = function (obj) {
        if (shieldCounter > 0) {
            if (obj.title == OBSTACLE_LASER_LONG)
                return true;
            if (obj.title != MINION)
                this.vfxExploison(obj.centerX, obj.centerY);
            this.determineDebris(obj);
            this.killObject(obj);
            this.playSFXHit();
            return true;
        }
        return false;
    };
    RunControl.prototype.determineDebris = function (obj) {
        if (obj.title == SPIKE || obj.title == LASER || obj.title == MINION) {
            this.vfxDebris(0, 0, obj.title, obj);
        }
    };
    RunControl.prototype.activatedDouble = function (title) {
        if (doubleCounter > 0 || title == DIAMOND) {
            COIN_COUNTER += 2;
            DIAMOND_COUNTER++;
            this.decelX = 0.1;
            SPEEDNORMAL += this.speedEarned * 2;
            if (SPEEDNORMAL > arrayUpgrade[UPGRADE_SPEED].factor[arrayUpgrade[UPGRADE_SPEED].current]) {
                SPEEDNORMAL = arrayUpgrade[UPGRADE_SPEED].factor[arrayUpgrade[UPGRADE_SPEED].current];
            }
            if (this.player.isActiveDecel || rushCounter > 0) {
            }
            else {
                SPEEDALL = SPEEDNORMAL;
            }
        }
        else {
            COIN_COUNTER += 1;
            this.decelX = 0.1;
            SPEEDNORMAL += this.speedEarned;
            if (SPEEDNORMAL > arrayUpgrade[UPGRADE_SPEED].factor[arrayUpgrade[UPGRADE_SPEED].current]) {
                SPEEDNORMAL = arrayUpgrade[UPGRADE_SPEED].factor[arrayUpgrade[UPGRADE_SPEED].current];
            }
            if (this.player.isActiveDecel || rushCounter > 0) {
            }
            else {
                SPEEDALL = SPEEDNORMAL;
            }
        }
    };
    RunControl.prototype.activatedMagnet = function (obj, isFireDragon) {
        if (isFireDragon === void 0) { isFireDragon = false; }
        if (isFireDragon) {
            obj.isMagnetActive = true;
        }
        else {
            if (this.collisionWithArcObject(obj, this.player.magnet))
                obj.isMagnetActive = true;
        }
    };
    RunControl.prototype.vfxCoin = function (x, y) {
        var ce = new CoinEffect(x, y);
        this.vfxLayers.add(ce);
    };
    RunControl.prototype.vfxExploison = function (x, y) {
        if (x === void 0) { x = this.player.centerX; }
        if (y === void 0) { y = this.player.centerY - this.player.hitBox[0].height * 0.5; }
        var explosion = new Explosion(x, y);
        explosion.anchor.setTo(0.5);
        this.vfxLayers.add(explosion);
    };
    RunControl.prototype.vfxBlast = function (x, y, speed) {
        var blast = new Blast(x, y, speed);
        blast.anchor.setTo(0.5);
        this.vfxLayers.add(blast);
    };
    RunControl.prototype.vfxDebris = function (x, y, title, objParent) {
        if (objParent === void 0) { objParent = null; }
        var amount = 6;
        var array = [];
        switch (title) {
            case LASER:
                array = [cjLaserBody, cjLaserEndLeft, cjLaserEndRight, cjLaserRotate, cjLaserStatic];
                for (var index = 0; index < amount; index++) {
                    var debris = new Debris(x, y, objParent, Math.random() * 10 - 5, Math.random() * 0.1, array, index, Math.random() * -5 - 5);
                    debris.anchor.setTo(0.5);
                    objParent.addChild(debris);
                }
                break;
            case SPIKE:
                array = [cjDebrisSpike0, cjDebrisSpike1, cjDebrisSpike2, cjDebrisSpike3, cjDebrisSpike4, cjDebrisSpike5];
                for (var index = 0; index < amount; index++) {
                    var debris = new Debris(x, y, objParent, Math.random() * 10 - 5, Math.random() * 0.1, array, index, Math.random() * -5 - 5);
                    debris.anchor.setTo(0.5);
                    objParent.addChild(debris);
                }
                break;
            case MINION:
                array = [cjDebrisEnemy0, cjDebrisEnemy1, cjDebrisEnemy2, cjDebrisEnemy3, cjDebrisEnemy4];
                for (var index = 0; index < amount; index++) {
                    var debris = new Debris(x, y, objParent, Math.random() * 10 - 5, Math.random() * 0.1, array, index, Math.random() * -5 - 5);
                    debris.anchor.setTo(0.5);
                    objParent.addChild(debris);
                }
                break;
        }
    };
    RunControl.prototype.spawnMinion = function (amount) {
        SoundPlayer.playSFX(SoundPlayer.MANHAIYA);
        for (var i = 0; i < amount; i++) {
            var posX = Math.floor(Math.random() * 10) * 50 + 100;
            var minion = new Minion(GAMEWIDTH + posX, 465);
            this.objectLayers.add(minion);
            this.arrayObstacles.push(minion);
        }
    };
    RunControl.prototype.spawnWarning = function (amount) {
        var posX = GAMEWIDTH - 50;
        var posY = [GAMEHEIGHT * 0.2, GAMEHEIGHT * 0.3, GAMEHEIGHT * 0.4, GAMEHEIGHT * 0.5, GAMEHEIGHT * 0.6, GAMEHEIGHT * 0.7, GAMEHEIGHT * 0.8];
        var arrayPosY = this.shuffle(posY);
        for (var i = 0; i < amount; i++) {
            var warning = new Warning(posX, arrayPosY[i]);
            this.warningLayer.add(warning);
        }
    };
    RunControl.prototype.spawnRocket = function (y) {
        var rocket = new Rocket(GAMEWIDTH + 150, y);
        this.objectLayers.add(rocket);
        this.arrayObstacles.push(rocket);
        this.playSFXMissile();
    };
    RunControl.prototype.spawnSpike = function (amount) {
        for (var i = 0; i < amount; i++) {
            var posX = Math.floor(Math.random() * 10) * 50 + 100;
            var spike = new Spike(GAMEWIDTH + posX, 430);
            this.objectLayers.add(spike);
            this.arrayObstacles.push(spike);
        }
    };
    RunControl.prototype.spawnLaser = function (x, y, typeLaser, amount) {
        var posX = 0;
        var posY = 0;
        if (typeLaser == OBSTACLE_LASER_LONG) {
            var array = [GAMEHEIGHT * 0.1, GAMEHEIGHT * 0.3, GAMEHEIGHT * 0.6, GAMEHEIGHT * 0.8];
            posX = -30;
            var arrayPosY = this.shuffle(array);
            this.playSFXLaser();
            for (var i = 0; i < amount; i++) {
                var laser = new Laser(posX, arrayPosY[i], typeLaser);
                this.objectLayers.add(laser);
                this.arrayObstacles.push(laser);
            }
        }
        else {
            posX = x;
            posY = y;
            var laser = new Laser(posX, posY, typeLaser);
            this.objectLayers.add(laser);
            this.arrayObstacles.push(laser);
        }
    };
    RunControl.prototype.trackValCoins = function () {
        this.counterCoin.setText(COIN_COUNTER.toLocaleString() + "");
        var spaceX = 15;
        var posX = (GAMEWIDTH - (spaceX + this.coin.width + this.counterCoin.width)) / 2;
        if (!MODE_COIN_CENTER)
            posX = gameWidth - 75;
        this.containerCounterCoin.x = posX;
    };
    RunControl.prototype.onMeter = function () {
        if (!READY || PAUSED || GAMEOVER)
            return;
        if (METER_COUNTER == 0)
            return;
        if (ISFINISHED)
            return;
        //calculate dragon
        if (METER_COUNTER % arrayUpgrade[UPGRADE_DRAGON_FIRE].factor[arrayUpgrade[UPGRADE_DRAGON_FIRE].current] == 0) {
            if (rushCounter <= 0)
                this.spawnParticle(cjDragonFireHead, FIRE_DRAGON);
        }
        if (METER_COUNTER % arrayUpgrade[UPGRADE_DRAGON_EARTH].factor[arrayUpgrade[UPGRADE_DRAGON_EARTH].current] == 0) {
            if (rushCounter <= 0)
                this.spawnParticle(cjDragonEarthHead, EARTH_DRAGON);
        }
        if (METER_COUNTER == 1 || METER_COUNTER % this.startSpawnOnMeter == 0) {
            var design = this.levelDesign.shift();
            for (var _i = 0, design_1 = design; _i < design_1.length; _i++) {
                var data = design_1[_i];
                var array = [];
                switch (data.name) {
                    case 'simple':
                        array = this.setPatternSimple();
                        break;
                    case 'advanced':
                        array = this.setPatternCustom();
                        break;
                    case 'obstacle':
                        var arrayRandom = data.value;
                        var random = arrayRandom[Math.floor(Math.random() * arrayRandom.length)];
                        while ((random == 4 && this.countChildTurtly() > 5)
                            || (random == 3 && this.countChildMomo() > 5)) {
                            random = arrayRandom[Math.floor(Math.random() * arrayRandom.length)];
                        }
                        if (random == 3)
                            console.log('momo count: ' + this.countChildMomo());
                        array = this.setPatternObstacle(random);
                        break;
                    case 'ninja':
                        if (rushCounter <= 0)
                            this.spawnMinion(data.value[0]);
                        break;
                    case 'spike':
                        if (rushCounter <= 0)
                            this.spawnSpike(data.value[0]);
                        break;
                    case 'rocket':
                        if (rushCounter <= 0)
                            this.spawnWarning(data.value[0]);
                        break;
                    case 'laser':
                        if (rushCounter <= 0)
                            this.spawnLaser(0, 0, OBSTACLE_LASER_LONG, data.value[0]);
                        break;
                    case 'bird':
                        if (rushCounter <= 0)
                            this.spawnFlyBird();
                        break;
                    case 'dragon-fire':
                        if (rushCounter <= 0)
                            this.spawnParticle(cjDragonFireHead, FIRE_DRAGON);
                        break;
                    case 'dragon-earth':
                        if (rushCounter <= 0)
                            this.spawnParticle(cjDragonEarthHead, EARTH_DRAGON);
                        break;
                }
                this.spawnObject(array);
            }
        }
    };
    RunControl.prototype.countChildMomo = function () {
        var counter = 0;
        for (var _i = 0, _a = this.arrayChild; _i < _a.length; _i++) {
            var iterator = _a[_i];
            if (iterator.keyImage == cjMomo)
                counter++;
        }
        return counter;
    };
    RunControl.prototype.countChildTurtly = function () {
        var counter = 0;
        for (var _i = 0, _a = this.arrayChild; _i < _a.length; _i++) {
            var iterator = _a[_i];
            if (iterator.keyImage == cjTurtle)
                counter++;
        }
        return counter;
    };
    RunControl.prototype.spawnParticle = function (key, title) {
        this.playSFXDragon();
        // var adjustX = 70;
        // if(IMAGE_95_75) adjustX = 110;
        var posY = 200;
        var posYmax = 200;
        var posYmin = 50;
        posY = Math.random() * posYmax + posYmin;
        while (posY > posYmax)
            posY = Math.random() * posYmax + posYmin;
        // var posX = gameWidth*0.5-30 + adjustX;
        // var posX = gameWidth-300;
        if (title == FIRE_DRAGON)
            posY = 50;
        else
            posY = 200;
        var posX = gameWidth * 2 + 150;
        var limitMovementDragon = 200 + posY - 50;
        var particle = new Particle(posX, posY, key, title, 0, limitMovementDragon);
        particle.stateCurrent = this;
        particle.anchor.setTo(0.5);
        this.dragonLayers.add(particle);
        this.arrayObstacles.push(particle);
    };
    RunControl.prototype.spawnObject = function (array) {
        for (var i = 0; i < array.length; i++) {
            var element = array[i];
            var value = element.title;
            switch (value) {
                case COLLECTIBLE_GOLD:
                    this.spawnCoin(element.posX, element.posY);
                    break;
                case POWER_UP_SHIELD:
                    this.spawnPowerUp(element.posX, element.posY, cjPowerUp, POWER_UP_SHIELD);
                    break;
                case POWER_UP_DOUBLE:
                    this.spawnPowerUp(element.posX, element.posY, cjPowerUp, POWER_UP_DOUBLE);
                    break;
                case POWER_UP_MAGNET:
                    this.spawnPowerUp(element.posX, element.posY, cjPowerUp, POWER_UP_MAGNET);
                    break;
                case POWER_UP_MOMO:
                    this.spawnPowerUp(element.posX, element.posY, cjPowerUpMomo, POWER_UP_MOMO);
                    break;
                case POWER_UP_TURTLY:
                    this.spawnPowerUp(element.posX, element.posY, cjPowerUpTurtle, POWER_UP_TURTLY);
                    break;
                case OBSTACLE_LASER_STATIC_UP:
                    this.spawnLaser(element.posX, element.posY, OBSTACLE_LASER_STATIC_UP, 1);
                    break;
                case OBSTACLE_LASER_STATIC_DOWN:
                    this.spawnLaser(element.posX, element.posY, OBSTACLE_LASER_STATIC_DOWN, 1);
                    break;
                case OBSTACLE_LASER_STATIC_LEFT:
                    this.spawnLaser(element.posX, element.posY, OBSTACLE_LASER_STATIC_LEFT, 1);
                    break;
                case OBSTACLE_LASER_STATIC_RIGHT:
                    this.spawnLaser(element.posX, element.posY, OBSTACLE_LASER_STATIC_RIGHT, 1);
                    break;
                case OBSTACLE_LASER_STATIC_ROTATING:
                    this.spawnLaser(element.posX, element.posY, OBSTACLE_LASER_STATIC_ROTATING, 1);
                    break;
            }
        }
        this.arraySet = [];
    };
    RunControl.prototype.setPatternSimple = function () {
        // var random = this.setIndexUnique(0,this.arraySimple);
        var arraySimple = this.arraySimple[Math.floor(Math.random() * this.arraySimple.length)];
        for (var indexRow = 0; indexRow < arraySimple.length; indexRow++) {
            for (var indexCol = 0; indexCol < arraySimple[indexRow].length; indexCol++) {
                switch (arraySimple[indexRow][indexCol]) {
                    case 1:
                        this.arraySet.push({ title: COLLECTIBLE_GOLD, posX: this.coinStartPosX + this.coinSpaceX * indexCol, posY: this.coinStartPosY + this.coinSpaceY * indexRow });
                        break;
                }
            }
        }
        return this.arraySet;
    };
    RunControl.prototype.setPatternCustom = function () {
        // var random = this.setIndexUnique(1,this.arrayPattern);
        var arrayPattern = this.arrayPattern[Math.floor(Math.random() * this.arraySimple.length)];
        for (var indexRow = 0; indexRow < arrayPattern.length; indexRow++) {
            for (var indexCol = 0; indexCol < arrayPattern[indexRow].length; indexCol++) {
                switch (arrayPattern[indexRow][indexCol]) {
                    case 1:
                        this.arraySet.push({ title: COLLECTIBLE_GOLD, posX: this.coinStartPosX + this.coinSpaceX * indexCol, posY: this.coinStartPosY + this.coinSpaceY * indexRow });
                        break;
                }
            }
        }
        return this.arraySet;
    };
    RunControl.prototype.setPatternObstacle = function (random) {
        var spaceX = 0;
        var arrayObstaclePattern = this.arrayObstaclePattern[random];
        for (var indexRow = 0; indexRow < arrayObstaclePattern.length; indexRow++) {
            for (var indexCol = 0; indexCol < arrayObstaclePattern[indexRow].length; indexCol++) {
                switch (arrayObstaclePattern[indexRow][indexCol]) {
                    case 1:
                        this.arraySet.push({ title: COLLECTIBLE_GOLD, posX: this.coinStartPosX + this.coinSpaceX * indexCol + spaceX, posY: this.coinStartPosY + this.coinSpaceY * indexRow });
                        break;
                    case 2:
                        this.arraySet.push({ title: POWER_UP_SHIELD, posX: this.coinStartPosX + this.coinSpaceX * indexCol + spaceX, posY: this.coinStartPosY + this.coinSpaceY * indexRow });
                        break;
                    case 3:
                        this.arraySet.push({ title: POWER_UP_DOUBLE, posX: this.coinStartPosX + this.coinSpaceX * indexCol + spaceX, posY: this.coinStartPosY + this.coinSpaceY * indexRow });
                        break;
                    case 4:
                        this.arraySet.push({ title: POWER_UP_MAGNET, posX: this.coinStartPosX + this.coinSpaceX * indexCol + spaceX, posY: this.coinStartPosY + this.coinSpaceY * indexRow });
                        break;
                    case 5:
                        this.arraySet.push({ title: OBSTACLE_LASER_STATIC_UP, posX: this.coinStartPosX + this.coinSpaceX * indexCol + spaceX, posY: this.coinStartPosY + this.coinSpaceY * indexRow });
                        break;
                    case 6:
                        this.arraySet.push({ title: OBSTACLE_LASER_STATIC_DOWN, posX: this.coinStartPosX + this.coinSpaceX * indexCol + spaceX, posY: this.coinStartPosY + this.coinSpaceY * indexRow });
                        break;
                    case 7:
                        this.arraySet.push({ title: OBSTACLE_LASER_STATIC_LEFT, posX: this.coinStartPosX + this.coinSpaceX * indexCol + spaceX, posY: this.coinStartPosY + this.coinSpaceY * indexRow });
                        break;
                    case 8:
                        this.arraySet.push({ title: OBSTACLE_LASER_STATIC_RIGHT, posX: this.coinStartPosX + this.coinSpaceX * indexCol + spaceX, posY: this.coinStartPosY + this.coinSpaceY * indexRow });
                        break;
                    case 9:
                        this.arraySet.push({ title: OBSTACLE_LASER_STATIC_ROTATING, posX: this.coinStartPosX + this.coinSpaceX * indexCol + spaceX, posY: this.coinStartPosY + this.coinSpaceY * indexRow });
                        break;
                    case 10:
                        this.arraySet.push({ title: POWER_UP_MOMO, posX: this.coinStartPosX + this.coinSpaceX * indexCol + spaceX, posY: this.coinStartPosY + this.coinSpaceY * indexRow });
                        break;
                    case 11:
                        this.arraySet.push({ title: POWER_UP_TURTLY, posX: this.coinStartPosX + this.coinSpaceX * indexCol + spaceX, posY: this.coinStartPosY + this.coinSpaceY * indexRow });
                        break;
                }
            }
        }
        return this.arraySet;
    };
    RunControl.prototype.setIndexUnique = function (indexType, ArrayType) {
        if (ArrayType === void 0) { ArrayType = []; }
        var index;
        switch (indexType) {
            case 0:
                index = this.indexRandom.simple++;
                break;
            case 1:
                index = this.indexRandom.pattern++;
                break;
            case 2:
                index = this.indexRandom.noObst++;
                break;
        }
        if (index > ArrayType.length - 1) {
            var random = Math.floor(Math.random() * ArrayType.length);
            while (random == ArrayType.length - 1) {
                random = Math.floor(Math.random() * ArrayType.length);
            }
            index = random;
        }
        return index;
    };
    //reset level
    RunControl.prototype.resetLevel = function () {
        this.levelDesign = [
            [{ "name": "simple", "value": [1] }],
            [{ "name": "obstacle", "value": [2, 3] }],
            [{ "name": "simple", "value": [1] }],
            [{ "name": "obstacle", "value": [4, 5] }],
            [{ "name": "advanced", "value": [1] }],
            [{ "name": "obstacle", "value": [0, 1] }],
            [{ "name": "advanced", "value": [1] }],
            [{ "name": "obstacle", "value": [6, 7] }],
            [{ "name": "advanced", "value": [1] }],
            [{ "name": "obstacle", "value": [8, 9] }],
            [{ "name": "advanced", "value": [1] }],
            [{ "name": "obstacle", "value": [10, 11] }],
            [{ "name": "advanced", "value": [1] }],
            [{ "name": "bird", "value": [0] }],
            [{ "name": "advanced", "value": [1] }],
            [{ "name": "dragon-fire", "value": [0] }],
            [{ "name": "advanced", "value": [1] }],
            [{ "name": "dragon-earth", "value": [0] }],
            [{ "name": "advanced", "value": [1] }],
            [{ "name": "advanced", "value": [1] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5] }],
            [{ "name": "simple", "value": [1] }],
            [{ "name": "simple", "value": [1] }, { "name": "ninja", "value": [1] }],
            [{ "name": "advanced", "value": [1] }],
            [{ "name": "advanced", "value": [1] }, { "name": "ninja", "value": [1] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5] }],
            [{ "name": "simple", "value": [1] }, { "name": "ninja", "value": [2] }],
            [{ "name": "simple", "value": [1] }, { "name": "rocket", "value": [1] }],
            [{ "name": "advanced", "value": [1] }, { "name": "ninja", "value": [2] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [1] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [1] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5] }],
            [{ "name": "bird", "value": [0] }],
            [{ "name": "simple", "value": [1] }, { "name": "rocket", "value": [2] }],
            [{ "name": "simple", "value": [1] }, { "name": "spike", "value": [1] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [2] }],
            [{ "name": "advanced", "value": [1] }, { "name": "ninja", "value": [3] }],
            [{ "name": "obstacle", "value": [6, 7, 8, 9] }],
            [{ "name": "advanced", "value": [1] }, { "name": "ninja", "value": [3] }],
            [{ "name": "obstacle", "value": [6, 7, 8, 9] }],
            [{ "name": "simple", "value": [1] }, { "name": "spike", "value": [2] }],
            [{ "name": "simple", "value": [1] }, { "name": "laser", "value": [1] }],
            [{ "name": "advanced", "value": [1] }, { "name": "ninja", "value": [4] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "simple", "value": [1] }, { "name": "spike", "value": [3] }],
            [{ "name": "simple", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "advanced", "value": [1] }, { "name": "ninja", "value": [5] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "simple", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "simple", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "simple", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "simple", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "simple", "value": [1] }, { "name": "rocket", "value": [3] }, { "name": "spike", "value": [5] }],
            [{ "name": "simple", "value": [1] }, { "name": "laser", "value": [2] }, { "name": "spike", "value": [5] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }, { "name": "ninja", "value": [5] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }, { "name": "ninja", "value": [5] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }, { "name": "ninja", "value": [5] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }, { "name": "ninja", "value": [5] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }, { "name": "ninja", "value": [5] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }, { "name": "ninja", "value": [5] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }, { "name": "ninja", "value": [5] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }, { "name": "ninja", "value": [5] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "simple", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "simple", "value": [1] }, { "name": "ninja", "value": [3] }],
            [{ "name": "simple", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "advanced", "value": [1] }, { "name": "spike", "value": [3] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "simple", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "simple", "value": [1] }, { "name": "ninja", "value": [3] }],
            [{ "name": "simple", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "advanced", "value": [1] }, { "name": "spike", "value": [3] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "advanced", "value": [1] }, { "name": "spike", "value": [3] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "simple", "value": [1] }, { "name": "rocket", "value": [3] }, { "name": "spike", "value": [5] }],
            [{ "name": "simple", "value": [1] }, { "name": "laser", "value": [2] }, { "name": "spike", "value": [5] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }, { "name": "ninja", "value": [5] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }, { "name": "ninja", "value": [5] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }, { "name": "ninja", "value": [5] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }, { "name": "ninja", "value": [5] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            //=======================================
            [{ "name": "simple", "value": [1] }],
            [{ "name": "simple", "value": [1] }],
            [{ "name": "advanced", "value": [1] }],
            [{ "name": "advanced", "value": [1] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "simple", "value": [1] }],
            [{ "name": "simple", "value": [1] }, { "name": "ninja", "value": [1] }],
            [{ "name": "advanced", "value": [1] }],
            [{ "name": "advanced", "value": [1] }, { "name": "ninja", "value": [1] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "simple", "value": [1] }, { "name": "ninja", "value": [2] }],
            [{ "name": "simple", "value": [1] }, { "name": "rocket", "value": [1] }],
            [{ "name": "advanced", "value": [1] }, { "name": "ninja", "value": [2] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [1] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [1] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "bird", "value": [0] }],
            [{ "name": "simple", "value": [1] }, { "name": "rocket", "value": [2] }],
            [{ "name": "simple", "value": [1] }, { "name": "spike", "value": [1] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [2] }],
            [{ "name": "advanced", "value": [1] }, { "name": "ninja", "value": [3] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "ninja", "value": [3] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "simple", "value": [1] }, { "name": "spike", "value": [2] }],
            [{ "name": "simple", "value": [1] }, { "name": "laser", "value": [1] }],
            [{ "name": "advanced", "value": [1] }, { "name": "ninja", "value": [4] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "simple", "value": [1] }, { "name": "spike", "value": [3] }],
            [{ "name": "simple", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "advanced", "value": [1] }, { "name": "ninja", "value": [5] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "simple", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "simple", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "simple", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "simple", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "simple", "value": [1] }, { "name": "rocket", "value": [3] }, { "name": "spike", "value": [5] }],
            [{ "name": "simple", "value": [1] }, { "name": "laser", "value": [2] }, { "name": "spike", "value": [5] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }, { "name": "ninja", "value": [5] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }, { "name": "ninja", "value": [5] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }, { "name": "ninja", "value": [5] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }, { "name": "ninja", "value": [5] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }, { "name": "ninja", "value": [5] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }, { "name": "ninja", "value": [5] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }, { "name": "ninja", "value": [5] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }, { "name": "ninja", "value": [5] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "simple", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "simple", "value": [1] }, { "name": "ninja", "value": [3] }],
            [{ "name": "simple", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "advanced", "value": [1] }, { "name": "spike", "value": [3] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "simple", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "simple", "value": [1] }, { "name": "ninja", "value": [3] }],
            [{ "name": "simple", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "advanced", "value": [1] }, { "name": "spike", "value": [3] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "advanced", "value": [1] }, { "name": "spike", "value": [3] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "simple", "value": [1] }, { "name": "rocket", "value": [3] }, { "name": "spike", "value": [5] }],
            [{ "name": "simple", "value": [1] }, { "name": "laser", "value": [2] }, { "name": "spike", "value": [5] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }, { "name": "ninja", "value": [5] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }, { "name": "ninja", "value": [5] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }, { "name": "ninja", "value": [5] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }, { "name": "ninja", "value": [5] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            //=======================================
            [{ "name": "simple", "value": [1] }],
            [{ "name": "simple", "value": [1] }],
            [{ "name": "advanced", "value": [1] }],
            [{ "name": "advanced", "value": [1] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "simple", "value": [1] }],
            [{ "name": "simple", "value": [1] }, { "name": "ninja", "value": [1] }],
            [{ "name": "advanced", "value": [1] }],
            [{ "name": "advanced", "value": [1] }, { "name": "ninja", "value": [1] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "simple", "value": [1] }, { "name": "ninja", "value": [2] }],
            [{ "name": "simple", "value": [1] }, { "name": "rocket", "value": [1] }],
            [{ "name": "advanced", "value": [1] }, { "name": "ninja", "value": [2] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [1] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [1] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "bird", "value": [0] }],
            [{ "name": "simple", "value": [1] }, { "name": "rocket", "value": [2] }],
            [{ "name": "simple", "value": [1] }, { "name": "spike", "value": [1] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [2] }],
            [{ "name": "advanced", "value": [1] }, { "name": "ninja", "value": [3] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "ninja", "value": [3] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "simple", "value": [1] }, { "name": "spike", "value": [2] }],
            [{ "name": "simple", "value": [1] }, { "name": "laser", "value": [1] }],
            [{ "name": "advanced", "value": [1] }, { "name": "ninja", "value": [4] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "simple", "value": [1] }, { "name": "spike", "value": [3] }],
            [{ "name": "simple", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "advanced", "value": [1] }, { "name": "ninja", "value": [5] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "simple", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "simple", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "simple", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "simple", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "simple", "value": [1] }, { "name": "rocket", "value": [3] }, { "name": "spike", "value": [5] }],
            [{ "name": "simple", "value": [1] }, { "name": "laser", "value": [2] }, { "name": "spike", "value": [5] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }, { "name": "ninja", "value": [5] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }, { "name": "ninja", "value": [5] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }, { "name": "ninja", "value": [5] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }, { "name": "ninja", "value": [5] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }, { "name": "ninja", "value": [5] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }, { "name": "ninja", "value": [5] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }, { "name": "ninja", "value": [5] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }, { "name": "ninja", "value": [5] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "simple", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "simple", "value": [1] }, { "name": "ninja", "value": [3] }],
            [{ "name": "simple", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "advanced", "value": [1] }, { "name": "spike", "value": [3] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "simple", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "simple", "value": [1] }, { "name": "ninja", "value": [3] }],
            [{ "name": "simple", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "advanced", "value": [1] }, { "name": "spike", "value": [3] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "advanced", "value": [1] }, { "name": "spike", "value": [3] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "simple", "value": [1] }, { "name": "rocket", "value": [3] }, { "name": "spike", "value": [5] }],
            [{ "name": "simple", "value": [1] }, { "name": "laser", "value": [2] }, { "name": "spike", "value": [5] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }, { "name": "ninja", "value": [5] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }, { "name": "ninja", "value": [5] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }, { "name": "ninja", "value": [5] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }, { "name": "ninja", "value": [5] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            //=======================================
            [{ "name": "simple", "value": [1] }],
            [{ "name": "simple", "value": [1] }],
            [{ "name": "advanced", "value": [1] }],
            [{ "name": "advanced", "value": [1] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "simple", "value": [1] }],
            [{ "name": "simple", "value": [1] }, { "name": "ninja", "value": [1] }],
            [{ "name": "advanced", "value": [1] }],
            [{ "name": "advanced", "value": [1] }, { "name": "ninja", "value": [1] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "simple", "value": [1] }, { "name": "ninja", "value": [2] }],
            [{ "name": "simple", "value": [1] }, { "name": "rocket", "value": [1] }],
            [{ "name": "advanced", "value": [1] }, { "name": "ninja", "value": [2] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [1] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [1] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "bird", "value": [0] }],
            [{ "name": "simple", "value": [1] }, { "name": "rocket", "value": [2] }],
            [{ "name": "simple", "value": [1] }, { "name": "spike", "value": [1] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [2] }],
            [{ "name": "advanced", "value": [1] }, { "name": "ninja", "value": [3] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "ninja", "value": [3] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "simple", "value": [1] }, { "name": "spike", "value": [2] }],
            [{ "name": "simple", "value": [1] }, { "name": "laser", "value": [1] }],
            [{ "name": "advanced", "value": [1] }, { "name": "ninja", "value": [4] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "simple", "value": [1] }, { "name": "spike", "value": [3] }],
            [{ "name": "simple", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "advanced", "value": [1] }, { "name": "ninja", "value": [5] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "simple", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "simple", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "simple", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "simple", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "simple", "value": [1] }, { "name": "rocket", "value": [3] }, { "name": "spike", "value": [5] }],
            [{ "name": "simple", "value": [1] }, { "name": "laser", "value": [2] }, { "name": "spike", "value": [5] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }, { "name": "ninja", "value": [5] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }, { "name": "ninja", "value": [5] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }, { "name": "ninja", "value": [5] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }, { "name": "ninja", "value": [5] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }, { "name": "ninja", "value": [5] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }, { "name": "ninja", "value": [5] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }, { "name": "ninja", "value": [5] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }, { "name": "ninja", "value": [5] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "simple", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "simple", "value": [1] }, { "name": "ninja", "value": [3] }],
            [{ "name": "simple", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "advanced", "value": [1] }, { "name": "spike", "value": [3] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "simple", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "simple", "value": [1] }, { "name": "ninja", "value": [3] }],
            [{ "name": "simple", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "advanced", "value": [1] }, { "name": "spike", "value": [3] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "advanced", "value": [1] }, { "name": "spike", "value": [3] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "simple", "value": [1] }, { "name": "rocket", "value": [3] }, { "name": "spike", "value": [5] }],
            [{ "name": "simple", "value": [1] }, { "name": "laser", "value": [2] }, { "name": "spike", "value": [5] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }, { "name": "ninja", "value": [5] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }, { "name": "ninja", "value": [5] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }, { "name": "ninja", "value": [5] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }, { "name": "ninja", "value": [5] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            //=======================================
            [{ "name": "simple", "value": [1] }],
            [{ "name": "simple", "value": [1] }],
            [{ "name": "advanced", "value": [1] }],
            [{ "name": "advanced", "value": [1] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "simple", "value": [1] }],
            [{ "name": "simple", "value": [1] }, { "name": "ninja", "value": [1] }],
            [{ "name": "advanced", "value": [1] }],
            [{ "name": "advanced", "value": [1] }, { "name": "ninja", "value": [1] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "simple", "value": [1] }, { "name": "ninja", "value": [2] }],
            [{ "name": "simple", "value": [1] }, { "name": "rocket", "value": [1] }],
            [{ "name": "advanced", "value": [1] }, { "name": "ninja", "value": [2] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [1] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [1] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "bird", "value": [0] }],
            [{ "name": "simple", "value": [1] }, { "name": "rocket", "value": [2] }],
            [{ "name": "simple", "value": [1] }, { "name": "spike", "value": [1] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [2] }],
            [{ "name": "advanced", "value": [1] }, { "name": "ninja", "value": [3] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "ninja", "value": [3] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "simple", "value": [1] }, { "name": "spike", "value": [2] }],
            [{ "name": "simple", "value": [1] }, { "name": "laser", "value": [1] }],
            [{ "name": "advanced", "value": [1] }, { "name": "ninja", "value": [4] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "simple", "value": [1] }, { "name": "spike", "value": [3] }],
            [{ "name": "simple", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "advanced", "value": [1] }, { "name": "ninja", "value": [5] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "simple", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "simple", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "simple", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "simple", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "simple", "value": [1] }, { "name": "rocket", "value": [3] }, { "name": "spike", "value": [5] }],
            [{ "name": "simple", "value": [1] }, { "name": "laser", "value": [2] }, { "name": "spike", "value": [5] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }, { "name": "ninja", "value": [5] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }, { "name": "ninja", "value": [5] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }, { "name": "ninja", "value": [5] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }, { "name": "ninja", "value": [5] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }, { "name": "ninja", "value": [5] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }, { "name": "ninja", "value": [5] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }, { "name": "ninja", "value": [5] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }, { "name": "ninja", "value": [5] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "simple", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "simple", "value": [1] }, { "name": "ninja", "value": [3] }],
            [{ "name": "simple", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "advanced", "value": [1] }, { "name": "spike", "value": [3] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "simple", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "simple", "value": [1] }, { "name": "ninja", "value": [3] }],
            [{ "name": "simple", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "advanced", "value": [1] }, { "name": "spike", "value": [3] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "advanced", "value": [1] }, { "name": "spike", "value": [3] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "simple", "value": [1] }, { "name": "rocket", "value": [3] }, { "name": "spike", "value": [5] }],
            [{ "name": "simple", "value": [1] }, { "name": "laser", "value": [2] }, { "name": "spike", "value": [5] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }, { "name": "ninja", "value": [5] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }, { "name": "ninja", "value": [5] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }, { "name": "ninja", "value": [5] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }, { "name": "ninja", "value": [5] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            //=======================================
            [{ "name": "simple", "value": [1] }],
            [{ "name": "simple", "value": [1] }],
            [{ "name": "advanced", "value": [1] }],
            [{ "name": "advanced", "value": [1] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "simple", "value": [1] }],
            [{ "name": "simple", "value": [1] }, { "name": "ninja", "value": [1] }],
            [{ "name": "advanced", "value": [1] }],
            [{ "name": "advanced", "value": [1] }, { "name": "ninja", "value": [1] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "simple", "value": [1] }, { "name": "ninja", "value": [2] }],
            [{ "name": "simple", "value": [1] }, { "name": "rocket", "value": [1] }],
            [{ "name": "advanced", "value": [1] }, { "name": "ninja", "value": [2] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [1] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [1] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "bird", "value": [0] }],
            [{ "name": "simple", "value": [1] }, { "name": "rocket", "value": [2] }],
            [{ "name": "simple", "value": [1] }, { "name": "spike", "value": [1] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [2] }],
            [{ "name": "advanced", "value": [1] }, { "name": "ninja", "value": [3] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "ninja", "value": [3] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "simple", "value": [1] }, { "name": "spike", "value": [2] }],
            [{ "name": "simple", "value": [1] }, { "name": "laser", "value": [1] }],
            [{ "name": "advanced", "value": [1] }, { "name": "ninja", "value": [4] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "simple", "value": [1] }, { "name": "spike", "value": [3] }],
            [{ "name": "simple", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "advanced", "value": [1] }, { "name": "ninja", "value": [5] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "simple", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "simple", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "simple", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "simple", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "simple", "value": [1] }, { "name": "rocket", "value": [3] }, { "name": "spike", "value": [5] }],
            [{ "name": "simple", "value": [1] }, { "name": "laser", "value": [2] }, { "name": "spike", "value": [5] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }, { "name": "ninja", "value": [5] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }, { "name": "ninja", "value": [5] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }, { "name": "ninja", "value": [5] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }, { "name": "ninja", "value": [5] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }, { "name": "ninja", "value": [5] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }, { "name": "ninja", "value": [5] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }, { "name": "ninja", "value": [5] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }, { "name": "ninja", "value": [5] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "simple", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "simple", "value": [1] }, { "name": "ninja", "value": [3] }],
            [{ "name": "simple", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "advanced", "value": [1] }, { "name": "spike", "value": [3] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }],
            [{ "name": "simple", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "simple", "value": [1] }, { "name": "ninja", "value": [3] }],
            [{ "name": "simple", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "advanced", "value": [1] }, { "name": "spike", "value": [3] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "advanced", "value": [1] }, { "name": "spike", "value": [3] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }],
            [{ "name": "obstacle", "value": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "simple", "value": [1] }, { "name": "rocket", "value": [3] }, { "name": "spike", "value": [5] }],
            [{ "name": "simple", "value": [1] }, { "name": "laser", "value": [2] }, { "name": "spike", "value": [5] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }, { "name": "ninja", "value": [5] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }, { "name": "ninja", "value": [5] }],
            [{ "name": "advanced", "value": [1] }, { "name": "rocket", "value": [3] }, { "name": "ninja", "value": [5] }],
            [{ "name": "advanced", "value": [1] }, { "name": "laser", "value": [2] }, { "name": "ninja", "value": [5] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
            [{ "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }, { "name": "bird", "value": [0] }],
        ];
    };
    RunControl.prototype.shutdown = function () {
        console.log("shutdown");
        this.arrayButton = [];
        this.arrayObstacles = [];
        this.arrayBird = [];
        this.arrayChild = [];
        this.arraySet = [];
        this.timerPlay = 1000;
        this.isActiveDecel = false;
        this.arrayBullet = [];
        this.counterTimerSpeed = 1000;
        this.timerSpawnLaserLong = 5000;
        this.timerSpawnOverlap = 1000;
        this.setting = null;
        this.decelX = 0.1;
        this.isJumping = false;
        this.arrayHearts = [];
        LANDING_FIRST = false;
        SPEEDALL = 5;
        SPEEDNORMAL = 5;
        METER_COUNTER = 0;
        this.isDragonActive = false;
        this.dragonRush = null;
        this.resetLevel();
    };
    RunControl.NAME = "runcontrol";
    return RunControl;
}(BaseState));
var Starter = /** @class */ (function () {
    function Starter() {
    }
    Starter.StartGame = function () {
        game.state.start(TitleScreen.NAME);
        // game.state.start(RunControl.NAME);
        // game.state.start(Congrats.NAME);
    };
    return Starter;
}());
var TitleScreen = /** @class */ (function (_super) {
    __extends(TitleScreen, _super);
    function TitleScreen() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.setting = null;
        _this.arrayButton = [];
        _this.debrisDelay = 0;
        _this.timerSpawnObject = 0;
        _this.timerSpawnObjectMax = 5000;
        return _this;
    }
    TitleScreen.prototype.create = function () {
        _super.prototype.create.call(this);
        TitleScreen.Instance = this;
        this.loadDataSaved();
        this.buildLayers();
        this.initKeyboard();
        this.initMouse();
        this.initMC();
        if (SHOW_FPS)
            this.trackFps();
        // this.spawnChoice();
        // this.spawnConfrimReset();
        //================ controlled dragon, player can ride dragon ================//
        // this.initDragon();
    };
    TitleScreen.prototype.spawnDebris = function () {
        var posX = Math.random() * GAMEWIDTH;
        var posY = Math.random() * GAMEHEIGHT;
        var array = [cjLaserBody, cjLaserEndLeft, cjLaserEndRight, cjLaserRotate, cjLaserStatic];
        if (Math.random() < 0.5)
            array = [cjDebrisSpike0, cjDebrisSpike1, cjDebrisSpike2, cjDebrisSpike3, cjDebrisSpike4, cjDebrisSpike5];
        array = [cjDebrisEnemy0, cjDebrisEnemy1, cjDebrisEnemy2, cjDebrisEnemy3, cjDebrisEnemy4];
        var rocket = new Debris(posX, posY, this.uiLayer, Math.random() * 10 - 5, Math.random() * 0.1, array, 12, -10);
        this.uiLayer.add(rocket);
        var rocket = new Debris(posX, posY, this.uiLayer, Math.random() * 10 - 5, Math.random() * 0.1, array, 12, -10);
        this.uiLayer.add(rocket);
        var rocket = new Debris(posX, posY, this.uiLayer, Math.random() * 10 - 5, Math.random() * 0.1, array, 12, -10);
        this.uiLayer.add(rocket);
        var rocket = new Debris(posX, posY, this.uiLayer, Math.random() * 10 - 5, Math.random() * 0.1, array, 12, -10);
        this.uiLayer.add(rocket);
        var rocket = new Debris(posX, posY, this.uiLayer, Math.random() * 10 - 5, Math.random() * 0.1, array, 12, -10);
        this.uiLayer.add(rocket);
        var rocket = new Debris(posX, posY, this.uiLayer, Math.random() * 10 - 5, Math.random() * 0.1, array, 12, -10);
        this.uiLayer.add(rocket);
    };
    TitleScreen.prototype.initDragon = function () {
        var startX = 800;
        var startY = 0;
        var factor = 50;
        var delay = 10;
        this.headControllable = new ControlledDragonHead(startX, startY, 0);
        var arrayBody = [];
        for (var index = 25; index > 0; index--) {
            var body = new ControlledDragonBody(startX - index * factor, startY, index * delay);
            this.uiLayer.add(body);
            arrayBody.push(body);
        }
        for (var index = 0; index < arrayBody.length - 1; index++) {
            var element = arrayBody[index];
            element.prevBody = arrayBody[index + 1];
        }
        arrayBody[arrayBody.length - 1].prevBody = this.headControllable;
        this.uiLayer.add(this.headControllable);
    };
    TitleScreen.prototype.spawnSkinScreen = function () {
        var skin = new SkinScreen();
        this.uiLayer.add(skin);
    };
    TitleScreen.prototype.spawnAchievementBoard = function () {
        var achievBoard = new AchievementScreen();
        this.uiLayer.add(achievBoard);
    };
    TitleScreen.prototype.trackFps = function () {
        this.fpsNumber = game.add.bitmapText(GAMEWIDTH * 0.5, 30, font_36, "0", 25);
        this.fpsNumber.anchor.setTo(0.5, 0.5);
        this.uiLayer.add(this.fpsNumber);
        var fps = game.add.bitmapText(GAMEWIDTH * 0.5 + 50, 30, font_36, Language.GetText("fps"), 25);
        fps.anchor.set(0.5, 0.5);
        this.uiLayer.add(fps);
    };
    TitleScreen.prototype.buildLayers = function () {
        this.bgLayer = game.add.group();
        this.tailLayer = game.add.group();
        this.objectLayer = game.add.group();
        this.uiLayer = game.add.group();
    };
    TitleScreen.prototype.initMC = function () {
        // var bg = new ParallaxBg(false);
        // this.bgLayer.add(bg);
        // return;
        var _this = this;
        var bg = new ParallaxBg(true);
        this.bgLayer.add(bg);
        this.title = this.add.sprite(halfGameWidth, GAMEHEIGHT + 150, cjTitle);
        this.title.anchor.setTo(0.5);
        this.uiLayer.add(this.title);
        this.logo = this.add.sprite(10, 10, cjLogo);
        this.logo.scale.setTo(1);
        this.logo.anchor.setTo(0, 0);
        this.logo.inputEnabled = true;
        this.logo.input.useHandCursor = true;
        this.logo.events.onInputDown.addOnce(function () {
            window.open("https://www.twitter.com/ArmorGames", "_blank");
        }, this);
        this.uiLayer.add(this.logo);
        var duration = 1500;
        game.add.tween(this.title).to({ x: halfGameWidth, y: 150 }, duration, Phaser.Easing.Back.Out, true);
        game.add.tween(this.logo).from({ y: -100 }, duration, Phaser.Easing.Back.Out, true);
        this.buildButtons();
        var btnSetting = new ButtonCustom(GAMEWIDTH - 45, 45, cjButtonSetting, "", 25, 0, 0, function () {
            SoundPlayer.playSFX(SoundPlayer.CLICK);
            btnSetting.isClicked = true;
            new Delay(300, function () {
                PAUSED = true;
                _this.openSetting();
            });
        }, font_36);
        btnSetting.anchor.setTo(0.5);
        this.uiLayer.add(btnSetting);
        this.arrayButton.push(btnSetting);
        var achiementIcon = new ButtonCustom(145, gameHeight - 121, cjButtonAchievement, Language.GetText("trophies"), 31, 0, 60, function () {
            SoundPlayer.playSFX(SoundPlayer.CLICK);
            achiementIcon.isClicked = true;
            new Delay(300, function () {
                PAUSED = true;
                _this.disableInputBtns();
                _this.spawnAchievementBoard();
            });
        }, font_36_white);
        achiementIcon.anchor.setTo(0.5);
        this.uiLayer.add(achiementIcon);
        this.arrayButton.push(achiementIcon);
        if (!HIDDEN_BUTTON_SKIN) {
            var skinButton = new ButtonCustom(GAMEWIDTH - 150, gameHeight - 113, cjButtonSkin, Language.GetText("skins"), 35, 0, 51, function () {
                SoundPlayer.playSFX(SoundPlayer.CLICK);
                skinButton.isClicked = true;
                new Delay(300, function () {
                    PAUSED = true;
                    _this.disableInputBtns();
                    _this.spawnSkinScreen();
                });
            }, font_36_white);
            skinButton.anchor.setTo(0.5);
            this.uiLayer.add(skinButton);
            this.arrayButton.push(skinButton);
        }
    };
    TitleScreen.prototype.openSetting = function () {
        var _this = this;
        this.setting = new SettingScreen();
        this.setting.btnClose.onInputDown.addOnce(function () {
            SoundPlayer.playSFX(SoundPlayer.CLICK);
            _this.setting.btnClose.isClicked = true;
            PAUSED = false;
            new Delay(300, function () {
                _this.setting.destroy();
                _this.setting = null;
                _this.enableInputBtns();
            });
        });
        this.uiLayer.add(this.setting);
        this.disableInputBtns();
    };
    TitleScreen.prototype.disableInputBtns = function () {
        for (var i = 0; i < this.arrayButton.length; i++) {
            this.arrayButton[i].visible = false;
            this.arrayButton[i].inputEnabled = false;
        }
    };
    TitleScreen.prototype.enableInputBtns = function () {
        for (var i = 0; i < this.arrayButton.length; i++) {
            this.arrayButton[i].visible = true;
            this.arrayButton[i].inputEnabled = true;
            this.arrayButton[i].input.useHandCursor = true;
        }
    };
    TitleScreen.prototype.buildButtons = function () {
        var _this = this;
        this.btn = new ButtonCustom(halfGameWidth, GAMEHEIGHT - 121, cjButtonStart, Language.GetText("start"), 35, 0, 61, function () {
            SoundPlayer.playSFX(SoundPlayer.DRUM);
            _this.btn.isClicked = true;
            new Delay(300, function () {
                _this.customTransitionOut();
            });
        }, font_36_white);
        this.btn.inputEnabled = false;
        this.btn.anchor.setTo(0.5);
        this.uiLayer.add(this.btn);
        var posY = halfGameHeight - 25;
        if (HIDDEN_BUTTON_SKIN)
            posY = gameHeight - 113;
        var btnMoreGames = new ButtonCustom(GAMEWIDTH - 150, posY, cjButtonMoreGames, Language.GetText("moregames"), 25, 0, 55, function () {
            SoundPlayer.playSFX(SoundPlayer.CLICK);
            btnMoreGames.isClicked = true;
            new Delay(300, function () {
                window.open("https://armor.ag/MoreGames", "_blank");
            });
        }, font_36_white);
        btnMoreGames.inputEnabled = false;
        btnMoreGames.anchor.setTo(0.5);
        this.uiLayer.add(btnMoreGames);
        var duration = 1500;
        game.add.tween(this.btn).to({ alpha: 1 }, duration * 0.5, Phaser.Easing.Linear.None, true, duration);
        this.transitionIn(function () {
            _this.btn.inputEnabled = true;
            _this.btn.input.useHandCursor = true;
            btnMoreGames.inputEnabled = true;
            btnMoreGames.input.useHandCursor = true;
            SoundPlayer.playBGM(SoundPlayer.BGM);
            _this.loadDataSavedBGM();
        });
        this.arrayButton.push(this.btn);
        this.arrayButton.push(btnMoreGames);
    };
    TitleScreen.prototype.customTransitionOut = function (nextState) {
        var _this = this;
        if (nextState === void 0) { nextState = RunControl.NAME; }
        game.add.tween(this.title).to({ alpha: 0 }, 500, Phaser.Easing.Quadratic.Out, true);
        game.add.tween(this.title.scale).to({ x: 0, y: 0 }, 500, Phaser.Easing.Back.In, true);
        for (var i = 0; i < this.arrayButton.length; i++) {
            game.add.tween(this.arrayButton[i]).to({ alpha: 0 }, 500, Phaser.Easing.Quadratic.Out, true);
            if (i == this.arrayButton.length - 1) {
                game.add.tween(this.arrayButton[i]).to({ alpha: 0 }, 500, Phaser.Easing.Quadratic.Out, true).onComplete.addOnce(function () {
                    _this.btn.destroy();
                    if (ISFIRST) {
                        _this.spawnChoice();
                    }
                    else {
                        _this.transitionOut(nextState);
                    }
                });
            }
        }
    };
    TitleScreen.prototype.spawnChoice = function () {
        var reset = new Reset();
        this.uiLayer.add(reset);
    };
    TitleScreen.prototype.spawnConfrimReset = function () {
        var confirm = new ConfirmReset();
        this.uiLayer.add(confirm);
    };
    TitleScreen.prototype.doTrackFPS = function () {
        this.fpsNumber.setText(game.time.fps + "");
    };
    TitleScreen.prototype.update = function () {
        if (SHOW_FPS)
            this.doTrackFPS();
        this.checkState();
        // this.initDebris();
    };
    TitleScreen.prototype.initDebris = function () {
        this.debrisDelay--;
        if (this.debrisDelay < 0) {
            this.spawnDebris();
            this.debrisDelay = 50;
        }
    };
    TitleScreen.prototype.checkState = function () {
        if (PAUSED)
            return;
        this.spawnObjects();
        this.smoothSound();
    };
    TitleScreen.prototype.spawnObjects = function () {
        this.timerSpawnObject -= game.time.elapsedMS;
        if (this.timerSpawnObject < 0) {
            var randomIndex = Math.floor(Math.random() * 4);
            var myObject = null;
            var posY = 200;
            var posX = gameWidth * 2 + 150;
            var posYmax = 200;
            var posYmin = 50;
            var limitMovementDragon = 0;
            switch (randomIndex) {
                case 0:
                    SoundPlayer.playSFX(SoundPlayer.WOMANHAIYA);
                    myObject = new PlayerChild(-30, 300, cjMomo, 0);
                    myObject.isFinished = true;
                    break;
                case 1:
                    SoundPlayer.playSFX(SoundPlayer.WOMANHAIYA);
                    myObject = new PlayerChild(-30, 500, cjTurtle, 0);
                    myObject.isFinished = true;
                    myObject.objectLayer = this.objectLayer;
                    break;
                case 2:
                    this.playSFXDragon();
                    this.timerSpawnObjectMax = 10000;
                    posY = Math.random() * posYmax + posYmin;
                    while (posY > posYmax)
                        posY = Math.random() * posYmax + posYmin;
                    limitMovementDragon = 200 + posY - 50;
                    myObject = new Particle(posX, posY, cjDragonFireHead, FIRE_DRAGON, 0, limitMovementDragon, TitleScreen.Instance);
                    myObject.anchor.setTo(0.5);
                    break;
                case 3:
                    this.playSFXDragon();
                    this.timerSpawnObjectMax = 10000;
                    posY = Math.random() * posYmax + posYmin;
                    while (posY > posYmax)
                        posY = Math.random() * posYmax + posYmin;
                    limitMovementDragon = 200 + posY - 50;
                    myObject = new Particle(posX, posY, cjDragonEarthHead, EARTH_DRAGON, 0, limitMovementDragon, TitleScreen.Instance);
                    myObject.anchor.setTo(0.5);
                    break;
            }
            this.objectLayer.add(myObject);
            this.timerSpawnObject = this.timerSpawnObjectMax;
        }
    };
    TitleScreen.prototype.spawnParticleEfect = function (x, y, speedX, adjustSpeedX, key, delay, limitMovementDragon) {
        if (key === void 0) { key = ""; }
        if (delay === void 0) { delay = 0; }
        if (limitMovementDragon === void 0) { limitMovementDragon = 0; }
        var particleEfect = new ParticleEfect(x, y, speedX, adjustSpeedX, key, delay, limitMovementDragon);
        if (key == cjTailFire || key == cjTailEarth) {
            this.tailLayer.add(particleEfect);
        }
        else {
            this.objectLayer.add(particleEfect);
        }
        return particleEfect;
    };
    TitleScreen.prototype.shutdown = function (game) {
        this.setting = null;
        this.arrayButton = [];
    };
    TitleScreen.NAME = "titlescreen";
    return TitleScreen;
}(BaseState));
var ButtonCustom = /** @class */ (function (_super) {
    __extends(ButtonCustom, _super);
    function ButtonCustom(x, y, key, text, textFontSize, offsetX, offsetY, callback, font, isButtonShop) {
        if (callback === void 0) { callback = null; }
        if (font === void 0) { font = font_36; }
        if (isButtonShop === void 0) { isButtonShop = false; }
        var _this = _super.call(this, game, x, y, key, callback) || this;
        _this.isButtonShop = false;
        _this.targetAlpha = 1;
        _this.enableBuy = true;
        _this.isClicked = false;
        _this.text = text;
        _this.isButtonShop = isButtonShop;
        if (isButtonShop)
            _this.drawDisableButton();
        _this.tf = game.add.bitmapText(offsetX, offsetY, font, _this.text, textFontSize);
        _this.tf.anchor.setTo(0.5, 0.5);
        _this.addChild(_this.tf);
        _this.drawArc();
        return _this;
    }
    ButtonCustom.prototype.drawDisableButton = function () {
        this.disableImg = game.add.image(0, 0, cjButtonBuyRed);
        this.disableImg.anchor.setTo(0.5);
        this.disableImg.alpha = 0;
        this.addChild(this.disableImg);
    };
    ButtonCustom.prototype.drawArc = function () {
        this.graphicsCircle = new Phaser.Graphics(game, 0, 0);
        this.graphicsCircle.beginFill(0xff0000);
        this.graphicsCircle.drawCircle(0, 0, 10);
        this.graphicsCircle.endFill();
        this.graphicsCircle.alpha = 0;
        this.addChild(this.graphicsCircle);
    };
    ButtonCustom.prototype.preUpdate = function () {
        this.tf.setText(this.text);
        this.juicyEffect();
        this.checkEnableBuy();
        this.blinkDisable();
    };
    ButtonCustom.prototype.blinkDisable = function () {
        if (!this.isButtonShop)
            return;
        if (this.targetAlpha < 1) {
            this.targetAlpha += 0.1;
            this.disableImg.alpha -= this.targetAlpha;
        }
        else {
            this.disableImg.alpha = 0;
        }
    };
    ButtonCustom.prototype.checkEnableBuy = function () {
        if (!this.isButtonShop)
            return;
        if (this.enableBuy)
            return;
        this.targetAlpha = 0;
        this.disableImg.alpha = 1;
        this.enableBuy = true;
    };
    ButtonCustom.prototype.juicyEffect = function () {
        var _this = this;
        if (!this.isClicked)
            return;
        game.add.tween(this.scale).to({ x: 0.90, y: 0.90 }, 5, Phaser.Easing.Back.Out, true).onComplete.add(function () {
            game.add.tween(_this.scale).to({ x: 1, y: 1 }, 50, Phaser.Easing.Back.In, true);
        });
        this.isClicked = false;
    };
    return ButtonCustom;
}(Phaser.Button));
var Blast = /** @class */ (function (_super) {
    __extends(Blast, _super);
    function Blast(x, y, speed) {
        if (speed === void 0) { speed = 0; }
        var _this = _super.call(this, game, x, y, cjBlank) || this;
        _this.scale.setTo(0.3);
        _this.speed = speed;
        _this.initSpeed = speed;
        _this.drawRect();
        _this.drawWhiteRing();
        _this.animateOut();
        return _this;
    }
    Blast.prototype.animateOut = function () {
        var _this = this;
        var duration = 350 * 2;
        game.add.tween(this.rect).to({ alpha: 0 }, duration, Phaser.Easing.Linear.None, true);
        game.add.tween(this.ring.scale).to({ x: GAMEWIDTH / this.ring.width, y: GAMEWIDTH / this.ring.width }, duration, Phaser.Easing.Linear.None, true);
        game.add.tween(this.ring).to({ alpha: 0 }, duration, Phaser.Easing.Linear.None, true).onComplete.addOnce(function () {
            _this.destroy();
        });
    };
    Blast.prototype.drawWhiteRing = function () {
        this.ring = game.add.image(0, 0, cjWhiteRing);
        this.ring.scale.setTo(200 / this.ring.width, 200 / this.ring.height);
        this.ring.anchor.setTo(0.5);
        this.addChild(this.ring);
    };
    Blast.prototype.drawRect = function () {
        this.rect = new Phaser.Graphics(game, 0, 0);
        this.rect.beginFill(0xFFFFFF, 0.5);
        this.rect.drawRect(0, 0, GAMEWIDTH, GAMEHEIGHT);
        this.rect.endFill();
        RunControl.Instance.objectLayers.add(this.rect);
    };
    Blast.prototype.update = function () {
        this.moveX();
    };
    Blast.prototype.moveX = function () {
        if (GAMEOVER)
            return;
        if (rushCounter > 0)
            this.speed = SPEEDALL;
        else
            this.speed = this.initSpeed;
        this.x -= this.speed;
    };
    return Blast;
}(Phaser.Image));
var Blood = /** @class */ (function (_super) {
    __extends(Blood, _super);
    function Blood(x, y, directAngle) {
        if (directAngle === void 0) { directAngle = 0; }
        var _this = _super.call(this, game, x, y, cjBloodSplat) || this;
        _this.initPosX = 0;
        _this.initPosY = 0;
        _this.speed = 1;
        _this.distance = 0;
        _this.tempX = 0;
        _this.tempY = 0;
        _this.directionAngle = 0;
        _this.distanceMax = 100;
        _this.forceDown = 0.01;
        _this.gravitationY = 0;
        _this.targetPosY = 510;
        _this.directionAngle = directAngle;
        _this.initPosXY();
        _this.animateScale();
        return _this;
    }
    Blood.prototype.animateScale = function () {
        var duration = 1000;
        game.add.tween(this.scale).to({ x: 0.1, y: 0.1 }, duration, Phaser.Easing.Linear.None, true);
    };
    Blood.prototype.initPosXY = function () {
        this.initPosX = this.x;
        this.initPosY = this.y;
    };
    Blood.prototype.postUpdate = function () {
        if (PAUSED)
            return;
        this.moveBlood();
    };
    Blood.prototype.moveBlood = function () {
        this.gravitationY += this.forceDown;
        this.distance += this.speed;
        this.tempX = this.distance * Math.sin(this.directionAngle * Math.PI / 180);
        this.tempY = this.distance * Math.cos(this.directionAngle * Math.PI / 180);
        this.initPosY += this.gravitationY;
        this.x = this.initPosX + this.tempX;
        this.y = this.initPosY - this.tempY;
        if (this.y >= this.targetPosY) {
            this.destroy();
        }
    };
    Blood.prototype.moveFallen = function () {
    };
    return Blood;
}(Phaser.Image));
var CoinEffect = /** @class */ (function (_super) {
    __extends(CoinEffect, _super);
    function CoinEffect(x, y) {
        var _this = _super.call(this, game, x, y, cjBlank) || this;
        var efect = game.add.sprite(0, 0, cjCoinCenter);
        efect.anchor.setTo(0.5);
        efect.animations.add("efect", [1, 2, 3]);
        efect.animations.play("efect");
        _this.addChild(efect);
        game.add.tween(efect).to({ alpha: 0.5 }, 100, Phaser.Easing.Linear.None, true).onComplete.addOnce(function () {
            _this.destroy();
        });
        return _this;
    }
    return CoinEffect;
}(Phaser.Image));
var Explosion = /** @class */ (function (_super) {
    __extends(Explosion, _super);
    function Explosion(x, y) {
        var _this = _super.call(this, game, x, y, cjExploision) || this;
        _this.counterSecond = 1000;
        _this.animations.add("idle", [0, 1, 2, 3], 4, true);
        _this.animations.play("idle");
        RunControl.Instance.startShake();
        if (RunControl.Instance.explosionCounter > 0)
            return _this;
        _this.drawRect();
        _this.drawWhiteRing();
        _this.animateOut();
        RunControl.Instance.explosionCounter = 3;
        return _this;
    }
    Explosion.prototype.animateOut = function () {
        var _this = this;
        var duration = 350 * 2;
        game.add.tween(this.rect).to({ alpha: 0 }, duration, Phaser.Easing.Linear.None, true);
        game.add.tween(this.ring.scale).to({ x: GAMEWIDTH / this.ring.width, y: GAMEWIDTH / this.ring.width }, duration, Phaser.Easing.Linear.None, true);
        game.add.tween(this.ring).to({ alpha: 0 }, duration, Phaser.Easing.Linear.None, true).onComplete.addOnce(function () {
            _this.rect.destroy();
            _this.ring.destroy();
        });
    };
    Explosion.prototype.drawWhiteRing = function () {
        this.ring = game.add.image(0, 0, cjWhiteRing);
        this.ring.scale.setTo(200 / this.ring.width, 200 / this.ring.height);
        this.ring.anchor.setTo(0.5);
        this.addChild(this.ring);
    };
    Explosion.prototype.drawRect = function () {
        this.rect = new Phaser.Graphics(game, 0, 0);
        this.rect.beginFill(0xFFFFFF, 0.5);
        this.rect.drawRect(0, 0, GAMEWIDTH, GAMEHEIGHT);
        this.rect.endFill();
        RunControl.Instance.objectLayers.add(this.rect);
    };
    Explosion.prototype.update = function () {
        this.moveX();
        this.counterSecond -= game.time.elapsedMS;
        if (this.counterSecond < 0) {
            this.destroy();
        }
    };
    Explosion.prototype.moveX = function () {
        if (GAMEOVER)
            return;
        this.x -= SPEEDALL;
    };
    return Explosion;
}(Phaser.Sprite));
var Magnet = /** @class */ (function (_super) {
    __extends(Magnet, _super);
    function Magnet(x, y) {
        var _this = _super.call(this, game, x, y, cjHeroMagnet) || this;
        var duration = 1000;
        game.add.tween(_this.scale).to({ x: 0.3, y: 0.3 }, duration, Phaser.Easing.Linear.None, true, 0, -1);
        game.add.tween(_this).to({ alpha: 0.5 }, duration, Phaser.Easing.Linear.None, true, 0, -1);
        return _this;
        // this.drawArc();
    }
    Magnet.prototype.drawArc = function () {
        this.graphicsCircle = new Phaser.Graphics(game, 0, 0);
        this.graphicsCircle.beginFill(0xff0000, 1);
        this.graphicsCircle.drawCircle(0, 0, 10);
        this.graphicsCircle.endFill();
        this.addChild(this.graphicsCircle);
    };
    return Magnet;
}(Phaser.Image));
var ParticleEfect = /** @class */ (function (_super) {
    __extends(ParticleEfect, _super);
    function ParticleEfect(x, y, speedX, adjustSpeedX, key, delay, limitMovementDragon) {
        if (key === void 0) { key = cjBodyEarthLoop; }
        if (delay === void 0) { delay = 0; }
        if (limitMovementDragon === void 0) { limitMovementDragon = 0; }
        var _this = _super.call(this, game, x, y, cjBlank) || this;
        _this.durationTween = 2000;
        _this.timerDuration = 0;
        _this.timerDurationMax = 3500;
        _this.isActive = false;
        _this.delayActive = null;
        _this.prevBody = null;
        _this.catchUpSpeed = 0;
        _this.divider = 12;
        _this.factorIncreaseMovement = 0.05;
        _this.factorMovement = 0;
        _this.delayMovement = 0;
        _this.statusAngle = '';
        _this.factorAngle = 1;
        _this.limitAngleTop = -30;
        _this.limitAngleBottom = 30;
        _this.delayAngle = 0;
        _this.speedPlayerDead = 1;
        _this.statusKill = false;
        _this.isMoveX = false;
        _this.delayMovement = delay;
        _this.limitMovementDragon = limitMovementDragon;
        _this.keyImage = key;
        _this.speed = speedX;
        _this.initSpeedX = speedX;
        _this.adjustSpeedX = adjustSpeedX;
        _this.drawPartDragon();
        return _this;
        // this.drawArc();
        // this.tweenAngle();
    }
    ParticleEfect.prototype.drawPartDragon = function () {
        this.partDragon = game.add.image(0, 0, this.keyImage);
        this.partDragon.anchor.setTo(0.5);
        if (this.keyImage == cjTailEarth || this.keyImage == cjTailFire)
            this.partDragon.anchor.setTo(0.5, 0.37);
        this.addChild(this.partDragon);
    };
    ParticleEfect.prototype.drawArc = function () {
        this.graphicsCircle = new Phaser.Graphics(game, 0, 0);
        this.graphicsCircle.beginFill(0xff0000, 1);
        this.graphicsCircle.drawCircle(0, 0, 10);
        this.graphicsCircle.endFill();
        this.addChild(this.graphicsCircle);
    };
    ParticleEfect.prototype.tweenAngle = function () {
        this.tweenAnglePos = game.add.tween(this.partDragon).to({ angle: 30 }, this.durationTween, Phaser.Easing.Sinusoidal.InOut, false, 0, -1, true);
        this.tweenAngleNeg = game.add.tween(this.partDragon).to({ angle: -30 }, this.durationTween, Phaser.Easing.Sinusoidal.InOut, false, 0, -1, true);
    };
    ParticleEfect.prototype.trackAngle = function () {
        if (!this.isActive)
            return;
        this.timerDuration += game.time.elapsedMS;
        if (this.timerDuration <= this.timerDurationMax * 0.5) {
            this.tweenAnglePos.resume();
            this.tweenAngleNeg.pause();
        }
        else if (this.timerDuration <= this.timerDurationMax) {
            this.tweenAnglePos.pause();
            this.tweenAngleNeg.resume();
        }
        if (this.timerDuration >= this.timerDurationMax)
            this.timerDuration = 0;
    };
    ParticleEfect.prototype.checkStatusActive = function () {
        if (!this.delayActive)
            return;
        this.delayActive -= game.time.elapsedMS;
        if (this.delayActive <= 0) {
            this.delayActive = null;
            this.tweenAngleNeg.start();
            this.tweenAnglePos.start();
            this.isActive = true;
        }
    };
    ParticleEfect.prototype.update = function () {
        if (this.statusKill)
            return;
        if (PAUSED)
            return;
        if (this.delayMovement > 0) {
            this.delayMovement--;
            return;
        }
        // this.doFactorMovement();
        this.catchUpPosY();
        this.moveX();
        // this.doRotate();
        // this.trackAngle();
        // this.checkStatusActive();
    };
    ParticleEfect.prototype.catchUpPosY = function () {
        this.catchUpSpeed = (this.prevBody.y - this.y) / this.divider;
        this.y += this.catchUpSpeed;
        this.rotation = Math.atan2(this.prevBody.y - this.y, this.prevBody.x - this.x);
    };
    ParticleEfect.prototype.doFactorMovement = function () {
        if (this.factorMovement > 0) {
            if (this.y < this.limitMovementDragon)
                this.factorMovement += this.factorIncreaseMovement;
            else {
                this.factorMovement -= this.factorIncreaseMovement;
                if (this.factorMovement < 0) {
                    this.statusAngle = 'up';
                }
            }
        }
        else {
            if (this.y > this.limitMovementDragon)
                this.factorMovement -= this.factorIncreaseMovement;
            else {
                this.factorMovement += this.factorIncreaseMovement;
                if (this.factorMovement > 0) {
                    this.statusAngle = 'down';
                }
            }
        }
        this.y += this.factorMovement;
    };
    ParticleEfect.prototype.doRotate = function () {
        if (this.statusAngle == 'up') {
            this.angle -= this.factorAngle;
            if (this.angle < this.limitAngleTop)
                this.statusAngle = '';
        }
        else if (this.statusAngle == 'down') {
            this.angle += this.factorAngle;
            if (this.angle > this.limitAngleBottom)
                this.statusAngle = '';
        }
    };
    ParticleEfect.prototype.moveX = function () {
        if (!this.isMoveX)
            return;
        this.speed = -SPEEDALL + this.adjustSpeedX;
        if (GAMEOVER) {
            if (this.statusKill)
                this.speedPlayerDead = 0;
            this.speed = this.speedPlayerDead;
        }
        this.x += this.speed;
        if (this.x < -(gameWidth + 200))
            this.destroy();
    };
    return ParticleEfect;
}(Phaser.Image));
var Rush = /** @class */ (function (_super) {
    __extends(Rush, _super);
    function Rush(x, y) {
        var _this = _super.call(this, game, x, y, cjRush) || this;
        game.add.tween(_this).to({ alpha: 0.5 }, 500, Phaser.Easing.Linear.None, true, 0, -1);
        return _this;
    }
    return Rush;
}(Phaser.Image));
var Shadow = /** @class */ (function (_super) {
    __extends(Shadow, _super);
    function Shadow(x, y, key) {
        var _this = _super.call(this, game, x, y, key) || this;
        var duration = 1000;
        game.add.tween(_this).to({ x: 70 }, duration, Phaser.Easing.Linear.None, true);
        game.add.tween(_this).to({ alpha: 0.3 }, duration, Phaser.Easing.Linear.None, true).onComplete.addOnce(function () {
            _this.destroy();
        });
        return _this;
    }
    return Shadow;
}(Phaser.Image));
var Shield = /** @class */ (function (_super) {
    __extends(Shield, _super);
    function Shield(x, y) {
        var _this = _super.call(this, game, x, y, cjHeroShield) || this;
        game.add.tween(_this).to({ alpha: 0.5 }, 500, Phaser.Easing.Linear.None, true, 0, -1);
        return _this;
    }
    return Shield;
}(Phaser.Image));
var Sparkle = /** @class */ (function (_super) {
    __extends(Sparkle, _super);
    function Sparkle(x, y, duration, movement, index) {
        if (duration === void 0) { duration = 300; }
        if (movement === void 0) { movement = SPARK_DYNAMIC; }
        if (index === void 0) { index = 6; }
        var _this = _super.call(this, game, x, y, cjBlank) || this;
        _this.statusSparkle = movement;
        var spark = game.add.sprite(0, 0, cjParticle);
        spark.anchor.setTo(0.5);
        spark.angle = Math.random() * 180;
        spark.animations.add("spark", [index]);
        spark.animations.play("spark");
        spark.scale.setTo(0.1);
        _this.addChild(spark);
        game.add.tween(spark.scale).to({ x: 1, y: 1 }, duration, Phaser.Easing.Linear.None, true);
        if (_this.statusSparkle == SPARK_DYNAMIC)
            _this.moveX(spark, duration);
        game.add.tween(spark).to({ alpha: 0 }, duration, Phaser.Easing.Linear.None, true).onComplete.addOnce(function () {
            _this.destroy();
        });
        return _this;
    }
    Sparkle.prototype.moveX = function (sparkle, duration) {
        game.add.tween(sparkle).to({ x: -200 }, duration, Phaser.Easing.Linear.None, true);
    };
    return Sparkle;
}(Phaser.Sprite));
var Achievement = /** @class */ (function (_super) {
    __extends(Achievement, _super);
    function Achievement(x, y, keyIcon, textInfo) {
        if (keyIcon === void 0) { keyIcon = ""; }
        if (textInfo === void 0) { textInfo = ""; }
        var _this = _super.call(this, game, x, y, cjAchieveCompleted) || this;
        var sizeNumber = 25;
        var startPosY = -30;
        var posX = -150;
        var spaceY = 31;
        var adjustY = 0;
        var textTitle = Language.GetText("achievement") + " " + Language.GetText("unlock");
        var title = game.add.bitmapText(posX, startPosY, font_36, textTitle, sizeNumber);
        _this.addChild(title);
        var icon = game.add.image(-_this.width * 0.5 + 70, adjustY, keyIcon);
        icon.anchor.setTo(0.5);
        _this.addChild(icon);
        var message = game.add.bitmapText(posX, startPosY + spaceY, font_36, textInfo, sizeNumber - 3);
        message.align = "center";
        _this.addChild(message);
        var arrayTweenIn = [Phaser.Easing.Linear.None, Phaser.Easing.Back.In, Phaser.Easing.Bounce.In, Phaser.Easing.Elastic.In, Phaser.Easing.Quadratic.In];
        var arrayTweenOut = [Phaser.Easing.Linear.None, Phaser.Easing.Back.Out, Phaser.Easing.Bounce.Out, Phaser.Easing.Elastic.Out, Phaser.Easing.Quadratic.Out];
        var random = Math.floor(Math.random() * arrayTweenIn.length);
        game.add.tween(_this).to({ y: 70 }, 1000, Phaser.Easing.Linear.None, true).onComplete.addOnce(function () {
            game.add.tween(_this).to({ y: -500 }, 1500, Phaser.Easing.Linear.None, true, 1500).onComplete.addOnce(function () {
                _this.destroy();
                RunControl.Instance.prizeAch = null;
            });
        });
        return _this;
    }
    return Achievement;
}(Phaser.Image));
var AngelicDusk = /** @class */ (function (_super) {
    __extends(AngelicDusk, _super);
    function AngelicDusk(x, y) {
        var _this = _super.call(this, game, x, y, cjAngelicDuskSkin) || this;
        var duration = 1500;
        game.add.tween(_this).to({ x: -150 }, duration, Phaser.Easing.Circular.In, true);
        game.add.tween(_this.scale).to({ x: 0.3, y: 0.3 }, duration, Phaser.Easing.Linear.None, true);
        game.add.tween(_this).to({ alpha: 0.3 }, duration, Phaser.Easing.Linear.None, true).onComplete.addOnce(function () {
            _this.destroy();
        });
        return _this;
    }
    return AngelicDusk;
}(Phaser.Image));
var Background = /** @class */ (function (_super) {
    __extends(Background, _super);
    function Background(x, y, key, identitasKey) {
        var _this = _super.call(this, game, x, y, key) || this;
        _this.identitasKey = identitasKey;
        return _this;
    }
    return Background;
}(Phaser.Image));
var BankQuiz = /** @class */ (function () {
    function BankQuiz(typeQuiz) {
        this.arrayOption = [];
        this.typeQuiz = typeQuiz;
        this.getProblem(typeQuiz);
    }
    BankQuiz.prototype.getProblem = function (pil) {
        var a, b, c, result;
        switch (pil) {
            case ADDING_QUIZ:
                a = Math.floor(Math.random() * 10) + 1;
                b = Math.floor(Math.random() * 10) + 1;
                result = a + b;
                var array = [];
                array.push(result);
                for (var i = 0; i < 3; i++) {
                    c = Math.floor(Math.random() * result) + result;
                    while (array.indexOf(c) != -1) {
                        c = Math.floor(Math.random() * result) - result;
                    }
                    array.push(c);
                }
                this.quiz = a + " + " + b + " = ?";
                break;
            case SUBTRACT_QUIZ:
                a = Math.floor(Math.random() * 10) + 1;
                b = Math.floor(Math.random() * 10) + 1;
                result = a - b;
                var array = [];
                array.push(result);
                for (var i = 0; i < 3; i++) {
                    c = Math.floor(Math.random() * 10) + result;
                    while (array.indexOf(c) != -1) {
                        c = Math.floor(Math.random() * 10) - result;
                    }
                    array.push(c);
                }
                this.quiz = a + " - " + b + " = ?";
                break;
            case MULTIPLY_QUIZ:
                a = Math.floor(Math.random() * 10) + 1;
                b = Math.floor(Math.random() * 10) + 1;
                result = a * b;
                var onesNumber = result;
                if (result > 10) {
                    onesNumber = result % 10;
                }
                var array = [];
                array.push(result);
                for (var i = 0; i < 3; i++) {
                    c = (Math.floor(Math.random() * 3) + 1) * 10 + onesNumber;
                    while (array.indexOf(c) != -1) {
                        c = (Math.floor(Math.random() * 7) + 1) * 10 + onesNumber;
                    }
                    array.push(c);
                }
                this.quiz = a + " x " + b + " = ?";
                break;
            case DIVIDE_QUIZ:
                a = (Math.floor(Math.random() * 10) + 10) * (Math.floor(Math.random() * 5) + 2);
                b = Math.floor(Math.random() * 10) + 1;
                while (a % b != 0 || b == 1) {
                    b = Math.floor(Math.random() * 10) + 1;
                }
                result = a / b;
                var onesNumber = result;
                if (result > 10) {
                    onesNumber = result % 10;
                }
                var array = [];
                array.push(result);
                for (var i = 0; i < 3; i++) {
                    c = Math.floor(Math.random() * 10) + result;
                    while (array.indexOf(c) != -1) {
                        c = Math.floor(Math.random() * 10) * 10 + onesNumber;
                    }
                    array.push(c);
                }
                this.quiz = a + " / " + b + " = ?";
                break;
            case EXPONENT_QUIZ:
                a = Math.floor(Math.random() * 10) + 1;
                b = Math.floor(Math.random() * 3) + 1;
                result = Math.pow(a, b);
                var array = [];
                array.push(result);
                for (var i = 0; i < 3; i++) {
                    c = Math.floor(Math.random() * 10) + result;
                    while (array.indexOf(c) != -1) {
                        c = Math.floor(Math.random() * 10) - result;
                    }
                    array.push(c);
                }
                this.quiz = a + "," + b;
                break;
        }
        this.arrayOption = this.shuffle(array);
        this.valueAnswer = result;
    };
    BankQuiz.prototype.shuffle = function (array) {
        var _a;
        var currentIndex = array.length, randomIndex;
        while (currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            _a = [
                array[randomIndex], array[currentIndex]
            ], array[currentIndex] = _a[0], array[randomIndex] = _a[1];
        }
        return array;
    };
    return BankQuiz;
}());
var Bird = /** @class */ (function (_super) {
    __extends(Bird, _super);
    function Bird(x, y, spaceY) {
        if (spaceY === void 0) { spaceY = 150; }
        var _this = _super.call(this, game, x, y, cjBlank) || this;
        _this.speed = 1;
        _this.statusKill = false;
        _this.activatedSpawnBird = false;
        _this.counterCoin = 0;
        _this.counterMax = 5;
        _this.anchor.setTo(0.5);
        _this.animsBird = game.add.sprite(0, 0, cjBird);
        _this.animsBird.anchor.setTo(0.5);
        _this.animsBird.animations.add("fly-bird", [0, 1, 2, 3, 4, 5, 6], 15, true);
        _this.addChild(_this.animsBird);
        _this.speed = Math.random() * 4 + 1;
        var duration = 500;
        _this.tweenY = game.add.tween(_this).to({ y: spaceY }, duration * 2, Phaser.Easing.Sinusoidal.InOut, true, 0, -1, true);
        return _this;
    }
    Bird.prototype.update = function () {
        if (PAUSED) {
            this.tweenY.isPaused = true;
            this.animsBird.animations.stop();
            return;
        }
        this.resumeAnims();
        this.move();
        this.spawnCoin();
    };
    Bird.prototype.resumeAnims = function () {
        this.tweenY.isPaused = false;
        this.animsBird.animations.play("fly-bird");
    };
    Bird.prototype.move = function () {
        this.x += this.speed;
        if (this.x > GAMEWIDTH * 0.5)
            this.activatedSpawnBird = true;
        if (this.x > GAMEWIDTH + 50) {
            this.statusKill = true;
            this.destroy();
        }
    };
    Bird.prototype.spawnCoin = function () {
        if (!this.activatedSpawnBird)
            return;
        this.counterCoin--;
        if (this.counterCoin < 0) {
            if (GAMEOVER)
                this.counterMax = 7;
            this.counterCoin = this.counterMax;
            RunControl.Instance.spawnCoin(this.centerX - 15, this.centerY + 10, cjDiamond);
        }
    };
    return Bird;
}(Phaser.Image));
var BubbleChat = /** @class */ (function (_super) {
    __extends(BubbleChat, _super);
    function BubbleChat(x, y, id, callback) {
        if (id === void 0) { id = ""; }
        if (callback === void 0) { callback = null; }
        var _this = _super.call(this, game, x, y, cjBlank) || this;
        _this.id = "";
        _this.arrayDialog = [];
        _this.isJustPressed = false;
        _this.arrayLetter = [];
        _this.counterDelay = 0;
        _this.counterDelayMax = 70;
        _this.isRun = true;
        _this.isRunningText = true;
        var sequenceArray = BubbleChat.SequenceJson[id];
        if (sequenceArray == undefined)
            console.log("ERROR : Sequence with ID " + id + " does not exist");
        for (var i = 0; i < sequenceArray.length; i++) {
            _this.arrayDialog.push(_this.getDataDialog(id + "_" + i));
        }
        _this.id = id;
        _this.dialogCallback = callback;
        _this.drawBubble();
        _this.getDataDialog();
        _this.drawText();
        _this.game.input.onDown.add(function () { return _this.onInputDown(); }, _this);
        return _this;
        // this.drawArc();
    }
    BubbleChat.prototype.drawArc = function () {
        this.graphicsCircle = new Phaser.Graphics(game, 0, 0);
        this.graphicsCircle.beginFill(0xff0000, 1);
        this.graphicsCircle.drawCircle(0, 0, 10);
        this.graphicsCircle.endFill();
        this.textDialog.addChild(this.graphicsCircle);
    };
    BubbleChat.prototype.drawText = function () {
        var sizeFont = 19;
        var posX = 0;
        var posY = -50;
        this.textDialog = game.add.bitmapText(posX, posY, font_36, "", sizeFont);
        this.textDialog.anchor.setTo(0.5, 0);
        this.textDialog.align = "center";
        this.textDialog.maxWidth = 210;
        this.bubble.addChild(this.textDialog);
        this.currentText = this.arrayDialog.shift();
        this.arrayLetter = this.currentText.split("");
    };
    BubbleChat.prototype.getDataDialog = function (id) {
        if (id === void 0) { id = ""; }
        return Language.LanguageJson[id];
    };
    BubbleChat.prototype.onInputDown = function () {
        this.isJustPressed = true;
    };
    BubbleChat.prototype.drawBubble = function () {
        var posY = -115;
        var posX = 25;
        this.bubble = game.add.image(posX, posY, cjCallout);
        this.bubble.anchor.setTo(0.5);
        this.addChild(this.bubble);
    };
    BubbleChat.prototype.update = function () {
        this.trackDialog();
        this.animateLetter();
    };
    BubbleChat.prototype.animateLetter = function () {
        if (!this.isRun)
            return;
        this.counterDelay -= game.time.elapsedMS;
        if (this.counterDelay < 0) {
            var letter = this.arrayLetter.shift();
            this.textDialog.text += letter;
            this.counterDelay = this.counterDelayMax;
            if (this.arrayLetter.length == 0) {
                this.isRun = false;
                this.isRunningText = false;
            }
        }
        if (this.arrayLetter.length > 0 && this.isJustPressed) {
            this.textDialog.text = "";
            this.textDialog.text = this.currentText;
            this.isRun = false;
            this.isRunningText = false;
            this.isJustPressed = false;
        }
    };
    BubbleChat.prototype.trackDialog = function () {
        if (this.isJustPressed) {
            if (this.isRunningText)
                return;
            if (this.arrayDialog.length > 0) {
                this.currentText = this.arrayDialog.shift();
                this.arrayLetter = this.currentText.split("");
                this.isRun = true;
                this.isRunningText = true;
                this.textDialog.text = "";
            }
            else {
                this.dialogCallback();
            }
            this.isJustPressed = false;
        }
    };
    return BubbleChat;
}(Phaser.Image));
var Bullet = /** @class */ (function (_super) {
    __extends(Bullet, _super);
    function Bullet(x, y, key, directionAngle) {
        if (key === void 0) { key = cjBullet; }
        if (directionAngle === void 0) { directionAngle = 0; }
        var _this = _super.call(this, game, x, y, key) || this;
        _this.title = "bullet";
        _this.hitBox = [];
        _this.statusKill = false;
        _this.distance = 0;
        _this.speed = 10;
        _this.accY = 0.1;
        _this.tempX = 0;
        _this.tempY = 0;
        _this.directionAngle = directionAngle;
        _this.angle = 180 - _this.directionAngle;
        _this.anchor.setTo(0.5);
        _this.hitBox.push({
            x: -_this.width * 0.5,
            y: -_this.height * 0.5,
            width: _this.width,
            height: _this.height
        });
        _this.drawHitBox();
        _this.originXY();
        return _this;
    }
    Bullet.prototype.originXY = function () {
        this.originX = this.x;
        this.originY = this.y;
    };
    Bullet.prototype.drawHitBox = function () {
        if (globalAlpha)
            return;
        this.rect = new Phaser.Graphics(game, 0, 0);
        this.rect.beginFill(0x000000, 0.5);
        this.rect.drawRect(this.hitBox[0].x, this.hitBox[0].y, this.hitBox[0].width, this.hitBox[0].height);
        this.rect.endFill();
        this.addChild(this.rect);
    };
    Bullet.prototype.update = function () {
        this.moveY();
    };
    Bullet.prototype.moveY = function () {
        this.distance += this.speed;
        this.tempX = this.distance * Math.sin(this.directionAngle * Math.PI / 180);
        this.tempY = this.distance * Math.cos(this.directionAngle * Math.PI / 180);
        this.x = this.originX + this.tempX;
        this.y = this.originY + this.tempY;
        // this.speed += this.accY;
        if (this.y > GAMEHEIGHT - 75) {
            this.statusKill = true;
            this.destroy();
        }
    };
    return Bullet;
}(Phaser.Image));
var Coin = /** @class */ (function (_super) {
    __extends(Coin, _super);
    function Coin(x, y, key) {
        if (key === void 0) { key = cjCoin; }
        var _this = _super.call(this, game, x, y, key) || this;
        _this.hitBox = [];
        _this.title = COLLECTIBLE_GOLD;
        _this.tempX = 0;
        _this.tempY = 0;
        _this.gravitationY = 0;
        _this.distance = 0;
        _this.forceDown = 0.01;
        _this.forceDownMultiplier = 0.1;
        _this.speed = 5;
        _this.forceAngle = 0;
        _this.targetPosY = 510;
        _this.statusKill = false;
        _this.isMagnetActive = false;
        if (key == cjDiamond)
            _this.title = DIAMOND;
        _this.anchor.setTo(0.5);
        _this.hitBox.push({
            x: -_this.width * 0.5,
            y: -_this.height * 0.5,
            width: _this.width,
            height: _this.height
        });
        _this.drawHitBox();
        _this.originPos();
        return _this;
    }
    Coin.prototype.originPos = function () {
        this.originX = this.x;
        this.originY = this.y;
    };
    Coin.prototype.drawHitBox = function () {
        if (globalAlpha)
            return;
        this.rect = new Phaser.Graphics(game, 0, 0);
        this.rect.beginFill(0x000000, 0.5);
        this.rect.drawRect(this.hitBox[0].x, this.hitBox[0].y, this.hitBox[0].width, this.hitBox[0].height);
        this.rect.endFill();
        this.addChild(this.rect);
    };
    Coin.prototype.update = function () {
        if (PAUSED)
            return;
        if (GAMEOVER) {
            this.moveX(SPEED_GAMEOVER);
            return;
        }
        if (!this.isMagnetActive)
            this.moveX(SPEEDALL);
        else
            this.moveToPlayer();
        if (this.title != DIAMOND)
            this.checkChangeTexture();
    };
    Coin.prototype.moveBouncing = function () {
        this.gravitationY += this.forceDown;
        this.distance += this.speed;
        this.tempX = this.distance * Math.sin(this.forceAngle * Math.PI / 180);
        this.tempY = this.distance * Math.cos(this.forceAngle * Math.PI / 180);
        this.originY += this.gravitationY;
        this.x = this.originX + this.tempX;
        this.y = this.originY + this.tempY;
        if (this.y > this.targetPosY) {
            this.gravitationY = this.tempX = this.tempY = this.distance = 0;
            this.y = this.targetPosY;
            this.forceAngle = 180 - this.forceAngle;
            this.forceDown += this.forceDownMultiplier;
            this.originX = this.x;
            this.originY = this.y;
        }
    };
    Coin.prototype.checkChangeTexture = function () {
        if (this.statusKill)
            return;
        if (doubleCounter > 0)
            this.loadTexture(cjDiamond);
        else
            this.loadTexture(cjCoin);
    };
    Coin.prototype.moveX = function (speed) {
        this.x -= speed;
        if (this.x < -20) {
            this.statusKill = true;
            this.destroy();
        }
    };
    Coin.prototype.moveToPlayer = function () {
        var speed = 10;
        var distance = 0;
        distance += speed;
        var y = RunControl.Instance.player.y - this.y;
        var x = RunControl.Instance.player.x - this.x;
        var directionAngle = (Math.atan2(y, x) * 180 / Math.PI) * -1 + 90;
        var tempX = distance * Math.sin(directionAngle * Math.PI / 180);
        var tempY = distance * Math.cos(directionAngle * Math.PI / 180);
        this.x += tempX;
        this.y += tempY;
    };
    return Coin;
}(Phaser.Image));
var ControlledDragonBody = /** @class */ (function (_super) {
    __extends(ControlledDragonBody, _super);
    function ControlledDragonBody(x, y, delay) {
        var _this = _super.call(this, game, x, y, cjBodyFireLoop) || this;
        _this.title = DRAGON;
        _this.prevBody = null;
        _this.hitBox = [];
        _this.catchUpSpeed = 0;
        _this.factorIncreaseMovement = 0.05;
        _this.factorMovement = 0;
        _this.limitMovementTop = 0;
        _this.limitMovementBottom = 400;
        _this.delayMovement = 0;
        _this.statusAngle = '';
        _this.factorAngle = 1;
        _this.limitAngleTop = -30;
        _this.limitAngleBottom = 30;
        _this.delayAngle = 0;
        _this.duration = 300;
        _this.distance = 0;
        _this.acc = 0.1;
        _this.statusKill = false;
        _this.delayMovement = delay;
        _this.hitBox.push({
            x: 0,
            y: 0,
            width: _this.width,
            height: _this.height
        });
        _this.anchor.set(0.5, 0.75);
        _this.drawRect();
        return _this;
        // this.drawArc();
    }
    ControlledDragonBody.prototype.drawArc = function () {
        this.graphicsCircle = new Phaser.Graphics(game, 0, 0);
        this.graphicsCircle.beginFill(0xff0000, 1);
        this.graphicsCircle.drawCircle(0, 0, 10);
        this.graphicsCircle.endFill();
        this.addChild(this.graphicsCircle);
    };
    ControlledDragonBody.prototype.drawRect = function () {
        if (globalAlpha)
            return;
        this.rect = new Phaser.Graphics(game, 0, 0);
        this.rect.beginFill(0x000000, 0.5);
        this.rect.drawRect(this.hitBox[0].x, this.hitBox[0].y, this.hitBox[0].width, this.hitBox[0].height);
        this.rect.endFill();
        this.addChild(this.rect);
    };
    ControlledDragonBody.prototype.update = function () {
        this.catchUpPosY();
        // if (PAUSED) return;
        // if (this.delayMovement > 0) {
        //     this.delayMovement--;
        //     return;
        // }
        // this.doFactorMovement();
        // this.doRotate();
        // this.moveX();
        // this.spawnSparkle();
    };
    ControlledDragonBody.prototype.catchUpPosY = function () {
        this.catchUpSpeed = (this.prevBody.y - this.y) / 12;
        this.y += this.catchUpSpeed;
        this.rotation = Math.atan2(this.prevBody.y - this.y, this.prevBody.x - this.x);
    };
    ControlledDragonBody.prototype.doFactorMovement = function () {
        if (this.factorMovement > 0) {
            if (this.y < 200)
                this.factorMovement += this.factorIncreaseMovement;
            else {
                this.factorMovement -= this.factorIncreaseMovement;
                if (this.factorMovement < 0) {
                    this.statusAngle = 'up';
                }
            }
        }
        else {
            if (this.y > 200)
                this.factorMovement -= this.factorIncreaseMovement;
            else {
                this.factorMovement += this.factorIncreaseMovement;
                if (this.factorMovement > 0) {
                    this.statusAngle = 'down';
                }
            }
        }
        this.y += this.factorMovement;
    };
    ControlledDragonBody.prototype.doRotate = function () {
        if (this.statusAngle == 'up') {
            this.angle -= this.factorAngle;
            if (this.angle < this.limitAngleTop)
                this.statusAngle = '';
        }
        else if (this.statusAngle == 'down') {
            this.angle += this.factorAngle;
            if (this.angle > this.limitAngleBottom)
                this.statusAngle = '';
        }
    };
    ControlledDragonBody.prototype.spawnSparkle = function () {
        if (Math.random() > 0.7) {
            var sparkle = new Sparkle(this.centerX + this.width * 0.5, this.centerY, this.duration);
            RunControl.Instance.objectLayers.add(sparkle);
        }
    };
    ControlledDragonBody.prototype.moveX = function () {
        this.distance = SPEEDALL + 5;
        this.distance += this.acc;
        this.x -= this.distance;
        if (this.x < -550) {
            this.statusKill = true;
            this.destroy();
        }
    };
    return ControlledDragonBody;
}(Phaser.Image));
var ControlledDragonHead = /** @class */ (function (_super) {
    __extends(ControlledDragonHead, _super);
    function ControlledDragonHead(x, y, delay) {
        var _this = _super.call(this, game, x, y, cjDragonFireHead) || this;
        _this.title = DRAGON;
        _this.hitBox = [];
        _this.factorIncreaseMovement = 0.05;
        _this.factorMovement = 0;
        _this.limitMovementTop = 0;
        _this.limitMovementBottom = 400;
        _this.delayMovement = 0;
        _this.statusAngle = '';
        _this.duration = 300;
        _this.distance = 0;
        _this.acc = 0.1;
        _this.statusKill = false;
        _this.delayMovement = delay;
        _this.hitBox.push({
            x: 0,
            y: 0,
            width: _this.width,
            height: _this.height
        });
        _this.anchor.set(0.6, 0.65);
        _this.drawRect();
        return _this;
        // this.drawArc();
    }
    ControlledDragonHead.prototype.drawArc = function () {
        this.graphicsCircle = new Phaser.Graphics(game, 0, 0);
        this.graphicsCircle.beginFill(0xff0000, 1);
        this.graphicsCircle.drawCircle(0, 0, 10);
        this.graphicsCircle.endFill();
        this.addChild(this.graphicsCircle);
    };
    ControlledDragonHead.prototype.drawRect = function () {
        if (globalAlpha)
            return;
        this.rect = new Phaser.Graphics(game, 0, 0);
        this.rect.beginFill(0x000000, 0.5);
        this.rect.drawRect(this.hitBox[0].x, this.hitBox[0].y, this.hitBox[0].width, this.hitBox[0].height);
        this.rect.endFill();
        this.addChild(this.rect);
    };
    ControlledDragonHead.prototype.update = function () {
        if (PAUSED)
            return;
        if (this.delayMovement > 0) {
            this.delayMovement--;
            return;
        }
        // this.doFactorMovement();
        // this.moveX();
        // this.spawnSparkle();
    };
    ControlledDragonHead.prototype.doFactorMovement = function () {
        if (this.factorMovement > 0) {
            if (this.y < 200)
                this.factorMovement += this.factorIncreaseMovement;
            else {
                this.factorMovement -= this.factorIncreaseMovement;
                if (this.statusAngle == '') {
                    this.statusAngle = 'up';
                }
            }
        }
        else {
            if (this.y > 200)
                this.factorMovement -= this.factorIncreaseMovement;
            else {
                this.factorMovement += this.factorIncreaseMovement;
                if (this.statusAngle == '') {
                    this.statusAngle = 'down';
                }
            }
        }
        this.y += this.factorMovement;
    };
    ControlledDragonHead.prototype.spawnSparkle = function () {
        if (Math.random() > 0.7) {
            var sparkle = new Sparkle(this.centerX + this.width * 0.5, this.centerY, this.duration);
            RunControl.Instance.objectLayers.add(sparkle);
        }
    };
    ControlledDragonHead.prototype.moveX = function () {
        this.distance = SPEEDALL + 5;
        this.distance += this.acc;
        this.x -= this.distance;
        if (this.x < -550) {
            this.statusKill = true;
            this.destroy();
        }
    };
    return ControlledDragonHead;
}(Phaser.Image));
var CounterMeter = /** @class */ (function (_super) {
    __extends(CounterMeter, _super);
    function CounterMeter(x, y) {
        var _this = _super.call(this, game, x, y, cjBlank) || this;
        _this.arrayMeters = [];
        _this.initXY();
        _this.drawMeters();
        return _this;
        // this.drawArc();
    }
    CounterMeter.prototype.drawArc = function () {
        this.graphicsCircle = new Phaser.Graphics(game, 0, 0);
        this.graphicsCircle.beginFill(0xff0000, 1);
        this.graphicsCircle.drawCircle(0, 0, 10);
        this.graphicsCircle.endFill();
        this.addChild(this.graphicsCircle);
    };
    CounterMeter.prototype.drawMeters = function () {
        var spaceX = 100;
        for (var i = 0; i < 20; i++) {
            var meter = game.add.image(i * spaceX, 0, cjMarkOneMeter);
            this.addChild(meter);
            this.arrayMeters.push(meter);
        }
    };
    CounterMeter.prototype.initXY = function () {
        this.initPosX = this.x;
        this.initPosY = this.y;
    };
    CounterMeter.prototype.update = function () {
        this.checkState();
    };
    CounterMeter.prototype.checkState = function () {
        if (ISFINISHED)
            return;
        if (PAUSED || !READY)
            return;
        if (!ISFIRST)
            return;
        if (GAMEOVER) {
            this.moveMeters(SPEED_GAMEOVER);
            return;
        }
        this.moveMeters(SPEEDALL);
    };
    CounterMeter.prototype.moveMeters = function (speed) {
        var array = this.arrayMeters;
        for (var i = 0; i < array.length; i++) {
            var element = array[i];
            element.x -= speed;
            if (element.x + element.width < 0) {
                METER_COUNTER++;
                element.x = this.latestMeter() - speed;
                this.runControl.onMeter();
            }
        }
    };
    CounterMeter.prototype.latestMeter = function () {
        var latestX = 0;
        var array = this.arrayMeters;
        for (var i = 0; i < array.length; i++) {
            var element = array[i];
            if (element.x > latestX) {
                latestX = element.x;
            }
        }
        return latestX + array[0].width;
    };
    return CounterMeter;
}(Phaser.Image));
var CutScene = /** @class */ (function (_super) {
    __extends(CutScene, _super);
    function CutScene(idDialog) {
        if (idDialog === void 0) { idDialog = "dialog_a"; }
        var _this = _super.call(this, game, 0, 0, cjBlank) || this;
        _this.arrayBlock = [];
        _this.isTrackInput = false;
        _this.drawBlocks();
        new Delay(2000, function () {
            RunControl.Instance.showBubble(idDialog, function () {
                RunControl.Instance.bubble.destroy();
                if (idDialog == "dialog_a") {
                    _this.hiddenSceneMode();
                    new Delay(1000, function () {
                        _this.drawText();
                        _this.isTrackInput = true;
                        new Delay(1500, function () {
                            _this.spawnMouse();
                        });
                    });
                }
                else if (idDialog == "finish_a") {
                    _this.hiddenSceneMode();
                    RunControl.Instance.spawnPalace();
                }
            });
        });
        return _this;
    }
    CutScene.prototype.drawText = function () {
        var text = game.add.bitmapText(halfGameWidth, halfGameHeight - 50, font_36_white, Language.GetText("space_bar_tap"), 30);
        text.anchor.setTo(0.5);
        this.addChild(text);
        text.alpha = 0;
        game.add.tween(text).to({ alpha: 1 }, 1000, Phaser.Easing.Linear.None, true);
    };
    CutScene.prototype.spawnMouse = function () {
        var mouseTap = new MouseTap(halfGameWidth, halfGameHeight);
        mouseTap.anchor.setTo(0.5);
        this.addChild(mouseTap);
    };
    CutScene.prototype.hiddenSceneMode = function () {
        for (var i = 0; i < this.arrayBlock.length; i++) {
            var element = this.arrayBlock[i];
            game.add.tween(element).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
        }
    };
    CutScene.prototype.drawBlocks = function () {
        var posX = halfGameWidth;
        var startPosY = 25;
        var spaceY = gameHeight - 50;
        for (var i = 0; i < 2; i++) {
            var block = game.add.image(posX, startPosY + i * spaceY, cjSceneBlock);
            block.anchor.setTo(0.5);
            this.addChild(block);
            this.arrayBlock.push(block);
            block.alpha = 0;
            game.add.tween(block).to({ alpha: 1 }, 500, Phaser.Easing.Linear.None, true);
        }
    };
    CutScene.prototype.update = function () {
        this.checkState();
    };
    CutScene.prototype.checkState = function () {
        if (!this.isTrackInput)
            return;
        if (RunControl.Instance.pointerStatus == "down") {
            this.destroy();
            ISFIRST = true;
            StoragePlayer.save(SAVE_ISFIRST, ISFIRST);
        }
    };
    return CutScene;
}(Phaser.Image));
var Debris = /** @class */ (function (_super) {
    __extends(Debris, _super);
    function Debris(x, y, objParent, speed, factor, array, index, forceDown) {
        if (objParent === void 0) { objParent = null; }
        var _this = _super.call(this, game, x, y, array[Math.floor(Math.random() * array.length)]) || this;
        _this.title = ROCKET;
        _this.speed = 5;
        _this.factor = 0;
        _this.sparkleIndex = 0;
        _this.hitBox = [];
        _this.angleFactor = 10;
        _this.bounceMax = 0;
        _this.forceDown = -10;
        _this.maxPosY = 0;
        _this.duration = 250;
        _this.objParent = null;
        _this.statusKill = false;
        _this.anchor.setTo(0.5, 0.5);
        _this.objParent = objParent;
        _this.maxPosY = 550 - objParent.y - 10;
        _this.factor = factor;
        _this.speed = speed;
        _this.sparkleIndex = index;
        _this.forceDown = forceDown;
        if (objParent.title == MINION)
            _this.sparkleIndex = 12;
        _this.hitBox.push({
            x: 0,
            y: 0,
            width: _this.width,
            height: _this.height
        });
        _this.drawRect();
        // this.drawArc();
        if (Math.random() < 0.5)
            _this.angleFactor = -10;
        return _this;
    }
    Debris.prototype.drawArc = function () {
        this.graphicsCircle = new Phaser.Graphics(game, 0, 0);
        this.graphicsCircle.beginFill(0xff0000, 1);
        this.graphicsCircle.drawCircle(0, 0, 10);
        this.graphicsCircle.endFill();
        this.addChild(this.graphicsCircle);
    };
    Debris.prototype.drawRect = function () {
        if (globalAlpha)
            return;
        this.rect = new Phaser.Graphics(game, 0, 0);
        this.rect.beginFill(0x000000, 0.5);
        this.rect.drawRect(this.hitBox[0].x, this.hitBox[0].y, this.hitBox[0].width, this.hitBox[0].height);
        this.rect.endFill();
        this.addChild(this.rect);
    };
    Debris.prototype.preUpdate = function () {
        if (PAUSED)
            return;
        this.moveY();
    };
    Debris.prototype.moveY = function () {
        if (this.bounceMax < 3) {
            this.forceDown += 0.5;
            this.y += this.forceDown;
            if (this.y > this.maxPosY) {
                this.forceDown *= -0.7 + this.factor;
                this.y += this.forceDown;
                this.bounceMax++;
            }
            this.angle += this.angleFactor;
            this.spawnSparkle();
            this.moveX();
        }
        else {
            this.statusKill = true;
            this.destroy();
        }
    };
    Debris.prototype.spawnSparkle = function () {
        if (Math.random() < 0.25) {
            var sparkle = new Sparkle(this.centerX + (Math.random() * 10) - 5, this.centerY + (Math.random() * 10) - 5, this.duration + (Math.random() * 250), SPARK_STATIC, this.sparkleIndex);
            this.objParent.addChild(sparkle);
        }
    };
    Debris.prototype.moveX = function () {
        this.x += this.speed;
        if (this.x > 1500) {
            this.statusKill = true;
            this.destroy();
        }
    };
    return Debris;
}(Phaser.Image));
var Delay = /** @class */ (function () {
    function Delay(duration, callback) {
        game.time.events.add(duration, callback);
    }
    return Delay;
}());
var DragonBody = /** @class */ (function (_super) {
    __extends(DragonBody, _super);
    function DragonBody(x, y, delay) {
        var _this = _super.call(this, game, x, y, cjBodyFireLoop) || this;
        _this.title = DRAGON;
        _this.hitBox = [];
        _this.factorIncreaseMovement = 0.05;
        _this.factorMovement = 0;
        _this.limitMovementTop = 0;
        _this.limitMovementBottom = 400;
        _this.delayMovement = 0;
        _this.statusAngle = '';
        _this.factorAngle = 1;
        _this.limitAngleTop = -30;
        _this.limitAngleBottom = 30;
        _this.delayAngle = 0;
        _this.duration = 300;
        _this.distance = 0;
        _this.acc = 0.1;
        _this.statusKill = false;
        _this.delayMovement = delay;
        _this.hitBox.push({
            x: 0,
            y: 0,
            width: _this.width,
            height: _this.height
        });
        _this.anchor.set(0.5, 0.75);
        _this.drawRect();
        return _this;
        // this.drawArc();
    }
    DragonBody.prototype.drawArc = function () {
        this.graphicsCircle = new Phaser.Graphics(game, 0, 0);
        this.graphicsCircle.beginFill(0xff0000, 1);
        this.graphicsCircle.drawCircle(0, 0, 10);
        this.graphicsCircle.endFill();
        this.addChild(this.graphicsCircle);
    };
    DragonBody.prototype.drawRect = function () {
        if (globalAlpha)
            return;
        this.rect = new Phaser.Graphics(game, 0, 0);
        this.rect.beginFill(0x000000, 0.5);
        this.rect.drawRect(this.hitBox[0].x, this.hitBox[0].y, this.hitBox[0].width, this.hitBox[0].height);
        this.rect.endFill();
        this.addChild(this.rect);
    };
    DragonBody.prototype.update = function () {
        if (PAUSED)
            return;
        if (this.delayMovement > 0) {
            this.delayMovement--;
            return;
        }
        this.doFactorMovement();
        this.doRotate();
        // this.moveX();
        // this.spawnSparkle();
    };
    DragonBody.prototype.doFactorMovement = function () {
        if (this.factorMovement > 0) {
            if (this.y < 200)
                this.factorMovement += this.factorIncreaseMovement;
            else {
                this.factorMovement -= this.factorIncreaseMovement;
                if (this.factorMovement < 0) {
                    this.statusAngle = 'up';
                }
            }
        }
        else {
            if (this.y > 200)
                this.factorMovement -= this.factorIncreaseMovement;
            else {
                this.factorMovement += this.factorIncreaseMovement;
                if (this.factorMovement > 0) {
                    this.statusAngle = 'down';
                }
            }
        }
        this.y += this.factorMovement;
    };
    DragonBody.prototype.doRotate = function () {
        if (this.statusAngle == 'up') {
            this.angle -= this.factorAngle;
            if (this.angle < this.limitAngleTop)
                this.statusAngle = '';
        }
        else if (this.statusAngle == 'down') {
            this.angle += this.factorAngle;
            if (this.angle > this.limitAngleBottom)
                this.statusAngle = '';
        }
    };
    DragonBody.prototype.spawnSparkle = function () {
        if (Math.random() > 0.7) {
            var sparkle = new Sparkle(this.centerX + this.width * 0.5, this.centerY, this.duration);
            RunControl.Instance.objectLayers.add(sparkle);
        }
    };
    DragonBody.prototype.moveX = function () {
        this.distance = SPEEDALL + 5;
        this.distance += this.acc;
        this.x -= this.distance;
        if (this.x < -550) {
            this.statusKill = true;
            this.destroy();
        }
    };
    return DragonBody;
}(Phaser.Image));
var DragonHead = /** @class */ (function (_super) {
    __extends(DragonHead, _super);
    function DragonHead(x, y, delay) {
        var _this = _super.call(this, game, x, y, cjDragonFireHead) || this;
        _this.title = DRAGON;
        _this.hitBox = [];
        _this.factorIncreaseMovement = 0.05;
        _this.factorMovement = 0;
        _this.limitMovementTop = 0;
        _this.limitMovementBottom = 400;
        _this.delayMovement = 0;
        _this.statusAngle = '';
        _this.duration = 300;
        _this.distance = 0;
        _this.acc = 0.1;
        _this.statusKill = false;
        _this.delayMovement = delay;
        _this.hitBox.push({
            x: 0,
            y: 0,
            width: _this.width,
            height: _this.height
        });
        _this.anchor.set(0.5, 0.5);
        _this.drawRect();
        return _this;
        // this.drawArc();
    }
    DragonHead.prototype.drawArc = function () {
        this.graphicsCircle = new Phaser.Graphics(game, 0, 0);
        this.graphicsCircle.beginFill(0xff0000, 1);
        this.graphicsCircle.drawCircle(0, 0, 10);
        this.graphicsCircle.endFill();
        this.addChild(this.graphicsCircle);
    };
    DragonHead.prototype.drawRect = function () {
        if (globalAlpha)
            return;
        this.rect = new Phaser.Graphics(game, 0, 0);
        this.rect.beginFill(0x000000, 0.5);
        this.rect.drawRect(this.hitBox[0].x, this.hitBox[0].y, this.hitBox[0].width, this.hitBox[0].height);
        this.rect.endFill();
        this.addChild(this.rect);
    };
    DragonHead.prototype.update = function () {
        if (PAUSED)
            return;
        if (this.delayMovement > 0) {
            this.delayMovement--;
            return;
        }
        this.doFactorMovement();
        // this.moveX();
        // this.spawnSparkle();
    };
    DragonHead.prototype.doFactorMovement = function () {
        if (this.factorMovement > 0) {
            if (this.y < 200)
                this.factorMovement += this.factorIncreaseMovement;
            else {
                this.factorMovement -= this.factorIncreaseMovement;
                if (this.statusAngle == '') {
                    this.statusAngle = 'up';
                }
            }
        }
        else {
            if (this.y > 200)
                this.factorMovement -= this.factorIncreaseMovement;
            else {
                this.factorMovement += this.factorIncreaseMovement;
                if (this.statusAngle == '') {
                    this.statusAngle = 'down';
                }
            }
        }
        this.y += this.factorMovement;
    };
    DragonHead.prototype.spawnSparkle = function () {
        if (Math.random() > 0.7) {
            var sparkle = new Sparkle(this.centerX + this.width * 0.5, this.centerY, this.duration);
            RunControl.Instance.objectLayers.add(sparkle);
        }
    };
    DragonHead.prototype.moveX = function () {
        this.distance = SPEEDALL + 5;
        this.distance += this.acc;
        this.x -= this.distance;
        if (this.x < -550) {
            this.statusKill = true;
            this.destroy();
        }
    };
    return DragonHead;
}(Phaser.Image));
var Exponent = /** @class */ (function (_super) {
    __extends(Exponent, _super);
    function Exponent(x, y, font, text1, size1, text2, size2) {
        var _this = _super.call(this, game, x, y, font, text1, size1) || this;
        _this.exponentText = game.add.bitmapText(_this.width * 0.5, -_this.height, font, text2, size2);
        _this.addChild(_this.exponentText);
        var adjustX = 115;
        _this.eq = game.add.bitmapText(adjustX, 0, font, "= ?", size1);
        _this.eq.anchor.setTo(0.5);
        _this.addChild(_this.eq);
        return _this;
    }
    return Exponent;
}(Phaser.BitmapText));
var Heart = /** @class */ (function (_super) {
    __extends(Heart, _super);
    function Heart(x, y) {
        return _super.call(this, game, x, y, cjIndicatorHeart) || this;
        // this.drawArc();
    }
    Heart.prototype.drawArc = function () {
        this.graphicsCircle = new Phaser.Graphics(game, 0, 0);
        this.graphicsCircle.beginFill(0x00ff00);
        this.graphicsCircle.drawCircle(0, 0, 10);
        this.graphicsCircle.endFill();
        this.addChild(this.graphicsCircle);
    };
    return Heart;
}(Phaser.Image));
var IconAchievement = /** @class */ (function (_super) {
    __extends(IconAchievement, _super);
    function IconAchievement(x, y, key, text, size, counter) {
        if (counter === void 0) { counter = 0; }
        var _this = _super.call(this, game, x, y, key) || this;
        var textDisplay = game.add.bitmapText(0, _this.height * 0.5 + 30, font_36, text, size);
        textDisplay.anchor.setTo(0.5);
        if (counter == 8 || counter == 9)
            textDisplay.maxWidth = 180;
        else
            textDisplay.maxWidth = 150;
        textDisplay.align = "center";
        _this.addChild(textDisplay);
        return _this;
    }
    return IconAchievement;
}(Phaser.Image));
var ItemAchievement = /** @class */ (function (_super) {
    __extends(ItemAchievement, _super);
    function ItemAchievement(x, y, keyContainer, keyIcon, textMsg, textIncomeTarget, coinAward, viewButton) {
        if (viewButton === void 0) { viewButton = false; }
        var _this = _super.call(this, game, x, y, cjBlank) || this;
        _this.buttonClaim = null;
        _this.keyContainer = keyContainer;
        _this.keyIcon = keyIcon;
        _this.textMsg = textMsg;
        _this.textIncomeTarget = textIncomeTarget;
        _this.coinAward = coinAward;
        _this.drawContainer();
        _this.drawIcon();
        _this.drawTextContainer();
        if (viewButton)
            _this.drawButtonCoin();
        return _this;
        // this.drawArc();
    }
    ItemAchievement.prototype.drawContainer = function () {
        this.container = game.add.image(0, 0, this.keyContainer);
        this.container.anchor.setTo(0.5);
        this.addChild(this.container);
    };
    ItemAchievement.prototype.drawArc = function () {
        this.graphicsCircle = new Phaser.Graphics(game, 0, 0);
        this.graphicsCircle.beginFill(0xff0000, 1);
        this.graphicsCircle.drawCircle(0, 0, 10);
        this.graphicsCircle.endFill();
        this.addChild(this.graphicsCircle);
    };
    ItemAchievement.prototype.drawTextContainer = function () {
        var spaceY = 30;
        var textMsg = game.add.bitmapText(-this.container.width * 0.32, -this.container.height * 0.3, font_36_white, this.textMsg, 25);
        this.container.addChild(textMsg);
        var textIT = game.add.bitmapText(-this.container.width * 0.32, -this.container.height * 0.3 + spaceY, font_36_white, this.textIncomeTarget, 25);
        this.container.addChild(textIT);
    };
    ItemAchievement.prototype.drawIcon = function () {
        var icon = game.add.image(-this.container.width * 0.4, 0, this.keyIcon);
        icon.anchor.setTo(0.5);
        this.container.addChild(icon);
    };
    ItemAchievement.prototype.drawButtonCoin = function () {
        var _this = this;
        this.buttonClaim = new ButtonCustom(this.container.width * 0.37, 31, cjAchieveClaim, this.coinAward + "", 36, 7, 0, function () {
            SoundPlayer.playSFX(SoundPlayer.CLICK);
            _this.buttonClaim.isClicked = true;
            new Delay(300, function () {
                _this.statusClaim();
                _this.buttonClaim.alpha = 0.5;
                _this.buttonClaim.inputEnabled = false;
                COIN_COUNTER += _this.coinAward;
            });
        }, font_36_white);
        this.buttonClaim.anchor.setTo(0.5);
        this.container.addChild(this.buttonClaim);
        if (this.checkStatusClaim()) {
            this.buttonClaim.alpha = 0.5;
            this.buttonClaim.inputEnabled = false;
        }
    };
    ItemAchievement.prototype.statusClaim = function () {
        switch (this.keyIcon) {
            case cjMagentIcon:
                STATUS_CLAIM.magnet = true;
                break;
            case cjInvincibleIcon:
                STATUS_CLAIM.shield = true;
                break;
            case cjIconDistance:
                STATUS_CLAIM.distance = true;
                break;
            case cjIconDragonFire:
                STATUS_CLAIM.fire = true;
                break;
            case cjIconDragonEarth:
                STATUS_CLAIM.earth = true;
                break;
            case cjCoinIcon:
                STATUS_CLAIM.coin = true;
                break;
            case cjIconDiamond:
                STATUS_CLAIM.diamond = true;
                break;
            case cjIconSpeed:
                STATUS_CLAIM.speed = true;
                break;
            case cjIconMinionMomo:
                STATUS_CLAIM.momo = true;
                break;
            case cjIconMinionTurtly:
                STATUS_CLAIM.turtle = true;
                break;
            case cjIconObstacleLaser:
                STATUS_CLAIM.laser = true;
                break;
            case cjIconObstacleEnemy:
                STATUS_CLAIM.enemy = true;
                break;
            case cjIconObstacleStatic:
                STATUS_CLAIM.static = true;
                break;
            case cjIconObstacleRocket:
                STATUS_CLAIM.rocket = true;
                break;
            case cjIconObstacleSpike:
                STATUS_CLAIM.spike = true;
                break;
        }
    };
    ItemAchievement.prototype.checkStatusClaim = function () {
        switch (this.keyIcon) {
            case cjMagentIcon:
                if (STATUS_CLAIM.magnet)
                    return true;
                break;
            case cjInvincibleIcon:
                if (STATUS_CLAIM.shield)
                    return true;
                break;
            case cjIconDistance:
                if (STATUS_CLAIM.distance)
                    return true;
                break;
            case cjIconDragonFire:
                if (STATUS_CLAIM.fire)
                    return true;
                break;
            case cjIconDragonEarth:
                if (STATUS_CLAIM.earth)
                    return true;
                break;
            case cjCoinIcon:
                if (STATUS_CLAIM.coin)
                    return true;
                break;
            case cjIconDiamond:
                if (STATUS_CLAIM.diamond)
                    return true;
                break;
            case cjIconSpeed:
                if (STATUS_CLAIM.speed)
                    return true;
                break;
            case cjIconMinionMomo:
                if (STATUS_CLAIM.momo)
                    return true;
                break;
            case cjIconMinionTurtly:
                if (STATUS_CLAIM.turtle)
                    return true;
                break;
            case cjIconObstacleLaser:
                if (STATUS_CLAIM.laser)
                    return true;
                break;
            case cjIconObstacleEnemy:
                if (STATUS_CLAIM.enemy)
                    return true;
                break;
            case cjIconObstacleStatic:
                if (STATUS_CLAIM.static)
                    return true;
                break;
            case cjIconObstacleRocket:
                if (STATUS_CLAIM.rocket)
                    return true;
                break;
            case cjIconObstacleSpike:
                if (STATUS_CLAIM.spike)
                    return true;
                break;
        }
        return false;
    };
    return ItemAchievement;
}(Phaser.Image));
var ItemUpgrade = /** @class */ (function (_super) {
    __extends(ItemUpgrade, _super);
    function ItemUpgrade(x, y, keyIcon, index) {
        var _this = _super.call(this, game, x, y, cjContainerUpgradeIcon) || this;
        _this.arrayBars = [];
        _this.textUpgrade = {
            magnet: Language.GetText("magnet_shop") + " " + Language.GetText("duration_by") + " " + arrayUpgrade[UPGRADE_MAGNET].factor[1] / IN_SECOND + "-" + arrayUpgrade[UPGRADE_MAGNET].factor[2] / IN_SECOND + "-" + arrayUpgrade[UPGRADE_MAGNET].factor[3] / IN_SECOND + "-" + arrayUpgrade[UPGRADE_MAGNET].factor[4] / IN_SECOND + "-PERMANENT",
            shiled: Language.GetText("shield_shop") + " " + Language.GetText("duration_by") + " " + arrayUpgrade[UPGRADE_MAGNET].factor[1] / IN_SECOND + "-" + arrayUpgrade[UPGRADE_SHIELD].factor[2] / IN_SECOND + "-" + arrayUpgrade[UPGRADE_SHIELD].factor[3] / IN_SECOND + "-" + arrayUpgrade[UPGRADE_SHIELD].factor[4] / IN_SECOND + "-" + arrayUpgrade[UPGRADE_SHIELD].factor[5] / IN_SECOND,
            diamond: Language.GetText("diamond_shop") + " " + Language.GetText("duration_by") + " " + arrayUpgrade[UPGRADE_DOUBLE].factor[1] / IN_SECOND + "-" + arrayUpgrade[UPGRADE_DOUBLE].factor[2] / IN_SECOND + "-" + arrayUpgrade[UPGRADE_DOUBLE].factor[3] / IN_SECOND + "-" + arrayUpgrade[UPGRADE_DOUBLE].factor[4] / IN_SECOND + "-PERMANENT",
            forword: Language.GetText("flash_shop") + " " + Language.GetText("duration_by") + " " + arrayUpgrade[UPGRADE_FORWARD].factor[1] / IN_SECOND + "-" + arrayUpgrade[UPGRADE_FORWARD].factor[2] / IN_SECOND + "-" + arrayUpgrade[UPGRADE_FORWARD].factor[3] / IN_SECOND + "-" + arrayUpgrade[UPGRADE_FORWARD].factor[4] / IN_SECOND + "-" + arrayUpgrade[UPGRADE_FORWARD].factor[5] / IN_SECOND,
            life: Language.GetText("life_shop") + " " + arrayUpgrade[UPGRADE_HEARTS].factor[1] + "-" + arrayUpgrade[UPGRADE_HEARTS].factor[2] + "-" + arrayUpgrade[UPGRADE_HEARTS].factor[3] + "-" + arrayUpgrade[UPGRADE_HEARTS].factor[4] + "-" + arrayUpgrade[UPGRADE_HEARTS].factor[5],
            fire: Language.GetText("dragon_fire_shop") + " " + arrayUpgrade[UPGRADE_DRAGON_FIRE].factor[1] + ", " + arrayUpgrade[UPGRADE_DRAGON_FIRE].factor[2] + ", " + arrayUpgrade[UPGRADE_DRAGON_FIRE].factor[3] + ", " + arrayUpgrade[UPGRADE_DRAGON_FIRE].factor[4] + ", " + arrayUpgrade[UPGRADE_DRAGON_FIRE].factor[5],
            earth: Language.GetText("dragon_earth_shop") + " " + arrayUpgrade[UPGRADE_DRAGON_EARTH].factor[1] + ", " + arrayUpgrade[UPGRADE_DRAGON_EARTH].factor[2] + ", " + arrayUpgrade[UPGRADE_DRAGON_EARTH].factor[3] + ", " + arrayUpgrade[UPGRADE_DRAGON_EARTH].factor[4] + ", " + arrayUpgrade[UPGRADE_DRAGON_EARTH].factor[5],
            speed: Language.GetText("speed_shop") + " " + arrayUpgrade[UPGRADE_SPEED].factor[1] + "mph, " + arrayUpgrade[UPGRADE_SPEED].factor[2] + "mph, " + arrayUpgrade[UPGRADE_SPEED].factor[3] + "mph, " + arrayUpgrade[UPGRADE_SPEED].factor[4] + "mph, " + arrayUpgrade[UPGRADE_SPEED].factor[5] + "mph",
            momo: Language.GetText("momo_shop") + " " + Language.GetText("momo_shop_alt") + " " + arrayUpgrade[UPGRADE_MOMO].factor[1] + "," + arrayUpgrade[UPGRADE_MOMO].factor[2] + "," + arrayUpgrade[UPGRADE_MOMO].factor[3] + "," + arrayUpgrade[UPGRADE_MOMO].factor[4] + "," + arrayUpgrade[UPGRADE_MOMO].factor[5] + " " + Language.GetText("life_point"),
            turtle: Language.GetText("turtly_shop") + " " + Language.GetText("turtly_shop_alt") + " " + arrayUpgrade[UPGRADE_TURTLY].factor[1] + "," + arrayUpgrade[UPGRADE_TURTLY].factor[2] + "," + arrayUpgrade[UPGRADE_TURTLY].factor[3] + "," + arrayUpgrade[UPGRADE_TURTLY].factor[4] + "," + arrayUpgrade[UPGRADE_TURTLY].factor[5] + " " + Language.GetText("life_point")
        };
        _this.distanceCounter = 0;
        _this.keyIcon = keyIcon;
        _this.indexBtn = index;
        _this.drawIcon();
        _this.drawTextContainer();
        _this.drawButtonCoin();
        _this.drawBars();
        return _this;
        // this.drawArc();
    }
    ItemUpgrade.prototype.drawArc = function () {
        this.graphicsCircle = new Phaser.Graphics(game, 0, 0);
        this.graphicsCircle.beginFill(0xff0000, 1);
        this.graphicsCircle.drawCircle(0, 0, 10);
        this.graphicsCircle.endFill();
        this.buttonUpgrade.addChild(this.graphicsCircle);
    };
    ItemUpgrade.prototype.drawBars = function () {
        var startPosX = -171.9;
        var posY = 5;
        var spaceX = 57.5;
        for (var i = 0; i < 5; i++) {
            var bar = game.add.image(startPosX + i * spaceX, posY, cjUpgradeBar);
            this.addChild(bar);
            this.arrayBars.push(bar);
            bar.visible = false;
        }
    };
    ItemUpgrade.prototype.drawButtonCoin = function () {
        var _this = this;
        this.buttonUpgrade = new ButtonCustom(this.width * 0.37, 31, cjAchieveClaim, 100 + "", 36, 7, 0, function () {
            SoundPlayer.playSFX(SoundPlayer.CLICK);
            _this.buttonUpgrade.isClicked = true;
            new Delay(300, function () {
                _this.shop.doUpgrade(_this.indexBtn);
            });
        }, font_36_white, false);
        this.buttonUpgrade.anchor.setTo(0.5);
        this.addChild(this.buttonUpgrade);
    };
    ItemUpgrade.prototype.drawIcon = function () {
        var icon = game.add.image(-this.width * 0.4, 0, this.keyIcon);
        icon.anchor.setTo(0.5);
        this.addChild(icon);
    };
    ItemUpgrade.prototype.drawTextContainer = function () {
        var textUpgrade = "";
        switch (this.keyIcon) {
            case cjMagentIcon:
                textUpgrade = this.textUpgrade.magnet;
                break;
            case cjInvincibleIcon:
                textUpgrade = this.textUpgrade.shiled;
                break;
            case cjIconDiamond:
                textUpgrade = this.textUpgrade.diamond;
                break;
            case cjForwardIcon:
                textUpgrade = this.textUpgrade.forword;
                break;
            case cjHeartIcon:
                textUpgrade = this.textUpgrade.life;
                break;
            case cjIconDragonFire:
                textUpgrade = this.textUpgrade.fire;
                break;
            case cjIconDragonEarth:
                textUpgrade = this.textUpgrade.earth;
                break;
            case cjIconSpeed:
                textUpgrade = this.textUpgrade.speed;
                break;
            case cjIconMinionMomo:
                textUpgrade = this.textUpgrade.momo;
                break;
            case cjIconMinionTurtly:
                textUpgrade = this.textUpgrade.turtle;
                break;
        }
        var textMsg = game.add.bitmapText(-this.width * 0.295, -this.height * 0.33, font_36_white, textUpgrade, 15.3);
        this.addChild(textMsg);
        textMsg.maxWidth = 300;
    };
    ItemUpgrade.prototype.postUpdate = function () {
        for (var i = 0; i < this.distanceCounter; i++) {
            this.arrayBars[i].visible = true;
        }
    };
    return ItemUpgrade;
}(Phaser.Image));
var Laser = /** @class */ (function (_super) {
    __extends(Laser, _super);
    function Laser(x, y, typeLaser, length) {
        if (length === void 0) { length = 110; }
        var _this = _super.call(this, game, x, y, cjBlank) || this;
        _this.title = LASER;
        _this.lengthLaserLong = 1;
        _this.arrayLaserLong = [];
        _this.arrayLaserLongBig = [];
        _this.arrayTween = [];
        _this.arrayLine = [];
        _this.activeCollision = false;
        _this.hitBox = [];
        _this.lenghtLaserRotate = 7;
        _this.lenghtLaserStatic = 9;
        _this.angular = 0;
        _this.stepX = 1;
        _this.adjustStepX = 0.5;
        _this.isFinishMoveHeader = false;
        _this.isStartScaling = false;
        _this.counterScale = 0.01;
        _this.scaleCurrent = 1;
        _this.isStartActive = true;
        _this.lifeTimeLaserLong = 1000;
        _this.statusKill = false;
        _this.anchor.setTo(0.5);
        _this.typeLaser = typeLaser;
        var size = 10;
        _this.parentLaserStatic = game.add.image(0, 0, cjBlank);
        _this.addChild(_this.parentLaserStatic);
        if (_this.typeLaser == OBSTACLE_LASER_STATIC_ROTATING) {
            length = 200;
            var startX = (length - 10) * -0.5;
            _this.drawLaserRotate();
        }
        else if (_this.typeLaser == OBSTACLE_LASER_LONG) {
            _this.title = OBSTACLE_LASER_LONG;
            length = 680;
            var startX = (length - 10) * 0.4;
            _this.drawLaserLong();
            size = 5;
        }
        else {
            length = 110;
            var startX = (length - 20) * -0.21;
            _this.drawLaserStatic();
        }
        var count = Math.floor(length / size);
        for (var i = 0; i < count; i++) {
            _this.hitBox.push({
                x: 0,
                y: 0,
                width: size,
                height: size,
                distance: startX + i * size
            });
        }
        return _this;
    }
    Laser.prototype.drawLaserLong = function () {
        var adjustY = 21;
        var edgeLSmall = game.add.image(127, 0 + adjustY, cjLaserEdgeSmall);
        edgeLSmall.anchor.setTo(0.5);
        this.addChild(edgeLSmall);
        this.arrayLaserLong.push(edgeLSmall);
        var edgeL = game.add.image(125, 0 + adjustY, cjLaserEdge);
        edgeL.anchor.setTo(0.5);
        this.addChild(edgeL);
        this.arrayLaserLongBig.push(edgeL);
        this.headLeft = game.add.image(0, 0, cjLaserHead);
        this.headLeft.animations.add("open", [0, 1, 2, 3, 4, 5, 6], 15, false);
        this.headLeft.animations.add("close", [6, 5, 4, 3, 2, 1, 0], 15, false);
        this.headLeft.anchor.setTo(0.5);
        this.addChild(this.headLeft);
        var adjustPosY = 6.3;
        var joinLaserSmall = game.add.image(edgeL.width * 0.41, -edgeL.height * 0.5 + adjustPosY + 1.5, cjLaserBodyLongSmall);
        edgeLSmall.addChild(joinLaserSmall);
        this.arrayLaserLong.push(joinLaserSmall);
        var joinLaser = game.add.image(halfGameWidth - 100, -edgeL.height * 0.5 + adjustPosY + 17, cjLaserBodyLong);
        joinLaser.anchor.setTo(0.5);
        joinLaser.scale.setTo(1, 1.55);
        edgeL.addChild(joinLaser);
        this.arrayLaserLongBig.push(joinLaser);
        var edgeRSmall = game.add.image(GAMEWIDTH - 79, 0 + adjustY, cjLaserEdgeSmall);
        edgeRSmall.anchor.setTo(0.5);
        edgeRSmall.scale.x *= -1;
        this.addChild(edgeRSmall);
        this.arrayLaserLong.push(edgeRSmall);
        var edgeR = game.add.image(GAMEWIDTH - 75, 0 + adjustY, cjLaserEdge);
        edgeR.anchor.setTo(0.5);
        edgeR.scale.x *= -1;
        this.addChild(edgeR);
        this.arrayLaserLongBig.push(edgeR);
        this.headRight = game.add.image(GAMEWIDTH + 30, 0, cjLaserHead);
        this.headRight.animations.add("open", [0, 1, 2, 3, 4, 5, 6], 15, false);
        this.headRight.animations.add("close", [6, 5, 4, 3, 2, 1, 0], 60, false);
        this.headRight.anchor.setTo(0.5);
        this.headRight.scale.x *= -1;
        this.addChild(this.headRight);
        this.chargeLeft = game.add.image(0, 0, cjCharge);
        this.chargeLeft.animations.add("charging", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 5, false);
        this.addChild(this.chargeLeft);
        this.chargeRight = game.add.image(0, 0, cjCharge);
        this.chargeRight.animations.add("charging", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 5, false);
        this.addChild(this.chargeRight);
        this.chargeLeft.visible = false;
        this.chargeRight.visible = false;
        this.hiddenLaserLong(this.arrayLaserLong);
        this.hiddenLaserLong(this.arrayLaserLongBig);
        this.drawLineLaser();
        this.drawRect();
    };
    Laser.prototype.hiddenLaserLong = function (array) {
        for (var i = 0; i < array.length; i++) {
            array[i].visible = false;
        }
    };
    Laser.prototype.visibleLaserLong = function (array) {
        for (var i = 0; i < array.length; i++) {
            array[i].visible = true;
        }
    };
    Laser.prototype.reactivityLaserBig = function () {
        for (var i = 0; i < this.arrayLaserLongBig.length; i++) {
            game.add.tween(this.arrayLaserLongBig[i].scale).to({ y: 0.75 }, 100, Phaser.Easing.Linear.None, true, 0, -1);
        }
    };
    Laser.prototype.hiddenLineLaser = function () {
        for (var i = 0; i < this.arrayLine.length; i++) {
            this.arrayLine[i].visible = false;
        }
    };
    Laser.prototype.killLineLaser = function () {
        for (var i = 0; i < this.arrayLine.length; i++) {
            this.arrayLine[i].destroy();
        }
    };
    Laser.prototype.visibleLineLaser = function () {
        for (var i = 0; i < this.arrayLine.length; i++) {
            this.arrayLine[i].visible = true;
        }
    };
    Laser.prototype.drawLineLaser = function () {
        var radius = 100;
        var valBorder = 3;
        this.arcL = game.add.graphics(0, 0);
        this.arcL.lineStyle(valBorder, 0xff0000);
        this.arcL.drawCircle(0, 0, radius);
        this.arcL.endFill();
        this.headLeft.addChild(this.arcL);
        this.arrayLine.push(this.arcL);
        this.arcR = game.add.graphics(0, 0);
        this.arcR.lineStyle(valBorder, 0xff0000);
        this.arcR.drawCircle(0, 0, radius);
        this.arcR.endFill();
        this.headRight.addChild(this.arcR);
        this.arrayLine.push(this.arcR);
        var lineLaser = game.add.graphics(this.headLeft.width * 0.5, 0);
        lineLaser.lineStyle(valBorder, 0xff0000);
        lineLaser.moveTo(0, 0);
        lineLaser.lineTo(GAMEWIDTH - 150, this.headRight.y);
        this.headLeft.addChild(lineLaser);
        this.arrayLine.push(lineLaser);
        this.hiddenLineLaser();
    };
    Laser.prototype.drawLaserRotate = function () {
        this.centerLaser = game.add.image(0, 0, cjLaserRotate);
        this.centerLaser.anchor.setTo(0.5);
        this.parentLaserStatic.addChild(this.centerLaser);
        var posY = -1.03;
        var adjusX = 5.5;
        for (var i = 0; i < this.lenghtLaserRotate; i++) {
            var joinLaser = game.add.image(this.centerLaser.width * 0.53 + adjusX * i, posY, cjLaserBody);
            joinLaser.anchor.setTo(0.5);
            this.centerLaser.addChild(joinLaser);
            var joinLaser = game.add.image(-this.centerLaser.width * 0.53 - adjusX * i, posY, cjLaserBody);
            joinLaser.anchor.setTo(0.5);
            this.centerLaser.addChild(joinLaser);
        }
        this.endR = game.add.image(this.centerLaser.width * 0.53 + adjusX * (this.lenghtLaserRotate + 0.2), posY, cjLaserEndRight);
        this.endR.anchor.setTo(0.5);
        this.centerLaser.addChild(this.endR);
        var endL = game.add.image(-this.centerLaser.width * 0.53 - adjusX * (this.lenghtLaserRotate + 0.2), posY, cjLaserEndLeft);
        endL.anchor.setTo(0.5);
        this.centerLaser.addChild(endL);
        this.drawRect();
    };
    Laser.prototype.drawRect = function (x, y) {
        if (x === void 0) { x = this.x; }
        if (y === void 0) { y = this.y; }
        if (globalAlpha)
            return;
        this.rect = new Phaser.Graphics(game, x, y);
        RunControl.Instance.uiLayers.add(this.rect);
    };
    Laser.prototype.drawLaserStatic = function () {
        var directLaser = [90, -90, 180, 0]; //down,up,left,right
        var index = 0;
        switch (this.typeLaser) {
            case OBSTACLE_LASER_STATIC_DOWN:
                index = 0;
                break;
            case OBSTACLE_LASER_STATIC_UP:
                index = 1;
                break;
            case OBSTACLE_LASER_STATIC_LEFT:
                index = 2;
                break;
            case OBSTACLE_LASER_STATIC_RIGHT:
                index = 3;
                break;
        }
        var directionAngle = directLaser[index];
        this.angular = directionAngle;
        var headLaser = game.add.image(0, 0, cjLaserStatic);
        headLaser.anchor.setTo(0.5);
        headLaser.angle = directionAngle;
        this.parentLaserStatic.addChild(headLaser);
        var posY = -1;
        var adjusX = 5.9;
        for (var i = 0; i < this.lenghtLaserStatic; i++) {
            var joinLaser = game.add.image(headLaser.width * 0.53 + adjusX * i, posY, cjLaserBody);
            joinLaser.anchor.setTo(0.5);
            headLaser.addChild(joinLaser);
        }
        var endR = game.add.image(headLaser.width * 0.53 + adjusX * (this.lenghtLaserStatic + 0.2), posY, cjLaserEndRight);
        endR.anchor.setTo(0.5);
        headLaser.addChild(endR);
        this.drawRect();
    };
    Laser.prototype.update = function () {
        if (PAUSED)
            return;
        this.moveLaserLong();
        this.move();
        this.rotateHitBox();
        this.trackDrawingHB();
        // if(this.typeLaser == OBSTACLE_LASER_LONG)this.killLaserLong();
    };
    Laser.prototype.moveLaserLong = function () {
        if (this.typeLaser != OBSTACLE_LASER_LONG)
            return;
        this.moveHeadLaser();
        // this.scaleArcLaser();
        // this.activatedCollisionLaserLong();
    };
    Laser.prototype.moveHeadLaser = function () {
        var _this = this;
        if (this.isFinishMoveHeader)
            return;
        this.headLeft.x += this.stepX + this.adjustStepX;
        this.headRight.x -= this.stepX;
        if (this.headLeft.x >= 100)
            this.headLeft.x = 100;
        if (this.headRight.x <= GAMEWIDTH - 50)
            this.headRight.x = GAMEWIDTH - 50;
        if (this.headLeft.x == 100 && this.headRight.x == GAMEWIDTH - 50) {
            // this.visibleLineLaser();
            this.chargeLeft.x = this.headLeft.x - 3;
            this.chargeLeft.y = this.headLeft.y - 9;
            this.chargeRight.x = this.headRight.x - 39;
            this.chargeRight.y = this.headRight.y - 9;
            this.headLeft.animations.play("open");
            this.headRight.animations.play("open");
            this.isFinishMoveHeader = true;
            new Delay(100, function () {
                _this.chargeLeft.visible = true;
                _this.chargeRight.visible = true;
                _this.chargeLeft.animations.play("charging");
                _this.chargeRight.animations.play("charging");
            });
            new Delay(1000, function () {
                _this.chargeLeft.visible = false;
                _this.chargeRight.visible = false;
                _this.visibleLaserLong(_this.arrayLaserLong);
                new Delay(100, function () {
                    _this.visibleLaserLong(_this.arrayLaserLongBig);
                    _this.reactivityLaserBig();
                });
                new Delay(1000, function () {
                    _this.hiddenLaserLong(_this.arrayLaserLong);
                    _this.hiddenLaserLong(_this.arrayLaserLongBig);
                    _this.headLeft.animations.play("close");
                    _this.headRight.animations.play("close");
                    new Delay(400, function () {
                        game.add.tween(_this.headLeft).to({ x: 0 }, 1500, Phaser.Easing.Linear.None, true);
                        game.add.tween(_this.headRight).to({ x: gameWidth + 50 }, 1000, Phaser.Easing.Linear.None, true);
                        game.add.tween(_this).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true).onComplete.addOnce(function () {
                            _this.destroy();
                        });
                        _this.statusKill = true;
                    });
                });
                _this.activeCollision = true;
            });
            // this.isStartScaling = true;
        }
    };
    Laser.prototype.scaleArcLaser = function () {
        if (!this.isStartScaling)
            return;
        this.scaleCurrent -= this.counterScale;
        if (this.scaleCurrent <= 0.5)
            this.scaleCurrent = 0.5;
        this.arcL.scale.set(this.scaleCurrent, this.scaleCurrent);
        this.arcR.scale.set(this.scaleCurrent, this.scaleCurrent);
    };
    Laser.prototype.activatedCollisionLaserLong = function () {
        if (this.isStartActive && this.scaleCurrent == 0.5) {
            this.killLineLaser();
            this.visibleLaserLong(this.arrayLaserLong);
            this.activeCollision = true;
            this.isStartActive = false;
        }
    };
    Laser.prototype.killLaserLong = function () {
        if (!this.activeCollision)
            return;
        this.lifeTimeLaserLong -= game.time.elapsedMS;
        if (this.lifeTimeLaserLong < 0) {
            this.destroy();
            this.statusKill = true;
        }
    };
    Laser.prototype.rotateHitBox = function () {
        var array = this.hitBox;
        for (var index = 0; index < array.length; index++) {
            var element = array[index];
            element.x = Math.cos(this.angular * Math.PI / 180) * element.distance - element.width * 0.5;
            element.y = Math.sin(this.angular * Math.PI / 180) * element.distance - element.height * 0.5;
            if (this.typeLaser == OBSTACLE_LASER_LONG)
                element.y += 20;
        }
    };
    Laser.prototype.trackDrawingHB = function () {
        if (globalAlpha)
            return;
        this.rect.x = this.x;
        this.rect.clear();
        for (var i = 0; i < this.hitBox.length; i++) {
            this.rect.beginFill(0x000000, 0.5);
            this.rect.drawRect(this.hitBox[i].x, this.hitBox[i].y, this.hitBox[i].width, this.hitBox[i].height);
            this.rect.endFill();
        }
    };
    Laser.prototype.move = function () {
        if (this.typeLaser == OBSTACLE_LASER_STATIC_ROTATING) {
            if (!GAMEOVER)
                this.angular++;
            this.centerLaser.angle = this.angular;
        }
        if (GAMEOVER) {
            if (this.typeLaser != OBSTACLE_LASER_LONG)
                this.moveX(SPEED_GAMEOVER);
            return;
        }
        if (this.typeLaser != OBSTACLE_LASER_LONG)
            this.moveX(SPEEDALL);
    };
    Laser.prototype.moveX = function (speed) {
        this.x -= speed;
        if (this.x < -50) {
            this.statusKill = true;
            this.destroy();
        }
    };
    return Laser;
}(Phaser.Image));
var Minion = /** @class */ (function (_super) {
    __extends(Minion, _super);
    function Minion(x, y) {
        var _this = _super.call(this, game, x, y, cjBlank) || this;
        _this.hitBox = [];
        _this.title = MINION;
        _this.statusKill = false;
        _this.speedY = 3;
        _this.accY = 0.1;
        _this.angular = 13;
        _this.isFallen = false;
        _this.timerSpawnBlood = 0;
        _this.timerSpawnBloodMax = 100;
        _this.isAngleNoAllDirection = false;
        _this.counterSparkle = 0;
        _this.counterMax = 15;
        _this.drawShadow();
        _this.minion = game.add.sprite(0, 0, cjMinion);
        _this.minion.anchor.setTo(0.5);
        _this.addChild(_this.minion);
        _this.minion.animations.add("walk", [5, 4, 3, 2, 1, 0], 15, true);
        _this.initSpeedX = Math.floor(Math.random() * 10) + 1 + SPEEDALL;
        _this.hitBox.push({
            x: -_this.minion.width * 0.5,
            y: -_this.minion.height * 0.5,
            width: _this.minion.width,
            height: _this.minion.height
        });
        _this.drawHitBox();
        return _this;
    }
    Minion.prototype.drawShadow = function () {
        this.shadow = game.add.image(-5, 45, cjShadow);
        this.shadow.alpha = 0.5;
        this.shadow.anchor.setTo(0.5);
        this.addChild(this.shadow);
    };
    Minion.prototype.fallenMinion = function () {
        if (!this.isFallen)
            return;
        this.shadow.visible = false;
        this.visible = false;
        this.angle += this.angular;
        this.y += this.speedY;
        this.speedY += this.accY;
        if (this.y > GAMEHEIGHT)
            this.destroy();
    };
    Minion.prototype.drawHitBox = function () {
        if (globalAlpha)
            return;
        this.rect = new Phaser.Graphics(game, 0, 0);
        this.rect.beginFill(0x000000, 0.5);
        this.rect.drawRect(this.hitBox[0].x, this.hitBox[0].y, this.hitBox[0].width, this.hitBox[0].height);
        this.rect.endFill();
        this.addChild(this.rect);
    };
    Minion.prototype.update = function () {
        if (PAUSED) {
            this.minion.animations.stop();
            return;
        }
        this.resumeAnims();
        this.moveX();
        this.fallenMinion();
        this.moveDead();
    };
    Minion.prototype.moveDead = function () {
        if (!this.statusKill)
            return;
        if (this.minion == null)
            return;
        this.minion.angle -= this.angular;
        // this.spawnBlood();
    };
    Minion.prototype.spawnBlood = function () {
        this.timerSpawnBlood -= game.time.elapsedMS;
        if (this.timerSpawnBlood <= 0) {
            var angle = 0;
            this.timerSpawnBlood = this.timerSpawnBloodMax;
            var amountBlood = Math.floor(Math.random() * 10 + 1) + 10;
            var posY = 0;
            var posX = -15;
            for (var i = 0; i < amountBlood; i++) {
                if (!this.isAngleNoAllDirection)
                    angle = Math.floor(Math.random() * 361);
                else {
                    var index = Math.floor(Math.random() * 2);
                    switch (index) {
                        case 0:
                            angle = -(Math.floor(Math.random() * 91) + 90);
                            break;
                        case 1:
                            angle = -Math.floor(Math.random() * 91);
                            break;
                    }
                }
                if (!MODE_BLOOD) {
                    angle = 90;
                    // posY = this.restPos.parent.y + Math.floor(Math.random()*this.restPos.height) - this.restPos.height*0.5;
                    posY = this.minion.parent.y + this.minion.y;
                    posX = this.minion.parent.x + this.minion.x - 15;
                }
                var blood = new Blood(posX, posY, angle);
                if (!MODE_BOUNCING)
                    blood.anchor.setTo(0, 2);
                else
                    blood.anchor.setTo(0.5);
                if (!MODE_BLOOD)
                    RunControl.Instance.vfxLayers.add(blood);
                else
                    this.minion.addChild(blood);
            }
        }
    };
    Minion.prototype.resumeAnims = function () {
        this.minion.animations.play("walk");
    };
    Minion.prototype.moveX = function () {
        if (rushCounter > 0)
            this.speed = SPEED_RUSH + 5;
        else
            this.speed = this.initSpeedX;
        this.x -= this.speed;
        if (this.x < -this.minion.width) {
            this.destroy();
            this.minion = null;
        }
        this.spawnSparkle();
    };
    Minion.prototype.spawnSparkle = function () {
        if (this.statusKill)
            return;
        if (this.minion == null)
            return;
        this.counterSparkle -= 1;
        var duration = 500;
        if (this.counterSparkle < 0) {
            this.counterSparkle = this.counterMax;
            var sparkle = new Sparkle(this.x, this.y + this.minion.height * 0.5, duration, SPARK_DYNAMIC);
            sparkle.scale.setTo(0.4);
            RunControl.Instance.objectLayers.add(sparkle);
        }
    };
    return Minion;
}(Phaser.Image));
var MouseTap = /** @class */ (function (_super) {
    __extends(MouseTap, _super);
    function MouseTap(x, y, targetPos, isOnlyTap) {
        if (targetPos === void 0) { targetPos = null; }
        if (isOnlyTap === void 0) { isOnlyTap = true; }
        var _this = _super.call(this, game, x, y, cjBlank) || this;
        _this.hitBox = [];
        _this.stateMouse = 0;
        _this.isMoveActive = true;
        _this.timerTapMax = 2500;
        _this.durationTap = 1500;
        _this.activeTap = true;
        _this.activeMove = false;
        _this.isHidden = false;
        _this.durationHidden = 500;
        _this.timerHidden = 500;
        _this.isKilled = false;
        _this.timerSpawnCursor = 0;
        _this.isOnlyTap = isOnlyTap;
        if (targetPos != null) {
            _this.targetPosX = targetPos.x + targetPos.parent.x;
            _this.targetPosY = targetPos.y + targetPos.parent.y;
        }
        _this.initPosX = _this.x;
        _this.initPosY = _this.y;
        _this.createAnimateMouseTap();
        _this.hitBox.push({
            x: 0,
            y: 0,
            width: 10,
            height: 10
        });
        return _this;
        // this.drawArc();
        // this.drawHitBox();
    }
    MouseTap.prototype.drawArc = function () {
        this.graphicsCircle = new Phaser.Graphics(game, 0, 0);
        this.graphicsCircle.beginFill(0xff0000);
        this.graphicsCircle.drawCircle(0, 0, 10);
        this.graphicsCircle.endFill();
        this.tapMouseIdle.addChild(this.graphicsCircle);
    };
    MouseTap.prototype.drawHitBox = function () {
        this.rect = new Phaser.Graphics(game, 0, 0);
        this.rect.beginFill(0x000000);
        this.rect.drawRect(this.hitBox[0].x, this.hitBox[0].y, this.hitBox[0].width, this.hitBox[0].height);
        this.rect.endFill();
        this.addChild(this.rect);
    };
    MouseTap.prototype.createAnimateMouseTap = function () {
        this.tapMouse = game.add.sprite(0, 0, cjMouseTap);
        this.tapMouse.anchor.setTo(0.15, 0.5);
        this.tapMouse.animations.add("tap", [6, 5, 4, 3, 2, 1, 0], 15, true);
        this.addChild(this.tapMouse);
        this.tapMouseIdle = game.add.sprite(0, 0, cjMouseTap);
        this.tapMouseIdle.anchor.setTo(0.15, 0.5);
        this.tapMouseIdle.animations.add("move", [6], 15, false);
        this.addChild(this.tapMouseIdle);
        ;
        this.tapMouse.animations.play("tap");
        this.tapMouseIdle.visible = false;
        this.tapMouse.visible = true;
    };
    MouseTap.prototype.postUpdate = function () {
        if (this.isOnlyTap) {
            this.tapMouseIdle.visible = false;
            this.tapMouse.visible = true;
        }
        else {
            this.changeAnimation();
            this.timerAnimateTap();
            this.hiddenMouse();
        }
        this.spawnCursorAnimate();
        this.killCursor();
    };
    MouseTap.prototype.changeAnimation = function () {
        if (this.stateMouse == 0) {
            this.tapMouseIdle.visible = false;
            this.tapMouse.visible = true;
        }
        else if (this.stateMouse == 1) {
            this.tapMouseIdle.visible = true;
            this.tapMouse.visible = false;
            this.moveMouse();
        }
    };
    MouseTap.prototype.moveMouse = function () {
        if (this.isMoveActive) {
            this.moveToMainCard();
        }
    };
    MouseTap.prototype.moveToMainCard = function () {
        var speed = 5;
        var distance = 0;
        distance += speed;
        var y = this.targetPosY - this.y;
        var x = this.targetPosX - this.x;
        var directionAngle = (Math.atan2(y, x) * 180 / Math.PI) * -1 + 90;
        var tempX = distance * Math.sin(directionAngle * Math.PI / 180);
        var tempY = distance * Math.cos(directionAngle * Math.PI / 180);
        this.x += tempX;
        this.y += tempY;
        var cek = this.checkCollison();
        if (cek) {
            this.isMoveActive = false;
            this.stateMouse = 0;
            this.activeTap = true;
            this.isHidden = true;
            this.tapMouse.alpha = 0;
            this.tapMouseIdle.alpha = 0;
            this.x = this.initPosX;
            this.y = this.initPosY;
        }
    };
    MouseTap.prototype.checkCollison = function () {
        var distance = Math.sqrt(Math.pow((this.x - this.targetPosX), 2) + Math.pow((this.y - this.targetPosY), 2));
        var gap = distance - (1 + 3);
        if (gap <= 0)
            return true;
        return false;
    };
    MouseTap.prototype.timerAnimateTap = function () {
        if (!this.activeTap)
            return;
        this.durationTap -= game.time.elapsedMS;
        if (this.durationTap < 0) {
            this.durationTap = this.timerTapMax;
            this.activeTap = false;
            this.stateMouse = 1;
            this.isMoveActive = true;
        }
    };
    MouseTap.prototype.hiddenMouse = function () {
        if (!this.isHidden)
            return;
        this.durationHidden -= game.time.elapsedMS;
        if (this.durationHidden < 0) {
            this.isHidden = false;
            this.tapMouse.alpha = 1;
            this.tapMouseIdle.alpha = 1;
            this.durationHidden = this.timerHidden;
        }
    };
    MouseTap.prototype.killCursor = function () {
        if (!this.isKilled)
            return;
        if (this.cursor) {
            this.cursor.destroy();
            this.cursor = null;
        }
        this.isKilled = false;
    };
    MouseTap.prototype.spawnCursorAnimate = function () {
        var _this = this;
        this.timerSpawnCursor -= game.time.elapsedMS;
        if (this.timerSpawnCursor < 0) {
            this.timerSpawnCursor = 2400;
            this.cursor = game.add.image(0, 0, cjLevelPointer);
            this.cursor.anchor.setTo(0.5, 0.5);
            this.tapMouse.addChild(this.cursor);
            this.cursor.scale.setTo(3);
            this.cursor.angle = 179;
            game.add.tween(this.cursor).to({ alpha: 0.8 }, 200, Phaser.Easing.Quadratic.Out, true);
            game.add.tween(this.cursor).to({ angle: 0 }, 1000, Phaser.Easing.Quadratic.Out, true);
            game.add.tween(this.cursor.scale).to({ x: 0.5, y: 0.5 }, 1000, Phaser.Easing.Quadratic.Out, true).onComplete.addOnce(function () {
                game.add.tween(_this.cursor).to({ alpha: 0 }, 500, Phaser.Easing.Quadratic.Out, true, 200).onComplete.add(function () {
                    _this.isKilled = true;
                });
            }, this);
        }
    };
    return MouseTap;
}(Phaser.Image));
var Overlap = /** @class */ (function (_super) {
    __extends(Overlap, _super);
    function Overlap(x, y, key) {
        return _super.call(this, game, x, y, key) || this;
    }
    Overlap.prototype.update = function () {
        if (PAUSED)
            return;
        if (GAMEOVER) {
            this.moveX(SPEED_GAMEOVER);
            return;
        }
        this.moveX(SPEEDALL);
    };
    Overlap.prototype.moveX = function (speed) {
        this.x -= speed;
        if (this.x < -(this.width + 50))
            this.destroy();
    };
    return Overlap;
}(Phaser.Image));
var Palace = /** @class */ (function (_super) {
    __extends(Palace, _super);
    function Palace(x, y) {
        var _this = _super.call(this, game, x, y, cjBlank) || this;
        _this.hitBox = [];
        _this.title = PALACE;
        _this.statusKill = false;
        _this.drawPalace();
        _this.hitBox.push({
            x: -25,
            y: 150,
            width: 50,
            height: 100
        });
        return _this;
        // this.drawHitBox();
        // this.drawArc();
    }
    Palace.prototype.drawHitBox = function () {
        // if(globalAlpha) return;
        this.rect = new Phaser.Graphics(game, 0, 0);
        this.rect.beginFill(0x000000, 0.5);
        this.rect.drawRect(this.hitBox[0].x, this.hitBox[0].y, this.hitBox[0].width, this.hitBox[0].height);
        this.rect.endFill();
        this.addChild(this.rect);
    };
    Palace.prototype.drawArc = function () {
        this.graphicsCircle = new Phaser.Graphics(game, 0, 0);
        this.graphicsCircle.beginFill(0xff0000, 1);
        this.graphicsCircle.drawCircle(0, 0, 10);
        this.graphicsCircle.endFill();
        this.palace.addChild(this.graphicsCircle);
    };
    Palace.prototype.drawPalace = function () {
        this.palace = game.add.image(0, 0, cjPalace);
        this.palace.anchor.setTo(0.5, 0);
        this.addChild(this.palace);
    };
    Palace.prototype.update = function () {
        if (PAUSED)
            return;
        if (GAMEOVER) {
            this.moveX(SPEED_GAMEOVER);
            return;
        }
        this.moveX(SPEEDALL);
    };
    Palace.prototype.moveX = function (speed) {
        this.speed = speed;
        this.x -= this.speed;
        if (this.x < gameWidth - 100) {
            ENTER_PALACE = true;
            this.x = gameWidth - 100;
        }
        if (this.x < -100) {
            this.statusKill = true;
            this.destroy();
        }
    };
    return Palace;
}(Phaser.Image));
var ParallaxBg = /** @class */ (function (_super) {
    __extends(ParallaxBg, _super);
    function ParallaxBg(isStateTitle) {
        if (isStateTitle === void 0) { isStateTitle = false; }
        var _this = _super.call(this, game, -27, -15) || this;
        _this.arrayBG1 = [];
        _this.arrayBG2 = [];
        _this.arrayBG3 = [];
        _this.arrayBG4 = [];
        _this.arrayBg = [
            {
                1: cjBgStepa1,
                2: cjBgStepa2,
                3: cjBgStepa3,
                4: cjBgStepa4,
            },
            {
                1: cjBgJungle1,
                2: cjBgJungle2,
                3: cjBgJungle3,
                4: cjBgJungle4,
            },
            {
                1: cjBgSakura1,
                2: cjBgSakura2,
                3: cjBgSakura3,
                4: cjBgSakura4,
            },
            {
                1: cjBgShrine1,
                2: cjBgShrine2,
                3: cjBgShrine3,
                4: cjBgShrine4,
            },
            {
                1: cjBgGarden1,
                2: cjBgGarden2,
                3: cjBgGarden3,
                4: cjBgGarden4,
            }
        ];
        _this.currentIndexBg = 0;
        _this.checkList = [0, 0, 0, 0];
        _this.counterIndexLevel = 0;
        _this.isTitleScreen = isStateTitle;
        _this.initPos();
        _this.drawBG(_this.arrayBG4, cjBgStepa4, 4);
        _this.drawBG(_this.arrayBG3, cjBgSakura3, 3);
        _this.drawBG(_this.arrayBG2, cjBgStepa2, 2);
        _this.drawBG(_this.arrayBG1, cjBgStepa1, 1);
        return _this;
        // this.drawBG(this.arrayBG4,cjBgJungle4);
        // this.drawBG(this.arrayBG3,cjBgJungle3);
        // this.drawBG(this.arrayBG2, cjBgJungle2);
        // this.drawBG(this.arrayBG1, cjBgJungle1);
        // this.drawBG(this.arrayBG4,cjBgSakura4);
        // this.drawBG(this.arrayBG3,cjBgSakura3);
        // this.drawBG(this.arrayBG2, cjBgSakura2);
        // this.drawBG(this.arrayBG1, cjBgSakura1);
        // this.drawBG(this.arrayBG4,cjBgShrine4);
        // this.drawBG(this.arrayBG3,cjBgShrine3);
        // this.drawBG(this.arrayBG2, cjBgShrine2);
        // this.drawBG(this.arrayBG1, cjBgShrine1);
        // this.drawBG(this.arrayBG4,cjBgGarden4);
        // this.drawBG(this.arrayBG3,cjBgGarden3);
        // this.drawBG(this.arrayBG2, cjBgGarden2);
        // this.drawBG(this.arrayBG1, cjBgGarden1);
    }
    ParallaxBg.prototype.initPos = function () {
        this.initPosX = this.x;
        this.initPosY = this.y;
    };
    ParallaxBg.prototype.drawBG = function (array, key, identitasKey) {
        var startPosX = 1024;
        for (var i = 0; i < 3; i++) {
            array[i] = new Background(i * startPosX, 0, key, identitasKey);
            this.addChild(array[i]);
        }
    };
    ParallaxBg.prototype.initSpeedGameOver = function () {
        SPEED_GAMEOVER = SPEEDALL;
        this.speedGameOverBg2 = SPEEDALL - 2;
        this.speedGameOverBg3 = SPEEDALL - 3;
        this.speedGameOverBg4 = SPEEDALL - 4;
        this.breakFactor = this.speedGameOverBg2 / 180;
    };
    ParallaxBg.prototype.update = function () {
        if (this.isTitleScreen) {
            if (PAUSED)
                return;
            this.moveBg(this.arrayBG1, SPEEDALL);
            this.moveBg(this.arrayBG2, SPEEDALL - 0.5);
            this.moveBg(this.arrayBG3, SPEEDALL - 1);
            this.moveBg(this.arrayBG4, SPEEDALL - 1.5);
        }
        if (!READY)
            return;
        if (PAUSED)
            return;
        if (GAMEOVER) {
            SPEED_GAMEOVER -= this.breakFactor;
            this.speedGameOverBg2 -= this.breakFactor;
            this.speedGameOverBg3 -= this.breakFactor;
            this.speedGameOverBg4 -= this.breakFactor;
            if (this.speedGameOverBg4 < 0)
                this.speedGameOverBg4 = 0;
            if (this.speedGameOverBg3 < 0)
                this.speedGameOverBg3 = 0;
            if (this.speedGameOverBg2 < 0)
                this.speedGameOverBg2 = 0;
            if (SPEED_GAMEOVER < 0)
                SPEED_GAMEOVER = 0;
            this.moveBg(this.arrayBG1, SPEED_GAMEOVER);
            this.moveBg(this.arrayBG2, this.speedGameOverBg2);
            this.moveBg(this.arrayBG3, this.speedGameOverBg3);
            this.moveBg(this.arrayBG4, this.speedGameOverBg4);
            return;
        }
        this.moveBg(this.arrayBG1, SPEEDALL);
        this.moveBg(this.arrayBG2, SPEEDALL - 0.5);
        this.moveBg(this.arrayBG3, SPEEDALL - 1);
        this.moveBg(this.arrayBG4, SPEEDALL - 1.5);
    };
    ParallaxBg.prototype.moveBg = function (array, speed) {
        for (var i = 0; i < array.length; i++) {
            var bg = array[i];
            bg.x -= speed;
            if (bg.x + bg.width < 0) {
                bg.x = this.latestBGX(array) - speed;
            }
        }
    };
    ParallaxBg.prototype.latestBGX = function (array) {
        var latestX = 0;
        for (var i = 0; i < array.length; i++) {
            var element = array[i];
            if (element.x > latestX) {
                latestX = element.x;
                if (METER_COUNTER > arrayMeter[this.currentIndexBg]) {
                    if (this.checkList[0] == 1
                        && this.checkList[1] == 1
                        && this.checkList[2] == 1
                        && this.checkList[3] == 1) {
                        this.currentIndexBg++;
                        this.checkList = [0, 0, 0, 0];
                    }
                    if (this.currentIndexBg >= this.arrayBg.length)
                        this.currentIndexBg = 0;
                    switch (element.identitasKey) {
                        case 1:
                            this.checkList[0] = 1;
                            element.loadTexture(this.arrayBg[this.currentIndexBg][1]);
                            break;
                        case 2:
                            this.checkList[1] = 1;
                            element.loadTexture(this.arrayBg[this.currentIndexBg][2]);
                            break;
                        case 3:
                            this.checkList[2] = 1;
                            element.loadTexture(this.arrayBg[this.currentIndexBg][3]);
                            break;
                        case 4:
                            this.checkList[3] = 1;
                            element.loadTexture(this.arrayBg[this.currentIndexBg][4]);
                            break;
                    }
                }
            }
        }
        return latestX + array[0].width;
    };
    return ParallaxBg;
}(Phaser.Sprite));
var Particle = /** @class */ (function (_super) {
    __extends(Particle, _super);
    function Particle(x, y, key, title, delay, limitMovementDragon, stateCurrent) {
        if (title === void 0) { title = ""; }
        if (delay === void 0) { delay = 0; }
        if (limitMovementDragon === void 0) { limitMovementDragon = 0; }
        if (stateCurrent === void 0) { stateCurrent = RunControl.Instance; }
        var _this = _super.call(this, game, x, y, cjBlank) || this;
        _this.hitBox = [];
        _this.tweenY = [];
        _this.counter = 0;
        _this.timerAnims = 0;
        _this.timerAnimsMax = 150;
        _this.numberOfEP = 23;
        _this.arrayEP = [];
        _this.delay = 10;
        _this.stateCurrent = null;
        _this.factorMovement = 0;
        _this.delayMovement = 0;
        _this.statusAngle = '';
        _this.factorIncreaseMovement = 0.05;
        _this.isActivePowerUp = false;
        _this.isTailMoved = false;
        _this.isMoveX = false;
        _this.speed = -5;
        _this.statusKill = false;
        _this.adjustSpeedX = 1.5;
        _this.speedPlayerDead = 1;
        _this.delayMovement = delay;
        _this.limitMovementDragon = limitMovementDragon;
        _this.keyImage = key;
        _this.title = title;
        _this.stateCurrent = stateCurrent;
        _this.anchor.setTo(0.5);
        _this.initXY();
        _this.drawHeadDragon();
        _this.spawnEfectParticle();
        _this.hitBox.push({
            x: -_this.headDragon.width * 0.5,
            y: -_this.headDragon.height * 0.5,
            width: _this.headDragon.width,
            height: _this.headDragon.height
        });
        _this.drawHitBox();
        return _this;
        // this.animsTweenY();
        // this.drawArc();
        // this.dragonAnimations();
    }
    Particle.prototype.drawArc = function () {
        this.graphicsCircle = new Phaser.Graphics(game, 0, 0);
        this.graphicsCircle.beginFill(0xff0000, 1);
        this.graphicsCircle.drawCircle(0, 0, 10);
        this.graphicsCircle.endFill();
        this.headDragon.addChild(this.graphicsCircle);
    };
    Particle.prototype.animsTweenY = function () {
        var counter = 0;
        this.tweenY[counter] = game.add.tween(this.headDragon).to({ y: 300 }, 1500, Phaser.Easing.Sinusoidal.InOut, true, 0, -1, true);
        var delay = 150;
        for (var i = 0; i < this.arrayEP.length; i++) {
            counter++;
            this.tweenY[counter] = game.add.tween(this.arrayEP[i].partDragon).to({ y: 300 }, 1500, Phaser.Easing.Sinusoidal.InOut, true, delay * i, -1, true);
            this.arrayEP[i].delayActive = delay * i;
        }
    };
    Particle.prototype.drawHeadDragon = function () {
        this.headDragon = game.add.image(0, 0, this.keyImage);
        this.headDragon.anchor.setTo(0.5);
        this.addChild(this.headDragon);
        this.dataAnim = game.cache.getJSON("dragon-anim", true).pos_rot;
        this.lengthData = this.dataAnim.length;
    };
    Particle.prototype.dragonAnimations = function () {
        this.timerAnims -= game.time.elapsedMS;
        if (this.timerAnims <= 0) {
            if (this.counter >= this.lengthData)
                this.counter = 0;
            this.timerAnims = this.timerAnimsMax;
            this.headDragon.x = this.dataAnim[this.counter][0].x;
            this.headDragon.y = this.dataAnim[this.counter][0].y;
            this.headDragon.angle = this.dataAnim[this.counter][0].angle;
            for (var i = 0; i < this.arrayEP.length; i++) {
                this.arrayEP[i].partDragon.x = this.dataAnim[this.counter][i].x;
                this.arrayEP[i].partDragon.y = this.dataAnim[this.counter][i].y;
                this.arrayEP[i].partDragon.angle = this.dataAnim[this.counter][i].angle;
            }
            this.counter++;
        }
    };
    Particle.prototype.drawHitBox = function () {
        if (globalAlpha)
            return;
        this.rect = new Phaser.Graphics(game, 0, 0);
        this.rect.beginFill(0x000000, 0.5);
        this.rect.drawRect(this.hitBox[0].x, this.hitBox[0].y, this.hitBox[0].width, this.hitBox[0].height);
        this.rect.endFill();
        this.headDragon.addChild(this.rect);
    };
    Particle.prototype.initXY = function () {
        this.initPosX = this.x;
        this.initPosY = this.y;
    };
    Particle.prototype.spawnEfectParticle = function () {
        var startPosX = this.initPosX;
        var spaceX = 50;
        if (IMAGE_95_75) {
            spaceX = 30;
        }
        var key = cjBodyEarthLoop;
        if (this.title == FIRE_DRAGON)
            key = cjBodyFireLoop;
        for (var i = this.numberOfEP; i > 0; i--) {
            switch (i) {
                case this.numberOfEP - 1:
                    key = cjTailEarth;
                    if (this.title == FIRE_DRAGON)
                        key = cjTailFire;
                    break;
                case this.numberOfEP - 2:
                    key = cjBodyEarthTail;
                    if (this.title == FIRE_DRAGON)
                        key = cjBodyFireTail;
                    break;
                case this.numberOfEP - 3:
                    key = cjBodyEarthRear;
                    if (this.title == FIRE_DRAGON)
                        key = cjBodyFireRear;
                    break;
            }
            var ep = this.stateCurrent.spawnParticleEfect(startPosX - i * spaceX, this.y, this.speed, this.adjustSpeedX, key, i * this.delay, this.limitMovementDragon);
            if (i == this.numberOfEP)
                ep.visible = false;
            this.arrayEP.push(ep);
            for (var i_1 = 0; i_1 < this.arrayEP.length - 1; i_1++) {
                var element = this.arrayEP[i_1];
                element.prevBody = this.arrayEP[i_1 + 1];
            }
            this.arrayEP[this.arrayEP.length - 1].prevBody = this;
        }
    };
    Particle.prototype.statusKillForEP = function () {
        for (var i = 0; i < this.arrayEP.length; i++) {
            var element = this.arrayEP[i];
            element.statusKill = true;
            element.destroy();
        }
    };
    Particle.prototype.stopMoveXforEP = function () {
        this.deltaPosX *= -1;
        this.x = this.posXPlayer;
        for (var i = 0; i < this.arrayEP.length; i++) {
            var element = this.arrayEP[i];
            element.isMoveX = false;
            element.divider = 3;
            element.x += this.deltaPosX;
        }
    };
    Particle.prototype.doFactorMovement = function () {
        if (this.factorMovement > 0) {
            if (this.y < this.limitMovementDragon)
                this.factorMovement += this.factorIncreaseMovement;
            else {
                this.factorMovement -= this.factorIncreaseMovement;
                if (this.statusAngle == '') {
                    this.statusAngle = 'up';
                }
            }
        }
        else {
            if (this.y > this.limitMovementDragon)
                this.factorMovement -= this.factorIncreaseMovement;
            else {
                this.factorMovement += this.factorIncreaseMovement;
                if (this.statusAngle == '') {
                    this.statusAngle = 'down';
                }
            }
        }
        this.y += this.factorMovement;
    };
    Particle.prototype.update = function () {
        this.trackPowerUp();
        if (this.statusKill)
            return;
        if (PAUSED)
            return;
        if (this.delayMovement > 0) {
            this.delayMovement--;
            return;
        }
        this.doFactorMovement();
        this.trackTailMovement();
        this.moveX();
        // this.dragonAnimations();
    };
    Particle.prototype.trackPowerUp = function () {
        var _this = this;
        if (!this.isActivePowerUp)
            return;
        if (shieldCounter <= 0) {
            RunControl.Instance.player.targetPosY = DEFAULT_TARGETPOSY;
            RunControl.Instance.marginTop = DEFAULT_MARGINTOP;
            this.killForEP();
            game.add.tween(this).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
            new Delay(1010, function () {
                _this.destroy();
                RunControl.Instance.endDragon();
            });
            this.isActivePowerUp = false;
        }
    };
    Particle.prototype.trackTailMovement = function () {
        if (this.isTailMoved)
            return;
        if (this.arrayEP[0].delayMovement <= 0) {
            for (var i = this.arrayEP.length - 1; i > 0; i--) {
                this.arrayEP[i].isMoveX = true;
            }
            this.isMoveX = true;
            this.isTailMoved = true;
        }
    };
    Particle.prototype.moveX = function () {
        var _this = this;
        if (!this.isMoveX)
            return;
        this.speed = -SPEEDALL + this.adjustSpeedX;
        if (GAMEOVER) {
            this.speed = this.speedPlayerDead;
            if (this.arrayEP[this.arrayEP.length - 1].x > GAMEWIDTH + this.arrayEP[this.arrayEP.length - 1].partDragon.width * 0.5) {
                this.statusKill = true;
                this.statusKillForEP();
                this.killForEP();
                new Delay(300, function () {
                    _this.destroy();
                });
            }
        }
        this.x += this.speed;
        if (this.x < -this.headDragon.width) {
            this.statusKill = true;
            this.statusKillForEP();
            this.killForEP();
            new Delay(300, function () {
                _this.destroy();
            });
        }
    };
    Particle.prototype.killForEP = function () {
        var _loop_1 = function (i) {
            var element = this_1.arrayEP[i];
            game.add.tween(element).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
            new Delay(1000, function () {
                element.destroy();
            });
        };
        var this_1 = this;
        for (var i = 0; i < this.arrayEP.length; i++) {
            _loop_1(i);
        }
    };
    return Particle;
}(Phaser.Image));
var Player = /** @class */ (function (_super) {
    __extends(Player, _super);
    function Player(x, y) {
        var _this = _super.call(this, game, x, y) || this;
        _this.dx = 0;
        _this.dy = 0;
        _this.title = "player";
        _this.hitBox = [];
        _this.skin = null;
        _this.initPosYShadow = 0;
        _this.statePos = ANIMATION_WALK;
        _this.timerSpawnBlood = 0;
        _this.timerSpawnBloodMax = 100;
        _this.isAngleNoAllDirection = false;
        _this.isBlooding = true;
        _this.counterWalkShadow = 1000;
        _this.counterWalkShadowMax = 1000;
        _this.counterAngelicDusk = 5;
        _this.counterAngelicDuskMax = 7;
        _this.counterSparkle = 0;
        _this.counterMax = 15;
        _this.isMoveX = true;
        _this.speedX = 1;
        _this.accX = 0.05;
        _this.targetPosX = 250;
        _this.speedY = 1;
        _this.accY = 0.3;
        _this.isMoveY = false;
        _this.targetPosY = 510;
        _this.decelX = 0.5;
        _this.counterDecel = 0;
        _this.counterDecelMax = 3;
        _this.isActiveDecel = true;
        _this.velY = 3;
        _this.gravity = 0.1;
        _this.tempX = 0;
        _this.tempY = 0;
        _this.gravitationY = 0;
        _this.distance = 0;
        _this.forceDown = 0.01;
        _this.forceDownMultiplier = 0.1;
        _this.speed = 5;
        _this.forceAngle = 0;
        _this.arrayPosY = [];
        _this.isActive = true;
        _this.isRoll = false;
        _this.angular = 5;
        _this.counterBouncing = 0;
        _this.isResult = true;
        _this.delayResult = 0;
        _this.isFallen = true;
        _this.valueDecrement = 0.3;
        _this.valueDecrementShadow = 0.1;
        _this.blinkTimer = 0;
        _this.blinkDelayTimer = 100;
        _this.isRunBlinking = false;
        _this.walking = game.add.sprite(0, 0, cjCharRun);
        _this.walking.animations.add("walk", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 15, true);
        _this.walking.animations.play("walk");
        _this.addChild(_this.walking);
        _this.riding = game.add.sprite(0, 0, cjCharRun);
        _this.riding.animations.add("riding", [0], 15, false);
        _this.riding.animations.play("riding");
        _this.addChild(_this.riding);
        _this.enterAnimate = game.add.sprite(0, 0, cjCharRun);
        _this.enterAnimate.animations.add("first", [0, 1, 2, 3, 4], 15, false);
        _this.enterAnimate.animations.play("first");
        _this.addChild(_this.enterAnimate);
        _this.restPos = game.add.sprite(0, 0, cjDead);
        _this.addChild(_this.restPos);
        _this.jumping = game.add.image(0, 0, cjFlying);
        _this.addChild(_this.jumping);
        var posX, posY;
        if (MODE_BOUNCING) {
            _this.targetPosY = DEFAULT_TARGETPOSY;
            _this.walking.anchor.setTo(0.5);
            _this.riding.anchor.setTo(0.5);
            _this.enterAnimate.anchor.setTo(0.5);
            _this.restPos.anchor.setTo(0.5);
            _this.jumping.anchor.setTo(0.5);
            posX = -_this.walking.width * 0.5;
            posY = -_this.walking.height * 0.5;
            if (ARRAY_SKINS[0] == 2)
                _this.spawnSkin(-_this.jumping.width * 0.5 - 30, -_this.jumping.height * 0.5 + 25, cjScarfSkin, 1);
            if (ARRAY_SKINS[1] == 2)
                _this.spawnSkin(9, -_this.jumping.height * 0.5, cjAngelicSkin, 1);
        }
        else {
            _this.targetPosY = 510;
            _this.walking.anchor.setTo(0.5, 1);
            _this.enterAnimate.anchor.setTo(0.5, 1);
            _this.restPos.anchor.setTo(0.5, 1);
            _this.jumping.anchor.setTo(0.5, 1);
            posX = -_this.walking.width * 0.5;
            posY = -_this.walking.height;
            if (ARRAY_SKINS[0] == 2)
                _this.spawnSkin(-70, -70, cjScarfSkin, 1);
            if (ARRAY_SKINS[1] == 2)
                _this.spawnSkin(7, -90, cjAngelicSkin, 1);
        }
        _this.hitBoxDragon = {
            x: posX,
            y: posY,
            width: _this.walking.width + 20,
            height: _this.walking.height + 20
        };
        _this.hitBoxNormal = {
            x: posX + 15,
            y: posY + 10,
            width: _this.walking.width - 20,
            height: _this.walking.height - 20
        };
        _this.hitBox.push(_this.hitBoxNormal);
        _this.drawHitBox();
        _this.shieldPowerUp();
        _this.magnetPowerUp();
        _this.rushPowerUp();
        _this.drawShadow();
        return _this;
        // this.drawArc();
    }
    Player.prototype.originOnDead = function () {
        this.originX = this.x;
        this.originY = this.y;
    };
    Player.prototype.drawArc = function () {
        this.graphicsCircle = new Phaser.Graphics(game, 0, 0);
        this.graphicsCircle.beginFill(0xff0000, 1);
        this.graphicsCircle.drawCircle(0, 0, 10);
        this.graphicsCircle.endFill();
        this.addChild(this.graphicsCircle);
    };
    Player.prototype.spawnSkin = function (x, y, key, index) {
        if (index === void 0) { index = 0; }
        this.skin = game.add.image(x, y, key);
        this.skin.anchor.setTo(0.5);
        if (index)
            this.jumping.addChild(this.skin);
        else
            this.addChild(this.skin);
    };
    Player.prototype.drawShadow = function () {
        this.shadow = game.add.image(0, 510, cjShadow);
        this.shadow.anchor.setTo(0.5);
        this.shadow.alpha = 0.5;
        RunControl.Instance.objectLayers.add(this.shadow);
        this.initPosYShadow = this.shadow.y;
    };
    Player.prototype.shieldPowerUp = function () {
        var posY = 0;
        if (!MODE_BOUNCING)
            posY = -this.hitBox[0].height * 0.5;
        this.shield = new Shield(0, posY);
        this.shield.anchor.setTo(0.5);
        this.addChild(this.shield);
    };
    Player.prototype.magnetPowerUp = function () {
        var posY = 0;
        if (!MODE_BOUNCING)
            posY = -this.hitBox[0].height * 0.5;
        this.magnet = new Magnet(0, posY);
        this.magnet.anchor.setTo(0.5);
        this.addChild(this.magnet);
    };
    Player.prototype.rushPowerUp = function () {
        var posY = 0;
        if (!MODE_BOUNCING)
            posY = -this.hitBox[0].height * 0.5;
        this.rush = new Rush(-50, posY);
        this.rush.anchor.setTo(0.5);
        this.addChild(this.rush);
    };
    Player.prototype.drawHitBox = function () {
        if (globalAlpha)
            return;
        this.rect = new Phaser.Graphics(game, 0, 0);
        this.rect.beginFill(0x000000, 0.5);
        this.rect.drawRect(this.hitBox[0].x, this.hitBox[0].y, this.hitBox[0].width, this.hitBox[0].height);
        this.rect.endFill();
        this.addChild(this.rect);
    };
    Player.prototype.update = function () {
        if (PAUSED) {
            this.walking.animations.stop();
            return;
        }
        this.playerEntering();
        this.resumeAnims();
        switch (this.statePos) {
            case ANIMATION_WALK:
                this.riding.visible = false;
                this.enterAnimate.visible = false;
                this.restPos.visible = false;
                this.jumping.visible = false;
                this.walking.visible = true;
                this.spawnSparkle();
                var adjustY = 50;
                if (MODE_BOUNCING)
                    adjustY = 0;
                if (this.checkExistSkin() && ARRAY_SKINS[2] != 2)
                    this.skin.visible = false;
                else
                    this.spawnShadow(this.walking.parent.x + this.walking.x, this.walking.parent.y + this.walking.y - adjustY, cjBlackShadow);
                break;
            case ANIMATION_FLY:
                this.riding.visible = false;
                this.enterAnimate.visible = false;
                this.restPos.visible = false;
                this.jumping.visible = true;
                this.walking.visible = false;
                if (this.checkExistSkin()) {
                    if (ARRAY_SKINS[2] == 2)
                        this.spawnShadow(this.jumping.parent.x + this.jumping.x, this.jumping.parent.y + this.jumping.y, cjBlackShadowFly);
                    else
                        this.skin.visible = true;
                }
                this.spawnAngelicDusk();
                break;
            case ANIMATION_DEAD:
                this.riding.visible = false;
                this.enterAnimate.visible = false;
                this.restPos.visible = true;
                this.jumping.visible = false;
                this.walking.visible = false;
                if (!MODE_BOUNCING)
                    this.fallenPlayer();
                if (this.checkExistSkin() && ARRAY_SKINS[2] != 2)
                    this.skin.visible = false;
                break;
            case ANIMATION_FIRST:
                this.riding.visible = false;
                this.enterAnimate.visible = true;
                this.restPos.visible = false;
                this.jumping.visible = false;
                this.walking.visible = false;
                if (this.checkExistSkin() && ARRAY_SKINS[2] != 2)
                    this.skin.visible = false;
                break;
            case ANIMATION_RIDE:
                this.riding.visible = true;
                this.enterAnimate.visible = false;
                this.restPos.visible = false;
                this.jumping.visible = false;
                this.walking.visible = false;
                break;
        }
        this.trackInvulTime();
        this.checkPosY();
        this.blinkPlayer();
        this.checkPowerUpStatus();
        this.trackShadow();
    };
    Player.prototype.spawnBlood = function () {
        if (!this.isBlooding)
            return;
        this.timerSpawnBlood -= game.time.elapsedMS;
        if (this.timerSpawnBlood <= 0) {
            var angle = 0;
            this.timerSpawnBlood = this.timerSpawnBloodMax;
            var amountBlood = Math.floor(Math.random() * 10 + 1) + 10;
            var posY = 0;
            var posX = -15;
            for (var i = 0; i < amountBlood; i++) {
                if (!this.isAngleNoAllDirection)
                    angle = Math.floor(Math.random() * 361);
                else {
                    var index = Math.floor(Math.random() * 2);
                    switch (index) {
                        case 0:
                            angle = -(Math.floor(Math.random() * 91) + 90);
                            break;
                        case 1:
                            angle = -Math.floor(Math.random() * 91);
                            break;
                    }
                }
                if (!MODE_BLOOD) {
                    angle = -90;
                    // posY = this.restPos.parent.y + Math.floor(Math.random()*this.restPos.height) - this.restPos.height*0.5;
                    posY = this.restPos.parent.y + this.restPos.y;
                    posX = this.restPos.parent.x + this.restPos.x - 15;
                }
                var blood = new Blood(posX, posY, angle);
                if (!MODE_BOUNCING)
                    blood.anchor.setTo(0, 2);
                else
                    blood.anchor.setTo(0.5);
                if (!MODE_BLOOD)
                    RunControl.Instance.vfxLayers.add(blood);
                else
                    this.restPos.addChild(blood);
            }
        }
    };
    Player.prototype.spawnShadow = function (x, y, key) {
        if (DISABLE_DEFAULT_SHADOW)
            return;
        this.counterWalkShadow -= game.time.elapsedMS;
        if (this.counterWalkShadow <= 0) {
            this.counterWalkShadow = this.counterWalkShadowMax;
            var shadow = new Shadow(x, y, key);
            shadow.anchor.setTo(0.5);
            RunControl.Instance.objectLayers.add(shadow);
        }
    };
    Player.prototype.trackInvulTime = function () {
        if (RunControl.Instance.timerInvulnerablePlayer <= 0) {
            this.isRunBlinking = false;
            this.alpha = 1;
        }
    };
    Player.prototype.checkExistSkin = function () {
        var array = ARRAY_SKINS;
        for (var i = 0; i < array.length; i++) {
            var element = array[i];
            if (element == 2) {
                return true;
            }
        }
        return false;
    };
    Player.prototype.spawnAngelicDusk = function () {
        if (ARRAY_SKINS[1] != 2)
            return;
        var posX = -35 - Math.random() * 10;
        var posY = this.jumping.height * 0.7 + Math.random() * 25 - 35;
        this.counterAngelicDusk -= 1;
        if (this.counterAngelicDusk < 0) {
            this.counterAngelicDusk = this.counterAngelicDuskMax;
            var ad = new AngelicDusk(posX, posY);
            ad.anchor.setTo(0.5);
            this.jumping.addChild(ad);
        }
    };
    Player.prototype.spawnSparkle = function () {
        this.counterSparkle -= 1;
        var duration = 500;
        if (this.counterSparkle < 0) {
            this.counterSparkle = this.counterMax;
            var posY = this.y;
            if (MODE_BOUNCING)
                posY = this.y + this.hitBox[0].height * 0.5;
            var sparkle = new Sparkle(this.x - this.hitBox[0].width * 0.35, posY, duration, SPARK_DYNAMIC);
            sparkle.scale.setTo(0.4);
            RunControl.Instance.objectLayers.add(sparkle);
        }
    };
    Player.prototype.trackShadow = function () {
        if (GAMEOVER) {
            if (!MODE_BOUNCING) {
                this.shadow.x = this.x - 35;
                this.shadow.y = this.initPosYShadow + 25;
            }
            else {
                this.shadow.y = this.initPosYShadow + 15;
            }
        }
        else {
            this.shadow.x = this.x;
            this.shadow.y = this.initPosYShadow;
        }
        this.shadow.scale.setTo(this.y / this.initPosYShadow);
        if (!IS_MOMO_FOLLOW_PLAYER)
            return;
        var array = RunControl.Instance.arrayChild;
        if (array.length == 0)
            return;
        for (var index = 0; index < array.length; index++) {
            var element = array[index];
            if (element.title == CHILD_MOMO) {
                element.childPlayer.y = this.y - 501;
                element.shield.y = this.y - 501;
                element.rush.y = this.y - 501;
            }
        }
    };
    Player.prototype.playerEntering = function () {
        if (LANDING_FIRST)
            return;
        if (arrayUpgrade[UPGRADE_FORWARD].current <= 0)
            this.statePos = ANIMATION_WALK;
        else
            this.statePos = ANIMATION_FLY;
        this.moveX();
        this.moveY();
    };
    Player.prototype.moveX = function () {
        if (!this.isMoveX)
            return;
        this.x += this.speedX;
        if (arrayUpgrade[UPGRADE_FORWARD].current > 0)
            this.accX = 0.1;
        this.speedX += this.accX;
        if (this.x >= this.targetPosX) {
            this.x = this.targetPosX;
            if (arrayUpgrade[UPGRADE_FORWARD].current > 0) {
                if (rushCounter <= 0) {
                    this.isMoveX = false;
                    this.isMoveY = true;
                }
                if (RunControl.Instance.isJumping) {
                    this.isMoveX = false;
                    this.isMoveY = false;
                    LANDING_FIRST = true;
                    this.statePos = ANIMATION_WALK;
                }
            }
            else {
                this.isMoveX = false;
                this.isMoveY = true;
                this.statePos = ANIMATION_WALK;
                new Delay(1000, function () {
                    if (!ISFIRST)
                        RunControl.Instance.cutScene("dialog_a");
                });
            }
        }
    };
    Player.prototype.moveY = function () {
        if (!this.isMoveY)
            return;
        this.y += this.speedY;
        this.speedY += this.accY;
        if (this.y >= this.targetPosY) {
            this.speedY = 1;
            this.accY = 0.3;
            this.statePos = ANIMATION_WALK;
            this.y = this.targetPosY;
            this.isMoveX = true;
            LANDING_FIRST = true;
            this.isMoveY = false;
        }
    };
    Player.prototype.resumeAnims = function () {
        this.walking.animations.play("walk");
    };
    Player.prototype.checkPowerUpStatus = function () {
        if (RunControl.Instance.isDragonActive) {
            if (magnetCounter > 0)
                this.magnet.visible = true;
            else
                this.magnet.visible = false;
            if (rushCounter > 0) {
                this.isActiveDecel = true;
                SPEEDALL = SPEED_RUSH;
            }
            else {
                if (!this.isActiveDecel)
                    return;
                RunControl.Instance.isActiveDecel = true;
                this.counterDecel -= 1;
                if (this.counterDecel < 0) {
                    this.counterDecel = this.counterDecelMax;
                    SPEEDALL -= this.decelX;
                    if (SPEEDALL <= SPEEDNORMAL) {
                        this.rush.visible = false;
                        SPEEDALL = SPEEDNORMAL;
                        this.isActiveDecel = false;
                    }
                }
            }
        }
        else {
            if (shieldCounter > 0)
                this.shield.visible = true;
            else
                this.shield.visible = false;
            if (magnetCounter > 0)
                this.magnet.visible = true;
            else
                this.magnet.visible = false;
            if (rushCounter > 0) {
                this.rush.visible = true;
                this.isActiveDecel = true;
                SPEEDALL = SPEED_RUSH;
            }
            else {
                if (!this.isActiveDecel)
                    return;
                RunControl.Instance.isActiveDecel = true;
                this.counterDecel -= 1;
                if (this.counterDecel < 0) {
                    this.counterDecel = this.counterDecelMax;
                    SPEEDALL -= this.decelX;
                    if (SPEEDALL <= SPEEDNORMAL) {
                        this.rush.visible = false;
                        SPEEDALL = SPEEDNORMAL;
                        this.isActiveDecel = false;
                    }
                }
            }
        }
    };
    Player.prototype.checkPosY = function () {
        if (!GAMEOVER)
            return;
        if (MODE_BOUNCING) {
            this.moveBouncing();
            this.rotatePlayer();
        }
        else {
            this.velY += this.gravity;
            if (this.y < this.targetPosY) {
                this.y += this.velY;
            }
            else {
                this.spawnResult();
                this.y = this.targetPosY;
            }
        }
        //commented temporarily
        // this.spawnBlood();
    };
    Player.prototype.rotatePlayer = function () {
        if (this.counterBouncing > 3) {
            this.restPos.angle = 90;
            this.isActive = false;
            if (SPEED_GAMEOVER <= 0)
                this.spawnResult();
            return;
        }
        this.restPos.angle += this.angular;
    };
    Player.prototype.moveBouncing = function () {
        if (!this.isActive)
            return;
        this.gravitationY += this.forceDown;
        this.distance += this.speed;
        this.tempX = this.distance * Math.sin(this.forceAngle * Math.PI / 180);
        this.tempY = this.distance * Math.cos(this.forceAngle * Math.PI / 180);
        this.originY += this.gravitationY;
        this.x = this.originX + this.tempX;
        this.y = this.originY + this.tempY;
        this.arrayPosY.push(this.y);
        if (this.arrayPosY.length > 5) {
            this.arrayPosY.shift();
        }
        if (this.y > this.targetPosY) {
            this.counterBouncing++;
            this.restPos.angle = 90;
            this.gravitationY = this.tempX = this.tempY = this.distance = 0;
            this.y = this.targetPosY;
            this.forceAngle = 180 - this.forceAngle;
            this.forceDown += this.forceDownMultiplier;
            this.originX = this.x;
            this.originY = this.y;
            if (this.counterBouncing > 3) {
                this.isAngleNoAllDirection = true;
                this.y = this.targetPosY;
                this.originX = this.x;
                this.originY = this.y;
                this.speed = 0;
                this.angular = 0;
                SPEED_GAMEOVER = 0;
                this.isActive = false;
                this.isBlooding = false;
                this.spawnResult();
            }
        }
    };
    Player.prototype.spawnResult = function () {
        if (!this.isResult)
            return;
        if (!MODE_BOUNCING)
            this.delayResult = 100;
        new Delay(this.delayResult, function () {
            if (MATH_ACTIVE)
                RunControl.Instance.showQuiz();
            else {
                if (CURRENT_HEART < 0)
                    RunControl.Instance.showResult();
                else
                    RunControl.Instance.spawnRevive();
            }
        });
        this.isResult = false;
    };
    Player.prototype.fallenPlayer = function () {
        if (!this.isFallen)
            return;
        game.add.tween(this.restPos).to({ angle: -90 }, 300, Phaser.Easing.Linear.None, true);
        this.isFallen = false;
    };
    Player.prototype.blinkPlayer = function () {
        if (!this.isRunBlinking)
            return;
        this.blinkTimer -= game.time.elapsedMS;
        if (this.blinkTimer <= 0) {
            this.blinkTimer = this.blinkDelayTimer;
            this.alpha -= this.valueDecrement;
            this.shadow.alpha -= this.valueDecrementShadow;
            if (this.alpha < 0)
                this.alpha = 1;
            if (this.shadow.alpha < 0.3)
                this.shadow.alpha = 0.5;
        }
    };
    Player.prototype.getHit = function () {
        this.isRunBlinking = true;
    };
    return Player;
}(Phaser.Sprite));
var PlayerChild = /** @class */ (function (_super) {
    __extends(PlayerChild, _super);
    function PlayerChild(x, y, key, posXChild) {
        if (posXChild === void 0) { posXChild = 0; }
        var _this = _super.call(this, game, x, y, cjBlank) || this;
        _this.hitBox = [];
        _this.statusKill = false;
        _this.speed = 0;
        _this.counterSparkle = 0;
        _this.counterMax = 15;
        _this.objectLayer = null;
        _this.isFinished = false;
        _this.child_life = 0;
        _this.timerInvulverability = LONG_INVULNERABILITY;
        _this.isMoveX = true;
        _this.speedX = 1;
        _this.accX = 0.05;
        _this.valueDecrement = 0.3;
        _this.valueDecrementShadow = 0.1;
        _this.blinkTimer = 0;
        _this.blinkDelayTimer = 100;
        _this.isRunBlinking = false;
        _this.drawShadow();
        _this.childPlayer = game.add.sprite(0, 0, key);
        _this.childPlayer.anchor.setTo(0.5);
        _this.addChild(_this.childPlayer);
        _this.keyImage = key;
        _this.posXChild = posXChild;
        switch (key) {
            case cjMomo:
                _this.child_life = MOMO_LIFE;
                _this.title = CHILD_MOMO;
                _this.spaceY = 75;
                _this.childPlayer.animations.add("move", [0, 1, 2, 3], 15, true);
                _this.childPlayer.animations.play("move");
                _this.moveMomo();
                _this.shadow.visible = false;
                break;
            case cjTurtle:
                _this.child_life = TURTLY_LIFE;
                _this.title = CHILD_TURTLY;
                _this.spaceY = y - 70;
                _this.childPlayer.animations.add("move", [0, 1, 2, 3, 4, 5, 6, 7, 8], 15, true);
                _this.childPlayer.animations.play("move");
                _this.moveTurtle();
                break;
        }
        _this.getHit();
        _this.hitBox.push({
            x: -_this.childPlayer.width * 0.5,
            y: -_this.childPlayer.height * 0.5,
            width: _this.childPlayer.width,
            height: _this.childPlayer.height
        });
        _this.drawHitBox();
        // this.drawArc();
        _this.shieldPowerUp();
        _this.rushPowerUp();
        return _this;
    }
    PlayerChild.prototype.shieldPowerUp = function () {
        this.shield = new Shield(0, 0);
        if (this.keyImage == cjMomo) {
            this.shield.y = 5;
            this.shield.scale.setTo(0.8);
        }
        else
            this.shield.scale.setTo(0.8);
        this.shield.anchor.setTo(0.5);
        this.addChild(this.shield);
    };
    PlayerChild.prototype.rushPowerUp = function () {
        this.rush = new Rush(-50, 0);
        if (this.keyImage == cjMomo) {
            this.rush.scale.setTo(0.8);
            this.rush.x = -30;
        }
        else
            this.rush.scale.setTo(0.8);
        this.rush.anchor.setTo(0.5);
        this.addChild(this.rush);
    };
    PlayerChild.prototype.drawShadow = function () {
        this.shadow = game.add.image(0, 40, cjShadow);
        this.shadow.alpha = 0.5;
        this.shadow.scale.setTo(0.71);
        this.shadow.anchor.setTo(0.5, -0.55);
        this.addChild(this.shadow);
    };
    PlayerChild.prototype.drawArc = function () {
        this.graphicsCircle = new Phaser.Graphics(game, 0, 0);
        this.graphicsCircle.beginFill(0xff0000, 1);
        this.graphicsCircle.drawCircle(0, 0, 10);
        this.graphicsCircle.endFill();
        this.childPlayer.addChild(this.graphicsCircle);
    };
    PlayerChild.prototype.drawHitBox = function () {
        if (globalAlpha)
            return;
        this.rect = new Phaser.Graphics(game, 0, 0);
        this.rect.beginFill(0x000000, 0.5);
        this.rect.drawRect(this.hitBox[0].x, this.hitBox[0].y, this.hitBox[0].width, this.hitBox[0].height);
        this.rect.endFill();
        this.childPlayer.addChild(this.rect);
    };
    PlayerChild.prototype.moveMomo = function () {
        var duration = Math.floor(Math.random() * 9) * 100 + 700;
        this.tweenY = game.add.tween(this).to({ y: this.spaceY }, duration, Phaser.Easing.Sinusoidal.InOut, true, 0, -1, true);
    };
    PlayerChild.prototype.moveTurtle = function () {
        var duration = Math.floor(Math.random() * 9) * 100 + 700;
        this.tweenY = game.add.tween(this).to({ y: this.spaceY }, duration, Phaser.Easing.Linear.None, true, 0, -1, true);
    };
    PlayerChild.prototype.spawnSparkle = function () {
        if (this.keyImage == cjMomo)
            return;
        this.counterSparkle -= 1;
        var duration = 500;
        if (this.counterSparkle < 0) {
            this.counterSparkle = this.counterMax;
            var sparkle = new Sparkle(this.x + this.childPlayer.x - this.hitBox[0].width * 0.15, this.y + this.childPlayer.y + this.hitBox[0].height * 0.45, duration, SPARK_DYNAMIC);
            sparkle.scale.setTo(0.15);
            this.objectLayer.add(sparkle);
        }
    };
    PlayerChild.prototype.trackShadow = function () {
        this.shadow.y = this.childPlayer.y;
    };
    PlayerChild.prototype.update = function () {
        if (PAUSED) {
            this.tweenY.isPaused = true;
            this.childPlayer.animations.stop();
            return;
        }
        this.moveGameOver();
        this.childEntering();
        this.tweenY.isPaused = false;
        this.childPlayer.animations.play("move");
        this.blinkPlayer();
        this.trackShadow();
        this.spawnSparkle();
        this.checkPowerUpStatus();
        this.counterTimerBlinking();
    };
    PlayerChild.prototype.moveGameOver = function () {
        if (!GAMEOVER && !this.isFinished)
            return;
        this.x += SPEEDALL;
        if (this.x > GAMEWIDTH + this.hitBox[0].width)
            this.destroy();
    };
    PlayerChild.prototype.counterTimerBlinking = function () {
        if (this.timerInvulverability > 0)
            this.timerInvulverability -= game.time.elapsedMS;
        else {
            this.isRunBlinking = false;
            this.alpha = 1;
        }
    };
    PlayerChild.prototype.childEntering = function () {
        this.moveX();
    };
    PlayerChild.prototype.moveX = function () {
        if (!this.isMoveX)
            return;
        this.x += this.speedX;
        this.speedX += this.accX;
        if (this.x >= this.posXChild) {
            this.x = this.posXChild;
            this.isMoveX = false;
        }
    };
    PlayerChild.prototype.checkPowerUpStatus = function () {
        if (shieldCounter > 0)
            this.shield.visible = true;
        else
            this.shield.visible = false;
        if (rushCounter > 0)
            this.rush.visible = true;
        else
            this.rush.visible = false;
    };
    PlayerChild.prototype.blinkPlayer = function () {
        if (!this.isRunBlinking)
            return;
        this.blinkTimer -= game.time.elapsedMS;
        if (this.blinkTimer <= 0) {
            this.blinkTimer = this.blinkDelayTimer;
            this.alpha -= this.valueDecrement;
            this.shadow.alpha -= this.valueDecrementShadow;
            if (this.alpha < 0)
                this.alpha = 1;
            if (this.shadow.alpha < 0.3)
                this.shadow.alpha = 0.5;
        }
    };
    PlayerChild.prototype.getHit = function () {
        this.isRunBlinking = true;
    };
    return PlayerChild;
}(Phaser.Sprite));
var PowerUp = /** @class */ (function (_super) {
    __extends(PowerUp, _super);
    function PowerUp(x, y, key, type) {
        var _this = _super.call(this, game, x, y, cjBlank) || this;
        _this.title = "";
        _this.hitBox = [];
        _this.statusKill = false;
        _this.keyImage = key;
        _this.drawFan();
        _this.drawPowerUp();
        switch (type) {
            case POWER_UP_SHIELD:
                _this.title = POWER_UP_SHIELD;
                _this.powerUp.animations.add("shield", [0]);
                _this.powerUp.animations.play("shield");
                break;
            case POWER_UP_DOUBLE:
                _this.title = POWER_UP_DOUBLE;
                _this.powerUp.animations.add("double", [1]);
                _this.powerUp.animations.play("double");
                break;
            case POWER_UP_MAGNET:
                _this.title = POWER_UP_MAGNET;
                _this.powerUp.animations.add("magnet", [2]);
                _this.powerUp.animations.play("magnet");
                break;
            case POWER_UP_MOMO:
                _this.title = POWER_UP_MOMO;
                break;
            case POWER_UP_TURTLY:
                _this.title = POWER_UP_TURTLY;
                break;
        }
        _this.hitBox.push({
            x: -_this.width * 0.5,
            y: -_this.height * 0.5,
            width: _this.width,
            height: _this.height
        });
        _this.initSpeedX = SPEEDALL;
        _this.drawHitBox();
        return _this;
    }
    PowerUp.prototype.drawPowerUp = function () {
        this.powerUp = game.add.image(0, 0, this.keyImage);
        this.powerUp.anchor.setTo(0.5);
        this.addChild(this.powerUp);
    };
    PowerUp.prototype.drawFan = function () {
        this.fan = game.add.image(0, 0, cjFan);
        this.fan.scale.setTo(0.3);
        this.fan.anchor.setTo(0.5);
        this.addChild(this.fan);
    };
    PowerUp.prototype.drawHitBox = function () {
        if (globalAlpha)
            return;
        this.rect = new Phaser.Graphics(game, 0, 0);
        this.rect.beginFill(0x000000, 0.5);
        this.rect.drawRect(this.hitBox[0].x, this.hitBox[0].y, this.hitBox[0].width, this.hitBox[0].height);
        this.rect.endFill();
        this.addChild(this.rect);
    };
    PowerUp.prototype.update = function () {
        if (PAUSED)
            return;
        if (GAMEOVER) {
            this.moveX(SPEED_GAMEOVER);
            return;
        }
        this.moveX(SPEEDALL);
        this.moveFan();
    };
    PowerUp.prototype.moveFan = function () {
        this.fan.angle += 10;
    };
    PowerUp.prototype.moveX = function (speed) {
        this.speed = speed;
        this.x -= this.speed;
        if (this.x < -100) {
            this.statusKill = true;
            this.destroy();
        }
    };
    return PowerUp;
}(Phaser.Sprite));
var ProgressRun = /** @class */ (function (_super) {
    __extends(ProgressRun, _super);
    function ProgressRun(x, y) {
        var _this = _super.call(this, game, x, y, cjBlank) || this;
        _this.timerMax = 30000;
        _this.timerCounter = 0;
        _this.isAnswered = false;
        _this.isFinishAnimateIn = false;
        _this.drawBars();
        _this.drawBirds();
        _this.drawHead();
        return _this;
    }
    ProgressRun.prototype.drawBirds = function () {
        var posY = -6.5;
        var arrayPosX = [-300, -100, 100, 300, 500];
        var posX = 0;
        for (var i = 0; i < 5; i++) {
            var bird = game.add.image(arrayPosX[i], posY, cjPointRest);
            bird.scale.setTo(0.2);
            bird.anchor.setTo(0.5);
            this.addChild(bird);
        }
    };
    ProgressRun.prototype.drawBars = function () {
        var runBarFrame = game.add.image(0, 0, cjLongBarFrame);
        runBarFrame.anchor.setTo(0.5);
        this.addChild(runBarFrame);
        this.runBarFill = game.add.image(0, 0, cjLongBarFill);
        this.runBarFill.anchor.setTo(0.5);
        this.addChild(this.runBarFill);
        this.maskBar = new Phaser.Graphics(game, 0, 0);
        this.addChild(this.maskBar);
    };
    ProgressRun.prototype.drawHead = function () {
        this.cursorHead = game.add.image(0, -5, cjCursorHead);
        this.cursorHead.anchor.setTo(0.5);
        this.addChild(this.cursorHead);
    };
    ProgressRun.prototype.update = function () {
        if (PAUSED)
            return;
        this.trackBar();
        this.trackTimer();
    };
    ProgressRun.prototype.trackTimer = function () {
        if (this.isAnswered)
            return;
        this.timerCounter += game.time.elapsedMS;
        if (this.timerCounter >= this.timerMax) {
            this.timerCounter = this.timerMax;
        }
    };
    ProgressRun.prototype.trackBar = function () {
        this.maskBar.clear();
        this.maskBar.beginFill(0, 0.7);
        this.maskBar.drawRect(-this.runBarFill.width * 0.5, -this.runBarFill.height * 0.5, (METER_COUNTER / METER_MAX) * this.runBarFill.width, this.runBarFill.height);
        this.maskBar.endFill();
        this.runBarFill.mask = this.maskBar;
        this.cursorHead.x = (METER_COUNTER / METER_MAX) * this.runBarFill.width - this.runBarFill.width * 0.5;
    };
    return ProgressRun;
}(Phaser.Image));
var RectAnimate = /** @class */ (function (_super) {
    __extends(RectAnimate, _super);
    function RectAnimate() {
        var _this = _super.call(this, game, 0, 0, cjBlank) || this;
        _this.drawRect();
        _this.tweenRect();
        return _this;
    }
    RectAnimate.prototype.tweenRect = function () {
        SoundPlayer.playSFX(SoundPlayer.DRUM);
        game.add.tween(this.rect).to({ alpha: 1 }, 1000, Phaser.Easing.Linear.None, true).onComplete.addOnce(function () {
            RunControl.Instance.transitionOut(Congrats.NAME);
        });
    };
    RectAnimate.prototype.drawRect = function () {
        this.rect = new Phaser.Graphics(game, 0, 0);
        this.rect.beginFill(0xFFFFFF, 1);
        this.rect.drawRect(0, 0, GAMEWIDTH, GAMEHEIGHT);
        this.rect.endFill();
        this.rect.alpha = 0;
        this.addChild(this.rect);
    };
    return RectAnimate;
}(Phaser.Image));
var Rocket = /** @class */ (function (_super) {
    __extends(Rocket, _super);
    function Rocket(x, y) {
        var _this = _super.call(this, game, x, y, cjRocket) || this;
        _this.title = ROCKET;
        _this.hitBox = [];
        _this.duration = 500;
        _this.distance = 0;
        _this.acc = 0.1;
        _this.statusKill = false;
        _this.hitBox.push({
            x: 0,
            y: 0,
            width: _this.width,
            height: _this.height
        });
        _this.drawRect();
        return _this;
        // this.drawArc();
    }
    Rocket.prototype.drawArc = function () {
        this.graphicsCircle = new Phaser.Graphics(game, 0, 0);
        this.graphicsCircle.beginFill(0xff0000, 1);
        this.graphicsCircle.drawCircle(0, 0, 10);
        this.graphicsCircle.endFill();
        this.addChild(this.graphicsCircle);
    };
    Rocket.prototype.drawRect = function () {
        if (globalAlpha)
            return;
        this.rect = new Phaser.Graphics(game, 0, 0);
        this.rect.beginFill(0x000000, 0.5);
        this.rect.drawRect(this.hitBox[0].x, this.hitBox[0].y, this.hitBox[0].width, this.hitBox[0].height);
        this.rect.endFill();
        this.addChild(this.rect);
    };
    Rocket.prototype.update = function () {
        if (PAUSED)
            return;
        this.moveX();
        this.spawnSparkle();
    };
    Rocket.prototype.spawnSparkle = function () {
        var sparkle = new Sparkle(this.centerX + this.width * 0.5 + (Math.random() * 10) - 5, this.centerY + (Math.random() * 10) - 5, this.duration + (Math.random() * 500));
        RunControl.Instance.objectLayers.add(sparkle);
    };
    Rocket.prototype.moveX = function () {
        this.distance = SPEEDALL + 5;
        this.distance += this.acc;
        this.x -= this.distance;
        if (this.x < -550) {
            this.statusKill = true;
            this.destroy();
        }
    };
    return Rocket;
}(Phaser.Image));
var Spike = /** @class */ (function (_super) {
    __extends(Spike, _super);
    function Spike(x, y) {
        var _this = _super.call(this, game, x, y, cjBlank) || this;
        _this.title = SPIKE;
        _this.hitBox = [];
        _this.angular = 2;
        _this.statusKill = false;
        _this.drawShadow();
        _this.anchor.setTo(0.5);
        _this.drawSpike();
        var adjust = 15;
        _this.hitBox.push({
            x: -_this.spike.width * 0.5 + adjust,
            y: -_this.spike.height * 0.5 + adjust,
            width: _this.spike.width - adjust * 2.5,
            height: _this.spike.height - adjust * 2.5
        });
        _this.drawHitBox();
        return _this;
    }
    Spike.prototype.drawShadow = function () {
        this.shadow = game.add.image(this.x, this.y + 75, cjShadow);
        this.shadow.scale.setTo(1.5);
        this.shadow.alpha = 0.5;
        this.shadow.anchor.setTo(0.5);
        RunControl.Instance.objectLayers.add(this.shadow);
    };
    Spike.prototype.drawSpike = function () {
        this.spike = game.add.image(0, 0, cjSpike);
        this.spike.anchor.setTo(0.5);
        this.addChild(this.spike);
    };
    Spike.prototype.drawHitBox = function () {
        if (globalAlpha)
            return;
        this.rect = new Phaser.Graphics(game, 0, 0);
        this.rect.beginFill(0x000000, 0.5);
        this.rect.drawRect(this.hitBox[0].x, this.hitBox[0].y, this.hitBox[0].width, this.hitBox[0].height);
        this.rect.endFill();
        this.addChild(this.rect);
    };
    Spike.prototype.update = function () {
        if (PAUSED)
            return;
        this.moveAndRotate();
        this.trackShadow();
    };
    Spike.prototype.trackShadow = function () {
        this.shadow.x = this.x;
    };
    Spike.prototype.moveAndRotate = function () {
        this.angular = (SPEEDALL + 5) * 50 * 0.5 / (this.spike.width * 0.5);
        this.speed = SPEEDALL + 5;
        this.spike.angle -= this.angular;
        this.x -= this.speed;
        if (this.x < -this.spike.width) {
            this.statusKill = true;
            this.destroy();
            this.shadow.destroy();
        }
    };
    return Spike;
}(Phaser.Image));
var StatusPowerUp = /** @class */ (function (_super) {
    __extends(StatusPowerUp, _super);
    function StatusPowerUp(key, indexImg) {
        var _this = _super.call(this, game, 0, 0, cjBlank) || this;
        _this.duration = 0;
        _this.index = indexImg;
        _this.powerUp = game.add.sprite(0, 0, key);
        _this.powerUp.anchor.setTo(0.5);
        _this.addChild(_this.powerUp);
        switch (indexImg) {
            case 0:
                _this.powerUp.animations.add("shield-status", [0]);
                _this.powerUp.play("shield-status");
                break;
            case 1:
                _this.powerUp.animations.add("double-status", [1]);
                _this.powerUp.play("double-status");
                break;
            case 2:
                _this.powerUp.animations.add("magnet-status", [2]);
                _this.powerUp.play("magnet-status");
                break;
        }
        _this.drawBar();
        return _this;
    }
    StatusPowerUp.prototype.drawBar = function () {
        this.barFill = game.add.image(0, 23, cjBarPowerUp);
        this.barFill.anchor.setTo(0.5);
        this.addChild(this.barFill);
        this.maskBar = new Phaser.Graphics(game, 0, 0);
        this.barFill.addChild(this.maskBar);
    };
    StatusPowerUp.prototype.preUpdate = function () {
        this.visibleStatus();
        this.trackDuration();
    };
    StatusPowerUp.prototype.visibleStatus = function () {
        if (this.duration > 0)
            this.runStatus();
        else
            this.visible = false;
    };
    StatusPowerUp.prototype.runStatus = function () {
        this.visible = true;
        this.maskBar.clear();
        this.maskBar.beginFill(0, 0.7);
        this.maskBar.drawRect(-this.barFill.width * 0.5, -this.barFill.height * 0.5, this.duration, this.barFill.height);
        this.maskBar.endFill();
        this.barFill.mask = this.maskBar;
    };
    StatusPowerUp.prototype.trackDuration = function () {
        switch (this.index) {
            case STATUS_POWER_UP_SHIELD:
                this.duration = (shieldCounter / shieldMax) * this.barFill.width;
                if (shieldCounter <= 0)
                    this.duration = 0;
                break;
            case STATUS_POWER_UP_DOUBLE:
                this.duration = (doubleCounter / doubleMax) * this.barFill.width;
                if (doubleCounter <= 0)
                    this.duration = 0;
                break;
            case STATUS_POWER_UP_MAGNET:
                this.duration = (magnetCounter / magnetMax) * this.barFill.width;
                if (magnetCounter <= 0)
                    this.duration = 0;
                break;
            case STATUS_POWER_UP_MOMO:
                this.duration = (momoCounter / momoMax) * this.barFill.width;
                if (momoCounter <= 0)
                    this.duration = 0;
                break;
            case STATUS_POWER_UP_TURTLE:
                this.duration = (turtleCounter / turtleMax) * this.barFill.width;
                if (turtleCounter <= 0)
                    this.duration = 0;
                break;
            case STATUS_POWER_UP_RUSH:
                this.duration = (rushCounter / rushMax) * this.barFill.width;
                if (rushCounter <= 0)
                    this.duration = 0;
                break;
            case STATUS_POWER_UP_EARTH:
                this.duration = (earthCounter / earthMax) * this.barFill.width;
                if (earthCounter <= 0)
                    this.duration = 0;
                break;
            case STATUS_POWER_UP_FIRE:
                this.duration = (fireCounter / fireMax) * this.barFill.width;
                if (fireCounter <= 0)
                    this.duration = 0;
                break;
        }
    };
    return StatusPowerUp;
}(Phaser.Image));
var StatusUpgrade = /** @class */ (function (_super) {
    __extends(StatusUpgrade, _super);
    function StatusUpgrade(x, y) {
        var _this = _super.call(this, game, x, y, cjBlank) || this;
        _this.distanceCounter = 0;
        _this.distanceMax = 0;
        _this.drawBar();
        return _this;
    }
    StatusUpgrade.prototype.drawBar = function () {
        var runBarFrame = game.add.image(0, 0, cjRunBarFrame);
        runBarFrame.anchor.setTo(0.5);
        this.addChild(runBarFrame);
        this.runBarFill = game.add.image(0, 0, cjRunBarFill);
        this.runBarFill.anchor.setTo(0.5);
        this.addChild(this.runBarFill);
        this.maskBar = new Phaser.Graphics(game, 0, 0);
        this.addChild(this.maskBar);
    };
    StatusUpgrade.prototype.preUpdate = function () {
        this.trackBar();
    };
    StatusUpgrade.prototype.trackBar = function () {
        this.maskBar.clear();
        this.maskBar.beginFill(0, 0.7);
        this.maskBar.drawRect(-this.runBarFill.width * 0.5, -this.runBarFill.height * 0.5, (this.distanceCounter / this.distanceMax) * this.runBarFill.width, this.runBarFill.height);
        this.maskBar.endFill();
        this.runBarFill.mask = this.maskBar;
    };
    return StatusUpgrade;
}(Phaser.Image));
var Warning = /** @class */ (function (_super) {
    __extends(Warning, _super);
    function Warning(x, y) {
        var _this = _super.call(this, game, x, y, cjWarning) || this;
        _this.targetScale = 0.6;
        _this.lifeTime = 1000;
        _this.anchor.setTo(0.5);
        game.add.tween(_this.scale).to({ x: _this.targetScale, y: _this.targetScale }, 500, Phaser.Easing.Linear.None, true, 0, -1);
        return _this;
    }
    Warning.prototype.update = function () {
        this.lifeTime -= game.time.elapsedMS;
        if (this.lifeTime < 0) {
            RunControl.Instance.spawnRocket(this.centerY);
            this.destroy();
        }
    };
    return Warning;
}(Phaser.Image));
var cardSkinPlayer = /** @class */ (function (_super) {
    __extends(cardSkinPlayer, _super);
    function cardSkinPlayer(x, y, title, key, info) {
        if (info === void 0) { info = ""; }
        var _this = _super.call(this, game, x, y, cjBlank) || this;
        _this.title = title;
        _this.key = key;
        _this.textInfo = info;
        _this.drawRect();
        _this.drawContains();
        return _this;
        // this.drawEdgeTile();
        // this.drawArc();
    }
    cardSkinPlayer.prototype.drawArc = function () {
        this.graphicsCircle = new Phaser.Graphics(game, 0, 0);
        this.graphicsCircle.beginFill(0xff0000);
        this.graphicsCircle.drawCircle(0, 0, 10);
        this.graphicsCircle.endFill();
        this.addChild(this.graphicsCircle);
    };
    cardSkinPlayer.prototype.drawContains = function () {
        var _this = this;
        var posY = 15;
        var startPosX = 250 * 0.5;
        var textTitle = game.add.bitmapText(startPosX, posY, font_36, this.title, 21);
        textTitle.anchor.setTo(0.5);
        textTitle.align = "center";
        this.addChild(textTitle);
        var posX = 250 * 0.5;
        var posY = 400 * 0.5;
        var adjustY = 35;
        var img = game.add.image(posX, posY - adjustY, this.key);
        img.anchor.setTo(0.5);
        this.addChild(img);
        var posY = halfGameHeight + 30;
        var textInfo = game.add.bitmapText(startPosX, posY - adjustY, font_36, this.textInfo, 21);
        textInfo.anchor.setTo(0.5);
        textInfo.align = "center";
        textInfo.maxWidth = 190;
        this.addChild(textInfo);
        adjustY = 53;
        this.textButton = "";
        if (this.key == cjWingPlayer) {
            if (ARRAY_SKINS[0] == 0)
                this.textButton = Language.GetText("lock");
            if (ARRAY_SKINS[0] == 1)
                this.textButton = Language.GetText("use");
            if (ARRAY_SKINS[0] == 2)
                this.textButton = Language.GetText("used");
        }
        if (this.key == cjAnglePlayer) {
            if (ARRAY_SKINS[1] == 0)
                this.textButton = Language.GetText("lock");
            if (ARRAY_SKINS[1] == 1)
                this.textButton = Language.GetText("use");
            if (ARRAY_SKINS[1] == 2)
                this.textButton = Language.GetText("used");
        }
        if (this.key == cjShadowPlayer) {
            if (ARRAY_SKINS[2] == 0)
                this.textButton = Language.GetText("lock");
            if (ARRAY_SKINS[2] == 1)
                this.textButton = Language.GetText("use");
            if (ARRAY_SKINS[2] == 2)
                this.textButton = Language.GetText("used");
        }
        this.buttonInfo = new ButtonCustom(startPosX, posY + adjustY, cjButtonYellowSmall, this.textButton, 31, 0, 0, function () {
            SoundPlayer.playSFX(SoundPlayer.CLICK);
            if (_this.key == cjWingPlayer) {
                if (ARRAY_SKINS[0] == 1)
                    ARRAY_SKINS[0] = 2;
                else if (ARRAY_SKINS[0] == 2)
                    ARRAY_SKINS[0] = 1;
                if (ARRAY_SKINS[1] == 2)
                    ARRAY_SKINS[1] = 1;
                if (ARRAY_SKINS[2] == 2)
                    ARRAY_SKINS[2] = 1;
            }
            else if (_this.key == cjAnglePlayer) {
                if (ARRAY_SKINS[1] == 1)
                    ARRAY_SKINS[1] = 2;
                else if (ARRAY_SKINS[1] == 2)
                    ARRAY_SKINS[1] = 1;
                if (ARRAY_SKINS[0] == 2)
                    ARRAY_SKINS[0] = 1;
                if (ARRAY_SKINS[2] == 2)
                    ARRAY_SKINS[2] = 1;
            }
            else if (_this.key == cjShadowPlayer) {
                if (ARRAY_SKINS[2] == 1)
                    ARRAY_SKINS[2] = 2;
                else if (ARRAY_SKINS[2] == 2)
                    ARRAY_SKINS[2] = 1;
                if (ARRAY_SKINS[0] == 2)
                    ARRAY_SKINS[0] = 1;
                if (ARRAY_SKINS[1] == 2)
                    ARRAY_SKINS[1] = 1;
            }
            if (_this.buttonInfo.text == Language.GetText("use"))
                _this.buttonInfo.text = Language.GetText("used");
            else
                _this.buttonInfo.text = Language.GetText("use");
        }, font_36);
        if (this.textButton == Language.GetText("lock"))
            this.buttonInfo.inputEnabled = false;
        else
            this.buttonInfo.inputEnabled = true;
        this.buttonInfo.anchor.setTo(0.5);
        this.addChild(this.buttonInfo);
    };
    cardSkinPlayer.prototype.drawRect = function () {
        this.rect = new Phaser.Graphics(game, 0, 0);
        this.rect.lineStyle(4, 0x000000);
        this.rect.drawRect(0, 0, 250, 400);
        this.addChild(this.rect);
    };
    return cardSkinPlayer;
}(Phaser.Image));
var AchievementScreen = /** @class */ (function (_super) {
    __extends(AchievementScreen, _super);
    function AchievementScreen() {
        var _this = _super.call(this, game, 0, 0, cjBlank) || this;
        _this.pointerStatus = "up";
        _this.minScroll = 176;
        _this.maxScroll = 490;
        _this.itemData = [
            {
                keyCointainer: [cjAchieveCompleted, cjAchieveUncompleted],
                keyIcon: cjMagentIcon,
                textMsg: Language.GetText("hit") + " " + ACHIEVEMENT_LIMIT.magnetLimit + " " + Language.GetText("magnetism") + " " + Language.GetText("powerups"),
                textIncomeTarget: "(" + MAGNET_COUNTER.toLocaleString() + "/" + ACHIEVEMENT_LIMIT.magnetLimit + ")",
                coinAward: 100,
                current: MAGNET_COUNTER,
                limit: ACHIEVEMENT_LIMIT.magnetLimit
            },
            {
                keyCointainer: [cjAchieveCompleted, cjAchieveUncompleted],
                keyIcon: cjInvincibleIcon,
                textMsg: Language.GetText("hit") + " " + ACHIEVEMENT_LIMIT.magnetLimit + " " + Language.GetText("shield") + " " + Language.GetText("powerups"),
                textIncomeTarget: "(" + SHIELD_COUNTER.toLocaleString() + "/" + ACHIEVEMENT_LIMIT.shieldLimit + ")",
                coinAward: 100,
                current: SHIELD_COUNTER,
                limit: ACHIEVEMENT_LIMIT.shieldLimit
            },
            {
                keyCointainer: [cjAchieveCompleted, cjAchieveUncompleted],
                keyIcon: cjIconDistance,
                textMsg: Language.GetText("reaches") + " " + ACHIEVEMENT_LIMIT.distanceLimit + " " + Language.GetText("meters"),
                textIncomeTarget: "(" + METER_COUNTER.toLocaleString() + "/" + ACHIEVEMENT_LIMIT.distanceLimit + ")",
                coinAward: 100,
                current: METER_COUNTER,
                limit: ACHIEVEMENT_LIMIT.distanceLimit
            },
            {
                keyCointainer: [cjAchieveCompleted, cjAchieveUncompleted],
                keyIcon: cjIconDragonFire,
                textMsg: Language.GetText("ride") + " " + ACHIEVEMENT_LIMIT.fireLimit + " " + Language.GetText("fire_dragon") + " " + Language.GetText("powerups"),
                textIncomeTarget: "(" + FIRE_DRAGON_COUNTER.toLocaleString() + "/" + ACHIEVEMENT_LIMIT.fireLimit + ")",
                coinAward: 100,
                current: FIRE_DRAGON_COUNTER,
                limit: ACHIEVEMENT_LIMIT.fireLimit
            },
            {
                keyCointainer: [cjAchieveCompleted, cjAchieveUncompleted],
                keyIcon: cjIconDragonEarth,
                textMsg: Language.GetText("ride") + " " + ACHIEVEMENT_LIMIT.earthLimit + " " + Language.GetText("earth_dragon") + " " + Language.GetText("powerups"),
                textIncomeTarget: "(" + EARTH_DRAGON_COUNTER.toLocaleString() + "/" + ACHIEVEMENT_LIMIT.earthLimit + ")",
                coinAward: 100,
                current: EARTH_DRAGON_COUNTER,
                limit: ACHIEVEMENT_LIMIT.earthLimit
            },
            {
                keyCointainer: [cjAchieveCompleted, cjAchieveUncompleted],
                keyIcon: cjCoinIcon,
                textMsg: Language.GetText("earn") + " " + Language.GetText("total") + " " + ACHIEVEMENT_LIMIT.coinLimit + " " + Language.GetText("coins"),
                textIncomeTarget: "(" + COIN_COUNTER.toLocaleString() + "/" + ACHIEVEMENT_LIMIT.coinLimit + ")",
                coinAward: 100,
                current: COIN_COUNTER,
                limit: ACHIEVEMENT_LIMIT.coinLimit
            },
            {
                keyCointainer: [cjAchieveCompleted, cjAchieveUncompleted],
                keyIcon: cjIconDiamond,
                textMsg: Language.GetText("earn") + " " + Language.GetText("total") + " " + ACHIEVEMENT_LIMIT.diamondLimit + " " + Language.GetText("diamonds"),
                textIncomeTarget: "(" + DIAMOND_COUNTER.toLocaleString() + "/" + ACHIEVEMENT_LIMIT.diamondLimit + ")",
                coinAward: 100,
                current: DIAMOND_COUNTER,
                limit: ACHIEVEMENT_LIMIT.diamondLimit
            },
            {
                keyCointainer: [cjAchieveCompleted, cjAchieveUncompleted],
                keyIcon: cjIconSpeed,
                textMsg: Language.GetText("reach") + " " + ACHIEVEMENT_LIMIT.speedLimit + " " + Language.GetText("mph"),
                textIncomeTarget: "(" + TOP_SPEED.toFixed(2) + "/" + ACHIEVEMENT_LIMIT.speedLimit + ")",
                coinAward: 100,
                current: TOP_SPEED,
                limit: ACHIEVEMENT_LIMIT.speedLimit
            },
            {
                keyCointainer: [cjAchieveCompleted, cjAchieveUncompleted],
                keyIcon: cjIconMinionMomo,
                textMsg: Language.GetText("accompanied by") + " " + ACHIEVEMENT_LIMIT.momoLimit + " " + Language.GetText("momos"),
                textIncomeTarget: "(" + TOP_MOMO + "/" + ACHIEVEMENT_LIMIT.momoLimit + ")",
                coinAward: 100,
                current: TOP_MOMO,
                limit: ACHIEVEMENT_LIMIT.momoLimit
            },
            {
                keyCointainer: [cjAchieveCompleted, cjAchieveUncompleted],
                keyIcon: cjIconMinionTurtly,
                textMsg: Language.GetText("accompanied by") + " " + ACHIEVEMENT_LIMIT.turtlyLimit + " " + Language.GetText("turtlies"),
                textIncomeTarget: "(" + TOP_TURTLE + "/" + ACHIEVEMENT_LIMIT.turtlyLimit + ")",
                coinAward: 100,
                current: TOP_TURTLE,
                limit: ACHIEVEMENT_LIMIT.turtlyLimit
            },
            {
                keyCointainer: [cjAchieveCompleted, cjAchieveUncompleted],
                keyIcon: cjIconObstacleLaser,
                textMsg: Language.GetText("destroy") + " " + ACHIEVEMENT_LIMIT.laserLimit + " " + Language.GetText("lasers"),
                textIncomeTarget: "(" + LASER_COUNTER.toLocaleString() + "/" + ACHIEVEMENT_LIMIT.laserLimit + ")",
                coinAward: 100,
                current: LASER_COUNTER,
                limit: ACHIEVEMENT_LIMIT.laserLimit
            },
            {
                keyCointainer: [cjAchieveCompleted, cjAchieveUncompleted],
                keyIcon: cjIconObstacleEnemy,
                textMsg: Language.GetText("defeat") + " " + ACHIEVEMENT_LIMIT.enemyLimit + " " + Language.GetText("enemies"),
                textIncomeTarget: "(" + ENEMY_COUNTER.toLocaleString() + "/" + ACHIEVEMENT_LIMIT.enemyLimit + ")",
                coinAward: 100,
                current: ENEMY_COUNTER,
                limit: ACHIEVEMENT_LIMIT.enemyLimit
            },
            {
                keyCointainer: [cjAchieveCompleted, cjAchieveUncompleted],
                keyIcon: cjIconObstacleStatic,
                textMsg: Language.GetText("destroy") + " " + ACHIEVEMENT_LIMIT.staticLimit + " " + Language.GetText("static_baton"),
                textIncomeTarget: "(" + STATIC_COUNTER.toLocaleString() + "/" + ACHIEVEMENT_LIMIT.staticLimit + ")",
                coinAward: 100,
                current: STATIC_COUNTER,
                limit: ACHIEVEMENT_LIMIT.staticLimit
            },
            {
                keyCointainer: [cjAchieveCompleted, cjAchieveUncompleted],
                keyIcon: cjIconObstacleRocket,
                textMsg: Language.GetText("destroy") + " " + ACHIEVEMENT_LIMIT.rocketLimit + " " + Language.GetText("rockets"),
                textIncomeTarget: "(" + ROCKET_COUNTER.toLocaleString() + "/" + ACHIEVEMENT_LIMIT.rocketLimit + ")",
                coinAward: 100,
                current: ROCKET_COUNTER,
                limit: ACHIEVEMENT_LIMIT.rocketLimit
            },
            {
                keyCointainer: [cjAchieveCompleted, cjAchieveUncompleted],
                keyIcon: cjIconObstacleSpike,
                textMsg: Language.GetText("destroy") + " " + ACHIEVEMENT_LIMIT.spikeLimit + " " + Language.GetText("spikes"),
                textIncomeTarget: "(" + SPIKE_COUNTER.toLocaleString() + "/" + ACHIEVEMENT_LIMIT.spikeLimit + ")",
                coinAward: 100,
                current: SPIKE_COUNTER,
                limit: ACHIEVEMENT_LIMIT.spikeLimit
            }
        ];
        _this.arrayAchieve = [];
        _this.adjustY = -124;
        _this.drawRect();
        _this.drawAchievement();
        _this.drawMouseWheel();
        return _this;
    }
    AchievementScreen.prototype.drawMouseWheel = function () {
        var _this = this;
        var deltaY = 77.3;
        game.input.mouse.onMouseWheel = function (event) {
            if (event.wheelDelta < 0) {
                _this.buttonScroll.y += deltaY;
            }
            else {
                _this.buttonScroll.y += -deltaY;
            }
            if (_this.buttonScroll.y <= _this.minScroll)
                _this.buttonScroll.y = _this.minScroll;
            if (_this.buttonScroll.y >= _this.maxScroll)
                _this.buttonScroll.y = _this.maxScroll;
            _this.deltaScroll = _this.buttonScroll.y - _this.minScroll;
            _this.containerItem.y = _this.initYContainerItem - (_this.arrayAchieve[_this.arrayAchieve.length - 1].y / (_this.maxScroll + _this.adjustY)) * _this.deltaScroll;
        };
    };
    AchievementScreen.prototype.drawRect = function () {
        var rect = new Phaser.Graphics(game, 0, 0);
        rect.beginFill(0x000000, 0.7);
        rect.drawRect(0, 0, GAMEWIDTH, GAMEHEIGHT);
        rect.endFill();
        this.addChild(rect);
    };
    AchievementScreen.prototype.drawAchievement = function () {
        this.container = game.add.image(halfGameWidth, halfGameHeight, cjBoardEarth);
        this.container.anchor.setTo(0.5);
        this.addChild(this.container);
        var title = game.add.bitmapText(0, -this.container.height * 0.43, font_90, Language.GetText("scroll_of_earth"), 55);
        title.anchor.setTo(0.5);
        this.container.addChild(title);
        this.drawButtonClose();
        this.drawUI();
        this.drawScroll();
        this.drawAchieves();
        this.drawMaskItem();
        // this.drawContains();
    };
    AchievementScreen.prototype.drawMaskItem = function () {
        this.maskTop = new Phaser.Graphics(game, 0, 0);
        this.maskTop.beginFill(0, 0.7);
        this.maskTop.drawRect(200, 156.1, 590, 347.5);
        this.maskTop.endFill();
        this.addChild(this.maskTop);
    };
    AchievementScreen.prototype.drawScroll = function () {
        var _this = this;
        var containerScroll = game.add.image(this.container.width * 0.31, 45, cjAchieveBarScroll);
        containerScroll.anchor.setTo(0.5);
        this.container.addChild(containerScroll);
        this.buttonScroll = game.add.button(820.7, this.minScroll, cjAchieveButtonScroll);
        this.buttonScroll.onInputDown.add(function () {
            _this.pointerStatus = "down";
        });
        this.buttonScroll.onInputUp.add(function () {
            _this.pointerStatus = "up";
        });
        this.buttonScroll.anchor.setTo(0.5);
        this.addChild(this.buttonScroll);
    };
    AchievementScreen.prototype.drawUI = function () {
        var adjustYStart = 9;
        var start = game.add.image(-this.container.width * 0.295, -this.container.height * 0.29 - adjustYStart, cjAchieveIconStart);
        start.anchor.setTo(0.5);
        this.container.addChild(start);
        var startText = game.add.bitmapText(-this.container.width * 0.27, -this.container.height * 0.28 - adjustYStart, font_72_brown, Language.GetText("trophies"), 45);
        startText.anchor.setTo(0, 0.5);
        this.container.addChild(startText);
        adjustYStart = 3.5;
        var coin = game.add.image(this.container.width * 0.287, -this.container.height * 0.3 + adjustYStart, cjAchieveIconCoin);
        coin.anchor.setTo(0.5);
        this.container.addChild(coin);
        this.coinText = game.add.bitmapText(this.container.width * 0.26, -this.container.height * 0.3 + adjustYStart, font_72_brown, COIN_COUNTER + "", 45);
        this.coinText.anchor.setTo(1, 0.5);
        this.container.addChild(this.coinText);
    };
    AchievementScreen.prototype.drawAchieves = function () {
        this.containerItem = game.add.image(halfGameWidth - 20, 209, cjBlank);
        this.addChild(this.containerItem);
        var startPosX = 0;
        var startPosY = 0;
        var spaceY = 115;
        for (var i = 0; i < 15; i++) {
            var item = new ItemAchievement(startPosX, startPosY + i * spaceY, (this.itemData[i].current >= this.itemData[i].limit) ? this.itemData[i].keyCointainer[0] : this.itemData[i].keyCointainer[1], this.itemData[i].keyIcon, this.itemData[i].textMsg, (this.itemData[i].current >= this.itemData[i].limit) ? Language.GetText("unlock") : this.itemData[i].textIncomeTarget, this.itemData[i].coinAward, (this.itemData[i].current >= this.itemData[i].limit) ? true : false);
            item.anchor.setTo(0.5);
            this.containerItem.addChild(item);
            this.arrayAchieve.push(item);
        }
        this.initYContainerItemSet();
    };
    AchievementScreen.prototype.initYContainerItemSet = function () {
        this.initYContainerItem = this.containerItem.y;
    };
    AchievementScreen.prototype.drawButtonClose = function () {
        var _this = this;
        this.btnClose = new ButtonCustom(this.container.width * 0.4, -this.container.height * 0.43, cjButtonClose, "", 0, 0, 0, function () {
            SoundPlayer.playSFX(SoundPlayer.CLICK);
            _this.btnClose.isClicked = true;
            new Delay(300, function () {
                _this.destroy();
                TitleScreen.Instance.enableInputBtns();
                PAUSED = false;
            });
            StoragePlayer.save(SAVE_CLAIM, STATUS_CLAIM);
        });
        this.btnClose.anchor.setTo(0.5);
        this.container.addChild(this.btnClose);
    };
    AchievementScreen.prototype.selectTextMomoOrTurtly = function (nameChild, value, target) {
        if (target === void 0) { target = 0; }
        var text = "";
        switch (value) {
            case 999999999999999999999999:
                text = Language.GetText(nameChild) + " " + Language.GetText("reaches") + " " + Language.GetText("invulnerability");
                break;
            default:
                text = Language.GetText("accompanied by") + " " + value + "/" + target + " " + Language.GetText(nameChild);
                break;
        }
        return text;
    };
    AchievementScreen.prototype.drawContains = function () {
        var array = [cjMagentIcon, cjInvincibleIcon, cjIconDistance, cjIconDragonFire, cjIconDragonEarth, cjDoubleIcon, cjIconDiamond, cjIconSpeed, cjIconMinionMomo, cjIconMinionTurtly, cjIconObstacleLaser, cjIconObstacleEnemy, cjIconObstacleStatic, cjIconObstacleRocket, cjIconObstacleSpike];
        var arrayText = [Language.GetText("hit") + " " + MAGNET_COUNTER.toLocaleString() + "/" + ACHIEVEMENT_LIMIT.magnetLimit + " " + Language.GetText("magnets"), Language.GetText("hit") + " " + SHIELD_COUNTER.toLocaleString() + "/" + ACHIEVEMENT_LIMIT.shieldLimit + " " + Language.GetText("shields"), Language.GetText("reaches") + " " + METER_COUNTER.toLocaleString() + "/" + ACHIEVEMENT_LIMIT.distanceLimit.toLocaleString() + " " + Language.GetText("meters"), Language.GetText("hit") + " " + FIRE_DRAGON_COUNTER.toLocaleString() + "/" + ACHIEVEMENT_LIMIT.fireLimit + " " + Language.GetText("fire_dragons"), Language.GetText("hit") + " " + EARTH_DRAGON_COUNTER.toLocaleString() + "/" + ACHIEVEMENT_LIMIT.earthLimit + " " + Language.GetText("earth_dragons"), Language.GetText("earn") + " " + COIN_COUNTER.toLocaleString() + "/" + ACHIEVEMENT_LIMIT.coinLimit.toLocaleString() + " " + Language.GetText("coin"), Language.GetText("earn") + " " + DIAMOND_COUNTER.toLocaleString() + "/" + ACHIEVEMENT_LIMIT.diamondLimit.toLocaleString() + " " + Language.GetText("diamonds"), Language.GetText("reach") + " " + TOP_SPEED.toFixed(2) + "/" + ACHIEVEMENT_LIMIT.speedLimit + " " + Language.GetText("mph"), this.selectTextMomoOrTurtly("momos", TOP_MOMO, ACHIEVEMENT_LIMIT.momoLimit), this.selectTextMomoOrTurtly("turtlies", TOP_TURTLE, ACHIEVEMENT_LIMIT.turtlyLimit), Language.GetText("destroy") + " " + LASER_COUNTER.toLocaleString() + "/" + ACHIEVEMENT_LIMIT.laserLimit + " " + Language.GetText("lasers"), Language.GetText("defeat") + " " + ENEMY_COUNTER.toLocaleString() + "/" + ACHIEVEMENT_LIMIT.enemyLimit + " " + Language.GetText("enemies"), Language.GetText("destroy") + " " + STATIC_COUNTER.toLocaleString() + "/" + ACHIEVEMENT_LIMIT.staticLimit + " " + Language.GetText("static_baton"), Language.GetText("destroy") + " " + ROCKET_COUNTER.toLocaleString() + "/" + ACHIEVEMENT_LIMIT.rocketLimit + " " + Language.GetText("rockets"), Language.GetText("destroy") + " " + SPIKE_COUNTER.toLocaleString() + "/" + ACHIEVEMENT_LIMIT.spikeLimit + " " + Language.GetText("spikes")];
        var startPosX = -this.container.width * 0.4 + 10;
        var startPosY = -131;
        var spaceX = 200;
        var spaceY = 150;
        var counter = 0;
        for (var index = 0; index < 3; index++) {
            for (var i = 0; i < 5; i++) {
                var icon = new IconAchievement(startPosX + i * spaceX, startPosY + index * spaceY, array[counter], arrayText[counter], 20, counter);
                icon.anchor.setTo(0.5);
                this.container.addChild(icon);
                counter++;
            }
        }
    };
    AchievementScreen.prototype.update = function () {
        this.scrollingItem();
        this.trackItemMasking();
        this.trackCoinText();
        this.trackPointerInsideRectMask();
    };
    AchievementScreen.prototype.trackPointerInsideRectMask = function () {
        if (this.checkInside()) {
            for (var i = 0; i < this.arrayAchieve.length; i++) {
                if (this.arrayAchieve[i].buttonClaim != null) {
                    this.arrayAchieve[i].buttonClaim.inputEnabled = true;
                    this.arrayAchieve[i].buttonClaim.input.useHandCursor = true;
                }
            }
        }
        else {
            for (var i = 0; i < this.arrayAchieve.length; i++) {
                if (this.arrayAchieve[i].buttonClaim != null) {
                    this.arrayAchieve[i].buttonClaim.inputEnabled = false;
                }
            }
        }
    };
    AchievementScreen.prototype.checkInside = function () {
        var lx = 590;
        var ly = 347.5;
        var startPosX = 200;
        var startPosY = 156.1;
        var poligon = [
            {
                x: startPosX,
                y: startPosY,
            },
            {
                x: startPosX + lx,
                y: startPosY
            },
            {
                x: startPosX + lx,
                y: startPosY + ly
            },
            {
                x: startPosX,
                y: startPosY + ly
            },
        ];
        var n = poligon.length;
        var p = {
            x: game.input.x,
            y: game.input.y
        };
        if (TitleScreen.Instance.isInside(poligon, n, p)) {
            return true;
        }
        else {
            return false;
        }
    };
    AchievementScreen.prototype.trackCoinText = function () {
        this.coinText.setText(COIN_COUNTER + "");
    };
    AchievementScreen.prototype.trackItemMasking = function () {
        for (var i = 0; i < this.arrayAchieve.length; i++) {
            this.arrayAchieve[i].mask = this.maskTop;
        }
    };
    AchievementScreen.prototype.scrollingItem = function () {
        if (this.pointerStatus == "down") {
            this.buttonScroll.y = game.input.y;
            if (this.buttonScroll.y <= this.minScroll)
                this.buttonScroll.y = this.minScroll;
            if (this.buttonScroll.y >= this.maxScroll)
                this.buttonScroll.y = this.maxScroll;
            this.deltaScroll = this.buttonScroll.y - this.minScroll;
            this.containerItem.y = this.initYContainerItem - (this.arrayAchieve[this.arrayAchieve.length - 1].y / (this.maxScroll + this.adjustY)) * this.deltaScroll;
        }
    };
    return AchievementScreen;
}(Phaser.Image));
var ConfirmReset = /** @class */ (function (_super) {
    __extends(ConfirmReset, _super);
    function ConfirmReset() {
        var _this = _super.call(this, game, 0, 0, cjBlank) || this;
        _this.drawRect();
        // this.drawContainer();
        _this.drawConfrimReset();
        return _this;
    }
    ConfirmReset.prototype.drawConfrimReset = function () {
        var _this = this;
        this.containerConfirm = game.add.image(halfGameWidth, halfGameHeight, cjSmallSetting);
        this.containerConfirm.anchor.setTo(0.5);
        this.addChild(this.containerConfirm);
        var title = game.add.bitmapText(0, -this.containerConfirm.height * 0.41, font_36_white, Language.GetText("confirm"), 27);
        title.anchor.setTo(0.5);
        this.containerConfirm.addChild(title);
        var startPosY = -25;
        var spaceY = 90;
        this.btnNo = new ButtonCustom(0, startPosY, cjButtonOrage, Language.GetText("no"), 30, 0, 0, function () {
            SoundPlayer.playSFX(SoundPlayer.CLICK);
            _this.btnNo.isClicked = true;
            new Delay(300, function () {
                _this.destroy();
                TitleScreen.Instance.spawnChoice();
            });
        }, font_36_white);
        this.btnNo.anchor.setTo(0.5);
        this.containerConfirm.addChild(this.btnNo);
        this.btnYes = new ButtonCustom(0, startPosY + spaceY, cjButtonGreen, Language.GetText("yes"), 30, 0, 0, function () {
            SoundPlayer.playSFX(SoundPlayer.CLICK);
            _this.btnYes.isClicked = true;
            new Delay(300, function () {
                METER_COUNTER = 0;
                StoragePlayer.resetAll();
                TitleScreen.Instance.transitionOut(RunControl.NAME);
            });
        }, font_36_white);
        this.btnYes.anchor.setTo(0.5);
        this.containerConfirm.addChild(this.btnYes);
    };
    ConfirmReset.prototype.drawRect = function () {
        this.rect = new Phaser.Graphics(game, 0, 0);
        this.rect.beginFill(0x000000, 0.5);
        this.rect.drawRect(0, 0, GAMEWIDTH, GAMEHEIGHT);
        this.rect.endFill();
        this.addChild(this.rect);
    };
    return ConfirmReset;
}(Phaser.Image));
var QuizScreen = /** @class */ (function (_super) {
    __extends(QuizScreen, _super);
    function QuizScreen() {
        var _this = _super.call(this, game, 0, 0, cjBlank) || this;
        _this.distanceCounter = 0;
        _this.distanceMax = 0;
        _this.arrayBars = [];
        _this.arrayButton = [];
        _this.lenghtArray = 4;
        _this.timerMax = 30000;
        _this.timerCounter = 0;
        _this.isAnswered = false;
        _this.isFinishAnimateIn = false;
        _this.isTimeOut = true;
        _this.getDataQuiz();
        _this.drawBoard();
        _this.drawButtons();
        _this.drawBar();
        _this.animateIn();
        return _this;
    }
    QuizScreen.prototype.getDataQuiz = function () {
        var random = Math.floor(Math.random() * 4);
        this.quizContent = new BankQuiz(EXPONENT_QUIZ);
    };
    QuizScreen.prototype.drawBar = function () {
        var posX = 115;
        var posY = 230;
        var runBarFrame = game.add.image(posX, posY, cjBarTimer);
        runBarFrame.anchor.setTo(0.5);
        this.addChild(runBarFrame);
        runBarFrame.alpha = 0;
        this.runBarFill = game.add.image(posX, posY, cjFillBarTimer);
        this.runBarFill.anchor.setTo(0.5);
        this.addChild(this.runBarFill);
        this.runBarFill.alpha = 0;
        this.maskBar = new Phaser.Graphics(game, posX, posY);
        this.addChild(this.maskBar);
        this.arrayBars.push(runBarFrame);
        this.arrayBars.push(this.runBarFill);
    };
    QuizScreen.prototype.drawButtons = function () {
        var _this = this;
        var posY = GAMEHEIGHT - 150;
        this.containerButton = game.add.image(0, posY, cjBlank);
        this.addChild(this.containerButton);
        var sizeNumber = 70;
        var _loop_2 = function (index) {
            btn = new ButtonCustom(0, 0, cjButtonChoice, this_2.quizContent.arrayOption[index] + "", sizeNumber, 0, -30, function () {
                SoundPlayer.playSFX(SoundPlayer.CLICK);
                _this.arrayButton[index].isClicked = true;
                _this.checkAnswer(_this.arrayButton[index].text);
            }, font_72_white);
            btn.anchor.setTo(0.5);
            this_2.containerButton.addChild(btn);
            this_2.arrayButton.push(btn);
        };
        var this_2 = this, btn;
        for (var index = 0; index < this.lenghtArray; index++) {
            _loop_2(index);
        }
        var totalWidth = 0;
        for (var i = 0; i < this.arrayButton.length; i++) {
            totalWidth += this.arrayButton[i].width;
        }
        var startPosX = (GAMEWIDTH - totalWidth) / 2;
        var spaceX = this.arrayButton[0].width;
        for (var i = 0; i < this.arrayButton.length; i++) {
            this.arrayButton[i].alpha = 0;
            this.arrayButton[i].x = startPosX + i * spaceX + this.arrayButton[i].width * 0.5;
            this.arrayButton[i].y = this.arrayButton[i].height * 0.5;
        }
    };
    QuizScreen.prototype.checkAnswer = function (val) {
        if (this.quizContent.valueAnswer == val)
            RunControl.Instance.showResponse(Language.GetText("correct"), RESPONSE_CORRECT);
        else
            RunControl.Instance.showResponse(Language.GetText("incorrect"), RESPONSE_INCORRECT);
    };
    QuizScreen.prototype.drawBoard = function () {
        var startPosX = halfGameWidth;
        var startPosY = 0;
        this.board = game.add.image(startPosX, startPosY, cjBoard);
        this.board.anchor.setTo(0.5);
        this.addChild(this.board);
        var quizText;
        var sizeNumber = 70;
        if (this.quizContent.typeQuiz == EXPONENT_QUIZ) {
            var arrayNumber = this.quizContent.quiz.split(",");
            quizText = new Exponent(0, 0, font_72_white, arrayNumber[0], sizeNumber, arrayNumber[1], sizeNumber - 25);
            quizText.x = -(quizText.exponentText.width + quizText.eq.width) / 2;
        }
        else {
            quizText = game.add.bitmapText(0, 0, font_72_white, this.quizContent.quiz, sizeNumber);
        }
        quizText.anchor.setTo(0.5);
        this.board.addChild(quizText);
    };
    QuizScreen.prototype.animateIn = function () {
        var _this = this;
        var posY = 235;
        var duration = 1000;
        game.add.tween(this.board).to({ y: posY }, duration, Phaser.Easing.Bounce.Out, true);
        for (var i = 0; i < this.arrayButton.length; i++) {
            game.add.tween(this.arrayButton[i]).to({ alpha: 1 }, duration, Phaser.Easing.Linear.None, true, duration);
        }
        for (var i = 0; i < this.arrayBars.length; i++) {
            game.add.tween(this.arrayBars[i]).to({ alpha: 1 }, duration, Phaser.Easing.Linear.None, true, duration * 2).onComplete.addOnce(function () { _this.isFinishAnimateIn = true; });
        }
    };
    QuizScreen.prototype.update = function () {
        if (PAUSED)
            return;
        this.trackBar();
        this.trackTimer();
    };
    QuizScreen.prototype.trackTimer = function () {
        if (!this.isFinishAnimateIn)
            return;
        if (this.isAnswered)
            return;
        this.timerCounter += game.time.elapsedMS;
        if (this.timerCounter >= this.timerMax) {
            this.timerCounter = this.timerMax;
            this.runTimeOut();
        }
    };
    QuizScreen.prototype.runTimeOut = function () {
        if (!this.isTimeOut)
            return;
        RunControl.Instance.showResponse(Language.GetText("timeout"), RESPONSE_TIMEOUT);
        this.isTimeOut = false;
    };
    QuizScreen.prototype.trackBar = function () {
        this.maskBar.clear();
        this.maskBar.beginFill(0, 0.7);
        this.maskBar.drawRect(-this.runBarFill.width * 0.5, this.runBarFill.height * 0.5, this.runBarFill.width, -this.runBarFill.height + (this.timerCounter / this.timerMax) * this.runBarFill.height);
        this.maskBar.endFill();
        this.runBarFill.mask = this.maskBar;
    };
    return QuizScreen;
}(Phaser.Image));
var Reset = /** @class */ (function (_super) {
    __extends(Reset, _super);
    function Reset() {
        var _this = _super.call(this, game, 0, 0, cjBlank) || this;
        _this.drawRect();
        _this.drawReset();
        return _this;
    }
    Reset.prototype.drawReset = function () {
        var _this = this;
        this.container = game.add.image(halfGameWidth, halfGameHeight, cjSmallSetting);
        this.container.anchor.setTo(0.5);
        this.addChild(this.container);
        var title = game.add.bitmapText(0, -this.container.height * 0.41, font_36_white, Language.GetText("option"), 35);
        title.anchor.setTo(0.5);
        this.container.addChild(title);
        var startPosY = -25;
        var spaceY = 90;
        this.btnReset = new ButtonCustom(0, startPosY, cjButtonOrage, Language.GetText("reset"), 30, 0, 0, function () {
            SoundPlayer.playSFX(SoundPlayer.CLICK);
            _this.btnReset.isClicked = true;
            new Delay(300, function () {
                _this.destroy();
                TitleScreen.Instance.spawnConfrimReset();
            });
        }, font_36_white);
        this.btnReset.anchor.setTo(0.5);
        this.container.addChild(this.btnReset);
        this.btnContinue = new ButtonCustom(0, startPosY + spaceY, cjButtonGreen, Language.GetText("continue"), 30, 0, 0, function () {
            SoundPlayer.playSFX(SoundPlayer.CLICK);
            _this.btnContinue.isClicked = true;
            new Delay(300, function () {
                TitleScreen.Instance.transitionOut(RunControl.NAME);
            });
        }, font_36_white);
        this.btnContinue.anchor.setTo(0.5);
        this.container.addChild(this.btnContinue);
    };
    Reset.prototype.drawRect = function () {
        this.rect = new Phaser.Graphics(game, 0, 0);
        this.rect.beginFill(0x000000, 0.5);
        this.rect.drawRect(0, 0, GAMEWIDTH, GAMEHEIGHT);
        this.rect.endFill();
        this.addChild(this.rect);
    };
    return Reset;
}(Phaser.Image));
var ResultScreen = /** @class */ (function (_super) {
    __extends(ResultScreen, _super);
    function ResultScreen() {
        var _this = _super.call(this, game, 0, 0) || this;
        _this.coinFactor = 0;
        _this.coinCurrent = 0;
        _this.meterFactor = 0;
        _this.meterCurrent = 0;
        _this.enemyFactor = 0;
        _this.enemyCurrent = 0;
        _this.hourFactor = 0;
        _this.hourCurrent = 0;
        _this.minuteFactor = 0;
        _this.minuteCurrent = 0;
        _this.secondFactor = 0;
        _this.secondCurrent = 0;
        _this.deathFactor = 0;
        _this.deathCurrent = 0;
        _this.saveData();
        _this.coinFactor = COIN_COUNTER / 60;
        _this.meterFactor = METER_COUNTER / 60;
        _this.enemyFactor = ENEMY_COUNTER / 60;
        _this.deathFactor = DEATH_COUNTER / 60;
        SECOND_COUNTER = Math.floor(TIMER_COUNTER % 60);
        MINUTE_COUNTER = Math.floor((TIMER_COUNTER % 3600) / 60);
        HOUR_COUNTER = Math.floor(TIMER_COUNTER / 3600);
        _this.hourFactor = HOUR_COUNTER / 60;
        _this.minuteFactor = MINUTE_COUNTER / 60;
        _this.secondFactor = SECOND_COUNTER / 60;
        _this.drawRect();
        _this.drawResult();
        return _this;
    }
    ResultScreen.prototype.saveData = function () {
        StoragePlayer.save(SAVE_MOMO, MOMO_COUNTER);
        StoragePlayer.save(SAVE_TURTLE, TURTLE_COUNTER);
        StoragePlayer.save(SAVE_DEATH, DEATH_COUNTER);
        StoragePlayer.save(SAVE_COIN, COIN_COUNTER);
        StoragePlayer.save(SAVE_MAGNET, MAGNET_COUNTER);
        StoragePlayer.save(SAVE_SHIELD, SHIELD_COUNTER);
        StoragePlayer.save(SAVE_FIRE, FIRE_DRAGON_COUNTER);
        StoragePlayer.save(SAVE_EARTH, EARTH_DRAGON_COUNTER);
        StoragePlayer.save(SAVE_DIAMOND, DIAMOND_COUNTER);
        StoragePlayer.save(SAVE_LASER, LASER_COUNTER);
        StoragePlayer.save(SAVE_ENEMY, ENEMY_COUNTER);
        StoragePlayer.save(SAVE_STATIC, STATIC_COUNTER);
        StoragePlayer.save(SAVE_ROCKET, ROCKET_COUNTER);
        StoragePlayer.save(SAVE_SPIKE, SPIKE_COUNTER);
        StoragePlayer.save(SAVE_ACHIEVEMENT, ACHIEVEMENT_COUNTER);
        StoragePlayer.save(SAVE_SKINS, ARRAY_SKINS);
        StoragePlayer.save(SAVE_CLAIM, STATUS_CLAIM);
        StoragePlayer.save(SAVE_ONCERUN_ACH, ONCERUN_ACH);
        if (StoragePlayer.load(SAVE_TOP_SPEED)) {
            var maxSpeed = SPEEDALL > SPEED_RUSH ? SPEEDALL : SPEED_RUSH;
            if (maxSpeed > StoragePlayer.load(SAVE_TOP_SPEED)) {
                StoragePlayer.save(SAVE_TOP_SPEED, maxSpeed);
            }
        }
        else {
            StoragePlayer.save(SAVE_TOP_SPEED, SPEEDALL > SPEED_RUSH ? TOP_SPEED = SPEEDALL : TOP_SPEED = SPEED_RUSH);
        }
        StoragePlayer.save(SAVE_TOP_METER, METER_COUNTER > TOP_METER ? TOP_METER = METER_COUNTER : TOP_METER);
        StoragePlayer.save(SAVE_TOP_MOMO, MOMO_COUNTER > TOP_MOMO ? TOP_MOMO = MOMO_COUNTER : TOP_MOMO);
        StoragePlayer.save(SAVE_TOP_TURTLE, TURTLE_COUNTER > TOP_TURTLE ? TOP_TURTLE = TURTLE_COUNTER : TOP_TURTLE);
    };
    ResultScreen.prototype.drawResult = function () {
        var _this = this;
        this.container = game.add.image(halfGameWidth, 0, cjBlankScroll);
        this.container.anchor.setTo(0.5);
        this.addChild(this.container);
        this.transitionIn(this.container);
        var title = game.add.bitmapText(0, -this.container.height * 0.435, font_72_brown, Language.GetText("results"), 50);
        title.anchor.setTo(0.5);
        this.container.addChild(title);
        var startPosX = -141;
        var startPosY = 197;
        var spaceX = 281;
        var sizeNumber = 33;
        var btnFont = font_36_white;
        this.buttonHome = new ButtonCustom(startPosX, startPosY, cjButtonGreen, Language.GetText("home"), sizeNumber, 0, 0, function () {
            SoundPlayer.playSFX(SoundPlayer.CLICK);
            _this.buttonHome.isClicked = true;
            new Delay(300, function () {
                _this.destroy();
                game.state.start(TitleScreen.NAME);
                GAMEOVER = false;
                READY = false;
                shieldCounter = shieldMax = 0;
                doubleCounter = doubleMax = 0;
                magnetCounter = magnetMax = 0;
                STATUS_REVIVE = false;
            });
        }, btnFont);
        this.buttonHome.anchor.setTo(0.5);
        this.container.addChild(this.buttonHome);
        this.buttonRetry = new ButtonCustom(startPosX + spaceX, startPosY, cjButtonGreen, Language.GetText("retry"), sizeNumber, 0, 0, function () {
            SoundPlayer.playSFX(SoundPlayer.CLICK);
            _this.buttonRetry.isClicked = true;
            new Delay(300, function () {
                _this.destroy();
                game.state.start(RunControl.NAME);
                GAMEOVER = false;
                READY = false;
                shieldCounter = shieldMax = 0;
                doubleCounter = doubleMax = 0;
                magnetCounter = magnetMax = 0;
                STATUS_REVIVE = false;
            });
        }, btnFont);
        this.buttonRetry.anchor.setTo(0.5);
        this.container.addChild(this.buttonRetry);
        var posX = -250;
        var posY = -133;
        var gapX = 470;
        var gapY = 65;
        var adjustX = 35;
        var numberSize = 40;
        var fontText = font_36_brown;
        var factorScale = 0.7;
        if (HIDDEN_ICON_RESULTSCREEN) {
            posY = -95;
            gapX = 537;
            gapY = 45;
        }
        var coinText = game.add.bitmapText(posX, posY, fontText, Language.GetText("coins") + " " + Language.GetText("earned"), numberSize);
        coinText.anchor.setTo(0, 0.5);
        this.container.addChild(coinText);
        this.coinCounter = game.add.bitmapText(posX + gapX - adjustX, posY, fontText, 10000 + "", numberSize);
        this.coinCounter.anchor.setTo(1, 0.5);
        this.container.addChild(this.coinCounter);
        if (!HIDDEN_ICON_RESULTSCREEN) {
            var coinImg = game.add.image(posX + gapX, posY, cjDoubleIcon);
            coinImg.anchor.setTo(0.5);
            coinImg.scale.setTo(factorScale);
            this.container.addChild(coinImg);
        }
        var distanceText = game.add.bitmapText(posX, posY + gapY, fontText, Language.GetText("distance"), numberSize);
        distanceText.anchor.setTo(0, 0.5);
        this.container.addChild(distanceText);
        this.meterCounter = game.add.bitmapText(posX + gapX - adjustX, posY + gapY, fontText, 10000 + "", numberSize);
        this.meterCounter.anchor.setTo(1, 0.5);
        this.container.addChild(this.meterCounter);
        if (!HIDDEN_ICON_RESULTSCREEN) {
            var meterIcon = game.add.image(posX + gapX, posY + gapY, cjIconDistance);
            meterIcon.anchor.setTo(0.5);
            meterIcon.scale.setTo(factorScale);
            this.container.addChild(meterIcon);
        }
        var timeElapsed = game.add.bitmapText(posX, posY + gapY * 2, fontText, Language.GetText("time_elapsed"), numberSize);
        timeElapsed.anchor.setTo(0, 0.5);
        this.container.addChild(timeElapsed);
        this.timerElapsed = game.add.bitmapText(posX + gapX - adjustX, posY + gapY * 2, fontText, 10 + "", numberSize);
        this.timerElapsed.anchor.setTo(1, 0.5);
        this.container.addChild(this.timerElapsed);
        if (!HIDDEN_ICON_RESULTSCREEN) {
            var meterIcon = game.add.image(posX + gapX, posY + gapY * 2, cjIconSpeed);
            meterIcon.anchor.setTo(0.5);
            meterIcon.scale.setTo(factorScale);
            this.container.addChild(meterIcon);
        }
        var obstacleText = game.add.bitmapText(posX, posY + gapY * 3, fontText, Language.GetText("obstacles"), numberSize);
        obstacleText.anchor.setTo(0, 0.5);
        this.container.addChild(obstacleText);
        this.enemyCounter = game.add.bitmapText(posX + gapX - adjustX, posY + gapY * 3, fontText, 100 + "", numberSize);
        this.enemyCounter.anchor.setTo(1, 0.5);
        this.container.addChild(this.enemyCounter);
        if (!HIDDEN_ICON_RESULTSCREEN) {
            var obstacleIcon = game.add.image(posX + gapX, posY + gapY * 3, cjIconObstacleSpike);
            obstacleIcon.anchor.setTo(0.5);
            obstacleIcon.scale.setTo(factorScale);
            this.container.addChild(obstacleIcon);
        }
        var attemptText = game.add.bitmapText(posX, posY + gapY * 4, fontText, Language.GetText("attempt"), numberSize);
        attemptText.anchor.setTo(0, 0.5);
        this.container.addChild(attemptText);
        this.deathCounter = game.add.bitmapText(posX + gapX - adjustX, posY + gapY * 4, fontText, 100 + "", numberSize);
        this.deathCounter.anchor.setTo(1, 0.5);
        this.container.addChild(this.deathCounter);
        if (!HIDDEN_ICON_RESULTSCREEN) {
            var attemptIcon = game.add.image(posX + gapX, posY + gapY * 4, cjIconDeath);
            attemptIcon.anchor.setTo(0.5);
            attemptIcon.scale.setTo(factorScale);
            this.container.addChild(attemptIcon);
        }
    };
    ResultScreen.prototype.drawRect = function () {
        var rect = new Phaser.Graphics(game, 0, 0);
        rect.beginFill(0x000000, 0.3);
        rect.drawRect(0, 0, GAMEWIDTH, GAMEHEIGHT);
        rect.endFill();
        this.addChild(rect);
    };
    ResultScreen.prototype.transitionIn = function (obj) {
        game.add.tween(obj).to({ y: (GAMEHEIGHT) * 0.5 }, 500, Phaser.Easing.Back.Out, true);
    };
    ResultScreen.prototype.transitionOut = function (obj) {
        game.add.tween(obj).to({ alpha: 0 }, 500, Phaser.Easing.Quadratic.Out, true);
        game.add.tween(obj).to({ y: (GAMEHEIGHT - 495) * 0.5 - 500 }, 500, Phaser.Easing.Back.In, true);
    };
    ResultScreen.prototype.update = function () {
        this.counterNumber();
        this.trackNumber();
    };
    ResultScreen.prototype.trackNumber = function () {
        this.coinCounter.setText(Math.ceil(this.coinCurrent) + "");
        this.meterCounter.setText(Math.ceil(this.meterCurrent) + "");
        this.enemyCounter.setText(Math.ceil(this.enemyCurrent) + "");
        var text = (HOUR_COUNTER < 10 ? "0" + Math.ceil(this.hourCurrent) + ":" : Math.ceil(this.hourCurrent) + ":") + (MINUTE_COUNTER < 10 ? "0" + Math.ceil(this.minuteCurrent) + ":" : Math.ceil(this.minuteCurrent) + ":") + (SECOND_COUNTER < 10 ? "0" + Math.ceil(this.secondCurrent) : Math.ceil(this.secondCurrent) + "");
        if (HOUR_COUNTER == 0)
            text = (MINUTE_COUNTER < 10 ? "0" + Math.ceil(this.minuteCurrent) + ":" : Math.ceil(this.minuteCurrent) + ":") + (SECOND_COUNTER < 10 ? "0" + Math.ceil(this.secondCurrent) : Math.ceil(this.secondCurrent) + "");
        this.timerElapsed.setText(text);
        this.deathCounter.setText(Math.ceil(this.deathCurrent) + "");
    };
    ResultScreen.prototype.counterNumber = function () {
        if (this.deathCurrent < DEATH_COUNTER) {
            this.deathCurrent += this.deathFactor;
            if (this.deathCurrent > DEATH_COUNTER) {
                this.deathCurrent = DEATH_COUNTER;
            }
        }
        if (this.coinCurrent < COIN_COUNTER) {
            this.coinCurrent += this.coinFactor;
            if (this.coinCurrent > COIN_COUNTER) {
                this.coinCurrent = COIN_COUNTER;
            }
        }
        if (this.meterCurrent < METER_COUNTER) {
            this.meterCurrent += this.meterFactor;
            if (this.meterCurrent > METER_COUNTER) {
                this.meterCurrent = METER_COUNTER;
            }
        }
        if (this.enemyCurrent < ENEMY_COUNTER) {
            this.enemyCurrent += this.enemyFactor;
            if (this.enemyCurrent > ENEMY_COUNTER) {
                this.enemyCurrent = ENEMY_COUNTER;
            }
        }
        if (this.hourCurrent < HOUR_COUNTER) {
            this.hourCurrent += this.hourFactor;
            if (this.hourCurrent > HOUR_COUNTER) {
                this.hourCurrent = HOUR_COUNTER;
            }
        }
        if (this.minuteCurrent < MINUTE_COUNTER) {
            this.minuteCurrent += this.minuteFactor;
            if (this.minuteCurrent > MINUTE_COUNTER) {
                this.minuteCurrent = MINUTE_COUNTER;
            }
        }
        if (this.secondCurrent < SECOND_COUNTER) {
            this.secondCurrent += this.secondFactor;
            if (this.secondCurrent > SECOND_COUNTER) {
                this.secondCurrent = SECOND_COUNTER;
            }
        }
    };
    return ResultScreen;
}(Phaser.Sprite));
var Revive = /** @class */ (function (_super) {
    __extends(Revive, _super);
    function Revive() {
        var _this = _super.call(this, game, 0, 0, cjBlank) || this;
        _this.drawRect();
        _this.drawText();
        game.input.onDown.addOnce(function () {
            _this.destroy();
            RunControl.Instance.enableInputBtns();
            RunControl.Instance.player.statePos = ANIMATION_WALK;
            RunControl.Instance.player.getHit();
            RunControl.Instance.player.velY = 3;
            RunControl.Instance.player.isActive = true;
            RunControl.Instance.player.isBlooding = true;
            RunControl.Instance.player.tempX = 0;
            RunControl.Instance.player.tempY = 0;
            RunControl.Instance.player.gravitationY = 0;
            RunControl.Instance.player.forceDown = 0.01;
            RunControl.Instance.player.distance = 0;
            RunControl.Instance.player.forceDownMultiplier = 0.1;
            RunControl.Instance.player.speed = 5;
            RunControl.Instance.player.arrayPosY = [];
            RunControl.Instance.player.isRoll = false;
            RunControl.Instance.player.angular = 5;
            RunControl.Instance.player.counterBouncing = 0;
            RunControl.Instance.player.forceAngle = 0;
            RunControl.Instance.player.targetPosY = GAMEHEIGHT - 110;
            RunControl.Instance.player.isResult = true;
            RunControl.Instance.timerInvulnerablePlayer = LONG_INVULNERABILITY;
            GAMEOVER = false;
            new Delay(300, function () { STATUS_REVIVE = false; });
        });
        return _this;
    }
    Revive.prototype.drawRect = function () {
        var rect = new Phaser.Graphics(game, 0, 0);
        rect.beginFill(0x000000, 0.3);
        rect.drawRect(0, 0, GAMEWIDTH, GAMEHEIGHT);
        rect.endFill();
        this.addChild(rect);
    };
    Revive.prototype.drawText = function () {
        var text = game.add.bitmapText(halfGameWidth, halfGameHeight, font_36_white, Language.GetText("revive"), 30);
        text.anchor.setTo(0.5);
        this.addChild(text);
    };
    return Revive;
}(Phaser.Image));
var SettingScreen = /** @class */ (function (_super) {
    __extends(SettingScreen, _super);
    function SettingScreen(isSimple) {
        if (isSimple === void 0) { isSimple = true; }
        var _this = _super.call(this, game, 0, 0, cjBlank) || this;
        _this.isSimple = isSimple;
        _this.drawRect();
        _this.drawSettings();
        _this.loadSound();
        return _this;
    }
    SettingScreen.prototype.drawRect = function () {
        this.rect = new Phaser.Graphics(game, 0, 0);
        this.rect.beginFill(0x000000, 0.5);
        this.rect.drawRect(0, 0, GAMEWIDTH, GAMEHEIGHT);
        this.rect.endFill();
        this.addChild(this.rect);
    };
    SettingScreen.prototype.drawSettings = function () {
        var _this = this;
        this.container = game.add.image(halfGameWidth, halfGameHeight, cjSetting);
        this.container.anchor.setTo(0.5);
        this.addChild(this.container);
        var title = game.add.bitmapText(0, -this.container.height * 0.41, font_36_white, Language.GetText("paused"), 35);
        title.anchor.setTo(0.5);
        this.container.addChild(title);
        this.btnClose = new ButtonCustom(this.container.width * 0.413, 0, cjButtonClose, "", 0, 0, 0);
        this.btnClose.anchor.setTo(0.5);
        title.addChild(this.btnClose);
        var startPosY = -71;
        var spaceY = 55;
        if (!this.isSimple) {
            startPosY = -97;
            spaceY = 45;
        }
        var sizeNumber = 33;
        this.btnBGM = new ButtonCustom(0, startPosY, cjButtonGreen, Language.GetText("bgm_on"), sizeNumber, 0, 0, function () {
            SoundPlayer.playSFX(SoundPlayer.CLICK);
            _this.bgmClicked();
        }, font_36_white);
        this.btnBGM.anchor.setTo(0.5);
        this.container.addChild(this.btnBGM);
        this.btnSFX = new ButtonCustom(0, startPosY + spaceY * 2, cjButtonGreen, Language.GetText("sfx_on"), sizeNumber, 0, 0, function () {
            SoundPlayer.playSFX(SoundPlayer.CLICK);
            _this.sfxClicked();
        }, font_36_white);
        this.btnSFX.anchor.setTo(0.5);
        this.container.addChild(this.btnSFX);
        if (this.isSimple) {
            var btnMoreGames = new ButtonCustom(0, startPosY + spaceY * 4, cjButtonGreen, Language.GetText("moregames"), sizeNumber - 10, 0, 0, function () {
                SoundPlayer.playSFX(SoundPlayer.CLICK);
                btnMoreGames.isClicked = true;
                new Delay(300, function () {
                    window.open("https://armor.ag/MoreGames", "_blank");
                });
            }, font_36_white);
            btnMoreGames.anchor.setTo(0.5);
            this.container.addChild(btnMoreGames);
        }
        else {
            var btnHome = new ButtonCustom(0, startPosY + spaceY * 4, cjButtonGreen, Language.GetText("home"), sizeNumber, 0, 0, function () {
                SoundPlayer.playSFX(SoundPlayer.CLICK);
                btnHome.isClicked = true;
                new Delay(300, function () {
                    _this.destroy();
                    PAUSED = false;
                    READY = false;
                    shieldCounter = shieldMax = 0;
                    doubleCounter = doubleMax = 0;
                    magnetCounter = magnetMax = 0;
                    game.state.start(TitleScreen.NAME);
                });
            }, font_36_white);
            btnHome.anchor.setTo(0.5);
            this.container.addChild(btnHome);
            var btnRetry = new ButtonCustom(0, startPosY + spaceY * 6, cjButtonGreen, Language.GetText("retry"), sizeNumber, 0, 0, function () {
                SoundPlayer.playSFX(SoundPlayer.CLICK);
                btnRetry.isClicked = true;
                new Delay(300, function () {
                    _this.destroy();
                    PAUSED = false;
                    READY = false;
                    shieldCounter = shieldMax = 0;
                    doubleCounter = doubleMax = 0;
                    magnetCounter = magnetMax = 0;
                    game.state.start(RunControl.NAME);
                });
            }, font_36_white);
            btnRetry.anchor.setTo(0.5);
            this.container.addChild(btnRetry);
        }
    };
    SettingScreen.prototype.loadSound = function () {
        if (StoragePlayer.load(SAVE_BGM) == "muted") {
            this.btnBGM.text = Language.GetText("bgm_off");
            this.btnBGM.loadTexture(cjButtonOrage);
        }
        else if (StoragePlayer.load(SAVE_BGM) == "unmuted") {
            this.btnBGM.text = Language.GetText("bgm_on");
            this.btnBGM.loadTexture(cjButtonGreen);
        }
        if (StoragePlayer.load(SAVE_SFX) == "muted") {
            this.btnSFX.text = Language.GetText("sfx_off");
            this.btnSFX.loadTexture(cjButtonOrage);
        }
        else if (StoragePlayer.load(SAVE_SFX) == "unmuted") {
            this.btnSFX.text = Language.GetText("sfx_on");
            this.btnSFX.loadTexture(cjButtonGreen);
        }
    };
    SettingScreen.prototype.bgmClicked = function () {
        if (this.btnBGM.text == Language.GetText("bgm_on")) {
            this.btnBGM.text = Language.GetText("bgm_off");
            this.btnBGM.loadTexture(cjButtonOrage);
            this.btnBGM.isClicked = true;
            SoundPlayer.muteBGM(SoundPlayer.BGM);
            StoragePlayer.save(SAVE_BGM, "muted");
        }
        else {
            this.btnBGM.text = Language.GetText("bgm_on");
            this.btnBGM.loadTexture(cjButtonGreen);
            this.btnBGM.isClicked = true;
            this.game.sound.mute = false;
            SoundPlayer.unmuteBGM(SoundPlayer.BGM);
            StoragePlayer.save(SAVE_BGM, "unmuted");
        }
    };
    SettingScreen.prototype.sfxClicked = function () {
        if (this.btnSFX.text == Language.GetText("sfx_on")) {
            this.btnSFX.text = Language.GetText("sfx_off");
            this.btnSFX.loadTexture(cjButtonOrage);
            this.btnSFX.isClicked = true;
            SoundPlayer.muteSFX();
            StoragePlayer.save(SAVE_SFX, "muted");
        }
        else {
            this.btnSFX.text = Language.GetText("sfx_on");
            this.btnSFX.loadTexture(cjButtonGreen);
            this.btnSFX.isClicked = true;
            SoundPlayer.unmuteSFX();
            StoragePlayer.save(SAVE_SFX, "unmuted");
        }
    };
    return SettingScreen;
}(Phaser.Image));
var Shopping = /** @class */ (function (_super) {
    __extends(Shopping, _super);
    function Shopping() {
        var _this = _super.call(this, game, 0, 0, cjBlank) || this;
        _this.pointerStatus = "up";
        _this.minScroll = 176;
        _this.maxScroll = 490;
        _this.arrayKeyIcon = [
            cjMagentIcon,
            cjInvincibleIcon,
            cjIconDiamond,
            cjForwardIcon,
            cjHeartIcon,
            cjIconDragonFire,
            cjIconDragonEarth,
            cjIconSpeed,
            cjIconMinionMomo,
            cjIconMinionTurtly
        ];
        _this.arrayUpgradeItem = [];
        _this.adjustY = -86.5;
        _this.drawRect();
        _this.drawShops();
        // this.drawEdgeTile();
        _this.drawMouseWheel();
        return _this;
    }
    Shopping.prototype.drawMouseWheel = function () {
        var _this = this;
        var deltaY = 10;
        game.input.mouse.onMouseWheel = function (event) {
            if (event.wheelDelta < 0) {
                _this.buttonScroll.y += deltaY;
            }
            else {
                _this.buttonScroll.y += -deltaY;
            }
            if (_this.buttonScroll.y <= _this.minScroll)
                _this.buttonScroll.y = _this.minScroll;
            if (_this.buttonScroll.y >= _this.maxScroll)
                _this.buttonScroll.y = _this.maxScroll;
            _this.deltaScroll = _this.buttonScroll.y - _this.minScroll;
            _this.containerItem.y = _this.initYContainerItem - (_this.arrayUpgradeItem[_this.arrayUpgradeItem.length - 1].y / (_this.maxScroll + _this.adjustY)) * _this.deltaScroll;
        };
    };
    Shopping.prototype.drawEdgeTile = function () {
        var x = 200;
        var y = 156.1;
        var lx = 590;
        var ly = 347.5;
        var gra = game.add.graphics(0, 0);
        gra.lineStyle(3, 0xff0000);
        gra.moveTo(x, y);
        gra.lineTo(x + lx, y);
        gra.lineTo(x + lx, y + ly);
        gra.lineTo(x, y + ly);
        gra.lineTo(x, y);
        gra.alpha = 1;
        this.addChild(gra);
    };
    Shopping.prototype.drawShops = function () {
        this.container = game.add.image(halfGameWidth, halfGameHeight, cjBoardFire);
        this.container.anchor.setTo(0.5);
        this.addChild(this.container);
        var title = game.add.bitmapText(0, -this.container.height * 0.43, font_90, Language.GetText("scroll_of_fire"), 55);
        title.anchor.setTo(0.5);
        this.container.addChild(title);
        this.drawUI();
        this.drawScroll();
        this.drawUpgradeItems();
        this.drawMaskItem();
        this.drawButtonClose();
        // this.drawContains();
    };
    Shopping.prototype.drawMaskItem = function () {
        this.maskTop = new Phaser.Graphics(game, 0, 0);
        this.maskTop.beginFill(0, 0.7);
        this.maskTop.drawRect(200, 156.1, 590, 347.5);
        this.maskTop.endFill();
        this.addChild(this.maskTop);
    };
    Shopping.prototype.drawScroll = function () {
        var _this = this;
        var containerScroll = game.add.image(this.container.width * 0.31, 45, cjAchieveBarScroll);
        containerScroll.anchor.setTo(0.5);
        this.container.addChild(containerScroll);
        this.buttonScroll = game.add.button(820.7, this.minScroll, cjAchieveButtonScroll);
        this.buttonScroll.onInputDown.add(function () {
            _this.pointerStatus = "down";
        });
        this.buttonScroll.onInputUp.add(function () {
            _this.pointerStatus = "up";
        });
        this.buttonScroll.anchor.setTo(0.5);
        this.addChild(this.buttonScroll);
    };
    Shopping.prototype.drawButtonClose = function () {
        this.buttonStart = new ButtonCustom(this.container.width * 0.5, this.container.height - 15, cjButtonGreen, Language.GetText("start"), 35, 0, 0, null, font_36_white);
        this.buttonStart.anchor.setTo(0.5);
        this.addChild(this.buttonStart);
    };
    Shopping.prototype.drawUI = function () {
        var adjustYStart = 9;
        var upgradeIcon = game.add.image(-this.container.width * 0.295, -this.container.height * 0.29 - adjustYStart, cjUpgradeIcon);
        upgradeIcon.anchor.setTo(0.5);
        this.container.addChild(upgradeIcon);
        var upgradeText = game.add.bitmapText(-this.container.width * 0.27, -this.container.height * 0.28 - adjustYStart, font_72_brown, Language.GetText("upgrades"), 45);
        upgradeText.anchor.setTo(0, 0.5);
        this.container.addChild(upgradeText);
        adjustYStart = 3.5;
        var coin = game.add.image(this.container.width * 0.287, -this.container.height * 0.3 + adjustYStart, cjAchieveIconCoin);
        coin.anchor.setTo(0.5);
        this.container.addChild(coin);
        this.coinText = game.add.bitmapText(this.container.width * 0.26, -this.container.height * 0.3 + adjustYStart, font_72_brown, COIN_COUNTER + "", 45);
        this.coinText.anchor.setTo(1, 0.5);
        this.container.addChild(this.coinText);
    };
    Shopping.prototype.drawUpgradeItems = function () {
        this.containerItem = game.add.image(halfGameWidth - 20, 209, cjBlank);
        this.addChild(this.containerItem);
        var startPosX = 0;
        var startPosY = 0;
        var spaceY = 115;
        for (var i = 0; i < 10; i++) {
            var upgrade = new ItemUpgrade(startPosX, startPosY + i * spaceY, this.arrayKeyIcon[i], i);
            upgrade.anchor.setTo(0.5);
            upgrade.shop = this;
            this.containerItem.addChild(upgrade);
            this.arrayUpgradeItem.push(upgrade);
            arrayUpgrade[i].button = upgrade.buttonUpgrade;
            arrayUpgrade[i].progress = upgrade;
        }
        this.initYContainerItemSet();
        this.resetStatus();
    };
    Shopping.prototype.initYContainerItemSet = function () {
        this.initYContainerItem = this.containerItem.y;
    };
    Shopping.prototype.doUpgrade = function (index) {
        var element = arrayUpgrade[index];
        if (!this.checkEnableBuy(element)) {
            SoundPlayer.playSFX(SoundPlayer.CLICKFAIL);
            RunControl.Instance.loadDataSavedSFX();
            return;
        }
        var price = element.price[element.current];
        element.current++;
        if (typeof price == "number") {
            COIN_COUNTER -= price;
            if (FOLLOW_RISE) {
                element.price[element.current] = price + INCREMENT_PRICE;
                this.increasePrice(price + INCREMENT_PRICE);
            }
        }
        if (!FOLLOW_RISE)
            element.button.text = element.price[element.current] + "";
        element.progress.distanceCounter = element.current;
        element.progress.distanceMax = element.max;
    };
    Shopping.prototype.increasePrice = function (nil) {
        PRICE_COUNTER = nil;
        var array = arrayUpgrade;
        for (var i = 0; i < array.length; i++) {
            for (var j = 0; j < 5; j++) {
                arrayUpgrade[i].price[j] = nil;
            }
            arrayUpgrade[i].button.text = arrayUpgrade[i].price[0].toLocaleString() + "";
            if (arrayUpgrade[i].current == 5)
                arrayUpgrade[i].button.text = "Max";
        }
    };
    Shopping.prototype.checkEnableBuy = function (element) {
        if (element.current >= element.max) {
            element.button.enableBuy = false;
            return false;
        }
        if (element.price[element.current] > COIN_COUNTER) {
            element.button.enableBuy = false;
            return false;
        }
        if (element.current >= element.price.length - 1) {
            element.button.enableBuy = false;
            return false;
        }
        return true;
    };
    Shopping.prototype.resetStatus = function () {
        var array = arrayUpgrade;
        for (var i = 0; i < array.length; i++) {
            var element = array[i];
            element.button.text = element.price[element.current] + "";
            element.progress.distanceCounter = element.current;
            element.progress.distanceMax = element.max;
        }
    };
    Shopping.prototype.drawRect = function () {
        this.rect = new Phaser.Graphics(game, 0, 0);
        this.rect.beginFill(0x000000, 0.7);
        this.rect.drawRect(0, 0, GAMEWIDTH, GAMEHEIGHT);
        this.rect.endFill();
        this.addChild(this.rect);
    };
    Shopping.prototype.update = function () {
        this.trackValCoin();
        this.trackItemMasking();
        this.scrollingItem();
        this.trackPointerInsideRectMask();
    };
    Shopping.prototype.trackPointerInsideRectMask = function () {
        if (this.checkInside()) {
            for (var i = 0; i < this.arrayUpgradeItem.length; i++) {
                this.arrayUpgradeItem[i].buttonUpgrade.inputEnabled = true;
                this.arrayUpgradeItem[i].buttonUpgrade.input.useHandCursor = true;
            }
        }
        else {
            for (var i = 0; i < this.arrayUpgradeItem.length; i++) {
                this.arrayUpgradeItem[i].buttonUpgrade.inputEnabled = false;
            }
        }
    };
    Shopping.prototype.checkInside = function () {
        var lx = 590;
        var ly = 347.5;
        var startPosX = 200;
        var startPosY = 156.1;
        var poligon = [
            {
                x: startPosX,
                y: startPosY,
            },
            {
                x: startPosX + lx,
                y: startPosY
            },
            {
                x: startPosX + lx,
                y: startPosY + ly
            },
            {
                x: startPosX,
                y: startPosY + ly
            },
        ];
        var n = poligon.length;
        var p = {
            x: game.input.x,
            y: game.input.y
        };
        if (RunControl.Instance.isInside(poligon, n, p)) {
            return true;
        }
        else {
            return false;
        }
    };
    Shopping.prototype.scrollingItem = function () {
        if (this.pointerStatus == "down") {
            this.buttonScroll.y = game.input.y;
            if (this.buttonScroll.y <= this.minScroll)
                this.buttonScroll.y = this.minScroll;
            if (this.buttonScroll.y >= this.maxScroll)
                this.buttonScroll.y = this.maxScroll;
            this.deltaScroll = this.buttonScroll.y - this.minScroll;
            this.containerItem.y = this.initYContainerItem - (this.arrayUpgradeItem[this.arrayUpgradeItem.length - 1].y / (this.maxScroll + this.adjustY)) * this.deltaScroll;
        }
    };
    Shopping.prototype.trackItemMasking = function () {
        for (var i = 0; i < this.arrayUpgradeItem.length; i++) {
            this.arrayUpgradeItem[i].mask = this.maskTop;
        }
    };
    Shopping.prototype.trackValCoin = function () {
        this.coinText.setText(COIN_COUNTER.toLocaleString() + "");
    };
    Shopping.prototype.drawUIBack = function () {
        this.buttonStart = new ButtonCustom(GAMEWIDTH - 130, 55, cjButtonClose, Language.GetText("start"), 35, 0, 0, null, font_36_white);
        this.buttonStart.anchor.setTo(0.5);
        this.addChild(this.buttonStart);
        this.coin = game.add.image(-this.container.width * 0.5 + 43, -this.container.height * 0.41, cjCoinShop);
        this.coin.anchor.setTo(0.5);
        this.container.addChild(this.coin);
        this.coinText = game.add.bitmapText(this.coin.width * 0.5 + 10, -this.coin.height * 0.5 - 5, font_90, COIN_COUNTER + "", 50);
        this.coin.addChild(this.coinText);
    };
    Shopping.prototype.drawContains = function () {
        var _this = this;
        var startPosX = -this.container.width * 0.417;
        var startPosY = -110.9;
        var spaceX = 165;
        var spaceY = 75;
        var adjustX = 0;
        var adjustY = 20;
        var magnetIcon = game.add.image(startPosX, startPosY, cjMagentIcon);
        magnetIcon.anchor.setTo(0.5);
        this.container.addChild(magnetIcon);
        var progress0 = new StatusUpgrade(startPosX + spaceX + adjustX, startPosY - adjustY);
        progress0.anchor.setTo(0.5);
        this.container.addChild(progress0);
        var sizeNumber = 33;
        var buttonBuy0 = new ButtonCustom(startPosX + spaceX * 2.15, startPosY, cjButtonBuy, "100", sizeNumber, 0, 0, function () {
            _this.btnClicked0();
            buttonBuy0.isClicked = true;
        }, font_36_white, true);
        buttonBuy0.anchor.setTo(0.5);
        this.container.addChild(buttonBuy0);
        var icon = game.add.image(-buttonBuy0.width * 0.5, 0, cjCoinIcon);
        icon.anchor.setTo(0.5);
        buttonBuy0.addChild(icon);
        var invincibleIcon = game.add.image(startPosX, startPosY + spaceY, cjInvincibleIcon);
        invincibleIcon.anchor.setTo(0.5);
        this.container.addChild(invincibleIcon);
        var progress1 = new StatusUpgrade(startPosX + spaceX + adjustX, startPosY + spaceY - adjustY);
        progress1.anchor.setTo(0.5);
        this.container.addChild(progress1);
        var buttonBuy1 = new ButtonCustom(startPosX + spaceX * 2.15, startPosY + spaceY, cjButtonBuy, "100", sizeNumber, 0, 0, function () {
            _this.btnClicked1();
            buttonBuy1.isClicked = true;
        }, font_36_white, true);
        buttonBuy1.anchor.setTo(0.5);
        this.container.addChild(buttonBuy1);
        var icon = game.add.image(-buttonBuy1.width * 0.5, 0, cjCoinIcon);
        icon.anchor.setTo(0.5);
        buttonBuy1.addChild(icon);
        var doubleIcon = game.add.image(startPosX, startPosY + spaceY * 2, cjIconDiamond);
        doubleIcon.anchor.setTo(0.5);
        this.container.addChild(doubleIcon);
        var progress2 = new StatusUpgrade(startPosX + spaceX + adjustX, startPosY + spaceY * 2 - adjustY);
        progress2.anchor.setTo(0.5);
        this.container.addChild(progress2);
        var buttonBuy2 = new ButtonCustom(startPosX + spaceX * 2.15, startPosY + spaceY * 2, cjButtonBuy, "100", sizeNumber, 0, 0, function () {
            _this.btnClicked2();
            buttonBuy2.isClicked = true;
        }, font_36_white, true);
        buttonBuy2.anchor.setTo(0.5);
        this.container.addChild(buttonBuy2);
        var icon = game.add.image(-buttonBuy2.width * 0.5, 0, cjCoinIcon);
        icon.anchor.setTo(0.5);
        buttonBuy2.addChild(icon);
        var forwardIcon = game.add.image(startPosX, startPosY + spaceY * 3, cjForwardIcon);
        forwardIcon.anchor.setTo(0.5);
        this.container.addChild(forwardIcon);
        var progress3 = new StatusUpgrade(startPosX + spaceX + adjustX, startPosY + spaceY * 3 - adjustY);
        progress3.anchor.setTo(0.5);
        this.container.addChild(progress3);
        var buttonBuy3 = new ButtonCustom(startPosX + spaceX * 2.15, startPosY + spaceY * 3, cjButtonBuy, "100", sizeNumber, 0, 0, function () {
            _this.btnClicked3();
            buttonBuy3.isClicked = true;
        }, font_36_white, true);
        buttonBuy3.anchor.setTo(0.5);
        this.container.addChild(buttonBuy3);
        var icon = game.add.image(-buttonBuy3.width * 0.5, 0, cjCoinIcon);
        icon.anchor.setTo(0.5);
        buttonBuy3.addChild(icon);
        var heartIcon = game.add.image(startPosX, startPosY + spaceY * 4, cjHeartIcon);
        heartIcon.anchor.setTo(0.5);
        this.container.addChild(heartIcon);
        var progress4 = new StatusUpgrade(startPosX + spaceX + adjustX, startPosY + spaceY * 4 - adjustY);
        progress4.anchor.setTo(0.5);
        this.container.addChild(progress4);
        var buttonBuy4 = new ButtonCustom(startPosX + spaceX * 2.15, startPosY + spaceY * 4, cjButtonBuy, "100", sizeNumber, 0, 0, function () {
            _this.btnClicked4();
            buttonBuy4.isClicked = true;
        }, font_36_white, true);
        buttonBuy4.anchor.setTo(0.5);
        this.container.addChild(buttonBuy4);
        var icon = game.add.image(-buttonBuy4.width * 0.5, 0, cjCoinIcon);
        icon.anchor.setTo(0.5);
        buttonBuy4.addChild(icon);
        var startPosX = 55;
        var dragonFire = game.add.image(startPosX, startPosY, cjIconDragonFire);
        dragonFire.anchor.setTo(0.5);
        this.container.addChild(dragonFire);
        var progress5 = new StatusUpgrade(startPosX + spaceX + adjustX, startPosY - adjustY);
        progress5.anchor.setTo(0.5);
        this.container.addChild(progress5);
        var sizeNumber = 33;
        var buttonBuy5 = new ButtonCustom(startPosX + spaceX * 2.15, startPosY, cjButtonBuy, "100", sizeNumber, 0, 0, function () {
            _this.btnClicked5();
            buttonBuy5.isClicked = true;
        }, font_36_white, true);
        buttonBuy5.anchor.setTo(0.5);
        this.container.addChild(buttonBuy5);
        var icon = game.add.image(-buttonBuy5.width * 0.5, 0, cjCoinIcon);
        icon.anchor.setTo(0.5);
        buttonBuy5.addChild(icon);
        var dragonEarth = game.add.image(startPosX, startPosY + spaceY, cjIconDragonEarth);
        dragonEarth.anchor.setTo(0.5);
        this.container.addChild(dragonEarth);
        var progress6 = new StatusUpgrade(startPosX + spaceX + adjustX, startPosY + spaceY - adjustY);
        progress6.anchor.setTo(0.5);
        this.container.addChild(progress6);
        var buttonBuy6 = new ButtonCustom(startPosX + spaceX * 2.15, startPosY + spaceY, cjButtonBuy, "100", sizeNumber, 0, 0, function () {
            _this.btnClicked6();
            buttonBuy6.isClicked = true;
        }, font_36_white, true);
        buttonBuy6.anchor.setTo(0.5);
        this.container.addChild(buttonBuy6);
        var icon = game.add.image(-buttonBuy6.width * 0.5, 0, cjCoinIcon);
        icon.anchor.setTo(0.5);
        buttonBuy6.addChild(icon);
        var speedIcon = game.add.image(startPosX, startPosY + spaceY * 2, cjIconSpeed);
        speedIcon.anchor.setTo(0.5);
        this.container.addChild(speedIcon);
        var progress7 = new StatusUpgrade(startPosX + spaceX + adjustX, startPosY + spaceY * 2 - adjustY);
        progress7.anchor.setTo(0.5);
        this.container.addChild(progress7);
        var buttonBuy7 = new ButtonCustom(startPosX + spaceX * 2.15, startPosY + spaceY * 2, cjButtonBuy, "100", sizeNumber, 0, 0, function () {
            _this.btnClicked7();
            buttonBuy7.isClicked = true;
        }, font_36_white, true);
        buttonBuy7.anchor.setTo(0.5);
        this.container.addChild(buttonBuy7);
        var icon = game.add.image(-buttonBuy7.width * 0.5, 0, cjCoinIcon);
        icon.anchor.setTo(0.5);
        buttonBuy7.addChild(icon);
        var momoIcon = game.add.image(startPosX, startPosY + spaceY * 3, cjIconMinionMomo);
        momoIcon.anchor.setTo(0.5);
        this.container.addChild(momoIcon);
        var progress8 = new StatusUpgrade(startPosX + spaceX + adjustX, startPosY + spaceY * 3 - adjustY);
        progress8.anchor.setTo(0.5);
        this.container.addChild(progress8);
        var buttonBuy8 = new ButtonCustom(startPosX + spaceX * 2.15, startPosY + spaceY * 3, cjButtonBuy, "100", sizeNumber, 0, 0, function () {
            _this.btnClicked8();
            buttonBuy8.isClicked = true;
        }, font_36_white, true);
        buttonBuy8.anchor.setTo(0.5);
        this.container.addChild(buttonBuy8);
        var icon = game.add.image(-buttonBuy8.width * 0.5, 0, cjCoinIcon);
        icon.anchor.setTo(0.5);
        buttonBuy8.addChild(icon);
        var turtleIcon = game.add.image(startPosX, startPosY + spaceY * 4, cjIconMinionTurtly);
        turtleIcon.anchor.setTo(0.5);
        this.container.addChild(turtleIcon);
        var progress9 = new StatusUpgrade(startPosX + spaceX + adjustX, startPosY + spaceY * 4 - adjustY);
        progress9.anchor.setTo(0.5);
        this.container.addChild(progress9);
        var buttonBuy9 = new ButtonCustom(startPosX + spaceX * 2.15, startPosY + spaceY * 4, cjButtonBuy, "100", sizeNumber, 0, 0, function () {
            _this.btnClicked9();
            buttonBuy9.isClicked = true;
        }, font_36_white, true);
        buttonBuy9.anchor.setTo(0.5);
        this.container.addChild(buttonBuy9);
        var icon = game.add.image(-buttonBuy9.width * 0.5, 0, cjCoinIcon);
        icon.anchor.setTo(0.5);
        buttonBuy9.addChild(icon);
        var sizeText = 17;
        var posX = -progress0.runBarFill.width * 0.5;
        var iconText = game.add.bitmapText(posX, 11, font_36, Language.GetText("magnet_shop") + " " + Language.GetText("duration_by") + " " + arrayUpgrade[UPGRADE_MAGNET].factor[1] / IN_SECOND + "-" + arrayUpgrade[UPGRADE_MAGNET].factor[2] / IN_SECOND + "-" + arrayUpgrade[UPGRADE_MAGNET].factor[3] / IN_SECOND + "-" + arrayUpgrade[UPGRADE_MAGNET].factor[4] / IN_SECOND + "-" + arrayUpgrade[UPGRADE_MAGNET].factor[5] / IN_SECOND, sizeText);
        iconText.maxWidth = 170;
        progress0.addChild(iconText);
        var iconText = game.add.bitmapText(posX, 11, font_36, Language.GetText("shield_shop") + " " + Language.GetText("duration_by") + " " + arrayUpgrade[UPGRADE_MAGNET].factor[1] / IN_SECOND + "-" + arrayUpgrade[UPGRADE_SHIELD].factor[2] / IN_SECOND + "-" + arrayUpgrade[UPGRADE_SHIELD].factor[3] / IN_SECOND + "-" + arrayUpgrade[UPGRADE_SHIELD].factor[4] / IN_SECOND + "-" + arrayUpgrade[UPGRADE_SHIELD].factor[5] / IN_SECOND, sizeText);
        iconText.maxWidth = 170;
        progress1.addChild(iconText);
        var iconText = game.add.bitmapText(posX, 11, font_36, Language.GetText("diamond_shop") + " " + Language.GetText("duration_by") + " " + arrayUpgrade[UPGRADE_DOUBLE].factor[1] / IN_SECOND + "-" + arrayUpgrade[UPGRADE_DOUBLE].factor[2] / IN_SECOND + "-" + arrayUpgrade[UPGRADE_DOUBLE].factor[3] / IN_SECOND + "-" + arrayUpgrade[UPGRADE_DOUBLE].factor[4] / IN_SECOND + "-" + arrayUpgrade[UPGRADE_DOUBLE].factor[5] / IN_SECOND, sizeText);
        iconText.maxWidth = 170;
        progress2.addChild(iconText);
        var iconText = game.add.bitmapText(posX, 11, font_36, Language.GetText("flash_shop") + " " + Language.GetText("duration_by") + " " + arrayUpgrade[UPGRADE_FORWARD].factor[1] / IN_SECOND + "-" + arrayUpgrade[UPGRADE_FORWARD].factor[2] / IN_SECOND + "-" + arrayUpgrade[UPGRADE_FORWARD].factor[3] / IN_SECOND + "-" + arrayUpgrade[UPGRADE_FORWARD].factor[4] / IN_SECOND + "-" + arrayUpgrade[UPGRADE_FORWARD].factor[5] / IN_SECOND, sizeText);
        iconText.maxWidth = 170;
        progress3.addChild(iconText);
        var iconText = game.add.bitmapText(posX, 11, font_36, Language.GetText("life_shop") + " " + arrayUpgrade[UPGRADE_HEARTS].factor[1] + "-" + arrayUpgrade[UPGRADE_HEARTS].factor[2] + "-" + arrayUpgrade[UPGRADE_HEARTS].factor[3] + "-" + arrayUpgrade[UPGRADE_HEARTS].factor[4] + "-" + arrayUpgrade[UPGRADE_HEARTS].factor[5], sizeText);
        iconText.maxWidth = 170;
        progress4.addChild(iconText);
        var iconText = game.add.bitmapText(posX, 11, font_36, Language.GetText("dragon_fire_shop") + " " + arrayUpgrade[UPGRADE_DRAGON_FIRE].factor[1] + ", " + arrayUpgrade[UPGRADE_DRAGON_FIRE].factor[2] + ", " + arrayUpgrade[UPGRADE_DRAGON_FIRE].factor[3] + ", " + arrayUpgrade[UPGRADE_DRAGON_FIRE].factor[4] + ", " + arrayUpgrade[UPGRADE_DRAGON_FIRE].factor[5], sizeText);
        iconText.maxWidth = 177;
        progress5.addChild(iconText);
        var iconText = game.add.bitmapText(posX, 11, font_36, Language.GetText("dragon_earth_shop") + " " + arrayUpgrade[UPGRADE_DRAGON_EARTH].factor[1] + ", " + arrayUpgrade[UPGRADE_DRAGON_EARTH].factor[2] + ", " + arrayUpgrade[UPGRADE_DRAGON_EARTH].factor[3] + ", " + arrayUpgrade[UPGRADE_DRAGON_EARTH].factor[4] + ", " + arrayUpgrade[UPGRADE_DRAGON_EARTH].factor[5], sizeText);
        iconText.maxWidth = 187;
        progress6.addChild(iconText);
        var iconText = game.add.bitmapText(posX, 11, font_36, Language.GetText("speed_shop") + " " + arrayUpgrade[UPGRADE_SPEED].factor[1] * 100 + "%, " + arrayUpgrade[UPGRADE_SPEED].factor[2] * 100 + "%, " + arrayUpgrade[UPGRADE_SPEED].factor[3] * 100 + "%, " + arrayUpgrade[UPGRADE_SPEED].factor[4] * 100 + "%, " + arrayUpgrade[UPGRADE_SPEED].factor[5] * 100 + "%", sizeText);
        iconText.maxWidth = 187;
        progress7.addChild(iconText);
        var iconText = game.add.bitmapText(posX, 11, font_36, Language.GetText("momo_shop"), sizeText);
        iconText.maxWidth = 150;
        progress8.addChild(iconText);
        var iconText1 = game.add.bitmapText(posX, 28, font_36, Language.GetText("momo_shop_alt") + " " + arrayUpgrade[UPGRADE_MOMO].factor[0] + "," + arrayUpgrade[UPGRADE_MOMO].factor[1] + "," + arrayUpgrade[UPGRADE_MOMO].factor[2] + "," + arrayUpgrade[UPGRADE_MOMO].factor[3] + ",~ " + Language.GetText("life_point"), sizeText);
        iconText1.maxWidth = 180;
        progress8.addChild(iconText1);
        var iconText = game.add.bitmapText(posX, 11, font_36, Language.GetText("turtly_shop"), sizeText);
        iconText.maxWidth = 150;
        progress9.addChild(iconText);
        var iconText1 = game.add.bitmapText(posX, 28, font_36, Language.GetText("turtly_shop_alt") + " " + arrayUpgrade[UPGRADE_TURTLY].factor[0] + "," + arrayUpgrade[UPGRADE_TURTLY].factor[1] + "," + arrayUpgrade[UPGRADE_TURTLY].factor[2] + "," + arrayUpgrade[UPGRADE_TURTLY].factor[3] + ",~ " + Language.GetText("life_point"), sizeText);
        iconText1.maxWidth = 180;
        progress9.addChild(iconText1);
        arrayUpgrade[0].button = buttonBuy0;
        arrayUpgrade[1].button = buttonBuy1;
        arrayUpgrade[2].button = buttonBuy2;
        arrayUpgrade[3].button = buttonBuy3;
        arrayUpgrade[4].button = buttonBuy4;
        arrayUpgrade[0].progress = progress0;
        arrayUpgrade[1].progress = progress1;
        arrayUpgrade[2].progress = progress2;
        arrayUpgrade[3].progress = progress3;
        arrayUpgrade[4].progress = progress4;
        arrayUpgrade[5].button = buttonBuy5;
        arrayUpgrade[6].button = buttonBuy6;
        arrayUpgrade[7].button = buttonBuy7;
        arrayUpgrade[8].button = buttonBuy8;
        arrayUpgrade[9].button = buttonBuy9;
        arrayUpgrade[5].progress = progress5;
        arrayUpgrade[6].progress = progress6;
        arrayUpgrade[7].progress = progress7;
        arrayUpgrade[8].progress = progress8;
        arrayUpgrade[9].progress = progress9;
        this.resetStatus();
    };
    Shopping.prototype.btnClicked0 = function () { SoundPlayer.playSFX(SoundPlayer.CLICK); this.doUpgrade(UPGRADE_MAGNET); };
    Shopping.prototype.btnClicked1 = function () { SoundPlayer.playSFX(SoundPlayer.CLICK); this.doUpgrade(UPGRADE_SHIELD); };
    Shopping.prototype.btnClicked2 = function () { SoundPlayer.playSFX(SoundPlayer.CLICK); this.doUpgrade(UPGRADE_DOUBLE); };
    Shopping.prototype.btnClicked3 = function () { SoundPlayer.playSFX(SoundPlayer.CLICK); this.doUpgrade(UPGRADE_FORWARD); };
    Shopping.prototype.btnClicked4 = function () { SoundPlayer.playSFX(SoundPlayer.CLICK); this.doUpgrade(UPGRADE_HEARTS); };
    Shopping.prototype.btnClicked5 = function () { SoundPlayer.playSFX(SoundPlayer.CLICK); this.doUpgrade(UPGRADE_DRAGON_FIRE); };
    Shopping.prototype.btnClicked6 = function () { SoundPlayer.playSFX(SoundPlayer.CLICK); this.doUpgrade(UPGRADE_DRAGON_EARTH); };
    Shopping.prototype.btnClicked7 = function () { SoundPlayer.playSFX(SoundPlayer.CLICK); this.doUpgrade(UPGRADE_SPEED); };
    Shopping.prototype.btnClicked8 = function () { SoundPlayer.playSFX(SoundPlayer.CLICK); this.doUpgrade(UPGRADE_MOMO); };
    Shopping.prototype.btnClicked9 = function () { SoundPlayer.playSFX(SoundPlayer.CLICK); this.doUpgrade(UPGRADE_TURTLY); };
    return Shopping;
}(Phaser.Image));
var SkinScreen = /** @class */ (function (_super) {
    __extends(SkinScreen, _super);
    function SkinScreen() {
        var _this = _super.call(this, game, 0, 0, cjBlank) || this;
        _this.arrayButtons = [];
        _this.INF = 10000000;
        if (!MODE_CLOSE_BUTTON)
            _this.inputEnabled = false;
        _this.drawContainer();
        return _this;
        // this.drawEdgeTile();
        // this.drawArc();
    }
    SkinScreen.prototype.disableInputButtons = function () {
        var array = this.arrayButtons;
        for (var index = 0; index < array.length; index++) {
            var element = array[index];
            element.buttonInfo.inputEnabled = false;
        }
    };
    SkinScreen.prototype.enableInputButtons = function () {
        var array = this.arrayButtons;
        for (var index = 0; index < array.length; index++) {
            if (ARRAY_SKINS[index] != 0) {
                array[index].buttonInfo.inputEnabled = true;
                array[index].buttonInfo.input.useHandCursor = true;
            }
        }
    };
    SkinScreen.prototype.drawArc = function () {
        this.graphicsCircle = new Phaser.Graphics(game, 0, 0);
        this.graphicsCircle.beginFill(0xff0000);
        this.graphicsCircle.drawCircle(0, 0, 10);
        this.graphicsCircle.endFill();
        this.arrayButtons[0].buttonInfo.addChild(this.graphicsCircle);
    };
    SkinScreen.prototype.drawEdgeTile = function () {
        var x = -this.arrayButtons[0].buttonInfo.width * 0.5;
        var y = -this.arrayButtons[0].buttonInfo.height * 0.5;
        var lx = this.arrayButtons[0].buttonInfo.width;
        var ly = this.arrayButtons[0].buttonInfo.height;
        var gra = game.add.graphics(0, 0);
        gra.lineStyle(3, 0xff0000);
        gra.moveTo(x, y);
        gra.lineTo(x + lx, y);
        gra.lineTo(x + lx, y + ly);
        gra.lineTo(x, y + ly);
        gra.lineTo(x, y);
        gra.alpha = 1;
        this.arrayButtons[0].addChild(gra);
    };
    SkinScreen.prototype.drawContainer = function () {
        this.container = game.add.image(halfGameWidth, halfGameHeight, cjScreenFullBank);
        this.container.anchor.setTo(0.5);
        this.addChild(this.container);
        var title = game.add.bitmapText(0, -this.container.height * 0.41, font_90, Language.GetText("scroll_of_wind"), 55);
        title.anchor.setTo(0.5);
        this.container.addChild(title);
        this.drawButtonClose();
        this.drawContains();
    };
    SkinScreen.prototype.drawButtonClose = function () {
        var _this = this;
        this.btnClose = new ButtonCustom(this.container.width * 0.45, -this.container.height * 0.407, cjButtonClose, "", 0, 0, 0, function () {
            SoundPlayer.playSFX(SoundPlayer.CLICK);
            StoragePlayer.save(SAVE_SKINS, ARRAY_SKINS);
            _this.btnClose.isClicked = true;
            new Delay(300, function () {
                _this.destroy();
                TitleScreen.Instance.enableInputBtns();
                PAUSED = false;
            });
        });
        this.btnClose.anchor.setTo(0.5);
        this.container.addChild(this.btnClose);
    };
    SkinScreen.prototype.drawContains = function () {
        var array = [Language.GetText("wind_player"), Language.GetText("angel_player"), Language.GetText("shadow_player")];
        var arrayKey = [cjWingPlayer, cjAnglePlayer, cjShadowPlayer];
        var arrayInfo = [4 + " " + Language.GetText("achievements") + " " + Language.GetText("unlock"), 8 + " " + Language.GetText("achievements") + " " + Language.GetText("unlock"), 12 + " " + Language.GetText("achievements") + " " + Language.GetText("unlock")];
        var spaceX = 335;
        for (var i = 0; i < 3; i++) {
            var card = new cardSkinPlayer(-this.container.width * 0.45 + spaceX * i, -this.container.height * 0.275, array[i], arrayKey[i], arrayInfo[i]);
            this.container.addChild(card);
            this.arrayButtons.push(card);
        }
    };
    SkinScreen.prototype.update = function () {
        this.detectChangeTitleButton();
        if (MODE_CLOSE_BUTTON) {
            this.enableInputButtons();
            return;
        }
        if (this.trackInsideAreaButton()) {
            this.inputEnabled = false;
            this.enableInputButtons();
        }
        else {
            this.inputEnabled = true;
            // this.input.useHandCursor = true;
            this.disableInputButtons();
        }
    };
    SkinScreen.prototype.detectChangeTitleButton = function () {
        var array = this.arrayButtons;
        for (var index = 0; index < array.length; index++) {
            switch (ARRAY_SKINS[index]) {
                case 0:
                    array[index].buttonInfo.text = Language.GetText("lock");
                    array[index].buttonInfo.text = Language.GetText("lock");
                    break;
                case 1:
                    array[index].buttonInfo.text = Language.GetText("use");
                    array[index].buttonInfo.text = Language.GetText("use");
                    break;
                case 2:
                    array[index].buttonInfo.text = Language.GetText("used");
                    array[index].buttonInfo.text = Language.GetText("used");
                    break;
            }
        }
    };
    SkinScreen.prototype.trackInsideAreaButton = function () {
        if (this.arrayButtons.length == 0)
            return;
        var array = this.arrayButtons;
        for (var index = 0; index < array.length; index++) {
            var element = array[index];
            if (this.checkInside(element)) {
                return true;
            }
        }
        return false;
    };
    SkinScreen.prototype.checkInside = function (element) {
        var adjusX = -element.buttonInfo.width * 0.5;
        var adjusY = -element.buttonInfo.height * 0.5;
        var lx = element.buttonInfo.width;
        var ly = element.buttonInfo.height;
        var startPosX = element.parent.x + element.x + element.buttonInfo.x + adjusX;
        var startPosY = element.parent.y + element.y + element.buttonInfo.y + adjusY;
        var poligon = [
            {
                x: startPosX,
                y: startPosY,
            },
            {
                x: startPosX + lx,
                y: startPosY
            },
            {
                x: startPosX + lx,
                y: startPosY + ly
            },
            {
                x: startPosX,
                y: startPosY + ly
            },
        ];
        var n = poligon.length;
        var p = {
            x: game.input.x,
            y: game.input.y
        };
        if (this.isInside(poligon, n, p)) {
            return true;
        }
        else {
            return false;
        }
    };
    SkinScreen.prototype.onSegment = function (p, q, r) {
        if (q.x <= Math.max(p.x, r.x) &&
            q.x >= Math.min(p.x, r.x) &&
            q.y <= Math.max(p.y, r.y) &&
            q.y >= Math.min(p.y, r.y)) {
            return true;
        }
        return false;
    };
    SkinScreen.prototype.orientation = function (p, q, r) {
        var val = (q.y - p.y) * (r.x - q.x)
            - (q.x - p.x) * (r.y - q.y);
        if (val == 0) {
            return 0;
        }
        return (val > 0) ? 1 : 2;
    };
    SkinScreen.prototype.doIntersect = function (p1, q1, p2, q2) {
        var o1 = this.orientation(p1, q1, p2);
        var o2 = this.orientation(p1, q1, q2);
        var o3 = this.orientation(p2, q2, p1);
        var o4 = this.orientation(p2, q2, q1);
        if (o1 != o2 && o3 != o4) {
            return true;
        }
        if (o1 == 0 && this.onSegment(p1, p2, q1)) {
            return true;
        }
        if (o2 == 0 && this.onSegment(p1, q2, q1)) {
            return true;
        }
        if (o3 == 0 && this.onSegment(p2, p1, q2)) {
            return true;
        }
        if (o4 == 0 && this.onSegment(p2, q1, q2)) {
            return true;
        }
        return false;
    };
    SkinScreen.prototype.isInside = function (polygon, n, p) {
        if (n < 3) {
            return false;
        }
        var extreme = {
            x: this.INF,
            y: p.y
        };
        var count = 0, i = 0;
        do {
            var next = (i + 1) % n;
            if (this.doIntersect(polygon[i], polygon[next], p, extreme)) {
                if (this.orientation(polygon[i], p, polygon[next]) == 0) {
                    return this.onSegment(polygon[i], p, polygon[next]);
                }
                count++;
            }
            i = next;
        } while (i != 0);
        return (count % 2 == 1);
    };
    return SkinScreen;
}(Phaser.Image));
var WindowPowerUp = /** @class */ (function (_super) {
    __extends(WindowPowerUp, _super);
    function WindowPowerUp() {
        var _this = _super.call(this, game, 0, 0, cjBlank) || this;
        _this.arrayPowerUp = [];
        _this.spawnStatusPowerUp(cjStatusPowerUp, 0);
        _this.spawnStatusPowerUp(cjStatusPowerUp, 1);
        _this.spawnStatusPowerUp(cjStatusPowerUp, 2);
        if (!DISABLE_POWER_UP_STATUS_CHILD) {
            _this.spawnStatusPowerUp(cjStatusPowerUpMomo, 3);
            _this.spawnStatusPowerUp(cjStatusPowerUpTurtle, 4);
        }
        _this.spawnStatusPowerUp(cjStatusPowerUpRush, 5);
        _this.spawnStatusPowerUp(cjStatusPowerUpEarthDragon, STATUS_POWER_UP_EARTH);
        _this.spawnStatusPowerUp(cjStatusPowerUpFireDragon, STATUS_POWER_UP_FIRE);
        return _this;
    }
    WindowPowerUp.prototype.spawnStatusPowerUp = function (key, index) {
        var statusPowerUp = new StatusPowerUp(key, index);
        this.addChild(statusPowerUp);
        this.arrayPowerUp.push(statusPowerUp);
    };
    WindowPowerUp.prototype.update = function () {
        this.trackPowerUp();
    };
    WindowPowerUp.prototype.trackPowerUp = function () {
        var indexTarget = 0;
        for (var index = this.arrayPowerUp.length - 1; index >= 0; index--) {
            var status = this.arrayPowerUp[index];
            status.x = 50 + (indexTarget * status.height * 5.5);
            status.y = 37;
            if (status.duration > 0) {
                indexTarget++;
            }
        }
    };
    return WindowPowerUp;
}(Phaser.Image));
var GameUtil = /** @class */ (function () {
    function GameUtil() {
    }
    GameUtil.disableTemporarily = function (value) {
        if (value === void 0) { value = 1000; }
        if (!game.input.enabled)
            return;
        game.input.enabled = false;
        game.time.events.add(value, function () {
            game.input.enabled = true;
            game.input.reset();
        });
    };
    GameUtil.drawTextShadow = function (target, font, depth, factor, tint) {
        for (var i = 1; i <= depth; i++) {
            var tf = new Phaser.BitmapText(game, 0, 0, font, target.text, target.fontSize, target.align);
            tf.tint = tint;
            tf.anchor.setTo(0.5);
            tf.x = i * factor;
            tf.y = i * factor;
            target.addChildAt(tf, 0);
        }
    };
    GameUtil.hideSprite = function (sprite) {
        if (!sprite)
            return;
        if (sprite.anchor.x == 0.5 || sprite.anchor.y == 0.5) {
            var targetX = 0.01;
            var targetY = 0.01;
            if (sprite.scale.x < 0)
                targetX *= -1;
            if (sprite.scale.y < 0)
                targetY *= -1;
            game.add.tween(sprite.scale).to({ x: targetX, y: targetY }, 300, Phaser.Easing.Back.In, true);
            game.add.tween(sprite).to({ alpha: 0 }, 300, Phaser.Easing.Linear.None, true).onComplete.addOnce(function () {
                sprite.visible = false;
            });
        }
        else {
            game.add.tween(sprite).to({ alpha: 0 }, 300, Phaser.Easing.Linear.None, true).onComplete.addOnce(function () {
                sprite.visible = false;
            });
        }
    };
    GameUtil.showSprite = function (sprite, duration, delay, scaleX, scaleY) {
        if (duration === void 0) { duration = 300; }
        if (delay === void 0) { delay = 0; }
        if (scaleX === void 0) { scaleX = 1; }
        if (scaleY === void 0) { scaleY = 1; }
        if (sprite == null)
            return;
        sprite.visible = true;
        if (scaleX > 1 || scaleY > 1 || sprite.alpha == 0) {
            sprite.scale.x = 0.001;
            sprite.scale.y = 0.001;
            sprite.alpha = 0;
        }
        if (sprite.anchor.x == 0.5 || sprite.anchor.y == 0.5) {
            if (sprite.scale.x == 1) {
                game.add.tween(sprite.scale).from({ x: 0.01, y: 0.01 }, duration, Phaser.Easing.Back.Out, true, delay);
                game.add.tween(sprite).from({ alpha: 0 }, duration, Phaser.Easing.Linear.None, true, delay);
            }
            else {
                game.add.tween(sprite.scale).to({ x: scaleX, y: scaleY }, duration, Phaser.Easing.Back.Out, true, delay);
                game.add.tween(sprite).to({ alpha: 1 }, duration, Phaser.Easing.Linear.None, true, delay);
            }
        }
        else {
            sprite.scale.x = scaleX;
            sprite.scale.y = scaleY;
            sprite.alpha = 0;
            game.add.tween(sprite).to({ alpha: 1 }, duration, Phaser.Easing.Linear.None, true, delay);
        }
    };
    return GameUtil;
}());
var Language = /** @class */ (function () {
    function Language() {
    }
    Language.initLanguage = function (json) {
        Language.IsLanguageInitialized = true;
        Language.LanguageJson = json;
    };
    Language.GetText = function (id) {
        var text = Language.LanguageJson[id];
        if (text == undefined) {
            console.log("ERROR : Text with ID " + id + " does not exist");
            return null;
        }
        return text;
    };
    Language.isTextExist = function (id) {
        return Language.LanguageJson[id];
    };
    Language.IsLanguageInitialized = false;
    return Language;
}());
/****
* Copyright (c) 2013 Jason O'Neil
*
* Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*
****/
var Random = /** @class */ (function () {
    function Random() {
    }
    /**
     * random a boolean value
     */
    Random.bool = function () {
        return Math.random() < 0.5;
    };
    /**
     * random an integer value
     * @param from
     * @param to
     */
    Random.int = function (from, to) {
        return from + Math.floor(((to - from + 1) * Math.random()));
    };
    /**
     * random a float value
     * @param from
     * @param to
     */
    Random.float = function (from, to) {
        return from + ((to - from) * Math.random());
    };
    /**
     * random a string
     * @param length
     * @param charactersToUse
     */
    Random.string = function (length, charactersToUse) {
        if (charactersToUse === void 0) { charactersToUse = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"; }
        var str = "";
        for (var i = 0; i < length; i++) {
            str += charactersToUse.charAt(Random.int(0, charactersToUse.length - 1));
        }
        return str;
    };
    /**
     * choose an item from an array randomly
     * @param arr
     */
    Random.fromArray = function (arr) {
        return (arr != null && arr.length > 0) ? arr[this.int(0, arr.length - 1)] : null;
    };
    /**
     * shuffle an array
     * @param arr
     */
    Random.shuffle = function (arr) {
        if (arr != null) {
            for (var i = 0; i < arr.length; i++) {
                var j = this.int(0, arr.length - 1);
                var a = arr[i];
                var b = arr[j];
                arr[i] = b;
                arr[j] = a;
            }
        }
        return arr;
    };
    return Random;
}());
var SoundPlayer = /** @class */ (function () {
    function SoundPlayer() {
    }
    SoundPlayer.playSound = function (id) {
        if (!enableLocalSound)
            return;
        if (SoundPlayer.Cache[id]) {
            SoundPlayer.Cache[id].play("", 0, 0.6, false);
        }
        else {
            SoundPlayer.Cache[id] = game.add.audio(id).play("", 0, 0.6, false);
        }
    };
    SoundPlayer.playSoundLoop = function (id) {
        if (!enableLocalSound)
            return;
        if (SoundPlayer.Cache[id]) {
            SoundPlayer.Cache[id].play("", 0, 0.5, true);
        }
        else {
            SoundPlayer.Cache[id] = game.add.audio(id).play("", 0, 0.5, true);
        }
    };
    SoundPlayer.stopAllBGM = function () {
        SoundPlayer.stopSound(SoundPlayer.BGM);
    };
    SoundPlayer.stopSound = function (id) {
        if (SoundPlayer.Cache[id]) {
            SoundPlayer.Cache[id].stop();
        }
    };
    // ====================== My custom ======================================
    SoundPlayer.playSFX = function (id) {
        if (SoundPlayer.Cache[id]) {
            SoundPlayer.Cache[id].play("", 0, 0.7, false);
        }
        else {
            this.arraySFX.push(id);
            SoundPlayer.Cache[id] = game.add.audio(id).play("", 0, 0.7, false);
        }
    };
    SoundPlayer.muteSFX = function () {
        if (this.arraySFX.length == 0)
            return;
        for (var i = 0; i < this.arraySFX.length; i++) {
            SoundPlayer.Cache[this.arraySFX[i]].mute = true;
        }
    };
    SoundPlayer.unmuteSFX = function () {
        if (this.arraySFX.length == 0)
            return;
        for (var i = 0; i < this.arraySFX.length; i++) {
            SoundPlayer.Cache[this.arraySFX[i]].mute = false;
        }
    };
    SoundPlayer.playBGM = function (id) {
        if (SoundPlayer.Cache[id]) {
            SoundPlayer.Cache[id].play("", 0, 0.5, true);
        }
        else {
            SoundPlayer.Cache[id] = game.add.audio(id).play("", 0, 0.5, true);
        }
    };
    SoundPlayer.muteBGM = function (id) {
        if (SoundPlayer.Cache[id]) {
            SoundPlayer.Cache[id].mute = true;
        }
    };
    SoundPlayer.unmuteBGM = function (id) {
        if (SoundPlayer.Cache[id]) {
            SoundPlayer.Cache[id].mute = false;
        }
    };
    SoundPlayer.BGM = "bgm.mp3";
    SoundPlayer.CLICK = "click.mp3";
    SoundPlayer.CLICKFAIL = "clickfail.mp3";
    SoundPlayer.RIGHT = "right.mp3";
    SoundPlayer.WRONG = "wrong.mp3";
    SoundPlayer.COIN = "coin.mp3";
    SoundPlayer.SHOOT = "shoot.mp3";
    SoundPlayer.HIT = "hit.mp3";
    SoundPlayer.POWERUP = "powerup.mp3";
    SoundPlayer.MISSILE = "missile.mp3";
    SoundPlayer.WHOSH1 = "whosh1.mp3";
    SoundPlayer.WHOSH2 = "whosh2.mp3";
    SoundPlayer.WHOSH3 = "whosh3.mp3";
    SoundPlayer.WHOSH4 = "whosh4.mp3";
    SoundPlayer.WHOSH5 = "whosh5.mp3";
    SoundPlayer.STEP = "step.mp3";
    SoundPlayer.DRAGON = "dragon.mp3";
    SoundPlayer.LASERCHARGE = "laser-charge.mp3";
    SoundPlayer.HOWL = "howl.mp3";
    SoundPlayer.MANHAIYA = "man-haiya.mp3";
    SoundPlayer.MANUGH = "man-ugh.mp3";
    SoundPlayer.WOMANHAIYA = "woman-haiya.mp3";
    SoundPlayer.BOULDER = "boulder.mp3";
    SoundPlayer.CYMBAL = "cymbal.mp3";
    SoundPlayer.DRUM = "drum.mp3";
    SoundPlayer.FAIL = "fail.mp3";
    SoundPlayer.WHOOSH = "whoosh.mp3";
    SoundPlayer.EAGLE = "eagle.mp3";
    SoundPlayer.WIND = "wind.mp3";
    SoundPlayer.Cache = {};
    SoundPlayer.arraySFX = [];
    return SoundPlayer;
}());
var StoragePlayer = /** @class */ (function () {
    function StoragePlayer() {
    }
    StoragePlayer.save = function (itemKey, itemData) {
        var dataSaved = {};
        var dataJson = JSON.parse(localStorage.getItem(this.keySaved));
        if (dataJson != null)
            dataSaved = dataJson;
        var data = {};
        data[itemKey] = itemData;
        this.ArrayData.push(data);
        for (var i = 0; i < this.ArrayData.length; i++) {
            for (var p in this.ArrayData[i]) {
                if (this.ArrayData[i].hasOwnProperty(p)) {
                    dataSaved[p] = this.ArrayData[i][p];
                }
            }
        }
        localStorage.setItem(this.keySaved, JSON.stringify(dataSaved));
    };
    StoragePlayer.load = function (itemKey) {
        var dataJson = JSON.parse(localStorage.getItem(this.keySaved));
        if (dataJson == null)
            return;
        var data = dataJson[itemKey];
        if (!data)
            return;
        return data;
    };
    StoragePlayer.deleteAll = function () {
        localStorage.clear();
    };
    StoragePlayer.isEmpty = function (obj) {
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop))
                return false;
        }
        return true;
    };
    StoragePlayer.deleteItem = function (itemKey) {
        var dataJson = JSON.parse(localStorage.getItem(this.keySaved));
        if (dataJson == null)
            return;
        var data = dataJson[itemKey];
        if (typeof data == "undefined")
            return;
        delete dataJson[itemKey];
        if (this.isEmpty(dataJson))
            localStorage.removeItem(this.keySaved);
        else
            localStorage.setItem(this.keySaved, JSON.stringify(dataJson));
    };
    StoragePlayer.resetAll = function () {
        var dataJson = JSON.parse(localStorage.getItem(this.keySaved));
        for (var prop in dataJson) {
            if (prop != SAVE_BGM && prop != SAVE_SFX) {
                delete dataJson[prop];
            }
        }
        localStorage.setItem(this.keySaved, JSON.stringify(dataJson));
    };
    StoragePlayer.ArrayData = [];
    StoragePlayer.keySaved = nameGame + "-" + version;
    return StoragePlayer;
}());
var TextWithOutline = /** @class */ (function (_super) {
    __extends(TextWithOutline, _super);
    function TextWithOutline(x, y, textColor, outlineColor, font, text, size, align, thickness, isInfo) {
        if (text === void 0) { text = ""; }
        if (size === void 0) { size = 32; }
        if (align === void 0) { align = "left"; }
        if (thickness === void 0) { thickness = 5; }
        if (isInfo === void 0) { isInfo = false; }
        var _this = _super.call(this, game, x, y, cjBlank) || this;
        _this.textFields = [];
        //corners
        _this.addTextField(thickness, thickness, outlineColor, font, text, size, align, isInfo);
        _this.addTextField(-thickness, -thickness, outlineColor, font, text, size, align, isInfo);
        _this.addTextField(-thickness, thickness, outlineColor, font, text, size, align, isInfo);
        _this.addTextField(thickness, -thickness, outlineColor, font, text, size, align, isInfo);
        //straights
        _this.addTextField(0, thickness, outlineColor, font, text, size, align, isInfo);
        _this.addTextField(0, -thickness, outlineColor, font, text, size, align, isInfo);
        _this.addTextField(-thickness, 0, outlineColor, font, text, size, align, isInfo);
        _this.addTextField(thickness, 0, outlineColor, font, text, size, align, isInfo);
        _this.addTextField(0, 0, textColor, font, text, size, align, isInfo);
        return _this;
    }
    TextWithOutline.prototype.addTextField = function (x, y, tint, font, text, size, align, isInfo) {
        if (isInfo) {
            var style = { font: font, fontSize: size, align: align, wordWrap: true, wordWrapWidth: 450, fill: tint };
            this.text = new Phaser.Text(game, x, y, text, style);
            this.text.lineSpacing = -10;
            this.addChild(this.text);
        }
        else {
            this.textField = new Phaser.BitmapText(game, x, y, font, text, size, align);
            if (typeof tint == 'number')
                this.textField.tint = tint;
            this.addChild(this.textField);
            this.textFields.push(this.textField);
        }
    };
    TextWithOutline.prototype.setText = function (text) {
        for (var _i = 0, _a = this.textFields; _i < _a.length; _i++) {
            var tf = _a[_i];
            tf.text = text;
        }
    };
    TextWithOutline.prototype.setAnchor = function (x, y) {
        for (var _i = 0, _a = this.textFields; _i < _a.length; _i++) {
            var tf = _a[_i];
            tf.anchor.setTo(x, y);
        }
    };
    return TextWithOutline;
}(Phaser.Sprite));
var TextWithShadow = /** @class */ (function (_super) {
    __extends(TextWithShadow, _super);
    function TextWithShadow(x, y, fgcolor, bgcolor, font, text, size, align, distanceMultiplier) {
        if (text === void 0) { text = ""; }
        if (size === void 0) { size = 32; }
        if (align === void 0) { align = "left"; }
        if (distanceMultiplier === void 0) { distanceMultiplier = 0.1; }
        var _this = _super.call(this, game, x, y, cjBlank) || this;
        var ft = _this.ft = new Phaser.BitmapText(game, 0, 0, font, text, size, align);
        var bt = _this.bt = new Phaser.BitmapText(game, size * distanceMultiplier, size * distanceMultiplier, font, text, size, align);
        _this.addChild(bt);
        _this.addChild(ft);
        ft.tint = fgcolor;
        bt.tint = bgcolor;
        return _this;
    }
    TextWithShadow.prototype.setAnchor = function (x, y) {
        this.ft.anchor.setTo(x, y);
        this.bt.anchor.setTo(x, y);
    };
    return TextWithShadow;
}(Phaser.Sprite));
var UniversalUtil = /** @class */ (function () {
    function UniversalUtil() {
    }
    UniversalUtil.disableTemporarily = function (value) {
        if (value === void 0) { value = 1000; }
        if (!game.input.enabled)
            return;
        game.input.enabled = false;
        game.time.events.add(value, function () {
            game.input.enabled = true;
            game.input.reset();
        });
    };
    UniversalUtil.area = function (x1, y1, x2, y2, x3, y3) {
        return Math.abs((x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2)) / 2);
    };
    UniversalUtil.isPointInsideRectangle = function (x1, y1, x2, y2, x3, y3, x4, y4, x, y) {
        /* Calculate area of rectangle ABCD */
        var A = UniversalUtil.area(x1, y1, x2, y2, x3, y3) + UniversalUtil.area(x1, y1, x4, y4, x3, y3);
        /* Calculate area of triangle PAB */
        var A1 = UniversalUtil.area(x, y, x1, y1, x2, y2);
        /* Calculate area of triangle PBC */
        var A2 = UniversalUtil.area(x, y, x2, y2, x3, y3);
        /* Calculate area of triangle PCD */
        var A3 = UniversalUtil.area(x, y, x3, y3, x4, y4);
        /* Calculate area of triangle PAD */
        var A4 = UniversalUtil.area(x, y, x1, y1, x4, y4);
        /* Check if sum of A1, A2, A3 and A4
        is same as A */
        return (A == A1 + A2 + A3 + A4);
    };
    UniversalUtil.isTwoLineCollide = function (a, b, c, d, p, q, r, s) {
        var det, gamma, lambda;
        det = (c - a) * (s - q) - (r - p) * (d - b);
        if (det === 0) {
            return false;
        }
        else {
            lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det;
            gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det;
            return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);
        }
    };
    UniversalUtil.getDistanceTwoPoints = function (x1, y1, x2, y2) {
        var xs = x2 - x1, ys = y2 - y1;
        xs *= xs;
        ys *= ys;
        return Math.sqrt(xs + ys);
    };
    UniversalUtil.drawTextShadow = function (target, font, depth, factor, tint) {
        for (var i = 1; i <= depth; i++) {
            var tf = new Phaser.BitmapText(game, 0, 0, font, target.text, target.fontSize, target.align);
            tf.tint = tint;
            tf.anchor.setTo(0.5);
            tf.x = i * factor;
            tf.y = i * factor;
            target.addChildAt(tf, 0);
        }
    };
    UniversalUtil.hideSprite = function (sprite) {
        if (!sprite)
            return;
        if (sprite.anchor.x == 0.5 || sprite.anchor.y == 0.5) {
            var targetX = 0.01;
            var targetY = 0.01;
            if (sprite.scale.x < 0)
                targetX *= -1;
            if (sprite.scale.y < 0)
                targetY *= -1;
            game.add.tween(sprite.scale).to({ x: targetX, y: targetY }, 300, Phaser.Easing.Back.In, true);
            game.add.tween(sprite).to({ alpha: 0 }, 300, Phaser.Easing.Linear.None, true).onComplete.addOnce(function () {
                sprite.visible = false;
            });
        }
        else {
            game.add.tween(sprite).to({ alpha: 0 }, 300, Phaser.Easing.Linear.None, true).onComplete.addOnce(function () {
                sprite.visible = false;
            });
        }
    };
    UniversalUtil.showSprite = function (sprite, duration, delay, scaleX, scaleY) {
        if (duration === void 0) { duration = 300; }
        if (delay === void 0) { delay = 0; }
        if (scaleX === void 0) { scaleX = 1; }
        if (scaleY === void 0) { scaleY = 1; }
        if (sprite == null)
            return;
        sprite.visible = true;
        if (scaleX > 1 || scaleY > 1 || sprite.alpha == 0) {
            sprite.scale.x = 0.001;
            sprite.scale.y = 0.001;
            sprite.alpha = 0;
        }
        if (sprite.anchor.x == 0.5 || sprite.anchor.y == 0.5) {
            if (sprite.scale.x == 1) {
                game.add.tween(sprite.scale).from({ x: 0.01, y: 0.01 }, duration, Phaser.Easing.Back.Out, true, delay);
                game.add.tween(sprite).from({ alpha: 0 }, duration, Phaser.Easing.Linear.None, true, delay);
            }
            else {
                game.add.tween(sprite.scale).to({ x: scaleX, y: scaleY }, duration, Phaser.Easing.Back.Out, true, delay);
                game.add.tween(sprite).to({ alpha: 1 }, duration, Phaser.Easing.Linear.None, true, delay);
            }
        }
        else {
            sprite.scale.x = scaleX;
            sprite.scale.y = scaleY;
            sprite.alpha = 0;
            game.add.tween(sprite).to({ alpha: 1 }, duration, Phaser.Easing.Linear.None, true, delay);
        }
    };
    return UniversalUtil;
}());
//# sourceMappingURL=game.js.map