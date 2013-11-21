/**
 * Game landing view.
 *
 * @author christopher.pappas@popagency.com
 * @since  11.18.13
 */

var AppEvent = require('../../events/AppEvent')
var PubSub   = require('../../utils/PubSub')
var View     = require('../../supers/View')


var HomeView = View.extend({


  initialize: function (options) {
    this._super(options)

  },


  render: function (options) {
    this._super()

    return this
  }


})

module.exports = HomeView