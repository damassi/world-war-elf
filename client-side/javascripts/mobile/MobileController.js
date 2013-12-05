/**
 * Controller for all mobile-related actions
 *
 * @author Christopher Pappas
 * @date   12.4.13
 */

var SocketEvent        = require('../../../shared/events/SocketEvent')
var AppModel           = require('../models/AppModel')
var SocketIO           = require('../utils/SocketIO')
var MobileSyncView     = require('./views/MobileSyncView')
var MobileGamePlayView = require('./views/MobileGamePlayView')


var MobileController = {


    initialize: function () {
      _.bindAll(this)

      this.appModel = new AppModel()

      this.mobileSyncView = new MobileSyncView()
      this.mobileGamePlayView = new MobileGamePlayView()

      SocketIO.initialize({
        appModel: this.appModel
      })

      this.showSyncView()

      this.mobileSyncView.on( SocketEvent.SYNCED, this.showGamePlayView )
    },



    showSyncView: function () {
      this.mobileSyncView.render()
    },



    showGamePlayView: function () {
      this.mobileSyncView.hide()
      //this.mobileGamePlayView.render()

      console.log('shoudl be showing gameplay view')
    }

}

module.exports = MobileController