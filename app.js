var express = require('express');
var path = require('path');
var fs = require('fs');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var sassMiddleware = require('node-sass-middleware');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());

app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  debug: true,
  indentedSyntax: true,
  outputStyle: 'compressed'
}));

app.use(express.static(path.join(__dirname, 'public')));

var autoViews = {};
app.use(function (req, res, next) {
  if (req.path === '/') return res.redirect('/index');

  var path = req.path.toLocaleLowerCase();
  var locals = {
    isHome: path.includes('index')
  }

  if (autoViews[path]) return res.render(autoViews[path], locals);

  if (fs.existsSync(__dirname + '/views/pages' + path + '.pug')) {
    var viewPath = 'pages/' + path.replace(/^\//, '');
    autoViews[path] = viewPath;
    return res.render(autoViews[path], locals);
  }

  next();
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;