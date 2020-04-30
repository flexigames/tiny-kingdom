import * as PIXI from 'pixi.js' 
import Entity from '../entities/Entity'

export default class HUD {
    constructor(stage) {
        this.stage = stage
        this.createMoneyText()
        this.createNextWavesText()
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

    createNextWavesText() {
        const nextWaveText = new PIXI.Text('', {
            fontFamily: 'Silkscreen',
            fontSize: 8,
            fill: 0x7C3F59,
            align: 'center'
          })
        nextWaveText.x = 20
        nextWaveText.y = 1050
        nextWaveText.scale.set(8)
        this.nextWave = nextWaveText
        this.stage.addChild(nextWaveText)
    }

    update(dt) {
        this.money.text = 'coins: ' + Entity.global.money
        this.nextWave.text = Entity.global.nextWaveTime >= 0 ? 'next wave in: ' + Entity.global.nextWaveTime : 'no more waves'
    }
}