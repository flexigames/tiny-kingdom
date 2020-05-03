import * as PIXI from 'pixi.js'
import Entity from './Entity'
import V from '../lib/vec2'
import Grid from '../lib/Grid'

export default class Building extends Entity {
  constructor(x, y, opts = {}) {
    super(x, y, opts)
    const { offset = V(0, 0), grid } = opts

    this.grid = grid

    this.sprite.alpha = 0.5

    this.offsetX = offset.x
    this.offsetY = offset.y

    this.gridPos = V(0, 0)

    this.sprite.anchor.set(
      0.5,
      1 - this.offsetY / (this.sprite.height / Entity.SCALE_FACTOR)
    )
  }

  setGridPosition(x, y) {
    this.gridPos = V(x, y)
    this.setPosition((x + 0.5) * Grid.TILE_SIZE + Grid.OFFSET.x, (y + 1) * Grid.TILE_SIZE + Grid.OFFSET.y)
  }

  getNeighborGridPositions() {
    return [
      V(-1, -1),
      V(-1, 0),
      V(-1, 1),
      V(0, -1),
      V(0, 1),
      V(1, -1),
      V(1, 0),
      V(1, 1)
    ].map(pos => pos.add(this.gridPos))
  }

  findNeighborTiles() {
    return this.getNeighborGridPositions.map(position => this.grid.get(position)).fiter(tile => tile)
  }

  place() {
    if (Entity.level.money >= this.price) {
      Entity.level.money -= this.price
      this.sprite.alpha = 1
      this.placed = true
    }
  }
}
