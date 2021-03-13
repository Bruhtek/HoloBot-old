var imgur = require('imgur');

exports.run = async (client, message, args, level) => {
    if(!args[0] || !args[1]) return message.reply("You haven't provided the date or the message id");
    var regexDate = /[0-9]+[0-9]+[.]+[0-9]+[0-9]/g;
    if(!args[1].match(regexDate) || args[1].length != 5) return message.reply("Please provide the date in the format of `day.month`, like `23.03`");

    var msg = await message.channel.messages.fetch(args[0]);
    if(!msg || msg.author.id != client.user.id) return message.reply("This message doesn't exist or it was not send by HoloBot!");

    var content = msg.content;
    var dzienFind = "Dzien **" + args[1] + "**";
    //var dzienRegex = /(Dzien )[*][*][0-9][0-9][.][0-9][0-9][*][*]/g;

    var dzien = content.indexOf(dzienFind);
    if(dzien == -1) {
        return message.reply("You provided wrong date! It isn't in this message!")
    } 

    dzien = content.indexOf(dzienFind) + 15;

    var reply = await client.awaitReply(message, "Type the title now! If you want to add any images, attach them to your message!");

    if(reply) {
        if(message.content) {
            var imgurUrl = "";
            if(reply.attachments.array()[0]) {
                var url = reply.attachments.array()[0].attachment;

                await imgur.setClientId(process.env.IMGURID);
                await imgur.uploadUrl(url).then(function (json) {
                    imgurUrl = " (" + json.link + ")";
                }).catch(function (err) {
                    console.error(err.message);
                })
            }
            var c = content.slice(0, dzien) + "\n" + " - " + reply.content + imgurUrl + content.slice(dzien);
            msg.edit(c);
        } else {
            return message.reply("Please type the title!");
        }
    } else {
        return message.reply("Timeout!");
    }
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
    description: "addevent messageID date",
    usage: "addevent 82012356123321 15.03"
};