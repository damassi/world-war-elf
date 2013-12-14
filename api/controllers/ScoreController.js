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


module.exports = {


  organizations: function (req, res, next) {
    //req.pipe('http://10.100.10.50/zombieelves/organization.ashx').pipe( res )

    var organizations = []

    for (var i = 0; i < 10; i++){
      organizations.push({
        Name: 'Organization ' + i,
        Id: i
      })
    }

    res.json({
      Organizations: organizations
    })
  },


  'post-score': function (req, res, next) {
    var name         = req.param('name')
      , organization = req.param('organization')
      , score        = req.param('score')

    res.json({
      name: name,
      organization: organization,
      score: score
    })
  },


  'top-by-org': function (req, res, next) {

  },


  'top-scores': function (req, res, next) {

    var scores = []

    for (var i = 0; i < 10; i++){
      scores.push({
        Score: i,
        Name: 'Chris',
        Organization: 'POP'
      })
    }

    res.json({
      Scores: scores
    })
  }

};
