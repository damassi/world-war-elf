/**
 * Game landing view.
 *
 * @author christopher.pappas@popagency.com
 * @since  11.18.13
 */

var AppConfig = require('../config/AppConfig')
  , AppEvent  = require('../events/AppEvent')
  , PubSub    = require('../utils/PubSub')
  , View      = require('../supers/View')
  , Easel     = require('../utils/Easel')


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

    this.children = [
      this.placeholder  = Easel.createBitmap('placeholder-sync'),
      this.syncMsg = new c.Text("", "20px Arial", "#fff"),
      this.clientMsg = new c.Text("Client not connected", "20px Arial", "#fff")
    ]


    this.syncMsg.x = 100
    this.syncMsg.y = 100


    this.clientMsg.x = this.syncMsg.x
    this.clientMsg.y = this.syncMsg.y + 50

    $('.desktop .message').html('Client not connected')
  },



  render: function (options) {
    this._super()

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
        console.log(response.syncCode)
        self.syncMsg.text = 'Please enter this code in your mobile phone: ' + response.syncCode
        $('.debug').html('Please enter this code in your mobile phone: ' + response.syncCode)
      })
  },



  _onDesktopClientSynched: function (message) {
    this.clientMsg.text = message.sessionId
  }


})

module.exports = SyncView