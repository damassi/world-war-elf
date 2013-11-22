/**
 * Snowflakes
 * @requires jQuery & TweenMax
 * @author Charlie
 */

Snowflakes = {

  /**
   * window reference
   * @type {jQuery}
   */
  $window     : $(window),

  /**
   * Snowflake element wrapper
   * @type {jQuery}
   */
  $container  : null,

  /**
   * viewport width
   * @type {Number}
   */
  winWidth    : 0,

  /**
   * viewport height
   * @type {Number}
   */
  winHeight   : 0,

  /**
   * Snowflake size classes
   * @type {Array}
   */
  sizeClasses : [ 'small', 'medium', 'big' ], 

  /**
   * Initializes Snow
   */
  initialize: function () {
    this.$container = $('<div>', {'class': 'snowflake-container'}).prependTo(document.body);
    this.winWidth   = this.$window.width();
    this.winHeight  = this.$window.height();
    this.addEventlisteners(); 
    this.initSnow();
  },

  /**
   * Event listeners
   */
  addEventlisteners: function () {
    this.$window.resize($.proxy(this._onWindowResize, this));
  },
  
  /**
   * Initializes flakes
   */
  initSnow: function () {
    this.createFlake();
  },

  /**
   * creates snowflakes
   */
  createFlake: function () {
    var $snowflake = $('<div>', {'class': 'snowflake'});
    var sizeClasses  = this.sizeClasses[ this._randomNumber(0, this.sizeClasses.length - 1) ];
    var rightPos   = this._randomNumber(100, -100);
    var opacity    = this._randomNumber(50, 90) / 100;

    $snowflake.addClass(sizeClasses)
              .prependTo(this.$container)
              .css({
                'right'   : rightPos + '%',
                'opacity' : opacity
              });

    //create next snowflake
    setTimeout($.proxy(this.createFlake, this), this._randomNumber(100, 300));
    this.animateFlake($snowflake);
  },

  /**
   * Animates element
   * @param  {jQuery} $snowflake
   */
  animateFlake: function ($snowflake) {
    var timeline = new TimelineLite();
    var duration = this._randomNumber(10, 15);
    var right = this._randomNumber(this.winWidth / 2, this.winWidth) /* go left */ * - 1;

    //make it fall
    timeline.to($snowflake, duration, { 
      'y'        : this.winHeight * 1.5, 
      'x'        : right, 
      'ease'     : 'Linear.easeNone',
      //remove from DOM on complete
      onComplete : function () {
        $snowflake.remove();
      }
    });
  },

  /**
   * Generates random number
   * @param  {Number} from
   * @param  {Number} to
   * @return {Number} random value
   */
  _randomNumber: function (from, to) {
    return Math.floor( Math.random() * (to-from+1) + from);
  },

  /**
   * Resize event hanlder
   * @param {Object} event object
   */
  _onWindowResize: function (event) {
    this.winWidth   = this.$window.width();
    this.winHeight  = this.$window.height();
  }

};

module.exports = Snowflakes;