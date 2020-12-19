const { WebhookClient } = require('discord.js');

exports.run = async (client, message, args, level) => {

    const link = "https://pm1.narvii.com/7640/662f7c6af2dbeb26c31eed7c600a14307dac7c2er1-815-685v2_00.jpg";
    const nick = "Shirakami Fubuki";
    message.guild.channels
        .find(channel => channel.id === message.channel.id)
        .createWebhook(nick, link).catch(e => client.logger.error(e))
        .then(webhook => {
            const wb = new WebhookClient(`${webhook.id}`,`${webhook.token}`);
            wb.send(`Glasses are really versatile. First, you can have glasses-wearing girls take them off and suddenly become beautiful, or have girls wearing glasses flashing those cute grins, or have girls stealing the protagonist's glasses and putting them on like, "Haha, got your glasses!" That's just way too cute! Also, boys with glasses! I really like when their glasses have that suspicious looking gleam, and it's amazing how it can look really cool or just be a joke. I really like how it can fulfill all those abstract needs. Being able to switch up the styles and colors of glasses based on your mood is a lot of fun too! It's actually so much fun! You have those half rim glasses, or the thick frame glasses, everything! It's like you're enjoying all these kinds of glasses at a buffet. I really want Luna to try some on or Marine to try some on to replace her eyepatch. We really need glasses to become a thing in hololive and start selling them for HoloComi. Don't. You. Think. We. Really. Need. To. Officially. Give. Everyone. Glasses?`);
            wb.delete();
            message.delete();
        }).catch(e => client.logger.error(e));
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['fubuki'],
    permLevel: "User", // IMPORTANT! SET THIS EARLY!!!
    logCommand: false
};

exports.help = { // MOST IMPORTANT COMMAND PART!!!!!!!!!!!
    name: "glasses",
    category: "Hololive", //Currently used: Miscelaneous, System, Osu
    description: "Glasses are really versatile!",
    usage: "glasses"
};