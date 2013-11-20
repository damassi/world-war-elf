/**
 * View provides synching functionality for the mobile client
 *
 * @author christopher.pappas@popagency.com
 * @since  11.19.13
 */

var SocketEvent = require('../../../../shared/events/SocketEvent')
var AppEvent    = require('../../events/AppEvent')
var PubSub      = require('../../utils/PubSub')
var View        = require('../../supers/View')
var template    = require('./gameplay-template.hbs')


var GamePlayView = View.extend({


  template: template,


  render: function (options) {
    this._super()

    window.socket.on( SocketEvent.ORIENTATION, this._onOrientationUpdate )

    return this
  },



  _onOrientationUpdate: function (message) {
    var orientation = message.orientation

    $('.orientation').html( 'x: ' + orientation.x + ' y: ' + orientation.y + ' z: 0' )
  }

})

module.exports = GamePlayView