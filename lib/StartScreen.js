import * as PIXI from 'pixi.js'
import Entity from '../entities/Entity'
import Screen from './Screen'

export default class StartScreen extends Screen {
    constructor(opts) {
        super(opts)

        const title = new PIXI.Text('attack on\ntiny kingdom', {
            fontFamily: 'Silkscreen',
            fontSize: 8,
            fill: 0x7C3F59,
            align: 'center'
          })
        title.anchor.set(0.5, 0.5)
        title.scale = {x: 8, y: 8}
        title.x = this.width / 2
        title.y = this.height / 2 - title.height / 2
        this.container.addChild(title)

        const castle = Entity.createSprite(this.width / 2, this.height/2 - 150, 'castle')
        castle.scale = {x: 8, y: 8}
        this.container.addChild(castle)


        this.createButton('start', 700, () => this.onStart())
    }

    onKeyboard(key) {
        if (key === 'Enter') this.onStart()
    }
}