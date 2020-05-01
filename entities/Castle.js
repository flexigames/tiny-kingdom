import {times} from 'lodash'
import Entity from "./Entity";

export default class Castle extends Entity {
  constructor(x, y, opts = {}) {
    super(x, y, { sprite: 'castle', tags: ['castle'], spriteAnchor: [0, 1], ...opts })


    this.maxHealth = 3

    this.heartSprites = times(this.maxHealth).map(i => {
      const heart = Entity.createSprite(i * 6 + 3.5, -33, 'heart-full')
      heart.scale = {x: 1, y: 1}
      this.sprite.addChild(heart)
      return heart
    })

    this.health = 3
  }

  takeHit() {
    this.health--

    Entity.changeTexture(this.heartSprites[this.health], 'heart-empty')

    if (this.health === 0) {
      Entity.level.onLose()
    }
  }
}
