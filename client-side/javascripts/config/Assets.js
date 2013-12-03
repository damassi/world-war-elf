/**
 * Ref to all assets used within the game, to be loaded by the Pixi.js asset
 * loader.  Dispatches a complete event on complete
 */

var path = require('./AppConfig').ASSET_PATH


var Assets = {


  manifest: [

    {
      name: 'placeholder-home',
      src: path + 'placeholder-home.jpg',
    },

    {
      name: 'placeholder-highscores',
      src: path + 'placeholder-highscores.jpg',
    },

    {
      name: 'placeholder-instructions',
      src: path + 'placeholder-instructions.jpg',
    },

    {
      name: 'placeholder-sync',
      src: path + 'placeholder-sync.jpg',
    },

    {
      name: 'placeholder-calibrate',
      src: path + 'placeholder-calibrate.jpg',
    },

    {
      name: 'placeholder-gameplay',
      src: path + 'placeholder-gameplay.jpg',
    },

    {
      name: 'placeholder-submit-score',
      src: path + 'placeholder-submit-score.jpg',
    },

    {
      name: 'frame-background',
      src: path + 'frame-background.jpg',
    },

    {
        name: 'elf1',
        src: path + 'spritesheets/elf-1.png',

        spritesheet: {
            "animations": {"bad": {"frames": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 0]}, "good": {"frames": [19]}},
            "images": [path + 'spritesheets/elf-1.png'],
            "frames": [
                [2, 2, 252, 252, 0, -36, -6],
                [258, 2, 252, 252, 0, -36, -6],
                [514, 2, 252, 252, 0, -36, -6],
                [770, 2, 252, 252, 0, -36, -6],
                [1026, 2, 252, 252, 0, -36, -6],
                [1282, 2, 252, 252, 0, -36, -6],
                [1538, 2, 252, 252, 0, -36, -6],
                [1794, 2, 252, 252, 0, -36, -6],
                [2, 258, 252, 252, 0, -36, -6],
                [258, 258, 252, 252, 0, -36, -6],
                [514, 258, 252, 252, 0, -36, -6],
                [770, 258, 252, 252, 0, -36, -6],
                [1026, 258, 252, 252, 0, -36, -6],
                [1282, 258, 252, 252, 0, -36, -6],
                [1538, 258, 252, 252, 0, -36, -6],
                [1794, 258, 252, 252, 0, -36, -6],
                [2, 514, 252, 252, 0, -36, -6],
                [258, 514, 252, 252, 0, -36, -6],
                [514, 514, 252, 252, 0, -36, -6],
                [770, 514, 252, 252, 0, -36, -6]
            ]
        }
    },

    {
        name: 'elf2',
        src: path + 'spritesheets/elf-2.png',

        spritesheet: {
            "animations": {"bad": {"frames": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 0]}, "good": {"frames": [19]}},
            "images": [path + 'spritesheets/elf-2.png'],
            "frames": [
                [2, 2, 124, 252, 0, -41, -3],
                [130, 2, 124, 252, 0, -41, -3],
                [258, 2, 124, 252, 0, -41, -3],
                [386, 2, 124, 252, 0, -41, -3],
                [514, 2, 124, 252, 0, -41, -3],
                [642, 2, 124, 252, 0, -41, -3],
                [770, 2, 124, 252, 0, -41, -3],
                [898, 2, 124, 252, 0, -41, -3],
                [1026, 2, 124, 252, 0, -41, -3],
                [1154, 2, 124, 252, 0, -41, -3],
                [1282, 2, 124, 252, 0, -41, -3],
                [1410, 2, 124, 252, 0, -41, -3],
                [1538, 2, 124, 252, 0, -41, -3],
                [1666, 2, 124, 252, 0, -41, -3],
                [1794, 2, 124, 252, 0, -41, -3],
                [1922, 2, 124, 252, 0, -41, -3],
                [2, 258, 124, 252, 0, -41, -3],
                [130, 258, 124, 252, 0, -41, -3],
                [258, 258, 124, 252, 0, -41, -3],
                [386, 258, 124, 252, 0, -41, -3]
            ]
        }
    },

    {
        name: 'elf3',
        src: path + 'spritesheets/elf-3.png',

        spritesheet: {
            "animations": {"bad": {"frames": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 0]}, "good": {"frames": [19]}},
            "images": [path + 'spritesheets/elf-3.png'],
            "frames": [
                [2, 2, 252, 252, 0, -19, -2],
                [258, 2, 252, 252, 0, -19, -2],
                [514, 2, 252, 252, 0, -19, -2],
                [770, 2, 252, 252, 0, -19, -2],
                [1026, 2, 252, 252, 0, -19, -2],
                [1282, 2, 252, 252, 0, -19, -2],
                [1538, 2, 252, 252, 0, -19, -2],
                [1794, 2, 252, 252, 0, -19, -2],
                [2, 258, 252, 252, 0, -19, -2],
                [258, 258, 252, 252, 0, -19, -2],
                [514, 258, 252, 252, 0, -19, -2],
                [770, 258, 252, 252, 0, -19, -2],
                [1026, 258, 252, 252, 0, -19, -2],
                [1282, 258, 252, 252, 0, -19, -2],
                [1538, 258, 252, 252, 0, -19, -2],
                [1794, 258, 252, 252, 0, -19, -2],
                [2, 514, 252, 252, 0, -19, -2],
                [258, 514, 252, 252, 0, -19, -2],
                [514, 514, 252, 252, 0, -19, -2],
                [770, 514, 252, 252, 0, -19, -2]
            ]
        }
    },

    {
      name: 'gameplaySprite',
      src: path + 'spritesheets/sprites-game.png',

      spritesheet: {
        "images": [path + "spritesheets/sprites-game.png"],
        "frames": [

            [1449, 192, 112, 113],
            [1354, 192, 93, 144],
            [1115, 192, 113, 184],
            [1230, 192, 122, 142],
            [2, 2, 960, 255],
            [2, 259, 960, 165],
            [964, 2, 960, 188],
            [1001, 371, 33, 36],
            [964, 371, 35, 39],
            [964, 192, 149, 177]
        ],
        "animations": {

                "game-crosshairs":[0],
                "game-enemy-1":[1],
                "game-enemy-2":[2],
                "game-enemy-3":[3],
                "game-ground-back":[4],
                "game-ground-front":[5],
                "game-ground-middle":[6],
                "game-hud-clock":[7],
                "game-hud-gift":[8],
                "game-sign-popup":[9]
        },
      }
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