
/**
 * View Superclass
 *
 * @author christopher.pappas@popagency.com
 * @since  10.10.13
 */

var AppConfig = require('../config/AppConfig')
var AppEvent  = require('../events/AppEvent')
var PubSub    = require('../utils/PubSub')
var Utils     = require('../utils/Utils')


var View = Backbone.View.extend({


	/**
	 * @type {String}
	 */
	className: 'view',

	/**
	 * An array to store all subviews which will be controlled
	 * by dragagble
	 * @type {Array}
	 */
	draggableViews: null,

	/**
	 * An array of snap positions for the views to transition to
	 * @type {Array}
	 */
	snapPositions: null,

	/**
	 * The overall width of the view
	 * @type {Number}
	 */
	width: null,

	/**
	 * The view label identifier
	 * @type {String}
	 */
	_label: null,

	/**
	 * The position of the draggable item pre drag
	 * @type {Number}
	 */
	_itemStartX: -1,

	/**
	 * The touch start position
	 * @type {Number}
	 */
	_touchStartX: -1,

	/**
	 * The touch end position on release
	 * @type {Number}
	 */
	_touchEndX : -1,

	/**
	 * Draggable item set after drag initialization
	 * @type {$}
	 */
	$dragItem: null,


	/**
	 * Initialize the view
	 * @param  {Object} options
	 * @return {void}
	 */
	initialize: function( options ) {
		_.extend( this, options || {} );
		_.bindAll( this );

		this.draggableViews = []
		this.snapPositions = []
		this.width = -1
	},


	/**
	 * Renders the view
	 * @param  {*} data
	 * @return {View}
	 */
	render: function( data ) {
		if( ! this.template )
			return

		data = data || this.data || {}

		if( data instanceof Backbone.Model )
			data = this.data.toJSON()

		// Set Language for all templates that extend View
		data.lang = AppConfig.LANG

		this.$el.html( this.template( data ))

		this.delegateEvents()

		this.$el.appendTo( '#container-content' )

		return this
	},


	/**
	 * Sets the view label identifier
	 * @param  {String} label
	 * @return {View}
	 */
	setData: function( params ) {
		for( var key in params )
			this[key] = params[key]

		this.setLabel( this.data.label )

		return this
	},


	/**
	 * Sets the view label identifier
	 * @param  {String} label
	 * @return {void}
	 */
	setLabel: function( label ) {
		if( label !== this._label )
			this._label = label
	},


	/**
	 * Gets the label
	 * @return {String}
	 */
	getLabel: function() {
		return this._label
	},


	/**
	 * Shows the view
	 * @param  {Object} options
	 * @return {void}
	 */
	show: function( options ) {
		options = options || {}
	},


	/**
	 * Hides the view
	 * @param  {Object} options
	 * @return {void}
	 */
	hide: function( options ) {
		options = options || {}

		if( options.remove )
		 	this.remove()
	},


	/**
	 * Initialize the greensock Draggable utility
	 * @param  {Object} options
	 * @return {void}
	 */
	initializeDraggable: function( options ) {
		options = options || {}

		var self = this
		  , $el = options.$el || this.$el

		this._allowDrag = true

		$el.on( 'touchstart', this._onItemStartDrag )
		$el.on( 'touchend', this._onItemStopDrag )
		$el.on( 'mouseleave', this._onMouseLeave)
	},


	//--------------------------------------
	//+ PUBLIC METHODS
	//--------------------------------------

	/**
	 * Fired from AppController when view becomes visible
	 * @override
	 * @return {void}
	 */
	show: function() {},


	/**
	 * Fired from AppController when view becomes invisible
	 * @override
	 * @return {void}
	 */
	hide: function() {},


	//--------------------------------------
	//+ EVENT HANDLERS
	//--------------------------------------

	/**
	 * Handler for when item is touched.  Begin drag logic
	 * @param  {Event} event
	 */
	_onItemStartDrag: function( event ) {
		if( ! this._allowDrag || typeof(event) === 'undefined' )
			return

		this.$dragItem = $(event.currentTarget)
		this._dragEvent = event

		Utils.normalizeTouchEvents( event )
		this._itemStartX = GreenProp.x( this.$dragItem )
		this._touchStartX = Utils.returnPageX( event.originalEvent.touches )

		$(document).on( 'mousemove touchmove', this._onItemMove )
	},


	/**
	 * The actual drag of the item
	 * @param  {Event} event
	 * @return {void}
	 */
	_onItemMove: function( event ) {
		if( ! this._allowDrag )
			return

		Utils.normalizeTouchEvents( event )

		var moveX = Utils.returnPageX( event.originalEvent.touches )
		  , distance = Math.abs( moveX - this._touchStartX )
		  , moveAmount = 0

		// Move left
		if( moveX < this._touchStartX ) {
			this._dragDirection = 'left'
			moveAmount = this._itemStartX - distance

			this.trigger( AppEvent.DRAG_LEFT, event )
		}

		// Move right
		else {
			this._dragDirection = 'right'
			moveAmount = this._itemStartX + distance

			//this.trigger( AppEvent.DRAG_RIGHT )
		}

		//this.trigger( AppEvent.DRAG, { direction: this._dragDirection })

		TweenMax.to( this.$dragItem, .3, {
			x: moveAmount,
			ease: Expo.easeOut
		})

	},


	/**
	 * Mouse has left the item we were dragging
	 * @param  {[type]} event [description]
	 */
	_onMouseLeave: function( event ) {
		return
		if( this.$dragItem !== null )
			this._onItemStopDrag( event )
	},


	/**
	 * Handler for when item is released.  Fires next page tween or resets item back to original position
	 * @param  {Event} event
	 */
	_onItemStopDrag: function( event ) {
		if( ! this._allowDrag )
			return

		if( ! this.$dragItem )
			return

		if( ! GreenProp.x( this.$dragItem ) )
			return

		this._allowDrag = false;

		// Check against frantic swiping
		TweenMax.delayedCall( AppConfig.SWIPE_LOCK_TIME, this._resetAllowDrag )

		Utils.normalizeTouchEvents( event )
		this._touchEndX = Utils.returnPageX( event.originalEvent.changedTouches )

		var touchPadding = Math.abs( this._touchStartX - this._touchEndX )
		var itemXPos 	 = GreenProp.x( this.$dragItem )
		var itemWidth 	 = this.snapPositions[ this.snapPositions.length - 1]

		// Check if drag distance is greater than the threshold and then trigger
		if( itemXPos <= 0 && itemXPos >= itemWidth ) {

			if( touchPadding > AppConfig.SWIPE_SENSITIVITY) {

				if( this._touchStartX > this._touchEndX ) {
					this._nextItem()
					this.$dragItem = null
				}

				else {
					this._previousItem()
					this.$dragItem = null
				}
			}

			// Reset product to original position if condition not met
			else {

				if( this.$dragItem === null )
					return

				TweenMax.to( this.$dragItem, 1, {
					x: this._itemStartX,
					ease: Expo.easeOut
				})

			}
		}

		// If at beginning or end
		else {

			TweenMax.to( this.$dragItem, 1, {
				x: this._itemStartX,
				ease: Expo.easeOut
			})

			// End pos -- unlock global swipe and transition
			if( itemXPos <= 0 ){

				//PubSub.trigger( AppEvent.UNLOCK_GLOBAL_SWIPE, { delay: AppConfig.SECTION_TRANSITION_TIME })
			}

			// Beginning pos - tween to zero
			else {

			}
		}

		$(document).off( 'mousemove touchmove', this._onItemMove )
	},


	/**
	 * Flag to enable / disable dragging
	 * @return {void}
	 */
	_resetAllowDrag: function() {
		this._allowDrag = true
	},


	/**
	 * Rotates carousel to the next item
	 * @return {void}
	 */
	_nextItem: function() {
		this.trigger( AppEvent.NEXT_PAGE )
	},


	/**
	 * Rotates carousel to the previous item
	 * @return {void}
	 */
	_previousItem: function() {
		this.trigger( AppEvent.PREVIOUS_PAGE )
	}


	//--------------------------------------
	//+ PRIVATE METHODS
	//--------------------------------------

})

module.exports = View

