/**
 * Application Bootstrapper
 *
 * @author christopher.pappas@popagency.com
 * @since  11.18.13
 */

var Touch         = require('./utils/Touch')
var AppController = require('./AppController')

$(function() {

  AppController.initialize()
  Touch.translateTouchEvents()

  Backbone.history.start({
    pushState: false
  })

})