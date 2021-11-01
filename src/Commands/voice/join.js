/** @format */

const { MessageEmbed } = require("discord.js");
const Command = require("../../Structures/Command.js");
const config = require("../../Data/config.json");
const { joinVoiceChannel } = require("@discordjs/voice");

const MAIN_COLOR = config.MAIN_COLOR;

module.exports = new Command({
	name: "join",
	description: "Làm bot tham gia vào kênh thoại",
	directory: "voice",
    aliases: ["connect"],
	usage: " ",
	permission: "SEND_MESSAGES",
	async run(client, message, args) {
		const voiceChannel = message.member.voice.channel
        if (!voiceChannel) {
            const msg = await message.reply("**:x: | Bạn đang không ở trong kênh thoại!**")
            if (msg) setTimeout(() => msg.delete(), 5000);
            return
        }

        const perm = message.member.voice.channel.joinable

        if (!perm) {
            const g = await message.reply(`**:x: | Tôi không có quyền kết nối với kênh thoại!**`)
            if (g) setTimeout(() => g.delete(), 5000);
            return
        }

        const clientvoiceChannel = message.guild.me.voice.channel
        
        await joinVoiceChannel({
            channelId: message.member.voice.channel.id,
            guildId: message.guild.id,
            adapterCreator: message.guild.voiceAdapterCreator,
        })
	}
});
