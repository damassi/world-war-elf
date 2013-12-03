/**
 * App configuration
 *
 * @author christopher.pappas@popagency.com
 * @since  11.19.13
 */


var AppConfig = {


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
    orientation     : '/api/orientation',
    fire            : '/api/fire'
  },


  /**
   * Base asset path
   * @type {String}
   */
  ASSET_PATH: '/assets/images/',


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
  DEFAULT_GAMEPLAY_TIME: '22:00'

}

module.exports = AppConfig
