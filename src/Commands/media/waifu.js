/** @format */

const { MessageEmbed } = require("discord.js");
const Command = require("../../Structures/Command.js");
const config = require("../../Data/config.json");

const MAIN_COLOR = config.MAIN_COLOR;

const axios = require('axios');

module.exports = new Command({
	name: "waifu",
	description: "Gửi ảnh waifu ngẫu nhiên!",
	directory: "media",
	usage: " ",
	permission: "SEND_MESSAGES",
	async run(client, message, args) {

		const image = await axios('https://api.waifu.pics/sfw/waifu').then((res) =>
            res.data ? res.data.url : null
        )

        const embed = new MessageEmbed()

        if (!image) {
            const g = await message.reply(`**:x: | Có lỗi xảy ra khi tìm ảnh!**`)
            if (g) setTimeout(() => g.delete(), 5000);
            return
        }
        else {
            embed.setImage(image)
            embed.setColor(MAIN_COLOR)
        }
        
		message.channel.send({embeds: [embed]});

	}
});
