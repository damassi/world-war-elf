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
    ''          : 'landingRoute',
    'gameplay'  : 'gameplayRoute'
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



  gameplayRoute: function (options) {
    console.log('gameplay!')
  }


})

module.exports = AppRouter