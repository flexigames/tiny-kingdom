import * as PIXI from 'pixi.js'
import WebFont from 'webfontloader'
import parseTextures from './lib/parse-textures'
import Entity from './entities/Entity'
import Enemy from './entities/Enemy'
import V from './lib/vec2'
import HUD from './lib/HUD'
import Level from './lib/Level'
import Game from './lib/Game'

const SPRITESHEET = 'spritesheet.json'

const width = 166 * Entity.SCALE_FACTOR
const height = 144 * Entity.SCALE_FACTOR

function start() {
  const app = createApp()
  app.loader.add(SPRITESHEET).load(setup)

  function setup(loader, resources) {
    const textures = parseTextures(resources[SPRITESHEET].textures)

    app.stage.sortableChildren = true

    app.ticker.add(gameLoop)

    app.ticker.speed = 1

    const world = new PIXI.Container()
    world.sortableChildren = true
    app.stage.addChild(world)

    Entity.init(world, textures)

    const game = new Game({ stage: app.stage, width, height })

    function gameLoop(dt) {
      Entity.updateAll(dt)
      game.update(dt)
    }
  }
}

function createApp() {
  const app = new PIXI.Application({
    width,
    height,
    backgroundColor: 0xfff6d3,
    antialias: false,
  })

  document.body.appendChild(app.view)

  PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST

  return app
}

WebFont.load({
  custom: {
    families: ['Silkscreen'],
    urls: ['assets/fonts/fonts.css'],
  },
  active: start,
})
