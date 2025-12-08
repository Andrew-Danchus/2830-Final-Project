const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./src/config/db");

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/awards", require("./src/routes/awards"));
app.use("/api/movies", require("./src/routes/movies"));
app.use("/api/people", require("./src/routes/people"));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Server Error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));