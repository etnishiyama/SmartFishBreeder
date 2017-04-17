'use strict';

var PiBlaster = require('pi-blaster.js'),
    raspberry = require('./PinOut');

exports.changeRgbLights1 = function(red, green, blue) {
    PiBlaster.setPwm(raspberry.light1Pins.redGpioPin, red / 255);
    PiBlaster.setPwm(raspberry.light1Pins.greenGpioPin, green / 255);
    PiBlaster.setPwm(raspberry.light1Pins.blueGpioPin, blue / 255);
};

exports.changeRgbLights2 = function(red, green, blue) {
    PiBlaster.setPwm(raspberry.light2Pins.redGpioPin, red / 255);
    PiBlaster.setPwm(raspberry.light2Pins.greenGpioPin, green / 255);
    PiBlaster.setPwm(raspberry.light2Pins.blueGpioPin, blue / 255);
};