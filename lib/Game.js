import Level from "./Level";
import Entity from "../entities/Entity";
import HUD from "./HUD";

export default class Game {
    constructor({stage}) {
        this.stage = stage

        this.startLevel()

        this.hud = new HUD(this)

        Entity.game = this
    }

    startLevel() {
        const level = new Level({
            onWin: () => {
                Entity.clear()
                this.startLevel()
            }
        })
        Entity.level = level
        this.level = level
    }

    update(dt) {
        this.level.update(dt)
        this.hud.update(dt)
    }
}