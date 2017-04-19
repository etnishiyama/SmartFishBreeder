'use strict';

var PiBlaster = require('pi-blaster.js'),
    raspberry = require('./PinOut'),
    nodeCron = require('node-cron'),
    LightChangeModel = require('../model/LightChangeModel'),
    cronSchedules = [],
    cronScheduleIndex = 0;

exports.changeRgbLights = function(index, rgbLight) {
    changeRgbLightsLocal(index, rgbLight);
};

function changeRgbLightsLocal (index, rgbLight) {
    var lightChanged = true;
    console.log("changeRgbLights index: "+index+" red: "+rgbLight.red+" green: "+rgbLight.green+" blue: "+rgbLight.blue);
    switch(index) {
        case 1:
            PiBlaster.setPwm(raspberry.light1Pins.redGpioPin, rgbLight.red / 255);
            PiBlaster.setPwm(raspberry.light1Pins.greenGpioPin, rgbLight.green / 255);
            PiBlaster.setPwm(raspberry.light1Pins.blueGpioPin, rgbLight.blue / 255);
            break;
        case 2:
            PiBlaster.setPwm(raspberry.light2Pins.redGpioPin, rgbLight.red / 255);
            PiBlaster.setPwm(raspberry.light2Pins.greenGpioPin, rgbLight.green / 255);
            PiBlaster.setPwm(raspberry.light2Pins.blueGpioPin, rgbLight.blue / 255);
            break;
        default:
            lightChanged = false;
            break;
    }

    return lightChanged;
};

exports.loadLightChange = function () {
    clearCronJobs();
    LightChangeModel.find({})
        .populate('_rgbLight')
        .exec()
        .then(function (docs) {
            for (var i in docs) {
                setCronJob(docs[i]);
            }
        })
};

function clearCronJobs() {
    for(var i=0; i<cronScheduleIndex; i++) {
        cronSchedules[i].stop();
    }
    cronSchedules = [];
    cronScheduleIndex = 0;
}

function setCronJob(lightChange) {
    var timeToChange = lightChange.time;
    var nodeCronTime = timeToChange.getSeconds() + " " + timeToChange.getMinutes() + " " + timeToChange.getHours() + " * * *";
    console.log("Light change cron scheduled: " + nodeCronTime + " color: ");

    cronSchedules[cronScheduleIndex] = nodeCron.schedule(nodeCronTime, function () {
        console.log("Lights changed at: " + new Date());
        changeRgbLightsLocal(lightChange.index, lightChange._rgbLight);
    });
    cronSchedules[cronScheduleIndex].start();
    cronScheduleIndex++;
}