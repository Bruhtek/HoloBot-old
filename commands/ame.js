const { WebhookClient } = require('discord.js');

exports.run = async (client, message, args, level) => {

    const link = "https://yt3.ggpht.com/ytc/AAUvwngENhxNHPzV4jjip28G3vswMxutvkaBhBjAMS0i=s88-c-k-c0x00ffffff-no-rj";
    const nick = "Watson Amelia";
    message.guild.channels
        .find(channel => channel.id === message.channel.id)
        .createWebhook(nick, link).catch(console.log)
        .then(webhook => {
            const wb = new WebhookClient(`${webhook.id}`,`${webhook.token}`);
            wb.send("Thats what I did to your mom last night!");
            wb.delete();
            message.delete();
        }).catch(e => client.logger.error(e));
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User", // IMPORTANT! SET THIS EARLY!!!
    logCommand: true
};

exports.help = { // MOST IMPORTANT COMMAND PART!!!!!!!!!!!
    name: "ame",
    category: "Hololive", //Currently used: Miscelaneous, System, Osu
    description: "Thats what I did to your mom last night!",
    usage: "ame"
};