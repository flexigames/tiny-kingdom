import { times, sampleSize } from 'lodash'
import * as PIXI from 'pixi.js'
import Enemy from '../entities/Enemy'
import Path from '../entities/Path'
import V from './vec2'
import Entity from '../entities/Entity'
import Scheduler from './Scheduler'
import Grid from './Grid'
import Building from '../entities/Building'

export default class Level {
  constructor({ onWin, onLose, stage }) {
    this.onWin = onWin
    this.onLose = onLose
    this.stage = stage

    this.container = new PIXI.Container()
    stage.addChild(this.container)

    this.grid = new Grid({ stage: this.container, level: this })

    this.waves = [
      { n: 1, time: 0 },
      { n: 2, time: 10 },
      { n: 3, time: 15 },
      { n: 4, time: 20 },
      { n: 5, time: 25 },
      { n: 6, time: 30 },
      { n: 7, time: 35 },
      { n: 8, time: 40 },
      { n: 9, time: 45 },
    ]
    this.path = Path.generate(this.grid)

    this.start = V(
      this.path.start.x * Path.TILE_SIZE + 5,
      this.path.start.y * Path.TILE_SIZE + 17
    )

    this.time = 0

    this.scheduler = new Scheduler()

    this.nextWave = 0

    this.money = 10
    this.nextWaveTime = -1

    this.building = false

    this.grid.init()
  }

  setBuilding(BuildingClass) {
    if (this.building instanceof BuildingClass) {
      this.building.destroy()
      this.building = false
    } else {
      if (this.building) {
        this.building.destroy()
        this.building = false
      }
      this.building = new BuildingClass(-100, 0, {grid: this.grid})
    }
  }

  update(dt) {
    this.scheduler.update(dt)
    this.time += (dt * 16.66) / 1000
    const wave = this.waves[this.nextWave]

    if (!wave) {
      if (Entity.find('enemy').length === 0) this.onWin()
      Entity.level.nextWaveTime = -1
      return
    }

    Entity.level.nextWaveTime = Math.ceil(wave.time - this.time)
    if (this.time >= wave.time) {
      times(wave.n, (i) => {
        this.scheduler.schedule(
          i * 1000,
          () => new Enemy(this.start.x, this.start.y, { path: this.path })
        )
      })
      this.nextWave++
    }
  }
}
