/**
 * Primary app controller which kicks off initialition and SocketIO connections
 *
 * @author christopher.pappas@popagency.com
 * @since  11.18.13
 */

var AppEvent           = require('./events/AppEvent')
var AppModel           = require('./models/AppModel')
var AppRouter          = require('./routers/AppRouter')
var SocketIO           = require('./utils/SocketIO')
var PubSub             = require('./utils/PubSub')
var LandingView        = require('./views/landing/LandingView')
var SyncView           = require('./views/sync/SyncView')
var MobileGamePlayView = require('./mobile/views/gameplay/MobileGamePlayView')
var MobileSyncView     = require('./mobile/views/sync/MobileSyncView')


var AppController = {


  /**
   * @type {AppModel}
   */
  appModel: null,

  /**
   * @type {AppRouter}
   */
  appRouter: null,

  /**
   * @type {Array}
   */
  views: null,



  initialize: function () {
    _.bindAll(this)

    this.$contentContainer = $('#content-container')

    this.appModel    = new AppModel()
    this.landingView = new LandingView()
    this.syncView    = new SyncView()

    //this.mobileModel        = new MobileModel()
    this.mobileSyncView     = new MobileSyncView()
    this.mobileGamePlayView = new MobileGamePlayView()

    this.delegateEvents()

    this.appRouter = new AppRouter({
      appController: this
    })

    SocketIO.initialize()

    PubSub.on( AppEvent.SOCKET_IO_CONNECTED, this._onSocketIOConnected )
  },



  delegateEvents: function () {
    this.appModel.on( 'change:view', this._onViewChange )
  },




  //+ PUBLIC METHODS / GETTERS / SETTERS
  // ------------------------------------------------------------


  cleanUpViews: function (view) {
    if (_.isUndefined( view ) || _.isNull( view ))
      return

    view.hide({
      animated: true,
      remove: true
    })
  },




  //+ EVENT HANDLERS
  // ------------------------------------------------------------


  _onSocketIOConnected: function (event) {

  },



  _onViewChange: function (appModel) {
    var view         = appModel.changed.view
      , previousView = appModel._previousAttributes.view

    this.cleanUpViews( previousView )

    this.$contentContainer.append( view.render().el )

    view.show({
      animated: true
    })
  }

}

module.exports = AppController
