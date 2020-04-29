import Entity from "./Entity"
import * as PIXI from 'pixi.js'

export default class Spot extends Entity {
  constructor(x, y, opts = {}) {
    super(x, y, { sprite: 'selection-circle', spriteAnchor: [0, 0], ...opts })

    this.sprite.interactive = true
    this.sprite.buttonMode = true

    this.sprite.on('mouseup', () => {
      this.changeTexture('tower1')
      this.sprite.interactive = false
      this.sprite.buttonMode = false
      this.setPosition(this.pos.x, this.pos.y - 5)
    })
  }

}