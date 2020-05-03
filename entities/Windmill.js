import Building from './Building'
import Entity from './Entity'
import V from '../lib/vec2'

export default class Windmill extends Building {
  constructor(x, y, opts = {}) {
    super(x, y, { sprite: Windmill.id, offset: V(0, 4), ...opts })

    this.price = Windmill.price

    this.coinsEvery = 200
    this.coinCounter = 0

    this.placed = false
  }

  update(dt) {
    super.update(dt)
    if (this.placed) {
      this.coinCounter += dt
      if (this.coinCounter > this.coinsEvery) {
        this.coinCounter = 0
        Entity.level.money++
      }
    }
  }

  static id = 'windmill'
  static price = 3
}
