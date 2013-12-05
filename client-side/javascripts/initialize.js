/**
 * Application Bootstrapper
 *
 * @author christopher.pappas@popagency.com
 * @since  11.18.13
 */

var Touch         = require('./utils/Touch')
var PreloaderView = require('./views/preloader/PreloaderView')
var AppController = require('./AppController')

// Convenience ref
c = createjs

$(function siteInitialized () {

  Touch.translateTouchEvents()

  var preloader = new PreloaderView()

  preloader.on( 'loadComplete', function() {
    AppController.initialize()

    Backbone.history.start({
      pushState: false
    })
  })

})