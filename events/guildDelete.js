module.exports = (client, guild) => {
   if (!guild.available) return; // If there is an outage, return.
  
  client.logger.cmd(`[GUILD LEAVE] ${guild.name} (${guild.id}) removed the bot.`);
};