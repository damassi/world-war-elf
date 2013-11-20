/**
 * Application router
 *
 * @author christopher.pappas@popagency.com
 * @since  11.18.13
 */


var AppRouter = Backbone.Router.extend({


  /**
   * Ref to primary Application controller
   * @type {AppController}
   */
  appController: null,

  /**
   * @type {AppModel}
   */
  appModel: null,

  /**
   * Array of primary views
   * @type {Array}
   */
  views: null,



  routes: {

    // Desktop Routes

    ''       : 'landingRoute',
    'sync'   : 'syncRoute',
    'play'   : 'gamePlayRoute',


    // Mobile Routes

    'mobile/sync' : 'mobileSyncRoute',
    'mobile/play' : 'mobileGamePlayRoute'
  },



  initialize: function (options) {
    _.bindAll( this )

    this.appController = options.appController
    this.appModel      = this.appController.appModel
    this.views         = this.appController.views
  },



  landingRoute: function (options) {
    var view = this.appController.landingView

    this.appModel.set({
      view: view
    })

  },



  syncRoute: function (options) {
    var view = this.appController.syncView

    this.appModel.set({
      view: view
    })

  },



  gamePlayRoute: function (options) {
    var view = this.appController.gamePlayView
    console.log('gamePlayRoute')
    this.appModel.set({
      view: view
    })
  },




  // * MOBILE ROUTES
  // ------------------------------------------------------------


  mobileSyncRoute: function (options) {
    var view = this.appController.mobileSyncView

    this.appModel.set({
      view: view
    })

  },



  mobileGamePlayRoute: function (options) {
    var view = this.appController.mobileGamePlayView

    this.appModel.set({
      view: view
    })

  }


})

module.exports = AppRouter