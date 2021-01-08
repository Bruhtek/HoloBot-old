const { OpusEncoder } = require('@discordjs/opus');

exports.run = async (client, message, args, level) => {
    if (message.member.voice.channel) {
        const connection = await message.member.voice.channel.join();

        const dispatcher = connection.play('resources/audio/rushia.mp3');
        message.channel.send("NEEEEEEEEEEEEEEEEEEEEEEEEEEEE");

        dispatcher.on('start', () => {
            //
        });

        dispatcher.on('finish', () => {
            connection.disconnect();
        });

        // Always remember to handle errors appropriately!
        dispatcher.on('error', console.error);
    } else {
        return message.reply("join a voice channel first, bruh.");
    }
  };
  
  exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['ne', 'nee', 'neee', 'neeee', 'neeeee'],
    permLevel: "User", // IMPORTANT! SET THIS EARLY!!!
    logCommand: false,
    ratelimit: 60000
  };
  
  exports.help = { // MOST IMPORTANT COMMAND PART!!!!!!!!!!!
    name: "neee",
    category: "Hololive",
    description: "NEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE",
    usage: "neee"
  };