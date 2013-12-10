/**
 * Instructions view
 *
 * @author christopher.pappas@popagency.com
 * @since  11.25.13
 */

var AppConfig  = require('../config/AppConfig')
  , AppEvent   = require('../events/AppEvent')
  , PubSub     = require('../utils/PubSub')
  , View       = require('../supers/View')
  , Easel      = require('../utils/Easel')


var InstructionsView = View.extend({

  /**
   * Start pos for start btn
   * @type {Number}
   */
  _smartphoneBtnY: 0,


  /**
   * Start pos for mouse btn
   * @type {Number}
   */
  _mouseBtnY: 0,




  canvasEvents: {
    'mouseBtn mouseover' : '_onBtnOver',
    'mouseBtn rollout'   : '_onBtnOut',
    'mouseBtn click'     : '_onMouseBtnClick',

    'phoneBtn mouseover' : '_onBtnOver',
    'phoneBtn rollout'   : '_onBtnOut',
    'phoneBtn click'     : '_onPhoneBtnClick',
  },



  initialize: function (options) {
    this._super(options)
    this._smartphoneBtnY = 469
    this._mouseBtnY = 461

    this.children = [
      this.instructionsText = Easel.createSprite('instructionsSprite', 'instructions-text-instructions', { x: 154, y: 54 }),
      this.missionText = Easel.createSprite('instructionsSprite', 'instructions-text-mission', { x: 154, y: 285 }),

      this.mouseBtn = Easel.createSprite('instructionsSprite', 'instructions-btn-mouse', { x: 617, y: this._mouseBtnY }),
      this.mouseGfx = Easel.createSprite('instructionsSprite', 'instructions-mouse-gfx', { x: 619, y: 459 }),

      Easel.createSprite('instructionsSprite', 'instructions-btn-mouse-snow', { x: 636, y: 511 }),
      Easel.createSprite('instructionsSprite', 'instructions-btn-mouse-grass', { x: 615, y: 495 }),

      this.phoneBtn = Easel.createSprite('instructionsSprite', 'instructions-btn-phone', { x: 154, y: this._smartphoneBtnY }),
      this.phongGfx = Easel.createSprite('instructionsSprite', 'instructions-phone-gfx', { x: 114, y: 453 }),

      Easel.createSprite('instructionsSprite', 'instructions-btn-phone-snow', { x: 204, y: 532 }),
      Easel.createSprite('homeSprite', 'home-grass-sprouts', { x: -140, y: 502 }),
    ]

    Easel.cache([ this.mouseBtn, this.phoneBtn ])

  },



  show: function (options) {
    this._super()
  },



  hide: function (options) {
    this._super({ remove: true })
  },



  //+ EVENT HANDLERS
  // ------------------------------------------------------------



  _onBtnOver: function (event) {
    var target = event.currentTarget
    var targetY;
    targetY = (target === this.phoneBtn) ? this._smartphoneBtnY : this._mouseBtnY;

    T.killTweensOf(target)
    target.y = targetY

    target.cursor = 'pointer'

    T.to( target, .15, {
      y: target.y - 10,
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



  _onMouseBtnClick: function (event) {

    this.appModel.set({
      mouseMode: true
    })

    window.location.href = '#/play'
  },



  _onPhoneBtnClick: function (event) {
    window.location.href = '#/sync'
  },


})

module.exports = InstructionsView