const mongoose = require('mongoose');

const lastMessageSchema = new mongoose.Schema({
    userID: String,
    date: Date,
})

module.exports = lastMessageSchema;