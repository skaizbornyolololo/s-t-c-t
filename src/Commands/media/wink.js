/** @format */

const { MessageEmbed } = require("discord.js");
const Command = require("../../Structures/Command.js");
const config = require("../../Data/config.json");

const MAIN_COLOR = config.MAIN_COLOR;

const API = require('anime-images-api')
const images_api = new API() 

module.exports = new Command({
	name: "wink",
	description: "*wink* 😉",
	directory: "media",
	usage: " ",
	permission: "SEND_MESSAGES",
	async run(client, message, args) {

		images_api.sfw.wink().then(response => {
			const embed = new MessageEmbed()
				.setDescription("😉")
				.setColor(MAIN_COLOR)
				.setImage(response.image)

			message.channel.send({embeds: [embed]});
        })

	}
});
