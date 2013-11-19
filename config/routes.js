/**
 * Game routes which map to backbones HTML5 PushState router
 *
 */


module.exports.routes = {

  '/': {
    view: 'landing/index'
  },


  '/gameplay': {
    view: 'landing/index'
  },


  /**
   * In order to override the default layout we have to render the response from
   * a controller rather than using sails' default render hooks and pass the
   * layouts/mobile-layout.handlebars path in there
   */

  '/mobile': {
    controller: 'MobileController',
    action: 'index'
  }

};

