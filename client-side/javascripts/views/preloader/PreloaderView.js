/**
 * Simple PreloadJS preloader, which exists on the dom
 *
 * @author Christopher Pappas
 * @date   12.4.13
 */

var AppConfig = require('../../config/AppConfig')
  , Assets    = require('../../config/Assets')
  , template  = require('./preloader-template.hbs')


var PreloaderView = Backbone.View.extend({


  /**
   * @type {String}
   */
  id: 'preloader',


  /**
   * @type {Function}
   */
  template: template,



  initialize: function () {
    _.bindAll(this)

    this.render()

    return this
  },



  render: function () {
    $('body').append( this.$el.html( this.template() ))

    this.$preloaderGfx = this.$el.find('img')

    T.fromTo( this.$preloaderGfx, .6, { x: 2000, autoAlpha: 0, scale: 1, rotation: 220 }, {
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

    var manifest = _.map( Assets.manifest, function (asset) {
      return asset.src
    })

    var audioManifest = _.filter( Assets.manifest, function (asset) {
      if (asset.hasOwnProperty('audioId')) {
        return asset
      }
    })

    _.each( audioManifest, function (asset) {
      c.Sound.registerSound( asset.src, asset.audioId )
    })

    loadQueue.addEventListener( 'error', this.onLoadError )
    loadQueue.addEventListener( 'progress', this.onLoadProgress )
    loadQueue.addEventListener( 'complete', this.onLoadComplete )

    loadQueue.loadManifest( manifest )
  },



  onLoadError: function (error) {
     console.error('LoadError: ', error)
  },



  onLoadProgress: function (event) {
    var progress = Math.round( event.progress * 100 ) + '%'
  },



  onLoadComplete: function () {
    var self = this

    T.to( this.$preloaderGfx, .6, {
      x: -2000,
      rotation: -180,
      ease: Back.easeIn,
      delay: .5,


      // Once game assets are finished loading
      // kick off the scoreboard data

      onComplete: function() {
        self.loadScoreboardData()
      }
    })
  },



  loadScoreboardData: function () {
    var orgData = {}

    // Load Organization data
    var req = $.ajax({
      url: AppConfig.SCOREBOARD_ENDPOINTS.organizations,
      async: true
    })

    req.error( function (error) {
      console.error(error)
    })

    req.done( function (data) {
      orgData = data
    })


    // Load Top Scores
    req = $.ajax({
      url: AppConfig.SCOREBOARD_ENDPOINTS.topscores,
      async: true
    })


    // No connection or working from Dev, kick
    // off with dummy data

    var self = this

    req.error( function (error) {
      var scoreboard = {
        organizations: [{ Name: 'A', Id: 1 }],
        scores: [{ Score: '12345', Name: 'Chris', Organization: 'POP'}]
      }

      self.trigger('loadComplete', scoreboard)
      self.remove()
    })


    // Scoreboard has loaded.  Kick off the app
    // and pass the data into the AppController for use

    req.done( function (scoreboardData) {

      var scoreboard = {
        organizations: orgData.Organizations,
        scores: scoreboardData.Scores
      }

      self.trigger('loadComplete', scoreboard)
      self.remove()
    })
  }

})

module.exports = PreloaderView