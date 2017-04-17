'use strict';

/* AdUser model */
var mongoose = require('mongoose');
var schema = mongoose.Schema;

mongoose.set('debug', true);

var userSchema = new schema({
    name: String,
    username: String,
    password: String,
    email: String
}, {
    timestamps: true
});

// Export model
module.exports = mongoose.model('User', userSchema);