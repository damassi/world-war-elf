/**
 * SoundJS playback functionality
 *
 * @author Christopher Pappas
 * @date   12.5.13
 */

var Sound = {


  initialize: function (options) {
    _.bindAll(this)

    this.appModel = options.appModel
    this.appModel.on( 'change:mute', this._onMuteChange )
  },



  play: function (props) {
    if (this.appModel.get('mute'))
      return

    var delay  = props.delay  || 0
      , offset = props.offset || 0
      , loop   = props.loop   || 0
      , volume = props.volume || 1

    return c.Sound.play( props.soundId, c.Sound.INTERRUPT_ANY, delay, offset, loop, volume )
  },



  mute: function (doMute) {
    c.Sound.setMute( doMute )
  },



  _onMuteChange: function (model) {
    var muted = model.change.mute

    this.mute( !muted )
  }

}

module.exports = Sound
