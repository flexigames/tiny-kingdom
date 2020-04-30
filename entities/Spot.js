import Entity from './Entity'
import * as PIXI from 'pixi.js'
import Tower from './Tower'

export default class Spot extends Entity {
  constructor(x, y, opts = {}) {
    super(x, y, { sprite: 'selection-circle', spriteAnchor: [0, 0], ...opts })

    this.sprite.interactive = true
    this.sprite.buttonMode = true
    this.sprite.cursor = 'url("assets/cursor-hover.png"), pointer'

    this.sprite.on('mouseup', () => {
      if (Entity.global.money >= Tower.price) {
        new Tower(this.pos.x + 3, this.pos.y + 9)
        this.sprite.visible = false
        this.sprite.interactive = false
        this.sprite.buttonMode = false
      }
    })
  }
}
