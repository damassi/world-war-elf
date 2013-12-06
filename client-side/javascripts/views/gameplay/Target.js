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
      {
        id: 'elf1',
        energy: 1,
        attacker: false
      },
      {
        id: 'elf2',
        energy: 0,
        attacker: false
      },
      {
        id: 'elf3',
        energy: 2,
        attacker: true
      }
    ],

    good: [
      {
        id: 'sign-gift',
        bonus: 'clear-screen'
      },
      {
        id: 'sign-candycane',
        bonus: 'supermode'
      }
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

  /**
   * has the target already been hit - prevents multiple strikes
   * @type {Boolean}
   */
  hasBeenHit: false, 




  initialize: function (options) {
    this._super(options)

    this.targetProps = _.clone(_.sample( this.targetIds[this.type] ))
    this.instance = Easel.createSprite( this.targetProps.id, 0 )

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



    // Hit a bad elf.  Check energy levels and
    // update and return

    if (this.type === 'bad') {

      Sound.play({
        soundId: _.sample([
          'zombie-hit-1',
          'zombie-hit-2',
          'zombie-hit-3',
          'zombie-hit-4'
        ]),
        volume: .3
      })


      // Decrease energy and return if not 0 to
      // simulate energy hits

      if (!this.appModel.get('supermode')) {
        if (this.targetProps.energy > 0) {
          this.targetProps.energy--

          var scale = this.instance.scaleX

          TweenMax.to( this.instance, .3, {
            scaleX: scale + .1,
            scaleY: scale + .1,
            ease: Expo.easeOut
          })

          return
        }
      }
    }


    // Good target hit.  Enable supermode or dispatch
    // event to TargetFactory to clear all targets and refresh

    if (this.type === 'good') {
      //only allow one hit for good targets...maybe multiples on bad is okay
      if(!this.hasBeenHit){

        Sound.play({
          soundId: 'bonus-hit-candycane',
          volume: .2
        })

        // If candycane target
        if (this.targetProps.bonus === 'supermode')
          this.appModel.enableSupermode()

        // If Gift target
        else
          PubSub.trigger( GameEvent.KILL_ALL_TARGETS )

      }
    }


    // Animate target off the screen and dispatch
    // to TargetFactory

    Easel.animateOnce( this.instance, 'hit' )


    // Cache to turn into good elf
    if (this.type === 'bad')
      Easel.cache( this.instance )

    var self = this

    if(!this.hasBeenHit || this.targetProps.energy > 0){
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
    }

    if(!this.hasBeenHit) this.hasBeenHit = true

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