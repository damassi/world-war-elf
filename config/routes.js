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

  '/:route': {
    view: 'desktop/index'
  },

  '/mobile/:id': {
    view: 'mobile/index'
  }

};

