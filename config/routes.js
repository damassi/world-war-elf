/**
 * Game routes which map to backbones HTML5 PushState router
 *
 * @author Christopher Pappas
 * @date   11.18.13
 */


module.exports.routes = {


  '/': {
    view: 'desktop/index'
  },

  // '/:route': {
  //   view: 'desktop/index'
  // },

  '/mobile/:route': {
    view: 'mobile/index'
  },

  '/mobile-layout': {
    view: 'mobile/layout.html',
    template: null
  }

};

