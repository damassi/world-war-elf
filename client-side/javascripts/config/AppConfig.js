/**
 * App configuration
 *
 * @author christopher.pappas@popagency.com
 * @since  11.19.13
 */


var AppConfig = {


  /**
   * Mobile url
   * @type {String}
   */
  MOBILE_URL: window.location.origin + '/mobile',


  /**
   * Ovarall game dimensions
   * @type {Object}
   */

  DIMENSIONS: {
    width: 960,
    height: 600
  },


  /**
   * A hash of all backend endpoints
   * @type {Object}
   */

  ENDPOINTS: {
    generateCode    : '/api/generate-code',
    sync            : '/api/sync',
    startGame       : '/api/start-game',
    orientation     : '/api/orientation',
    fire            : '/api/fire',
    toggleMode      : '/api/toggle-mode',
    gameOver        : '/api/game-over'
  },


  /**
   * Proxied WordFly endpoint requests to post and retrieve score data
   * @type {Object}
   */

  SCOREBOARD_ENDPOINTSS: {
    organizations: '/score/organizations',
    postScore: 'post-score',
    topByOrg: '/score/top-by-org',
    topscores: '/score/top-scores',
  },


  /**
   * Base asset path
   * @type {String}
   */

  IMAGE_PATH: '/assets/images/',


  /**
   * Audio bg path
   * @type {String}
   */

  AUDIO_PATH: '/assets/audio/',


  /**
   * Time between route changes / animate in / animate out
   * @type {Number}
   */

  TRANSITION_TIME: .4,


  /**
   * The number of targets that are initially shown when the user arrives
   * at the game
   * @type {Number}
   */

  INITIAL_TARGETS: 5,


  /**
   * Amount of gameplay time
   * @type {String}
   */

  DEFAULT_GAMEPLAY_TIME: '1:30',


  /**
   * the current gameplay time; modified via HUD.js (timer)
   * @type {number}
   */

  gameplaySeconds: 90,


  /**
   * The time which the player is in supermode.
   * @type {Number}
   */

  SUPERMODE_TIME: 5,


  /**
   * The time which the target should remain on the screen before hiding
   * @type {Number}
   */

  TARGET_PAUSE_TIME: 4

}


module.exports = AppConfig
