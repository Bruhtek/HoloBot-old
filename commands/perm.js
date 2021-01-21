exports.run = async (client, message, args, level) => {
    message.channel.send("Permissions level for `" + message.author.username + "` (`" + message.author.id + "`) is `" + client.config.permLevels.find(l => l.level === level).name + "` (`" + message.author.permLevel + "`)");
  };
  
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['perm'],
    permLevel: "User", // IMPORTANT! SET THIS EARLY!!!
    logCommand: false
  };
  
  exports.help = { // MOST IMPORTANT COMMAND PART!!!!
    name: "permlevel",
    category: "Miscelaneous",
    description: "Check your permission level. 8th level and up extempts you from ratelimits",
    usage: "holo permlevel"
  };