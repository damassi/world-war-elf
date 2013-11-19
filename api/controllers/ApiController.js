/**
 * ApiController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 */

var SocketEvent = require('../../events/SocketEvent')

module.exports = {


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

    io.sockets.emit( SocketEvent.SYNCED, {
      mobile: true,
      status: 'Mobile client id ' + syncCode + ' connected'
    })

    res.json({
      connected: true,
      syncCode: syncCode
    })
  }


};
