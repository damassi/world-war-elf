/**
 * SoundJS playback functionality
 *
 * @author Christopher Pappas
 * @date   12.5.13
 */

var Sound = {


  initialize: function (options) {
    _.bindAll(this)

    console.log(options)

    this.appModel = options.appModel
    this.appModel.on( 'change:mute', this._onMuteChange )
  },



  play: function( soundID, delay, offset, loop, volume ) {
    if (this.appModel.get('mute'))
      return

    delay  = delay  || 0
    offset = offset || 0
    loop   = loop   || 0
    volume = volume || 1

    return c.Sound.play( soundID, c.Sound.INTERRUPT_ANY, delay, offset, loop, volume )
  },



  mute: function( doMute ) {
    c.Sound.setMute( doMute )
  },



  _onMuteChange: function (model) {
    var muted = model.change.mute

    this.mute( !muted )
  }

}

module.exports = Sound
