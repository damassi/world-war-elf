/**
 * Game landing view.
 *
 * @author christopher.pappas@popagency.com
 * @since  11.18.13
 */

var AppEvent   = require('../../events/AppEvent')
var PubSub     = require('../../utils/PubSub')
var View       = require('../../supers/View')
var Easel      = require('../../utils/Easel')
var Snowflakes = require('../../utils/Snowflakes')

var HomeView = View.extend({


  initialize: function (options) {
    this._super(options)

    this.children = [
      this.placeholder  = Easel.createBitmap('placeholder-home'),
      this.backGround   = Easel.createSprite('homeSprite', 'home-ground-back'),
      this.middleGround = Easel.createSprite('homeSprite', 'home-ground-middle'),
      this.frontGround  = Easel.createSprite('homeSprite', 'home-ground-front')
    ]

    Easel.dragObject( this.children )

  },


  render: function (options) {
    this._super()

    this.addChildren( this.children )
    new Snowflakes()
    return this
  }


})

module.exports = HomeView