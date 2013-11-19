/**
 * View provides synching functionality for the mobile client
 *
 * @author christopher.pappas@popagency.com
 * @since  11.19.13
 */

var AppEvent = require('../../../events/AppEvent')
var PubSub   = require('../../../utils/PubSub')
var View     = require('../../../supers/View')
var template = require('./mobile-sync-template.hbs')


var MobileSyncView = View.extend({

  template: template

})

module.exports = MobileSyncView