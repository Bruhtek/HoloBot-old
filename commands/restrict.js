exports.run = async (client, message, args, level) => {
  //command here
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "Bot Owner", // IMPORTANT! SET THIS EARLY!!!
  logCommand: true
};

exports.help = { // MOST IMPORTANT COMMAND PART!!!!!!!!!!!
  name: "restrict",
  category: "Miscelaneous", //Currently used: Miscelaneous, System, Osu
  description: "Restrist emoji to a specific role!",
  usage: "restrict :emoji: @role"
};