const mongoose = require('mongoose');
const userSchema = require.main.require('./schemes/userSchema.js')
const User = mongoose.model('user', userSchema, 'user')

async function createUser(username, id) {
  return new User({
    username,
    id,
    date: Date.now()
  }).save()
}

async function findUser(username) {
  return await User.findOne({ username })
}


exports.run = async (client, message, args, level) => {
    try {
      connector = mongoose.connect( client.uri, {useNewUrlParser: true, useUnifiedTopology: true});
      const username = args[0];
      const id = message.author.id;
      
      let user = await connector.then(async () => {
        return findUser(username)
      })
      
      if (!user) {
        user = await createUser(username, id)
      }

      console.log(user);

      mongoose.connection.close();
    }catch (error) { 
      message.channel.send("could not connect");    
      client.logger.error(error);
    }
  };
  
  exports.conf = {
    enabled: false,
    guildOnly: false,
    aliases: [],
    permLevel: "Bot Tester", // IMPORTANT! SET THIS EARLY!!!
    logCommand: false
  };
  
  exports.help = {
    name: "save",
    category: "Miscelaneous",
    description: "...",
    usage: "..."
  };