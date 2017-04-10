'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClockSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    time: Date
}, {
    timestamps: true
});

module.exports = mongoose.model('Clock', ClockSchema);