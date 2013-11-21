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

  /**
   * @type {String}
   */
  id: 'home',


  events: {
    'click': '_onClick'
  },



  render: function (options) {
    this._super()

    return this
  },



  _onClick: function (event) {
    window.location.href = '#/sync'
  }


})

module.exports = HomeView