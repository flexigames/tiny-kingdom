import * as PIXI from "pixi.js"
import WebFont from "webfontloader"
import parseTextures from './lib/parse-textures'
import Entity from './entities/Entity'

const SPRITESHEET = 'spritesheet.json'

function start() {
    const app = createApp()
    app.loader.add(SPRITESHEET).load(setup)

    function setup(loader, resources) {
        const textures = parseTextures(resources[SPRITESHEET].textures)
    
        app.stage.sortableChildren = true
    
        app.ticker.add(gameLoop)
    
        Entity.init(app.stage, textures)
    
        new Entity(10, 10, { sprite: 'enemy' })
    
        function gameLoop() {
    
        }
    }
}

function createApp() {
    const app = new PIXI.Application({
        width: 166,
        height: 144,
        backgroundColor: 0x000000,
        antialias: false,
    })

    document.body.appendChild(app.view)

    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST

    return app
}

WebFont.load({
    custom: {
        families: ["Silkscreen"],
        urls: ["assets/fonts/fonts.css"],
    },
    active: start,
})