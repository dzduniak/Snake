if (typeof kotlin === 'undefined') {
  throw new Error("Error loading module 'Snake'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'Snake'.");
}
var Snake = function (_, Kotlin) {
  'use strict';
  var toInt = Kotlin.kotlin.text.toInt_pdl1vz$;
  var NumberFormatException = Kotlin.kotlin.NumberFormatException;
  var mutableListOf = Kotlin.kotlin.collections.mutableListOf_i5x0yv$;
  var Pair = Kotlin.kotlin.Pair;
  var last = Kotlin.kotlin.collections.last_2p1efm$;
  var generateSequence = Kotlin.kotlin.sequences.generateSequence_gexuht$;
  var joinToString = Kotlin.kotlin.sequences.joinToString_853xkz$;
  var println = Kotlin.kotlin.io.println_s8jyv4$;
  var minus = Kotlin.kotlin.sequences.minus_639hpx$;
  var elementAtOrNull = Kotlin.kotlin.sequences.elementAtOrNull_wuwhe2$;
  main$ObjectLiteral.prototype = Object.create(WebGameLoop.prototype);
  main$ObjectLiteral.prototype.constructor = main$ObjectLiteral;
  function GameLoop() {
  }
  GameLoop.$metadata$ = {
    kind: Kotlin.Kind.INTERFACE,
    simpleName: 'GameLoop',
    interfaces: []
  };
  function main$drawCell(closure$c, closure$cellSize, closure$header) {
    return function (x, y) {
      closure$c.beginPath();
      closure$c.rect(2 + x * closure$cellSize, (closure$header + 2 | 0) + y * closure$cellSize, closure$cellSize - 1, closure$cellSize - 1);
      closure$c.fill();
    };
  }
  function main$head(closure$snake) {
    return function () {
      return last(closure$snake);
    };
  }
  function main$inSnake(closure$snake) {
    return function (x, y) {
      return closure$snake.contains_11rb$(new Pair(x, y));
    };
  }
  function main$lambda(closure$width, closure$height) {
    return function (it) {
      var tmp$ = it;
      var x = tmp$.component1()
      , y = tmp$.component2();
      x = x + 1 | 0;
      if (x >= closure$width) {
        x = 0;
        y = y + 1 | 0;
        if (y >= closure$height)
          return null;
      }
      return new Pair(x, y);
    };
  }
  function main$lambda_0(it) {
    return it.first.toString() + ' x ' + it.second;
  }
  function main$newApple(closure$width, closure$height, closure$snake, closure$positions) {
    return function () {
      var position = floor(Math.random() * (Kotlin.imul(closure$width, closure$height) - closure$snake.size | 0));
      return elementAtOrNull(minus(closure$positions, closure$snake), position);
    };
  }
  function main$startGame(closure$points, closure$velocity, closure$width, closure$height, closure$snake, closure$newApple, closure$apple) {
    return function () {
      var tmp$;
      closure$points.v = 0;
      closure$velocity.v = new Pair(0, -1);
      var x = 20 % closure$width;
      var y = 10 % closure$height;
      closure$snake.clear();
      for (var i = 1; i <= 5; i++) {
        closure$snake.add_11rb$(new Pair(x, y));
        y = y + closure$velocity.v.second | 0;
      }
      closure$apple.v = (tmp$ = closure$newApple()) != null ? tmp$ : Kotlin.throwNPE();
    };
  }
  function main$drawGame(closure$c, closure$canvas, closure$header, closure$cellSize, closure$width, closure$height, closure$record, closure$points, closure$snake, closure$drawCell, closure$apple) {
    return function () {
      closure$c.clearRect(0.0, 0.0, closure$canvas.width, closure$canvas.height);
      closure$c.beginPath();
      closure$c.rect(0.5, 0.5 + closure$header, closure$cellSize * closure$width + 2, closure$cellSize * closure$height + 2);
      closure$c.stroke();
      closure$c.font = '22px Square';
      closure$c.fillStyle = 'black';
      closure$c.textAlign = 'left';
      closure$c.fillText(closure$record.v.toString(), 0.0, closure$header - 6);
      closure$c.textAlign = 'right';
      closure$c.fillText(closure$points.v.toString(), closure$canvas.width, closure$header - 6);
      var $receiver = closure$snake;
      var tmp$_0;
      tmp$_0 = $receiver.iterator();
      while (tmp$_0.hasNext()) {
        var element = tmp$_0.next();
        var closure$c_0 = closure$c;
        var closure$drawCell_0 = closure$drawCell;
        var tmp$_1 = element;
        var x_0 = tmp$_1.component1()
        , y_0 = tmp$_1.component2();
        closure$c_0.fillStyle = 'black';
        closure$drawCell_0(x_0, y_0);
      }
      var tmp$ = closure$apple.v;
      var x = tmp$.component1()
      , y = tmp$.component2();
      closure$c.fillStyle = 'red';
      closure$drawCell(x, y);
    };
  }
  function main$ObjectLiteral(closure$head, closure$velocity, closure$width, closure$height, closure$inSnake, closure$startGame, closure$snake, closure$apple, closure$newApple, closure$points, closure$record, closure$drawGame) {
    this.closure$head = closure$head;
    this.closure$velocity = closure$velocity;
    this.closure$width = closure$width;
    this.closure$height = closure$height;
    this.closure$inSnake = closure$inSnake;
    this.closure$startGame = closure$startGame;
    this.closure$snake = closure$snake;
    this.closure$apple = closure$apple;
    this.closure$newApple = closure$newApple;
    this.closure$points = closure$points;
    this.closure$record = closure$record;
    this.closure$drawGame = closure$drawGame;
    WebGameLoop.call(this);
    this.tick = 1 / 15.0;
    this.remainder = 0.0;
  }
  main$ObjectLiteral.prototype.updateInner = function () {
    var tmp$ = this.closure$head();
    var x = tmp$.component1()
    , y = tmp$.component2();
    var tmp$_0 = this.closure$velocity.v;
    var vx = tmp$_0.component1()
    , vy = tmp$_0.component2();
    var nx = modulo(x + vx | 0, this.closure$width);
    var ny = modulo(y + vy | 0, this.closure$height);
    var pos = new Pair(nx, ny);
    if (this.closure$inSnake(nx, ny)) {
      this.closure$startGame();
    }
     else {
      this.closure$snake.add_11rb$(pos);
      if (pos != null ? pos.equals(this.closure$apple.v) : null) {
        var newApple_0 = this.closure$newApple();
        if (newApple_0 == null) {
          this.closure$startGame();
          return;
        }
        this.closure$apple.v = newApple_0;
        this.closure$points.v = this.closure$points.v + 10 | 0;
        if (this.closure$points.v > this.closure$record.v) {
          this.closure$record.v = this.closure$points.v;
          localStorage['points'] = this.closure$record.v.toString();
        }
      }
       else
        this.closure$snake.removeAt_za3lpa$(0);
    }
  };
  main$ObjectLiteral.prototype.update_14dthe$ = function (dt) {
    this.remainder += dt;
    while (this.remainder > this.tick) {
      this.remainder -= this.tick;
      this.updateInner();
    }
  };
  main$ObjectLiteral.prototype.render = function () {
    this.closure$drawGame();
  };
  main$ObjectLiteral.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    interfaces: [WebGameLoop]
  };
  function main$lambda_1(closure$velocity) {
    return function (event) {
      var tmp$, tmp$_0, tmp$_1, tmp$_2, tmp$_3, tmp$_4;
      if (event.defaultPrevented) {
        return;
      }
      Kotlin.isType(tmp$ = event, KeyboardEvent) ? tmp$ : Kotlin.throwCCE();
      tmp$_0 = event.key;
      if (Kotlin.equals(tmp$_0, 'ArrowDown'))
        closure$velocity.v = !((tmp$_1 = closure$velocity.v) != null ? tmp$_1.equals(new Pair(0, -1)) : null) ? new Pair(0, 1) : closure$velocity.v;
      else if (Kotlin.equals(tmp$_0, 'ArrowUp'))
        closure$velocity.v = !((tmp$_2 = closure$velocity.v) != null ? tmp$_2.equals(new Pair(0, 1)) : null) ? new Pair(0, -1) : closure$velocity.v;
      else if (Kotlin.equals(tmp$_0, 'ArrowLeft'))
        closure$velocity.v = !((tmp$_3 = closure$velocity.v) != null ? tmp$_3.equals(new Pair(1, 0)) : null) ? new Pair(-1, 0) : closure$velocity.v;
      else if (Kotlin.equals(tmp$_0, 'ArrowRight'))
        closure$velocity.v = !((tmp$_4 = closure$velocity.v) != null ? tmp$_4.equals(new Pair(-1, 0)) : null) ? new Pair(1, 0) : closure$velocity.v;
      event.preventDefault();
    };
  }
  function main(args) {
    var tmp$, tmp$_0, tmp$_1, tmp$_2;
    var record = {v: 0};
    var points = {v: 0};
    try {
      record.v = (tmp$_0 = (tmp$ = localStorage['points']) != null ? toInt(tmp$) : null) != null ? tmp$_0 : 0;
    }
     catch (e) {
      if (!Kotlin.isType(e, NumberFormatException))
        throw e;
    }
    var canvas = Kotlin.isType(tmp$_1 = document.getElementById('canvas'), HTMLCanvasElement) ? tmp$_1 : Kotlin.throwCCE();
    var header = 26;
    var width = 30;
    var height = 20;
    var cellSize = 20.0;
    canvas.width = cellSize * width + 3 | 0;
    canvas.height = header + cellSize * height + 3 | 0;
    canvas.setAttribute('style', 'position: absolute;  left: 50%;margin-left:' + (-canvas.width / 2 | 0) + 'px; top: 50%;margin-top:' + (-canvas.height / 2 | 0) + 'px;');
    var c = Kotlin.isType(tmp$_2 = canvas.getContext('2d'), CanvasRenderingContext2D) ? tmp$_2 : Kotlin.throwCCE();
    var drawCell = main$drawCell(c, cellSize, header);
    var snake = mutableListOf([]);
    var velocity = {v: new Pair(0, -1)};
    var apple = {v: new Pair(0, 0)};
    var head = main$head(snake);
    var inSnake = main$inSnake(snake);
    var positions = generateSequence(new Pair(0, 0), main$lambda(width, height));
    println(joinToString(positions, void 0, void 0, void 0, void 0, void 0, main$lambda_0));
    var newApple = main$newApple(width, height, snake, positions);
    var startGame = main$startGame(points, velocity, width, height, snake, newApple, apple);
    var drawGame = main$drawGame(c, canvas, header, cellSize, width, height, record, points, snake, drawCell, apple);
    var loop = new main$ObjectLiteral(head, velocity, width, height, inSnake, startGame, snake, apple, newApple, points, record, drawGame);
    window.addEventListener('keydown', main$lambda_1(velocity), true);
    startGame();
    loop.start();
  }
  function toRadians($receiver) {
    return $receiver * Math.PI / 180;
  }
  function toDegrees($receiver) {
    return $receiver * 180 / Math.PI;
  }
  function clamp($receiver, min, max) {
    return Math.max(min, Math.min(max, $receiver));
  }
  function floor($receiver) {
    return Math.floor($receiver);
  }
  function round($receiver) {
    return Math.round($receiver);
  }
  function modulo($receiver, m) {
    return ($receiver % m + m | 0) % m;
  }
  function modulo_0($receiver, m) {
    return ($receiver % m + m) % m;
  }
  function nextHighestPowerOf2($receiver) {
    var v = $receiver;
    v = v - 1 | 0;
    v = v | v >> 1;
    v = v | v >> 2;
    v = v | v >> 4;
    v = v | v >> 8;
    v = v | v >> 16;
    v = v + 1 | 0;
    return v;
  }
  function WebGameLoop() {
    this.paused_eioh8u$_0 = true;
    this.previousTime_0 = 0.0;
  }
  Object.defineProperty(WebGameLoop.prototype, 'paused', {
    get: function () {
      return this.paused_eioh8u$_0;
    },
    set: function (paused) {
      this.paused_eioh8u$_0 = paused;
    }
  });
  function WebGameLoop$loop$lambda(this$WebGameLoop) {
    return function (it) {
      this$WebGameLoop.loop_0(it);
    };
  }
  WebGameLoop.prototype.loop_0 = function (time) {
    if (this.paused)
      return;
    window.requestAnimationFrame(WebGameLoop$loop$lambda(this));
    var dt = clamp((time - this.previousTime_0) / 1000, 0.0, 0.5);
    this.update_14dthe$(dt);
    this.render();
    this.previousTime_0 = time;
  };
  WebGameLoop.prototype.start = function () {
    this.paused = false;
    this.loop_0(0.0);
  };
  WebGameLoop.prototype.stop = function () {
    this.paused = true;
  };
  WebGameLoop.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'WebGameLoop',
    interfaces: [GameLoop]
  };
  var package$pl = _.pl || (_.pl = {});
  var package$dzduniak = package$pl.dzduniak || (package$pl.dzduniak = {});
  var package$snake = package$dzduniak.snake || (package$dzduniak.snake = {});
  package$snake.GameLoop = GameLoop;
  package$snake.main_kand9s$ = main;
  package$snake.toRadians_yrwdxr$ = toRadians;
  package$snake.toDegrees_yrwdxr$ = toDegrees;
  package$snake.clamp_nig4hr$ = clamp;
  package$snake.floor_yrwdxr$ = floor;
  package$snake.round_yrwdxr$ = round;
  package$snake.modulo_dqglrj$ = modulo;
  package$snake.modulo_38ydlf$ = modulo_0;
  package$snake.nextHighestPowerOf2_s8ev3n$ = nextHighestPowerOf2;
  Kotlin.defineModule('Snake', _);
  main([]);
  return _;
}(typeof Snake === 'undefined' ? {} : Snake, kotlin);
