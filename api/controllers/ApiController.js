/**
 * ApiController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 */

module.exports = {




  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to ApiController)
   */
  _config: {},


  'generate-code': function (req, res, next) {
    var syncCode = Math.random().toString(36).substring(12)

    res.json({
      syncCode: syncCode
    })
  },


  sync: function (req, res) {
    var syncCode = req.param('syncCode')
      , socket = req.socket
      , io     = sails.io

    io.sockets.emit( 'message', {
      mobile: true,
      status: 'Mobile client id ' + syncCode + ' connected'
    })

    res.json({
      connected: true,
      syncCode: syncCode
    })
  }


};
