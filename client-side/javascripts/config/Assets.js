/**
 * Ref to all assets used within the game, to be loaded by the Pixi.js asset
 * loader.  Dispatches a complete event on complete
 */

var path = require('./AppConfig').ASSET_PATH


var Assets = {


  manifest: [

    {
      name: 'placeholder-home',
      src: path + '/placeholder-home.jpg',
    },

    {
      name: 'homeSprite',
      src: path + 'spritesheets/sprites-home.png',

      spritesheet: {
        "images": [path + "spritesheets/sprites-home.png"],
        "frames": [

            [898, 251, 277, 21],
            [1177, 251, 258, 18],
            [667, 251, 229, 22],
            [1186, 227, 199, 13],
            [355, 2, 310, 284],
            [355, 288, 554, 120],
            [667, 2, 960, 170],
            [911, 274, 740, 131],
            [1186, 174, 413, 51],
            [2, 2, 351, 408],
            [667, 174, 517, 75]
        ],
        "animations": {

                "home-btn-play-shadow":[0],
                "home-btn-play-snow":[1],
                "home-btn-scores-shadow":[2],
                "home-btn-scores-snow":[3],
                "home-elf":[4],
                "home-ground-back":[5],
                "home-ground-front":[6],
                "home-ground-middle":[7],
                "home-shadow-E":[8],
                "home-text-E-w-drift":[9],
                "home-title-ww":[10]
        },
        "frequency": 12
      }
    },

    {
      name: 'home-btn-play',
      src: path + 'spritesheets/sprite-btn-play.png',

      spritesheet: {
        "animations": {"out": {"frames": [9, 10, 11, 12, 13, 14, 15, 16, 17, 18]}, "all": {"frames": [8]}, "over": {"frames": [0, 1, 2, 3, 4, 5, 6, 7]}},
        "images": [path + "spritesheets/sprite-btn-play.png"],
        "frames": [
            [2, 2, 508, 124, 0, -2, -2],
            [514, 2, 508, 124, 0, -2, -2],
            [1026, 2, 508, 124, 0, -2, -2],
            [1538, 2, 508, 124, 0, -2, -2],
            [2, 130, 508, 124, 0, -2, -2],
            [514, 130, 508, 124, 0, -2, -2],
            [1026, 130, 508, 124, 0, -2, -2],
            [1538, 130, 508, 124, 0, -2, -2],
            [2, 258, 508, 124, 0, -2, -2],
            [514, 258, 508, 124, 0, -2, -2],
            [1026, 258, 508, 124, 0, -2, -2],
            [1538, 258, 508, 124, 0, -2, -2],
            [2, 386, 508, 124, 0, -2, -2],
            [514, 386, 508, 124, 0, -2, -2],
            [1026, 386, 508, 124, 0, -2, -2],
            [1538, 386, 508, 124, 0, -2, -2],
            [2, 514, 508, 124, 0, -2, -2],
            [514, 514, 508, 124, 0, -2, -2],
            [1026, 514, 508, 124, 0, -2, -2]
        ]
      }
    },

    {
      name: 'home-btn-score',
      src: path + 'spritesheets/sprite-btn-scores.png',

      spritesheet: {
        "animations": {"out": {"frames": [9, 10, 11, 12, 13, 14, 15, 16, 17, 18]}, "all": {"frames": [8]}, "over": {"frames": [0, 1, 2, 3, 4, 5, 6, 7]}},
        "images": [path + "spritesheets/sprite-btn-scores.png"],
        "frames": [
            [2, 2, 252, 60, 0, -5, -2],
            [258, 2, 252, 60, 0, -5, -2],
            [514, 2, 252, 60, 0, -5, -2],
            [770, 2, 252, 60, 0, -5, -2],
            [1026, 2, 252, 60, 0, -5, -2],
            [1282, 2, 252, 60, 0, -5, -2],
            [1538, 2, 252, 60, 0, -5, -2],
            [1794, 2, 252, 60, 0, -5, -2],
            [2, 66, 252, 60, 0, -5, -2],
            [258, 66, 252, 60, 0, -5, -2],
            [514, 66, 252, 60, 0, -5, -2],
            [770, 66, 252, 60, 0, -5, -2],
            [1026, 66, 252, 60, 0, -5, -2],
            [1282, 66, 252, 60, 0, -5, -2],
            [1538, 66, 252, 60, 0, -5, -2],
            [1794, 66, 252, 60, 0, -5, -2],
            [2, 130, 252, 60, 0, -5, -2],
            [258, 130, 252, 60, 0, -5, -2],
            [514, 130, 252, 60, 0, -5, -2]
        ]
      }
    }
  ]

}

module.exports = Assets