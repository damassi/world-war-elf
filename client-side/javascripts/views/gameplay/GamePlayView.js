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
var View        = require('../../supers/View')


var GamePlayView = View.extend({


  bunny: null,


  render: function () {
    this._super()

    var position = {
      x: AppConfig.DIMENSIONS.width * .5,
      y: AppConfig.DIMENSIONS.height * .5
    }

    $('.desktop .message').html('desktop client connected')
    $('.mobile .message').html('mobile client connected')
    $('.btn-submit').remove()
    $('.input-sync').remove()

    this.bunny = new c.Bitmap('/assets/images/bunny.png')
    this.bunny.x = 0.5
    this.bunny.y = 0.5

    this.container.addChild( this.bunny )

    this.addEventListeners()

    return this
  },



  addEventListeners: function () {
    window.socket.on( SocketEvent.ORIENTATION, this._onOrientationUpdate )
    PubSub.on( AppEvent.TICK, this._onTick )
  },



  //+ EVENT HANDLERS
  // ------------------------------------------------------------



  _onTick: function () {},



  _onOrientationUpdate: function (message) {
    var orientation = message.orientation

    this.bunny.x = orientation.x
    this.bunny.y = orientation.y

    // orientation.z
  }

})

module.exports = GamePlayView