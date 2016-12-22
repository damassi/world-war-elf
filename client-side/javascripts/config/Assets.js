/**
 * Ref to all assets used within the game, to be loaded by the Pixi.js asset
 * loader.  Dispatches a complete event on complete
 */

var path  = require('./AppConfig').IMAGE_PATH
var audioPath = require('./AppConfig').AUDIO_PATH

var Assets = {

  manifest: [

    // Audio assets

    {
        audioId: 'audio-bg',
        src: audioPath + 'bg-carolbells.mp3'
    },
    {
        audioId: 'audio-throw-1',
        src: audioPath + 'whoosh.mp3'
    },
    {
        audioId: 'audio-throw-2',
        src: audioPath + 'whoosh2.mp3'
    },
    {
        audioId: 'bonus-hit-candycane',
        src: audioPath + 'bonus-hit.mp3'
    },
    {
        audioId: 'snowball-hit-1',
        src: audioPath + 'hit-1.mp3'
    },
    {
        audioId: 'zombie-hit-1',
        src: audioPath + 'grunt-1.mp3'
    },
    {
        audioId: 'zombie-hit-2',
        src: audioPath + 'grunt-2.mp3'
    },
    {
        audioId: 'zombie-hit-3',
        src: audioPath + 'grunt-3.mp3'
    },
    {
        audioId: 'zombie-hit-4',
        src: audioPath + 'grunt-4.mp3'
    },


    // Visual assets

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
      name: 'snowballs',
      src: path + 'spritesheets/snowballs.png',
      spritesheet: {
        "images": [path + 'spritesheets/snowballs.png'],
        "frames": [

            [169, 2, 165, 165],
            [2, 2, 165, 165]
        ],
        "animations": {
                "snowball-candycane":[0],
                "snowball-plain":[1]
        },
      }
    },
    {
      name: 'txt-game-over',
      src: path + 'txt-game-over.png',
    },
    {
      name: 'frame-background',
      src: path + 'frame-background.jpg',
    },
    {
        name: 'mute',
        src: path + 'spritesheets/mute.png',
        spritesheet: {
            "images": [path + 'spritesheets/mute.png'],
            "frames": [

                [53, 2, 49, 35],
                [2, 2, 49, 35]
            ],
            "animations": {

                    "shell-mute-off":[0],
                    "shell-mute-on":[1]
            },
        }
    },
    {
        name: 'splat',
        src: path + 'spritesheets/splat.png',
        spritesheet: {
          framerate: 14,

          "images": [path + 'spritesheets/splat.png'],
          "frames": [[2, 2, 60, 124, 0, -5, -7], [66, 2, 60, 124, 0, -5, -7], [130, 2, 60, 124, 0, -5, -7], [194, 2, 60, 124, 0, -5, -7], [258, 2, 60, 124, 0, -5, -7], [322, 2, 60, 124, 0, -5, -7], [386, 2, 60, 124, 0, -5, -7]],
          "animations": {"hit": {"frames": [0, 1, 2, 3, 4, 5, 6]}, "all": {"frames": [6]}}
        }
    },
    {
      name: 'sign-gift',
      src: path + 'spritesheets/sign-gift.png',

      spritesheet: {
        framerate: 40,

        "animations": {"hit": {"frames": [19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 40, 40, 40]}, "all": {"frames": [0]}, "start": {"frames": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]}},
        "images": [path + 'spritesheets/sign-gift.png'],
        "frames": [
            [2, 2, 252, 252, 0, -27, -7],
            [258, 2, 252, 252, 0, -27, -7],
            [514, 2, 252, 252, 0, -27, -7],
            [770, 2, 252, 252, 0, -27, -7],
            [1026, 2, 252, 252, 0, -27, -7],
            [1282, 2, 252, 252, 0, -27, -7],
            [1538, 2, 252, 252, 0, -27, -7],
            [1794, 2, 252, 252, 0, -27, -7],
            [2, 258, 252, 252, 0, -27, -7],
            [258, 258, 252, 252, 0, -27, -7],
            [514, 258, 252, 252, 0, -27, -7],
            [770, 258, 252, 252, 0, -27, -7],
            [1026, 258, 252, 252, 0, -27, -7],
            [1282, 258, 252, 252, 0, -27, -7],
            [1538, 258, 252, 252, 0, -27, -7],
            [1794, 258, 252, 252, 0, -27, -7],
            [2, 514, 252, 252, 0, -27, -7],
            [258, 514, 252, 252, 0, -27, -7],
            [514, 514, 252, 252, 0, -27, -7],
            [770, 514, 252, 252, 0, -27, -7],
            [1026, 514, 252, 252, 0, -27, -7],
            [1282, 514, 252, 252, 0, -27, -7],
            [1538, 514, 252, 252, 0, -27, -7],
            [1794, 514, 252, 252, 0, -27, -7],
            [2, 770, 252, 252, 0, -27, -7],
            [258, 770, 252, 252, 0, -27, -7],
            [514, 770, 252, 252, 0, -27, -7],
            [770, 770, 252, 252, 0, -27, -7],
            [1026, 770, 252, 252, 0, -27, -7],
            [1282, 770, 252, 252, 0, -27, -7],
            [1538, 770, 252, 252, 0, -27, -7],
            [1794, 770, 252, 252, 0, -27, -7],
            [2, 1026, 252, 252, 0, -27, -7],
            [258, 1026, 252, 252, 0, -27, -7],
            [514, 1026, 252, 252, 0, -27, -7],
            [770, 1026, 252, 252, 0, -27, -7],
            [1026, 1026, 252, 252, 0, -27, -7],
            [1282, 1026, 252, 252, 0, -27, -7],
            [1538, 1026, 252, 252, 0, -27, -7],
            [1794, 1026, 252, 252, 0, -27, -7],
            [2, 1282, 252, 252, 0, -27, -7]
        ]
      }
    },
    {
      name: 'sign-candycane',
      src: path + 'spritesheets/sign-candycane.png',

      spritesheet: {
        framerate: 40,

        "images": [path + 'spritesheets/sign-candycane.png'],
        "animations": {"hit": {"frames": [19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 40, 40, 40]}, "all": {"frames": [0]}, "start": {"frames": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]}},
        "frames": [
            [2, 2, 252, 252, 0, -6, -2],
            [258, 2, 252, 252, 0, -6, -2],
            [514, 2, 252, 252, 0, -6, -2],
            [770, 2, 252, 252, 0, -6, -2],
            [1026, 2, 252, 252, 0, -6, -2],
            [1282, 2, 252, 252, 0, -6, -2],
            [1538, 2, 252, 252, 0, -6, -2],
            [1794, 2, 252, 252, 0, -6, -2],
            [2, 258, 252, 252, 0, -6, -2],
            [258, 258, 252, 252, 0, -6, -2],
            [514, 258, 252, 252, 0, -6, -2],
            [770, 258, 252, 252, 0, -6, -2],
            [1026, 258, 252, 252, 0, -6, -2],
            [1282, 258, 252, 252, 0, -6, -2],
            [1538, 258, 252, 252, 0, -6, -2],
            [1794, 258, 252, 252, 0, -6, -2],
            [2, 514, 252, 252, 0, -6, -2],
            [258, 514, 252, 252, 0, -6, -2],
            [514, 514, 252, 252, 0, -6, -2],
            [770, 514, 252, 252, 0, -6, -2],
            [1026, 514, 252, 252, 0, -6, -2],
            [1282, 514, 252, 252, 0, -6, -2],
            [1538, 514, 252, 252, 0, -6, -2],
            [1794, 514, 252, 252, 0, -6, -2],
            [2, 770, 252, 252, 0, -6, -2],
            [258, 770, 252, 252, 0, -6, -2],
            [514, 770, 252, 252, 0, -6, -2],
            [770, 770, 252, 252, 0, -6, -2],
            [1026, 770, 252, 252, 0, -6, -2],
            [1282, 770, 252, 252, 0, -6, -2],
            [1538, 770, 252, 252, 0, -6, -2],
            [1794, 770, 252, 252, 0, -6, -2],
            [2, 1026, 252, 252, 0, -6, -2],
            [258, 1026, 252, 252, 0, -6, -2],
            [514, 1026, 252, 252, 0, -6, -2],
            [770, 1026, 252, 252, 0, -6, -2],
            [1026, 1026, 252, 252, 0, -6, -2],
            [1282, 1026, 252, 252, 0, -6, -2],
            [1538, 1026, 252, 252, 0, -6, -2],
            [1794, 1026, 252, 252, 0, -6, -2],
            [2, 1282, 252, 252, 0, -6, -2]
        ]
      }
    },
    {
        name: 'elf1',
        src: path + 'spritesheets/elf-1.png',

        spritesheet: {
            framerate: 40,

            "animations": {"start": {"frames": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 0]}, "hit": {"frames": [19]}},
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
            framerate: 40,

            "animations": {"start": {"frames": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 0]}, "hit": {"frames": [19]}},
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
            framerate: 50,

            "images": [path + 'spritesheets/elf-3.png'],
            "frames": [
                [0, 0, 256, 256, 0, -3, 0],
                [256, 0, 256, 256, 0, -3, 0],
                [512, 0, 256, 256, 0, -3, 0],
                [768, 0, 256, 256, 0, -3, 0],
                [1024, 0, 256, 256, 0, -3, 0],
                [1280, 0, 256, 256, 0, -3, 0],
                [1536, 0, 256, 256, 0, -3, 0],
                [1792, 0, 256, 256, 0, -3, 0],
                [0, 256, 256, 256, 0, -3, 0],
                [256, 256, 256, 256, 0, -3, 0],
                [512, 256, 256, 256, 0, -3, 0],
                [768, 256, 256, 256, 0, -3, 0],
                [1024, 256, 256, 256, 0, -3, 0],
                [1280, 256, 256, 256, 0, -3, 0],
                [1536, 256, 256, 256, 0, -3, 0],
                [1792, 256, 256, 256, 0, -3, 0],
                [0, 512, 256, 256, 0, -3, 0],
                [256, 512, 256, 256, 0, -3, 0],
                [512, 512, 256, 256, 0, -3, 0],
                [768, 512, 256, 256, 0, -3, 0],
                [1024, 512, 256, 256, 0, -3, 0]
            ],
            "animations": {"all": {"frames": [0]}, "start": {"frames": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]}, "throw": {"frames": [19, 19, 19, 19, 19, 19, 19, 19, 19]}, "hit": {"frames": [20]}}
        }
    },

    // GAMEPLAY Spritesheets

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

    // INSTRUCTIONS Spritesheet

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

    // HOME Spritesheet

    {
      name: 'homeSprite',
      src: path + 'spritesheets/sprites-home.png',

      spritesheet: {
        "images": [path + "spritesheets/sprites-home.png"],
        "frames": [

            [1239, 293, 299, 80],
            [355, 384, 300, 24],
            [888, 382, 258, 18],
            [1506, 79, 231, 65],
            [657, 382, 229, 22],
            [1148, 382, 199, 13],
            [355, 2, 187, 380],
            [544, 293, 693, 87],
            [1286, 160, 554, 120],
            [544, 2, 960, 156],
            [544, 160, 740, 131],
            [1540, 282, 413, 51],
            [2, 2, 351, 408],
            [1506, 2, 517, 75]
        ],
        "animations": {

            "home-btn-play-off":[0],
            "home-btn-play-shadow":[1],
            "home-btn-play-snow":[2],
            "home-btn-scores-off":[3],
            "home-btn-scores-shadow":[4],
            "home-btn-scores-snow":[5],
            "home-good-elf":[6],
            "home-grass-sprouts":[7],
            "home-ground-back":[8],
            "home-ground-front":[9],
            "home-ground-middle":[10],
            "home-shadow-E":[11],
            "home-text-E-w-drift":[12],
            "home-title-ww":[13]
        }
        }
    },

    // MISC Spritesheets

    {
      name: 'miscSprite',
      src: path + 'spritesheets/sprites-misc.png',

      spritesheet: {
        "images": [path + 'spritesheets/sprites-misc.png'],
        "frames": [

            [1224, 2, 136, 137],
            [553, 191, 228, 56],
            [1693, 180, 245, 68],
            [1240, 141, 451, 109],
            [1127, 2, 95, 160],
            [1693, 107, 310, 71],
            [553, 2, 572, 187],
            [783, 191, 118, 56],
            [1362, 107, 134, 32],
            [903, 232, 125, 22],
            [2, 2, 549, 251],
            [903, 191, 335, 39],
            [1362, 2, 617, 103]
        ],
        "animations": {

                "calibrate-target":[0],
                "highscores-btn-btn":[1],
                "highscores-btn-misc":[2],
                "highscores-text":[3],
                "phone-target":[4],
                "submit-btn":[5],
                "submit-text":[6],
                "sync-btn-back":[7],
                "sync-btn-grass":[8],
                "sync-btn-shadow":[9],
                "sync-phone":[10],
                "sync-text-sync":[11],
                "txt-calibrate":[12]
        },
      }

    }
  ]

}

module.exports = Assets
