/**
 * Miscellanious handlebars view helpers
 *
 * @author Christopher Pappas
 * @date   11.8.13
 */

var Handlebars = require('handlebars')
var _ 	   	   = require('underscore')

module.exports = {

	/**
	 * Takes a flash message and iterates over its contents, returning a
	 * formatted list
	 * @param  {Object} flash The flash message returned from the req
	 * @return {String}
	 */
	flashHelper: function (flash) {
		flash = flash || {}

		var str = ''

		if (flash.err) {
			str = '<ul>'

			Object.keys( flash.err ).forEach(function( error ) {
				str += '<li class="warning alert">' + JSON.stringify( flash.err[error]) + '</li>'
			})

			str += '</ul>'
		}

		return str
	},


	/**
	 * Checks if a passed in value exists, if so, returns a default value
	 * @param  {*} val     		  The value to check existance against
	 * @param  {String} msg     The message to return if the value is empty
	 * @return {String}
	 */
	checkEmptyHelper: function (val, msg, options) {
			return ( _.isUndefined( val ) || val === '' ) ? msg : val
	},


	/**
	 * Helper to check the route against a link.
	 *
	 * TODO: Update this to something less static
	 *
	 * @param  {String} path
	 * @param  {String} label
	 * @param  {Object} options
	 * @return {Boolean}
	 */
	isPathEqualHelper: function (path, label, options) {
		if (!path)
			return options.inverse(this);

		path = path.split('/')[1]

		if (label.indexOf(path) !== -1) {
			return options.fn(this);
		}

		return options.inverse(this);
	}
}