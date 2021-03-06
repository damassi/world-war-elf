/**
 * Mobile bootstrapper
 *
 * @author Christopher Pappas
 * @date   12.4.13
 */

var Touch            = require('../utils/Touch')
var MobileController = require('./MobileController')

document.ontouchmove = function(e) {e.preventDefault()};

$(function mobileInitialized () {
  Touch.translateTouchEvents()

  MobileController.initialize()
})