/**
 * Application Bootstrapper
 *
 * @author christopher.pappas@popagency.com
 * @since  11.18.13
 */

var Touch         = require('./utils/Touch')
var PreloaderView = require('./views/preloader/PreloaderView')

// Convenience ref
c = createjs

$(function siteInitialized () {

  Touch.translateTouchEvents()

  new PreloaderView()

})