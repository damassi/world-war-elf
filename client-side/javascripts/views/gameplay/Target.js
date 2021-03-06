/**
 * SuperClass for shootable game targets.  Includes  enemies as well as bonuses
 *
 * @author Christopher Pappas
 * @date   11.29.13
 */

var GameEvent   = require('../../events/GameEvent')
  , AppEvent    = require('../../events/AppEvent')
  , AppConfig   = require('../../config/AppConfig')
  , Easel       = require('../../utils/Easel')
  , PubSub      = require('../../utils/PubSub')
  , Sound       = require('../../utils/Sound')
  , View        = require('../../supers/View')
  , Snowball    = require('./Snowball')
  , PointsPopup = require('./PointsPopup')


var Target = View.extend({

  /**
   * The delay before the fat little elf throws his ball
   * @type {Number}
   */
  SNOWBALL_ATTACK_DELAY: 2,

  /**
   * What time should we release the medium/hard targets, (in seconds)
   * @type {Number}
   */
  MEDIUM_TARGET_TIME: 70,

  /**
   * Time, in seconds, to release the hard targets
   * @type {Number}
   */
  HARD_TARGET_TIME: 50,

  /**
   * The distance that good targets move to avoid hits
   * @type {Number}
   */
  TARGET_AVOID_DISTANCE: 150,

  /**
   * Array of target ids pulled from the Asset manifest to be loaded
   * when a new enemy or target is called
   * @type {Array}
   */
  targetIds: {

    bad: [
     {
        id: 'elf2',
        energy: 0,
        attacker: false,
        points: 15
      },
      {
        id: 'elf1',
        energy: 1,
        attacker: false,
        points: 25
      },
      {
        id: 'elf3',
        energy: 2,
        attacker: true,
        points: 40
      }
    ],

    good: [
      {
        id: 'sign-gift',
        bonus: 'kill-all',
        points: 200,
      },
      {
        id: 'sign-candycane',
        bonus: 'supermode',
        points: 100,
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
   * Has the target already been hit - prevents multiple strikes
   * @type {Boolean}
   */
  beenHit: false,

  /**
   * have our points been triggered? Should only fired once
   * @type {Boolean}
   */
  pointsTriggered: false,

  /**
   * If enemy has attack powers this property is populated
   * @type {c.Sprite}
   */
  attackSnowball: null,

  /**
   * Initial starting position for paning "good" targets
   * @type {Number}
   */
  startX: null,


  initialize: function (options) {
    this._super(options)

    var targetArray = this.targetIds[this.type].concat()

    // Release harder targets depending on timing
    if (this.type === 'bad') {

      if (AppConfig.gameplaySeconds > this.MEDIUM_TARGET_TIME) {
        targetArray.splice(1,2)
      }
      else if (AppConfig.gameplaySeconds > this.HARD_TARGET_TIME) {
        targetArray.splice(2,1)
      }
    }

    this.targetProps = _.clone(_.sample( targetArray ))
    this.instance = Easel.createSprite( this.targetProps.id, 0 )

    var bounds = this.instance.getBounds()
    this.instance.regX = Math.floor( bounds.width * .5 )
    this.instance.regY = Math.floor( bounds.height )

    this.instance.x = this.orientation.x
    this.instance.y = this.orientation.y + bounds.height

    this.startX = this.instance.x

    this.show()
  },

  remove: function() {
    T.killTweensOf( this.instance )

    if (this.attackSnowball){
      T.killTweensOf( this.attackSnowball )
      this.stage.removeChild( this.attackSnowball )
      this.attackSnowball = null
    }

    this.container.removeAllChildren()
    this.stage.removeChild( this.container )
    this._super()
  },

  show: function() {
    var self = this

    T.delayedCall( 1, function() {
      self.instance.gotoAndPlay('start')
    })

    T.fromTo( this.instance, .4, { alpha: 0, rotation: 180 }, {
      immediateRender: true,
      alpha: 1,
      rotation: 0,
      ease: Back.easeOut,
      delay: 2 + ( Math.random() * 1 ),

      onComplete: function () {

        if (self.type === 'good')
          self.panTarget()

        if (self.targetProps.attacker)
          T.delayedCall( self.SNOWBALL_ATTACK_DELAY, self.attackPlayer )

        self.hide()
      }
    })
  },

  hide: function() {
    var self = this

    T.to( this.instance, .4, {
      rotation: -180,
      ease: Back.easeIn,
      delay: AppConfig.TARGET_PAUSE_TIME + ( Math.random() * 1 ),

      onComplete: function () {
        self.show()
      }

    })
  },

  attackPlayer: function () {
    if (this.beenHit)
      return

    this.instance.gotoAndStop('throw')

    this.attackSnowball = Easel.createSprite( 'snowballs', 'snowball-plain' )
    var pos = this.instance.localToGlobal(0, 0)

    this.attackSnowball.x = pos.x + 40
    this.attackSnowball.y = pos.y + 70
    this.attackSnowball.scaleX = .3
    this.attackSnowball.scaleY = .3

    Easel.centerRegistrationPoint( this.attackSnowball )
    this.stage.addChild( this.attackSnowball )

    var self = this

    T.delayedCall( .7, function() {
      self.instance.gotoAndPlay('start')
    })

    T.to(this.attackSnowball, .5, {
      x: AppConfig.DIMENSIONS.width * .5,
      y: AppConfig.DIMENSIONS.height * .5,
      scaleX: 3,
      scaleY: 3,
      ease: Expo.easeIn,

      onComplete: function() {
        self.updatePoints( -50 )
        self.stage.removeChild( this.target )

        PubSub.trigger( GameEvent.PLAYER_HIT )
      }
    })
  },

  hit: function (options) {
    options = options || {}

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


      // Check if user has hit the kill all gift which is
      // being passed in from TargetFactory#killAll

      if (! options.killAll) {

        // Decrease energy and return if not 0 to
        // simulate energy hits

        if (! this.appModel.get('supermode')) {
          if (this.targetProps.energy > 0) {
            this.targetProps.energy--

            var scale = this.instance.scaleX

            T.to( this.instance, .3, {
              scaleX: scale + .1,
              scaleY: scale + .1,
              ease: Expo.easeOut
            })

            return
          }
        }
      }
    }

    // Good target hit.  Enable supermode or dispatch
    // event to TargetFactory to clear all targets and refresh

    if (this.type === 'good') {

      // Only allow one hit for good targets...maybe multiples on bad is okay
      if (!this.beenHit) {

        Sound.play({
          soundId: 'bonus-hit-candycane',
          volume: .2
        })

        // If candycane target
        if (this.targetProps.bonus === 'supermode')
          this.appModel.enableSupermode()

        // If Gift target
        else if (this.targetProps.bonus === 'kill-all')
          PubSub.trigger( GameEvent.KILL_ALL_TARGETS, { superMode: false })

      }
    }

    // Kill Sequence
    // ------------------------------------------

    // Animate target off the screen and dispatch
    // to TargetFactory

    Easel.animateOnce( this.instance, 'hit' )

    if (this.type === 'bad') {

      // Cache to turn into good elf
      Easel.cache( this.instance )

      // Add in points display.  But if user hits the kill all gift
      // supress the points popup

      if (!options.supressPoints) {

        // Only fire if we've yet to trigger points - we update
        // it below so we're not constantly updating

        if (!this.pointsTriggered) {
          var pos = this.instance.localToGlobal(0, 0)
          var newXPos = pos.x + 120
          var pointsPopup = new PointsPopup({
            stage: this.stage,
            pointValue: this.targetProps.points,
            x: newXPos,
            y: pos.y

          }).render().show()
        }
      }
    }

    if (!this.pointsTriggered) {
      this.updatePoints( this.targetProps.points )
      this.pointsTriggered = true
    }

    // Hit target and animate him out.  Once animation completes
    // trigger a PubSub back to AppController and TargetFactory
    // with the target which was hit.

    if (!this.beenHit || this.targetProps.energy > 0) {

      var self = this

      T.to( this.instance, .4, {
        y: this.instance.y + 300,
        ease: Back.easeIn,
        delay: .1,
        overwrite: 'concurrent',

        onComplete: function () {

          if (this.target && this.target.parent) {
            this.target.parent.removeChild( this.target )
            self.remove()

            // Dispatch hit to factory to create new enemy
            PubSub.trigger( GameEvent.TARGET_HIT, {
              targetView: self
            })
          }
        }
      })
    }

    if (!this.beenHit) {
      this.beenHit = true
    }
  },

  scurryAway: function () {
    var moveTo = Easel.randRange( -1000, 1000 )

    moveTo = (moveTo > 0) ? 1500 : -1500

    var self = this

    T.to( this.instance, .6, {
      x: this.instance.x + moveTo,
      ease: Back.easeIn,
      delay: (Math.random() * .3) + .1,
      overwrite: 'all',
      onComplete: function() {
        self.remove()
      }
    })
  },

  panTarget: function () {
    var self = this

    T.to( this.instance, .8, {
      x: this.startX + this.TARGET_AVOID_DISTANCE,
      ease: Expo.easeInOut,

      onComplete: function() {

        T.to( this.target, .8, {
          x: self.startX - self.TARGET_AVOID_DISTANCE,
          ease: Expo.easeOut,
          delay: 1.5,

          onComplete: function() {
            self.panTarget()
          }
        })
      }
    })
  },

  updatePoints: function (points) {
    this.appModel.set({
      score: this.appModel.get('score') + points
    })
  }

})

module.exports = Target
