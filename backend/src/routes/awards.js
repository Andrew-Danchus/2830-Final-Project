const express = require("express");
const router = express.Router();
const Award = require("../models/Award");

// Gets all years
router.get("/years", async (req, res) => {
    try {
        const years = await Award.distinct("year");
        res.json(years);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Gets awards for a specific year
router.get("/:year", async (req, res) => {
    try {
        const year = parseInt(req.params.year);
        if (isNaN(year)) {
            return res.status(400).json({ error: "Invalid year" });
        }

        const awards = await Award.find({ year });
        res.json(awards);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Compares two years for a category
router.get("/compare/:category/:year1/:year2", async (req, res) => {
    try {
        const { category, year1, year2 } = req.params;
        const y1 = parseInt(year1);
        const y2 = parseInt(year2);

        if (isNaN(y1) || isNaN(y2)) {
            return res.status(400).json({ error: "Invalid year" });
        }

        const data = await Award.find({
            category,
            year: { $in: [y1, y2] }
        });

        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Creates a new award
router.post("/", async (req, res) => {
    try {
        const { year, category, nominees, winner } = req.body;
        if (!year || !category || !nominees || !winner) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const award = new Award({ year, category, nominees, winner });
        await award.save();
        res.status(201).json(award);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Updates an award by ID
router.put("/:id", async (req, res) => {
    try {
        const award = await Award.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!award) {
            return res.status(404).json({ error: "Award not found" });
        }

        res.json(award);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Deletes an award by ID
router.delete("/:id", async (req, res) => {
    try {
        const award = await Award.findByIdAndDelete(req.params.id);
        if (!award) {
            return res.status(404).json({ error: "Award not found" });
        }
        
        res.json({ message: "Award deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;