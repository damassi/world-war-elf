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
    session: {
      sessionId: ''
    },

    /**
     * Flag set when connection is established
     * @type {Boolean}
     */
    connected: false,

    /**
     * If the user opts to play with a mouse instead
     * @type {Boolean}
     */
    mouseMode: false,

    /**
     * Globally mute or unmute sound
     * @type {Boolean}
     */
    mute: false,

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

  initialize: function () {
    _.bindAll(this)
  },

  enableSupermode: function () {
    this.set( 'supermode', this._postModeToMobile( true ))

    var self = this

    // Reset back to default after specefied interval
    setTimeout(function() {
      self.set( 'supermode', self._postModeToMobile( false ) )
    },
      AppConfig.SUPERMODE_TIME
    )
  },

  _postModeToMobile: function (mode) {
    if (!this.get('connected'))
      return mode

    window.socket.post( AppConfig.ENDPOINTS.toggleMode, {
      sessionId: this.get('session').sessionId,
      supermode: mode
    },

      function onResponse (response) {})

    return mode
  }

})

module.exports = AppModel
