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

      this.bigEShadow   = Easel.createSprite('homeSprite', 'home-shadow-E', { x: 258, y: 489 }),
      this.bigE         = Easel.createSprite('homeSprite', 'home-text-E-w-drift', { x: 310, y: 126 }),
      this.worldWar     = Easel.createSprite('homeSprite', 'home-title-ww', { x: 222, y: 58 }),
      this.elf          = Easel.createSprite('homeSprite', 'home-elf', { x: 625, y: 295 }),

      this.playBtn      = Easel.createSprite('home-btn-play', 0, { x: 320, y: 500 }),
      this.scoreBtn     = Easel.createSprite('home-btn-score', 0, { x: 18, y: 510 } ),
    ]

    //Easel.dragObject( this.children )

  },


  render: function (options) {
    this._super()

    this.addChildren( this.children )

    return this
  },




  //+ EVENT HANDLERS
  //--------------------------------------



  _onBtnOver: function (event) {
    Easel.animateOnce( event.currentTarget, 'over' )
  },



  _onBtnOut: function (event) {
    Easel.animateOnce( event.currentTarget, 'out' )
  },



  _onPlayBtnClick: function (event) {
    window.location.href ='#/sync'
  },



  _onScoreBtnClick: function (event) {
    window.location.href ='#/sync'
  }


})

module.exports = HomeView