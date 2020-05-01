import Level from "./Level";
import Entity from "../entities/Entity";

export default class Game {
    constructor() {
        this.startLevel()
    }

    startLevel() {
        this.level = new Level({
            onWin: () => {
                Entity.clear()
                this.startLevel()
            }
        })
    }

    update(dt) {
        this.level.update(dt)
    }
}