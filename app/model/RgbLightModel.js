'use strict';

var mongoose = require('mongoose');
var schema = mongoose.Schema;

mongoose.set('debug', true);

// MongoDb schema
var rgbLightSchema = new schema({
    color_id: {
        type: Number,
        unique: true
    },
    name: String,
    red: Number,
    green: Number,
    blue: Number
}, {
    timestamps: true
});

module.exports = mongoose.model('RgbLight', rgbLightSchema);