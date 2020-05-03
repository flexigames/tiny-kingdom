import * as PIXI from 'pixi.js'
import Entity from './Entity'
import V from '../lib/vec2'

export default class Building extends Entity {
  constructor(x, y, opts = {}) {
    super(x, y, opts)
    const { offset = V(0, 0) } = opts

    this.sprite.alpha = 0.5

    this.offsetX = offset.x
    this.offsetY = offset.y

    this.sprite.anchor.set(
      0.5,
      1 - this.offsetY / (this.sprite.height / Entity.SCALE_FACTOR)
    )
  }
  place() {
    if (Entity.level.money >= this.price) {
      Entity.level.money -= this.price
      this.sprite.alpha = 1
      this.placed = true
    }
  }
}
