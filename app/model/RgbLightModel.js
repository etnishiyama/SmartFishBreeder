'use strict';

var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

// MongoDb Schema
var rgbLightSchema = new Schema({
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

module.exports = Mongoose.model('RgbLight', rgbLightSchema);