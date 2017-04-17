'use strict';

var mongoose = require('mongoose'),
    schema = mongoose.Schema;

mongoose.set('debug', true);

// Overall model schema
var overallSchema = new schema({
    rgbLights: {
        type: Schema.Types.ObjectId,
        ref: 'RgbLight'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Overall', overallSchema);