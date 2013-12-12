/**
 * Events related specifically to GamePlay, generally dispatched as changes to the model occur
 *
 * @author Christopher Pappas
 * @date   11.27.14
 */


var GameEvent = {

  // Model property updates

  SCORE     : 'change:score',
  HITS      : 'change:hits',
  SHOOT     : 'change:shots',
  SUPERMODE : 'change:supermode',


  // PubSub updates

  TARGET_HIT  : 'onTargetHit',
  PLAYER_HIT  : 'onPlayerHit',
  TIMER_TICK : 'onTimerTick',
  KILL_ALL_TARGETS: 'onKillAllTargets',

}

module.exports = GameEvent