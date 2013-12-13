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
var Target     = require('../views/gameplay/Target')


var TargetFactory = Backbone.View.extend({


  /**
   * Defines placements for enemies and bonuses
   * @type {Array}
   */
  playMatrix: [
    {
      depth: 'back',
      xPositions: [50, 200, 400, 600, 800],
      yPos: 70
    },
    {
      depth: 'middle',
      xPositions: [100, 300, 500, 700],
      yPos: 170
    },
    {
      depth: 'front',
      xPositions: [50, 200, 400, 600, 800],
      yPos: 300
    }
  ],


  /**
   * Reference to the gameplay view for pushing targets
   * into the proper containers
   * @type {GamePlayView}
   */
  gamePlayView: null,


  /**
   * Internal reference for all currently occupied positions
   * @type {Array}
   */
  occupiedPositions: null,




  initialize: function (options) {
    _.bindAll(this)

    this.gamePlayView = options.gamePlayView
    this.appModel = options.appModel

    this.occupiedPositions = []

    for (var i = 0; i < AppConfig.INITIAL_TARGETS; ++i) {
      this.createTarget()
    }

    this.addEventListeners()
  },



  cleanup: function() {
    this.removeEventListeners()
    this.occupiedPositions = []
  },



  addEventListeners: function ()  {
    PubSub.on( GameEvent.TARGET_HIT, this.onTargetHit )
    PubSub.on( GameEvent.KILL_ALL_TARGETS, this.onKillAllTargets )
  },



  removeEventListeners: function () {
    PubSub.off( GameEvent.TARGET_HIT, this.onTargetHit )
    PubSub.off( GameEvent.KILL_ALL_TARGETS, this.onKillAllTargets )
  },



  createTarget: function () {
    var orientation = this.returnOrientation()

    // TODO Frequency generator
    var type = this.returnTargetType()

    if (this.appModel.get('supermode'))
      type = 'bad'

    var target = new Target({
      appModel: this.appModel,
      stage: this.gamePlayView.stage,
      type: type,
      orientation: {
        x: orientation.x,
        y: orientation.y,
        depth: orientation.depth
      }
    })

    // Store ref to the actual TargetView container for hit detection delegation
    target.instance.targetView = target

    // Push position into game matrix - reversing array to make sure 'front' items are always evaluated first
    this.occupiedPositions.push( target )
    this.occupiedPositions = _.sortBy(this.occupiedPositions, function(r){ return r.orientation.y; })
    this.occupiedPositions.reverse()

    // Find the proper container on the view and add child to in
    // This resolves issues with depth sorting and dirty indexes
    var rowContainer = this.gamePlayView[ target.orientation.depth + 'Container' ]

    // Add to final stage
    rowContainer.addChild( target.instance )

    return target
  },



  /**
   * Ensure that there can only be one 'good' target in the array at any given point
   * @return {String} The target type, 'good|bad'
   */

  returnTargetType: function () {
    var type = _.sample([1,1,1,0,0,0,0,0,0,0]) === 0 ? 'bad' : 'good'
      , len  = this.occupiedPositions.length

    var i, target

    for (i = 0; i < len; ++i) {
      var target = this.occupiedPositions[i]

      if (target.type === 'good') {
        return 'bad'
      }
    }

    return type
  },



  /**
   * Returns a position based upon the playMatrix defined above
   * @param  {c.DisplayObject} target The target to return the position for
   * @return {Object}
   */

  returnOrientation: function () {
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
        return this.returnOrientation()
      }
    }

    return newOrientation
  },




  //+ EVENT HANDLERS
  // ------------------------------------------------------------



  onTargetHit: function (params) {
    var target = params.targetView

    this.occupiedPositions = _.without( this.occupiedPositions, target )

    this.createTarget()
  },



  onKillAllTargets: function (params) {
    params = params || {}

    var i, len, target

    for (i = 0, len = this.occupiedPositions.length; i < len; ++i) {
      target = this.occupiedPositions[i]

      // Clear the entire screen
      if (params.gameOver) {
        target.hit({
          supressPoints: true,
        })
      }

      // Just kill the badguys
      else if (target.type === 'bad' ) {
        target.hit({
          supressPoints: true,
          killAll: true
        })
      }
    }

    if (params.superMode)
      this.appModel.enableSupermode()

    Easel.bounceScreen($('#game-play'))
  }



})

module.exports = TargetFactory
