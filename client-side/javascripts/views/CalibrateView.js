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

    this.dot = new c.Shape()
    this.dot.graphics.beginFill("#ffffff").drawCircle(0, 0, 12, 12);
    this.dot.x = AppConfig.DIMENSIONS.width * .5
    this.dot.y = AppConfig.DIMENSIONS.height * .5

    this.children = [
      //this.placeholder = Easel.createBitmap('placeholder-calibrate'),

      Easel.createSprite('gameplaySprite', 'game-crosshairs', { x: 481, y: 302 }, { center: true }),
      Easel.createSprite('miscSprite', 'calibrate-text-calibrate', { x: 215, y: 126 }),
      this.dot
    ]

    Easel.dragObject( this.children )

  },



  render: function () {
    this._super()

    this.phoneOrientation = {
      x: this.dot.x,
      y: this.dot.y
    }

    this.addEventListeners()

    return this
  },



  addEventListeners: function () {
    window.socket.on( SocketEvent.ORIENTATION, this.onOrientationUpdate )
    window.socket.on( SocketEvent.START_GAME, this.onStartGame )

    PubSub.on( AppEvent.TICK, this.onTick )
  },



  removeEventListeners: function () {
    window.socket.removeListener( SocketEvent.ORIENTATION, this.onOrientationUpdate )
    window.socket.removeListener( SocketEvent.START_GAME, this.onPlayGame )

    PubSub.off( AppEvent.TICK, this.onTick )
  },



  onOrientationUpdate: function (message) {

    // If DEBUG `mouse` param passed back from API
    if (message.mouse) {
      this.moveCroshairs(message.orientation)
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
  onStartGame: function (message) {
    window.location.href = '#/play'
  },



  onTick: function() {

    var dimensions = AppConfig.DIMENSIONS

    this.dot.x += this.phoneOrientation.x
    this.dot.y += this.phoneOrientation.y

    if (this.dot.x < 0)
      this.dot.x = 0

    if (this.dot.x > dimensions.width)
      this.dot.x = dimensions.width

    if (this.dot.y < 0)
      this.dot.y = 0

    if (this.dot.y > dimensions.height)
      this.dot.y = dimensions.height
  },



  moveCroshairs: function (position) {
    T.to( this.dot, .2, {
      x: position.x,
      y: position.y,
      ease: Expo.easeOut
    })
  },

})

module.exports = CalibrateView