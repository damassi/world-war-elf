/**
 * Primary mobile app controller which kicks off initialition and SocketIO connections
 *
 * @author christopher.pappas@popagency.com
 * @since  11.18.13
 */

var PubSub   = require('../utils/PubSub')
var SocketIO = require('../utils/SocketIO')
var AppEvent = require('../events/AppEvent')


var MobileController = {


  initialize: function (options) {
    _.bindAll(this)

    SocketIO.initialize()

    PubSub.on( AppEvent.SOCKET_IO_CONNECTED, this._onSocketIOConnected )
  },


  _onSocketIOConnected: function (event) {
    window.addEventListener( 'deviceorientation', this._onDeviceOrientationChange )
  },


  _onDeviceOrientationChange: function (event) {
    window.socket.emit( 'orientation', {
      x: event.beta,
      y: event.gamma,
      z: event.alpha,
    })
  }

}

module.exports = MobileController