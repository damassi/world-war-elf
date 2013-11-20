/**
 * Session Model stores data related to currently connected pair-sessions
 *
 * @author christopher.pappas@popagency.com
 * @since  11.19.13
 */

//var Backbone = require('backbone')


var UserModel = Backbone.Model.extend({


  defaults: {

    /**
     * Randomly generated session identifier which is generated when
     * a user visits the default '/sync' controller route.  This session
     * is then translated into a unique socket.io room which both desktop
     * and mobile clients connect to.
     *
     * @type {String}
     */
    sessionId: null,


    /**
     * Unique socket id for each connected user
     * @type {String}
     */
    socketId: null,


    /**
     * The type of platform the user is logged in as {desktop|mobile}
     * @type {String}
     */
    clientType: null
  }

})

module.exports = UserModel