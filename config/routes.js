'use strict';

var user = require('../app/route/UserRoute');
var clock = require('../app/route/ClockRoute');

// Export master routes
module.exports = function(app) {
    app.use('/app/v1/user', user);
    app.use('/app/v1/clock', clock);
};