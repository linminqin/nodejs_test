
/**
 * Module dependencies.
 */

var express = require('express');
var route = require('./route');
var http = require('http');
var path = require('path');
var ejs = require('ejs');
var log = require('./log');

var app = express();

//日志
log.use(app);

// all environments
app.set('port', process.env.PORT || 13001);
app.set('views', path.join(__dirname, 'views'));

app.engine('.html', ejs.__express);
app.set('view engine', 'html');
//app.set('view engine', 'ejs');

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//分发
route(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
