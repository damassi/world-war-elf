/**
 * Simple PreloadJS preloader, which exists on the dom
 *
 * @author Christopher Pappas
 * @date   12.4.13
 */

var AppController = require('../../AppController')
var Assets        = require('../../config/Assets')
var template = require('./preloader-template.hbs')


var PreloaderView = Backbone.View.extend({


  id: 'preloader',

  template: template,


  initialize: function () {
    _.bindAll(this)

    this.render()
  },



  render: function () {
    $('body').append( this.$el.html( this.template() ))

    var loadQueue = new c.LoadQueue()

    loadQueue.addEventListener( 'error', this._onLoadError )
    loadQueue.addEventListener( 'progress', this._onLoadProgress )
    loadQueue.addEventListener( 'complete', this._onLoadComplete )

    var manifest = _.map( Assets.manifest, function (asset) {
      return asset.src
    })

    loadQueue.loadManifest( manifest )
  },



  _onLoadError: function (error) {
     console.error('LoadError: ', error)
  },



  _onLoadProgress: function (event) {
    var progress = Math.round( event.progress * 100 ) + '%'
  },



  _onLoadComplete: function () {
    AppController.initialize()

    Backbone.history.start({
      pushState: false
    })

    this.remove()
  }

})

module.exports = PreloaderView