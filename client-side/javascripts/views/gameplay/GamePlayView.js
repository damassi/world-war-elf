/**
 * View provides synching functionality for the mobile client
 *
 * @author christopher.pappas@popagency.com
 * @since  11.19.13
 */

var SocketEvent        = require('../../../../shared/events/SocketEvent')
var AppConfig          = require('../../config/AppConfig')
var AppEvent           = require('../../events/AppEvent')
var GameEvent          = require('../../events/GameEvent')
var TargetFactory      = require('../../factories/TargetFactory')
var PubSub             = require('../../utils/PubSub')
var Easel              = require('../../utils/Easel')
var View               = require('../../supers/View')
var HUD                = require('./HUD')
var Snowball           = require('./Snowball')


var GamePlayView = View.extend({


  /**
   * Handles creation and management of targets
   * @type {TargetFactory}
   */
  targetFactory: null,

  /**
   * Container to hold back enemies
   * @type {c.Container}
   */
  backContainer: null,


  /**
   * Container to hold middle enemies
   * @type {c.Container}
   */
  middleContainer: null,


  /**
   * Container to hold front enemies
   * @type {c.Container}
   */
  frontContainer: null,


  /**
   * The user-controlled crosshairs
   * @type {c.Container}
   */
  crossHairs: null,


  /**
   * An array which stores all of the currently displayed snowballs
   * @type {Array}
   */
  snowballs: null,


  /**
   * Model reference property to check for socket connection
   * @type {Boolean}
   */
  connected: false,


  /**
   * Updated when the socket sends back a new phone orientation
   * @type {Object}
   */
  phoneOrientation: null,




  initialize: function (options) {
    this._super(options)

    this.hud = new HUD({
      stage : this.stage,
      appModel : this.appModel
    })

    this.children = [

      // Hold the back zombies
      this.backContainer = new c.Container(),
      this.backGround   = Easel.createSprite('gameplaySprite', 'game-ground-back', { x: 0, y: 148 }),

      // Middle zombies
      this.middleContainer = new c.Container(),
      this.middleGround = Easel.createSprite('gameplaySprite', 'game-ground-middle', { x: 0, y: 311 }),

      // Front zombies
      this.frontContainer = new c.Container(),
      this.frontGround  = Easel.createSprite('gameplaySprite', 'game-ground-front', { x: 0, y: 453 }),

      // The user-controlled target
      this.crossHairs   = Easel.createSprite('gameplaySprite', 'game-crosshairs', { x: 468, y: 245 }, { center: true }),

      this.redHitArea = new c.Shape( new c.Graphics().beginFill("#ff0000").drawRect( 0, 0, AppConfig.DIMENSIONS.width, AppConfig.DIMENSIONS.height ))
    ]


  },



  render: function () {
    this._super()

    this.connected = this.appModel.get('connected')

    this.phoneOrientation = {
      x: this.crossHairs.x,
      y: this.crossHairs.y
    }

    this.redHitArea.alpha = 0

    this.addChildren( this.children )
    this.addEventListeners()

    return this
  },



  addEventListeners: function () {
    window.socket.on( SocketEvent.ORIENTATION, this._onOrientationUpdate )
    window.socket.on( SocketEvent.SHOOT, this._onShoot )

    PubSub.on( AppEvent.START_GAMEPLAY, this._onStartGamePlay )
    PubSub.on( AppEvent.STOP_GAMEPLAY, this._onStopGamePlay )
    PubSub.on( GameEvent.PLAYER_HIT, this._onPlayerHit )

    $(canvas).on( 'mousemove', this._onMouseMove )
    $(canvas).on( 'mousedown', this._onPrepareTarget )
    $(canvas).on( 'mouseup', this._onShoot )
  },



  /**
   * remove our game over text and move us on
   * @param  {easel bitmap} bitmap the bitmap text to remove
   */
  removeGameOver: function(bitmap) {
      var self = this
      TweenMax.to(bitmap, .3,
        {y:450, ease:Back.easeIn, onComplete: function(){
          self.stage.removeChild(bitmap)
          setTimeout(function() {
            window.location.hash = '#/submit-score'
          }, 500)
        }
      })
  },



  removeEventListeners: function () {
    window.socket.removeListener( SocketEvent.ORIENTATION, this._onOrientationUpdate )
    window.socket.removeListener( SocketEvent.SHOOT, this._onShoot )

    PubSub.off( AppEvent.START_GAMEPLAY, this._onStartGamePlay )
    PubSub.off( AppEvent.STOP_GAMEPLAY, this._onStopGamePlay )
    PubSub.off( GameEvent.PLAYER_HIT, this._onPlayerHit )

    $(canvas).off( 'mousemove', this._onMouseMove )
    $(canvas).off( 'click', this._onShoot )
  },



  show: function (options) {

    var delay = 1
      , tweenTime = .8
      , height = AppConfig.DIMENSIONS.height * 2

    this.container.x = 0
    this.container.y = 0

    this.snowballs = []

    this.stage.addChild( this.container )
    this.container.addChild( this.hud.render().container )
    this.hud.show()

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

    TweenMax.fromTo( this.crossHairs, .2, { alpha: 0 }, {
      immediateRender: true,
      alpha: 1,
      ease: Linear.easeNone,
      delay: 1
    })

    TweenMax.fromTo( this.crossHairs, .4, { scaleX: 0, scaleY: 0 }, {
      immediateRender: true,
      scaleX: 1,
      scaleY: 1,
      ease: Expo.easeOut,
      delay: 1
    })

    PubSub.trigger( AppEvent.START_GAMEPLAY )
  },



  hide: function (options) {
    this.hud.hide()
    this.removeEventListeners()

    this._super({
      remove: true
    })
  },



  hideCrossHairs: function() {
    TweenMax.to(this.crossHairs, .3, {
      alpha: 0,
      ease: Expo.easeOut
    })
  },



  showCrossHairs: function() {
    TweenMax.to(this.crossHairs, .3, {
      alpha: 1,
      ease: Expo.easeOut
    })
  },




  //+ EVENT HANDLERS
  // ------------------------------------------------------------


  _onStartGamePlay: function () {
    var array = AppConfig.DEFAULT_GAMEPLAY_TIME.split(':')
    var seconds = parseInt(array[0]*60) + parseInt(array[1])

    AppConfig.gameplaySeconds = seconds


    this.targetFactory = new TargetFactory({
      appModel: this.appModel,
      gamePlayView: this
    })

    PubSub.on( AppEvent.TICK, this._onTick )
  },



  _onStopGamePlay: function () {
    this.removeEventListeners()
    this.targetFactory.removeEventListeners()

    _.each(this.targetFactory.occupiedPositions, function(target) {
      target.scurryAway()
    })

    var gameOverBitmap = Easel.createBitmap( 'txt-game-over', {x: 200, y:250 } )

    // Animate our game over screen in, then do something else
    this.stage.addChild( gameOverBitmap )

    var self = this

    TweenMax.fromTo(gameOverBitmap, .3, { y: 450 }, {
      y: 250,
      ease: Back.easeOut,
      onComplete: function(){

        // Slight delay and then kill the gameover
        setTimeout(function() {
          self.removeGameOver( gameOverBitmap )
        },
          3000
        )
      }
    })
  },



  _onPauseGamePlay: function () {

  },



  _onPrepareTarget: function (event) {
    var fireTweenTime = .4

     TweenMax.to( this.crossHairs, fireTweenTime * .5, {
      scaleX: .8,
      scaleY: .8,
      ease: Back.easeOut
    })

    TweenMax.to( this.crossHairs, fireTweenTime, {
      rotation: 90,
      ease: Back.easeOut
    })
  },



  _onShoot: function (event) {
    if (this.crossHairs.alpha !== 1)
      return

    var fireTweenTime = .4

    TweenMax.to( this.crossHairs, fireTweenTime * .5, {
      scaleX: 1,
      scaleY: 1,
      ease: Back.easeInOut
    })

    TweenMax.to( this.crossHairs, fireTweenTime, {
      rotation: 0,
      ease: Back.easeOut
    })

    this._throwSnowball()
  },



  _onTargetHit: function (params) {
    var target = params.target

    if (target && target.parent)
      target.targetView.hit()
    else
      return

    var self = this
  },



  _onPlayerHit: function (params) {
    TweenMax.killTweensOf(this.redHitArea)

    TweenMax.fromTo(this.redHitArea, .1, { alpha: 0 }, {
      alpha: .4,
      yoyo: true,
      repeat: 3,
      overwrite: 'all'
    })

    Easel.rattleScreen($('#game-play'))
  },



  _onMouseMove: function (event) {
    this._moveCroshairs({
      x: event.offsetX,
      y: event.offsetY
    })
  },



  _onOrientationUpdate: function (message) {

    // If DEBUG `mouse` param passed back from API
    if (message.mouse) {
      this._moveCroshairs(message.orientation)
      return
    }

    //console.log(message.orientation.x, message.orientation.y)

    this.phoneOrientation = {
      x: message.orientation.x * 2,
      y: message.orientation.y * 2
    }

  },



  _onTick: function() {
    if (!this.connected)
      return

    var dimensions = AppConfig.DIMENSIONS

    this.crossHairs.x += this.phoneOrientation.x
    this.crossHairs.y += this.phoneOrientation.y

    if (this.crossHairs.x < 0)
      this.crossHairs.x = 0

    if (this.crossHairs.x > dimensions.width)
      this.crossHairs.x = dimensions.width

    if (this.crossHairs.y < 0)
      this.crossHairs.y = 0

    if (this.crossHairs.y > dimensions.height)
      this.crossHairs.y = dimensions.height
  },




  //+ PRIVATE METHODS
  // ------------------------------------------------------------



  _moveCroshairs: function (position) {
    TweenMax.to( this.crossHairs, .2, {
      x: position.x,
      y: position.y,
      ease: Expo.easeOut
    })
  },



  _throwSnowball: function () {
    var snowballType = this.appModel.get('supermode') ? 'supermode' : 'normal'

    var snowball = new Snowball({
      snowballType: snowballType,
      stage: this.stage,
      parentContainer: this.container
    })

    snowball.throwSnowball({
      x: this.crossHairs.x,
      y: this.crossHairs.y,

      // Push positions into each snowball so that
      // detection only occurs when firing, and can be
      // coordinate based rather than hitDetection based
      occupiedPositions: this.targetFactory.occupiedPositions
    })

    // Add listeners to trigger hit animations
    snowball.on( GameEvent.TARGET_HIT, this._onTargetHit )

  },

})

module.exports = GamePlayView