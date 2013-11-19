/**
 * Mobile router
 *
 * @author christopher.pappas@popagency.com
 * @since  11.18.13
 */


var MobileRouter = Backbone.Router.extend({


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
    'mobile'           : 'mobileSyncRoute',
    'mobile/gameplay'  : 'mobileGamePlayRoute'
  },



  initialize: function (options) {
    _.bindAll( this )

    this.mobileController = options.mobileController
    this.mobileModel      = this.appController.mobileModel
  },



  mobileSyncRoute: function (options) {
    var view = this.appController.syncView

    this.appModel.set({
      view: view
    })

  },



  mobileGamePlayRoute: function (options) {
    console.log('gameplay!')
  }


})

module.exports = MobileRouter