exports.run = async (client, message, args, level) => {
    if(!message.reference) {
        return message.channel.send("You have to reply to the message you want to cenzor!");
    } else {
        message.channel.messages.fetch(message.reference.messageID).then(msg => {
            msg.delete();
            message.channel.send("Powiedz tak cenzurze!");
        })
    }
  };
  
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["cenzura"],
    permLevel: "User", // IMPORTANT! SET THIS EARLY!!!
    logCommand: false,
    perk: "cenzura"
  };
  
  exports.help = { // MOST IMPORTANT COMMAND PART!!!!
    name: "cenzor",
    category: "Miscelaneous",
    description: "You have to have cenzura perk to use this command!",
    usage: "(while replying to a message) holo cenzura"
  };