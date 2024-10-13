function check_o(){
    return true;
}
function play_sound(e, t) {
  game_sound && t.sound.play(e);
}
function show_ad() {
  PokiSDK.commercialBreak().then(function () {
    "start" === game_state && (PokiSDK.gameplayStart(), (game_state = "play"));
  });
}
var $jscomp = $jscomp || {};
($jscomp.scope = {}),
  ($jscomp.ASSUME_ES5 = !1),
  ($jscomp.ASSUME_NO_NATIVE_MAP = !1),
  ($jscomp.ASSUME_NO_NATIVE_SET = !1),
  ($jscomp.SIMPLE_FROUND_POLYFILL = !1),
  ($jscomp.objectCreate =
    $jscomp.ASSUME_ES5 || "function" == typeof Object.create
      ? Object.create
      : function (e) {
          var t = function () {};
          return (t.prototype = e), new t();
        }),
  ($jscomp.underscoreProtoCanBeSet = function () {
    var e = { a: !0 },
      t = {};
    try {
      return (t.__proto__ = e), t.a;
    } catch (e) {}
    return !1;
  }),
  ($jscomp.setPrototypeOf =
    "function" == typeof Object.setPrototypeOf
      ? Object.setPrototypeOf
      : $jscomp.underscoreProtoCanBeSet()
      ? function (e, t) {
          if (((e.__proto__ = t), e.__proto__ !== t))
            throw new TypeError(e + " is not extensible");
          return e;
        }
      : null),
  ($jscomp.inherits = function (e, t) {
    if (
      ((e.prototype = $jscomp.objectCreate(t.prototype)),
      (e.prototype.constructor = e),
      $jscomp.setPrototypeOf)
    ) {
      var o = $jscomp.setPrototypeOf;
      o(e, t);
    } else
      for (o in t)
        if ("prototype" != o)
          if (Object.defineProperties) {
            var a = Object.getOwnPropertyDescriptor(t, o);
            a && Object.defineProperty(e, o, a);
          } else e[o] = t[o];
    e.superClass_ = t.prototype;
  });
var game_mode = "local",
  game_sound = !0,
  game_state = "",
  Boot = function () {
    return Phaser.Scene.call(this, "boot") || this;
  };
$jscomp.inherits(Boot, Phaser.Scene),
  (Boot.prototype.preload = function () {
    this.load.image("background", "./img/background.png"),
      this.load.image("game_title", "./img/game_title.png"),
      this.load.image("btn_start", "./img/btn_start.png");
  }),
  (Boot.prototype.create = function () {
    this.scene.start("load");
  });
var Loader = function () {
  var e = Phaser.Scene.call(this, "load") || this;
  return e.group, e;
};
$jscomp.inherits(Loader, Phaser.Scene),
  (Loader.prototype.preload = function () {
    PokiSDK.gameLoadingStart(),
      (this.group = this.add.group()),
      this.add.sprite(360, 540, "background"),
      this.add.sprite(360, 380, "game_title");
    var e = this.add.rectangle(360, 580, 540, 28, 0);
    e.alpha = 0.4;
    var t = this.add.rectangle(360, 580, 526, 16, 16777215);
    this.group.addMultiple([e, t]),
      this.load.on("progress", function (e) {
        PokiSDK.gameLoadingProgress(100 * e), (t.width = 526 * e);
      }),
      this.load.image("board", "./img/board.png"),
      this.load.image("shadow_board", "./img/shadow_board.png"),
      this.load.image("btn_pause", "./img/btn_pause.png"),
      this.load.image("btn_sound", "./img/btn_sound.png"),
      this.load.image("btn_sound_off", "./img/btn_sound_off.png"),
      this.load.image("btn_multi", "./img/btn_multi.png"),
      this.load.image("btn_single", "./img/btn_single.png"),
      this.load.image("btn_about", "./img/btn_about.png"),
      this.load.image("btn_exit", "./img/btn_exit.png"),
      this.load.image("btn_close", "./img/btn_close.png"),
      this.load.image("btn_restart", "./img/btn_restart.png"),
      this.load.image("btn_resume", "./img/btn_resume.png"),
      this.load.image("highlight", "./img/highlight.png"),
      this.load.image("txt_lose", "./img/txt_lose.png"),
      this.load.image("txt_player1", "./img/txt_player1.png"),
      this.load.image("txt_player2", "./img/txt_player2.png"),
      this.load.image("txt_win", "./img/txt_win.png"),
      this.load.image("txt_paused", "./img/txt_paused.png"),
      this.load.image("txt_menu", "./img/txt_menu.png"),
      this.load.image("txt_about", "./img/txt_about.png"),
      this.load.image("white", "./img/white.png"),
      this.load.image("white_king", "./img/white_king.png"),
      this.load.image("black", "./img/black.png"),
      this.load.image("black_king", "./img/black_king.png"),
      this.load.image("window", "./img/window.png"),
      this.load.image("shadow_window", "./img/shadow_window.png"),
      this.load.image("header", "./img/header.png"),
      this.load.image("about", "./img/about.png"),
      this.load.audio("click", "./audio/click.mp3"),
      this.load.audio("completed", "./audio/completed.mp3"),
      this.load.audio("gameover", "./audio/gameover.mp3"),
      this.load.audio("placed1", "./audio/placed1.mp3"),
      this.load.audio("placed2", "./audio/placed2.mp3"),
      this.load.audio("swap", "./audio/swap.mp3");
  }),
  (Loader.prototype.create = function () {
    PokiSDK.gameLoadingFinished(), this.group.destroy(!0, !0);
    var e = this.add.sprite(360, 580, "btn_start").setInteractive();
    this.tweens.add({
      targets: e,
      scaleX: 0.95,
      scaleY: 0.95,
      ease: "Linear",
      duration: 600,
      yoyo: !0,
      loop: -1,
    }),
      this.input.on(
        "gameobjectdown",
        function () {
          show_ad(), this.scene.start("menu");
        },
        this
      );
  });
