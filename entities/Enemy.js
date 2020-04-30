import Entity from './Entity'
import V from '../lib/vec2'
import Path from './Path'

export default class Enemy extends Entity {
  constructor(x, y, opts = {}) {
    const {path} = opts
    super(x, y, {
      sprite: 'enemy',
      tags: ['enemy'],
      ...opts
    })

    this.health = 10

    this.stepIndex = 0
    this.direction = path.steps[this.stepIndex].normalize()
    this.stepCount = path.steps[this.stepIndex].length() * Path.TILE_SIZE

    this.path = path
    this.timer = 0

    this.flashTime = 20

    this.speed = 0.09
  }

  takeDamage(damage) {
    Entity.global.money++
    this.flashDamage()
    this.health -= damage
    if (this.health <= 0) {
      this.destroy()
    }
  }

  flashDamage() {
    this.sprite.tint = 0xEC6C70
    this.flashCounter = this.flashTime
  }

  update(dt) {
    if (this.flashCounter >= 0) {
      this.flashCounter -= dt
    } else {
      this.sprite.tint = 0xffffff
    }
  
    this.setPosition(this.pos.add(this.direction.multiply(this.speed * dt)))
    this.stepCount -= this.speed * dt
    if (this.stepCount < 1) {
      this.stepIndex++
      if (this.path.steps[this.stepIndex]) {
        this.turn()
      } else {
        this.direction = V(0, 0)
      }
    }
  }

  turn() {
    this.direction = this.path.steps[this.stepIndex].normalize()
    this.stepCount = this.path.steps[this.stepIndex].length() * Path.TILE_SIZE
  }
}
