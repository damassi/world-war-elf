/**
 * Random EaselJS utilities
 *
 * @author Christopher Pappas
 * @since 11.27.12
 * @updated 11.19.13
 */

var assets = require('../config/Assets').manifest;

var Easel = {

  /**
   * Set the default search key for asset queries
   * @type {String}
   */
  DEFAULT_KEY: 'name',

  /**
   * Cache the bitmap for transformations
   * @param  {c.DisplayObject} displayObject
   * @return {void}
   */
  cache: function (displayObject) {
    var bounds

    if (displayObject instanceof Array) {
      _.each( displayObject, function (obj) {
        bounds = obj.getBounds()
        obj.cache( bounds.x, bounds.y, bounds.width, bounds.height )
      })

      return
    }

    bounds = displayObject.getBounds()
    displayObject.cache( bounds.x, bounds.y, bounds.width, bounds.height )
  },

  /**
   * Creates a bitmap
   * @param  {String} value the value-pair of the asset
   * @param  {Object} params to set on the bitmap after initialization
   * @return {c.Bitmap}  The bitmap
   */
  createBitmap: function (name, params) {
    var bitmap = new c.Bitmap( this.returnAssetImage( name ));

    if (!_.isUndefined(params))
      for (var param in params)
        bitmap[param] = params[param]

    return bitmap
  },

  /**
   * Creates a spritesheet and returns c.Sprite object
   * @param  {String} The name of the asset
   * @param  {String} Frame to go to
   * @param {Object} params to set on the sprite
   * @return {c.Sprite}  The animated spritesheet
   */
  createSprite: function (name, gotoFrameName, params, registration) {
    var sprite = new c.Sprite( new c.SpriteSheet( this.returnAssetSpriteSheet( name )));

    if (!_.isUndefined(gotoFrameName))
      sprite.gotoAndStop( gotoFrameName )

    if (!_.isUndefined(params))
      for (var param in params)
        sprite[param] = params[param]

    if (!_.isUndefined(registration))
      if (registration.center)
        this.centerRegistrationPoint( sprite )

    return sprite
  },

  /**
   * TODO: Abstract this out into seperate Text class and rewrite for
   * extensibility
   *
   * @param  {String} str          The text to place in the textfield
   * @param  {String} fontFace
   * @param  {String} fontSize     The size, with a 'px'
   * @param  {String} color        Color, in format '#333'
   * @param  {Object} params       Additional EaselJS properties
   * @param  {Object} strokeParams Stroke parameters
   * @return {Class}               A new text object witha few
   */
  Text: function (textProps) {
    var container = new c.Container()
    var text = new c.Text( textProps.text, textProps.size + ' ' + textProps.font, textProps.color )

    if (!_.isUndefined(textProps.stroke)) {
      var textStroke = new c.Text( textProps.text, textProps.size + ' ' + textProps.font, textProps.stroke.color )
      textStroke.outline = textProps.stroke.size
      container.addChild( textStroke )
    }

    container.addChild( text )

    if (!_.isUndefined(textProps.position))
      for (var param in textProps.position)
        container[param] = textProps.position[param]

    return {

      container: container,

      getText: function () {
        return text.text
      },

      setText: function (str) {
        text.text = str
        if (textStroke) {
          textStroke.text = str
        }
      },

      textAlign: function (align) {
        text.textAlign = align
        if (textStroke) {
          textStroke.textAlign = align
        }
      },

      getX: function() {
        return text.x
      },

      getY: function() {
        return text.y
      },

      getWidth: function() {
        return text.getMeasuredWidth()
      },

      getHeight: function() {
        text.getMeasuredHeight()
      },
    }
  },

  /**
   * Creates a hit area for DisplayObjects
   * @param  {DisplayObject} parent
   * @param  {Number} width
   * @param  {Number} height
   */
  createHitArea: function (parent, width, height) {
    width = width || 0;
    height = height || 0;

    parent.hitArea = new c.Shape( new c.Graphics().beginFill("#f00").drawRect( 0, 0, width, height ));
  },

  /**
   * Returns a game asset
   * @param  {String} name the asset name
   * @return {Object}   the asset
   */
  returnAsset: function (value) {
    var lookupKey = this.DEFAULT_KEY;

    var len = assets.length;
    for( var i = 0; i < len; ++i ) {
      var asset = assets[i];
      if( asset.hasOwnProperty( lookupKey )) {
        if( asset[lookupKey] === value ) {
          return asset;
        }
      }
    };

    return new Error('Asset not found');
  },

  /**
   * Returns an image url
   * // TODO: Merge image and spritesheet into one returnAsset method
   * @param  {String} value the asset value-pair
   * @return {String}   the asset url
   */
  returnAssetImage: function (value) {
    var lookupKey = this.DEFAULT_KEY;

    var len = assets.length;
    for( var i = 0; i < len; ++i ) {
      var asset = assets[i];
      if( asset.hasOwnProperty( lookupKey )) {
        if( asset[lookupKey] === value ) {
          return asset.src
        }
      }
    };

    return false;
  },

  /**
   * Returns a spritesheet object
   * // TODO: Merge image and spritesheet into one returnAsset method
   * @param  {String} value the asset value
   * @return {Object}   the asset spritesheet
   */
  returnAssetSpriteSheet: function (value) {
    var lookupKey = this.DEFAULT_KEY;

    var len = assets.length;
    for( var i = 0; i < len; ++i ) {
      var asset = assets[i];
      if( asset.hasOwnProperty( lookupKey )) {
        if( asset[lookupKey] === value ) {
          return asset.spritesheet
        }
      }
    };

    return false;
  },

  /**
   * Returns the gfx object under the current grid coord
   * @param  {Array} matrixCoord the current position on the grid
   * @return {Object}      an object has consisting of the name, id
   *                       and location of the object under the current grid coord
   */
  returnObjectUnderMatrixCoord: function (matrixCoord) {
    var gfxLayout = GameConfig.BOARD().gfxLayout;
    var gfxId = gfxLayout[matrixCoord[1]][matrixCoord[0]]
    var asset = this.returnAsset( gfxId, 'id' );

    if( !_.isUndefined( asset ))
      return {
        asset: asset,
        gfxId: gfxId
      }

    return false;
  },

  /**
   * Finds real-world coordinates from 2d array-maps
   * @param  {Array} path  The path to translate
   * @param  {Array} gridItems An array of items in the grid, with 2d and rw attributes
   * @return {Array}
   */
  matrixRouteToCoordinates: function (path, gridItems) {
    var posArray = _.map( path, function( node, index ) {
      var foundItem = _.find( gridItems, function( item ) {
        if(( node[0] === item.gridCoord[0] ) && ( node[1] === item.gridCoord[1] ))
          return item;
      });

      var props = {};

      // Validate found item
      if( !_.isUndefined( foundItem )) {
        props = {
          gridCoord: foundItem.gridCoord,
          xPos: foundItem.xPos,
          yPos: foundItem.yPos,
          empty: foundItem.empty
        }
      }

      // Return new artificial position obj
      else {
        props = {
          gridCoord: [-1, -1],
          xPos: 0,
          yPos: 0,
          empty: true
        }
      }

      return props;
    })

    return posArray;
  },

  /**
   * Moves all frame reg-points to the center.
   * USE WITH CAUTION:  Adjusting the internals invalidates pixel-snapping
   * @param  {Sprite} bitmapAnimation
   */
  centerSpriteSheetRegPoint: function (sprite) {
    _.each( sprite.spriteSheet._frames, function( frame ) {
      frame.regX = frame.rect.width * .5
      frame.regY = frame.rect.height * .5
    });
  },

  /**
   * Animates a spritesheet once and then returns to old position
   * @param  {c.Sprite} spritesheet
   * @param  {String} frameLabel the frame label
   */
  animateOnce: function (spritesheet, frameLabel, callback) {
    spritesheet.on('animationend', function() {
      if(callback)
        callback()

      this.gotoAndStop( frameLabel )
    });
    spritesheet.gotoAndPlay( frameLabel );
  },

  /**
   * Centers a sprite or displayobject around a registration point
   * @param  {DisplayObjectContainer|Array} displayObject A DO or array of DO's to
   * center registration point around
   */
  centerRegistrationPoint: function (displayObject) {
    if (typeof displayObject === 'undefined')
      return

    if (displayObject instanceof Array) {
      _.each( displayObject, function (obj) {
        var bounds = obj.getBounds()
        obj.regX = Math.floor( bounds.width * .5 )
        obj.regY = Math.floor( bounds.height * .5 )
      })

      return
    }

    var bounds = displayObject.getBounds()
    displayObject.regX = Math.floor( bounds.width * .5 )
    displayObject.regY = Math.floor( bounds.height * .5 )
  },

  /**
   * Util for dragging display objects to aproximate positioning
   * @param  {Array} objArr An array of display objects to drag
   *
   */
  dragObject: function (objects) {
    if (! (objects instanceof Array))
      objects = [objects]

    _.each( objects, function( displayObject ) {

      if( displayObject instanceof c.Sprite ) {
        name = displayObject.spriteSheet._images[0].attributes[0].nodeValue;
      }
      else if( displayObject instanceof c.Bitmap) {
        name = displayObject.image.attributes[0].nodeValue;
      }
      else {
        name = '';
      }

      displayObject.on('mousedown', function (event) {
        var target = event.currentTarget

        var offset = {
          x: displayObject.x - event.stageX,
          y: displayObject.y - event.stageY
        };

        target.on('pressmove', function (ev) {
          var x = ev.stageX+offset.x;
          var y = ev.stageY+offset.y;

          displayObject.x = x;
          displayObject.y = y;

          console.log( x + ', ' + y, ' > ' + name );
        })
      })
    });
  },

  /**
   * Check to see if we're a supported mobile device
   * @return {Boolean} true if mobile, false if not
   */
  isMobile: function () {
    if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/iPhone|iPad|iPod/i) || navigator.userAgent.match(/IEMobile/i))
      return true;

    return false;
  },

  isIOS: function () {
    if (navigator.userAgent.match(/iPhone|iPad|iPod/i))
      return true;

    return false;
  },

  isAndroid: function () {
    if (navigator.userAgent.match(/Android/i))
      return true

    return false
  },

  isIE: function (){
    if (navigator.userAgent.match(/IE/i))
      return true

    return false
  },

  isWithinBounds: function (point, bounds) {
    if (!bounds.width || !bounds.height )
      return

    if (point.x >= bounds.x && point.x <= (bounds.x + bounds.width))
      if (point.y >= bounds.y && point.y <= (bounds.y + bounds.height))
        return true

    return false
  },

  returnPointsBetweenPoints: function (point1, point2, num) {
    var d0 = (point2.x - point1.x) / (num + 1)
      , d1 = (point2.y - point1.y) / (num + 1)
      , points = []

    for (var i = 1; i <= num; i++) {
      points.push({
        x: point1.x + d0 * i,
        y: point1.y + d1 * i
      })
    }
    return points
  },

  /**
   * Returns a random nunber within two ranges
   * @param {Number} min
   * @param {Number} max
   */
  randRange: function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  /**
   * Returns a random hex color
   *
   */
  returnRandomHexColor: function() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for ( var i = 0; i < 6; i++ ) {
      color += letters[ Math.round( Math.random() * 15 ) ];
    }

    return color;
  },

  /**
   * convert our score to a 4 digit number
   * @param  {int} $scoreInt an int holding our current score
   * @return {string} a 4 digit string
   */
  convertScore: function (scoreInt) {
    var scoreStr = scoreInt+"";
      while (scoreStr.length < 4) { scoreStr = "0" + scoreStr; }
      return scoreStr;
  },

  /**
   * Rotates a 2-Dimensional array to the right
   * @param  {Array} array
   */
  rotateArrayRight: function (array) {
    var transformedArray = new Array();
    var aLen = array[0].length;
    for( var i = 0; i < aLen; i++ ) {
      transformedArray[i] = new Array();

      // Fill the row with everything in the appropriate column of the source array
      var transformedArrayColumn = -1;
      var bLen = array.length - 1;
      for ( var j = bLen; j > -1; j-- ) {
        transformedArrayColumn++;
        transformedArray[i][transformedArrayColumn] = array[j][i]
      }
    }

    return transformedArray;
  },

  /**
   * Rotates a 2-Dimensional array to the left
   * @param  {Array} array
   */
  rotateArrayLeft: function (array)  {
    var transformedArray = new Array();

    var row = -1;
    var aLen = array[0].length;
    for( var i = aLen - 1; i > -1; i-- ) {
      row++;
      transformedArray[row] = new Array();

      var bLen = array.length;
      for ( var j = 0; j < bLen; j++ ) {
        transformedArray[row][j] = array[j][i];
      }
    }

    return transformedArray;
  },

  truncateText: function (str, len) {
    str = str.substr(0, len)

    if (str.length > (len - 1))
      str += '...'

    return str
  },

  bounceScreen: function ($el) {
    TweenMax.to($el, .1, {
      scale: 1.1,
      yoyo: true,
      repeat: 3
    })
  },

  rattleScreen: function ($el) {
    TweenMax.to($el, .1, {
      rotation: -5,
      onComplete: function() {
        TweenMax.to($el, .1, {
          rotation: 5,
          onComplete: function() {
            TweenMax.to($el, .1, {
              rotation: 0,
            })
          }
        })
      }
    })
  },

  /**
   * Takes a string of the format `path.mp3|path.ogg' and returns a fully qualified
   * url for AudioJS to load
   * @param  {String} fileName the formatted filename to parse
   * @param  {String} basePath the base url path
   * @return {String}
   */
  returnFullAudioPath: function (fileName, basePath) {
    var fileTypes = fileName.split('|')
    fileName = _.map(fileTypes, function (file) {
      return basePath + file
    }).join('|')

    return fileName
  }
}

module.exports = Easel;
