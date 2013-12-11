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
      Easel.createSprite('miscSprite', 'highscores-btn-misc', { x: 20, y: 519 }),

      this.backBtn = Easel.createSprite('miscSprite', 'highscores-btn-btn', { x: 26, y: this._backToMainBtnY }),
      this.scoresContainer = new c.Container()
    ]

    this.scoresContainer.x = 154
    this.scoresContainer.y = 186

    this.buildScoreboard()

    Easel.cache([ this.backBtn ])
    Easel.dragObject( this.children )

  },



  buildScoreboard: function () {
    var scores = this.scoreboard.scores
      , scoreStartPos = { x: 0, y: 0}
      , nameStartPos = { x: 100, y: 0 }
      , orgStartPos = { x: 327, y: 0}
      , spacing = 20

    var user, yPos, score, name, org

    for (var i = 0, len = scores.length; i < len; ++i) {
      user = scores[i]

      yPos = (i * spacing)

      score = new Easel.Text( user.Score, 'Luckiest Guy', '18px', '#ffffff', {
        x: scoreStartPos.x,
        y: scoreStartPos.y + yPos
      })

      name = new Easel.Text( user.Name, 'Luckiest Guy', '18px', '#ffffff', {
        x: nameStartPos.x,
        y: nameStartPos.y + yPos
      })

      org = new Easel.Text( user.Organization, 'Luckiest Guy', '18px', '#ffffff', {
        x: orgStartPos.x,
        y: orgStartPos.y + yPos
      })

      this.scoresContainer.addChild( score.container, name.container, org.container )
    }
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