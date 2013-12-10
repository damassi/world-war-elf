/**
 * Calculated highscores returned from the backend API
 *
 * @author Christopher Pappas
 * @date   12.2.13
 */


var View  = require('../supers/View')
var Easel = require('../utils/Easel')


var HighScoresView = View.extend({


  /**
   * Start pos for back btn
   * @type {Number}
   */
  _backToMainBtnY: 0,



  canvasEvents: {
    'backBtn mouseover' : '_onBtnOver',
    'backBtn rollout'   : '_onBtnOut',
    'backBtn click'     : '_onBackBtnClick'
  },



  initialize: function (options) {
    this._super(options)

    this._backToMainBtnY = 519

    this.children = [
      Easel.createSprite('miscSprite', 'highscores-text', { x: 152, y: 54 }),
      this.backBtn = Easel.createSprite('miscSprite', 'highscores-btn-btn', { x: 26, y: this._backToMainBtnY }),
      Easel.createSprite('miscSprite', 'highscores-btn-misc', { x: 20, y: 519 }),
    ]

    Easel.cache([ this.backBtn ])

  },



  _onBtnOver: function (event) {
    var target = event.currentTarget

    target.cursor = 'pointer'

    T.killTweensOf(target)

    target.y = this._backToMainBtnY

    T.to( target, .15, {
      y: target.y - 10,
      ease: Strong.easeOut,
      yoyo: true,
      repeat: 1
    })

    T.to( target, .2, {
      easel: {
        tint: '#ffffff',
        tintAmount: .2,
      },
      ease: Linear.easeNone
    })
  },



  _onBtnOut: function (event) {
    var target = event.currentTarget

    T.to( target, .2, {
      easel: {
        tint: '#ffffff',
        tintAmount: 0,
      },
      ease: Linear.easeNone
    })
  },



  _onBackBtnClick: function (event) {
    window.location.href ='#/home'
  },

})

module.exports = HighScoresView