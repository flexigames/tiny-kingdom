import Entity from "./Entity"
import { times, random, clamp, sample } from 'lodash'
import Castle from "./Castle"
import V from "../lib/vec2"

const gameHeight = 18
const gameWidth = 20

export default class Path extends Entity {
  constructor(x, y, opts = {}) {
    const { horizontal = false } = opts
    super(x + (horizontal ? Path.TILE_SIZE : 0), y, { sprite: 'path' + random(1, 8), spriteAngle: horizontal ? 90 : 0, spriteAnchor: [0, 0], ...opts })

    this.sprite.zIndex = 0
  }

  static TILE_SIZE = 7

  static create(path) {
    const pos = V(path.start.x, path.start.y)
    path.steps.forEach(step => {
      if (step.y) {
        const direction = step.y < 0 ? -1 : 1
        times(Math.abs(step.y) + 1).forEach(i => new Path(pos.x * Path.TILE_SIZE, (pos.y + direction * i) * Path.TILE_SIZE))
        pos.y = pos.y + step.y
      }
      if (step.x) {
        const direction = step.x < 0 ? -1 : 1
        times(Math.abs(step.x) + 1).forEach(i => new Path((pos.x + direction * i) * Path.TILE_SIZE, pos.y * Path.TILE_SIZE, { horizontal: true }))
        pos.x = pos.x + step.x
      }
    })
    new Castle(pos.x * Path.TILE_SIZE, pos.y * Path.TILE_SIZE + 16)
  }

  static generate() {
      const startY = clamp(random(gameHeight), 2, gameHeight)
      const endY = clamp(random(gameHeight), 5, gameHeight)

      const start = V(-1, startY)
      const firstCorner = V(1, startY)
      const end = V(gameWidth, endY)

      const xCossing = sample(times(gameWidth - 2)) + 2
      const yCrossing = random(2, gameHeight)
      const randomPoint = V(xCossing, yCrossing)

      const steps = getSteps([start, firstCorner, randomPoint, end])

      const path = {start, steps}

      Path.create(path)

      return path
  }
}

function getSteps(points) {
  return points.reduce((acc, current, index) => {
    if (!points[index + 1]) return acc
    return acc.concat(getStep(current, points[index + 1]))
  }, []) 
}

function getStep(pointA, pointB) {
  return [
    V(0, pointB.y - pointA.y),
    V(pointB.x - pointA.x, 0)
  ].filter(vec => vec.x !== 0 || vec.y !== 0)
}