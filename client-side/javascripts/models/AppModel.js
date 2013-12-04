/**
 * Game model which controls overall state
 *
 * @author christopher.pappas@popagency.com
 * @since  11.18.13
 */

var AppConfig = require('../config/AppConfig')


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
    hits: 0,


    /**
     * The number of shots the player has made
     * @type {Number}
     */
    shots: 0,


    /**
     * Sends gameplay into supermode
     * @type {Boolean}
     */
    supermode: false,

  },



  /**
   * Incremental counter which increases the number of targets
   * that have been hit by `shots`
   *
   */

  increaseHits: function () {
    this.set({
      hits: this.get('hits') + 1
    })
  },



  /**
   * Incremental counter which increases the number of targets
   * that have been hit by `shots`
   *
   */

  increaseShots: function () {
    this.set({
      shots: this.get('shots') + 1
    })
  },



  enableSupermode: function() {
    var self = this

    this.set( 'supermode', true )

    // Seet back to default
    TweenMax.delayedCall( AppConfig.SUPERMODE_TIME, function() {
      self.set( 'supermode', false )
    })
  }

})

module.exports = AppModel