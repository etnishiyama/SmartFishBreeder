'use strict';

var Express = require('express'),
    Router = Express.Router(),
    UserController = require('../controller/UserController'),
    RouteSecurity = require('../utils/SecurityLayer');

Router.post('/authenticate', UserController.authenticate);
Router.post('/', UserController.insertUser);

RouteSecurity.addJwtSecurityToRouter(router);

// Route without authentication
Router.get('/', UserController.getUsers);

// Export routes
module.exports = Router;