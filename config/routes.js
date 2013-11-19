/**
 * Game routes which map to backbones HTML5 PushState router
 *
 * @author Christopher Pappas
 * @date   11.18.13
 */


module.exports.routes = {


  '/': {
    controller: 'DesktopController',
    action: 'index'
  },

  '/desktop/sync/': {
    controller: 'DesktopController',
    action: 'sync'
  },


  /**
   * In order to override the default desktop layout we have to render the response from
   * a controller rather than using sails' default render hooks and pass the
   * layouts/mobile-layout.handlebars path from the index res.view() method
   */

  '/mobile': {
    controller: 'MobileController',
    action: 'index'
  },

  '/mobile/gameplay/:id': {
    controller: 'MobileController',
    action: 'gameplay'
  }

};

