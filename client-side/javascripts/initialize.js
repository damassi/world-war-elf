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

})