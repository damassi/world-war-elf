/**
 * View provides synching functionality for the mobile client
 *
 * @author christopher.pappas@popagency.com
 * @since  11.19.13
 */

var AppConfig = require('../../../config/AppConfig')
var AppEvent = require('../../../events/AppEvent')
var PubSub   = require('../../../utils/PubSub')
var SocketIO = require('../../../utils/SocketIO')
var View     = require('../../../supers/View')
var template = require('./mobile-sync-template.hbs')


var MobileSyncView = View.extend({


  /**
   * @type {Function}
   */
  template: template,



  events: {
    'touchstart .btn-submit': '_onSubmitBtnClick'
  },



  render: function (options) {
    this._super()

    $('.btn-submit').on('touchstart', this._onSubmitBtnClick )

    return this
  },



  _onSubmitBtnClick: function (event) {
    event.preventDefault()

    var self = this
      , syncCode = $('.input-sync').val()

    window.socket.post( AppConfig.ENDPOINTS.sync, {
      syncCode: syncCode
    },

      function onResponse (response) {

        // If anything but an OK from the server
        if (response.status !== 200 ) {
          $('.mobile .message').html('Error entering code: ' + JSON.stringify( response ))
        }
      })
  }

})

module.exports = MobileSyncView