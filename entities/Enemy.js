import Entity from './Entity'
import V from '../lib/vec2'

export default class Enemy extends Entity {
  update(dt) {
    this.setPosition(this.pos.add(V(0, 0.05 * dt)))
  }
}
