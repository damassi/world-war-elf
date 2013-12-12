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
    ''              : 'homeRoute',
    'home'          : 'homeRoute',
    'instructions'  : 'instructionsRoute',
    'sync'          : 'syncRoute',
    'calibrate'     : 'calibrateRoute',
    'play'          : 'gamePlayRoute',
    'submit-score'  : 'submitScoreRoute',
    'high-scores'   : 'highScoresRoute'
  },



  initialize: function (options) {
    _.bindAll( this )

    this.appController = options.appController
    this.appModel      = this.appController.appModel
    this.views         = this.appController.views

    this.on( 'change:all', this.onRouteChange )
  },



  onRouteChange: function (event) {},



  homeRoute: function () {
    var view = this.appController.homeView

    this.appModel.set({
      view: view
    })

  },



  instructionsRoute: function () {
    var view = this.appController.instructionsView

    this.appModel.set({
      view: view
    })
  },



  syncRoute: function () {
    var view = this.appController.syncView

    this.appModel.set({
      view: view
    })
  },



  calibrateRoute: function () {
    var view = this.appController.calibrateView

    this.appModel.set({
      view: view
    })
  },



  gamePlayRoute: function () {
    var view = this.appController.gamePlayView

    this.appModel.set({
      view: view
    })
  },



  submitScoreRoute: function () {
    var view = this.appController.submitScoreView

    this.appModel.set({
      view: view
    })
  },



  highScoresRoute: function () {
    var view = this.appController.highScoresView

    this.appModel.set({
      view: view
    })
  }


})

module.exports = AppRouter