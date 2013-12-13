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
var AppConfig   = require('../config/AppConfig')
var AppEvent    = require('../events/AppEvent')
var PubSub      = require('./PubSub')


var SocketIO = {


  appModel: null,


  initialize: function (options) {
    _.bindAll(this)

    this.appModel = options.appModel
    window.socket = io.connect()
    this.delegateEvents()
  },



  delegateEvents: function () {
    window.socket.on( SocketEvent.CONNECT, this.onConnect )
    window.socket.on( SocketEvent.DISCONNECT, this.onDisconnect )
    window.socket.on( SocketEvent.MESSAGE, this.onMessage )
    window.socket.on( SocketEvent.SYNCED, this.onSynced )
  },



  onConnect: function (socket) {
    //console.log( 'Socket.IO connected' )

    PubSub.trigger( AppEvent.SOCKET_IO_CONNECTED )
  },



  onDisconnect: function (socket) {},



  onMessage: function (message) {
    PubSub.trigger( AppEvent.SOCKET_IO_MESSAGE, message )
  },



  onSynced: function (message) {
    this.appModel.set({
      'connected' : true,
      'session'   : message.session
    })

    PubSub.trigger( AppEvent.MOBILE_CLIENT_SYNCED, message )
    PubSub.trigger( AppEvent.DESKTOP_CLIENT_SYNCED, message )
  }

}

module.exports = SocketIO
