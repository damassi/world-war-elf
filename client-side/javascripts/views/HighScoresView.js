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


  /**
   * Number of items displayed from the scoreboard backend
   * @type {Number}
   */
  SCOREBOARD_LENGTH: 7,


  /**
   * Scoreboard data as returned from the backend
   * @type {Object}
   */
  scoreboard: null,



  canvasEvents: {
    'backBtn mouseover' : 'onBtnOver',
    'backBtn rollout'   : 'onBtnOut',
    'backBtn click'     : 'onBackBtnClick'
  },



  initialize: function (options) {
    this._super(options)

    this.children = [
      Easel.createSprite('miscSprite', 'highscores-text', { x: 152, y: 34 }),

      this.backBtn = Easel.createSprite('miscSprite', 'highscores-btn-btn', { x: 26, y: this.BACK_POS_Y }),
      Easel.createSprite('miscSprite', 'highscores-btn-misc', { x: 20, y: 519 }),

      this.scoresContainer = new c.Container()
    ]

    this.scoresContainer.x = 154
    this.scoresContainer.y = 176

  },



  render: function() {
    this.returnData()

    this._super()
    this.buildScoreboard()

    return this
  },



  returnData: function () {

    var req = $.ajax({
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
  },



  buildScoreboard: function () {

    var scores = this.scoreboard.scores
      , organizations = this.scoreboard.organizations
      , nameStartPos = { x: 0, y: 0 }
      , scoreStartPos = { x: 200, y: 0 }
      , orgStartPos = { x: 327, y: 0 }
      , spacing = 45
      , size = '18px'
      , truncateLen = 35
      , curUser = 0
      , orgSize = '13px'

    var user
      , org
      , yPos
      , score
      , name
      , playerOrg
      , orgName
      , orgScore
      , truncate
      , orgNameText

    for (var i = 0, len = this.SCOREBOARD_LENGTH; i < len; ++i) {
      yPos = (i * spacing)
      curUser = (i+1) + ". "
      // Set up user high scores
      user = scores[i]

      if (user) {
        name = new Easel.Text({
          text: Easel.truncateText( curUser + user.Name, 25 ),
          font: 'Luckiest Guy',
          size: size,
          color: '#ffffff',
          position: {
            x: nameStartPos.x,
            y: nameStartPos.y + yPos
          },
          stroke: {
            size: 3,
            color: '#084775'
          }
        })

        score = new Easel.Text({
          text: user.Score,
          font: 'Luckiest Guy',
          size: size,
          color: '#ffffff',
          position: {
            x: scoreStartPos.x,
            y: scoreStartPos.y + yPos
          },
          stroke: {
            size: 3,
            color: '#084775'
          }
        })

        orgNameText = Easel.truncateText( user.Organization, truncateLen )

        playerOrg = new Easel.Text({
          text: orgNameText,
          font: 'Luckiest Guy',
          size: orgSize,
          color: '#8edeed',
          position: {
            x: name.container.x + 15,
            y: name.container.y + 20
          }, 
          stroke: {
            size: 2,
            color: '#084775'
          }
        })

        // Add player to the canvas
        this.scoresContainer.addChild( score.container, name.container, playerOrg.container )
      }

      // Set up organization high scores
      org  = organizations[i]

      if (org) {
        orgNameText = Easel.truncateText( curUser + org.Name, truncateLen )

        orgName = new Easel.Text({
          text: orgNameText,
          font: 'Luckiest Guy',
          size: size,
          color: '#ffffff',
          position: {
            x: 323,
            y: scoreStartPos.y + yPos
          },
          stroke: {
            size: 3,
            color: '#084775'
          }
        })

        orgScore = new Easel.Text({
          text: org.Score,
          font: 'Luckiest Guy',
          size: size,
          color: '#ffffff',
          position: {
            x: orgName.container.x + 350,
            y: scoreStartPos.y + yPos
          },
          stroke: {
            size: 3,
            color: '#084775'
          }
        })

        // Add organization to canvas
        this.scoresContainer.addChild( orgName.container, orgScore.container )

        Easel.dragObject([orgName.container, orgScore.container])
      }

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