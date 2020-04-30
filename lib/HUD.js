import * as PIXI from 'pixi.js' 
import Entity from '../entities/Entity'

export default class HUD {
    constructor(stage) {
        this.stage = stage
        this.createMoneyText()
    }

    createMoneyText() {
        const moneyText = new PIXI.Text('coins: 0', {
            fontFamily: 'Silkscreen',
            fontSize: 8,
            fill: 0x7C3F59,
            align: 'center'
          })
        moneyText.x = 940
        moneyText.y = 0
        moneyText.scale.set(8)
        this.money = moneyText
        this.stage.addChild(moneyText)
    }

    update(dt) {
        this.money.text = 'coins: ' + Entity.global.money
    }
}