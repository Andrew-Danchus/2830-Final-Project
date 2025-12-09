const mongoose = require("mongoose");

const PersonSchema = new mongoose.Schema({
    year: Number,
    name: String,
    category: String,
    movie: String
});

module.exports = mongoose.model("Person", PersonSchema);