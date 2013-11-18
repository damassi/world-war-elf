/**
 * Views
 *
 * Server-sent views are a classic and effective way to get your app up and running.
 * Views are normally served from controllers.  Below, you can configure your
 * templating language/framework of choice and configure Sails' layout support.
 *
 * For more information on views and layouts, check out:
 * http://sailsjs.org/#documentation
 */

var viewHelpers = require('../utils/view-helpers')

module.exports.views = {

  engine      : 'handlebars',
  layout      : 'default-layout',
  partialsDir : '/views/partials/',
  helpers     :  viewHelpers

};
