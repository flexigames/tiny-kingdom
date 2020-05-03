import * as PIXI from 'pixi.js'
import Building from './Building'
import Entity from './Entity'
import V from '../lib/vec2'

export default class Tower extends Building {
  constructor(x, y, opts = {}) {
    super(x, y, { sprite: Tower.id, offset: V(0, 4), ...opts })

    this.price = Tower.price

    this.fireRate = 30
    this.radius = 15
    this.damage = 1

    this.firePause = 0

    this.placed = false

    this.createCircle()
  }

  static id = 'tower'
  static price = 5

  update(dt) {
    super.update(dt)
    if (this.placed) {
      const enemies = Entity.find('enemy')
      if (this.firePause <= 0) {
        const closeEnemy = enemies.find(
          (enemy) => enemy.pos.distance(this.pos) <= this.radius
        )
        if (closeEnemy) {
          closeEnemy.takeDamage(this.damage)
          this.firePause = this.fireRate
        }
      } else {
        this.firePause -= dt
      }
    }
  }

  place() {
    super.place()
    this.removeCircle()
  }

  createCircle() {
    const circle = new PIXI.Graphics()
    circle.lineStyle(1, 0xec6c70)
    circle.drawCircle(0, -4, this.radius)
    circle.endFill()
    this.circle = circle
    this.sprite.addChild(circle)
  }

  removeCircle() {
    if (this.circle) this.sprite.removeChild(this.circle)
  }
}
