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
      , socket = req.socket
      , io     = sails.io

    Session.create({ sessionId: syncCode }, function groupCreated (err, session) {
      if (err) {
        io.sockets.emit( SocketEvent.MESSAGE, {
          message: 'Error creating Session group'
        })

        next(err)
      }

      socket.join( syncCode )

      res.json({
        syncCode: syncCode
      })

     })
  },


  sync: function (req, res, next) {
    var syncCode = req.param('syncCode')
      , socket = req.socket
      , io     = sails.io

    Session.findOne({ sessionId: syncCode }, function foundSession (err, session) {
      if (err) next(err)
      if (!session) {
        return next('Session not found!')
      }

      io.sockets.emit( SocketEvent.SYNCED, {
        mobile: true,
        sessionId: syncCode,
        status: 'Mobile client id ' + syncCode + ' connected'
      })

      res.json({
        connected: true,
        syncCode: syncCode
      })
    })
  }


};
