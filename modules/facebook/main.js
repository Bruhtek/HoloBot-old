const facebookLogin = require('ts-messenger-api').default;
const fs = require('fs');
const { MessageEmbed } = require("discord.js");
const login = require("facebook-chat-api");
const { getAverageColor } = require('fast-average-color-node');
var request = require('request').defaults({ encoding: null });

let fbDiscordChannelId = "857692851407552513";

exports.setup = async (client) =>
{
	const api = await facebookLogin({ appState: JSON.parse(fs.readFileSync('./appState.json').toString()) }, { listenEvents: true });
	login({ appState: JSON.parse(fs.readFileSync('./appState.json', 'utf8').toString()) }, async (err, apiUser) =>
	{
		let channel = client.channels.cache.get(fbDiscordChannelId);

		fs.writeFileSync('./appState.json', JSON.stringify(api.getAppState()));

		const listener = await api.listen();
		listener.on("message", async (msg) =>
		{
			// change this one for correct group
			if (msg.threadId != "3022302291231344") return;
			apiUser.getUserInfo([msg.senderId], async (err, data) =>
			{
				let profilePic = data[msg.senderId].thumbSrc;

				request.get(profilePic, function (error, response, body)
				{
					if (!error && response.statusCode == 200)
					{
						profileBase = "data:" + response.headers["content-type"] + ";base64," + Buffer.from(body).toString('base64');
						getAverageColor(profileBase).then(async (color) =>
						{
							const embed = new MessageEmbed()
								.setDescription(msg.body)
								.setColor(color.hex)
								.setAuthor(data[msg.senderId].name, profilePic)
								.setTimestamp()
							// if there is an attachment, check if it's a photo, and if yes, add it to the embed
							if (msg.attachments[0])
							{
								if (msg.attachments[0].type == 1)
								{
									embed.setImage(msg.attachments[0].previewLarge.uri);
								}
							}

							await channel.send({ embed });
						});
					}
				});
			});
		})
	});
}
