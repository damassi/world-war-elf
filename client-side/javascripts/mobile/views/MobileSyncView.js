/**
 * View provides synching functionality for the mobile client
 *
 * @author christopher.pappas@popagency.com
 * @since  11.19.13
 */

var ErrorEvent = require('../../../../shared/events/ErrorEvent')
var AppConfig = require('../../config/AppConfig')
var AppEvent = require('../../events/AppEvent')
var PubSub   = require('../../utils/PubSub')
var SocketIO = require('../../utils/SocketIO')


var MobileSyncView = Backbone.View.extend({



  events: {
    'touchstart .btn-submit': '_onSubmitBtnClick'
  },



  render: function (options) {
    _.bindAll(this)

    this.$el = $('.syncing')
    this.$syncingMessage = $('.syncing-wait')
    this.$syncBtn = this.$el.find('.sync-btn')
    this.$input = this.$el.find('.sync-input')

    this.$syncBtn.on('touchstart', this._onSubmitBtnClick )

    return this
  },



  _onSubmitBtnClick: function (event) {
    event.preventDefault()

    var syncCode = this.$input.val()
    var self = this

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
    console.log(response, this)

    // Connection success
    if (response.status === 200) {

      return
    }

    // Error connecting to the client
    if (response.status === 500) {

      var error = response.errors[0]

      switch (error) {
        case ErrorEvent.SESSION_NOT_FOUND:
          console.error('Session not found.')

          this._hideSyncingMessage()
      }

      return
    }
  },



  _showSyncingMessage: function (callback) {
    var self = this

    TweenMax.to( this.$el, .4, {
      x: -1000,
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
          x: 0,
          ease: Expo.easeOut
        })

        self.$el.removeClass('hidden')
      }
    })
  }

})

module.exports = MobileSyncView