/**
 * Submit the last game played to the high scores db
 *
 * @author Christopher Pappas
 * @date   12.2.13
 */


var AppConfig = require('../../config/AppConfig')
var View  = require('../../supers/View')
var Easel = require('../../utils/Easel')
var formTemplate = require('./submit-form-template.hbs')


var SubmitScoreView = View.extend({


  initialize: function (options) {
    this._super(options)

    this.children = [
      //this.placeholder = Easel.createBitmap('placeholder-submit-score'),
      Easel.createSprite('miscSprite', 'submit-text', { x: 152, y: 53 }),
    ]

    Easel.dragObject( this.children )
  },



  render: function () {
    this.$form = $('<div id="submit-score" />').appendTo('#game-canvas')
    this.$form.html( formTemplate() )
    this.$submitBtn = this.$form.find('.submit-btn')

    this._super()

    TweenMax.set( this.$form, { autoAlpha: 0 })

    return this
  },



  addEventListeners: function() {
    this.$submitBtn.on('touchend', this._submitForm)
  },



  removeEventListeners: function() {
    this.$submitBtn.off('touchend', this._submitForm)
  },



  show: function () {
    this._super()

    TweenMax.to( this.$form, .2, {
      x: 0,
      autoAlpha: 1,
      ease: Linear.easeNone,
      delay: AppConfig.TRANSITION_TIME + .2
    })

  },



  hide: function () {
    this._super({ remove: true })

    TweenMax.to( this.$form, .2, {
      //x: -1000,
      autoAlpha: 0,
      ease: Linear.easeNone
    })
  },



  remove: function() {
    this.$form.remove()
    this._super()
  },



  _submitForm: function (event) {
    console.log('here?')
    window.location.href = '#/home'
  }

})

module.exports = SubmitScoreView