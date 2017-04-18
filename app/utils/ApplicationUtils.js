'use strict';

var RgbLightModel = require('../model/RgbLightModel'),
    LightChangeModel = require('../model/LightChangeModel'),
    nodeCron = require('node-cron'),
    raspberryLights = require('../raspberry/Light'),
    cronSchedules = [],
    cronScheduleIndex = 0;

var MAX_RGB_LIGHTS_COUNT = 5;

exports.populateRgbLightsDb = function () {
    for (var i = 0; i <= MAX_RGB_LIGHTS_COUNT; i++) {
        var rgbLightEntry = new RgbLightModel();

        var rgbValue = 255 * (i * (10 / MAX_RGB_LIGHTS_COUNT) * 10) / 100;
        rgbLightEntry.red = rgbValue;
        rgbLightEntry.green = rgbValue;
        rgbLightEntry.blue = rgbValue;
        rgbLightEntry.title = "white" + i;
        rgbLightEntry.color_id = i;

        rgbLightEntry.save()
            .then(function (doc) {
                console.log(doc);
            })
            .catch(function (err) {
                if (err && err.code != 11000) { // no message for dup key...
                    console.log(err.stack);
                }
            });
    }
};

exports.loadLightChange = function () {
    LightChangeModel.find({})
        .populate('_rgbLight')
        .exec()
        .then(function (docs) {
            for (var i in docs) {
                setCronJob(docs[i]);
            }
        })
};

function setCronJob(lightChange) {
    var timeToChange = lightChange.time;
    var nodeCronTime = timeToChange.getSeconds() + " " + timeToChange.getMinutes() + " " + timeToChange.getHours() + " * * *";

    nodeCron.schedule(nodeCronTime, function () {
        console.log("Change lights...");
    });
}

exports.isInt = function (value) {
    if (isNaN(value)) {
        return false;
    }
    var x = parseFloat(value);
    return (x | 0) === x;
};