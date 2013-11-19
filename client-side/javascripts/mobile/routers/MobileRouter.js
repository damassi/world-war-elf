/**
 * Mobile router
 *
 * @author christopher.pappas@popagency.com
 * @since  11.18.13
 */


var MobileRouter = Backbone.Router.extend({


  /**
   * @type {AppController}
   */
  mobileController: null,

  /**
   * @type {AppModel}
   */
  mobileModel: null,

  /**
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
    this.mobileModel      = this.mobileController.mobileModel
  },



  mobileSyncRoute: function (options) {
    var view = this.mobileController.mobileSyncView

    this.mobileModel.set({
      view: view
    })

  },



  mobileGamePlayRoute: function (options) {
    console.log('gameplay!')
  }


})

module.exports = MobileRouter