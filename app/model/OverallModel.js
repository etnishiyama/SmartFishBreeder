'use strict';

var Mongoose = require('mongoose'),
    Schema = Mongoose.Schema;

// Overall model schema
var OverallSchema = new Schema({
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

module.exports = Mongoose.model('Overall', OverallSchema);