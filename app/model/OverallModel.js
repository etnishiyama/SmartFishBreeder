'use strict';

var mongoose = require('mongoose'),
    schema = mongoose.Schema;

// Overall model schema
var overallSchema = new schema({
    rgbLights: {
        type: schema.Types.ObjectId,
        ref: 'RgbLight'
    },
    user: {
        type: schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Overall', overallSchema);