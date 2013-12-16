/**
 * Application Bootstrapper
 *
 * @author christopher.pappas@popagency.com
 * @since  11.18.13
 */

var Touch         = require('./utils/Touch')
  , PreloaderView = require('./views/preloader/PreloaderView')
  , AppController = require('./AppController')


c = createjs
T = TweenMax


$(function siteInitialized () {
  Touch.translateTouchEvents()
  //PointerEventsPolyfill.initialize({})

  // Mustache regex for micro templates
  _.templateSettings = {
    'interpolate': /{{([\s\S]+?)}}/g
  }

  new PreloaderView().on( 'loadComplete', function( scoreboard ) {

    AppController.initialize({
      scoreboard: scoreboard
    })

    Backbone.history.start({
      pushState: false
    })
  })

})
