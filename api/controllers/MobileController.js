/**
 * MobileController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 */

module.exports = {

  /**
   * Overwrite default layout on mobile view
   *
   */
  index: function (req, res) {

    var socket = req.socket;
    var io = sails.io;

    res.view({
      layout: 'mobile-layout'
    })

    setTimeout(function() {
      io.sockets.emit( 'message', {
        time: new Date()
      })
    }, 1000)
  }

};
