
var View     = require('../../supers/View')
var template = require('./landing-template.hbs')

var LandingView = View.extend({

  template: template,

  render: function (options) {
    this._super()

    console.log('rending landing')

    return this
  }

})

module.exports = LandingView