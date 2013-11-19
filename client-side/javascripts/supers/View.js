/**
 * View Superclass
 *
 * @author christopher.pappas@popagency.com
 * @since  10.10.13
 */

var AppEvent  = require('../events/AppEvent')
var PubSub    = require('../utils/PubSub')


var View = Backbone.View.extend({


	/**
	 * @type {String}
	 */
	className: 'view',



	initialize: function (options) {
		_.extend( this, options || {} )
		_.bindAll( this )
	},



	render: function (data) {
		if (! this.template)
			return

		data = data || this.data || {}

		if (data instanceof Backbone.Model)
			data = this.data.toJSON()

		this.$el.html( this.template( data ))

		this.delegateEvents()

		this.$el.appendTo( '#container-content' )

		return this
	},



	//+ PUBLIC METHODS
	//--------------------------------------


	show: function (options) {
		options = options || {}

		this.$el.show()
	},



	hide: function (options) {
		options = options || {}

		if (options.remove)
		 	this.remove()
	},



	//+ EVENT HANDLERS
	//--------------------------------------



	//+ PRIVATE METHODS
	//--------------------------------------

})

module.exports = View

