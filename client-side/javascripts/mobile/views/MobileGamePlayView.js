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
var MobileView  = require('./supers/MobileView')


var MobileGamePlayView = MobileView.extend({


  /**
   * Amount of scale to be applied to the snowball on render
   * @type {Number}
   */
  DEFAULT_SNOWBALL_SCALE: .8,

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
   * keep track of our current orientation for tweening
   * @type {Object}
   */
  _curOrientation: {x:0,y:0}, 


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

    _.defer( function() {
      self.sessionId = self.appModel.get('session').sessionId
      self.addEventListeners()
    })

    //this.setBall()
    this.show()

    return this
  },



  addEventListeners: function () {

    this.$body.on('mousemove', this._onDeviceOrientationChange )
    this.$body.on('touchend', this.fireBall )

    window.ondevicemotion = this._onDeviceMotion
    window.socket.on( SocketEvent.TOGGLE_MODE, this._onToggleMode )
  },



  fireBall: function () {
    this._sendFireRequestToDesktop()

    var self = this

    if (!this.isThrowing) {
      this.isThrowing = true

      TweenMax.to( this.$balls, .4, {
        y: -800,
        ease: Expo.easeIn,
        onComplete: function () {
          self._resetBall()
        }
      })
    }
  },


  //+ EVENT HANDLERS
  // ------------------------------------------------------------

  _onDeviceMotion: function (event) {
    var self = this

    var orientation = {
      x: ~~event.accelerationIncludingGravity.x,
      y: ~~event.accelerationIncludingGravity.y
    }

    TweenMax.to(this._curOrientation, .6, 
      {x:event.accelerationIncludingGravity.x, y:event.accelerationIncludingGravity.y}
    )

    $('.debug').html(orientation.x + '<br/>' + orientation.y)

    window.socket.post( AppConfig.ENDPOINTS.orientation, {
      sessionId: self.sessionId,
      orientation: JSON.stringify( this._curOrientation )
    },

      function onResponse (response) {
        //console.log(response.orientation)
      })
  },



  /**
   * Received from API service which tells the mobile client to update view to super snowball
   *
   * @param  {Object} message Message containing prop .supermode (boolean)
   */
  _onToggleMode: function (message) {
    if (message.supermode) {

    }

    this._toggleBall()
  },



  _onDeviceOrientationChange: function (event) {

    var orientation = {}

    try {
      orientation = {
        x: event.originalEvent.touches[0].pageX,
        y: event.originalEvent.touches[0].pageY
      }
    }
    catch (e) {
      orientation = {
        x: event.pageX,
        y: event.pageY
      }
    }

    $('.debug').html( orientation.x + ', ' + orientation.y )

    // TODO: Clean up debug mode

    window.socket.post( AppConfig.ENDPOINTS.orientation, {
      sessionId: this.sessionId,
      orientation: JSON.stringify( orientation )
    },

      function onResponse (response) {
        //console.log(response.orientation)
      })
  },




  //+ EVENT HANDLERS
  // ------------------------------------------------------------


  _sendFireRequestToDesktop: function () {
    window.socket.post( AppConfig.ENDPOINTS.fire, {
      sessionId: this.sessionId
    },

      function onResponse (response) {
        //console.log(response, 'successfully fired')
      })
  },



  _resetBall: function () {
    TweenMax.set( this.$balls, { alpha: 0 })
    TweenMax.set( this.$balls, { clearProps: 'y' })

    var self = this

    TweenMax.fromTo( this.$balls, .4, { alpha: 0, top: '100%' }, {
      immediateRender: true,
      top: '25%',
      alpha: 1,
      ease: Expo.easeOut,
      delay: .5,
      onComplete: function() {
        self.isThrowing = false
      }
    })
  },



  _toggleBall: function () {
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
  },

  _setBall: function() {
    TweenMax.set( this.$balls, { clearProps: 'y' })
    TweenMax.fromTo( this.$balls, .4, {top: 500}, {
      top: '25%',
      ease: Expo.easeOut,
      delay: .3
    })

    var self = this

    this.draggableBall = Draggable.create( this.$balls, {
      type:"y",
      bounds: '.balls-bounds',
      throwProps: true,
      onThrowUpdate: function() {
        var y = GreenProp.y(this.target)
        var upperBounds = -600

        if (y < upperBounds) {
          TweenMax.killTweensOf( self.$balls )
          self._setBall()
        }

      }
    });
  },


})

module.exports = MobileGamePlayView
