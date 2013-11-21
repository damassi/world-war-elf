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
   * @type {c.Stage}
   */
	stage: null,


	/**
	 * The views display object container
	 * @type {c.Container}
	 */
	container: null,


	/**
	 * An array of all child display objects contained within `container`
	 * @type {Array}
	 */
	children: [],



	initialize: function (options) {
		_.extend( this, options || {} )
		_.bindAll( this )

		if (this.appController) {
			if (this.appController.stage) {
				this.stage = this.appController.stage
				this.container = new c.Container()

				this.bindCanvasEvents()
			}
		}

		if (this.appModel)
			this.appModel = this.appModel
	},



	bindCanvasEvents: function() {
		var self = this

		_.defer(function() {
			if (!_.isUndefined( self.canvasEvents )) {
				for (event in self.canvasEvents) {
					var evtName = event.split(' ')
					var displayObject = evtName.shift()
					var handler = self.canvasEvents[event]
					if (self[displayObject]) {
						self[displayObject].on(evtName, self[handler])
					}
				}
			}
		})
	},



	render: function (data) {
		if (! this.template)
			return

		data = data || this.data || {}

		if (data instanceof Backbone.Model)
			data = this.data.toJSON()

		this.delegateEvents()

		return this
	},



	//+ PUBLIC METHODS
	//--------------------------------------


	show: function (options) {
		options = options || {}

		if (!this.stage)
			return

		this.stage.addChild( this.container )
	},



	hide: function (options) {
		options = options || {}

		if (options.remove)
		 	this.remove()
	},



	remove: function (options) {
		if (!this.stage)
			return

		this.stage.removeChild( this.container )
	},



	addChildren: function (children) {
		if (!this.stage)
			return

		for (var i = 0, len = children.length; i < len; ++i)
			this.container.addChild( children[i] )

	}



	//+ EVENT HANDLERS
	//--------------------------------------



	//+ PRIVATE METHODS
	//--------------------------------------

})

module.exports = View

