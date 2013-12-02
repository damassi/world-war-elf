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
var PubSub             = require('../../utils/PubSub')
var Easel              = require('../../utils/Easel')
var View               = require('../../supers/View')
var HUDView            = require('./HUDView')
var GamePlayController = require('../../controllers/GamePlayController')


var GamePlayView = View.extend({


  initialize: function (options) {
    this._super(options)

    this.hudView = new HUDView({
      appModel : this.appModel,
      appController : this.appController
    })

    this.children = [
      this.backContainer = new c.Container(),
      this.backGround   = Easel.createSprite('gameplaySprite', 'game-ground-back', { x: 0, y: 148 }),
      this.middleContainer = new c.Container(),
      this.middleGround = Easel.createSprite('gameplaySprite', 'game-ground-middle', { x: 0, y: 311 }),
      this.frontContainer = new c.Container(),
      this.frontGround  = Easel.createSprite('gameplaySprite', 'game-ground-front', { x: 0, y: 453 }),
      this.crossHairs   = Easel.createSprite('gameplaySprite', 'game-crosshairs', { x: 468, y: 245 }, { center: true }),
    ]

    //Easel.dragObject( this.enemy1 )
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

    PubSub.trigger( AppEvent.START_GAMEPLAY )
  },



  hide: function (options) {
    PubSub.trigger( AppEvent.STOP_GAMEPLAY )

    this.hudView.hide()
    this.removeEventListeners()
    this._super({ remove: true })
  },




  addEventListeners: function () {
    window.socket.on( SocketEvent.ORIENTATION, this._onOrientationUpdate )
    window.socket.on( SocketEvent.SHOOT, this._onShoot )

    $(canvas).on( 'mousemove', this._onMouseMove )
    $(canvas).on( 'click', this._onShoot )
  },



  removeEventListeners: function () {
    window.socket.removeListener( SocketEvent.ORIENTATION, this._onOrientationUpdate )
    window.socket.removeListener( SocketEvent.SHOOT, this._onShoot )

    $(canvas).off( 'mousemove', this._onMouseMove )
    $(canvas).off( 'click', this._onShoot )
  },



  addDebugWindow: function () {
    $('.desktop .message').html('desktop client connected')
    $('.mobile .message').html('mobile client connected')
    $('.btn-submit').remove()
    $('.input-sync').remove()
  },








  //+ EVENT HANDLERS
  // ------------------------------------------------------------



  _onShoot: function (event) {
    var fireTweenTime = .4

    TweenMax.to( this.crossHairs, fireTweenTime * .5, {
      scaleX: .8,
      scaleY: .8,
      yoyo: true,
      repeat: 1,
      ease: Back.easeInOut
    })

    var self = this

    TweenMax.to( this.crossHairs, fireTweenTime, {
      rotation: 90,
      ease: Back.easeOut,
      onComplete: function () {
        this.target.rotation = 0
      }
    })

    this.appModel.increaseShots()
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



  _moveCroshairs: function (position) {
    TweenMax.to( this.crossHairs, 1, {
      x: position.x,
      y: position.y,
      ease: Expo.easeOut
    })
  }

})

module.exports = GamePlayView