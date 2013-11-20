/**
 * Collection of all users registered within a single game session
 *
 * @author christopher.pappas@popagency.com
 * @since  11.19.13
 */

var Backbone  = require('backbone')
var UserModel = require('../models/UserModel')


var UserCollection = Backbone.Collection.extend({

  model: UserModel

})

module.exports = UserCollection