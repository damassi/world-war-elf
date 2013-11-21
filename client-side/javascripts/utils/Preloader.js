
/**
 * Generic PreloadJS preloader.  Pass in a manifest and a callback
 *
 * @author Christopher Pappas
 * @since  11.19.13
 *
 * @dependencies: PreloadJS
 */


var Preloader = {


  /**
   * The loader queue to preload
   * @type {LoadQueue}
   */
  _loadQueue: null,

  /**
   * The file manifest to load
   * @type {Array}
   */
  _fileManifest: null,

  /**
   * Callback for successful loads
   * @type {Function}
   */
  _completeCallback: null,

  /**
   * Callback for error loads
   * @type {Function}
   */
  _errorCallback: null,


  /**
   * Initializes the preloader
   * @param  {Object} options An options hash consisting of
   *   - fileManifest : {Array}
   *   - success      : {Function}
   *   - error        : {Function}
   *
   * @return {void}
   */

  initialize: function (options) {
    _.bindAll(this)

    console.log(q)

    this._fileManifest = options.fileManifest || new Error( 'Preloader Error: A file manifest must be defined' )
    this._completeCallback = options.onComplete || function() {}
    this._errorCallback    = options.onError || function() {}
    this._progressCallback = options.onProgress || function() {}
    this._onFileLoadCallback = options.onFileLoad || function() {}

    this._loadQueue = new createjs.LoadQueue();

    this._addEventListeners()
  },



  start: function () {
    this._loadQueue.loadManifest( this._fileManifest )
  },



  destroy: function () {
    this._removeEventListeners()
  },




  //--------------------------------------
  //+ EVENT HANDLERS
  //--------------------------------------



  _onLoadComplete: function (event) {
    this._removeEventListeners()

    _.delay( this._completeCallback, 0 )
  },



  _onLoadError: function (event) {},



  _onLoadProgress: function (event) {
    this._progressCallback( event )
  },



  _onFileLoad: function (event) {
    this._onFileLoadCallback( event )
  },



  _onFileProgress: function (event) {},




  //+ PRIVATE METHODS
  //----------------------------------------------------------------


  _addEventListeners: function () {
    this._loadQueue.addEventListener( "complete", this._onLoadComplete )
    this._loadQueue.addEventListener( "error", this._onLoadError )
    this._loadQueue.addEventListener( "fileload", this._onFileLoad )
    this._loadQueue.addEventListener( "progress", this._onLoadProgress )
  },



  _removeEventListeners: function () {
    this._loadQueue.removeEventListener( "complete", this._onLoadComplete )
    this._loadQueue.removeEventListener( "error", this._onLoadError )
    this._loadQueue.removeEventListener( "fileload", this._onFileLoad )
    this._loadQueue.removeEventListener( "progress", this._onLoadProgress )
  }
}

module.exports = Preloader
