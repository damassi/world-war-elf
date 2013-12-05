/**
 * Calibrates the mobile phone by normalizing accelerometer data between client
 * and mobile phone vendors
 *
 * @author Christopher Papps
 * @date   12.4.13
 */

var MobileView = require('./supers/MobileView')


var MobileCalibrateView = Backbone.View.extend({


  render: function () {
    this.$el = $('.calibrate')
  },

})

module.exports = MobileCalibrateView