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
  function O() {
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
  function P(a) {
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
    b = "levelNumbers_" + I.pad(a + "", 4, "0", 1);
    b = d.assets.getSprite(b, "atlasUI", !0);
    if (
      (b.anchor.set(0.5, 0.5),
      (b.x = this.width / 2 - 3),
      (b.y = this.height / 2),
      this.addChild(b),
      null == b)
    )
      (b = new PIXI.TextStyle({
        fontFamily: "CroMagnum",
        fontSize: 42,
        fill: "#FEF4B0",
        stroke: "#4D1604",
        strokeThickness: 8,
      })),
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
      fontFamily: "Arial",
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
    b = t.generateButton("btnBackCredits", "atlasUI", a, c);
    b.name = "BackCredits";
    b.scale.set(0.5, 0.5);
    b.x = d.gameWidth0 - b.width / 2 - 10;
    b.y = d.gameHeight0 - b.height / 2 - 5;
    this.addChild(b);
  }
  function Q(a, c) {
    PIXI.Container.call(this);
    this._buttonsHandler = c;
    var b = d.assets.getSprite("levelsBoard" + a, "atlasUI");
    b.scale.set(0.5, 0.5);
    b.anchor.set(0.5, 0.5);
    this.addChild(b);
    b = 15 * (a - 1) + 1;
    this._buttons = [];
    this._btnsContainer = new PIXI.Container();
    this.addChild(this._btnsContainer);
    for (var e = 0, g = 8, h = 0; 2 > h; h++) {
      for (var m = 0; m < g; m++) {
        var n = new ba(b, a, this._onClick, this);
        n.x += e + m * (12 + n.width);
        n.y += h * (7 + n.height);
        n.anchor.set(0, 0);
        this._btnsContainer.addChild(n);
        n.setLocked(b > d.levelMng.lastOpened);
        this._buttons.push(n);
        b++;
      }
      g--;
      2 == a && (e = 12 + n.width);
    }
    this._btnsContainer.x = -this._btnsContainer.width / 2;
    this._btnsContainer.y = -this._btnsContainer.height / 2 + 10;
  }
  function fa(a, c) {
    PIXI.Container.call(this);
    this._buttonsHandler = a;
    var b = d.assets.getSprite("levelCompleted");
    b.interactive = !0;
    this.addChild(b);
    wrapper = function (h, m, n) {
      a.call(this, h, m, n);
      setTimeout(cmgAdBreakCall, 500);
    };
    this._btnRestart = t.generateButton(
      "btnRestartComplete",
      "atlasUI",
      wrapper,
      c
    );
    this._btnRestart.name = "Restart";
    this._btnRestart.scale.set(0.35, 0.35);
    this._btnRestart.anchor.set(0.5, 0.5);
    this._btnRestart.x = this._btnRestart.xIn = d.gameWidth0 / 2;
    this._btnRestart.y = this._btnRestart.yIn = d.gameHeight0 / 2 + 100;
    this._btnRestart.xOut = this._btnRestart.xIn;
    this._btnRestart.yOut = d.gameHeight0 + this._btnRestart.height / 2 + 10;
    this.addChild(this._btnRestart);
    this._btnMenu = t.generateButton("btnMenuComplete", "atlasUI", wrapper, c);
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
    this._btnNext = t.generateButton("btnNextComplete", "atlasUI", wrapper, c);
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
      fontSize: 72,
      fill: "#FFDC90",
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
    this._text.y = d.gameHeight0 / 2 - 100;
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
    var e = new Q(1, a);
    e.x = 310;
    e.y = 122;
    this.addChild(e);
    a = new Q(2, a);
    a.x = 410;
    a.y = 320;
    this.addChild(a);
    this._boards = [e, a];
    c = t.generateButton("btnBackLevels", "atlasUI", c, b);
    c.name = "BackLevels";
    c.scale.set(0.5, 0.5);
    c.x = c.width / 2 + 10;
    c.y = d.gameHeight0 - c.height / 2 - 5;
    this.addChild(c);
  }
  function S(a, c) {
    PIXI.Container.call(this);
    var b = d.assets.getSprite("gameName", null, !0);
    b.scale.set(0.45, 0.45);
    b.x = d.gameWidth0 / 2;
    b.y = d.gameHeight0 / 2 - b.height / 2;
    this.addChild(b);
    var e = t.generateButton("btnPlayMenu", "atlasUI", a, c);
    e.name = "Play";
    e.scale.set(0.45, 0.45);
    e.x = b.x;
    e.y = b.y + b.height / 2 + e.height / 2 + 15;
    this.addChild(e);
    var g = t.generateButton("btnCreditsMenu", "atlasUI", a, c);
    g.name = "Credits";
    g.scale.set(0.45, 0.45);
    g.x = b.x;
    g.y = e.y + e.height / 2 + g.height / 2 + 20;
    this.addChild(g);
    b = new ca("btnMusicOn", "btnMusicOff", "atlasUI", a, c);
    b.name = "Music";
    b.scale.set(0.5, 0.5);
    b.x = e.x + e.width / 2 + b.width / 2 + 10;
    b.y = e.y + e.height / 2 + 10;
    b.on = d.musicOn;
    this.addChild(b);
    g = new ca("btnSoundOn", "btnSoundOff", "atlasUI", a, c);
    g.name = "Sound";
    g.scale.set(0.5, 0.5);
    g.x = e.x - e.width / 2 - g.width / 2 - 10;
    g.y = b.y;
    g.on = d.soundOn;
    this.addChild(g);
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
    b.anchor.set(0.5, 0.7);
    b.scale.set(0.5, 0.5);
    this.addChild(b);
    b = I.generateFrameNames("cannon_", 1, 15, "", 4);
    b = d.assets.getTextures(b, "atlasGame");
    this._cannon = new PIXI.extras.AnimatedSprite(b);
    this._cannon.anchor.set(0.5, 1.32);
    this._cannon.scale.set(0.5, 0.5);
    this._cannon.animationSpeed = 1;
    this._cannon.loop = !1;
    this.addChildAt(this._cannon, 0);
    b = d.assets.getSprite("cannonPowerBarBG", "atlasGame");
    b.anchor.set(0.5, 1);
    b.x = 30;
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
  function L(a, c, b, e, g, h) {
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
  function M(a, c) {
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
  function J(a, c, b, e, g, h, m, n, x) {
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
        ((n = I.generateFrameNames("gear" + g + "_", 1, 40, "", 4)),
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
    g = I.generateFrameNames("spring_", 1, 8, "", 4);
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
    var b = I.generateFrameNames("star_", 1, 52, "", 4);
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
    e = I.generateFrameNames(this.type + this.color + "_", 1, 6, "", 4);
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
  function N(a, c, b, e, g) {
    l.call(this, "Teleport", r.zOrder.teleport);
    e = q.toRadians(e);
    this.x = a;
    this.y = c;
    this.rotation = e;
    this.id = b;
    b = I.generateFrameNames("teleport" + g + "_", 1, 20, "", 4);
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
        (a.x = 380),
        (a.y = 150),
        this.addChild(a),
        (a = d.assets.getSprite("tutorial1_2", "atlasUI")),
        a.scale.set(0.5, 0.5),
        a.anchor.set(0.5, 0.5),
        (a.x = 300),
        (a.y = 450),
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
    this.bg = d.assets.getSprite("bg_" + Math.ceil(d.levelMng.currLevel / 15));
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
    d.currLevelDebug = 5;
    d.browserEvents = new C();
    d.browserEvents.on("onResize", ua);
    d.browserEvents.on("onOrientationChange", ua);
    d.storage = new ja();
    a = [];
    a.push(d.SAVE_KEY_LAST_OPENED, d.SAVE_KEY_MUSIC, d.SAVE_KEY_SOUND);
    for (c = 1; 30 >= c; c++) a.push(d.SAVE_KEY_STARS + c);
    d.storage.read(a);
    d.assets = new P(d);
    d.rnd = new xa([(Date.now() * Math.random()).toString()]);
    try {
      d.fps = new FPSMeter(document.body);
    } catch (b) {}
    if (
      ((d.levelMng = new Y()),
      (d.shutter = new Z()),
      d.pixi.stage.addChild((d.preloader = new O())),
      (PIXI.loader.baseUrl = "assets"),
      PIXI.loader
        .add("atlasUI", "images/atlasUI.json")
        .add("atlasGame", "images/atlasGame.json")
        .add("splash", "images/splash.png")
        .add("bg_menu", "images/bg_menu.png")
        .add("bg_1", "images/bg_1.png")
        .add("bg_2", "images/bg_2.png"),
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
  O.prototype = Object.create(PIXI.Container.prototype);
  O.prototype.constructor = O;
  O.prototype.setLoading = function (a) {
    this._loaded = a;
  };
  O.prototype.loadedCallback = function (a) {
    this._loadedCB = a;
  };
  O.prototype._update = function () {
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
  P.prototype.constructor = P;
  P.prototype.getTexture = function (a, c) {
    return c
      ? PIXI.loader.resources[c].textures[a]
      : PIXI.utils.TextureCache[a];
  };
  P.prototype.getTextures = function (a, c) {
    var b = c ? PIXI.loader.resources[c].textures : PIXI.utils.TextureCache;
    for (var e = [], g = 0; g < a.length; g++) e.push(b[a[g]]);
    return e;
  };
  P.prototype.getSprite = function (a, c, b) {
    a = new PIXI.Sprite(this.getTexture(a, c));
    return b && a.anchor.set(0.5, 0.5), a;
  };
  P.prototype.getSound = function (a) {
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
      var K;
      e = a.texture.frame.width;
      h = a.texture.frame.height;
      n = -e * a.anchor.x;
      if (m > n && m < n + e && ((K = -h * a.anchor.y), b > K && b < K + h))
        return (c.target = a), !0;
    }
    K = a.children.length;
    for (e = 0; e < K; e++)
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
        K = m.x,
        Aa = -(E * b.x + K * b.y);
      m = E * a.x + K * a.y + Aa;
      c = E * c.x + K * c.y + Aa;
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
  var I = {
      generateFrameNames: function (a, c, b, e, g) {
        "undefined" == typeof e && (e = "");
        var h = [];
        if (c < b)
          for (; c <= b; c++) {
            var m =
              "number" == typeof g
                ? I.pad(c.toString(), g, "0", 1)
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
  Q.prototype = Object.create(PIXI.Container.prototype);
  Q.prototype.constructor = Q;
  Q.prototype._onClick = function (a) {
    this._buttonsHandler(a.target.num);
  };
  Q.prototype.refresh = function () {
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
      x: 0.5,
      y: 0.5,
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
  L.prototype = Object.create(l.prototype);
  L.prototype.constructor = L;
  L.prototype.destroy = function () {
    l.prototype.destroy.call(this);
    l.events.off(l.EVENT_TRIGGER_PRESSED, this._onTriggerEvent, this);
  };
  L.prototype._onTriggerEvent = function (a) {
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
  L.prototype._stop = function () {
    this._body.SetAngularVelocity(0);
    this._disableUpdate();
    this.positionUpdate = this.angleUpdate = !1;
  };
  L.prototype._update = function () {
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
  M.prototype = Object.create(l.prototype);
  M.prototype.constructor = M;
  M.prototype.destroy = function () {
    l.prototype.destroy.call(this);
    d.physics.contactListener.removeBeginContactListener(
      this._onBeginContact,
      this
    );
  };
  M.prototype._onBeginContact = function (a) {
    k.getAnotherOfContact(a, this) instanceof v && this.unhook();
  };
  M.prototype._update = function () {
    l.prototype._update.call(this);
    this.y > d.gameHeight0 + 50 && this.destroy();
  };
  M.prototype.unhook = function () {
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
  J.prototype = Object.create(l.prototype);
  J.prototype.constructor = J;
  J.prototype.destroy = function () {
    l.prototype.destroy.call(this);
    l.events.off(l.EVENT_TRIGGER_PRESSED, this._onTriggerEvent, this);
  };
  J.prototype._onTriggerEvent = function (a) {
    var c = a.state;
    this.gearSignalID == a.id &&
      this._state != c &&
      ((this._state = c),
      "on" == c
        ? this._motorOn(this.gearPower, this.TO_DESTINATION)
        : "off" == c && this._motorOn(-this.gearPower, this.TO_START_ANGLE));
  };
  J.prototype._motorOn = function (a, c) {
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
  J.prototype._motorOff = function () {
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
  J.prototype._update = function () {
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
  N.prototype = Object.create(l.prototype);
  N.prototype.constructor = N;
  N.prototype.destroy = function () {
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
  N.prototype._onBeginContact = function (a) {
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
  N.prototype._onEndContact = function (a) {
    a = k.getAnotherOfContact(a, this);
    a instanceof v &&
      (a.teleportPhase++, 3 <= a.teleportPhase && (a.teleportPhase = 0));
  };
  N.prototype._teleportation = function (a) {
    var c = a.ball,
      b = a.id;
    if (a.sender != this && b == this.id) {
      var e = this;
      d.physics.doIt(function () {
        c.setPosition(e.x, e.y);
        var g = c._body.GetLinearVelocity();
        g = q.vectorVelocityRad(
          e.rotation - q.toRadians(90),
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
        ? ((a = new J(
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
        ? ((c = new N(a.x, a.y, a.id, a.angle, a.color)),
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
        ? ((a = new M(a.x, a.y)), d.playState.gameLayer.addChild(a))
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
        ? ((a = new L(
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
        { name: "Cannon", x: 508.3, y: 399.5, lowerAngle: -70, upperAngle: 70 },
        { name: "Basket", x: 184.05, y: 272.85 },
        {
          name: "Platform",
          type: "static",
          x: 163,
          y: 72,
          density: 1,
          width: 258,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 87.5,
          y: 181.05,
          density: 1,
          width: 238.2,
          angle: -90,
        },
        {
          name: "Platform",
          type: "static",
          x: 109.5,
          y: 257.95,
          density: 1,
          width: 105.8,
          angle: 26,
        },
        {
          name: "Platform",
          type: "static",
          x: 61.5,
          y: 59,
          density: 1,
          width: 82.1,
          angle: -90,
        },
        {
          name: "Platform",
          type: "static",
          x: 265.5,
          y: 59,
          density: 1,
          width: 82.1,
          angle: -90,
        },
        { name: "Star", x: 206.35, y: 200 },
        { name: "Star", x: 304.35, y: 238.8 },
        { name: "Star", x: 390.4, y: 288.25 },
      ],
    },
    {
      items: [
        { name: "Basket", x: 470.05, y: 374.8 },
        { name: "Cannon", x: 201.2, y: 381.6, lowerAngle: -70, upperAngle: 70 },
        {
          name: "Platform",
          type: "static",
          x: 521.9,
          y: 210.5,
          density: 1,
          width: 55.6,
          angle: 150,
        },
        {
          name: "Platform",
          type: "static",
          x: 490.7,
          y: 167.9,
          density: 1,
          width: 177.9,
          angle: -30,
        },
        {
          name: "Platform",
          type: "static",
          x: 414.45,
          y: 55.8,
          density: 1,
          width: 433.4,
          angle: 7,
        },
        {
          name: "Platform",
          type: "static",
          x: 397.8,
          y: 105.6,
          density: 1,
          width: 363.5,
          angle: 6,
        },
        {
          name: "Platform",
          type: "static",
          x: 420,
          y: 296.75,
          density: 1,
          width: 187.2,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 436.05,
          y: 252.3,
          density: 1,
          width: 47.5,
          angle: 30,
        },
        {
          name: "Platform",
          type: "static",
          x: 439.2,
          y: 338.95,
          density: 1,
          width: 50.8,
          angle: 30,
        },
        {
          name: "Platform",
          type: "static",
          x: 505.4,
          y: 302.85,
          density: 1,
          width: 179.2,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 224.2,
          y: 137.15,
          density: 1,
          width: 118.1,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 171.25,
          y: 128,
          density: 1,
          width: 131.9,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 153.4,
          y: 203.8,
          density: 1,
          width: 61.7,
          angle: 135,
        },
        {
          name: "Platform",
          type: "static",
          x: 243.5,
          y: 203.05,
          density: 1,
          width: 61.7,
          angle: 45,
        },
        {
          name: "Platform",
          type: "static",
          x: 607.75,
          y: 178.75,
          density: 1,
          width: 53,
          angle: 150,
        },
        {
          name: "Platform",
          type: "static",
          x: 574.45,
          y: 211.45,
          density: 1,
          width: 69.4,
          angle: 150,
        },
        {
          name: "Platform",
          type: "static",
          x: 544.7,
          y: 213.95,
          density: 1,
          width: 46.6,
          angle: -120,
        },
        {
          name: "Platform",
          type: "static",
          x: 594.85,
          y: 192.05,
          density: 1,
          width: 31.6,
          angle: -120,
        },
        {
          name: "Platform",
          type: "static",
          x: 189.45,
          y: 49.75,
          density: 1,
          width: 65.3,
          angle: 135,
        },
        {
          name: "Platform",
          type: "static",
          x: 625.2,
          y: 122.95,
          density: 1,
          width: 106.9,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 490.2,
          y: 295.65,
          density: 1,
          width: 48.7,
          angle: -30,
        },
        { name: "Star", x: 445.3, y: 146.9 },
        { name: "Star", x: 563.3, y: 188 },
        { name: "Star", x: 103.35, y: 214 },
      ],
    },
    {
      items: [
        {
          name: "Platform",
          type: "static",
          x: 388.1,
          y: 89.5,
          density: 1,
          width: 110,
          angle: -90,
        },
        {
          name: "Platform",
          type: "dynamic",
          x: 387.1,
          y: 178.4,
          density: 0.6,
          width: 120,
          angle: 90,
        },
        { name: "Basket", x: 535.45, y: 306.45 },
        {
          name: "Cannon",
          x: 192.05,
          y: 393.5,
          lowerAngle: -70,
          upperAngle: 70,
        },
        {
          name: "Platform",
          type: "static",
          x: 552.5,
          y: 224.7,
          density: 1,
          width: 132.8,
          angle: 0,
        },
        {
          name: "Pivot",
          x: 387.3,
          y: 131.45,
          type: "bolt",
          color: "Red",
          gearMaxAngle: 0,
          gearPower: 1,
          lowerAngle: -360,
          upperAngle: 270,
          signalID: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 677.2,
          y: 175.3,
          density: 1,
          width: 282.5,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 623.5,
          y: 281.95,
          density: 1,
          width: 134.4,
          angle: -30,
        },
        {
          name: "Platform",
          type: "static",
          x: 478.1,
          y: 63.5,
          density: 1,
          width: 458.9,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 494.4,
          y: 273.9,
          density: 1,
          width: 116.3,
          angle: 90,
        },
        { name: "Star", x: 493.3, y: 353.95 },
        { name: "Star", x: 313.35, y: 37 },
        { name: "Star", x: 652.3, y: 178 },
      ],
    },
    {
      items: [
        {
          name: "Platform",
          type: "static",
          x: 635.45,
          y: 123.75,
          density: 1,
          width: 20.1,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 91.05,
          y: 181.05,
          density: 1,
          width: 200,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 240.95,
          y: 179.85,
          density: 1,
          width: 20.1,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 97.8,
          y: 250.7,
          density: 1,
          width: 180.4,
          angle: 45,
        },
        {
          name: "Platform",
          type: "static",
          x: 202.05,
          y: 328,
          density: 1,
          width: 181.9,
          angle: 90,
        },
        { name: "Basket", x: 609, y: 136.3 },
        { name: "Cannon", x: 486, y: 407, lowerAngle: -70, upperAngle: 70 },
        {
          name: "Switcher",
          x: 135,
          y: 277.95,
          angle: 45,
          type: "button",
          color: "Red",
          signalID: 1,
        },
        { name: "Box", x: 240.9, y: 147.05, angle: 0, density: 0.4 },
        {
          name: "Platform",
          type: "dynamic",
          x: 604,
          y: 124.55,
          density: 1,
          width: 80,
          angle: 0,
        },
        {
          name: "Pivot",
          x: 635.45,
          y: 123.75,
          type: "gear",
          color: "Red",
          gearMaxAngle: 90,
          gearPower: 6,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 1,
        },
        {
          name: "Platform",
          type: "static",
          x: 65.4,
          y: 89.95,
          density: 1,
          width: 80,
          angle: 45,
        },
        { name: "Star", x: 606.3, y: 99 },
        { name: "Star", x: 177.35, y: 333.95 },
        { name: "Star", x: 228.35, y: 333.95 },
      ],
    },
    {
      items: [
        {
          name: "Platform",
          type: "static",
          x: 607.45,
          y: 70.05,
          density: 1,
          width: 18,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 505.55,
          y: 188.95,
          density: 1,
          width: 18,
          angle: 0,
        },
        { name: "Basket", x: 49.2, y: 352.8 },
        {
          name: "Cannon",
          x: 202.05,
          y: 287.05,
          lowerAngle: -70,
          upperAngle: 70,
        },
        {
          name: "Platform",
          type: "dynamic",
          x: 548.35,
          y: 70.1,
          density: 0.8,
          width: 136.7,
          angle: 0,
        },
        {
          name: "Pivot",
          x: 607.45,
          y: 70.05,
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
          x: 505.45,
          y: 139.1,
          density: 0.2,
          width: 120,
          angle: 90,
        },
        {
          name: "Switcher",
          x: 702.35,
          y: 142.7,
          angle: -90,
          type: "toogle",
          color: "Red",
          signalID: 1,
        },
        {
          name: "Platform",
          type: "static",
          x: 290.5,
          y: 330.95,
          density: 1,
          width: 90,
          angle: 90,
        },
        {
          name: "Pivot",
          x: 505.55,
          y: 188.95,
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
          type: "static",
          x: 190.5,
          y: 294.9,
          density: 0.9,
          width: 218.9,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 710.35,
          y: 122,
          density: 1,
          width: 118.3,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 706.35,
          y: 174,
          density: 0.9,
          width: 26.7,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 674.05,
          y: 70.85,
          density: 0.9,
          width: 90.6,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 8.45,
          y: 260.35,
          density: 1,
          width: 230.1,
          angle: 90,
        },
        {
          name: "Platform",
          type: "dynamic",
          x: 61.3,
          y: 294.75,
          density: 1,
          width: 72.1,
          angle: 0,
        },
        { name: "Star", x: 505.3, y: 43 },
        { name: "Star", x: 32.35, y: 157 },
        { name: "Star", x: 315.35, y: 322.95 },
        {
          name: "Pivot",
          x: 89.55,
          y: 295.65,
          type: "gear",
          color: "Red",
          gearMaxAngle: -90,
          gearPower: -8,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 1,
        },
      ],
    },
    {
      items: [
        {
          name: "Platform",
          type: "static",
          x: 283.65,
          y: 260.6,
          density: 1,
          width: 18,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 533.25,
          y: 320.75,
          density: 1,
          width: 133,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 458,
          y: 263.25,
          density: 1,
          width: 170.5,
          angle: 180,
        },
        {
          name: "Platform",
          type: "static",
          x: 167.75,
          y: 179,
          density: 1,
          width: 256,
          angle: 37,
        },
        { name: "Basket", x: 147.3, y: 363.9 },
        { name: "Cannon", x: 463.2, y: 254.4, lowerAngle: -70, upperAngle: 70 },
        {
          name: "Teleport",
          x: 35.2,
          y: 140.15,
          angle: 90,
          color: "Red",
          id: 0,
          mulVel: 1,
        },
        {
          name: "Teleport",
          x: 547.55,
          y: 410.25,
          angle: -90,
          color: "Red",
          id: 0,
          mulVel: 1,
        },
        {
          name: "Platform",
          type: "static",
          x: 451.9,
          y: 383.4,
          density: 1,
          width: 160.5,
          angle: 37,
        },
        {
          name: "Platform",
          type: "dynamic",
          x: 248.25,
          y: 307.4,
          density: 1,
          width: 136.7,
          angle: 127,
        },
        {
          name: "Platform",
          type: "static",
          x: 115.8,
          y: 223.25,
          density: 1,
          width: 163.3,
          angle: 37,
        },
        {
          name: "Platform",
          type: "static",
          x: 222.2,
          y: 305.5,
          density: 1,
          width: 157.9,
          angle: 127,
        },
        {
          name: "Switcher",
          x: 618.85,
          y: 45.35,
          angle: 180,
          type: "toogle",
          color: "Green",
          signalID: 1,
        },
        {
          name: "Pivot",
          x: 283.65,
          y: 260.6,
          type: "gear",
          color: "Green",
          gearMaxAngle: 35,
          gearPower: -5,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 1,
        },
        {
          name: "Platform",
          type: "static",
          x: 617.45,
          y: 36.95,
          density: 1,
          width: 110.5,
          angle: 180,
        },
        {
          name: "Platform",
          type: "static",
          x: 381.75,
          y: 272.75,
          density: 1,
          width: 37,
          angle: 90,
        },
        { name: "Star", x: 29.35, y: 98 },
        { name: "Star", x: 694.3, y: 40 },
        { name: "Star", x: 323.35, y: 402.5 },
      ],
    },
    {
      items: [
        {
          name: "Platform",
          type: "static",
          x: 511.65,
          y: 289.75,
          density: 1,
          width: 85.3,
          angle: -15,
        },
        {
          name: "Cannon",
          x: 259.2,
          y: 355.85,
          lowerAngle: -70,
          upperAngle: 70,
        },
        { name: "Basket", x: 430.45, y: 406.4 },
        { name: "Rock", x: 556.7, y: 176, density: 1.4 },
        {
          name: "Platform",
          type: "static",
          x: 465.75,
          y: 248.3,
          density: 1,
          width: 444.2,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 556.5,
          y: 320.25,
          density: 1,
          width: 232.5,
          angle: 90,
        },
        {
          name: "Teleport",
          x: 79.3,
          y: 148.95,
          angle: 0,
          color: "Red",
          id: 0,
          mulVel: 1,
        },
        {
          name: "Teleport",
          x: 616,
          y: 180.75,
          angle: -90,
          color: "Red",
          id: 0,
          mulVel: 1,
        },
        {
          name: "Switcher",
          x: 472.75,
          y: 258.45,
          angle: 90,
          type: "button",
          color: "Blue",
          signalID: 1,
        },
        {
          name: "Platform",
          type: "static",
          x: 377.6,
          y: 264.05,
          density: 1,
          width: 274.1,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 258.65,
          y: 368.7,
          density: 1,
          width: 256,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 260.55,
          y: 422.9,
          density: 1,
          width: 284.2,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 46.65,
          y: 204.9,
          density: 1,
          width: 354.6,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 421.75,
          y: 32.45,
          density: 1,
          width: 106.2,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 92.15,
          y: 395.55,
          density: 1,
          width: 118.9,
          angle: 30,
        },
        { name: "Star", x: 75.35, y: 251 },
        { name: "Star", x: 80.35, y: 52 },
        { name: "Star", x: 337.3, y: 396.95 },
        {
          name: "Platform",
          type: "static",
          x: 393.7,
          y: 444.65,
          density: 1,
          width: 45.5,
          angle: 90,
        },
        {
          name: "Platform",
          type: "dynamic",
          x: 377.6,
          y: 68.65,
          density: 1,
          width: 91.1,
          angle: 90,
        },
        {
          name: "Pivot",
          x: 377.85,
          y: 31.85,
          type: "gear",
          color: "Blue",
          gearMaxAngle: 180,
          gearPower: 5,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 1,
        },
        {
          name: "Platform",
          type: "static",
          x: 429.35,
          y: 468.6,
          density: 1,
          width: 89.2,
          angle: 0,
        },
      ],
    },
    {
      items: [
        {
          name: "Platform",
          type: "static",
          x: 211.75,
          y: 394.85,
          density: 1,
          width: 188.2,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 509.55,
          y: 108.3,
          density: 1,
          width: 424.7,
          angle: 174,
        },
        {
          name: "Platform",
          type: "dynamic",
          x: 257.7,
          y: 138.95,
          density: 1,
          width: 117,
          angle: 174,
        },
        { name: "Basket", x: 335.35, y: 400.75 },
        {
          name: "Cannon",
          x: 473.1,
          y: 363.95,
          lowerAngle: -70,
          upperAngle: 70,
        },
        {
          name: "Switcher",
          x: 648.15,
          y: 145.3,
          angle: -150,
          type: "toogle",
          color: "Purple",
          signalID: 1,
        },
        {
          name: "Pivot",
          x: 305.9,
          y: 133.25,
          type: "gear",
          color: "Purple",
          gearMaxAngle: 260,
          gearPower: 5,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 1,
        },
        {
          name: "Platform",
          type: "static",
          x: 648.15,
          y: 136.15,
          density: 1,
          width: 159.7,
          angle: 30,
        },
        { name: "Rock", x: 682, y: 55.85, density: 20 },
        {
          name: "Platform",
          type: "static",
          x: 64.05,
          y: 245.75,
          density: 1,
          width: 120.3,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 106.55,
          y: 181.85,
          density: 1,
          width: 43.8,
          angle: -90,
        },
        {
          name: "Platform",
          type: "static",
          x: 146.55,
          y: 181.85,
          density: 1,
          width: 43.8,
          angle: -90,
        },
        {
          name: "Platform",
          type: "static",
          x: 188.05,
          y: 245.4,
          density: 1,
          width: 119.6,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 166.65,
          y: 154.55,
          density: 1,
          width: 56.8,
          angle: -15,
        },
        {
          name: "Switcher",
          x: 158.6,
          y: 288.7,
          angle: 0,
          type: "button",
          color: "Yellow",
          signalID: 2,
        },
        {
          name: "Platform",
          type: "static",
          x: 126.55,
          y: 328.85,
          density: 1,
          width: 142.7,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 158.4,
          y: 296.8,
          density: 1,
          width: 78.5,
          angle: 0,
        },
        {
          name: "Swings",
          x: 126.55,
          y: 243.1,
          angle: 20,
          lowerAngle: -20,
          upperAngle: 20,
        },
        {
          name: "Platform",
          type: "static",
          x: 91.05,
          y: 157.8,
          density: 1,
          width: 43.8,
          angle: 15,
        },
        {
          name: "Platform",
          type: "static",
          x: 167.8,
          y: 194.8,
          density: 1,
          width: 60.5,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 85.1,
          y: 194.8,
          density: 1,
          width: 60,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 74.5,
          y: 97.5,
          density: 1,
          width: 129.5,
          angle: 90,
        },
        {
          name: "Platform",
          type: "dynamic",
          x: 330.45,
          y: 394.85,
          density: 1,
          width: 92.7,
          angle: 0,
        },
        {
          name: "Pivot",
          x: 294.5,
          y: 394.05,
          type: "gear",
          color: "Yellow",
          gearMaxAngle: -90,
          gearPower: -5,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 2,
        },
        {
          name: "Platform",
          type: "static",
          x: 710.8,
          y: 129,
          density: 1,
          width: 105.6,
          angle: 90,
        },
        { name: "Star", x: 95.85, y: 347 },
        { name: "Star", x: 574.3, y: 129 },
        { name: "Star", x: 191.4, y: 170.6 },
      ],
    },
    {
      items: [
        {
          name: "Platform",
          type: "static",
          x: 547.45,
          y: 17.3,
          density: 1,
          width: 318,
          angle: 0,
        },
        { name: "Basket", x: 545.05, y: 160.5 },
        {
          name: "Cannon",
          x: 235.75,
          y: 280.1,
          lowerAngle: -70,
          upperAngle: 70,
        },
        {
          name: "Platform",
          type: "static",
          x: 17.45,
          y: 172.15,
          density: 1,
          width: 151.5,
          angle: -90,
        },
        {
          name: "Platform",
          type: "static",
          x: 201.05,
          y: 331,
          density: 1,
          width: 205,
          angle: 0,
        },
        {
          name: "Platform",
          type: "dynamic",
          x: 395.6,
          y: 85.9,
          density: 0.1,
          width: 156.4,
          angle: 90,
        },
        {
          name: "Pivot",
          x: 395.45,
          y: 16,
          type: "gear",
          color: "Blue",
          gearMaxAngle: 180,
          gearPower: 6,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 2,
        },
        {
          name: "Mill",
          x: 373.95,
          y: 381.95,
          enableMotor: !0,
          motorSpeed: -5,
          signalID: 1,
        },
        { name: "Box", x: 545.2, y: 70.45, angle: 0, density: 0.3 },
        { name: "Box", x: 544.55, y: 116.35, angle: 0, density: 0.3 },
        {
          name: "Platform",
          type: "static",
          x: 417.05,
          y: 288.1,
          density: 1,
          width: 578.2,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 552.45,
          y: 390.6,
          density: 1,
          width: 192.3,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 639.45,
          y: 411.1,
          density: 1,
          width: 59.6,
          angle: -90,
        },
        {
          name: "Platform",
          type: "static",
          x: 697.7,
          y: 224.4,
          density: 1,
          width: 433.4,
          angle: -90,
        },
        {
          name: "Switcher",
          x: 668.65,
          y: 424.8,
          angle: 0,
          type: "button",
          color: "Blue",
          signalID: 2,
        },
        {
          name: "Platform",
          type: "static",
          x: 668.75,
          y: 431.85,
          density: 1,
          width: 76.1,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 64.45,
          y: 179.85,
          density: 1,
          width: 94.6,
          angle: -90,
        },
        {
          name: "Platform",
          type: "static",
          x: 518.4,
          y: 149.65,
          density: 1,
          width: 21.1,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 570.4,
          y: 149.65,
          density: 1,
          width: 21,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 396.4,
          y: 234.25,
          density: 1,
          width: 127.6,
          angle: -90,
        },
        {
          name: "Switcher",
          x: 65.5,
          y: 69.4,
          angle: -30,
          type: "toogle",
          color: "Green",
          signalID: 1,
        },
        {
          name: "Platform",
          type: "static",
          x: 70.8,
          y: 75.6,
          density: 1,
          width: 132.6,
          angle: -30,
        },
        {
          name: "Platform",
          type: "static",
          x: 61.3,
          y: 284.95,
          density: 1,
          width: 140.2,
          angle: 45,
        },
        {
          name: "Platform",
          type: "static",
          x: 100.45,
          y: 254.75,
          density: 1,
          width: 111.3,
          angle: 45,
        },
        { name: "Star", x: 425.3, y: 43 },
        { name: "Star", x: 21.35, y: 68 },
        { name: "Star", x: 668.3, y: 358.95 },
      ],
    },
    {
      items: [
        {
          name: "Platform",
          type: "static",
          x: 66.35,
          y: 240.55,
          density: 1,
          width: 18,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 35.95,
          y: 378.2,
          density: 1,
          width: 99.5,
          angle: -90,
        },
        {
          name: "Platform",
          type: "static",
          x: 538.3,
          y: 235.7,
          density: 1,
          width: 18,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 499.15,
          y: 177.3,
          density: 1,
          width: 18,
          angle: 0,
        },
        {
          name: "Switcher",
          x: 647.35,
          y: 157.65,
          angle: -45,
          type: "button",
          color: "Red",
          signalID: 2,
        },
        {
          name: "Platform",
          type: "static",
          x: 673.55,
          y: 142.85,
          density: 1,
          width: 101.1,
          angle: -45,
        },
        { name: "Basket", x: 393.2, y: 360.5 },
        {
          name: "Platform",
          type: "static",
          x: 478.65,
          y: 313.1,
          density: 1,
          width: 152,
          angle: -45,
        },
        {
          name: "Cannon",
          x: 293.75,
          y: 406.05,
          lowerAngle: -70,
          upperAngle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 331.75,
          y: 276.45,
          density: 1,
          width: 296.9,
          angle: -90,
        },
        {
          name: "Teleport",
          x: 68.8,
          y: 375.1,
          angle: 0,
          color: "Blue",
          id: 0,
          mulVel: 1,
        },
        {
          name: "Platform",
          type: "dynamic",
          x: 537.05,
          y: 171.6,
          density: 0.2,
          width: 149.7,
          angle: 90,
        },
        {
          name: "Teleport",
          x: 653.3,
          y: 87.5,
          angle: -135,
          color: "Blue",
          id: 0,
          mulVel: 1.4,
        },
        {
          name: "Platform",
          type: "static",
          x: 420.55,
          y: 201.35,
          density: 1,
          width: 195.1,
          angle: 0,
        },
        {
          name: "Pivot",
          x: 538.3,
          y: 235.7,
          type: "bolt",
          color: "Red",
          gearMaxAngle: 0,
          gearPower: 5,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 0,
        },
        {
          name: "Spring",
          x: 67.15,
          y: 240.7,
          angle: 45,
          type: "dynamic",
          elasticity: 3,
        },
        {
          name: "Platform",
          type: "static",
          x: 306.95,
          y: 136.55,
          density: 1,
          width: 70.1,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 181.95,
          y: 418.9,
          density: 1,
          width: 310,
          angle: 0,
        },
        {
          name: "Platform",
          type: "dynamic",
          x: 498.9,
          y: 118.2,
          density: 0.2,
          width: 137.7,
          angle: 90,
        },
        {
          name: "Pivot",
          x: 499.15,
          y: 177.3,
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
          x: 629.9,
          y: 64.95,
          density: 1,
          width: 108.1,
          angle: -45,
        },
        {
          name: "Pivot",
          x: 67.35,
          y: 240.3,
          type: "gear",
          color: "Red",
          gearMaxAngle: -10,
          gearPower: -8,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 2,
        },
        {
          name: "Platform",
          type: "static",
          x: 367.65,
          y: 31,
          density: 1,
          width: 691.9,
          angle: 0,
        },
        {
          name: "Switcher",
          x: 57.05,
          y: 74.45,
          angle: -135,
          type: "toogle",
          color: "Blue",
          signalID: 3,
        },
        {
          name: "Platform",
          type: "static",
          x: 123,
          y: 65.6,
          density: 1,
          width: 108.1,
          angle: -45,
        },
        {
          name: "Platform",
          type: "static",
          x: 59.85,
          y: 64.95,
          density: 1,
          width: 108.1,
          angle: 45,
        },
        {
          name: "Platform",
          type: "static",
          x: 704.65,
          y: 71.35,
          density: 1,
          width: 98.6,
          angle: -90,
        },
        {
          name: "Platform",
          type: "dynamic",
          x: 60.55,
          y: 334.95,
          density: 1,
          width: 66.1,
          angle: 0,
        },
        {
          name: "Pivot",
          x: 37.7,
          y: 335.7,
          type: "gear",
          color: "Blue",
          gearMaxAngle: -90,
          gearPower: -5,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 3,
        },
        {
          name: "Platform",
          type: "static",
          x: 476.9,
          y: 41.35,
          density: 1,
          width: 38.6,
          angle: -90,
        },
        {
          name: "Platform",
          type: "static",
          x: 346.3,
          y: 347,
          density: 1,
          width: 50.7,
          angle: 45,
        },
        {
          name: "Platform",
          type: "static",
          x: 21.5,
          y: 184.8,
          density: 1,
          width: 111.6,
          angle: -90,
        },
        { name: "Star", x: 309.35, y: 86 },
        { name: "Star", x: 17.35, y: 289.95 },
        { name: "Star", x: 20.35, y: 115 },
      ],
    },
    {
      items: [
        {
          name: "Platform",
          type: "static",
          x: 666.35,
          y: 379.9,
          density: 1,
          width: 97.9,
          angle: 90,
        },
        {
          name: "Spring",
          x: 172.9,
          y: 300.35,
          angle: -20,
          type: "static",
          elasticity: 2,
        },
        { name: "Basket", x: 197.35, y: 73.35 },
        {
          name: "Cannon",
          x: 357.55,
          y: 382.15,
          lowerAngle: -70,
          upperAngle: 70,
        },
        {
          name: "Platform",
          type: "static",
          x: 259.15,
          y: 137.15,
          density: 1,
          width: 185.8,
          angle: 0,
        },
        {
          name: "Switcher",
          x: 631.4,
          y: 432.2,
          angle: -30,
          type: "button",
          color: "Red",
          signalID: 2,
        },
        {
          name: "Platform",
          type: "static",
          x: 514.2,
          y: 337.15,
          density: 1,
          width: 51.8,
          angle: 0,
        },
        {
          name: "Platform",
          type: "dynamic",
          x: 611.4,
          y: 338.15,
          density: 0.1,
          width: 130.5,
          angle: 0,
        },
        {
          name: "Pivot",
          x: 667.1,
          y: 338.15,
          type: "gear",
          color: "Green",
          gearMaxAngle: 90,
          gearPower: 6,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 1,
        },
        {
          name: "Spring",
          x: 41.35,
          y: 190.3,
          angle: 30,
          type: "static",
          elasticity: 2.5,
        },
        {
          name: "Platform",
          type: "static",
          x: 640.2,
          y: 435.95,
          density: 1,
          width: 73.9,
          angle: 150,
        },
        { name: "Rock", x: 515, y: 304.2, density: 5 },
        {
          name: "Platform",
          type: "static",
          x: 174.95,
          y: 303.95,
          density: 1,
          width: 51.7,
          angle: -20,
        },
        {
          name: "Platform",
          type: "static",
          x: 54.95,
          y: 298.75,
          density: 1,
          width: 201.5,
          angle: -90,
        },
        {
          name: "Platform",
          type: "static",
          x: 107.95,
          y: 310.05,
          density: 1,
          width: 114.6,
          angle: -90,
        },
        {
          name: "Platform",
          type: "static",
          x: 366.75,
          y: 401.8,
          density: 1,
          width: 389,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 552.1,
          y: 405.9,
          density: 1,
          width: 96.1,
          angle: -90,
        },
        {
          name: "Platform",
          type: "static",
          x: 319.7,
          y: 446.2,
          density: 1,
          width: 361.6,
          angle: 0,
        },
        {
          name: "Switcher",
          x: 544.1,
          y: 430.95,
          angle: -90,
          type: "toogle",
          color: "Green",
          signalID: 1,
        },
        {
          name: "Platform",
          type: "static",
          x: 100.95,
          y: 418.15,
          density: 1,
          width: 118.4,
          angle: 30,
        },
        {
          name: "Platform",
          type: "static",
          x: 143.4,
          y: 379.05,
          density: 1,
          width: 92.4,
          angle: 30,
        },
        {
          name: "Platform",
          type: "static",
          x: 37.3,
          y: 193.5,
          density: 1,
          width: 58,
          angle: 30,
        },
        {
          name: "Platform",
          type: "static",
          x: 175.25,
          y: 169,
          density: 1,
          width: 81.7,
          angle: -90,
        },
        { name: "Star", x: 566.3, y: 46 },
        { name: "Star", x: 202.3, y: 168 },
        { name: "Star", x: 146.35, y: 342.95 },
        {
          name: "Platform",
          type: "static",
          x: 158.55,
          y: 18.15,
          density: 1,
          width: 18,
          angle: 0,
        },
        {
          name: "Platform",
          type: "dynamic",
          x: 158.4,
          y: 66.95,
          density: 1,
          width: 114.5,
          angle: 90,
        },
        {
          name: "Pivot",
          x: 158.55,
          y: 18.15,
          type: "gear",
          color: "Red",
          gearMaxAngle: 180,
          gearPower: 5,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 2,
        },
        {
          name: "Platform",
          type: "static",
          x: 237.25,
          y: 64.8,
          density: 1,
          width: 162.8,
          angle: -90,
        },
      ],
    },
    {
      items: [
        {
          name: "Platform",
          type: "static",
          x: 62.35,
          y: 423.55,
          density: 1,
          width: 18,
          angle: 0,
        },
        {
          name: "Switcher",
          x: 671.3,
          y: 355,
          angle: 180,
          type: "toogle",
          color: "Blue",
          signalID: 2,
        },
        { name: "Basket", x: 372.05, y: 180.85 },
        {
          name: "Mill",
          x: 600.95,
          y: 223.35,
          enableMotor: !0,
          motorSpeed: -7,
          signalID: 2,
        },
        {
          name: "Platform",
          type: "static",
          x: 482.45,
          y: 215.75,
          density: 1,
          width: 132.7,
          angle: -45,
        },
        {
          name: "Spring",
          x: 63,
          y: 421.65,
          angle: 0,
          type: "dynamic",
          elasticity: 4,
        },
        {
          name: "Switcher",
          x: 671.3,
          y: 339.3,
          angle: 0,
          type: "button",
          color: "Red",
          signalID: 1,
        },
        {
          name: "Platform",
          type: "static",
          x: 612.45,
          y: 86.1,
          density: 1,
          width: 117.2,
          angle: -45,
        },
        {
          name: "Platform",
          type: "static",
          x: 280.35,
          y: 117,
          density: 1,
          width: 382.9,
          angle: 0,
        },
        {
          name: "Spring",
          x: 25.45,
          y: 47.6,
          angle: 120,
          type: "static",
          elasticity: 3,
        },
        {
          name: "Cannon",
          x: 335.25,
          y: 437.7,
          lowerAngle: -70,
          upperAngle: 70,
        },
        {
          name: "Platform",
          type: "static",
          x: 670.4,
          y: 347.35,
          density: 1,
          width: 80.9,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 702.9,
          y: 198.5,
          density: 1,
          width: 317.2,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 97,
          y: 168,
          density: 1,
          width: 120,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 361.65,
          y: 252.95,
          density: 1,
          width: 181,
          angle: 0,
        },
        {
          name: "Pivot",
          x: 62.35,
          y: 421.3,
          type: "gear",
          color: "Red",
          gearMaxAngle: 35,
          gearPower: 5,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 1,
        },
        {
          name: "Platform",
          type: "static",
          x: 23.5,
          y: 45.95,
          density: 1,
          width: 46.5,
          angle: -60,
        },
        {
          name: "Platform",
          type: "static",
          x: 638.3,
          y: 333.5,
          density: 1,
          width: 47.1,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 442.2,
          y: 313.1,
          density: 1,
          width: 139.5,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 676.9,
          y: 48.35,
          density: 1,
          width: 69.9,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 497.4,
          y: 148,
          density: 1,
          width: 95.2,
          angle: 45,
        },
        {
          name: "Platform",
          type: "static",
          x: 23.95,
          y: 365.1,
          density: 1,
          width: 115.6,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 409.05,
          y: 149.45,
          density: 1,
          width: 83.1,
          angle: 90,
        },
        { name: "Star", x: 552.3, y: 145 },
        { name: "Star", x: 404.35, y: 444.95 },
        { name: "Star", x: 24.35, y: 284.95 },
      ],
    },
    {
      items: [
        {
          name: "Platform",
          type: "static",
          x: 494,
          y: 104.65,
          density: 1,
          width: 18,
          angle: 180,
        },
        {
          name: "Platform",
          type: "static",
          x: 129.65,
          y: 217.55,
          density: 1,
          width: 18,
          angle: 180,
        },
        {
          name: "Platform",
          type: "static",
          x: 60.95,
          y: 102.65,
          density: 1,
          width: 18,
          angle: 180,
        },
        {
          name: "Platform",
          type: "dynamic",
          x: 108.4,
          y: 101.9,
          density: 0.5,
          width: 114,
          angle: 0,
        },
        { name: "Basket", x: 606.75, y: 122.3 },
        { name: "Cannon", x: 404.25, y: 375, lowerAngle: -70, upperAngle: 70 },
        {
          name: "Platform",
          type: "dynamic",
          x: 559.5,
          y: 103.9,
          density: 0.1,
          width: 147.3,
          angle: 0,
        },
        {
          name: "Teleport",
          x: 554.3,
          y: 150.6,
          angle: 0,
          color: "Red",
          id: 0,
          mulVel: 1.5,
        },
        {
          name: "Teleport",
          x: 507.8,
          y: 163.8,
          angle: 180,
          color: "Red",
          id: 0,
          mulVel: 3,
        },
        {
          name: "Pivot",
          x: 494,
          y: 104.65,
          type: "gear",
          color: "Green",
          gearMaxAngle: -45,
          gearPower: -6,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 1,
        },
        {
          name: "Switcher",
          x: 118.5,
          y: 315.7,
          angle: -75,
          type: "button",
          color: "Green",
          signalID: 1,
        },
        {
          name: "Platform",
          type: "dynamic",
          x: 129.45,
          y: 170.1,
          density: 0.5,
          width: 118,
          angle: 90,
        },
        {
          name: "Pivot",
          x: 129.65,
          y: 216.55,
          type: "bolt",
          color: "Yellow",
          gearMaxAngle: -120,
          gearPower: -1,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 5,
        },
        {
          name: "Pivot",
          x: 61.95,
          y: 103.65,
          type: "bolt",
          color: "Red",
          gearMaxAngle: 0,
          gearPower: 6,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 124.95,
          y: 319,
          density: 1,
          width: 60,
          angle: 105,
        },
        {
          name: "Platform",
          type: "static",
          x: 644.9,
          y: 104.45,
          density: 1,
          width: 112.9,
          angle: 90,
        },
        { name: "Star", x: 40.35, y: 254.95 },
        { name: "Star", x: 57.55, y: 67.9 },
        { name: "Star", x: 644.1, y: 207 },
      ],
    },
    {
      items: [
        {
          name: "Platform",
          type: "static",
          x: 531.9,
          y: 170.2,
          density: 1,
          width: 18,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 643.25,
          y: 39.85,
          density: 1,
          width: 91.7,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 680,
          y: 248.7,
          density: 1,
          width: 433.9,
          angle: 90,
        },
        { name: "Basket", x: 642.15, y: 388.6 },
        {
          name: "Spring",
          x: 531.65,
          y: 171.15,
          angle: 0,
          type: "dynamic",
          elasticity: 2.8,
        },
        {
          name: "Platform",
          type: "static",
          x: 576.9,
          y: 456.35,
          density: 1,
          width: 225.9,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 64.5,
          y: 182.1,
          density: 1,
          width: 91.7,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 219.5,
          y: 182.1,
          density: 1,
          width: 91.7,
          angle: 90,
        },
        {
          name: "Swings",
          x: 142.55,
          y: 193.6,
          angle: -25,
          lowerAngle: -25,
          upperAngle: 25,
        },
        {
          name: "Platform",
          type: "static",
          x: 200.25,
          y: 317.8,
          density: 1,
          width: 57.7,
          angle: 90,
        },
        {
          name: "Switcher",
          x: 169.9,
          y: 330.9,
          angle: 0,
          type: "button",
          color: "Purple",
          signalID: 1,
        },
        {
          name: "Switcher",
          x: 110.4,
          y: 330.9,
          angle: 0,
          type: "button",
          color: "Green",
          signalID: 2,
        },
        {
          name: "Swings",
          x: 80.25,
          y: 272.45,
          angle: -25,
          lowerAngle: -25,
          upperAngle: 30,
        },
        {
          name: "Swings",
          x: 200.25,
          y: 272.45,
          angle: -30,
          lowerAngle: -30,
          upperAngle: 25,
        },
        {
          name: "Platform",
          type: "static",
          x: 140.25,
          y: 279.1,
          density: 1,
          width: 135.4,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 79.25,
          y: 317.9,
          density: 1,
          width: 58,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 43.4,
          y: 218.7,
          density: 1,
          width: 60.3,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 162.55,
          y: 128.6,
          density: 1,
          width: 50,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 121.55,
          y: 128.6,
          density: 1,
          width: 50,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 191.75,
          y: 144.95,
          density: 1,
          width: 75,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 93.65,
          y: 144.95,
          density: 1,
          width: 75.7,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 250.65,
          y: 218.7,
          density: 1,
          width: 80.2,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 21.25,
          y: 277.9,
          density: 1,
          width: 135,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 140.65,
          y: 337.9,
          density: 1,
          width: 138.8,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 94.3,
          y: 52.45,
          density: 1,
          width: 64.7,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 162.25,
          y: 28.1,
          density: 1,
          width: 152.7,
          angle: 0,
        },
        { name: "Cannon", x: 334.3, y: 447.5, lowerAngle: -70, upperAngle: 70 },
        {
          name: "Platform",
          type: "static",
          x: 281.8,
          y: 265.6,
          density: 1,
          width: 161,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 603.9,
          y: 143.8,
          density: 1,
          width: 225.9,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 603.9,
          y: 406.9,
          density: 1,
          width: 119,
          angle: 90,
        },
        {
          name: "Platform",
          type: "dynamic",
          x: 603.9,
          y: 290.85,
          density: 1,
          width: 99.9,
          angle: 90,
        },
        {
          name: "Pivot",
          x: 604.65,
          y: 249.3,
          type: "gear",
          color: "Purple",
          gearMaxAngle: 180,
          gearPower: 5,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 1,
        },
        {
          name: "Switcher",
          x: 251.25,
          y: 211.7,
          angle: 0,
          type: "button",
          color: "Blue",
          signalID: 3,
        },
        {
          name: "Pivot",
          x: 531.9,
          y: 169.2,
          type: "gear",
          color: "Blue",
          gearMaxAngle: -55,
          gearPower: -5,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 3,
        },
        {
          name: "Platform",
          type: "static",
          x: 107.65,
          y: 92.45,
          density: 1,
          width: 50,
          angle: -135,
        },
        { name: "Star", x: 141.15, y: 366.3 },
        { name: "Star", x: 50.35, y: 317.95 },
        { name: "Star", x: 579.3, y: 182.6 },
        {
          name: "Platform",
          type: "dynamic",
          x: 615.9,
          y: 369.2,
          density: 1,
          width: 40,
          angle: 0,
        },
        {
          name: "Pivot",
          x: 604.25,
          y: 368.4,
          type: "gear",
          color: "Green",
          gearMaxAngle: 40,
          gearPower: 5,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 2,
        },
        {
          name: "Platform",
          type: "dynamic",
          x: 668.85,
          y: 369.2,
          density: 1,
          width: 40,
          angle: 0,
        },
        {
          name: "Pivot",
          x: 680.25,
          y: 368.4,
          type: "gear",
          color: "Green",
          gearMaxAngle: -40,
          gearPower: -5,
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
          x: 547.55,
          y: 145,
          density: 1,
          width: 65.2,
          angle: 150,
        },
        {
          name: "Platform",
          type: "static",
          x: 229.55,
          y: 64.15,
          density: 1,
          width: 18,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 133.75,
          y: 268.85,
          density: 1,
          width: 18,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 251.95,
          y: 268.85,
          density: 1,
          width: 18,
          angle: 0,
        },
        { name: "Basket", x: 207.8, y: 148.9 },
        {
          name: "Platform",
          type: "static",
          x: 117.85,
          y: 423.05,
          density: 1,
          width: 100,
          angle: 0,
        },
        { name: "Box", x: 192.45, y: 253.6, angle: 0, density: 1 },
        {
          name: "Platform",
          type: "static",
          x: 571.15,
          y: 109.25,
          density: 1,
          width: 117.1,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 659.45,
          y: 106.75,
          density: 1,
          width: 117.3,
          angle: 90,
        },
        {
          name: "Cannon",
          x: 564.3,
          y: 410.85,
          lowerAngle: -70,
          upperAngle: 70,
        },
        {
          name: "Platform",
          type: "static",
          x: 346.95,
          y: 106.95,
          density: 1,
          width: 377.7,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 410.4,
          y: 158.95,
          density: 1,
          width: 342.7,
          angle: 0,
        },
        {
          name: "Platform",
          type: "dynamic",
          x: 207.65,
          y: 63.95,
          density: 1,
          width: 62.9,
          angle: 0,
        },
        {
          name: "Pivot",
          x: 229.55,
          y: 64.15,
          type: "gear",
          color: "Yellow",
          gearMaxAngle: 35,
          gearPower: 6,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 2,
        },
        {
          name: "Platform",
          type: "static",
          x: 158.1,
          y: 445.95,
          density: 1,
          width: 62.3,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 161.9,
          y: 468.1,
          density: 1,
          width: 25.8,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 310,
          y: 423.8,
          density: 1,
          width: 180,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 391.9,
          y: 358.65,
          density: 1,
          width: 148.3,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 320.95,
          y: 254.6,
          density: 1,
          width: 210.3,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 369.95,
          y: 406.1,
          density: 1,
          width: 65.2,
          angle: 150,
        },
        {
          name: "Platform",
          type: "dynamic",
          x: 156.9,
          y: 281.1,
          density: 1,
          width: 71.8,
          angle: 30,
        },
        {
          name: "Platform",
          type: "dynamic",
          x: 228.95,
          y: 281.1,
          density: 1,
          width: 71.8,
          angle: -30,
        },
        {
          name: "Pivot",
          x: 133.75,
          y: 268.85,
          type: "gear",
          color: "Green",
          gearMaxAngle: 90,
          gearPower: 6,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 1,
        },
        {
          name: "Pivot",
          x: 251.95,
          y: 268.85,
          type: "gear",
          color: "Green",
          gearMaxAngle: -90,
          gearPower: -6,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 1,
        },
        {
          name: "Switcher",
          x: 694.3,
          y: 189.4,
          angle: -90,
          type: "toogle",
          color: "Green",
          signalID: 1,
        },
        {
          name: "Switcher",
          x: 29.85,
          y: 410.25,
          angle: 90,
          type: "toogle",
          color: "Yellow",
          signalID: 2,
        },
        { name: "Ball", x: 190.55, y: 45.35 },
        {
          name: "Platform",
          type: "static",
          x: 615.7,
          y: 57.1,
          density: 1,
          width: 107.7,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 134.7,
          y: 209.4,
          density: 1,
          width: 241.8,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 247.1,
          y: 184.1,
          density: 1,
          width: 69.3,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 22.85,
          y: 315.6,
          density: 1,
          width: 229.4,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 229.1,
          y: 445.2,
          density: 1,
          width: 61.8,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 225.5,
          y: 467.1,
          density: 1,
          width: 26.8,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 702,
          y: 183.5,
          density: 1,
          width: 71.3,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 680.75,
          y: 156.85,
          density: 1,
          width: 60.5,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 167,
          y: 158.55,
          density: 1,
          width: 121.3,
          angle: 90,
        },
        { name: "Star", x: 391.35, y: 80 },
        { name: "Star", x: 194.35, y: 475.95 },
        { name: "Star", x: 617.35, y: 86.05 },
      ],
    },
    {
      items: [
        {
          name: "Platform",
          type: "static",
          x: 590.15,
          y: 174.75,
          density: 1,
          width: 18,
          angle: 0,
        },
        {
          name: "Platform",
          type: "dynamic",
          x: 590.15,
          y: 133.5,
          density: 1,
          width: 106.3,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 640.75,
          y: 199.4,
          density: 1,
          width: 18,
          angle: 0,
        },
        {
          name: "Switcher",
          x: 680.9,
          y: 207.8,
          angle: 180,
          type: "toogle",
          color: "Purple",
          signalID: 3,
        },
        { name: "Basket", x: 333.4, y: 404 },
        {
          name: "Pivot",
          x: 590.15,
          y: 174.75,
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
          x: 681.05,
          y: 192.65,
          angle: 0,
          type: "button",
          color: "Green",
          signalID: 1,
        },
        {
          name: "Mill",
          x: 187,
          y: 194,
          enableMotor: !0,
          motorSpeed: -5,
          signalID: 1,
        },
        {
          name: "Platform",
          type: "static",
          x: 314.3,
          y: 191.95,
          density: 1,
          width: 110.2,
          angle: -45,
        },
        {
          name: "Platform",
          type: "static",
          x: 309.7,
          y: 122.7,
          density: 1,
          width: 122.3,
          angle: 45,
        },
        {
          name: "Platform",
          type: "static",
          x: 91.95,
          y: 343.5,
          density: 1,
          width: 119.8,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 278,
          y: 268.4,
          density: 1,
          width: 96,
          angle: 90,
        },
        {
          name: "Switcher",
          x: 213,
          y: 318.25,
          angle: -15,
          type: "toogle",
          color: "Yellow",
          signalID: 2,
        },
        {
          name: "Platform",
          type: "static",
          x: 268.9,
          y: 375.9,
          density: 1,
          width: 62.1,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 392.9,
          y: 375.9,
          density: 1,
          width: 61.8,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 453.9,
          y: 39.65,
          density: 1,
          width: 496.1,
          angle: 0,
        },
        {
          name: "Cannon",
          x: 489.3,
          y: 312.45,
          lowerAngle: -70,
          upperAngle: 70,
        },
        {
          name: "Platform",
          type: "static",
          x: 680.55,
          y: 200.65,
          density: 1,
          width: 45,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 213.15,
          y: 325.8,
          density: 1,
          width: 149.4,
          angle: -15,
        },
        {
          name: "Platform",
          type: "dynamic",
          x: 640.55,
          y: 229.65,
          density: 1,
          width: 82,
          angle: 90,
        },
        {
          name: "Pivot",
          x: 640.75,
          y: 199.4,
          type: "gear",
          color: "Yellow",
          gearMaxAngle: 180,
          gearPower: 5,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 2,
        },
        {
          name: "Platform",
          type: "static",
          x: 120.25,
          y: 130.15,
          density: 1,
          width: 269.4,
          angle: -45,
        },
        {
          name: "Platform",
          type: "static",
          x: 260.25,
          y: 296.05,
          density: 1,
          width: 61,
          angle: -45,
        },
        { name: "Star", x: 690.3, y: 375.95 },
        { name: "Star", x: 89.35, y: 315.95 },
        { name: "Star", x: 678.3, y: 70 },
        {
          name: "Platform",
          type: "dynamic",
          x: 307,
          y: 375.9,
          density: 1,
          width: 40,
          angle: 0,
        },
        {
          name: "Pivot",
          x: 295.35,
          y: 375.1,
          type: "gear",
          color: "Purple",
          gearMaxAngle: 40,
          gearPower: 5,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 3,
        },
        {
          name: "Platform",
          type: "dynamic",
          x: 359.95,
          y: 375.9,
          density: 1,
          width: 40,
          angle: 0,
        },
        {
          name: "Pivot",
          x: 371.35,
          y: 375.1,
          type: "gear",
          color: "Purple",
          gearMaxAngle: -40,
          gearPower: -5,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 3,
        },
      ],
    },
    {
      items: [
        {
          name: "Platform",
          type: "static",
          x: 257.2,
          y: 240.45,
          density: 1,
          width: 408.7,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 602.95,
          y: 299.6,
          density: 1,
          width: 144.1,
          angle: 90,
        },
        { name: "Basket", x: 98.35, y: 407.3 },
        {
          name: "Cannon",
          x: 602.95,
          y: 205.55,
          lowerAngle: -70,
          upperAngle: 70,
        },
        {
          name: "Platform",
          type: "static",
          x: 205.55,
          y: 190.2,
          density: 1,
          width: 114.6,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 135.8,
          y: 203.65,
          density: 1,
          width: 365.9,
          angle: 90,
        },
        {
          name: "Switcher",
          x: 610.15,
          y: 351.6,
          angle: 90,
          type: "toogle",
          color: "Blue",
          signalID: 3,
        },
        {
          name: "Platform",
          type: "static",
          x: 61.5,
          y: 323.95,
          density: 1,
          width: 185,
          angle: 90,
        },
        {
          name: "Switcher",
          x: 596.35,
          y: 351.6,
          angle: -90,
          type: "toogle",
          color: "Green",
          signalID: 4,
        },
        {
          name: "Platform",
          type: "dynamic",
          x: 179.05,
          y: 142.3,
          density: 1,
          width: 65.8,
          angle: 0,
        },
        {
          name: "Pivot",
          x: 207.3,
          y: 142.35,
          type: "gear",
          color: "Blue",
          gearMaxAngle: 90,
          gearPower: 5,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 3,
        },
        {
          name: "Switcher",
          x: 102.7,
          y: 113.55,
          angle: 0,
          type: "button",
          color: "Green",
          signalID: 2,
        },
        {
          name: "Platform",
          type: "static",
          x: 493.5,
          y: 309.35,
          density: 1,
          width: 155.9,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 708.2,
          y: 209.55,
          density: 1,
          width: 353.8,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 68.6,
          y: 76,
          density: 1,
          width: 109.1,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 524.65,
          y: 377.95,
          density: 1,
          width: 77.3,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 680.05,
          y: 377.6,
          density: 1,
          width: 75.3,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 99.95,
          y: 121.3,
          density: 1,
          width: 79.7,
          angle: 180,
        },
        {
          name: "Platform",
          type: "static",
          x: 526.3,
          y: 344.85,
          density: 1,
          width: 92.9,
          angle: 45,
        },
        {
          name: "Platform",
          type: "static",
          x: 679.2,
          y: 345.5,
          density: 1,
          width: 85.6,
          angle: 135,
        },
        {
          name: "Platform",
          type: "static",
          x: 603.5,
          y: 218.65,
          density: 1,
          width: 72.9,
          angle: 0,
        },
        { name: "Star", x: 355.3, y: 54.45 },
        { name: "Star", x: 684.3, y: 57 },
        { name: "Star", x: 240.1, y: 188 },
        {
          name: "Teleport",
          x: 170.5,
          y: 195.6,
          angle: 0,
          color: "Red",
          id: 0,
          mulVel: 1,
        },
        {
          name: "Teleport",
          x: 102.6,
          y: 54.55,
          angle: 180,
          color: "Red",
          id: 0,
          mulVel: 1,
        },
        {
          name: "Mill",
          x: 229.45,
          y: 330.9,
          enableMotor: !0,
          motorSpeed: -5,
          signalID: 2,
        },
        {
          name: "Mill",
          x: 389.45,
          y: 330.9,
          enableMotor: !0,
          motorSpeed: -5,
          signalID: 4,
        },
        {
          name: "Platform",
          type: "static",
          x: 313.85,
          y: 420.4,
          density: 1,
          width: 377.8,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 437.1,
          y: 207.9,
          density: 1,
          width: 69.4,
          angle: 60,
        },
        {
          name: "Platform",
          type: "static",
          x: 476.7,
          y: 370.2,
          density: 1,
          width: 36.1,
          angle: 135,
        },
        {
          name: "Platform",
          type: "static",
          x: 509.75,
          y: 207.5,
          density: 1,
          width: 70.3,
          angle: -60,
        },
        {
          name: "Platform",
          type: "static",
          x: 603.5,
          y: 318.65,
          density: 1,
          width: 72.9,
          angle: 0,
        },
      ],
    },
    {
      items: [
        {
          name: "Platform",
          type: "static",
          x: 56.35,
          y: 124.35,
          density: 1,
          width: 18,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 459.3,
          y: 11.35,
          density: 1,
          width: 18,
          angle: 0,
        },
        {
          name: "Switcher",
          x: 631.55,
          y: 267.35,
          angle: -90,
          type: "toogle",
          color: "Blue",
          signalID: 1,
        },
        { name: "Basket", x: 674.55, y: 378.4 },
        {
          name: "Cannon",
          x: 484.25,
          y: 432.2,
          lowerAngle: -60,
          upperAngle: 70,
        },
        { name: "Box", x: 100.8, y: 339.2, angle: 0, density: 0.4 },
        { name: "Box", x: 100.8, y: 294.2, angle: 0, density: 0.4 },
        {
          name: "Platform",
          type: "static",
          x: 638.55,
          y: 290.7,
          density: 1,
          width: 327.6,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 709.15,
          y: 230.25,
          density: 1,
          width: 450.4,
          angle: -90,
        },
        {
          name: "Platform",
          type: "static",
          x: 56.7,
          y: 371.55,
          density: 1,
          width: 68,
          angle: 0,
        },
        {
          name: "Platform",
          type: "dynamic",
          x: 459.15,
          y: 62,
          density: 1,
          width: 120,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 697.75,
          y: 252,
          density: 1,
          width: 45,
          angle: -45,
        },
        {
          name: "Platform",
          type: "static",
          x: 655,
          y: 204.25,
          density: 1,
          width: 50,
          angle: 45,
        },
        {
          name: "Spring",
          x: 56.95,
          y: 126,
          angle: 0,
          type: "dynamic",
          elasticity: 4,
        },
        {
          name: "Platform",
          type: "static",
          x: 143.95,
          y: 371.9,
          density: 1,
          width: 68,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 100.95,
          y: 422.9,
          density: 1,
          width: 72,
          angle: 0,
        },
        {
          name: "Switcher",
          x: 99.95,
          y: 415.9,
          angle: 0,
          type: "button",
          color: "Red",
          signalID: 2,
        },
        {
          name: "Pivot",
          x: 56.35,
          y: 124.35,
          type: "gear",
          color: "Blue",
          gearMaxAngle: 75,
          gearPower: 5,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 1,
        },
        {
          name: "Platform",
          type: "static",
          x: 588.9,
          y: 267.4,
          density: 1,
          width: 81.9,
          angle: 90,
        },
        {
          name: "Pivot",
          x: 459.3,
          y: 11.35,
          type: "gear",
          color: "Red",
          gearMaxAngle: 0,
          gearPower: -5,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 2,
        },
        {
          name: "Platform",
          type: "static",
          x: 586.5,
          y: 447.5,
          density: 1,
          width: 267.1,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 536.55,
          y: 136,
          density: 1,
          width: 224,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 575.95,
          y: 219.9,
          density: 1,
          width: 50,
          angle: 45,
        },
        {
          name: "Platform",
          type: "static",
          x: 72.95,
          y: 397.35,
          density: 1,
          width: 68.8,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 127.95,
          y: 397.35,
          density: 1,
          width: 68.8,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 646.45,
          y: 10.2,
          density: 1,
          width: 143.2,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 413.95,
          y: 153.15,
          density: 1,
          width: 56.3,
          angle: -45,
        },
        { name: "Star", x: 592.3, y: 193 },
        { name: "Star", x: 31.35, y: 340.95 },
        { name: "Star", x: 424.3, y: 453.95 },
      ],
    },
    {
      items: [
        {
          name: "Platform",
          type: "static",
          x: 57.4,
          y: 144.15,
          density: 1,
          width: 206.7,
          angle: -90,
        },
        { name: "Basket", x: 657.85, y: 419.4 },
        {
          name: "Cannon",
          x: 572.7,
          y: 354.25,
          lowerAngle: -70,
          upperAngle: 70,
        },
        {
          name: "Platform",
          type: "static",
          x: 134.85,
          y: 330.6,
          density: 1,
          width: 249.3,
          angle: 49,
        },
        {
          name: "Platform",
          type: "static",
          x: 295.15,
          y: 422.95,
          density: 1,
          width: 177.3,
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
        { name: "Rock", x: 409.1, y: 45, density: 1 },
        { name: "Rock", x: 522.7, y: 45, density: 1 },
        {
          name: "Platform",
          type: "static",
          x: 690.15,
          y: 393.2,
          density: 1,
          width: 75,
          angle: 90,
        },
        {
          name: "Switcher",
          x: 621.8,
          y: 76.75,
          angle: 180,
          type: "toogle",
          color: "Blue",
          signalID: 1,
        },
        { name: "Star", x: 409.35, y: 432.35 },
        { name: "Star", x: 182.35, y: 170.65 },
        { name: "Star", x: 522, y: 432.35 },
        {
          name: "Platform",
          type: "static",
          x: 443.35,
          y: 83.2,
          density: 1,
          width: 18,
          angle: 0,
        },
        {
          name: "Platform",
          type: "dynamic",
          x: 419.65,
          y: 82.2,
          density: 2,
          width: 65.4,
          angle: 0,
        },
        {
          name: "Pivot",
          x: 443.35,
          y: 82.5,
          type: "gear",
          color: "Blue",
          gearMaxAngle: -90,
          gearPower: -7,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 1,
        },
        {
          name: "Platform",
          type: "static",
          x: 371.95,
          y: 90.55,
          density: 1,
          width: 142.4,
          angle: -90,
        },
        {
          name: "Platform",
          type: "static",
          x: 556.35,
          y: 83.2,
          density: 1,
          width: 18,
          angle: 0,
        },
        {
          name: "Platform",
          type: "dynamic",
          x: 532.7,
          y: 82.2,
          density: 2,
          width: 65.4,
          angle: 0,
        },
        {
          name: "Pivot",
          x: 556.35,
          y: 82.5,
          type: "gear",
          color: "Blue",
          gearMaxAngle: -90,
          gearPower: -7,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 1,
        },
        {
          name: "Platform",
          type: "static",
          x: 484.95,
          y: 88.55,
          density: 1,
          width: 142.4,
          angle: -90,
        },
        {
          name: "Switcher",
          x: 680.65,
          y: 76.95,
          angle: 180,
          type: "toogle",
          color: "Yellow",
          signalID: 2,
        },
        {
          name: "Platform",
          type: "static",
          x: 443.35,
          y: 152.2,
          density: 1,
          width: 18,
          angle: 0,
        },
        {
          name: "Platform",
          type: "dynamic",
          x: 419.65,
          y: 151.2,
          density: 2,
          width: 65.4,
          angle: 0,
        },
        {
          name: "Pivot",
          x: 443.35,
          y: 151.5,
          type: "gear",
          color: "Yellow",
          gearMaxAngle: -90,
          gearPower: -7,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 2,
        },
        {
          name: "Platform",
          type: "static",
          x: 556.35,
          y: 152.2,
          density: 1,
          width: 18,
          angle: 0,
        },
        {
          name: "Platform",
          type: "dynamic",
          x: 532.65,
          y: 151.2,
          density: 2,
          width: 65.4,
          angle: 0,
        },
        {
          name: "Pivot",
          x: 556.35,
          y: 151.5,
          type: "gear",
          color: "Yellow",
          gearMaxAngle: -90,
          gearPower: -7,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 2,
        },
        {
          name: "Platform",
          type: "static",
          x: 646.6,
          y: 69.1,
          density: 1,
          width: 146.8,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 579.95,
          y: 131.55,
          density: 1,
          width: 142.4,
          angle: -90,
        },
        {
          name: "Platform",
          type: "static",
          x: 626.1,
          y: 363.1,
          density: 1,
          width: 146.8,
          angle: 0,
        },
      ],
    },
    {
      items: [
        {
          name: "Platform",
          type: "static",
          x: 527.95,
          y: 137.75,
          density: 1,
          width: 18,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 146.75,
          y: 437.05,
          density: 1,
          width: 73.2,
          angle: -60,
        },
        {
          name: "Platform",
          type: "dynamic",
          x: 478.2,
          y: 138,
          density: 1,
          width: 120.7,
          angle: 0,
        },
        { name: "Basket", x: 509.85, y: 403.7 },
        { name: "Cannon", x: 216, y: 296.1, lowerAngle: -70, upperAngle: 70 },
        {
          name: "Switcher",
          x: 71.5,
          y: 441.9,
          angle: 60,
          type: "button",
          color: "Blue",
          signalID: 2,
        },
        {
          name: "Platform",
          type: "static",
          x: 215.85,
          y: 303.95,
          density: 1,
          width: 55.7,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 59.35,
          y: 436.8,
          density: 1,
          width: 74,
          angle: 60,
        },
        {
          name: "Pivot",
          x: 527.95,
          y: 137.75,
          type: "gear",
          color: "Red",
          gearMaxAngle: -55,
          gearPower: -5,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 1,
        },
        {
          name: "Spring",
          x: 383,
          y: 438.55,
          angle: -15,
          type: "static",
          elasticity: 3,
        },
        {
          name: "Spring",
          x: 398.2,
          y: 45.4,
          angle: -75,
          type: "static",
          elasticity: 2,
        },
        { name: "Box", x: 440.35, y: 107, angle: 0, density: 3 },
        {
          name: "Platform",
          type: "static",
          x: 88.9,
          y: 25.45,
          density: 1,
          width: 172,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 163.85,
          y: 68.95,
          density: 1,
          width: 206,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 11.85,
          y: 169.05,
          density: 1,
          width: 305.9,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 69.85,
          y: 190.45,
          density: 1,
          width: 261,
          angle: 90,
        },
        {
          name: "Switcher",
          x: 40.35,
          y: 305.3,
          angle: 0,
          type: "button",
          color: "Red",
          signalID: 1,
        },
        {
          name: "Platform",
          type: "static",
          x: 615.25,
          y: 140.5,
          density: 1,
          width: 267.1,
          angle: 90,
        },
        {
          name: "Teleport",
          x: 123.15,
          y: 123.2,
          angle: 150,
          color: "Red",
          id: 3,
          mulVel: 1,
        },
        {
          name: "Teleport",
          x: 655.3,
          y: 130.65,
          angle: 180,
          color: "Red",
          id: 3,
          mulVel: 1,
        },
        {
          name: "Platform",
          type: "static",
          x: 533.05,
          y: 347.55,
          density: 1,
          width: 227.3,
          angle: -45,
        },
        {
          name: "Platform",
          type: "static",
          x: 40.85,
          y: 313.05,
          density: 1,
          width: 75.9,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 382.95,
          y: 438.9,
          density: 1,
          width: 38.4,
          angle: -15,
        },
        {
          name: "Platform",
          type: "static",
          x: 400.95,
          y: 47,
          density: 1,
          width: 38.4,
          angle: -75,
        },
        { name: "Star", x: 102.35, y: 464.95 },
        { name: "Star", x: 526.3, y: 94 },
        { name: "Star", x: 418.2, y: 439.95 },
        {
          name: "Platform",
          type: "static",
          x: 620.65,
          y: 344.95,
          density: 1,
          width: 223.1,
          angle: -45,
        },
        {
          name: "Platform",
          type: "dynamic",
          x: 667.85,
          y: 227.8,
          density: 1,
          width: 120.7,
          angle: 60,
        },
        {
          name: "Pivot",
          x: 692.95,
          y: 270.75,
          type: "gear",
          color: "Blue",
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
          x: 35.8,
          y: 442.1,
          density: 1,
          width: 18,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 224.35,
          y: 282.3,
          density: 1,
          width: 18,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 112.2,
          y: 78.75,
          density: 1,
          width: 18,
          angle: 0,
        },
        {
          name: "Switcher",
          x: 675.4,
          y: 331.4,
          angle: -45,
          type: "button",
          color: "Red",
          signalID: 2,
        },
        {
          name: "Platform",
          type: "static",
          x: 195.95,
          y: 256.95,
          density: 1,
          width: 381.7,
          angle: 0,
        },
        { name: "Basket", x: 177.15, y: 338.4 },
        {
          name: "Platform",
          type: "dynamic",
          x: 143.35,
          y: 79.4,
          density: 0.2,
          width: 83,
          angle: 0,
        },
        {
          name: "Cannon",
          x: 452.5,
          y: 352.45,
          lowerAngle: -70,
          upperAngle: 70,
        },
        {
          name: "Spring",
          x: 34.8,
          y: 444.1,
          angle: -20,
          type: "dynamic",
          elasticity: 2.15,
        },
        {
          name: "Pivot",
          x: 112.2,
          y: 78.75,
          type: "bolt",
          color: "Blue",
          gearMaxAngle: 0,
          gearPower: 1,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 0,
        },
        {
          name: "Switcher",
          x: 45.35,
          y: 108.35,
          angle: 0,
          type: "button",
          color: "Blue",
          signalID: 1,
        },
        {
          name: "Platform",
          type: "dynamic",
          x: 262.05,
          y: 282.05,
          density: 1,
          width: 96,
          angle: 0,
        },
        {
          name: "Pivot",
          x: 224.35,
          y: 282.3,
          type: "gear",
          color: "Red",
          gearMaxAngle: 99,
          gearPower: 5,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 2,
        },
        {
          name: "Platform",
          type: "static",
          x: 198.8,
          y: 15.9,
          density: 1,
          width: 501.3,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 578.95,
          y: 159,
          density: 1,
          width: 70.5,
          angle: 45,
        },
        {
          name: "Platform",
          type: "static",
          x: 620.65,
          y: 136.75,
          density: 1,
          width: 70.6,
          angle: 45,
        },
        {
          name: "Platform",
          type: "static",
          x: 645.8,
          y: 370.35,
          density: 1,
          width: 161.8,
          angle: 135,
        },
        {
          name: "Platform",
          type: "static",
          x: 584.7,
          y: 367.9,
          density: 1,
          width: 52.1,
          angle: 135,
        },
        {
          name: "Platform",
          type: "static",
          x: 473.05,
          y: 383.65,
          density: 1,
          width: 199.9,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 264.45,
          y: 153.45,
          density: 1,
          width: 226.3,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 194.45,
          y: 99,
          density: 1,
          width: 25.9,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 44.75,
          y: 116.35,
          density: 1,
          width: 41.5,
          angle: 180,
        },
        {
          name: "Platform",
          type: "static",
          x: 599.7,
          y: 265.4,
          density: 1,
          width: 187,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 641.95,
          y: 264.95,
          density: 1,
          width: 230,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 340.8,
          y: 422.95,
          density: 1,
          width: 516.1,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 676.3,
          y: 107.9,
          density: 1,
          width: 70.6,
          angle: 45,
        },
        {
          name: "Platform",
          type: "static",
          x: 697.4,
          y: 223.75,
          density: 1,
          width: 201.1,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 378.8,
          y: 319.95,
          density: 1,
          width: 144,
          angle: 90,
        },
        { name: "Star", x: 554.3, y: 356.95 },
        { name: "Star", x: 303.35, y: 202.15 },
        { name: "Star", x: 693.3, y: 75 },
        {
          name: "Teleport",
          x: 231.05,
          y: 212.55,
          angle: 0,
          color: "Red",
          id: 3,
          mulVel: 1,
        },
        {
          name: "Teleport",
          x: 144.4,
          y: 130.3,
          angle: 0,
          color: "Red",
          id: 3,
          mulVel: 2,
        },
        {
          name: "Pivot",
          x: 35.8,
          y: 442.1,
          type: "gear",
          color: "Blue",
          gearMaxAngle: 20,
          gearPower: 5,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 1,
        },
      ],
    },
    {
      items: [
        {
          name: "Platform",
          type: "static",
          x: 510.9,
          y: 195,
          density: 1,
          width: 29.9,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 129.35,
          y: 208.35,
          density: 1,
          width: 18,
          angle: 0,
        },
        { name: "Basket", x: 652.2, y: 203.1 },
        {
          name: "Cannon",
          x: 480.25,
          y: 456.4,
          lowerAngle: -20,
          upperAngle: 70,
        },
        {
          name: "Platform",
          type: "static",
          x: 650,
          y: 438.65,
          density: 1,
          width: 138.2,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 710,
          y: 278.45,
          density: 1,
          width: 338,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 304.65,
          y: 465.25,
          density: 1,
          width: 589.4,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 214.85,
          y: 100.95,
          density: 1,
          width: 60.3,
          angle: -90,
        },
        {
          name: "Platform",
          type: "dynamic",
          x: 367.95,
          y: 103.9,
          density: 1,
          width: 260.6,
          angle: 0,
        },
        {
          name: "Platform",
          type: "dynamic",
          x: 231.1,
          y: 122.15,
          density: 1,
          width: 50.7,
          angle: 0,
        },
        {
          name: "Pivot",
          x: 213.95,
          y: 122.6,
          type: "gear",
          color: "Green",
          gearMaxAngle: 30,
          gearPower: 1,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 2,
        },
        {
          name: "Platform",
          type: "static",
          x: 549.5,
          y: 200,
          density: 1,
          width: 145,
          angle: 0,
        },
        {
          name: "Teleport",
          x: 209.55,
          y: 35.3,
          angle: 120,
          color: "Red",
          id: 1,
          mulVel: 1,
        },
        {
          name: "Teleport",
          x: 560.3,
          y: 252.15,
          angle: -135,
          color: "Red",
          id: 1,
          mulVel: 1,
        },
        {
          name: "Teleport",
          x: 33.2,
          y: 421.05,
          angle: 0,
          color: "Blue",
          id: 5,
          mulVel: 1.5,
        },
        {
          name: "Teleport",
          x: 261.8,
          y: 258,
          angle: 120,
          color: "Blue",
          id: 5,
          mulVel: 1,
        },
        {
          name: "Platform",
          type: "dynamic",
          x: 129,
          y: 258.4,
          density: 0.05,
          width: 120.9,
          angle: -90,
        },
        {
          name: "Pivot",
          x: 129.35,
          y: 209.35,
          type: "gear",
          color: "Purple",
          gearMaxAngle: 15,
          gearPower: 12,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 1,
        },
        {
          name: "Platform",
          type: "static",
          x: 214.7,
          y: 209,
          density: 1,
          width: 60.2,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 191.95,
          y: 179.95,
          density: 1,
          width: 221.9,
          angle: 90,
        },
        {
          name: "Switcher",
          x: 163.6,
          y: 225.95,
          angle: 0,
          type: "button",
          color: "Green",
          signalID: 2,
        },
        {
          name: "Platform",
          type: "static",
          x: 518.9,
          y: 70.45,
          density: 1,
          width: 122.9,
          angle: 90,
        },
        {
          name: "Platform",
          type: "dynamic",
          x: 507.4,
          y: 123.4,
          density: 1,
          width: 41.2,
          angle: 0,
        },
        {
          name: "Pivot",
          x: 520.3,
          y: 122.35,
          type: "gear",
          color: "Green",
          gearMaxAngle: -90,
          gearPower: -1,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 2,
        },
        {
          name: "Switcher",
          x: 453.4,
          y: 228.3,
          angle: 150,
          type: "toogle",
          color: "Purple",
          signalID: 1,
        },
        {
          name: "Spring",
          x: 643.05,
          y: 407.05,
          angle: -60,
          type: "static",
          elasticity: 4.2,
        },
        {
          name: "Platform",
          type: "static",
          x: 589.9,
          y: 451.9,
          density: 1,
          width: 43.9,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 646.4,
          y: 407.6,
          density: 1,
          width: 39.7,
          angle: 120,
        },
        {
          name: "Platform",
          type: "static",
          x: 451.05,
          y: 219.65,
          density: 1,
          width: 83.5,
          angle: -30,
        },
        {
          name: "Platform",
          type: "static",
          x: 612.95,
          y: 226.15,
          density: 1,
          width: 70.3,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 592.15,
          y: 221.75,
          density: 1,
          width: 68.2,
          angle: 45,
        },
        {
          name: "Platform",
          type: "static",
          x: 216.2,
          y: 245.8,
          density: 1,
          width: 95.4,
          angle: -60,
        },
        {
          name: "Platform",
          type: "static",
          x: 697.35,
          y: 190.2,
          density: 1,
          width: 43.2,
          angle: -45,
        },
        {
          name: "Platform",
          type: "static",
          x: 203.25,
          y: 78,
          density: 1,
          width: 40.6,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 172.7,
          y: 232.95,
          density: 1,
          width: 60.2,
          angle: 0,
        },
        { name: "Star", x: 682.3, y: 410.95 },
        { name: "Star", x: 685.35, y: 260.2 },
        { name: "Star", x: 33.35, y: 89 },
      ],
    },
    {
      items: [
        {
          name: "Platform",
          type: "static",
          x: 170.45,
          y: 116.6,
          density: 1,
          width: 18,
          angle: 0,
        },
        { name: "Basket", x: 598.6, y: 405.2 },
        {
          name: "Cannon",
          x: 291.6,
          y: 405.15,
          lowerAngle: -70,
          upperAngle: 70,
        },
        {
          name: "Platform",
          type: "static",
          x: 651.55,
          y: 350.35,
          density: 1,
          width: 209.5,
          angle: 90,
        },
        {
          name: "Spring",
          x: 170.6,
          y: 117.6,
          angle: 0,
          type: "dynamic",
          elasticity: 10,
        },
        {
          name: "Platform",
          type: "static",
          x: 40.4,
          y: 375.95,
          density: 1,
          width: 153.6,
          angle: -90,
        },
        {
          name: "Platform",
          type: "static",
          x: 651.45,
          y: 195.7,
          density: 1,
          width: 70.8,
          angle: -90,
        },
        { name: "Box", x: 537.75, y: 119.25, angle: 0, density: 0.6 },
        {
          name: "Platform",
          type: "static",
          x: 416.95,
          y: 150.95,
          density: 1,
          width: 284.5,
          angle: 0,
        },
        {
          name: "Platform",
          type: "dynamic",
          x: 59.75,
          y: 258.8,
          density: 1,
          width: 119,
          angle: -71,
        },
        {
          name: "Platform",
          type: "static",
          x: 101.5,
          y: 329.4,
          density: 1,
          width: 246.9,
          angle: 90,
        },
        {
          name: "Pivot",
          x: 44.3,
          y: 306.3,
          type: "gear",
          color: "Purple",
          gearMaxAngle: -110,
          gearPower: -5,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 2,
        },
        {
          name: "Switcher",
          x: 71.4,
          y: 435.85,
          angle: 0,
          type: "button",
          color: "Green",
          signalID: 3,
        },
        {
          name: "Switcher",
          x: 417.85,
          y: 193.4,
          angle: -135,
          type: "toogle",
          color: "Purple",
          signalID: 2,
        },
        {
          name: "Pivot",
          x: 170.45,
          y: 113.6,
          type: "gear",
          color: "Green",
          gearMaxAngle: 90,
          gearPower: 1,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 3,
        },
        {
          name: "Platform",
          type: "static",
          x: 638.9,
          y: 352.9,
          density: 1,
          width: 40.6,
          angle: 135,
        },
        {
          name: "Platform",
          type: "static",
          x: 459.9,
          y: 187,
          density: 1,
          width: 88.1,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 421.95,
          y: 186.35,
          density: 1,
          width: 107.7,
          angle: -135,
        },
        {
          name: "Platform",
          type: "static",
          x: 71.75,
          y: 443.85,
          density: 1,
          width: 80.7,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 549.8,
          y: 298.7,
          density: 1,
          width: 312,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 560.2,
          y: 353.15,
          density: 1,
          width: 40.6,
          angle: -135,
        },
        {
          name: "Platform",
          type: "static",
          x: 559.25,
          y: 394,
          density: 1,
          width: 40.6,
          angle: -135,
        },
        {
          name: "Platform",
          type: "static",
          x: 641.85,
          y: 397.9,
          density: 1,
          width: 40.6,
          angle: 135,
        },
        { name: "Star", x: 425.3, y: 433.95 },
        { name: "Star", x: 70.35, y: 351.95 },
        { name: "Star", x: 506.3, y: 243 },
        {
          name: "Platform",
          type: "static",
          x: 703.45,
          y: 120.15,
          density: 1,
          width: 221.9,
          angle: -90,
        },
      ],
    },
    {
      items: [
        {
          name: "Platform",
          type: "static",
          x: 338.05,
          y: 427.95,
          density: 1,
          width: 105.9,
          angle: -65,
        },
        {
          name: "Platform",
          type: "static",
          x: 189.1,
          y: 424.8,
          density: 1,
          width: 112.8,
          angle: 65,
        },
        {
          name: "Mill",
          x: 264.65,
          y: 380.35,
          enableMotor: !0,
          motorSpeed: 4,
          signalID: 2,
        },
        {
          name: "Platform",
          type: "static",
          x: 707.1,
          y: 355.9,
          density: 1,
          width: 207.8,
          angle: 90,
        },
        {
          name: "Switcher",
          x: 700.55,
          y: 174.35,
          angle: -90,
          type: "button",
          color: "Purple",
          signalID: 3,
        },
        { name: "Rock", x: 426.1, y: 348.2, density: 0.05 },
        {
          name: "Spring",
          x: 51.9,
          y: 437.35,
          angle: 15,
          type: "static",
          elasticity: 3.5,
        },
        {
          name: "Platform",
          type: "static",
          x: 637,
          y: 279.7,
          density: 1,
          width: 356.7,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 631.1,
          y: 451.35,
          density: 1,
          width: 177.8,
          angle: 0,
        },
        {
          name: "Cannon",
          x: 585.3,
          y: 442.55,
          lowerAngle: -70,
          upperAngle: 70,
        },
        {
          name: "Platform",
          type: "static",
          x: 377.65,
          y: 138.95,
          density: 1,
          width: 103.8,
          angle: 0,
        },
        {
          name: "Switcher",
          x: 583.45,
          y: 108.2,
          angle: -176,
          type: "toogle",
          color: "Yellow",
          signalID: 1,
        },
        {
          name: "Platform",
          type: "dynamic",
          x: 401.7,
          y: 383.15,
          density: 1,
          width: 106.2,
          angle: 0,
        },
        {
          name: "Pivot",
          x: 359.75,
          y: 382.9,
          type: "gear",
          color: "Yellow",
          gearMaxAngle: -65,
          gearPower: -10,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 1,
        },
        { name: "Basket", x: 298.35, y: 123.7 },
        {
          name: "Platform",
          type: "static",
          x: 261.45,
          y: 111,
          density: 1,
          width: 81.6,
          angle: 90,
        },
        {
          name: "Switcher",
          x: 674.3,
          y: 443.3,
          angle: 0,
          type: "button",
          color: "Green",
          signalID: 2,
        },
        {
          name: "Platform",
          type: "static",
          x: 708,
          y: 100.9,
          density: 1,
          width: 191.8,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 138.05,
          y: 389.3,
          density: 1,
          width: 83.7,
          angle: 165,
        },
        {
          name: "Platform",
          type: "static",
          x: 51.9,
          y: 437.35,
          density: 1,
          width: 47.6,
          angle: 15,
        },
        {
          name: "Platform",
          type: "static",
          x: 449.15,
          y: 92.1,
          density: 1,
          width: 394.6,
          angle: 4,
        },
        {
          name: "Platform",
          type: "static",
          x: 647.4,
          y: 438.55,
          density: 1,
          width: 36.9,
          angle: -135,
        },
        {
          name: "Platform",
          type: "static",
          x: 698.3,
          y: 439.3,
          density: 1,
          width: 36.9,
          angle: -45,
        },
        {
          name: "Platform",
          type: "dynamic",
          x: 422.3,
          y: 127.15,
          density: 1,
          width: 44.9,
          angle: 90,
        },
        {
          name: "Pivot",
          x: 422.3,
          y: 139.35,
          type: "gear",
          color: "Purple",
          gearMaxAngle: 270,
          gearPower: 1,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 3,
        },
        { name: "Star", x: 281.35, y: 472.95 },
        { name: "Star", x: 342.3, y: 171 },
        { name: "Star", x: 149.35, y: 164 },
      ],
    },
    {
      items: [
        {
          name: "Platform",
          type: "static",
          x: 668.7,
          y: 152.7,
          density: 1,
          width: 254.9,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 510.75,
          y: 413.85,
          density: 1,
          width: 18,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 530.15,
          y: 199.2,
          density: 1,
          width: 18,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 413.65,
          y: 159.6,
          density: 1,
          width: 18,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 256.95,
          y: 109.25,
          density: 1,
          width: 18,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 370.1,
          y: 28.65,
          density: 1,
          width: 618,
          angle: 0,
        },
        { name: "Basket", x: 624.75, y: 207.7 },
        { name: "Cannon", x: 105.5, y: 379, lowerAngle: -70, upperAngle: 70 },
        {
          name: "Platform",
          type: "static",
          x: 453.4,
          y: 271.15,
          density: 1,
          width: 441.8,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 69.5,
          y: 240.6,
          density: 1,
          width: 443,
          angle: 90,
        },
        {
          name: "Platform",
          type: "dynamic",
          x: 510.75,
          y: 410.85,
          density: 1,
          width: 71.3,
          angle: -15,
        },
        { name: "Rock", x: 509.45, y: 376.35, density: 0.05 },
        {
          name: "Platform",
          type: "static",
          x: 453,
          y: 370.7,
          density: 1,
          width: 216.8,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 574.7,
          y: 370.45,
          density: 1,
          width: 216.9,
          angle: 90,
        },
        {
          name: "Switcher",
          x: 566.7,
          y: 380.3,
          angle: -90,
          type: "button",
          color: "Red",
          signalID: 1,
        },
        {
          name: "Switcher",
          x: 461,
          y: 380.85,
          angle: 90,
          type: "button",
          color: "Blue",
          signalID: 2,
        },
        {
          name: "Switcher",
          x: 212.4,
          y: 258.4,
          angle: -128,
          type: "toogle",
          color: "Green",
          signalID: 3,
        },
        {
          name: "Platform",
          type: "static",
          x: 295.6,
          y: 318.1,
          density: 1,
          width: 112.9,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 219,
          y: 253.5,
          density: 1,
          width: 258.1,
          angle: 52,
        },
        {
          name: "Platform",
          type: "static",
          x: 139.4,
          y: 130.1,
          density: 1,
          width: 60,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 185.4,
          y: 104.55,
          density: 1,
          width: 109.9,
          angle: 0,
        },
        {
          name: "Platform",
          type: "dynamic",
          x: 257.8,
          y: 173.65,
          density: 1,
          width: 155.2,
          angle: 90,
        },
        {
          name: "Pivot",
          x: 256.95,
          y: 109.25,
          type: "gear",
          color: "Red",
          gearMaxAngle: 0,
          gearPower: -10,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 1,
        },
        {
          name: "Platform",
          type: "static",
          x: 358.45,
          y: 469.9,
          density: 1,
          width: 94,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 274.3,
          y: 428.65,
          density: 1,
          width: 130.1,
          angle: 45,
        },
        {
          name: "Switcher",
          x: 425.45,
          y: 479.85,
          angle: 0,
          type: "button",
          color: "Yellow",
          signalID: 4,
        },
        {
          name: "Platform",
          type: "dynamic",
          x: 530.05,
          y: 223.1,
          density: 1,
          width: 70.2,
          angle: 90,
        },
        {
          name: "Platform",
          type: "dynamic",
          x: 413.5,
          y: 201.7,
          density: 1,
          width: 107.2,
          angle: 90,
        },
        {
          name: "Pivot",
          x: 413.65,
          y: 159.25,
          type: "gear",
          color: "Yellow",
          gearMaxAngle: 0,
          gearPower: -10,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 4,
        },
        {
          name: "Pivot",
          x: 530.15,
          y: 199.2,
          type: "gear",
          color: "Blue",
          gearMaxAngle: 0,
          gearPower: -6,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 2,
        },
        {
          name: "Spring",
          x: 76.55,
          y: 41.15,
          angle: 120,
          type: "static",
          elasticity: 1,
        },
        {
          name: "Platform",
          type: "static",
          x: 431.35,
          y: 406.75,
          density: 1,
          width: 63,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 76.55,
          y: 38.95,
          density: 1,
          width: 36.3,
          angle: 120,
        },
        {
          name: "Platform",
          type: "static",
          x: 548.9,
          y: 470.1,
          density: 1,
          width: 211.6,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 96.3,
          y: 387.85,
          density: 1,
          width: 72.5,
          angle: 0,
        },
        { name: "Star", x: 370.3, y: 244 },
        { name: "Star", x: 151.35, y: 421 },
        { name: "Star", x: 342.2, y: 444.8 },
        {
          name: "Pivot",
          x: 510.75,
          y: 410.85,
          type: "gear",
          color: "Green",
          gearMaxAngle: 15,
          gearPower: 12,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 3,
        },
      ],
    },
    {
      items: [
        {
          name: "Platform",
          type: "static",
          x: 574.3,
          y: 451.3,
          density: 1,
          width: 18,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 473.75,
          y: 102.3,
          density: 1,
          width: 18,
          angle: 0,
        },
        {
          name: "Cannon",
          x: 352.6,
          y: 316.05,
          lowerAngle: -52,
          upperAngle: 70,
        },
        { name: "Basket", x: 614.35, y: 431.8 },
        {
          name: "Teleport",
          x: 64.7,
          y: 147,
          angle: 90,
          color: "Blue",
          id: 1,
          mulVel: 1.4,
        },
        {
          name: "Teleport",
          x: 665.15,
          y: 418.85,
          angle: -90,
          color: "Red",
          id: 2,
          mulVel: 3,
        },
        {
          name: "Switcher",
          x: 381.9,
          y: 99.1,
          angle: 15,
          type: "button",
          color: "Purple",
          signalID: 2,
        },
        {
          name: "Spring",
          x: 605.05,
          y: 156.95,
          angle: -42,
          type: "static",
          elasticity: 2,
        },
        {
          name: "Teleport",
          x: 665.8,
          y: 40.25,
          angle: 180,
          color: "Blue",
          id: 1,
          mulVel: 1.4,
        },
        {
          name: "Platform",
          type: "dynamic",
          x: 542.5,
          y: 451.1,
          density: 1,
          width: 81,
          angle: 0,
        },
        {
          name: "Pivot",
          x: 574.3,
          y: 451.3,
          type: "gear",
          color: "Purple",
          gearMaxAngle: 90,
          gearPower: 6,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 2,
        },
        {
          name: "Platform",
          type: "static",
          x: 625.95,
          y: 168.95,
          density: 1,
          width: 262,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 704.95,
          y: 182.9,
          density: 1,
          width: 298,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 485.15,
          y: 367.5,
          density: 1,
          width: 305.1,
          angle: 0,
        },
        {
          name: "Teleport",
          x: 64.15,
          y: 448.3,
          angle: 0,
          color: "Red",
          id: 2,
          mulVel: 1.4,
        },
        {
          name: "Platform",
          type: "static",
          x: 169.35,
          y: 431.2,
          density: 1,
          width: 156.1,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 447.9,
          y: 323.9,
          density: 1,
          width: 257.1,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 135.5,
          y: 376.9,
          density: 1,
          width: 234.1,
          angle: 0,
        },
        {
          name: "Platform",
          type: "dynamic",
          x: 473.75,
          y: 61.05,
          density: 1,
          width: 104.3,
          angle: 90,
        },
        {
          name: "Pivot",
          x: 473.75,
          y: 101.3,
          type: "bolt",
          color: "Red",
          gearMaxAngle: 0,
          gearPower: 1,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 0,
        },
        {
          name: "Mill",
          x: 153,
          y: 83,
          enableMotor: !0,
          motorSpeed: -6,
          signalID: 3,
        },
        {
          name: "Platform",
          type: "static",
          x: 130.5,
          y: 173,
          density: 1,
          width: 83.1,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 343.15,
          y: 23.9,
          density: 1,
          width: 224.9,
          angle: 90,
        },
        {
          name: "Switcher",
          x: 374.75,
          y: 112.5,
          angle: -165,
          type: "toogle",
          color: "Green",
          signalID: 3,
        },
        {
          name: "Platform",
          type: "dynamic",
          x: 299.75,
          y: 397.25,
          density: 1,
          width: 111,
          angle: -34,
        },
        {
          name: "Pivot",
          x: 337,
          y: 371.55,
          type: "gear",
          color: "Green",
          gearMaxAngle: -90,
          gearPower: -8,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 3,
        },
        {
          name: "Platform",
          type: "static",
          x: 17.5,
          y: 149.15,
          density: 1,
          width: 65,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 599.9,
          y: 307.95,
          density: 1,
          width: 73.3,
          angle: 150,
        },
        {
          name: "Platform",
          type: "static",
          x: 285.8,
          y: 351.1,
          density: 1,
          width: 101.1,
          angle: -34,
        },
        {
          name: "Platform",
          type: "static",
          x: 665.35,
          y: 345.15,
          density: 1,
          width: 102.3,
          angle: -30,
        },
        {
          name: "Platform",
          type: "static",
          x: 689.15,
          y: 161.6,
          density: 1,
          width: 49.9,
          angle: 150,
        },
        {
          name: "Platform",
          type: "static",
          x: 642.6,
          y: 109.4,
          density: 1,
          width: 52.7,
          angle: 30,
        },
        {
          name: "Platform",
          type: "static",
          x: 609,
          y: 153.85,
          density: 1,
          width: 51.9,
          angle: 137,
        },
        {
          name: "Platform",
          type: "static",
          x: 413.15,
          y: 115.05,
          density: 1,
          width: 158.5,
          angle: 15,
        },
        { name: "Star", x: 27.35, y: 268.95 },
        { name: "Star", x: 259.35, y: 465.95 },
        { name: "Star", x: 369.35, y: 50 },
        {
          name: "Platform",
          type: "static",
          x: 27.9,
          y: 409.45,
          density: 1,
          width: 75.1,
          angle: 90,
        },
      ],
    },
    {
      items: [
        {
          name: "Platform",
          type: "static",
          x: 191.75,
          y: 101.75,
          density: 1,
          width: 56.7,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 211.05,
          y: 9.95,
          density: 1,
          width: 206.7,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 443.7,
          y: 9.95,
          density: 1,
          width: 153.8,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 32.25,
          y: 436.9,
          density: 1,
          width: 18,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 350.6,
          y: 78.95,
          density: 1,
          width: 335.7,
          angle: 0,
        },
        { name: "Rock", x: 549, y: 348.75, density: 1.4 },
        {
          name: "Cannon",
          x: 380.05,
          y: 422.15,
          lowerAngle: -70,
          upperAngle: 70,
        },
        {
          name: "Platform",
          type: "static",
          x: 614,
          y: 424.7,
          density: 1,
          width: 94.9,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 199.45,
          y: 359.05,
          density: 1,
          width: 234.7,
          angle: 90,
        },
        {
          name: "Spring",
          x: 32.25,
          y: 437.65,
          angle: 0,
          type: "dynamic",
          elasticity: 2,
        },
        {
          name: "Platform",
          type: "dynamic",
          x: 575.4,
          y: 386.05,
          density: 0.1,
          width: 95,
          angle: 0,
        },
        {
          name: "Pivot",
          x: 613.3,
          y: 386.2,
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
          type: "static",
          x: 671.95,
          y: 305.05,
          density: 1,
          width: 66.6,
          angle: -90,
        },
        {
          name: "Switcher",
          x: 664.25,
          y: 304.75,
          angle: -90,
          type: "button",
          color: "Red",
          signalID: 1,
        },
        { name: "Basket", x: 155.75, y: 68.45 },
        {
          name: "Switcher",
          x: 505,
          y: 246,
          angle: -90,
          type: "toogle",
          color: "Green",
          signalID: 2,
        },
        {
          name: "Pivot",
          x: 32.25,
          y: 436.9,
          type: "gear",
          color: "Blue",
          gearMaxAngle: 30,
          gearPower: 5,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 3,
        },
        {
          name: "Platform",
          type: "static",
          x: 133.5,
          y: 273,
          density: 1,
          width: 68.7,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 465.9,
          y: 222.1,
          density: 1,
          width: 162.7,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 512,
          y: 175.6,
          density: 1,
          width: 350.8,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 517.9,
          y: 409,
          density: 1,
          width: 30.1,
          angle: 0,
        },
        { name: "Star", x: 218.45, y: 107.05 },
        { name: "Star", x: 234.35, y: 439.8 },
        { name: "Star", x: 53.35, y: 160 },
        {
          name: "Teleport",
          x: 465,
          y: 44.6,
          angle: -90,
          color: "Blue",
          id: 1,
          mulVel: 4,
        },
        {
          name: "Platform",
          type: "dynamic",
          x: 374.1,
          y: 31.05,
          density: 0.5,
          width: 61,
          angle: -90,
        },
        {
          name: "Pivot",
          x: 374.3,
          y: 10.2,
          type: "gear",
          color: "Red",
          gearMaxAngle: 0,
          gearPower: 5,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 1,
        },
        {
          name: "Platform",
          type: "dynamic",
          x: 73.95,
          y: 10.1,
          density: 0.5,
          width: 94,
          angle: 0,
        },
        {
          name: "Pivot",
          x: 114.3,
          y: 10.2,
          type: "gear",
          color: "Green",
          gearMaxAngle: -90,
          gearPower: -5,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 2,
        },
        {
          name: "Teleport",
          x: 165.75,
          y: 438.2,
          angle: 0,
          color: "Blue",
          id: 1,
          mulVel: 1.4,
        },
        {
          name: "Teleport",
          x: 564.95,
          y: 438.2,
          angle: 0,
          color: "Red",
          id: 2,
          mulVel: 2,
        },
        {
          name: "Teleport",
          x: 294.9,
          y: 124.65,
          angle: 180,
          color: "Red",
          id: 2,
          mulVel: 1,
        },
        {
          name: "Platform",
          type: "static",
          x: 133.5,
          y: 429.5,
          density: 1,
          width: 91.7,
          angle: 90,
        },
        {
          name: "Switcher",
          x: 207.2,
          y: 266,
          angle: 90,
          type: "toogle",
          color: "Blue",
          signalID: 3,
        },
        {
          name: "Platform",
          type: "static",
          x: 512,
          y: 439.7,
          density: 1,
          width: 72.8,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 166.45,
          y: 247.25,
          density: 1,
          width: 83.9,
          angle: 0,
        },
      ],
    },
    {
      items: [
        {
          name: "Platform",
          type: "static",
          x: 228.4,
          y: 96.1,
          density: 1,
          width: 210.1,
          angle: 15,
        },
        {
          name: "Switcher",
          x: 143,
          y: 238.35,
          angle: 90,
          type: "toogle",
          color: "Green",
          signalID: 2,
        },
        { name: "Basket", x: 446.45, y: 203.9 },
        {
          name: "Platform",
          type: "static",
          x: 705,
          y: 224.7,
          density: 1,
          width: 445.6,
          angle: -90,
        },
        {
          name: "Cannon",
          x: 398.75,
          y: 386.45,
          lowerAngle: -70,
          upperAngle: 70,
        },
        {
          name: "Mill",
          x: 511.95,
          y: 81,
          enableMotor: !0,
          motorSpeed: 6,
          signalID: 2,
        },
        {
          name: "Spring",
          x: 55,
          y: 450.65,
          angle: 0,
          type: "static",
          elasticity: 5,
        },
        {
          name: "Spring",
          x: 687.2,
          y: 449.35,
          angle: -30,
          type: "static",
          elasticity: 3.4,
        },
        {
          name: "Platform",
          type: "static",
          x: 529.45,
          y: 169,
          density: 1,
          width: 195,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 42.5,
          y: 35.95,
          density: 1,
          width: 86.8,
          angle: -45,
        },
        {
          name: "Platform",
          type: "static",
          x: 332.15,
          y: 266.4,
          density: 1,
          width: 309.2,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 135,
          y: 168.5,
          density: 1,
          width: 197,
          angle: 90,
        },
        {
          name: "Switcher",
          x: 266.75,
          y: 463.55,
          angle: -30,
          type: "toogle",
          color: "Blue",
          signalID: 1,
        },
        {
          name: "Platform",
          type: "static",
          x: 13.45,
          y: 394.9,
          density: 1,
          width: 136,
          angle: 90,
        },
        {
          name: "Platform",
          type: "dynamic",
          x: 368.45,
          y: 133.75,
          density: 1,
          width: 112.3,
          angle: 15,
        },
        {
          name: "Pivot",
          x: 323.35,
          y: 121.35,
          type: "gear",
          color: "Blue",
          gearMaxAngle: 105,
          gearPower: 6,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 1,
        },
        {
          name: "Platform",
          type: "static",
          x: 362.2,
          y: 393.95,
          density: 1,
          width: 285.9,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 420.55,
          y: 437.4,
          density: 1,
          width: 255.6,
          angle: -5,
        },
        {
          name: "Platform",
          type: "static",
          x: 271.6,
          y: 468.45,
          density: 1,
          width: 65.9,
          angle: -30,
        },
        {
          name: "Platform",
          type: "static",
          x: 554.95,
          y: 406.9,
          density: 1,
          width: 148,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 617.95,
          y: 207.45,
          density: 1,
          width: 94,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 54.45,
          y: 454.15,
          density: 1,
          width: 36.2,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 611,
          y: 52.9,
          density: 1,
          width: 100.9,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 691.7,
          y: 450.1,
          density: 1,
          width: 44.8,
          angle: -30,
        },
        {
          name: "Platform",
          type: "static",
          x: 658.05,
          y: 11.3,
          density: 1,
          width: 112.1,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 519.4,
          y: 302.15,
          density: 1,
          width: 114.3,
          angle: 45,
        },
        {
          name: "Platform",
          type: "static",
          x: 388.6,
          y: 217.45,
          density: 1,
          width: 146.1,
          angle: -45,
        },
        { name: "Star", x: 141.35, y: 432.25 },
        { name: "Star", x: 15.35, y: 307.95 },
        { name: "Star", x: 295.8, y: 243.3 },
        {
          name: "Platform",
          type: "static",
          x: 633.4,
          y: 210.75,
          density: 1,
          width: 46.4,
          angle: 45,
        },
        {
          name: "Platform",
          type: "static",
          x: 688.4,
          y: 161.7,
          density: 1,
          width: 46.4,
          angle: -45,
        },
      ],
    },
    {
      items: [
        {
          name: "Platform",
          type: "static",
          x: 553.35,
          y: 132.8,
          density: 1,
          width: 145,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 598.5,
          y: 12.6,
          density: 1,
          width: 242.9,
          angle: 0,
        },
        {
          name: "Switcher",
          x: 614.2,
          y: 424.6,
          angle: 0,
          type: "button",
          color: "Red",
          signalID: 1,
        },
        {
          name: "Switcher",
          x: 578.4,
          y: 250.85,
          angle: -90,
          type: "button",
          color: "Yellow",
          signalID: 3,
        },
        { name: "Cannon", x: 291.5, y: 343, lowerAngle: -70, upperAngle: 70 },
        {
          name: "Platform",
          type: "static",
          x: 600.45,
          y: 432.35,
          density: 1,
          width: 239.3,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 585.2,
          y: 326.95,
          density: 1,
          width: 229.5,
          angle: -90,
        },
        {
          name: "Teleport",
          x: 157.55,
          y: 196.35,
          angle: -45,
          color: "Red",
          id: 0,
          mulVel: 1,
        },
        {
          name: "Teleport",
          x: 126.15,
          y: 395,
          angle: 0,
          color: "Red",
          id: 0,
          mulVel: 5,
        },
        {
          name: "Platform",
          type: "static",
          x: 161.45,
          y: 351.35,
          density: 1,
          width: 229.5,
          angle: -90,
        },
        {
          name: "Platform",
          type: "static",
          x: 133.7,
          y: 217.8,
          density: 1,
          width: 89.4,
          angle: 45,
        },
        {
          name: "Platform",
          type: "static",
          x: 14.35,
          y: 282.95,
          density: 1,
          width: 94.5,
          angle: -90,
        },
        {
          name: "Switcher",
          x: 22.35,
          y: 286.35,
          angle: 90,
          type: "toogle",
          color: "Blue",
          signalID: 2,
        },
        {
          name: "Platform",
          type: "static",
          x: 646.55,
          y: 213,
          density: 1,
          width: 140.8,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 711,
          y: 113.9,
          density: 1,
          width: 217,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 486.05,
          y: 282.5,
          density: 1,
          width: 317.5,
          angle: -90,
        },
        {
          name: "Platform",
          type: "static",
          x: 671.6,
          y: 187.85,
          density: 1,
          width: 107,
          angle: -30,
        },
        {
          name: "Platform",
          type: "dynamic",
          x: 145.7,
          y: 157.15,
          density: 1,
          width: 116.3,
          angle: 136,
        },
        {
          name: "Pivot",
          x: 108.35,
          y: 192.35,
          type: "gear",
          color: "Red",
          gearMaxAngle: 45,
          gearPower: -8,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 1,
        },
        {
          name: "Platform",
          type: "static",
          x: 418.4,
          y: 334.9,
          density: 1,
          width: 209.6,
          angle: -90,
        },
        {
          name: "Platform",
          type: "static",
          x: 513.75,
          y: 269.65,
          density: 1,
          width: 80.2,
          angle: 45,
        },
        {
          name: "Platform",
          type: "dynamic",
          x: 484.1,
          y: 56.05,
          density: 1,
          width: 105,
          angle: -90,
        },
        {
          name: "Pivot",
          x: 484.3,
          y: 11.35,
          type: "gear",
          color: "Blue",
          gearMaxAngle: 0,
          gearPower: 6,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 2,
        },
        {
          name: "Platform",
          type: "static",
          x: 337.8,
          y: 401.85,
          density: 1,
          width: 178.3,
          angle: 0,
        },
        { name: "Rock", x: 561.65, y: 98.25, density: 0.5 },
        {
          name: "Platform",
          type: "static",
          x: 88.45,
          y: 243.95,
          density: 1,
          width: 166.2,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 141.3,
          y: 265.4,
          density: 1,
          width: 66.1,
          angle: 45,
        },
        { name: "Basket", x: 212.95, y: 422.7 },
        { name: "Star", x: 52.35, y: 216 },
        { name: "Star", x: 53.35, y: 402.95 },
        { name: "Star", x: 513.3, y: 220 },
        {
          name: "Platform",
          type: "dynamic",
          x: 228.2,
          y: 401.6,
          density: 1,
          width: 71.8,
          angle: 0,
        },
        {
          name: "Pivot",
          x: 256.85,
          y: 401.6,
          type: "gear",
          color: "Yellow",
          gearMaxAngle: 90,
          gearPower: 5,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 3,
        },
        {
          name: "Teleport",
          x: 452.15,
          y: 403.95,
          angle: 0,
          color: "Blue",
          id: 2,
          mulVel: 1,
        },
        {
          name: "Teleport",
          x: 679.45,
          y: 372.75,
          angle: -30,
          color: "Blue",
          id: 2,
          mulVel: 2,
        },
        {
          name: "Platform",
          type: "static",
          x: 686.1,
          y: 319.9,
          density: 1,
          width: 154,
          angle: -120,
        },
        {
          name: "Platform",
          type: "static",
          x: 620.7,
          y: 280.05,
          density: 1,
          width: 90.1,
          angle: -30,
        },
        {
          name: "Platform",
          type: "static",
          x: 643.2,
          y: 410.9,
          density: 1,
          width: 60.5,
          angle: -90,
        },
        {
          name: "Platform",
          type: "static",
          x: 426.95,
          y: 266.1,
          density: 1,
          width: 36.4,
          angle: 45,
        },
        {
          name: "Platform",
          type: "static",
          x: 431.1,
          y: 349.75,
          density: 1,
          width: 36.4,
          angle: 45,
        },
        {
          name: "Platform",
          type: "static",
          x: 469.5,
          y: 309.55,
          density: 1,
          width: 36.4,
          angle: -45,
        },
      ],
    },
    {
      items: [
        {
          name: "Platform",
          type: "static",
          x: 239.05,
          y: 126,
          density: 1,
          width: 252,
          angle: -3,
        },
        {
          name: "Platform",
          type: "static",
          x: 484.3,
          y: 58.35,
          density: 1,
          width: 18,
          angle: 0,
        },
        {
          name: "Switcher",
          x: 669,
          y: 222.8,
          angle: 135,
          type: "toogle",
          color: "Purple",
          signalID: 1,
        },
        {
          name: "Cannon",
          x: 536.95,
          y: 459.3,
          lowerAngle: -70,
          upperAngle: 70,
        },
        { name: "Basket", x: 45, y: 152.55 },
        {
          name: "Platform",
          type: "static",
          x: 355,
          y: 136.5,
          density: 1,
          width: 49,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 432.9,
          y: 141.45,
          density: 1,
          width: 52.9,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 360,
          y: 165,
          density: 1,
          width: 28.1,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 427.9,
          y: 170,
          density: 1,
          width: 30.1,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 99.9,
          y: 148.85,
          density: 1,
          width: 58.7,
          angle: -30,
        },
        {
          name: "Platform",
          type: "dynamic",
          x: 461,
          y: 58.35,
          density: 1,
          width: 64.1,
          angle: 0,
        },
        {
          name: "Pivot",
          x: 484.3,
          y: 58.35,
          type: "gear",
          color: "Blue",
          gearMaxAngle: -30,
          gearPower: -1,
          lowerAngle: -360,
          upperAngle: 360,
          signalID: 4,
        },
        {
          name: "Platform",
          type: "static",
          x: 595.1,
          y: 138.3,
          density: 1,
          width: 61.5,
          angle: 30,
        },
        {
          name: "Platform",
          type: "static",
          x: 602,
          y: 207.05,
          density: 1,
          width: 49.5,
          angle: 135,
        },
        {
          name: "Platform",
          type: "static",
          x: 660.1,
          y: 220.8,
          density: 1,
          width: 102.6,
          angle: 135,
        },
        {
          name: "Platform",
          type: "static",
          x: 641.05,
          y: 97.5,
          density: 1,
          width: 81.6,
          angle: 30,
        },
        {
          name: "Platform",
          type: "static",
          x: 616.05,
          y: 170.3,
          density: 1,
          width: 49.5,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 682,
          y: 151.65,
          density: 1,
          width: 89.3,
          angle: 75,
        },
        {
          name: "Platform",
          type: "static",
          x: 500.5,
          y: 124,
          density: 1,
          width: 153.1,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 564.4,
          y: 78.95,
          density: 1,
          width: 102.3,
          angle: 0,
        },
        { name: "Box", x: 441.6, y: 26.5, angle: 0, density: 2 },
        {
          name: "Platform",
          type: "static",
          x: 375,
          y: 411.55,
          density: 1,
          width: 99,
          angle: 90,
        },
        {
          name: "Platform",
          type: "dynamic",
          x: 361,
          y: 370.55,
          density: 10,
          width: 46.7,
          angle: 0,
        },
        { name: "Star", x: 390.35, y: 178 },
        { name: "Star", x: 127.65, y: 454.5 },
        { name: "Star", x: 462.3, y: 153.1 },
        {
          name: "Platform",
          type: "static",
          x: 9,
          y: 118,
          density: 1,
          width: 121.9,
          angle: 90,
        },
        {
          name: "Teleport",
          x: 583.55,
          y: 263.1,
          angle: 45,
          color: "Red",
          id: 2,
          mulVel: 5,
        },
        {
          name: "Teleport",
          x: 312.2,
          y: 393.75,
          angle: 30,
          color: "Red",
          id: 2,
          mulVel: 3,
        },
        { name: "Box", x: 361.5, y: 334.7, angle: 0, density: 0.1 },
        { name: "Box", x: 361.5, y: 287.75, angle: 0, density: 0.1 },
        { name: "Box", x: 361.5, y: 240.75, angle: 0, density: 0.1 },
        {
          name: "Pivot",
          x: 376.15,
          y: 369.75,
          type: "gear",
          color: "Purple",
          gearMaxAngle: 90,
          gearPower: 12,
          lowerAngle: 180,
          upperAngle: 0,
          signalID: 1,
        },
        {
          name: "Platform",
          type: "static",
          x: 94.05,
          y: 400.75,
          density: 1,
          width: 120.3,
          angle: 90,
        },
        {
          name: "Platform",
          type: "static",
          x: 136.55,
          y: 336.85,
          density: 1,
          width: 43.8,
          angle: -90,
        },
        {
          name: "Platform",
          type: "static",
          x: 176.55,
          y: 336.85,
          density: 1,
          width: 43.8,
          angle: -90,
        },
        {
          name: "Platform",
          type: "static",
          x: 218.05,
          y: 400.4,
          density: 1,
          width: 119.6,
          angle: 90,
        },
        {
          name: "Switcher",
          x: 188.6,
          y: 444.7,
          angle: 0,
          type: "button",
          color: "Blue",
          signalID: 4,
        },
        {
          name: "Platform",
          type: "static",
          x: 156.55,
          y: 435.4,
          density: 1,
          width: 45.7,
          angle: 90,
        },
        {
          name: "Swings",
          x: 156.55,
          y: 398.1,
          angle: 20,
          lowerAngle: -20,
          upperAngle: 20,
        },
        {
          name: "Platform",
          type: "static",
          x: 197.8,
          y: 349.8,
          density: 1,
          width: 60.5,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 115.1,
          y: 349.8,
          density: 1,
          width: 60,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 186.35,
          y: 452.05,
          density: 1,
          width: 75.6,
          angle: 0,
        },
        {
          name: "Platform",
          type: "static",
          x: 108.2,
          y: 296.6,
          density: 1,
          width: 85.7,
          angle: 45,
        },
        {
          name: "Platform",
          type: "static",
          x: 190.2,
          y: 307.6,
          density: 1,
          width: 46.1,
          angle: -45,
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
        a.scale.set(0.4, 0.4),
        a.anchor.set(0.5, 0.5),
        (a.x = 40),
        (a.y = d.gameHeight0 - 40),
        this.uiLayer.addChild(a),
        (this.btnFire = a),
        (this._btnFireBlinked = !1),
        (this._blinker = d.assets.getSprite("btnFireBlink")),
        this._blinker.scale.set(0.4, 0.4),
        this._blinker.anchor.set(0.5, 0.5),
        (this._blinker.x = a.x),
        (this._blinker.y = a.y),
        (this._blinker.visible = !1),
        this.addChild(this._blinker);
    a = new PIXI.TextStyle({
      fontFamily: "CroMagnum",
      fontSize: 42,
      fill: "#FFDC90",
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
