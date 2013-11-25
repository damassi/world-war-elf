holiday app production environment
==================================

The holiday-app runs via an Upstart script in:

    /etc/init/holiday-app.conf

Site can be started and stopped using upstart:

    start holiday-app
    stop holiday-app
    status holiday-app

Log file is at:

    /var/log/upstart/holiday-app.log

Site lives at:

    /var/www/games.wordfly.com

The app is run using the forever module, with the `-w` option to force an app restart when code changes.

Deploy a new build by unzipping app into /var/www/games.wordfly.com

If there are node_module updates, `sudo npm install` it the app root.



notes to devs
=============

### logging level

Web sockets have verbose logging by default, so please set level appropriate for production env:

    if ('production' == app.get('env')) {
      io.set('log level', 1);
    }


### ip and port

App to use ip and port passed in from environment:

    app.set('port', process.env.PORT || 3000);
    app.set('ip', process.env.IP || 'localhost');
    //...
    server.listen(app.get('port'), app.get('ip'), function(){
      console.log('holiday-app app.js (%s env) listening on http://%s:%s', app.get('env'), app.get('ip'), app.get('port'));
    });


### forever exclusions

Add exclusions to `.foreverignore` in root of repository


    pids/**
    logs/**
    path-to-file-being-modified.json
