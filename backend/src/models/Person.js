const mongoose = require("mongoose");

const PersonSchema = new mongoose.Schema({
    name: { type: String, required: true },
    nominations: { type: Number, default: 0 },
    wins: { type: Number, default: 0 },
    category: { type: String },
    movie: { type: String }
});

module.exports = mongoose.model("Person", PersonSchema);