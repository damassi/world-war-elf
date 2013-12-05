/**
 * View provides synching functionality for the mobile client
 *
 * @author christopher.pappas@popagency.com
 * @since  11.19.13
 */

var AppConfig = require('../../config/AppConfig')
var AppEvent = require('../../events/AppEvent')
var PubSub   = require('../../utils/PubSub')
var SocketIO = require('../../utils/SocketIO')


var MobileSyncView = Backbone.View.extend({



  events: {
    'touchstart .btn-submit': '_onSubmitBtnClick'
  },



  render: function (options) {
    _.bindAll(this)

    this.$el = $('.syncing')
    this.$syncBtn = this.$el.find('.sync-btn')
    this.$input = this.$el.find('.sync-input')

    this.$syncBtn.on('touchstart', this._onSubmitBtnClick )

    return this
  },



  _onSubmitBtnClick: function (event) {
    event.preventDefault()

    var syncCode = this.$input.val()

    window.socket.post( AppConfig.ENDPOINTS.sync, {
      syncCode: syncCode
    },

      function onResponse (response) {
        console.log(response)
        // If anything but an OK from the server
        if (response.status !== 200 ) {
          $('.mobile .message').html('Error entering code: ' + JSON.stringify( response ))
        }
      })

    return false
  }

})

module.exports = MobileSyncView