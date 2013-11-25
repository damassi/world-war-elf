/**
 * Instructions view
 *
 * @author christopher.pappas@popagency.com
 * @since  11.25.13
 */

var AppEvent   = require('../../events/AppEvent')
var PubSub     = require('../../utils/PubSub')
var View       = require('../../supers/View')
var Easel      = require('../../utils/Easel')


var InstructionsView = View.extend({


  _canvasEvents: {
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
      this.placeholder  = Easel.createBitmap('placeholder-instructions'),

      this.backGround   = Easel.createSprite('homeSprite', 'home-ground-back', { x: -7, y: 410 }),
      this.middleGround = Easel.createSprite('homeSprite', 'home-ground-middle', { x: 232, y: 440 }),
      this.frontGround  = Easel.createSprite('homeSprite', 'home-ground-front', { x: 0, y: 437 }),

      this.instructionsText = Easel.createSprite('instructionsSprite', 'instructions-text-instructions', { x: 154, y: 54 }),
      this.missionText = Easel.createSprite('instructionsSprite', 'instructions-text-mission', { x: 154, y: 285 }),

      this.missionText = Easel.createSprite('instructionsSprite', 'instructions-mouse-gfx', { x: 619, y: 459 }),
      this.missionText = Easel.createSprite('instructionsSprite', 'instructions-btn-mouse', { x: 617, y: 461 }),
      this.missionText = Easel.createSprite('instructionsSprite', 'instructions-btn-mouse-snow', { x: 636, y: 510 }),
      this.missionText = Easel.createSprite('instructionsSprite', 'instructions-btn-mouse-grass', { x: 615, y: 495 }),

      this.missionText = Easel.createSprite('instructionsSprite', 'instructions-btn-phone', { x: 154, y: 469 }),
      this.missionText = Easel.createSprite('instructionsSprite', 'instructions-btn-phone-snow', { x: 204, y: 528 }),
      this.missionText = Easel.createSprite('instructionsSprite', 'instructions-phone-gfx', { x: 114, y: 453 }),

      this.grassSprouts = Easel.createSprite('homeSprite', 'home-grass-sprouts', { x: -140, y: 502 }),
    ]

    Easel.dragObject( this.children )

  },



  render: function (options) {
    this._super()

    this.addChildren( this.children )

    return this
  },

})

module.exports = InstructionsView