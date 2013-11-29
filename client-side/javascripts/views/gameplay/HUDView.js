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


var HUDView = View.extend({


  TEXT_POS: {
    time: { x: 945, y: 20 },
    presents: { x: 945, y: 65 }
  },


  /**
   * @type {Timer}
   */
  timer: null,



  initialize: function (options) {
    this._super(options)

    this.timeText = new Easel.Text('0:00', 'Luckiest Guy', '39px', '#fff', {
      x: this.TEXT_POS.time.x,
      y: this.TEXT_POS.time.y,
    }, {
      size: 5,
      color: '#333'
    })

    this.presentsText = new Easel.Text('0', 'Luckiest Guy', '79px', '#ff0000', {
      x: this.TEXT_POS.presents.x,
      y: this.TEXT_POS.presents.y,
    }, {
      size: 5,
      color: '#333'
    })


    this.timeText.textAlign('right')
    this.presentsText.textAlign('right')


    this.children = [
      this.hudClock    = Easel.createSprite('gameplaySprite', 'game-hud-clock', { x: 820, y: 15 }),
      this.hudGift     = Easel.createSprite('gameplaySprite', 'game-hud-gift', { x: 820, y: 76 }),

      this.timeText.container,
      this.presentsText.container,
    ]


    Easel.dragObject( this.children )

    this.timer = new Timer({
      direction: 'up',
      startValue: '0:00'
    })
  },



  render: function (options) {
    this.addEventListeners()
    this.startTimer()
    this.addChildren( this.children )

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



  hide: function (options) {
    this.stopTimer()

    this._super({ remove: true })
  },



  startTimer: function (time) {
    this.timer.start()
  },



  stopTimer: function (time) {
    this.timer.stop()
  },



  updatePoints: function (points) {

  },



  updatePresents: function (presents) {

  },



  _onTimerUpdate: function (time) {
    this.timeText.setText(time)
  },



  _onChangeHits: function (model) {
    var hits = model.changed.hits

    this.presentsText.setText( hits )
  }


})

module.exports = HUDView