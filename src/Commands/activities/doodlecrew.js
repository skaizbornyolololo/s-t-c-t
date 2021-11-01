/** @format */

const Command = require("../../Structures/Command.js");
const config = require("../../Data/config.json");
const { joinVoiceChannel } = require("@discordjs/voice");

const { DiscordTogether } = require('discord-together');

const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

const MAIN_COLOR = config.MAIN_COLOR;

module.exports = new Command({
	name: "doodlecrew",
	description: "Chơi Doodle Crew cùng bạn bè trên Discord!",
	directory: "activities",
	usage: " ",
	permission: "SEND_MESSAGES",
	async run(client, message, args) {
        client.discordTogether = new DiscordTogether(client);

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

        client.discordTogether.createTogetherCode(voiceChannel.id, 'doodlecrew').then(async invite => {
            const row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setLabel("Doodle Crew!")
                        .setStyle("LINK")
                        .setURL(invite.code)
                )
            message.channel.send({ content: "Click bên dưới để bắt đầu chơi!", components: [row]})
        });
	}
});
