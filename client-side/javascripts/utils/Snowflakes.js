/**
 * Snowflakes
 * @requires jQuery & TweenMax
 * @author Charlie
 */

function Snowflakes(options) {
	this.initialize();
}

Snowflakes.prototype = {

	$container: null,

	sizeClass: [ 'small', 'medium', 'big' ],

	options: {

	},

	initialize: function () {
		this.$container = $('<div>', {'class': 'snowflake-container'}).prependTo(document.body);
		this.snow();
	},
	
	snow: function () {
		this.createFlake();
		var snowAgain = this._randomNumber(100, 500);
		setTimeout($.proxy(this.snow, this), snowAgain);
	},

	createFlake: function () {
		var $snowflake = $('<div>', {'class': 'snowflake'});
		var rightPos = this._randomNumber(100, -100);
		var size = this.randomSize();
		$snowflake.addClass(size);
		$snowflake.prependTo(this.$container);
		$snowflake.css({
			'right': this._percentage(rightPos) 
		});
		this.animateFlake($snowflake, rightPos);
	},

	animateFlake: function ($snowflake, rightPos) {
		var tl = new TimelineLite();
		var duration = this._randomNumber(10, 15);
		var right = this._randomNumber(rightPos + 50, rightPos + 100);
		//make it fall
		tl.to($snowflake, duration, { 
			'top': '100%', 
			'right': this._percentage(right), 
			'ease': 'Linear.easeNone' 
		});
		//make it disappear
		tl.to($snowflake, 3, { 
			opacity: 0, 
			delay: duration + 15, 
			ease: 'Linear.easeNone', 
			onComplete: function () {
				$snowflake.remove();
			}
		});
	},

	randomSize: function () {
		var from = 0, to = this.sizeClass.length - 1;
		return this.sizeClass[ this._randomNumber(from, to) ];
	},

	_randomNumber: function (from, to) {
		return Math.floor( Math.random() * (to-from+1) + from);
	},

	_percentage: function (value) {
		return parseInt(value, 10) + '%';
	}

};

module.exports = Snowflakes;