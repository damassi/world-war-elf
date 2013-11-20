/**
 * SocketIO wrapper for handling common functionality
 *
 * Socket is globally accessible as `socket`
 * e.g. to send a GET request to Sails,
 * `socket.get("/", function (response){ console.log(response); })`
 *
 * @author christopher.pappas@popagency.com
 * @since  11.18.13
 */

var SocketEvent = require('../../../shared/events/SocketEvent')
var AppEvent = require('../events/AppEvent')
var PubSub   = require('./PubSub')


var SocketIO = {


  initialize: function (options) {
    _.bindAll(this)

    options = options || {}

    window.socket = io.connect()

    this.delegateEvents()
  },



  delegateEvents: function () {
    window.socket.on( SocketEvent.CONNECT, this._onConnect )
    window.socket.on( SocketEvent.DISCONNECT, this._onDisconnect )
    window.socket.on( SocketEvent.MESSAGE, this._onMessage )
    window.socket.on( SocketEvent.SYNCED, this._onSynced )
  },



  _onConnect: function (socket) {
    console.log( 'Socket.IO connected' )

    PubSub.trigger( AppEvent.SOCKET_IO_CONNECTED )
  },



  _onDisconnect: function (socket) {
    console.log( 'socket disconnected', socket )
  },



  _onMessage: function (message) {
    console.log( message )

    PubSub.trigger( AppEvent.SOCKET_IO_MESSAGE, message )
  },



  _onSynced: function (message) {
    PubSub.trigger( AppEvent.MOBILE_CLIENT_SYNCED, message )
    PubSub.trigger( AppEvent.DESKTOP_CLIENT_SYNCED, message )
  }

}

module.exports = SocketIO
