/**
 * Session Model stores data related to currently connected pair-sessions
 *
 * @author christopher.pappas@popagency.com
 * @since  11.19.13
 */

var Backbone = require('backbone')


var SessionModel = Backbone.Model.extend({


  defaults: {

    /**
     * Randomly generated session identifier which is generated when
     * a user visits the default '/sync' controller route.  This session
     * is then translated into a unique socket.io room which both desktop
     * and mobile clients connect to.
     *
     * @type {String}
     */
    sessionId: '',


    /**
     * Clients is an array of all currently connected clients within a single session
     * @type {Array}
     */
    clients: []
  }

})

module.exports = SessionModel