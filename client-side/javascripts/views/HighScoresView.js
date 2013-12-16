/**
 * Calculated highscores returned from the backend API
 *
 * @author Christopher Pappas
 * @date   12.2.13
 */

var View      = require('../supers/View')
  , Easel     = require('../utils/Easel')
  , AppConfig = require('../config/AppConfig')


var HighScoresView = View.extend({


  /**
   * Start pos for back btn
   * @type {Number}
   */
  BACK_POS_Y: 519,



  canvasEvents: {
    'backBtn mouseover' : 'onBtnOver',
    'backBtn rollout'   : 'onBtnOut',
    'backBtn click'     : 'onBackBtnClick'
  },



  initialize: function (options) {
    this._super(options)

    this.children = [
      Easel.createSprite('miscSprite', 'highscores-text', { x: 152, y: 54 }),

      this.backBtn = Easel.createSprite('miscSprite', 'highscores-btn-btn', { x: 26, y: this.BACK_POS_Y }),
      Easel.createSprite('miscSprite', 'highscores-btn-misc', { x: 20, y: 519 }),

      this.scoresContainer = new c.Container()
    ]

    this.scoresContainer.x = 154
    this.scoresContainer.y = 186

  },



  render: function() {
    req = $.ajax({
      url: AppConfig.SCOREBOARD_ENDPOINTS.topscores,
      async: false
    })

    req.error( function (error) {
      console.error('Error loading top scores', error)
    })

    var self = this

    req.done( function (data) {
      self.scoreboard.scores = data.Scores
    })

    req = $.ajax({
      url: AppConfig.SCOREBOARD_ENDPOINTS.topByOrg,
      async: false
    })

    req.error( function (error) {
      console.error('Error loading top scores', error)
    })

    req.done( function (data) {
      self.scoreboard.organizations = data.Scores
    })

    this._super()
    this.buildScoreboard()

    return this
  },



  buildScoreboard: function () {

    var scores = this.scoreboard.scores
      , nameStartPos = { x: 0, y: 0 }
      , scoreStartPos = { x: 150, y: 0 }
      , orgStartPos = { x: 327, y: 0 }
      , spacing = 35
      , size = '18px'

    var user, yPos, score, name, org

    for (var i = 0, len = scores.length; i < len; ++i) {
      user = scores[i]

      yPos = (i * spacing)

      score = new Easel.Text({
        text: user.Score,
        font: 'Luckiest Guy',
        size: size,
        color: '#ffffff',
        position: {
          x: scoreStartPos.x,
          y: scoreStartPos.y + yPos
        }
      })

      name = new Easel.Text({
        text: user.Name,
        font: 'Luckiest Guy',
        size: size,
        color: '#ffffff',
        position: {
          x: nameStartPos.x,
          y: nameStartPos.y + yPos
        }
      })

      org = new Easel.Text({
        text: user.Organization,
        font: 'Luckiest Guy',
        size: size - 5,
        color: '#ffffff',
        position: {
          x: orgStartPos.x,
          y: orgStartPos.y + yPos
        }
      })

      this.scoresContainer.addChild( score.container, name.container, org.container )
    }
  },



  onBtnOver: function (event) {
    var target = event.currentTarget

    target.cursor = 'pointer'

    T.killTweensOf(target)

    target.y = this.BACK_POS_Y

    T.to( target, .15, {
      y: target.y - 10,
      ease: Strong.easeOut,
      yoyo: true,
      repeat: 1
    })

    Easel.cache([ target ])

    T.to( target, .2, {
      easel: {
        tint: '#ffffff',
        tintAmount: .2,
      },
      ease: Linear.easeNone
    })
  },



  onBtnOut: function (event) {
    var target = event.currentTarget

    T.to( target, .2, {
      easel: {
        tint: '#ffffff',
        tintAmount: 0,
      },
      ease: Linear.easeNone
    })
  },



  onBackBtnClick: function (event) {
    window.location.href ='#/home'
  },

})

module.exports = HighScoresView