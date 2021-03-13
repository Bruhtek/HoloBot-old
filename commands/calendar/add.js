exports.run = async (client, message, args, level) => {
    if(!args[0] || !args[1] || !args[2]) return message.reply("You haven't provided the date, message id or the title!");
    var regexDate = /[0-9]+[0-9]+[.]+[0-9]+[0-9]/g;
    if(!args[1].match(regexDate) || args[1].length != 5) return message.reply("Please provide the date in the format of `day.month`, like `23.03`");

    var msg = await message.channel.messages.fetch(args[0]);
    if(!msg || msg.author.id != client.user.id) return message.reply("This message doesn't exist or it was not send by HoloBot!");

    var content = msg.content;
    var dzienFind = "Dzien **" + args[1] + "**";
    var dzienRegex = /(Dzien )[*][*][0-9][0-9][.][0-9][0-9][*][*]/g;

    var dzien = content.indexOf(dzienFind);
    if(dzien == -1) {
        var toRemove = content.indexOf('Message ID:');
        var cont = content.slice(0, toRemove);
        var toAdd = content.slice(toRemove);
        
        var days = cont.match(dzienRegex);
        
        if(!days) {
            cont += "Dzien **" + args[1] + "**" + "\n\n";
        } else {
            var dates = [];
            days.forEach(day => {
                dates.unshift(day.slice(8, 13));
            });
            
            dates.forEach(date => {
                // month is equal, check only the day
                if(date.slice(0 , 2)*1 < args[1].slice(0, 2)*1 && date.slice(3 , 5)*1 == args[1].slice(3, 5)*1) {
                    console.log("d");
                }
                //month is higher, disregard everything else
                if(date.slice(3 , 5)*1 < args[1].slice(3, 5)*1) {
                    console.log("m");
                }
            });
        }

        msg.edit(cont + toAdd);
    } 

    dzien = content.indexOf(dzienFind) + 15;

    var c = content.slice(0, dzien) + "\n" + args[2] + content.slice(dzien);
    console.log(c);
    //msg.edit(c);
};
  
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['event', 'aevent'],
    permLevel: "Bot Owner", // IMPORTANT! SET THIS EARLY!!!
    logCommand: false
};

exports.help = {
    name: "addevent",
    category: "Calendar",
    description: "addevent messageID date title",
    usage: "addevent 82012356123321 15.03 Title is here"
};