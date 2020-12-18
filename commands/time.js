exports.run = async (client, message, args, level) => {
    let date = new Date();
    let hour = date.getHours();
    let minutes = date.getMinutes();
    let shion = client.emojis.get('789583909348048947');
    if(minutes < 30) return message.channel.send(`Less than a quarter ${shion} has passed after ${hour}!`);
    else return message.channel.send(`It's less than a quarter ${shion} to ${hour+1}!`);
  };
  
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['shion'],
    permLevel: "User", // IMPORTANT! SET THIS EARLY!!!
    logCommand: false
  };
  
  exports.help = { // MOST IMPORTANT COMMAND PART!!!!!!!!!!!
    name: "time",
    category: "Hololive", 
    description: "return the current time of the day",
    usage: "time"
  };