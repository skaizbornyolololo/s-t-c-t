/** @format */

const { MessageEmbed } = require("discord.js");
const Command = require("../../Structures/Command.js");
const config = require("../../Data/config.json");
const prefixSchema = require("../../models/prefix.js");

const prefix = require("../../Data/config.json")

const MAIN_COLOR = config.MAIN_COLOR;

const packageJSON = require("../../../package.json")

module.exports = new Command({
	name: "info",
	description: "Xem thông tin của bot",
    directory: "others",
    aliases: ["inf", "information", "stats"],
    usage: " ",
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

        let totalSeconds = message.client.uptime / 1000;
        const days = Math.floor(totalSeconds / 86400);
        totalSeconds %= 86400;
        const hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = Math.floor(totalSeconds % 60);

        const uptime = `\`\`\`apache\n${days} ngày, ${hours} giờ, ${minutes} phút ${seconds} giây\`\`\``;
        
        const discordJSver = packageJSON.dependencies["discord.js"]
        const distubeJSver = packageJSON.dependencies["distube"]

        const embed = new MessageEmbed();

        let author = client.users.fetch("570775713863696409");
        author.then(function(result1) {
            var imgURL = result1.displayAvatarURL();
            embed
                .setTitle("Thông tin về NokaBot")
                .setDescription(`> Prefix hiện tại: \`${p}\``)
                .addField(
                    "Packages Info",
                    `\`\`\`fix\nDISCORD.JS - v${discordJSver.slice(1)}\nNODE.JS - v16.11.0\`\`\``
                )
                .addField("Servers", `\`\`\`apache\n${client.guilds.cache.size} servers!\`\`\``, true)
                .addField("Users", `\`\`\`apache\n${client.users.cache.size} users!\`\`\``, true)
                .addField("RAM", `\`\`\`apache\n${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB\`\`\``, true)
                .addField("Ping", `\`\`\`apache\n${client.ws.ping} ms\`\`\``, true)
                .addField("Uptime", `${uptime}`, false)
                .setColor(MAIN_COLOR)
                .setThumbnail("https://images-ext-2.discordapp.net/external/RFkB46x9TH7llxiXbjUVXK3DsZ5KsoXDoVmPncDNiOo/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/893127547930443857/cd8e16737e06b837dab550775485df2c.webp")
                .setFooter("Author: n0ka#7958", imgURL)
            message.channel.send({embeds: [embed]});
        });
	}
});
