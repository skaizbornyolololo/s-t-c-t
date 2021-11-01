/** @format */

console.clear();

const Client = require("./Structures/Client.js");

const config = require("./Data/config.json");

const client = new Client();

const mongoose = require("mongoose");

const MAIN_COLOR = config.MAIN_COLOR;

mongoose.connect(config.MONGO_SRV, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
}).then(() => {
	console.log("Successfully connected to MongoDB")
}).catch((err) => {
	return console.log(err)
});

const { MessageEmbed } = require("discord.js");

client.start(config.token);