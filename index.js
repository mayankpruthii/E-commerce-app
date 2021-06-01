require("dotenv").config();
const express = require("express");
const db = require("./config/db");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api", require("./routes"));

app.listen(process.env.PORT, () => {
	console.log(`App running on port ${process.env.PORT}`);
});
