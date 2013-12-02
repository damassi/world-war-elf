/**
 * The target factory handles the creation and initialization of gameplay targets
 *
 * @author Christopher Pappas
 * @date   12.1.13
 */

var AppConfig  = require('../config/AppConfig')
var Easel      = require('../utils/Easel')
var PubSub     = require('../utils/PubSub')
var GameEvent  = require('../events/GameEvent')
var TargetView = require('../views/gameplay/TargetView')


var TargetFactory = Backbone.View.extend({


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
   * Reference to the gameplay view for pushing targets
   * into the proper containers
   * @type {GamePlayView}
   */
  gamePlayView: null,


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



  initialize: function (options) {
    _.bindAll(this)

    this.gamePlayView = options.gamePlayView

    this.occupiedPositions = []

    for (var i = 0; i < AppConfig.INITIAL_TARGETS; ++i) {
      var targetView = this.createTarget()
    }

    this.addEventListeners()
  },



  addEventListeners: function ()  {
    PubSub.on( GameEvent.TARGET_HIT, this._onTargetHit )
  },



  removeEventListeners: function () {
    PubSub.off( GameEvent.TARGET_HIT, this._onTargetHit )
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

    // Store ref to the actual TargetView container for hit detection delegation
    targetView.instance.targetView = targetView

    // Cache for speed as well as Easel filters
    var bounds = targetView.instance.getBounds()
    targetView.instance.cache( bounds.x, bounds.y, bounds.width, bounds.height )

    // Push position into game matrix
    this.occupiedPositions.push( targetView )

    // Find the proper container on the view and add child to in
    // This resolves issues with depth sorting and dirty indexes
    var rowContainer = this.gamePlayView[ targetView.orientation.depth + 'Container' ]

    // Add to final stage
    rowContainer.addChild( targetView.instance )

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




  //+ EVENT HANDLERS
  // ------------------------------------------------------------



  _onTargetHit: function (params) {
    var targetView = params.targetView

    this.occupiedPositions = _.without( this.occupiedPositions, targetView )

    this.createTarget()
  }



})

module.exports = TargetFactory
