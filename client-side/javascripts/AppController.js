/**
 * Primary app controller which kicks off initialition and SocketIO connections
 *
 * @author christopher.pappas@popagency.com
 * @since  11.18.13
 */

var AppConfig          = require('./config/AppConfig')
var AppEvent           = require('./events/AppEvent')
var AppModel           = require('./models/AppModel')
var AppRouter          = require('./routers/AppRouter')
var SocketIO           = require('./utils/SocketIO')
var PubSub             = require('./utils/PubSub')
var Snowflakes         = require('./utils/Snowflakes')
var Easel              = require('./utils/Easel')
var HomeView           = require('./views/home/HomeView')
var SyncView           = require('./views/sync/SyncView')
var GamePlayView       = require('./views/gameplay/GamePlayView')
var MobileModel        = require('./mobile/models/MobileModel')
var MobileGamePlayView = require('./mobile/views/gameplay/MobileGamePlayView')
var MobileSyncView     = require('./mobile/views/sync/MobileSyncView')

// Globally rewrite namespace cjs to c
c = createjs


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

    this.$contentContainer = $('#game-play')
    this.$canvas = $('#game-canvas')

    new Snowflakes()

    this.stage = new c.Stage('canvas')
    this.stage.mouseEventsEnabled = true
    this.stage.snapToPixelEnabled = true
    this.stage.enableMouseOver()
    c.Touch.enable( this.stage )
    c.Ticker.setFPS(60)



    this.appModel = new AppModel()

    this.homeView = new HomeView({
      appController: this,
      appModel: this.appModel
    })

    this.syncView = new SyncView({
      appController: this,
      appModel: this.appModel
    })

    this.gamePlayView = new GamePlayView({
      appController: this,
      appModel: this.appModel
    })

    this.mobileModel = new MobileModel()

    this.mobileSyncView = new MobileSyncView({
      appController: this,
      appModel: this.appModel
    })

    this.mobileGamePlayView = new MobileGamePlayView({
      appModel: this.appModel
    })

    this.delegateEvents()

    this.appRouter = new AppRouter({
      appController: this
    })

    SocketIO.initialize({
      appModel: this.appModel
    })

    this.stage.addChild( Easel.createBitmap( 'frame-background' ))

    c.Ticker.addEventListener( 'tick', this.tick )
  },



  delegateEvents: function () {
    this.appModel.on( 'change:view', this._onViewChange )

    PubSub.on( AppEvent.SOCKET_IO_CONNECTED, this._onSocketIOConnected )
    PubSub.on( AppEvent.DESKTOP_CLIENT_SYNCED, this._onDesktopClientSynched )
    PubSub.on( AppEvent.MOBILE_CLIENT_SYNCED, this._onMobileClientSynched )
  },




  //+ PUBLIC METHODS / GETTERS / SETTERS
  // ------------------------------------------------------------



  tick: function (event) {
    PubSub.trigger( AppEvent.TICK )
    this.stage.update(event)
  },



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



  _onSocketIOConnected: function (message) {},




  _onDesktopClientSynched: function () {
    var sessionId = window.socket.socket.sessionid

    if (sessionId !== this.appModel.get('session').desktopSocketId)
      return

    window.location.href = '#/play'
  },



  _onMobileClientSynched: function () {
    var sessionId = window.socket.socket.sessionid

    if (sessionId !== this.appModel.get('session').mobileSocketId)
      return

    window.location.href = '#/mobile/play'
  },



  _onViewChange: function (appModel) {
    var view         = appModel.changed.view
      , previousView = appModel._previousAttributes.view

    this.cleanUpViews( previousView )

    view.render().show({
      animated: true
    })

  }

}

module.exports = AppController
