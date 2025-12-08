const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    nominations: { type: Number, default: 0 },
    wins: { type: Number, default: 0 },
    image: { type: String },
    genre: { type: String },
    year: { type: Number }
});

module.exports = mongoose.model("Movie", MovieSchema);