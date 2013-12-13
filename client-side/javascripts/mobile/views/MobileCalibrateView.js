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
var MobileView = require('./supers/MobileView')


var MobileCalibrateView = MobileView.extend({


  /**
   * Stores a tweenable position which is pushed over the socket
   * @type {Object}
   */
  _curOrientation: { x: 0, y: 0 },



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
    this.$body.on('touchend', this._onStartBtnClick )
    window.addEventListener( 'devicemotion', this._onDeviceMotion )
    //window.ondevicemotion = this._onDeviceMotion
  },



  removeEventListeners: function() {
    this.$body.off('touchend', this._onStartBtnClick )
    window.removeEventListener( 'devicemotion', this._onDeviceMotion )
  },



  _onDeviceMotion: function (event) {
    var self = this

    TweenMax.to(this._curOrientation, .6, {
      x: event.accelerationIncludingGravity.x,
      y: event.accelerationIncludingGravity.y
    })

    window.socket.post( AppConfig.ENDPOINTS.orientation, {
      sessionId: self.sessionId,
      orientation: JSON.stringify( this._curOrientation )
    },

      function onResponse (response) {
        //console.log(response.orientation)
      })

    $('.debug').html( orientation.x + '<br/>' + orientation.y )
  },



  _onStartBtnClick: function (event) {
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