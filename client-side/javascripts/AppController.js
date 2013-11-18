/**
 * Application Bootstrapper
 *
 * @author
 * @since
 */

var AppModel  = require('./models/AppModel')
var AppRouter = require('./routers/AppRouter')


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
  }

}

module.exports = AppController