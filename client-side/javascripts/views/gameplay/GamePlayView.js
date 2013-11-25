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
var View        = require('../../supers/View')
var Easel       = require('../../utils/Easel')


var GamePlayView = View.extend({


  bunny: null,


  _canvasEvents: {
    'playBtn mouseover' : '_onBtnOver',
    'playBtn rollout'   : '_onBtnOut',
    'playBtn click'     : '_onPlayBtnClick',

    'scoreBtn mouseover' : '_onBtnOver',
    'scoreBtn rollout'   : '_onBtnOut',
    'scoreBtn click'     : '_onScoreBtnClick',
  },



  initialize: function (options) {
    this._super(options)

    this.children = [
      //this.placeholder  = Easel.createBitmap('placeholder-gameplay'),

      this.enemy0  = Easel.createSprite('gameplaySprite', 'game-enemy-1', { x: 163, y: 121 }),
      this.backGround   = Easel.createSprite('gameplaySprite', 'game-ground-back', { x: 0, y: 148 }),

      this.enemy1  = Easel.createSprite('gameplaySprite', 'game-enemy-2', { x: 290, y: 200 }),
      this.middleGround = Easel.createSprite('gameplaySprite', 'game-ground-middle', { x: 0, y: 311 }),

      this.enemy2  = Easel.createSprite('gameplaySprite', 'game-enemy-3', { x: 763, y: 229 }),
      this.signPopUp  = Easel.createSprite('gameplaySprite', 'game-sign-popup', { x: 156, y: 401 }, { center: true  }),
      this.frontGround  = Easel.createSprite('gameplaySprite', 'game-ground-front', { x: 0, y: 453 }),

      this.hudClock    = Easel.createSprite('gameplaySprite', 'game-hud-clock', { x: 820, y: 15 }),
      this.hudGift     = Easel.createSprite('gameplaySprite', 'game-hud-gift', { x: 820, y: 76 }),

      this.crossHairs  = Easel.createSprite('gameplaySprite', 'game-crosshairs', { x: 468, y: 245 }),
    ]

    Easel.dragObject( this.children )

  },



  render: function () {
    this._super()

    var position = {
      x: AppConfig.DIMENSIONS.width * .5,
      y: AppConfig.DIMENSIONS.height * .5
    }

    $('.desktop .message').html('desktop client connected')
    $('.mobile .message').html('mobile client connected')
    $('.btn-submit').remove()
    $('.input-sync').remove()

    this.bunny = new c.Bitmap('/assets/images/bunny.png')
    this.bunny.x = 0.5
    this.bunny.y = 0.5

    this.container.addChild( this.bunny )

    this.addChildren( this.children )

    this.addEventListeners()

    return this
  },



  addEventListeners: function () {
    window.socket.on( SocketEvent.ORIENTATION, this._onOrientationUpdate )
    PubSub.on( AppEvent.TICK, this._onTick )
  },



  //+ EVENT HANDLERS
  // ------------------------------------------------------------



  _onTick: function () {},



  _onOrientationUpdate: function (message) {
    var orientation = message.orientation

    this.bunny.x = orientation.x
    this.bunny.y = orientation.y

    // orientation.z
  }

})

module.exports = GamePlayView