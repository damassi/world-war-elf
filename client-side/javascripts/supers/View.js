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
	 * A ref to the primary AppController, passed in during view
	 * initialization
	 * @type {AppController}
	 */
	appController: null,


	/**
	 * A ref to the primary AppModel
	 * @type {AppModel}
	 */
	appModel: null,


	/**
   * A ref to the primary stage located on AppController
   * @type {PIXI.Stage}
   */
	stage: null,


	/**
	 * The views display object container
	 * @type {PIXI.DisplayObjectContainer}
	 */
	container: null,



	initialize: function (options) {
		_.extend( this, options || {} )
		_.bindAll( this )

		if (this.appController) {
			if (this.appController.stage) {
				this.stage = this.appController.stage
				this.container = new PIXI.DisplayObjectContainer()
			}
		}

		if (this.appModel)
			this.appModel = this.appModel
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

