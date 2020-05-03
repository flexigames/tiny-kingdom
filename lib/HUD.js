import * as PIXI from 'pixi.js'
import Entity from '../entities/Entity'
import Tower from '../entities/Tower'
import Windmill from '../entities/Windmill'


const buildings = [
    Tower,
    Windmill
]

export default class HUD {
    constructor(game) {
        this.game = game
        this.container = new PIXI.Container()
        game.stage.addChild(this.container)
        this.createMoneyText()
        this.createNextWavesText()
        this.createLevelText()
        this.createBuildingMenu()
    }

    createBuildingMenu() {
        buildings.forEach((buildingClass, i) => {
            const building = Entity.createSprite(800 + 64 * i, 1130, buildingClass.id + '-icon')
            building.scale = { x: 8, y: 8 }
            building.interactive = true
            building.buttonMode = true
            building.on('mouseup', () => this.game.level.setBuilding(buildingClass))
            this.container.addChild(building)
        })
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
        this.container.addChild(moneyText)
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
        this.container.addChild(nextWaveText)
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
        this.container.addChild(levelText)
    }

    update(dt) {
        this.money.text = 'coins: ' + this.game.level.money
        this.nextWave.text = this.game.level.nextWaveTime >= 0 ? 'next wave in: ' + this.game.level.nextWaveTime : 'no more waves'
        this.level.text = 'level: ' + this.game.levelCount
    }
}