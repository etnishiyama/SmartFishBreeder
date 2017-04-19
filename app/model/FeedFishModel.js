'use strict';

var mongoose = require('mongoose'),
    schema = mongoose.Schema;

var feedFishSchema = new schema({
    speed: Number,
    steps: Number,
    time: Date
}, {
    timestamps: true
});

module.exports = mongoose.model('FeedFish', feedFishSchema);