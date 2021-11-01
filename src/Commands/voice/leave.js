/** @format */

const { MessageEmbed } = require("discord.js");
const Command = require("../../Structures/Command.js");
const config = require("../../Data/config.json");
const { joinVoiceChannel } = require("@discordjs/voice");

const MAIN_COLOR = config.MAIN_COLOR;

module.exports = new Command({
	name: "leave",
	description: "Làm bot rời khỏi kênh thoại",
	directory: "voice",
    aliases: ["disconnect", "dis"],
	usage: " ",
	permission: "SEND_MESSAGES",
	async run(client, message, args) {
		const voiceChannel = message.member.voice.channel
        if (!voiceChannel) {
            const msg = await message.reply("**:x: | Bạn đang không ở trong kênh thoại!**")
            if (msg) setTimeout(() => msg.delete(), 5000);
            return
        }

        const clientvoiceChannel = message.guild.me.voice.channel
        if (clientvoiceChannel) {
            if (voiceChannel !== clientvoiceChannel) {
                const mg = await message.reply("**:x: | Bạn phải ở cùng kênh thoại với bot!**")
                if (mg) setTimeout(() => mg.delete(), 5000);
                return
            }
        }
        
        await message.guild.me.voice.disconnect()
	}
});
