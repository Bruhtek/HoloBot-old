const mongoose = require('mongoose');
var Int32 = require('mongoose-int32');
const guildUserSchema = require.main.require('./schemes/guildUserSchema.js')
const GuildUser = mongoose.model('guildUser', guildUserSchema, 'guildUser')

async function createGuildUser(id, totalXP, level, xp, guildId) {
  return new GuildUser({
    id,
    totalXP,
    level,
    xp,
    guildId,
  }).save()
}

async function findGuildUser(id, guildId) {
  return await GuildUser.findOne({ id: id, guildId: guildId })
}

exports.run = async (client, message, args, level) => {
    let user = await client.connector.then(async () => {
        return findGuildUser(message.author.id, message.guild.id)
    })
        
    if (!user) {
        user = await createGuildUser(message.author.id, 0, 0, 0, message.guild.id)
    }
    
    message.channel.send(`Your current level is __**${user.level}**__. You need __**${(5 * (Math.pow(user.level,2)) + (50 * user.level) + 100) - user.xp}**__xp to advance to the next level. Your total xp accumulated is __**${user.totalXP}**__`);

  };
  
  exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "User", // IMPORTANT! SET THIS EARLY!!!
    logCommand: false
  };
  
  exports.help = { // MOST IMPORTANT COMMAND PART!!!!
    name: "level",
    category: "Miscelaneous",
    description: "Lets you see your level",
    usage: "holo level"
  };