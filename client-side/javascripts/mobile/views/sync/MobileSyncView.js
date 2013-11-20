/**
 * View provides synching functionality for the mobile client
 *
 * @author christopher.pappas@popagency.com
 * @since  11.19.13
 */

var AppConfig = require('../../../config/AppConfig')
var AppEvent = require('../../../events/AppEvent')
var PubSub   = require('../../../utils/PubSub')
var View     = require('../../../supers/View')
var template = require('./mobile-sync-template.hbs')


var MobileSyncView = View.extend({


  /**
   * @type {Function}
   */
  template: template,



  events: {
    'click .btn-submit': '_onSubmitBtnClick'
  },



  render: function (options) {
    this._super()

    this.$syncInput = this.$el.find('.input-sync')
    this.$error = this.$el.find('.error')

    return this
  },



  _onSubmitBtnClick: function (event) {
    var self = this
      , syncCode = this.$syncInput.val()

    window.socket.post( AppConfig.ENDPOINTS.sync, {
      syncCode: syncCode
    },

      function onResponse (response) {
        if (response.status === 200 )
          PubSub.trigger( AppEvent.MOBILE_CLIENT_SYNCED, response )
        else
          self.$error.html('Error entering code: ' + JSON.stringify( response ))
      })
  }

})

module.exports = MobileSyncView