package pl.dzduniak.snake

import kotlin.browser.window

internal abstract class WebGameLoop() : GameLoop {
    final override var paused = true
        private set

    abstract override fun update(dt: Double)
    abstract override fun render()

    private var previousTime = 0.0
    private fun loop(time: Double) {
        if (paused)
            return

        window.requestAnimationFrame { loop(it) }
        val dt = ((time - previousTime) / 1000).clamp(0.0, .5)
        update(dt)
        render()
        previousTime = time
    }

    override fun start() {
        paused = false
        loop(0.0)
    }

    override fun stop() {
        paused = true
    }
}