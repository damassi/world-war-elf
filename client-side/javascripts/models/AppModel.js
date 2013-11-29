/**
 * Game model which controls overall state
 *
 * @author christopher.pappas@popagency.com
 * @since  11.18.13
 */

var AppModel = Backbone.Model.extend({

  defaults: {

    /**
     * Session stores Socket.io session data.  Includes
     *  - sessionId : {String} the unique session id representing the game, which serves as an
     *                         auth token to be passed back to the server to verify one-to-one
     *                         connections
     *
     *  - desktopSocketId : {String} the desktops socket id
     *  - mobileSocketId : {String} the mobile clients socket id
     *
     * @type {Object}
     */
    session: null,


    /**
     * The current view being displayed
     * @type {View}
     */
    view : null,


    /**
     * The current score (gifts?)
     * @type {Number}
     */
    score: 0,


    /**
     * Number of targets hit, both good and bad
     * @type {[type]}
     */
    hits: 0

  },



  /**
   * Incremental counter which increases the hits
   *
   */

  increaseHits: function () {
    var hits = this.get('hits') + 1

    this.set( 'hits', hits )
  }

})

module.exports = AppModel