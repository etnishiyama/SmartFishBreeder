'use strict';

var express = require('express'),
    router = express.Router(),
    lightController = require('../controller/LightController'),
    routeSecurity = require('../utils/SecurityLayer');

// Require jwt token
//routeSecurity.addJwtSecurityToRouter(Router);

// Routes
router.get('/rgb', lightController.getAllRgbLights);
router.get('/rgb/:color', lightController.getRgbLightByColorNameOrId);
router.post('/rgb', lightController.createRgbLightEntry);
router.post('/rgb/change/:color', lightController.setRgbLightByColorNameOrId);
router.post('/rgb/change', lightController.createLightChangeEntry);

module.exports = router;