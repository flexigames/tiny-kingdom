import * as PIXI from 'pixi.js'
import Entity from '../entities/Entity'

export default class StartScreen {
    constructor({stage, width, height}) {

        this.width = width
        this.height = height

        this.container = new PIXI.Container()
        stage.addChild(this.container)


        const title = new PIXI.Text('attack on\ntiny kingdom', {
            fontFamily: 'Silkscreen',
            fontSize: 8,
            fill: 0x7C3F59,
            align: 'center'
          })
        title.anchor.set(0.5, 0.5)
        title.scale = {x: 8, y: 8}
        title.x = width / 2
        title.y = height / 2 - title.height / 2
        this.container.addChild(title)

        const castle = Entity.createSprite(width / 2, height/2 - 150, 'castle')
        castle.scale = {x: 8, y: 8}
        this.container.addChild(castle)


        this.createButton('start', 700)

        document.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') this.onStart()
        })
    }

    createButton(text, y) {
        const buttonText = new PIXI.Text(text, {
            fontFamily: 'Silkscreen',
            fontSize: 8,
            fill: 0x7C3F59,
            align: 'center'
          })

        buttonText.scale = {x: 8, y: 8}
        buttonText.position.x = this.width / 2
        buttonText.position.y = y + 17
        buttonText.anchor.set(0.5)


        const rectangle = new PIXI.Graphics()
        rectangle.lineStyle(8, 0x7C3F59)
        rectangle.drawRect(buttonText.x - buttonText.width / 2 - 4 , buttonText.y - buttonText.height / 2 + 12 - 4, buttonText.width + 8, buttonText.height + 8)
        rectangle.endFill()


        const button = new PIXI.Container()
        button.interactive = true
        button.buttonMode= true
        button.cursor = 'url("assets/cursor-hover.png"), pointer'
        button.addChild(rectangle)
        button.addChild(buttonText)

        this.container.addChild(button)

        button.on('mouseup', () => this.onStart())

        button.on('mouseover', () => {
            buttonText.style.fill = 0xEC6C70
        })

        button.on('mouseout', () => {
            buttonText.style.fill = 0x7C3F59
        })
    }

    destroy() {
        this.container.removeChildren()
    }
}