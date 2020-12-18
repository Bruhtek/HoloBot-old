exports.run = async (client, message, args, level) => {
  message.guild.emojis.get('789260205275349042');
  const r = message.guild.roles.get("785422260063698974");
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