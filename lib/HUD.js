import * as PIXI from 'pixi.js'
import Entity from '../entities/Entity'
import Tower from '../entities/Tower'
import Windmill from '../entities/Windmill'
import Field from '../entities/Field'

const buildings = [Tower, Windmill, Field]

export default class HUD {
  constructor(game) {
    this.game = game
    this.container = new PIXI.Container()
    this.container.scale = { x: 8, y: 8 }
    game.stage.addChild(this.container)
    this.createMoneyText()
    this.createNextWavesText()
    this.createLevelText()
    this.createBuildingMenu()
  }

  createBuildingMenu() {
    const menuStart = Entity.createSprite(100, 141, 'menu-start')
    this.container.addChild(menuStart)

    const menuMiddle = Entity.createSprite(108, 141, 'menu-middle')
    this.container.addChild(menuMiddle)

    const menuEnd = Entity.createSprite(117, 141, 'menu-end')
    this.container.addChild(menuEnd)

    buildings.forEach((BuildingClass, i) => {
      const building = Entity.createSprite(
        98 + 8 * i,
        132,
        BuildingClass.id + '-icon'
      )
      building.anchor = { x: 0, y: 0 }
      building.interactive = true
      building.buttonMode = true
      building.on('mouseup', () => this.game.level.setBuilding(BuildingClass))
      this.container.addChild(building)
    })
  }

  createMoneyText() {
    const moneyText = new PIXI.Text('coins: 0', {
      fontFamily: 'Silkscreen',
      fontSize: 8,
      fill: 0x7c3f59,
      align: 'center',
    })
    moneyText.x = 940 / 8
    moneyText.y = 0
    this.money = moneyText
    this.container.addChild(moneyText)
  }

  createNextWavesText() {
    const nextWaveText = new PIXI.Text('', {
      fontFamily: 'Silkscreen',
      fontSize: 8,
      fill: 0x7c3f59,
      align: 'center',
    })
    nextWaveText.x = 20 / 8
    nextWaveText.y = 1050 / 8
    this.nextWave = nextWaveText
    this.container.addChild(nextWaveText)
  }

  createLevelText() {
    const levelText = new PIXI.Text('', {
      fontFamily: 'Silkscreen',
      fontSize: 8,
      fill: 0x7c3f59,
      align: 'center',
    })
    levelText.x = 20 / 8
    levelText.y = 0
    this.level = levelText
    this.container.addChild(levelText)
  }

  update(dt) {
    this.money.text = 'coins: ' + this.game.level.money
    this.nextWave.text =
      this.game.level.nextWaveTime >= 0
        ? 'next wave in: ' + this.game.level.nextWaveTime
        : 'no more waves'
    this.level.text = 'level: ' + this.game.levelCount
  }
}
