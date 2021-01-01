const { WebhookClient } = require('discord.js');

exports.run = async (client, message, args, level) => {
    const link = "https://yt3.ggpht.com/ytc/AAUvwnhSSaF3Q-PyyTSis4EH6Cu8FZ32LNvkxI9Gl_rn=s900-c-k-c0x00ffffff-no-rj";
    const nick = "Gawr Gura";
    message.guild.channels.cache
        .find(channel => channel.id === message.channel.id)
        .createWebhook(nick, {
          avatar: link
        }).catch(e => client.logger.error(e))
        .then(async webhook => {
            await webhook.send("a");
            webhook.delete();
            message.delete();
        }).catch(e => client.logger.error(e));
  };
  
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['A'],
    permLevel: "User", // IMPORTANT! SET THIS EARLY!!!
    logCommand: false
  };
  
  exports.help = { // MOST IMPORTANT COMMAND PART!!!!!!!!!!!
    name: "a",
    category: "Hololive",
    description: "A",
    usage: "a"
  };