/**
 * Throwing snowball view
 *
 * @author Christopher Pappas
 * @date   12.03.13
 */

var AppConfig = require('../../config/AppConfig')
  , GameEvent = require('../../events/GameEvent')
  , AppEvent  = require('../../events/AppEvent')
  , Easel     = require('../../utils/Easel')
  , PubSub    = require('../../utils/PubSub')
  , Sound     = require('../../utils/Sound')
  , View      = require('../../supers/View')


var Snowball = View.extend({


  parentContainer: null,


  types: {
    normal: 'snowball-plain',
    supermode: 'snowball-candycane'
  },



  initialize: function (options) {
    this._super(options)

    this.snowball = Easel.createSprite( 'snowballs', this.types[ options.snowballType ])

    Easel.centerRegistrationPoint( this.snowball )

    this.stageCenter = {
      x: AppConfig.DIMENSIONS.width * .5,
      y: AppConfig.DIMENSIONS.height * .5
    }

    this.snowball.x = this.stageCenter.x
    this.snowball.y = this.stageCenter.y
    this.snowball.alpha = 0

    this.render()
  },



  render: function () {
    this._super()

    this.container.addChild( this.snowball )
    this.parentContainer.addChild( this.container )

    return this
  },



  remove: function () {
    this.container.removeChild( this.snowball )
    this.parentContainer.removeChild( this.container )
    this.stage.removeChild( this.container )
    this.snowball = null
  },



  throwSnowball: function (params) {
    this.occupiedPositions = params.occupiedPositions

    this.snowball.x = this.stageCenter.x
    this.snowball.y = this.stageCenter.y

    var endpoint = { x: params.x, y: params. y }

    var startpoint = {
      x: this.snowball.x,
      y: this.snowball.y
    }

    Easel.cache( this.snowball )

    // Tint snowball as it recedes
    T.to( this.snowball, .6, {
      easel: {
        tint: '#000000',
        tintAmount: .4,
      },
      delay: .3,
      ease: Linear.easeNone
    })

    // Fade snowball in
    T.fromTo( this.snowball, .2, { alpha: 0 }, {
      alpha: 1
    })

    var self = this

    // Spin and scale back towards target
    T.fromTo( this.snowball, .6, { scaleX: 6, scaleY: 6 }, {
      immediateRender: true,
      rotation: 360,
      scaleX: .2,
      scaleY: .2,
      x: endpoint.x,
      y: endpoint.y,
      ease: Expo.easeOut,

      onComplete: function() {

        if (self.checkHit()) {}
        else {
          T.to(this.target, .2, { alpha: 0, onComplete: function () {
            self.remove()
          }})
        }
      }
    })

    Sound.play({ soundId: _.sample(['audio-throw-1', 'audio-throw-2']) })
  },



  checkHit: function() {
    var i = 0
      , len = this.occupiedPositions.length

    var target
      , point
      , targetPoint
      , bounds

    for (i = 0; i < len; ++i) {
      target = this.occupiedPositions[i].instance

      point = { x: this.snowball.x, y: this.snowball.y }
      targetPoint = target.localToGlobal( 0, 0 )
      bounds = target.getBounds()

      bounds.x = targetPoint.x + 50
      bounds.y = targetPoint.y + 30

      // Hit target, dispatch event back to GamePlayView
      if (Easel.isWithinBounds( point, bounds )) {

        this.trigger( GameEvent.TARGET_HIT, {
          target: target
        })

        this.addSplat()

        return true
      }
    }

    return false
  },



  addSplat: function (params) {
    var splat = Easel.createSprite('splat', 0, { x: this.snowball.x, y: this.snowball.y + 30 }, { center: true })

    this.container.addChild( splat )
    this.container.removeChild( this.snowball )

    Easel.animateOnce(splat, 'hit')

    T.to(splat, .1, {
      alpha: 0,
      delay: .2,
      ease: Linear.easeNone
    })

    var self = this

    T.to(splat, .3, {
      scaleX: 1.2,
      scaleY: 1.2,
      ease: Expo.easeOut,
      onComplete: function() {
        self.remove()
      }
    })
  }

})

module.exports = Snowball