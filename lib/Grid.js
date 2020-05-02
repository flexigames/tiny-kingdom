import { times } from 'lodash'
import * as PIXI from 'pixi.js'
import Tower from '../entities/Tower'
import Entity from '../entities/Entity'



export default class Grid {
    constructor({ stage }) {
        this.height = 15
        this.width = 20

        this.container = new PIXI.Container()
        this.container.scale = { x: 8, y: 8 }
        this.container.zIndex = -1000
        stage.addChild(this.container)

        this.pixelSize = 8

        this.grid = times(this.width).map(x => times(this.height).map(y => null))

        this.create()
    }

    iterate(fn) {
        this.grid.forEach((row, x) => row.forEach((field, y) => fn({ x, y, field })))
    }

    create() {
        this.iterate(({ x, y }) => {
            const posX = x * this.pixelSize
            const posY = y * this.pixelSize + 12

            const rect = new PIXI.Graphics()
            rect.beginFill(0xFFF6D3)
            rect.drawRect(posX, posY, this.pixelSize, this.pixelSize)
            rect.endFill()
            rect.hitArea = new PIXI.Rectangle(posX, posY, this.pixelSize, this.pixelSize)
            rect.interactive = true
            rect.buttonMode = true
            rect.cursor = 'url("assets/cursor-hover.png"), pointer'

            rect.on('mouseover', () => {
                rect.tint = 0x7C3F59
            })
            rect.on('mouseout', () => {
                rect.tint = 0xffffff
            })


            rect.on('mouseup', () => {
                if (Entity.level.money >= Tower.price) {
                    new Tower(posX + 4, posY + 10)
                    rect.interactive = false
                    rect.buttonMode = false
                    rect.tint = 0xffffff
                    rect.visible = false
                }
            })

            this.container.addChild(rect)
        })
    }
}