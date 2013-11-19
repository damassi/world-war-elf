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

    return this
  },



  _onSubmitBtnClick: function (event) {
    var syncCode = this.$syncInput.val()

    window.socket.post( AppConfig.ENDPOINTS.sync, {
      syncCode: syncCode
    },

    function onResponse (response) {
      if (response.status === 200 )
        window.location.href = '#/mobile/play'
    })
  }

})

module.exports = MobileSyncView