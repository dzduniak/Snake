package pl.dzduniak.snake

import org.w3c.dom.*
import org.w3c.dom.events.KeyboardEvent
import kotlin.browser.document
import kotlin.browser.localStorage
import kotlin.browser.window
import kotlin.js.Math

fun main(args: Array<String>) {
    var record = 0
    var points = 0
    try {
        record = localStorage["points"]?.toInt() ?: 0
    } catch(e: NumberFormatException) {
    }

    val canvas = document.getElementById("canvas") as HTMLCanvasElement

    val header = 26
    val width = 30
    val height = 20
    val cellSize = 20.0
    canvas.width = (cellSize * width + 3).toInt()
    canvas.height = (header + cellSize * height + 3).toInt()
    canvas.setAttribute("style", "position: absolute;  left: 50%;margin-left:${-canvas.width / 2}px; top: 50%;margin-top:${-canvas.height / 2}px;");

    val c = canvas.getContext("2d") as CanvasRenderingContext2D
    fun drawCell(x: Int, y: Int) {
        c.beginPath()
        c.rect(2 + x * cellSize, header + 2 + y * cellSize, cellSize - 1, cellSize - 1)
        c.fill()
    }

    val snake = mutableListOf<Pair<Int, Int>>()
    var velocity = Pair(0, -1)
    var apple = Pair(0, 0)

    fun head() = snake.last()

    fun inSnake(x: Int, y: Int) = snake.contains(Pair(x, y))
    val positions = generateSequence(Pair(0, 0)) {
        var (x, y) = it
        x++
        if (x >= width) {
            x = 0
            y++
            if (y >= height)
                return@generateSequence null
        }

        return@generateSequence Pair(x, y)
    }

    fun newApple(): Pair<Int, Int>? {
        val position = (Math.random() * (width * height - snake.size)).floor()
        return (positions - snake).elementAtOrNull(position)
    }

    fun startGame() {
        points = 0
        velocity = Pair(0, -1)
        val x = 20 % width
        var y = 10 % height
        snake.clear()
        for (i in 1..5) {
            snake.add(Pair(x, y))
            y += velocity.second
        }
        apple = newApple()!!
    }

    fun drawGame() {
        c.clearRect(0.0, 0.0, canvas.width.toDouble(), canvas.height.toDouble())

        c.beginPath()
        c.rect(.5, .5 + header, cellSize * width + 2, cellSize * height + 2);
        c.stroke()

        c.font = "${header - 4}px Square"
        c.fillStyle = "black"
        c.textAlign = CanvasTextAlign.LEFT
        c.fillText("$record", 0.0, header.toDouble() - 6)

        c.textAlign = CanvasTextAlign.RIGHT
        c.fillText("$points", canvas.width.toDouble(), header.toDouble() - 6)

        snake.forEach {
            val (x, y) = it
            c.fillStyle = "black"
            drawCell(x, y)
        }

        val (x, y) = apple
        c.fillStyle = "red"
        drawCell(x, y)
    }

    val loop = object : WebGameLoop() {
        val tick = 1 / 15.0
        var remainder = 0.0

        fun updateInner() {
            val (x, y) = head()
            val (vx, vy) = velocity
            val nx = (x + vx).modulo(width)
            val ny = (y + vy).modulo(height)
            val pos = Pair(nx, ny)
            if (inSnake(nx, ny)) {
                startGame()
            } else {
                snake.add(pos)

                if (pos == apple) {
                    val newApple = newApple()
                    if (newApple == null) {
                        startGame()
                        return
                    }
                    apple = newApple
                    points += 10
                    if (points > record) {
                        record = points
                        localStorage["points"] = record.toString()
                    }
                } else
                    snake.removeAt(0)
            }
        }

        override fun update(dt: Double) {
            remainder += dt
            while (remainder > tick) {
                remainder -= tick
                updateInner()
            }
        }

        override fun render() {
            drawGame()
        }
    }

    window.addEventListener("keydown", { event ->
        if (event.defaultPrevented) {
            return@addEventListener; // Do nothing if the event was already processed
        }

        event as KeyboardEvent

        when (event.key) {
            "ArrowDown" -> velocity = if (velocity != Pair(0, -1)) Pair(0, 1) else velocity
            "ArrowUp" -> velocity = if (velocity != Pair(0, 1)) Pair(0, -1) else velocity
            "ArrowLeft" -> velocity = if (velocity != Pair(1, 0)) Pair(-1, 0) else velocity
            "ArrowRight" -> velocity = if (velocity != Pair(-1, 0)) Pair(1, 0) else velocity
        }

        // Cancel the default action to avoid it being handled twice
        event.preventDefault();
    }, true);

    startGame()
    loop.start()
}