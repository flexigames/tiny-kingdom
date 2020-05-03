import Building from './Building'
import Entity from './Entity'
import V from '../lib/vec2'
import Grid from '../lib/Grid'

export default class Windmill extends Building {
  constructor(x, y, opts = {}) {
    super(x, y, { sprite: Windmill.id, offset: V(0, 4), ...opts })

    this.price = Windmill.price

    this.coinsEvery = 200
    this.coinCounter = 0

    this.placed = false



    // Grid.TILE_SIZE

    // const rect = new PIXI.Graphics()
    // rect.beginFill(0xfff6d3)
    // rect.drawRect(posX, posY, this.tileSize, this.tileSize)
    // rect.endFill()
  }

  setGridPosition(x, y) {
    super.setGridPosition(x, y)

    this.setNeighborMarkings()
  }

  place() {
    super.place()
    this.setNeighborMarkings(true)
  }

  setNeighborMarkings(remove = false) {
    const neighborPositions = this.getNeighborGridPositions()
    this.grid.iterate(({ x, y, field }) => {
      const isNeighbor = neighborPositions.some(pos => pos.equals(V(x, y)))
      if (isNeighbor && !remove) {
        field.rectangle.alpha = 0.5
        field.rectangle.tint = field.type ? 0xec6c70 : 0xfff6d3
      } else {
        field.rectangle.alpha = 0
      }
    })
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
