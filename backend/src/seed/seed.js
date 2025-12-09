const mongoose = require("mongoose");
const Award = require("../models/Award");
const Movie = require("../models/Movie");
const Person = require("../models/Person");
require("dotenv").config();
const connectDB = require("../config/db");

connectDB();

const seedData = async () => {
    try {
        await Award.deleteMany({});
        await Movie.deleteMany({});
        await Person.deleteMany({});

        const awards = require("../data/awards.json");
        const movies = require("../data/movies.json");
        const people = require("../data/people.json");

        await Award.insertMany(awards);
        await Movie.insertMany(movies);
        await Person.insertMany(people);

        console.log("Database seeded!");
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedData();