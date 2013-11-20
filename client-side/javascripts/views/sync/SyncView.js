/**
 * Game landing view.
 *
 * @author christopher.pappas@popagency.com
 * @since  11.18.13
 */

var AppConfig = require('../../config/AppConfig')
var AppEvent  = require('../../events/AppEvent')
var PubSub    = require('../../utils/PubSub')
var View      = require('../../supers/View')
var template  = require('./sync-template.hbs')


var SyncView = View.extend({


  /**
   * @type {Function}
   */
  template: template,

  /**
   * @type {$}
   */
  $syncMsg: null,

  /**
   * @type {$}
   */
  $clientMsg: null,



  render: function (options) {
    this._super()

    this.$syncMsg = this.$el.find('.sync-msg')
    this.$clientMsg = this.$el.find('.client-msg')

    this.addEventListeners()
    this.requestSyncId()

    return this
  },



  addEventListeners: function () {
    PubSub.on( AppEvent.DESKTOP_CLIENT_SYNCED, this._onDesktopClientSynched )
  },



  requestSyncId: function () {
    var self = this

    window.socket.get( AppConfig.ENDPOINTS.generateCode, {},

      function onResponse (response) {
        console.log( response )
        self.$syncMsg.html( 'Please enter this code in your mobile phone: ' + response.syncCode )
      })
  },



  _onDesktopClientSynched: function (message) {
    this.$el.find(".client-msg").html( message.status )
  }


})

module.exports = SyncView