/**
 * App configuration
 *
 * @author christopher.pappas@popagency.com
 * @since  11.19.13
 */


var AppConfig = {

  /**
   * A hash of all backend endpoints
   * @type {Object}
   */

  ENDPOINTS: {
    generateCode: '/api/generate-code',
    sync: '/api/sync'
  }

}

module.exports = AppConfig