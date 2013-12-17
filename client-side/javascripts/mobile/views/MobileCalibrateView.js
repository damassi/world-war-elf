/**
 * Calibrates the mobile phone by normalizing accelerometer data between client
 * and mobile phone vendors
 *
 * @author Christopher Papps
 * @date   12.4.13
 */

var SocketEvent = require('../../../../shared/events/SocketEvent')
var AppConfig   = require('../../config/AppConfig')
var AppEvent    = require('../../events/AppEvent')
var PubSub      = require('../../utils/PubSub')
var Easel       = require('../../utils/Easel')
var MobileView = require('./supers/MobileView')


var MobileCalibrateView = MobileView.extend({


  /**
   * Stores a tweenable position which is pushed over the socket
   * @type {Object}
   */
  curOrientation: { x: 0, y: 0 },



  render: function () {
    _.bindAll(this)

    this.$el       = $('.calibrate')
    this.$body     = $('body')
    this.$startBtn = this.$el.find('.start-btn')

    this.show()

    var self = this

    _.defer( function() {
      self.sessionId = self.appModel.get('session').sessionId
      self.addEventListeners()
    })
  },



  addEventListeners: function() {
    this.$body.on('touchend', this.onStartBtnClick )
    window.addEventListener( 'devicemotion', this.onDeviceMotion )
  },



  removeEventListeners: function() {
    this.$body.off('touchend', this.onStartBtnClick )
    window.removeEventListener( 'devicemotion', this.onDeviceMotion )
  },



  onDeviceMotion: function (event) {
    var orientation = {
      x: event.accelerationIncludingGravity.x,
      y: event.accelerationIncludingGravity.y
    }

    if (Easel.isIOS()) {

    }
    else if (Easel.isAndroid()) {
      orientation.x = orientation.x * -1
      orientation.y = orientation.y * -1
    }
    else {

    }

    TweenMax.to(this.curOrientation, .6, {
      x: orientation.x,
      y: orientation.y,
    })

    window.socket.post( AppConfig.ENDPOINTS.orientation, {
      sessionId: this.sessionId,
      orientation: JSON.stringify( this.curOrientation )
    },

      function onResponse (response) {})
  },



  onStartBtnClick: function (event) {
    var self = this

    window.socket.post( AppConfig.ENDPOINTS.startGame, {
      sessionId: this.sessionId
    },

      function onResponse (response) {
        if (response.status === 200) {
          self.trigger( AppEvent.MOBILE_CALIBRATED )
        }
      })
  }

})

module.exports = MobileCalibrateView