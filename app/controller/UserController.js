var user = require('../model/UserModel'),
    jwt = require('jsonwebtoken'),
    secret = require('../../config/secret');

exports.insertUser = function (req, res) {
    var newUser = new user(req.body);

    newUser.save()
        .then(function (doc) {
            res.json({
                success: true,
                result: doc
            });
        }, function (err) {
            console.log(err.stack);
            res.status(500).end("Error: " + err.message);
        });
};

exports.getUsers = function (req, res) {
    user.find().exec(function (err, docs) {
        if (err) {
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
    user.findOne({username: req.body.username})
        .exec()
        .then(function (doc) {
            if (doc) {
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
        })
        .catch(function (err) {
            console.log(err);
        })
};