/**
 * Game landing view.
 *
 * @author christopher.pappas@popagency.com
 * @since  11.18.13
 */

var AppEvent = require('../../events/AppEvent')
var PubSub   = require('../../utils/PubSub')
var View     = require('../../supers/View')
var Easel    = require('../../utils/Easel')


var HomeView = View.extend({


  initialize: function (options) {
    this._super(options)

    this.placeholder = Easel.createSpriteSheet('homeSprite', 'home-ground-back')

    this.sprite = new c.SpriteSheet()

  },


  render: function (options) {
    this._super()

    this.container.addChild( this.placeholder )

    return this
  }


})

module.exports = HomeView