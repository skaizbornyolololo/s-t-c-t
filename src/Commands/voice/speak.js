/** @format */

const { 
    MessageEmbed,
    MessageActionRow,
    MessageSelectMenu
 } = require("discord.js");
const Command = require("../../Structures/Command.js");
const config = require("../../Data/config.json");

const MAIN_COLOR = config.MAIN_COLOR;

const googleTTS = require('google-tts-api');

const langSchema = require("../../models/language.js")

const fs = require("fs");

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

const {
    joinVoiceChannel,
    createAudioPlayer,
    createAudioResource
} = require('@discordjs/voice');

module.exports = new Command({
	name: "speak",
	description: "Làm bot nói trong kênh thoại",
    directory: "voice",
    aliases: ["s", "say", "spk"],
    usage: "<ngôn ngữ | soundboard> [nội dung]",
	permission: "SEND_MESSAGES",
	async run(client, message, args) {
        let custom;
    
        const data = await langSchema.findOne({ Guild: message.guild.id })
            .catch(err => console.log(err));
            
        if (data) {
            custom = data.Language
        } else {
            custom = config.default_language;
        }

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
        if (clientvoiceChannel) {
            if (voiceChannel !== clientvoiceChannel) {
                const mg = await message.reply("**:x: | Bạn phải ở cùng kênh thoại với bot!**")
                if (mg) setTimeout(() => mg.delete(), 5000);
                return
            }
        }
        

        let string = args.slice(0).join(' ')
        if (!string) {
            const m = await message.reply("**:x: | Thiếu nội dung!**")
            if (m) setTimeout(() => m.delete(), 5000);
            return

        } 

        for (let i = 0; i < lgs.length; i++) {
            let x = lgs[i]
            let o = args[0]
            if (o == x.code) {
                custom = x.code
                string = args.slice(1).join(' ')
                if (args[1] == null) {
                    const a = await message.reply("**:x: | Thiếu nội dung!**")
                    if (a) setTimeout(() => a.delete(), 5000);
                    return
                }
            }
        }
        try {
            const audioURL = await googleTTS.getAllAudioUrls(string, {
                lang: `${custom}`,
                slow: false,
                host: "https://translate.google.com",
                splitPunct: ",.?",
            })

            let tempurl = audioURL[0].url

            const sounds = fs.readdirSync("./src/soundboards")
                .map(file => file)

            for (let i = 0; i < sounds.length; i++) {
                let gg = args[0]
                if (gg == sounds[i].replace(".mp3", "")) {
                    if (args[1] == null) {
                        tempurl = `./src/soundboards/${sounds[i]}`
                    }
                    else {
                        tempurl = audioURL[0].url
                    }
                }
            }

            const player = createAudioPlayer();
            const resource = createAudioResource(tempurl);

            const connection = joinVoiceChannel({
                channelId: message.member.voice.channel.id,
                guildId: message.guild.id,
                adapterCreator: message.guild.voiceAdapterCreator,
            });

            await player.play(resource)
            connection.subscribe(player);
        }
        catch(e) {
            return
        }
    }
});