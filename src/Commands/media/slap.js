/** @format */

const { MessageEmbed } = require("discord.js");
const Command = require("../../Structures/Command.js");
const config = require("../../Data/config.json");

const MAIN_COLOR = config.MAIN_COLOR;

const API = require('anime-images-api')
const images_api = new API() 

module.exports = new Command({
	name: "slap",
	description: "Tát người khác!",
	directory: "media",
	usage: "[@user]",
	permission: "SEND_MESSAGES",
	async run(client, message, args) {

		const user = message.mentions.users.first()

		if (!user) {
			const m = await message.reply(":x: **| Bạn phải tag một người bất kì!**")
            if (m) setTimeout(() => m.delete(), 5000);
            return
		}

		images_api.sfw.slap().then(response => {
			const embed = new MessageEmbed()
				.setDescription(`**${message.author.tag} tát ${user.tag}!**`)
				.setColor(MAIN_COLOR)
				.setImage(response.image)

			message.channel.send({embeds: [embed]});
        })

	}
});
