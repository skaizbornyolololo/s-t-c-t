const Discord = require("discord.js");

const Command = require("../../Structures/Command.js")

const langSchema = require("../../models/language.js")

const prefixSchema = require("../../models/prefix.js")

const config = require("../../Data/config.json");

const { MessageEmbed } = require("discord.js");

const fs = require("fs");

const MAIN_COLOR = config.MAIN_COLOR;

const lgs = [
    {code: "vi", name: "Vietnamese"},
    {code: "zh", name: "Chinese"},
    {code: "cs", name: "Czech"},
    {code: "nl", name: "Dutch"},
    {code: "en", name: "English"},
    {code: "fr", name: "France"},
    {code: "de", name: "German"},
    {code: "hi", name: "Hindi"},
    {code: "id", name: "Indonesian"},
    {code: "it", name: "Italian"},
    {code: "ja", name: "Japanese"},
    {code: "ko", name: "Korean"},
    {code: "ms", name: "Malay"},
    {code: "th", name: "Thai"},
    {code: "ru", name: "Russian"},
    {code: "pl", name: "Polish"},
];


module.exports = new Command({
    name: "language",
    description: "Thay đổi ngôn ngữ mặc định giọng Google cho lệnh speak",
    directory: "moderating",
	aliases: ["lg", "lang"],
    usage: "[ngôn ngữ]",
    permission: "MANAGE_GUILD",
    async run(client, message, args) {
        client.prefix = async function(message) {
            let customm;
    
            const dataa = await prefixSchema.findOne({ Guild: message.guild.id })
                .catch(err => console.log(err));
            
            if (dataa) {
                customm = dataa.Prefix
            } else {
                customm = config.prefix;
            }
            return customm;
        };
    
        const p = await client.prefix(message)

        const res = args[0]
        if (!res) {
            const m = await message.reply(":x: **| Bạn phải nhập ngôn ngữ muốn thay đổi!**")
            if (m) setTimeout(() => m.delete(), 5000);
            return
        } 
        
        let temp = lgs.map(o => `\`${o.code} - ${o.name}\``).join("\n")

        const sounds = fs.readdirSync("./src/soundboards")
            .map(file => `\`${file.replace(".mp3", "")}\``)

        if (res == "list") {
            const embed = new MessageEmbed();

            embed
                .setTitle(":closed_book: Danh sách ngôn ngữ")
                .addField("Ngôn ngữ", temp, true)
                .addField("Soundboards", sounds.join(" "), true)
                .setColor(MAIN_COLOR)

            return message.channel.send({embeds: [embed]})
        }

        let arr = []
        for (let i = 0; i < lgs.length; ++i) {
            let x = lgs[i]
            arr.push(x.code)
        }

        if (!arr.includes(res)) {
            const msg = await message.reply(`:x: **| Ngôn ngữ bạn muốn thay đổi không có trong danh sách ngôn ngữ hiện tại!**\n**Sử dụng \`${p}language list\` để xem danh sách ngôn ngôn ngữ!**`)
            if (msg) setTimeout(() => msg.delete(), 5000);
            return
        } 

        langSchema.findOne({ Guild: message.guild.id }, async(err, data) => {
            if (err) throw err;
            if (data) {
                await langSchema.findOneAndDelete({ Guild: message.guild.id })
                data = new langSchema({
                    Guild: message.guild.id,
                    Language: res,
                })
                data.save();
                message.reply(`:+1: **| Ngôn ngữ lệnh say đã được cập nhật thành \`${res}\`!**`)
            } else {
                data = new langSchema({
                    Guild: message.guild.id,
                    Language: res,
                })
                data.save()
                message.reply(`:+1: **| Ngôn ngữ lệnh say đã được thiết lập thành \`${res}\`!**`)
            }
        })
    }
})