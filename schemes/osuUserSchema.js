const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    discordID: String,
    osuUsername: String,
    osuMode: String,
})

module.exports = userSchema;