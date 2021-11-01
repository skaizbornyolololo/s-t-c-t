/** @format */

const { MessageEmbed } = require("discord.js");
const Command = require("../../Structures/Command.js");
const config = require("../../Data/config.json");

const MAIN_COLOR = config.MAIN_COLOR;

module.exports = new Command({
	name: "invite",
	description: "Mời bot vào server của bạn!",
	directory: "others",
    aliases: ["inv"],
	usage: " ",
	permission: "SEND_MESSAGES",
	async run(client, message, args) {
		const embed = new MessageEmbed();

		embed
			.setTitle("Invite NokaBot!")
			.setDescription("[Ấn vào đây để mời!](https://discord.com/api/oauth2/authorize?client_id=893127547930443857&permissions=8&scope=bot)")
			.setColor(MAIN_COLOR)

		message.channel.send({embeds: [embed]});
	}
});
