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


  /**
   * The move pos of the playbtn on rollover
   * @type {Number}
   */
  btnPositions: { backY : 509 },



  canvasEvents: {
    'backBtn mouseover' : 'onBtnOver',
    'backBtn rollout'   : 'onBtnOut',
    'backBtn click'     : 'onPlayBtnClick'
  },



  initialize: function (options) {
    this._super(options)

    this.syncText = new Easel.Text({
      text: 'Requesting Sync Code',
      font: 'Luckiest Guy',
      size: '29px',
      color: '#fff',

      position: {
        x: 156,
        y: 170,
      },

      stroke: {
        size: 5,
        color: '#333'
      }
    })

    this.children = [
      this.syncHeader = Easel.createSprite('miscSprite', 'sync-text-sync', { x: 152, y: 113 }),
      this.syncPhone = Easel.createSprite('miscSprite', 'sync-phone', { x: -176, y: 300 }),

      Easel.createSprite('miscSprite', 'sync-btn-shadow', { x: 19, y: 549 }),
      this.backBtn = Easel.createSprite('miscSprite', 'sync-btn-back', {x: 22, y: 509 }),
      Easel.createSprite('miscSprite', 'sync-btn-grass', { x: 15, y: 535 }),

      this.syncText.container
    ]

    Easel.dragObject( this.children )

  },



  render: function (options) {
    this._super()

    this.$qrCode = $('<div id="qr-code" />').appendTo('.game-wrapper')

    T.set( this.$qrCode, {
      autoAlpha: 0,
      x: 1000
    })

    this.addEventListeners()


    // Call API and create QR code with response
    var self = this

    this.requestSyncId( function (params) {

      var templateText = _.template(self.syncLabel, {
        url: AppConfig.MOBILE_URL,
        code: params.syncCode
      });

      self.syncText.setText( templateText )

      self.$qrCode.qrcode({
        text: AppConfig.MOBILE_URL + '/' + params.syncCode
      })

      T.to( self.$qrCode, .4, {
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

    T.to(this.$qrCode, .2, {
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
      })
  },



  _onDesktopClientSynched: function (message) {},



  onBtnOver: function (event) {
    var target = event.currentTarget
    var targetY = this.btnPositions.backY

    Easel.cache([ this.backBtn ])

    target.cursor = 'pointer'
    T.killTweensOf(target)
    target.y = targetY

    T.to( target, .15, {
      y: targetY - 10,
      ease: Strong.easeOut,
      yoyo: true,
      repeat: 1
    })

    T.to( target, .2, {
      easel: {
        tint: '#ffffff',
        tintAmount: .2,
      },
      ease: Linear.easeNone
    })
  },



  onBtnOut: function (event) {
    var target = event.currentTarget

    T.to( target, .2, {
      easel: {
        tint: '#ffffff',
        tintAmount: 0,
      },
      ease: Linear.easeNone
    })
  },



  onPlayBtnClick: function (event) {
    window.location.href ='#/instructions'
  },


})

module.exports = SyncView