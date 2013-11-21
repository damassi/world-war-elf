/**
 * Game landing view.
 *
 * @author christopher.pappas@popagency.com
 * @since  11.18.13
 */

var AppEvent = require('../../events/AppEvent')
var PubSub   = require('../../utils/PubSub')
var View     = require('../../supers/View')


var HomeView = View.extend({


  initialize: function (options) {
    this._super(options)

    this.placeholder = new c.Bitmap('/assets/images/placeholder-home.jpg')

  },


  render: function (options) {
    this._super()

    this.container.addChild( this.placeholder )
    this.stage.addChild( this.container )

    return this
  }


})

module.exports = HomeView