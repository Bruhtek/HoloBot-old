const mongoose = require('mongoose');
var Int32 = require('mongoose-int32');

const guildUserSchema = new mongoose.Schema({
    id: String,
    totalXP: Int32,
    level: Int32,
    xp: Int32,
    guildId: String
})

module.exports = guildUserSchema;