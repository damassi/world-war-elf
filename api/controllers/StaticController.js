/**
 * Static file templates
 *
 */


module.exports = {


  mobile: function (req, res) {
    res.view({
      view: '/static/mobile',
      layout: false,
    })
  }

};
