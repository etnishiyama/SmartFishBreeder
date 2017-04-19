var express = require('express'),
    path = require('path'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    mongoose = require('mongoose'),
    raspberry = require('./app/raspberry/PinOut'),
    applicationUtils = require('./app/utils/ApplicationUtils'),
    raspberryLights = require('./app/raspberry/Light'),
    raspberryStepper = require('./app/raspberry/StepperMotor'),
    app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Db connection
var connectDb = function () {
    var options = {
        server: {
            socketOptions: {
                keepAlive: 1
            }
        }
    };
    mongoose.Promise = global.Promise;
    mongoose.set('debug', true);
    mongoose.connect('mongodb://localhost/fishbreeder', options);
};
connectDb();

raspberryLights.loadLightChange();
raspberryStepper.updateFeeding();

var db = mongoose.connection;
db.on('error', console.log);
db.on('disconnected', connectDb);

// Routes config
require('./config/routes')(app);

// Setup the application
console.log("Setting up the application...");
// Populate db with default light values
applicationUtils.populateRgbLightsDb();
console.log("Setup complete!");

// Home index
app.get('/', function(req, res) {
    res.sendFile('/index.html');
});

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.send('error');
});

module.exports = app;
