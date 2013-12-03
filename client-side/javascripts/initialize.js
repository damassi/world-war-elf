/**
 * Application Bootstrapper
 *
 * @author christopher.pappas@popagency.com
 * @since  11.18.13
 */

var Touch         = require('./utils/Touch')
var AppController = require('./AppController')
var Assets        = require('./config/Assets')


// Globally rewrite CreateJS namespace to a shorthand c
c = createjs


function startGame() {
  AppController.initialize()

  Backbone.history.start({
    pushState: false
  })
}


$(function() {

  Touch.translateTouchEvents()

  var loadQueue = new c.LoadQueue()

  loadQueue.addEventListener( 'error', function (error) {
    console.error('LoadError: ', error)
  })

  loadQueue.addEventListener( 'progress', function (event) {
    var progress = Math.round( event.progress * 100 ) + '%'
  })

  loadQueue.addEventListener( 'complete', function (event) {

    startGame()

  })

  var manifest = _.map( Assets.manifest, function (asset) {
    return asset.src
  })

  loadQueue.loadManifest( manifest )

})