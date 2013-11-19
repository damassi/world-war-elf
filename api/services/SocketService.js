/**
 * This service handles delegation related to socket storage and connections between the client
 * and the server
 *
 * @author Christopher Pappas
 * @date   11.18.13
 */

var SocketService = {

  _sessionConnections : {},


  addConnection: function (session, socket) {
    this._sessionConnections[session] = socket
  }

}

module.exports = SocketService