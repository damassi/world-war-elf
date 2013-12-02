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
    var orientation = this._returnOrientation()

    var targetView = new TargetView({
      orientation: {
        x: orientation.x,
        y: orientation.y,
        depth: orientation.depth
      }
    })

    this.occupiedPositions.push( targetView )

    return targetView
  },



  /**
   * Returns a position based upon the playMatrix defined above
   * @param  {c.DisplayObject} target The target to return the position for
   * @return {Object}
   */

  _returnOrientation: function () {
    var matrixOrientation = _.sample( this.playMatrix )
      , xPos = _.sample( matrixOrientation.xPositions )

    var newOrientation = {
      x: xPos,
      y: matrixOrientation.yPos,
      depth: matrixOrientation.depth
    }

    var i, len, orientation

    for (i = 0, len = this.occupiedPositions.length; i < len; ++i) {
      orientation = this.occupiedPositions[i].orientation

      if (_.isEqual( orientation, newOrientation )) {
        return this._returnOrientation()
      }
    }

    return newOrientation
  },

}

module.exports = TargetFactory
