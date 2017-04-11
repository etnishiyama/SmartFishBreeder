'use strict';

var RgbLightModel = require('../model/RgbLightModel'),
    NodeCron = require('node-cron'),
    PiBlaster = require('pi-blaster.js'),
    raspberry = require('../utils/Raspberry');

NodeCron.schedule("0 * * * * *", function () {
    console.log("Change lights...");
});

exports.getAllRgbLights = function (req, res) {
    RgbLightModel.find(function (err, docs) {
        if (err) {
            console.log(err.stack);
            res.status(500).end("Error: " + err.message);
        } else {
            res.json({
                success: true,
                result: docs
            })
        }
    });
};

exports.createRgbLightEntry = function (req, res) {
    var newRgbValues = new RgbLightModel({
        red: req.body.red,
        green: req.body.green,
        blue: req.body.blue,
        name: req.body.name
    });

    RgbLightModel.findOne({name: newRgbValues.name}, function(err, doc) {
        if(err) {
            console.log(err.stack);
            res.status(500).end("Error: " + err.message);
        } else if(!doc) {
            RgbLightModel.count(function(err, doc) {
                if(err) {
                    console.log(err.stack);
                    res.status(500).end("Error: " + err.message);
                } else {
                    newRgbValues.color_id = doc
                    newRgbValues.save(function(err, doc) {
                        if(err) {
                            console.log(err.stack);
                            res.status(500).end("Error: " + err.message);
                        } else {
                            res.json({
                                success: true,
                                result: doc
                            })
                        }
                    });
                }
            });
        } else {
            res.json({
                success: false,
                result: "Name already exist"
            })
        }
    });
};

exports.setRgbLightByColorId = function(req, res) {
    RgbLightModel.findOne({color_id: req.params.color_id}, function(err, doc) {
        if(err) {
            console.log(err.stack);
            res.status(500).end("Error: " + err.message);
        } else if(doc) {
            changeRgbLights(doc.red, doc.green, doc.blue);
            res.json({
                success: true,
                result: "RGB lights changed by id"
            })
        } else {
            res.json({
                success: false,
                result: "Color id not found"
            })
        }
    })
};

var changeRgbLights = function(red, green, blue) {
    PiBlaster.setPwm(raspberry.pins.redGpioPin, red / 255);
    PiBlaster.setPwm(raspberry.pins.greenGpioPin, green / 255);
    PiBlaster.setPwm(raspberry.pins.blueGpioPin, blue / 255);
};