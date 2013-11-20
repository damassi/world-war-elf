/**
 * Application Bootstrapper
 *
 * @author christopher.pappas@popagency.com
 * @since  11.18.13
 */

var AppController = require('./AppController');

$(function() {

  AppController.initialize()

  Backbone.history.start({
    pushState: false
  })

  // Delegate touch events to mouse if not on a touch device
  if (! ('ontouchstart' in window )) {
    $(document).delegate( 'body', 'mousedown', function(e) {
      $(e.target).trigger( 'touchstart' )
    })

    $(document).delegate( 'body', 'mouseup', function(e) {
      $(e.target).trigger( 'touchend' )
    })
  }

})