'use strict';

/* Route */
var express = require('express'),
    router = express.Router(),
    clockController = require('../controller/ClockController'),
    routeSecurity = require('../utils/SecurityLayer');

routeSecurity.addJwtSecurityToRouter(router);

router.get('/', clockController.getAllClockins);
router.post('/', clockController.insertClockin);

module.exports = router;