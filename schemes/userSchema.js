const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    id: Number,
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = userSchema;