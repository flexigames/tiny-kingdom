import * as PIXI from 'pixi.js'
import WebFont from 'webfontloader'
import parseTextures from './lib/parse-textures'
import Entity from './entities/Entity'
import Enemy from './entities/Enemy'
import Path from './entities/Path'
import V from './lib/vec2'
import Spot from './entities/Spot'

const SPRITESHEET = 'spritesheet.json'

const level = {
  path: {
    start: { x: -1, y: 7 },
    steps: [
      V(9, 0),
      V(0, 4),
      V(4, 0),
      V(0, 2),
      V(8, 0),
    ]
  },
  spots: [
    { x: 92, y: 86 },
    { x: 85, y: 72 }
  ]
}

function start() {
  const app = createApp()
  app.loader.add(SPRITESHEET).load(setup)

  function setup(loader, resources) {
    const textures = parseTextures(resources[SPRITESHEET].textures)

    app.stage.sortableChildren = true

    app.ticker.add(gameLoop)

    Entity.init(app.stage, textures)


    new Enemy(level.path)
    setInterval(() => {
      new Enemy(leve.path)
    }, 10000)

    level.spots.forEach(spot => new Spot(spot.x, spot.y))

    Path.create(level.path)

    function gameLoop(dt) {
      Entity.updateAll(dt)
    }
  }
}

function createApp() {
  const app = new PIXI.Application({
    width: 166 * Entity.SCALE_FACTOR,
    height: 144 * Entity.SCALE_FACTOR,
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
