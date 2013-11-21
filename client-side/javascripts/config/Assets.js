/**
 * Ref to all assets used within the game, to be loaded by the Pixi.js asset
 * loader.  Dispatches a complete event on complete
 */

var path = require('./AppConfig').ASSET_PATH

var Assets = {


  manifest: [
    {
      name: 'homeSprite',
      src: path + 'spritesheets/sprites-home.png',

      width: 231,
      height: 90,

      spritesheet: {
        "images": [path + "spritesheets/sprites-home.png"],
        "frames": [

            [355, 2, 310, 284],
            [355, 288, 554, 120],
            [667, 2, 960, 170],
            [911, 251, 740, 131],
            [1186, 174, 413, 51],
            [2, 2, 351, 408],
            [667, 174, 517, 75]
        ],
        "animations": {

                "home-elf":[0],
                "home-ground-back":[1],
                "home-ground-front":[2],
                "home-ground-middle":[3],
                "home-shadow-E":[4],
                "home-text-E-w-drift":[5],
                "home-title-ww":[6]
        },
        "frequency": 12
      }
    },
  ]

}

module.exports = Assets