const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
    title: String,
    image: String,
    genre: String,
    year: Number,
    director: String,
    win: Boolean
});

module.exports = mongoose.model("Movie", MovieSchema);