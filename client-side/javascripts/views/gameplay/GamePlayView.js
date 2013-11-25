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

      this.crossHairs  = Easel.createSprite('gameplaySprite', 'game-crosshairs', { x: 468, y: 245 }),
    ]

    //Easel.dragObject( this.children )

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


    this.addChildren( this.children )
    this.container.addChild( this.hudView.render().container )

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

    this.crossHairs.x = orientation.x
    this.crossHairs.y = orientation.y

    // orientation.z
  }

})

module.exports = GamePlayView