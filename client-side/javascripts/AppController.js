/**
 * Primary app controller which kicks off initialition and SocketIO connections
 *
 * @author christopher.pappas@popagency.com
 * @since  11.18.13
 */

var AppModel  = require('./models/AppModel')
var AppRouter = require('./routers/AppRouter')
var SocketIO  = require('./utils/SocketIO')


var AppController = {

  /**
   * @type {AppModel}
   */
  appModel: null,

  /**
   * @type {AppRouter}
   */
  appRouter: null,

  /**
   * An array of each game view
   * @type {Array}
   */
  views: null,


  /**
   * Initialize the game by instantiating components and connecting to websocket
   * @return {void}
   */
  initialize: function() {
    this.appModel = new AppModel()

    this.appRouter = new AppRouter({
      appController: this
    })

    SocketIO.initialize()
  }

}

module.exports = AppController