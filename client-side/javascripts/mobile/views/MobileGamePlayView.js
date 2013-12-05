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
   * Cached global session id for sending POST data to server
   * @type {String}
   */
  sessionId: null,


  /**
   * @type {$}
   */
  $body: null,




  render: function () {
    _.bindAll(this)

    this.$el = $('.gameplay')
    this.$body = $('body')

    var self = this

    _.defer( function() {
      self.sessionId = self.appModel.get('session').sessionId
      self.addEventListeners()
    })

    this.show()

    //this.addDebugWindow()

    return this
  },



  addEventListeners: function () {

    window.addEventListener( 'ondevicemotion', this._onDeviceOrientationChange )

    this.$body.on('mousemove', this._onDeviceOrientationChange )
    //this.$body.on('touchmove', this._onDeviceOrientationChange )
    this.$body.on('touchend', this._onFireButtonPress )

    window.socket.on( SocketEvent.TOGGLE_MODE, function(message) {
      console.log('WORKING', message)
    })

    var self = this

    window.ondevicemotion = function(event) {

      var orientation = {
        x: ~~event.accelerationIncludingGravity.x,
        y: ~~event.accelerationIncludingGravity.y
      }

      $('.debug').html(orientation.x + '<br/>' + orientation.y)

      window.socket.post( AppConfig.ENDPOINTS.orientation, {
        sessionId: self.sessionId,
        orientation: JSON.stringify( orientation )
      },

        function onResponse (response) {
          //console.log(response.orientation)
        })
    }
  },




  //+ EVENT HANDLERS
  // ------------------------------------------------------------



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

    $('.debug').html( orientation.x + ', ' + orientation.y + ' ' + orientation.z )

    window.socket.post( AppConfig.ENDPOINTS.orientation, {
      sessionId: this.sessionId,
      orientation: JSON.stringify( orientation )
    },

      function onResponse (response) {
        //console.log(response.orientation)
      })
  },



  _onFireButtonPress: function (event) {
    window.socket.post( AppConfig.ENDPOINTS.fire, {
      sessionId: this.sessionId
    },

      function onResponse (response) {
        //console.log(response, 'successfully fired')
      })
  }


})

module.exports = MobileGamePlayView
