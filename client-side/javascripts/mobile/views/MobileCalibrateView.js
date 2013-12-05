/**
 * Calibrates the mobile phone by normalizing accelerometer data between client
 * and mobile phone vendors
 *
 * @author Christopher Papps
 * @date   12.4.13
 */

var MobileView = require('./supers/MobileView')
var AppEvent   = require('../../events/AppEvent')


var MobileCalibrateView = MobileView.extend({


  render: function () {
    this.$el = $('.calibrate')
    this.$startBtn = this.$el.find('.start-btn')

    this.show()

    this.$startBtn.on('touchend', this._onStartBtnClick )
  },



  _onStartBtnClick: function (event) {
    this.trigger( AppEvent.MOBILE_CALIBRATED )
  }

})

module.exports = MobileCalibrateView