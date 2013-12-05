/**
 * Mobile view controller
 *
 */

module.exports = {

  index: function (req, res) {
    res.view({
      view: '/mobile/index',
      layout: false,
    })
  }

};