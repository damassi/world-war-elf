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


  targetIds: [
    'game-enemy-1',
    'game-enemy-2',
    'game-enemy-3'
  ],


  /**
   * An array of targets to be pooled during gameplay
   * @type {Array}
   */
  hitTargets: null,



  occupiedPositions: null,



  initialize: function () {
    this.occupiedPositions = []
  },



  createTarget: function () {
    var target = Easel.createSprite('gameplaySprite', _.sample( this.targetIds ))
    var position = this._returnPosition(target)

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
    var matrixPosition = _.sample( this.playMatrix )
      , xPos = _.sample( matrixPosition.xPositions )

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
