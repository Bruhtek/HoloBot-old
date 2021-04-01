const mongoose = require('mongoose');
const userSchema = require.main.require('./schemes/userSchema.js');
const User = mongoose.model('user', userSchema, 'user');

const config = {
  // Bot Owner, level 10 by default. A User ID. Should never be anything else than the bot owner's ID.
  "ownerID": "273889248648757249",

  // Bot Admins, level 9 by default. Array of user ID strings.
  "admins": ["273889248648757249"],


  //DONT LEAVE ANYTHING BLANK
  "defaultSettings" : {
    "prefix": "holo ",
    "modRole": "Moderator",
    "adminRole": "Administrator",
    "systemNotice": "true", // This gives a notice when a user tries to run a command that they do not have permission to use.
  },

  neeeChance: 10,

  messageLevelRatelimit: 60000,
  ratelimit: 4000,

  port: 8080,

  // PERMISSION LEVEL DEFINITIONS.
  permLevels: [
    // This is the lowest permisison level, this is for non-roled users.
    { level: 0,
      name: "User", 
      // Don't bother checking, just return true which allows them to execute any command their
      // level allows them to.
      check: () => true
    },

    //#region Server Mod and Admin 
    // // This is your permission level, the staff levels should always be above the rest of the roles.
    // { level: 5,
    //   // This is the name of the role.
    //   name: "Moderator",
    //   // The following lines check the guild the message came from for the roles.
    //   // Then it checks if the member that authored the message has the role.
    //   // If they do return true, which will allow them to execute the command in question.
    //   // If they don't then return false, which will prevent them from executing the command.
    //   check: (message) => {
    //     try {
    //       const modRole = message.guild.roles.cache.find(r => r.name.toLowerCase() === message.settings.modRole.toLowerCase());
    //       if (modRole && message.member.roles.has(modRole.id)) return true;
    //     } catch (e) {
    //       return false;
    //     }
    //   }
    // },

    // { level: 6,
    //   name: "Administrator", 
    //   check: (message) => {
    //     try {
    //       const adminRole = message.guild.roles.cache.find(r => r.name.toLowerCase() === message.settings.adminRole.toLowerCase());
    //       return (adminRole && message.member.roles.has(adminRole.id));
    //     } catch (e) {
    //       return false;
    //     }
    //   }
    // },
    //#endregion

    // This is the server owner.
    { level: 7,
      name: "Server Owner", 
      // Simple check, if the guild owner id matches the message author's ID, then it will return true.
      // Otherwise it will return false.
      check: (message) => message.channel.type === "text" ? (message.guild.ownerID === message.author.id ? true : false) : false
    },

    // Bot Admin has some limited access like rebooting the bot or reloading commands.
    { level: 9,
      name: "Bot Admin",
      check: (message) => config.admins.includes(message.author.id)
    },

    // This is the bot owner, this should be the highest permission level available.
    // The reason this should be the highest level is because of dangerous commands such as eval
    { level: 10,
      name: "Bot Owner", 
      check: (message) => message.client.config.ownerID === message.author.id
    }
  ]

};

async function getUser (message) {
  var user =  await User.findOne({ id: message.author.id });
  
  if(!user) {
    user = new User({
      id: message.author.id,
      perks: [],
      xpadd: 0,
      xpmulti: 0,
      ratelimit: -1,
    }).save();
  }

  return user;
}

module.exports = {
  config,
  getUser
};
