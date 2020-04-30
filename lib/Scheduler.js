import { last } from 'lodash'

export default class Scheduler {
    schedules = []
    time = 0

    update(dt) {
        this.time += dt * 16.66
        const next = last(this.schedules)
        if (next && next.time < this.time) {
            next.fn()
            this.schedules.pop()
        }
    }

    schedule(deltaTime, fn) {
        this.schedules.push({ time: this.time + deltaTime, fn })
        this.schedules.sort((a, b) => b.time - a.time)
    }
}