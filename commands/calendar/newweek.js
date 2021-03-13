const date = require('date-and-time');

exports.run = async (client, message, args, level) => {

    if(!args[0]) return message.reply("You haven't provided at least one of the options!");
    var regexDate = /[0-9]+[0-9]+[.]+[0-9]+[0-9]/g;
    var match = args[0].length == 5 && args[0].match(regexDate);

    if(!match) return message.reply("Please provide the date in the format of `day.month`, like `23.03`");

    const now = new Date();
    const monday = date.parse(`${args[0]}.${date.format(now, 'YYYY')}`, 'DD.MM.YYYY');

    const weekDay = date.format(monday, 'dddd')
    if(weekDay != 'Monday') {
        return message.reply("The date you provided is not monday!");
    }

    var content = "```Tydzien: " + args[0] + " - " + date.format(date.addDays(monday, 4), 'DD.MM') + "```\n";

    for(var i = 0; i < 5; i++) {
        content += "🥳 `" + date.format(date.addDays(monday, i), 'dddd') + "` - **" + date.format(date.addDays(monday, i), 'DD.MM') + "**" + "\n\n";
    }

    var msg = await message.channel.send(content);

    msg.edit(msg.content + `\n\nMessage ID: \`${msg.id}\``);
};
  
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['week'],
    permLevel: "User", // IMPORTANT! SET THIS EARLY!!!
    logCommand: false
};

exports.help = {
    name: "newweek",
    category: "Calendar",
    description: "Create a new week for the calendar",
    usage: "newweek 15.03"
};