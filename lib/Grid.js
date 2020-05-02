import {times} from 'lodash'
import * as PIXI from 'pixi.js'

const DEBUG = true

export default class Grid {
    constructor({stage}) {
        this.height = 15
        this.width = 20

        this.container = new PIXI.Container()
        this.container.scale = {x: 8, y: 8}
        this.container.x = 0
        this.container.y = 100
        stage.addChild(this.container)

        this.pixelSize = 8

        this.grid = times(this.width).map(x => times(this.height).map(y => null))

        if (DEBUG) this.debugDraw()
    }

    iterate(fn) {
        console.log(this.grid)
        this.grid.forEach((row, x) => row.forEach((field, y) => fn({x, y, field})))
    }

    debugDraw() {
        this.iterate(({x, y}) => {
            const rect = new PIXI.Graphics()
            rect.lineStyle(1, 0x7C3F59)
            rect.drawRect(x * this.pixelSize, y * this.pixelSize, this.pixelSize, this.pixelSize)
            rect.endFill()
            this.container.addChild(rect)
        })
    }
}