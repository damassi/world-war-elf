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

    console.log( req.params)

    var gameId = req.param('id')
      , socket = req.socket
      , io     = sails.io

    res.view()

    setTimeout(function() {
      io.sockets.emit( 'message', {
        mobile: true,
        status: 'Mobile client id ' + gameId + ' connected'
      })
    },
      1000
    )


  }

};
