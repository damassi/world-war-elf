/**
 * Submit the last game played to the high scores db
 *
 * @author Christopher Pappas
 * @date   12.2.13
 */

var AppConfig    = require('../../config/AppConfig')
  , View         = require('../../supers/View')
  , Easel        = require('../../utils/Easel')
  , formTemplate = require('./submit-form-template.hbs')


var SubmitScoreView = View.extend({


  initialize: function (options) {
    this._super(options)

    this.children = [
      Easel.createSprite('miscSprite', 'submit-text', { x: 152, y: 53 }),
    ]
  },



  render: function () {
    this._super()
    this.returnData()

    this.$form = $('<div id="submit-score" />').appendTo('#game-canvas')

    this.$form.html( formTemplate({
      organizations: this.scoreboard.organizations
    }))

    this.$nameInput    = this.$form.find('.name')
    this.$organization = this.$form.find('.organization')
    this.$submitBtn    = this.$form.find('.submit-btn')
    this.$skipBtn      = this.$form.find('.skip-btn')

    TweenMax.set( this.$form, { autoAlpha: 0 })

    this.addEventListeners()

    return this
  },



  returnData: function () {
    var req = $.ajax({
      url: AppConfig.SCOREBOARD_ENDPOINTS.organizations,
      async: false
    })

    req.error( function (error) {
      console.error('Error loading top scores', error)
    })

    var self = this

    req.done( function (data) {
      self.scoreboard.organizations = data.Organizations
    })
  },



  addEventListeners: function() {
    this.$submitBtn.on('touchend', this.onSubmitForm)
    this.$skipBtn.on('touchend', this.onSkipBtnClick)
  },



  removeEventListeners: function() {
    this.$submitBtn.off('touchend', this.onSubmitForm)
    this.$skipBtn.off('touchend', this.onSkipBtnClick)
  },



  show: function () {
    this._super()

    TweenMax.to( this.$form, .2, {
      x: 0,
      autoAlpha: 1,
      ease: Linear.easeNone,
      delay: AppConfig.TRANSITION_TIME + .4
    })

  },



  hide: function () {
    this._super({ remove: true })

    TweenMax.to( this.$form, .2, {
      autoAlpha: 0,
      ease: Linear.easeNone
    })
  },



  remove: function() {
    this.$form.remove()
    this._super()
  },



  onSubmitForm: function (event) {
    var postReq = $.ajax({
      url: AppConfig.SCOREBOARD_ENDPOINTS.postScore,
      data: {
        name: this.$nameInput.val(),
        organizationId: this.$organization.val(),
        score: this.appModel.get('score')
      }
    })

    postReq.error( function (error, msg) {
      console.log(msg, error)
      window.location.href = '#/high-scores'
    })

    postReq.success( function (response) {
      window.location.href = '#/high-scores'
    })
  },



  onSkipBtnClick: function (event) {
    window.location.href = '#/high-scores'
  }



})

module.exports = SubmitScoreView