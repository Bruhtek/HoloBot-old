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
    return message.reply("You provided wrong mode! Aceptable modes are: `osu` `CtB` `taiko` `mania`");
  }

  osu.getUserRecent(player, async function(err, scores) {
    if (scores[0] == null) {
      return message.reply(
        "something went wrong! Are you sure the player username is correct AND they played in last **24 hours?**"
      );
    }
    if (err) {
      throw err;
    } else {
      const Mods = {       
        None: 0,
        NoFail: 1,
        Easy: 2,
        TouchDevice: 4,
        Hidden: 8,
        HardRock: 16,
        SuddenDeath: 32,
        DoubleTime: 64,
        Relax: 128,
        HalfTime: 256,
        Nightcore: 512, // Only set along with DoubleTime. i.e: NC only gives 576
        Flashlight: 1024,
        Autoplay: 2048,
        SpunOut: 4096,
        Relax2: 8192, // Autopilot
        Perfect: 16384, // Only set along with SuddenDeath. i.e: PF only gives 16416
        Key4: 32768,
        Key5: 65536,
        Key6: 131072,
        Key7: 262144,
        Key8: 524288,
        FadeIn: 1048576,
        Random: 2097152,
        Cinema: 4194304,
        Target: 8388608,
        Key9: 16777216,
        KeyCoop: 33554432,
        Key1: 67108864,
        Key3: 134217728,
        Key2: 268435456,
        ScoreV2: 536870912,
        Mirror: 1073741824
      };

      var m = "Mods: ";

      for (var i = 0; i < Object.keys(Mods).length; i++) {
        if (scores[0].enabled_mods & Mods[Object.keys(Mods)[i]]) {
          m = m + Object.keys(Mods)[i] + " ";
        }
      }

      if (m == "Mods: ") {
        m = "Mods: None";
      }

      osu.getBeatmap(scores[0].beatmap_id, function(err, beatmap) {
        const rank = message.client.emojis.cache.find(
          emoji => emoji.name === `grade${scores[0].rank}`
        );

        const embed = new MessageEmbed()
        .setTitle(`**Last score of ${player}**`)
        //.setAuthor("Ratatosk", "https://i.imgur.com/dpcrQeC.jpg")
        .setColor("#330036")
        .setThumbnail(`https://b.ppy.sh/thumb/${beatmap.beatmapset_id}l.jpg`)
        .setFooter("Osu!","https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Osu%21Logo_%282015%29.svg/1200px-Osu%21Logo_%282015%29.svg.png")
        .setTimestamp()
        .addField(`Beatmap: ${beatmap.title} [${beatmap.version}] | ID: ${scores[0].beatmap_id}`,`Difficulty: ${parseFloat(beatmap.difficultyrating).toFixed(2)}⭐ | ${m}`)
        .addField(`Score: ${scores[0].score} points`,`Grade: ***${rank}*** | ${scores[0].count300}/${scores[0].count100}/${scores[0].count50} |  Misses: ${scores[0].countmiss}`);
        message.channel.send({ embed });
      });
    }
  });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["orecent", "recent", "osulast", "olast"],
  permLevel: "User" // IMPORTANT! SET THIS EARLY!!!
};

exports.help = { // MOST IMPORTANT COMMAND PART!!!!!!!!!!!
  name: "osurecent",
  category: "Osu", //Currently used: Miscelaneous, System, Osu
  description: "Shows a Osu! player's most recent play in specified mode.",
  usage: "osurecent Mode Nickname"
};