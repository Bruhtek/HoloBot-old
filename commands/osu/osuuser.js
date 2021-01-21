var osuapi = require("osu-api");
var osu = new osuapi.Api(process.env.OSUTOKEN);
const { MessageEmbed } = require("discord.js");

exports.run = async (client, message, args, level) => {
  let mode = args[0];
  let player = args[1];

  if(mode == undefined)
      return message.reply("You havent provided any correct mode. Accepted ones are `osu` `taiko` `CtB` `mania`");


  if(player == undefined)
      return message.reply("You havent provided any nickname");

  if (mode == "osu") {
    osu.setMode(osuapi.Modes.osu);
  } else if (mode == "taiko") {
    osu.setMode(osuapi.Modes.taiko);
  } else if (mode == "CtB") {
    osu.setMode(osuapi.Modes.CtB);
  } else if (mode == "mania") {
    osu.setMode(osuapi.Modes.osumania);
  } else {
    return message.reply("You provided wrong mode! Aceptable modes are: `osu` `CtB` `taiko` `mania` (case sensitive)");
  }

  osu.getUser(player, async function (err, profile) {
    if(profile == undefined) {
      return message.reply("sorry, I couldn't find that user! Check if you spelled his username correctly!")
    }

    const xh = message.client.emojis.cache.find(emoji => emoji.name === `gradeXH`);
    const x = message.client.emojis.cache.find(emoji => emoji.name === `gradeX`);
    const s = message.client.emojis.cache.find(emoji => emoji.name === `gradeS`);
    const sh = message.client.emojis.cache.find(emoji => emoji.name === `gradeSH`);
    const a = message.client.emojis.cache.find(emoji => emoji.name === `gradeA`);

    const embed = new MessageEmbed()
    .setTitle(`**:flag_${profile.country.toLowerCase()}:  ${player} profile (ID: ${profile.user_id}) :flag_${profile.country.toLowerCase()}:**`)
    //.setAuthor("Ratatosk", "https://i.imgur.com/dpcrQeC.jpg")
    .setColor("#330036")
    .setThumbnail(`http://s.ppy.sh/a/${profile.user_id}`)
    .setFooter(`Osu! Joined at: ${profile.join_date}`, "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Osu%21Logo_%282015%29.svg/1200px-Osu%21Logo_%282015%29.svg.png")
    .setURL(`https://osu.ppy.sh/users/${profile.user_id}`)
    .addField(`**Ranking**`, `**Rank: ${profile.pp_rank} Country rank: ${profile.pp_country_rank}**`)
    .addField(`**Scores count:**`, `${xh}: ${profile.count_rank_ssh} | ${x}: ${profile.count_rank_ss} | ${sh}: ${profile.count_rank_sh} | ${s}: ${profile.count_rank_s} | ${a}: ${profile.count_rank_a}`)
    .addField(`**Level: ${profile.level}** (Play Count: ${profile.playcount})`,`Accuracy: ${parseFloat(profile.accuracy).toFixed(2)} | PP: ${profile.pp_raw}`)
    .addField(`**Hit count:**`, `${profile.count300}/${profile.count100}/${profile.count50}`)
    .setDescription(`**:clock1130: Time played:** ${parseFloat(profile.total_seconds_played / 3600).toFixed(2)}h`)
    message.channel.send({ embed });
  });
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["ou", "ouser"],
  permLevel: "User" // IMPORTANT! SET THIS EARLY!!!
};

exports.help = { // MOST IMPORTANT COMMAND PART!!!!!!!!!!!
  name: "osuuser",
  category: "Osu", //Currently used: Miscelaneous, System, Osu
  description: "Shows a Osu! player's profile.",
  usage: "osuuser Mode Nickname"
};

