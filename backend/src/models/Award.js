const mongoose = require("mongoose");

const AwardSchema = new mongoose.Schema({
    year: Number,
    category: String,
    winningMovie: String,
    winningPerson: String
});

module.exports = mongoose.model("Award", AwardSchema);