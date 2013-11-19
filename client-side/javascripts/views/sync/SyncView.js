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


  $syncMsg: null,
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
    PubSub.on( AppEvent.MOBILE_CLIENT_SYNCED, this._onMobileClientSynched )
  },



  requestSyncId: function () {
    var self = this

    // var codeReq = $.getJSON( AppConfig.ENDPOINTS.generateCode )

    // codeReq.success( function (data) {
    //   self.$syncMsg.html( 'Please enter this code in your mobile phone: ' + data.syncCode )
    // })

    window.socket.get( AppConfig.ENDPOINTS.generateCode, {}, function (data) {
      self.$syncMsg.html( 'Please enter this code in your mobile phone: ' + data.syncCode )
    })
  },



  _onMobileClientSynched: function (event) {
    console.log( event.message )

    this.$el.find(".client-msg").html( event.message.status )
  }


})

module.exports = SyncView