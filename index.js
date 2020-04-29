import * as PIXI from 'pixi.js'
import WebFont from 'webfontloader'
import parseTextures from './lib/parse-textures'
import Entity from './entities/Entity'
import Enemy from './entities/Enemy'
import { times, random } from 'lodash'

const SPRITESHEET = 'spritesheet.json'

function start() {
  const app = createApp()
  app.loader.add(SPRITESHEET).load(setup)

  function setup(loader, resources) {
    const textures = parseTextures(resources[SPRITESHEET].textures)

    app.stage.sortableChildren = true

    app.ticker.add(gameLoop)

    Entity.init(app.stage, textures)

    new Enemy(10, 10, { sprite: 'enemy' })

    times(25).forEach((i) => {
      new Entity(60, 6 * i, { sprite: 'path' + random(1, 8) })
      new Entity(6 * i, 60, {
        sprite: 'path' + random(1, 8),
        spriteAngle: 90,
      })
    })

    function gameLoop(dt) {
      Entity.updateAll(dt)
    }
  }
}

function createApp() {
  const app = new PIXI.Application({
    width: 166,
    height: 144,
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
