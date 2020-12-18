module.exports = (client) => {
  console.log(`Bot started in ${client.channels.size} channels on ${client.guilds.size} servers.`);
  client.user.setActivity(`${client.settings.prefix}help`, {type: "PLAYING"});
}