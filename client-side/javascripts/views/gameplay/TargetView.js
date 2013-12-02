/**
 * SuperClass for shootable game targets.  Includes  enemies as well as bonuses
 *
 * @author Christopher Pappas
 * @date   11.29.13
 */

var GameEvent = require('../../events/GameEvent')
var AppEvent = require('../../events/AppEvent')
var Easel = require('../../utils/Easel')
var View = require('../../supers/View')


var TargetView = View.extend({


  /**
   * Array of target ids pulled from the Asset manifest to be loaded
   * when a new enemy or target is called
   * @type {Array}
   */
  targetIds: [
    'game-enemy-1',
    'game-enemy-2',
    'game-enemy-3'
  ],


  /**
   * Ref to the EaselJS canvas element
   * @type {c.Sprite}
   */
  instance: null,



  initialize: function (options) {
    this._super(options)

    this.instance = Easel.createSprite('gameplaySprite', _.sample( this.targetIds ))

    var bounds = this.instance.getBounds()
    this.instance.regX = Math.floor( bounds.width * .5 )
    this.instance.regY = Math.floor( bounds.height )

    this.instance.x = this.orientation.x
    this.instance.y = this.orientation.y + bounds.height

    this.show()
  },



  hit: function () {
    this.remove({
      animated: true
    })
  },



  show: function() {
    var self = this

    TweenMax.fromTo( this.instance, .4, { alpha: 0, rotation: 180 }, {
      immediateRender: true,
      alpha: 1,
      rotation: 0,
      ease: Back.easeOut,
      delay: 2 + ( Math.random() * 1 ),
      onComplete: function () {
        self.hide()
      }
    })
  },



  hide: function() {
    var self = this

    TweenMax.to( this.instance, .4, {
      rotation: -180,
      ease: Back.easeIn,
      delay: 2 + ( Math.random() * 1 ),
      onComplete: function () {
        self.show()
      }

    })
  },



  remove: function (options) {
    options = options || {}

    var self = this

    function removeChild() {
      self.instance.parent.removeChild( self.instance )
    }

    if (options.animated) {
      TweenMax.to( this.instance, .4, {
        y: this.instance.y + 300,
        ease: Back.easeIn,
        delay: 0,
        overwrite: 'all',
        onComplete: function () {
          removeChild()
        }
      })
    }
    else {
      removeChild()
    }
  }

})

module.exports = TargetView