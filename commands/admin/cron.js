var CronJob = require('cron').CronJob;

var channel;

function cron() {
    if(channel) {
        channel.send("Odpisz na rp lamusie");
    }
}

var rplamusie = new CronJob('*/30 8-23 * * *', cron, null, false, 'Europe/Warsaw');

exports.run = async (client, message, args, level) => {
    channel = message.channel;
    rplamusie.start();
  };
  
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "Bot Owner", // IMPORTANT! SET THIS EARLY!!!
    logCommand: false
};
  
  exports.help = { // MOST IMPORTANT COMMAND PART!!!!
    name: "cron",
    category: "Miscelaneous",
    description: "a",
    usage: "cron"
};

