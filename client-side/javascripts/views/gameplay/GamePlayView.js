/**
 * View provides synching functionality for the mobile client
 *
 * @author christopher.pappas@popagency.com
 * @since  11.19.13
 */

var SocketEvent = require('../../../../shared/events/SocketEvent')
var AppConfig   = require('../../config/AppConfig')
var AppEvent    = require('../../events/AppEvent')
var PubSub      = require('../../utils/PubSub')
var Easel       = require('../../utils/Easel')
var View        = require('../../supers/View')
var HUDView     = require('./HUDView')


var GamePlayView = View.extend({


  initialize: function (options) {
    this._super(options)

    this.hudView = new HUDView({ appController: this.appController })

    this.children = [
      //this.placeholder  = Easel.createBitmap('placeholder-gameplay'),

      this.enemy0  = Easel.createSprite('gameplaySprite', 'game-enemy-1', { x: 163, y: 121 }),
      this.backGround   = Easel.createSprite('gameplaySprite', 'game-ground-back', { x: 0, y: 148 }),

      this.enemy1  = Easel.createSprite('gameplaySprite', 'game-enemy-2', { x: 290, y: 200 }),
      this.enemy2  = Easel.createSprite('gameplaySprite', 'game-enemy-3', { x: 763, y: 229 }),
      this.middleGround = Easel.createSprite('gameplaySprite', 'game-ground-middle', { x: 0, y: 311 }),

      this.signPopUp  = Easel.createSprite('gameplaySprite', 'game-sign-popup', { x: 156, y: 401 }, { center: true  }),
      this.frontGround  = Easel.createSprite('gameplaySprite', 'game-ground-front', { x: 0, y: 453 }),

      this.crossHairs  = Easel.createSprite('gameplaySprite', 'game-crosshairs', { x: 468, y: 245 }, { center: true }),
    ]

    //Easel.dragObject( this.children )

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



  addEventListeners: function () {
    window.socket.on( SocketEvent.ORIENTATION, this._onOrientationUpdate )

    $(canvas).on( 'mousemove', this._onMouseMove )
    $(canvas).on( 'click', this._onFire )
  },



  hide: function (options) {
    this.hudView.stopTimer()
    this._super({ remove: true })
  },



  addDebugWindow: function () {
    $('.desktop .message').html('desktop client connected')
    $('.mobile .message').html('mobile client connected')
    $('.btn-submit').remove()
    $('.input-sync').remove()
  },



  //+ EVENT HANDLERS
  // ------------------------------------------------------------


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

    TweenMax.to( this.crossHairs, fireTime, {
      rotation: 90,
      ease: Back.easeOut,
      onComplete: function () {
        this.target.rotation = 0
      }
    })

    TweenMax.to( this.crossHairs, fireTime * .5, {
      scaleX: .8,
      scaleY: .8,
      yoyo: true,
      repeat: 1,
      ease: Back.easeInOut
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