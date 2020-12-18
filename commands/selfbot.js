const { WebhookClient } = require('discord.js');

exports.run = async (client, msg, args, level) => {

  var person = msg.mentions.members.first();

  const link = person.user.avatarURL;
  const nick = person.user.username;
  console.log(nick);
  msg.guild.channels
    .find(channel => channel.id === args[1])
    .createWebhook(nick, link).catch(console.log)
    .then(webhook => {
      //webhook.edit("Buka (Minionki vibes)", link);
      const wb = new WebhookClient(`${webhook.id}`,`${webhook.token}`);
      let message = args.slice(2).join(" ");
      wb.send(message);
      wb.delete();
      msg.delete(1);
    }).catch(e => console.log(e));
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["sbot"],
  permLevel: "Bot Owner", // IMPORTANT! SET THIS EARLY!!!
  logCommand: true
};

exports.help = { // MOST IMPORTANT COMMAND PART!!!!!!!!!!!
  name: "selfbot",
  category: "System", //Currently used: Miscelaneous, System, Osu
  description: "Say something as someone!",
  usage: "sbot <nick> <channel id> <message>"
};