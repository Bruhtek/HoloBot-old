const mongoose = require('mongoose');
const grekSchema = require.main.require('./schemes/grekRejectionSchema.js')
const Grek = mongoose.model('grek', grekSchema, 'grek')

async function createGrek(name) {
  return new Grek({
    name,
    date: Date.now(),
  }).save()
}


exports.run = async (client, message, args, level) => {
    try {
      const name = args.join(' ');
      
      createGrek(name);

      message.channel.send("Not the first and not the last!");
      
    }catch (error) { 
      message.channel.send("Error: " + error);    
      client.logger.error(error);
    }
  };
  
  exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "User", // IMPORTANT! SET THIS EARLY!!!
    logCommand: false
  };
  
  exports.help = {
    name: "grek",
    category: "Miscelaneous",
    description: "add grek rejection",
    usage: "grek add (reason)"
  };