exports.run = async (client, message, args, level) => {
  const msg = await message.channel.send("Ping?");
  msg.edit(`Pong! Latency is ${msg.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User",
  logCommand: false
};

exports.help = {
  name: "ping",
  category: "Miscelaneous",
  description: "Check bot latency (How quickly it responds to commands).",
  usage: "ping"
};