var Menu = function () {
  return Phaser.Scene.call(this, "menu") || this;
};
$jscomp.inherits(Menu, Phaser.Scene),
  (Menu.prototype.create = function () {
    var e,
      t = this,
      o = "menu";
    (game_state = o),
      this.add.sprite(360, 540, "background"),
      this.add.sprite(404, 720, "shadow_window");
    var a = this.add.sprite(360, -144, "game_title").setInteractive();
    this.add.sprite(360, 616, "window"),
      this.add.sprite(360, 384, "txt_menu"),
      this.tweens.add({
        targets: a,
        y: 144,
        ease: "Back.easeOut",
        duration: 500,
      }),
      (a = this.add.sprite(360, 544, "btn_single").setInteractive()),
      (a.button = !0),
      (a.name = "single"),
      (a = this.add.sprite(360, 656, "btn_multi").setInteractive()),
      (a.button = !0),
      (a.name = "multi"),
      (a = this.add.sprite(360, 768, "btn_about").setInteractive()),
      (a.button = !0),
      (a.name = "about"),
      this.input.on("gameobjectdown", function (a, i) {
        play_sound("click", t),
          t.tweens.add({
            targets: i,
            scaleX: 0.9,
            scaleY: 0.9,
            ease: "Linear",
            duration: 100,
            yoyo: !0,
            onComplete: function () {
              if ("menu" === o) {
                if ("single" === i.name)
                  (game_mode = "bot"),
                    (game_state = "start"),
                    show_ad(),
                    t.scene.start("game");
                else if ("multi" === i.name)
                  (game_mode = "local"),
                    (game_state = "start"),
                    show_ad(),
                    t.scene.start("game");
                else if ("about" === i.name) {
                  (o = "about"), (e = t.add.group());
                  var a = t.add.sprite(360, 616, "window"),
                    s = t.add.sprite(360, 384, "txt_about"),
                    n = t.add.sprite(360, 780, "btn_close").setInteractive();
                  (n.button = !0), (n.name = "close");
                  var p = t.add.sprite(360, 600, "about");
                  e.addMultiple([a, s, n, p]);
                }
              } else "close" === i.name && (e.destroy(!0, !0), (o = "menu"));
            },
          });
      });
  });
