'use strict';

var LightRoutes = require('../app/route/LightsRoute'),
    FeedingRoutes = require('../app/route/FeedingRoute');

// Export master routes
module.exports = function (app) {
    app.use('/app/v1/lights', LightRoutes);
    app.use('/app/v1/feed', FeedingRoutes);
};