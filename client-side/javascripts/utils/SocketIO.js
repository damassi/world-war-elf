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

var Event = require('../events/Event')


var SocketIO = {

  socket: null,


  initialize: function (options) {
    _.bindAll(this)

    this.socket = io.connect()

    this.delegateEvents()
  },


  delegateEvents: function () {
    this.socket.on( Event.CONNECT, this._onConnect )
    this.socket.on( Event.MESSAGE, this._onMessage )
  },


  _onConnect: function (event) {
    console.log( 'Socket connected' )
  },


  _onMessage: function (message) {
    console.log( 'New comet message received :: ', message )
  }

}

module.exports = SocketIO