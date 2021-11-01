const Discord = require("discord.js");

const Command = require("../../Structures/Command.js")

const prefixSchema = require("../../models/prefix.js")

module.exports = new Command({
    name: "prefix",
    description: "Cập nhật prefix hiện tại của server",
    directory: "others",
    usage: "[prefix]",
    permission: "MANAGE_GUILD",
    async run(client, message, args) {
        const res = args[0]
        if (!res) {
            const msg = await message.reply(":x: **| Bạn phải nhập prefix muốn thay đổi!**")
            if (msg) setTimeout(() => msg.delete(), 5000)
            return
        } 

        prefixSchema.findOne({ Guild: message.guild.id }, async(err, data) => {
            if (err) throw err;
            if (data) {
                await prefixSchema.findOneAndDelete({ Guild: message.guild.id })
                data = new prefixSchema({
                    Guild: message.guild.id,
                    Prefix: res,
                })
                data.save();
                message.reply(`:+1: **| Prefix đã được cập nhật thành \`${res}\`**`)
            } else {
                data = new prefixSchema({
                    Guild: message.guild.id,
                    Prefix: res,
                })
                data.save()
                message.reply(`:+1: **| Prefix đã được thiết lập thành \`${res}\`**`)
            }
        })
    }
})