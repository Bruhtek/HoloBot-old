module.exports = (client) => {
  console.log(`Bot started in ${client.channels.cache.size} channels on ${client.guilds.cache.size} servers.`);
  client.user.setActivity(`${client.settings.prefix}help`, {type: "PLAYING"});
}