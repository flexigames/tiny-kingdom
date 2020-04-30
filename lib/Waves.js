import {times} from 'lodash'
import Enemy from "../entities/Enemy"
import Path from "../entities/Path"
import V from '../lib/vec2'
import Entity from '../entities/Entity'

export default class Waves {
    constructor(waves, path, scheduler) {
        this.waves = waves
        this.path = path

        this.scheduler = scheduler

        this.start = V(path.start.x * Path.TILE_SIZE + 5, path.start.y * Path.TILE_SIZE + 6)

        this.time = 0

        this.nextWave = 0
    }

    update(dt) {
        this.time += dt * 16.66 / 1000
        const wave = this.waves[this.nextWave]


        if (!wave) {
            Entity.global.nextWaveTime = -1
            return
        }

        Entity.global.nextWaveTime = Math.ceil(wave.time - this.time)
        if (this.time >= wave.time) {
            times(wave.n, i => {
                this.scheduler.schedule(i * 1000, () =>  new Enemy(this.start.x, this.start.y, {path: this.path}))
            })
            this.nextWave++
        }
    }
}