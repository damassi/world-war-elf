/**
 * Calculated highscores returned from the backend API
 *
 * @author Christopher Pappas
 * @date   12.2.13
 */


var View  = require('../supers/View')
var Easel = require('../utils/Easel')


var HighScoresView = View.extend({


  initialize: function (options) {
    this._super(options)

    this.children = [
      this.placeholder = Easel.createBitmap('placeholder-highscores')
    ]
  }

})

module.exports = HighScoresView