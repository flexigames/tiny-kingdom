import Entity from "./Entity";

export default class Spot extends Entity {
  constructor(x, y, opts = {}) {
    super(x, y, { sprite: 'selection-circle', ...opts })
  }

}