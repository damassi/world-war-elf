/**
 * View provides synching functionality for the mobile client
 *
 * @author christopher.pappas@popagency.com
 * @since  11.19.13
 */

var AppEvent = require('../../events/AppEvent')
var PubSub   = require('../../utils/PubSub')
var View     = require('../../supers/View')
var template = require('./gameplay-template.hbs')


var GamePlayView = View.extend({

  template: template,

  render: function (options) {
    this._super()

    return this
  }

})

module.exports = GamePlayView