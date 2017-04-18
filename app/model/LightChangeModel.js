'use strict';

const mongoose = require('mongoose'),
    schema = mongoose.Schema;

const lightChangeSchema = new schema({
    _rgbLight: {
        type: schema.Types.ObjectId,
        ref: 'RgbLight'
    },
    index: {
        type: Number,
        default: 1
    },
    time: Date
}, {
    timestamps: true
});

module.exports = mongoose.model('LightChange', lightChangeSchema);