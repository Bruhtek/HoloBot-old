const mongoose = require('mongoose');
var Int32 = require('mongoose-int32');

const userSchema = new mongoose.Schema({
    id: String,
    perks: Array,
    xpadd: Int32,
    xpmulti: Number,
    ratelimit: Int32
})

module.exports = userSchema;