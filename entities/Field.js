import Building from './Building'
import Entity from './Entity'

export default class Field extends Building {
  constructor(x, y, opts = {}) {
    super(x, y, { sprite: Field.id, ...opts })
    this.sprite.gotoAndStop(0)

    this.currentFrame = 0
    this.timer = 0
    this.delay = 100

    this.sprite.zIndex = 0

    this.price = Field.price
    this.placed = false
    this.gain = 1
  }

  setPosition(x, y) {
    super.setPosition(x, y)
    this.sprite.zIndex = 0
  }

  update(dt) {
    super.update(dt)
    if (!this.placed) return

    this.timer += dt
    if (this.timer > this.delay) {
      this.timer = 0
      this.currentFrame++
      this.sprite.gotoAndStop(this.currentFrame)

      if (this.currentFrame > this.sprite.totalFrames - 1) {
        Entity.level.money += this.gain
        this.currentFrame = 0
      }
    }
  }

  static id = 'field'
  static price = 1
}
