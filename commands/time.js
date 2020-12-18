exports.run = async (client, message, args, level) => {
    let date = new Date();
    let half = date.getHours() / 2 + (date.getMinutes() > 30 ? 0.5 : 0) + (date.getMinutes() >= 15 && date.getMinutes() <= 45 ? 0.25 : 0);
    let realtime = date.getHours() + ":" + date.getMinutes();
    message.channel.send(realtime + " => " + half);
  };
  
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['shion'],
    permLevel: "Bot Tester", // IMPORTANT! SET THIS EARLY!!!
    logCommand: false
  };
  
  exports.help = { // MOST IMPORTANT COMMAND PART!!!!!!!!!!!
    name: "time",
    category: "Hololive", 
    description: "return the current time of the day",
    usage: "time"
  };