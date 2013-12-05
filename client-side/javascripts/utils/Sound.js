/**
 * SoundJS playback functionality
 *
 * @author Christopher Pappas
 * @date   12.5.13
 */

var Sound = {


  play: function( soundID, delay, offset, loop, volume ) {
    if( GameConfig.SOUND_MUTED )
      return

    delay  = delay  || 0
    offset = offset || 0
    loop   = loop   || 0
    volume = volume || 1

    this._soundID = soundID

    return createjs.Sound.play( this._soundID, createjs.Sound.INTERRUPT_ANY, delay, offset, loop, volume )
  },



  mute: function( doMute ) {
    createjs.Sound.setMute( doMute )
  }

}

module.exports = Sound
