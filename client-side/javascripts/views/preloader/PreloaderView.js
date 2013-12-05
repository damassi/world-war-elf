/**
 * Simple PreloadJS preloader, which exists on the dom
 *
 * @author Christopher Pappas
 * @date   12.4.13
 */

var Assets   = require('../../config/Assets')
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

    this.$preloaderGfx = this.$el.find('img')

    TweenMax.fromTo( this.$preloaderGfx, .6, { x: 2000, autoAlpha: 0, scale: 1, rotation: 220 }, {
      immediateRender: true,
      x: 0,
      autoAlpha: 1,
      scale: 1,
      rotation: 0,
      ease: Expo.easeOut,
      delay: .4,
      onComplete: this.loadSite
    })
  },



  loadSite: function() {
    var loadQueue = new c.LoadQueue()

    loadQueue.installPlugin( c.Sound )

    loadQueue.addEventListener( 'error', this._onLoadError )
    loadQueue.addEventListener( 'progress', this._onLoadProgress )
    loadQueue.addEventListener( 'complete', this._onLoadComplete )

    var manifest = _.map( Assets.manifest, function (asset) {
      return asset.src
    })

    var audioManifest = _.filter( Assets.manifest, function (asset) {
      if (asset.hasOwnProperty('audioId')) {
        return asset
      }
    })

    _.each( audioManifest, function (asset) {
      c.Sound.registerSound(asset.src, asset.audioId)
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
    var self = this

    TweenMax.to( this.$preloaderGfx, .6, {
      x: -2000,
      rotation: -180,
      ease: Back.easeIn,
      delay: .5,
      onComplete: function() {
        self.trigger('loadComplete')

        self.remove()
      }
    })
  }

})

module.exports = PreloaderView