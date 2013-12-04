/**
 * ApiController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 */

var SocketEvent = require('../../shared/events/SocketEvent')


module.exports = {


  /**
   * Async socket.io GET request which generates a random code for connecting
   * to a mobile client.  Additionally, it creates a shared client-server
   * session model for storing data related individual game interaction
   */

  'generate-code': function (req, res, next) {
    var syncCode = Math.random().toString(36).substring(12)
      , socket = req.socket
      , io     = sails.io

    Session.create({
      sessionId: syncCode,
      desktopSocketId: socket.id
    },

    function groupCreated (err, session) {
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



  /**
   * Async socket.io POST request sends a previously generated tracking code in order
   * to connect the desktop and mobile clients together in gameplay
   */

  sync: function (req, res, next) {
    var syncCode = req.param('syncCode')
      , socket = req.socket
      , io     = sails.io

    Session.findOne({
      sessionId: syncCode
    },

      function foundSession (err, session) {
        if (err) next(err)
        if (!session) {
          return next('Session not found!')
        }

        socket.join( syncCode )

        Session.update({ sessionId: syncCode }, {
          mobileSocketId: socket.id
        },

        function sessionUpdated (err, session) {
          if (err) next(err)

          session = session.pop()

          io.sockets.in(syncCode).emit( SocketEvent.SYNCED, {
            connected: true,
            session: session,
            status: 'SessionId: ' + syncCode + ': Clients synced'
          })

          res.json({
            status: 200,
            session: session
          })
        })
      })
  },



  /**
   * The orientation endpoint receives a websocket POST request which then dispatches
   * updates to registered clients within a room
   */

  orientation: function (req, res, next) {
    var sessionId = req.param('sessionId')
      , socket    = req.socket

    Session.findOne({
      sessionId: sessionId
    },

      function foundSession (err, session) {
        if (err) next(err)
        if (!session) {
          return next('Session not found!')
        }

        var orientation = JSON.parse( req.param( 'orientation' ))

        socket.broadcast.to(sessionId).emit( SocketEvent.ORIENTATION, {
          orientation: orientation
        })

        res.json({
          orientation: orientation
        })
      })
  },



  fire: function (req, res, next) {
    var sessionId = req.param('sessionId')
      , socket    = req.socket

    Session.findOne({
      sessionId: sessionId
    },

      function foundSession (err, session) {
        socket.broadcast.to(sessionId).emit( SocketEvent.SHOOT, {
          fire: true
        })

        next()
      })
  },



  'toggle-mode': function (req, res, next) {
    var sessionId = req.param('sessionId')
      , supermode = req.param('supermode')
      , socket    = req.socket

    Session.findOne({
      sessionId: sessionId
    },

      function foundSession (err, session) {

        socket.broadcast.to(sessionId).emit( SocketEvent.TOGGLE_MODE, {
          supermode: supermode
        })

        next()
      })
  },



  'save-score': function (req, res, next) {
    next()
  }


};
