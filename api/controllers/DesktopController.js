/**
 * DesktopController is the primary controller for serving the client view and storing connections
 * made via mobile socket.io
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 */

module.exports = {

  index: function (req, res) {
    res.view()
  }

};
