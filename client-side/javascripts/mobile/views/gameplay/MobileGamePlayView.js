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



  render: function (options) {
    this._super()

    var self = this

    _.defer( function() {
      self.sessionId = self.appModel.get('session').sessionId
      self.addEventListeners()
    })

    $('.desktop .message').html('desktop client connected')
    $('.mobile .message').html('mobile client connected')
    $('.btn-submit').remove()
    $('.input-sync').remove()

    return this
  },



  addEventListeners: function () {
    //window.addEventListener( 'deviceorientation', this._onDeviceOrientationChange )
    $('body').on('mousemove', this._onDeviceOrientationChange )
  },



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
        console.log(response.orientation)
      })
  }


})

module.exports = MobileGamePlayView