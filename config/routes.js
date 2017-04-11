'use strict';

var LightRoutes = require('../app/route/LightsRoute');

// Export master routes
module.exports = function(app) {
    app.use('/app/v1/lights', LightRoutes);
};