const mongoose = require('mongoose');

let Schema = new mongoose.Schema({
    Guild: String,
    Language: String,
});

module.exports = mongoose.model("language", Schema);