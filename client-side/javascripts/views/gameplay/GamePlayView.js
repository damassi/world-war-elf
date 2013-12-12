/**
 * View provides synching functionality for the mobile client
 *
 * @author christopher.pappas@popagency.com
 * @since  11.19.13
 */

var SocketEvent        = require('../../../../shared/events/SocketEvent')
  , AppConfig          = require('../../config/AppConfig')
  , AppEvent           = require('../../events/AppEvent')
  , GameEvent          = require('../../events/GameEvent')
  , TargetFactory      = require('../../factories/TargetFactory')
  , PubSub             = require('../../utils/PubSub')
  , Easel              = require('../../utils/Easel')
  , View               = require('../../supers/View')
  , HUD                = require('./HUD')
  , Snowball           = require('./Snowball')


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

      // The flash that is triggered when the player gets hit
      this.redHitArea = new c.Shape( new c.Graphics().beginFill("#ff0000").drawRect( 0, 0, AppConfig.DIMENSIONS.width, AppConfig.DIMENSIONS.height ))
    ]

    // Store position information for animating in and out
    _.each(this.children, function (child) {
      child.pos = {
        x: child.x,
        y: child.y
      }
    })


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
    window.socket.on( SocketEvent.ORIENTATION, this.onOrientationUpdate )
    window.socket.on( SocketEvent.SHOOT, this.onShoot )

    PubSub.on( AppEvent.START_GAMEPLAY, this.onStartGamePlay )
    PubSub.on( AppEvent.STOP_GAMEPLAY, this.onStopGamePlay )
    PubSub.on( GameEvent.PLAYER_HIT, this.onPlayerHit )

    this.listenTo( this.appModel, GameEvent.SUPERMODE, this.onSuperModeChange )

    $('#canvas').on( 'mousemove', this.onMouseMove )
    $('#canvas').on( 'mousedown', this.onPrepareTarget )
    $('#canvas').on( 'mouseup', this.onShoot )
  },



  removeEventListeners: function () {
    window.socket.removeListener( SocketEvent.ORIENTATION, this.onOrientationUpdate )
    window.socket.removeListener( SocketEvent.SHOOT, this.onShoot )

    PubSub.off( AppEvent.START_GAMEPLAY, this.onStartGamePlay )
    PubSub.off( AppEvent.STOP_GAMEPLAY, this.onStopGamePlay )
    PubSub.off( GameEvent.PLAYER_HIT, this.onPlayerHit )

    $('#canvas').off( 'mousemove', this.onMouseMove )
    $('#canvas').off( 'mousedown', this.onPrepareTarget )
    $('#canvas').off( 'mouseup', this.onShoot )
  },



  remove: function() {
    this.hud.hide()
    this.removeEventListeners()
    this.targetFactory.cleanup()
    this._super()
  },



  show: function (options) {

    var delay = 1
      , tweenTime = .8
      , height = AppConfig.DIMENSIONS.height * 2

    this.container.x = 0
    this.container.y = 0

    this.stage.addChild( this.container )
    this.container.addChild( this.hud.render().container )
    this.hud.show()

    T.fromTo( this.backGround, .3, { y: height }, {
      y: this.backGround.pos.y,
      ease: Expo.easeOut,
      delay: delay + .2
    })

    T.fromTo( this.middleGround, .3, { y: height }, {
      y: this.middleGround.pos.y,
      ease: Expo.easeOut,
      delay: delay + .1
    })

    T.fromTo( this.frontGround, .3, { y: height }, {
      y: this.frontGround.pos.y,
      ease: Expo.easeOut,
      delay: delay
    })

    T.fromTo( this.crossHairs, .2, { alpha: 0 }, {
      immediateRender: true,
      alpha: 1,
      ease: Linear.easeNone,
      delay: 1
    })

    T.fromTo( this.crossHairs, .4, { scaleX: 0, scaleY: 0 }, {
      immediateRender: true,
      scaleX: 1,
      scaleY: 1,
      ease: Expo.easeOut,
      delay: 1
    })

    PubSub.trigger( AppEvent.START_GAMEPLAY )
  },



  hide: function (options) {
    var delay = 0
      , tweenTime = .4
      , height = AppConfig.DIMENSIONS.height * 2

    this.hideTargets()
    this.hideCrossHairs()
    this.hud.hide()

    T.to( this.crossHairs, .2, {
      scaleX: 0,
      scaleY: 0,
      ease: Back.easeIn,
      delay: 1
    })

    T.to( this.backGround, .3, {
      y: height,
      ease: Expo.easeIn,
      delay: delay
    })

    T.to( this.middleGround, .3, {
      y: height,
      ease: Expo.easeIn,
      delay: delay + .1
    })

    var self = this

    T.to( this.frontGround, .3, {
      y: height,
      ease: Expo.easeIn,
      delay: delay + .2,

      onComplete: function () {
        self.remove()
      }
    })
  },



  hideCrossHairs: function () {
    T.to(this.crossHairs, .3, {
      alpha: 0,
      ease: Expo.easeOut
    })
  },



  hideTargets: function () {
    for (var i = 0, len = this.targetFactory.occupiedPositions.length; i < len; ++i) {
      var target = this.targetFactory.occupiedPositions[i]

      T.killDelayedCallsTo( target.attackPlayer )
      T.killTweensOf( target.instance )

      if (target.attackSnowball) {
        this.stage.removeChild( target.attackSnowball )
      }

      T.to(target.instance, .2, {
        alpha: 0,
        onComplete: function() {
          this.target.targetView.remove()
          this.target.targetView = null
        }
      })
    }
  },



  showCrossHairs: function () {
    T.to(this.crossHairs, .3, {
      alpha: 1,
      ease: Expo.easeOut
    })
  },



  /**
   * Remove our game over popup text and move us on
   * @param  {c.Bitmap} bitmap the bitmap text to remove
   */

  removeGameOver: function(bitmap) {
      var self = this

      T.to( bitmap, .3, {
        y: 450,
        ease: Back.easeIn,
        onComplete: function(){
          self.stage.removeChild(bitmap)

          setTimeout(function() {
            window.location.hash = '#/submit-score'
          }, 500)
        }
      })
  },




  //+ EVENT HANDLERS
  // ------------------------------------------------------------


  onStartGamePlay: function () {
    var array = AppConfig.DEFAULT_GAMEPLAY_TIME.split(':')
    var seconds = parseInt(array[0]*60) + parseInt(array[1])

    AppConfig.gameplaySeconds = seconds

    this.targetFactory = new TargetFactory({
      appModel: this.appModel,
      gamePlayView: this
    })

    PubSub.on( AppEvent.TICK, this.onTick )
  },



  onStopGamePlay: function () {
    this.hideCrossHairs()
    this.hud.hide()
    this.removeEventListeners()
    this.targetFactory.removeEventListeners()

    _.each(this.targetFactory.occupiedPositions, function(target) {
      target.scurryAway()
    })

    var gameOverBitmap = Easel.createBitmap( 'txt-game-over', {x: 200, y:250 } )

    // Animate our game over screen in, then do something else
    this.stage.addChild( gameOverBitmap )

    var self = this

    T.fromTo(gameOverBitmap, .3, { y: 450 }, {
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


  onPrepareTarget: function (event) {
    var fireTweenTime = .4

     T.to( this.crossHairs, fireTweenTime * .5, {
      scaleX: .8,
      scaleY: .8,
      ease: Back.easeOut
    })

    T.to( this.crossHairs, fireTweenTime, {
      rotation: 90,
      ease: Back.easeOut
    })
  },



  onShoot: function (event) {
    if (this.crossHairs.alpha !== 1)
      return

    var fireTweenTime = .4

    T.to( this.crossHairs, fireTweenTime * .5, {
      scaleX: 1,
      scaleY: 1,
      ease: Back.easeInOut
    })

    T.to( this.crossHairs, fireTweenTime, {
      rotation: 0,
      ease: Back.easeOut
    })

    this.throwSnowball()
  },



  onTargetHit: function (params) {
    var target = params.target

    if (target && target.parent)
      target.targetView.hit()
    else
      return

    var self = this
  },



  onPlayerHit: function (params) {
    T.killTweensOf(this.redHitArea)

    T.fromTo(this.redHitArea, .1, { alpha: 0 }, {
      alpha: .4,
      yoyo: true,
      repeat: 3,
      overwrite: 'all'
    })

    Easel.rattleScreen($('#game-play'))
  },



  onMouseMove: function (event) {
    var x = (event.offsetX || event.clientX - $(event.target).offset().left)
      , y = (event.offsetY || event.clientY - $(event.target).offset().top)

    this.moveCroshairs({
      x: x,
      y: y
    })
  },



  onOrientationUpdate: function (message) {
    this.phoneOrientation = {
      x: message.orientation.x * 2,
      y: message.orientation.y * 2
    }
  },



  onTick: function() {
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



  onSuperModeChange: function (model) {
    var supermode = model.changed.supermode

    if (!supermode) return

    var powerUpText = new Easel.Text({
      text: 'Powerup!',
      font: 'Luckiest Guy',
      size: '79px',
      color: '#ff0000',

      stroke: {
        size: 7,
        color: '#666'
      },

      position: {
        x: AppConfig.DIMENSIONS.width * .5,
        y: 1000,
      }
    })

    powerUpText.textAlign('center')
    this.stage.addChild( powerUpText.container )

    var self = this

    T.fromTo( powerUpText.container, .5, { y: -1000 }, {
      y: AppConfig.DIMENSIONS.height * .5,
      ease: Expo.easeOut,

      onComplete: function () {

        T.to( powerUpText.container, .3, {
          y: -1000,
          ease: Expo.easeIn,
          delay: .5,

          onComplete: function () {
            self.stage.removeChild( this.target )
          }
        })
      }
    })

  },



  //+ PRIVATE METHODS
  // ------------------------------------------------------------



  moveCroshairs: function (position) {
    T.to( this.crossHairs, .2, {
      x: position.x,
      y: position.y,
      ease: Expo.easeOut
    })
  },



  throwSnowball: function () {
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
    snowball.on( GameEvent.TARGET_HIT, this.onTargetHit )

  },

})

module.exports = GamePlayView