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
    var data = {
      syncCode: this.$syncInput.val()
    }

    var sync = $.ajax({
      url: AppConfig.ENDPOINTS.sync,
      method: "POST",
      data: data
    })

    sync.success(function (data) {
      console.log( data )
    })

    sync.error(function (error) {
      console.log( error.status )
    })
  }

})

module.exports = MobileSyncView