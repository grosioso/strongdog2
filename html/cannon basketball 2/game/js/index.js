!(function (p) {
  function t(a, c, b) {
    this.onClick = new z();
    this.onDown = new z();
    this.onUp = new z();
    this.onOut = new z();
    c && ((c = c.bind(b || this)), this.onClick.add(c));
    this.isOver = this.isDown = this.disposed = !1;
    this.name = "TintButton";
    this.upTint = 16777215;
    this.overTint = 15658734;
    this.downTint = 14540253;
    this.disableTint = 8947848;
    this.tint = this.upTint;
    PIXI.Sprite.call(this, a);
    this.mousedown = this.touchstart = this._mouseDown;
    this.mouseup =
      this.touchend =
      this.mouseupoutside =
      this.touchendoutside =
        this._mouseUp;
    this.mouseover = this._mouseOver;
    this.mouseout = this._mouseOut;
    this.click = this.tap = this._clickTap;
    this.buttonMode = this.interactive = !0;
    this.anchor.set(0.5, 0.5);
    this._cacheAnchorY = null;
  }
  function l(a, c) {
    PIXI.Container.call(this);
    this.name = a || "Item";
    this.zOrder = c || r.zOrder.defaultZ;
    this._body = null;
    this.positionUpdate = this.angleUpdate = !1;
  }
  function P() {
    PIXI.Container.call(this);
    var a = new PIXI.TextStyle({
        fontFamily: "Impact",
        fontSize: 42,
        fill: "white",
        align: "center",
      }),
      c = new PIXI.Graphics();
    c.beginFill(0);
    c.drawRect(0, 0, d.gameWidth0, d.gameHeight0);
    c.endFill();
    this.addChild(c);
    this._txtLoading = new PIXI.Text("Loading", a);
    this._txtLoading.scale.set(0.5, 0.5);
    this._txtLoading.anchor.set(0.5, 0.5);
    this._txtLoading.x = d.gameWidth0 / 2;
    this._txtLoading.y = d.gameHeight0 / 2 - 10;
    this.addChild(this._txtLoading);
    d.pixi.ticker.add(this._update, this);
    this._curr = this._loaded = 0;
  }
  function ia() {
    PIXI.Container.call(this);
    var a = d.assets.getSprite("splash");
    a.anchor.set(0.5, 0.5);
    a.x = d.gameWidth0 / 2;
    a.y = d.gameHeight0 / 2;
    this.addChild(a);
  }
  function Q(a) {
    this.app = a;
  }
  function C() {
    EventTarget.call(this);
    this._event = {};
    this._event.type = "";
    this._event.orientation = "";
    this._event.originalEvent = null;
    this._onVisibilityChange = this._onVisibilityChange.bind(this);
    this._onWebkitVisibilityChange = this._onWebkitVisibilityChange.bind(this);
    this._onPageShow = this._onPageShow.bind(this);
    this._onPageHide = this._onPageHide.bind(this);
    this._onFocus = this._onFocus.bind(this);
    this._onBlur = this._onBlur.bind(this);
    this._onResize = this._onResize.bind(this);
    this._onOrientationChange = this._onOrientationChange.bind(this);
    document.addEventListener("visibilitychange", this._onVisibilityChange, !1);
    document.addEventListener(
      "webkitvisibilitychange",
      this._onWebkitVisibilityChange,
      !1
    );
    document.addEventListener("pageshow", this._onPageHide, !1);
    document.addEventListener("pagehide", this._onPageShow, !1);
    p.onfocus = this._onFocus;
    p.onblur = this._onBlur;
    this.orientation = this._getOrientation();
    this._event.orientation = this.orientation;
    p.addEventListener("resize", this._onResize, !1);
    p.addEventListener("orientationchange", this._onOrientationChange, !1);
  }
  function A(a, c, b, e, g) {
    this.up = a;
    this.over = c;
    this.down = b;
    this.onClick = new z();
    this.onDown = new z();
    this.onUp = new z();
    this.onOut = new z();
    e && ((e = e.bind(g || this)), this.onClick.add(e));
    this.name = "Button";
    this.isOver = this.isDown = this.disposed = !1;
    PIXI.Sprite.call(this, a);
    this.mousedown = this.touchstart = this._mouseDown;
    this.mouseup =
      this.touchend =
      this.mouseupoutside =
      this.touchendoutside =
        this._mouseUp;
    this.mouseover = this._mouseOver;
    this.mouseout = this._mouseOut;
    this.click = this.tap = this._clickTap;
    this.interactive = !0;
    this.anchor.set(0.5, 0.5);
    this._cacheAnchorY = null;
  }
  function ba(a, c, b, e) {
    c = d.assets.getTexture("btnNumLevel" + c, "atlasUI");
    t.call(this, c, b, e);
    this.num = a;
    this.name = "ButtonLevel" + a;
    b = new PIXI.TextStyle({
      fontFamily: "CroMagnum",
      fontSize: 42,
      fill: "#FEF4B0",
      stroke: "#4D1604",
      strokeThickness: 8,
    });
    this.setLabel(a + "", b);
    a = d.assets.getSprite("icoStarLevelBtn", "atlasUI");
    a.anchor.set(0.5, 0.5);
    a.x = c.width / 2;
    a.y = c.height - a.height / 2 + 3;
    this.addChild(a);
    c = d.assets.getSprite("icoStarLevelBtn", "atlasUI");
    c.anchor.set(0.5, 0.5);
    c.x = a.x - a.width + 3;
    c.y = a.y;
    this.addChild(c);
    b = d.assets.getSprite("icoStarLevelBtn", "atlasUI");
    b.anchor.set(0.5, 0.5);
    b.x = a.x + a.width - 3;
    b.y = a.y;
    this.addChild(b);
    this.scale.set(0.5, 0.5);
    this._stars = [a, c, b];
  }
  function ca(a, c, b, e, g) {
    PIXI.Container.call(this);
    this._callback = e;
    this._callbackScope = g;
    this._on = t.generateButton(a, b, this._onClick, this);
    this._on.name = "ON";
    this.addChild(this._on);
    this._off = t.generateButton(c, b, this._onClick, this);
    this._off.name = "OFF";
    this.addChild(this._off);
    this.on = !0;
  }
  function D(a) {
    this.name = a || "Collection#" + ++D.__id;
    this._arr = [];
    this.throwIfOut = this.throwIfNotIn = this.throwIfIn = !1;
  }
  function H() {
    Box2D.Dynamics.b2ContactListener.call(this);
    this._ee = new EventEmitter();
    this._eventNameBeginContact = "onBeginContact";
    this._eventNameEndContact = "onEndContact";
  }
  function z() {
    this.count = 0;
    this._callbacks = [];
    this._doItAfter = [];
    this.disposed = this._blocked = !1;
  }
  function y(a) {
    this.stage = a;
    this.mouse = new PIXI.InteractionData();
    this.touchs = {};
    this.interactInvisible = !1;
    this.tempPoint = new PIXI.Point();
    this.mouseoverEnabled = !0;
    this.pool = [];
    this.interactiveItems = [];
    this.interactionDOMElement = null;
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
    this.last = 0;
  }
  function ja() {
    this.localStorageEnable = !1;
    this._storage = {};
    try {
      this.localStorageEnable = "localStorage" in p && null !== p.localStorage;
    } catch (a) {}
  }
  function k(a) {
    p.b2Vec2 = Box2D.Common.Math.b2Vec2;
    p.b2AABB = Box2D.Collision.b2AABB;
    p.b2BodyDef = Box2D.Dynamics.b2BodyDef;
    p.b2Body = Box2D.Dynamics.b2Body;
    p.b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
    p.b2Fixture = Box2D.Dynamics.b2Fixture;
    p.b2World = Box2D.Dynamics.b2World;
    p.b2MassData = Box2D.Collision.Shapes.b2MassData;
    p.b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
    p.b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
    p.b2DebugDraw = Box2D.Dynamics.b2DebugDraw;
    p.b2MouseJointDef = Box2D.Dynamics.Joints.b2MouseJointDef;
    p.b2RevoluteJoint = Box2D.Dynamics.Joints.b2RevoluteJoint;
    p.b2RevoluteJointDef = Box2D.Dynamics.Joints.b2RevoluteJointDef;
    this.world = new Ea(new F(0, 12), !0);
    this.contactListener = new H();
    this.world.SetContactListener(this.contactListener);
    d.physWorld = this.world;
    this.clearDoIt();
    this._context = this._canvas = null;
    a && this.enableDebugDraw();
    d.pixi.ticker.add(this._update, this);
  }
  function xa(a) {
    "undefined" == typeof a && (a = []);
    this.c = 1;
    this.s2 = this.s1 = this.s0 = 0;
    this.sow(a);
  }
  function da(a) {
    PIXI.Container.call(this);
    var c = d.assets.getSprite("levelsBoard", "atlasUI");
    c.scale.set(0.5, 0.5);
    c.anchor.set(0.5, 0.76);
    this.addChild(c);
    c = new PIXI.TextStyle({
      fontFamily: "CroMagnum",
      fontSize: 42,
      fill: "#EFE9BF",
      stroke: "#4D1604",
      strokeThickness: 8,
      align: "center",
      lineHeight: 42,
    });
    a = new PIXI.Text(a, c);
    a.scale.set(0.5, 0.5);
    a.anchor.set(0.5, 0.45);
    this.addChild(a);
  }
  function ea(a, c) {
    PIXI.Container.call(this);
    this.x = -d.gameWidth0;
    var b = new da("Game by\nOLEG KUZYK");
    b.x = 180;
    b.y = 210;
    this.addChild(b);
    b = new da("Level design by\nGEORGIY STEPANOV");
    b.x = 540;
    b.y = 210;
    this.addChild(b);
    b = t.generateButton("btnBackLevels", "atlasUI", a, c);
    b.name = "BackCredits";
    b.scale.set(0.3, 0.3);
    b.x = d.gameWidth0 - b.width / 2 - 10;
    b.y = d.gameHeight0 - b.height / 2 - 5;
    this.addChild(b);
  }
  function K(a, c) {
    PIXI.Container.call(this);
    this._buttonsHandler = c;
    var b = d.assets.getSprite("levelsBoard", "atlasUI");
    b.scale.set(0.5, 0.5);
    b.anchor.set(0.5, 0.76);
    this.addChild(b);
    b = 10 * (a - 1) + 1;
    this._buttons = [];
    this._btnsContainer = new PIXI.Container();
    this.addChild(this._btnsContainer);
    for (var e = 0; 2 > e; e++)
      for (var g = 0; 5 > g; g++) {
        var h = new ba(b, a, this._onClick, this);
        h.x += g * (12 + h.width);
        h.y += e * (7 + h.height);
        h.anchor.set(0, 0);
        this._btnsContainer.addChild(h);
        h.setLocked(b > d.levelMng.lastOpened);
        this._buttons.push(h);
        b++;
      }
    this._btnsContainer.x = -this._btnsContainer.width / 2;
    this._btnsContainer.y = -this._btnsContainer.height / 2;
  }
  function fa(a, c) {
    PIXI.Container.call(this);
    this._buttonsHandler = a;
    var b = d.assets.getSprite("levelCompleted");
    b.scale.set(0.5, 0.5);
    b.interactive = !0;
    this.addChild(b);
    b = function (h, m, n) {
      a.call(this, h, m, n);
      setTimeout(cmgAdBreakCall, 500);
    };
    this._btnRestart = t.generateButton("btnRestartComplete", "atlasUI", b, c);
    this._btnRestart.name = "Restart";
    this._btnRestart.scale.set(0.35, 0.35);
    this._btnRestart.anchor.set(0.5, 0.5);
    this._btnRestart.x = this._btnRestart.xIn = d.gameWidth0 / 2;
    this._btnRestart.y = this._btnRestart.yIn = d.gameHeight0 / 2 + 100;
    this._btnRestart.xOut = this._btnRestart.xIn;
    this._btnRestart.yOut = d.gameHeight0 + this._btnRestart.height / 2 + 10;
    this.addChild(this._btnRestart);
    this._btnMenu = t.generateButton("btnMenuComplete", "atlasUI", b, c);
    this._btnMenu.name = "Menu";
    this._btnMenu.scale.set(0.35, 0.35);
    this._btnMenu.anchor.set(0.5, 0.5);
    this._btnMenu.x = this._btnMenu.xIn =
      this._btnRestart.x -
      this._btnRestart.width / 2 -
      this._btnMenu.width / 2 -
      20;
    this._btnMenu.y = this._btnMenu.yIn = this._btnRestart.y;
    this._btnMenu.xOut = -this._btnMenu.width / 2 - 10;
    this._btnMenu.yOut = this._btnMenu.yIn;
    this.addChild(this._btnMenu);
    this._btnNext = t.generateButton("btnNextComplete", "atlasUI", b, c);
    this._btnNext.name = "Next";
    this._btnNext.scale.set(0.35, 0.35);
    this._btnNext.anchor.set(0.5, 0.5);
    this._btnNext.x = this._btnNext.xIn =
      this._btnRestart.x +
      this._btnRestart.width / 2 +
      this._btnNext.width / 2 +
      20;
    this._btnNext.y = this._btnNext.yIn = this._btnRestart.y;
    this._btnNext.xOut = d.gameWidth0 + this._btnNext.width / 2 + 10;
    this._btnNext.yOut = this._btnNext.yIn;
    this.addChild(this._btnNext);
    b = new PIXI.TextStyle({
      fontFamily: "CroMagnum",
      fontSize: 42,
      fill: "#EFE9BF",
      stroke: "#4D1604",
      strokeThickness: 6,
      align: "center",
    });
    var e = "LEVEL " + d.levelMng.currLevel + " COMPLETED!";
    d.levelMng.currLevel == d.levelMng.totalLevels &&
      ((e = "CONGRATULATIONS!\nYOU'VE PASSED THE GAME!"), (b.fontSize = 36));
    this._text = new PIXI.Text(e, b);
    this._text.anchor.set(0.5, 0.5);
    this._text.scale.set(0.5, 0.5);
    this._text.x = d.gameWidth0 / 2;
    this._text.y = d.gameHeight0 / 2 - 120;
    this.addChild(this._text);
    b = d.assets.getSprite("starComplete", "atlasUI");
    b.anchor.set(0.5, 0.5);
    b.scale.set(0.5, 0.5);
    b.x = d.gameWidth0 / 2;
    b.y = d.gameHeight0 / 2;
    this.addChild(b);
    e = d.assets.getSprite("starComplete", "atlasUI");
    e.anchor.set(0.5, 0.5);
    e.scale.set(0.5, 0.5);
    e.x = b.x - b.width / 2 - e.width / 2 - 10;
    e.y = b.y;
    this.addChild(e);
    var g = d.assets.getSprite("starComplete", "atlasUI");
    g.anchor.set(0.5, 0.5);
    g.scale.set(0.5, 0.5);
    g.x = b.x + b.width / 2 + g.width / 2 + 10;
    g.y = b.y;
    this.addChild(g);
    this._stars = [b, e, g];
    this.sndWin = d.assets.getSound("sndWin");
  }
  function R(a, c, b) {
    PIXI.Container.call(this);
    this._buttonsHandler = a;
    this.x = d.gameWidth0;
    var e = new K(1, a);
    e.x = 180;
    e.y = 100;
    this.addChild(e);
    var g = new K(2, a);
    g.x = 540;
    g.y = 220;
    this.addChild(g);
    a = new K(3, a);
    a.x = 180;
    a.y = 340;
    this.addChildAt(a, 0);
    this._boards = [e, g, a];
    c = t.generateButton("btnBackLevels", "atlasUI", c, b);
    c.name = "BackLevels";
    c.scale.set(0.3, 0.3);
    c.x = c.width / 2 + 10;
    c.y = d.gameHeight0 - c.height / 2 - 5;
    this.addChild(c);
  }
  function S(a, c) {
    PIXI.Container.call(this);
    var b = d.assets.getSprite("gameName", null, !0);
    b.scale.set(0.5, 0.5);
    b.x = d.gameWidth0 / 2;
    b.y = d.gameHeight0 / 2 - b.height / 2 - 120;
    this.addChild(b);
    var e = t.generateButton("btnPlayMenu", "atlasUI", a, c);
    e.name = "Play";
    e.scale.set(0.5, 0.5);
    e.x = b.x;
    e.y = b.y + b.height / 2 + e.height / 2 + 30;
    this.addChild(e);
    var g = t.generateButton("btnCreditsMenu", "atlasUI", a, c);
    g.name = "Credits";
    g.scale.set(0.5, 0.5);
    g.x = b.x;
    g.y = e.y + e.height / 2 + g.height / 2 + 20;
    this.addChild(g);
    b = new ca("btnMusicOn", "btnMusicOff", "atlasUI", a, c);
    b.name = "Music";
    b.scale.set(0.5, 0.5);
    b.x = b.width / 2 + 10;
    b.y = d.gameHeight0 - b.height / 2 - 7;
    b.on = d.musicOn;
    this.addChild(b);
    e = new ca("btnSoundOn", "btnSoundOff", "atlasUI", a, c);
    e.name = "Sound";
    e.scale.set(0.5, 0.5);
    e.x = b.x + b.width / 2 + e.width / 2 + 5;
    e.y = b.y;
    e.on = d.soundOn;
    this.addChild(e);
    this.sndButton = d.assets.getSound("sndButton");
  }
  function v(a, c) {
    l.call(this, "Ball", r.zOrder.ball);
    var b = d.assets.getSprite("ball", "atlasGame");
    b.scale.set(0.5, 0.5);
    b.anchor.set(0.5, 0.5);
    this.addChild(b);
    this.x = a;
    this.y = c;
    b = k.createCircleShape(7.5);
    b = k.createFixtureDef(b, 0.5, 0.15, 1, {
      item: this,
      isBall: !0,
      dynamic: !0,
    });
    var e = k.createBodyDef(a, c, u.b2_dynamicBody, !1, !0, 0, !0);
    this._body = k.createBody(e, [b]);
    this._enableUpdate();
    this.positionUpdate = this.angleUpdate = !0;
  }
  function T(a, c) {
    l.call(this, "Basket", r.zOrder.basket);
    this.x = a;
    this.y = c;
    var b = d.assets.getSprite("basket", "atlasGame");
    b.scale.set(0.55, 0.55);
    b.anchor.set(0.5, -0.12);
    this.addChild(b);
    b = k.createPolygonShape(22.5, 4, 0, 53);
    b = k.createFixtureDef(b, 0.5, 0.1, 1, this);
    var e = k.createPolygonShape(4, 42, 14.85, 33.85, q.toRadians(15));
    e = k.createFixtureDef(e, 0.5, 0.1, 1, this);
    var g = k.createPolygonShape(4, 42, -14.85, 33.85, q.toRadians(-15));
    g = k.createFixtureDef(g, 0.5, 0.1, 1, this);
    var h = k.createPolygonShape(7.5, 6.6, 22.8, 15.25, q.toRadians(-15));
    h = k.createFixtureDef(h, 0.5, 0.1, 1, this);
    var m = k.createPolygonShape(7.5, 6.6, -22.8, 15.25, q.toRadians(15));
    m = k.createFixtureDef(m, 0.5, 0.1, 1, this);
    var n = k.createPolygonShape(27, 4, 0, 23);
    n = k.createFixtureDef(
      n,
      0.5,
      0.1,
      1,
      { item: this, basketSensor: !0 },
      !0
    );
    var x = k.createBodyDef(a, c, u.b2_staticBody);
    this._body = k.createBody(x, [b, e, g, h, m, n]);
    d.physics.contactListener.addBeginContactListener(
      this._onBeginContact,
      this
    );
    this.sndBallInBasket = d.assets.getSound("sndBallInBasket");
  }
  function B(a, c, b, e, g) {
    l.call(this, "BasketRail", r.zOrder.basket);
    this._orienation = 0 == b ? "v" : "h";
    this._end = e;
    this.x = a;
    this.y = c;
    this.id = g;
    b = d.assets.getSprite("railBasket", "atlasGame");
    b.scale.set(0.55, 0.55);
    b.anchor.set(0.5, 0.46);
    this.addChild(b);
    b = k.createPolygonShape(22.5, 4, 0, 30);
    b = k.createFixtureDef(b, 0.5, 0.1, 1, this);
    e = k.createPolygonShape(4, 42, 14.85, 10.85, q.toRadians(15));
    e = k.createFixtureDef(e, 0.5, 0.1, 1, this);
    g = k.createPolygonShape(4, 42, -14.85, 10.85, q.toRadians(-15));
    g = k.createFixtureDef(g, 0.5, 0.1, 1, this);
    var h = k.createPolygonShape(7.5, 6.6, 22.8, -7.75, q.toRadians(-15));
    h = k.createFixtureDef(h, 0.5, 0.1, 1, this);
    var m = k.createPolygonShape(7.5, 6.6, -22.8, -7.75, q.toRadians(15));
    m = k.createFixtureDef(m, 0.5, 0.1, 1, this);
    var n = k.createPolygonShape(27, 4);
    n = k.createFixtureDef(
      n,
      0.5,
      0.1,
      1,
      { item: this, basketSensor: !0 },
      !0
    );
    a = k.createBodyDef(a, c, u.b2_kinematicBody);
    this._body = k.createBody(a, [b, e, g, h, m, n]);
    this._createRails();
    d.physics.contactListener.addBeginContactListener(
      this._onBeginContact,
      this
    );
    l.events.on(l.EVENT_TRIGGER_PRESSED, this._onTriggerEvent, this);
    this.sndStart = d.assets.getSound("sndRailStart");
    this.sndStop = d.assets.getSound("sndRailStop");
  }
  function ta(a, c, b, e) {
    l.call(this, "Box", r.zOrder.defaultZ);
    this.x = a;
    this.y = c;
    var g = d.assets.getSprite("box", "atlasGame");
    g.scale.set(0.5, 0.5);
    g.anchor.set(0.5, 0.5);
    this.addChild(g);
    g = k.createPolygonShape(45, 45);
    e = k.createFixtureDef(g, 0.5, 0, e, { item: this, dynamic: !0 });
    a = k.createBodyDef(a, c, u.b2_dynamicBody, !1, !0, b);
    this._body = k.createBody(a, [e]);
    this._enableUpdate();
    this.positionUpdate = this.angleUpdate = !0;
  }
  function G(a, c) {
    l.call(this, "Cannon", r.zOrder.cannon);
    this.lowerAngle = -45;
    this.upperAngle = 45;
    this.shotScale = 150;
    this.minPower = 250;
    this.maxPower = 500;
    this.x = a;
    this.y = c;
    var b = d.assets.getSprite("cannonPlatform", "atlasGame");
    b.anchor.set(0.5, 0.65);
    b.scale.set(0.5, 0.5);
    this.addChild(b);
    b = L.generateFrameNames("cannon_", 1, 15, "", 4);
    b = d.assets.getTextures(b, "atlasGame");
    this._cannon = new PIXI.extras.AnimatedSprite(b);
    this._cannon.anchor.set(0.5, 1.32);
    this._cannon.scale.set(0.5, 0.5);
    this._cannon.animationSpeed = 1;
    this._cannon.loop = !1;
    this.addChildAt(this._cannon, 0);
    b = d.assets.getSprite("cannonPowerBarBG", "atlasGame");
    b.anchor.set(0.5, 1);
    b.x = 35;
    b.y = -60;
    this._cannon.addChild(b);
    this._powerBar = d.assets.getSprite("cannonPowerBar", "atlasGame");
    this._powerBar.anchor.set(0.5, 1);
    b.addChild(this._powerBar);
    this._powerBarMask = new PIXI.Graphics();
    b.addChild(this._powerBarMask);
    this._powerBarMask.beginFill(0);
    this._powerBarMask.drawRect(
      -this._powerBar.width / 2,
      -this._powerBar.height,
      this._powerBar.width,
      this._powerBar.height
    );
    this._powerBar.mask = this._powerBarMask;
    this._shotComplete = this._shotComplete.bind(this);
    this._cannon.onComplete = this._shotComplete;
    this._frameChanged = this._frameChanged.bind(this);
    this._cannon.onFrameChange = this._frameChanged;
    this._shot = this._shot.bind(this);
    d.playState.shotHandler.add(this._shot);
    this._helperPoint = new PIXI.Point();
    this._ballSpawnPoint = new PIXI.Point(0, -43);
    this._shoted = !1;
    d.pixi.ticker.add(this._update, this);
    this._isAllowMove = !0;
    d.playState.aimControl &&
      (d.playState.bg.on("pointerdown", this._pointerDown, this),
      d.playState.bg.on("pointerup", this._pointerUp, this),
      (this._isAllowMove = !1),
      (this._countTouches = 0));
    this.graphics = new PIXI.Graphics();
    this.addChild(this.graphics);
    this.sndShot = d.assets.getSound("sndShot");
  }
  function ma(a, c) {
    l.call(this, "Domino", r.zOrder.defaultZ);
    this.x = a;
    this.y = c;
    var b = d.assets.getSprite("domino", "atlasGame");
    b.scale.set(0.5, 0.5);
    b.anchor.set(0.5, 0.5);
    this.addChild(b);
    b = k.createPolygonShape(10, 50);
    b = k.createFixtureDef(b, 0.5, 0, 0.5, { item: this, dynamic: !0 });
    var e = k.createBodyDef(a, c, u.b2_dynamicBody);
    this._body = k.createBody(e, [b]);
    this._enableUpdate();
    this.positionUpdate = this.angleUpdate = !0;
  }
  function M(a, c, b, e, g, h) {
    l.call(this, "Gate", r.zOrder.defaultZ);
    var m = 0;
    g = void 0 != g ? g : 90;
    (h = h || !1) && ((m = g), (g = 0), "right" == b && (m = -m));
    this.inversed = h;
    m = q.toRadians(m);
    this.x = a;
    this.y = c;
    this.rotation = m;
    this.openAngle = q.toRadians(g);
    this.direction = b;
    this.opened = !1;
    this.rotation = m;
    this.id = e;
    e = d.assets.getSprite("gate_" + b, "atlasGame");
    e.scale.set(0.5, 0.5);
    "left" == b
      ? e.anchor.set(0.2, 0.5)
      : "right" == b && e.anchor.set(0.8, 0.5);
    this.addChild(e);
    var n;
    "left" == b
      ? (n = k.createPolygonShape(30, 8, 11))
      : "right" == b && (n = k.createPolygonShape(30, 8, -11));
    b = k.createFixtureDef(n, 1, 0.1, 0.1);
    a = k.createBodyDef(a, c, u.b2_kinematicBody, !1, !0, m);
    this._body = k.createBody(a, [b]);
    l.events.on(l.EVENT_TRIGGER_PRESSED, this._onTriggerEvent, this);
    this.sndGate = d.assets.getSound("sndGate");
  }
  function na(a, c, b, e) {
    l.call(this, "Hammer", r.zOrder.defaultZ);
    e = e || 1;
    this.x = a;
    this.y = c;
    this.rotation = b = q.toRadians(b);
    var g = d.assets.getSprite("hammer", "atlasGame");
    g.scale.set(0.5, 0.5);
    g.anchor.set(0.1, 0.5);
    this.addChild(g);
    g = k.createPolygonShape(12, 74, 62, 0);
    g = k.createFixtureDef(g, 0.3, 0.1, e, { item: this, dynamic: !0 });
    var h = k.createPolygonShape(59, 12, 26, 0);
    e = k.createFixtureDef(h, 0.3, 0.1, e, { item: this, dynamic: !0 });
    a = k.createBodyDef(a, c, u.b2_dynamicBody, !1, !0, b);
    this._body = k.createBody(a, [g, e]);
    a = d.physWorld.GetGroundBody();
    c = new oa();
    c.Initialize(a, this._body, this._body.GetPosition());
    d.physWorld.CreateJoint(c);
    this._enableUpdate();
    this.positionUpdate = this.angleUpdate = !0;
  }
  function ha(a, c, b, e, g) {
    l.call(this, "Mill", r.zOrder.defaultZ);
    this.x = a;
    this.y = c;
    this.enableMotor = b;
    this.motorSpeed = e;
    this.signalID = g;
    b = d.assets.getSprite("mill", "atlasGame");
    b.scale.set(0.5, 0.5);
    b.anchor.set(0.5, 0.5);
    this.addChild(b);
    b = k.createPolygonShape(150, 14);
    b = k.createFixtureDef(b, 0.5, 0, 0.2, { item: this, dynamic: !0 });
    e = k.createPolygonShape(14, 150);
    e = k.createFixtureDef(e, 0.5, 0, 0.2, { item: this, dynamic: !0 });
    g = k.createBodyDef(a, c, u.b2_dynamicBody);
    this._body = k.createBody(g, [b, e]);
    this._enableUpdate();
    this.positionUpdate = this.angleUpdate = !0;
    a = new F(a / d.physScale, c / d.physScale);
    c = new oa();
    if (
      (c.Initialize(d.physWorld.GetGroundBody(), this._body, a),
      (this._revJoint = d.physWorld.CreateJoint(c)),
      this.enableMotor)
    )
      (a = this.motorSpeed),
        this._revJoint.EnableMotor(!0),
        this._revJoint.SetMotorSpeed(a),
        this._revJoint.SetMaxMotorTorque(Math.abs(a)),
        l.events.on(l.EVENT_TRIGGER_PRESSED, this._onTriggerEvent, this);
  }
  function N(a, c) {
    l.call(this, "Peg", r.zOrder.defaultZ);
    this.x = a;
    this.y = c;
    var b = d.assets.getSprite("peg", "atlasGame");
    b.scale.set(0.5, 0.5);
    b.anchor.set(0.5, 0.5);
    this.addChild(b);
    b = k.createCircleShape(15);
    b = k.createFixtureDef(b, 0.2, 0.1, 1, { item: this, isPeg: !0 });
    var e = k.createBodyDef(a, c, u.b2_staticBody);
    this._body = k.createBody(e, [b]);
    d.physics.contactListener.addBeginContactListener(
      this._onBeginContact,
      this
    );
    this.sndPeg = d.assets.getSound("sndPeg");
  }
  function I(a, c, b, e, g, h, m, n, x) {
    (l.call(this, "Pivot", r.zOrder.pivot),
    (this.x = a),
    (this.y = c),
    (this.type = b),
    "bolt" == this.type)
      ? ((e = d.assets.getSprite("bolt", "atlasGame")),
        e.scale.set(0.5, 0.5),
        e.anchor.set(0.5, 0.5),
        this.addChild(e),
        (this.boltLowerAngle = q.toRadians(n)),
        (this.boltUpperAngle = q.toRadians(x)))
      : "gear" == this.type &&
        ((n = L.generateFrameNames("gear" + g + "_", 1, 40, "", 4)),
        (n = d.assets.getTextures(n, "atlasGame")),
        (this._gear = new PIXI.extras.AnimatedSprite(n)),
        this._gear.anchor.set(0.5, 0.5),
        this._gear.scale.set(0.5, 0.5),
        (this._gear.animationSpeed = 1),
        (this._gear.loop = !0),
        this.addChildAt(this._gear, 0),
        (this.gearSignalID = e),
        (this.gearColor = g),
        (this.gearMaxAngle = h),
        (this.gearPower = m),
        (this.TO_DESTINATION = 1),
        (this.TO_START_ANGLE = 2),
        (this._movingTo = 0));
    e = [];
    a = new F(a / d.physScale, c / d.physScale);
    for (c = d.physWorld.GetBodyList(); null != c; ) {
      for (g = c.GetFixtureList(); null != g; ) {
        if (g.TestPoint(a)) {
          e.push(c);
          break;
        }
        g = g.GetNext();
      }
      c = c.GetNext();
    }
    if (2 < e.length) throw "Too many bodies under pivot. Max is 2";
    1 == e.length && ((e[1] = e[0]), (e[0] = d.physWorld.GetGroundBody()));
    c = e[0];
    g = e[1];
    if (
      (c.type != u.b2_staticBody && ((c = g), (g = e[0])),
      (this._revJointDef = new oa()),
      this._revJointDef.Initialize(c, g, a),
      "bolt" == this.type)
    )
      (this._revJoint = d.physWorld.CreateJoint(this._revJointDef)),
        this._revJoint.EnableLimit(!0),
        this._revJoint.SetLimits(this.boltLowerAngle, this.boltUpperAngle);
    else if ("gear" == this.type) {
      if (
        ((this._trackBody = g),
        (this._massData = new Fa()),
        this._trackBody.GetMassData(this._massData),
        (this._massData.mass = 0.1),
        this._trackBody.SetType(u.b2_staticBody),
        (this._trackBodyStartAngle = q.toDegrees(this._trackBody.GetAngle())),
        l.events.on(l.EVENT_TRIGGER_PRESSED, this._onTriggerEvent, this),
        (this._lowerAngle = -this._trackBody.GetAngle()),
        (this._upperAngle = q.toRadians(this.gearMaxAngle)),
        this._lowerAngle > this._upperAngle)
      )
        (a = this._lowerAngle),
          (this._lowerAngle = this._upperAngle),
          (this._upperAngle = a);
      this.sndGear = d.assets.getSound("sndGear");
    }
  }
  function pa(a, c, b, e, g, h) {
    e = q.toRadians(e || 0);
    g = k.convertBodyTypeFromStringToNumber(g);
    l.call(this, "Platform", r.zOrder.platform);
    this.x = a;
    this.y = c;
    this.rotation = e;
    var m = d.assets.getSprite("platform", "atlasGame");
    m.scale.set(0.5, 0.5);
    m.anchor.set(0.5, 0.5);
    m.x = d.rnd.realInRange(0, m.width / 2 - b / 2);
    this.addChild(m);
    m = new PIXI.Graphics();
    m.lineStyle(2, 3352345, 1);
    m.drawRect(-b / 2, -9, b, 18);
    this.addChild(m);
    m = k.createPolygonShape(b, 18);
    h = k.createFixtureDef(m, 0.1, 0.1, h, { item: this, dynamic: !0 });
    a = k.createBodyDef(a, c, g, !1, !0, e, !1);
    this._body = k.createBody(a, [h]);
    a = new PIXI.Graphics();
    a.beginFill(9160191, 0.4);
    a.drawRect(-b / 2, -9, b, 18);
    a.endFill();
    this.addChild(a);
    this.mask = a;
    g != u.b2_staticBody &&
      (this._enableUpdate(),
      (this.angleUpdate = !0),
      (this.positionUpdate = !0));
  }
  function ka(a, c, b) {
    l.call(this, "Rock", r.zOrder.defaultZ);
    this.x = a;
    this.y = c;
    var e = d.assets.getSprite("rock", "atlasGame");
    e.scale.set(0.5, 0.5);
    e.anchor.set(0.5, 0.5);
    this.addChild(e);
    e = k.createCircleShape(24);
    b = k.createFixtureDef(e, 0.5, 0, b, { item: this, dynamic: !0 });
    a = k.createBodyDef(a, c, u.b2_dynamicBody);
    this._body = k.createBody(a, [b]);
    this._enableUpdate();
    this.positionUpdate = this.angleUpdate = !0;
  }
  function U(a, c, b, e, g) {
    l.call(this, "Spring", r.zOrder.defaultZ);
    b = q.toRadians(b);
    this.x = a;
    this.y = c;
    this.rotation = b;
    this.type = e;
    this.elasticity = g;
    g = L.generateFrameNames("spring_", 1, 8, "", 4);
    g = d.assets.getTextures(g, "atlasGame");
    this._spring = new PIXI.extras.AnimatedSprite(g);
    this._spring.anchor.set(0.5, 0.95);
    this._spring.scale.set(0.5, 0.5);
    this._spring.animationSpeed = 0.5;
    this._spring.loop = !1;
    this._spring.stop();
    this.addChildAt(this._spring, 0);
    g = k.createPolygonShape(14, 14);
    g = k.createFixtureDef(g, 0.1, 0.1, 0.1);
    var h = k.createBodyDef(
      a,
      c,
      k.convertBodyTypeFromStringToNumber(this.type),
      !1,
      !0,
      b
    );
    this._body = k.createBody(h, [g]);
    g = k.createPolygonShape(4, 10, -22, -26);
    g = k.createFixtureDef(g, 1, 0, 0.2);
    h = k.createPolygonShape(4, 10, 22, -26);
    h = k.createFixtureDef(h, 1, 0, 0.2);
    var m = k.createPolygonShape(48, 6, 0, -24);
    m = k.createFixtureDef(m, 1, 0, 1, this, !0);
    var n = k.createPolygonShape(44, 6, 0, -30);
    n = k.createFixtureDef(n, 1, 0, 1, { item: this, isSensor: !1 }, !1);
    var x = k.createPolygonShape(14, 11, 0, -15);
    x = k.createFixtureDef(x, 0.1, 0.1, 0.1, this, "dynamic" == e);
    b = k.createBodyDef(
      a,
      c,
      k.convertBodyTypeFromStringToNumber(this.type),
      !1,
      !0,
      b
    );
    if (((this._body2 = k.createBody(b, [g, h, m, n, x])), "dynamic" == e))
      (e = new Ga()),
        e.Initialize(
          this._body,
          this._body2,
          new F(a / d.physScale, c / d.physScale)
        ),
        d.physWorld.CreateJoint(e);
    d.physics.contactListener.addBeginContactListener(
      this._onBeginContact,
      this
    );
    "dynamic" == this.type &&
      (this._enableUpdate(),
      (this.angleUpdate = !0),
      (this.positionUpdate = !0));
    this.sndSpring = d.assets.getSound("sndSpring");
  }
  function V(a, c) {
    l.call(this, "Star", r.zOrder.defaultZ);
    this.x = a;
    this.y = c;
    var b = L.generateFrameNames("star_", 1, 52, "", 4);
    b = d.assets.getTextures(b, "atlasGame");
    b = new PIXI.extras.AnimatedSprite(b);
    b.anchor.set(0.5, 0.5);
    b.scale.set(0.5, 0.5);
    b.animationSpeed = 1;
    b.loop = !0;
    b.play();
    this.addChildAt(b, 0);
    b = k.createCircleShape(10);
    b = k.createFixtureDef(b, 0.2, 0.1, 1, { item: this, starSensor: !0 }, !0);
    var e = k.createBodyDef(a, c, u.b2_staticBody);
    this._body = k.createBody(e, [b]);
    d.physics.contactListener.addBeginContactListener(
      this._onBeginContact,
      this
    );
    this.sndStar = d.assets.getSound("sndStar");
  }
  function qa(a, c) {
    l.call(this, "Stopper", r.zOrder.defaultZ);
    this.x = a;
    this.y = c;
    var b = d.assets.getSprite("stopper", "atlasGame");
    b.scale.set(0.5, 0.5);
    b.anchor.set(0.5, 0.5);
    this.addChild(b);
    b = k.createCircleShape(5);
    b = k.createFixtureDef(b, 0.2, 0.1, 1, this);
    var e = k.createBodyDef(a, c, u.b2_staticBody);
    this._body = k.createBody(e, [b]);
  }
  function ra(a, c, b, e, g) {
    l.call(this, "Swings", r.zOrder.peg);
    b = q.toRadians(b);
    this.x = a;
    this.y = c;
    this.rotation = b;
    this.lowerAngle = q.toRadians(e);
    this.upperAngle = q.toRadians(g);
    e = d.assets.getSprite("swings", "atlasGame");
    e.scale.set(0.5, 0.5);
    e.anchor.set(0.5, 0.83);
    this.addChild(e);
    e = k.createPolygonShape(60, 11, 0, 0.5);
    e = k.createFixtureDef(e, 1, 0, 0.4, this);
    g = k.createPolygonShape(11, 30, 0, -20);
    g = k.createFixtureDef(g, 1, 0, 0.4, this);
    a = k.createBodyDef(a, c, u.b2_dynamicBody, !1, !0, b);
    this._body = k.createBody(a, [e, g]);
    a = d.physWorld.GetGroundBody();
    c = new oa();
    c.Initialize(a, this._body, this._body.GetPosition());
    a = d.physWorld.CreateJoint(c);
    a.EnableLimit(!0);
    a.SetLimits(this.lowerAngle - b, this.upperAngle - b);
    this._enableUpdate();
    this.positionUpdate = this.angleUpdate = !0;
  }
  function W(a, c, b, e, g, h) {
    l.call(this, "Switcher", r.zOrder.switcher);
    b = q.toRadians(b);
    this.x = a;
    this.y = c;
    this.rotation = b;
    this.type = e;
    this.signalID = g;
    this.color = h;
    e = L.generateFrameNames(this.type + this.color + "_", 1, 6, "", 4);
    e = d.assets.getTextures(e, "atlasGame");
    this._switcher = new PIXI.extras.AnimatedSprite(e);
    this._switcher.anchor.set(0.5, 1);
    this._switcher.scale.set(0.5, 0.5);
    this._switcher.animationSpeed = 1;
    this._switcher.loop = !1;
    this.addChildAt(this._switcher, 0);
    this._on = !1;
    e = k.createPolygonShape(30, 8, 0, -12);
    e = k.createFixtureDef(e, 1, 0, 0.1, { item: this, isSensor: !0 }, !0);
    g = k.createPolygonShape(40, 10, 0, -4);
    g = k.createFixtureDef(g, 1, 0, 0.1, this);
    a = k.createBodyDef(a, c, u.b2_staticBody, !1, !0, b);
    this._body = k.createBody(a, [e, g]);
    d.physics.contactListener.addBeginContactListener(
      this._onBeginContact,
      this
    );
    "button" == this.type &&
      d.physics.contactListener.addEndContactListener(this._onEndContact, this);
    this._countContacts = 0;
    this.sndSwitcher = d.assets.getSound("sndSwitcher");
  }
  function O(a, c, b, e, g) {
    l.call(this, "Teleport", r.zOrder.teleport);
    e = q.toRadians(e);
    this.x = a;
    this.y = c;
    this.rotation = e;
    this.id = b;
    b = L.generateFrameNames("teleport" + g + "_", 1, 20, "", 4);
    b = d.assets.getTextures(b, "atlasGame");
    b = new PIXI.extras.AnimatedSprite(b);
    b.anchor.set(0.5, 0.3);
    b.scale.set(0.5, 0.5);
    b.animationSpeed = 0.5;
    b.loop = !0;
    b.play();
    this.addChildAt(b, 0);
    b = k.createPolygonShape(6, 60, -20, 12);
    b = k.createFixtureDef(b, 1, 0, 0.2);
    g = k.createPolygonShape(6, 60, 20, 12);
    g = k.createFixtureDef(g, 1, 0, 0.2);
    var h = k.createPolygonShape(44, 6, 0, 39);
    h = k.createFixtureDef(h, 1, 0, 1);
    var m = k.createPolygonShape(44, 6);
    m = k.createFixtureDef(m, 1, 0, 1, { item: this, teleportSensor: !0 }, !0);
    a = k.createBodyDef(a, c, u.b2_staticBody, !0, !0, e);
    this._body = k.createBody(a, [b, g, h, m]);
    d.physics.contactListener.addBeginContactListener(
      this._onBeginContact,
      this
    );
    d.physics.contactListener.addEndContactListener(this._onEndContact, this);
    l.events.on(l.EVENT_TELEPORTATION, this._teleportation, this);
    this._inUse = !1;
    this.sndTeleport = d.assets.getSound("sndTeleport");
  }
  function X(a, c, b, e, g) {
    l.call(this, "Tube", r.zOrder.defaultZ);
    e = e || 0;
    g = g || 0;
    b = q.toRadians(b);
    this.x = a;
    this.y = c;
    this.rotation = b;
    var h = q.vectorVelocityRad(b, 100);
    this._force = new F(h.x, h.y);
    h = d.assets.getSprite("tube", "atlasGame");
    h.scale.set(0.5, 0.5);
    h.anchor.set(0.5, 0.5);
    this.addChild(h);
    var m = e + g;
    h = k.createPolygonShape(50, 6, 0, -13.5);
    h = k.createFixtureDef(h, 1, 0.1, 1);
    var n = k.createPolygonShape(50, 6, 0, 13.5);
    n = k.createFixtureDef(n, 1, 0.1, 1);
    e = k.createPolygonShape(50 + m, 10, -e / 2 + g / 2);
    e = k.createFixtureDef(e, 1, 0.1, 1, { item: this, tubeSensor: !0 }, !0);
    a = k.createBodyDef(a, c, u.b2_staticBody, !1, !0, b);
    this._body = k.createBody(a, [n, e, h]);
    this._enableUpdate();
  }
  function sa(a) {
    if ((l.call(this, "Tutorial", r.zOrder.tutorial), 1 == a))
      (a = d.assets.getSprite("tutorial1_1", "atlasUI")),
        a.scale.set(0.5, 0.5),
        a.anchor.set(0.5, 0.5),
        (a.x = 300),
        (a.y = 100),
        this.addChild(a),
        (a = d.assets.getSprite("tutorial1_2", "atlasUI")),
        a.scale.set(0.5, 0.5),
        a.anchor.set(0.5, 0.5),
        (a.x = 300),
        (a.y = 400),
        this.addChild(a);
  }
  function la(a, c, b) {
    l.call(this, "WightBall", r.zOrder.peg);
    b = b || 2;
    this.x = a;
    this.y = c;
    var e = d.assets.getSprite("weightBall", "atlasGame");
    e.scale.set(0.5, 0.5);
    e.anchor.set(0.5, 0.5);
    this.addChild(e);
    e = k.createCircleShape(40);
    b = k.createFixtureDef(e, 0.2, 0.1, b, this);
    a = k.createBodyDef(a, c, u.b2_dynamicBody);
    this._body = k.createBody(a, [b]);
    this._enableUpdate();
    this.positionUpdate = this.angleUpdate = !0;
  }
  function Y() {
    this.currLevel = 1;
    this.lastOpened = d.storage.get(d.SAVE_KEY_LAST_OPENED) || 1;
    this.totalLevels = ya.length;
  }
  function Z() {
    PIXI.Container.call(this);
    d.pixi.stage.addChild(this);
    var a = new PIXI.Graphics();
    a.beginFill(0);
    a.drawRect(0, 0, d.gameWidth0, d.gameHeight0);
    a.endFill();
    this.addChild(a);
  }
  function aa() {
    if (d.menuState) throw Error("MenuState singelton!");
    d.menuState = this;
    PIXI.Container.call(this);
    d.pixi.stage.addChildAt(this, 0);
    var a = d.assets.getSprite("bg_menu");
    a.scale.set(0.5, 0.5);
    this.addChild(a);
    this._onBtnsLevelClick = this._onBtnsLevelClick.bind(this);
    this._menuDialog = new S(this._onClick, this);
    this.addChild(this._menuDialog);
    this._levelsDialog = new R(this._onBtnsLevelClick, this._onClick, this);
    this.addChild(this._levelsDialog);
    this._creditsDialog = new ea(this._onClick, this);
    this.addChild(this._creditsDialog);
    this.sndButton = d.assets.getSound("sndButton");
  }
  function r() {
    if (d.playState) throw Error("MenuState singelton!");
    d.playState = this;
    PIXI.Container.call(this);
    d.pixi.stage.addChildAt(this, 0);
    this.aimControl = !d.device.desktop && !d.device.chromeOS;
    this.bg = d.assets.getSprite("bg_" + Math.ceil(d.levelMng.currLevel / 10));
    this.bg.scale.set(0.5, 0.5);
    this.bg.interactive = !0;
    this.aimControl || this.bg.on("pointerdown", this._onStageClick, this);
    this.addChild(this.bg);
    var a = new PIXI.Graphics();
    a.alpha = 0.1;
    a.beginFill(0);
    a.drawRect(0, 0, d.gameWidth0, d.gameHeight0);
    a.endFill();
    this.addChild(a);
    this.shotHandler = new z();
    this._onGameLayerChildAdded = this._onGameLayerChildAdded.bind(this);
    this.gameLayer = new PIXI.Container();
    this.gameLayer.onChildrenChange = this._onGameLayerChildAdded;
    this.addChild(this.gameLayer);
    this.ballLayer = new PIXI.Container();
    this.ballLayer.zOrder = r.zOrder.ball;
    this.gameLayer.addChild(this.ballLayer);
    this.uiLayer = new PIXI.Container();
    this.addChild(this.uiLayer);
    this._createUI();
    this._levelComplete = new fa(this._onBtnsClick, this);
    this._levelComplete.hide();
    this._isComplete = !1;
    d.levelMng.create();
    1 <= d.levelMng.currLevel &&
      2 >= d.levelMng.currLevel &&
      this.gameLayer.addChild(new sa(d.levelMng.currLevel));
    this.sndButton = d.assets.getSound("sndButton");
    this.aimControl &&
      ((this.aim = d.assets.getSprite("aim")),
      this.aim.scale.set(0.5, 0.5),
      this.aim.anchor.set(0.5, 0.5),
      (this.aim.visible = !1),
      this.addChild(this.aim));
  }
  function ua() {
    var a = p.innerWidth,
      c = p.innerHeight,
      b = d.gameWidth0 / d.gameHeight0,
      e = Math.floor(a),
      g = Math.floor(c);
    var h =
      (1 > b && a >= c
        ? (e = Math.floor(c * b))
        : 1 <= b && a <= c
        ? (g = Math.floor(a / b))
        : Math.floor(c * b) > a
        ? (g = Math.floor(a / b))
        : (e = Math.floor(c * b)),
      { width: e, height: g });
    d.gameWidth1 = h.width;
    d.gameHeight1 = h.height;
    d.scale = d.gameWidth1 / d.gameWidth0;
    d.gameMaxWidth1 = d.gameMaxWidth0 * d.scale;
    d.gameMaxHeight1 = d.gameMaxHeight0 * d.scale;
    d.canvasWidth = d.gameMaxWidth1 > a ? a : d.gameMaxWidth1;
    d.canvasHeight = d.gameMaxHeight1 > c ? c : d.gameMaxHeight1;
    h = document.body;
    h.style.width = d.canvasWidth + "px";
    h.style.height = d.canvasHeight + "px";
    h.style.marginLeft = a / 2 - d.canvasWidth / 2 + "px";
    h.style.marginTop = c / 2 - d.canvasHeight / 2 + "px";
    d.inited
      ? ((d.pixi.renderer.autoResize = !0),
        d.pixi.renderer.resize(d.canvasWidth, d.canvasHeight),
        d.pixi.stage.scale.set(d.scale, d.scale),
        d.physics.enabledDD && d.physics.updateCanvasSize())
      : Ha();
    d.resizeHandler && d.resizeHandler.call();
    d.imgRotate &&
      (d.imgRotate.position.set(d.canvasWidth / 2, d.canvasHeight / 2),
      (d.imgRotate.scale.x = d.imgRotate.scale.y = d.scale));
  }
  function Ha() {
    if (
      ((d.device = new Device()),
      (d.audioEnabled = d.device.canPlayAudio("ogg")),
      d.device.android && !d.device.chrome)
    ) {
      var a = document.createElement("p"),
        c = document.createTextNode(
          "This game doesn't work correctly in default Android browser. Please install Chrome on your device."
        );
      return (
        a.appendChild(c), void document.getElementById("msg").appendChild(a)
      );
    }
    a = document.getElementById("msg");
    a.parentNode.removeChild(a);
    d.pixi = new PIXI.Application(d.canvasWidth, d.canvasHeight, {
      antialias: !0,
    });
    d.pixi.renderer.backgroundColor = 0;
    d.pixi.stage.scale.set(d.scale, d.scale);
    document.body.appendChild(d.pixi.view);
    document.ontouchstart = function (b) {
      b.preventDefault();
    };
    document.body.addEventListener(
      "selectstart",
      function (b) {
        b.preventDefault();
      },
      !1
    );
    console.log(d.pixi.renderer.view.width, d.pixi.renderer.view.height);
    d.physics = new k(!1);
    d.currLevelDebug = 29;
    d.browserEvents = new C();
    d.browserEvents.on("onResize", ua);
    d.browserEvents.on("onOrientationChange", ua);
    d.storage = new ja();
    a = [];
    a.push(d.SAVE_KEY_LAST_OPENED, d.SAVE_KEY_MUSIC, d.SAVE_KEY_SOUND);
    for (c = 1; 30 >= c; c++) a.push(d.SAVE_KEY_STARS + c);
    d.storage.read(a);
    d.assets = new Q(d);
    d.rnd = new xa([(Date.now() * Math.random()).toString()]);
    try {
      d.fps = new FPSMeter(document.body);
    } catch (b) {}
    if (
      ((d.levelMng = new Y()),
      (d.shutter = new Z()),
      d.pixi.stage.addChild((d.preloader = new P())),
      (PIXI.loader.baseUrl = "assets"),
      PIXI.loader
        .add("atlasUI", "images/atlasUI.json")
        .add("atlasGame", "images/atlasGame.json")
        .add("splash", "images/splash.png")
        .add("bg_menu", "images/bg_menu.png")
        .add("bg_1", "images/bg_1.png")
        .add("bg_2", "images/bg_2.png")
        .add("bg_3", "images/bg_3.png"),
      d.audioEnabled)
    )
      (a = d.device.iOS ? ".m4a" : ".ogg"),
        PIXI.loader
          .add("sndButton", "audio/button" + a)
          .add("sndBallInBasket", "audio/ball_in_basket" + a)
          .add("sndGear", "audio/gear" + a)
          .add("sndShot", "audio/shot" + a)
          .add("sndSpring", "audio/spring" + a)
          .add("sndStar", "audio/star" + a)
          .add("sndSwitcher", "audio/switcher" + a)
          .add("sndTeleport", "audio/teleport" + a)
          .add("sndTheme", "audio/theme" + a)
          .add("sndWin", "audio/win" + a);
    PIXI.loader.on("progress", Ia).load(Ja);
    d.inited = !0;
  }
  function Ia(a, c) {
    (console.log("loading: " + c.url), d.preloader) &&
      d.preloader.setLoading(Math.round(a.progress));
  }
  function Ja() {
    d.preloader
      ? (d.preloader.setLoading(100), d.preloader.loadedCallback(Ka))
      : za();
  }
  function Ka() {
    d.splash = new ia();
    d.splash.runAfter(za);
    d.pixi.stage.addChild(d.splash);
  }
  function za() {
    // Clean up preloader and splash
    if (d.preloader) {
        d.preloader.destroy();
        d.preloader = null;
    }
    if (d.splash) {
        d.splash.destroy();
        d.splash = null;
    }
    
    // Always proceed without domain validation
    d._checkAudio();
    new aa();
    d.shutter.hide();
}

  t.prototype = Object.create(PIXI.Sprite.prototype);
  t.prototype.constructor = t;
  t.prototype.destroy = function () {
    this.disposed ||
      ((this.disposed = !0),
      this.parent && this.parent.removeChild(this),
      this.onClick.dispose(),
      (this.onClick = null),
      this.onDown.dispose(),
      (this.onDown = null),
      this.onUp.dispose(),
      (this.onUp = null),
      this.onOut.dispose(),
      (this.onOut = null),
      this._label && (this._label.destroy(), (this._label = null)),
      (this.mousedown = this.touchstart = null),
      (this.mouseup =
        this.touchend =
        this.mouseupoutside =
        this.touchendoutside =
          null),
      (this.mouseover = null),
      (this.mouseout = null),
      (this.click = null),
      (this.interactive = !1),
      (this._cacheAnchorY = null));
  };
  t.prototype.setOpenURL = function (a) {
    this.disposed ||
      this.onClick.add(function (c) {
        p.open(a, "_blank");
      });
  };
  t.prototype.setIcon = function (a, c, b, e, g) {
    if (!this.disposed) {
      b = b || 0;
      e = e || 0;
      g = g || 1;
      if ("string" == typeof a) var h = this.app.assets.getTexture(a, c);
      else if (a instanceof PIXI.Texture) h = a;
      else if (a instanceof PIXI.Sprite) this.icon = a;
      else if (null == a && this.icon)
        return this.removeChild(this.icon), void (this.icon = null);
      h &&
        (this.icon
          ? this.icon.setTexture(h)
          : (this.icon = new PIXI.Sprite(h)));
      this.icon.anchor.set(0.5, 0.5);
      this.icon.x = b;
      this.icon.y = e;
      this.icon.scale.set(g, g);
      this.addChild(this.icon);
    }
  };
  t.prototype.setLabel = function (a, c, b, e) {
    a = a || "";
    b = b || 0;
    e = e || 0;
    this._label ||
      ((this._label = new PIXI.Text(a, c)), this.addChild(this._label));
    this._label.text = a;
    c && (this._label.style = c);
    this._label.x = this.width / 2 - this._label.width / 2 + b;
    this._label.y = this.height / 2 - this._label.height / 2 + e;
  };
  t.prototype._mouseOver = function (a) {
    this.disposed ||
      ((this.isOver = !0), this.isDown || (this.tint = this.overTint));
  };
  t.prototype._mouseOut = function (a) {
    this.disposed ||
      ((this.isOver = !1),
      this.onOut.call(a),
      this.isDown || (this.tint = this.upTint));
  };
  t.prototype._mouseDown = function (a) {
    this.disposed ||
      ((this.isDown = !0), (this.tint = this.downTint), this.onDown.call(a));
  };
  t.prototype._mouseUp = function (a) {
    this.disposed ||
      ((this.isDown = !1),
      this.isOver ? (this.tint = this.overTint) : (this.tint = this.upTint),
      this.onUp.call(a));
  };
  t.prototype._clickTap = function (a) {
    this.disposed || this.onClick.call(a);
  };
  Object.defineProperty(t.prototype, "enable", {
    get: function () {
      return this.interactive;
    },
    set: function (a) {
      this.disposed ||
        ((this.interactive = a),
        !1 === a
          ? ((this.isOver = !1),
            this._mouseUp(),
            (this.tint = this.disableTint))
          : (this.tint = this.upTint));
    },
  });
  t.generateButton = function (a, c, b, e) {
    a = d.assets.getTexture(a, c);
    return new t(a, b, e);
  };
  l.prototype = Object.create(PIXI.Container.prototype);
  l.prototype.constructor = l;
  l.prototype.destroy = function () {
    PIXI.Container.prototype.destroy.call(this);
    this._body && d.physWorld.DestroyBody(this._body);
    this._body = null;
    d.pixi.ticker.remove(this._update, this);
  };
  l.prototype.setPosition = function (a, c) {
    if (this._body) {
      var b = this;
      d.physics.doIt(function () {
        b._body.SetPosition(new F(a / d.physScale, c / d.physScale));
      });
    }
    this.position.set(a, c);
  };
  l.prototype._enableUpdate = function () {
    d.pixi.ticker.add(this._update, this);
  };
  l.prototype._disableUpdate = function () {
    d.pixi.ticker.remove(this._update, this);
  };
  l.prototype._update = function () {
    this.angleUpdate && (this.rotation = this._body.GetAngle());
    this.positionUpdate &&
      ((this.x = this._body.GetPosition().x * d.physScale),
      (this.y = this._body.GetPosition().y * d.physScale));
    3e3 < this.y &&
      (console.log(
        "Item " +
          this.name +
          " has reached position of y at 3000. The item has been destroyed."
      ),
      this.destroy());
  };
  l.prototype.GetBody = function () {
    return this._body;
  };
  l.events = new EventEmitter();
  l.EVENT_TRIGGER_PRESSED = "TriggerPressed";
  l.EVENT_TELEPORTATION = "Teleportation";
  P.prototype = Object.create(PIXI.Container.prototype);
  P.prototype.constructor = P;
  P.prototype.setLoading = function (a) {
    this._loaded = a;
  };
  P.prototype.loadedCallback = function (a) {
    this._loadedCB = a;
  };
  P.prototype._update = function () {
    this._curr < this._loaded &&
      (this._curr = Math.round(this._curr + 2 * d.pixi.ticker.deltaTime));
    this._curr > this._loaded && (this._curr = this._loaded);
    this._txtLoading.text = "Loading " + this._curr + "%";
    100 == this._curr &&
      (d.pixi.ticker.remove(this._update, this),
      this._loadedCB && setTimeout(this._loadedCB, 500));
  };
  ia.prototype = Object.create(PIXI.Container.prototype);
  ia.prototype.constructor = ia;
  ia.prototype.runAfter = function (a, c) {
    setTimeout(a, void 0 != c ? c : 1e3);
  };
  Q.prototype.constructor = Q;
  Q.prototype.getTexture = function (a, c) {
    return c
      ? PIXI.loader.resources[c].textures[a]
      : PIXI.utils.TextureCache[a];
  };
  Q.prototype.getTextures = function (a, c) {
    var b = c ? PIXI.loader.resources[c].textures : PIXI.utils.TextureCache;
    for (var e = [], g = 0; g < a.length; g++) e.push(b[a[g]]);
    return e;
  };
  Q.prototype.getSprite = function (a, c, b) {
    a = new PIXI.Sprite(this.getTexture(a, c));
    return b && a.anchor.set(0.5, 0.5), a;
  };
  Q.prototype.getSound = function (a) {
    return 0 == d.audioEnabled ? null : PIXI.loader.resources[a].sound;
  };
  C.prototype.constructor = C;
  C.prototype._onVisibilityChange = function (a) {
    a.preventDefault();
    this._event.originalEvent = a;
    this._event.type = !1 === document.hidden ? "onPageShow" : "onPageHide";
    this.emit(this._event);
  };
  C.prototype._onWebkitVisibilityChange = function (a) {
    a.preventDefault();
    this._event.originalEvent = a;
    this._event.type =
      !1 === document.webkitHidden ? "onPageShow" : "onPageHide";
    this.emit(this._event);
  };
  C.prototype._onPageShow = function (a) {
    a.preventDefault();
    this._event.originalEvent = a;
    this._event.type = "onPageShow";
    this.emit(this._event);
  };
  C.prototype._onPageHide = function (a) {
    a.preventDefault();
    this._event.originalEvent = a;
    this._event.type = "onPageHide";
    this.emit(this._event);
  };
  C.prototype._onFocus = function (a) {
    a.preventDefault();
    this._event.originalEvent = a;
    this._event.type = "onFocusGet";
    this.emit(this._event);
  };
  C.prototype._onBlur = function (a) {
    a.preventDefault();
    this._event.originalEvent = a;
    this._event.type = "onFocusLost";
    this.emit(this._event);
  };
  C.prototype._onResize = function (a) {
    a.preventDefault();
    this._event.originalEvent = a;
    this._event.type = "onResize";
    this.emit(this._event);
    var c = this._getOrientation();
    this.orientation !== c &&
      ((this._event.orientation = this.orientation = c),
      this._onOrientationChange(a));
  };
  C.prototype._onOrientationChange = function (a) {
    a.preventDefault();
    this._event.originalEvent = a;
    this._event.type = "onOrientationChange";
    this._event.orientation = this.orientation = this._getOrientation();
    this.emit(this._event);
  };
  C.prototype._getOrientation = function () {
    return p.innerWidth > p.innerHeight ? "landscape" : "portrait";
  };
  EventTarget = function () {
    var a = {};
    this.addEventListener = this.on = function (c, b) {
      void 0 === a[c] && (a[c] = []);
      -1 === a[c].indexOf(b) && a[c].push(b);
    };
    this.dispatchEvent = this.emit = function (c) {
      if (a[c.type] && a[c.type].length)
        for (var b = 0, e = a[c.type].length; b < e; b++) a[c.type][b](c);
    };
    this.removeEventListener = this.off = function (c, b) {
      var e = a[c].indexOf(b);
      -1 !== e && a[c].splice(e, 1);
    };
    this.removeAllEventListeners = function (c) {
      (c = a[c]) && (c.length = 0);
    };
  };
  A.prototype = Object.create(PIXI.Sprite.prototype);
  A.prototype.constructor = A;
  A.prototype.destroy = function () {
    this.disposed ||
      ((this.disposed = !0),
      this.parent && this.parent.removeChild(this),
      this.onClick.dispose(),
      (this.onClick = null),
      this.onDown.dispose(),
      (this.onDown = null),
      this.onUp.dispose(),
      (this.onUp = null),
      this.onOut.dispose(),
      (this.onOut = null),
      (this.up = null),
      (this.over = null),
      (this.down = null),
      (this.mousedown = this.touchstart = null),
      (this.mouseup =
        this.touchend =
        this.mouseupoutside =
        this.touchendoutside =
          null),
      (this.mouseover = null),
      (this.mouseout = null),
      (this.click = null),
      (this.interactive = !1),
      (this._cacheAnchorY = null));
  };
  A.prototype.setOpenURL = function (a) {
    this.disposed ||
      this.onClick.add(function (c) {
        p.open(a, "_blank");
      });
  };
  A.prototype._mouseOver = function (a) {
    this.disposed ||
      ((this.isOver = !0),
      this.isDown ||
        (this.over
          ? (this.texture = this.over)
          : ((this._cacheAnchorY = this.anchor.y), (this.anchor.y -= 0.01))));
  };
  A.prototype._mouseOut = function (a) {
    this.disposed ||
      ((this.isOver = !1),
      this.onOut.call(a),
      this.isDown ||
        ((this.texture = this.up),
        this._cacheAnchorY &&
          ((this.anchor.y = this._cacheAnchorY), (this._cacheAnchorY = null))));
  };
  A.prototype._mouseDown = function (a) {
    this.disposed ||
      ((this.isDown = !0),
      this.down && (this.texture = this.down),
      this.onDown.call(a));
  };
  A.prototype._mouseUp = function (a) {
    this.disposed ||
      ((this.isDown = !1),
      this.isOver
        ? this.over
          ? (this.texture = this.over)
          : (this.anchor.y = this._cacheAnchorY - 0.01)
        : ((this.texture = this.up),
          this._cacheAnchorY &&
            ((this.anchor.y = this._cacheAnchorY),
            (this._cacheAnchorY = null))),
      this.onUp.call(a));
  };
  A.prototype._clickTap = function (a) {
    this.disposed || this.onClick.call(a);
  };
  Object.defineProperty(A.prototype, "enable", {
    get: function () {
      return this.interactive;
    },
    set: function (a) {
      this.disposed ||
        ((this.interactive = a),
        !1 === a && ((this.isOver = !1), this._mouseUp()));
    },
  });
  A.generateButton = function (a, c, b, e) {
    var g = d.assets.getTexture(a + "up", c);
    try {
      var h = d.assets.getTexture(a + "over", c);
    } catch (n) {}
    try {
      var m = d.assets.getTexture(a + "down", c);
    } catch (n) {}
    return new A(g, h, m, b, e);
  };
  ba.prototype = Object.create(t.prototype);
  ba.prototype.constructor = ba;
  ba.prototype.setLocked = function (a) {
    if (((this.enable = !a), a))
      for (this.alpha = 0.5, a = 0; 3 > a; a++) this._stars[a].visible = !1;
    else {
      a = d.storage.get(d.SAVE_KEY_STARS + this.num);
      for (var c = 0; 3 > c; c++) this._stars[c].visible = c + 1 <= a;
      this.alpha = 1;
    }
  };
  ca.prototype = Object.create(PIXI.Container.prototype);
  ca.prototype.constructor = ba;
  ca.prototype._onClick = function (a) {
    a.target == this._on
      ? (this.on = !1)
      : a.target == this._off && (this.on = !0);
    a.target = this;
    a.isOn = this.on;
    this._callback.call(this._callbackScope, a);
  };
  Object.defineProperty(ca.prototype, "on", {
    get: function () {
      return this._on.visible;
    },
    set: function (a) {
      this.disposed || ((this._on.visible = a), (this._off.visible = !a));
    },
  });
  D.__id = 0;
  D.prototype.add = function (a) {
    return 0 <= this._arr.indexOf(a)
      ? void 0
      : void (this._arr[this._arr.length] = a);
  };
  D.prototype.remove = function (a) {
    a = this._arr.indexOf(a);
    return 0 > a ? void 0 : void this._arr.splice(a, 1);
  };
  D.prototype.at = function (a) {
    return (
      0 > a
        ? (this.throwIfOut &&
            Error("Index is lower than zero. [" + this.name + "]."),
          (a = 0))
        : a >= this._arr.length &&
          (this.throwIfOut &&
            Error("Index is higher than total. [" + this.name + "]."),
          (a = this._arr.length - 1)),
      this._arr[a]
    );
  };
  D.prototype.first = function () {
    return this._arr[0];
  };
  D.prototype.last = function () {
    return this._arr[this._arr.length - 1];
  };
  D.prototype.getByProperty = function (a, c) {
    if (null == a || null == c) return null;
    for (var b = this.total(), e = 0; e < b; e++) {
      var g = this._arr[e];
      if (g[a] && g[a] == c) return g;
    }
    return null;
  };
  D.prototype.has = function (a) {
    return 0 <= this._arr.indexOf(a);
  };
  D.prototype.clear = function () {
    this._arr.splice(0, this._arr.length);
  };
  D.prototype.total = function () {
    return this._arr.length;
  };
  H.prototype = Object.create(Box2D.Dynamics.b2ContactListener.prototype);
  H.prototype.constructor = H;
  H.prototype.BeginContact = function (a) {
    this._ee.emit(this._eventNameBeginContact, a);
  };
  H.prototype.EndContact = function (a) {
    this._ee.emit(this._eventNameEndContact, a);
  };
  H.prototype.addBeginContactListener = function (a, c) {
    this._ee.on(this._eventNameBeginContact, a, c);
  };
  H.prototype.removeBeginContactListener = function (a, c) {
    this._ee.off(this._eventNameBeginContact, a, c);
  };
  H.prototype.addEndContactListener = function (a, c) {
    this._ee.on(this._eventNameEndContact, a, c);
  };
  H.prototype.removeEndContactListener = function (a, c) {
    this._ee.off(this._eventNameEndContact, a, c);
  };
  Device = function () {
    this.ie =
      this.firefox =
      this.epiphany =
      this.chrome =
      this.arora =
      this.quirksMode =
      this.vibration =
      this.typedArray =
      this.pointerLock =
      this.css3D =
      this.mspointer =
      this.touch =
      this.worker =
      this.webGL =
      this.localStorage =
      this.fileSystem =
      this.file =
      this.canvas =
      this.windows =
      this.macOS =
      this.linux =
      this.chromeOS =
      this.android =
      this.ejecta =
      this.cocoonJS =
      this.iOS =
      this.desktop =
      this.patchAndroidClearRectBug =
        !1;
    this.ieVersion = 0;
    this.trident = !1;
    this.tridentVersion = 0;
    this.iPad =
      this.iPhone4 =
      this.iPhone =
      this.webm =
      this.m4a =
      this.wav =
      this.mp3 =
      this.opus =
      this.ogg =
      this.webAudio =
      this.audioData =
      this.silk =
      this.webApp =
      this.safari =
      this.opera =
      this.midori =
      this.mobileSafari =
        !1;
    this.pixelRatio = 0;
    this.littleEndian = !1;
    this._checkAudio();
    this._checkBrowser();
    this._checkCSS3D();
    this._checkDevice();
    this._checkFeatures();
    this._checkOS();
  };
  Device.prototype = {
    _checkOS: function () {
      var a = navigator.userAgent;
      /Android/.test(a)
        ? (this.android = !0)
        : /CrOS/.test(a)
        ? (this.chromeOS = !0)
        : /iP[ao]d|iPhone/i.test(a)
        ? (this.iOS = !0)
        : /Linux/.test(a)
        ? (this.linux = !0)
        : /Mac OS/.test(a)
        ? (this.macOS = !0)
        : /Windows/.test(a) && (this.windows = !0);
      (this.windows || this.macOS || (this.linux && !1 === this.silk)) &&
        (this.desktop = !0);
    },
    _checkFeatures: function () {
      this.canvas = !!p.CanvasRenderingContext2D;
      try {
        this.localStorage = !!localStorage.getItem;
      } catch (b) {
        this.localStorage = !1;
      }
      this.file = !!(p.File && p.FileReader && p.FileList && p.Blob);
      this.fileSystem = !!p.requestFileSystem;
      try {
        var a = document.createElement("canvas");
        var c =
          !!p.WebGLRenderingContext &&
          (a.getContext("webgl") || a.getContext("experimental-webgl"));
      } catch (b) {
        c = !1;
      }
      this.webGL = c;
      null === this.webGL || !1 === this.webGL
        ? (this.webGL = !1)
        : (this.webGL = !0);
      this.worker = !!p.Worker;
      ("ontouchstart" in document.documentElement ||
        (p.navigator.maxTouchPoints && 1 < p.navigator.maxTouchPoints)) &&
        (this.touch = !0);
      (p.navigator.msPointerEnabled || p.navigator.pointerEnabled) &&
        (this.mspointer = !0);
      this.pointerLock =
        "pointerLockElement" in document ||
        "mozPointerLockElement" in document ||
        "webkitPointerLockElement" in document;
      this.quirksMode = "CSS1Compat" !== document.compatMode;
    },
    _checkBrowser: function () {
      var a = navigator.userAgent;
      /Arora/.test(a)
        ? (this.arora = !0)
        : /Chrome/.test(a)
        ? (this.chrome = !0)
        : /Epiphany/.test(a)
        ? (this.epiphany = !0)
        : /Firefox/.test(a)
        ? (this.firefox = !0)
        : /Mobile Safari/.test(a)
        ? (this.mobileSafari = !0)
        : /MSIE (\d+\.\d+);/.test(a)
        ? ((this.ie = !0), (this.ieVersion = parseInt(RegExp.$1, 10)))
        : /Midori/.test(a)
        ? (this.midori = !0)
        : /Opera/.test(a)
        ? (this.opera = !0)
        : /Safari/.test(a)
        ? (this.safari = !0)
        : /Silk/.test(a)
        ? (this.silk = !0)
        : /Trident\/(\d+\.\d+);/.test(a) &&
          ((this.ie = !0),
          (this.trident = !0),
          (this.tridentVersion = parseInt(RegExp.$1, 10)));
      navigator.standalone && (this.webApp = !0);
      navigator.isCocoonJS && (this.cocoonJS = !0);
      "undefined" != typeof p.ejecta && (this.ejecta = !0);
    },
    _checkAudio: function () {
      this.audioData = !!p.Audio;
      this.webAudio = !(!p.webkitAudioContext && !p.AudioContext);
      var a = document.createElement("audio");
      try {
        a.canPlayType &&
          (a.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, "") &&
            (this.ogg = !0),
          a.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/, "") &&
            (this.opus = !0),
          a.canPlayType("audio/mpeg;").replace(/^no$/, "") && (this.mp3 = !0),
          a.canPlayType('audio/wav; codecs="1"').replace(/^no$/, "") &&
            (this.wav = !0),
          (a.canPlayType("audio/x-m4a;") ||
            a.canPlayType("audio/aac;").replace(/^no$/, "")) &&
            (this.m4a = !0),
          a.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, "") &&
            (this.webm = !0));
      } catch (c) {}
    },
    _checkDevice: function () {
      this.pixelRatio = p.devicePixelRatio || 1;
      this.iPhone = -1 != navigator.userAgent.toLowerCase().indexOf("iphone");
      this.iPhone4 = 2 == this.pixelRatio && this.iPhone;
      this.iPad = -1 != navigator.userAgent.toLowerCase().indexOf("ipad");
      "undefined" != typeof Int8Array
        ? ((this.littleEndian =
            0 < new Int8Array(new Int16Array([1]).buffer)[0]),
          (this.typedArray = !0))
        : ((this.littleEndian = !1), (this.typedArray = !1));
      navigator.vibrate =
        navigator.vibrate ||
        navigator.webkitVibrate ||
        navigator.mozVibrate ||
        navigator.msVibrate;
      navigator.vibrate && (this.vibration = !0);
    },
    _checkCSS3D: function () {
      var a,
        c = document.createElement("p"),
        b = {
          webkitTransform: "-webkit-transform",
          OTransform: "-o-transform",
          msTransform: "-ms-transform",
          MozTransform: "-moz-transform",
          transform: "transform",
        };
      document.body.insertBefore(c, null);
      for (var e in b)
        void 0 !== c.style[e] &&
          ((c.style[e] = "translate3d(1px,1px,1px)"),
          (a = p.getComputedStyle(c).getPropertyValue(b[e])));
      document.body.removeChild(c);
      this.css3D = void 0 !== a && 0 < a.length && "none" !== a;
    },
    canPlayAudio: function (a) {
      return (
        !("mp3" != a || !this.mp3) ||
        !("ogg" != a || (!this.ogg && !this.opus)) ||
        !("m4a" != a || !this.m4a) ||
        !("wav" != a || !this.wav) ||
        !("webm" != a || !this.webm)
      );
    },
    isConsoleOpen: function () {
      return (
        !(!p.console || !p.console.firebug) ||
        (!!p.console &&
          (console.profile(),
          console.profileEnd(),
          console.clear && console.clear(),
          0 < console.profiles.length))
      );
    },
  };
  Device.prototype.constructor = Device;
  z.prototype.dispose = function () {
    this.disposed ||
      ((this.disposed = !0),
      (this.count = 0),
      (this._callbacks = null),
      (this._doItAfter = null));
  };
  z.prototype.has = function (a, c) {
    if (!this.disposed) return 0 <= this._callbacks.indexOf(a);
  };
  z.prototype.add = function (a) {
    if (!this.disposed && !this.has(a)) {
      var c = this,
        b = function () {
          c._callbacks[c.count] = a;
          c.count++;
        };
      this._blocked ? (this._doItAfter[this._doItAfter.length] = b) : b();
    }
  };
  z.prototype.remove = function (a) {
    if (!(this.disposed || 0 > this._callbacks.indexOf(a))) {
      var c = this,
        b = function () {
          var e = c._callbacks.indexOf(a);
          c._callbacks.splice(e, 1);
          c.count--;
        };
      this._blocked ? (this._doItAfter[this._doItAfter.length] = b) : b();
    }
  };
  z.prototype.call = function () {
    if (!this.disposed && 0 < this._callbacks.length) {
      var a;
      this._blocked = !0;
      for (a = this._callbacks.length - 1; 0 <= a; a--)
        this._callbacks[a].apply(
          null,
          0 < arguments.length ? Array.prototype.slice.call(arguments) : null
        );
      if (
        ((this._blocked = !1), !this.disposed) &&
        0 < this._doItAfter.length
      ) {
        for (a = this._doItAfter.length - 1; 0 <= a; a--) this._doItAfter[a]();
        this._doItAfter.splice(0, this._doItAfter.length);
      }
    }
  };
  y.prototype.constructor = y;
  var va = "";
  y.prototype.collectInteractiveSprite = function (a, c) {
    for (var b = a.children, e = b.length, g = 0; g < e; g++) {
      var h = b[g];
      (!1 === h.visible && !1 === this.interactInvisible) ||
        (h.interactive
          ? (console.log(va, h.name),
            (h.__iParent = c),
            this.interactiveItems.push(h),
            0 < h.children.length &&
              ((va += "\t"), this.collectInteractiveSprite(h, h)))
          : ((h.__iParent = null),
            0 < h.children.length && this.collectInteractiveSprite(h, c)));
    }
    va = "";
  };
  y.prototype.setTarget = function (a) {
    this.target = a;
    null === this.interactionDOMElement && this.setTargetDomElement(a.view);
    document.body.addEventListener("mouseup", this.onMouseUp, !0);
  };
  y.prototype.setTargetDomElement = function (a) {
    null !== this.interactionDOMElement &&
      ((this.interactionDOMElement.style["-ms-content-zooming"] = ""),
      (this.interactionDOMElement.style["-ms-touch-action"] = ""),
      this.interactionDOMElement.removeEventListener(
        "mousemove",
        this.onMouseMove,
        !0
      ),
      this.interactionDOMElement.removeEventListener(
        "mousedown",
        this.onMouseDown,
        !0
      ),
      this.interactionDOMElement.removeEventListener(
        "mouseout",
        this.onMouseOut,
        !0
      ),
      this.interactionDOMElement.removeEventListener(
        "touchstart",
        this.onTouchStart,
        !0
      ),
      this.interactionDOMElement.removeEventListener(
        "touchend",
        this.onTouchEnd,
        !0
      ),
      this.interactionDOMElement.removeEventListener(
        "touchmove",
        this.onTouchMove,
        !0
      ));
    p.navigator.msPointerEnabled &&
      ((a.style["-ms-content-zooming"] = "none"),
      (a.style["-ms-touch-action"] = "none"));
    this.interactionDOMElement = a;
    a.addEventListener("mousemove", this.onMouseMove, !0);
    a.addEventListener("mousedown", this.onMouseDown, !0);
    a.addEventListener("mouseout", this.onMouseOut, !0);
    a.addEventListener("touchstart", this.onTouchStart, !0);
    a.addEventListener("touchend", this.onTouchEnd, !0);
    a.addEventListener("touchmove", this.onTouchMove, !0);
  };
  y.prototype.update = function () {
    if (this.target) {
      var a = Date.now(),
        c = a - this.last;
      if (((c = (30 * c) / 1e3), !(1 > c))) {
        this.last = a;
        this.dirty &&
          ((this.dirty = !1),
          (this.interactiveItems = []),
          this.stage.interactive && this.interactiveItems.push(this.stage),
          this.collectInteractiveSprite(this.stage, this.stage));
        this.interactionDOMElement.style.cursor = "inherit";
        c = this.interactiveItems.length;
        for (a = c - 1; 0 <= a; a--) {
          var b = this.interactiveItems[a];
          !(b.mouseover || b.mouseout || b.buttonMode) ||
            (b.__iParent && b.__iParent.__target) ||
            ((b.__hit = null != b.__target || this.hitTest(b, this.mouse)),
            b.__hit
              ? (b.buttonMode &&
                  (this.interactionDOMElement.style.cursor = b.defaultCursor),
                b.__iParent && (b.__iParent.__target = b),
                b.__target
                  ? (this.mouse.target = b.__target)
                  : (this.mouse.target = b),
                b.__isOver ||
                  (b.mouseover && b.mouseover(this.mouse), (b.__isOver = !0)))
              : b.__isOver &&
                (b.mouseout && b.mouseout(this.mouse), (b.__isOver = !1)));
        }
        for (a = c - 1; 0 <= a; a--)
          (b = this.interactiveItems[a]), (b.__target = null);
      }
    }
  };
  y.prototype.onMouseMove = function (a) {
    this.mouse.originalEvent = a || p.event;
    var c = this.interactionDOMElement.getBoundingClientRect();
    this.mouse.global.x = (this.target.width / c.width) * (a.clientX - c.left);
    this.mouse.global.y = (this.target.height / c.height) * (a.clientY - c.top);
    a = this.interactiveItems.length;
    for (c = 0; c < a; c++) {
      var b = this.interactiveItems[c];
      b.mousemove && b.mousemove(this.mouse);
    }
  };
  y.prototype.onMouseDown = function (a) {
    this.mouse.originalEvent = a || p.event;
    a = this.interactiveItems.length;
    for (
      var c = function (m, n) {
          return m === n || (!!m.__target && c(m.__target, n));
        },
        b = null,
        e = 0,
        g = a - 1;
      0 <= g;
      g--
    ) {
      var h = this.interactiveItems[g];
      h.mousedown || h.click
        ? (h != b && b && 0 == c(h, b)) ||
          ((h.__hit = h.__target || this.hitTest(h, this.mouse)),
          e++,
          h.__hit &&
            (b || (b = h),
            h.__iParent && (h.__iParent.__target = h.__target || h),
            (this.mouse.target = h.__target || h),
            h.mousedown && h.mousedown(this.mouse),
            (h.__isDown = !0)))
        : (h.__iParent.__target = h.__target);
    }
    console.log(e, a);
    for (g = a - 1; 0 <= g; g--)
      (h = this.interactiveItems[g]), (h.__target = null);
  };
  y.prototype.onMouseOut = function () {
    var a = this.interactiveItems.length;
    this.interactionDOMElement.style.cursor = "inherit";
    for (var c = 0; c < a; c++) {
      var b = this.interactiveItems[c];
      b.__isOver &&
        ((this.mouse.target = b),
        b.mouseout && b.mouseout(this.mouse),
        (b.__isOver = !1));
    }
  };
  y.prototype.onMouseUp = function (a) {
    this.mouse.originalEvent = a || p.event;
    a = this.interactiveItems.length;
    for (var c = !1, b = 0; b < a; b++) {
      var e = this.interactiveItems[b];
      e.__hit = this.hitTest(e, this.mouse);
      e.__hit && !c
        ? (e.mouseup && e.mouseup(this.mouse),
          e.__isDown && e.click && e.click(this.mouse),
          e.interactiveChildren || (c = !0))
        : e.__isDown && e.mouseupoutside && e.mouseupoutside(this.mouse);
      e.__isDown = !1;
    }
  };
  y.prototype.hitTest = function (a, c) {
    var b = c.global;
    if (!a.worldVisible) return !1;
    var e = a instanceof PIXI.Sprite,
      g = a.worldTransform,
      h = g[0],
      m = g[1],
      n = g[2],
      x = g[3],
      w = g[4];
    g = g[5];
    var E = 1 / (h * w + m * -x);
    m = w * E * b.x + -m * E * b.y + (g * m - n * w) * E;
    b = h * E * b.y + -x * E * b.x + (-g * h + n * x) * E;
    if (a.hitArea && a.hitArea.contains)
      return !!a.hitArea.contains(m, b) && ((c.target = a), !0);
    if (e) {
      var J;
      e = a.texture.frame.width;
      h = a.texture.frame.height;
      n = -e * a.anchor.x;
      if (m > n && m < n + e && ((J = -h * a.anchor.y), b > J && b < J + h))
        return (c.target = a), !0;
    }
    J = a.children.length;
    for (e = 0; e < J; e++)
      if (((m = a.children[e]), this.hitTest(m, c)))
        return (c.target = m), (c.currentTarget = a), !0;
    return !1;
  };
  y.prototype.onTouchMove = function (a) {
    var c = this.interactionDOMElement.getBoundingClientRect(),
      b = a.changedTouches,
      e;
    for (e = 0; e < b.length; e++) {
      var g = b[e];
      var h = this.touchs[g.identifier];
      h.originalEvent = a || p.event;
      h.global.x = (this.target.width / c.width) * (g.clientX - c.left);
      h.global.y = (this.target.height / c.height) * (g.clientY - c.top);
      navigator.isCocoonJS &&
        ((h.global.x = g.clientX), (h.global.y = g.clientY));
    }
    a = this.interactiveItems.length;
    for (e = 0; e < a; e++)
      (c = this.interactiveItems[e]), c.touchmove && c.touchmove(h);
  };
  y.prototype.onTouchStart = function (a) {
    for (
      var c = this.interactionDOMElement.getBoundingClientRect(),
        b = a.changedTouches,
        e = 0;
      e < b.length;
      e++
    ) {
      var g = b[e],
        h = this.pool.pop();
      h || (h = new PIXI.InteractionData());
      h.originalEvent = a || p.event;
      this.touchs[g.identifier] = h;
      h.global.x = (this.target.width / c.width) * (g.clientX - c.left);
      h.global.y = (this.target.height / c.height) * (g.clientY - c.top);
      navigator.isCocoonJS &&
        ((h.global.x = g.clientX), (h.global.y = g.clientY));
      g = this.interactiveItems.length;
      for (var m = 0; m < g; m++) {
        var n = this.interactiveItems[m];
        if (
          (n.touchstart || n.tap) &&
          ((n.__hit = this.hitTest(n, h)),
          n.__hit &&
            (n.touchstart && n.touchstart(h),
            (n.__isDown = !0),
            (n.__touchData = h),
            !n.interactiveChildren))
        )
          break;
      }
    }
  };
  y.prototype.onTouchEnd = function (a) {
    for (
      var c = this.interactionDOMElement.getBoundingClientRect(),
        b = a.changedTouches,
        e = 0;
      e < b.length;
      e++
    ) {
      var g = b[e],
        h = this.touchs[g.identifier],
        m = !1;
      h.global.x = (this.target.width / c.width) * (g.clientX - c.left);
      h.global.y = (this.target.height / c.height) * (g.clientY - c.top);
      navigator.isCocoonJS &&
        ((h.global.x = g.clientX), (h.global.y = g.clientY));
      for (var n = this.interactiveItems.length, x = 0; x < n; x++) {
        var w = this.interactiveItems[x],
          E = w.__touchData;
        w.__hit = this.hitTest(w, h);
        E === h &&
          ((h.originalEvent = a || p.event),
          (w.touchend || w.tap) &&
            (w.__hit && !m
              ? (w.touchend && w.touchend(h),
                w.__isDown && w.tap && w.tap(h),
                w.interactiveChildren || (m = !0))
              : w.__isDown && w.touchendoutside && w.touchendoutside(h),
            (w.__isDown = !1)),
          (w.__touchData = null));
      }
      this.pool.push(h);
      this.touchs[g.identifier] = null;
    }
  };
  y.InteractionData = function () {
    this.global = new PIXI.Point();
    this.local = new PIXI.Point();
    this.originalEvent = this.target = this.currentTarget = null;
  };
  y.InteractionData.prototype.getLocalPosition = function (a) {
    var c = a.worldTransform;
    a = this.global;
    var b = c[0],
      e = c[1],
      g = c[2],
      h = c[3],
      m = c[4];
    c = c[5];
    var n = 1 / (b * m + e * -h);
    return new PIXI.Point(
      m * n * a.x + -e * n * a.y + (c * e - g * m) * n,
      b * n * a.y + -h * n * a.x + (-c * b + g * h) * n
    );
  };
  y.InteractionData.prototype.constructor = y.InteractionData;
  var q = {
    distance1: function (a, c, b, e) {
      a = b - a;
      c = e - c;
      return Math.sqrt(a * a + c * c);
    },
    distance2: function (a, c) {
      var b = c.x - a.x,
        e = c.y - a.y;
      return Math.sqrt(b * b + e * e);
    },
    angleRad1: function (a, c, b, e) {
      return Math.atan2(e - c, b - a);
    },
    angleDeg1: function (a, c, b, e) {
      return (Math.atan2(e - c, b - a) / Math.PI) * 180;
    },
    angleRad2: function (a, c) {
      return Math.atan2(c.y - a.y, c.x - a.x);
    },
    angleDeg2: function (a, c) {
      return (Math.atan2(c.y - a.y, c.x - a.x) / Math.PI) * 180;
    },
    vectorVelocityRad: function (a, c) {
      return { x: Math.cos(a) * c, y: Math.sin(a) * c };
    },
    vectorVelocityDeg: function (a, c) {
      var b = (a * Math.PI) / 180;
      return { x: Math.cos(b) * c, y: Math.sin(b) * c };
    },
    equal: function (a, c, b) {
      return (b = b || 1e-5), Math.abs(a - c) <= b;
    },
    toDegrees: function (a) {
      return (180 * a) / Math.PI;
    },
    toRadians: function (a) {
      return (a * Math.PI) / 180;
    },
    normAngleDeg: function (a, c) {
      return (a %= 360), (a = (a + 360) % 360), c && 180 < a && (a -= 360), a;
    },
    pointLength: function (a) {
      return Math.sqrt(a.x * a.x + a.y * a.y);
    },
    pointNormalize: function (a, c) {
      var b = q.pointLength(a);
      return 0 == b
        ? a
        : ((a.x /= b), (a.y /= b), c && ((a.x *= c), (a.y *= c)), a);
    },
    intersection: function (a, c, b, e, g) {
      if ((a.x == b.x && a.y == b.y) || (a.x == e.x && a.y == e.y))
        return null != g && g.set(a), !0;
      if ((c.x == b.x && c.y == b.y) || (c.x == e.x && c.y == e.y))
        return null != g && g.set(c), !0;
      var h = c.sub(a),
        m = e.sub(b),
        n = -h.y,
        x = h.x,
        w = -(n * a.x + x * a.y),
        E = -m.y,
        J = m.x,
        Aa = -(E * b.x + J * b.y);
      m = E * a.x + J * a.y + Aa;
      c = E * c.x + J * c.y + Aa;
      b = n * b.x + x * b.y + w;
      e = n * e.x + x * e.y + w;
      if (0 <= m * c || 0 <= b * e) return !1;
      e = m / (m - c);
      h.x *= e;
      h.y *= e;
      a = a.add(h);
      return null != g && (g.x = a.x), null != g && (g.y = a.y), !0;
    },
  };
  ja.prototype.get = function (a) {
    return this._storage[a];
  };
  ja.prototype.set = function (a, c) {
    this._storage[a] = c.toString();
    this.localStorageEnable && localStorage.setItem(a, c.toString());
  };
  ja.prototype.read = function (a) {
    if (this.localStorageEnable)
      for (var c = a.length, b = 0; b < c; b++) {
        var e = a[b],
          g = localStorage.getItem(e);
        g && (this._storage[e] = g);
      }
  };
  ja.prototype.clear = function () {
    this._storage = {};
    localStorage.clear();
  };
  var L = {
      generateFrameNames: function (a, c, b, e, g) {
        "undefined" == typeof e && (e = "");
        var h = [];
        if (c < b)
          for (; c <= b; c++) {
            var m =
              "number" == typeof g
                ? L.pad(c.toString(), g, "0", 1)
                : c.toString();
            m = a + m + e;
            h.push(m);
          }
        else
          for (; c >= b; c--)
            (m =
              "number" == typeof g
                ? Phaser.Utils.pad(c.toString(), g, "0", 1)
                : c.toString()),
              (m = a + m + e),
              h.push(m);
        return h;
      },
      pad: function (a, c, b, e) {
        "undefined" == typeof c && (c = 0);
        "undefined" == typeof b && (b = " ");
        "undefined" == typeof e && (e = 3);
        if (c + 1 >= a.length)
          switch (e) {
            case 1:
              a = Array(c + 1 - a.length).join(b) + a;
              break;
            case 3:
              e = Math.ceil((c -= a.length) / 2);
              a = Array(c - e + 1).join(b) + a + Array(e + 1).join(b);
              break;
            default:
              a += Array(c + 1 - a.length).join(b);
          }
        return a;
      },
      atHome: function (a) {
        return -1 < a.indexOf(p.location.hostname);
      },
    },
    F = Box2D.Common.Math.b2Vec2,
    Ba = (Box2D.Collision.b2AABB, Box2D.Dynamics.b2BodyDef),
    u = Box2D.Dynamics.b2Body,
    Ca = Box2D.Dynamics.b2FixtureDef,
    Ea = (Box2D.Dynamics.b2Fixture, Box2D.Dynamics.b2World),
    Fa = Box2D.Collision.Shapes.b2MassData,
    Da = Box2D.Collision.Shapes.b2PolygonShape,
    La = Box2D.Collision.Shapes.b2CircleShape,
    wa = Box2D.Dynamics.b2DebugDraw,
    oa =
      (Box2D.Dynamics.Joints.b2MouseJointDef,
      Box2D.Dynamics.Joints.b2RevoluteJoint,
      Box2D.Dynamics.Joints.b2RevoluteJointDef),
    Ga = Box2D.Dynamics.Joints.b2WeldJointDef;
  Box2D.Dynamics.Joints.b2WeldJoint;
  k.prototype.constructor = k;
  k.prototype.enableDebugDraw = function () {
    this.enabledDD = !0;
    this._canvas = document.createElement("canvas");
    this._canvas.id = "PhysDebugDraw";
    this._canvas.width = d.pixi.renderer.width;
    this._canvas.height = d.pixi.renderer.height;
    this._canvas.style.zIndex = 1;
    this._canvas.style.left = 0;
    this._canvas.style.position = "absolute";
    this._canvas.style.pointerEvents = "none";
    document.body.appendChild(this._canvas);
    this._context = this._canvas.getContext("2d");
    this._context.scale(d.scale, d.scale);
    var a = new wa();
    a.SetSprite(this._context);
    a.SetDrawScale(d.physScale);
    a.SetFillAlpha(0.3);
    a.SetLineThickness(1);
    a.SetFlags(wa.e_shapeBit | wa.e_jointBit);
    this.world.SetDebugDraw(a);
  };
  k.prototype.updateCanvasSize = function () {
    this.enabledDD &&
      ((this._canvas.width = d.pixi.renderer.width),
      (this._canvas.height = d.pixi.renderer.height),
      (this._canvas.style.width = d.pixi.view.style.width),
      (this._canvas.style.height = d.pixi.view.style.height),
      this._context.scale(d.scale, d.scale));
  };
  k.prototype.doIt = function (a) {
    return this.world.IsLocked() ? (this._doIt.push(a), !1) : (a.call(), !0);
  };
  k.prototype.doItAll = function () {
    for (var a = this._doIt.length, c = 0; c < a; c++) this._doIt[c].call();
    this.clearDoIt();
  };
  k.prototype.clearDoIt = function () {
    this._doIt = [];
  };
  k.prototype._update = function () {
    this.world.Step(1 / 60, 10, 10);
    this.enabledDD && this.world.DrawDebugData();
    this.world.ClearForces();
    0 < this._doIt.length && this.doItAll();
  };
  k.prototype._createGround = function () {
    var a = new Ca();
    a.density = 1;
    a.friction = 0.5;
    a.restitution = 0.2;
    var c = new Ba();
    c.type = u.b2_staticBody;
    a.shape = new Da();
    a.shape.SetAsBox((d.gameWidth0 / 2 - 4) / d.physScale, 10 / d.physScale);
    c.position.Set(d.gameWidth0 / 2 / d.physScale, d.gameHeight0 / d.physScale);
    this.world.CreateBody(c).CreateFixture(a);
  };
  k.createCircleShape = function (a, c) {
    var b = new La(a / d.physScale);
    return c && b.SetLocalPosition(c), b;
  };
  k.createPolygonShape = function (a, c, b, e, g) {
    b = b || 0;
    e = e || 0;
    g = g || 0;
    var h = new Da();
    return (
      0 == b && 0 == e && 0 == g
        ? h.SetAsBox(a / 2 / d.physScale, c / 2 / d.physScale)
        : h.SetAsOrientedBox(
            a / 2 / d.physScale,
            c / 2 / d.physScale,
            new F(b / d.physScale, e / d.physScale),
            g
          ),
      h
    );
  };
  k.createFixtureDef = function (a, c, b, e, g, h, m) {
    var n = new Ca();
    return (
      (g = g || null),
      (h = h || !1),
      (m = m || null),
      (n.shape = a),
      (n.friction = c),
      (n.restitution = b),
      (n.density = e),
      (n.isSensor = h),
      (n.userData = g),
      m && (n.filter = m),
      n
    );
  };
  k.createBodyDef = function (a, c, b, e, g, h, m) {
    var n = new Ba();
    return (
      (e = e || !1),
      (g = g || !0),
      (h = h || 0),
      (m = m || !1),
      (n.type = b),
      n.position.Set(a / d.physScale, c / d.physScale),
      (n.angle = h),
      (n.active = g),
      (n.bullet = m),
      (n.fixedRotation = e),
      n
    );
  };
  k.createBody = function (a, c) {
    var b = d.physWorld.CreateBody(a);
    if (c) for (var e = c.length, g = 0; g < e; g++) b.CreateFixture(c[g]);
    return b;
  };
  k.convertBodyTypeFromStringToNumber = function (a) {
    if ("static" == a) return u.b2_staticBody;
    if ("dynamic" == a) return u.b2_dynamicBody;
    if ("kinematic" == a) return u.b2_kinematicBody;
    throw "Error! typeString has a wrong value.";
  };
  k.hasContactPairOfProperties = function (a, c, b) {
    var e = a.GetFixtureA();
    a = a.GetFixtureB();
    if (null == e || null == a) return !1;
    e = e.GetUserData();
    var g = a.GetUserData();
    if (null == e || null == g) return !1;
    a = e.hasOwnProperty(c) && g.hasOwnProperty(b);
    c = e.hasOwnProperty(b) && g.hasOwnProperty(c);
    return a || c;
  };
  k.getAnotherOfContact = function (a, c) {
    var b = a.GetFixtureA(),
      e = a.GetFixtureB();
    if (null == b && null == e) return null;
    b = b ? b.GetUserData() : null;
    e = e ? e.GetUserData() : null;
    if (null == b && null == e) return null;
    b = null != b ? b.item : null;
    e = null != e ? e.item : null;
    return null == b && null == e ? null : b == c ? e : e == c ? b : null;
  };
  k.getAnotherUserDataOfContact = function (a, c) {
    var b = a.GetFixtureA(),
      e = a.GetFixtureB();
    if (null == b && null == e) return null;
    b = b ? b.GetUserData() : null;
    e = e ? e.GetUserData() : null;
    if (null == b && null == e) return null;
    var g = null != b ? b.item : null,
      h = null != e ? e.item : null;
    return null == g && null == h ? null : g == c ? e : h == c ? b : null;
  };
  xa.prototype = {
    rnd: function () {
      var a = 2091639 * this.s0 + 2.3283064365386963e-10 * this.c;
      return (
        (this.c = 0 | a),
        (this.s0 = this.s1),
        (this.s1 = this.s2),
        (this.s2 = a - this.c),
        this.s2
      );
    },
    sow: function (a) {
      "undefined" == typeof a && (a = []);
      this.s0 = this.hash(" ");
      this.s1 = this.hash(this.s0);
      this.s2 = this.hash(this.s1);
      this.c = 1;
      for (var c, b = 0; (c = a[b++]); )
        (this.s0 -= this.hash(c)),
          (this.s0 += ~~(0 > this.s0)),
          (this.s1 -= this.hash(c)),
          (this.s1 += ~~(0 > this.s1)),
          (this.s2 -= this.hash(c)),
          (this.s2 += ~~(0 > this.s2));
    },
    hash: function (a) {
      var c;
      var b = 4022871197;
      a = a.toString();
      for (c = 0; c < a.length; c++) {
        b += a.charCodeAt(c);
        var e = 0.02519603282416938 * b;
        b = e >>> 0;
        e -= b;
        e *= b;
        b = e >>> 0;
        e -= b;
        b += 4294967296 * e;
      }
      return 2.3283064365386963e-10 * (b >>> 0);
    },
    integer: function () {
      return 4294967296 * this.rnd.apply(this);
    },
    frac: function () {
      return (
        this.rnd.apply(this) +
        1.1102230246251565e-16 * ((2097152 * this.rnd.apply(this)) | 0)
      );
    },
    real: function () {
      return this.integer() + this.frac();
    },
    integerInRange: function (a, c) {
      return Math.round(this.realInRange(a, c));
    },
    realInRange: function (a, c) {
      return this.frac() * (c - a) + a;
    },
    normal: function () {
      return 1 - 2 * this.frac();
    },
    uuid: function () {
      var a, c;
      for (
        c = a = "";
        36 > a++;
        c +=
          ~a % 5 | ((3 * a) & 4)
            ? (15 ^ a ? 8 ^ (this.frac() * (20 ^ a ? 16 : 4)) : 4).toString(16)
            : "-"
      );
      return c;
    },
    pick: function (a) {
      return a[this.integerInRange(0, a.length - 1)];
    },
    weightedPick: function (a) {
      return a[~~(Math.pow(this.frac(), 2) * a.length)];
    },
    timestamp: function (a, c) {
      return this.realInRange(a || 9466848e5, c || 1577862e6);
    },
  };
  da.prototype = Object.create(PIXI.Container.prototype);
  da.prototype.constructor = da;
  da.prototype.show = function (a) {
    TweenMax.to(this, a, { x: 0, y: this.showY, ease: Expo.easeOut });
  };
  ea.prototype = Object.create(PIXI.Container.prototype);
  ea.prototype.constructor = ea;
  ea.prototype.show = function (a) {
    TweenMax.to(this, a, { x: 0, y: this.showY, ease: Expo.easeOut });
  };
  ea.prototype.hide = function (a) {
    TweenMax.to(this, a, {
      x: -d.gameWidth0,
      y: this.hideY,
      ease: Expo.easeOut,
    });
  };
  K.prototype = Object.create(PIXI.Container.prototype);
  K.prototype.constructor = K;
  K.prototype._onClick = function (a) {
    this._buttonsHandler(a.target.num);
  };
  K.prototype.refresh = function () {
    for (var a = this._buttons.length, c = 0; c < a; c++)
      this._buttons[c].setLocked(c + 1 > d.levelMng.lastOpened);
  };
  fa.prototype = Object.create(PIXI.Container.prototype);
  fa.prototype.constructor = fa;
  fa.prototype.show = function (a, c) {
    a = a || 0;
    this.visible = !0;
    var b = this;
    TweenMax.to(this, 0.4, { delay: a, alpha: 1 });
    TweenMax.to(this._text.scale, 0.8, {
      delay: (a += 0.1),
      x: 1,
      y: 1,
      ease: Elastic.easeOut,
      onStart: function () {
        d.soundOn && b.sndWin.play();
      },
    });
    for (var e = 0; 3 > e; e++) {
      var g = this._stars[e];
      g.visible = e + 1 <= c;
      0 != g.visible &&
        (g.scale.set(0, 0),
        TweenMax.to(g.scale, 0.8, {
          delay: (a += 0.1),
          x: 0.5,
          y: 0.5,
          ease: Elastic.easeOut,
        }));
    }
    e = Quad.easeOut;
    g = this._btnMenu.xIn;
    var h = this._btnMenu.yIn;
    TweenMax.to(this._btnMenu, 0.4, { delay: (a += 0.1), x: g, y: h, ease: e });
    g = this._btnRestart.xIn;
    h = this._btnRestart.yIn;
    TweenMax.to(this._btnRestart, 0.4, {
      delay: (a += 0.05),
      x: g,
      y: h,
      ease: e,
    });
    this._btnNext.enable = d.levelMng.currLevel != d.levelMng.totalLevels;
    g = this._btnNext.xIn;
    h = this._btnNext.yIn;
    TweenMax.to(this._btnNext, 0.4, {
      delay: (a += 0.05),
      x: g,
      y: h,
      ease: e,
    });
    (d.storage.get(d.SAVE_KEY_STARS + d.levelMng.currLevel) || 0) < c &&
      d.storage.set(d.SAVE_KEY_STARS + d.levelMng.currLevel, c);
  };
  fa.prototype.hide = function () {
    this.visible = !1;
    this.alpha = 0;
    this._btnRestart.x = this._btnRestart.xOut;
    this._btnRestart.y = this._btnRestart.yOut;
    this._btnMenu.x = this._btnMenu.xOut;
    this._btnMenu.y = this._btnMenu.yOut;
    this._btnNext.x = this._btnNext.xOut;
    this._btnNext.y = this._btnNext.yOut;
    this._text.scale.set(0, 0);
  };
  R.prototype = Object.create(PIXI.Container.prototype);
  R.prototype.constructor = R;
  R.prototype.show = function (a) {
    TweenMax.to(this, a, { x: 0, ease: Expo.easeOut });
  };
  R.prototype.hide = function (a) {
    TweenMax.to(this, a, {
      x: d.gameWidth0,
      y: this.hideY,
      ease: Expo.easeOut,
    });
  };
  R.prototype.refresh = function () {
    for (var a = this._boards.length, c = 0; c < a; c++)
      this._boards[c].refresh();
  };
  S.prototype = Object.create(PIXI.Container.prototype);
  S.prototype.constructor = S;
  S.prototype.show = function (a) {
    TweenMax.to(this, a, { x: 0, ease: Expo.easeOut });
  };
  S.prototype.hideToLeft = function (a) {
    TweenMax.to(this, a, {
      x: -d.gameWidth0,
      y: this.hideY,
      ease: Expo.easeOut,
    });
  };
  S.prototype.hideToRight = function (a) {
    TweenMax.to(this, a, {
      x: d.gameWidth0,
      y: this.hideY,
      ease: Expo.easeOut,
    });
  };
  v.prototype = Object.create(l.prototype);
  v.prototype.constructor = v;
  v.prototype.destroy = function () {
    l.prototype.destroy.call(this);
    v._balls.remove(this);
  };
  v.prototype.setVelocity = function (a) {
    a = new F(a.x / d.physScale, a.y / d.physScale);
    this._body.SetLinearVelocity(a);
    this._body.SetAngularVelocity(a.x / 10 + 0.4);
    this._body.SetAwake(!0);
  };
  v.prototype._update = function () {
    l.prototype._update.call(this);
    this.y > d.gameHeight0 + 50 && this.destroy();
  };
  v._balls = new D("Balls");
  v._maxBalls = 25;
  v.create = function (a, c, b) {
    if (v._balls.total() >= v._maxBalls) {
      var e = v._balls.first();
      e.destroy();
      v._balls.remove(e);
    }
    a = new v(a, c);
    return b.addChild(a), v._balls.add(a), a;
  };
  T.prototype = Object.create(l.prototype);
  T.prototype.constructor = T;
  T.prototype.destroy = function () {
    l.prototype.destroy.call(this);
    d.physics.contactListener.removeBeginContactListener(
      this._onBeginContact,
      this
    );
  };
  T.prototype._onBeginContact = function (a) {
    k.getAnotherOfContact(a, this) instanceof v && this._ballInTheNet();
  };
  T.prototype._ballInTheNet = function () {
    d.soundOn && this.sndBallInBasket.play();
    d.playState.complete();
  };
  B.prototype = Object.create(l.prototype);
  B.prototype.constructor = B;
  B.prototype.destroy = function () {
    l.prototype.destroy.call(this);
    d.physics.contactListener.removeBeginContactListener(
      this._onBeginContact,
      this
    );
    l.events.off(l.EVENT_TRIGGER_PRESSED, this._onTriggerEvent, this);
    this.sndStart && this.sndStart.stop();
    this._rails.destroy(!0);
  };
  B.prototype._createRails = function () {
    this._rails = new PIXI.Container();
    this._rails.x = this.x;
    this._rails.y = this.y;
    this._rails.zOrder = r.zOrder.rail;
    d.playState.gameLayer.addChild(this._rails);
    this._endX = this.x;
    this._endY = this.y;
    "v" == this._orienation
      ? ((this._endY = this._end), (this._rails.y = this.y - 22))
      : ((this._endX = this._end), (this._rails.y = this.y - 22));
    var a = q.distance1(this.x, this.y, this._endX, this._endY);
    var c = d.assets.getSprite("rail", "atlasGame").width / 2;
    c = Math.ceil(a / c);
    console.log(c);
    for (var b = 0; b < c; b++) {
      var e = d.assets.getSprite("rail", "atlasGame");
      e.scale.set(0.5, 0.5);
      e.anchor.set(0, 0.5);
      e.x = (e.width - 1) * b;
      this._rails.addChild(e);
    }
    "v" == this._orienation
      ? ((this._rails.rotation = q.toRadians(90)),
        this.y > this._endY && (this._rails.y -= a))
      : this.x > this._endX && (this._rails.x -= a);
  };
  B.prototype._onBeginContact = function (a) {
    k.getAnotherOfContact(a, this) instanceof v && this._ballInTheNet();
  };
  B.prototype._ballInTheNet = function () {
    d.playState.complete();
  };
  B.prototype._onTriggerEvent = function (a) {
    this.id == a.id && this._move();
  };
  B.prototype._move = function () {
    this._isMove ||
      ((this._isMove = !0),
      this._defDirection(),
      this._enableUpdate(),
      (this.angleUpdate = !0),
      (this.positionUpdate = !0),
      d.soundOn && this.sndStart.play());
  };
  B.prototype._defDirection = function () {
    this._isUsed ||
      ((this._isUsed = !0),
      (this._speed = 2),
      (this._vel = new F()),
      (this._stopVal = 0),
      "v" == this._orienation
        ? ((this._vel.y = this._speed * (this.y > this._endY ? -1 : 1)),
          (this._stopVal = this._endY),
          this.y > this._endY && (this._rails.y -= length))
        : ((this._vel.x = this._speed * (this.x > this._endX ? -1 : 1)),
          (this._stopVal = this._endX)),
      this._body.SetAwake(!0),
      this._body.GetLinearVelocity().Set(this._vel.x, this._vel.y));
  };
  B.prototype._update = function () {
    l.prototype._update.call(this);
    this._isMove &&
      ("v" == this._orienation
        ? q.equal(this.y, this._stopVal, 3) && this._stop()
        : q.equal(this.x, this._stopVal, 3) && this._stop());
  };
  B.prototype._stop = function () {
    this._isMove = !1;
    this._body.GetLinearVelocity().SetZero();
    d.soundOn && (this.sndStart.stop(), this.sndStop.play());
  };
  ta.prototype = Object.create(l.prototype);
  ta.prototype.constructor = ka;
  G.prototype = Object.create(l.prototype);
  G.prototype.constructor = G;
  G.prototype.destroy = function () {
    l.prototype.destroy.call(this);
    d.playState.bg.off("pointerdown", this._pointerDown, this);
    d.playState.bg.off("pointerup", this._pointerUp, this);
  };
  G.prototype._shot = function (a) {
    this._cannon.playing ||
      ((this._shoted = !1),
      this._cannon.gotoAndStop(0),
      this._cannon.play(),
      d.soundOn && this.sndShot.play());
  };
  G.prototype._pointerDown = function (a) {
    this._countTouches++;
    null == this._pointerData &&
      ((this._pointerData = a.data),
      (this._isAllowMove = !0),
      (d.playState.aim.visible = !0),
      (d.playState.btnFire.enable = !1));
  };
  G.prototype._pointerUp = function (a) {
    this._countTouches--;
    0 < this._countTouches ||
      ((this._countTouches = 0),
      this._pointerData == a.data &&
        ((this._pointerData = null),
        (this._isAllowMove = !1),
        d.playState.blinkBtnFire(),
        (d.playState.btnFire.enable = !0)));
  };
  G.prototype._frameChanged = function (a) {
    8 <= a &&
      !this._shoted &&
      ((this._shoted = !0),
      void 0 != this._launchX && void 0 != this._launchY) &&
      v
        .create(this._launchX, this._launchY, d.playState.ballLayer)
        .setVelocity(this._direction);
  };
  G.prototype._shotComplete = function (a) {
    this._cannon.gotoAndStop(0);
  };
  G.prototype._update = function (a) {
    if (this._isAllowMove) {
      var c = d.pixi.renderer.plugins.interaction,
        b = {};
      d.playState.aimControl
        ? ((b.x = this._pointerData.global.x),
          (b.y = this._pointerData.global.y))
        : (b = c.pointer.global);
      b = { x: b.x / d.scale, y: b.y / d.scale };
      d.playState.aimControl &&
        ((b.y -= 50), d.playState.aim.position.set(b.x, b.y));
      this._helperPoint.set(this.x, this.y);
      a = q.angleDeg2(b, this._helperPoint) - 90;
      a = q.normAngleDeg(a, !0);
      a < this.lowerAngle
        ? (a = this.lowerAngle)
        : a > this.upperAngle && (a = this.upperAngle);
      this._cannon.rotation = q.toRadians(a);
      this._cannon.toLocal(this._ballSpawnPoint, this, this._helperPoint);
      a = -this._helperPoint.x;
      var e = this._helperPoint.y;
      this._helperPoint.x *= -1;
      var g = 0,
        h = 0;
      d.playState.aimControl
        ? ((g = d.playState.aim.position.x), (h = d.playState.aim.position.y))
        : ((c = d.pixi.renderer.plugins.interaction),
          (b = c.pointer.global),
          (g = b.x / d.scale),
          (h = b.y / d.scale));
      this._launchX = this._helperPoint.x + this.x;
      this._launchY = this._helperPoint.y + this.y;
      c = q.distance1(this._launchX, this._launchY, g, h) / this.shotScale;
      b = q.distance1(this.x, this.y, g, h);
      g = q.distance1(this._launchX, this._launchY, g, h);
      var m = q.distance1(this.x, this.y, this._launchX, this._launchY);
      (b < m || b < g || h > this.y + 50) && (c = 0);
      1 < c && (c = 1);
      this._powerBarMask.scale.y = c;
      g = c * (this.maxPower - this.minPower) + this.minPower;
      this._direction = {
        x: this.x - this._launchX,
        y: this.y - this._launchY,
      };
      this._direction = q.pointNormalize(this._direction, -g);
      h = { x: this._direction.x, y: this._direction.y };
      q.pointNormalize(h, g);
      this.graphics.clear();
      this.graphics.drawCircle(a, e, 4);
      g = 4;
      b = 0.8;
      for (m = 1; m <= 15 * c; m++)
        this.graphics.beginFill(16758605, (b /= 1.1)),
          this.graphics.drawCircle(a, e, (g /= 1.05)),
          this.graphics.endFill(),
          (h.y += 14.4),
          (a += h.x / 25),
          (e += h.y / 25);
    }
  };
  ma.prototype = Object.create(l.prototype);
  ma.prototype.constructor = ma;
  M.prototype = Object.create(l.prototype);
  M.prototype.constructor = M;
  M.prototype.destroy = function () {
    l.prototype.destroy.call(this);
    l.events.off(l.EVENT_TRIGGER_PRESSED, this._onTriggerEvent, this);
  };
  M.prototype._onTriggerEvent = function (a) {
    this.id != a.id ||
      this.opened ||
      ((this.opened = !0),
      "left" == this.direction
        ? (this._body.SetAwake(!0),
          this._body.SetAngularVelocity(2 * (this.inversed ? -1 : 1)))
        : "right" == this.direction &&
          (this._body.SetAwake(!0),
          this._body.SetAngularVelocity(-2 * (this.inversed ? -1 : 1))),
      this._enableUpdate(),
      (this.positionUpdate = this.angleUpdate = !0),
      d.soundOn && this.sndGate.play());
  };
  M.prototype._stop = function () {
    this._body.SetAngularVelocity(0);
    this._disableUpdate();
    this.positionUpdate = this.angleUpdate = !1;
  };
  M.prototype._update = function () {
    l.prototype._update.call(this);
    this.inversed
      ? (("left" == this.direction &&
          this._body.GetAngle() <= this.openAngle) ||
          ("right" == this.direction &&
            this._body.GetAngle() >= -this.openAngle)) &&
        this._stop()
      : (("left" == this.direction &&
          this._body.GetAngle() >= this.openAngle) ||
          ("right" == this.direction &&
            this._body.GetAngle() <= -this.openAngle)) &&
        this._stop();
  };
  na.prototype = Object.create(l.prototype);
  na.prototype.constructor = na;
  ha.prototype = Object.create(l.prototype);
  ha.prototype.constructor = ha;
  ha.prototype.destroy = function () {
    l.prototype.destroy.call(this);
    l.events.off(l.EVENT_TRIGGER_PRESSED, this._onTriggerEvent, this);
  };
  ha.prototype._onTriggerEvent = function (a) {
    this.signalID == a.id &&
      ((this.motorSpeed *= -1), this._revJoint.SetMotorSpeed(this.motorSpeed));
  };
  N.prototype = Object.create(l.prototype);
  N.prototype.constructor = N;
  N.prototype.destroy = function () {
    l.prototype.destroy.call(this);
    d.physics.contactListener.removeBeginContactListener(
      this._onBeginContact,
      this
    );
  };
  N.prototype._onBeginContact = function (a) {
    k.getAnotherOfContact(a, this) instanceof v && this.unhook();
  };
  N.prototype._update = function () {
    l.prototype._update.call(this);
    this.y > d.gameHeight0 + 50 && this.destroy();
  };
  N.prototype.unhook = function () {
    d.physics.contactListener.removeBeginContactListener(
      this._onBeginContact,
      this
    );
    this._body.SetType(u.b2_dynamicBody);
    this._body.SetAwake(!0);
    this._enableUpdate();
    this.positionUpdate = this.angleUpdate = !0;
    d.soundOn && this.sndPeg.play();
  };
  I.prototype = Object.create(l.prototype);
  I.prototype.constructor = I;
  I.prototype.destroy = function () {
    l.prototype.destroy.call(this);
    l.events.off(l.EVENT_TRIGGER_PRESSED, this._onTriggerEvent, this);
  };
  I.prototype._onTriggerEvent = function (a) {
    var c = a.state;
    this.gearSignalID == a.id &&
      this._state != c &&
      ((this._state = c),
      "on" == c
        ? this._motorOn(this.gearPower, this.TO_DESTINATION)
        : "off" == c && this._motorOn(-this.gearPower, this.TO_START_ANGLE));
  };
  I.prototype._motorOn = function (a, c) {
    if (!d.playState.isDestroying) {
      var b = this;
      d.physics.doIt(function () {
        b._revJoint = d.physWorld.CreateJoint(b._revJointDef);
        b._trackBody.SetType(u.b2_dynamicBody);
        b._trackBody.SetMassData(b._massData);
        b._trackBody.SetAngularVelocity(0);
        b._trackBody.SetLinearVelocity(new F(0, 0));
        b._revJoint.EnableMotor(!0);
        b._revJoint.SetMotorSpeed(a);
        b._revJoint.SetMaxMotorTorque(Math.abs(a));
        b._enableUpdate();
        b._gear.play();
        b._movingTo = c;
        d.soundOn && b.sndGear.play();
      });
    }
  };
  I.prototype._motorOff = function () {
    var a = this;
    d.physics.doIt(function () {
      a._movingTo == a.TO_DESTINATION
        ? a._trackBody.SetAngle(q.toRadians(a.gearMaxAngle))
        : a._movingTo == a.TO_START_ANGLE &&
          a._trackBody.SetAngle(q.toRadians(a._trackBodyStartAngle));
      d.physWorld.DestroyJoint(a._revJoint);
      a._revJoint = null;
      a._trackBody.SetType(u.b2_staticBody);
      a._disableUpdate();
      a._gear.stop();
      a._movingTo = 0;
    });
  };
  I.prototype._update = function () {
    l.prototype._update.call(this);
    var a = Math.floor(q.toDegrees(this._trackBody.GetAngle()));
    this._movingTo == this.TO_DESTINATION
      ? q.equal(a, this.gearMaxAngle, 2) && this._motorOff()
      : this._movingTo == this.TO_START_ANGLE &&
        q.equal(a, this._trackBodyStartAngle, 2) &&
        this._motorOff();
  };
  pa.prototype = Object.create(l.prototype);
  pa.prototype.constructor = pa;
  ka.prototype = Object.create(l.prototype);
  ka.prototype.constructor = ka;
  U.prototype = Object.create(l.prototype);
  U.prototype.constructor = U;
  U.prototype.destroy = function () {
    l.prototype.destroy.call(this);
    d.physics.contactListener.removeBeginContactListener(
      this._onBeginContact,
      this
    );
    d.physWorld.DestroyBody(this._body2);
  };
  U.prototype._onBeginContact = function (a) {
    a = k.getAnotherUserDataOfContact(a, this);
    null != a && 1 == a.dynamic && this._throwBody(a.item.GetBody());
  };
  U.prototype._throwBody = function (a) {
    var c = q.toDegrees(this.rotation) - 90;
    c = q.vectorVelocityDeg(c, 5 * this.elasticity);
    a.SetLinearVelocity(c);
    this._spring.gotoAndPlay(0);
    this._spring.play();
    d.soundOn && this.sndSpring.play();
  };
  V.prototype = Object.create(l.prototype);
  V.prototype.constructor = V;
  V.prototype.destroy = function () {
    l.prototype.destroy.call(this);
    d.physics.contactListener.removeBeginContactListener(
      this._onBeginContact,
      this
    );
  };
  V.prototype._onBeginContact = function (a) {
    k.getAnotherOfContact(a, this) instanceof v && this._catch();
  };
  V.prototype._catch = function () {
    this._catched ||
      (d.soundOn && this.sndStar.play(),
      (this._catched = !0),
      TweenMax.to(this, 1, {
        alpha: 0,
        y: this.y - 30,
        onComplete: this.destroy,
        onCompleteScope: this,
      }),
      d.playState.addStar());
  };
  qa.prototype = Object.create(l.prototype);
  qa.prototype.constructor = qa;
  ra.prototype = Object.create(l.prototype);
  ra.prototype.constructor = ra;
  W.prototype = Object.create(l.prototype);
  W.prototype.constructor = W;
  W.prototype.destroy = function () {
    l.prototype.destroy.call(this);
    d.physics.contactListener.removeBeginContactListener(
      this._onBeginContact,
      this
    );
    d.physics.contactListener.removeEndContactListener(
      this._onEndContact,
      this
    );
  };
  W.prototype._onBeginContact = function (a) {
    a = k.getAnotherUserDataOfContact(a, this);
    if (null != a && 1 == a.dynamic) {
      if ("button" == this.type) {
        if (
          (this._countContacts++, (this._switcher.onComplete = null), this._on)
        )
          return;
        this._on = !0;
        this._switcher.animationSpeed = 1;
        this._switcher.play();
        var c = this;
        this._switcher.onComplete = function () {
          c._on &&
            l.events.emit(l.EVENT_TRIGGER_PRESSED, {
              id: c.signalID,
              state: "on",
            });
        };
      } else
        "toogle" == this.type &&
          (this._on
            ? ((this._on = !1),
              (this._switcher.animationSpeed = -1),
              l.events.emit(l.EVENT_TRIGGER_PRESSED, {
                id: this.signalID,
                state: "off",
              }))
            : ((this._on = !0),
              (this._switcher.animationSpeed = 1),
              l.events.emit(l.EVENT_TRIGGER_PRESSED, {
                id: this.signalID,
                state: "on",
              })),
          this._switcher.play());
      d.soundOn && this.sndSwitcher.play();
    }
  };
  W.prototype._onEndContact = function (a) {
    a = k.getAnotherUserDataOfContact(a, this);
    null != a &&
      1 == a.dynamic &&
      ((this._switcher.onComplete = null),
      this._countContacts--,
      0 >= this._countContacts &&
        ((this._countContacts = 0), "button" == this.type)) &&
      0 != this._on &&
      ((this._on = !1),
      this._switcher.stop(),
      (this._switcher.animationSpeed = -1),
      this._switcher.play(),
      l.events.emit(l.EVENT_TRIGGER_PRESSED, {
        id: this.signalID,
        state: "off",
      }));
  };
  O.prototype = Object.create(l.prototype);
  O.prototype.constructor = O;
  O.prototype.destroy = function () {
    l.prototype.destroy.call(this);
    d.physics.contactListener.removeBeginContactListener(
      this._onBeginContact,
      this
    );
    d.physics.contactListener.removeEndContactListener(
      this._onEndContact,
      this
    );
    l.events.off(l.EVENT_TELEPORTATION, this._teleportation, this);
  };
  O.prototype._onBeginContact = function (a) {
    a = k.getAnotherOfContact(a, this);
    a instanceof v &&
      ((null != a.teleportPhase && 0 != a.teleportPhase) ||
        ((a.teleportPhase = 1),
        l.events.emit(l.EVENT_TELEPORTATION, {
          sender: this,
          ball: a,
          id: this.id,
        })));
  };
  O.prototype._onEndContact = function (a) {
    a = k.getAnotherOfContact(a, this);
    a instanceof v &&
      (a.teleportPhase++, 3 <= a.teleportPhase && (a.teleportPhase = 0));
  };
  O.prototype._teleportation = function (a) {
    var c = a.ball,
      b = a.id;
    if (a.sender != this && b == this.id) {
      var e = this;
      d.physics.doIt(function () {
        c.setPosition(e.x, e.y);
        var g = c._body.GetLinearVelocity();
        g = q.vectorVelocityRad(
          e.rotation + q.toDegrees(90),
          g.Length() * e.mulVel
        );
        g = new F(g.x, g.y);
        c._body.SetLinearVelocity(g);
      });
      d.soundOn && this.sndTeleport.play();
    }
  };
  X.prototype = Object.create(l.prototype);
  X.prototype.constructor = X;
  X.prototype.suck = function () {
    for (var a = this._body.GetContactList(); null != a; ) {
      var c = a.contact;
      c.IsEnabled() &&
        c.IsTouching() &&
        ((c = k.getAnotherOfContact(c, this)),
        c instanceof v && this.suckIt(c._body));
      a = a.next;
    }
  };
  X.prototype.suckIt = function (a) {
    a.GetLinearVelocity().SetZero();
    a.ApplyForce(this._force, a.GetPosition());
  };
  X.prototype._update = function () {
    l.prototype._update.call(this);
    this.suck();
  };
  sa.prototype = Object.create(l.prototype);
  sa.prototype.constructor = sa;
  la.prototype = Object.create(l.prototype);
  la.prototype.constructor = la;
  la.prototype._update = function () {
    l.prototype._update.call(this);
    this.y > d.gameHeight0 + 100 && this.destroy();
  };
  Y.prototype.constructor = Y;
  Y.prototype.create = function (a) {
    a = a || this.currLevel;
    1 > a ? (a = 1) : a > this.totalLevels && (a = this.totalLevels);
    this.currLevel = a;
    a--;
    a = ya[a].items;
    for (var c = a.length, b = 0; b < c; b++) this._createItem(a[b]);
  };
  Y.prototype.onLevelComplete = function () {
    this.currLevel == this.lastOpened &&
      (this.lastOpened++,
      d.storage.set(d.SAVE_KEY_LAST_OPENED, this.lastOpened));
  };
  Y.prototype._createItem = function (a) {
    if ("Cannon" == a.name) {
      var c = new G(a.x, a.y);
      c.lowerAngle = void 0 != a.lowerAngle ? a.lowerAngle : -45;
      c.upperAngle = void 0 != a.upperAngle ? a.upperAngle : 45;
      d.playState.gameLayer.addChild(c);
    } else
      "Basket" == a.name
        ? ((a = new T(a.x, a.y)), d.playState.gameLayer.addChild(a))
        : "Ball" == a.name
        ? ((a = new v(a.x, a.y)), d.playState.gameLayer.addChild(a))
        : "Platform" == a.name
        ? ((a = new pa(a.x, a.y, a.width, a.angle, a.type, a.density)),
          d.playState.gameLayer.addChild(a))
        : "Star" == a.name
        ? ((a = new V(a.x, a.y)), d.playState.gameLayer.addChild(a))
        : "Pivot" == a.name
        ? ((a = new I(
            a.x,
            a.y,
            a.type,
            a.signalID,
            a.color,
            a.gearMaxAngle,
            a.gearPower,
            a.lowerAngle,
            a.upperAngle
          )),
          d.playState.gameLayer.addChild(a))
        : "Switcher" == a.name
        ? ((a = new W(a.x, a.y, a.angle, a.type, a.signalID, a.color)),
          d.playState.gameLayer.addChild(a))
        : "Teleport" == a.name
        ? ((c = new O(a.x, a.y, a.id, a.angle, a.color)),
          (c.mulVel = a.mulVel || 1),
          d.playState.gameLayer.addChild(c))
        : "Spring" == a.name
        ? ((a = new U(a.x, a.y, a.angle, a.type, a.elasticity)),
          d.playState.gameLayer.addChild(a))
        : "Mill" == a.name
        ? ((a = new ha(a.x, a.y, a.enableMotor, a.motorSpeed, a.signalID)),
          d.playState.gameLayer.addChild(a))
        : "Rock" == a.name
        ? ((a = new ka(a.x, a.y, a.density)), d.playState.gameLayer.addChild(a))
        : "Box" == a.name
        ? ((a = new ta(a.x, a.y, a.angle, a.density)),
          d.playState.gameLayer.addChild(a))
        : "Swings" == a.name
        ? ((a = new ra(a.x, a.y, a.angle, a.lowerAngle, a.upperAngle)),
          d.playState.gameLayer.addChild(a))
        : "Peg" == a.name
        ? ((a = new N(a.x, a.y)), d.playState.gameLayer.addChild(a))
        : "Hammer" == a.name
        ? ((a = new na(a.x, a.y, a.angle, a.hmDensity)),
          d.playState.gameLayer.addChild(a))
        : "WeightBall" == a.name
        ? ((a = new la(a.x, a.y, a.wbDensity)),
          d.playState.gameLayer.addChild(a))
        : "Stopper" == a.name
        ? ((a = new qa(a.x, a.y)), d.playState.gameLayer.addChild(a))
        : "PushButton" == a.name
        ? ((a = new PushButton(a.x, a.y, a.btnID, a.angle)),
          d.playState.gameLayer.addChild(a))
        : "Gate" == a.name
        ? ((a = new M(
            a.x,
            a.y,
            a.direction,
            a.gateLeftID || a.gateRightID,
            a.openAngle,
            a.inversed || !1
          )),
          d.playState.gameLayer.addChild(a))
        : "Domino" == a.name
        ? ((a = new ma(a.x, a.y)), d.playState.gameLayer.addChild(a))
        : "Tube" == a.name
        ? ((a = new X(a.x, a.y, a.angle, a.plusSensorFront, a.plusSensorBack)),
          d.playState.gameLayer.addChild(a))
        : "BasketRail" == a.name &&
          ((a = new B(a.x, a.y, a.orientation, a.end, a.basketID)),
          d.playState.gameLayer.addChild(a));
  };
  Y.prototype.unlockAllLevels = function () {
    this.lastOpened = this.totalLevels;
  };
  var ya = [
    {
      items: [
        { name: "Basket", x: 546.25, y: 197.2 },
        {
          name: "Cannon",
          x: 187.95,
          y: 333.15,
          lowerAngle: -70,
          upperAngle: 70,
        },
        {
          name: "Platform",
          type: "static",
          x: 692.45,
          y: 73.8,
          density: 1,
          width: 143.5,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 631.65,
          y: 165.55,
          density: 1,
          width: 216.5,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 661.45,
          y: 46.3,
          density: 1,
          width: 79.1,
          angle: -30,
        },
        {
          name: "Platform",
          type: "static",
          x: 606.45,
          y: 198.5,
          density: 1,
          width: 65.7,
          angle: -21,
        },
        { name: "Star", x: 314.1, y: 233.95 },
        { name: "Star", x: 408.45, y: 205.55 },
        { name: "Star", x: 497.05, y: 181.75 },
      ],
    },
    {
      items: [
        {
          name: "Platform",
          type: "static",
          x: 463.7,
          y: 242.1,
          density: 1,
          width: 64,
          angle: -90,
        },
        {
          name: "Platform",
          type: "dynamic",
          x: 514.65,
          y: 219.1,
          density: 0.1,
          width: 120,
          angle: 0,
        },
        { name: "Basket", x: 135.25, y: 286.5 },
        { name: "Cannon", x: 545, y: 430, lowerAngle: -70, upperAngle: 70 },
        {
          name: "Platform",
          type: "static",
          x: 391.6,
          y: 150.35,
          density: 1,
          width: 67,
          angle: 0,
        },
        {
          name: "Pivot",
          x: 463.7,
          y: 219.1,
          type: "bolt",
          color: "Red",
          gearMaxAngle: 0,
          gearPower: 1,
          lowerAngle: -180,
          upperAngle: 0,
          signalID: 0,
        },
        { name: "Ball", x: 422.85, y: 133 },
        {
          name: "Platform",
          type: "static",
          x: 266.7,
          y: 218.35,
          density: 1,
          width: 238.6,
          angle: -36,
        },
        { name: "Star", x: 152.65, y: 262.4 },
        { name: "Star", x: 344.7, y: 260.15 },
        { name: "Star", x: 543.45, y: 259.1 },
        {
          name: "Platform",
          type: "static",
          x: 173.95,
          y: 312.95,
          density: 1,
          width: 64,
          angle: -90,
        },
        {
          name: "Platform",
          type: "static",
          x: 93.95,
          y: 263.95,
          density: 1,
          width: 162,
          angle: -90,
        },
      ],
    },
    {
      items: [
        {
          name: "Platform",
          type: "static",
          x: 662,
          y: 310,
          density: 1,
          width: 200,
          angle: 90,
        },
        {
          name: "Platform",
          type: "dynamic",
          x: 621.95,
          y: 218.9,
          density: 1,
          width: 98.1,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 100,
          y: 420,
          density: 1,
          width: 80,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 589,
          y: 319,
          density: 1,
          width: 181.9,
          angle: 90,
        },
        { name: "Basket", x: 626, y: 380 },
        { name: "Cannon", x: 380, y: 400, lowerAngle: -70, upperAngle: 70 },
        {
          name: "Platform",
          type: "static",
          x: 145.8,
          y: 368.05,
          density: 1,
          width: 126.4,
          angle: -75,
        },
        {
          name: "Switcher",
          x: 104,
          y: 412.25,
          angle: 0,
          type: "button",
          color: "Red",
          signalID: 1,
        },
        {
          name: "Pivot",
          x: 662,
          y: 220,
          type: "gear",
          color: "Red",
          gearMaxAngle: 45,
          gearPower: 5,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 1,
        },
        {
          name: "Platform",
          type: "static",
          x: 81.8,
          y: 368.05,
          density: 1,
          width: 126.4,
          angle: -75,
        },
        {
          name: "Platform",
          type: "static",
          x: 204.5,
          y: 267.9,
          density: 1,
          width: 126.4,
          angle: -45,
        },
        {
          name: "Platform",
          type: "static",
          x: 140.5,
          y: 266.9,
          density: 1,
          width: 126.4,
          angle: -45,
        },
        { name: "Star", x: 658.15, y: 168.15 },
        { name: "Star", x: 119.8, y: 244.35 },
        { name: "Star", x: 382.05, y: 37.4 },
      ],
    },
    {
      items: [
        {
          name: "Platform",
          type: "static",
          x: 230.25,
          y: 192,
          density: 1,
          width: 241.6,
          angle: -180,
        },
        {
          name: "Platform",
          type: "dynamic",
          x: 118.05,
          y: 242.7,
          density: 1,
          width: 120,
          angle: 90,
        },
        { name: "Basket", x: 75.45, y: 339.35 },
        {
          name: "Cannon",
          x: 646.05,
          y: 426.8,
          lowerAngle: -70,
          upperAngle: 70,
        },
        {
          name: "Platform",
          type: "static",
          x: 360,
          y: 151.4,
          density: 1,
          width: 302.6,
          angle: 90,
        },
        {
          name: "Switcher",
          x: 440.8,
          y: 449.3,
          angle: 0,
          type: "button",
          color: "Green",
          signalID: 1,
        },
        {
          name: "Platform",
          type: "dynamic",
          x: 287.35,
          y: 320.05,
          density: 0.1,
          width: 356.6,
          angle: 0,
        },
        {
          name: "Pivot",
          x: 117.4,
          y: 320,
          type: "bolt",
          color: "Red",
          gearMaxAngle: 0,
          gearPower: 1,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 0,
        },
        {
          name: "Platform",
          type: "dynamic",
          x: 353.45,
          y: 389.05,
          density: 1,
          width: 120,
          angle: 90,
        },
        {
          name: "Pivot",
          x: 355.2,
          y: 440.5,
          type: "bolt",
          color: "Red",
          gearMaxAngle: 0,
          gearPower: 1,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 441.7,
          y: 456.75,
          density: 1,
          width: 69,
          angle: 0,
        },
        {
          name: "Pivot",
          x: 118.05,
          y: 191.95,
          type: "gear",
          color: "Green",
          gearMaxAngle: 180,
          gearPower: 5,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 1,
        },
        { name: "Star", x: 23.1, y: 327.4 },
        { name: "Star", x: 392.35, y: 362.45 },
        { name: "Star", x: 387.8, y: 111 },
      ],
    },
    {
      items: [
        {
          name: "Platform",
          type: "static",
          x: 134.6,
          y: 374.7,
          density: 1,
          width: 71,
          angle: 60,
        },
        {
          name: "Platform",
          type: "static",
          x: 183.5,
          y: 378.85,
          density: 1,
          width: 80.6,
          angle: 60,
        },
        {
          name: "Platform",
          type: "static",
          x: 131.55,
          y: 327.6,
          density: 1,
          width: 58.9,
          angle: 120,
        },
        {
          name: "Platform",
          type: "static",
          x: 178.05,
          y: 327.6,
          density: 1,
          width: 58.9,
          angle: 120,
        },
        {
          name: "Platform",
          type: "static",
          x: 124.4,
          y: 260.8,
          density: 1,
          width: 107.5,
          angle: 67,
        },
        {
          name: "Platform",
          type: "static",
          x: 170.9,
          y: 260.8,
          density: 1,
          width: 107.5,
          angle: 67,
        },
        {
          name: "Platform",
          type: "static",
          x: 114.75,
          y: 198,
          density: 1,
          width: 49.6,
          angle: 119,
        },
        {
          name: "Platform",
          type: "static",
          x: 161.25,
          y: 198,
          density: 1,
          width: 49.6,
          angle: 119,
        },
        {
          name: "Platform",
          type: "dynamic",
          x: 108.6,
          y: 176,
          density: 0.1,
          width: 49.6,
          angle: 30,
        },
        {
          name: "Platform",
          type: "dynamic",
          x: 140.45,
          y: 167.55,
          density: 0.1,
          width: 83.4,
          angle: 30,
        },
        { name: "Basket", x: 173.3, y: 413.35 },
        {
          name: "Cannon",
          x: 501.25,
          y: 395.7,
          lowerAngle: -70,
          upperAngle: 70,
        },
        {
          name: "Platform",
          type: "static",
          x: 394.55,
          y: 88.4,
          density: 1,
          width: 272,
          angle: -15,
        },
        {
          name: "Platform",
          type: "static",
          x: 410.15,
          y: 145.25,
          density: 1,
          width: 272,
          angle: -15,
        },
        {
          name: "Switcher",
          x: 286.85,
          y: 148.1,
          angle: 75,
          type: "button",
          color: "Blue",
          signalID: 0,
        },
        {
          name: "Teleport",
          x: 143.7,
          y: 55.3,
          angle: 180,
          color: "Red",
          id: 0,
        },
        {
          name: "Teleport",
          x: 289.55,
          y: 408.15,
          angle: 0,
          color: "Red",
          id: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 279.5,
          y: 149.5,
          density: 1,
          width: 76.6,
          angle: 75,
        },
        {
          name: "Spring",
          x: 684.75,
          y: 169.15,
          angle: -45,
          type: "static",
          elasticity: 2,
        },
        {
          name: "Platform",
          type: "static",
          x: 692,
          y: 174.85,
          density: 1,
          width: 53,
          angle: -45,
        },
        {
          name: "Pivot",
          x: 122.15,
          y: 183.5,
          type: "gear",
          color: "Blue",
          gearMaxAngle: 90,
          gearPower: 2,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 0,
        },
        {
          name: "Pivot",
          x: 168.65,
          y: 183.5,
          type: "gear",
          color: "Blue",
          gearMaxAngle: 90,
          gearPower: 2,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 0,
        },
        { name: "Star", x: 238.95, y: 404.45 },
        { name: "Star", x: 700.25, y: 109.05 },
        { name: "Star", x: 326.05, y: 134 },
      ],
    },
    {
      items: [
        {
          name: "Switcher",
          x: 66.7,
          y: 105.8,
          angle: 90,
          type: "button",
          color: "Yellow",
          signalID: 1,
        },
        { name: "Basket", x: 548.05, y: 424.5 },
        {
          name: "Cannon",
          x: 266.2,
          y: 438.75,
          lowerAngle: -70,
          upperAngle: 70,
        },
        {
          name: "Teleport",
          x: 516.5,
          y: 199.55,
          angle: 180,
          color: "Red",
          id: 1,
        },
        {
          name: "Teleport",
          x: 435.55,
          y: 186.8,
          angle: 0,
          color: "Red",
          id: 1,
        },
        {
          name: "Platform",
          type: "static",
          x: 59,
          y: 102.9,
          density: 1,
          width: 84.4,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 10.1,
          y: 101.8,
          density: 1,
          width: 112.2,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 34.5,
          y: 69.4,
          density: 1,
          width: 57.7,
          angle: 15,
        },
        {
          name: "Platform",
          type: "static",
          x: 34.35,
          y: 134.1,
          density: 1,
          width: 57.9,
          angle: -15,
        },
        {
          name: "Platform",
          type: "static",
          x: 55.45,
          y: 188.4,
          density: 1,
          width: 110.9,
          angle: 0,
        },
        {
          name: "Platform",
          type: "dynamic",
          x: 145.05,
          y: 188.4,
          density: 0.2,
          width: 98.9,
          angle: 0,
        },
        {
          name: "Pivot",
          x: 103.65,
          y: 188.35,
          type: "bolt",
          color: "Red",
          gearMaxAngle: 0,
          gearPower: 1,
          lowerAngle: -360,
          upperAngle: 0,
          signalID: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 476.65,
          y: 255.4,
          density: 1,
          width: 232.6,
          angle: 90,
        },
        {
          name: "Platform",
          type: "dynamic",
          x: 447.65,
          y: 146.4,
          density: 1,
          width: 76.5,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 494.95,
          y: 398.4,
          density: 1,
          width: 76.6,
          angle: 60,
        },
        {
          name: "Pivot",
          x: 477.85,
          y: 146.2,
          type: "gear",
          color: "Yellow",
          gearMaxAngle: 90,
          gearPower: 5,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 1,
        },
        {
          name: "Platform",
          type: "static",
          x: 476.5,
          y: 36.1,
          density: 1,
          width: 71.7,
          angle: 90,
        },
        { name: "Star", x: 565, y: 175 },
        { name: "Star", x: 35, y: 160 },
        { name: "Star", x: 450, y: 400 },
      ],
    },
    {
      items: [
        {
          name: "Platform",
          type: "static",
          x: 710.1,
          y: 382.8,
          density: 1,
          width: 57,
          angle: -90,
        },
        {
          name: "Platform",
          type: "static",
          x: 627.45,
          y: 375.25,
          density: 1,
          width: 43.3,
          angle: 90,
        },
        { name: "Basket", x: 668.25, y: 401.5 },
        { name: "Cannon", x: 479.6, y: 199.2, lowerAngle: -70, upperAngle: 70 },
        {
          name: "Mill",
          x: 318.65,
          y: 267.7,
          enableMotor: !0,
          motorSpeed: -3,
          signalID: 1,
        },
        {
          name: "Switcher",
          x: 308.75,
          y: 18.15,
          angle: 180,
          type: "toogle",
          color: "Green",
          signalID: 1,
        },
        {
          name: "Platform",
          type: "static",
          x: 71.85,
          y: 238.9,
          density: 1,
          width: 208.8,
          angle: -90,
        },
        {
          name: "Platform",
          type: "static",
          x: 11.3,
          y: 171.2,
          density: 1,
          width: 343.4,
          angle: -90,
        },
        {
          name: "Platform",
          type: "static",
          x: 564.25,
          y: 362.4,
          density: 1,
          width: 144.9,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 555.9,
          y: 225.3,
          density: 1,
          width: 326.4,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 444.75,
          y: 333.4,
          density: 1,
          width: 120,
          angle: 30,
        },
        {
          name: "Platform",
          type: "static",
          x: 308.75,
          y: 10.05,
          density: 1,
          width: 114.1,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 203.75,
          y: 183.45,
          density: 1,
          width: 120,
          angle: 30,
        },
        {
          name: "Platform",
          type: "static",
          x: 41.55,
          y: 334.3,
          density: 1,
          width: 78.5,
          angle: 0,
        },
        { name: "Star", x: 256, y: 350.95 },
        { name: "Star", x: 111, y: 238.95 },
        { name: "Star", x: 685.95, y: 182.95 },
        {
          name: "Switcher",
          x: 41.8,
          y: 326.4,
          angle: 0,
          type: "button",
          color: "Red",
          signalID: 2,
        },
        {
          name: "Platform",
          type: "dynamic",
          x: 679.85,
          y: 362.6,
          density: 1,
          width: 76.5,
          angle: 0,
        },
        {
          name: "Pivot",
          x: 709.55,
          y: 362.4,
          type: "gear",
          color: "Red",
          gearMaxAngle: 90,
          gearPower: 5,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 2,
        },
      ],
    },
    {
      items: [
        {
          name: "Platform",
          type: "static",
          x: 596.7,
          y: 255.15,
          density: 1,
          width: 18,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 546.2,
          y: 199.65,
          density: 1,
          width: 18,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 165.1,
          y: 254.9,
          density: 1,
          width: 193,
          angle: -30,
        },
        {
          name: "Platform",
          type: "dynamic",
          x: 217.3,
          y: 167.2,
          density: 0.1,
          width: 117.2,
          angle: -120,
        },
        { name: "Basket", x: 51.35, y: 303.95 },
        { name: "Cannon", x: 405, y: 459.4, lowerAngle: -70, upperAngle: 70 },
        {
          name: "Switcher",
          x: 682.05,
          y: 231.95,
          angle: -45,
          type: "button",
          color: "Red",
          signalID: 1,
        },
        {
          name: "Platform",
          type: "dynamic",
          x: 603.05,
          y: 178.1,
          density: 0.3,
          width: 135.9,
          angle: -20,
        },
        {
          name: "Platform",
          type: "dynamic",
          x: 588.6,
          y: 231,
          density: 1,
          width: 70.2,
          angle: -110,
        },
        {
          name: "Pivot",
          x: 597.05,
          y: 254.85,
          type: "bolt",
          color: "Red",
          gearMaxAngle: 0,
          gearPower: 1,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 0,
        },
        {
          name: "Pivot",
          x: 546.2,
          y: 199.65,
          type: "bolt",
          color: "Red",
          gearMaxAngle: 0,
          gearPower: 1,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 418.4,
          y: 108.65,
          density: 1,
          width: 178.8,
          angle: -30,
        },
        {
          name: "Pivot",
          x: 243,
          y: 210.55,
          type: "gear",
          color: "Red",
          gearMaxAngle: -30,
          gearPower: 5,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 1,
        },
        {
          name: "Teleport",
          x: 448.9,
          y: 52.6,
          angle: -120,
          color: "Red",
          id: 0,
        },
        { name: "Teleport", x: 139, y: 323.6, angle: 60, color: "Red", id: 0 },
        {
          name: "Platform",
          type: "static",
          x: 687.45,
          y: 237.35,
          density: 1,
          width: 46.9,
          angle: 135,
        },
        { name: "Star", x: 274, y: 110.05 },
        { name: "Star", x: 644.95, y: 184.65 },
        { name: "Star", x: 502.95, y: 110.05 },
        {
          name: "Platform",
          type: "static",
          x: 107.3,
          y: 225.15,
          density: 1,
          width: 223.7,
          angle: -30,
        },
        {
          name: "Platform",
          type: "static",
          x: 15.15,
          y: 321,
          density: 1,
          width: 94.9,
          angle: -90,
        },
        {
          name: "Platform",
          type: "static",
          x: 86.05,
          y: 331.5,
          density: 1,
          width: 71.9,
          angle: -90,
        },
        {
          name: "Platform",
          type: "static",
          x: 50.6,
          y: 376.45,
          density: 1,
          width: 88.9,
          angle: 0,
        },
      ],
    },
    {
      items: [
        {
          name: "Switcher",
          x: 398.75,
          y: 378.65,
          angle: -45,
          type: "toogle",
          color: "Green",
          signalID: 2,
        },
        {
          name: "Platform",
          type: "static",
          x: 460.15,
          y: 88.85,
          density: 0.3,
          width: 265,
          angle: 0,
        },
        { name: "Basket", x: 180.75, y: 316.15 },
        {
          name: "Cannon",
          x: 360.45,
          y: 333.05,
          lowerAngle: -70,
          upperAngle: 70,
        },
        {
          name: "Platform",
          type: "static",
          x: 279.3,
          y: 348.55,
          density: 1,
          width: 156.5,
          angle: 45,
        },
        {
          name: "Platform",
          type: "static",
          x: 457.65,
          y: 330.9,
          density: 1,
          width: 200.4,
          angle: -45,
        },
        { name: "Rock", x: 652.3, y: 88.25, density: 0.3 },
        {
          name: "Platform",
          type: "static",
          x: 109.95,
          y: 179.4,
          density: 1,
          width: 206.4,
          angle: 45,
        },
        {
          name: "Platform",
          type: "dynamic",
          x: 194.2,
          y: 264.75,
          density: 1,
          width: 67.3,
          angle: 45,
        },
        {
          name: "Pivot",
          x: 175.4,
          y: 247.55,
          type: "gear",
          color: "Purple",
          gearMaxAngle: 138,
          gearPower: 2.2,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 1,
        },
        {
          name: "Platform",
          type: "static",
          x: 373.75,
          y: 10.15,
          density: 1,
          width: 374.3,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 653.1,
          y: 136.7,
          density: 1,
          width: 118.6,
          angle: -45,
        },
        {
          name: "Switcher",
          x: 517.35,
          y: 281.95,
          angle: 135,
          type: "button",
          color: "Purple",
          signalID: 1,
        },
        {
          name: "Platform",
          type: "static",
          x: 606.15,
          y: 285.75,
          density: 1,
          width: 189,
          angle: -45,
        },
        { name: "Star", x: 20, y: 90 },
        { name: "Star", x: 704, y: 71 },
        { name: "Star", x: 503, y: 351 },
        {
          name: "Platform",
          type: "dynamic",
          x: 606.75,
          y: 111.3,
          density: 0.1,
          width: 72,
          angle: 45,
        },
        {
          name: "Pivot",
          x: 585.95,
          y: 89.55,
          type: "gear",
          color: "Green",
          gearMaxAngle: 135,
          gearPower: 2.2,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 2,
        },
        {
          name: "Platform",
          type: "static",
          x: 335,
          y: 44.75,
          density: 0.3,
          width: 106.2,
          angle: 90,
        },
      ],
    },
    {
      items: [
        {
          name: "Platform",
          type: "static",
          x: 25.05,
          y: 285.65,
          density: 1,
          width: 117.5,
          angle: 85,
        },
        {
          name: "Platform",
          type: "static",
          x: 92.6,
          y: 310.2,
          density: 1,
          width: 58.2,
          angle: 85,
        },
        {
          name: "Platform",
          type: "static",
          x: 657.05,
          y: 125.2,
          density: 1,
          width: 62.9,
          angle: -60,
        },
        { name: "Basket", x: 642.25, y: 388.7 },
        {
          name: "Platform",
          type: "static",
          x: 596.6,
          y: 161.1,
          density: 1,
          width: 67.5,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 642.65,
          y: 198.6,
          density: 1,
          width: 102.5,
          angle: 90,
        },
        {
          name: "Platform",
          type: "dynamic",
          x: 575.15,
          y: 247.45,
          density: 0.1,
          width: 152,
          angle: -5,
        },
        {
          name: "Pivot",
          x: 642.55,
          y: 241.7,
          type: "gear",
          color: "Yellow",
          gearMaxAngle: -23,
          gearPower: -6,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 3,
        },
        {
          name: "Switcher",
          x: 34.9,
          y: 59.4,
          angle: 90,
          type: "toogle",
          color: "Yellow",
          signalID: 3,
        },
        {
          name: "Platform",
          type: "static",
          x: 26.9,
          y: 59.4,
          density: 1,
          width: 62,
          angle: -90,
        },
        {
          name: "Cannon",
          x: 319.4,
          y: 181.85,
          lowerAngle: -70,
          upperAngle: 70,
        },
        {
          name: "Platform",
          type: "static",
          x: 304.55,
          y: 343.55,
          density: 1,
          width: 174.5,
          angle: 0,
        },
        {
          name: "Switcher",
          x: 196.4,
          y: 375.05,
          angle: 0,
          type: "button",
          color: "Green",
          signalID: 1,
        },
        {
          name: "Platform",
          type: "static",
          x: 226.35,
          y: 363.25,
          density: 1,
          width: 57.1,
          angle: -90,
        },
        {
          name: "Platform",
          type: "static",
          x: 709.85,
          y: 224.25,
          density: 1,
          width: 385.9,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 165.95,
          y: 346.7,
          density: 1,
          width: 90.2,
          angle: -90,
        },
        {
          name: "Platform",
          type: "static",
          x: 317.45,
          y: 269.9,
          density: 1,
          width: 355.2,
          angle: -5,
        },
        {
          name: "Platform",
          type: "static",
          x: 308.65,
          y: 211.7,
          density: 1,
          width: 593.9,
          angle: -5,
        },
        {
          name: "Platform",
          type: "dynamic",
          x: 88.9,
          y: 271.1,
          density: 1,
          width: 55.4,
          angle: -95,
        },
        {
          name: "Pivot",
          x: 90.6,
          y: 290,
          type: "gear",
          color: "Green",
          gearMaxAngle: -4,
          gearPower: 1,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 1,
        },
        {
          name: "Platform",
          type: "static",
          x: 445.55,
          y: 323.3,
          density: 1,
          width: 121.5,
          angle: -20,
        },
        {
          name: "Platform",
          type: "static",
          x: 195.9,
          y: 382.8,
          density: 1,
          width: 78.6,
          angle: 0,
        },
        { name: "Star", x: 30.25, y: 182.95 },
        { name: "Star", x: 683.1, y: 296.75 },
        { name: "Star", x: 124.75, y: 335.7 },
        {
          name: "Platform",
          type: "static",
          x: 682.75,
          y: 350.6,
          density: 1,
          width: 70,
          angle: -45,
        },
        {
          name: "Platform",
          type: "static",
          x: 601.8,
          y: 350.95,
          density: 1,
          width: 70,
          angle: 45,
        },
        {
          name: "Teleport",
          x: 642.25,
          y: 320.05,
          angle: 180,
          color: "Blue",
          id: 1,
        },
        {
          name: "Teleport",
          x: 61.35,
          y: 326.55,
          angle: -5,
          color: "Blue",
          id: 1,
        },
      ],
    },
    {
      items: [
        {
          name: "Platform",
          type: "static",
          x: 330.6,
          y: 112.15,
          density: 1,
          width: 49.4,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 223,
          y: 93.3,
          density: 1,
          width: 81.4,
          angle: 30,
        },
        {
          name: "Platform",
          type: "static",
          x: 132.25,
          y: 418.65,
          density: 1,
          width: 79.5,
          angle: 30,
        },
        {
          name: "Platform",
          type: "static",
          x: 27.15,
          y: 422.65,
          density: 1,
          width: 38.1,
          angle: 58,
        },
        {
          name: "Platform",
          type: "static",
          x: 93.65,
          y: 422.65,
          density: 1,
          width: 38,
          angle: -58,
        },
        {
          name: "Spring",
          x: 462.55,
          y: 182.1,
          angle: -35,
          type: "static",
          elasticity: 2,
        },
        { name: "Basket", x: 62.75, y: 371 },
        {
          name: "Cannon",
          x: 321.55,
          y: 386.55,
          lowerAngle: -70,
          upperAngle: 70,
        },
        {
          name: "Platform",
          type: "static",
          x: 212.1,
          y: 436.95,
          density: 1,
          width: 101.9,
          angle: 0,
        },
        {
          name: "Switcher",
          x: 644.9,
          y: 419.75,
          angle: -30,
          type: "button",
          color: "Blue",
          signalID: 1,
        },
        {
          name: "Platform",
          type: "static",
          x: 585.25,
          y: 112.15,
          density: 1,
          width: 240.7,
          angle: 0,
        },
        {
          name: "Switcher",
          x: 283.9,
          y: 129.2,
          angle: 0,
          type: "button",
          color: "Red",
          signalID: 2,
        },
        {
          name: "Platform",
          type: "static",
          x: 538.6,
          y: 236.55,
          density: 1,
          width: 17.8,
          angle: 0,
        },
        { name: "Box", x: 537.5, y: 204.75, angle: void 0, density: 1 },
        {
          name: "Platform",
          type: "static",
          x: 582.25,
          y: 442.45,
          density: 1,
          width: 83.7,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 696.35,
          y: 262.9,
          density: 1,
          width: 283,
          angle: -90,
        },
        {
          name: "Platform",
          type: "static",
          x: 660.2,
          y: 420.15,
          density: 1,
          width: 94.5,
          angle: -30,
        },
        {
          name: "Platform",
          type: "static",
          x: 100.9,
          y: 74.35,
          density: 1,
          width: 183.1,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 283.6,
          y: 137.4,
          density: 1,
          width: 80.1,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 467.45,
          y: 189.75,
          density: 1,
          width: 47.8,
          angle: -38,
        },
        {
          name: "Platform",
          type: "static",
          x: 102.3,
          y: 113.7,
          density: 1,
          width: 96.8,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 18.4,
          y: 247.35,
          density: 1,
          width: 327.8,
          angle: -90,
        },
        {
          name: "Platform",
          type: "static",
          x: 252.4,
          y: 126.05,
          density: 1,
          width: 40.6,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 314.65,
          y: 124.15,
          density: 1,
          width: 43.9,
          angle: 90,
        },
        {
          name: "Platform",
          type: "dynamic",
          x: 420.9,
          y: 112.15,
          density: 0.1,
          width: 121.4,
          angle: 0,
        },
        {
          name: "Pivot",
          x: 473.3,
          y: 112.15,
          type: "gear",
          color: "Blue",
          gearMaxAngle: 45,
          gearPower: 5,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 1,
        },
        {
          name: "Platform",
          type: "static",
          x: 102.3,
          y: 315.8,
          density: 1,
          width: 191.1,
          angle: -90,
        },
        { name: "Star", x: 129.25, y: 105.45 },
        { name: "Star", x: 664.7, y: 145.95 },
        { name: "Star", x: 235.15, y: 71.05 },
        {
          name: "Platform",
          type: "dynamic",
          x: 102.3,
          y: 207.2,
          density: 0.1,
          width: 72.1,
          angle: -90,
        },
        {
          name: "Pivot",
          x: 101.8,
          y: 232.15,
          type: "gear",
          color: "Red",
          gearMaxAngle: 0,
          gearPower: 5,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 2,
        },
      ],
    },
    {
      items: [
        {
          name: "Platform",
          type: "static",
          x: 17.1,
          y: 76,
          density: 1,
          width: 63.3,
          angle: 0,
        },
        {
          name: "Platform",
          type: "dynamic",
          x: 83.6,
          y: 75.9,
          density: 1,
          width: 106.1,
          angle: 0,
        },
        { name: "Basket", x: 211.6, y: 354.6 },
        {
          name: "Cannon",
          x: 391.65,
          y: 433.9,
          lowerAngle: -70,
          upperAngle: 70,
        },
        { name: "Rock", x: 202.8, y: 282.95, density: 3 },
        {
          name: "Platform",
          type: "static",
          x: 339.4,
          y: 61.8,
          density: 1,
          width: 120,
          angle: 90,
        },
        {
          name: "Teleport",
          x: 117.05,
          y: 37.05,
          angle: 180,
          color: "Blue",
          id: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 552.75,
          y: 171.2,
          density: 1,
          width: 193,
          angle: 37,
        },
        {
          name: "Pivot",
          x: 39.45,
          y: 75.95,
          type: "gear",
          color: "Red",
          gearMaxAngle: 90,
          gearPower: 5,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 1,
        },
        {
          name: "Teleport",
          x: 664.45,
          y: 222.75,
          angle: -53,
          color: "Blue",
          id: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 149.85,
          y: 187.45,
          density: 1,
          width: 494.1,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 253.6,
          y: 366.75,
          density: 1,
          width: 135.6,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 486,
          y: 250.05,
          density: 1,
          width: 48.3,
          angle: 63,
        },
        {
          name: "Switcher",
          x: 526.45,
          y: 319.45,
          angle: 0,
          type: "button",
          color: "Red",
          signalID: 1,
        },
        {
          name: "Platform",
          type: "static",
          x: 496.25,
          y: 301.85,
          density: 1,
          width: 69.6,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 556.85,
          y: 315.2,
          density: 1,
          width: 42.2,
          angle: -90,
        },
        {
          name: "Spring",
          x: 697.6,
          y: 364.95,
          angle: -45,
          type: "static",
          elasticity: 2,
        },
        {
          name: "Platform",
          type: "static",
          x: 475.8,
          y: 169.85,
          density: 1,
          width: 127.8,
          angle: -90,
        },
        {
          name: "Platform",
          type: "static",
          x: 526.45,
          y: 327.65,
          density: 1,
          width: 78.8,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 702.1,
          y: 371.5,
          density: 1,
          width: 33.4,
          angle: -45,
        },
        { name: "Star", x: 369.2, y: 22.05 },
        { name: "Star", x: 180.6, y: 96.8 },
        { name: "Star", x: 283, y: 384.85 },
        {
          name: "Platform",
          type: "dynamic",
          x: 127.1,
          y: 322.2,
          density: 1,
          width: 205.6,
          angle: 0,
        },
        {
          name: "Pivot",
          x: 149.05,
          y: 323.4,
          type: "bolt",
          color: "Red",
          gearMaxAngle: 90,
          gearPower: 1,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 1,
        },
        {
          name: "Platform",
          type: "static",
          x: 13.6,
          y: 236.2,
          density: 1,
          width: 338.7,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 36.25,
          y: 396.55,
          density: 1,
          width: 63.3,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 58.9,
          y: 389.7,
          density: 1,
          width: 31.7,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 175.9,
          y: 382.55,
          density: 1,
          width: 102.6,
          angle: 90,
        },
      ],
    },
    {
      items: [
        {
          name: "Platform",
          type: "static",
          x: 529.2,
          y: 380,
          density: 1,
          width: 16.2,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 620,
          y: 70,
          density: 1,
          width: 200,
          angle: 0,
        },
        { name: "Basket", x: 620, y: 250 },
        { name: "Cannon", x: 360, y: 370, lowerAngle: -70, upperAngle: 70 },
        {
          name: "Spring",
          x: 122.05,
          y: 301,
          angle: -30,
          type: "static",
          elasticity: 2,
        },
        {
          name: "Platform",
          type: "static",
          x: 100,
          y: 190,
          density: 1,
          width: 200,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 620,
          y: 190,
          density: 1,
          width: 200,
          angle: 0,
        },
        {
          name: "Platform",
          type: "dynamic",
          x: 190.95,
          y: 238.95,
          density: 1,
          width: 115.6,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 100,
          y: 310,
          density: 1,
          width: 200,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 100,
          y: 450,
          density: 1,
          width: 200,
          angle: 0,
        },
        {
          name: "Pivot",
          x: 191,
          y: 190,
          type: "gear",
          color: "Red",
          gearMaxAngle: 0,
          gearPower: -5,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 1,
        },
        {
          name: "Platform",
          type: "static",
          x: 620,
          y: 310,
          density: 1,
          width: 200,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 190.95,
          y: 379.95,
          density: 1,
          width: 157.6,
          angle: 90,
        },
        { name: "Teleport", x: 45, y: 360, angle: 120, color: "Red", id: 0 },
        {
          name: "Platform",
          type: "static",
          x: 620,
          y: 450,
          density: 1,
          width: 200,
          angle: 0,
        },
        { name: "Teleport", x: 620, y: 405.8, angle: 0, color: "Red", id: 0 },
        {
          name: "Platform",
          type: "dynamic",
          x: 528.95,
          y: 238.95,
          density: 1,
          width: 115.6,
          angle: 90,
        },
        {
          name: "Pivot",
          x: 529,
          y: 190,
          type: "gear",
          color: "Yellow",
          gearMaxAngle: 180,
          gearPower: 5,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 4,
        },
        {
          name: "Platform",
          type: "dynamic",
          x: 528.95,
          y: 118.45,
          density: 1,
          width: 115.6,
          angle: 90,
        },
        {
          name: "Pivot",
          x: 529,
          y: 69.5,
          type: "gear",
          color: "Green",
          gearMaxAngle: 180,
          gearPower: 5,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 2,
        },
        {
          name: "Switcher",
          x: 100,
          y: 183.05,
          angle: 0,
          type: "button",
          color: "Red",
          signalID: 1,
        },
        {
          name: "Platform",
          type: "static",
          x: 130,
          y: 169,
          density: 1,
          width: 60,
          angle: -90,
        },
        {
          name: "Platform",
          type: "static",
          x: 70,
          y: 169,
          density: 1,
          width: 60,
          angle: -90,
        },
        {
          name: "Switcher",
          x: 63.15,
          y: 198,
          angle: 180,
          type: "toogle",
          color: "Green",
          signalID: 2,
        },
        {
          name: "Platform",
          type: "static",
          x: 100,
          y: 204.75,
          density: 1,
          width: 40.3,
          angle: 60,
        },
        {
          name: "Switcher",
          x: 620,
          y: 182.05,
          angle: 0,
          type: "button",
          color: "Blue",
          signalID: 3,
        },
        {
          name: "Platform",
          type: "static",
          x: 650,
          y: 169,
          density: 1,
          width: 60,
          angle: -90,
        },
        {
          name: "Platform",
          type: "static",
          x: 590,
          y: 169,
          density: 1,
          width: 60,
          angle: -90,
        },
        {
          name: "Platform",
          type: "dynamic",
          x: 529,
          y: 379.95,
          density: 1,
          width: 105.6,
          angle: 90,
        },
        {
          name: "Pivot",
          x: 529,
          y: 378.95,
          type: "gear",
          color: "Blue",
          gearMaxAngle: 10,
          gearPower: -5,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 3,
        },
        {
          name: "Switcher",
          x: 90,
          y: 443.05,
          angle: 0,
          type: "button",
          color: "Yellow",
          signalID: 4,
        },
        {
          name: "Platform",
          type: "static",
          x: 120,
          y: 429,
          density: 1,
          width: 60,
          angle: -90,
        },
        {
          name: "Platform",
          type: "static",
          x: 60,
          y: 429,
          density: 1,
          width: 60,
          angle: -90,
        },
        { name: "Box", x: 158, y: 277, angle: void 0, density: 3 },
        {
          name: "Platform",
          type: "static",
          x: 580,
          y: 289,
          density: 1,
          width: 60,
          angle: -90,
        },
        {
          name: "Platform",
          type: "static",
          x: 660,
          y: 289,
          density: 1,
          width: 60,
          angle: -90,
        },
        {
          name: "Platform",
          type: "static",
          x: 100,
          y: 70,
          density: 1,
          width: 200,
          angle: 0,
        },
        { name: "Star", x: 100, y: 40 },
        { name: "Star", x: 620, y: 40 },
        { name: "Star", x: 690, y: 220 },
      ],
    },
    {
      items: [
        {
          name: "Platform",
          type: "static",
          x: 655.95,
          y: 155.8,
          density: 1,
          width: 58.8,
          angle: 38,
        },
        {
          name: "Platform",
          type: "static",
          x: 492.45,
          y: 265.65,
          density: 1,
          width: 19.7,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 657.2,
          y: 347.95,
          density: 1,
          width: 123.3,
          angle: -19,
        },
        {
          name: "Platform",
          type: "static",
          x: 53.45,
          y: 392.9,
          density: 1,
          width: 31.7,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 91.05,
          y: 176.2,
          density: 1,
          width: 83,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 184.9,
          y: 197.35,
          density: 1,
          width: 81.6,
          angle: 16,
        },
        {
          name: "Platform",
          type: "static",
          x: 217.6,
          y: 223.85,
          density: 1,
          width: 48.3,
          angle: 90,
        },
        {
          name: "Platform",
          type: "dynamic",
          x: 596.25,
          y: 338.6,
          density: 1,
          width: 80,
          angle: 71,
        },
        {
          name: "Platform",
          type: "static",
          x: 418.25,
          y: 416.75,
          density: 1,
          width: 74.4,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 34.6,
          y: 37.7,
          density: 1,
          width: 99.8,
          angle: 60,
        },
        {
          name: "Platform",
          type: "dynamic",
          x: 67.2,
          y: 94.2,
          density: 1,
          width: 68.5,
          angle: 60,
        },
        {
          name: "Platform",
          type: "static",
          x: 611.7,
          y: 286.5,
          density: 1,
          width: 85.7,
          angle: 0,
        },
        { name: "Basket", x: 45.3, y: 147.3 },
        {
          name: "Cannon",
          x: 314.35,
          y: 188.45,
          lowerAngle: -70,
          upperAngle: 70,
        },
        {
          name: "Platform",
          type: "static",
          x: 298.5,
          y: 208.75,
          density: 1,
          width: 105.3,
          angle: 0,
        },
        {
          name: "Spring",
          x: 248.2,
          y: 410.3,
          angle: -21,
          type: "static",
          elasticity: 1.9,
        },
        {
          name: "Spring",
          x: 579.65,
          y: 435.45,
          angle: -15,
          type: "static",
          elasticity: 2.5,
        },
        {
          name: "Platform",
          type: "static",
          x: 250.2,
          y: 415.95,
          density: 1,
          width: 55.7,
          angle: -21,
        },
        {
          name: "Platform",
          type: "dynamic",
          x: 491.9,
          y: 223.5,
          density: 1,
          width: 99.6,
          angle: 90,
        },
        {
          name: "Switcher",
          x: 588.4,
          y: 278.5,
          angle: 0,
          type: "button",
          color: "Purple",
          signalID: 1,
        },
        {
          name: "Spring",
          x: 398.8,
          y: 283.45,
          angle: 0,
          type: "static",
          elasticity: 2.5,
        },
        {
          name: "Pivot",
          x: 491.9,
          y: 262.45,
          type: "bolt",
          color: "Red",
          gearMaxAngle: 0,
          gearPower: 1,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 0,
        },
        {
          name: "Pivot",
          x: 54.95,
          y: 72.8,
          type: "gear",
          color: "Purple",
          gearMaxAngle: -30,
          gearPower: -5,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 1,
        },
        {
          name: "Platform",
          type: "static",
          x: 581.4,
          y: 442.4,
          density: 1,
          width: 49.6,
          angle: -15,
        },
        {
          name: "Spring",
          x: 53.45,
          y: 394.4,
          angle: 0,
          type: "dynamic",
          elasticity: 2.8,
        },
        {
          name: "Platform",
          type: "static",
          x: 394.8,
          y: 181.6,
          density: 1,
          width: 112.1,
          angle: -30,
        },
        {
          name: "Platform",
          type: "static",
          x: 497.45,
          y: 154.25,
          density: 1,
          width: 120,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 600,
          y: 189.65,
          density: 1,
          width: 121.9,
          angle: 37,
        },
        {
          name: "Platform",
          type: "static",
          x: 398.75,
          y: 290.3,
          density: 1,
          width: 45,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 645.55,
          y: 256.55,
          density: 1,
          width: 77.4,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 709.05,
          y: 270.05,
          density: 1,
          width: 130.9,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 360.7,
          y: 444.05,
          density: 1,
          width: 75.9,
          angle: 0,
        },
        {
          name: "Switcher",
          x: 360.75,
          y: 435.2,
          angle: 0,
          type: "button",
          color: "Green",
          signalID: 4,
        },
        {
          name: "Platform",
          type: "static",
          x: 331.65,
          y: 422.85,
          density: 1,
          width: 59.8,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 254.85,
          y: 223.85,
          density: 1,
          width: 48.3,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 118,
          y: 157.3,
          density: 1,
          width: 88.5,
          angle: 45,
        },
        {
          name: "Platform",
          type: "static",
          x: 389.9,
          y: 430.35,
          density: 1,
          width: 45.3,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 507.7,
          y: 108.25,
          density: 1,
          width: 143.5,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 607.55,
          y: 125.75,
          density: 1,
          width: 79.4,
          angle: 30,
        },
        {
          name: "Switcher",
          x: 378.9,
          y: 19,
          angle: 180,
          type: "toogle",
          color: "Red",
          signalID: 2,
        },
        {
          name: "Platform",
          type: "static",
          x: 492.85,
          y: 405.4,
          density: 1,
          width: 90,
          angle: -15,
        },
        { name: "Star", x: 617.65, y: 311.2 },
        { name: "Star", x: 687.65, y: 48.1 },
        { name: "Star", x: 17.05, y: 77.5 },
        {
          name: "Platform",
          type: "static",
          x: 40,
          y: 208.75,
          density: 1,
          width: 120.1,
          angle: 0,
        },
        {
          name: "Pivot",
          x: 606.15,
          y: 368.05,
          type: "gear",
          color: "Red",
          gearMaxAngle: -19,
          gearPower: -3,
          lowerAngle: -720,
          upperAngle: 720,
          signalID: 2,
        },
        {
          name: "Pivot",
          x: 52.2,
          y: 392.05,
          type: "gear",
          color: "Green",
          gearMaxAngle: 60,
          gearPower: 5,
          lowerAngle: 0,
          upperAngle: 0,
          signalID: 4,
        },
        {
          name: "Platform",
          type: "static",
          x: 691.95,
          y: 188.65,
          density: 1,
          width: 58.8,
          angle: 46,
        },
        {
          name: "Platform",
          type: "static",
          x: 400.7,
          y: 11.25,
          density: 1,
          width: 143.5,
          angle: 0,
        },
      ],
    },
    {
      items: [
        {
          name: "Platform",
          type: "static",
          x: 92.65,
          y: 411.6,
          density: 1,
          width: 19.2,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 240.8,
          y: 58.6,
          density: 1,
          width: 19.2,
          angle: 0,
        },
        { name: "Basket", x: 675.5, y: 366.65 },
        {
          name: "Cannon",
          x: 499.55,
          y: 446.1,
          lowerAngle: -70,
          upperAngle: 10,
        },
        {
          name: "Platform",
          type: "dynamic",
          x: 212.75,
          y: 86.4,
          density: 1,
          width: 101.8,
          angle: -45,
        },
        {
          name: "Platform",
          type: "static",
          x: 189.3,
          y: 169.5,
          density: 1,
          width: 174.8,
          angle: 0,
        },
        {
          name: "Pivot",
          x: 240.15,
          y: 59.3,
          type: "gear",
          color: "Red",
          gearMaxAngle: -90,
          gearPower: -16,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 0,
        },
        { name: "Box", x: 243.5, y: 137.6, angle: 0, density: 1 },
        {
          name: "Spring",
          x: 309.55,
          y: 257,
          angle: 15,
          type: "static",
          elasticity: 2.9,
        },
        {
          name: "Platform",
          type: "static",
          x: 604.8,
          y: 414.7,
          density: 1,
          width: 110,
          angle: 0,
        },
        { name: "Box", x: 603.7, y: 382.95, angle: 0, density: 3 },
        { name: "Box", x: 603.7, y: 337.55, angle: 0, density: 3 },
        { name: "Box", x: 603.75, y: 291.1, angle: 0, density: 3 },
        {
          name: "Platform",
          type: "static",
          x: 569.7,
          y: 350.3,
          density: 1,
          width: 145,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 641.2,
          y: 324.4,
          density: 1,
          width: 199,
          angle: 90,
        },
        {
          name: "Switcher",
          x: 465.95,
          y: 207.2,
          angle: -165,
          type: "toogle",
          color: "Red",
          signalID: 0,
        },
        {
          name: "Teleport",
          x: 475.2,
          y: 125.95,
          angle: 180,
          color: "Blue",
          id: 1,
          mulVel: 1,
        },
        {
          name: "Platform",
          type: "static",
          x: 503.3,
          y: 210,
          density: 1,
          width: 139.7,
          angle: 15,
        },
        {
          name: "Teleport",
          x: 252.3,
          y: 224,
          angle: -133,
          color: "Blue",
          id: 1,
          mulVel: 1,
        },
        {
          name: "Teleport",
          x: 45.55,
          y: 128.7,
          angle: 0,
          color: "Red",
          id: 3,
          mulVel: 1,
        },
        { name: "Box", x: 50, y: 82.65, angle: 0, density: 0.1 },
        {
          name: "Teleport",
          x: 353.35,
          y: 297.7,
          angle: 135,
          color: "Red",
          id: 3,
          mulVel: 1,
        },
        {
          name: "Platform",
          type: "static",
          x: 404.55,
          y: 230.85,
          density: 1,
          width: 120,
          angle: -45,
        },
        {
          name: "Switcher",
          x: 121.4,
          y: 161.4,
          angle: 0,
          type: "button",
          color: "Purple",
          signalID: 3,
        },
        {
          name: "Platform",
          type: "static",
          x: 159,
          y: 96.7,
          density: 1,
          width: 163.7,
          angle: 90,
        },
        {
          name: "Spring",
          x: 92.85,
          y: 411.75,
          angle: -45,
          type: "dynamic",
          elasticity: 3,
        },
        {
          name: "Pivot",
          x: 92.65,
          y: 411.6,
          type: "gear",
          color: "Purple",
          gearMaxAngle: 35,
          gearPower: 5,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 3,
        },
        {
          name: "Platform",
          type: "static",
          x: 9.1,
          y: 114.75,
          density: 1,
          width: 199.8,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 709.5,
          y: 209.35,
          density: 1,
          width: 388.1,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 308.5,
          y: 258.05,
          density: 1,
          width: 43.2,
          angle: 15,
        },
        {
          name: "Platform",
          type: "static",
          x: 69.1,
          y: 222.45,
          density: 1,
          width: 139.5,
          angle: 126,
        },
        { name: "Star", x: 560.7, y: 252.5 },
        { name: "Star", x: 129.4, y: 422.05 },
        { name: "Star", x: 23.5, y: 307.7 },
      ],
    },
    {
      items: [
        {
          name: "Platform",
          type: "static",
          x: 8.95,
          y: 180.35,
          density: 1,
          width: 359.1,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 460.55,
          y: 417.4,
          density: 1,
          width: 18,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 707.15,
          y: 361.65,
          density: 1,
          width: 18,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 592.5,
          y: 262.75,
          density: 1,
          width: 18,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 591.2,
          y: 101.45,
          density: 1,
          width: 18,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 475.55,
          y: 50.4,
          density: 1,
          width: 18,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 322.8,
          y: 32.4,
          density: 1,
          width: 18,
          angle: 0,
        },
        {
          name: "Platform",
          type: "dynamic",
          x: 467.75,
          y: 404.1,
          density: 1,
          width: 46.5,
          angle: 120,
        },
        { name: "Basket", x: 49.4, y: 396.45 },
        {
          name: "Cannon",
          x: 156.35,
          y: 335.5,
          lowerAngle: -45,
          upperAngle: 30,
        },
        {
          name: "Platform",
          type: "dynamic",
          x: 383.55,
          y: 32,
          density: 0.5,
          width: 138.2,
          angle: 0,
        },
        {
          name: "Pivot",
          x: 322.8,
          y: 32.4,
          type: "bolt",
          color: "Red",
          gearMaxAngle: 0,
          gearPower: 1,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 0,
        },
        {
          name: "Platform",
          type: "dynamic",
          x: 461.75,
          y: 50.4,
          density: 1,
          width: 42.7,
          angle: 0,
        },
        {
          name: "Pivot",
          x: 475.55,
          y: 50.4,
          type: "gear",
          color: "Yellow",
          gearMaxAngle: -55,
          gearPower: -5,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 3,
        },
        {
          name: "Platform",
          type: "dynamic",
          x: 590.95,
          y: 66.4,
          density: 0.05,
          width: 89.4,
          angle: 90,
        },
        {
          name: "Platform",
          type: "dynamic",
          x: 592.15,
          y: 220.5,
          density: 0.05,
          width: 106.3,
          angle: 90,
        },
        {
          name: "Pivot",
          x: 590.95,
          y: 101.45,
          type: "bolt",
          color: "Red",
          gearMaxAngle: 0,
          gearPower: 1,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 0,
        },
        {
          name: "Switcher",
          x: 598.3,
          y: 368.4,
          angle: 0,
          type: "toogle",
          color: "Red",
          signalID: 1,
        },
        {
          name: "Platform",
          type: "dynamic",
          x: 670.15,
          y: 361.55,
          density: 1,
          width: 91.6,
          angle: 0,
        },
        {
          name: "Switcher",
          x: 161.5,
          y: 160.75,
          angle: 180,
          type: "toogle",
          color: "Green",
          signalID: 2,
        },
        {
          name: "Platform",
          type: "static",
          x: 477.7,
          y: 194.2,
          density: 1,
          width: 259.1,
          angle: -45,
        },
        {
          name: "Spring",
          x: 381.2,
          y: 239.45,
          angle: 45,
          type: "static",
          elasticity: 3.2,
        },
        {
          name: "Platform",
          type: "static",
          x: 214.65,
          y: 349.75,
          density: 1,
          width: 277.1,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 438.8,
          y: 346.65,
          density: 1,
          width: 126.1,
          angle: 30,
        },
        {
          name: "Platform",
          type: "static",
          x: 386.95,
          y: 370.95,
          density: 1,
          width: 90.4,
          angle: 30,
        },
        {
          name: "Switcher",
          x: 496.95,
          y: 428.45,
          angle: 0,
          type: "button",
          color: "Yellow",
          signalID: 3,
        },
        {
          name: "Platform",
          type: "static",
          x: 526.95,
          y: 419.7,
          density: 1,
          width: 51.6,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 376.1,
          y: 245.15,
          density: 1,
          width: 43.9,
          angle: 45,
        },
        {
          name: "Platform",
          type: "static",
          x: 504.55,
          y: 436.55,
          density: 1,
          width: 63.2,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 598.3,
          y: 376.45,
          density: 1,
          width: 40,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 388.65,
          y: 301,
          density: 1,
          width: 45.7,
          angle: 90,
        },
        {
          name: "Pivot",
          x: 460.55,
          y: 416.4,
          type: "gear",
          color: "Red",
          gearMaxAngle: 30,
          gearPower: -5,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 1,
        },
        {
          name: "Platform",
          type: "dynamic",
          x: 31.3,
          y: 350.95,
          density: 1,
          width: 61.5,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 78.4,
          y: 381.5,
          density: 1,
          width: 49.5,
          angle: -75,
        },
        {
          name: "Platform",
          type: "static",
          x: 85.1,
          y: 252.6,
          density: 1,
          width: 214.9,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 144.85,
          y: 153.45,
          density: 1,
          width: 137,
          angle: 0,
        },
        { name: "Star", x: 434, y: 437.95 },
        { name: "Star", x: 406.5, y: 91.5 },
        { name: "Star", x: 99.5, y: 123 },
        {
          name: "Pivot",
          x: 592.15,
          y: 261.75,
          type: "bolt",
          color: "Red",
          gearMaxAngle: 0,
          gearPower: 1,
          lowerAngle: -720,
          upperAngle: 720,
          signalID: 0,
        },
        {
          name: "Pivot",
          x: 9.7,
          y: 351.8,
          type: "gear",
          color: "Red",
          gearMaxAngle: 75,
          gearPower: 6,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 1,
        },
        {
          name: "Pivot",
          x: 707.15,
          y: 361.65,
          type: "gear",
          color: "Green",
          gearMaxAngle: 50,
          gearPower: 7,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 2,
        },
      ],
    },
    {
      items: [
        {
          name: "Platform",
          type: "static",
          x: 620.1,
          y: 128.6,
          density: 1,
          width: 86,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 526.1,
          y: 385.75,
          density: 1,
          width: 112,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 190.3,
          y: 171.2,
          density: 1,
          width: 140.3,
          angle: 36,
        },
        { name: "Basket", x: 622.3, y: 199.35 },
        { name: "Cannon", x: 235, y: 394.6, lowerAngle: -70, upperAngle: 70 },
        {
          name: "Switcher",
          x: 678.85,
          y: 276.75,
          angle: 180,
          type: "button",
          color: "Green",
          signalID: 1,
        },
        {
          name: "Platform",
          type: "static",
          x: 458.15,
          y: 318.75,
          density: 1,
          width: 38,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 582.5,
          y: 254.85,
          density: 1,
          width: 279.9,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 468.1,
          y: 352.25,
          density: 1,
          width: 85,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 248.05,
          y: 195.45,
          density: 1,
          width: 46.7,
          angle: -54,
        },
        {
          name: "Platform",
          type: "static",
          x: 97.8,
          y: 155.7,
          density: 1,
          width: 178,
          angle: 90,
        },
        {
          name: "Spring",
          x: 59.1,
          y: 409.4,
          angle: 0,
          type: "static",
          elasticity: 3.3,
        },
        {
          name: "Platform",
          type: "static",
          x: 97.8,
          y: 359.15,
          density: 1,
          width: 129,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 69.6,
          y: 417.15,
          density: 1,
          width: 76.7,
          angle: 0,
        },
        {
          name: "Switcher",
          x: 72.85,
          y: 59.6,
          angle: -144,
          type: "toogle",
          color: "Purple",
          signalID: 2,
        },
        {
          name: "Platform",
          type: "static",
          x: 8.1,
          y: 270.35,
          density: 1,
          width: 120,
          angle: 90,
        },
        { name: "Ball", x: 149.25, y: 81.35 },
        { name: "Ball", x: 167.75, y: 66.15 },
        {
          name: "Platform",
          type: "static",
          x: 658,
          y: 192.55,
          density: 1,
          width: 159.1,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 98.05,
          y: 68.7,
          density: 1,
          width: 165.3,
          angle: 36,
        },
        { name: "Ball", x: 131.6, y: 60 },
        { name: "Ball", x: 149.25, y: 60.3 },
        { name: "Ball", x: 179.25, y: 45.3 },
        { name: "Ball", x: 152.25, y: 39.3 },
        {
          name: "Platform",
          type: "static",
          x: 346.8,
          y: 249.45,
          density: 1,
          width: 241.5,
          angle: 36,
        },
        { name: "Star", x: 18.85, y: 376.4 },
        { name: "Star", x: 440.85, y: 350.5 },
        { name: "Star", x: 120.15, y: 118.95 },
        {
          name: "Platform",
          type: "dynamic",
          x: 187.1,
          y: 70.7,
          density: 1,
          width: 119.4,
          angle: -54,
        },
        {
          name: "Pivot",
          x: 157.15,
          y: 111.85,
          type: "gear",
          color: "Purple",
          gearMaxAngle: 37,
          gearPower: 5,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 2,
        },
        {
          name: "Platform",
          type: "static",
          x: 686.25,
          y: 353.4,
          density: 1,
          width: 18,
          angle: 0,
        },
        {
          name: "Platform",
          type: "dynamic",
          x: 590.45,
          y: 335.4,
          density: 0.8,
          width: 209.5,
          angle: 0,
        },
        {
          name: "Pivot",
          x: 582.25,
          y: 335.4,
          type: "bolt",
          color: "Red",
          gearMaxAngle: 0,
          gearPower: 1,
          lowerAngle: -720,
          upperAngle: 720,
          signalID: 0,
        },
        {
          name: "Platform",
          type: "dynamic",
          x: 593.9,
          y: 174.2,
          density: 1,
          width: 40,
          angle: 0,
        },
        {
          name: "Pivot",
          x: 582.25,
          y: 173.4,
          type: "gear",
          color: "Green",
          gearMaxAngle: 40,
          gearPower: 5,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 1,
        },
        {
          name: "Platform",
          type: "dynamic",
          x: 646.85,
          y: 174.2,
          density: 1,
          width: 40,
          angle: 0,
        },
        { name: "Ball", x: 619.85, y: 155.8 },
        {
          name: "Pivot",
          x: 658.25,
          y: 173.4,
          type: "gear",
          color: "Green",
          gearMaxAngle: -40,
          gearPower: -5,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 1,
        },
        {
          name: "Platform",
          type: "static",
          x: 678.95,
          y: 270.75,
          density: 1,
          width: 64.2,
          angle: 0,
        },
      ],
    },
    {
      items: [
        {
          name: "Platform",
          type: "static",
          x: 169.35,
          y: 213.35,
          density: 1,
          width: 146.4,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 270.65,
          y: 278.35,
          density: 1,
          width: 151.3,
          angle: 0,
        },
        { name: "Basket", x: 60.35, y: 148.15 },
        {
          name: "Cannon",
          x: 433.25,
          y: 386.2,
          lowerAngle: -60,
          upperAngle: 70,
        },
        {
          name: "Platform",
          type: "static",
          x: 134.65,
          y: 288.35,
          density: 1,
          width: 49.3,
          angle: 0,
        },
        {
          name: "Switcher",
          x: 50.35,
          y: 428.35,
          angle: 0,
          type: "button",
          color: "Blue",
          signalID: 1,
        },
        {
          name: "Platform",
          type: "static",
          x: 214.8,
          y: 10.2,
          density: 1,
          width: 414.3,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 52.05,
          y: 436.35,
          density: 1,
          width: 88.3,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 340.25,
          y: 360.5,
          density: 1,
          width: 183.1,
          angle: 90,
        },
        {
          name: "Switcher",
          x: 688.2,
          y: 300.7,
          angle: -132,
          type: "button",
          color: "Red",
          signalID: 2,
        },
        {
          name: "Platform",
          type: "static",
          x: 618.55,
          y: 327.65,
          density: 0.5,
          width: 120,
          angle: 30,
        },
        {
          name: "Platform",
          type: "static",
          x: 693.9,
          y: 296.5,
          density: 1,
          width: 40.5,
          angle: 48,
        },
        { name: "Box", x: 133.8, y: 255.5, angle: void 0, density: 2 },
        {
          name: "Platform",
          type: "static",
          x: 100.95,
          y: 156.35,
          density: 1,
          width: 132,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 16.75,
          y: 223.3,
          density: 1,
          width: 444.5,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 87.35,
          y: 418.4,
          density: 1,
          width: 54.1,
          angle: -90,
        },
        {
          name: "Platform",
          type: "static",
          x: 416.65,
          y: 53.8,
          density: 1,
          width: 107.6,
          angle: -90,
        },
        {
          name: "Platform",
          type: "static",
          x: 560.35,
          y: 155.55,
          density: 1,
          width: 80,
          angle: 0,
        },
        { name: "Rock", x: 560.35, y: 123.25, density: 0.5 },
        { name: "Star", x: 133.5, y: 135.35 },
        { name: "Star", x: 280.1, y: 244.9 },
        { name: "Star", x: 560.45, y: 69.45 },
        {
          name: "Platform",
          type: "static",
          x: 36.95,
          y: 72.05,
          density: 1,
          width: 49.2,
          angle: 45,
        },
        {
          name: "Platform",
          type: "static",
          x: 537.5,
          y: 167.05,
          density: 1,
          width: 40,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 582.5,
          y: 167.05,
          density: 1,
          width: 40,
          angle: 90,
        },
        {
          name: "Teleport",
          x: 524.7,
          y: 254.35,
          angle: -135,
          color: "Blue",
          id: 1,
          mulVel: 1,
        },
        {
          name: "Teleport",
          x: 217.8,
          y: 246.8,
          angle: -90,
          color: "Blue",
          id: 1,
          mulVel: 2,
        },
        {
          name: "Platform",
          type: "dynamic",
          x: 172.3,
          y: 99.2,
          density: 1,
          width: 205.8,
          angle: 0,
        },
        {
          name: "Pivot",
          x: 100.5,
          y: 99.95,
          type: "gear",
          color: "Blue",
          gearMaxAngle: -10,
          gearPower: -10,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 1,
        },
        {
          name: "Platform",
          type: "dynamic",
          x: 354.8,
          y: 99.2,
          density: 1,
          width: 138.8,
          angle: 0,
        },
        {
          name: "Pivot",
          x: 415.5,
          y: 99.95,
          type: "gear",
          color: "Red",
          gearMaxAngle: 30,
          gearPower: 10,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 2,
        },
      ],
    },
    {
      items: [
        {
          name: "Platform",
          type: "static",
          x: 140.1,
          y: 265.1,
          density: 1,
          width: 18,
          angle: 38,
        },
        {
          name: "Platform",
          type: "static",
          x: 249.1,
          y: 351.1,
          density: 1,
          width: 18,
          angle: 38,
        },
        {
          name: "Platform",
          type: "static",
          x: 193.6,
          y: 308.6,
          density: 1,
          width: 18,
          angle: 38,
        },
        {
          name: "Platform",
          type: "static",
          x: 491.9,
          y: 167.35,
          density: 1,
          width: 91.7,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 647.9,
          y: 167.35,
          density: 1,
          width: 91.7,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 27.15,
          y: 169.15,
          density: 1,
          width: 206.7,
          angle: -90,
        },
        {
          name: "Platform",
          type: "static",
          x: 162.25,
          y: 253.75,
          density: 1,
          width: 222.9,
          angle: 40,
        },
        { name: "Basket", x: 657.85, y: 419.4 },
        { name: "Cannon", x: 304.3, y: 302.2, lowerAngle: -70, upperAngle: 70 },
        {
          name: "Platform",
          type: "static",
          x: 119.3,
          y: 344.2,
          density: 1,
          width: 249.3,
          angle: 40,
        },
        {
          name: "Platform",
          type: "dynamic",
          x: 233.15,
          y: 370.1,
          density: 1,
          width: 69.3,
          angle: 130,
        },
        {
          name: "Pivot",
          x: 249.25,
          y: 349.95,
          type: "gear",
          color: "Purple",
          gearMaxAngle: 0,
          gearPower: -7,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 1,
        },
        {
          name: "Platform",
          type: "static",
          x: 470.6,
          y: 323.1,
          density: 1,
          width: 457.8,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 240.25,
          y: 422.9,
          density: 1,
          width: 63.3,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 352.15,
          y: 422.95,
          density: 1,
          width: 63.3,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 464.2,
          y: 421.75,
          density: 1,
          width: 63.3,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 589.65,
          y: 421.7,
          density: 1,
          width: 89.6,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 297.15,
          y: 467,
          density: 1,
          width: 51.8,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 522.7,
          y: 467,
          density: 1,
          width: 51.8,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 409.1,
          y: 467,
          density: 1,
          width: 51.8,
          angle: 0,
        },
        { name: "Rock", x: 90.2, y: 273.75, density: 1 },
        { name: "Rock", x: 144.55, y: 318.65, density: 1 },
        { name: "Rock", x: 195.25, y: 361.5, density: 1 },
        {
          name: "Platform",
          type: "dynamic",
          x: 178.35,
          y: 328.3,
          density: 1,
          width: 65.6,
          angle: 128,
        },
        {
          name: "Pivot",
          x: 192.6,
          y: 309.6,
          type: "gear",
          color: "Red",
          gearMaxAngle: 40,
          gearPower: -7,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 2,
        },
        {
          name: "Platform",
          type: "dynamic",
          x: 124.75,
          y: 284.55,
          density: 2,
          width: 65.4,
          angle: 128,
        },
        {
          name: "Pivot",
          x: 138.85,
          y: 265.85,
          type: "gear",
          color: "Blue",
          gearMaxAngle: 40,
          gearPower: -7,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 3,
        },
        {
          name: "Swings",
          x: 569.95,
          y: 178.85,
          angle: -25,
          lowerAngle: -25,
          upperAngle: 25,
        },
        {
          name: "Platform",
          type: "static",
          x: 690.15,
          y: 312.75,
          density: 1,
          width: 236,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 627.65,
          y: 303.05,
          density: 1,
          width: 57.7,
          angle: 90,
        },
        {
          name: "Switcher",
          x: 597.3,
          y: 315.15,
          angle: 0,
          type: "button",
          color: "Blue",
          signalID: 3,
        },
        {
          name: "Switcher",
          x: 537.8,
          y: 315.15,
          angle: 0,
          type: "button",
          color: "Red",
          signalID: 2,
        },
        {
          name: "Switcher",
          x: 477.8,
          y: 315.15,
          angle: 0,
          type: "button",
          color: "Green",
          signalID: 4,
        },
        {
          name: "Swings",
          x: 507.65,
          y: 257.7,
          angle: -25,
          lowerAngle: -25,
          upperAngle: 30,
        },
        {
          name: "Platform",
          type: "static",
          x: 80.05,
          y: 137.4,
          density: 1,
          width: 103.9,
          angle: -90,
        },
        {
          name: "Swings",
          x: 627.65,
          y: 257.7,
          angle: -30,
          lowerAngle: -30,
          upperAngle: 25,
        },
        {
          name: "Switcher",
          x: 657.65,
          y: 315.15,
          angle: 0,
          type: "button",
          color: "Purple",
          signalID: 1,
        },
        {
          name: "Platform",
          type: "dynamic",
          x: 53.65,
          y: 74.9,
          density: 2,
          width: 70.9,
          angle: 0,
        },
        {
          name: "Pivot",
          x: 27.1,
          y: 74.6,
          type: "gear",
          color: "Green",
          gearMaxAngle: -45,
          gearPower: -6,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 4,
        },
        {
          name: "Platform",
          type: "static",
          x: 567.65,
          y: 287.35,
          density: 1,
          width: 181.4,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 507.65,
          y: 303.15,
          density: 1,
          width: 58,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 449.4,
          y: 263.4,
          density: 1,
          width: 137.4,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 470.8,
          y: 203.95,
          density: 1,
          width: 60.3,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 589.95,
          y: 113.85,
          density: 1,
          width: 50,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 549.95,
          y: 113.85,
          density: 1,
          width: 50,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 619.15,
          y: 130.2,
          density: 1,
          width: 75,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 521.05,
          y: 130.2,
          density: 1,
          width: 75.7,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 605.05,
          y: 77.7,
          density: 1,
          width: 50,
          angle: -45,
        },
        {
          name: "Platform",
          type: "static",
          x: 535.05,
          y: 77.7,
          density: 1,
          width: 50,
          angle: 45,
        },
        {
          name: "Platform",
          type: "static",
          x: 669.05,
          y: 203.95,
          density: 1,
          width: 60.3,
          angle: 0,
        },
        { name: "Star", x: 519, y: 97.45 },
        { name: "Star", x: 36, y: 24.65 },
        { name: "Star", x: 690, y: 163.3 },
      ],
    },
    {
      items: [
        {
          name: "Platform",
          type: "static",
          x: 664.5,
          y: 357.95,
          density: 1,
          width: 69,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 156,
          y: 422.7,
          density: 1,
          width: 18,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 428.4,
          y: 238.1,
          density: 1,
          width: 18,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 565.5,
          y: 19.45,
          density: 1,
          width: 60.3,
          angle: -90,
        },
        {
          name: "Platform",
          type: "static",
          x: 199.85,
          y: 19.45,
          density: 1,
          width: 60.3,
          angle: -90,
        },
        {
          name: "Platform",
          type: "static",
          x: 288.3,
          y: 370.25,
          density: 1,
          width: 199.9,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 232.25,
          y: 424.95,
          density: 1,
          width: 120.7,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 255.25,
          y: 213,
          density: 1,
          width: 55.8,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 504.9,
          y: 212.95,
          density: 1,
          width: 62.4,
          angle: 0,
        },
        { name: "Basket", x: 60.6, y: 241.5 },
        { name: "Cannon", x: 474.2, y: 406.8, lowerAngle: -70, upperAngle: 70 },
        {
          name: "Platform",
          type: "static",
          x: 175.65,
          y: 195,
          density: 1,
          width: 140,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 574.8,
          y: 194.95,
          density: 1,
          width: 113.5,
          angle: 0,
        },
        {
          name: "Platform",
          type: "dynamic",
          x: 382.1,
          y: 21.4,
          density: 0.01,
          width: 266.7,
          angle: 0,
        },
        {
          name: "Switcher",
          x: 121.65,
          y: 227.85,
          angle: 90,
          type: "toogle",
          color: "Green",
          signalID: 1,
        },
        {
          name: "Teleport",
          x: 66.5,
          y: 42.9,
          angle: 110,
          color: "Red",
          id: 1,
          mulVel: 1,
        },
        {
          name: "Teleport",
          x: 570.8,
          y: 251.25,
          angle: -135,
          color: "Red",
          id: 1,
          mulVel: 1,
        },
        {
          name: "Platform",
          type: "static",
          x: 708.15,
          y: 270,
          density: 1,
          width: 342.3,
          angle: 90,
        },
        {
          name: "Platform",
          type: "dynamic",
          x: 379.5,
          y: 238.85,
          density: 1,
          width: 115.4,
          angle: 0,
        },
        {
          name: "Pivot",
          x: 426.4,
          y: 238.1,
          type: "gear",
          color: "Blue",
          gearMaxAngle: 40,
          gearPower: 6,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 2,
        },
        {
          name: "Switcher",
          x: 312.45,
          y: 442.75,
          angle: 0,
          type: "button",
          color: "Blue",
          signalID: 2,
        },
        {
          name: "Platform",
          type: "static",
          x: 312.3,
          y: 449.95,
          density: 1,
          width: 40,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 417.35,
          y: 424.95,
          density: 1,
          width: 169.7,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 9.3,
          y: 108.35,
          density: 1,
          width: 216.7,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 101.65,
          y: 90.15,
          density: 1,
          width: 169.3,
          angle: -160,
        },
        {
          name: "Platform",
          type: "static",
          x: 43.95,
          y: 390.95,
          density: 1,
          width: 20,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 379.3,
          y: 397.7,
          density: 1,
          width: 74,
          angle: 90,
        },
        {
          name: "Platform",
          type: "dynamic",
          x: 172.75,
          y: 363.25,
          density: 0.6,
          width: 133.6,
          angle: 105,
        },
        {
          name: "Pivot",
          x: 158,
          y: 419.7,
          type: "bolt",
          color: "Red",
          gearMaxAngle: 0,
          gearPower: 5,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 114.65,
          y: 224.65,
          density: 1,
          width: 112.3,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 236.65,
          y: 204,
          density: 1,
          width: 36,
          angle: -90,
        },
        {
          name: "Platform",
          type: "static",
          x: 527.05,
          y: 204,
          density: 1,
          width: 36,
          angle: -90,
        },
        {
          name: "Platform",
          type: "dynamic",
          x: 228.65,
          y: 40.65,
          density: 1,
          width: 75.8,
          angle: 0,
        },
        {
          name: "Pivot",
          x: 197.95,
          y: 41.1,
          type: "gear",
          color: "Green",
          gearMaxAngle: 110,
          gearPower: 5,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 1,
        },
        {
          name: "Platform",
          type: "dynamic",
          x: 536.05,
          y: 40.6,
          density: 1,
          width: 76.7,
          angle: 0,
        },
        {
          name: "Pivot",
          x: 567.15,
          y: 41.1,
          type: "gear",
          color: "Green",
          gearMaxAngle: -110,
          gearPower: -5,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 1,
        },
        {
          name: "Platform",
          type: "static",
          x: 623,
          y: 313.5,
          density: 1,
          width: 255.3,
          angle: 90,
        },
        { name: "Star", x: 591.45, y: 422.05 },
        { name: "Star", x: 73.2, y: 429.25 },
        { name: "Star", x: 163.15, y: 54.05 },
        {
          name: "Platform",
          type: "dynamic",
          x: 48,
          y: 207.7,
          density: 1,
          width: 95.4,
          angle: 0,
        },
        {
          name: "Pivot",
          x: 8.75,
          y: 207.45,
          type: "gear",
          color: "Yellow",
          gearMaxAngle: -50,
          gearPower: -6,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 3,
        },
        {
          name: "Switcher",
          x: 667.15,
          y: 350.75,
          angle: 0,
          type: "button",
          color: "Yellow",
          signalID: 3,
        },
      ],
    },
    {
      items: [
        {
          name: "Platform",
          type: "static",
          x: 580,
          y: 209,
          density: 1,
          width: 18,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 400,
          y: 209,
          density: 1,
          width: 18,
          angle: 0,
        },
        { name: "Basket", x: 49.25, y: 386.65 },
        {
          name: "Cannon",
          x: 157.3,
          y: 378.15,
          lowerAngle: -30,
          upperAngle: 70,
        },
        {
          name: "Platform",
          type: "dynamic",
          x: 580,
          y: 210,
          density: 1,
          width: 170.8,
          angle: 50,
        },
        {
          name: "Pivot",
          x: 580,
          y: 210,
          type: "gear",
          color: "Red",
          gearMaxAngle: -50,
          gearPower: -5,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 6,
        },
        {
          name: "Platform",
          type: "static",
          x: 472.5,
          y: 295.1,
          density: 1,
          width: 331.8,
          angle: 0,
        },
        {
          name: "Switcher",
          x: 620.4,
          y: 431.65,
          angle: 0,
          type: "button",
          color: "Green",
          signalID: 4,
        },
        {
          name: "Platform",
          type: "dynamic",
          x: 400,
          y: 210,
          density: 1,
          width: 172.9,
          angle: -50,
        },
        {
          name: "Pivot",
          x: 400,
          y: 210,
          type: "gear",
          color: "Red",
          gearMaxAngle: 50,
          gearPower: 5,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 6,
        },
        {
          name: "Switcher",
          x: 312.25,
          y: 316.6,
          angle: -135,
          type: "toogle",
          color: "Red",
          signalID: 6,
        },
        {
          name: "Swings",
          x: 650,
          y: 377.15,
          angle: -20,
          lowerAngle: -20,
          upperAngle: 20,
        },
        {
          name: "Platform",
          type: "static",
          x: 630,
          y: 311.25,
          density: 1,
          width: 50,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 670,
          y: 311,
          density: 1,
          width: 50,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 689.4,
          y: 288.25,
          density: 1,
          width: 53.9,
          angle: -14,
        },
        {
          name: "Platform",
          type: "static",
          x: 650,
          y: 439.65,
          density: 1,
          width: 138.2,
          angle: 0,
        },
        {
          name: "Switcher",
          x: 680,
          y: 431.65,
          angle: 0,
          type: "button",
          color: "Purple",
          signalID: 2,
        },
        {
          name: "Platform",
          type: "static",
          x: 650,
          y: 419.35,
          density: 1,
          width: 58.6,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 710,
          y: 279.45,
          density: 1,
          width: 338,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 589.5,
          y: 384.9,
          density: 1,
          width: 128,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 512.95,
          y: 119.1,
          density: 1,
          width: 412.7,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 89,
          y: 249.4,
          density: 1,
          width: 378.1,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 9.5,
          y: 220,
          density: 1,
          width: 435.4,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 165.8,
          y: 10.2,
          density: 1,
          width: 329.1,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 128.8,
          y: 69.3,
          density: 1,
          width: 97.2,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 319.9,
          y: 312.45,
          density: 1,
          width: 56,
          angle: 45,
        },
        { name: "Star", x: 114.25, y: 422.4 },
        { name: "Star", x: 317.95, y: 38.15 },
        { name: "Star", x: 495.2, y: 261.15 },
        {
          name: "Platform",
          type: "static",
          x: 21.9,
          y: 348.2,
          density: 1,
          width: 41.5,
          angle: 45,
        },
        {
          name: "Platform",
          type: "static",
          x: 77.15,
          y: 328.2,
          density: 1,
          width: 41.5,
          angle: -45,
        },
        {
          name: "Spring",
          x: 312.95,
          y: 120.7,
          angle: 0,
          type: "dynamic",
          elasticity: 2.5,
        },
        {
          name: "Platform",
          type: "static",
          x: 167.95,
          y: 83.5,
          density: 1,
          width: 46.2,
          angle: 90,
        },
        {
          name: "Platform",
          type: "dynamic",
          x: 210.1,
          y: 126.35,
          density: 1,
          width: 123.2,
          angle: 35,
        },
        {
          name: "Pivot",
          x: 168.7,
          y: 97.35,
          type: "gear",
          color: "Purple",
          gearMaxAngle: 90,
          gearPower: 5,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 2,
        },
        {
          name: "Pivot",
          x: 311.7,
          y: 119.2,
          type: "gear",
          color: "Green",
          gearMaxAngle: -45,
          gearPower: -5,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 4,
        },
      ],
    },
    {
      items: [
        {
          name: "Platform",
          type: "static",
          x: 605.95,
          y: 124.05,
          density: 1,
          width: 18.7,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 514.95,
          y: 124.05,
          density: 1,
          width: 18.7,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 569.95,
          y: 252.05,
          density: 1,
          width: 18.7,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 9,
          y: 191.3,
          density: 1,
          width: 18,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 9,
          y: 345.3,
          density: 1,
          width: 188.4,
          angle: 90,
        },
        {
          name: "Platform",
          type: "dynamic",
          x: 30.3,
          y: 260.05,
          density: 1,
          width: 60.7,
          angle: 0,
        },
        {
          name: "Platform",
          type: "dynamic",
          x: 590,
          y: 140,
          density: 1,
          width: 60,
          angle: -45,
        },
        { name: "Basket", x: 42.9, y: 377.2 },
        {
          name: "Cannon",
          x: 251.3,
          y: 402.55,
          lowerAngle: -70,
          upperAngle: 70,
        },
        {
          name: "Platform",
          type: "static",
          x: 108.45,
          y: 279.55,
          density: 1,
          width: 81,
          angle: 0,
        },
        {
          name: "Switcher",
          x: 238.95,
          y: 95.1,
          angle: 180,
          type: "toogle",
          color: "Purple",
          signalID: 4,
        },
        {
          name: "Platform",
          type: "static",
          x: 438.5,
          y: 411.8,
          density: 1,
          width: 80,
          angle: 0,
        },
        {
          name: "Platform",
          type: "dynamic",
          x: 362.65,
          y: 424.1,
          density: 1,
          width: 100.8,
          angle: 165,
        },
        {
          name: "Platform",
          type: "dynamic",
          x: 512.7,
          y: 424.15,
          density: 1,
          width: 100.3,
          angle: 15,
        },
        {
          name: "Pivot",
          x: 473.6,
          y: 413.75,
          type: "gear",
          color: "Yellow",
          gearMaxAngle: -90,
          gearPower: -6,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 5,
        },
        {
          name: "Pivot",
          x: 402.45,
          y: 412.6,
          type: "gear",
          color: "Yellow",
          gearMaxAngle: 270,
          gearPower: 6,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 5,
        },
        {
          name: "Switcher",
          x: 85.2,
          y: 332.2,
          angle: 90,
          type: "toogle",
          color: "Yellow",
          signalID: 5,
        },
        {
          name: "Platform",
          type: "static",
          x: 605,
          y: 436.45,
          density: 1,
          width: 74.5,
          angle: 0,
        },
        {
          name: "Spring",
          x: 678.55,
          y: 462.1,
          angle: 0,
          type: "static",
          elasticity: 4.1,
        },
        {
          name: "Platform",
          type: "static",
          x: 393,
          y: 87,
          density: 1,
          width: 449.3,
          angle: 0,
        },
        {
          name: "Switcher",
          x: 185.35,
          y: 52.45,
          angle: 90,
          type: "button",
          color: "Green",
          signalID: 3,
        },
        {
          name: "Platform",
          type: "dynamic",
          x: 530,
          y: 140,
          density: 1,
          width: 60,
          angle: 45,
        },
        { name: "Rock", x: 560, y: 122, density: 1 },
        {
          name: "Spring",
          x: 712.5,
          y: 34.1,
          angle: -98,
          type: "static",
          elasticity: 2.2,
        },
        {
          name: "Pivot",
          x: 515,
          y: 125,
          type: "gear",
          color: "Purple",
          gearMaxAngle: 90,
          gearPower: 6,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 4,
        },
        {
          name: "Pivot",
          x: 605,
          y: 125,
          type: "gear",
          color: "Purple",
          gearMaxAngle: -90,
          gearPower: -6,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 4,
        },
        {
          name: "Platform",
          type: "static",
          x: 678.55,
          y: 469.05,
          density: 1,
          width: 36,
          angle: 0,
        },
        {
          name: "Switcher",
          x: 107.3,
          y: 271.45,
          angle: 0,
          type: "button",
          color: "Blue",
          signalID: 6,
        },
        {
          name: "Platform",
          type: "static",
          x: 177.35,
          y: 48.2,
          density: 1,
          width: 96.4,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 140.1,
          y: 245.45,
          density: 1,
          width: 86.2,
          angle: 90,
        },
        {
          name: "Platform",
          type: "dynamic",
          x: 75.75,
          y: 190.3,
          density: 1,
          width: 151.6,
          angle: 0,
        },
        {
          name: "Pivot",
          x: 8,
          y: 190.3,
          type: "gear",
          color: "Purple",
          gearMaxAngle: -50,
          gearPower: -9,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 4,
        },
        {
          name: "Platform",
          type: "static",
          x: 76.1,
          y: 322.2,
          density: 1,
          width: 234.1,
          angle: 90,
        },
        {
          name: "Pivot",
          x: 9,
          y: 260.05,
          type: "gear",
          color: "Green",
          gearMaxAngle: -90,
          gearPower: -6,
          lowerAngle: 180,
          upperAngle: 0,
          signalID: 3,
        },
        { name: "Star", x: 38.5, y: 225.45 },
        { name: "Star", x: 610.15, y: 289.15 },
        { name: "Star", x: 376.3, y: 448.15 },
        {
          name: "Platform",
          type: "dynamic",
          x: 569.95,
          y: 252.05,
          density: 1,
          width: 156.4,
          angle: 0,
        },
        {
          name: "Pivot",
          x: 569.95,
          y: 252.05,
          type: "gear",
          color: "Blue",
          gearMaxAngle: -48,
          gearPower: -6,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 6,
        },
        {
          name: "Platform",
          type: "static",
          x: 483.3,
          y: 195.4,
          density: 1,
          width: 18.7,
          angle: 0,
        },
      ],
    },
    {
      items: [
        {
          name: "Platform",
          type: "static",
          x: 652.85,
          y: 213.4,
          density: 1,
          width: 29.2,
          angle: -15,
        },
        { name: "Basket", x: 204.05, y: 74.8 },
        {
          name: "Cannon",
          x: 340.9,
          y: 313.05,
          lowerAngle: -70,
          upperAngle: 60,
        },
        { name: "Box", x: 129.65, y: 214.85, angle: 0, density: 1.3 },
        {
          name: "Platform",
          type: "static",
          x: 509.2,
          y: 321.7,
          density: 1,
          width: 117.4,
          angle: -50,
        },
        {
          name: "Platform",
          type: "static",
          x: 379.85,
          y: 60.45,
          density: 1,
          width: 314.4,
          angle: -2,
        },
        {
          name: "Platform",
          type: "static",
          x: 129.45,
          y: 247.5,
          density: 1,
          width: 20,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 327.5,
          y: 161.25,
          density: 1,
          width: 419.7,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 265.25,
          y: 9.05,
          density: 1,
          width: 294.1,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 528.4,
          y: 137.5,
          density: 1,
          width: 183.7,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 502.15,
          y: 387.85,
          density: 1,
          width: 75,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 371.8,
          y: 135.15,
          density: 1,
          width: 70,
          angle: -90,
        },
        {
          name: "Switcher",
          x: 502.3,
          y: 379.8,
          angle: 0,
          type: "button",
          color: "Blue",
          signalID: 5,
        },
        {
          name: "Platform",
          type: "static",
          x: 587.8,
          y: 226.65,
          density: 1,
          width: 77.8,
          angle: -52,
        },
        {
          name: "Platform",
          type: "static",
          x: 409.65,
          y: 109,
          density: 1,
          width: 93.8,
          angle: 0,
        },
        {
          name: "Spring",
          x: 650.35,
          y: 209,
          angle: 0,
          type: "dynamic",
          elasticity: 2.5,
        },
        {
          name: "Platform",
          type: "static",
          x: 703.45,
          y: 112.1,
          density: 1,
          width: 71.7,
          angle: 81,
        },
        {
          name: "Platform",
          type: "static",
          x: 170.05,
          y: 47.85,
          density: 1,
          width: 82.6,
          angle: 90,
        },
        {
          name: "Mill",
          x: 617.4,
          y: 334.85,
          enableMotor: !0,
          motorSpeed: 5,
          signalID: 4,
        },
        {
          name: "Platform",
          type: "static",
          x: 418.95,
          y: 424,
          density: 1,
          width: 56.9,
          angle: -50,
        },
        {
          name: "Switcher",
          x: 84.45,
          y: 396.7,
          angle: -44,
          type: "button",
          color: "Red",
          signalID: 4,
        },
        {
          name: "Platform",
          type: "static",
          x: 132.25,
          y: 398.35,
          density: 1,
          width: 70.6,
          angle: 47,
        },
        {
          name: "Platform",
          type: "static",
          x: 530.65,
          y: 376.55,
          density: 1,
          width: 40,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 473.75,
          y: 378.65,
          density: 1,
          width: 36.1,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 91.4,
          y: 401,
          density: 1,
          width: 81.2,
          angle: -44,
        },
        {
          name: "Platform",
          type: "static",
          x: 111.2,
          y: 426.3,
          density: 1,
          width: 103.6,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 12.35,
          y: 439.95,
          density: 1,
          width: 104.5,
          angle: -15,
        },
        { name: "Star", x: 37.1, y: 212.8 },
        { name: "Star", x: 12.35, y: 413.4 },
        { name: "Star", x: 458.1, y: 444.75 },
        {
          name: "Platform",
          type: "static",
          x: 89.6,
          y: 172.55,
          density: 1,
          width: 69,
          angle: -20,
        },
        {
          name: "Platform",
          type: "static",
          x: 30.25,
          y: 183.85,
          density: 1,
          width: 60.8,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 9,
          y: 283.2,
          density: 1,
          width: 216.8,
          angle: 90,
        },
        {
          name: "Spring",
          x: 375.4,
          y: 421,
          angle: 40,
          type: "static",
          elasticity: 4,
        },
        {
          name: "Platform",
          type: "static",
          x: 367.3,
          y: 427.95,
          density: 1,
          width: 56.9,
          angle: 40,
        },
        {
          name: "Pivot",
          x: 650.5,
          y: 205.95,
          type: "gear",
          color: "Blue",
          gearMaxAngle: -15,
          gearPower: -5,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 5,
        },
      ],
    },
    {
      items: [
        {
          name: "Platform",
          type: "static",
          x: 584.5,
          y: 166.1,
          density: 1,
          width: 133.2,
          angle: 0,
        },
        {
          name: "Platform",
          type: "dynamic",
          x: 473.6,
          y: 166.45,
          density: 1,
          width: 120,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 643,
          y: 310.7,
          density: 1,
          width: 300.8,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 38.35,
          y: 21.75,
          density: 1,
          width: 74.3,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 10.15,
          y: 125.65,
          density: 1,
          width: 226.3,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 243.15,
          y: 290.15,
          density: 1,
          width: 165.5,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 106.35,
          y: 223.65,
          density: 1,
          width: 103.7,
          angle: 26,
        },
        {
          name: "Platform",
          type: "static",
          x: 517.9,
          y: 401.4,
          density: 1,
          width: 120.3,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 560.4,
          y: 337.5,
          density: 1,
          width: 43.8,
          angle: -90,
        },
        {
          name: "Platform",
          type: "static",
          x: 600.4,
          y: 337.5,
          density: 1,
          width: 43.8,
          angle: -90,
        },
        {
          name: "Platform",
          type: "static",
          x: 620.5,
          y: 310.2,
          density: 1,
          width: 56.8,
          angle: -30,
        },
        { name: "Basket", x: 676.1, y: 411.15 },
        { name: "Cannon", x: 431.6, y: 349.8, lowerAngle: -46, upperAngle: 35 },
        {
          name: "Switcher",
          x: 549.8,
          y: 443.1,
          angle: 0,
          type: "button",
          color: "Green",
          signalID: 2,
        },
        {
          name: "Switcher",
          x: 612.45,
          y: 443.35,
          angle: 0,
          type: "button",
          color: "Red",
          signalID: 1,
        },
        {
          name: "Pivot",
          x: 526.1,
          y: 166.85,
          type: "gear",
          color: "Red",
          gearMaxAngle: 65,
          gearPower: 10,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 1,
        },
        {
          name: "Platform",
          type: "static",
          x: 710.1,
          y: 295.4,
          density: 1,
          width: 271.4,
          angle: 90,
        },
        {
          name: "Platform",
          type: "dynamic",
          x: 37.35,
          y: 230.45,
          density: 1,
          width: 72.5,
          angle: 0,
        },
        {
          name: "Pivot",
          x: 10.75,
          y: 230.45,
          type: "gear",
          color: "Purple",
          gearMaxAngle: 45,
          gearPower: 6,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 3,
        },
        {
          name: "Platform",
          type: "static",
          x: 86.15,
          y: 310.35,
          density: 1,
          width: 88.4,
          angle: 45,
        },
        {
          name: "Platform",
          type: "static",
          x: 203.9,
          y: 343.1,
          density: 1,
          width: 189.8,
          angle: 4,
        },
        {
          name: "Platform",
          type: "static",
          x: 65.2,
          y: 154.8,
          density: 1,
          width: 108.1,
          angle: 90,
        },
        {
          name: "Platform",
          type: "dynamic",
          x: 95.65,
          y: 38.9,
          density: 1,
          width: 84.7,
          angle: 30,
        },
        {
          name: "Pivot",
          x: 65.95,
          y: 21.75,
          type: "gear",
          color: "Purple",
          gearMaxAngle: 90,
          gearPower: 6,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 3,
        },
        {
          name: "Switcher",
          x: 677.55,
          y: 258.35,
          angle: 0,
          type: "button",
          color: "Purple",
          signalID: 3,
        },
        {
          name: "Platform",
          type: "static",
          x: 580.4,
          y: 437.05,
          density: 1,
          width: 47.9,
          angle: 90,
        },
        { name: "Rock", x: 478.85, y: 133.2, density: 0.1 },
        {
          name: "Platform",
          type: "static",
          x: 356.8,
          y: 386.75,
          density: 1,
          width: 125.5,
          angle: 90,
        },
        {
          name: "Spring",
          x: 202.5,
          y: 279.2,
          angle: -20,
          type: "static",
          elasticity: 2.5,
        },
        {
          name: "Platform",
          type: "static",
          x: 580.2,
          y: 452.45,
          density: 1,
          width: 142.6,
          angle: 0,
        },
        {
          name: "Spring",
          x: 73.9,
          y: 163.4,
          angle: 105,
          type: "static",
          elasticity: 1,
        },
        {
          name: "Swings",
          x: 580.4,
          y: 398.75,
          angle: 20,
          lowerAngle: -20,
          upperAngle: 20,
        },
        {
          name: "Platform",
          type: "static",
          x: 544.9,
          y: 313.45,
          density: 1,
          width: 43.8,
          angle: 30,
        },
        {
          name: "Platform",
          type: "static",
          x: 621.65,
          y: 350.45,
          density: 1,
          width: 60.5,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 538.95,
          y: 350.45,
          density: 1,
          width: 60,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 676.65,
          y: 266.4,
          density: 1,
          width: 85.1,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 233.5,
          y: 255.25,
          density: 1,
          width: 85.8,
          angle: 70,
        },
        {
          name: "Platform",
          type: "static",
          x: 158.3,
          y: 268.4,
          density: 1,
          width: 57.8,
          angle: 70,
        },
        {
          name: "Platform",
          type: "static",
          x: 339.2,
          y: 309.85,
          density: 1,
          width: 60.6,
          angle: 45,
        },
        {
          name: "Platform",
          type: "static",
          x: 289.8,
          y: 397.3,
          density: 1,
          width: 114.7,
          angle: 90,
        },
        { name: "Star", x: 679.35, y: 353.15 },
        { name: "Star", x: 393.1, y: 166 },
        { name: "Star", x: 269, y: 260.85 },
        {
          name: "Platform",
          type: "static",
          x: 349.95,
          y: -29,
          density: 1,
          width: 263.7,
          angle: 0,
        },
        {
          name: "Teleport",
          x: 323.1,
          y: 415.85,
          angle: 0,
          color: "Red",
          id: 0,
          mulVel: 1,
        },
        {
          name: "Teleport",
          x: 676.85,
          y: 310.6,
          angle: 180,
          color: "Red",
          id: 0,
          mulVel: 1,
        },
        {
          name: "Platform",
          type: "static",
          x: 263.75,
          y: 114.2,
          density: 1,
          width: 245.8,
          angle: 23,
        },
        {
          name: "Platform",
          type: "dynamic",
          x: 687.6,
          y: 166.45,
          density: 1,
          width: 60,
          angle: 0,
        },
        {
          name: "Pivot",
          x: 710.1,
          y: 166.85,
          type: "gear",
          color: "Green",
          gearMaxAngle: 90,
          gearPower: 10,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 2,
        },
        {
          name: "Platform",
          type: "static",
          x: 159.1,
          y: 104.9,
          density: 1,
          width: 82.9,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 265.5,
          y: 149.9,
          density: 1,
          width: 222.8,
          angle: 8,
        },
      ],
    },
    {
      items: [
        {
          name: "Platform",
          type: "static",
          x: 620.35,
          y: 225.1,
          density: 2,
          width: 18,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 322,
          y: 273.4,
          density: 1,
          width: 18,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 492.5,
          y: 411.1,
          density: 1,
          width: 70.7,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 489.85,
          y: 371.1,
          density: 1,
          width: 65.7,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 622.8,
          y: 411.1,
          density: 1,
          width: 74.6,
          angle: 0,
        },
        { name: "Basket", x: 49.45, y: 392.45 },
        {
          name: "Cannon",
          x: 318.35,
          y: 392.25,
          lowerAngle: -70,
          upperAngle: 70,
        },
        {
          name: "Platform",
          type: "static",
          x: 710,
          y: 226.5,
          density: 1,
          width: 268.9,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 656.5,
          y: 356.4,
          density: 1,
          width: 49.2,
          angle: -45,
        },
        {
          name: "Platform",
          type: "static",
          x: 614.4,
          y: 317,
          density: 1,
          width: 58.2,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 608.25,
          y: 260.6,
          density: 1,
          width: 46,
          angle: 0,
        },
        {
          name: "Switcher",
          x: 623.55,
          y: 310.05,
          angle: 0,
          type: "button",
          color: "Yellow",
          signalID: 2,
        },
        { name: "Box", x: 494, y: 287.3, angle: 0, density: 0.85 },
        {
          name: "Switcher",
          x: 160,
          y: 334.55,
          angle: 90,
          type: "toogle",
          color: "Green",
          signalID: 1,
        },
        {
          name: "Platform",
          type: "dynamic",
          x: 236.6,
          y: 273.6,
          density: 1,
          width: 187,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 88.35,
          y: 300.5,
          density: 1,
          width: 229.2,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 11.3,
          y: 253.75,
          density: 1,
          width: 323.3,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 152,
          y: 349.75,
          density: 1,
          width: 131.2,
          angle: 90,
        },
        {
          name: "Switcher",
          x: 120.55,
          y: 398.45,
          angle: 0,
          type: "button",
          color: "Blue",
          signalID: 5,
        },
        {
          name: "Spring",
          x: 620.9,
          y: 224.6,
          angle: 25,
          type: "dynamic",
          elasticity: 3.2,
        },
        {
          name: "Platform",
          type: "static",
          x: 644,
          y: 163.9,
          density: 1,
          width: 65.8,
          angle: 25,
        },
        {
          name: "Platform",
          type: "static",
          x: 120.1,
          y: 406.45,
          density: 1,
          width: 81.8,
          angle: 0,
        },
        {
          name: "Pivot",
          x: 621.1,
          y: 225.85,
          type: "gear",
          color: "Yellow",
          gearMaxAngle: -45,
          gearPower: -6,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 2,
        },
        {
          name: "Platform",
          type: "static",
          x: 648,
          y: 240.55,
          density: 1,
          width: 64.8,
          angle: -45,
        },
        {
          name: "Platform",
          type: "static",
          x: 492.05,
          y: 319.05,
          density: 2,
          width: 20,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 594.3,
          y: 288.85,
          density: 1,
          width: 74.3,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 652.9,
          y: 304.2,
          density: 1,
          width: 44.4,
          angle: 135,
        },
        {
          name: "Platform",
          type: "dynamic",
          x: 594.45,
          y: 439.3,
          density: 1,
          width: 74.5,
          angle: -90,
        },
        {
          name: "Pivot",
          x: 594.45,
          y: 411.1,
          type: "gear",
          color: "Blue",
          gearMaxAngle: 0,
          gearPower: 6,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 5,
        },
        {
          name: "Platform",
          type: "static",
          x: 671.25,
          y: 314.35,
          density: 1,
          width: 64,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 668.35,
          y: 196.6,
          density: 1,
          width: 54.4,
          angle: -90,
        },
        {
          name: "Platform",
          type: "static",
          x: 432.8,
          y: 418.05,
          density: 1,
          width: 55.3,
          angle: -15,
        },
        {
          name: "Platform",
          type: "static",
          x: 615.55,
          y: 371.1,
          density: 1,
          width: 60,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 683.1,
          y: 384.25,
          density: 1,
          width: 83.9,
          angle: -45,
        },
        {
          name: "Platform",
          type: "static",
          x: 109.6,
          y: 187.1,
          density: 1,
          width: 57.8,
          angle: -15,
        },
        {
          name: "Platform",
          type: "static",
          x: 413.55,
          y: 383.1,
          density: 1,
          width: 95.2,
          angle: -15,
        },
        {
          name: "Pivot",
          x: 322,
          y: 273.4,
          type: "gear",
          color: "Green",
          gearMaxAngle: 25,
          gearPower: 12,
          lowerAngle: 180,
          upperAngle: 0,
          signalID: 1,
        },
        {
          name: "Platform",
          type: "static",
          x: 28.9,
          y: 358.2,
          density: 1,
          width: 41.5,
          angle: 45,
        },
        {
          name: "Platform",
          type: "static",
          x: 71.15,
          y: 315.7,
          density: 1,
          width: 41.5,
          angle: -45,
        },
        {
          name: "Platform",
          type: "static",
          x: 28.9,
          y: 273.2,
          density: 1,
          width: 41.5,
          angle: 45,
        },
        {
          name: "Platform",
          type: "static",
          x: 71.15,
          y: 230.7,
          density: 1,
          width: 41.5,
          angle: -45,
        },
        { name: "Star", x: 606.35, y: 339.65 },
        { name: "Star", x: 387.35, y: 417.7 },
        { name: "Star", x: 112.9, y: 215.15 },
      ],
    },
    {
      items: [
        {
          name: "Platform",
          type: "static",
          x: 10.4,
          y: 307.25,
          density: 1,
          width: 269.1,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 156.35,
          y: 371.6,
          density: 1,
          width: 112,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 623.2,
          y: 419.75,
          density: 1,
          width: 18,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 600,
          y: 37.3,
          density: 1,
          width: 18,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 510,
          y: 38.5,
          density: 1,
          width: 18,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 202.9,
          y: 172.75,
          density: 1,
          width: 406,
          angle: 0,
        },
        { name: "Rock", x: 555, y: 35.5, density: 1 },
        {
          name: "Cannon",
          x: 465.45,
          y: 196.4,
          lowerAngle: -52,
          upperAngle: 70,
        },
        { name: "Basket", x: 85.4, y: 78.2 },
        {
          name: "Teleport",
          x: 45.35,
          y: 400.25,
          angle: 0,
          color: "Blue",
          id: 0,
          mulVel: 1.4,
        },
        {
          name: "Switcher",
          x: 335.9,
          y: 21.55,
          angle: 180,
          type: "toogle",
          color: "Purple",
          signalID: 1,
        },
        {
          name: "Teleport",
          x: 38.1,
          y: 57.3,
          angle: 90,
          color: "Blue",
          id: 0,
          mulVel: 1.4,
        },
        {
          name: "Platform",
          type: "dynamic",
          x: 164.4,
          y: 107.95,
          density: 0.5,
          width: 151.3,
          angle: 109,
        },
        {
          name: "Pivot",
          x: 141.8,
          y: 172.75,
          type: "bolt",
          color: "Red",
          gearMaxAngle: 0,
          gearPower: 1,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 298.65,
          y: 440.8,
          density: 1,
          width: 282.3,
          angle: 0,
        },
        {
          name: "Switcher",
          x: 117.45,
          y: 421.6,
          angle: 90,
          type: "toogle",
          color: "Green",
          signalID: 3,
        },
        {
          name: "Platform",
          type: "static",
          x: 109.4,
          y: 402.15,
          density: 1,
          width: 79.1,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 691.5,
          y: 88.15,
          density: 1,
          width: 51.9,
          angle: 47,
        },
        {
          name: "Spring",
          x: 696.6,
          y: 95.1,
          angle: -132,
          type: "static",
          elasticity: 3,
        },
        {
          name: "Platform",
          type: "static",
          x: 413.55,
          y: 196.7,
          density: 1,
          width: 61.7,
          angle: 60,
        },
        {
          name: "Platform",
          type: "static",
          x: 237.35,
          y: 13.6,
          density: 1,
          width: 475.1,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 495,
          y: 218.15,
          density: 1,
          width: 33.7,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 436.6,
          y: 218.95,
          density: 1,
          width: 31.4,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 652.95,
          y: 75.8,
          density: 1,
          width: 58.2,
          angle: -43,
        },
        {
          name: "Platform",
          type: "static",
          x: 265.5,
          y: 29.5,
          density: 1,
          width: 49.9,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 202.35,
          y: 141.15,
          density: 1,
          width: 81.4,
          angle: 90,
        },
        {
          name: "Platform",
          type: "dynamic",
          x: 585,
          y: 53.5,
          density: 1,
          width: 60,
          angle: -45,
        },
        {
          name: "Platform",
          type: "dynamic",
          x: 525,
          y: 53.5,
          density: 1,
          width: 60,
          angle: 45,
        },
        {
          name: "Pivot",
          x: 510,
          y: 38.5,
          type: "gear",
          color: "Green",
          gearMaxAngle: 90,
          gearPower: 6,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 3,
        },
        {
          name: "Pivot",
          x: 600,
          y: 38.5,
          type: "gear",
          color: "Green",
          gearMaxAngle: -90,
          gearPower: -6,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 3,
        },
        {
          name: "Platform",
          type: "dynamic",
          x: 621.7,
          y: 419.4,
          density: 1,
          width: 160.9,
          angle: 0,
        },
        {
          name: "Pivot",
          x: 623.2,
          y: 419.75,
          type: "bolt",
          color: "Red",
          gearMaxAngle: 0,
          gearPower: 1,
          lowerAngle: -360,
          upperAngle: 0,
          signalID: 0,
        },
        { name: "Ball", x: 661.45, y: 400.45 },
        {
          name: "Platform",
          type: "static",
          x: 707.65,
          y: 330.5,
          density: 1,
          width: 235.9,
          angle: 86,
        },
        { name: "Star", x: 229.7, y: 44.85 },
        { name: "Star", x: 693.8, y: 44.85 },
        { name: "Star", x: 464.65, y: 251.55 },
        {
          name: "Platform",
          type: "static",
          x: 651.1,
          y: 458.7,
          density: 1,
          width: 59.2,
          angle: 90,
        },
        {
          name: "Platform",
          type: "dynamic",
          x: 205.4,
          y: 304.9,
          density: 1,
          width: 146.1,
          angle: -90,
        },
        {
          name: "Pivot",
          x: 204.4,
          y: 369.7,
          type: "gear",
          color: "Purple",
          gearMaxAngle: 0,
          gearPower: 6,
          lowerAngle: 180,
          upperAngle: 0,
          signalID: 1,
        },
        {
          name: "Platform",
          type: "static",
          x: 92.25,
          y: 378.5,
          density: 1,
          width: 46,
          angle: -15,
        },
      ],
    },
    {
      items: [
        {
          name: "Platform",
          type: "static",
          x: 325,
          y: 237.5,
          density: 1,
          width: 18,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 110.4,
          y: 258.95,
          density: 1,
          width: 255.7,
          angle: -5,
        },
        {
          name: "Platform",
          type: "static",
          x: 149.6,
          y: 443.75,
          density: 1,
          width: 178.3,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 257,
          y: 274.3,
          density: 1,
          width: 82.5,
          angle: 135,
        },
        {
          name: "Platform",
          type: "static",
          x: 146.35,
          y: 161.3,
          density: 1,
          width: 91.3,
          angle: 8,
        },
        {
          name: "Platform",
          type: "static",
          x: 230,
          y: 358.15,
          density: 1,
          width: 189.2,
          angle: -90,
        },
        {
          name: "Platform",
          type: "static",
          x: 693.6,
          y: 358.25,
          density: 1,
          width: 76.6,
          angle: -100,
        },
        {
          name: "Platform",
          type: "dynamic",
          x: 659.65,
          y: 334.8,
          density: 1,
          width: 76.6,
          angle: -10,
        },
        {
          name: "Platform",
          type: "static",
          x: 669.85,
          y: 392.7,
          density: 1,
          width: 76.6,
          angle: -10,
        },
        {
          name: "Platform",
          type: "static",
          x: 359.85,
          y: 26.95,
          density: 1,
          width: 704.3,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 29.25,
          y: 128.45,
          density: 1,
          width: 43.8,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 499.45,
          y: 183.75,
          density: 1,
          width: 96.9,
          angle: 0,
        },
        { name: "Basket", x: 504, y: 406 },
        { name: "Cannon", x: 400, y: 413.65, lowerAngle: -70, upperAngle: 0 },
        {
          name: "Spring",
          x: 325,
          y: 237.5,
          angle: 0,
          type: "dynamic",
          elasticity: 2.5,
        },
        {
          name: "Teleport",
          x: 300.75,
          y: 292.95,
          angle: 135,
          color: "Blue",
          id: 1,
          mulVel: 1,
        },
        {
          name: "Teleport",
          x: 60,
          y: 207.25,
          angle: 90,
          color: "Blue",
          id: 1,
          mulVel: 1.2,
        },
        {
          name: "Switcher",
          x: 78.5,
          y: 134.8,
          angle: 25,
          type: "button",
          color: "Purple",
          signalID: 1,
        },
        {
          name: "Platform",
          type: "static",
          x: 74.85,
          y: 140.95,
          density: 1,
          width: 65.3,
          angle: 25,
        },
        {
          name: "Pivot",
          x: 325,
          y: 237.5,
          type: "gear",
          color: "Purple",
          gearMaxAngle: 45,
          gearPower: 6,
          lowerAngle: -90,
          upperAngle: 0,
          signalID: 1,
        },
        {
          name: "Platform",
          type: "static",
          x: 460,
          y: 337.2,
          density: 1,
          width: 325.6,
          angle: 90,
        },
        {
          name: "Spring",
          x: 661,
          y: 387.5,
          angle: -20,
          type: "static",
          elasticity: 2.2,
        },
        {
          name: "Switcher",
          x: 400,
          y: 35,
          angle: 180,
          type: "toogle",
          color: "Red",
          signalID: 3,
        },
        {
          name: "Platform",
          type: "static",
          x: 673.25,
          y: 156.55,
          density: 1,
          width: 95.6,
          angle: -45,
        },
        {
          name: "Platform",
          type: "static",
          x: 16.35,
          y: 123.95,
          density: 1,
          width: 209.7,
          angle: -90,
        },
        {
          name: "Platform",
          type: "static",
          x: 703.35,
          y: 73.25,
          density: 1,
          width: 108.3,
          angle: -90,
        },
        {
          name: "Platform",
          type: "static",
          x: 128.25,
          y: 392.9,
          density: 1,
          width: 119.7,
          angle: -90,
        },
        {
          name: "Platform",
          type: "dynamic",
          x: 250.75,
          y: 167.5,
          density: 0.1,
          width: 138.5,
          angle: 0,
        },
        {
          name: "Pivot",
          x: 189.5,
          y: 167.5,
          type: "bolt",
          color: "Red",
          gearMaxAngle: 0,
          gearPower: 1,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 0,
        },
        {
          name: "Platform",
          type: "dynamic",
          x: 230,
          y: 217,
          density: 2,
          width: 80,
          angle: -90,
        },
        {
          name: "Pivot",
          x: 230,
          y: 247,
          type: "bolt",
          color: "Red",
          gearMaxAngle: 0,
          gearPower: 1,
          lowerAngle: -720,
          upperAngle: 720,
          signalID: 0,
        },
        {
          name: "Platform",
          type: "dynamic",
          x: 169.6,
          y: 346.35,
          density: 0.4,
          width: 99,
          angle: 5,
        },
        { name: "Ball", x: 209.3, y: 322.8 },
        {
          name: "Pivot",
          x: 129.2,
          y: 342.75,
          type: "gear",
          color: "Red",
          gearMaxAngle: -15,
          gearPower: -10,
          lowerAngle: -720,
          upperAngle: 720,
          signalID: 3,
        },
        {
          name: "Switcher",
          x: 99.2,
          y: 435.75,
          angle: 0,
          type: "button",
          color: "Yellow",
          signalID: 2,
        },
        {
          name: "Pivot",
          x: 688.7,
          y: 329.5,
          type: "gear",
          color: "Yellow",
          gearMaxAngle: 80,
          gearPower: 6,
          lowerAngle: -90,
          upperAngle: 0,
          signalID: 2,
        },
        {
          name: "Platform",
          type: "static",
          x: 69.2,
          y: 363.7,
          density: 1,
          width: 178.2,
          angle: -90,
        },
        {
          name: "Platform",
          type: "static",
          x: 549,
          y: 416.2,
          density: 1,
          width: 167.5,
          angle: 90,
        },
        { name: "Star", x: 638.95, y: 149.35 },
        { name: "Star", x: 263.35, y: 444.7 },
        { name: "Star", x: 95.85, y: 323.65 },
        {
          name: "Platform",
          type: "static",
          x: 573.9,
          y: 196.55,
          density: 1,
          width: 78.4,
          angle: 25,
        },
      ],
    },
    {
      items: [
        {
          name: "Platform",
          type: "static",
          x: 510,
          y: 266,
          density: 1,
          width: 18,
          angle: 0,
        },
        {
          name: "Switcher",
          x: 512.5,
          y: 452.05,
          angle: 0,
          type: "button",
          color: "Green",
          signalID: 3,
        },
        {
          name: "Switcher",
          x: 99.95,
          y: 263.95,
          angle: 0,
          type: "button",
          color: "Purple",
          signalID: 4,
        },
        {
          name: "Platform",
          type: "static",
          x: 268.05,
          y: 46.1,
          density: 1,
          width: 43.5,
          angle: -120,
        },
        {
          name: "Platform",
          type: "static",
          x: 400,
          y: 211.7,
          density: 1,
          width: 73.6,
          angle: -90,
        },
        {
          name: "Platform",
          type: "static",
          x: 334,
          y: 257.35,
          density: 1,
          width: 165.3,
          angle: -90,
        },
        {
          name: "Platform",
          type: "static",
          x: 383.55,
          y: 184,
          density: 1,
          width: 109.3,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 577.65,
          y: 184,
          density: 1,
          width: 234.9,
          angle: 0,
        },
        { name: "Cannon", x: 230, y: 410, lowerAngle: -70, upperAngle: 70 },
        {
          name: "Platform",
          type: "dynamic",
          x: 510,
          y: 266,
          density: 0.05,
          width: 193.9,
          angle: 10,
        },
        { name: "Basket", x: 36.75, y: 375 },
        {
          name: "Switcher",
          x: 651.75,
          y: 452.05,
          angle: 0,
          type: "toogle",
          color: "Yellow",
          signalID: 2,
        },
        {
          name: "Platform",
          type: "static",
          x: 620,
          y: 373.75,
          density: 1,
          width: 187.6,
          angle: -90,
        },
        {
          name: "Platform",
          type: "static",
          x: 400,
          y: 310,
          density: 1,
          width: 60,
          angle: -90,
        },
        {
          name: "Platform",
          type: "static",
          x: 687,
          y: 257,
          density: 1,
          width: 164,
          angle: -90,
        },
        {
          name: "Platform",
          type: "static",
          x: 469.1,
          y: 163,
          density: 1,
          width: 60,
          angle: -90,
        },
        {
          name: "Platform",
          type: "static",
          x: 429.05,
          y: 163,
          density: 1,
          width: 60,
          angle: -90,
        },
        {
          name: "Platform",
          type: "static",
          x: 483.35,
          y: 111.6,
          density: 1,
          width: 60,
          angle: -60,
        },
        {
          name: "Platform",
          type: "static",
          x: 407.1,
          y: 125.8,
          density: 1,
          width: 60,
          angle: 30,
        },
        {
          name: "Platform",
          type: "dynamic",
          x: 400,
          y: 254.1,
          density: 1,
          width: 41.7,
          angle: -90,
        },
        {
          name: "Pivot",
          x: 400,
          y: 241.5,
          type: "gear",
          color: "Purple",
          gearMaxAngle: 0,
          gearPower: 6,
          lowerAngle: 180,
          upperAngle: 0,
          signalID: 4,
        },
        {
          name: "Platform",
          type: "static",
          x: 471.6,
          y: 449.5,
          density: 1,
          width: 37,
          angle: -90,
        },
        { name: "Box", x: 471.15, y: 409.1, angle: 0, density: 1.5 },
        { name: "Box", x: 471.15, y: 363.1, angle: 0, density: 1.5 },
        {
          name: "Platform",
          type: "static",
          x: 137.45,
          y: 271,
          density: 1,
          width: 151,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 70,
          y: 250.9,
          density: 1,
          width: 360.2,
          angle: -90,
        },
        {
          name: "Platform",
          type: "static",
          x: 101.45,
          y: 79.5,
          density: 1,
          width: 80,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 567,
          y: 459,
          density: 1,
          width: 209.8,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 130,
          y: 229.55,
          density: 1,
          width: 100,
          angle: -90,
        },
        {
          name: "Spring",
          x: 260,
          y: 50,
          angle: -120,
          type: "static",
          elasticity: 2,
        },
        {
          name: "Platform",
          type: "static",
          x: 148.55,
          y: 165.15,
          density: 1,
          width: 60,
          angle: -45,
        },
        {
          name: "Platform",
          type: "static",
          x: 620,
          y: 211.7,
          density: 1,
          width: 73.6,
          angle: -90,
        },
        {
          name: "Platform",
          type: "dynamic",
          x: 620,
          y: 253.9,
          density: 1,
          width: 41.7,
          angle: 90,
        },
        {
          name: "Pivot",
          x: 620,
          y: 241.5,
          type: "gear",
          color: "Green",
          gearMaxAngle: 1,
          gearPower: -6,
          lowerAngle: -720,
          upperAngle: 720,
          signalID: 3,
        },
        { name: "Star", x: 589.6, y: 362.1 },
        { name: "Star", x: 378.6, y: 155.6 },
        { name: "Star", x: 163.7, y: 243.15 },
        {
          name: "Teleport",
          x: 368,
          y: 303.8,
          angle: 0,
          color: "Red",
          id: 1,
          mulVel: 1,
        },
        {
          name: "Teleport",
          x: 654,
          y: 303.8,
          angle: 0,
          color: "Blue",
          id: 2,
          mulVel: 1,
        },
        {
          name: "Pivot",
          x: 510,
          y: 266,
          type: "gear",
          color: "Yellow",
          gearMaxAngle: -10,
          gearPower: -10,
          lowerAngle: 180,
          upperAngle: 0,
          signalID: 2,
        },
        {
          name: "Teleport",
          x: 36.75,
          y: 104.65,
          angle: 180,
          color: "Red",
          id: 1,
          mulVel: 1,
        },
        {
          name: "Teleport",
          x: 654.75,
          y: 376.2,
          angle: 180,
          color: "Blue",
          id: 2,
          mulVel: 1,
        },
        {
          name: "Platform",
          type: "static",
          x: 2.05,
          y: 250.9,
          density: 1,
          width: 360.2,
          angle: -90,
        },
      ],
    },
    {
      items: [
        {
          name: "Platform",
          type: "static",
          x: 561.05,
          y: 436.4,
          density: 1,
          width: 18,
          angle: 0,
        },
        {
          name: "Switcher",
          x: 463.75,
          y: 257.75,
          angle: -135,
          type: "toogle",
          color: "Green",
          signalID: 5,
        },
        {
          name: "Platform",
          type: "static",
          x: 419,
          y: 231.3,
          density: 1,
          width: 262.8,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 466.5,
          y: 249.7,
          density: 1,
          width: 52,
          angle: 45,
        },
        {
          name: "Platform",
          type: "static",
          x: 398.65,
          y: 249.7,
          density: 1,
          width: 39.5,
          angle: -45,
        },
        {
          name: "Platform",
          type: "dynamic",
          x: 411.65,
          y: 278.9,
          density: 1,
          width: 77.4,
          angle: 45,
        },
        {
          name: "Platform",
          type: "static",
          x: 18.65,
          y: 61.05,
          density: 1,
          width: 42.8,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 62.7,
          y: 291.75,
          density: 1,
          width: 144.6,
          angle: -14,
        },
        {
          name: "Platform",
          type: "dynamic",
          x: 31,
          y: 122.05,
          density: 1,
          width: 140,
          angle: 90,
        },
        { name: "Basket", x: 621, y: 356.95 },
        { name: "Cannon", x: 249.5, y: 391, lowerAngle: -70, upperAngle: 70 },
        {
          name: "Teleport",
          x: 100,
          y: 210,
          angle: 0,
          color: "Red",
          id: 1,
          mulVel: 1.3,
        },
        {
          name: "Pivot",
          x: 30.95,
          y: 60.6,
          type: "gear",
          color: "Purple",
          gearMaxAngle: 45,
          gearPower: -10,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 1,
        },
        {
          name: "Switcher",
          x: 151.15,
          y: 267.8,
          angle: 135,
          type: "toogle",
          color: "Purple",
          signalID: 1,
        },
        {
          name: "Platform",
          type: "static",
          x: 457.55,
          y: 77.65,
          density: 1,
          width: 376.1,
          angle: 0,
        },
        {
          name: "Spring",
          x: 159.9,
          y: 103.9,
          angle: 45,
          type: "static",
          elasticity: 1.4,
        },
        {
          name: "Teleport",
          x: 538.85,
          y: 340.85,
          angle: -90,
          color: "Red",
          id: 1,
          mulVel: 1,
        },
        {
          name: "Platform",
          type: "static",
          x: 552.5,
          y: 373.4,
          density: 1,
          width: 80.8,
          angle: 0,
        },
        {
          name: "Switcher",
          x: 576.9,
          y: 202.15,
          angle: -90,
          type: "toogle",
          color: "Blue",
          signalID: 7,
        },
        {
          name: "Platform",
          type: "dynamic",
          x: 296.55,
          y: 189.95,
          density: 1,
          width: 100.8,
          angle: 90,
        },
        {
          name: "Pivot",
          x: 296.55,
          y: 231.3,
          type: "gear",
          color: "Yellow",
          gearMaxAngle: 0,
          gearPower: -6,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 6,
        },
        {
          name: "Spring",
          x: 561.05,
          y: 436.4,
          angle: 180,
          type: "dynamic",
          elasticity: 2,
        },
        {
          name: "Switcher",
          x: 213.2,
          y: 436.4,
          angle: 90,
          type: "toogle",
          color: "Red",
          signalID: 4,
        },
        {
          name: "Pivot",
          x: 390.55,
          y: 257.8,
          type: "gear",
          color: "Red",
          gearMaxAngle: 180,
          gearPower: 6,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 4,
        },
        {
          name: "Platform",
          type: "static",
          x: 162.55,
          y: 245.8,
          density: 1,
          width: 91.6,
          angle: -45,
        },
        {
          name: "Platform",
          type: "static",
          x: 159.8,
          y: 190.9,
          density: 1,
          width: 99.5,
          angle: 45,
        },
        {
          name: "Platform",
          type: "static",
          x: 709.7,
          y: 240.15,
          density: 1,
          width: 342.5,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 583.85,
          y: 272.85,
          density: 1,
          width: 268,
          angle: 90,
        },
        {
          name: "Pivot",
          x: 561.05,
          y: 436.4,
          type: "gear",
          color: "Blue",
          gearMaxAngle: 270,
          gearPower: 6,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 7,
        },
        {
          name: "Platform",
          type: "static",
          x: 6.5,
          y: 122.05,
          density: 1,
          width: 140,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 299.2,
          y: 464.85,
          density: 1,
          width: 206.2,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 205.05,
          y: 435.85,
          density: 1,
          width: 76.1,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 299.15,
          y: 406.6,
          density: 1,
          width: 206.2,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 636.55,
          y: 112.8,
          density: 1,
          width: 87.9,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 610.15,
          y: 147.8,
          density: 1,
          width: 70.5,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 296.55,
          y: 103.7,
          density: 1,
          width: 69,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 679.55,
          y: 162.75,
          density: 1,
          width: 77,
          angle: -45,
        },
        {
          name: "Platform",
          type: "static",
          x: 679.55,
          y: 244.75,
          density: 1,
          width: 77,
          angle: -45,
        },
        {
          name: "Platform",
          type: "static",
          x: 613.15,
          y: 203.75,
          density: 1,
          width: 77,
          angle: 45,
        },
        {
          name: "Platform",
          type: "static",
          x: 679.55,
          y: 326.75,
          density: 1,
          width: 77,
          angle: -45,
        },
        {
          name: "Platform",
          type: "static",
          x: 613.15,
          y: 285.75,
          density: 1,
          width: 77,
          angle: 45,
        },
        {
          name: "Platform",
          type: "static",
          x: 684.05,
          y: 402.35,
          density: 1,
          width: 71.9,
          angle: 0,
        },
        { name: "Star", x: 365.55, y: 254.7 },
        { name: "Star", x: 35.35, y: 431.75 },
        { name: "Star", x: 553.2, y: 296.45 },
        {
          name: "Platform",
          type: "dynamic",
          x: 682.8,
          y: 77.8,
          density: 1,
          width: 70.5,
          angle: 0,
        },
        {
          name: "Pivot",
          x: 708.9,
          y: 77.4,
          type: "gear",
          color: "Green",
          gearMaxAngle: 90,
          gearPower: 6,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 5,
        },
        {
          name: "Switcher",
          x: 101.8,
          y: 290.1,
          angle: 166,
          type: "toogle",
          color: "Yellow",
          signalID: 6,
        },
      ],
    },
    {
      items: [
        {
          name: "Platform",
          type: "static",
          x: 705,
          y: 366.3,
          density: 1,
          width: 87.1,
          angle: -90,
        },
        {
          name: "Platform",
          type: "static",
          x: 30,
          y: 410,
          density: 1,
          width: 18,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 200,
          y: 306,
          density: 1,
          width: 18,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 199,
          y: 171,
          density: 1,
          width: 18,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 30,
          y: 157,
          density: 1,
          width: 18,
          angle: 0,
        },
        {
          name: "Switcher",
          x: 453.35,
          y: 408.45,
          angle: 30,
          type: "toogle",
          color: "Yellow",
          signalID: 3,
        },
        {
          name: "Switcher",
          x: 313.85,
          y: 192.2,
          angle: 135,
          type: "toogle",
          color: "Blue",
          signalID: 1,
        },
        {
          name: "Switcher",
          x: 184.65,
          y: 63.45,
          angle: 10,
          type: "button",
          color: "Purple",
          signalID: 2,
        },
        {
          name: "Platform",
          type: "static",
          x: 610,
          y: 25,
          density: 1,
          width: 50,
          angle: -90,
        },
        {
          name: "Platform",
          type: "static",
          x: 573.05,
          y: 216.45,
          density: 1,
          width: 84,
          angle: -24,
        },
        {
          name: "Platform",
          type: "static",
          x: 466.85,
          y: 216.45,
          density: 1,
          width: 84.1,
          angle: 24,
        },
        {
          name: "Platform",
          type: "static",
          x: 452.1,
          y: 417.5,
          density: 1,
          width: 61.5,
          angle: 30,
        },
        {
          name: "Platform",
          type: "static",
          x: 307.15,
          y: 187.25,
          density: 1,
          width: 47.8,
          angle: -45,
        },
        {
          name: "Platform",
          type: "static",
          x: 273.75,
          y: 150,
          density: 1,
          width: 47.8,
          angle: -30,
        },
        {
          name: "Platform",
          type: "static",
          x: 273.75,
          y: 250,
          density: 1,
          width: 47.8,
          angle: -30,
        },
        {
          name: "Platform",
          type: "static",
          x: 273.75,
          y: 350,
          density: 1,
          width: 47.8,
          angle: -30,
        },
        {
          name: "Platform",
          type: "static",
          x: 237.25,
          y: 200,
          density: 1,
          width: 47.8,
          angle: 30,
        },
        {
          name: "Platform",
          type: "static",
          x: 237.75,
          y: 300,
          density: 1,
          width: 47.8,
          angle: 30,
        },
        { name: "Basket", x: 660, y: 350 },
        { name: "Cannon", x: 365, y: 350, lowerAngle: -40, upperAngle: 40 },
        {
          name: "Platform",
          type: "static",
          x: 430,
          y: 266.4,
          density: 1,
          width: 287.1,
          angle: -90,
        },
        {
          name: "Platform",
          type: "static",
          x: 220,
          y: 175,
          density: 1,
          width: 350,
          angle: -90,
        },
        {
          name: "Platform",
          type: "static",
          x: 360,
          y: 25,
          density: 1,
          width: 50,
          angle: -90,
        },
        {
          name: "Platform",
          type: "dynamic",
          x: 392.7,
          y: 78.75,
          density: 1,
          width: 100,
          angle: 45,
        },
        {
          name: "Platform",
          type: "static",
          x: 290,
          y: 236.5,
          density: 1,
          width: 227,
          angle: -90,
        },
        {
          name: "Pivot",
          x: 360,
          y: 44,
          type: "gear",
          color: "Purple",
          gearMaxAngle: 135,
          gearPower: 6,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 2,
        },
        {
          name: "Spring",
          x: 235,
          y: 430,
          angle: -45,
          type: "static",
          elasticity: 1.7,
        },
        {
          name: "Spring",
          x: 30,
          y: 410,
          angle: 0,
          type: "dynamic",
          elasticity: 2.05,
        },
        {
          name: "Platform",
          type: "static",
          x: 242.25,
          y: 435,
          density: 1,
          width: 47.8,
          angle: -45,
        },
        {
          name: "Pivot",
          x: 30,
          y: 410,
          type: "gear",
          color: "Blue",
          gearMaxAngle: 30,
          gearPower: 10,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 1,
        },
        {
          name: "Spring",
          x: 200,
          y: 305,
          angle: -45,
          type: "dynamic",
          elasticity: 2,
        },
        {
          name: "Pivot",
          x: 200,
          y: 305,
          type: "gear",
          color: "Blue",
          gearMaxAngle: -70,
          gearPower: -10,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 1,
        },
        {
          name: "Spring",
          x: 30,
          y: 235,
          angle: 45,
          type: "static",
          elasticity: 2,
        },
        {
          name: "Spring",
          x: 200,
          y: 170,
          angle: -30,
          type: "dynamic",
          elasticity: 1.8,
        },
        {
          name: "Pivot",
          x: 200,
          y: 170,
          type: "gear",
          color: "Blue",
          gearMaxAngle: -60,
          gearPower: -10,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 1,
        },
        {
          name: "Spring",
          x: 30,
          y: 155,
          angle: 0,
          type: "dynamic",
          elasticity: 2,
        },
        {
          name: "Pivot",
          x: 30,
          y: 155,
          type: "gear",
          color: "Blue",
          gearMaxAngle: 30,
          gearPower: 10,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 1,
        },
        {
          name: "Platform",
          type: "static",
          x: 193.25,
          y: 73,
          density: 1,
          width: 68,
          angle: 10,
        },
        {
          name: "Platform",
          type: "static",
          x: 25.4,
          y: 243,
          density: 1,
          width: 47.8,
          angle: 45,
        },
        {
          name: "Platform",
          type: "static",
          x: 520,
          y: 370.75,
          density: 1,
          width: 78.5,
          angle: -90,
        },
        {
          name: "Swings",
          x: 520,
          y: 315,
          angle: -20,
          lowerAngle: -20,
          upperAngle: 20,
        },
        {
          name: "Platform",
          type: "static",
          x: 540,
          y: 250,
          density: 1,
          width: 50,
          angle: -90,
        },
        {
          name: "Platform",
          type: "static",
          x: 500,
          y: 250,
          density: 1,
          width: 50,
          angle: -90,
        },
        {
          name: "Platform",
          type: "static",
          x: 588.1,
          y: 417.5,
          density: 1,
          width: 61.5,
          angle: -30,
        },
        {
          name: "Switcher",
          x: 588.6,
          y: 407.2,
          angle: -30,
          type: "toogle",
          color: "Red",
          signalID: 4,
        },
        {
          name: "Platform",
          type: "static",
          x: 610,
          y: 266.4,
          density: 1,
          width: 287.1,
          angle: -90,
        },
        {
          name: "Platform",
          type: "dynamic",
          x: 610,
          y: 77.15,
          density: 1,
          width: 85.7,
          angle: -90,
        },
        {
          name: "Pivot",
          x: 610,
          y: 42.25,
          type: "gear",
          color: "Yellow",
          gearMaxAngle: 0,
          gearPower: 6,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 3,
        },
        {
          name: "Spring",
          x: 467.5,
          y: 207.15,
          angle: 24,
          type: "static",
          elasticity: 2,
        },
        {
          name: "Platform",
          type: "static",
          x: 705,
          y: 117.45,
          density: 1,
          width: 234.8,
          angle: -90,
        },
        { name: "Star", x: 48.5, y: 278.75 },
        { name: "Star", x: 393.35, y: 17.6 },
        { name: "Star", x: 588.6, y: 152.1 },
        {
          name: "Platform",
          type: "dynamic",
          x: 671.15,
          y: 330.5,
          density: 1,
          width: 85.7,
          angle: 0,
        },
        {
          name: "Pivot",
          x: 705.2,
          y: 330.05,
          type: "gear",
          color: "Yellow",
          gearMaxAngle: 90,
          gearPower: 10,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 4,
        },
      ],
    },
  ];
  Z.prototype = Object.create(PIXI.Container.prototype);
  Z.prototype.constructor = Z;
  Z.prototype.run = function (a, c) {
    a && this.once("onMiddle", a, c || this);
    var b = this;
    this.show(function () {
      TweenMax.delayedCall(
        0.1,
        function () {
          b.emit("onMiddle");
          TweenMax.delayedCall(0.1, this.hide, null, this);
        },
        null,
        this
      );
    }, this);
  };
  Z.prototype.show = function (a, c) {
    a && this.once("showComplete", a, c || this);
    var b = this;
    TweenMax.to(this, 0.4, {
      alpha: 1,
      onComplete: function () {
        b.emit("showComplete");
      },
    });
  };
  Z.prototype.hide = function (a, c) {
    a && this.once("hideComplete", a, c || this);
    var b = this;
    TweenMax.to(this, 0.4, {
      alpha: 0,
      onComplete: function () {
        b.emit("hideComplete");
      },
    });
  };
  aa.prototype = Object.create(PIXI.Container.prototype);
  aa.prototype.constructor = aa;
  aa.prototype._onClick = function (a) {
    switch (a.target.name) {
      case "Play":
        this._menuDialog.hideToLeft(1);
        this._levelsDialog.show(1);
        try {
          parent.cmgGameEvent("start");
        } catch (c) {}
        break;
      case "BackLevels":
        this._menuDialog.show(1);
        this._levelsDialog.hide(1);
        break;
      case "Credits":
        this._menuDialog.hideToRight(1);
        this._creditsDialog.show(1);
        break;
      case "BackCredits":
        this._menuDialog.show(1);
        this._creditsDialog.hide(1);
        break;
      case "Music":
        d.setMusicEnable(a.isOn);
        break;
      case "Sound":
        d.setSoundEnable(a.isOn);
    }
    d.soundOn && this.sndButton.play();
  };
  aa.prototype._onBtnsLevelClick = function (a) {
    d.levelMng.currLevel = a;
    d.shutter.run(function () {
      this.destroy({ children: !0 });
      d.menuState = null;
      new r();
    }, this);
    d.soundOn && this.sndButton.play();
    try {
      parent.cmgGameEvent("start", a);
    } catch (c) {}
  };
  r.prototype = Object.create(PIXI.Container.prototype);
  r.prototype.constructor = r;
  r.prototype.destroy = function (a) {
    PIXI.Container.prototype.destroy.call(this, a);
  };
  r.prototype._onStageClick = function (a) {
    this._isComplete || this.shotHandler.call(a);
  };
  r.prototype._onGameLayerChildAdded = function () {
    this.updateLayersOrder();
  };
  r.prototype.updateLayersOrder = function () {
    this.gameLayer.children.sort(function (a, c) {
      return (
        (a.zOrder = a.zOrder || 0),
        (c.zOrder = c.zOrder || 0),
        a.zOrder != c.zOrder ? a.zOrder - c.zOrder : a.y - c.y
      );
    });
  };
  r.prototype.complete = function () {
    this._isComplete ||
      ((this._isComplete = !0),
      this.addChild(this._levelComplete),
      this._levelComplete.show(0.5, this._catchedStars),
      d.levelMng.onLevelComplete());
  };
  r.zOrder = {
    defaultZ: 100,
    cannon: 100,
    ball: 50,
    basket: 100,
    platform: 150,
    switcher: 40,
    teleport: 41,
    rail: 30,
    tutorial: 20,
    pivot: 200,
  };
  r.prototype._createUI = function () {
    var a = t.generateButton("btnMenuGame", "atlasUI", this._onBtnsClick, this);
    a.name = "Menu";
    a.scale.set(0.5, 0.5);
    a.anchor.set(0.5, 1);
    a.x = d.gameWidth0 - a.width / 2 - 5;
    a.y = a.height + 5;
    this.uiLayer.addChild(a);
    var c = t.generateButton(
      "btnRestartGame",
      "atlasUI",
      this._onBtnsClick,
      this
    );
    if (
      ((c.name = "Restart"),
      c.scale.set(0.5, 0.5),
      c.anchor.set(0.5, 1),
      (c.x = a.x - a.width / 2 - c.width / 2 - 5),
      (c.y = a.y),
      this.uiLayer.addChild(c),
      this.aimControl)
    )
      (a = t.generateButton("btnFire", "atlasUI", this._onBtnsClick, this)),
        (a.name = "Fire"),
        a.scale.set(0.5, 0.5),
        a.anchor.set(0.5, 0.5),
        (a.x = 36),
        (a.y = d.gameHeight0 - 36),
        this.uiLayer.addChild(a),
        (this.btnFire = a),
        (this._btnFireBlinked = !1),
        (this._blinker = d.assets.getSprite("btnFireBlink")),
        this._blinker.scale.set(0.5, 0.5),
        this._blinker.anchor.set(0.5, 0.5),
        (this._blinker.x = a.x),
        (this._blinker.y = a.y),
        (this._blinker.visible = !1),
        this.addChild(this._blinker);
    a = new PIXI.TextStyle({
      fontFamily: "CroMagnum",
      fontSize: 42,
      fill: "#D74A1D",
      stroke: "#4D1604",
      strokeThickness: 8,
      align: "center",
      lineHeight: 42,
    });
    this._txtLevel = new PIXI.Text("Level: " + d.levelMng.currLevel, a);
    this._txtLevel.x = 5;
    this._txtLevel.y = 5;
    this._txtLevel.scale.set(0.5, 0.5);
    this.uiLayer.addChild(this._txtLevel);
    a = d.assets.getSprite("toolbarStarPlace", "atlasUI");
    a.anchor.set(0.5, 0.5);
    a.scale.set(0.5, 0.5);
    a.x = d.gameWidth0 - a.width / 2 - 10;
    a.y = d.gameHeight0 - a.height / 2 - 5;
    a.empty = !0;
    this.addChild(a);
    c = d.assets.getSprite("toolbarStarPlace", "atlasUI");
    c.anchor.set(0.5, 0.5);
    c.scale.set(0.5, 0.5);
    c.x = a.x - a.width / 2 - c.width / 2 - 5;
    c.y = a.y;
    c.empty = !0;
    this.addChild(c);
    var b = d.assets.getSprite("toolbarStarPlace", "atlasUI");
    b.anchor.set(0.5, 0.5);
    b.scale.set(0.5, 0.5);
    b.x = c.x - c.width / 2 - b.width / 2 - 5;
    b.y = a.y;
    b.empty = !0;
    this.addChild(b);
    this._starPlaces = [a, c, b];
    this._catchedStars = 0;
  };
  r.prototype.addStar = function () {
    for (var a = null, c = 0; c < this._starPlaces.length; c++)
      if (this._starPlaces[c].empty) {
        a = this._starPlaces[c];
        a.empty = !1;
        break;
      }
    null != a &&
      ((c = d.assets.getSprite("toolbarStar", "atlasUI")),
      c.anchor.set(0.5, 0.5),
      c.scale.set(0.5, 0.5),
      (c.x = a.x),
      (c.y = a.y),
      (c.alpha = 0),
      this.addChildAt(c, this.getChildIndex(a) + 1),
      TweenMax.to(c, 1, { alpha: 1 }),
      this._catchedStars++);
  };
  r.prototype.blinkBtnFire = function () {
    this._btnFireBlinked ||
      ((this._btnFireBlinked = !0),
      (this._blinker.visible = !0),
      (this._blinker.alpha = 0),
      (this._blinkTween = TweenMax.to(this._blinker, 0.5, {
        alpha: 1,
        repeat: -1,
        yoyo: !0,
      })));
  };
  r.prototype.stopBlinkBtnFire = function () {
    this._blinkTween &&
      ((this._blinker.visible = !1),
      this._blinkTween.kill(),
      (this._blinkTween = null));
  };
  r.prototype._onBtnsClick = function (a) {
    switch (a.target.name) {
      case "Menu":
        d.shutter.run(function () {
          this.destroy({ children: !0 });
          d.playState = null;
          new aa();
        }, this);
        break;
      case "Restart":
        d.shutter.run(function () {
          try {
            parent.cmgGameEvent("replay", d.levelMng.currLevel);
          } catch (c) {}
          d.playState.isDestroying = !0;
          this.destroy({ children: !0 });
          d.playState = null;
          new r();
        }, this);
        break;
      case "Next":
        d.shutter.run(function () {
          d.levelMng.currLevel++;
          try {
            parent.cmgGameEvent("start", d.levelMng.currLevel);
          } catch (c) {}
          d.playState.isDestroying = !0;
          this.destroy({ children: !0 });
          d.playState = null;
          new r();
        }, this);
        break;
      case "Fire":
        if (this._isComplete) return;
        this.shotHandler.call(a);
        this.stopBlinkBtnFire();
    }
    d.soundOn && this.sndButton.play();
  };
  var d = {
    pixi: null,
    physics: null,
    physWorld: null,
    physScale: 30,
    soundMng: null,
    assets: null,
    inited: !1,
    audioEnabled: !1,
    musicOn: !0,
    soundOn: !0,
    levelMng: null,
    menuState: null,
    playState: null,
    shutter: null,
    tutorial: null,
    SAVE_KEY_LAST_OPENED: "lastOpened",
    SAVE_KEY_MUSIC: "saveMusic",
    SAVE_KEY_SOUND: "saveSound",
    SAVE_KEY_STARS: "saveStars",
    storage: null,
    browserEvents: null,
    gameWidth0: 720,
    gameHeight0: 500,
    gameMaxWidth0: 720,
    gameMaxHeight0: 500,
    gameWidth1: null,
    gameHeight1: null,
    gameMaxWidth1: null,
    gameMaxHeight1: null,
    border: null,
    canvasWidth: null,
    canvasHeight: null,
    scale: 1,
    imgRotate: null,
    rnd: null,
    device: null,
    fps: null,
    sponsorURL: "",
  };
  p.App = d;
  p.trace = console.log;
  ua();
  d.mainTheme = null;
  d._checkAudio = function () {
    d.audioEnabled
      ? (void 0 != d.storage.get(d.SAVE_KEY_MUSIC) &&
          (d.musicOn = "true" == d.storage.get(d.SAVE_KEY_MUSIC)),
        void 0 != d.storage.get(d.SAVE_KEY_SOUND) &&
          (d.soundOn = "true" == d.storage.get(d.SAVE_KEY_SOUND)),
        (d.mainTheme = d.assets.getSound("sndTheme")),
        (d.mainTheme.loop = !0),
        (d.mainTheme.volume = 0.3),
        d.musicOn && d.mainTheme.play(),
        d.browserEvents.on("onPageShow", function (a) {
          isFocusLost = !1;
          resumeAllSoundsIfAdsNotBeingShownAndFocusNotBeingLost();
        }),
        d.browserEvents.on("onPageHide", function (a) {
          isFocusLost = !0;
          PIXI.sound.pauseAll();
        }),
        d.browserEvents.on("onFocusGet", function (a) {
          isFocusLost = !1;
          resumeAllSoundsIfAdsNotBeingShownAndFocusNotBeingLost();
        }),
        d.browserEvents.on("onFocusLost", function (a) {
          isFocusLost = !0;
          PIXI.sound.pauseAll();
        }))
      : ((d.musicOn = !1), (d.soundOn = !1));
  };
  d.setMusicEnable = function (a) {
    !1 !== d.audioEnabled &&
      ((d.musicOn = a),
      d.musicOn
        ? d.mainTheme.isPlaying ||
          (d.mainTheme.resume(), d.mainTheme.isPlaying || d.mainTheme.play())
        : d.mainTheme.isPlaying && d.mainTheme.pause(),
      d.storage.set(d.SAVE_KEY_MUSIC, d.musicOn));
  };
  d.switchMusicEnable = function () {
    d.setMusicEnable(!d.musicOn);
  };
  d.setSoundEnable = function (a) {
    !1 !== d.audioEnabled &&
      ((d.soundOn = a), d.storage.set(d.SAVE_KEY_SOUND, d.soundOn));
  };
  d.switchSoundEnable = function () {
    d.setSoundEnable(!d.soundOn);
  };
  p.unlockAllLevels = function () {
    d.levelMng && d.levelMng.unlockAllLevels();
    d.menuState && d.menuState._levelsDialog.refresh();
  };
  parent.unlockAllLevels = p.unlockAllLevels;
})(window);
var isFocusLost = !1;
function resumeAllSoundsIfAdsNotBeingShownAndFocusNotBeingLost() {
  isAdBreakActive || isFocusLost || PIXI.sound.resumeAll();
}
