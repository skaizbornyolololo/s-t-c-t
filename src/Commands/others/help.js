/** @format */

const { 
    MessageEmbed,
    MessageActionRow,
    MessageSelectMenu
 } = require("discord.js");
const Command = require("../../Structures/Command.js");
const config = require("../../Data/config.json");
const prefixSchema = require("../../models/prefix.js");

const prefix = require("../../Data/config.json")

const MAIN_COLOR = config.MAIN_COLOR;

const fs = require("fs");

const wait = require('util').promisify(setTimeout);

module.exports = new Command({
	name: "help",
	description: "Shows this message!",
	directory: "others",
	usage: "<lแปnh>",
	permission: "SEND_MESSAGES",
	async run(client, message, args) {
		const emojis = {
			sources: "๐",
			voice: "๐ต",
			others: "๐",
			moderating: "๐จ",
			activities: "๐",
			media: "๐ผ๏ธ",
			fun: "๐"
		}

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
		
		if (!args[0]) {
			const directories = [
				...new Set(client.commands.map((cmd) => cmd.directory))
			]
			
			const formatString = (str) => `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`

			const categories = directories.map((dir) => {
				const getCommands = client.commands
					.filter((cmd) => cmd.directory === dir)
					.map(cmd => {
						return {
							name: cmd.name,
							description: cmd.description
						}
					})
				return {
					directory: formatString(dir),
					commands: getCommands
				}

			})
			let author = client.users.fetch("893127547930443857");
        	author.then(async function(result1) {
            	var imgURL = result1.displayAvatarURL();
				const embed = new MessageEmbed()
					.setAuthor("Danh sรกch lแปnh cแปงa NokaBot", imgURL, `${config.rickroll}`)
					.setDescription(`**Sแปญ dแปฅng \`${p}help [lแปnh]\` ฤแป biแบฟt thรชm chi tiแบฟt**`)
					.addFields(categories.map((cmd) => {
						return {
							name: `${emojis[cmd.directory.toLowerCase()]} ${cmd.directory} (${cmd.commands.length})`,
							value: cmd.commands.map((cm) => `\`${cm.name}\``).join(" "),
							inline: false
						}
					}))
					.setTimestamp()
					.setFooter(`${message.guild.name}`, `${message.author.displayAvatarURL()}`)
					.setColor(MAIN_COLOR)
				
				await message.channel.send({ embeds: [embed] })
			})
		}
		else {
			const cmdName = args[0].toLowerCase();

			const command = client.commands.get(cmdName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(cmdName));

			if (!command) {
				const z = await message.reply(`**:x: | \`${cmdName}\` khรดng cรณ trong danh sรกch lแปnh!**`);
				if (z) setTimeout(() => z.delete(), 5000);
				return
			}

			const helpcmd = new MessageEmbed()
			let temp = command.name
			helpcmd
				.setTitle(`${temp[0].toUpperCase()}${temp.slice(1).toLowerCase()}`)
				.setURL(`${config.rickroll}`)
				.setDescription(`> ${command.description}`)
				.addField("Aliases", (command.aliases !== undefined) ? `\`${command.aliases.join(", ")}\`` : "`None`")
				.addField("Danh mแปฅc", `\`${command.directory.toUpperCase()}\``)
				.addField("Quyแปn sแปญ dแปฅng", `\`${command.permission}\``)
				.addField("Cรกch sแปญ dแปฅng", command.usage ? `\`\`\`yaml\n${p}${command.name} ${command.usage}\`\`\`` : "`None`", false)
				.setColor(MAIN_COLOR)
				.setFooter("Kรญ hiแปu sแปญ dแปฅng: <Khรดng bแบฏt buแปc> || [Bแบฏt buแปc]")
			if (command.name == "language") {
				helpcmd.addField("Tips", `\`\`\`Sแปญ dแปฅng "${p}language list" ฤแป xem danh sรกch ngรดn ngแปฏ hแป trแปฃ\`\`\``)
			}

			message.channel.send( {embeds: [helpcmd]})
		}
	}
	
});
