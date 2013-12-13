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
      this.mobileGamePlayView.on( AppEvent.STOP_GAMEPLAY, this.stopGameplay )
    },



    showSyncView: function () {
      this.mobileSyncView.render()
    },



    showCalibrateView: function () {
      this.mobileSyncView.hide()
      this.mobileCalibrateView.render()
    },



    showGamePlayView: function () {
      this.mobileCalibrateView.hide()
      this.mobileGamePlayView.render()
    },



    stopGameplay: function () {
      this.mobileGamePlayView.hide()

      var $gameOver = $('.game-over')
      $gameOver.removeClass('hidden')

      TweenMax.fromTo( $gameOver, .3, { scale: 0 }, {
        scale: .8,
        ease: Back.easeOut,
        delay: 1,

        onComplete: function () {
          TweenMax.to( $gameOver, .3, {
            scale: 0,
            ease: Back.easeOut,
            delay: 5,

            onComplete: function() {
              window.location.reload()
            }
          })
        }
      })
    }

}

module.exports = MobileController