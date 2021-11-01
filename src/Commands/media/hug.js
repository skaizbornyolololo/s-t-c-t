/** @format */

const { MessageEmbed } = require("discord.js");
const Command = require("../../Structures/Command.js");
const config = require("../../Data/config.json");

const MAIN_COLOR = config.MAIN_COLOR;

const API = require('anime-images-api')
const images_api = new API() 

module.exports = new Command({
	name: "hug",
	description: "Ôm người khác UwU",
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

		images_api.sfw.hug().then(response => {
			const embed = new MessageEmbed()
				.setDescription(`**${message.author.tag} ôm ${user.tag} UwU!**`)
				.setColor(MAIN_COLOR)
				.setImage(response.image)

			message.channel.send({embeds: [embed]});
        })

	}
});
