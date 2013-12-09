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
   * The default text that will be rendered to the message on API sync
   * @type {String}
   */
  syncLabel: 'Visit {{url}} on your \nsmartphone and enter {{code}} or scan the \nQR code to the right!',


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

    this.syncText = new Easel.Text( 'Requesting Sync Code', 'Luckiest Guy', '29px', '#fff', {
      x: 156,
      y: 170,
    }, {
      size: 5,
      color: '#333'
    })

    this.children = [
      this.syncHeader = Easel.createSprite('miscSprite', 'sync-text-sync', { x: 152, y: 113 }),
      this.syncPhone = Easel.createSprite('miscSprite', 'sync-phone', { x: -176, y: 300 }),

      this.syncText.container
    ]

    Easel.dragObject( this.children )

  },



  render: function (options) {
    this._super()

    this.$qrCode = $('<div id="qr-code" />').appendTo('.game-wrapper')
    TweenMax.set( this.$qrCode, { autoAlpha: 0, x: 1000 })

    var self = this

    this.addEventListeners()
    this.requestSyncId(function (params) {

      var templateText = _.template(self.syncLabel, {
        url: AppConfig.MOBILE_URL,
        code: params.syncCode
      });

      self.syncText.setText( templateText )

      self.$qrCode.qrcode({
        text: AppConfig.MOBILE_URL + '/' + params.syncCode
      })

      TweenMax.to( self.$qrCode, .4, {
        autoAlpha: 1,
        x: 0,
        ease: Expo.easeOut,
        delay: .7
      })
    })

    return this
  },



  show: function () {
    this._super()
  },



  hide: function() {
    this._super()

    TweenMax.to(this.$qrCode, .2, {
      alpha: 0,
      onComplete: function() {
        $(this.target).remove()
      }
    })
  },



  addEventListeners: function () {
    PubSub.on( AppEvent.DESKTOP_CLIENT_SYNCED, this._onDesktopClientSynched )
  },



  requestSyncId: function (callback) {
    var self = this

    window.socket.get( AppConfig.ENDPOINTS.generateCode, {},

      function onResponse (response) {
        callback({
          syncCode: response.syncCode
        })

        console.log(response.syncCode)
        $('.debug').html('Please enter this code in your mobile phone: ' + response.syncCode)
      })
  },



  _onDesktopClientSynched: function (message) {
    this.clientMsg.text = message.sessionId
  }


})

module.exports = SyncView