/** @format */

const Event = require("../Structures/Event.js");

const prefixSchema = require("../models/prefix.js");

const prefix = require("../Data/config.json")

module.exports = new Event("messageCreate", async (client, message) => {
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
	
    if (message.author.bot) return;

	if(message.mentions.users.first()) {
		if (message.mentions.users.first().id === "893127547930443857") return message.reply(`:wave: **| Prefix hiện tại của server là \`${p}\`!**`)
	} 

	if (!message.content.startsWith(p)) return;
	if (message.content === p) return

	const args = message.content.substring(p.length).split(/ +/);
	const cmdName = args.shift().toLocaleLowerCase();

	const command = client.commands.get(cmdName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(cmdName));

	if (!command) return message.reply(`**:x: | \`${cmdName}\` không phải là lệnh hợp lệ!**`);

	const permission = message.member.permissions.has(command.permission, true);

	if (!permission) {
		const g = message.reply(":x: **|** Bạn không có quyền `" + `${command.permission}` + "` để sử dụng lệnh này!")
		if (g) setTimeout(() => g.delete(), 5000);
        return
	} 

	command.run(client, message, args);
});