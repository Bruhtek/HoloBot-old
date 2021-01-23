const mongoose = require('mongoose');
var Int32 = require('mongoose-int32');

const userSchema = new mongoose.Schema({
    name: String,
    date: Date,
})

module.exports = userSchema;