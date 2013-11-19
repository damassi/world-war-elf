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

var AppEvent = require('../events/AppEvent')
var Event    = require('../events/Event')
var PubSub   = require('./PubSub')


var SocketIO = {

  socket: null,


  initialize: function (options) {
    _.bindAll(this)

    options = options || {}

    this.socket = io.connect()

    this.delegateEvents()
  },


  delegateEvents: function () {
    this.socket.on( Event.CONNECT, this._onConnect )
    this.socket.on( Event.MESSAGE, this._onMessage )
  },


  _onConnect: function (event) {
    console.log( 'Socket connected' )

    PubSub.trigger( AppEvent.SOCKET_IO_CONNECTED )
  },


  _onMessage: function (message) {
    console.log( 'New comet message received :: ', message )
  }

}

module.exports = SocketIO