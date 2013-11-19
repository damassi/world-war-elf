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

    var gameId = req.param('id')
      , socket = req.socket
      , io     = sails.io

    res.view()

  }

};
