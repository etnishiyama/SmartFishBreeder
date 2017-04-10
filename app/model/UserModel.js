'use strict';

/* AdUser model */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: String,
    username: String,
    password: String,
    email: String
}, {
    timestamps: true
});

// Export model
module.exports = mongoose.model('User', UserSchema);