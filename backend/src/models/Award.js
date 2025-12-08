const mongoose = require("mongoose");

const AwardSchema = new mongoose.Schema({
    year: { type: Number, required: true },
    category: { type: String, required: true },
    winner: { type: String, required: true }
});

module.exports = mongoose.model("Award", AwardSchema);