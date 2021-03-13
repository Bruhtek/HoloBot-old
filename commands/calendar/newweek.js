exports.run = async (client, message, args, level) => {

    if(!args[0] || !args[1]) return message.reply("You haven't provided at least one of the options!");
    var regexDate = /[0-9]+[0-9]+[.]+[0-9]+[0-9]/g;
    var match = args[0].length == 5 && args[1].length == 5 && args[0].match(regexDate) && args[1].match(regexDate);

    if(!match) return message.reply("Please provide the date in the format of `day.month`, like `23.03`");


    var content = "Tydzien: **" + args[0] + " - " + args[1] + "**";

    var msg = await message.channel.send(content);

    msg.edit(msg.content + `\n\nMessage ID: \`${msg.id}\``);
};
  
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['week'],
    permLevel: "Bot Owner", // IMPORTANT! SET THIS EARLY!!!
    logCommand: false
};

exports.help = {
    name: "newweek",
    category: "Calendar",
    description: "Create a new week for the calendar",
    usage: "newweek 15.03 19.03"
};