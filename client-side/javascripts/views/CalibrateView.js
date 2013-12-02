/**
 * CalibrationView synchs the acelerometer on the phone with the connected desktop client
 *
 * @author Christopher Pappas
 * @date   12.2.13
 */


var View  = require('../supers/View')
var Easel = require('../utils/Easel')


var CalibrateView = View.extend({


  initialize: function (options) {
    this._super(options)

    this.children = [
      this.placeholder = Easel.createBitmap('placeholder-calibrate')
    ]
  }

})

module.exports = CalibrateView