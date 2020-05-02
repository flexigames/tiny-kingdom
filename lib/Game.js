import Level from "./Level";
import Entity from "../entities/Entity";
import HUD from "./HUD";
import StartScreen from "./StartScreen";

export default class Game {
    constructor({ stage, width, height }) {
        this.stage = stage

        const startScreen = new StartScreen({stage, width, height})
        startScreen.onStart = () => {
            startScreen.destroy()
            this.startLevel()
            this.hud = new HUD(this)
        }

        this.levelCount = 1

        Entity.game = this
    }

    startLevel() {
        const level = new Level({
            onWin: () => {
                Entity.clear()
                this.levelCount++
                this.startLevel()
            },
            onLose: () => {
                Entity.clear()
                this.levelCount = 1
                this.startLevel()
            }
        })
        Entity.level = level
        this.level = level
    }

    update(dt) {
        if (this.level) this.level.update(dt)
        if (this.hud) this.hud.update(dt)
    }
}