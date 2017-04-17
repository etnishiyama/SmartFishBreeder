'use strict';

var express = require('express'),
    router = express.Router(),
    lightController = require('../controller/LightController'),
    routeSecurity = require('../utils/SecurityLayer');

// Require jwt token
//routeSecurity.addJwtSecurityToRouter(Router);

// Routes
router.get('/rgb/', lightController.getAllRgbLights);
router.post('/rgb/', lightController.createRgbLightEntry);
router.post('/rgb/:color', lightController.setRgbLightByColorNameOrId);

module.exports = router;