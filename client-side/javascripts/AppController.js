/**
 * Primary app controller which kicks off initialition and SocketIO connections
 *
 * @author christopher.pappas@popagency.com
 * @since  11.18.13
 */

var AppConfig          = require('./config/AppConfig')
  , AppEvent           = require('./events/AppEvent')
  , AppModel           = require('./models/AppModel')
  , AppRouter          = require('./routers/AppRouter')
  , SocketIO           = require('./utils/SocketIO')
  , PubSub             = require('./utils/PubSub')
  , Snowflakes         = require('./utils/Snowflakes')
  , Easel              = require('./utils/Easel')
  , Sound              = require('./utils/Sound')
  , HomeView           = require('./views/HomeView')
  , InstructionsView   = require('./views/InstructionsView')
  , SyncView           = require('./views/SyncView')
  , CalibrateView      = require('./views/CalibrateView')
  , GamePlayView       = require('./views/gameplay/GamePlayView')
  , SubmitScoreView    = require('./views/SubmitScoreView')
  , HighScoresView     = require('./views/HighScoresView')


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

    Snowflakes.initialize()

    this.stage = new c.Stage('canvas')
    this.stage.mouseEventsEnabled = true
    this.stage.snapToPixelEnabled = true
    this.stage.enableMouseOver()
    c.Touch.enable( this.stage )
    c.Ticker.setFPS(60)


    // Initialize Models

    this.appModel = new AppModel()


    // Initialize Desktop Views

    this.homeView = new HomeView({
      stage: this.stage,
      appModel: this.appModel
    })

    this.instructionsView = new InstructionsView({
      stage: this.stage,
      appModel: this.appModel
    })

    this.highScoresView = new HighScoresView({
      stage: this.stage,
      appModel: this.appModel
    })

    this.syncView = new SyncView({
      appController: this,
      appModel: this.appModel
    })

    this.calibrateView = new CalibrateView({
      stage: this.stage,
      appModel: this.appModel
    })

    this.gamePlayView = new GamePlayView({
      stage: this.stage,
      appModel: this.appModel
    })

    this.submitScoreView = new SubmitScoreView({
      stage: this.stage,
      appModel: this.appModel
    })

    this.muteBtn = Easel.createSprite( 'mute', 0, { x: 30, y: 25 }, { center: true })
    this.muteBtn.gotoAndStop(1)


    // Initialize Routing and Events

    this.delegateEvents()

    this.appRouter = new AppRouter({
      appController: this
    })

    SocketIO.initialize({
      appModel: this.appModel
    })

    this.stage.addChild( Easel.createBitmap( 'frame-background' ))
    this.stage.addChild( this.muteBtn )

    this._addGround()
    this._animateIn()

    Sound.initialize({ appModel: this.appModel })
    //Sound.play({ soundId: 'audio-bg', loop: -1, volume: 0 })

    c.Ticker.addEventListener( 'tick', this.tick )
    this.appModel.on( 'change:mute', this._onMuteChange )
    this.muteBtn.on( 'mouseover', this._onMuteOver )
    this.muteBtn.on( 'mouseout', this._onMuteOut )
    this.muteBtn.on( 'click', this._onMuteClick )
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
  },



  _onMuteOver: function (event) {
    if (this.gamePlayView.crossHairs)
      this.gamePlayView.hideCrossHairs()

    var target = event.currentTarget
    target.cursor = 'pointer'

    TweenMax.to(target, .3, {
      opacity: .5
    })
  },



  _onMuteOut: function (event) {
    if (this.gamePlayView.crossHairs)
      this.gamePlayView.showCrossHairs()

    TweenMax.to(event.currentTarget, .3, {
      opacity: 1
    })
  },



  _onMuteClick: function (event) {
    if (this.gamePlayView.crossHairs)
      this.gamePlayView.hideCrossHairs()

    var mute = this.appModel.get('mute')

    this.appModel.set({
      mute: !mute
    })
  },



  _onMuteChange: function (model) {
    var mute = model.changed.mute
      , frame = mute ? 0 : 1

    this.muteBtn.gotoAndStop( frame )
  },




  //+ PRIVATE METHODS
  // ------------------------------------------------------------


  _addGround: function () {
    this.ground = [
      this.backGround   = Easel.createSprite('homeSprite', 'home-ground-back', { x: -7, y: 410 }),
      this.middleGround = Easel.createSprite('homeSprite', 'home-ground-middle', { x: 232, y: 440 }),
      this.frontGround  = Easel.createSprite('homeSprite', 'home-ground-front', { x: 0, y: 437 }),
    ]

    for (var i = 0, len = this.ground.length; i < len; ++i ) {
      var ground = this.ground[i]
      this.stage.addChild( ground )
    }
  },



  _animateIn: function () {
    TweenMax.to( this.$contentContainer, .5, { autoAlpha: 1, ease: Linear.easeNone })
  },


}

module.exports = AppController
