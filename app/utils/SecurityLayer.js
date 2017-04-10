'use strict';

var secret = require('../../config/secret');
var jwt = require('jsonwebtoken');

exports.addJwtSecurityToRouter = function (router) {
    router.use(function (req, res, next) {
        var token = req.headers['authorization'];

        if (token) {
            jwt.verify(token, secret.key, function (err, decoded) {
                if (err) {
                    console.log("Token error: " + err.message);
                    return res.json({
                        success: false,
                        message: 'Failed to authenticate token.'
                    });
                } else {
                    req.decoded = decoded;
                    next();
                }
            });

        } else {
            return res.status(403).send({
                success: false,
                message: 'No token provided.'
            });
        }
    });
};