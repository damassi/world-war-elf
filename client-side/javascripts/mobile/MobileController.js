/**
 * Controller for all mobile-related actions
 *
 * @author Christopher Pappas
 * @date   12.4.13
 */

var SocketEvent         = require('../../../shared/events/SocketEvent')
var AppEvent            = require('../events/AppEvent')
var AppModel            = require('../models/AppModel')
var SocketIO            = require('../utils/SocketIO')
var MobileSyncView      = require('./views/MobileSyncView')
var MobileCalibrateView = require('./views/MobileCalibrateView')
var MobileGamePlayView  = require('./views/MobileGamePlayView')


var MobileController = {


    initialize: function () {
      _.bindAll(this)

      this.appModel = new AppModel()

      this.mobileSyncView = new MobileSyncView({
        appModel: this.appModel
      })

      this.mobileCalibrateView = new MobileCalibrateView({
        appModel: this.appModel
      })

      this.mobileGamePlayView = new MobileGamePlayView({
        appModel: this.appModel
      })

      SocketIO.initialize({
        appModel: this.appModel
      })

      this.showSyncView()

      this.mobileSyncView.on( SocketEvent.SYNCED, this.showCalibrateView )
      this.mobileCalibrateView.on( AppEvent.MOBILE_CALIBRATED, this.showGamePlayView )
    },



    showSyncView: function () {
      this.mobileSyncView.render()
    },



    showCalibrateView: function () {
      this.mobileSyncView.hide()
      //this.mobileCalibrateView.render()
      this.showGamePlayView()
    },



    showGamePlayView: function () {
      this.mobileCalibrateView.hide()
      this.mobileGamePlayView.render()
    }

}

module.exports = MobileController