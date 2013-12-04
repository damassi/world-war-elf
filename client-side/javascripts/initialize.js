/**
 * Application Bootstrapper
 *
 * @author christopher.pappas@popagency.com
 * @since  11.18.13
 */

var Touch         = require('./utils/Touch')
var PreloaderView = require('./views/preloader/PreloaderView')

// Globally rewrite CreateJS namespace to a shorthand c
c = createjs

$(function siteInitialized () {

  Touch.translateTouchEvents()

  new PreloaderView()

})