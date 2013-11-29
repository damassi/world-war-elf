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


  TRANSITION_TIME: .4

}

module.exports = AppConfig