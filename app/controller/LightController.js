'use strict';

var RgbLightModel = require('../model/RgbLightModel'),
    raspberry = require('../raspberry/PinOut'),
    raspberryLights = require('../raspberry/Light'),
    lightChangeModel = require('../model/LightChangeModel'),
    appUtils = require('../utils/ApplicationUtils');

exports.getAllRgbLights = function (req, res) {
    RgbLightModel.find().exec()
        .then(function (docs) {
            res.json({
                success: true,
                result: docs
            })
        })
        .catch(function (err) {
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
        .catch(function (err) {
            console.log(err);
        })
};

exports.createLightChangeEntry = function(req, res) {
    var newLightChangeModel = new lightChangeModel();
    newLightChangeModel.time = new Date(req.body.timestamp*1000);
    getRgbLight(req.body.color, function(rgbLight) {
        newLightChangeModel._rgbLight = rgbLight;

        newLightChangeModel.save()
            .then(function(doc) {
                res.json({
                    success: true,
                    result: doc
                })
            })
            .catch(function(err) {
                console.log(err);
            })
    });
};

exports.getRgbLightByColorNameOrId = function (req, res) {
    getRgbLight(req.params.color, function(rgbLight) {
        if(rgbLight) {
            res.json({
                success: true,
                result: rgbLight
            })
        } else {
            res.json({
                success: false,
                result: "Color id not found"
            })
        }
    });
};

function getRgbLight (color, callback) {
    RgbLightModel.findOne(appUtils.isInt(color) ? {color_id: color} : {name: color}).exec()
        .then(function (doc) {
            if (doc) {
                callback(doc);
            } else {
                callback(null);
            }
        })
        .catch(function (err) {
            console.log(err);
        })
}

exports.setRgbLightByColorNameOrId = function (req, res) {
    getRgbLight(req.params.color, function(rgbLight) {
        if (rgbLight) {
            var isLightChanged = raspberryLights.changeRgbLights(rgbLightIndex, rgbLight);

            if(isLightChanged) {
                res.json({
                    success: true,
                    result: "RGB lights changed to: " + doc.name
                })
            } else {
                res.json({
                    success: false,
                    result: "RGB lights not changed due to wrong index!"
                })
            }
        } else {
            res.json({
                success: false,
                result: "Color id not found"
            })
        }
    });
};