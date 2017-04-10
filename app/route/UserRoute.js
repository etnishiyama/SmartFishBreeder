'use strict';

var express = require('express'),
    router = express.Router(),
    userController = require('../controller/UserController'),
    routeSecurity = require('../utils/SecurityLayer');

router.post('/authenticate', userController.authenticate);
router.post('/', userController.insertUser);
router.get('/test', userController.test);

routeSecurity.addJwtSecurityToRouter(router);

// Route without authentication
router.get('/', userController.getUsers);

// Export routes
module.exports = router;