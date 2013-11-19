/**
 * Game landing view.
 *
 * @author christopher.pappas@popagency.com
 * @since  11.18.13
 */

var AppEvent = require('../../events/AppEvent')
var PubSub   = require('../../utils/PubSub')
var View     = require('../../supers/View')
var template = require('./landing-template.hbs')


var LandingView = View.extend({


  /**
   * @type {Function}
   */
  template: template,



  render: function (options) {
    this._super()

    return this
  }


})

module.exports = LandingView