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


  '/mobile*': {
    controller: 'MobileController',
    action: 'index'
  },

  '/mobile/gameplay/:id': {
    controller: 'MobileController',
    action: 'gameplay'
  }

};

