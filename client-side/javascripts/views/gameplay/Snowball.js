/**
 * Throwing snowball view
 *
 * @author Christopher Pappas
 * @date   12.03.13
 */

var AppConfig = require('../../config/AppConfig')
var GameEvent = require('../../events/GameEvent')
var AppEvent  = require('../../events/AppEvent')
var Easel     = require('../../utils/Easel')
var PubSub    = require('../../utils/PubSub')
var View      = require('../../supers/View')


var Snowball = View.extend({


  types: {
    normal: 'snowball-plain',
    supermode: 'snowball-candycane'
  },



  initialize: function (options) {
    this._super(options)

    this.snowball = Easel.createBitmap( this.types[ options.snowballType ])
    this.snowball.alpha = 0

    Easel.centerRegistrationPoint( this.snowball )

    this.stageCenter = {
      x: AppConfig.DIMENSIONS.width * .5,
      y: AppConfig.DIMENSIONS.height * .5
    }

    this.snowball.x = this.stageCenter.x
    this.snowball.y = this.stageCenter.y

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

    //var bezierValues = Easel.returnPointsBetweenPoints( startpoint, endpoint, 4 )

    TweenMax.fromTo( this.snowball, .2, { alpha: 0 }, {
      alpha: 1
    })

    var self = this

    TweenMax.fromTo( this.snowball, .6, { scaleX: 6, scaleY: 6 }, {
      immediateRender: true,
      rotation: 360,
      scaleX: .2,
      scaleY: .2,
      x: endpoint.x,
      y: endpoint.y,
      ease: Expo.easeOut,

      onComplete: function() {

        if (self._checkHit()) {
          self.remove()
        }
        else {
          TweenMax.to(this.target, .2, { alpha: 0, onComplete: function () {
            self.remove()
          }})
        }
      }
    })
  },


  _checkHit: function() {
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

        return true
      }
    }

    return false
  }

})

module.exports = Snowball