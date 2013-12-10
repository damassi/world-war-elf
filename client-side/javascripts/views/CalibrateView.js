/**
 * CalibrationView synchs the acelerometer on the phone with the connected desktop client
 *
 * @author Christopher Pappas
 * @date   12.2.13
 */


var SocketEvent = require('../../../shared/events/SocketEvent')
var AppConfig   = require('../config/AppConfig')
var AppEvent    = require('../events/AppEvent')
var GameEvent   = require('../events/GameEvent')
var PubSub      = require('../utils/PubSub')
var View        = require('../supers/View')
var Easel       = require('../utils/Easel')


var CalibrateView = View.extend({


  initialize: function (options) {
    this._super(options)

    this.children = [
      this.placeholder = Easel.createBitmap('placeholder-calibrate'),

      // The user-controlled target
      this.crossHairs = Easel.createSprite('gameplaySprite', 'game-crosshairs', { x: 468, y: 245 }, { center: true }),
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



  addEventListeners: function () {
    window.socket.on( SocketEvent.ORIENTATION, this._onOrientationUpdate )
    window.socket.on( SocketEvent.START_GAME, this._onStartGame )

    PubSub.on( AppEvent.TICK, this._onTick )
  },



  removeEventListeners: function () {
    window.socket.removeListener( SocketEvent.ORIENTATION, this._onOrientationUpdate )
    window.socket.removeListener( SocketEvent.START_GAME, this._onPlayGame )

    PubSub.off( AppEvent.TICK, this._onTick )
  },



  _onOrientationUpdate: function (message) {

    // If DEBUG `mouse` param passed back from API
    if (message.mouse) {
      this._moveCroshairs(message.orientation)
      return
    }

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
  _onStartGame: function (message) {
    window.location.href = '#/play'
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



  _moveCroshairs: function (position) {
    TweenMax.to( this.crossHairs, .2, {
      x: position.x,
      y: position.y,
      ease: Expo.easeOut
    })
  },

})

module.exports = CalibrateView