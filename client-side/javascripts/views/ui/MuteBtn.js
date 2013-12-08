/**
 * Peristant audio mute btn
 *
 * @author Christopher Pappas
 * @date   12.8.13
 */

var View  = require('../../supers/View')
  , Easel = require('../../utils/Easel')


var MuteBtn = View.extend({


  /**
   * Ref to main appModel
   * @type {AppModel}
   */
  appModel: null,


  /**
   * Reference to the gameplay view located on AppController
   * @type {GamePlayView}
   */
  gamePlayView: null,


  /**
   * The mute icon gfx
   * @type {c.Sprite}
   */
  muteBtn: null,




  canvasEvents: {
    'muteBtn mouseover' : '_onMuteOver',
    'muteBtn mouseout'  : '_onMuteOut',
    'muteBtn click'     : '_onMuteClick'
  },



  initialize: function (options) {
    this._super(options)

    this.children = [
      this.muteBtn = Easel.createSprite( 'mute', 0, { x: 32, y: 25 }, { center: true })
    ]

    this.appModel.on( 'change:mute', this._onMuteChange )

    this.muteBtn.gotoAndStop(1)
  },



  _onMuteOver: function (event) {
    if (this.gamePlayView.crossHairs)
      this.gamePlayView.hideCrossHairs()

    var target = event.currentTarget
    target.cursor = 'pointer'

    TweenMax.to(target, .3, {
      opacity: .5
    })
  },



  _onMuteOut: function (event) {
    if (this.gamePlayView.crossHairs)
      this.gamePlayView.showCrossHairs()

    TweenMax.to(event.currentTarget, .3, {
      opacity: 1
    })
  },



  _onMuteClick: function (event) {
    if (this.gamePlayView.crossHairs)
      this.gamePlayView.hideCrossHairs()

    var mute = this.appModel.get('mute')

    this.appModel.set({
      mute: !mute
    })
  },



  _onMuteChange: function (model) {
    var mute = model.changed.mute
      , frame = mute ? 0 : 1

    this.muteBtn.gotoAndStop( frame )
  },

})

module.exports = MuteBtn