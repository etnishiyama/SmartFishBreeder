'use strict';

var PiBlaster = require('pi-blaster.js'),
    raspberry = require('./PinOut');

exports.changeRgbLights = function(index, rgbLight) {
    var lightChanged = true;
    switch(index) {
        case 1:
            console.log("index: "+index+" red: "+rgbLight.red);
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