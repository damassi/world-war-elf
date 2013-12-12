/**
 * Points that appear above a hit target
 *
 * @author Christopher Pappas
 * @date   12.6.13
 */

var View  = require('../../supers/View')
  , Easel = require('../../utils/Easel')


var PointsPopup = View.extend({


  initialize: function (options) {
    this._super(options)

    this.pointText = new Easel.Text( options.pointValue, 'Luckiest Guy', '39px', '#ff0000', {
      x: options.x,
      y: options.y,
      stroke: {
        size: 5,
        color: '#333'
      }
    })

    this.pointText.textAlign('center')

    return this
  },



  render: function() {
    this.stage.addChild(this.pointText.container)

    return this
  },



  show: function() {
    var self = this

    Easel.centerRegistrationPoint(this.pointText.container)

    T.fromTo( this.pointText.container, .4, { alpha: 0, scaleX: 0, scaleY: 0 }, {
      alpha: 1,
      scaleX: 1,
      scaleY: 1,
      ease: Back.easeOut,

      onComplete: function() {

        T.to( this.target, .3, {
          scaleX: 2,
          scaleY: 2,
          alpha: 0,
          ease: Back.easeOut,

          onComplete: function () {

            this.target.parent.removeChild( this.target )
            self.remove()
          }
        })
      }
    })
  }

})

module.exports = PointsPopup