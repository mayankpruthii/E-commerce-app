require("dotenv").config();
const express = require("express");
const db = require("./config/db");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

app.use("/api", require("./routes"));

app.listen(process.env.PORT, () => {
    console.log(`App running on port ${process.env.PORT}`)
})