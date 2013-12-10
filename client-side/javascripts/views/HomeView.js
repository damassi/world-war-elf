/**
 * Game landing view.
 *
 * @author christopher.pappas@popagency.com
 * @since  11.18.13
 */

var AppConfig  = require('../config/AppConfig')
  , AppEvent   = require('../events/AppEvent')
  , PubSub     = require('../utils/PubSub')
  , View       = require('../supers/View')
  , Easel      = require('../utils/Easel')


var HomeView = View.extend({


  /**
   * The move pos of the playbtn on rollover
   * @type {Number}
   */
  _playBtnY: 0,


  /**
   * The move pos of the high scores btn on rollover
   * @type {Number}
   */
  _highScoreBtnY: 0,




  canvasEvents: {
    'playBtn mouseover' : '_onBtnOver',
    'playBtn rollout'   : '_onBtnOut',
    'playBtn click'     : '_onPlayBtnClick',

    'scoreBtn mouseover' : '_onBtnOver',
    'scoreBtn rollout'   : '_onBtnOut',
    'scoreBtn click'     : '_onScoreBtnClick',
  },



  initialize: function (options) {
    this._super(options)

    this._playBtnY = 464;
    this._highScoreBtnY = 510;

    this.children = [

      this.worldWar     = Easel.createSprite('homeSprite', 'home-title-ww', { x: 477, y: 70 }, { center: true }),
      this.bigEShadow   = Easel.createSprite('homeSprite', 'home-shadow-E', { x: 465, y: 509 }, { center: true }),
      this.bigE         = Easel.createSprite('homeSprite', 'home-text-E-w-drift', { x: 310, y: 126 }),

      this.lElf = new c.Container(),
      this.rElf = new c.Container(),

      this.playBtnShadow   = Easel.createSprite('homeSprite', 'home-btn-play-shadow', { x: 314, y: 526 } ),
      this.playBtn         = Easel.createSprite('home-btn-play', 0, { x: 317, y: this._playBtnY }),
      this.playBtnSnow     = Easel.createSprite('homeSprite', 'home-btn-play-snow', { x: 335, y: 524 } ),

      this.scoreBtnShadow   = Easel.createSprite('homeSprite', 'home-btn-scores-shadow', { x: 21, y: 553 } ),
      this.scoreBtn         = Easel.createSprite('home-btn-score', 0, { x: 18, y: this._highScoreBtnY } ),
      this.scoreBtnSnow     = Easel.createSprite('homeSprite', 'home-btn-scores-snow', { x: 41, y: 557 } ),

      this.grassSprouts = Easel.createSprite('homeSprite', 'home-grass-sprouts', { x: 7, y: 486 }),

      this.elf          = Easel.createSprite('homeSprite', 'home-good-elf', { x: 660, y: 179 }),
      this.elfShadow    = Easel.createSprite('homeSprite', 'home-btn-scores-shadow', { x: 633, y: 546 }),
    ]

    Easel.cache([ this.playBtn, this.scoreBtn ])
    //Easel.dragObject( this.children )

  },



  render: function (options) {
    this.lElf.x = 40
    this.rElf.x = 85

    this.fatElfShadow = Easel.createSprite( 'homeSprite', 'home-btn-scores-shadow', { scaleX: .3, scaleY: .45, x: 98, y: 436 } ),
    this.fatElf = Easel.createSprite( 'elf3', 0, { x: 145, y: 406, scaleX: .5, scaleY: .5 }, { center: true } ),

    this.skinnyElfShadow = Easel.createSprite( 'homeSprite', 'home-btn-scores-shadow', { scaleX: .25, scaleY: .45, x: 783, y: 452 }  ),
    this.skinnyElf = Easel.createSprite( 'elf1', 0, { x: 825, y: 422, scaleX: .5, scaleY: .5 }, { center: true } ),

    this.lElf.addChild( this.fatElfShadow, this.fatElf )
    this.rElf.addChild( this.skinnyElfShadow, this.skinnyElf )

    this.fatElf.gotoAndPlay('start')
    this.skinnyElf.gotoAndPlay('start')
    this._super()

    this.addChildren( this.children )

    return this
  },



  show: function () {
    this._super()

    T.fromTo( this.worldWar, .4, { scaleX: .1, scaleY: .1, alpha: 0 }, {
      scaleX: 1,
      scaleY: 1,
      alpha: 1,
      ease: Back.easeOut,
      delay: .5
    })

    T.fromTo( this.bigEShadow, .6, { scaleX: .1, scaleY: .1, alpha: 0}, {
      scaleX: 1,
      scaleY: 1,
      alpha: 1,
      ease: Bounce.easeOut,
      delay: .7
    })

    T.from( this.bigE, .6, {
      alpha: 0,
      y: -300,
      ease: Bounce.easeOut,
      delay: .7
    })

    T.from([this.elf, this.elfShadow], .5, {
      immediateRender: true,
      x: 1000,
      ease: Expo.easeOut,
      delay: 1.3
    })
  },



  hide: function (options) {
    this._super({ remove: true })
  },




  //+ EVENT HANDLERS
  //--------------------------------------



  _onBtnOver: function (event) {
    var target = event.currentTarget
    var targetY;
    targetY = (target === this.playBtn) ? this._playBtnY : this._highScoreBtnY;

    target.cursor = 'pointer'
    T.killTweensOf(target)
    target.y = targetY

    T.to( target, .15, {
      y: targetY - 10,
      ease: Strong.easeOut,
      yoyo: true,
      repeat: 1
    })

    T.to( target, .2, {
      easel: {
        tint: '#ffffff',
        tintAmount: .2,
      },
      ease: Linear.easeNone
    })
  },



  _onBtnOut: function (event) {
    var target = event.currentTarget

    T.to( target, .2, {
      easel: {
        tint: '#ffffff',
        tintAmount: 0,
      },
      ease: Linear.easeNone
    })
  },



  _onPlayBtnClick: function (event) {
    window.location.href ='#/instructions'
  },



  _onScoreBtnClick: function (event) {
    window.location.href ='#/high-scores'
  }


})

module.exports = HomeView