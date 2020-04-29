import Entity from "./Entity"
import { times, random } from 'lodash'
import Castle from "./Castle"


export default class Path extends Entity {
  constructor(x, y, opts = {}) {
    const { horizontal = false } = opts
    super(x + (horizontal ? Path.TILE_SIZE : 0), y, { sprite: 'path' + random(1, 8), spriteAngle: horizontal ? 90 : 0, spriteAnchor: [0, 0], ...opts })

    this.sprite.zIndex = 0
  }

  static TILE_SIZE = 7

  static create(path) {
    const pos = path.start
    path.steps.forEach(step => {
      if (step.y) {
        times(step.y + 1).forEach(i => new Path(pos.x * Path.TILE_SIZE, (pos.y + i) * Path.TILE_SIZE))
        pos.y = pos.y + step.y
      }
      if (step.x) {
        times(step.x + 1).forEach(i => new Path((pos.x + i) * Path.TILE_SIZE, pos.y * Path.TILE_SIZE, { horizontal: true }))
        pos.x = pos.x + step.x
      }
    })
    new Castle(pos.x * Path.TILE_SIZE, pos.y * Path.TILE_SIZE + 15)
  }
}