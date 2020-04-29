import Entity from "./Entity";

export default class Castle extends Entity {
  constructor(x, y, opts = {}) {
    super(x, y, { sprite: 'castle', spriteAnchor: [0, 1], ...opts })
  }
}
