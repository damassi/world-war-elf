/**
 * SuperClass for shootable game targets.  Includes  enemies as well as bonuses
 *
 * @author Christopher Pappas
 * @date   11.29.13
 */

var GameEvent = require('../../events/GameEvent')
var AppEvent  = require('../../events/AppEvent')
var AppConfig = require('../../config/AppConfig')
var Easel     = require('../../utils/Easel')
var PubSub    = require('../../utils/PubSub')
var Sound     = require('../../utils/Sound')
var View      = require('../../supers/View')


var Target = View.extend({


  /**
   * Array of target ids pulled from the Asset manifest to be loaded
   * when a new enemy or target is called
   * @type {Array}
   */
  targetIds: {

    bad: [
      'elf1',
      'elf2',
      'elf3'
    ],

    good: [
      'sign-gift',
      'sign-candycane'
    ]
  },


  /**
   * Ref to the EaselJS canvas element
   * @type {c.Sprite}
   */
  instance: null,


  /**
   * Is the target a good target or a bad target?
   * @type {String} 'good|bad'
   */
  type: null,




  initialize: function (options) {
    this._super(options)

    this.instance = Easel.createSprite( _.sample( this.targetIds[this.type] ), 0 )

    var bounds = this.instance.getBounds()
    this.instance.regX = Math.floor( bounds.width * .5 )
    this.instance.regY = Math.floor( bounds.height )

    this.instance.x = this.orientation.x
    this.instance.y = this.orientation.y + bounds.height

    this.show()
  },



  show: function() {
    var self = this

    setTimeout(function() {
      self.instance.gotoAndPlay('start')
    }, 1000 )

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
      delay: AppConfig.TARGET_PAUSE_TIME + ( Math.random() * 1 ),
      onComplete: function () {
        self.show()
      }

    })
  },



  hit: function () {
    Easel.animateOnce( this.instance, 'hit' )

    if (this.type === 'bad')
      Easel.cache( this.instance )

    var self = this

    TweenMax.to( this.instance, .4, {
      y: this.instance.y + 300,
      ease: Back.easeIn,
      delay: .1,
      overwrite: 'concurrent',
      onComplete: function () {
        if (this.target && this.target.parent) {
          this.target.parent.removeChild( this.target )

          // Dispatch hit to factory to create new enemy
          PubSub.trigger( GameEvent.TARGET_HIT, {
            targetView: self
          })
        }
      }
    })

    if (this.type === 'good') {
      Sound.play({
        soundId: 'bonus-hit-candycane',
        volume: .2
      })
    }

    if (this.type == 'bad') {
      Sound.play({
        soundId: _.sample([
          'zombie-hit-1',
          'zombie-hit-2',
          'zombie-hit-3',
          'zombie-hit-4'
        ]),
        volume: .3
      })
    }
  },



  scurryAway: function () {
    var moveTo = Easel.randRange( -1000, 1000 )

    moveTo = (moveTo > 0) ? 1500 : -1500

    TweenMax.to( this.instance, .6, {
      x: this.instance.x + moveTo,
      ease: Back.easeIn,
      delay: (Math.random() * .3) + .1,
      overwrite: 'all'
    })
  }

})

module.exports = Target