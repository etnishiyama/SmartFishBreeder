'use strict';

var RgbLightModel = require('../model/RgbLightModel'),
    NodeCron = require('node-cron'),
    raspberry = require('../raspberry/PinOut'),
    raspberryLights = require('../raspberry/Light'),
    appUtils = require('../utils/ApplicationUtils');

NodeCron.schedule("0 * * * * *", function () {
    console.log("Change lights...");
});

exports.getAllRgbLights = function (req, res) {
    RgbLightModel.find().exec(function (docs) {
        res.json({
            success: true,
            result: docs
        })
    }, function (err) {
        console.log(err.stack);
        res.status(500).end("Error: " + err.message);
    });
};

exports.createRgbLightEntry = function (req, res, next) {
    var newRgbValues = new RgbLightModel({
        red: req.body.red,
        green: req.body.green,
        blue: req.body.blue,
        name: req.body.name
    });

    RgbLightModel.findOne({name: newRgbValues.name}).exec()
        .then(function (doc) {
            if (!doc) {
                return RgbLightModel.count().exec();
            } else {
                return res.json({
                    success: false,
                    result: "Name already exists!"
                })
            }
        })
        .then(function (count) {
            newRgbValues.color_id = count;
            return newRgbValues.save();
        })
        .then(function (doc) {
            if (doc) {
                return res.json({
                    success: true,
                    result: doc
                })
            }
        })
        .then(function (undefined, err) {
            console.log(err);
        })
};

exports.setRgbLightByColorNameOrId = function (req, res) {
    var color = req.params.color;
    RgbLightModel.findOne(appUtils.isInt(color) ? {color_id: color} : {name: color}).exec(function (err, doc) {
        if (err) {
            console.log(err.stack);
            res.status(500).end("Error: " + err.message);
        } else if (doc) {
            raspberryLights.changeRgbLights1(doc.red, doc.green, doc.blue);
            res.json({
                success: true,
                result: doc
            })
        } else {
            res.json({
                success: false,
                result: "Color id not found"
            })
        }
    })
};