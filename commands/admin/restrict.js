exports.run = async (client, message, args, level) => {
  e = message.guild.emojis.get(args[0]);
  const r = message.guild.roles.get(args[1]);
  e.addRestrictedRoles([r]);
};

exports.conf = {
  enabled: false,
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