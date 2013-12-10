holiday app production environment
==================================

The app is run using the forever module to recover from errors in Node.js. 
There are npm scripts in the `package.json` to start and stop the app.

**Location**
`/var/www/games.wordfly.com`

**Starting** the app:
cd to the site's root: `cd /var/www/www.games.com`
Start app: `sudo npm run start-prod`
 
**Stopping** the app:
`sudo npm run stop-prod` 
OR `sudo forever stopall`

**Log file** is at:
`/var/log/upstart/holiday-app.log`

**Restarting** the app after code changes:
`sudo forever restartall`

**Deploying updates**
Deploy a new build by unzipping app into /var/www/games.wordfly.com

If there are node_module updates:
`cd /var/www/games.wordfly.com`
`sudo npm install`
`sudo forever restartall`


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


------------------------------


### Deprecated server setup using upstart, which was not working with Sails and the IP env command argument

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
