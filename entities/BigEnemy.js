import Enemy from './Enemy'

export default class BigEnemy extends Enemy {
  constructor(x, y, opts = {}) {
    super(x, y, { sprite: 'big-enemy', health: 5, gain: 2, ...opts })
  }
}
