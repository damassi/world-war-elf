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
  FIRE_INTERVAL_TIME: .2,


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


  /**
   * Handles creation and management of targets
   * @type {TargetFactory}
   */
  targetFactory: null,



  initialize: function (options) {
    _.bindAll(this)

    this.gamePlayView = options.gamePlayView
    this.appModel     = this.gamePlayView.appModel
    this.container    = this.gamePlayView.container

    // Add throttler to prevent interval updates once targets are hit
    this.hitTarget = _.throttle( this._hitTarget, this.FIRE_INTERVAL_TIME * 1000 )

    this.addEventListeners()
  },



  addEventListeners: function () {
    PubSub.on( AppEvent.START_GAMEPLAY, this._onStartGamePlay )
    PubSub.on( AppEvent.STOP_GAMEPLAY, this._onStopGamePlay )

    this.listenTo( this.appModel, GameEvent.SHOOT, this._onShoot )
  },



  removeEventListeners: function () {
    PubSub.off( AppEvent.TICK, this._onTick )
  },



  start: function () {
    this.occupiedPositions = []

    this.targetFactory = new TargetFactory()

    PubSub.on( AppEvent.TICK, this._onTick )

    for (var i = 0; i < 10; ++i) {
      var targetView = this.targetFactory.createTarget()

      // Find the proper container on the view and add child to in
      // This resolves issues with depth sorting and dirty indexes
      var rowContainer = this.gamePlayView[ targetView.orientation.depth + 'Container' ]

      rowContainer.addChild( targetView.instance )
    }
  },



  pause: function () {

  },



  stop: function() {
    this.removeEventListeners()
    this.targetFactory.removeEventListeners()
    this.targetFactory = null
  },





  //+ EVENT HANDLERS
  // ------------------------------------------------------------



  _onShoot: function (event) {
    this.isFiring = true
  },



  _onTick: function (event) {
    if (!this.isFiring) return

    var occupiedPositions = this.targetFactory.occupiedPositions

    var i = 0
      , len = occupiedPositions.length
      , target

    for (i = 0; i < len; ++i) {
      target = occupiedPositions[i].instance

      if (ndgmr.checkRectCollision( this.gamePlayView.crossHairs, target )) {

        this.hitTarget( target )
      }
    }
  },



  _onStartGamePlay: function () {
    this.start()
  },



  _onStopGamePlay: function () {
    this.stop()
  },



  _onPauseGamePlay: function () {
    this.pause()
  },




  //+ PRIVATE METHODS
  // ------------------------------------------------------------



  _hitTarget: function (target) {
    if (target && target.parent)
      target.parent.removeChild( target )
    else
      return

    var self = this

    // Reset fire interval interval
    TweenMax.delayedCall( this.FIRE_INTERVAL_TIME, function() {
      self.isFiring = false

      self.appModel.increaseHits()
    })
  },


})

module.exports = GamePlayController