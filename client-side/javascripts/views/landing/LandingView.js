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

    this.addEventListeners()

    return this
  },


  addEventListeners: function () {
    PubSub.on( AppEvent.SOCKET_IO_MESSAGE, this._onSocketIOMessage )
  },


  _onSocketIOMessage: function (event) {
    this.$el.find(".client").html( event.message.status )
    console.log( event.message )
  }


})

module.exports = LandingView