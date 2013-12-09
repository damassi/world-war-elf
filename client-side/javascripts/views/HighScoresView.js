/**
 * Calculated highscores returned from the backend API
 *
 * @author Christopher Pappas
 * @date   12.2.13
 */


var View  = require('../supers/View')
var Easel = require('../utils/Easel')


var HighScoresView = View.extend({


  canvasEvents: {
    'backBtn mouseover' : '_onBtnOver',
    'backBtn rollout'   : '_onBtnOut',
    'backBtn click'     : '_onBackBtnClick'
  },



  initialize: function (options) {
    this._super(options)

    this.children = [
      //this.placeholder = Easel.createBitmap('placeholder-highscores'),

      Easel.createSprite('miscSprite', 'highscores-text', { x: 152, y: 54 }),
      this.backBtn = Easel.createSprite('miscSprite', 'highscores-btn-btn', { x: 26, y: 519 }),
      Easel.createSprite('miscSprite', 'highscores-btn-misc', { x: 20, y: 519 }),
    ]

    //Easel.dragObject( this.children )
    Easel.cache([ this.backBtn ])

  },



  _onBtnOver: function (event) {
    var target = event.currentTarget

    target.cursor = 'pointer'

    TweenMax.to( target, .15, {
      y: target.y - 10,
      ease: Strong.easeOut,
      yoyo: true,
      repeat: 1
    })

    TweenMax.to( target, .2, {
      easel: {
        tint: '#ffffff',
        tintAmount: .2,
      },
      ease: Linear.easeNone
    })
  },



  _onBtnOut: function (event) {
    var target = event.currentTarget

    TweenMax.to( target, .2, {
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