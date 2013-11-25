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


  TEXT_POS: {
    time: { x: 860, y: 20 },
    presents: { x: 880, y: 65 }
  },


  initialize: function (options) {
    this._super(options)

    this.timeText = new Easel.Text('0:00', 'Luckiest Guy', '39px', '#fff', { x: this.TEXT_POS.time.x, y: this.TEXT_POS.time.y }, {size: 5, color: '#333' })

    this.children = [
      this.hudClock    = Easel.createSprite('gameplaySprite', 'game-hud-clock', { x: 820, y: 15 }),
      this.hudGift     = Easel.createSprite('gameplaySprite', 'game-hud-gift', { x: 820, y: 76 }),

      this.timeText.container,

      //this.timeTextStroke = Easel.createText('0:00', 'Luckiest Guy', '39px', '#fff', { x: this.TEXT_POS.time.x, y: this.TEXT_POS.time.y }, { size: 5, color: '#333'}),
      //this.timeText = Easel.createText('0:00', 'Luckiest Guy', '39px', '#fff', { x: this.TEXT_POS.time.x, y: this.TEXT_POS.time.y }),

      //this.presentTextStroke = Easel.createText('11', 'Luckiest Guy', '79px', '#333', { x: this.TEXT_POS.presents.x, y: this.TEXT_POS.presents.y, outline: 5 }),
      //this.presentText = Easel.createText('11', 'Luckiest Guy', '79px', '#ff0000', { x: this.TEXT_POS.presents.x, y: this.TEXT_POS.presents.y })
    ]

    Easel.dragObject( this.children )
  },



  render: function (options) {
    this.addChildren( this.children )

    return this
  },

})

module.exports = HUDView