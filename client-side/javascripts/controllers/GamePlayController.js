/**
 * Target controller handles logic relating to the creation, addition and deletion of gameplay targets
 *
 * @author Christopher Pappas
 * @date   11.29.13
 */

var GameEvent     = require('../events/GameEvent')
var AppEvent      = require('../events/AppEvent')
var PubSub        = require('../utils/PubSub')
var TargetFactory = require('../factories/TargetFactory')


var GamePlayController = Backbone.View.extend({


  /**
   * The time between shots that targets are freezed from being hit
   * @type {Number}
   */
  FIRE_INTERVAL_TIME: 1,


  /**
   * Flag to check if user is currently pressing the mouse cursor or
   * the fire button from a mobile device
   * @type {Boolean}
   */
  isFiring: false,


  /**
   * An array of currently occupied positions, based upon the matrix above
   * @type {Array}
   */
  occupiedPositions: null,



  initialize: function (options) {
    _.bindAll(this)

    this.gamePlayView      = options.gamePlayView
    this.container         = this.gamePlayView.container
    this.occupiedPositions = []

    TargetFactory.initialize()

    // Add throttler to prevent interval updates once targets are hit
    this.hitTarget = _.throttle( this._hitTarget, this.FIRE_INTERVAL_TIME * 1000 )

    this.addEventListeners()
  },



  addEventListeners: function () {
    PubSub.on( AppEvent.START_GAMEPLAY, this._onStartGamePlay )
  },



  removeEventListeners: function () {
    PubSub.off( AppEvent.TICK, this._onTick )
  },



  start: function () {
    PubSub.on( AppEvent.TICK, this._onTick )

    var x = -40

    for (var i = 0; i < 5; ++i) {
      var target = TargetFactory.createTarget()

      // Find the proper container on the view and add child to in
      // This resolves issues with depth sorting and dirty indexes
      this.gamePlayView[target.depth + 'Container'].addChild( target.instance )
    }
  },



  pause: function () {

  },



  stop: function() {
    this.removeEventListeners()
  },





  //+ EVENT HANDLERS
  // ------------------------------------------------------------



  _onStartGamePlay: function () {
    this.start()
  },



  _onStopGamePlay: function () {
    this.stop()
  },



  _onPauseGamePlay: function () {
    this.pause()
  },



  _onTick: function (event) {
    return

    if (!this.isFiring)
      return

    var i = 0
      , len = this.occupiedPositions.length
      , target

    for (i = 0; i < len; ++i) {
      target = this.occupiedPositions[i].instance

      if (ndgmr.checkRectCollision( this.crossHairs, target )
        && this.isFiring) {

        this.hitTarget( target )
      }
    }
  },




  //+ PRIVATE METHODS
  // ------------------------------------------------------------



  _hitTarget: function (target) {
    this.container.removeChild( target )

    var self = this

    // Reset fire interval interval
    TweenMax.delayedCall( this.FIRE_INTERVAL_TIME, function() {
      self.hitTargets = _.without( self.hitTargets, target )
      self.appModel.increaseHits()
    })
  },


})

module.exports = GamePlayController