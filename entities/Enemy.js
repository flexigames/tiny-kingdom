import Entity from './Entity'
import V from '../lib/vec2'
import Path from './Path'

export default class Enemy extends Entity {
  constructor(x, y, opts = {}) {
    const { path } = opts
    super(x, y, {
      sprite: 'big-enemy',
      tags: ['enemy'],
      ...opts,
    })

    this.health = 5

    this.stepIndex = 0
    this.direction = path.steps[this.stepIndex].normalize()
    this.stepCount = path.steps[this.stepIndex].length() * Path.TILE_SIZE

    this.path = path
    this.timer = 0

    this.flashTime = 20

    this.baseSpeed = 0.05
    this.boostPercentage = 5

    this.speed = this.baseSpeed + Math.random() * this.boostPercentage

    this.maxSpeed = this.baseSpeed + this.boostPercentage * this.baseSpeed
  }

  takeDamage(damage) {
    this.flashDamage()
    this.health -= damage
    if (this.health <= 0) {
      Entity.level.money++
      this.destroy()
    }
  }

  flashDamage() {
    this.sprite.tint = 0xec6c70
    this.flashCounter = this.flashTime
  }

  update(dt) {
    if (this.flashCounter >= 0) {
      this.flashCounter -= dt
    } else {
      this.sprite.tint = 0xffffff
    }

    this.speed += dt / (800 / this.boostPercentage)
    if (this.speed >= this.maxSpeed) this.speed = this.baseSpeed

    this.setPosition(this.pos.add(this.direction.multiply(this.speed * dt)))
    this.stepCount -= this.speed * dt
    if (this.stepCount < 1) {
      this.stepIndex++
      if (this.path.steps[this.stepIndex]) {
        this.turn()
      } else {
        this.direction = V(0, 0)
        const castle = Entity.findOne('castle')
        castle.takeHit()
        this.destroy()
      }
    }
  }

  turn() {
    this.direction = this.path.steps[this.stepIndex].normalize()
    this.stepCount = this.path.steps[this.stepIndex].length() * Path.TILE_SIZE
  }
}
