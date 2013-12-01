/**
 * View provides synching functionality for the mobile client
 *
 * @author christopher.pappas@popagency.com
 * @since  11.19.13
 */

var SocketEvent   = require('../../../../shared/events/SocketEvent')
var AppConfig     = require('../../config/AppConfig')
var AppEvent      = require('../../events/AppEvent')
var PubSub        = require('../../utils/PubSub')
var Easel         = require('../../utils/Easel')
var View          = require('../../supers/View')
var HUDView       = require('./HUDView')

var GamePlayController = require('../../controllers/GamePlayController')


var GamePlayView = View.extend({


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
    this._super(options)

    this.hudView = new HUDView({
      appModel : this.appModel,
      appController : this.appController
    })

    this.children = [
      this.backGround   = Easel.createSprite('gameplaySprite', 'game-ground-back', { x: 0, y: 148 }),
      this.middleGround = Easel.createSprite('gameplaySprite', 'game-ground-middle', { x: 0, y: 311 }),
      this.frontGround  = Easel.createSprite('gameplaySprite', 'game-ground-front', { x: 0, y: 453 }),
      this.crossHairs   = Easel.createSprite('gameplaySprite', 'game-crosshairs', { x: 468, y: 245 }, { center: true }),
    ]

    //Easel.dragObject( this.enemy1 )

    // Add throttler to prevent interval updates once targets are hit
    this.hitTarget = this._hitTarget //_.throttle( this._hitTarget, this.FIRE_INTERVAL_TIME * 1000 )
  },



  render: function () {
    this._super()

    var position = {
      x: AppConfig.DIMENSIONS.width * .5,
      y: AppConfig.DIMENSIONS.height * .5
    }

    this.addChildren( this.children )
    this.container.addChild( this.hudView.render().container )

    this.addDebugWindow()
    this.addEventListeners()

    return this
  },



  show: function (options) {

    var delay = 1
      , tweenTime = .8
      , height = AppConfig.DIMENSIONS.height * 2

    this.container.x = 0
    this.container.y = 0

    this.stage.addChild( this.container )

    TweenMax.from( this.backGround, .3, {
      y: height,
      ease: Expo.easeOut,
      delay: delay + .2
    })

    TweenMax.from( this.middleGround, .3, {
      y: height,
      ease: Expo.easeOut,
      delay: delay + .1
    })

    TweenMax.from( this.frontGround, .3, {
      y: height,
      ease: Expo.easeOut,
      delay: delay
    })
  },



  hide: function (options) {
    this.hudView.hide()
    this.removeEventListeners()
    this._super({ remove: true })
  },




  addEventListeners: function () {
    PubSub.on( AppEvent.TICK, this._onTick )

    window.socket.on( SocketEvent.ORIENTATION, this._onOrientationUpdate )
    window.socket.on( SocketEvent.FIRE, this._onFire )

    $(canvas).on( 'mousemove', this._onMouseMove )
    $(canvas).on( 'click', this._onFire )
  },



  removeEventListeners: function () {
    PubSub.off( AppEvent.TICK, this._onTick )

    window.socket.removeListener( SocketEvent.ORIENTATION, this._onOrientationUpdate )

    $(canvas).off( 'mousemove', this._onMouseMove )
    $(canvas).off( 'click', this._onFire )
  },



  addDebugWindow: function () {
    $('.desktop .message').html('desktop client connected')
    $('.mobile .message').html('mobile client connected')
    $('.btn-submit').remove()
    $('.input-sync').remove()
  },








  //+ EVENT HANDLERS
  // ------------------------------------------------------------


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



  _onFire: function (event) {
    this._fireShot()
  },



  _onMouseMove: function (event) {
    this._moveCroshairs({
      x: event.offsetX,
      y: event.offsetY
    })
  },



  _onOrientationUpdate: function (message) {
    var orientation = message.orientation

    this._moveCroshairs({
      x: orientation.x,
      y: orientation.y
    })
  },



  //+ PRIVATE METHODS
  // ------------------------------------------------------------



  _fireShot: function (position) {
    var fireTime = .4

    this.isFiring = true

    TweenMax.to( this.crossHairs, fireTime * .5, {
      scaleX: .8,
      scaleY: .8,
      yoyo: true,
      repeat: 1,
      ease: Back.easeInOut
    })

    var self = this

    TweenMax.to( this.crossHairs, fireTime, {
      rotation: 90,
      ease: Back.easeOut,
      onComplete: function () {
        this.target.rotation = 0
        self.isFiring = false
      }
    })
  },



  _hitTarget: function (target) {
    this.container.removeChild( target )

    var self = this

    // Reset fire interval interval
    TweenMax.delayedCall( this.FIRE_INTERVAL_TIME, function() {
      self.hitTargets = _.without( self.hitTargets, target )
      self.appModel.increaseHits()
    })
  },



  _moveCroshairs: function (position) {
    TweenMax.to( this.crossHairs, 1, {
      x: position.x,
      y: position.y,
      ease: Expo.easeOut
    })
  }

})

module.exports = GamePlayView