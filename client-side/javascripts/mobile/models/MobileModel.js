/**
 * Control model provides connectivity information and state to the mobile client
 *
 * @author christopher.pappas@popagency.com
 * @date   11.19.13
 */

var MobileModel = Backbone.Model.extend({

  defaults: {
    connected: false
  }

})

module.exports = MobileModel