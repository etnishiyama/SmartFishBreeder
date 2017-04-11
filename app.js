var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var raspberry = require('./app/utils/Raspberry');
var ApplicationUtils = require('./app/utils/ApplicationUtils');

var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var connectDb = function () {
    var options = {
        server: {
            socketOptions: {
                keepAlive: 1
            }
        }
    };
    mongoose.connect('mongodb://localhost/fishbreeder', options);
};
connectDb();

var db = mongoose.connection;
db.on('error', console.log);
db.on('disconnected', connectDb);
app.use(morgan('dev'));

// Routes config
// RESTful API
require('./config/routes')(app);

console.log("Teste1...");
ApplicationUtils.populateRgbLights;

app.get('/', function(req, res) {
    res.sendFile('/index.html');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('error');
});

module.exports = app;
