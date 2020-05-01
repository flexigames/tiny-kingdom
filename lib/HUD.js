import * as PIXI from 'pixi.js' 
import Entity from '../entities/Entity'

export default class HUD {
    constructor(game) {
        this.game = game
        this.stage = game.stage
        this.createMoneyText()
        this.createNextWavesText()
        this.createLevelText()
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

    createLevelText() {
        const levelText = new PIXI.Text('', {
            fontFamily: 'Silkscreen',
            fontSize: 8,
            fill: 0x7C3F59,
            align: 'center'
          })
        levelText.x = 20
        levelText.y = 0
        levelText.scale.set(8)
        this.level = levelText
        this.stage.addChild(levelText)
    }

    update(dt) {
        this.money.text = 'coins: ' + this.game.level.money
        this.nextWave.text = this.game.level.nextWaveTime >= 0 ? 'next wave in: ' + this.game.level.nextWaveTime : 'no more waves'
        this.level.text = 'level: ' + this.game.levelCount
    }
}