/**
 * Collection of game sessions
 *
 * @author christopher.pappas@popagency.com
 * @since  11.19.13
 */

var Backbone  = require('backbone')
var UserModel = require('../models/UserModel')


var SessionCollection = Backbone.Collection.extend({

  model: UserModel

})

module.exports = SessionCollection