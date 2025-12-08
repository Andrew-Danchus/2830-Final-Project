const express = require("express");
const router = express.Router();
const Person = require("../models/Person");

// Gets actor/actress stats
router.get("/:name", async (req, res) => {
    try {
        const person = await Person.findOne({ name: req.params.name });
        if (!person) {
            return res.status(404).json({ error: "Person not found" });
        }

        res.json(person);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Creates a new actor/actress
router.post("/", async (req, res) => {
    try {
        const { name, nominations, wins } = req.body;
        if (!name) {
            return res.status(400).json({ error: "Name is required" });
        }

        const person = new Person({ name, nominations, wins });
        await person.save();
        res.status(201).json(person);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Updates actor/actress by ID
router.put("/:id", async (req, res) => {
    try {
        const person = await Person.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!person) {
            return res.status(404).json({ error: "Person not found" });
        }
        
        res.json(person);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Deletes actor/actress by ID
router.delete("/:id", async (req, res) => {
    try {
        const person = await Person.findByIdAndDelete(req.params.id);
        if (!person) {
            return res.status(404).json({ error: "Person not found" });
        }

        res.json({ message: "Person deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;