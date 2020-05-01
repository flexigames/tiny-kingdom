import Entity from "./Entity"
import { times, random, clamp, sample, uniqBy } from 'lodash'
import Castle from "./Castle"
import V from "../lib/vec2"

const gridHeight = 18
const gridWidth = 20

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
    const startY = clamp(random(gridHeight), 2, gridHeight)
    const endY = clamp(random(gridHeight), 5, gridHeight)

    const start = V(-1, startY)
    const firstCorner = V(1, startY)
    const end = V(gridWidth, endY)

    const xCossing = sample(times(gridWidth - 2)) + 2
    const yCrossing = random(1, gridHeight / 2) * 2 + 1
    const randomPoint = V(xCossing, yCrossing)

    const steps = getSteps([start, firstCorner, randomPoint, end])

    const potentialSpots = getPotentialSpots(start, steps)

    console.log(potentialSpots)

    const path = { start, steps, potentialSpots }

    Path.create(path)

    return path
  }
}

function getPotentialSpots(start, steps) {
  const spots = []

  const pos = start.clone()

  steps.forEach(step => {
    if (step.y) {
      const direction = step.y < 0 ? -1 : 1
      times(Math.abs(step.y) - 2).forEach(i => spots.push(V(pos.x - 1, (pos.y + direction * (i + 1)))))
      pos.y = pos.y + step.y
    }
    if (step.x) {
      const direction = step.x < 0 ? -1 : 1
      times(Math.abs(step.x) - 2).forEach(i => spots.push(V((pos.x + direction * (i + 1 )), pos.y - 1)))
      pos.x = pos.x + step.x
    }
  })

  return uniqBy(spots, vec => vec.serialize())
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