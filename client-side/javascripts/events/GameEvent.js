/**
 * Events related specifically to GamePlay, generally dispatched as changes to the model occur
 *
 * @author Christopher Pappas
 * @date   11.27.14
 */


var GameEvent = {

  // Model property updates

  SCORE  : 'change:score',
  HITS   : 'change:hits',
  SHOOT  : 'change:shots',


  // PubSub updates

  TARGET_HIT  : 'onTargetHit',

  KILL_ALL_TARGETS: 'onKillAllTargets'

}

module.exports = GameEvent