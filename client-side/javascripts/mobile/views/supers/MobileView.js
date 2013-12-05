/**
 * Superclass for all mobile views
 *
 * @author Christopher Pappas
 * @date   12.4.13
 */


var MobileView = Backbone.View.extend({


  initialize: function (options) {
    _.bindAll(this)
  },



  show: function () {
    TweenMax.fromTo( this.$el, .4, { x: 1000 }, {
      x: 0,
      delay: 1,
      ease: Expo.easeOut
    })
  },



  hide: function() {
    var self = this

    TweenMax.to( this.$el, .4, {
      x: -1000,
      ease: Expo.easeIn,
      onComplete: function () {
        self.remove()
      }
    })
  },

})

module.exports = MobileView