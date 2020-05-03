import * as PIXI from 'pixi.js'
import Building from "./Building"
import Entity from "./Entity"

export default class Windmill extends Building {
    constructor(x, y, opts = {}) {
        super(x, y, {sprite: Windmill.id, ...opts})
        Entity.level.money -= Windmill.price

        this.coinsEvery = 200
        this.coinCounter = 0
    }

    update(dt) {
        this.coinCounter += dt
        if (this.coinCounter > this.coinsEvery) {
            this.coinCounter = 0
            Entity.level.money++
        }
    }

    static id = 'windmill'
    static price = 5
}