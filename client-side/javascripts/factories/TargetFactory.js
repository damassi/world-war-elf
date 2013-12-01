/**
 * The target factory handles the creation and initialization of gameplay targets
 *
 * @author Christopher Pappas
 * @date   12.1.13
 */

var Easel = require('../utils/Easel')


var TargetFactory = {


  /**
   * Defines placements for enemies and bonuses
   * @type {Array}
   */
  playMatrix: [
    {
      depth: 0,
      xPositions: [0, 100, 200, 300, 400, 500],
      yPos: 120
    },
    {
      depth: 2,
      xPositions: [0, 50, 150, 250, 350, 450],
      yPos: 190
    },
    {
      depth: 4,
      xPositions: [0, 100, 200, 300, 400, 500],
      yPos: 390
    }
  ],


  /**
   * An array of targets to be pooled during gameplay
   * @type {Array}
   */
  hitTargets: null,


  occupiedPositions: null,



  initialize: function () {
    this.hitTargets = [
      this.signPopUp    = Easel.createSprite('gameplaySprite', 'game-sign-popup', { x: 156, y: 401 }, { center: true  }),
      this.enemy1       = Easel.createSprite('gameplaySprite', 'game-enemy-2', { x: 290, y: 200 }),
      this.enemy2       = Easel.createSprite('gameplaySprite', 'game-enemy-3', { x: 763, y: 229 }),
      this.enemy0       = Easel.createSprite('gameplaySprite', 'game-enemy-1', { x: 163, y: 121 }),
    ]

    this.occupiedPositions = []
  },



  createTarget: function () {

    var target = _.sample( this.hitTargets )
    var position = this._returnPosition(target)

    if (typeof position === 'undefined')
      return

    target.x = position.x,
    target.y = position.y

    this.occupiedPositions.push( position )

    return position
  },



  /**
   * Returns a position based upon the playMatrix defined above
   * @param  {c.DisplayObject} target The target to return the position for
   * @return {Object}
   */

  _returnPosition: function (target) {
    var matrixPosition = _.sample( this.playMatrix ) //this.playMatrix[ Math.floor( Math.random() * this.playMatrix.length )]
      , xPos = _.sample( matrixPosition.xPositions ) //[ Math.floor( Math.random() * matrixPosition.xPositions.length )]


    var newPosition = {
      x: xPos,
      y: matrixPosition.yPos,
      depth: matrixPosition.depth,
      instance: target
    }

    var foundOccupiedPosition = false

    for (var i = 0, len = this.occupiedPositions.length; i < len; ++i) {
      var position = this.occupiedPositions[i]

      if (_.isEqual( position, newPosition )) {
        foundOccupiedPosition = true
        break
      }
    }

    if (foundOccupiedPosition) {
      this._returnPosition()
      return
    }

    return newPosition
  },

}

module.exports = TargetFactory
