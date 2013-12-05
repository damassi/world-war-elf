/**
 * Controller for all mobile-related actions
 *
 * @author Christopher Pappas
 * @date   12.4.13
 */

var AppModel           = require('../models/AppModel')
var SocketIO           = require('../utils/SocketIO')
var MobileSyncView     = require('./views/MobileSyncView')
var MobileGamePlayView = require('./views/MobileGamePlayView')


var MobileController = {


    initialize: function () {
      _.bindAll(this)

      this.appModel = new AppModel()

      this.mobileSyncView = new MobileSyncView()
      this.mobileSyncView.render()

      SocketIO.initialize({
        appModel: this.appModel
      })

    }

}

module.exports = MobileController