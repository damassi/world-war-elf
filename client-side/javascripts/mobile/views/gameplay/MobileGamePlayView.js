/**
 * View provides synching functionality for the mobile client
 *
 * @author christopher.pappas@popagency.com
 * @since  11.19.13
 */

var AppEvent = require('../../../events/AppEvent')
var PubSub   = require('../../../utils/PubSub')
var View     = require('../../../supers/View')
var template = require('./mobile-gameplay-template.hbs')


var MobileGamePlayView = View.extend({

  template: template

})

module.exports = MobileGamePlayView