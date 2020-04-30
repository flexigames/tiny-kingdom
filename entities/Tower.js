import * as PIXI from 'pixi.js'
import Entity from "./Entity"

export default class Tower extends Entity {
    constructor(x, y, opts = {}) {
        super(x, y, {sprite: 'tower1', ...opts})

        this.fireRate = 30
        this.radius = 10
        this.damage = 1

        this.firePause = 0

        this.createCircle()
    }

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