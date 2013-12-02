/**
 * Submit the last game played to the high scores db
 *
 * @author Christopher Pappas
 * @date   12.2.13
 */


var View  = require('../supers/View')
var Easel = require('../utils/Easel')


var SubmitScoreView = View.extend({


  initialize: function (options) {
    this._super(options)

    this.children = [
      this.placeholder = Easel.createBitmap('placeholder-submit-score')
    ]
  }

})

module.exports = SubmitScoreView