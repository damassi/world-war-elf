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
    this.$startBtn.on('touchend', this._onStartBtnClick )
    this.$body.on('mousemove', this._onMouseMove )
    window.ondevicemotion = this._onDeviceMotion
  },



  removeEventListeners: function() {
    this.$startBtn.off('touchend', this._onStartBtnClick )
    this.$body.off('mousemove', this._onMouseMove )
    window.ondevicemotion = null
  },



  _onDeviceMotion: function (event) {
    var self = this

    var orientation = {
      x: ~~event.accelerationIncludingGravity.x,
      y: ~~event.accelerationIncludingGravity.y
    }

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



  _onMouseMove: function (event) {

    var orientation = {}

    try {
      orientation = {
        x: event.originalEvent.touches[0].pageX,
        y: event.originalEvent.touches[0].pageY
      }
    }
    catch (e) {
      orientation = {
        x: event.pageX,
        y: event.pageY
      }
    }

    TweenMax.to(this._curOrientation, .8, {
      x: orientation.x,
      y: orientation.y,
      ease: Expo.easeOut
    })

    window.socket.post( AppConfig.ENDPOINTS.orientation, {
      sessionId: this.sessionId,
      orientation: JSON.stringify( this._curOrientation )
    },

      function onResponse (response) {
        //console.log(response.orientation)
      })

    $('.debug').html( orientation.x + ', ' + orientation.y )
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