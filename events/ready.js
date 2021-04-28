module.exports = (client) => {
  console.log(`Bot started in ${client.channels.cache.size} channels on ${client.guilds.cache.size} servers.`);
  client.user.setActivity(`${client.settings.prefix}help`, {type: "PLAYING"});

  client.crons.forEach(file => {
    const cronName = file.split(".")[0];
    client.logger.log(`Loading CronJob: ${cronName}`);
    const cron = require(`./../cronjobs/${file}`);
    cron.setup(client);
  });
}