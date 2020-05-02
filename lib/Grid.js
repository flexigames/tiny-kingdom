import { times } from 'lodash'
import * as PIXI from 'pixi.js'
import Tower from '../entities/Tower'
import Entity from '../entities/Entity'
import Path from '../entities/Path'
import Castle from '../entities/Castle'



export default class Grid {
    constructor({ stage }) {
        this.height = 15
        this.width = 20

        this.container = new PIXI.Container()
        this.container.scale = { x: 8, y: 8 }
        stage.addChild(this.container)

        this.pixelSize = 8

        this.grid = times(this.width).map(x => times(this.height).map(y => ({type: false})))
        console.log(this.grid)
    }

    set(x, y, type, data = {}) {
        if (!this.grid[x]) return console.error('not in grid', x, y)
        if (!this.grid[x][y]) return console.error('not in grid', x, y)

        this.grid[x][y].type = type
        this.grid[x][y].data = data
    }

    iterate(fn) {
        this.grid.forEach((row, x) => row.forEach((field, y) => fn({ x, y, field })))
    }

    draw() {
        this.iterate(({ x, y, field }) => {
            const posX = x * this.pixelSize
            const posY = y * this.pixelSize + 12

            if (field.type === 'path') {
                new Path(posX, posY)
                return
            }
            if (field.type === 'castle') {
                new Castle(posX - 5, posY + 16)
                return
            }

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