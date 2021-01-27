exports.run = async (client, message, args, level) => {
    console.log(client);
    console.log(message);
  };
  
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "Bot Owner", // IMPORTANT! SET THIS EARLY!!!
    logCommand: false
  };
  
  exports.help = { // MOST IMPORTANT COMMAND PART!!!!
    name: "debug",
    category: "Miscelaneous",
    description: "debug",
    usage: "debug"
  };