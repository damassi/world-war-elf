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
    //console.log( progress )
  })

  loadQueue.addEventListener( "complete", function (event) {
    //console.log(event)
    AppController.initialize()

    console.log( Assets.manifest)

    Backbone.history.start({
      pushState: false
    })

  })

  var imgPath = '/assets/images/'

  loadQueue.loadManifest([
    imgPath + 'spritesheets/sprites-home.json',
    imgPath + 'spritesheets/sprites-home.png',
    imgPath + 'spritesheets/sprites-game.json',
    imgPath + 'spritesheets/sprites-game.png',
  ])

})