/**
 * View provides synching functionality for the mobile client
 *
 * @author christopher.pappas@popagency.com
 * @since  11.19.13
 */

var SocketEvent = require('../../../../../shared/events/SocketEvent')
var AppConfig = require('../../../config/AppConfig')
var AppEvent = require('../../../events/AppEvent')
var PubSub   = require('../../../utils/PubSub')
var View     = require('../../../supers/View')
var template = require('./mobile-gameplay-template.hbs')


var MobileGamePlayView = View.extend({


  /**
   * @type {Function}
   */
  template: template,


  render: function (options) {
    this._super()

    _.defer( this.addEventListeners )

    return this
  },



  addEventListeners: function () {
    console.log( this.appModel.toJSON() )
    window.addEventListener( 'deviceorientation', this._onDeviceOrientationChange )
  },



  _onDeviceOrientationChange: function (event) {
    var props = {
      x: event.beta,
      y: event.gamma,
      z: event.alpha,
    }

    return

    window.socket.post( AppConfig.ENDPOINTS.orientation, {
      sessionId: syncCode
    },

      function onResponse (response) {

      })
  }


})

module.exports = MobileGamePlayView