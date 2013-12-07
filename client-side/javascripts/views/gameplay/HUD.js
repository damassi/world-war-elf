/**
 * HUD View which displays scores and overall progress
 *
 * @author christopher.pappas@popagency.com
 * @since  11.25.13
 */

var Timer       = require('time-counter')
var SocketEvent = require('../../../../shared/events/SocketEvent')
var AppConfig   = require('../../config/AppConfig')
var AppEvent    = require('../../events/AppEvent')
var GameEvent   = require('../../events/GameEvent')
var PubSub      = require('../../utils/PubSub')
var View        = require('../../supers/View')
var Easel       = require('../../utils/Easel')


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

    this.timeText = new Easel.Text('0:00', 'Luckiest Guy', '39px', '#fff', {
      x: this.TEXT_POS.time.x,
      y: this.TEXT_POS.time.y,
    }, {
      size: 5,
      color: '#333'
    })

    this.presentsText = new Easel.Text('0', 'Luckiest Guy', '49px', '#ff0000', {
      x: this.TEXT_POS.presents.x,
      y: this.TEXT_POS.presents.y,
    }, {
      size: 5,
      color: '#333'
    })


    this.timeText.textAlign('right')
    this.presentsText.textAlign('right')


    this.children = [
      this.hudClock = Easel.createSprite('gameplaySprite', 'game-hud-clock', { x: 820, y: 15 }),
      //this.hudGift  = Easel.createSprite('gameplaySprite', 'game-hud-gift', { x: 820, y: 76 }),

      this.timeText.container,
      this.presentsText.container,
    ]


    this.timer = new Timer({
      direction: 'down',
      startValue: AppConfig.DEFAULT_GAMEPLAY_TIME
    })

    this.addEventListeners()
    this.startTimer()
    this.addChildren( this.children )

    TweenMax.set( this.container, { alpha: 0, x: 200 })

    return this
  },



  addEventListeners: function () {
    this.timer.on( 'change', this._onTimerUpdate )

    this.listenTo( this.appModel, GameEvent.HITS, this._onChangeHits )
  },



  removeEventListeners: function () {
    this.timer.off( 'change', this._onTimerUpdate )
    this.stopListening()
  },



  show: function () {
    TweenMax.to( this.container, .6, {
      alpha: 1,
      x: 0,
      ease: Expo.easeOut,
      delay: 1
    })
  },



  hide: function (options) {
    this.stopTimer()

    var self = this

    TweenMax.to( this.container, .3, {
      alpha: 0,
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

  _onTimerUpdate: function (time) {
    this.timeText.setText( time )

    if (time === '0:00')
      PubSub.trigger( AppEvent.STOP_GAMEPLAY )
  },



  _onChangeHits: function (model) {
    var hits = model.changed.hits

    this.presentsText.setText( hits )
  }


})

module.exports = HUD