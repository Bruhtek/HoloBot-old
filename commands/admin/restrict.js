const db = require('quick.db');

exports.run = async (client, message, args, level) => {
    // should we add or remove the property?
    if(args[0].toLowerCase() == "add") {
      var remove = false;
    } else if(args[0].toLowerCase() == "remove") {
      var remove = true;
    } else {
      return message.reply("Wrong restrict mode! Use `add` or `remove`!");
    }
    
    var toBan;

    //should we add it to channels or roles?
    if(args[1].toLowerCase() == "role") {
      var channel = false;
      toBan = message.guild.roles.cache.get(args[2]);
    } else if(args[1].toLowerCase() == "channel") {
      var channel = true;
      toBan = message.mentions.channels.first();
    } else {
      return message.reply("Wrong restrict mode! Use `role` or `channel`!");
    }

    var user = message.mentions.members.first();
    if(toBan == undefined || user == undefined) {
      message.reply("You either didn't mention any role/channel or user!");
    }
    
    var querry = "restricted." + user.id + "." + toBan.id;
    
    if(remove) {
      db.delete(querry);
    } else {
      db.set(querry, true);
    }
    message.channel.send(args[0] + " successful to " + args[1] + ": `" + toBan.name + "`, for: `"+  user.displayName + "`");
    message.channel.send("Current status: `" + db.get(querry) + "`");
  };
  
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['r'],
    permLevel: "Bot Owner", // IMPORTANT! SET THIS EARLY!!!
    logCommand: false
  };
  
  exports.help = { // MOST IMPORTANT COMMAND PART!!!!
    name: "restrict",
    category: "Miscelaneous",
    description: "Restrict someones ability to write and/or to assign themself a role \n Available modes: add/remove role/channel. Use ID with roles and #mention with text channels",
    usage: "holo restrict add role 123456789 @person"
  };