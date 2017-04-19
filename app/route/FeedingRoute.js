'use strict';

var express = require('express'),
    router = express.Router(),
    feedingController = require('../controller/FeedingController'),
    routeSecurity = require('../utils/SecurityLayer');

// Require jwt token
//routeSecurity.addJwtSecurityToRouter(Router);

// Routes
router.get('/', feedingController.getAllFeedings);
router.post('/', feedingController.createNewFeeding);

module.exports = router;