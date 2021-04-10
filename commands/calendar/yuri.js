const date = require('date-and-time');

exports.run = async (client, message, args, level) => {
    const now = new Date();
    var yuriTime = date.parse('13:00:00 ' + date.format(now, 'DD-MM-YYYY'), 'HH:mm:ss DD-MM-YYYY');
    if(date.format(now, 'HH') >= 13) {
        yuriTime = date.addDays(yuriTime, 1);
    }
    const sec = Math.round(date.subtract(yuriTime, now).toSeconds());
    var hours = Math.trunc(sec/3600);
    var minutes = Math.trunc((sec%3600)/60);
    var seconds = Math.trunc(sec%60);
    message.channel.send("It's exactly `" + hours + "` hours, `" + minutes + "` minutes and `" + seconds + "` seconds to the next chapter of Yuri Empire!");
  };
  
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['yuriempire', 'yuri-empire'],
    permLevel: "User",
    logCommand: false
  };
  
  exports.help = {
    name: "yuri",
    category: "Calendar",
    description: "Time to next Yuri Empire chapter",
    usage: "yuri"
  };