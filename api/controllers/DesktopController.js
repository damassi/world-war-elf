/**
 * DesktopController is the primary controller for serving the client view and storing connections
 * made via mobile socket.io
 *
 * @author Christopher Pappas
 * @date   11.18.13
 */


module.exports = {


  index: function (req, res) {

    // Generate unique game id and store it in a session for gameplay
    var gameId = Math.random().toString(36).substring(12)

    res.view({
      gameId: gameId
    })
  }


}
