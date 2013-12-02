/**
 * Game landing view.
 *
 * @author christopher.pappas@popagency.com
 * @since  11.18.13
 */

var AppConfig = require('../config/AppConfig')
var AppEvent  = require('../events/AppEvent')
var PubSub    = require('../utils/PubSub')
var View      = require('../supers/View')


var SyncView = View.extend({


  /**
   * @type {$}
   */
  syncMsg: null,

  /**
   * @type {$}
   */
  clientMsg: null,


  initialize: function (options) {
    this._super(options)

    this.syncMsg = new c.Text("", "20px Arial", "#fff")
    this.syncMsg.x = 100
    this.syncMsg.y = 100

    this.clientMsg = new c.Text("Client not connected", "20px Arial", "#fff")
    this.clientMsg.x = this.syncMsg.x
    this.clientMsg.y = this.syncMsg.y + 50

    $('.desktop .message').html('Client not connected')
  },



  render: function (options) {
    this._super()

    this.container.addChild( this.syncMsg )
    this.container.addChild( this.clientMsg )

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
        self.syncMsg.text = 'Please enter this code in your mobile phone: ' + response.syncCode
        $('.desktop .message').html('Please enter this code in your mobile phone: ' + response.syncCode)
      })
  },



  _onDesktopClientSynched: function (message) {
    this.clientMsg.text = message.sessionId
  }


})

module.exports = SyncView