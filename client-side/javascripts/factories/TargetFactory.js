/**
 * The target factory handles the creation and initialization of gameplay targets
 *
 * @author Christopher Pappas
 * @date   12.1.13
 */

var Easel      = require('../utils/Easel')
var TargetView = require('../views/gameplay/TargetView')


var TargetFactory = {


  /**
   * Defines placements for enemies and bonuses
   * @type {Array}
   */
  playMatrix: [
    {
      depth: 'back',
      xPositions: [50, 200, 400, 600],
      yPos: 120
    },
    {
      depth: 'middle',
      xPositions: [100, 300, 500],
      yPos: 220
    },
    {
      depth: 'front',
      xPositions: [50, 200, 400, 600],
      yPos: 360
    }
  ],


  /**
   * An array of targets to be pooled during gameplay
   * @type {Array}
   */
  hitTargets: null,


  /**
   * Internal reference for all currently occupied positions
   * @type {Array}
   */
  occupiedPositions: null,



  initialize: function () {
    this.occupiedPositions = []
  },



  createTarget: function () {
    var position = this._returnPosition()

    return new TargetView({
      orientation: {
        x: position.x,
        y: position.y,
        depth: position.depth
      }
    })
  },



  /**
   * Returns a position based upon the playMatrix defined above
   * @param  {c.DisplayObject} target The target to return the position for
   * @return {Object}
   */

  _returnPosition: function () {
    var matrixPosition = _.sample( this.playMatrix )
      , xPos = _.sample( matrixPosition.xPositions )

    var newPosition = {
      x: xPos,
      y: matrixPosition.yPos,
      depth: matrixPosition.depth
    }

    var i, len, position

    for (i = 0, len = this.occupiedPositions.length; i < len; ++i) {
      position = this.occupiedPositions[i]

      if (_.isEqual( position, newPosition )) {
        return this._returnPosition()
      }
    }

    this.occupiedPositions.push( newPosition )

    return newPosition
  },

}

module.exports = TargetFactory
