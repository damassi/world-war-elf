/**
 * MobileController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 */

module.exports = {

  /**
   * Overwrite default layout on mobile view
   *
   */
  index: function (req, res) {

    res.view({
      layout: 'mobile-layout'
    })

  }

};
