const facebookLogin = require('ts-messenger-api').default;
const fs = require('fs');
const { MessageEmbed } = require("discord.js");
const login = require("facebook-chat-api");


let fbDiscordChannelId = "857692851407552513";

exports.setup = async (client) =>
{
	const api = await facebookLogin({ appState: JSON.parse(fs.readFileSync('./appState.json').toString()) }, { listenEvents: true });
	login({ appState: JSON.parse(fs.readFileSync('appstate.json', 'utf8').toString()) }, async (err, apiUser) =>
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
				const embed = new MessageEmbed()
					.setDescription(msg.body)
					.setColor("#0345fc")
					.setAuthor(data[msg.senderId].name, data[msg.senderId].thumbSrc)
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
		})
	});
}
