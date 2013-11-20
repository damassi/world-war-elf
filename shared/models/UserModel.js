/**
 * User model stores data related to users currently logged in
 *
 * @author christopher.pappas@popagency.com
 * @since  11.19.13
 */

var Backbone = require('backbone')


var UserModel = Backbone.Model.extend({

  defaults: {

    /**
     * Referenced connection to a users connected socket.id
     * @type {String}
     */
    socketId: ''
  }

})

module.exports = UserModel