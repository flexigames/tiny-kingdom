import * as PIXI from 'pixi.js'
import Screen from './Screen'

export default class GameOverScreen extends Screen {
    constructor(opts) {
        super(opts)

        const gameover = new PIXI.Text('game over', {
            fontFamily: 'Silkscreen',
            fontSize: 8,
            fill: 0x7C3F59,
            align: 'center'
          })
        gameover.anchor.set(0.5, 0.5)
        gameover.scale = {x: 8, y: 8}
        gameover.x = this.width / 2
        gameover.y = this.height / 2 - gameover.height / 2
        this.container.addChild(gameover)

        this.createButton('restart', 700, () => this.onContinue())
    }

    onKeyboard(key) {
        if (key === 'Enter') this.onContinue()
    }

    destroy() {
        this.container.removeChildren()
    }
}