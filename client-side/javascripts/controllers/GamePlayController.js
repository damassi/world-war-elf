/**
 * Target controller handles logic relating to the creation, addition and deletion of gameplay targets
 *
 * @author Christopher Pappas
 * @date   11.29.13
 */

var GameEvent     = require('../events/GameEvent')
var AppEvent      = require('../events/AppEvent')
var TargetFactory = require('../factories/TargetFactory')


var GamePlayController = Backbone.View.extend({


  occupiedPositions: null,


  initialize: function (options) {
    this.container = options.container

    this.occupiedPositions = []

    TargetFactory.initialize({
      container: this.container
    })

    // var target = TargetFactory.createTarget()
    // this.container.addChildAt( target.instance, target.depth )

  },



  addEventListeners: function () {

  },



  removeEventListeners: function () {

  }


})

module.exports = GamePlayController