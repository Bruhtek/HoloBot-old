const { WebhookClient } = require('discord.js');

exports.run = async (client, message, args, level) => {

    const link = "https://yt3.ggpht.com/ytc/AAUvwngENhxNHPzV4jjip28G3vswMxutvkaBhBjAMS0i=s88-c-k-c0x00ffffff-no-rj";
    const nick = "Watson Amelia";
    message.guild.channels.cache
        .find(channel => channel.id === message.channel.id)
        .createWebhook(nick, {
            avatar: link}
        ).catch(e => client.logger.error(e))
        .then(async webhook => {
            await webhook.send("Thats what I did to your mom last night!");
            webhook.delete();
            message.delete();
        }).catch(e => client.logger.error(e));
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['amelia'],
    permLevel: "User", // IMPORTANT! SET THIS EARLY!!!
    logCommand: false,
    ratelimit: 60000
};

exports.help = { // MOST IMPORTANT COMMAND PART!!!!!!!!!!!
    name: "ame",
    category: "Hololive", //Currently used: Miscelaneous, System, Osu
    description: "Insult a person's mother",
    usage: "ame"
};