/**
 * View provides synching functionality for the mobile client
 *
 * @author christopher.pappas@popagency.com
 * @since  11.19.13
 */

var SocketEvent = require('../../../../../shared/events/SocketEvent')
var AppConfig   = require('../../../config/AppConfig')
var AppEvent    = require('../../../events/AppEvent')
var PubSub      = require('../../../utils/PubSub')
var View        = require('../../../supers/View')
var template    = require('./mobile-gameplay-template.hbs')


var MobileGamePlayView = View.extend({


  /**
   * @type {Function}
   */
  template: template,

  /**
   * Cached global session id for sending POST data to server
   * @type {String}
   */
  sessionId: null,


  /**
   * @type {$}
   */
  $body: null,




  render: function (options) {
    this._super()

    this.$body = $('body')

    var self = this

    _.defer( function() {
      self.sessionId = self.appModel.get('session').sessionId
      self.addEventListeners()
    })

    this.addDebugWindow()

    return this
  },



  addEventListeners: function () {
    //window.addEventListener( 'deviceorientation', this._onDeviceOrientationChange )
    this.$body.on('mousemove', this._onDeviceOrientationChange )
    this.$body.on('click', this._onFireButtonPress )
  },



  addDebugWindow: function () {
    $('.desktop .message').html('desktop client connected')
    $('.mobile .message').html('mobile client connected')
    $('.btn-submit').remove()
    $('.input-sync').remove()
  },



  //+ EVENT HANDLERS
  // ------------------------------------------------------------


  _onDeviceOrientationChange: function (event) {
    var orientation = {
      x: event.beta,
      y: event.gamma,
      z: event.alpha,
    }

    window.socket.post( AppConfig.ENDPOINTS.orientation, {
      sessionId: this.sessionId,
      orientation: JSON.stringify({ x: event.pageX, y: event.pageY })
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
        console.log(response, 'successfully fired')
      })
  }


})

module.exports = MobileGamePlayView