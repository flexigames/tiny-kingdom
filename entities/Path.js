import Entity from "./Entity"
import { times, random, clamp, sample, uniqBy } from 'lodash'
import Castle from "./Castle"
import V from "../lib/vec2"

export default class Path extends Entity {
  constructor(x, y, opts = {}) {
    const { horizontal = false } = opts
    super(x + (horizontal ? Path.TILE_SIZE : 0), y, { sprite: 'path' + random(1, 8), spriteAngle: horizontal ? 90 : 0, spriteAnchor: [0, 0], ...opts })

    this.sprite.zIndex = 0
  }

  static TILE_SIZE = 8

  static generate(grid) {
    const startY = clamp(random(grid.height), 2, grid.height - 1)
    const endY = clamp(random(grid.height), 5, grid.height - 1)

    const start = V(0, startY)
    const firstCorner = V(1, startY)
    const end = V(grid.width - 2, endY)

    const xCossing = sample(times(grid.width - 4)) + 2
    const yCrossing = random(1, grid.height - 1)
    const randomPoint = V(xCossing, yCrossing)

    const steps = getSteps([start, firstCorner, randomPoint, end])


    fillGrid(start.clone(), steps, grid)

    return { start, steps }
  }
}

function fillGrid(start, steps, grid) {
  const pos = start.clone()
  steps.forEach(step => {
    if (step.y) {
      const direction = step.y < 0 ? -1 : 1
      times(Math.abs(step.y) + 1).forEach(i => grid.set(pos.x, pos.y + direction * i, 'path'))
      pos.y = pos.y + step.y
    }
    if (step.x) {
      const direction = step.x < 0 ? -1 : 1
      times(Math.abs(step.x) + 1).forEach(i => grid.set(pos.x + direction * i, pos.y, 'path'))
      pos.x = pos.x + step.x
    }
  })
  grid.set(pos.x, pos.y, 'castle')
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