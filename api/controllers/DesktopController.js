/**
 * DesktopController is the primary controller for serving the client view and storing connections
 * made via mobile socket.io
 *
 * @author Christopher Pappas
 * @date   11.18.13
 */


module.exports = {


  index: function (req, res) {
    res.view()
  }


}
