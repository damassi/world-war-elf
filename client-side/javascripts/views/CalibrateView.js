/**
 * CalibrationView synchs the acelerometer on the phone with the connected desktop client
 *
 * @author Christopher Pappas
 * @date   12.2.13
 */

var SocketEvent = require('../../../shared/events/SocketEvent')
  , AppConfig   = require('../config/AppConfig')
  , AppEvent    = require('../events/AppEvent')
  , GameEvent   = require('../events/GameEvent')
  , PubSub      = require('../utils/PubSub')
  , View        = require('../supers/View')
  , Easel       = require('../utils/Easel')


var CalibrateView = View.extend({


  initialize: function (options) {
    this._super(options)

    this.children = [
      Easel.createSprite('miscSprite', 'calibrate-text-calibrate', { x: 215, y: 126 }),
      Easel.createSprite('miscSprite', 'calibrate-target', { x: AppConfig.DIMENSIONS.width * .5, y: AppConfig.DIMENSIONS.height * .5 }, { center: true }),
      this.crossHairs = Easel.createSprite('gameplaySprite', 'game-crosshairs', { x: AppConfig.DIMENSIONS.width * .5, y: AppConfig.DIMENSIONS.height * .5 }, { center: true })
    ]

  },



  render: function () {
    this._super()

    this.phoneOrientation = {
      x: this.crossHairs.x,
      y: this.crossHairs.y
    }

    this.addEventListeners()

    return this
  },


  show: function() {
    this._super()

    var self = this

    setTimeout( function() {
      PubSub.on( AppEvent.TICK, self.onTick )
    }, 1000 )
  },



  addEventListeners: function () {
    window.socket.on( SocketEvent.ORIENTATION, this.onOrientationUpdate )
    window.socket.on( SocketEvent.START_GAME, this.onStartGame )
  },



  removeEventListeners: function () {
    window.socket.removeListener( SocketEvent.ORIENTATION, this.onOrientationUpdate )
    window.socket.removeListener( SocketEvent.START_GAME, this.onPlayGame )

    PubSub.off( AppEvent.TICK, this.onTick )
  },



  onOrientationUpdate: function (message) {
    this.phoneOrientation = {
      x: message.orientation.x * 2,
      y: message.orientation.y * 2
    }
  },


  /**
   * Socket event received from the backend
   * @param  {Object} message
   * @return {void}
   */
  onStartGame: function (message) {
    window.location.href = '#/play'
  },



  onTick: function() {
    if (! this.appModel.get('connected'))
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



  moveCroshairs: function (position) {
    T.to( this.crossHairs, .2, {
      x: position.x,
      y: position.y,
      ease: Expo.easeOut
    })
  },

})

module.exports = CalibrateView