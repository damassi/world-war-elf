/**
 * View provides synching functionality for the mobile client
 *
 * @author christopher.pappas@popagency.com
 * @since  11.19.13
 */

var ErrorEvent  = require('../../../../shared/events/ErrorEvent')
var SocketEvent = require('../../../../shared/events/SocketEvent')
var AppConfig   = require('../../config/AppConfig')
var AppEvent    = require('../../events/AppEvent')
var PubSub      = require('../../utils/PubSub')
var SocketIO    = require('../../utils/SocketIO')
var MobileView  = require('./supers/MobileView')


var MobileSyncView = MobileView.extend({


  render: function (options) {
    this.$el             = $('.syncing')
    this.$syncingMessage = $('.syncing-wait')
    this.$syncBtn        = this.$el.find('.sync-btn')
    this.$input          = this.$el.find('.sync-input')

    this.$syncBtn.on('touchstart', this._onSubmitBtnClick )

    this.show()


    // Check if sync code is being passed into the url bar and
    // then auto-forward user

    var syncCode = window.location.pathname.split('/').pop()

    if (syncCode.length === 5) {
      this.$input.val(syncCode)

      TweenMax.set( this.$el, { alpha: 0 })

      var self = this

      TweenMax.delayedCall( 1.3, function() {
        self.$syncBtn.trigger('touchstart')
      })

    }

    return this
  },



  hide: function() {
    var self = this

    TweenMax.to( this.$syncingMessage, .4, {
      x: -1000,
      ease: Expo.easeIn,

      onComplete: function() {
        self.remove()
      }
    })

  },




  //+ EVENT HANDLERS
  // ------------------------------------------------------------



  _onSubmitBtnClick: function (event) {
    event.preventDefault()

    this.$syncBtn.focus()

    var syncCode = this.$input.val()
      , self = this

    // Animate in message and then post
    this._showSyncingMessage( function () {
      window.socket.post( AppConfig.ENDPOINTS.sync, {
        syncCode: syncCode
      },
        self._onServerResponse
      )
    })

    return false
  },



  _onServerResponse: function (response) {
    if (response.status === 200) {
      this.trigger( SocketEvent.SYNCED )
    }

    else if (response.status === 500) {
      var error = response.errors[0]

      switch (error) {

        case ErrorEvent.SESSION_NOT_FOUND:
          this._hideSyncingMessage()

          console.error('Session not found.')
      }
    }
  },




  //+ PRIVATE METHODS
  // ------------------------------------------------------------



  _showSyncingMessage: function (callback) {
    var self = this

    TweenMax.to( this.$el, .4, {
      x: -1000,
      delay: .3,
      ease: Expo.easeIn,


      onComplete: function() {
        self.$el.addClass('hidden')

        TweenMax.fromTo( self.$syncingMessage, .4, { x: 1000 }, {
          immediateRender: true,
          x: 0,
          ease: Expo.easeOut,
          onComplete: callback
        })

        self.$syncingMessage.removeClass('hidden')
      }
    })
  },



  _hideSyncingMessage: function () {
    var self = this

    TweenMax.to( this.$syncingMessage, .4, {
      x: -1000,
      ease: Expo.easeIn,


      onComplete: function() {
        self.$syncingMessage.addClass('hidden')

        TweenMax.fromTo( self.$el, .4, { x: 1000 }, {
          immediateRender: true,
          alpha: 1,
          x: 0,
          ease: Expo.easeOut
        })

        self.$el.removeClass('hidden')
      }
    })
  }

})

module.exports = MobileSyncView