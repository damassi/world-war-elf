/**
 * Game landing view.
 *
 * @author christopher.pappas@popagency.com
 * @since  11.18.13
 */

var AppEvent   = require('../../events/AppEvent')
var PubSub     = require('../../utils/PubSub')
var View       = require('../../supers/View')
var Easel      = require('../../utils/Easel')


var HomeView = View.extend({


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

    this.children = [
      //this.placeholder  = Easel.createBitmap('placeholder-home'),
      this.backGround   = Easel.createSprite('homeSprite', 'home-ground-back', { x: -7, y: 410 }),
      this.middleGround = Easel.createSprite('homeSprite', 'home-ground-middle', { x: 232, y: 440 }),
      this.frontGround  = Easel.createSprite('homeSprite', 'home-ground-front', { x: 0, y: 437 }),

      this.worldWar     = Easel.createSprite('homeSprite', 'home-title-ww', { x: 477, y: 70 }, { center: true }),
      this.elf          = Easel.createSprite('homeSprite', 'home-elf', { x: 625, y: 295 }),
      this.bigEShadow   = Easel.createSprite('homeSprite', 'home-shadow-E', { x: 465, y: 509 }, { center: true }),
      this.bigE         = Easel.createSprite('homeSprite', 'home-text-E-w-drift', { x: 310, y: 126 }),

      this.playBtnShadow   = Easel.createSprite('homeSprite', 'home-btn-play-shadow', { x: 314, y: 526 } ),
      this.playBtn         = Easel.createSprite('home-btn-play', 0, { x: 317, y: 464 }),
      this.playBtnSnow     = Easel.createSprite('homeSprite', 'home-btn-play-snow', { x: 335, y: 524 } ),

      this.scoreBtnShadow   = Easel.createSprite('homeSprite', 'home-btn-scores-shadow', { x: 21, y: 553 } ),
      this.scoreBtn         = Easel.createSprite('home-btn-score', 0, { x: 18, y: 510 } ),
      this.scoreBtnSnow     = Easel.createSprite('homeSprite', 'home-btn-scores-snow', { x: 41, y: 557 } ),


      this.grassSprouts = Easel.createSprite('homeSprite', 'home-grass-sprouts', { x: 7, y: 486 }),
    ]

    //Easel.dragObject( this.children )

  },



  render: function (options) {
    this._super()

    this.addChildren( this.children )

    return this
  },



  show: function () {
    this._super()

    TweenMax.fromTo( this.worldWar, .4, { scaleX: .1, scaleY: .1, alpha: 0 }, {
      scaleX: 1,
      scaleY: 1,
      alpha: 1,
      ease: Back.easeOut,
      delay: .5
    })

    TweenMax.fromTo( this.bigEShadow, .6, { scaleX: .1, scaleY: .1, alpha: 0}, {
      scaleX: 1,
      scaleY: 1,
      alpha: 1,
      ease: Bounce.easeOut,
      delay: .7
    })

    TweenMax.from( this.bigE, .6, {
      alpha: 0,
      y: -300,
      ease: Bounce.easeOut,
      delay: .7
    })
  },




  //+ EVENT HANDLERS
  //--------------------------------------



  _onBtnOver: function (event) {
    //Easel.animateOnce( event.currentTarget, 'over' )
    event.currentTarget.gotoAndStop(10)
  },



  _onBtnOut: function (event) {
    //Easel.animateOnce( event.currentTarget, 'out' )
    event.currentTarget.gotoAndStop(0)
  },



  _onPlayBtnClick: function (event) {
    window.location.href ='#/sync'
  },



  _onScoreBtnClick: function (event) {
    window.location.href ='#/sync'
  }


})

module.exports = HomeView