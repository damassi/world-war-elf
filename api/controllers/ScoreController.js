/**
 * ScoreController which proxies wordfly scoreboard endpoint requests to the game
 *
 * organizations: 'http://10.100.10.50/zombieelves/organization.ashx',
 * postScore: 'http://10.100.10.50/zombieelves/submit.ashx?name={{ name }}&organizationId={{ organization }}&score={{ score }}',
 * topByOrg: 'http://10.100.10.50/zombieelves/view.ashx?org=yes',
 * topscores: 'http://10.100.10.50/zombieelves/view.ashx'
 *
 * @author Christopher Pappas
 * @date 12.14
 */

var _       = require('underscore')
  , request = require('request-json')
  , client  = request.newClient('http://10.100.10.50')


var urls = {
  organization  : '/zombieelves/organization.ashx',
  postScore     : '/zombieelves/submit.ashx?name={{ name }}&organizationId={{ organizationId }}&score={{ score }}',
  topByOrg      : '/zombieelves/view.ashx?org=yes',
  topScores     : '/zombieelves/view.ashx'
}

_.templateSettings = {
  'interpolate': /{{([\s\S]+?)}}/g
}

module.exports = {

  organizations: function (req, res, next) {
    client.get( urls.organization, function (error, response, body) {
      if (error) return res.json({
        error: 'Error returning organizations'
      })

      res.json({
        Organizations: body.Organizations
      })
    })
  },

  'post-score': function (req, res, next) {
    var name           = req.param('name')
      , organizationId = req.param('organizationId')
      , score          = req.param('score')

    var data = {
      name: name,
      organizationId: organizationId,
      score: score
    }

    var url = _.template( urls.postScore, data)

    client.get( url, function (error, response, body) {
      if (error)
        return res.json({
          error: 'Error submitting score'
        })

      res.json({
        success: true,
        Scores: body.Scores
      })
    })
  },

  'top-by-org': function (req, res, next) {
    client.get( urls.topByOrg, function (error, response, body) {
      if (error) return res.json({
        error: 'Error returning score'
      })

      res.json({
        Scores: body.Scores
      })
    })
  },

  'top-scores': function (req, res, next) {
    client.get( urls.topScores, function (error, response, body) {
      if (error) return res.json({
        error: 'Error returning top scores'
      })

      res.json({
        Scores: body.Scores
      })
    })
  }

};
