holiday app production environment
==================================

The app is run using the forever module to recover from errors in Node.js. There are npm scripts in the `package.json` to start and stop the app (use sudo).

**Location**
`/var/www/games.wordfly.com`

**Starting** the app:
cd to the site's root: 
`cd /var/www/www.games.com`
Start the app: 
`sudo npm run start-prod`
 
**Stopping** the app:
`sudo npm run stop-prod` 
OR `sudo forever stopall`

**Log file** is at:
`/var/log/upstart/holiday-app.log`
If you want to watch it:
`sudo tail -f /var/log/upstart/holiday-app.log`

**Restarting** the app after code changes:
`sudo forever restartall`

**Deploying updates**

* Copy the local .zip file to the server
`scp GITSHA.wordfly-holiday-dist.zip  USERNAME@SERVERNAME:/home/USERNAME1`

* ssh into the server
`ssh USERNAME@SERVERNAME`

* Unzip the .zip file to the target folder at /var/www/games.wordfly.
`sudo unzip FILENAME.zip -d /var/www/games.wordfly.com/`

* If there are server-side updates, restart the app
`cd /var/www/games.wordfly.com`
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
