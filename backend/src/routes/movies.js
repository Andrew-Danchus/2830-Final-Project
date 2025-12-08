const express = require("express");
const router = express.Router();
const Movie = require("../models/Movie");

// Gets movie stats
router.get("/:title", async (req, res) => {
    try {
        const movie = await Movie.findOne({ title: req.params.title });
        if (!movie) {
            return res.status(404).json({ error: "Movie not found" });
        }

        res.json(movie);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Creates a new movie
router.post("/", async (req, res) => {
    try {
        const { title, nominations, wins } = req.body;
        if (!title) {
            return res.status(400).json({ error: "Title is required" });
        }

        const movie = new Movie({ title, nominations, wins });
        await movie.save();
        res.status(201).json(movie);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Updates movie by ID
router.put("/:id", async (req, res) => {
    try {
        const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!movie) {
            return res.status(404).json({ error: "Movie not found" });
        }

        res.json(movie);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Deletes movie by ID
router.delete("/:id", async (req, res) => {
    try {
        const movie = await Movie.findByIdAndDelete(req.params.id);
        if (!movie) {
            return res.status(404).json({ error: "Movie not found" });
        }

        res.json({ message: "Movie deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;