var Game = function () {
  return Phaser.Scene.call(this, "game") || this;
};
$jscomp.inherits(Game, Phaser.Scene),
  (Game.prototype.create = function () {
    function e() {
      function e(e, t) {
        var a = { x: e.x, y: e.y },
          i = { x: 1, y: 1 };
        y(i, a) &&
          2 === v[a.y + i.y][a.x + i.x].type &&
          ((i = { x: -1, y: -1 }),
          y(i, a) && (v[a.y + i.y][a.x + i.x].filled || o(e.ori, "dump"))),
          (i = { x: -1, y: 1 }),
          y(i, a) &&
            2 === v[a.y + i.y][a.x + i.x].type &&
            ((i = { x: 1, y: -1 }),
            y(i, a) && (v[a.y + i.y][a.x + i.x].filled || o(e.ori, "dump")));
      }
      function t(e, t) {
        var i = { x: e.x, y: e.y };
        if (y(t, i))
          if (
            v[i.y + t.y][i.x + t.x].filled &&
            2 === v[i.y + t.y][i.x + t.x].type
          ) {
            var s = { x: -1, y: -1 * t.y };
            y(s, e.ori) &&
              v[e.ori.y + s.y][e.ori.x + s.x].filled &&
              1 === v[e.ori.y + s.y][e.ori.x + s.x].type &&
              ((s = { x: -2, y: -2 * t.y }),
              y(s, e.ori) &&
                (v[e.ori.y + s.y][e.ori.x + s.x].filled || o(e.ori, "dump"))),
              (s = { x: 1, y: -1 * t.y }),
              y(s, e.ori) &&
                v[e.ori.y + s.y][e.ori.x + s.x].filled &&
                1 === v[e.ori.y + s.y][e.ori.x + s.x].type &&
                ((s = { x: 2, y: -2 * t.y }),
                y(s, e.ori) &&
                  (v[e.ori.y + s.y][e.ori.x + s.x].filled || o(e.ori, "dump")));
          } else if (
            1 === v[i.y + t.y][i.x + t.x].type ||
            !v[i.y + t.y][i.x + t.x].filled
          )
            if (0 < t.x) {
              var n = 0;
              (s = { x: 1, y: -1 }),
                y(s, i) && v[i.y + s.y][i.x + s.x].filled && n++,
                (s = { x: -1, y: 1 }),
                y(s, i) && v[i.y + s.y][i.x + s.x].filled && n++,
                2 === n && a(e.ori, "save");
            } else
              (n = 0),
                (s = { x: -1, y: -1 }),
                y(s, i) && v[i.y + s.y][i.x + s.x].filled && n++,
                (s = { x: 1, y: 1 }),
                y(s, i) && v[i.y + s.y][i.x + s.x].filled && n++,
                2 === n && a(e.ori, "save");
      }
      function o(e, t) {
        var o = 1;
        e: for (; 3 > o; o++)
          for (var a = n[o].length, i = 0; i < a; i++) {
            var s = n[o][i];
            if (s.ori.x === e.x && s.ori.y === e.y) {
              "dump" === t ? n[3].push(s) : n[0].push(s), n[o].splice(i, i + 1);
              break e;
            }
          }
      }
      function a(e) {
        for (var t = n[2].length, o = 0; o < t; o++) {
          var a = n[2][o];
          if (a.ori.x === e.x && a.ori.y === e.y) {
            n[1].push(a), n[2].splice(o, o + 1);
            break;
          }
        }
      }
      function i(e, t, a) {
        y(e, t) &&
          (v[t.y + e.y][t.x + e.x].filled
            ? v[t.y + e.y][t.x + e.x].type === a &&
              ((e = { x: -1 * e.x, y: -1 * e.y }),
              y(e, t) &&
                (v[t.y + e.y][t.x + e.x].filled &&
                v[t.y + e.y][t.x + e.x].type !== a
                  ? o({ x: t.x + e.x, y: t.y + e.y }, "dump")
                  : v[t.y + e.y][t.x + e.x].filled ||
                    o({ x: t.x + e.x, y: t.y + e.y }, "dump")))
            : ((e = { x: -1 * e.x, y: -1 * e.y }),
              y(e, t) &&
                v[t.y + e.y][t.x + e.x].filled &&
                v[t.y + e.y][t.x + e.x].type === a &&
                o(t, "priority")));
      }
      function s(e, t, o) {
        if (y(e, t)) {
          var a = { x: t.x + e.x, y: t.y + e.y };
          if (v[a.y][a.x].filled)
            v[t.y + e.y][t.x + e.x].type === o &&
              ((e = { x: 2 * e.x, y: 2 * e.y }),
              y(e, t) &&
                (v[t.y + e.y][t.x + e.x].filled ||
                  n[0].push({
                    x: t.x + e.x,
                    y: t.y + e.y,
                    ori: t,
                    match: !0,
                  })));
          else {
            for (var i, s = !0, r = 0; 4 > r; r++)
              if (
                (0 === r
                  ? (i = { x: 1, y: 1 })
                  : 1 === r
                  ? (i = { x: -1, y: 1 })
                  : 2 === r
                  ? (i = { x: 1, y: -1 })
                  : 3 === r && (i = { x: -1, y: -1 }),
                y(i, a) &&
                  v[a.y + i.y][a.x + i.x].filled &&
                  v[a.y + i.y][a.x + i.x].type === o)
              ) {
                if (!(2 <= r)) {
                  p(t)
                    ? 6 === a.x && 7 === a.y
                      ? n[1].push({ x: t.x + e.x, y: t.y + e.y, ori: t })
                      : n[3].push({ x: t.x + e.x, y: t.y + e.y, ori: t })
                    : (6 === a.x && 7 === a.y
                        ? n[1].push({ x: t.x + e.x, y: t.y + e.y, ori: t })
                        : n[2].push({ x: t.x + e.x, y: t.y + e.y, ori: t }),
                      (s = !1));
                  break;
                }
                if (p({ x: a.x + i.x, y: a.y + i.y })) {
                  7 === a.x && 6 === a.y
                    ? n[1].push({ x: t.x + e.x, y: t.y + e.y, ori: t })
                    : n[3].push({ x: t.x + e.x, y: t.y + e.y, ori: t }),
                    (s = !1);
                  break;
                }
              }
            s && n[1].push({ x: t.x + e.x, y: t.y + e.y, ori: t });
          }
        }
      }
      for (
        var n = [[], [], [], []], r = f.getLength(), d = f.getChildren(), l = 0;
        l < r;
        l++
      ) {
        var c = d[l];
        if (1 === c.type) {
          var m = { x: -1, y: 1 };
          s(m, c.pos, 2),
            (m = { x: 1, y: 1 }),
            s(m, c.pos, 2),
            c.king &&
              ((m = { x: -1, y: -1 }),
              s(m, c.pos, 2),
              (m = { x: 1, y: -1 }),
              s(m, c.pos, 2));
        }
      }
      if (0 === n[0].length)
        for (l = 0; l < r; l++)
          (c = d[l]),
            1 === c.type &&
              ((m = { x: -1, y: 1 }),
              i(m, c.pos, 2),
              (m = { x: 1, y: 1 }),
              i(m, c.pos, 2),
              c.king &&
                ((m = { x: -1, y: -1 }),
                i(m, c.pos, 2),
                (m = { x: 1, y: -1 }),
                i(m, c.pos, 2)));
      if (0 < n[2].length && 0 === n[1].length)
        for (d = n[2].length, r = 0; r < d; r++)
          (d = n[2][r]),
            t(d, { x: d.x - d.ori.x, y: d.y - d.ori.y }),
            (d = n[2].length);
      if (0 < n[1].length)
        for (r = n[1].length, d = 0; d < r; d++)
          (l = n[1][d]),
            p(l.ori) &&
              (e(l, { x: l.x - l.ori.x, y: l.y - l.ori.y }), (r = n[1].length));
      for ($ = n, r = !0, d = 0; d < n.length; d++)
        if (0 < n[d].length) {
          (r = !1),
            (d = n[d][Math.floor(Math.random() * n[d].length)]),
            (_ = d.ori),
            d.match && (v[d.y][d.x].match = !0),
            x({ x: d.x, y: d.y }, 1);
          break;
        }
      r && g("win");
    }
    function t() {
      S && (S = !1),
        (w = 1 === w ? 2 : 1),
        "local" === game_mode
          ? a()
          : 2 === w
          ? (PokiSDK.gameplayStart(), a())
          : (PokiSDK.gameplayStop(), e());
    }
    function o() {
      for (var e = f.getLength(), t = f.getChildren(), o = 0; o < e; o++) {
        var a = t[o];
        if (a.pos.x === _.x && a.pos.y === _.y) {
          1 === a.type ? a.setTint(11927519) : a.setTint(16711727),
            (a.tinted = !0);
          break;
        }
      }
    }
    function a() {
      var e = s();
      if (0 < e.length) {
        k = !0;
        for (
          var t = u.getLength(), o = u.getChildren(), a = 0;
          a < e.length;
          a++
        )
          for (var n = 0; n < t; n++) {
            var p = o[n];
            p.pos.x === e[a].x &&
              p.pos.y === e[a].y &&
              ((p.alpha = 1), (p.show = !0));
          }
      } else (k = !1), i();
    }
    function i() {
      function e(e, o, a) {
        y(e, o) && (v[o.y + e.y][o.x + e.x].filled || (t = !1));
      }
      for (
        var t = !0, o = f.getLength(), a = f.getChildren(), i = 0;
        i < o;
        i++
      ) {
        var s = a[i];
        if (s.type === w) {
          var n = void 0;
          s = s.pos;
          var r = void 0;
          2 === w
            ? ((n = { x: -1, y: -1 }), (r = 1))
            : 1 === w && ((n = { x: -1, y: 1 }), (r = 2)),
            e(n, s, r),
            2 === w ? (n = { x: 1, y: -1 }) : 1 === w && (n = { x: 1, y: 1 }),
            e(n, s, r),
            t &&
              p(s) &&
              (1 === w
                ? ((n = { x: -1, y: -1 }), (r = 1))
                : 2 === w && ((n = { x: -1, y: 1 }), (r = 2)),
              e(n, s, r),
              1 === w ? (n = { x: 1, y: -1 }) : 2 === w && (n = { x: 1, y: 1 }),
              e(n, s, r));
        }
      }
      t &&
        ("bot" === game_mode
          ? 2 === w && g("lose")
          : g(2 === w ? "player2" : "player1"));
    }
    function s() {
      function e(e, t, o) {
        y(e, t) &&
          v[t.y + e.y][t.x + e.x].filled &&
          v[t.y + e.y][t.x + e.x].type === o &&
          ((e = { x: 2 * e.x, y: 2 * e.y }),
          y(e, t) &&
            (v[t.y + e.y][t.x + e.x].filled ||
              a.push({ x: t.x + e.x, y: t.y + e.y, ori: t })));
      }
      for (
        var t = f.getLength(), o = f.getChildren(), a = [], i = 0;
        i < t;
        i++
      ) {
        var s = o[i];
        if (s.type === w) {
          var n = void 0;
          s = s.pos;
          var r = void 0;
          2 === w
            ? ((n = { x: -1, y: -1 }), (r = 1))
            : 1 === w && ((n = { x: -1, y: 1 }), (r = 2)),
            e(n, s, r),
            2 === w ? (n = { x: 1, y: -1 }) : 1 === w && (n = { x: 1, y: 1 }),
            e(n, s, r),
            p(s) &&
              (1 === w
                ? (n = { x: -1, y: -1 })
                : 2 === w && (n = { x: -1, y: 1 }),
              e(n, s, r),
              1 === w ? (n = { x: 1, y: -1 }) : 2 === w && (n = { x: 1, y: 1 }),
              e(n, s, r));
        }
      }
      return a;
    }
    function n(e) {
      function t(e, t, o) {
        y(e, t) &&
          v[t.y + e.y][t.x + e.x].filled &&
          v[t.y + e.y][t.x + e.x].type === o &&
          ((e = { x: 2 * e.x, y: 2 * e.y }),
          y(e, t) &&
            !v[t.y + e.y][t.x + e.x].filled &&
            ((_ = t),
            (a = { x: t.x + e.x, y: t.y + e.y, ori: t }),
            (v[a.y][a.x].match = !0)));
      }
      var o = p(e),
        a = !1;
      if (1 === w) {
        var i = { x: -1, y: 1 };
        t(i, e, 2),
          (i = { x: 1, y: 1 }),
          t(i, e, 2),
          o &&
            ((i = { x: -1, y: -1 }),
            t(i, e, 2),
            (i = { x: 1, y: -1 }),
            t(i, e, 2));
      } else
        2 === w &&
          ((i = { x: -1, y: -1 }),
          t(i, e, 1),
          (i = { x: 1, y: -1 }),
          t(i, e, 1),
          o &&
            ((i = { x: -1, y: 1 }),
            t(i, e, 1),
            (i = { x: 1, y: 1 }),
            t(i, e, 1)));
      return a;
    }
    function p(e) {
      for (
        var t = f.getLength(), o = f.getChildren(), a = !1, i = 0;
        i < t;
        i++
      ) {
        var s = o[i];
        if (s.pos.x === e.x && s.pos.y === e.y) {
          s.king && (a = !0);
          break;
        }
      }
      return a;
    }
    function r(e, t) {
      function a(e, t, o) {
        y(e, t) &&
          (v[t.y + e.y][t.x + e.x].filled
            ? v[t.y + e.y][t.x + e.x].type === o &&
              ((e = { x: 2 * e.x, y: 2 * e.y }),
              y(e, t) &&
                !v[t.y + e.y][t.x + e.x].filled &&
                (i.push({ x: t.x + e.x, y: t.y + e.y, match: !0 }), (s = !0)))
            : i.push({ x: t.x + e.x, y: t.y + e.y }));
      }
      var i = [],
        s = !1;
      d();
      var n = p(t);
      if (2 === e) {
        var r = { x: -1, y: -1 };
        a(r, t, 1),
          (r = { x: 1, y: -1 }),
          a(r, t, 1),
          n &&
            ((r = { x: -1, y: 1 }),
            a(r, t, 1),
            (r = { x: 1, y: 1 }),
            a(r, t, 1));
      }
      if (
        (1 === e &&
          ((r = { x: -1, y: 1 }),
          a(r, t, 2),
          (r = { x: 1, y: 1 }),
          a(r, t, 2),
          n &&
            ((r = { x: -1, y: -1 }),
            a(r, t, 2),
            (r = { x: 1, y: -1 }),
            a(r, t, 2))),
        (n = !0),
        s)
      )
        for (r = 0; r < i.length; r++) i[r].match || (i.splice(r, r + 1), r--);
      else k && (n = !1);
      if (n && 0 < i.length) {
        (j = !0), (_ = t), o(), (n = u.getLength()), (r = u.getChildren());
        for (var l = 0; l < i.length; l++)
          for (var x = 0; x < n; x++) {
            var g = r[x];
            g.pos.x === i[l].x &&
              g.pos.y === i[l].y &&
              ((g.alpha = 1),
              (g.show = !0),
              (v[g.pos.y][g.pos.x].available = !0),
              s && (v[g.pos.y][g.pos.x].match = !0));
          }
      }
    }
    function y(e, t) {
      var o = !1;
      return (
        0 <= t.x + e.x &&
          8 > t.x + e.x &&
          0 <= t.y + e.y &&
          8 > t.y + e.y &&
          (o = !0),
        o
      );
    }
    function d() {
      if (j) {
        for (var e = u.getLength(), t = u.getChildren(), o = 0; o < e; o++) {
          var a = t[o];
          a.show &&
            ((a.alpha = 0),
            (a.show = !1),
            (v[a.pos.y][a.pos.x].available = !1),
            v[a.pos.y][a.pos.x].match && (v[a.pos.y][a.pos.x].match = !1));
        }
        for (e = f.getLength(), t = f.getChildren(), o = 0; o < e; o++)
          (a = t[o]), a.tinted && ((a.tinted = !1), a.clearTint());
      }
    }
    function l(e, t) {
      play_sound("swap", c),
        setTimeout(function () {
          for (var o = f.getLength(), a = f.getChildren(), i = 0; i < o; i++) {
            var s = a[i];
            if (s.pos.x === e && s.pos.y === t) {
              (v[s.pos.y][s.pos.x].filled = !1),
                (v[s.pos.y][s.pos.x].type = 0),
                s.destroy(!0, !0);
              break;
            }
          }
        }, 150);
    }
    function x(e, o) {
      for (
        var a = f.getLength(), i = f.getChildren(), s = {}, p = 0;
        p < a;
        s = { $jscomp$loop$prop$p$28: s.$jscomp$loop$prop$p$28 }, p++
      )
        if (
          ((s.$jscomp$loop$prop$p$28 = i[p]),
          s.$jscomp$loop$prop$p$28.pos.x === _.x &&
            s.$jscomp$loop$prop$p$28.pos.y === _.y)
        ) {
          v[e.y][e.x].match &&
            ((S = !0),
            (v[e.y][e.x].match = !1),
            e.y < _.y
              ? e.x > _.x
                ? l(e.x - 1, e.y + 1)
                : l(e.x + 1, e.y + 1)
              : e.y > _.y &&
                (e.x > _.x ? l(e.x - 1, e.y - 1) : l(e.x + 1, e.y - 1))),
            (s.$jscomp$loop$prop$p$28.pos = e),
            (v[_.y][_.x].filled = !1),
            (v[e.y][e.x].filled = !0),
            (v[e.y][e.x].type = v[_.y][_.x].type),
            (v[_.y][_.x].type = 0),
            c.tweens.add({
              targets: s.$jscomp$loop$prop$p$28,
              x: 141 + 63 * e.x,
              y: 313 + 63 * e.y,
              ease: "Sine.easeInOut",
              duration: 300,
              onComplete: (function (e) {
                return function () {
                  if (
                    (1 === w
                      ? 7 !== e.$jscomp$loop$prop$p$28.pos.y ||
                        e.$jscomp$loop$prop$p$28.king ||
                        ((e.$jscomp$loop$prop$p$28.king = !0),
                        1 === e.$jscomp$loop$prop$p$28.type &&
                          e.$jscomp$loop$prop$p$28.setTexture("white_king"))
                      : 2 !== w ||
                        0 !== e.$jscomp$loop$prop$p$28.pos.y ||
                        e.$jscomp$loop$prop$p$28.king ||
                        ((e.$jscomp$loop$prop$p$28.king = !0),
                        2 === e.$jscomp$loop$prop$p$28.type &&
                          e.$jscomp$loop$prop$p$28.setTexture("black_king")),
                    "bot" === game_mode)
                  )
                    if (2 === w)
                      if (S) {
                        S = !1;
                        var o = n(e.$jscomp$loop$prop$p$28.pos);
                        o ? x({ x: o.x, y: o.y }, 2) : t();
                      } else t();
                    else
                      1 === w &&
                        (S
                          ? ((S = !1),
                            (o = n(e.$jscomp$loop$prop$p$28.pos))
                              ? x({ x: o.x, y: o.y }, 1)
                              : t())
                          : t());
                  else
                    "local" === game_mode &&
                      (1 === w
                        ? S
                          ? ((S = !1),
                            (o = n(e.$jscomp$loop$prop$p$28.pos))
                              ? x({ x: o.x, y: o.y }, 1)
                              : t())
                          : t()
                        : 2 === w &&
                          (S
                            ? ((S = !1),
                              (o = n(e.$jscomp$loop$prop$p$28.pos))
                                ? x({ x: o.x, y: o.y }, 2)
                                : t())
                            : t()));
                };
              })(s),
            });
          break;
        }
      d();
    }
    function g(e) {
      PokiSDK.gameplayStop(),
        "lose" === e
          ? play_sound("gameover", c)
          : (play_sound("completed", c), PokiSDK.happyTime(0.5)),
        (game_state = m = "gameover");
      var t = c.add.rectangle(0, 0, 720, 1080, 0).setOrigin(0);
      (t.alpha = 0),
        c.tweens.add({
          targets: t,
          alpha: 0.5,
          ease: "Sine.easeOut",
          duration: 500,
        });
      var o = c.add.sprite(360, 1280, "txt_" + e);
      c.tweens.add({ targets: o, y: 540, ease: "Back.easeOut", duration: 600 }),
        setTimeout(function () {
          o.destroy(!0, !0), (game_state = m = "end"), (b = c.add.group());
          var e = c.add.sprite(720, 1080, "shadow_window").setOrigin(1),
            t = c.add.sprite(360, 540, "window"),
            a = c.add.sprite(360, 472, "btn_restart").setInteractive();
          (a.button = !0), (a.name = "restart");
          var i = c.add.sprite(360, 584, "btn_exit").setInteractive();
          (i.button = !0), (i.name = "exit"), b.addMultiple([e, t, a, i]);
        }, 4e3);
    }
    var c = this,
      m = "play";
    this.add.sprite(360, 540, "background"),
      this.add.sprite(360, 0, "header").setOrigin(0.5, 0),
      this.add.sprite(401, 671, "shadow_board"),
      this.add.sprite(360, 540, "board");
    var h = this.add.sprite(160, 0, "btn_sound").setInteractive();
    h.setOrigin(0.5, 0),
      (h.button = !0),
      (h.name = "sound"),
      game_sound || h.setTexture("btn_sound_off"),
      (h = this.add.sprite(576, 0, "btn_pause").setInteractive()),
      h.setOrigin(0.5, 0),
      (h.button = !0),
      (h.name = "pause"),
      this.add.group();
    var u = this.add.group(),
      f = this.add.group();
    h = !1;
    for (
      var _, $, b, v = [], w = 2, k = !1, j = !1, S = !1, P = 0;
      8 > P;
      P++
    ) {
      for (var O = [], L = 0; 8 > L; L++) {
        var C = 0;
        h = !h;
        var I = this.add
          .sprite(141 + 63 * L, 313 + 63 * P, "highlight")
          .setInteractive();
        (I.alpha = 0),
          (I.type = "table"),
          (I.pos = { x: L, y: P }),
          u.add(I),
          3 > P
            ? h ||
              ((C = this.add
                .sprite(141 + 63 * L, 313 + 63 * P, "white")
                .setInteractive()),
              (C.type = 1),
              (C.piece = !0),
              (C.pos = { x: L, y: P }),
              f.add(C),
              (C = { filled: !0, type: 1 }))
            : 4 < P &&
              !h &&
              ((C = this.add
                .sprite(141 + 63 * L, 313 + 63 * P, "black")
                .setInteractive()),
              (C.type = 2),
              (C.piece = !0),
              (C.pos = { x: L, y: P }),
              f.add(C),
              (C = { filled: !0, type: 2 })),
          7 === L && (h = 1 != P % 2),
          C || (C = { filled: !1, type: 0 }),
          O.push(C);
      }
      v.push(O);
    }
    this.input.on("gameobjectdown", function (e, t) {
      ("table" === t.type || (t.piece && "play" === m)) &&
        (t.piece ? play_sound("placed2", c) : play_sound("placed1", c),
        "local" === game_mode
          ? v[t.pos.y][t.pos.x].available
            ? (x(t.pos, v[t.pos.y][t.pos.x].type),
              (v[t.pos.y][t.pos.x].available = !1))
            : v[t.pos.y][t.pos.x].filled &&
              v[t.pos.y][t.pos.x].type === w &&
              r(v[t.pos.y][t.pos.x].type, t.pos)
          : "bot" === game_mode &&
            (v[t.pos.y][t.pos.x].available
              ? (x(t.pos, v[t.pos.y][t.pos.x].type),
                (v[t.pos.y][t.pos.x].available = !1))
              : v[t.pos.y][t.pos.x].filled &&
                v[t.pos.y][t.pos.x].type === w &&
                r(v[t.pos.y][t.pos.x].type, t.pos))),
        t.button &&
          (play_sound("click", c),
          c.tweens.add({
            targets: t,
            scaleX: 0.9,
            scaleY: 0.9,
            ease: "Linear",
            duration: 100,
            yoyo: !0,
            onComplete: function () {
              if ("play" === m)
                if ("pause" === t.name) {
                  PokiSDK.gameplayStop(),
                    (game_state = m = "paused"),
                    (b = c.add.group());
                  var e = c.add.rectangle(0, 0, 720, 1080, 0).setOrigin(0);
                  (e.alpha = 0),
                    c.tweens.add({
                      targets: e,
                      alpha: 0.5,
                      ease: "Sine.easeOut",
                      duration: 500,
                    });
                  var o = c.add.sprite(720, 1080, "shadow_window").setOrigin(1),
                    a = c.add.sprite(360, 540, "window"),
                    i = c.add.sprite(360, 312, "txt_paused"),
                    s = c.add.sprite(360, 472, "btn_resume").setInteractive();
                  (s.button = !0), (s.name = "resume");
                  var n = c.add
                    .sprite(360, 584, "btn_restart")
                    .setInteractive();
                  (n.button = !0), (n.name = "restart");
                  var p = c.add.sprite(360, 696, "btn_exit").setInteractive();
                  (p.button = !0),
                    (p.name = "exit"),
                    b.addMultiple([e, o, a, i, s, n, p]);
                } else
                  "sound" === t.name &&
                    (game_sound
                      ? ((game_sound = !1), t.setTexture("btn_sound_off"))
                      : ((game_sound = !0), t.setTexture("btn_sound")));
              else
                "resume" === t.name
                  ? (PokiSDK.gameplayStart(), b.destroy(!0, !0), (m = "play"))
                  : "restart" === t.name
                  ? (show_ad(), c.scene.start("game"))
                  : "exit" === t.name &&
                    (PokiSDK.gameplayStop(), c.scene.start("menu"));
            },
          }));
    }),
      this.input.keyboard.on("keydown", function (e, t) {
        var o = e.key;
        if ("0" === o || "1" === o || "2" === o || "3" === o) {
          o = Number(o);
          var a = f.getLength(),
            i = f.getChildren();
          d();
          for (var s = 0; s < a; s++)
            for (var n = $[o].length, p = i[s], r = 0; r < n; r++) {
              var y = $[o][r];
              p.pos.x === y.ori.x && p.pos.y === y.ori.y && (p.alpha = 0.5);
            }
        }
      });
  });
var game,
  config = {
    type: Phaser.AUTO,
    width: 720,
    height: 1080,
    scale: {
      mode: Phaser.Scale.FIT,
      parent: "redfoc",
      autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: [Boot, Loader, Menu, Game],
  };
PokiSDK.init()
  .then(function () {
    console.log("PokiSDK initialized"),
      check_o() && (game = new Phaser.Game(config));
  })
  .catch(function () {
    console.log("Adblock enabled"),
      check_o() && (game = new Phaser.Game(config));
  }),
  PokiSDK.setDebug(!1);
