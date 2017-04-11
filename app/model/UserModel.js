'use strict';

/* AdUser model */
var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

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