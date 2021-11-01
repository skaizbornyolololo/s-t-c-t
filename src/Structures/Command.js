/** @format */

const Client = require("./Client.js");

const Discord = require("discord.js");

/**
 * @param {Client} client
 * @param {Discord.Message | Discord.Interaction} message
 * @param {string[]} args
 */
function RunFunction(client, message, args) {}

class Command {
	/**
	 * @typedef {{name: string, description: string, directory: string, aliases: string[], usage: string, permission: Discord.PermissionString, run: RunFunction}} CommandOptions
	 * @param {CommandOptions} options
	 */
	constructor(options) {
		this.name = options.name;
		this.description = options.description;
		this.directory = options.directory;
		this.aliases = options.aliases;
		this.usage = options.usage;
		this.permission = options.permission;
		this.run = options.run;
	}
}

module.exports = Command;
