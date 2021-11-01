/** @format */

const { MessageEmbed } = require("discord.js");
const Command = require("../../Structures/Command.js");
const config = require("../../Data/config.json");

const MAIN_COLOR = config.MAIN_COLOR;

const morse = require("morse-code-converter");

const prefixSchema = require("../../models/prefix.js");

const prefix = require("../../Data/config.json")

module.exports = new Command({
	name: "morsetrans",
	description: "Dịch văn bản thành mã Morse hoặc ngược lại",
	directory: "fun",
	usage: "[morse | text] [Nội dung]",
	permission: "SEND_MESSAGES",
	async run(client, message, args) {
        client.prefix = async function(message) {
            let custom;
    
            const data = await prefixSchema.findOne({ Guild: message.guild.id })
                .catch(err => console.log(err));
            
            if (data) {
                custom = data.Prefix
            } else {
                custom = prefix.prefix;
            }
            return custom;
        };
    
        const p = await client.prefix(message)

        const err = new MessageEmbed()
            .setTitle("Cách sử dụng")
            .setDescription(`\`\`\`yaml\n${p}morsetrans ${this.usage}\n\nVí dụ:\n${p}morsetrans text ... ..- .--. . .-. / .. -.. --- .-..\`\`\``)
            .setColor("RED")

        const res = args[0]

        if (!res) {
            return message.channel.send({ embeds: [err] })
        }

        const res2 = args.slice(1).join(" ")

        if (!res2) {
            return message.channel.send({ embeds: [err] })
        }

        let text

        if (["morse", "text"].includes(res.toLowerCase())) {
            if (res.toLowerCase() == "morse") {
                text = morse.textToMorse(res2)
            }
            else if (res.toLowerCase() == "text") {
                text = morse.morseToText(res2)
            }
        }
        else {
            return message.channel.send({ embeds: [err] })
        }

        const embed = new MessageEmbed()
			.setDescription(`**INPUT**\n\`\`\`${res2}\`\`\`\n**OUTPUT**\n\`\`\`fix\n${text}\`\`\``)
			.setColor(MAIN_COLOR)

		message.channel.send({embeds: [embed]});
	}
});
