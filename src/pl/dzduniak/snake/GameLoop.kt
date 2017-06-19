package pl.dzduniak.snake

interface GameLoop {
    val paused : Boolean

    fun update(dt: Double)
    fun render()
    fun start()
    fun stop()
}
