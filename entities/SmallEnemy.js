import Enemy from './Enemy'

export default class SmallEnemy extends Enemy {
  constructor(x, y, opts = {}) {
    super(x, y, { sprite: 'enemy', health: 2, ...opts })
  }
}
