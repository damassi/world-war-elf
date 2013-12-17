/**
 * View provides synching functionality for the mobile client
 *
 * @author christopher.pappas@popagency.com
 * @since  11.19.13
 */

var SocketEvent = require('../../../../shared/events/SocketEvent')
var AppConfig   = require('../../config/AppConfig')
var AppEvent    = require('../../events/AppEvent')
var PubSub      = require('../../utils/PubSub')
var Easel       = require('../../utils/Easel')
var MobileView  = require('./supers/MobileView')


var MobileGamePlayView = MobileView.extend({


  /**
   * Amount of scale to be applied to the snowball on render
   * @type {Number}
   */
  DEFAULT_SNOWBALL_SCALE: .8,


  /**
   * Shoot animation time
   * @type {Number}
   */
  FIRE_TIME: .2,

  /**
   * Cached global session id for sending POST data to server
   * @type {String}
   */
  sessionId: null,


  /**
   * Flag to prevent repeat animations
   * @type {Boolean}
   */
  isThrowing: false,


  /**
   * @type {$}
   */
  $body: null,


  /**
   * Keep track of our current orientation for tweening
   * @type {Object}
   */
  curOrientation: { x: 0, y: 0 },



  render: function () {
    _.bindAll(this)

    this.$el     = $('.gameplay')
    this.$body   = $('body')
    this.$bounds = $('.balls-bounds')
    this.$balls  = $('.balls-wrapper')
    this.$ball   = $('.ball')

    TweenMax.set( this.$balls, { y: '25%' })

    TweenMax.set( this.$bounds, {
      top: -300,
      height: $(document).innerHeight() * 3.3
    })

    var self = this

    _.delay( function() {
      self.sessionId = self.appModel.get('session').sessionId
      self.addEventListeners()
    }, 1000)

    this.show()

    return this
  },



  addEventListeners: function () {
    this.$body.on('touchend', this.fireBall )

    window.addEventListener( 'devicemotion', this.onDeviceMotion )
    window.socket.on( SocketEvent.TOGGLE_MODE, this.onToggleMode )
    window.socket.on( SocketEvent.GAME_OVER, this.onGameOver )
  },



  removeEventListeners: function () {
    this.$body.off('touchend', this.fireBall )

    window.removeEventListener( 'devicemotion', this.onDeviceMotion )
    window.socket.removeListener( SocketEvent.TOGGLE_MODE, this.onToggleMode )
    window.socket.removeListener( SocketEvent.GAME_OVER, this.onGameOver )
  },



  fireBall: function () {
    this.sendFireRequestToDesktop()

    var self = this

    if (!this.isThrowing) {
      this.isThrowing = true

      TweenMax.to( this.$balls, this.FIRE_TIME, {
        y: -800,
        ease: Expo.easeIn,
        onComplete: function () {
          self.resetBall()
        }
      })
    }
  },




  //+ EVENT HANDLERS
  // ------------------------------------------------------------


  onDeviceMotion: function (event) {
    var self = this

    var orientation = {
      x: event.accelerationIncludingGravity.x,
      y: event.accelerationIncludingGravity.y
    }

    if (Easel.isIOS()) {

    }
    else if (Easel.isAndroid()) {
      orientation.x = orientation.x * -1
      orientation.y = orientation.y * -1
    }
    else {

    }

    TweenMax.to(this.curOrientation, .6, {
      x: orientation.x,
      y: orientation.y,
      onUpdate: function() {

        window.socket.post( AppConfig.ENDPOINTS.orientation, {
          sessionId: self.sessionId,
          orientation: JSON.stringify( self.curOrientation )
        },

          function onResponse (response) {})
      }
    })
  },



  /**
   * Received from API service which tells the mobile client to
   * update view to super snowball
   *
   * @param  {Object} message Message containing prop .supermode (boolean)
   */
  onToggleMode: function (message) {
    this.toggleBall()
  },



  onGameOver: function (message) {
    this.trigger( AppEvent.STOP_GAMEPLAY )
  },




  //+ EVENT HANDLERS
  // ------------------------------------------------------------



  sendFireRequestToDesktop: function () {
    window.socket.post( AppConfig.ENDPOINTS.fire, {
      sessionId: this.sessionId
    },

      function onResponse (response) {})
  },



  resetBall: function () {
    TweenMax.set( this.$balls, {
      alpha: 0
    })

    TweenMax.set( this.$balls, {
      clearProps: 'y'
    })

    var self = this

    TweenMax.fromTo( this.$balls, this.FIRE_TIME, { alpha: 0, top: '100%' }, {
      immediateRender: true,
      top: '25%',
      alpha: 1,
      ease: Expo.easeOut,
      delay: this.FIRE_TIME,
      onComplete: function() {
        self.isThrowing = false
      }
    })
  },



  toggleBall: function () {
    var self = this

    TweenMax.to( this.$ball, .3, {
      scale: 0,
      ease: Back.easeIn,
      onComplete: function () {

        self.$ball.toggleClass('hide')

        TweenMax.to( self.$ball, .3, {
          scale: self.DEFAULT_SNOWBALL_SCALE,
          ease: Back.easeOut,
          onComplete: function () {

          }
        })
      }
    })
  }


})

module.exports = MobileGamePlayView
