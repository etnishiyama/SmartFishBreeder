var user = require('../model/UserModel'),
    jwt = require('jsonwebtoken'),
    secret = require('../../config/secret');

exports.insertUser = function(req, res) {
    var newUser = new user(req.body);

    newUser.save(function(err, doc) {
        if(err) {
            console.log(err.stack);
            res.status(500).end("Error: " + err.message);
        } else {
            res.json({
                success: true,
                result: doc
            });
        }
    })
};

exports.getUsers = function(req, res) {
    user.find(function (err, docs) {
        if(err) {
            console.log(err.stack);
            res.status(500).end("Error: " + err.message);
        } else {
            res.json({result: docs});
        }
    })
};


// Authenticate user on LDAP server
exports.authenticate = function (req, res) {
    // return token if user is on database
    user.findOne({username: req.body.username}, function (err, doc) {
        if (err) {
            console.log(err.stack);
        } else if (doc) {
            console.log("not null");
            var userObject = {
                username: req.body.username
            };

            var token = jwt.sign(userObject, secret.key, {
                expiresIn: '999d'
            });

            res.json({
                success: true,
                token: token
            });
        } else {
            res.json({
                success: false,
                message: "user not found!"
            });
        }
    });
};