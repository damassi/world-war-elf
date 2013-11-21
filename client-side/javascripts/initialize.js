/**
 * Application Bootstrapper
 *
 * @author christopher.pappas@popagency.com
 * @since  11.18.13
 */

var Touch         = require('./utils/Touch')
var AppController = require('./AppController')
var Assets        = require('./config/Assets')

$(function() {

  Touch.translateTouchEvents()


  var loadQueue = new c.LoadQueue()

  loadQueue.addEventListener( "error", function (error) {
    console.error('LoadError: ', error)
  })

  loadQueue.addEventListener( "progress", function (event) {
    var progress = Math.round( event.progress * 100 ) + '%'
  })

  loadQueue.addEventListener( "complete", function (event) {
    AppController.initialize()

    console.log( Assets.manifest)

    Backbone.history.start({
      pushState: false
    })

  })

  var manifest = _.map(Assets.manifest, function( asset ) {
    return asset.src
  })

  loadQueue.loadManifest( manifest )

})