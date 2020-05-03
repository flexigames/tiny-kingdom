import * as PIXI from 'pixi.js'
import Building from "./Building"
import Entity from "./Entity"


export default class Tower extends Building {
    constructor(x, y, opts = {}) {
        super(x, y, {sprite: 'tower', ...opts})
        Entity.level.money -= Tower.price

        this.fireRate = 30
        this.radius = 15
        this.damage = 1

        this.firePause = 0

        this.createCircle()
    }

    static id = 'tower'

    static price = 10

    update(dt) {
        super.update(dt)
        const enemies = Entity.find('enemy')
        if (this.firePause <= 0) {
            const closeEnemy = enemies.find(enemy => enemy.pos.distance(this.pos) <= this.radius)
            if (closeEnemy) {
                closeEnemy.takeDamage(this.damage)
                this.firePause = this.fireRate
            }
        } else {
            this.firePause -= dt
        }
    }

    createCircle() {
        const circle = new PIXI.Graphics()
        circle.lineStyle(1, 0xEC6C70)
        circle.drawCircle(0, -4, this.radius)
        circle.endFill()
        this.sprite.addChild(circle)
    }


}