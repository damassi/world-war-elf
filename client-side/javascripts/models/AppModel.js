/**
 * Game model which controls overall state
 *
 * @author christopher.pappas@popagency.com
 * @since  11.18.13
 */

var AppModel = Backbone.Model.extend({

  defaults: {

    view : null,

    score: 0,

    hits: 0

  },


  increaseHits: function () {
    this.set( 'hits', this.get('hits') + 1 )
  }

})

module.exports = AppModel