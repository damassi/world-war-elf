/**
 * Collection of game sessions
 *
 * @author christopher.pappas@popagency.com
 * @since  11.19.13
 */

var Backbone     = require('backbone')
var SessionModel = require('../models/SessionModel')


var SessionCollection = Backbone.Collection.extend({

  model: SessionModel

})

module.exports = SessionCollection