/**
 * Touch related utilities
 *
 * @author Micheal Leavitt
 * @date  11.20.13
 */

var Touch = {

  /**
   * Delegate touch events to mouse if not on a touch device
   */
  translateTouchEvents: function () {

    if (! ('ontouchstart' in window )) {
      $(document).delegate( 'body', 'mousedown', function(e) {
        $(e.target).trigger( 'touchstart' )
      })

      $(document).delegate( 'body', 'mouseup', function(e) {
        $(e.target).trigger( 'touchend' )
      })
    }
  }

}

module.exports = Touch
