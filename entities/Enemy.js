import Entity from './Entity'
import V from '../lib/vec2'
import Path from './Path'

export default class Enemy extends Entity {
  constructor(path) {
    const { start } = path
    super(start.x * Path.TILE_SIZE + 5, start.y * Path.TILE_SIZE + 6, { sprite: 'enemy' })

    this.stepIndex = 0
    this.direction = path.steps[this.stepIndex].normalize()
    this.stepCount = path.steps[this.stepIndex].length() * Path.TILE_SIZE

    this.path = path
    this.timer = 0

    this.speed = 0.09
  }

  update(dt) {
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
