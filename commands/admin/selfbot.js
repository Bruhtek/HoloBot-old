const { WebhookClient } = require('discord.js');

exports.run = async (client, msg, args, level) => {

  var person = msg.mentions.members.first();

  const link = person.user.avatarURL;
  const nick = person.user.username;
  console.log(nick);
  msg.guild.channels.cache
    .find(channel => channel.id === args[1])
    .createWebhook(nick, link).catch(console.log)
    .then(async webhook => {
      let message = args.slice(2).join(" ");
      await webhook.send(message);
      webhook.delete();
      msg.delete(1);
    }).catch(e => console.log(e));
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["sbot"],
  permLevel: "Bot Owner", // IMPORTANT! SET THIS EARLY!!!
  logCommand: true,
  ratelimit: 60000
};

exports.help = { // MOST IMPORTANT COMMAND PART!!!!!!!!!!!
  name: "selfbot",
  category: "System", //Currently used: Miscelaneous, System, Osu
  description: "Say something as someone!",
  usage: "sbot <nick> <channel id> <message>"
};