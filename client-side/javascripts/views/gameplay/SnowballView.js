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


var SnowballView = View.extend({


  initialize: function (options) {
    this._super(options)

    this.snowball = Easel.createBitmap('snowball-plain')
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
    var endpoint = { x: params.x, y: params. y }

    this.snowball.x = this.stageCenter.x
    this.snowball.y = this.stageCenter.y

    var startpoint = {
      x: this.snowball.x,
      y: this.snowball.y
    }

    var bezierValues = Easel.returnPointsBetweenPoints( startpoint, endpoint, 4 )

    TweenMax.fromTo( this.snowball, .2, { alpha: 0 }, {
      alpha: 1
    })

    var self = this

    TweenMax.fromTo( this.snowball, .6, { scaleX: 6, scaleY: 6 }, {
      immediateRender: true,
      scaleX: .2,
      scaleY: .2,
      x: endpoint.x,
      y: endpoint.y,
      ease: Expo.easeOut,
      onComplete: function() {
         self.remove()

         if(params.onComplete)
            params.onComplete.call(self)
      }
    })



    // TweenMax.to( this.snowball, .5, {
    //   bezier: {
    //     values: bezierValues
    //   },
    //   ease: Expo.easeInOut,
    //   onComplete: function () {
    //     self.remove()
    //   }
    // })
  }

})

module.exports = SnowballView