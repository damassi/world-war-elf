/**
 * Easel js view which builds standard backbone functionality in order to provide
 * canvas functionality
 *
 * @author christopher.pappas@popagency.com
 * @since  11.17.13
 */

var AppConfig = require('../config/AppConfig')


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
				this._bindCanvasEvents()
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

		this.delegateEvents()

		return this
	},



	//+ PUBLIC METHODS
	//--------------------------------------



	show: function (options) {
    options = options || {}

		if (!this.stage)
			return

		this.container.x = 0
		this.container.y = 0

		this.stage.addChild( this.container )

    TweenMax.from( this.container, AppConfig.TRANSITION_TIME, {
      x: 1500,
      ease: Expo.easeOut,
      delay: AppConfig.TRANSITION_TIME
    })
  },



  hide: function (options) {
    options = options || {}

		var self = this

    TweenMax.to( this.container, AppConfig.TRANSITION_TIME, {
      x: -1000,
      ease: Expo.easeIn,
      onComplete: function() {
      	if (options.remove)
        	self.remove()
      }
    })
  },



	remove: function (options) {
		if (!this.stage)
			return

    for(var i = 0, len = this.container.children.length; i < len; ++i ) {
      var child = this.container.children[i]

      if (child instanceof c.Container)
        child.removeAllChildren()
    }

    this.container.removeAllChildren()
		this.stage.removeChild( this.container )
	},




	addChildren: function (children) {
		if (!this.stage)
			return

		for (var i = 0, len = children.length; i < len; ++i)
			this.container.addChild( children[i] )

	},



	//+ EVENT HANDLERS
	//--------------------------------------



	//+ PRIVATE METHODS
	//--------------------------------------


	_bindCanvasEvents: function() {
		var self = this

    _.defer(function() {
      if (typeof self.canvasEvents !== 'undefined') {
        for (event in self.canvasEvents) {
          var evtName = event.split(' ')
            , objName = evtName.shift()
            , handler = self.canvasEvents[event]
            , displayObject = self[objName]

          if (displayObject) {
            displayObject.on(evtName, self[handler])
          }
        }
      }
    })
	}

})

module.exports = View

