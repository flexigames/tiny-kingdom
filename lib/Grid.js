import { times } from 'lodash'
import * as PIXI from 'pixi.js'
import V from '../lib/vec2'
import Entity from '../entities/Entity'
import Path from '../entities/Path'
import Castle from '../entities/Castle'

export default class Grid {
  constructor({ stage, level }) {
    this.height = 15
    this.width = 20
    this.level = level

    this.pos = Grid.OFFSET

    this.container = new PIXI.Container()
    this.container.scale = { x: 8, y: 8 }
    stage.addChild(this.container)

    this.tileSize = Grid.TILE_SIZE

    this.grid = times(this.width).map((x) =>
      times(this.height).map((y) => ({ type: false }))
    )
  }

  static OFFSET = V(0, 12)

  static TILE_SIZE = 8

  set(x, y, type, data = {}) {
    if (!this.grid[x]) return console.error('not in grid', x, y)
    if (!this.grid[x][y]) return console.error('not in grid', x, y)

    this.grid[x][y].type = type
    this.grid[x][y].data = data
  }

  get(x, y) {
    if (!y) {
      y = x.y
      x = x.x
    }
    if (!this.grid[x]) return
    return this.grid[x][y]
  }

  iterate(fn) {
    return this.grid.forEach((row, x) =>
      row.forEach((field, y) => fn({ x, y, field }))
    )
  }

  init() {
    this.iterate(({ x, y, field }) => {
      const posX = x * this.tileSize + this.pos.x
      const posY = y * this.tileSize + this.pos.y

      if (field.type === 'path') {
        field.entity = new Path(posX, posY, field.data)
      }
      if (field.type === 'castle') {
        field.entity = new Castle(posX - 5, posY + 16)
      }

      const rect = new PIXI.Graphics()
      field.rectangle = rect
      rect.beginFill(0xfff6d3)
      rect.drawRect(posX, posY, this.tileSize, this.tileSize)
      rect.endFill()
      rect.hitArea = new PIXI.Rectangle(
        posX,
        posY,
        this.tileSize,
        this.tileSize
      )
      rect.interactive = true
      rect.buttonMode = true
      rect.alpha = 0
      rect.cursor = 'url("assets/cursor-hover.png"), pointer'

      rect.on('mouseover', () => {
        if (!this.level.building) return

        this.level.building.setGridPosition(
          x,
          y
        )

        rect.tint = field.type ? 0xec6c70 : 0xfff6d3
        rect.alpha = 0.5
      })
      rect.on('mouseout', () => {
        rect.tint = 0xffffff
        rect.alpha = 0
      })

      rect.on('mouseup', () => {
        if (!this.level.building) return
        if (field.type) return

        if (Entity.level.money >= this.level.building.price) {  
          field.entity = this.level.building
          this.level.building.place()
          this.level.building = false
          rect.interactive = false
          rect.buttonMode = false
          rect.tint = 0xffffff
          rect.alpha = 0
        }
      })

      this.container.addChild(rect)
    })
  }
}
