import * as PIXI from 'pixi.js'

export default class Screen {
    constructor({width, height, stage}) {
        this.width = width
        this.height = height

        this.container = new PIXI.Container()
        stage.addChild(this.container)
    }

    createButton(text, y, onClick) {
        const buttonText = new PIXI.Text(text, {
            fontFamily: 'Silkscreen',
            fontSize: 8,
            fill: 0x7C3F59,
            align: 'center'
        })

        buttonText.scale = { x: 8, y: 8 }
        buttonText.position.x = this.width / 2
        buttonText.position.y = y + 17
        buttonText.anchor.set(0.5)


        const rectangle = new PIXI.Graphics()
        rectangle.lineStyle(8, 0x7C3F59)
        rectangle.drawRect(buttonText.x - buttonText.width / 2 - 4, buttonText.y - buttonText.height / 2 + 12 - 4, buttonText.width + 8, buttonText.height + 8)
        rectangle.endFill()


        const button = new PIXI.Container()
        button.interactive = true
        button.buttonMode = true
        button.cursor = 'url("assets/cursor-hover.png"), pointer'
        button.addChild(rectangle)
        button.addChild(buttonText)

        this.container.addChild(button)

        button.on('mouseup', onClick)

        button.on('mouseover', () => {
            buttonText.style.fill = 0xEC6C70
        })

        button.on('mouseout', () => {
            buttonText.style.fill = 0x7C3F59
        })
    }

    onKeyboard(key) {}

    destroy() {
        this.container.removeChildren()
    }
}