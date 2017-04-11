'use strict';

var RgbLightModel = require('../model/RgbLightModel');
var MAX_RGB_LIGHTS_COUNT = 5;

var populateRgbLightsDb = function() {
    for(var i=0; i<=MAX_RGB_LIGHTS_COUNT; i++) {
        var rgbLightEntry = new RgbLightModel();

        var rgbValue = 255*(i*(10/MAX_RGB_LIGHTS_COUNT)*10)/100;
        rgbLightEntry.red = rgbValue;
        rgbLightEntry.green = rgbValue;
        rgbLightEntry.blue = rgbValue;
        rgbLightEntry.title = "white"+i;
        rgbLightEntry.color_id = i;

        rgbLightEntry.save(function(err, doc) {
            if (err && err.code != 11000) { // no message for dup key...
                console.log(err.stack);
            }
        })
    }
};

module.exports = {
    populateRgbLights: populateRgbLightsDb()
};