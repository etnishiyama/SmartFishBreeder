'use strict';

var Express = require('express'),
    Router = Express.Router(),
    LightController = require('../controller/LightController'),
    routeSecurity = require('../utils/SecurityLayer');

// Require jwt token
routeSecurity.addJwtSecurityToRouter(Router);

// Routes
Router.get('/', LightController.getAllRgbLights);
Router.post('/rgb', LightController.createRgbLightEntry);
Router.post('/rgb/:color_id', LightController.setRgbLightByColorId);

module.exports = Router;