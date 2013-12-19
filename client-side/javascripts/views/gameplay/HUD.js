/**
 * HUD View which displays scores and overall progress
 *
 * @author christopher.pappas@popagency.com
 * @since  11.25.13
 */

var Timer       = require('time-counter')
  , SocketEvent = require('../../../../shared/events/SocketEvent')
  , AppConfig   = require('../../config/AppConfig')
  , AppEvent    = require('../../events/AppEvent')
  , GameEvent   = require('../../events/GameEvent')
  , PubSub      = require('../../utils/PubSub')
  , View        = require('../../supers/View')
  , Easel       = require('../../utils/Easel')


var HUD = View.extend({


  TEXT_POS: {
    time: { x: 945, y: 20 },
    presents: { x: 945, y: 78 }
  },


  /**
   * @type {Timer}
   */
  timer: null,



  initialize: function (options) {
    this._super(options)


  },



  render: function (options) {
    this.timeText = new Easel.Text({
      text: '0:00',
      font: 'Luckiest Guy',
      size: '39px',
      color: '#fff',

      position: {
        x: this.TEXT_POS.time.x,
        y: this.TEXT_POS.time.y,
      },

      stroke: {
        size: 5,
        color: '#333'
      }
    })


    this.pointsText = new Easel.Text({
      text: '0',
      font: 'Luckiest Guy',
      size: '69px',
      color: '#ff0000',

      position: {
        x: this.TEXT_POS.presents.x,
        y: this.TEXT_POS.presents.y,
      },

      stroke: {
        size: 5,
        color: '#333'
      }
    })

    this.timeText.textAlign('right')
    this.pointsText.textAlign('right')

    this.children = [
      this.hudClock = Easel.createSprite('gameplaySprite', 'game-hud-clock', { x: 820, y: 15 }),

      this.timeText.container,
      this.pointsText.container,
    ]

    this.timer = new Timer({
      direction: 'down',
      startValue: AppConfig.DEFAULT_GAMEPLAY_TIME
    })

    this.addEventListeners()
    this.startTimer()
    this.addChildren( this.children )

    T.set( this.container, { alpha: 0, x: 200 })

    return this
  },



  addEventListeners: function () {
    this.timer.on( 'change', this.onTimerUpdate )
    this.listenTo( this.appModel, GameEvent.SCORE, this.onChangeScore )
  },



  removeEventListeners: function () {
    this.timer.off( 'change', this.onTimerUpdate )
    this.stopListening()
  },



  show: function () {
    T.to( this.container, .6, {
      alpha: 1,
      x: 0,
      ease: Expo.easeOut,
      delay: 1
    })
  },



  hide: function (options) {
    this.stopTimer()

    var self = this

    T.to( this.container, .3, {
      alpha: 0,
      x: 100,
      ease: Expo.easeIn,
      onComplete: function () {
        self.remove()
      }
    })
  },



  startTimer: function (time) {
    this.timer.start()
  },



  stopTimer: function (time) {
    this.timer.stop()
  },



  /**
   * Update the HUD timer and, when at certain points, dispatch events to the GameController
   * @param  {String} time the current time
   */

  onTimerUpdate: function (time) {
    this.timeText.setText( time )

    var array = time.split(':')
    var seconds = parseInt(array[0] * 60) + parseInt(array[1])

    AppConfig.gameplaySeconds = seconds

    if (time === '0:00')
      PubSub.trigger( AppEvent.STOP_GAMEPLAY )
  },



  onChangeScore: function (model) {
    var score = model.changed.score

    var points = {
      start: model._previousAttributes.score,
      end: score
    }

    var self = this

    T.to( points, .2, {
      start: points.end,
      ease: Linear.easeNone,
      onUpdate: function() {
        self.pointsText.setText( ~~this.target.start )
      }
    })


  }


})

module.exports = HUD