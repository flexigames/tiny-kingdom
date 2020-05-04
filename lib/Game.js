import Level from "./Level";
import Entity from "../entities/Entity";
import HUD from "./HUD";
import StartScreen from "./StartScreen";
import GameOverScreen from "./GameOverScreen";

export default class Game {
    constructor({ stage, width, height }) {
        this.stage = stage
        this.height = height
        this.width = width

        const startScreen = new StartScreen({stage, width, height})
        startScreen.onStart = () => {
            this.currentScreen = null
            startScreen.destroy()
            this.hud = new HUD(this)
            this.startLevel()
        }
        this.currentScreen = startScreen

        this.levelCount = 1

        document.addEventListener('keyup', (e) => {
            this.currentScreen?.onKeyboard(e.key)
        })

        Entity.game = this
    }

    startLevel() {
        this.hud.container.visible = true
        const level = new Level({
            stage: this.stage,
            onWin: () => {
                Entity.clear()
                level.container.removeChildren()
                this.levelCount++
                this.startLevel()
            },
            onLose: () => {
                Entity.clear()
                level.container.removeChildren()
                this.hud.container.visible = false
                this.level = null
                this.hud.hidden = true
                this.currentScreen = new GameOverScreen({width: this.width, height: this.height, stage: this.stage})
                this.currentScreen.onContinue = () => {
                    this.stage.removeChild(this.currentScreen.container)
                    this.levelCount = 1
                    this.startLevel()
                }
            }
        })
        Entity.level = level
        this.level = level
    }

    update(dt) {
        if (this.level) this.level.update(dt)
        if (this.hud && this.hud.container.visible) this.hud.update(dt)
    }
}