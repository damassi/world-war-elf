/**
 * Ref to all assets used within the game, to be loaded by the Pixi.js asset
 * loader.  Dispatches a complete event on complete
 */


var AssetManifest = {

  /**
   * Game-related assets to load
   * @type {Array}
   */
  assets: [],

  /**
   * Instance of the PIXI AssetLoader
   * @type {PIXI.AssetLoader}
   */
  loader: null,


  /**
   * Load PIXI assets and dispatch complete to supplied callback
   * @param  {Object} options An options hash consisiting of `complete`
   * @return {void}
   */

  load: function (options) {
    this.loader = new PIXI.AssetLoader( this.assets )
    this.loader.onComplete = options.complete
    this.loader.load()
  }

}

module.exports = AssetManifest