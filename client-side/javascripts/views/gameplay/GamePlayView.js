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


  /**
   * A ref to the primary stage located on AppController
   * @type {PIXI.Stage}
   */
  stage: null,


  bunny: null,


  render: function () {
    this._super()

    this.stage = this.appController.stage

    var position = {
      x: AppConfig.DIMENSIONS.width * .5,
      y: AppConfig.DIMENSIONS.height * .5
    }

    var texture = new PIXI.Texture.fromImage('/assets/images/bunny.png')
    this.bunny = new PIXI.Sprite(texture)
    this.bunny.anchor.x = 0.5
    this.bunny.anchor.y = 0.5
    this.bunny.position.x = 200
    this.bunny.position.y = 200

    this.stage.addChild( this.bunny )

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

    this.bunny.position.x = orientation.x
    this.bunny.position.y = orientation.y

    // orientation.z
  }

})

module.exports = GamePlayView