const { WebhookClient } = require('discord.js');

module.exports = async (client, message) => {
  if (message.author.bot) return;

  const settings = message.settings = client.getSettings(message.guild);

  // Checks if the bot was mentioned, with no message after it, returns the prefix.
  
  const prefixMention = new RegExp(`^<@!?${client.user.id}>( |)$`);
  if (message.content.match(prefixMention)) {
    return message.reply(`My prefix on this guild is \`${client.settings.prefix}\``);
  }

  if(message.content.startsWith(`I'm `) && message.content.length > 4) {
    const link = "https://cdn.myanimelist.net/r/360x360/images/characters/12/413065.jpg?s=c9020da943303fdb7f40c4b2ab383bbb";
    const nick = `Marine "Senchou" Houshou`;
    message.guild.channels.cache
        .find(channel => channel.id === message.channel.id)
        .createWebhook(nick, {
          avatar: link
        }).catch(console.log)
        .then(async webhook => {
            await webhook.send(`Hi ${message.content.slice(4)}`);
            await webhook.send("I'm HORNY!!!");
            webhook.delete();
        }).catch(e => client.logger.error(e));
  }

  if((message.content.startsWith('b') || message.content.startsWith('B')) && message.author.id == "600078171198586899") {
    message.react("🇦");
  }

  if(message.channel.parent.id == "786153273186975765" && !message.member.roles.cache.has("785422260063698974")) {
    message.delete();
    return;
  }

  // Also good practice to ignore any message that does not start with our prefix,
  // which is set in the configuration file.
  if (message.content.indexOf(client.settings.prefix) !== 0) return;

  // Here we separate our "command" name, and our "arguments" for the command.
  // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
  // command = say
  // args = ["Is", "this", "the", "real", "life?"]
  const args = message.content.slice(client.settings.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  // If the member on a guild is invisible or not cached, fetch them.
  if (message.guild && !message.member) await message.guild.fetchMember(message.author);

  // Get the user or member's permission level from the elevation
  const level = client.permlevel(message);

  // Check whether the command, or alias, exist in the collections defined
  // in app.js.
  const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
  // using this const varName = thing OR otherthign; is a pretty efficient
  // and clean way to grab one of 2 values!
  if (!cmd) return;

  // Some commands may not be useable in DMs. This check prevents those commands from running
  // and return a friendly error message.
  if (cmd && !message.guild && cmd.conf.guildOnly)
    return message.channel.send("This command is unavailable via private message. Please run this command in a guild.");

  if (level < client.levelCache[cmd.conf.permLevel]) {
    if (client.settings.systemNotice === "true") {
      if(cmd.conf.logCommand) {
        client.logger.warn(`[WARN] ${client.config.permLevels.find(l => l.level === level).name} ${message.author.username} tried to run ${cmd.help.name} which requires ${client.levelCache[cmd.conf.permLevel]} (${cmd.conf.permLevel})`);
      }
      return message.channel.send(`You do not have permission to use this command. Your permission level is ${level} (${client.config.permLevels.find(l => l.level === level).name}) This command requires level ${client.levelCache[cmd.conf.permLevel]} (${cmd.conf.permLevel})`);
    } else {
      return;
    }
  }

  // To simplify message arguments, the author's level is now put on level (not member so it is supported in DMs)
  // The "level" command module argument will be deprecated in the future.
  message.author.permLevel = level;
  
  message.flags = [];
  while (args[0] && args[0][0] === "-") {
    message.flags.push(args.shift().slice(1));
  }
  // If the command exists, **AND** the user has permission, run it.
  if(cmd.conf.logCommand) {
    client.logger.cmd(`[CMD] ${client.config.permLevels.find(l => l.level === level).name} ${message.author.username} (${message.author.id}) ran command ${cmd.help.name}`);
  }
  cmd.run(client, message, args, level);
};