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
      name: 'placeholder-instructions',
      src: path + '/placeholder-instructions.jpg',
    },

    {
      name: 'frame-background',
      src: path + '/frame-background.jpg',
    },

    {
        name: 'instructionsSprite',
        src: path + 'spritesheets/sprites-instructions.png',

        spritesheet: {
            "images": [path + "spritesheets/sprites-instructions.png"],
            "frames": [

                [1134, 171, 245, 32],
                [933, 182, 199, 13],
                [1134, 105, 231, 64],
                [640, 182, 291, 20],
                [640, 100, 399, 80],
                [1041, 100, 62, 51],
                [1270, 2, 65, 101],
                [2, 2, 636, 204],
                [640, 2, 628, 96]
            ],
            "animations": {

                    "instructions-btn-mouse-grass":[0],
                    "instructions-btn-mouse-snow":[1],
                    "instructions-btn-mouse":[2],
                    "instructions-btn-phone-snow":[3],
                    "instructions-btn-phone":[4],
                    "instructions-mouse-gfx":[5],
                    "instructions-phone-gfx":[6],
                    "instructions-text-instructions":[7],
                    "instructions-text-mission":[8]
            },
        }
    },

    {
      name: 'homeSprite',
      src: path + 'spritesheets/sprites-home.png',

      spritesheet: {
        "images": [path + "spritesheets/sprites-home.png"],
        "frames": [

            [1317, 288, 300, 24],
            [1317, 338, 258, 18],
            [1317, 314, 229, 22],
            [1317, 358, 199, 13],
            [1317, 2, 310, 284],
            [2, 293, 693, 87],
            [2, 382, 554, 120],
            [2, 2, 960, 156],
            [2, 160, 740, 131],
            [1077, 412, 413, 51],
            [964, 2, 351, 408],
            [558, 412, 517, 75]
        ],
        "animations": {

                "home-btn-play-shadow":[0],
                "home-btn-play-snow":[1],
                "home-btn-scores-shadow":[2],
                "home-btn-scores-snow":[3],
                "home-elf":[4],
                "home-grass-sprouts":[5],
                "home-ground-back":[6],
                "home-ground-front":[7],
                "home-ground-middle":[8],
                "home-shadow-E":[9],
                "home-text-E-w-drift":[10],
                "home-title-ww":[11]
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