/**
 * HUD View which displays scores and overall progress
 *
 * @author christopher.pappas@popagency.com
 * @since  11.25.13
 */

var SocketEvent = require('../../../../shared/events/SocketEvent')
var AppConfig   = require('../../config/AppConfig')
var AppEvent    = require('../../events/AppEvent')
var PubSub      = require('../../utils/PubSub')
var View        = require('../../supers/View')
var Easel       = require('../../utils/Easel')


var HUDView = View.extend({


  initialize: function (options) {
    this._super(options)

    this.children = [
      this.hudClock    = Easel.createSprite('gameplaySprite', 'game-hud-clock', { x: 820, y: 15 }),
      this.hudGift     = Easel.createSprite('gameplaySprite', 'game-hud-gift', { x: 820, y: 76 }),
    ]
  },



  render: function (options) {
    this.addChildren( this.children )

    return this
  },

})

module.exports = HUDView