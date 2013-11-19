/**
 * Global pubsub event bus
 * 
 * @author Christopher Pappas	
 * @since  7.16.13
 *
 * @dependencies: Backbone
 */

var PubSub = {}

_.extend( PubSub, Backbone.Events )

module.exports = PubSub