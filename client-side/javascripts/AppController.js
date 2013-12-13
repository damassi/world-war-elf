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
  , SubmitScoreView    = require('./views/submitscore/SubmitScoreView')
  , HighScoresView     = require('./views/HighScoresView')
  , Snowball           = require('./views/gameplay/Snowball')
  , MuteBtn            = require('./views/ui/MuteBtn')


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



  initialize: function (options) {
    _.bindAll(this)

    // Store score data returned from service
    this.scoreboard = options.scoreboard

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
      appModel: this.appModel,
      scoreboard: this.scoreboard
    })

    this.syncView = new SyncView({
      stage: this.stage,
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
      appModel: this.appModel,
      scoreboard: this.scoreboard
    })

    this.muteBtn = new MuteBtn({
      stage: this.stage,
      appModel: this.appModel,
      gamePlayView: this.gamePlayView
    })


    // Initialize Routing and Events

    this.delegateEvents()

    this.appRouter = new AppRouter({
      appController: this
    })

    SocketIO.initialize({
      appModel: this.appModel
    })

    this.stage.addChild( Easel.createBitmap( 'frame-background' ))
    this.stage.addChild( this.muteBtn.render().container )

    this.addGround()
    this.animateIn()

    Sound.initialize({ appModel: this.appModel })
    Sound.play({ soundId: 'audio-bg', loop: -1, volume: 0.5 })

    c.Ticker.addEventListener( 'tick', this.tick )
    this.appModel.set( 'mute', true )
  },



  delegateEvents: function () {
    PubSub.on( AppEvent.SOCKET_IO_CONNECTED, this.onSocketIOConnected )
    PubSub.on( AppEvent.DESKTOP_CLIENT_SYNCED, this.onDesktopClientSynched )

    this.appModel.on( 'change:view', this.onViewChange )
  },




  //+ PUBLIC METHODS / GETTERS / SETTERS
  // ------------------------------------------------------------



  tick: function (event) {
    PubSub.trigger( AppEvent.TICK )
    this.stage.update()
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



  onSocketIOConnected: function (message) {},



  onDesktopClientSynched: function () {
    var sessionId = window.socket.socket.sessionid

    if (sessionId !== this.appModel.get('session').desktopSocketId)
      return

    window.location.href = '#/calibrate'
  },



  onViewChange: function (appModel) {
    var view         = appModel.changed.view
      , previousView = appModel._previousAttributes.view

    this.cleanUpViews( previousView )

    view.render().show({
      animated: true
    })
  },




  //+ PRIVATE METHODS
  // ------------------------------------------------------------


  addGround: function () {
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



  animateIn: function () {
    TweenMax.to( this.$contentContainer, .5, { autoAlpha: 1, ease: Linear.easeNone })
  },


}

module.exports = AppController
