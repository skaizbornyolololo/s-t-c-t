/** @format */

const { MessageEmbed } = require("discord.js");
const Command = require("../../Structures/Command.js");
const config = require("../../Data/config.json");

const MAIN_COLOR = config.MAIN_COLOR;

module.exports = new Command({
	name: "ping",
	description: "Kiểm tra độ trễ của bot",
	directory: "others",
	usage: " ",
	permission: "SEND_MESSAGES",
	async run(client, message, args) {
		const embed = new MessageEmbed();

		embed
			.setTitle(":ping_pong: Pong!")
			.setDescription("Độ trễ: `" + `${client.ws.ping}` + "ms`")
			.setColor(MAIN_COLOR)

		message.channel.send({embeds: [embed]});
	}
});
