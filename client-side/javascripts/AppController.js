/**
 * Primary app controller which kicks off initialition and SocketIO connections
 *
 * @author christopher.pappas@popagency.com
 * @since  11.18.13
 */

var AppEvent  = require('./events/AppEvent')
var AppModel  = require('./models/AppModel')
var AppRouter = require('./routers/AppRouter')
var SocketIO  = require('./utils/SocketIO')
var PubSub    = require('./utils/PubSub')


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

    PubSub.on( AppEvent.SOCKET_IO_CONNECTED, this._onSocketIOConnected )
  },



  //--------------------------------------
  //+ PUBLIC METHODS / GETTERS / SETTERS
  //--------------------------------------


  /**
   * Cleans up currently displayed views
   * @return {void}
   */

  cleanUpViews: function (view) {
    if (_.isUndefined( view ) || _.isNull( view ))
      return

    view.hide({
      animated: true,
      remove: true
    })
  },



  //--------------------------------------
  //+ EVENT HANDLERS
  //--------------------------------------


  /**
   * Handler for when socket.io connects to node server. Dispatched from PubSub
   * @param  {Event} event
   * @return {void}
   */

  _onSocketIOConnected: function (event) {

  },


  /**
   * Handler for view change events
   * @param  {AppModel} model
   * @return {void}
   */

  _onViewChange: function (model) {
    var view         = model.changed.view
      , previousView = model._previousAttributes.view

    this.cleanUpViews( previousView )

    this.$contentContainer.append( view.render().el )

    view.show({
      animated: true
    })
  }

}

module.exports = AppController