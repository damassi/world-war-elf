/**
 * Instructions view
 *
 * @author christopher.pappas@popagency.com
 * @since  11.25.13
 */

var AppConfig  = require('../config/AppConfig')
var AppEvent   = require('../events/AppEvent')
var PubSub     = require('../utils/PubSub')
var View       = require('../supers/View')
var Easel      = require('../utils/Easel')


var InstructionsView = View.extend({


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

    this.children = [
      //this.placeholder  = Easel.createBitmap('placeholder-instructions'),

      this.instructionsText = Easel.createSprite('instructionsSprite', 'instructions-text-instructions', { x: 154, y: 54 }),
      this.missionText = Easel.createSprite('instructionsSprite', 'instructions-text-mission', { x: 154, y: 285 }),

      this.mouseBtn = Easel.createSprite('instructionsSprite', 'instructions-btn-mouse', { x: 617, y: 461 }),
      this.mouseGfx = Easel.createSprite('instructionsSprite', 'instructions-mouse-gfx', { x: 619, y: 459 }),

      Easel.createSprite('instructionsSprite', 'instructions-btn-mouse-snow', { x: 636, y: 511 }),
      Easel.createSprite('instructionsSprite', 'instructions-btn-mouse-grass', { x: 615, y: 495 }),

      this.phoneBtn = Easel.createSprite('instructionsSprite', 'instructions-btn-phone', { x: 154, y: 469 }),
      this.phongGfx = Easel.createSprite('instructionsSprite', 'instructions-phone-gfx', { x: 114, y: 453 }),

      Easel.createSprite('instructionsSprite', 'instructions-btn-phone-snow', { x: 204, y: 532 }),
      Easel.createSprite('homeSprite', 'home-grass-sprouts', { x: -140, y: 502 }),
    ]

    //Easel.dragObject( this.children )

  },



  render: function (options) {
    this._super()

    this.addChildren( this.children )

    return this
  },



  show: function (options) {
    this._super()
  },



  hide: function (options) {
    this._super({ remove: true })
  },



  //+ EVENT HANDLERS
  //--------------------------------------



  _onBtnOver: function (event) {
    TweenMax.to( event.currentTarget, .05, {
      y: event.currentTarget.y -5,
      yoyo: true,
      repeat: 1
    })
  },



  _onBtnOut: function (event) {

  },


  _onMouseBtnClick: function (event) {
    window.location.href = '#/play'
  },


  _onPhoneBtnClick: function (event) {
    window.location.href = '#/sync'
  },


})

module.exports = InstructionsView